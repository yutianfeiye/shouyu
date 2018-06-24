package jautil.geometry;

public class TRTransform {
	protected static double DEGS_TO_RADS = Quaternion.DEGS_TO_RADS;

	protected static double RADS_TO_DEGS = Quaternion.RADS_TO_DEGS;

	protected float[] m;

	protected Quaternion q;

	public TRTransform() {
		this.m = new float[12];
		this.m[0] = (this.m[4] = this.m[8] = 1.0F);

		this.q = new Quaternion();
	}

	public TRTransform(float[] marray) {
		this.m = marray;

		if (this.q != null) {
			this.q.set(1.0F, 0.0F, 0.0F, 0.0F);
		}
	}

	public TRTransform(Quaternion qrot) {
		this.q = new Quaternion(qrot);

		this.m = new float[12];
		this.q.toRotationMatrix3x3(this.m);
	}

	public float[] mat() {
		return this.m;
	}

	public Quaternion quat() {
		return this.q;
	}

	public void set(Quaternion qrot) {
		if (this.q != null) {
			this.q.set(qrot);
		} else {
			this.q = new Quaternion(qrot);
		}

		this.q.toRotationMatrix3x3(this.m);

		this.m[9] = (this.m[10] = this.m[11] = 0.0F);
	}

	public void set(float[] rot, float[] trans) {
		if (this.q != null) {
			this.q.set(rot);
		} else {
			this.q = new Quaternion(rot);
		}

		this.q.toRotationMatrix3x3(this.m);

		this.m[9] = trans[0];
		this.m[10] = trans[1];
		this.m[11] = trans[2];
	}

	public void setComposition(TRTransform xpre, float[] rot, float[] trans) {
		if (this.q != null) {
			this.q.set(rot);
		} else {
			this.q = new Quaternion(rot);
		}

		this.q.preMultiplyEq(xpre.quat());
		this.q.toRotationMatrix3x3(this.m);

		float[] mp = xpre.mat();
		for (int i = 0; i != 3; i++) {
			this.m[(i + 9)] = (mp[i] * trans[0] + mp[(i + 3)] * trans[1] + mp[(i + 6)] * trans[2] + mp[(i + 9)]);
		}
	}

	public void setComposition(TRTransform xpre, Quaternion qrot) {
		if (this.q != null) {
			this.q.set(qrot);
		} else {
			this.q = new Quaternion(qrot);
		}

		this.q.preMultiplyEq(xpre.quat());
		this.q.toRotationMatrix3x3(this.m);

		float[] mp = xpre.mat();
		this.m[9] = mp[9];
		this.m[10] = mp[10];
		this.m[11] = mp[11];
	}

	public void transformPoint(Vector3f pt) {
		float x = this.m[0] * pt.x() + this.m[3] * pt.y() + this.m[6] * pt.z() + this.m[9];
		float y = this.m[1] * pt.x() + this.m[4] * pt.y() + this.m[7] * pt.z() + this.m[10];
		float z = this.m[2] * pt.x() + this.m[5] * pt.y() + this.m[8] * pt.z() + this.m[11];

		pt.set(x, y, z);
	}

	public void transformPoint(Vector3f pt, float[] ptout) {
		ptout[0] = (this.m[0] * pt.x() + this.m[3] * pt.y() + this.m[6] * pt.z() + this.m[9]);
		ptout[1] = (this.m[1] * pt.x() + this.m[4] * pt.y() + this.m[7] * pt.z() + this.m[10]);
		ptout[2] = (this.m[2] * pt.x() + this.m[5] * pt.y() + this.m[8] * pt.z() + this.m[11]);
	}

	public void rotateVector(Vector3f vec, float[] vecout) {
		vecout[0] = (this.m[0] * vec.x() + this.m[3] * vec.y() + this.m[6] * vec.z());
		vecout[1] = (this.m[1] * vec.x() + this.m[4] * vec.y() + this.m[7] * vec.z());
		vecout[2] = (this.m[2] * vec.x() + this.m[5] * vec.y() + this.m[8] * vec.z());
	}

	public void rotateVector(Vector3f vec) {
		float a = this.m[0] * vec.x() + this.m[3] * vec.y() + this.m[6] * vec.z();
		float b = this.m[1] * vec.x() + this.m[4] * vec.y() + this.m[7] * vec.z();
		float c = this.m[2] * vec.x() + this.m[5] * vec.y() + this.m[8] * vec.z();
		vec.set(a, b, c);
	}

	public TRTransform getInverse() {
		float[] mi = new float[12];

		float[] MM = this.m;
		float A = MM[4] * MM[8] - MM[5] * MM[7];
		float B = -(MM[3] * MM[8]) + MM[5] * MM[6];
		float C = MM[3] * MM[7] - MM[4] * MM[6];

		float D = -(MM[1] * MM[8]) + MM[2] * MM[7];
		float E = MM[0] * MM[8] - MM[2] * MM[6];
		float F = -(MM[0] * MM[7]) + MM[1] * MM[6];

		float G = MM[1] * MM[5] - MM[2] * MM[4];
		float H = -(MM[0] * MM[5]) + MM[2] * MM[3];
		float I = MM[0] * MM[4] - MM[1] * MM[3];

		mi[0] = A;
		mi[3] = B;
		mi[6] = C;
		mi[1] = D;
		mi[4] = E;
		mi[7] = F;
		mi[2] = G;
		mi[5] = H;
		mi[8] = I;

		float x = MM[9];
		float y = MM[10];
		float z = MM[11];

		mi[9] = (-(x * A + y * B + z * C));
		mi[10] = (-(x * D + y * E + z * F));
		mi[11] = (-(x * G + y * H + z * I));

		return new TRTransform(mi);
	}

	public void set(float X, float Y, float Z, float angledeg) {
		float angle = (float) (angledeg * DEGS_TO_RADS);
		float c = (float) Math.cos(angle);
		float s = (float) Math.sin(angle);
		float t = 1.0F - c;

		float XX = X * X;
		float XY = X * Y;
		float XZ = X * Z;

		float YY = Y * Y;
		float YZ = Y * Z;

		float ZZ = Z * Z;

		float sX = s * X;
		float sY = s * Y;
		float sZ = s * Z;

		this.m[0] = (c + t * XX);
		this.m[3] = (t * XY - sZ);
		this.m[6] = (t * XZ + sY);

		this.m[1] = (t * XY + sZ);
		this.m[4] = (c + t * YY);
		this.m[7] = (t * YZ - sX);

		this.m[2] = (t * XZ - sY);
		this.m[5] = (t * YZ + sX);
		this.m[8] = (c + t * ZZ);

		setQuaternionFromMatrix();
	}

	private static final String EOL = System.getProperty("line.separator");

	public String toString() {
		String ROW_FMT = "%9.5f %9.5f %9.5f %6.5f";
		String str = "";
		for (int ir = 0; ir != 3; ir++) {
			str = str + String.format("%9.5f %9.5f %9.5f %6.5f", new Object[] { Float.valueOf(this.m[(ir + 0)]),
					Float.valueOf(this.m[(ir + 3)]), Float.valueOf(this.m[(ir + 6)]), Float.valueOf(this.m[(ir + 9)]) })
					+ EOL;
		}

		return str;
	}

	protected void setQuaternionFromMatrix() {
		this.q.setFromRotationMatrix3x3(this.m);
	}
}
