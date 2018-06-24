package jarp;

public class FrameAnimationSynch {
	private boolean animInProgress = false;

	private boolean animFrameBusy = false;
	private boolean animFrameGenerated = false;

	public synchronized void setAnimationInProgress(boolean aip) {
		this.animInProgress = aip;
	}

	public synchronized boolean animationIsInProgress() {
		return this.animInProgress;
	}

	public synchronized void setFrameGenerationStarted() {
		this.animFrameBusy = true;
		this.animFrameGenerated = false;
	}

	public synchronized void setFrameGenerationDone() {
		this.animFrameGenerated = true;
	}

	public synchronized void setFrameDisplayDone() {
		if (this.animFrameBusy) {
			this.animFrameBusy = false;
			this.animFrameGenerated = false;
		}

		notifyAll();
	}

	public synchronized boolean frameAnimationIsBusy() {
		return this.animFrameBusy;
	}

	public synchronized boolean frameGenerationIsBusy() {
		return (this.animFrameBusy) && (!this.animFrameGenerated);
	}

	protected synchronized void awaitFrameDisplayDone() throws InterruptedException {
		while (this.animFrameBusy) {
			wait();
		}
	}
}
