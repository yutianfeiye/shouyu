package jarp;

import jautil.FourCCUtil;
import jautil.JAInputStream;
import jautil.JAOutputStream;
import jautil.geometry.Vector3f;
import java.io.IOException;

public class MeshVertex {
	private int index;
	private int countBones;
	private Bone[] influencingBone;
	private float[] weight;
	private Vector3f[] offsetVector;
	private Vector3f[] baseNormal;
	private float[] distance;
	private int[] adjacentIndex;
	private int[] boneID;

	public MeshVertex() {
	}

	public MeshVertex(JAInputStream jins, int ix, boolean mtgthasnorm) throws IOException {
		this.index = ix;

		int NBI = jins.readInt();
		this.countBones = NBI;

		this.offsetVector = new Vector3f[NBI];
		for (int i = 0; i != NBI; i++) {
			this.offsetVector[i] = new Vector3f(jins);
		}

		this.baseNormal = new Vector3f[NBI];
		for (int i = 0; i != NBI; i++) {
			this.baseNormal[i] = new Vector3f(jins);
		}

		this.boneID = new int[NBI];
		for (int i = 0; i != NBI; i++) {
			String str4cc = jins.readString();
			this.boneID[i] = FourCCUtil.fourCCInt(str4cc);
		}

		this.weight = new float[NBI];
		for (int i = 0; i != NBI; i++) {
			this.weight[i] = jins.readFloat();
		}

		this.distance = new float[NBI];
		for (int i = 0; i != NBI; i++) {
			this.distance[i] = jins.readFloat();
		}

		this.adjacentIndex = null;

		if (!mtgthasnorm) {

			int N_AI = jins.readInt();

			this.adjacentIndex = new int[N_AI];
			for (int k = 0; k != N_AI; k++) {
				this.adjacentIndex[k] = jins.readInt();
			}
		}
	}

	public float getBoneEndDistance(int b) {
		return this.distance[b];
	}

	public int getIndex() {
		return this.index;
	}

	public int getNumBones() {
		return this.countBones;
	}

	public Bone getBone(int b) {
		return this.influencingBone[b];
	}

	public float getWeight(int b) {
		return this.weight[b];
	}

	public Vector3f getOffset(int b) {
		return this.offsetVector[b];
	}

	public Vector3f getBaseNormal(int b) {
		return this.baseNormal[b];
	}

	public int[] getAdjacentVertices() {
		return this.adjacentIndex;
	}

	public void fixBoneReferences(Skeleton skeleton) {
		int NBI = getNumBones();
		this.influencingBone = new Bone[NBI];

		for (int b = 0; b != NBI; b++) {

			this.influencingBone[b] = skeleton.getBone(this.boneID[b]);
		}

		this.boneID = null;
	}

	public void save(JAOutputStream jouts) throws IOException {
		int N_IB = getNumBones();

		jouts.writeInt(N_IB);

		for (int i = 0; i != N_IB; i++) {
			this.offsetVector[i].save(jouts);
		}

		for (int i = 0; i != N_IB; i++) {
			this.baseNormal[i].save(jouts);
		}

		for (int i = 0; i != N_IB; i++) {
			jouts.write4CCString(this.influencingBone[i].get4CC());
		}

		for (int i = 0; i != N_IB; i++) {
			jouts.writeFloat(this.weight[i]);
		}

		for (int i = 0; i != N_IB; i++) {
			jouts.writeFloat(this.distance[i]);
		}

		if (this.adjacentIndex != null) {

			int N_AI = this.adjacentIndex.length;
			jouts.writeInt(N_AI);

			for (int i = 0; i != N_AI; i++) {
				jouts.writeInt(this.adjacentIndex[i]);
			}
		}
	}
}
