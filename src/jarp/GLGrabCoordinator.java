package jarp;

import java.io.PrintStream;

public class GLGrabCoordinator {
	private static final String PREFIX = "####  GLGrabCoordinator: ";
	private final View VIEW;
	private boolean isActive;
	private boolean doLog;

	private void log(String msg) {
		System.out.println("####  GLGrabCoordinator: " + msg);
	}

	private int[] wh = { -1, -1 };
	private int request;
	private byte[] requestPixels;
	private byte[] framePixels;

	private void doReset(boolean aflag, boolean log) {
		doReset(aflag, log, -1, -1);
	}

	private void doReset(boolean aflag, boolean log, int w, int h) {
		this.isActive = aflag;
		this.doLog = log;
		this.wh[0] = w;
		this.wh[1] = h;
		this.request = -1;
		this.requestPixels = null;
		this.framePixels = null;
	}

	public GLGrabCoordinator(View vw) {
		this.VIEW = vw;
		doReset(false, false);
	}

	public synchronized int[] getWidthHeight() {
		return this.wh;
	}

	public synchronized void start(boolean dolog, int w, int h) {
		doReset(true, dolog, w, h);
	}

	public synchronized void reset() {
		doReset(false, false);
	}

	public synchronized void makeRequest(int f, byte[] pixels) {
		this.request = f;
		this.requestPixels = pixels;
		if (this.doLog) {
			log("request " + f);
		}
	}

	public synchronized byte[] getRequestBuffer() {
		byte[] buf = null;
		if ((0 <= this.request) && (this.requestPixels != null)) {
			buf = this.requestPixels;
		}

		return buf;
	}

	public synchronized void notifyFrame() {
		this.framePixels = this.requestPixels;
		this.requestPixels = null;
		if (this.doLog)
			log("notify " + this.request);
		notify();
	}

	public synchronized void waitForFrame() throws InterruptedException {
		int nwait = 0;
		for (nwait = 0; this.framePixels == null; nwait++) {
			wait();
		}

		if (1 < nwait) {
			System.out.println("####  View.waitForFrame() " + this.request + ": nWait=" + nwait);
		}

		if (this.doLog) {
			log("done wait " + this.request);
		}
		this.request = -1;
		this.framePixels = null;
	}
}
