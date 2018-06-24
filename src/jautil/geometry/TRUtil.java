package jautil.geometry;

import jautil.FourCCUtil;
import java.io.PrintWriter;
import java.io.StringWriter;

public class TRUtil {
	public static final int TRANS_SIZE = 3;
	public static final int ROT_SIZE = 4;
	public static final int IX_X = 0;
	public static final int IX_Y = 1;
	public static final int IX_Z = 2;
	public static final int IX_W = 3;
	public static final float[] ID_ROT_ARRAY = { 0.0F, 0.0F, 0.0F, 1.0F };

	public static final float METRES_TO_INCHES = 39.37008F;

	public static void setTranslation(float[] tdest, float[] tsrc) {
		for (int t = 0; t != 3; t++) {
			tdest[t] = tsrc[t];
		}
	}

	public static void setScaledTranslation(float[] tdest, float[] tsrc, float scale) {
		for (int t = 0; t != 3; t++) {
			tsrc[t] *= scale;
		}
	}

	public static void setRotation(float[] rdest, float[] rsrc) {
		for (int r = 0; r != 4; r++) {
			rdest[r] = rsrc[r];
		}
	}

	public static void setRotation(float[] rdest, Quaternion qsrc) {
		rdest[0] = qsrc.x();
		rdest[1] = qsrc.y();
		rdest[2] = qsrc.z();
		rdest[3] = qsrc.w();
	}

	public static float[] clampWOfRotation(float[] rot) {
		float[] crot = rot;
		if (1.0F < rot[3]) {
			crot = new float[4];
			setRotation(crot, rot);
			crot[3] = 1.0F;
		}
		return crot;
	}

	public static String stringForTR(int fourcc, float[] trans, float[] rot) {
		StringWriter sw = new StringWriter(80);
		PrintWriter pw = new PrintWriter(sw);

		pw.print(FourCCUtil.fourCCStringPadded(fourcc));

		pw.print("  trans=");
		pw.printf("(%6.3f", new Object[] { Float.valueOf(trans[0]) });
		for (int t = 1; t != 3; t++)
			pw.printf(",%6.3f", new Object[] { Float.valueOf(trans[t]) });
		pw.printf(")", new Object[0]);

		pw.print("  rot:");
		double[] rotda = rotationDirectionAndAngle(rot);
		pw.printf("  n=(%6.3f", new Object[] { Double.valueOf(rotda[0]) });
		for (int i = 1; i != 4; i++)
			pw.printf(",%6.3f", new Object[] { Double.valueOf(rotda[i]) });
		pw.printf(")", new Object[0]);
		pw.printf("  theta=%6.3f", new Object[] { Double.valueOf(rotda[3]) });

		pw.flush();

		return sw.toString();
	}

	public static double[] rotationDirectionAndAngle(float[] rot) {
		double[] result = new double[4];

		double thetaby2 = Math.acos(rot[3]);
		double s = Math.sin(thetaby2);

		result[3] = (2.0D * thetaby2 * Quaternion.RADS_TO_DEGS);

		if (Math.abs(thetaby2) >= 1.0E-4D) {
			result[0] = (rot[0] / s);
			result[1] = (rot[1] / s);
			result[2] = (rot[2] / s);
		}

		return result;
	}
}
