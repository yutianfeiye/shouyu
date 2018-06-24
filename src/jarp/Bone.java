package jarp;

import cas.CASTRSet;
import jautil.FourCCUtil;
import jautil.JAException;
import jautil.JAInputStream;
import jautil.JAOutputStream;
import jautil.geometry.Quaternion;
import jautil.geometry.TRTransform;
import jautil.geometry.TRUtil;
import jautil.geometry.Vector3f;
import java.io.IOException;
import java.util.ArrayList;

public class Bone {
	public static double RADS_TO_DEGS = Quaternion.RADS_TO_DEGS;

	public static double DEGS_TO_RADS = Quaternion.DEGS_TO_RADS;

	public static int LUPA_4CC = FourCCUtil.fourCCInt("LUPA");

	public static int RUPA_4CC = FourCCUtil.fourCCInt("RUPA");

	public static int LLRA_4CC = FourCCUtil.fourCCInt("LLRA");

	public static int RLRA_4CC = FourCCUtil.fourCCInt("RLRA");

	protected float length;

	protected Bone parent;

	protected Bone[] childBones;

	protected int fourCCName;

	protected int parentFourCCName;

	protected float[] translation;

	protected float[] rotation;

	protected TRTransform transform;

	protected boolean doSelfSlide;

	protected boolean doSkinSlide;

	protected Quaternion inverseInitRotationX;

	protected transient ArrayList<Bone> children;

	public Bone() {
		this.parent = null;
		this.fourCCName = 0;
		this.parentFourCCName = 0;
		this.translation = new float[3];
		this.rotation = new float[4];
		this.length = 0.0F;
		this.doSkinSlide = false;
		this.doSelfSlide = false;

		this.childBones = null;
		this.children = new ArrayList(8);

		this.transform = new TRTransform();
	}

	public Bone(JAInputStream jins) throws IOException {
		this(jins, false);
	}

	public Bone(JAInputStream jins, boolean useint4cc) throws IOException {
		this();
		String p4cc;
		if (useint4cc) {
			this.fourCCName = jins.readInt();
			this.parentFourCCName = jins.readInt();
			String fcc = FourCCUtil.fourCCString(this.fourCCName);
			p4cc = FourCCUtil.fourCCString(this.parentFourCCName);

		} else {
			String nm = jins.readString();
			String pnm = jins.readString();

			int fourcc = FourCCUtil.fourCCInt(nm);
			this.fourCCName = fourcc;
			this.parentFourCCName = FourCCUtil.fourCCInt(pnm);
		}

		Vector3f trans = new Vector3f(jins);
		trans.toFloats(this.translation);
		Quaternion rot = new Quaternion(jins);
		rot.toFloats(this.rotation);

		this.inverseInitRotationX = new Quaternion(jins);

		this.length = jins.readFloat();

		this.doSelfSlide = ((this.fourCCName == LUPA_4CC) || (this.fourCCName == RUPA_4CC));

		this.doSkinSlide = ((this.fourCCName == LLRA_4CC) || (this.fourCCName == RLRA_4CC));
	}

	public void setParent(Bone prnt) {
		this.parent = prnt;
	}

	public TRTransform getTransform() {
		return this.transform;
	}

	public Bone getParent() {
		return this.parent;
	}

	public boolean isRoot() {
		return this.parent == null;
	}

	public float[] getRotation() {
		return this.rotation;
	}

	public float[] getTranslation() {
		return this.translation;
	}

	public Bone[] getChildBones() {
		return this.childBones;
	}

	public int get4CC() {
		return this.fourCCName;
	}

	public int getParent4CC() {
		return this.parentFourCCName;
	}

	public float getLength() {
		return this.length;
	}

	public boolean doesSliding() {
		return (this.doSelfSlide) || (this.doSkinSlide) || ((this.parent != null) && (this.parent.doSkinSlide));
	}

	public boolean parentDoesSkinSliding() {
		return (this.parent != null) && (this.parent.doSkinSlide);
	}

	public boolean doSelfSliding() {
		return this.doSelfSlide;
	}

	public boolean doSkinSliding() {
		return this.doSkinSlide;
	}

	public String getPRString() {
		return TRUtil.stringForTR(this.fourCCName, this.translation, this.rotation);
	}

	public void setRotation(float[] rot) {
		this.rotation = rot;
	}

	public void addChild(Bone cb) {
		this.children.add(cb);
	}

	public void fixChildren() {
		this.childBones = null;

		int NC = this.children.size();

		this.childBones = new Bone[NC];
		this.children.toArray(this.childBones);

		this.children.clear();
		this.children = null;
	}

	public void save(JAOutputStream jouts) throws IOException {
		save(jouts, false);
	}

	public void save(JAOutputStream jouts, boolean useint4cc) throws IOException {
		if (useint4cc) {
			jouts.writeInt(this.fourCCName);
			jouts.writeInt(this.parentFourCCName);

		} else {
			jouts.write4CCString(this.fourCCName);
			jouts.write4CCString(this.parentFourCCName);
		}

		for (int i = 0; i != 3; i++) {
			jouts.writeFloat(this.translation[i]);
		}

		for (int i = 0; i != 4; i++) {
			jouts.writeFloat(this.rotation[i]);
		}

		this.inverseInitRotationX.save(jouts);

		jouts.writeFloat(this.length);
	}

	public Vector3f getGlobalPosition() {
		Vector3f result = new Vector3f();
		this.transform.transformPoint(result);

		return result;
	}

	public void getGlobalPosition(Vector3f result) {
		result.set(0.0F, 0.0F, 0.0F);
		this.transform.transformPoint(result);
	}

	public void assignNewTRData(CASTRSet newtrs, float scale) {
		this.rotation = newtrs.getRotation();

		TRUtil.setScaledTranslation(this.translation, newtrs.getTranslation(), scale);
	}

	public void assignNewTRData(CASTRSet newtrs) {
		this.rotation = newtrs.getRotation();
	}

	protected transient Quaternion tempQRot = new Quaternion();

	public void computeGlobalTransforms(float rootOffset) throws JAException {
		if (!isRoot()) {
			throw new JAException("Root offset cannot be applied to non-root bone.");
		}

		float[] offsetTrans = new float[3];
		TRUtil.setTranslation(offsetTrans, this.translation);
		offsetTrans[1] += rootOffset;
		this.transform.set(this.rotation, offsetTrans);

		int NC = this.childBones.length;
		for (int i = 0; i != NC; i++) {
			this.childBones[i].computeGlobalTransforms();
		}
	}

	public void computeGlobalTransforms() {
		if (isRoot()) {
			this.transform.set(this.rotation, this.translation);
		} else {
			this.transform.setComposition(this.parent.getTransform(), this.rotation, this.translation);
		}

		int NC = this.childBones.length;
		for (int i = 0; i != NC; i++) {
			this.childBones[i].computeGlobalTransforms();
		}
	}

	public void getRotationInX(Quaternion q) {
		this.tempQRot.set(this.rotation);
		this.tempQRot.extractRotX(q);
		q.postMultiplyEq(this.inverseInitRotationX);
	}

	public float[] getRotationInDegrees() {
		float[] axrots = new float[3];

		this.tempQRot.set(this.rotation);
		this.tempQRot.toAxisRotations(axrots);

		return axrots;
	}

	public void lookAt(float camx, float camy, float camz, float lookatx, float lookaty, float lookatz) {
		Vector3f bonepos = getGlobalPosition();
		Vector3f lookat = new Vector3f(lookatx, lookaty, lookatz);

		Vector3f campos = new Vector3f(camx, camy, camz);

		Vector3f delta = campos.minus(bonepos);

		delta.unitize();

		double rx = Math.asin(delta.y()) * RADS_TO_DEGS;
		double ry = Math.asin(delta.x()) * RADS_TO_DEGS;
		Quaternion q = new Quaternion();
		q.fromAxisRotations((float) (ry / 2.0D), (float) (rx / 2.0D), 0.0F);

		float[] rot = new float[4];
		q.toFloats(rot);

		setRotation(rot);

		if (!isRoot()) {
			this.parent.setRotation(rot);
		}
	}
}
