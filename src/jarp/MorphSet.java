package jarp;

import jautil.JAInputStream;
import jautil.JAOutputStream;
import jautil.geometry.Vector3f;
import java.io.IOException;

public class MorphSet {
	private int ixVertex = -1;
	private float weight = 0.0F;
	private Vector3f offset = null;
	private Vector3f normal = null;

	public MorphSet() {
	}

	public MorphSet(JAInputStream jins, boolean hasnorm) throws IOException {
		this.ixVertex = jins.readInt();
		this.weight = jins.readFloat();
		this.offset = new Vector3f(jins);
		if (hasnorm) {
			this.normal = new Vector3f(jins);
		}
	}

	public int getVertexId() {
		return this.ixVertex;
	}

	public float getWeight() {
		return this.weight;
	}

	public Vector3f getOffset() {
		return this.offset;
	}

	public Vector3f getNormal() {
		return this.normal;
	}

	public float[] getOffsetFloats() {
		return this.offset.toFloats();
	}

	public float[] getNormalFloats() {
		return this.offset.toFloats();
	}

	public void save(JAOutputStream jouts) throws IOException {
		jouts.writeInt(this.ixVertex);
		jouts.writeFloat(this.weight);
		this.offset.save(jouts);

		if (this.normal != null) {
			this.normal.save(jouts);
		}
	}
}
