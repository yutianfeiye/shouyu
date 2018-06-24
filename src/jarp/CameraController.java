package jarp;

import jautil.platform.OpSystem;
import java.awt.event.MouseEvent;
import javax.swing.event.MouseInputAdapter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import util.LoggerConfig;

public class CameraController {
	private static Logger logger= LogManager.getLogger();;;

	private static final double INIT_Z_NEAR = 0.01D;

	private static final double INIT_Z_FAR = 20.0D;

	private static final double CAM_XZ_MIN = 0.5D;

	private static final double CAM_Y_MIN = 1.5D;

	private static final double CAM_Y_MAX = 7.5D;

	private static final double INIT_CENTRE_Y = 0.5D;

	private static final double INIT_RZ = 2.02D;

	protected View jaView;

	protected CameraDataManager camDataManager;

	protected CamMouseListener camMouseHandler;

	public CameraController(View view) {
		this.jaView = view;
		initialiseCameraControl();
	}

	protected void initialiseCameraControl() {
		createCameraDataManagerFromJARPData();

		this.camMouseHandler = new CamMouseListener();

		this.jaView.setCamExternal(this.camMouseHandler);

		float[] cliplims = new float[2];
		this.camDataManager.getCameraClipLimits(cliplims);

		this.jaView.setCamClipPlanes(cliplims[0], cliplims[1]);

		updateJARPCamera();
	}

	public void reinitialiseCameraControl(View view) {
		if (this.jaView != view) {
			logger.log(LoggerConfig.TRACELevel, LoggerConfig.RENDERMarker,
					"CameraController reinitialised with new View");

			this.jaView = view;
		}
		initialiseCameraControl();
	}

	protected void createCameraDataManagerFromJARPData() {
		float[] locf = new float[3];
		float[] fcngf = new float[3];
		float[] upf = new float[3];

		double[] lfud = new double[9];

		this.jaView.getCamLocation(locf);
		this.jaView.getCamFacing(fcngf);
		this.jaView.getCamUp(upf);

		for (int i = 0; i != 3; i++) {
			lfud[(0 + i)] = locf[i];
			lfud[(3 + i)] = fcngf[i];
			lfud[(6 + i)] = upf[i];
		}

		double fovd = this.jaView.getCamFOV();

		boolean DO_INIT_CAM_HEIGHT_HACK = false;

		this.camDataManager = new CameraDataManager(0.01D, 20.0D, 0.5D, 1.5D, 7.5D, lfud, fovd);
	}

	protected void updateJARPCamera() {
		updateJARPCamera(false);
	}

	protected void updateJARPCamera(boolean setFOV) {
		float[] lfu = new float[10];

		this.camDataManager.getCameraValuesForRenderer(lfu);
		float fov = lfu[9];

		this.jaView.setCamLocation(lfu[0], lfu[1], lfu[2]);

		this.jaView.setCamFacing(lfu[3], lfu[4], lfu[5]);

		this.jaView.setCamUp(lfu[6], lfu[7], lfu[8]);

		if (setFOV) {
			this.jaView.setCamFOV(fov);
		}
	}

	public void setCamera(float[] cam) {
		logger.log(LoggerConfig.LOGLevel, LoggerConfig.CAMERAMarker, "CameraController.setCamera: (" + cam[0] + " "
				+ cam[1] + " " + cam[2] + " " + cam[3] + " " + cam[4] + " " + cam[5] + ")");

		if (8 <= cam.length) {
			this.camDataManager.setNewCameraValues(cam[0], cam[1], cam[2], cam[3], cam[4], cam[5], cam[6], cam[7]);

		} else {

			this.camDataManager.setNewCameraValues(cam[0], cam[1], cam[2], cam[3], cam[4], cam[5]);
		}

		updateJARPCamera(true);
	}

	public void resetCamera() {
		this.camDataManager.resetCameraValuesToStd();
		updateJARPCamera(true);
	}

	public void getCameraSettings(float[] cam) {
		this.camDataManager.getCameraValues(cam);
	}

	protected class CamMouseListener extends MouseInputAdapter {
		protected CamMouseListener() {
		}

		public void mousePressed(MouseEvent mevt) {
			int x = mevt.getX();
			int y = mevt.getY();

			if (mevt.getButton() == 1) {
				CameraController.this.camDataManager.startUIDrag(x, y);
			}
		}

		public void mouseDragged(MouseEvent mevt) {
			int x = mevt.getX();
			int y = mevt.getY();

			int modifiers = mevt.getModifiersEx();

			if (0 != (0x400 & modifiers)) {
				boolean ctrlKeyIsDown = 0 != (OpSystem.CTRL_MODIFIER_MASK & modifiers);

				boolean shiftKeyIsDown = 0 != (0x40 & modifiers);

				CameraController.this.camDataManager.updateForUIDrag(x, y, ctrlKeyIsDown, shiftKeyIsDown);

				CameraController.this.updateJARPCamera();
			}
		}
	}
}
