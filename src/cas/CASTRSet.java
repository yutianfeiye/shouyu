package cas;

import jautil.FourCCUtil;
import jautil.JAInputStream;
import jautil.JAOutputStream;
import java.io.IOException;

public class CASTRSet {
	protected float[] rotation;
	protected float[] translation;
	protected int fourCCName;

	public CASTRSet(String name, float[] rot, float[] trans) {
		this(FourCCUtil.fourCCInt(name), rot, trans);
	}

	public CASTRSet(int name4cc, float[] rot, float[] trans) {
		this.fourCCName = name4cc;
		this.rotation = rot;
		this.translation = trans;
	}  

	public CASTRSet(CASTRSet trs) {
		this.rotation = new float[4];
		this.translation = new float[3];

		set(trs);
	}

	public CASTRSet(JAInputStream jins) throws IOException {
		this.fourCCName = jins.readInt();

		this.rotation = new float[4];
		this.translation = new float[3];

		for (int t = 0; t != 3; t++) {
			this.translation[t] = jins.readFloat();
		}
		for (int r = 0; r != 4; r++) {
			this.rotation[r] = jins.readFloat();
		}
	}

	public boolean has4CCName(int nm4cc) {
		return this.fourCCName == nm4cc;
	}

	public int getFourCC() {
		return this.fourCCName;
	}

	public float[] getTranslation() {
		return this.translation;
	}

	public float[] getRotation() {
		return this.rotation;
	}

	public void set(CASTRSet trs) {
		setFourCC(trs.getFourCC());
		setTranslation(trs);
		setRotation(trs);
	}

	public int hashCode() {
		int thc = this.translation == null ? 0 : this.translation.hashCode();
		int rhc = this.rotation == null ? 0 : this.rotation.hashCode();
		return this.fourCCName + thc + rhc;
	}

	public boolean matches(Object other) {
		boolean eq = this == other;

		if ((!eq) && ((other instanceof CASTRSet))) {
			CASTRSet TRSET = (CASTRSet) other;

			int FOURCC = TRSET.getFourCC();
			float[] TRANS = TRSET.getTranslation();
			float[] ROT = TRSET.getRotation();

			if ((this.fourCCName == FOURCC) && (equalTrans(this.translation, TRANS))
					&& (approxEqRots(this.rotation, ROT))) {
				eq = true;
			}
		}

		return eq;
	}

	public static final boolean equalTrans(float[] ta, float[] tb) {
		return (ta[0] == tb[0]) && (ta[1] == tb[1]) && (ta[2] == tb[2]);
	}

	public static final boolean approxEqRots(float[] ra, float[] rb) {
		return (approxEq(ra[0], rb[0])) && (approxEq(ra[1], rb[1])) && (approxEq(ra[2], rb[2]))
				&& (approxEq(ra[3], rb[3]));
	}

	protected final void setFourCC(int fcctag) {
		this.fourCCName = fcctag;
	}

	protected void setRotation(CASTRSet prs) {
		float[] ROT = prs.getRotation();

		for (int r = 0; r != 4; r++) {
			this.rotation[r] = ROT[r];
		}
	}

	protected void setTranslation(CASTRSet prs) {
		float[] TRANS = prs.getTranslation();

		for (int t = 0; t != 3; t++) {
			this.translation[t] = TRANS[t];
		}
	}

	public static boolean approxEq(float x, float y) {
		float EPS = 5.0E-5F;
		float DIFF = Math.abs(x - y);
		float SIZE = Math.max(Math.abs(x), Math.abs(y));

		return DIFF < 5.0E-5F;
	}

	public void save(JAOutputStream jouts) throws IOException {
		jouts.writeInt(this.fourCCName);

		for (int t = 0; t != 3; t++) {
			jouts.writeFloat(this.translation[t]);
		}
		for (int r = 0; r != 4; r++) {
			jouts.writeFloat(this.rotation[r]);
		}
	}
}
