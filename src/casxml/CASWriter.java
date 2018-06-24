package casxml;

import cas.CASFrame;
import cas.CASMorph;
import cas.CASTRSet;
import jautil.FourCCUtil;
import jautil.geometry.Quaternion;
import jautil.geometry.TRUtil;
import java.io.PrintWriter;
import java.io.Writer;
import sigmlanim.AnimatedSign;
import sigmlgen.playerctrl.AvatarSettings;
import sigmlgen.playerctrl.CameraSettings;

public class CASWriter {
	public static final String CAS_VERSION = "2.1";
	public static final String STD_ENCODING = "utf-8";
	public static final String STD_INDENT = "  ";
	public static final int LINE_LIMIT = 90;
	private static final float EPSILON_FOR_4_PLACES = 5.0E-5F;
	private static final float EPSILON_FOR_ROT_ZERO_XYZ = 0.01F;

	public static void writeDocument(Writer wrtr, String av, AnimatedSign[] signs) throws CASWriter.CASWriterException {
		CASWriter cwrtr = new CASWriter(wrtr, av, signs);
	}

	public static void writeDocument(Writer wrtr, String enc, String av, AnimatedSign[] signs)
			throws CASWriter.CASWriterException {
		CASWriter cwrtr = new CASWriter(wrtr, enc, av, signs);
	}

	private static final String[] ID_ROT_STRS = { "0", "0", "0", "1" };

	private static final int IX_X_ATTR = 1;

	private static final int IX_Y_ATTR = 3;

	private static final int IX_Z_ATTR = 5;

	private static final int IX_W_ATTR = 7;
	private static final int[] XYZW_ATTR_VAL_INDEX = { 1, 3, 5, 7 };

	private final PrintWriter P_WRITER;

	private final String ENCODING;

	private final String INDENT_UNIT;

	private final String VERSION;

	private String AVATAR;

	private CameraSettings CAMERA;

	private final AnimatedSign[] SIGNS;

	private int nBones;

	private int[] holdBone4CC;

	private float[][] holdTrans;

	private float[][] holdRots;

	private int fIndex;

	private int newBonesCount;

	private boolean newBonesAreComplete;

	private int[] newBoneIndices;
	private float[][] newTrans;
	private String[][] newRotStrs;
	private final Quaternion Q_NORM = new Quaternion();

	private String[] posAttrs = { CASHandler.X_TAG, null, CASHandler.Y_TAG, null, CASHandler.Z_TAG, null };

	private String[] rotAttrs = { CASHandler.X_TAG, null, CASHandler.Y_TAG, null, CASHandler.Z_TAG, null,
			CASHandler.W_TAG, null };

	private final String IN_CAS;

	private final String IN_FRAMES;

	private final String IN_FRAME;
	private final String IN_SIGN_START;
	private final String IN_MORPH;
	private final String IN_BONE;
	private final String IN_POS;
	private final String IN_ROT;
	private StringBuilder lineBuf;
	private String currentIndent;

	public static class CASWriterException extends Exception {
		public CASWriterException(String msg) {
			super();
		}
	}

	public CASWriter(Writer wrtr, String av, AnimatedSign[] signs) throws CASWriter.CASWriterException {
		this(wrtr, "utf-8", "  ", "2.1", av, signs);
	}

	public CASWriter(Writer wrtr, String enc, String av, AnimatedSign[] signs) throws CASWriter.CASWriterException {
		this(wrtr, enc, "  ", "2.1", av, signs);
	}

	public CASWriter(Writer wrtr, String enc, String inunit, String vn, String av, AnimatedSign[] signs)
			throws CASWriter.CASWriterException {
		this.P_WRITER = new PrintWriter(wrtr);
		this.ENCODING = enc;
		this.INDENT_UNIT = (inunit == null ? "" : inunit);
		this.VERSION = vn;
		this.AVATAR = av;
		this.CAMERA = null;
		this.SIGNS = signs;

		this.currentIndent = "";
		this.lineBuf = new StringBuilder(122);
		this.lineBuf.setLength(0);

		this.IN_CAS = "";
		this.IN_FRAMES = (this.IN_CAS + this.INDENT_UNIT);
		this.IN_FRAME = (this.IN_FRAMES + this.INDENT_UNIT);
		this.IN_SIGN_START = this.IN_FRAME;
		this.IN_MORPH = (this.IN_FRAME + this.INDENT_UNIT);
		this.IN_BONE = this.IN_MORPH;
		this.IN_POS = (this.IN_MORPH + this.INDENT_UNIT);
		this.IN_ROT = this.IN_POS;

		writeCAS();

		this.P_WRITER.flush();
		this.P_WRITER.close();
	}

	private void writeCAS() throws CASWriter.CASWriterException {
		writeXMLHeader();
		startBeginTagLine(this.IN_CAS, CASHandler.CAS_TAG);
		writeAttr(CASHandler.VERSION_TAG, this.VERSION);
		writeAttr(CASHandler.AVATAR_TAG, this.AVATAR);
		finishBeginTagLine();

		writeSigns();

		writeEndTagLine(this.IN_CAS, CASHandler.CAS_TAG);
	}

	private void writeXMLHeader() {
		this.lineBuf.append("<?xml version=\"1.0\" encoding=\"");
		this.lineBuf.append(this.ENCODING);
		this.lineBuf.append("\"?>");
		writeLine();
	}

	private void writeSigns() throws CASWriter.CASWriterException {
		int N_S = this.SIGNS.length;
		int nf = 0;
		for (AnimatedSign sign : this.SIGNS) {
			nf += sign.getFramesLimit() - sign.getFramesBase();
		}

		this.holdTrans = ((float[][]) null);
		this.holdRots = ((float[][]) null);

		startBeginTagLine(this.IN_FRAMES, CASHandler.FRAMES_TAG);
		writeAttr(CASHandler.COUNT_TAG, iStr(nf));
		writeAttr(CASHandler.SIGNCOUNT_TAG, iStr(N_S));
		finishBeginTagLine();

		Boolean allBones = Boolean.valueOf(true);

		for (int s = 0; s != N_S; s++) {
			AnimatedSign SIGN = this.SIGNS[s];

			if (SIGN.getAvatarSettings() != null) {
				String newAv = SIGN.getAvatarSettings().getName();
				if (newAv != this.AVATAR) {
					this.AVATAR = newAv;
					writeNewAvatar(newAv);
					allBones = Boolean.valueOf(true);
				}
			}

			if (SIGN.getCameraSettings() != null) {
				CameraSettings cam = SIGN.getCameraSettings();
				if ((this.CAMERA == null) || (!cam.equals(this.CAMERA))) {
					this.CAMERA = cam;
					writeNewCamera(cam);
				}
			}

			writeSignStart(SIGN, s);

			int F_LO = SIGN.getFramesBase();
			int F_HI = SIGN.getFramesLimit();

			for (int f = F_LO; f != F_HI; f++) {
				writeFrame(SIGN.getFrame(f), f, allBones);
				allBones = Boolean.valueOf(false);
			}
		}

		writeEndTagLine(this.IN_FRAMES, CASHandler.FRAMES_TAG);
	}

	private void writeSignStart(AnimatedSign sign, int sindex) {
		String[] SS_ATTRS = { CASHandler.INDEX_TAG, iStr(sindex), CASHandler.GLOSS_TAG, sign.getGloss() };

		writeLine();

		startElementTagLine(this.IN_SIGN_START, CASHandler.SIGNSTART_TAG);
		writeAttrs(SS_ATTRS);
		finishElementTagLine();
	}

	private void writeNewAvatar(String newAv) {
		String[] SS_ATTRS = { CASHandler.NAME_TAG, newAv };

		writeLine();

		startElementTagLine(this.IN_SIGN_START, CASHandler.AVATAR_TAG);
		writeAttrs(SS_ATTRS);
		finishElementTagLine();
	}

	private void writeNewCamera(CameraSettings cam) {
		String[] SS_ATTRS = { CASHandler.CX_TAG, Float.toString(cam.getCamX()), CASHandler.CY_TAG,
				Float.toString(cam.getCamY()), CASHandler.FOV_TAG, Float.toString(cam.getCamFOV()), CASHandler.PHI_TAG,
				Float.toString(cam.getCamPhi()), CASHandler.R_TAG, Float.toString(cam.getCamR()), CASHandler.THETA_TAG,
				Float.toString(cam.getCamTheta()) };

		writeLine();

		startElementTagLine(this.IN_SIGN_START, CASHandler.CAMERA_TAG);
		writeAttrs(SS_ATTRS);
		finishElementTagLine();
	}

	private void writeFrame(CASFrame FRAME, int F, Boolean allBones) throws CASWriter.CASWriterException {
		this.fIndex = F;

		CASMorph[] MORPHS = FRAME.getMorphs();
		CASTRSet[] BONES = FRAME.getTRSets();

		if (allBones.booleanValue()) {
			makeBonesDataForFirstFrame(BONES);
		} else {
			updateBonesDataForNextFrame(BONES);
		}

		String[] SOME_FRM_ATTRS = { CASHandler.TIME_TAG, fStr(FRAME.getTime()), CASHandler.DURATION_TAG,
				fStr(FRAME.getDuration()), CASHandler.BONECOUNT_TAG, iStr(this.newBonesCount),
				CASHandler.MORPHCOUNT_TAG, iStr(MORPHS == null ? 0 : MORPHS.length) };

		writeLine();

		startBeginTagLine(this.IN_FRAME, CASHandler.FRAME_TAG);
		writeAttr(CASHandler.INDEX_TAG, iStr(F));
		writeAttrIfTrue(CASHandler.ISCOMPLETE_TAG, this.newBonesAreComplete);
		writeAttrs(SOME_FRM_ATTRS);
		finishBeginTagLine();

		writeMorphs(MORPHS);
		writeBones();

		writeEndTagLine(this.IN_FRAME, CASHandler.FRAME_TAG);
	}

	private void writeMorphs(CASMorph[] morphs) {
		int N_M = morphs == null ? 0 : morphs.length;
		for (int m = 0; m != N_M; m++) {
			writeMorph(morphs[m]);
		}
	}

	private void writeMorph(CASMorph morph) {
		String[] M_ATTRS = { CASHandler.NAME_TAG, tag4(morph.getName()), CASHandler.VALUE_TAG,
				fStr(morph.getAmount()) };

		startElementTagLine(this.IN_MORPH, CASHandler.MORPH_TAG);
		writeAttrs(M_ATTRS);
		finishElementTagLine();
	}

	private void writeBones() {
		int N_NB = this.newBonesCount;

		boolean NEED_B_IX_ATTR = !this.newBonesAreComplete;

		for (int inb = 0; inb != N_NB; inb++) {
			int B = this.newBoneIndices[inb];
			writeBone(this.holdBone4CC[B], this.newTrans[inb], this.newRotStrs[inb], B, NEED_B_IX_ATTR);
		}
	}

	private void writeBone(int B_4CC, float[] TRAN, String[] ROT_STRS, int B_IX, boolean DO_IX_ATTR) {
		startBeginTagLine(this.IN_BONE, CASHandler.BONE_TAG);
		writeAttr(CASHandler.NAME_TAG, tag4(B_4CC));
		if (DO_IX_ATTR)
			writeAttr(CASHandler.INDEX_TAG, iStr(B_IX));
		finishBeginTagLine();

		if (TRAN != null) {
			String[] POS_ATTRS = this.posAttrs;
			setTranAttrValues(POS_ATTRS, TRAN);
			startElementTagLine(this.IN_POS, CASHandler.POSITION_TAG);
			writeAttrs(POS_ATTRS);
			finishElementTagLine();
			this.holdTrans[B_IX] = TRAN;
		}

		if (ROT_STRS != null) {
			String[] ROT_ATTRS = this.rotAttrs;
			setRotAttrValues(ROT_ATTRS, ROT_STRS);
			startElementTagLine(this.IN_ROT, CASHandler.QROTATION_TAG);
			writeAttrs(ROT_ATTRS);
			finishElementTagLine();
		}

		writeEndTagLine(this.IN_BONE, CASHandler.BONE_TAG);
	}

	private void makeBonesDataForFirstFrame(CASTRSet[] BONES) {
		int N_B = this.nBones = BONES.length;

		this.holdBone4CC = new int[N_B];
		this.holdTrans = new float[N_B][];
		this.holdRots = new float[N_B][];

		this.newBoneIndices = new int[N_B];
		this.newTrans = new float[N_B][];
		this.newRotStrs = new String[N_B][];

		for (int b = 0; b != N_B; b++) {
			CASTRSet BONE = BONES[b];
			this.holdBone4CC[b] = BONE.getFourCC();
			this.holdTrans[b] = (this.newTrans[b] = BONE.getTranslation());

			float[] ROT = checkForIdRotation(BONE.getRotation());
			String[] R_STRS = getRotStrings(ROT);
			this.holdRots[b] = rotFromRotStrs(R_STRS);
			this.newRotStrs[b] = R_STRS;

			this.newBoneIndices[b] = b;
		}

		this.newBonesCount = N_B;
		this.newBonesAreComplete = true;
	}

	private void updateBonesDataForNextFrame(CASTRSet[] BONES) throws CASWriter.CASWriterException {
		int N_B = this.nBones;

		int ib = 0;
		int nr = 0;
		int nt = 0;

		for (int b = 0; b != N_B; b++) {
			CASTRSet BONE = BONES[b];

			if (BONE.getFourCC() != this.holdBone4CC[b]) {

				throw new CASWriterException("Frame " + this.fIndex + ": bone at " + b + " has bad tag: "
						+ tag4(BONE.getFourCC()) + ", not " + tag4(this.holdBone4CC[b]) + ".");
			}

			float[] B_TRAN = BONE.getTranslation();

			boolean NEW_T = !CASTRSet.equalTrans(this.holdTrans[b], B_TRAN);

			float[] B_ROT = checkForIdRotation(BONE.getRotation());

			boolean R_CHANGE = !CASTRSet.approxEqRots(this.holdRots[b], B_ROT);

			boolean new_r = R_CHANGE;
			float[] nbrot = B_ROT;
			String[] nbrstrs = null;

			if (R_CHANGE) {

				nbrstrs = getRotStrings(B_ROT);
				nbrot = rotFromRotStrs(nbrstrs);
				new_r = !CASTRSet.approxEqRots(this.holdRots[b], nbrot);
			}

			if ((NEW_T) || (new_r)) {
				this.newTrans[ib] = (NEW_T ? B_TRAN : null);
				if (NEW_T) {
					nt++;
					this.holdTrans[b] = B_TRAN;
				}

				this.newRotStrs[ib] = (new_r ? nbrstrs : null);
				if (new_r) {
					nr++;
					this.holdRots[b] = nbrot;
				}
				this.newBoneIndices[ib] = b;
				ib++;
			}
		}

		this.newBonesCount = ib;
		this.newBonesAreComplete = ((nt == N_B) && (nr == N_B));
	}

	private float[] checkForIdRotation(float[] rot) {
		float[] trot = rot;

		if (treatAsIDRot(rot)) {
			trot = TRUtil.ID_ROT_ARRAY;
		} else if (1.0F < rot[3]) {
			trot = normalizeRot(rot);
			if (treatAsIDRot(trot)) {
				trot = TRUtil.ID_ROT_ARRAY;
			}
		}
		return trot;
	}

	private String[] getRotStrings(float[] ROT) {
		String[] rstrs = ID_ROT_STRS;

		if (ROT != TRUtil.ID_ROT_ARRAY) {
			rstrs = new String[4];
			for (int i = 0; i != 4; i++) {
				rstrs[i] = fStr(ROT[i]);
			}
		}
		return rstrs;
	}

	private float[] rotFromRotStrs(String[] R_STRS) {
		float[] rot = TRUtil.ID_ROT_ARRAY;

		if (R_STRS != ID_ROT_STRS) {
			rot = new float[4];
			for (int i = 0; i != 4; i++) {
				rot[i] = Float.parseFloat(R_STRS[i]);
			}
		}

		return rot;
	}

	private float[] normalizeRot(float[] rot) {
		this.Q_NORM.set(rot);
		this.Q_NORM.normalize();
		return this.Q_NORM.asFloats();
	}

	private void setTranAttrValues(String[] attrs, float[] VALS) {
		for (int i = 0; i != VALS.length; i++) {
			attrs[XYZW_ATTR_VAL_INDEX[i]] = fStr(VALS[i]);
		}
	}

	private void setRotAttrValues(String[] attrs, String[] ROT_STRS) {
		for (int i = 0; i != ROT_STRS.length; i++) {
			attrs[XYZW_ATTR_VAL_INDEX[i]] = ROT_STRS[i];
		}
	}

	private void startElementTagLine(String indent, String type) {
		startBeginTagLine(indent, type);
	}

	private void startBeginTagLine(String indent, String type) {
		this.currentIndent = indent;
		this.lineBuf.append(indent).append('<').append(type);
	}

	private void writeEndTagLine(String indent, String type) {
		this.currentIndent = indent;
		this.lineBuf.append(indent).append("</").append(type).append('>');
		writeLine();
	}

	private void finishBeginTagLine() {
		finishTagLine(false);
	}

	private void finishElementTagLine() {
		finishTagLine(true);
	}

	private void finishTagLine(boolean iseltag) {
		this.lineBuf.append(iseltag ? "/>" : ">");
		writeLine();
	}

	private void writeLine() {
		this.P_WRITER.println(this.lineBuf.toString());
		this.lineBuf.setLength(0);
	}

	private void writeAttrs(String[] apairs) {
		int N = apairs.length;
		for (int i = 0; i != N; i += 2) {
			writeAttr(apairs[i], apairs[(i + 1)]);
		}
	}

	private void writeAttr(String name, String val) {
		String initSpace = " ";

		if (90 <= this.lineBuf.length()) {
			writeLine();
			this.lineBuf.append(this.currentIndent).append(this.INDENT_UNIT);
			initSpace = this.INDENT_UNIT;
		}

		this.lineBuf.append(initSpace).append(name).append('=').append('"').append(val).append('"');
	}

	private void writeAttrIfTrue(String name, boolean b) {
		if (b)
			writeAttr(name, "true");
	}

	private static String tag4(int fourcc) {
		return FourCCUtil.fourCCString(fourcc);
	}

	private static String suppressZeros(float f) {
		String rep = String.format("%.4f", new Object[] { Float.valueOf(f) });
		while (rep.endsWith("0")) {
			rep = rep.substring(0, rep.length() - 1);
		}
		return rep;
	}

	private static String fStr(float f) {
		return fStr(f, 5.0E-5F);
	}

	private static String fStr(float f, float EPSILON) {
		return approxInt(f, EPSILON) ? iStr(f) : suppressZeros(f);
	}

	private static String iStr(float f) {
		return iStr(Math.round(f));
	}

	private static String iStr(int i) {
		return "" + i;
	}

	private static boolean approxInt(float f) {
		return approxInt(f, 5.0E-5F);
	}

	private static boolean approxInt(float f, float EPSILON) {
		boolean isapint = false;

		float ABS_F = Math.abs(f);
		int INT_F = Math.round(f);
		float DIFF = Math.abs(f - INT_F);

		if (ABS_F <= 1.0F) {
			isapint = DIFF < EPSILON;
		} else {
			int ABS_INT_F = Math.abs(INT_F);
			isapint = DIFF / ABS_INT_F < EPSILON;
		}

		return isapint;
	}

	private static final boolean treatAsIDRot(float[] rot) {
		return (approxOneForRot(rot[3])) && (approxZeroForRot(rot[0])) && (approxZeroForRot(rot[1]))
				&& (approxZeroForRot(rot[2]));
	}

	private static final boolean rotXYZApproxZero(float[] rot) {
		return (approxZeroForRot(rot[0])) && (approxZeroForRot(rot[1])) && (approxZeroForRot(rot[2]));
	}

	public static final boolean approxOneForRot(float x) {
		return approxOne(x, 5.0E-5F);
	}

	public static final boolean approxOne(float x, float EPS) {
		return Math.abs(x - 1.0F) < EPS;
	}

	public static final boolean approxZeroForRot(float x) {
		return approxZero(x, 0.01F);
	}

	public static final boolean approxZero(float x, float EPS) {
		return Math.abs(x) < EPS;
	}
}
