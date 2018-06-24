package player;

import sigmlanim.AnimatedSign;

public abstract interface SignsArrayAccess {
	public abstract AnimatedSign[] signs();

	public abstract int countSigns();

	public abstract int countFrames();

	public abstract boolean arrayIsFinal();

	public abstract void update();

	public abstract void waitForProgress() throws InterruptedException;
}
