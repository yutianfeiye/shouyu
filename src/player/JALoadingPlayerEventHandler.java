package player;

public abstract interface JALoadingPlayerEventHandler extends JAPlayerEventHandler {
	public abstract void loaderHasStarted();

	public abstract void nextSignLoaded(int paramInt1, int paramInt2);

	public abstract void loaderIsDone(boolean paramBoolean, int paramInt1, int paramInt2);
}
