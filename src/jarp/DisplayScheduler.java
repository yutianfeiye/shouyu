package jarp;

import com.jogamp.opengl.GLAutoDrawable;
import com.jogamp.opengl.GLException;
import com.jogamp.opengl.Threading;
import jautil.JATimer;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import util.LoggerConfig;

public class DisplayScheduler implements ThreadCompletionChecker {
	private static Logger logger= LogManager.getLogger();

	public static final int PERIOD_MS = 8;

	protected GLAutoDrawable jaGLDrawable;

	protected Runnable dsRunnable;

	protected Thread dsThread;

	protected FrameAnimationSynch frameSynch;

	protected boolean drawingShouldStop;

	private int countPendingRequests;
	protected final Runnable RUN_DRAWABLE_DISPLAY = new Runnable() {

		public void run() {
			DisplayScheduler.this.jaGLDrawable.display();
		}
	};

	public DisplayScheduler(GLAutoDrawable jadrawable) {
		this.jaGLDrawable = jadrawable;

		this.dsRunnable = null;
		this.dsThread = null;
		this.frameSynch = null;
		this.drawingShouldStop = false;
		this.countPendingRequests = 0;
	}

	public FrameAnimationSynch getFrameAnimationSynch() {
		return this.frameSynch;
	}

	public synchronized void start() {
		if (this.dsThread != null) {
			throw new GLException("DisplayScheduler already started");
		}
		if (this.dsRunnable == null) {
			this.dsRunnable = new DSRunnable();
		}
		this.frameSynch = new FrameAnimationSynch();

		this.dsThread = new Thread(this.dsRunnable, "Display-Scheduler-Thread");

		this.dsThread.setPriority(5);
		this.dsThread.start();
	}

	public synchronized void stop() {
		if (this.dsThread != null) {
			this.drawingShouldStop = true;
		}
	}

	public synchronized void waitForCompletion() throws InterruptedException {
		try {
			if (this.drawingShouldStop) {
				while (this.dsThread != null) {
					wait();
				}
				logger.log(LoggerConfig.LOGLevel, LoggerConfig.THREADMarker,
						"DisplayScheduler: waitForCompletion done OK");
			} else {
				logger.log(LoggerConfig.WARNLevel, LoggerConfig.THREADMarker,
						"DisplayScheduler: waitForCompletion before stop call");
			}
		} catch (InterruptedException ix) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.THREADMarker, "DisplayScheduler: waitForCompletion: " + ix);

			throw ix;
		}
	}

	public synchronized void requestDisplayNow() {
		this.countPendingRequests += 1;
	}

	protected synchronized boolean displayRequestsArePending() {
		return 0 < this.countPendingRequests;
	}

	protected synchronized boolean collectDisplayRequests() {
		boolean drpending = 0 < this.countPendingRequests;
		this.countPendingRequests = 0;

		return drpending;
	}

	protected void invokeGLDisplayOp() {
		Threading.invokeOnOpenGLThread(true, this.RUN_DRAWABLE_DISPLAY);
	}

	protected class DSRunnable implements Runnable {
		private static final String DSRUN_PFX = "DisplayScheduler: ";

		protected DSRunnable() {
		}

		private void sleepOneMS() throws InterruptedException {
			Thread.sleep(1L);
		}

		private final JATimer I_TIMER = new JATimer();

		private void idle(int N) throws InterruptedException {
			DisplayScheduler THIS_DS = DisplayScheduler.this;

			this.I_TIMER.start();
			float tremaining = N;

			int i = 0;
			while ((!THIS_DS.drawingShouldStop) && (0.1D < tremaining)) {
				if (THIS_DS.displayRequestsArePending())
					break;
				sleepOneMS();
				tremaining = N - this.I_TIMER.getTimeMS();
				i++;
			}
		}

		public void run() {
			DisplayScheduler.logger.log(LoggerConfig.INFOLevel, LoggerConfig.THREADMarker, "Run: DisplayScheduler");

			Thread.currentThread().setPriority(6);

			DisplayScheduler THIS_DS = DisplayScheduler.this;
			FrameAnimationSynch FRAME_SYNCH = THIS_DS.frameSynch;

			boolean doingdisplay = false;
			try {
				JATimer TMR = new JATimer();

				while (!THIS_DS.drawingShouldStop) {

					boolean gotdisprqst = THIS_DS.collectDisplayRequests();
					boolean animoff = !FRAME_SYNCH.animationIsInProgress();
					if ((gotdisprqst) || (animoff)) {
						doingdisplay = true;
						THIS_DS.invokeGLDisplayOp();
						doingdisplay = false;

						FRAME_SYNCH.setFrameDisplayDone();
					}

					idle(8);
				}

			} catch (InterruptedException ix) {
				DisplayScheduler.logger.log(LoggerConfig.WARNLevel, LoggerConfig.THREADMarker,
						"DisplayScheduler:  interrupted: " + ix);

				Thread.currentThread().interrupt();
			} catch (GLException glx) {
				DisplayScheduler.logger.log(LoggerConfig.WARNLevel, LoggerConfig.THREADMarker,
						"DisplayScheduler: : " + glx);
			} finally {
				if (doingdisplay) {
					FRAME_SYNCH.setFrameDisplayDone();
				}

				synchronized (THIS_DS) {
					THIS_DS.drawingShouldStop = false;
					THIS_DS.dsThread = null;
					THIS_DS.notify();
				}
			}
			DisplayScheduler.logger.log(LoggerConfig.STATSLevel, LoggerConfig.THREADMarker, "End: DisplayScheduler");
		}
	}
}
