package player;

public abstract interface JAPlayerEventHandler {
	public abstract void playerHasStarted();

	public abstract void playerIsAtNewFrame(AnimationScan paramAnimationScan, boolean paramBoolean);

	public abstract void playerIsDone(AnimationScan paramAnimationScan);
}
