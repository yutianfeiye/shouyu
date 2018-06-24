package player;

public abstract interface FrameIndexScanAccess {
	public abstract int value();

	public abstract int nextValue();

	public abstract int previousValue();

	public abstract int min();

	public abstract int max();
}
