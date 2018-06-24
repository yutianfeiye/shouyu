package player;

import jarp.View;
import jautil.JAException;
import java.io.PrintStream;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import util.LoggerConfig;

public class OneFramePlayManager {
	private static Logger logger= LogManager.getLogger();;;

	private final View JA_VIEW;

	private final AnimationScan SCAN;

	private final Client CLIENT;

	public OneFramePlayManager(int f, SignStatusRecord ssrec, View view, AnimationScan ascan, Client client) {
		this.JA_VIEW = view;
		this.SCAN = ascan;
		this.CLIENT = client;

		this.SCAN.setFrame(f);
		if ((ssrec != null) && (ssrec.SCAN == this.SCAN)) {
			ssrec.update();
		}
	}

	public void startFramePlay() {
		Runnable RUN_FRAME_PLAY = getNewFramePlayRunner();
		Thread T_PLAY = new Thread(RUN_FRAME_PLAY);
		T_PLAY.setPriority(5);
		T_PLAY.start();
	}

	protected Runnable getNewFramePlayRunner() {
		return new Runnable() {
			public void run() {
				try {
					OneFramePlayManager.logger.log(LoggerConfig.INFOLevel, LoggerConfig.THREADMarker,
							"Run: OneFramePlay");
					OneFramePlayManager.this.runFramePlay();
					OneFramePlayManager.logger.log(LoggerConfig.STATSLevel, LoggerConfig.THREADMarker,
							"End: OneFramePlay");
				} catch (InterruptedException ix) {
					OneFramePlayManager.logger.log(LoggerConfig.WARNLevel, LoggerConfig.THREADMarker,
							"Interrupt: OneFramePlayManager: " + ix);
				}
			}
		};
	}

	protected void runFramePlay() throws InterruptedException {
		this.CLIENT.framePlayStarts();

		this.JA_VIEW.startAnimation();

		try {
			this.JA_VIEW.playOneFrameWithStableAmbient(this.SCAN.frame(), this.SCAN.f());
			this.SCAN.advanceFrame();
		} catch (JAException jax) {
			System.out.println("####  Frame play thread: " + jax.getMessage());
		}

		this.JA_VIEW.stopAnimation();
		this.CLIENT.framePlayFinishes();
	}

	static abstract interface Client {
		public abstract void framePlayStarts();

		public abstract void framePlayFinishes();
	}
}
