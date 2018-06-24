package jautil;

public class BasicSpeedProvider implements SpeedProvider {
	protected float speedFactor;

	public BasicSpeedProvider(float speedup) {
		this.speedFactor = speedup;
	}

	public synchronized float getSpeedUp() {
		return this.speedFactor;
	}
}
