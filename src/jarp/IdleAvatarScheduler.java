package jarp;

import cas.CASFrame;
import jautil.JAException;
import java.io.PrintStream;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import util.LoggerConfig;

public class IdleAvatarScheduler {
	private static Logger logger= LogManager.getLogger();

	private static final String PREFIX = "Idle avatar scheduler: ";

	private static final long DEFAULT_WAIT_MS = 4L;

	private static final int IDLE_STEP_MS = 20;

	private final CASFrame REST_FRAME;

	private final AmbientManager AMBIENT_MANAGER;

	private final float AMBIENT_SCALE;

	private final View JA_VIEW;

	private final FrameAnimationSynch FRAME_SYNCH;

	private final long INIT_WAIT_MS;

	private final Thread IDLE_THREAD;

	private boolean stopped;

	private boolean completed;

	public IdleAvatarScheduler(CASFrame restframe, AmbientManager ambmgr, View view, FrameAnimationSynch fsynch) {
		this(restframe, ambmgr, 4L, view, fsynch);
	}

	public IdleAvatarScheduler(CASFrame restframe, AmbientManager ambmgr, long initwaitms, View view,
			FrameAnimationSynch fsynch) {
		this(restframe, ambmgr, initwaitms, 1.0F, view, fsynch);
	}

	public IdleAvatarScheduler(CASFrame restframe, AmbientManager ambmgr, long initwaitms, float ambscale, View view,
			FrameAnimationSynch fsynch) {
		this.REST_FRAME = restframe;
		this.AMBIENT_MANAGER = ambmgr;
		this.AMBIENT_SCALE = ambscale;
		this.JA_VIEW = view;
		this.FRAME_SYNCH = fsynch;
		this.INIT_WAIT_MS = initwaitms;

		Runnable RUN_IDLE = new Runnable() {
			public void run() {
				IdleAvatarScheduler.logger.log(LoggerConfig.INFOLevel, LoggerConfig.THREADMarker,
						"Run: IdleAvatarScheduler");

				IdleAvatarScheduler.this.runIdle();
				IdleAvatarScheduler.logger.log(LoggerConfig.STATSLevel, LoggerConfig.THREADMarker,
						"End: IdleAvatarScheduler");
			}

		};
		this.IDLE_THREAD = new Thread(RUN_IDLE);

		this.stopped = false;
		this.completed = false;

		this.IDLE_THREAD.setPriority(6);
		this.IDLE_THREAD.start();
	}

	public synchronized void stop() throws InterruptedException {
		if (!isStopped()) {
			logger.log(LoggerConfig.LOGLevel, LoggerConfig.THREADMarker, "Idle avatar scheduler: stop called");

			setStopped();
			this.IDLE_THREAD.interrupt();
		} else {
			logger.log(LoggerConfig.ERRORLevel, LoggerConfig.THREADMarker, "Idle avatar scheduler: extra stop call");
		}
	}

	protected void runIdle() {
		doIdleInitWait();

		if (!isStopped()) {
			this.FRAME_SYNCH.setAnimationInProgress(true);

			runIdleWithAmbient();

			this.FRAME_SYNCH.setAnimationInProgress(false);
		}

		setCompleted();
	}

	protected void doIdleInitWait() {
		long T0 = System.currentTimeMillis();
		try {
			Thread.sleep(this.INIT_WAIT_MS);
		} catch (InterruptedException ix) {
			handleInterrupt(ix);
		}
		long T1 = System.currentTimeMillis();
		int T_INIT = (int) (T1 - T0);
	}

	protected void runIdleWithAmbient() {
		while (!isStopped()) {

			CASFrame aframe = this.AMBIENT_MANAGER.adjustForTimeDelta(this.REST_FRAME, this.AMBIENT_SCALE, 20.0F);

			try {
				this.JA_VIEW.playOneIdleFrame(aframe);
				Thread.sleep(20L);
			} catch (JAException jx) {
				System.out.println("Idle avatar scheduler: " + jx);
			} catch (InterruptedException ix) {
				handleInterrupt(ix);
			}
		}
	}

	private void handleInterrupt(InterruptedException ix) {
		if (!isStopped()) {
			logger.log(LoggerConfig.LOGLevel, LoggerConfig.THREADMarker,
					"Idle avatar scheduler: Interrupted when not stopped");
		}

		setStopped();
		Thread.currentThread().interrupt();
	}

	private synchronized boolean isStopped() {
		return this.stopped;
	}

	private synchronized void setStopped() {
		this.stopped = true;
	}

	private synchronized boolean isCompleted() {
		return this.completed;
	}

	private synchronized void setCompleted() {
		this.completed = true;
		notifyAll();
	}
}
