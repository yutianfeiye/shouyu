package player;

public abstract interface CameraChangeMonitor {
	public abstract boolean checkCameraForChange();

	public abstract float[] cameraSettings();

	public abstract String cameraSettingsString();
}
