package jarp;

import cas.CASTRSet;
import jautil.FourCCUtil;
import jautil.JAException;
import jautil.JAInputStream;
import jautil.JAOutputStream;
import jautil.MapInt;
import java.io.IOException;
import java.io.PrintStream;

public class Skeleton {
	public static int ROOT_4CC = FourCCUtil.fourCCInt("ROOT");

	public static int HEAD_4CC = FourCCUtil.fourCCInt("HEAD");

	public static int NEC1_4CC = FourCCUtil.fourCCInt("NEC1");

	protected int numBones;

	protected Bone root;

	protected MapInt<Bone> bonesMap;

	protected Bone[] bones;

	protected float skeletonYOffset;

	public Skeleton() {
		this.numBones = 0;
		this.root = null;

		setSkeletonYOffset(0.0F);

		startNewBonesMap();
	}

	public Skeleton(JAInputStream jins) throws IOException {
		this(jins, false);
	}

	public Skeleton(JAInputStream jins, boolean useint4cc) throws IOException {
		startNewBonesMap();

		int NB = jins.readInt();
		this.numBones = NB;

		for (int b = 0; b != NB; b++) {

			Bone bone = new Bone(jins, useint4cc);
			int fourcc = bone.get4CC();

			this.bonesMap.put(fourcc, bone);

			if (fourcc == ROOT_4CC) {
				this.root = bone;
			}

			int parent4cc = bone.getParent4CC();
			if (FourCCUtil.isNonNull(parent4cc)) {
				Bone parent = getBone(parent4cc);
				bone.setParent(parent);
				parent.addChild(bone);
			}
		}

		fixChildrenForAllBones(NB);
	}

	public void scanBones(BoneHandler bhdlr) {
		scanBones(getBone(ROOT_4CC), bhdlr);
	}

	public void scanBones(Bone bone, BoneHandler bhdlr) {
		bhdlr.processBone(bone);
		for (Bone childb : bone.getChildBones()) {
			scanBones(childb, bhdlr);
		}
	}

	private void dumpHierarchy(Bone bone, String indent) {
		System.out
				.println(indent + bone.getPRString() + "  len=" + (float) ((int) (100.0F * bone.getLength()) * 0.01D));

		Bone[] childbones = bone.getChildBones();
		int N = childbones.length;
		String indentx = indent + "    ";
		for (int i = 0; i != N; i++) {
			dumpHierarchy(childbones[i], indentx);
		}
	}

	public Bone getBone(int fourcc) {
		return (Bone) this.bonesMap.get(fourcc);
	}

	public float getSkeletonYOffest() {
		return this.skeletonYOffset;
	}

	public void setSkeletonYOffset(float offset) {
		this.skeletonYOffset = offset;
	}

	public void save(JAOutputStream jouts) throws IOException {
		save(jouts, false);
	}

	public void save(JAOutputStream jouts, boolean useint4cc) throws IOException {
		jouts.writeInt(this.numBones);
		saveBoneHierarchy(jouts, useint4cc, this.root);
	}

	protected void saveBoneHierarchy(JAOutputStream jouts, boolean useint4cc, Bone bone) throws IOException {
		bone.save(jouts, useint4cc);

		Bone[] children = bone.getChildBones();
		if (children != null) {
			int NC = children.length;
			for (int i = 0; i != NC; i++) {
				saveBoneHierarchy(jouts, useint4cc, children[i]);
			}
		}
	}

	public void setBones(CASTRSet[] trsets) {
		setBones(trsets, 1.0F);
	}

	public void setBones(CASTRSet[] trsets, float scale) {
		int N = trsets.length;
		for (int n = 0; n != N; n++) {

			CASTRSet newtrset = trsets[n];
			Bone bone = getBone(newtrset.getFourCC());

			if (bone != null) {
				if (bone.isRoot()) {
					bone.assignNewTRData(newtrset, scale);
				} else {
					bone.assignNewTRData(newtrset);
				}
			}
		}
	}

	public void computeGlobalBoneTransforms() throws JAException {
		this.root.computeGlobalTransforms(this.skeletonYOffset);
	}

	protected void startNewBonesMap() {
		if (this.bonesMap == null) {
			this.bonesMap = new MapInt();
		} else {
			this.bonesMap.clear();
		}
	}

	protected void fixChildrenForAllBones(int NB) {
		this.bones = new Bone[NB];
		this.bonesMap.getValues(this.bones);

		for (Bone bone : this.bones)
			bone.fixChildren();
	}

	public static abstract interface BoneHandler {
		public abstract void processBone(Bone paramBone);
	}
}
