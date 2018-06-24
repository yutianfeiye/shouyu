package jarp;

public class CameraDataManager {
	public static final int CI_X = 0;

	public static final int CI_Y = 1;

	public static final int CI_Z = 2;

	public static final int CI_LOC = 0;

	public static final int CI_FACING = 3;

	public static final int CI_UP = 6;

	public static final int SZ_CAM_CTRL_DATA = 9;

	public static final int CI_CX = 0;

	public static final int CI_CY = 1;

	public static final int CI_R = 2;

	public static final int CI_THETA = 3;

	public static final int CI_PHI = 4;

	public static final int CI_FOV = 5;

	public static final int SZ_CAM_DATA_OLD = 6;

	public static final int CI_ROT_RIGHT_LIM = 6;

	public static final int CI_ROT_LEFT_LIM = 7;

	public static final int SZ_CAM_DATA = 8;

	public static final double PI = 3.141592653589793D;

	public static final double DEGS_TO_RADS = 0.017453292519943295D;

	public static final double PHI_LIMIT_HI = 1.5207963267948965D;

	public static final double PHI_LIMIT_LO = -1.4207963267948966D;

	private double stdCentreX;

	private double stdCentreY;

	private double stdR;

	private double stdThetaDegs;

	private double stdPhiDegs;

	private double stdFOVDegs;

	private double centreX;

	private double centreY;

	private double r;

	private double theta;

	private double phi;

	private double fovDegs;

	private double rotRightLim;

	private double rotLeftLim;

	private double locX;

	private double locY;

	private double locZ;

	private double facingX;

	private double facingY;

	private double facingZ;

	private double upX;

	private double upY;

	private double upZ;

	private double zNear;

	private double zFar;

	private double xzMin;

	private double yMin;

	private double yMax;

	private boolean doLeftRight;

	private boolean doUpDown;

	private boolean doInOut;

	private boolean doYaw;

	private boolean doPitch;

	private double uiMoveX;

	private double uiMoveY;

	private double uiMoveZ;

	private double uiYawX;

	private double uiPitchY;

	private double lastUIMoveX;

	private double lastUIMoveY;

	private double lastUIMoveZ;
	private double lastUIYawX;
	private double lastUIPitchY;
	private int lastUIX;
	private int lastUIY;

	public CameraDataManager(double znear, double zfar, double xzmin, double ymin, double ymax, double[] lfuValues,
			double fov) {
		initialiseFixedValues(znear, zfar, xzmin, ymin, ymax);
		initialiseStdCameraValuesFromRenderer(lfuValues, fov);
		resetCameraValuesToStd();
	}

	public void initialiseFixedValues(double znear, double zfar, double xzmin, double ymin, double ymax) {
		this.zNear = znear;
		this.zFar = zfar;
		this.xzMin = xzmin;
		this.yMin = ymin;
		this.yMax = ymax;
	}

	public void initialiseStdCameraValuesFromRenderer(double[] lfuValues, double fov) {
		double x = lfuValues[0];
		double y = lfuValues[1];
		double z = lfuValues[2];
		double xfacing = lfuValues[3];
		double yfacing = lfuValues[4];
		double zfacing = lfuValues[5];
		double xup = lfuValues[6];
		double yup = lfuValues[7];
		double zup = lfuValues[8];

		double fcgScale = Math.sqrt(xfacing * xfacing + yfacing * yfacing + zfacing * zfacing);
		if (Math.abs(fcgScale - 1.0D) > 1.0E-5D) {
			xfacing /= fcgScale;
			yfacing /= fcgScale;
			zfacing /= fcgScale;
		}

		double rr = -(z / zfacing);
		double xzfacing = Math.sqrt(xfacing * xfacing + zfacing * zfacing);

		this.stdCentreX = (x + rr * xfacing);
		this.stdCentreY = (y + rr * yfacing);
		this.stdR = rr;
		this.stdThetaDegs = (Math.acos(-zfacing / xzfacing) / 0.017453292519943295D);

		this.stdPhiDegs = (Math.asin(-yfacing) / 0.017453292519943295D);

		this.stdFOVDegs = fov;
	}

	public void resetCameraValuesToStd() {
		setNewCameraValues(this.stdCentreX, this.stdCentreY, this.stdR, this.stdThetaDegs, this.stdPhiDegs,
				this.stdFOVDegs, -1.0D, -1.0D);
	}

	protected void setCameraValues(double cx, double cy, double r, double theta, double phi, double fov,
			boolean DO_ROT_LIMITS, double rotrightlim, double rotleftlim) {
		this.centreX = cx;
		this.centreY = cy;
		this.r = r;
		this.theta = (theta * 0.017453292519943295D);
		this.phi = (phi * 0.017453292519943295D);
		this.fovDegs = fov;

		if (DO_ROT_LIMITS) {
			this.rotRightLim = (rotrightlim < 0.0D ? -1.0D : rotrightlim * 0.017453292519943295D);

			this.rotLeftLim = (rotleftlim < 0.0D ? -1.0D : rotleftlim * 0.017453292519943295D);

			this.phi = constrainRot(this.phi);
		}

		double dirX = Math.sin(this.theta) * Math.cos(this.phi);
		double dirY = Math.sin(this.phi);
		double dirZ = Math.cos(this.theta) * Math.cos(this.phi);

		this.locX = (r * dirX + cx);
		this.locY = (r * dirY + cy);
		this.locZ = (r * dirZ);

		this.facingX = (-dirX);
		this.facingY = (-dirY);
		this.facingZ = (-dirZ);

		this.upX = (-Math.sin(this.theta) * Math.sin(this.phi));
		this.upY = Math.cos(this.phi);
		this.upZ = (-Math.cos(this.theta) * Math.sin(this.phi));

		resetTransientUIData();
	}

	public void setNewCameraValues(double cx, double cy, double r, double theta, double phi, double fov,
			double rotrightlim, double rotleftlim) {
		setCameraValues(cx, cy, r, theta, phi, fov, true, rotrightlim, rotleftlim);
	}

	public void setNewCameraValues(double cx, double cy, double r, double theta, double phi, double fov) {
		setCameraValues(cx, cy, r, theta, phi, fov, false, -1.0D, -1.0D);
	}

	public void resetTransientUIData() {
		this.doYaw = false;
		this.doUpDown = false;
		this.doPitch = false;
		this.doInOut = false;
		this.doLeftRight = false;

		this.uiMoveX = (this.lastUIMoveX = 0.0D);
		this.uiMoveY = (this.lastUIMoveY = 0.0D);
		this.uiMoveZ = (this.lastUIMoveZ = 0.0D);
		this.uiYawX = (this.lastUIYawX = 0.0D);
		this.uiPitchY = (this.lastUIPitchY = 0.0D);
	}

	public void getCameraValues(double[] cv) {
		cv[0] = this.centreX;
		cv[1] = this.centreY;
		cv[2] = this.r;
		cv[3] = (this.theta / 0.017453292519943295D);
		cv[4] = (this.phi / 0.017453292519943295D);
		cv[5] = this.fovDegs;

		if (8 <= cv.length) {
			double rlim = this.rotRightLim;
			cv[6] = (rlim < 0.0D ? rlim : rlim / 0.017453292519943295D);

			double llim = this.rotLeftLim;
			cv[7] = (llim < 0.0D ? llim : llim / 0.017453292519943295D);
		}
	}

	public void getCameraValues(float[] cv) {
		cv[0] = ((float) this.centreX);
		cv[1] = ((float) this.centreY);
		cv[2] = ((float) this.r);
		cv[3] = ((float) (this.theta / 0.017453292519943295D));
		cv[4] = ((float) (this.phi / 0.017453292519943295D));
		cv[5] = ((float) this.fovDegs);

		if (8 <= cv.length) {
			double rlim = this.rotRightLim;
			cv[6] = ((float) (rlim < 0.0D ? rlim : rlim / 0.017453292519943295D));

			double llim = this.rotLeftLim;
			cv[7] = ((float) (llim < 0.0D ? llim : llim / 0.017453292519943295D));
		}
	}

	public void getCameraClipLimits(float[] cl) {
		cl[0] = ((float) this.zNear);
		cl[1] = ((float) this.zFar);
	}

	public double getCameraFOV() {
		return this.fovDegs;
	}

	public void getCameraValuesForRenderer(float[] lfuValues) {
		int N = lfuValues.length;

		double[] lfuvalsd = new double[N];
		getCameraValuesForRenderer(lfuvalsd);

		for (int i = 0; i != N; i++) {
			lfuValues[i] = ((float) lfuvalsd[i]);
		}
	}

	public void getCameraValuesForRenderer(double[] lfuValues) {
		lfuValues[0] = this.locX;
		lfuValues[1] = this.locY;
		lfuValues[2] = this.locZ;

		lfuValues[3] = this.facingX;
		lfuValues[4] = this.facingY;
		lfuValues[5] = this.facingZ;

		lfuValues[6] = this.upX;
		lfuValues[7] = this.upY;
		lfuValues[8] = this.upZ;

		lfuValues[9] = this.fovDegs;
	}

	public void startUIDrag(int nX, int nY) {
		this.lastUIX = nX;
		this.lastUIY = nY;
	}

	public void updateForUIDrag(int nX, int nY, boolean controlKeyIsDown, boolean shiftKeyIsDown) {
		double dX = nX - this.lastUIX;
		double dY = nY - this.lastUIY;

		if (controlKeyIsDown) {

			if (shiftKeyIsDown) {
				this.doLeftRight = true;
				this.lastUIMoveX = this.uiMoveX;
				this.uiMoveX -= dX / 100.0D;
			}
		} else {
			this.doYaw = true;
			this.lastUIYawX = this.uiYawX;
			this.uiYawX -= dX;
		}

		if ((shiftKeyIsDown) && (!controlKeyIsDown)) {
			this.doPitch = true;
			this.lastUIPitchY = this.uiPitchY;
			this.uiPitchY += dY;

		} else if (controlKeyIsDown) {
			this.doUpDown = true;
			this.lastUIMoveY = this.uiMoveY;
			this.uiMoveY += dY / 100.0D;
		} else {
			this.doInOut = true;
			this.lastUIMoveZ = this.uiMoveZ;
			this.uiMoveZ -= dY / 100.0D;
		}

		updateCameraFromUIValues();

		this.lastUIX = nX;
		this.lastUIY = nY;
	}

	public void updateCameraFromUIValues() {
		double newX = this.locX;
		double newY = this.locY;
		double newZ = this.locZ;
		double newFacingX = this.facingX;
		double newFacingY = this.facingY;
		double newFacingZ = this.facingZ;
		double newUpX = this.upX;
		double newUpY = this.upY;
		double newUpZ = this.upZ;

		double newCentreX = this.centreX;
		double newCentreY = this.centreY;
		double newR = this.r;
		double newTheta = this.theta;
		double newPhi = this.phi;

		if (this.doInOut) {
			newR += this.uiMoveZ - this.lastUIMoveZ;

			if (newR < this.zNear) {
				newR = this.zNear;
				this.uiMoveZ = this.lastUIMoveZ;
			} else if (newR > this.zFar) {
				newR = this.zFar;
				this.uiMoveZ = this.lastUIMoveZ;
			}
		}

		if (this.doUpDown) {

			if ((this.doLeftRight) && (Math.abs(this.theta) < 1.0471975511965976D)) {
				double dX = this.uiMoveX - this.lastUIMoveX;
				newCentreX += dX;
				newX += dX;
			}

			double dY = this.uiMoveY - this.lastUIMoveY;
			newCentreY += dY;
			newY += dY;

		} else {

			if (this.doYaw) {
				newTheta += (this.uiYawX - this.lastUIYawX) * 0.017453292519943295D;

				newTheta = constrainRot(newTheta);
			}

			if (this.doPitch) {

				newPhi += (this.uiPitchY - this.lastUIPitchY) * 0.017453292519943295D;

				if (newPhi > 1.5207963267948965D) {
					newPhi = 1.5207963267948965D;
					this.uiPitchY = this.lastUIPitchY;
				} else if (newPhi < -1.4207963267948966D) {
					newPhi = -1.4207963267948966D;
					this.uiPitchY = this.lastUIPitchY;
				}
			}

			double dirX = Math.sin(newTheta) * Math.cos(newPhi);
			double dirY = Math.sin(newPhi);
			double dirZ = Math.cos(newTheta) * Math.cos(newPhi);

			newX = newR * dirX + newCentreX;
			newY = newR * dirY + newCentreY;
			newZ = newR * dirZ;

			newFacingX = -dirX;
			newFacingY = -dirY;
			newFacingZ = -dirZ;

			newUpX = -Math.sin(newTheta) * Math.sin(newPhi);
			newUpY = Math.cos(newPhi);
			newUpZ = -Math.cos(newTheta) * Math.sin(newPhi);
		}

		double newXZRadius = newR * Math.cos(newPhi);

		boolean moveOK = (this.xzMin <= Math.abs(newXZRadius))
				|| ((this.yMin <= Math.abs(newY)) && (Math.abs(newY) <= this.yMax));

		if (moveOK) {
			this.locX = newX;
			this.locY = newY;
			this.locZ = newZ;
			this.facingX = newFacingX;
			this.facingY = newFacingY;
			this.facingZ = newFacingZ;
			this.upX = newUpX;
			this.upY = newUpY;
			this.upZ = newUpZ;

			this.centreX = newCentreX;
			this.centreY = newCentreY;
			this.r = newR;
			this.theta = newTheta;
			this.phi = newPhi;
		} else {
			if (this.doLeftRight)
				this.uiMoveX = this.lastUIMoveX;
			if (this.doInOut)
				this.uiMoveZ = this.lastUIMoveZ;
			if (this.doUpDown)
				this.uiMoveY = this.lastUIMoveY;
			if (this.doYaw)
				this.uiYawX = this.lastUIYawX;
			if (this.doPitch) {
				this.uiPitchY = this.lastUIPitchY;
			}
		}

		this.doLeftRight = false;
		this.doUpDown = false;
		this.doInOut = false;
		this.doYaw = false;
		this.doPitch = false;
	}

	protected double constrainRot(double rot) {
		double crot = rot;

		if ((0.0D <= this.rotRightLim) && (crot < -this.rotRightLim)) {
			crot = -this.rotRightLim;
		} else if ((0.0D <= this.rotLeftLim) && (this.rotLeftLim < crot)) {
			crot = this.rotLeftLim;
		}

		return crot;
	}
}
