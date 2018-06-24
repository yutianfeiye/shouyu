package jarp;

import cas.CASFrame;
import cas.CASMorph;
import cas.CASTRSet;
import com.jogamp.opengl.GL2;
import com.jogamp.opengl.glu.gl2.GLUgl2;
import jautil.FourCCUtil;
import jautil.JAException;
import jautil.JAIO;
import jautil.JAInputStream;
import jautil.JAOptions;
import jautil.JAOutputStream;
import jautil.JATimer;
import jautil.geometry.Quaternion;
import jautil.geometry.TRTransform;
import jautil.geometry.Vector3f;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintStream;
import java.net.URI;
import java.net.URL;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import util.LoggerConfig;

public class Character {
	private static Logger logger = LogManager.getLogger();
	public static final boolean USE_EMBEDDED_TEXTURE = false;
	public static final float METRES_TO_INCHES_FLT = 39.37F;
	public static final float STD_AVATAR_HEIGHT_METRES = 1.8F;
	public static final float STD_AVATAR_HEIGHT_INCHES = 70.866F;
	public static final float STD_MAX_Y_METRES = 0.75F;

	public static void main(String[] args) throws IOException, JAException {
		File logConf = new File(System.getProperty("user.dir") + "/log4j2.xml");
		if (logConf.isFile()) {
			System.setProperty("log4j.configurationFile", logConf.getAbsoluteFile().toURI().toString());
		}
		logger = LogManager.getLogger();

		String AV_OLD_STR = args.length == 0 ? "avatardef.arp" : args[0];
		File AV_OLD_FILE = new File(AV_OLD_STR);
		String AV_OLD_FILE_STR = AV_OLD_FILE.getCanonicalPath();
		System.out.println("Initial avatar file: " + AV_OLD_FILE_STR);
		JAInputStream jins = new JAInputStream(new FileInputStream(AV_OLD_FILE));

		JATimer tmr = new JATimer();

		Character chrctr = new Character("file://" + AV_OLD_FILE_STR, jins);
		jins.close();
		String VER = chrctr.getVersion();
		tmr.showTimeMS("Character loaded (v" + VER + "):  t");

		String AV_NEW_STR = 2 <= args.length ? args[1] : AV_OLD_STR.replace(".arp", ".jarp");
		if (AV_NEW_STR.equals(AV_OLD_STR)) {
			System.out.print("OK to replace input file " + AV_NEW_STR + "? ");
			char reply = (char) System.in.read();
			if ((reply != 'y') && (reply != 'Y')) {
				throw new IOException("Cannot overwrite input file.");
			}
		}
		OutputStream outs = JAIO.validFileOutputStream(AV_NEW_STR);
		if (outs == null) {
			throw new JAException("Invalid output file: " + AV_NEW_STR);
		}
		File AV_NEW_FILE = new File(AV_NEW_STR);
		System.out.println("New avatar file:");
		System.out.println(AV_NEW_FILE.getCanonicalPath());

		JAOutputStream jouts = new JAOutputStream(outs);
		tmr.start();
		chrctr.save(jouts);
		jouts.close();

		String NEW_VER = VER.startsWith("3") ? "3.1" : VER;
		tmr.showTimeMS("Character written (v" + NEW_VER + "): t");
	}

	public static int HEAD_4CC = Skeleton.HEAD_4CC;

	public static int EYER_4CC = FourCCUtil.fourCCInt("EYER");

	public static int EYEL_4CC = FourCCUtil.fourCCInt("EYEL");

	private JAOptions jaOptions;

	private String avatarName;

	private String avatarURL;

	private String version;

	private boolean avatarFormatIsV3;

	private float scaleFromInches;

	private float scaleFromMetres;

	private float scale;

	private Vector3f volMin;

	private Vector3f volMax;

	private float[] materialReflectanceDA;

	private Mesh[] meshes;

	private CASTRSet[] defaultPose;

	private Skeleton skeleton;

	private String textureName;

	private float skeletonYOffset;
	private ImageHandler textureHandler;
	private AmbientManager ambientManager;
	private boolean selfSlidingEnabled = false;
	private boolean skinSlidingEnabled = false;
	private boolean autoLOD = false;
	private int currentLODLevel = 0;

	private int texID;

	private Bone headBone;

	private CASMorph[] currentMorphs;

	private float[] vectorsToAdjacentVertices;

	private Quaternion qWork = new Quaternion();

	public static boolean V21_IS_VJJ_FORMAT;

	public Character(String avurl, JAOptions jopts) {
		if (logger == null) {
			logger = LogManager.getLogger();
		}

		this.avatarName = "(minimal)";
		this.avatarURL = avurl;
		this.jaOptions = jopts;
		boolean HAVE_OPTS = jopts != null;

		V21_IS_VJJ_FORMAT = (HAVE_OPTS) && (jopts.getBooleanProperty("v21.avatar.is.vjj.arp"));

		this.vectorsToAdjacentVertices = new float[80];

		this.currentMorphs = new CASMorph[0];

		this.skinSlidingEnabled = ((HAVE_OPTS) && (jopts.doAvatarSkinSliding()));
		this.selfSlidingEnabled = ((HAVE_OPTS) && (jopts.doAvatarSelfSliding()));

		this.scale = 1.0F;

		this.skeletonYOffset = 0.0F;
	}

	public Character(JAInputStream jins) throws IOException, JAException {
		this(null, jins, null, null, null, null);
	}

	public Character(String avurl, JAInputStream jins) throws IOException, JAException {
		this(avurl, jins, null, null, null, null);
	}

	public Character(String avurl, JAInputStream jins, String rqstversion, GL2 gl, GLUgl2 glu, JAOptions jopts)
			throws IOException, JAException {
		this(avurl, jins, rqstversion, gl, glu, jopts, "(unknown)");
	}

	public Character(String avurl, JAInputStream jins, String rqstversion, GL2 gl, GLUgl2 glu, JAOptions jopts,
			String avname) throws IOException, JAException {
		this(avurl, jopts);
		this.avatarName = avname;

		String inversion = jins.readString();
		if ((rqstversion != null) && (!inversion.equals(rqstversion))) {
			throw new JAException("Avatar version error: wanted '" + rqstversion + "' but got '" + inversion + "'.");
		}

		this.version = inversion;
		int VER_3_DIG = versionAs3Digits();
		this.avatarFormatIsV3 = (VER_3_DIG >= 300);

		if (VER_3_DIG == 310) {
			loadInV31Format(jins, gl, glu);
		} else if ((this.version.equals("2.2")) || (this.avatarFormatIsV3)) {
			loadInPostV22Format(jins, gl, glu);
		} else if ((this.version.equals("2.1")) && (!V21_IS_VJJ_FORMAT)) {
			loadInStdV21Format(jins, gl, glu);
		} else if ((this.version.equals("2.0")) || (V21_IS_VJJ_FORMAT)) {
			loadInStdV20Format(jins, gl, glu);
		} else {
			throw new JAException("Avatar version " + this.version + " is not viable!");
		}

		setDistanceScaleFactors();
		fixBoneReferencesForMeshes();
		this.headBone = this.skeleton.getBone(HEAD_4CC);

		if ((gl != null) && (glu != null)) {
			generateFrame();
		}
	}

	public String getVersion() {
		return this.version;
	}

	public boolean versionIsAtLeast22() {
		return versionAs3Digits() >= 220;
	}

	public boolean hasV3Scaling() {
		return this.avatarFormatIsV3;
	}

	public float heightMetres() {
		return (this.volMax.y() - this.volMin.y()) / this.scaleFromMetres;
	}

	public float maxYMetres() {
		return this.volMax.y() / this.scaleFromMetres;
	}

	public float inchesToInternal() {
		return this.scaleFromInches;
	}

	public float metresToInternal() {
		return this.scaleFromMetres;
	}

	public float rootYMetres() {
		float rooty = getBone(Skeleton.ROOT_4CC).getTranslation()[1];

		return rooty / this.scaleFromMetres;
	}

	public float adjustViewYInternal() {
		float MAX_Y_DIFF_M = maxYMetres() - 0.75F;

		return MAX_Y_DIFF_M * metresToInternal();
	}

	public int getMeshCount() {
		return this.meshes.length;
	}

	public Skeleton getSkeleton() {
		return this.skeleton;
	}

	public Bone getBone(int id) {
		return this.skeleton.getBone(id);
	}

	public void setFrame(CASFrame frame) {
		this.skeleton.setBones(frame.getTRSets());

		this.currentMorphs = frame.getMorphs();
	}

	public AmbientManager getAmbientManager() {
		return this.ambientManager;
	}

	public CASFrame getInitPose() {
		return new CASFrame(0.0F, 40.0F, this.defaultPose, null);
	}

	protected void setDistanceScaleFactors() {
		this.scaleFromMetres = (hasV3Scaling() ? (this.volMax.y() - this.volMin.y()) / 1.8F : 39.37F);

		this.scaleFromInches = (this.scaleFromMetres / 39.37F);
	}

	protected boolean hasAmbientMotion() {
		return this.ambientManager != null;
	}

	protected void loadInV31Format(JAInputStream jins, GL2 gl, GLUgl2 glu) throws IOException, JAException {
		loadScale(jins);
		loadVolumeLimits(jins);
		loadMaterialReflectance(jins);
		loadSkeletonYOffset(jins);
		loadMeshes(jins);
		loadInitPose(jins);
		loadSkeletonWithInt4CC(jins);
		loadAmbientMotionDef(jins);
		loadTexturePostV22(jins, gl, glu);
	}

	protected void loadInPostV22Format(JAInputStream jins, GL2 gl, GLUgl2 glu) throws IOException, JAException {
		logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker,
				"Character: Load avatar " + this.avatarName + ": v=" + this.version);

		loadScale(jins);
		loadVolumeLimits(jins);
		loadMaterialReflectance(jins);
		loadSkeletonYOffset(jins);
		loadMeshes(jins);
		loadInitPose(jins);
		loadSkeleton(jins);

		loadTexturePostV22(jins, gl, glu);

		int afcount = -1;
		try {
			afcount = jins.readInt();
		} catch (IOException iox) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.AVATARMarker, "Character load: no ambient data");
		}

		CASFrame[] ambframes = null;
		if (0 <= afcount) {
			ambframes = loadAmbientFramesTEMP(afcount, jins);
		}

		this.ambientManager = ((ambframes == null) || (ambframes.length == 0) ? null
				: new AmbientManager(ambframes, 25.0F));

		if (hasAmbientMotion()) {
			logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker,
					"Character created AmbientManager for Post V22");
		}
	}

	protected void loadInStdV21Format(JAInputStream jins, GL2 gl, GLUgl2 glu) throws IOException, JAException {
		logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker,
				"Character: Load avatar " + this.avatarName + ": v=" + this.version + "  vjj-21=" + V21_IS_VJJ_FORMAT);

		loadScale(jins);
		loadVolumeLimits(jins);
		loadMaterialReflectance(jins);
		loadSkeletonYOffset(jins);
		loadMeshes(jins);
		loadInitPose(jins);
		loadSkeleton(jins);
		loadTextureImageV21(jins, gl, glu);
	}

	protected void loadInStdV20Format(JAInputStream jins, GL2 gl, GLUgl2 glu) throws IOException, JAException {
		logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker,
				"Character: Load avatar " + this.avatarName + ": v=" + this.version);

		loadScale(jins);
		loadVolumeLimits(jins);
		loadMeshes(jins);
		loadInitPose(jins);
		loadSkeleton(jins);
		loadMaterialReflectance(jins);
		loadTextureFileName(jins);
		loadSkeletonYOffset(jins);
		loadTextureImageV21(jins, gl, glu);
	}

	protected void loadScale(JAInputStream jins) throws IOException {
		this.scale = jins.readFloat();
	}

	protected void loadVolumeLimits(JAInputStream jins) throws IOException {
		this.volMin = new Vector3f(jins);
		this.volMax = new Vector3f(jins);
	}

	protected void loadMeshes(JAInputStream jins) throws IOException {
		int NM = jins.readInt();
		this.meshes = new Mesh[NM];

		int VERSION_AS_3_DIGITS = versionAs3Digits();
		for (int m = 0; m != NM; m++) {
			this.meshes[m] = new Mesh(jins, this.jaOptions, VERSION_AS_3_DIGITS);
		}
	}

	protected void loadInitPose(JAInputStream jins) throws IOException {
		int NPR = jins.readInt();
		this.defaultPose = new CASTRSet[NPR];

		for (int p = 0; p != NPR; p++) {
			this.defaultPose[p] = new CASTRSet(jins);
		}
	}

	protected void loadSkeleton(JAInputStream jins) throws IOException, JAException {
		this.skeleton = new Skeleton(jins);
	}

	protected void loadSkeletonWithInt4CC(JAInputStream jins) throws IOException, JAException {
		this.skeleton = new Skeleton(jins, true);
	}

	protected void loadMaterialReflectance(JAInputStream jins) throws IOException {
		this.materialReflectanceDA = new float[4];

		this.materialReflectanceDA[0] = jins.readFloat();
		this.materialReflectanceDA[1] = jins.readFloat();
		this.materialReflectanceDA[2] = jins.readFloat();

		this.materialReflectanceDA[3] = 1.0F;
	}

	protected void loadTextureFileName(JAInputStream jins) throws IOException {
		this.textureName = jins.readString();
	}

	protected void loadSkeletonYOffset(JAInputStream jins) throws IOException {
		this.skeletonYOffset = jins.readFloat();
	}

	protected void loadTexturePostV22(JAInputStream jins, GL2 gl, GLUgl2 glu) throws IOException, JAException {
		loadTextureFileName(jins);

		boolean IS_EMBEDDED_TXTR_0 = jins.readBoolean();
		boolean IS_COMPRESSED_TXTR_1 = jins.readBoolean();
		boolean IS_PNG_TXTR_2 = jins.readBoolean();
		boolean IS_TGA_TXTR_3 = jins.readBoolean();
		boolean IS_JIB_TXTR_4 = jins.readBoolean();

		boolean IS_FLIPPED_IMG_5 = jins.readBoolean();
		boolean JUNK_TXTR_J;
		for (int j = 6; j != 12; j++) {
			JUNK_TXTR_J = jins.readBoolean();
		}

		logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker, "LOAD-TEXTURE, at least v2.2 ...");
		logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker, "Filename=     " + this.textureName);
		logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker, "(0)EMBEDDED=  " + IS_EMBEDDED_TXTR_0);
		logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker, "(1)COMPRESSED=" + IS_COMPRESSED_TXTR_1);
		logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker, "(2)PNG=       " + IS_PNG_TXTR_2);
		logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker, "(3)TGA=       " + IS_TGA_TXTR_3);
		logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker, "(4)JIB=       " + IS_JIB_TXTR_4);
		logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker, "(5)FLIPPED=   " + IS_FLIPPED_IMG_5);

		if (this.jaOptions != null) {
		}

		boolean TEXTURE_IS_SEPARATE_OPT = this.jaOptions.textureInputIsSeparate();

		if (IS_TGA_TXTR_3) {
			throw new JAException("Java ARP does not support TGA textures");
		}
		if ((!IS_PNG_TXTR_2) && (!IS_JIB_TXTR_4)) {

			logger.log(LoggerConfig.WARNLevel, LoggerConfig.AVATARMarker,
					"No Texture format given so default to PNG with flipped image");

			IS_PNG_TXTR_2 = true;
			IS_FLIPPED_IMG_5 = true;
		}

		this.textureHandler = new ImageHandler(this.jaOptions);

		if (TEXTURE_IS_SEPARATE_OPT) {

			String turl = this.jaOptions.textureInputURL();
			logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker,
					"Character: Ignoring '" + this.textureName + "' and " + "loading texture from URL: " + turl);

			this.textureHandler.loadTextureFromURL(gl, glu, turl);
		} else if (!IS_EMBEDDED_TXTR_0) {

			logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker,
					"Character: Loading separate texture file: '" + this.textureName + "'");

			URL T_URL = JAIO.resolveURL(this.avatarURL, this.textureName);
			this.textureHandler.loadTextureFromURL(gl, glu, T_URL, IS_COMPRESSED_TXTR_1, IS_PNG_TXTR_2,
					IS_FLIPPED_IMG_5);

		} else {

			this.textureHandler.loadTextureFromStreamV22(gl, glu, jins, IS_COMPRESSED_TXTR_1, IS_PNG_TXTR_2,
					IS_FLIPPED_IMG_5);
		}

		this.texID = this.textureHandler.getGLTextureID();
	}

	protected void loadTextureImageV21(JAInputStream jins, GL2 gl, GLUgl2 glu) throws IOException, JAException {
		int TE_FLAG = jins.readInt();
		boolean TEXTURE_IS_EMBEDDED = TE_FLAG == 1;

		boolean TEXTURE_IS_SEPARATE_OPT = this.jaOptions.textureInputIsSeparate();

		if ((!TEXTURE_IS_SEPARATE_OPT) && (!TEXTURE_IS_EMBEDDED)) {
			throw new JAException("Embedded texture image unavailable.");
		}

		this.textureHandler = new ImageHandler(this.jaOptions);

		if (TEXTURE_IS_SEPARATE_OPT) {

			String turl = this.jaOptions.textureInputURL();
			logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker,
					"Character: Ignoring '" + this.textureName + "' and " + "loading texture from URL: " + turl);

			this.textureHandler.loadTextureFromURL(gl, glu, turl, false);
		} else {
			this.textureHandler.loadTextureFromStreamV21(gl, glu, jins);
		}

		this.texID = this.textureHandler.getGLTextureID();
	}

	protected void loadAmbientMotionDef(JAInputStream jins) throws IOException {
		int N_AMB = jins.readInt();
		if (N_AMB == 0) {
			this.ambientManager = null;
		} else {
			loadAmbientData(jins, N_AMB);
		}
	}

	protected void loadAmbientData(JAInputStream jins, int N_AMB) throws IOException {
		float FPS = jins.readFloat();
		CASFrame[] A_FRAMES = new CASFrame[N_AMB];

		float t = 0.0F;
		float tnext = -1.0F;
		for (int f = 0; f != N_AMB; f++) {
			tnext = (f + 1) * 1000 / FPS;
			A_FRAMES[f] = new CASFrame(jins, t, tnext - t);
			t = tnext;
		}

		logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker,
				"Character: Loaded " + N_AMB + " ambient frames at " + FPS + "fps");

		this.ambientManager = new AmbientManager(A_FRAMES, FPS);
		logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker, "Character: AmbientManager created");
	}

	protected CASFrame[] loadAmbientFramesTEMP(int N_AF, JAInputStream jins) throws IOException {
		float DUR_25_FPS = 40.0F;

		CASFrame[] A_FRAMES = new CASFrame[N_AF];

		float oldt = 0.0F;
		for (int f = 0; f != N_AF; f++) {

			float t = jins.readFloat();

			int N_M = jins.readInt();
			CASMorph[] morphs = new CASMorph[N_M];

			for (int m = 0; m != N_M; m++) {
				int m4cc = FourCCUtil.fixFourCCInt(jins.readInt());
				float amt = jins.readFloat();
				morphs[m] = new CASMorph(m4cc, amt);
			}

			int N_B = jins.readInt();
			CASTRSet[] bones = new CASTRSet[N_B];

			for (int b = 0; b != N_B; b++) {
				bones[b] = new CASTRSet(jins);
			}

			if ((t == 0.0F) && (f != 0))
				t = oldt + 40.0F;
			if (f != 0) {
				A_FRAMES[(f - 1)].setDuration(t - oldt);
			}

			A_FRAMES[f] = new CASFrame(t, 0.0F, bones, morphs);

			oldt = t;
		}

		if (N_AF != 0) {
			A_FRAMES[(N_AF - 1)].setDuration(N_AF != 1 ? A_FRAMES[(N_AF - 2)].getDuration() : 40.0F);
		}

		int N_A = A_FRAMES.length;

		float A_DUR = N_A == 0 ? 0.0F : A_FRAMES[(N_A - 1)].getTime() + A_FRAMES[(N_A - 1)].getDuration();

		logger.log(LoggerConfig.WARNLevel, LoggerConfig.AVATARMarker,
				"Character: Ambient frames loaded #=" + N_A + " t_cycle=" + A_DUR + " (unexpected)");

		return A_FRAMES;
	}

	private void logAmbientData(CASFrame[] ambframes) {
		int N_A = ambframes.length;

		CASFrame AMB_FRM_LAST = ambframes[(N_A - 1)];
		float A_DUR = AMB_FRM_LAST.getTime() + AMB_FRM_LAST.getDuration();
		System.out.println("AMBIENT FRAMES  #=" + N_A + "  t_cycle=" + A_DUR);
		String MARKER_TAIL = "------------------------------------------------";

		String MARKER = "------------------------------------------------------------";

		float[] axrot = new float[3];
		Quaternion q = new Quaternion();

		int f = 0;
		for (CASFrame afrm : ambframes) {
			CASTRSet[] bones = afrm.getTRSets();
			CASMorph[] morphs = afrm.getMorphs();

			System.out.println("------------------------------------------------------------");
			System.out.printf("Ambient Frame %4d:  (t,dur)=(%6.3f,%6.3f)  #bone=%d  #morph=%d\n", new Object[] {

					Integer.valueOf(f), Float.valueOf(afrm.getTime()), Float.valueOf(afrm.getDuration()),
					Integer.valueOf(bones.length), Integer.valueOf(morphs.length) });

			System.out.println("--- BONES --------------------------------------------------");
			for (int b = 0; b != bones.length; b++) {
				CASTRSet BONE = bones[b];
				String btag = FourCCUtil.fourCCString(BONE.getFourCC());
				q.set(BONE.getRotation());
				q.toAxisRotations(axrot);
				System.out.printf("b=%2d %s  axis-rots: x:%6.3f y:%6.3f z:%6.3f   qrot:%s\n", new Object[] {

						Integer.valueOf(b), btag, Float.valueOf(axrot[0]), Float.valueOf(axrot[1]),
						Float.valueOf(axrot[2]), q.toString() });
			}

			System.out.println("--- MORPHS -------------------------------------------------");
			for (int m = 0; m != morphs.length; m++) {
				CASMorph MORPH = morphs[m];
				String mtag = FourCCUtil.fourCCString(MORPH.getName());
				float mamt = MORPH.getAmount();
				System.out.printf("m=%2d %s  amount=%5.3f\n",
						new Object[] { Integer.valueOf(m), mtag, Float.valueOf(mamt) });
			}

			f++;
		}

		System.out.println("------------------------------------------------------------");
	}

	protected void fixBoneReferencesForMeshes() {
		int NM = this.meshes.length;
		for (int m = 0; m != NM; m++) {
			this.meshes[m].fixBoneReferences(this.skeleton);
		}
	}

	public void save(JAOutputStream jouts) throws IOException {
		save(jouts, Boolean.valueOf(true));
	}

	public void save(JAOutputStream jouts, Boolean forceSep) throws IOException {
		String VERSION_STR = this.avatarFormatIsV3 ? "3.1" : "2.2";

		logger.log(LoggerConfig.INFOLevel, LoggerConfig.AVATARMarker, "Character: Save as version=" + VERSION_STR);

		savePreTexture(jouts, VERSION_STR);

		boolean VALID_OPTS = this.jaOptions != null;

		boolean SEPARATE_FILE_OPT = (forceSep.booleanValue())
				|| ((VALID_OPTS) && (this.jaOptions.textureOutputIsSeparate()));

		boolean COMPRESS_OPT = (!forceSep.booleanValue())
				&& ((!VALID_OPTS) || (this.jaOptions.textureOutputDoCompressed()));

		boolean V_FLIP_PNG_OPT = (VALID_OPTS) && (this.jaOptions.textureOutputDoFlipPNG());

		boolean PNG_OPT = (forceSep.booleanValue()) || ((VALID_OPTS) && (this.jaOptions.textureOutputDoPNG()));

		String tname = VALID_OPTS ? this.jaOptions.textureSeparateFileName() : null;
		if (tname == null) {
			tname = SEPARATE_FILE_OPT ? this.textureName : "";
		}
		jouts.writeString(tname);

		String tpath = JAIO.resolveURL(this.avatarURL, tname).getPath();
		if (VALID_OPTS) {
			String AV_URL = this.jaOptions.avatarDefinitionSaveURL();
			String T_URL = JAIO.resolveURL(AV_URL, tname).toString();
			tpath = JAIO.urlToOutputFilePath(T_URL);
		}

		if ((PNG_OPT) && (COMPRESS_OPT)) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.AVATARMarker,
					"Character: WARNING: Compressed output not supported for PNG format.");
		}

		boolean EMBED_TF_0 = !SEPARATE_FILE_OPT;
		boolean COMPRESS_TF_1 = (!PNG_OPT) && (COMPRESS_OPT);
		boolean PNG_TF_2 = PNG_OPT;
		boolean TGA_TF_3 = false;
		boolean JIB_TF_4 = !PNG_OPT;
		boolean V_FLIP_TF_5 = (PNG_OPT) && (V_FLIP_PNG_OPT);

		jouts.writeBoolean(EMBED_TF_0);
		jouts.writeBoolean(COMPRESS_TF_1);
		jouts.writeBoolean(PNG_TF_2);
		jouts.writeBoolean(false);
		jouts.writeBoolean(JIB_TF_4);
		jouts.writeBoolean(JIB_TF_4 ? false : V_FLIP_TF_5);

		for (int j = 6; j != 12; j++) {
			jouts.writeBoolean(false);
		}

		if (!EMBED_TF_0) {
			String FMT = PNG_TF_2 ? "PNG" : "JIB";
			logger.log(LoggerConfig.INFOLevel, LoggerConfig.AVATARMarker,
					"Character: Saved texture file-name (" + FMT + "): '" + tname + "' ('" + tpath + "')");
		}

		if (PNG_TF_2) {
			if (EMBED_TF_0) {
				this.textureHandler.saveJAImageAsPNG(jouts, V_FLIP_TF_5);
			} else {
				this.textureHandler.saveJAImageAsPNG(tpath, V_FLIP_TF_5);
			}

		} else if (EMBED_TF_0) {
			this.textureHandler.saveJAImageToStream(jouts, COMPRESS_TF_1);
		} else {
			this.textureHandler.saveJAImageToFile(tpath, COMPRESS_TF_1);
		}
	}

	protected void savePreTexture(JAOutputStream jouts, String versionstr) throws IOException {
		int VER_3DIG = vStringAs3Digits(versionstr);

		jouts.writeString(versionstr);

		jouts.writeFloat(this.scale);

		this.volMin.save(jouts);
		this.volMax.save(jouts);

		for (int d = 0; d != 3; d++) {
			jouts.writeFloat(this.materialReflectanceDA[d]);
		}

		jouts.writeFloat(this.skeletonYOffset);

		int NM = this.meshes.length;
		jouts.writeInt(NM);
		for (int m = 0; m != NM; m++) {
			this.meshes[m].save(jouts, !versionstr.startsWith("2.1"));
		}

		int NPRS = this.defaultPose.length;
		jouts.writeInt(NPRS);
		for (int p = 0; p != NPRS; p++) {
			this.defaultPose[p].save(jouts);
		}

		boolean SKEL_4CC_INT = 310 <= VER_3DIG;
		this.skeleton.save(jouts, SKEL_4CC_INT);

		if (310 <= VER_3DIG) {
			if (this.ambientManager == null) {
				jouts.writeInt(0);
			} else {
				saveAmbientData(jouts);
			}
		}
	}

	public void saveTextureFile() throws IOException {
		if (this.version.equals("2.2")) {
			this.textureHandler.saveJAImageToFile();
		} else {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.AVATARMarker,
					"Character: WARNING: save texture, unsupported version: " + this.version);
		}
	}

	protected void saveAmbientData(JAOutputStream jouts) throws IOException {
		float FPS = this.ambientManager.getAmbientFPS();

		CASFrame[] AMB_FRAMES = this.ambientManager.getAmbientFrames();

		int N_AF = AMB_FRAMES.length;

		jouts.writeInt(N_AF);
		jouts.writeFloat(FPS);

		for (int f = 0; f != N_AF; f++) {
			AMB_FRAMES[f].save(jouts);
		}
	}

	public void drawNormalsColour(GL2 gl) {
		Mesh mesh = this.meshes[this.currentLODLevel];
		mesh.drawNormalsColour(gl);
	}

	public void draw(GL2 gl) {
		Mesh mesh = this.meshes[this.currentLODLevel];
		mesh.draw(gl, this.materialReflectanceDA, this.texID);
	}

	public void generateFrame() throws JAException {
		generateFrame(0.0F, 0.0F, 0.0F);
	}

	private transient Vector3f cameraPosition = new Vector3f();

	private transient Vector3f relCameraPosition = new Vector3f();

	public void generateFrame(float camX, float camY, float camZ) throws JAException {
		if (this.autoLOD) {

			this.cameraPosition.set(camX, camY, camZ);
			Bone root = this.skeleton.getBone(Skeleton.ROOT_4CC);
			root.getGlobalPosition(this.relCameraPosition);
			this.relCameraPosition.minusEq(this.cameraPosition);
			float distance = this.relCameraPosition.length();

			int level = 0;
			int i = 0;
			int ii = this.meshes.length;
			while (i != ii) {
				float lodrange = this.meshes[i].getLODRange();
				if (lodrange != 0.0F) {
					level = i;
					if (distance <= lodrange)
						ii = i;
					else
						i++;
				} else {
					ii++;
				}
			}
			this.currentLODLevel = level;
		}

		buildSkin();
	}

	public void buildSkin() throws JAException {
		JATimer tmrall = new JATimer();
		tmrall.setDisplayDisabled(true);

		JATimer tmr = new JATimer();
		tmr.setDisplayDisabled(true);

		tmr.start();
		this.skeleton.computeGlobalBoneTransforms();
		tmr.showTimeMS("t-SKEL");

		Mesh mesh = this.meshes[this.currentLODLevel];

		tmr.start();
		applySkeletonPoseToMesh(mesh);
		tmr.showTimeMS("t-MESH");

		tmr.start();
		applyCurrentMorphSettings(mesh);
		tmr.showTimeMS("t-MRPH");

		tmr.start();
		mesh.copyDuplicateVerticesAndNormals();
		tmr.showTimeMS("t-DUPL");

		if (!this.avatarFormatIsV3) {
			tmr.start();
			updateNormalsForMorphs(mesh);
			tmr.showTimeMS("t-NORM");
		}

		tmrall.showTimeMS("______t-ALL");
	}

	protected void applySkeletonPoseToMesh(Mesh mesh) {
		int vnindex = 0;

		Vector3f vtxXYZ = new Vector3f();
		Vector3f nrmXYZ = new Vector3f();
		float[] vadj3 = new float[3];
		float[] nadj3 = new float[3];

		Quaternion twstq = new Quaternion();
		TRTransform twstbnxfrm = new TRTransform();

		MeshVertex[] points = mesh.getPoints();
		int NP = points.length;
		for (int p = 0; p != NP; p++) {
			vtxXYZ.setZero();
			nrmXYZ.setZero();

			MeshVertex POINT = points[p];

			int NB = POINT.getNumBones();

			for (int b = 0; b != NB; b++) {

				Bone BONE = POINT.getBone(b);
				Vector3f OFFSET = POINT.getOffset(b);
				Vector3f BASE_NORM = POINT.getBaseNormal(b);

				Quaternion usetwstq = !BONE.doesSliding() ? null : setTwistRotationIfAny(POINT, BONE, b, twstq);

				if (usetwstq == null) {

					TRTransform BONE_XFORM = BONE.getTransform();
					BONE_XFORM.transformPoint(OFFSET, vadj3);
					BONE_XFORM.rotateVector(BASE_NORM, nadj3);

				} else {
					twstbnxfrm.setComposition(BONE.getTransform(), usetwstq);
					twstbnxfrm.transformPoint(OFFSET, vadj3);
					twstbnxfrm.rotateVector(BASE_NORM, nadj3);
				}

				float WT = POINT.getWeight(b);
				vadj3[0] *= WT;
				vadj3[1] *= WT;
				vadj3[2] *= WT;
				nadj3[0] *= WT;
				nadj3[1] *= WT;
				nadj3[2] *= WT;
				vtxXYZ.plusEq(vadj3);
				nrmXYZ.plusEq(nadj3);
			}

			mesh.setVerticesVector(vnindex, vtxXYZ);
			mesh.setNormalsVector(vnindex, nrmXYZ);

			vnindex += 3;
		}
	}

	protected static float getScaleFactor(MeshVertex pt, Bone bn, int b) {
		float sfactor = pt.getBoneEndDistance(b) / bn.getLength();

		if (sfactor < 0.0F) {
			sfactor = 0.0F;
		} else if (1.0F < sfactor) {
			sfactor = 1.0F;
		}
		return sfactor;
	}

	protected Quaternion setTwistRotationIfAny(MeshVertex POINT, Bone BONE, int I_BONE, Quaternion TWIST_Q) {
		Quaternion useq = null;

		if ((BONE.doSelfSliding()) && (this.selfSlidingEnabled)) {
			useq = TWIST_Q;

			BONE.getRotationInX(TWIST_Q);
			TWIST_Q.negateXEq();
			TWIST_Q.scale(this.qWork, 1.0F - getScaleFactor(POINT, BONE, I_BONE));
		} else if ((BONE.doSkinSliding()) && (this.skinSlidingEnabled)) {
			if (I_BONE == 0) {

				useq = TWIST_Q;

				BONE.getChildBones()[0].getRotationInX(TWIST_Q);
				TWIST_Q.scale(this.qWork, getScaleFactor(POINT, BONE, I_BONE));
			} else {
				Bone mainBoneOfPoint = POINT.getBone(0);
				if (BONE.getParent() != mainBoneOfPoint) {

					useq = TWIST_Q;

					BONE.getChildBones()[0].getRotationInX(TWIST_Q);
				}
			}
		}

		return useq;
	}

	public static final Quaternion QUAT_Z_MINUS_PI_BY_2 = new Quaternion(

			(float) (1.0D / Math.sqrt(2.0D)), 0.0F, 0.0F, (float) (-1.0D / Math.sqrt(2.0D)));

	protected void applyCurrentMorphSettings(Mesh mesh) {
		int NM = this.currentMorphs.length;
		if (NM != 0) {

			TRTransform headxform = new TRTransform();
			headxform.setComposition(this.headBone.getTransform(), QUAT_Z_MINUS_PI_BY_2);

			MorphHandler MORPH_HDLR = mesh.getMorphHandler();
			float[] VERTICES = mesh.getVertices();
			float[] NORMALS = mesh.getNormals();

			Vector3f OFFSET = new Vector3f();
			float[] XYZ_ADJ = new float[3];

			for (int m = 0; m != NM; m++) {

				CASMorph MORPH = this.currentMorphs[m];
				applyShapeMorph(MORPH, headxform, VERTICES, NORMALS, MORPH_HDLR, XYZ_ADJ);
			}
		}
	}

	protected void applyShapeMorph(CASMorph MORPH, TRTransform TO_GLOBAL, float[] VERTICES, float[] NORMALS,
			MorphHandler MORPH_HDLR, float[] XYZ_ADJ) {
		float AMT = MORPH.getAmount();
		if (AMT != 0.0F) {

			MorphTarget M_TGT = MORPH_HDLR.getMorphTarget(MORPH.getName());
			if (M_TGT != null) {
				boolean MORPHS_HAVE_NORMS = this.avatarFormatIsV3;

				Vector3f meshNorm = new Vector3f();
				Vector3f morphNorm = new Vector3f();

				MorphSet[] MSETS = M_TGT.getMorphSets();
				int NMS = MSETS.length;
				for (int i = 0; i != NMS; i++) {

					MorphSet MSET = MSETS[i];
					int V3 = MSET.getVertexId() * 3;

					TO_GLOBAL.rotateVector(MSET.getOffset(), XYZ_ADJ);
					float SC_AMT = AMT * this.scale;
					VERTICES[V3] += XYZ_ADJ[0] * SC_AMT;
					VERTICES[(V3 + 1)] += XYZ_ADJ[1] * SC_AMT;
					VERTICES[(V3 + 2)] += XYZ_ADJ[2] * SC_AMT;

					if ((MORPHS_HAVE_NORMS) && (AMT > 0.0F)) {
						float N_AMT = Math.min(AMT, 1.0F);

						meshNorm.set(NORMALS, V3);
						morphNorm.set(MSET.getNormal());
						TO_GLOBAL.rotateVector(morphNorm);

						meshNorm.multScalarEq(1.0F - N_AMT);
						morphNorm.multScalarEq(N_AMT);

						meshNorm.plusEq(morphNorm);
						NORMALS[V3] = meshNorm.x();
						NORMALS[(V3 + 1)] = meshNorm.y();
						NORMALS[(V3 + 2)] = meshNorm.z();
					}
				}
			}
		}
	}

	protected void updateNormalsForMorphs(Mesh mesh) throws JAException {
		int NM = this.currentMorphs.length;
		if (NM != 0) {
			MorphHandler MORPH_HDLR = mesh.getMorphHandler();
			MeshVertex[] POINTS = mesh.getPoints();
			float[] VERTICES = mesh.getVertices();

			for (int m = 0; m != NM; m++) {

				CASMorph MORPH = this.currentMorphs[m];

				MorphTarget M_TGT = MORPH_HDLR.getMorphTarget(MORPH.getName());

				if (M_TGT != null) {
					MorphSet[] MSETS = M_TGT.getMorphSets();

					int NMS = MSETS.length;
					for (int i = 0; i != NMS; i++) {

						computeNormalForMeshVertex(mesh, MSETS[i].getVertexId());
					}
				}
			}
		}
	}

	protected void computeNormalForMeshVertex(Mesh mesh, int V) throws JAException {
		float[] VERTICES = mesh.getVertices();
		float[] VAV = this.vectorsToAdjacentVertices;

		float nmX = 0.0F;
		float nmY = 0.0F;
		float nmZ = 0.0F;

		int V3 = V * 3;

		int[] ADJ_VRTCS = mesh.getPoints()[V].getAdjacentVertices();
		int NAV = ADJ_VRTCS.length;
		int NAV3 = NAV * 3;

		float vtxX = VERTICES[(V3 + 0)];
		float vtxY = VERTICES[(V3 + 1)];
		float vtxZ = VERTICES[(V3 + 2)];

		int a3 = 0;
		for (int a = 0; a != NAV; a++) {
			int AA3 = ADJ_VRTCS[a] * 3;
			VERTICES[(AA3 + 0)] -= vtxX;
			VERTICES[(AA3 + 1)] -= vtxY;
			VERTICES[(AA3 + 2)] -= vtxZ;

			a3 += 3;
		}

		for (int aa = 0; aa != NAV3 - 3; aa += 3) {

			int A = aa + 3;
			int B = aa;
			nmX += VAV[(A + 1)] * VAV[(B + 2)] - VAV[(A + 2)] * VAV[(B + 1)];
			nmY += VAV[(A + 2)] * VAV[(B + 0)] - VAV[(A + 0)] * VAV[(B + 2)];
			nmZ += VAV[(A + 0)] * VAV[(B + 1)] - VAV[(A + 1)] * VAV[(B + 0)];
		}

		float NM_LEN = (float) Math.sqrt(nmX * nmX + nmY * nmY + nmZ * nmZ);

		if (NM_LEN < 1.0E-6F) {
		}

		float ONE_BY_NM_LEN = 1.0F / NM_LEN;
		nmX *= ONE_BY_NM_LEN;
		nmY *= ONE_BY_NM_LEN;
		nmZ *= ONE_BY_NM_LEN;

		mesh.setNormalsVector(V3, nmX, nmY, nmZ);
	}

	private int versionAs3Digits() {
		return vStringAs3Digits(this.version);
	}

	public static int vStringAs3Digits(String ver) {
		double dvn = 0.0D;
		try {
			dvn = Double.parseDouble(ver);
		} catch (NumberFormatException nfx) {
			logger.log(LoggerConfig.ERRORLevel, LoggerConfig.AVATARMarker, "Character: bad ARP version: " + ver);

			nfx.printStackTrace();
		}

		return (int) Math.round(dvn * 100.0D);
	}
}
