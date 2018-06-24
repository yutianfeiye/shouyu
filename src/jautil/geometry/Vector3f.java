package jautil.geometry;

import jautil.JAInputStream;
import jautil.JAOutputStream;
import java.io.IOException;

public class Vector3f {
	private float x;
	private float y;
	private float z;

	public Vector3f() {
		this.x = (this.y = this.z = 0.0F);
	}

	public Vector3f(float a, float b, float c) {
		this.x = a;
		this.y = b;
		this.z = c;
	}

	public Vector3f(float[] ff) {
		this.x = ff[0];
		this.y = ff[1];
		this.z = ff[2];
	}

	public Vector3f(Vector3f v) {
		this(v.x(), v.y(), v.z());
	}

	public Vector3f(JAInputStream jins) throws IOException {
		this.x = jins.readFloat();
		this.y = jins.readFloat();
		this.z = jins.readFloat();
	}

	public float[] toFloats() {
		float[] ff = { this.x, this.y, this.z };
		return ff;
	}

	public void toFloats(float[] ff) {
		ff[0] = this.x;
		ff[1] = this.y;
		ff[2] = this.z;
	}

	public void setZero() {
		this.x = (this.y = this.z = 0.0F);
	}

	public void set(float a, float b, float c) {
		this.x = a;
		this.y = b;
		this.z = c;
	}

	public float x() {
		return this.x;
	}

	public float y() {
		return this.y;
	}

	public float z() {
		return this.z;
	}

	public void setX(float x) {
		this.x = x;
	}

	public void setY(float y) {
		this.y = y;
	}

	public void setZ(float z) {
		this.z = z;
	}

	public void incrX(float ix) {
		this.x += ix;
	}

	public void incrY(float iy) {
		this.y += iy;
	}

	public void incrZ(float iz) {
		this.z += iz;
	}

	public void set(Vector3f v) {
		this.x = v.x();
		this.y = v.y();
		this.z = v.z();
	}

	public void set(float[] v) {
		this.x = v[0];
		this.y = v[1];
		this.z = v[2];
	}

	public void set(float[] v, int i) {
		this.x = v[(i + 0)];
		this.y = v[(i + 1)];
		this.z = v[(i + 2)];
	}

	public void save(JAOutputStream jouts) throws IOException {
		jouts.writeFloat(this.x);
		jouts.writeFloat(this.y);
		jouts.writeFloat(this.z);
	}

	public float select(int i) {
		float result = 0.0F;

		if (i == 0) {
			result = this.x;
		} else if (i == 1) {
			result = this.y;
		} else if (i == 2) {
			result = this.z;
		}
		return result;
	}

	public Vector3f plus(Vector3f v) {
		return new Vector3f(this.x + v.x, this.y + v.y, this.z + v.z);
	}

	public Vector3f plus(float[] vf) {
		return new Vector3f(this.x + vf[0], this.y + vf[1], this.z + vf[2]);
	}

	public Vector3f minus(Vector3f v) {
		return new Vector3f(this.x - v.x, this.y - v.y, this.z - v.z);
	}

	public Vector3f multScalar(float f) {
		return new Vector3f(this.x * f, this.y * f, this.z * f);
	}

	public Vector3f divScalar(float f) {
		Vector3f result = null;

		if (f == 0.0F) {
			float fmax = Float.MAX_VALUE;
			result = new Vector3f(Float.MAX_VALUE, Float.MAX_VALUE, Float.MAX_VALUE);
		} else {
			float fac = 1.0F / f;
			result = new Vector3f(this.x * fac, this.y * fac, this.z * fac);
		}
		return result;
	}

	public Vector3f negate() {
		return new Vector3f(-this.x, -this.y, -this.z);
	}

	public Vector3f plusEq(Vector3f v) {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		return this;
	}

	public Vector3f plusEq(float[] vf) {
		this.x += vf[0];
		this.y += vf[1];
		this.z += vf[2];
		return this;
	}

	public Vector3f plusEq(float xx, float yy, float zz) {
		this.x += xx;
		this.y += yy;
		this.z += zz;
		return this;
	}

	public Vector3f minusEq(Vector3f v) {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;

		return this;
	}

	public Vector3f multScalarEq(float f) {
		this.x *= f;
		this.y *= f;
		this.z *= f;

		return this;
	}

	public Vector3f divScalarEq(float f) {
		if (f == 0.0F) {
			float fmax = Float.MAX_VALUE;
			this.x = Float.MAX_VALUE;
			this.y = Float.MAX_VALUE;
			this.z = Float.MAX_VALUE;
		} else {
			float fac = 1.0F / f;
			this.x *= fac;
			this.y *= fac;
			this.z *= fac;
		}

		return this;
	}

	public Vector3f negateEq() {
		this.x = (-this.x);
		this.y = (-this.y);
		this.z = (-this.z);

		return this;
	}

	public float unitize(float tolerance) {
		float length = length();

		if (length > tolerance) {
			multScalarEq(1.0F / length);
		} else {
			length = 0.0F;
		}
		return length;
	}

	public float unitize() {
		return unitize(1.0E-6F);
	}

	public float squaredLength() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}

	public float length() {
		return (float) Math.sqrt(squaredLength());
	}

	public float dotProd(Vector3f v) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	}

	public Vector3f crossProd(Vector3f v) {
		return new Vector3f(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
	}

	public Vector3f unitCrossProd(Vector3f v) {
		Vector3f cprod = crossProd(v);
		cprod.unitize();

		return cprod;
	}

	public float projectionOn(Vector3f v) {
		return dotProd(v) / v.length();
	}
}
