package player;

import jarp.CameraController;
import jautil.JAOptions;

public class CameraChangeMonitorForPlayer implements CameraChangeMonitor {
	private static final int SZ_CAM_DATA = 8;
	private final CameraAccess CAM_ACCESS;
	private float[] settings;

	public CameraChangeMonitorForPlayer(CameraAccess access) {
		this.CAM_ACCESS = access;
		CameraController CTRLLR = this.CAM_ACCESS.getController();

		this.settings = (CTRLLR == null ? null : getCameraSettings(CTRLLR));
	}

	public boolean checkCameraForChange() {
		boolean changed = false;
		CameraController CTRLLR = this.CAM_ACCESS.getController();
		if (CTRLLR != null) {
			float[] CAM = getCameraSettings(CTRLLR);
			if (CAM != null) {
				changed = isChanged(CAM);
				this.settings = CAM;
			}
		}
		return changed;
	}

	public float[] cameraSettings() {
		return this.settings;
	}

	public String cameraSettingsString() {
		return this.settings == null ? "(undefined)" : JAOptions.cameraSettingsString(this.settings);
	}

	private boolean isChanged(float[] CAM) {
		boolean changed = false;
		if (this.settings != null) {
			int N = CAM.length;

			int i = 0;
			int ii = N;
			while (i != ii) {
				float DIFF_i = Math.abs(this.settings[i] - CAM[i]);
				if (1.0E-4D <= DIFF_i)
					ii = i;
				else
					i++;
			}
			changed = i != N;
		}
		return changed;
	}

	private float[] getCameraSettings(CameraController camctrllr) {
		float[] cam = new float[8];
		camctrllr.getCameraSettings(cam);
		return cam;
	}
}
