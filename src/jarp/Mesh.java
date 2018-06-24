package jarp;

import com.jogamp.opengl.GL2;
import jautil.JAInputStream;
import jautil.JAOptions;
import jautil.JAOutputStream;
import jautil.JATimer;
import jautil.geometry.Vector3f;
import java.io.IOException;
import java.io.PrintStream;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;
import java.nio.ShortBuffer;

public class Mesh {
	private static int BITS_PER_BYTE = 8;
	private static int SHORT_SIZE = 16;
	private static int FLOAT_SIZE = 32;

	public static int TRM_SMOOTH = 0;
	public static int TRM_TEXTURED = 1;
	public static int TRM_WIRE = 2;
	public static int TRM_POINTMESH = 3;
	public static int TRM_FLAT = 4;
	public static int TRM_SKELETON = 5;
	public static int TRM_FACEPICKING = 6;
	public static int TRM_MAP2D3D = 7;
	public static int TRM_WEIGHTMAPPING = 8;

	private final int VERSION_AS_3_DIGITS;

	private final boolean USE_MORPH_NORMALS;

	private float lodRange;

	private MeshVertex[] points;

	private short[] triangleStripIndices;

	private float[] vertices;

	private float[] normals;

	private float[] texCoords;

	private MorphHandler morphHandler;

	private int countVertices;

	private int[] duplicateIndexMap;

	private ShortBuffer triangleIndicesBuf;

	private FloatBuffer verticesBuf;

	private FloatBuffer normalsBuf;

	private FloatBuffer texCoordsBuf;

	public Mesh() {
		this(0);
	}

	private Mesh(int ver3dig) {
		this.VERSION_AS_3_DIGITS = ver3dig;
		this.USE_MORPH_NORMALS = versionIsAtLeast30();

		this.points = null;

		this.triangleStripIndices = null;
		this.vertices = null;
		this.normals = null;
		this.texCoords = null;

		this.triangleIndicesBuf = null;
		this.verticesBuf = null;
		this.normalsBuf = null;
		this.texCoordsBuf = null;
	}

	public Mesh(JAInputStream jins, JAOptions jopts, int ver3dig) throws IOException {
		this(ver3dig);

		this.lodRange = jins.readFloat();

		loadMeshPoints(jins);

		loadTriangleStripIndices(jins);

		if ((jopts == null) || (jopts.meshDuplicatesFormatIsNew())) {
			loadDuplicateVerticesData(jins);
		} else {
			DuplicatesData dd = loadDuplicatesDataOLD(jins);
			convertDuplicatesData(dd);
		}

		loadTextureCoords(jins);

		this.morphHandler = new MorphHandler(jins, this.USE_MORPH_NORMALS);

		int NV3 = this.countVertices * 3;
		this.vertices = new float[NV3];
		this.normals = new float[NV3];

		allocateBuffersForJOGL();
	}

	public void fixBoneReferences(Skeleton skeleton) {
		int NV = this.points.length;
		for (int v = 0; v != NV; v++) {
			this.points[v].fixBoneReferences(skeleton);
		}
	}

	public float getLODRange() {
		return this.lodRange;
	}

	public MeshVertex[] getPoints() {
		return this.points;
	}

	public float[] getVertices() {
		return this.vertices;
	}

	public float[] getNormals() {
		return this.normals;
	}

	public void getVertex(int v3, float[] vtx) {
		vtx[0] = this.vertices[(v3 + 0)];
		vtx[1] = this.vertices[(v3 + 1)];
		vtx[2] = this.vertices[(v3 + 2)];
	}

	public MorphHandler getMorphHandler() {
		return this.morphHandler;
	}

	protected void allocateBuffersForJOGL() {
		int NTI = this.triangleStripIndices.length;
		int NV3 = this.countVertices * 3;

		this.triangleIndicesBuf = newShortBuffer(NTI);
		this.verticesBuf = newFloatBuffer(NV3);
		this.normalsBuf = newFloatBuffer(NV3);
		this.texCoordsBuf = newFloatBuffer(this.texCoords.length);

		this.triangleIndicesBuf.clear();
		this.triangleIndicesBuf.put(this.triangleStripIndices);
		this.triangleIndicesBuf.limit(this.triangleStripIndices.length);
		this.triangleIndicesBuf.rewind();

		this.verticesBuf.clear();
		this.verticesBuf.put(this.vertices);
		this.verticesBuf.limit(this.vertices.length);
		this.verticesBuf.rewind();

		this.normalsBuf.clear();
		this.normalsBuf.put(this.normals);
		this.normalsBuf.limit(this.normals.length);
		this.normalsBuf.rewind();

		this.texCoordsBuf.clear();
		this.texCoordsBuf.put(this.texCoords);
		this.texCoordsBuf.limit(this.texCoords.length);
		this.texCoordsBuf.rewind();
	}

	public void setNormalsVector(int n3, Vector3f nvec) {
		this.normals[n3] = nvec.x();
		this.normals[(n3 + 1)] = nvec.y();
		this.normals[(n3 + 2)] = nvec.z();
	}

	public void setNormalsVector(int n3, float nvx, float nvy, float nvz) {
		this.normals[n3] = nvx;
		this.normals[(n3 + 1)] = nvy;
		this.normals[(n3 + 2)] = nvz;
	}

	public void setVerticesVector(int v3, Vector3f vvec) {
		this.vertices[v3] = vvec.x();
		this.vertices[(v3 + 1)] = vvec.y();
		this.vertices[(v3 + 2)] = vvec.z();
	}

	public void addToVerticesVector(int v3, float[] adjxyz) {
		this.vertices[v3] += adjxyz[0];
		this.vertices[(v3 + 1)] += adjxyz[1];
		this.vertices[(v3 + 2)] += adjxyz[2];
	}

	public void addToVerticesVectorScaled(int v3, float[] adjxyz, float scale) {
		this.vertices[v3] += adjxyz[0] * scale;
		this.vertices[(v3 + 1)] += adjxyz[1] * scale;
		this.vertices[(v3 + 2)] += adjxyz[2] * scale;
	}

	protected void loadMeshPoints(JAInputStream jins) throws IOException {
		int N_PT = jins.readInt();
		this.points = new MeshVertex[N_PT];

		for (int p = 0; p != N_PT; p++) {
			this.points[p] = new MeshVertex(jins, p, this.USE_MORPH_NORMALS);
		}
	}

	protected void loadTriangleStripIndices(JAInputStream jins) throws IOException {
		int N_IL = jins.readInt();
		this.triangleStripIndices = new short[N_IL];

		for (int i = 0; i != N_IL; i++) {
			this.triangleStripIndices[i] = jins.readUnsignedShort();
		}
	}

	protected void loadDuplicateVerticesData(JAInputStream jins) throws IOException {
		int NDV = jins.readInt();

		int NP = this.points.length;
		int NV = NP + NDV;

		this.countVertices = NV;
		this.duplicateIndexMap = new int[NDV];

		if (versionIsAtLeast22()) {
			for (int v = NP; v != NV; v++) {
				this.duplicateIndexMap[(v - NP)] = jins.readInt();
			}

		} else if (!Character.V21_IS_VJJ_FORMAT) {
			for (int v = NP; v != NV; v++) {
				this.duplicateIndexMap[(v - NP)] = jins.readUnsignedShort();
			}
		} else {
			for (int v = NP; v != NV; v++) {

				this.duplicateIndexMap[(v - NP)] = (jins.readInt() / 3);
			}
		}
	}

	protected void loadTextureCoords(JAInputStream jins) throws IOException {
		int N_TC = jins.readInt();
		int N_TC2 = 2 * N_TC;
		this.texCoords = new float[N_TC2];

		for (int t = 0; t != N_TC2; t++) {
			this.texCoords[t] = jins.readFloat();
		}
	}

	public void save(JAOutputStream jouts, boolean dupsv22) throws IOException {
		jouts.writeFloat(this.lodRange);

		int N_PT = this.points.length;

		jouts.writeInt(N_PT);
		for (int p = 0; p != N_PT; p++) {
			this.points[p].save(jouts);
		}

		int N_IL = this.triangleStripIndices.length;

		jouts.writeInt(N_IL);
		for (int i = 0; i != N_IL; i++) {
			jouts.writeUnsignedShort(this.triangleStripIndices[i]);
		}

		int N_DV = this.duplicateIndexMap.length;

		jouts.writeInt(N_DV);
		if (dupsv22) {
			for (int i = 0; i != N_DV; i++) {
				jouts.writeInt(this.duplicateIndexMap[i]);
			}
		} else {
			for (int i = 0; i != N_DV; i++) {
				jouts.writeUnsignedShort((short) this.duplicateIndexMap[i]);
			}
		}

		int N_TC = this.countVertices;
		jouts.writeInt(N_TC);

		int N_TC2 = 2 * N_TC;
		for (int i = 0; i != N_TC2; i++) {
			jouts.writeFloat(this.texCoords[i]);
		}

		this.morphHandler.save(jouts);
	}

	protected DuplicatesData loadDuplicatesDataOLD(JAInputStream jins) throws IOException {
		DuplicatesData dd = new DuplicatesData();

		loadCountDuplicatesList(jins, dd);
		loadDuplicateIndexLists(jins, dd);

		return dd;
	}

	protected void loadCountDuplicatesList(JAInputStream jins, DuplicatesData dd) throws IOException {
		int N_CDL = jins.readInt();
		short[] cdlist = new short[N_CDL];

		for (int j = 0; j != N_CDL; j++) {
			cdlist[j] = jins.readUnsignedShort();
		}

		dd.countDuplicatesList = cdlist;
	}

	protected void loadDuplicateIndexLists(JAInputStream jins, DuplicatesData dd) throws IOException {
		int N_P = this.points.length;
		int[][] dilists = new int[N_P][];
		short[] cdlist = dd.countDuplicatesList;

		int ndinz = 0;
		int nditotal = 0;

		for (int p = 0; p != N_P; p++) {

			int N_DUPS = jins.readInt();
			int[] dilist = new int[N_DUPS];

			if (N_DUPS != cdlist[p]) {
				System.out.println(
						"duplicates-list error:  p=" + p + "  count-dups[p]=" + cdlist[p] + "  N-DUPS=" + N_DUPS);
			}

			for (int d = 0; d != N_DUPS; d++) {
				dilist[d] = jins.readInt();
			}

			if (N_DUPS != 0)
				ndinz++;
			nditotal += N_DUPS;

			dilists[p] = dilist;
		}

		dd.duplicateIndicesLists = dilists;
	}

	private void convertDuplicatesData(DuplicatesData dd) {
		int ndi = 0;
		int nd = 0;

		int N_PT = this.points.length;
		for (int i = 0; i != N_PT; i++) {
			if (dd.countDuplicatesList[i] != 0) {
				ndi++;
				nd += dd.countDuplicatesList[i];
			}
		}

		this.countVertices = (N_PT + nd);

		System.out.println("####  Mesh conversion:  N_PT=" + N_PT + "  N_D=" + nd + "  N_V=" + this.countVertices);

		this.duplicateIndexMap = new int[nd];
		for (int m = 0; m != nd; m++) {
			this.duplicateIndexMap[m] = -1;
		}

		int p = 0;
		int d = 0;
		while (d != ndi) {
			if (dd.countDuplicatesList[p] != 0) {
				int[] DUPS = dd.duplicateIndicesLists[p];

				int N_D = DUPS.length;
				for (int k = 0; k != N_D; k++) {

					this.duplicateIndexMap[(DUPS[k] - N_PT)] = p;
				}
				d++;
			}
			p++;
		}

		for (int m = 0; m != nd; m++) {
			if (this.duplicateIndexMap[m] < 0) {
				System.out.println("####  Mesh: missing d-map entry: " + m);
			}
		}
	}

	public void copyDuplicateVerticesAndNormals() {
		int NP = this.points.length;
		int NV = this.countVertices;
		for (int v = NP; v != NV; v++) {

			int V3 = v * 3;
			int D3 = this.duplicateIndexMap[(v - NP)] * 3;

			this.vertices[V3] = this.vertices[D3];
			this.vertices[(V3 + 1)] = this.vertices[(D3 + 1)];
			this.vertices[(V3 + 2)] = this.vertices[(D3 + 2)];

			this.normals[V3] = this.normals[D3];
			this.normals[(V3 + 1)] = this.normals[(D3 + 1)];
			this.normals[(V3 + 2)] = this.normals[(D3 + 2)];
		}
	}

	public void drawNormalsColour(GL2 gl) {
		gl.glBegin(5);

		int N_IL = this.triangleStripIndices.length;
		for (int i = 0; i != N_IL; i++) {
			int ii3 = this.triangleStripIndices[i] * 3;

			float nma = (this.normals[ii3] + 1.0F) / 2.0F;
			float nmb = (this.normals[(ii3 + 1)] + 1.0F) / 2.0F;
			float nmc = (this.normals[(ii3 + 2)] + 1.0F) / 2.0F;
			gl.glColor3f(nma, nmb, nmc);

			float[] vtcs = this.vertices;
			gl.glVertex3f(vtcs[ii3], vtcs[(ii3 + 1)], vtcs[(ii3 + 2)]);
		}

		gl.glEnd();
		gl.glColor3f(1.0F, 1.0F, 1.0F);
	}

	public void draw(GL2 gl, float[] MAT_DA, int texID) {
		float[] SPEC = { 0.1F, 0.1F, 0.1F, 1.0F };
		if (texID > 0) {
			gl.glEnable(3553);
			gl.glBindTexture(3553, texID);
		} else {
			gl.glDisable(3553);
		}

		gl.glMaterialfv(1032, 4609, MAT_DA, 0);
		gl.glMaterialfv(1032, 4608, MAT_DA, 0);
		gl.glMaterialfv(1032, 4610, SPEC, 0);

		gl.glEnableClientState(32884);
		gl.glEnableClientState(32885);
		gl.glEnableClientState(32888);

		JATimer tmr = new JATimer();
		tmr.setDisplayDisabled(true);

		this.triangleIndicesBuf.clear();
		this.triangleIndicesBuf.put(this.triangleStripIndices);
		this.triangleIndicesBuf.limit(this.triangleStripIndices.length);
		this.triangleIndicesBuf.rewind();

		this.verticesBuf.clear();
		this.verticesBuf.put(this.vertices);
		this.verticesBuf.limit(this.vertices.length);
		this.verticesBuf.rewind();

		this.normalsBuf.clear();
		this.normalsBuf.put(this.normals);
		this.normalsBuf.limit(this.normals.length);
		this.normalsBuf.rewind();

		this.texCoordsBuf.clear();
		this.texCoordsBuf.put(this.texCoords);
		this.texCoordsBuf.limit(this.texCoords.length);
		this.texCoordsBuf.rewind();

		tmr.showTimeMS("    t-gl-buf");
		tmr.start();

		if (gl == null) {
			System.out.println("############  NULL GL for drawElements!");
		} else {
			gl.glVertexPointer(3, 5126, 0, this.verticesBuf);

			gl.glNormalPointer(5126, 0, this.normalsBuf);

			gl.glTexCoordPointer(2, 5126, 0, this.texCoordsBuf);

			gl.glDrawElements(5, this.triangleStripIndices.length, 5123, this.triangleIndicesBuf);

			gl.glDisableClientState(32884);
			gl.glDisableClientState(32885);
			gl.glDisableClientState(32888);
		}

		tmr.showTimeMS("    t-gl-call");
	}

	protected ShortBuffer newShortBuffer(int N) {
		int N_BYTES = N * (SHORT_SIZE / BITS_PER_BYTE);

		ByteBuffer bb = ByteBuffer.allocateDirect(N_BYTES);
		bb.order(ByteOrder.nativeOrder());

		return bb.asShortBuffer();
	}

	protected FloatBuffer newFloatBuffer(int N) {
		int N_BYTES = N * (FLOAT_SIZE / BITS_PER_BYTE);

		ByteBuffer bb = ByteBuffer.allocateDirect(N_BYTES);
		bb.order(ByteOrder.nativeOrder());

		return bb.asFloatBuffer();
	}

	protected boolean versionIsAtLeast22() {
		return this.VERSION_AS_3_DIGITS >= 220;
	}

	protected boolean versionIsAtLeast30() {
		return this.VERSION_AS_3_DIGITS >= 300;
	}

	protected class DuplicatesData {
		public short[] countDuplicatesList;
		public int[][] duplicateIndicesLists;

		protected DuplicatesData() {
		}
	}
}
