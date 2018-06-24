package player;

import jarp.CameraController;
import jarp.View;
import jautil.JAException;
import jautil.SpeedProvider;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import util.LoggerConfig;

public class SequencePlayManager {
	private static Logger logger= LogManager.getLogger();;;

	private final boolean PLAY_IS_RESUMING;

	private final PlayerFlags FLAGS;

	private final AnimationScan SCAN;

	private final JAPlayerEventHandler EVENT_HANDLER;

	private final Client CLIENT;

	private final AnimationScheduler SCHEDULER;

	private boolean stopped;

	public SequencePlayManager(boolean resuming, PlayerFlags flags, View view, CameraController camctrl,
			AnimationScan ascan, JAPlayerEventHandler peh, SpeedProvider sp, float tBegin, float tEnd, float syncRate,
			int initla, int fdlimit, int droplimit, boolean pipedsigns, boolean showat, boolean logas, boolean logdfs,
			boolean logdf, Client client) {
		this.PLAY_IS_RESUMING = resuming;
		this.FLAGS = flags;
		this.SCAN = ascan;
		this.EVENT_HANDLER = peh;
		this.CLIENT = client;

		this.SCHEDULER = new AnimationScheduler(view, camctrl, ascan, peh, sp, tBegin, tEnd, syncRate, initla, fdlimit,
				droplimit, pipedsigns, showat, logas, logdfs, logdf);

		this.stopped = false;
	}

	public synchronized void startSequencePlay() {
		Runnable RUN_SEQUENCE_PLAY = getNewSequencePlayRunner();
		Thread T_PLAY = new Thread(RUN_SEQUENCE_PLAY);
		T_PLAY.setPriority(5);
		T_PLAY.start();
	}

	public synchronized void stopSequencePlay() {
		this.stopped = true;
		this.SCHEDULER.requestStopPlayer();
	}

	protected Runnable getNewSequencePlayRunner() {
		return new Runnable() {
			public void run() {
				SequencePlayManager.logger.log(LoggerConfig.INFOLevel, LoggerConfig.THREADMarker,
						"Run: SequencePlayManager");
				try {
					SequencePlayManager.this.runSequencePlay();
				} catch (InterruptedException ix) {
					SequencePlayManager.logger.log(LoggerConfig.WARNLevel, LoggerConfig.THREADMarker,
							"SequencePlayManager: " + ix);
				}

				SequencePlayManager.logger.log(LoggerConfig.STATSLevel, LoggerConfig.THREADMarker,
						"End: SequencePlayManager");
			}
		};
	}

	protected void runSequencePlay() throws InterruptedException {
		this.CLIENT.sequencePlayStarts();

		firePlayerHasStarted();

		try {
			if (!this.PLAY_IS_RESUMING) {
				this.SCAN.resetForSequencePlay();
			}

			this.SCHEDULER.playAnimation();

			while ((this.FLAGS.cyclicPlayIsOn()) && (!isStopped())) {
				System.gc();
				this.SCHEDULER.delay(500.0F);

				this.SCAN.resetForSequencePlay();
				this.SCHEDULER.playAnimation();
			}
		} catch (JAException jax) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.CONTROLMarker,
					"runSequenecPlay interrupted: " + jax.getMessage());
		}

		System.gc();

		this.CLIENT.sequencePlayFinishes();

		firePlayerIsDone();
	}

	protected void firePlayerHasStarted() {
		if (this.EVENT_HANDLER != null) {
			this.EVENT_HANDLER.playerHasStarted();
		}
	}

	protected void firePlayerIsDone() {
		if (this.EVENT_HANDLER != null)
			this.EVENT_HANDLER.playerIsDone(this.SCAN);
	}

	protected synchronized boolean isStopped() {
		return this.stopped;
	}

	static abstract interface Client {
		public abstract void sequencePlayStarts();

		public abstract void sequencePlayFinishes();
	}
}
