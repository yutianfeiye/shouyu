package jautil.geometry;

import jautil.JAInputStream;
import jautil.JAOutputStream;
import java.io.IOException;

public class Quaternion {
	public static double DEGS_TO_RADS = 0.017453292519943295D;
	public static double RADS_TO_DEGS = 57.29577951308232D;

	public static Quaternion ZERO = new Quaternion(0.0F, 0.0F, 0.0F, 0.0F);

	public static Quaternion IDENTITY = new Quaternion(1.0F, 0.0F, 0.0F, 0.0F);

	private float x;

	private float y;

	private float z;

	private float w;

	public Quaternion(JAInputStream jins) throws IOException {
		this.x = jins.readFloat();
		this.y = jins.readFloat();
		this.z = jins.readFloat();

		this.w = jins.readFloat();
	}

	public Quaternion(float ww, float xx, float yy, float zz) {
		this.w = ww;
		this.x = xx;
		this.y = yy;
		this.z = zz;
	}

	public Quaternion() {
		this.w = 1.0F;
		this.x = (this.y = this.z = 0.0F);
	}

	public Quaternion(float[] xyzw) {
		this.x = xyzw[0];
		this.y = xyzw[1];
		this.z = xyzw[2];
		this.w = xyzw[3];
	}

	public Quaternion(Quaternion q) {
		this.w = q.w();
		this.x = q.x();
		this.y = q.y();
		this.z = q.z();
	}

	public Quaternion(float roll, float pitch, float yaw) {
		fromAxisRotations(roll, pitch, yaw);
	}

	public void save(JAOutputStream jouts) throws IOException {
		jouts.writeFloat(this.x);
		jouts.writeFloat(this.y);
		jouts.writeFloat(this.z);

		jouts.writeFloat(this.w);
	}

	public float w() {
		return this.w;
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

	public void set(Quaternion q) {
		set(q.w(), q.x(), q.y(), q.z());
	}

	public void set(float ww, float xx, float yy, float zz) {
		this.w = ww;
		this.x = xx;
		this.y = yy;
		this.z = zz;
	}

	public void set(float[] xyzw) {
		this.w = xyzw[3];
		this.x = xyzw[0];
		this.y = xyzw[1];
		this.z = xyzw[2];
	}

	public void setFromRotationMatrix3x3(float[] m) {
		double EPS = 1.0E-4D;

		double tx = m[0];
		double ty = m[4];
		double tz = m[8];
		double T = tx + ty + tz + 1.0D;

		if (1.0D <= T + 1.0E-4D) {

			double SQRT_T = Math.sqrt(T);
			double DIV_4W = 0.5D / SQRT_T;

			this.w = ((float) (0.5D * SQRT_T));
			this.x = ((float) ((m[5] - m[7]) * DIV_4W));
			this.y = ((float) ((m[6] - m[2]) * DIV_4W));
			this.z = ((float) ((m[1] - m[3]) * DIV_4W));

		} else {

			boolean dorotx = false;
			boolean doroty = false;
			boolean dorotz = false;
			if (tz <= ty) {
				if (ty <= tx)
					dorotx = true;
				else
					doroty = true;
			} else if (tz <= tx)
				dorotx = true;
			else {
				dorotz = true;
			}
			if (dorotx) {
				double Tx = tx - ty - tz + 1.0D;
				double SQRT_Tx = Math.sqrt(Tx);
				double DIV_4Wx = 0.5D / SQRT_Tx;

				this.w = ((float) ((m[5] - m[7]) * DIV_4Wx));
				this.x = ((float) (0.5D * SQRT_Tx));
				this.y = ((float) ((m[1] + m[3]) * DIV_4Wx));
				this.z = ((float) ((m[6] + m[2]) * DIV_4Wx));
			} else if (doroty) {
				double Ty = -tx + ty - tz + 1.0D;
				double SQRT_Ty = Math.sqrt(Ty);
				double DIV_4Wy = 0.5D / SQRT_Ty;

				this.w = ((float) ((m[6] - m[2]) * DIV_4Wy));
				this.x = ((float) ((m[1] + m[3]) * DIV_4Wy));
				this.y = ((float) (0.5D * SQRT_Ty));
				this.z = ((float) ((m[5] + m[7]) * DIV_4Wy));
			} else if (dorotz) {
				double Tz = -tx - ty + tz + 1.0D;
				double SQRT_Tz = Math.sqrt(Tz);
				double DIV_4Wz = 0.5D / SQRT_Tz;

				this.w = ((float) ((m[1] - m[3]) * DIV_4Wz));
				this.x = ((float) ((m[6] + m[2]) * DIV_4Wz));
				this.y = ((float) ((m[5] + m[7]) * DIV_4Wz));
				this.z = ((float) (0.5D * SQRT_Tz));
			}
		}
	}

	public float[] asFloats() {
		float[] floatvec = new float[4];
		toFloats(floatvec);

		return floatvec;
	}

	public void toFloats(float[] xyzw) {
		xyzw[3] = this.w;
		xyzw[0] = this.x;
		xyzw[1] = this.y;
		xyzw[2] = this.z;
	}

	public void toRotationMatrix4x4(float[] m) {
		double X_2 = this.x + this.x;
		double Y_2 = this.y + this.y;
		double Z_2 = this.z + this.z;
		double WX_2 = this.w * X_2;
		double WY_2 = this.w * Y_2;
		double WZ_2 = this.w * Z_2;
		double XX_2 = this.x * X_2;
		double XY_2 = this.x * Y_2;
		double XZ_2 = this.x * Z_2;
		double YY_2 = this.y * Y_2;
		double YZ_2 = this.y * Z_2;
		double ZZ_2 = this.z * Z_2;

		m[0] = ((float) (1.0D - YY_2 - ZZ_2));
		m[4] = ((float) (XY_2 - WZ_2));
		m[8] = ((float) (XZ_2 + WY_2));

		m[1] = ((float) (XY_2 + WZ_2));
		m[5] = ((float) (1.0D - XX_2 - ZZ_2));
		m[9] = ((float) (YZ_2 - WX_2));

		m[2] = ((float) (XZ_2 - WY_2));
		m[6] = ((float) (YZ_2 + WX_2));
		m[10] = ((float) (1.0D - XX_2 - YY_2));

		m[12] = (m[13] = m[14] = 0.0F);
	}

	public void toRotationMatrix3x3(float[] m) {
		double X_2 = this.x + this.x;
		double Y_2 = this.y + this.y;
		double Z_2 = this.z + this.z;
		double WX_2 = this.w * X_2;
		double WY_2 = this.w * Y_2;
		double WZ_2 = this.w * Z_2;
		double XX_2 = this.x * X_2;
		double XY_2 = this.x * Y_2;
		double XZ_2 = this.x * Z_2;
		double YY_2 = this.y * Y_2;
		double YZ_2 = this.y * Z_2;
		double ZZ_2 = this.z * Z_2;

		m[0] = ((float) (1.0D - YY_2 - ZZ_2));
		m[3] = ((float) (XY_2 - WZ_2));
		m[6] = ((float) (XZ_2 + WY_2));

		m[1] = ((float) (XY_2 + WZ_2));
		m[4] = ((float) (1.0D - XX_2 - ZZ_2));
		m[7] = ((float) (YZ_2 - WX_2));

		m[2] = ((float) (XZ_2 - WY_2));
		m[5] = ((float) (YZ_2 + WX_2));
		m[8] = ((float) (1.0D - XX_2 - YY_2));
	}

	public void fromAngleAxis(float angle, float axisX, float axisY, float axisZ) {
		float halfAngle = 0.5F * angle;
		float sin = (float) Math.sin(halfAngle);

		this.w = ((float) Math.cos(halfAngle));
		this.x = (sin * axisX);
		this.y = (sin * axisY);
		this.z = (sin * axisZ);
	}

	public Quaternion add(Quaternion q) {
		return new Quaternion(this.w + q.w, this.x + q.x, this.y + q.y, this.z + q.z);
	}

	public Quaternion subtract(Quaternion q) {
		return new Quaternion(this.w - q.w, this.x - q.x, this.y - q.y, this.z - q.z);
	}

	public Quaternion postMultiply(Quaternion q) {
		Quaternion qprod = new Quaternion(this);
		qprod.postMultiplyEq(q);

		return qprod;
	}

	public void negateEq() {
		this.x = (-this.x);
		this.y = (-this.y);
		this.z = (-this.z);

		this.w = (-this.w);
	}

	public void negateXEq() {
		this.x = (-this.x);
	}

	public void postMultiplyEq(Quaternion q) {
		set(this.w * q.w() - this.x * q.x() - this.y * q.y() - this.z * q.z(),
				this.w * q.x() + this.x * q.w() + this.y * q.z() - this.z * q.y(),
				this.w * q.y() + this.y * q.w() + this.z * q.x() - this.x * q.z(),
				this.w * q.z() + this.z * q.w() + this.x * q.y() - this.y * q.x());
	}

	public void preMultiplyEq(Quaternion q) {
		set(q.w() * this.w - q.x() * this.x - q.y() * this.y - q.z() * this.z,
				q.w() * this.x + q.x() * this.w + q.y() * this.z - q.z() * this.y,
				q.w() * this.y + q.y() * this.w + q.z() * this.x - q.x() * this.z,
				q.w() * this.z + q.z() * this.w + q.x() * this.y - q.y() * this.x);
	}

	public void postDivideUnitEq(Quaternion q) {
		Quaternion qinv = new Quaternion(q);
		qinv.invertUnit();
		postMultiplyEq(qinv);
	}

	public Quaternion scalarMultiply(float f) {
		return new Quaternion(this.w * f, this.x * f, this.y * f, this.z * f);
	}

	public void scalarMultiplyEq(float f) {
		this.w *= f;
		this.x *= f;
		this.y *= f;
		this.z *= f;
	}

	public Quaternion negate() {
		return new Quaternion(-this.w, -this.x, -this.y, -this.z);
	}

	public float innerProd(Quaternion q) {
		return this.w * q.w() + this.x * q.x() + this.y * q.y() + this.z * q.z();
	}

	public float length() {
		return (float) Math.sqrt(innerProd(this));
	}

	public Quaternion inverse() {
		float lensq = innerProd(this);
		Quaternion q = ZERO;
		if (lensq != 0.0F) {
			float fac = 1.0F / lensq;
			q = new Quaternion(this.w * fac, -this.x * fac, -this.y * fac, -this.z * fac);
		}

		return q;
	}

	public Quaternion inverseUnit() {
		return new Quaternion(this.w, -this.x, -this.y, -this.z);
	}

	public void setInverseUnit(Quaternion q) {
		set(q.w(), -q.x(), -q.y(), -q.z());
	}

	public void invertUnit() {
		this.x = (-this.x);
		this.y = (-this.y);
		this.z = (-this.z);
	}

	public void normalize() {
		double lensq = innerProd(this);
		double len = Math.sqrt(lensq);
		this.x = ((float) (this.x / len));
		this.y = ((float) (this.y / len));
		this.z = ((float) (this.z / len));
		this.w = ((float) (this.w / len));
	}

	public static float GS_EPSILON = 0.001F;

	public void scaleXRotationAngle(float scale) {
		double ascaled = Math.atan2(this.x, this.w) * scale;

		this.w = ((float) Math.cos(ascaled));
		this.x = ((float) Math.sin(ascaled));
	}

	public void fromAxisRotations(float roll, float pitch, float yaw) {
		double ROLL_by2 = roll * DEGS_TO_RADS / 2.0D;
		double PITCH_by2 = pitch * DEGS_TO_RADS / 2.0D;
		double YAW_by2 = yaw * DEGS_TO_RADS / 2.0D;

		double cr = Math.cos(ROLL_by2);
		double cp = Math.cos(PITCH_by2);
		double cy = Math.cos(YAW_by2);
		double sr = Math.sin(ROLL_by2);
		double sp = Math.sin(PITCH_by2);
		double sy = Math.sin(YAW_by2);

		double cycp = cy * cp;
		double sysp = sy * sp;
		double sycp = sy * cp;
		double cysp = cy * sp;

		this.w = ((float) (cycp * cr + sysp * sr));
		this.x = ((float) (cycp * sr - sysp * cr));
		this.y = ((float) (cysp * cr + sycp * sr));
		this.z = ((float) (sycp * cr - cysp * sr));
	}

	public void toAxisRotations(float[] result) {
		double W_SQ = w() * w();
		double X_SQ = x() * x();
		double Y_SQ = y() * y();
		double Z_SQ = z() * z();

		double CY_CP = W_SQ + X_SQ - Y_SQ - Z_SQ;
		double SY_CP = 2.0F * (x() * y() + w() * z());
		double SP_NEG = 2.0F * (x() * z() - w() * y());
		double CP_SQ = CY_CP * CY_CP + SY_CP * SY_CP;

		double roll = 0.0D;
		double PITCH = RADS_TO_DEGS * Math.asin(-SP_NEG);
		double yaw = 0.0D;

		if ((-1.0E-10D <= CP_SQ) && (CP_SQ <= 1.0E-10D)) {

			double SY_NEG = 2.0F * (x() * y() - w() * z());
			double CY = W_SQ - X_SQ + Y_SQ - Z_SQ;

			yaw = RADS_TO_DEGS * Math.atan2(-SY_NEG, CY);
		} else {
			double CP_CR = W_SQ - X_SQ - Y_SQ + Z_SQ;

			double CP_SR = 2.0F * (y() * z() + w() * x());

			roll = RADS_TO_DEGS * Math.atan2(CP_SR, CP_CR);
			yaw = RADS_TO_DEGS * Math.atan2(SY_CP, CY_CP);
		}

		result[0] = ((float) roll);
		result[1] = ((float) PITCH);
		result[2] = ((float) yaw);
	}

	public void extractRotX(Quaternion qx) {
		float s = this.x;
		float c = this.w;
		float l = (float) Math.sqrt(s * s + c * c);
		qx.set(c / l, s / l, 0.0F, 0.0F);
	}

	public void scale(Quaternion qwk, float T) {
		if (T == 0.0F) {
			set(IDENTITY);
		} else if (T != 1.0F) {
			slerp(this, IDENTITY, this, qwk, T);
		}
	}

	public static void slerp(Quaternion qq, Quaternion qa, Quaternion qb, Quaternion qwk, float T) {
		float ONE = 1.0F;
		float T_COMP = 1.0F - T;

		float cosOmega = qa.innerProd(qb);

		qwk.set(qb);

		if (cosOmega < 0.0F) {
			cosOmega = -cosOmega;
			qwk.negateEq();
		}

		boolean dolinear = 1.0F - cosOmega < 1.0E-5F;
		float scaleB;
		float scaleA;
		if (dolinear) {

			scaleA = T_COMP;
			scaleB = T;
		} else {
			float omega = (float) Math.acos(cosOmega);
			float sinOmega = (float) Math.sin(omega);
			scaleA = (float) Math.sin(omega * T_COMP) / sinOmega;
			scaleB = (float) Math.sin(omega * T) / sinOmega;
		}

		qq.set(qa.w() * scaleA + qwk.w() * scaleB, qa.x() * scaleA + qwk.x() * scaleB,
				qa.y() * scaleA + qwk.y() * scaleB, qa.z() * scaleA + qwk.z() * scaleB);

		if (dolinear) {
			qq.normalize();
		}
	}

	public Quaternion log() {
		Quaternion result = new Quaternion(this);
		result.w = 0.0F;

		if (Math.abs(this.w) < 1.0F) {
			double angle = Math.acos(this.w);
			double sin = Math.sin(angle);

			if (Math.abs(sin) >= GS_EPSILON) {
				float coeff = (float) (angle / sin);
				result.x = (coeff * this.x);
				result.y = (coeff * this.y);
				result.z = (coeff * this.z);
			}
		}

		return result;
	}

	public Quaternion exp() {
		double angle = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		double sin = Math.sin(angle);

		Quaternion result = new Quaternion(this);
		result.w = ((float) Math.cos(angle));

		if (Math.abs(sin) >= GS_EPSILON) {
			float coeff = (float) (sin / angle);
			result.x = (coeff * this.x);
			result.y = (coeff * this.y);
			result.z = (coeff * this.z);
		}

		return result;
	}

	public String toString() {
		return "(" + this.w + ";" + this.x + " " + this.y + " " + this.z + ")";
	}
}
