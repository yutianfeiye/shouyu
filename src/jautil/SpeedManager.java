package jautil;

public class SpeedManager extends BasicSpeedProvider implements SpeedProvider {
	public SpeedManager() {
		super(1.0F);
	}

	public synchronized void setSpeedUp(float speedup) {
		this.speedFactor = speedup;
	}
}
