package player;

import cas.CASFrame;
import jarp.CameraController;
import jarp.View;
import jautil.JAException;
import jautil.JATimer;
import jautil.SpeedProvider;
import jautil.avatar.AvatarDefinitionAccess;
import jautil.avatar.AvatarDefinitionForView;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import sigmlanim.AnimatedSign;
import sigmlgen.playerctrl.AvatarSettings;
import sigmlgen.playerctrl.CameraSettings;
import util.LoggerConfig;

public class AnimationScheduler {
	private static Logger logger= LogManager.getLogger();;;

	private final View JA_VIEW;

	private final CameraController CAM_CONTROLLER;

	private final AnimationScan SCAN;

	private final JAPlayerEventHandler EVENT_HANDLER;

	private final SpeedProvider SPEED_CONTROL;

	private final int T_INIT_LOOKAHEAD;

	private final int FRAME_DRIFT_LIMIT;

	private final boolean SHOW_ANIM_TIMES;

	private final boolean LOG_ANIM_SUMMARY;

	private final boolean LOG_DROPPED_FRAMES_SUMMARY;

	private final boolean LOG_DROPPED_FRAMES;

	private final boolean STREAMED_SIGNS;

	private final int DROP_PERIOD_LIMIT;

	private final float TIME_BEGIN;

	private final float TIME_END;

	private final float SYNC_RATE;

	private final String LOG_PREFIX;

	private boolean stopPending;

	public AnimationScheduler(View view, CameraController camctrl, AnimationScan ascan, JAPlayerEventHandler peh,
			SpeedProvider sp, float tBegin, float tEnd, float syncRate, int initla, int fdlimit, int droplimit,
			boolean streamed, boolean showat, boolean logas, boolean logdfs, boolean logdf) {
		this.JA_VIEW = view;
		this.CAM_CONTROLLER = camctrl;
		this.SCAN = ascan;
		this.EVENT_HANDLER = peh;
		this.SPEED_CONTROL = sp;
		this.TIME_BEGIN = tBegin;
		this.TIME_END = tEnd;
		this.SYNC_RATE = syncRate;
		this.T_INIT_LOOKAHEAD = initla;
		this.FRAME_DRIFT_LIMIT = fdlimit;
		this.DROP_PERIOD_LIMIT = droplimit;
		this.STREAMED_SIGNS = streamed;
		this.SHOW_ANIM_TIMES = showat;
		this.LOG_ANIM_SUMMARY = logas;
		this.LOG_DROPPED_FRAMES_SUMMARY = logdfs;
		this.LOG_DROPPED_FRAMES = logdf;

		this.LOG_PREFIX = "Frame ";

		clearStopRequest();
	}

	public synchronized void requestStopPlayer() {
		this.stopPending = true;
	}

	public void playAnimation() throws JAException, InterruptedException {
		logger.log(LoggerConfig.INFOLevel, LoggerConfig.RENDERMarker, "playAnimation starting");

		checkScannnerHasFrames();

		int nScanned = 0;
		int fInit = this.SCAN.f();
		if (this.LOG_ANIM_SUMMARY) {
			logger.log(LoggerConfig.STATSLevel, LoggerConfig.RENDERMarker, "playAnimation initial Signs=" + this.SCAN

					.sCount() + " Frames=" + this.SCAN.fCount());
		}

		JAPlayerStats stats = new JAPlayerStats();
		this.JA_VIEW.setPlayerStats(stats);
		int nSkip = 0;
		int nPlay = 0;
		int nDrop = 0;
		int nCurDrop = 0;
		int nReprieve = 0;
		float tDropped = 0.0F;

		JATimer TMR = new JATimer(logger, LoggerConfig.LOGLevel, LoggerConfig.PHASEMarker);
		TMR.setDisplayDisabled(!this.SHOW_ANIM_TIMES);

		boolean DRIFT_LIMIT_IS_SET = this.FRAME_DRIFT_LIMIT != 0;
		boolean DO_ALLOW_REPRIEVE = 0 <= this.DROP_PERIOD_LIMIT;

		long T_START = 0L;

		float tNext = 0.0F - this.TIME_BEGIN * 1000.0F;

		float tDrift = 0.0F;
		float tDriftOld = -tNext;
		float tPlay = 0.0F;

		float tSlack = 0.0F;
		long t0 = 0L;

		float SPEED_UP = this.SPEED_CONTROL == null ? 1.0F : this.SPEED_CONTROL.getSpeedUp();

		float tBaseStart = -this.TIME_BEGIN * 1000.0F / SPEED_UP;

		float tBaseEnd = this.TIME_END > this.TIME_BEGIN ? tBaseStart + this.TIME_END * 1000.0F / SPEED_UP : 0.0F;

		float tSSAdjust = 0.0F;

		boolean playing = false;

		boolean FRAME_FINAL = false;
		AvatarSettings activeAvr = null;
		CameraSettings activeCam = null;

		if ((this.LOG_ANIM_SUMMARY) || (this.LOG_DROPPED_FRAMES_SUMMARY)) {
			logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.RENDERMarker,
					"AnimationScheduler: playAnimation player.time.begin: " + this.TIME_BEGIN);

			logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.RENDERMarker,
					"AnimationScheduler: playAnimation player.time.end: " + this.TIME_END);

			logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.RENDERMarker,
					"AnimationScheduler: playAnimation player.initial.lookahead: " + this.T_INIT_LOOKAHEAD);

			logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.RENDERMarker,
					"AnimationScheduler: playAnimation player.frame.drift.limit: " + this.FRAME_DRIFT_LIMIT
							+ " (Drift Limit Set: " + DRIFT_LIMIT_IS_SET + ")");

			logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.RENDERMarker,
					"AnimationScheduler: playAnimation player.drop.range.limit: " + this.DROP_PERIOD_LIMIT
							+ " (Allow Reprieve: " + DO_ALLOW_REPRIEVE + ")");

			logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.RENDERMarker,
					"AnimationScheduler: playAnimation player.sync.rate: " + this.SYNC_RATE);

			logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.RENDERMarker,
					"AnimationScheduler: playAnimation SpeedUp: " + SPEED_UP);

			logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.RENDERMarker,
					"AnimationScheduler: playAnimation Base Start time: " + tBaseStart);

			logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.RENDERMarker,
					"AnimationScheduler: playAnimation Base End time: " + tBaseEnd);
		}

		this.JA_VIEW.startAnimation();
		this.JA_VIEW.resetAmbientClock();

		while ((!this.SCAN.scanIsAtLimit()) && (!stopRequestIsPending()) && (!FRAME_FINAL)) {
			nScanned++;

			int F = this.SCAN.f();
			CASFrame FRAME = this.SCAN.frame();

			float FRAME_DURATION = FRAME.getDuration();
			float FRAME_START = FRAME.getTime();

			float newSpeed = this.SPEED_CONTROL == null ? 1.0F : this.SPEED_CONTROL.getSpeedUp();
			if (newSpeed != SPEED_UP) {
				tBaseStart += FRAME_START / SPEED_UP - FRAME_START / newSpeed;
				tBaseEnd = this.TIME_END > this.TIME_BEGIN ? tBaseStart + this.TIME_END * 1000.0F / newSpeed : 0.0F;
				SPEED_UP = newSpeed;
				if (this.SHOW_ANIM_TIMES) {
					logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.RENDERMarker,
							"AnimationScheduler: playAnimation SpeedUp: " + SPEED_UP);

					logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.RENDERMarker,
							"AnimationScheduler: playAnimation Base Start time: " + tBaseStart);

					logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.RENDERMarker,
							"AnimationScheduler: playAnimation Base End time: " + tBaseEnd);
				}
			}

			float tFrame = tBaseStart + FRAME_START / SPEED_UP;
			float tFrameEnd = tFrame + FRAME_DURATION / SPEED_UP;

			TMR.showGivenTimeMS(tBaseEnd,
					String.format("%s%3d%s", new Object[] { this.LOG_PREFIX, Integer.valueOf(F), ": END      " }));

			TMR.showGivenTimeMS(tFrame,
					String.format("%s%3d%s", new Object[] { this.LOG_PREFIX, Integer.valueOf(F), ": NEXT     " }));
			float tNow = playing ? TMR.getRelativeTimeMS(T_START) : 0.0F;
			tDrift = tNow - tSSAdjust - tFrame;

			if (this.SYNC_RATE > 0.0F) {
				float tDriftSU = tDrift * SPEED_UP;
				float tDelta = FRAME_DURATION / SPEED_UP * this.SYNC_RATE;
				if ((tDrift > tSSAdjust) && (tDriftSU > FRAME_DURATION * 0.5D) && (tDriftSU < FRAME_DURATION)) {
					tSSAdjust += tDelta;
					tDrift -= tDelta;
				} else if (tSSAdjust != 0.0F) {
					tSSAdjust -= tDelta;
					if (tSSAdjust < 0.0F)
						tSSAdjust = 0.0F;
					tDrift = tNow - tSSAdjust - tFrame;
				}
			}
			TMR.showGivenTimeMS(tNow,
					String.format("%s%3d%s", new Object[] { this.LOG_PREFIX, Integer.valueOf(F), ": NOW      " }));
			if (tSSAdjust != 0.0F) {
				TMR.showGivenTimeMS(tSSAdjust,
						String.format("%s%3d%s", new Object[] { this.LOG_PREFIX, Integer.valueOf(F), ": ADJUST   " }));
				TMR.showGivenTimeMS(tNow - tSSAdjust,
						String.format("%s%3d%s", new Object[] { this.LOG_PREFIX, Integer.valueOf(F), ": NOWADJ   " }));
			}

			TMR.showGivenTimeMS(tDriftOld,
					String.format("%s%3d%s", new Object[] { this.LOG_PREFIX, Integer.valueOf(F), ": DRIFTo   " }));

			TMR.showGivenTimeMS(tDrift,
					String.format("%s%3d%s", new Object[] { this.LOG_PREFIX, Integer.valueOf(F), ": DRIFT    " }));

			if (this.SCAN.scanIsAtNewSign()) {
				logger.log(LoggerConfig.LOGLevel, LoggerConfig.SIGNMarker,
						"Play: Sign: \"" + this.SCAN.sign().getGloss() + "\"");
				AvatarSettings avr = this.SCAN.sign().getAvatarSettings();

				if ((F == 0) && (avr == null)) {
					avr = new AvatarSettings(this.JA_VIEW.currentAvatar());
					this.SCAN.sign().setAvatarSettings(avr);
				}
				if (avr != null) {
					activeAvr = avr;
				}
				CameraSettings cam = this.SCAN.sign().getCameraSettings();
				if (cam != null) {
					activeCam = cam;
				}
			}

			float T_DRIFT_SU = tDrift * SPEED_UP;
			boolean FRAME_INRANGE = tFrameEnd > 0.0F;
			FRAME_FINAL = (tBaseEnd > 0.0F) && (tFrameEnd >= tBaseEnd);

			boolean FRAME_DROPPED = ((!this.SCAN.scanIsAtLastFrame()) && (!FRAME_FINAL))
					|| ((!playing) && (((DRIFT_LIMIT_IS_SET) && (this.FRAME_DRIFT_LIMIT < T_DRIFT_SU))
							|| (FRAME_DURATION <= T_DRIFT_SU)));

			boolean FRAME_REPRIEVED = (FRAME_DROPPED) && (DO_ALLOW_REPRIEVE) && (this.DROP_PERIOD_LIMIT <= tDropped)
					&& (playing) && (FRAME_DURATION > 0.0F);

			if (FRAME_INRANGE) {
				fireNewFrameEvent((FRAME_DROPPED) && (!FRAME_REPRIEVED));
			}

			boolean PLAY_FRAME = (FRAME_INRANGE) && ((!FRAME_DROPPED) || (FRAME_REPRIEVED));

			if (PLAY_FRAME) {
				nPlay++;

				if ((activeAvr != null) || (activeCam != null)) {

					t0 = TMR.getTimeNow();

					if (activeAvr != null) {
						logger.log(LoggerConfig.LOGLevel, LoggerConfig.RENDERMarker,
								"Play: Avatar Change: " + activeAvr.getName());

						AvatarDefinitionAccess avAc = new AvatarDefinitionForView(activeAvr.getName());

						this.JA_VIEW.requestSwitchAvatar(avAc);

						this.JA_VIEW.awaitAvatarAvailable();
						logger.log(LoggerConfig.TRACELevel, LoggerConfig.RENDERMarker,
								"Play: Avatar Available: " + activeAvr);

						activeAvr = null;
					}
					if (activeCam != null) {
						logger.log(LoggerConfig.LOGLevel, LoggerConfig.RENDERMarker,
								"Play: Camera Change: " + activeCam);

						this.CAM_CONTROLLER.setCamera(activeCam.getSettings());
						activeCam = null;
					}

					if (playing) {
						tSSAdjust += TMR.getRelativeTimeMS(t0);
						TMR.showGivenTimeMS(tSSAdjust, String.format("%s%3d%s",
								new Object[] { this.LOG_PREFIX, Integer.valueOf(F), ": ADJUST   " }));
					} else {
						T_START = TMR.startAndGet();
						playing = true;
					}
				}

				stats.startNewFrame(F);
				t0 = TMR.getTimeNow();

				this.JA_VIEW.playOneFrame(FRAME, F, SPEED_UP, this.SHOW_ANIM_TIMES, this.LOG_PREFIX);

				tPlay = TMR.getRelativeTimeMS(t0);

				if (FRAME_REPRIEVED) {
					logReprievedFrame(F, tDrift);
					nReprieve++;

				} else {
					logDroppedFramesEnd(nCurDrop);
					nCurDrop = 0;
				}
				tDropped = 0.0F;
			} else if (FRAME_DROPPED) {
				if (FRAME_INRANGE) {
					logDroppedFramesBegin(nCurDrop, F, tDrift);
					nDrop++;

					tDropped += FRAME_DURATION;
				} else {
					logSkippedFrame(F);
					nSkip++;
				}
			}

			this.SCAN.checkForAnimationUpdate();

			float tClock = (playing ? TMR.getRelativeTimeMS(T_START) : 0.0F) - tSSAdjust;

			tNext += FRAME_DURATION / SPEED_UP;
			tSlack = tFrame + FRAME_DURATION / SPEED_UP - tClock;
			float T_SLACK_SU = tSlack * SPEED_UP;

			if (PLAY_FRAME) {
				stats.setPlayTime(tPlay * SPEED_UP);

				TMR.showGivenTimeMS(tPlay,
						String.format("%s%3d%s", new Object[] { this.LOG_PREFIX, Integer.valueOf(F), ": PLAY     " }));

				if (tDrift < 0.0F)
					tPlay += T_DRIFT_SU;
				if (tSlack < 0.0F) {
					tPlay += T_SLACK_SU;
				}
				TMR.showGivenTimeMS(tPlay,
						String.format("%s%3d%s", new Object[] { this.LOG_PREFIX, Integer.valueOf(F), ": PLAY-NET " }));
			}

			TMR.showGivenTimeMS(tSlack,
					String.format("%s%3d%s", new Object[] { this.LOG_PREFIX, Integer.valueOf(F), ": SLACK    " }));

			if (!FRAME_DROPPED) {
				float tIdleSU = 0.0F;
				if (0.0F < tDrift)
					tIdleSU += T_DRIFT_SU;
				if (0.0F < tSlack) {
					tIdleSU += T_SLACK_SU;
				}

				stats.setIdleTime(tIdleSU);
			}

			tDriftOld = -tSlack;
			if (0.0F < tSlack) {
				t0 = TMR.getTimeNow();

				delay(tSlack);

				float tDelay = TMR.getRelativeTimeMS(t0);
				tDriftOld += tDelay;
			}

			if (this.SHOW_ANIM_TIMES) {
				logger.log(LoggerConfig.LOGLevel, LoggerConfig.PHASEMarker, "                                 ");
			}

			this.SCAN.advanceFrame();

			if ((this.STREAMED_SIGNS) && (this.SCAN.scanIsAtNewSign()) && (!this.SCAN.newSignExists())) {
				int nsign = this.SCAN.s();
				t0 = TMR.getTimeNow();
				this.SCAN.waitForSigns(nsign + 1);
				float tWait = TMR.getRelativeTimeMS(t0);
				tSSAdjust += tWait;

				TMR.showGivenTimeMS(tSSAdjust,
						String.format("%s%3d%s", new Object[] { this.LOG_PREFIX, Integer.valueOf(F), ": ADJUST   " }));
				if (0.1F <= tWait) {
					logger.log(LoggerConfig.TRACELevel, LoggerConfig.SIGNMarker,
							"At sign " + this.SCAN.s() + ":  " + "tWait, tSSAdjust = " + tWait + ", " + tSSAdjust);
				}
			} else {
				this.SCAN.waitForFrameIfNeeded();
			}
		}

		clearStopRequest();

		this.JA_VIEW.stopAnimation();
		this.JA_VIEW.setPlayerStats(null);

		if ((this.LOG_ANIM_SUMMARY) || (this.LOG_DROPPED_FRAMES_SUMMARY)) {
			reportPlayerStatistics(stats, fInit, nScanned, nSkip, nPlay, nDrop, nReprieve);
		}
	}

	private final void logDroppedFramesBegin(int ndrop, int f, float tdrift) {
		if ((this.LOG_DROPPED_FRAMES) && (ndrop == 0)) {
			logger.log(LoggerConfig.LOGLevel, LoggerConfig.SYNCMarker, String.format("%s%3d: DROP     %10.3f ms",
					new Object[] { this.LOG_PREFIX, Integer.valueOf(f), Float.valueOf(tdrift) }));
		}
	}

	private final void logDroppedFramesEnd(int ndrop) {
		if ((this.LOG_DROPPED_FRAMES) && (1 < ndrop)) {
			logger.log(LoggerConfig.LOGLevel, LoggerConfig.SYNCMarker,
					String.format("DROPPED RANGE LENGTH = %d", new Object[] { Integer.valueOf(ndrop) }));
		}
	}

	private final void logSkippedFrame(int F) {
		if (this.SHOW_ANIM_TIMES) {
			logger.log(LoggerConfig.LOGLevel, LoggerConfig.SYNCMarker,
					String.format("%s%3d: SKIP", new Object[] { this.LOG_PREFIX, Integer.valueOf(F) }));
		}
	}

	private final void logReprievedFrame(int F, float tdrift) {
		if (this.LOG_DROPPED_FRAMES) {
			logger.log(LoggerConfig.LOGLevel, LoggerConfig.SYNCMarker, String.format("%s%3d: REPRIEVE %9.3fms",
					new Object[] { this.LOG_PREFIX, Integer.valueOf(F), Float.valueOf(tdrift) }));
		}
	}

	protected void reportPlayerStatistics(JAPlayerStats stats, int F_BASE, int N_FRAMES, int N_SKIP, int N_PLAY,
			int N_DROP, int N_REPRIEVE) {
		int N_IGNORE = N_FRAMES <= 3 ? 0 : 3;
		int F_START = F_BASE + N_IGNORE;

		if (this.LOG_ANIM_SUMMARY) {
			String SKIP_STR = " (first " + N_IGNORE + " ignored in averages)";

			logger.log(LoggerConfig.STATSLevel, LoggerConfig.PHASEMarker,
					"playAnimation: Stats for " + stats.getCountValid(F_START) + " frames" + SKIP_STR);
			logger.log(LoggerConfig.STATSLevel, LoggerConfig.PHASEMarker,
					String.format("playAnimation: Average Frame-Generate Time:  %6.3f ms",
							new Object[] { Float.valueOf(stats.getAverageGenerateTime(F_START)) }));
			logger.log(LoggerConfig.STATSLevel, LoggerConfig.PHASEMarker,
					String.format("playAnimation: Average Frame-Display Time:   %6.3f ms",
							new Object[] { Float.valueOf(stats.getAverageDisplayTime(F_START)) }));
			logger.log(LoggerConfig.STATSLevel, LoggerConfig.PHASEMarker,
					String.format("playAnimation: Average Frame-Play Time:      %6.3f ms",
							new Object[] { Float.valueOf(stats.getAveragePlayTime(F_START)) }));
			logger.log(LoggerConfig.STATSLevel, LoggerConfig.PHASEMarker,
					String.format("playAnimation: Average Frame-Idle Time:      %6.3f ms",
							new Object[] { Float.valueOf(stats.getAverageIdleTime(F_START)) }));
		}
		if (this.LOG_DROPPED_FRAMES_SUMMARY) {
			if (N_SKIP != 0) {
				logger.log(LoggerConfig.STATSLevel, LoggerConfig.SYNCMarker,
						String.format("playAnimation: Skipped:  %4d", new Object[] { Integer.valueOf(N_SKIP) }));
			}
			logger.log(LoggerConfig.STATSLevel, LoggerConfig.SYNCMarker,
					String.format("playAnimation: Played:   %4d", new Object[] { Integer.valueOf(N_PLAY) }));
			if (N_DROP != 0) {
				logger.log(LoggerConfig.STATSLevel, LoggerConfig.SYNCMarker,
						String.format("playAnimation: Dropped:  %4d", new Object[] { Integer.valueOf(N_DROP) }));
			}
			if (N_REPRIEVE != 0) {
				logger.log(LoggerConfig.STATSLevel, LoggerConfig.SYNCMarker,
						String.format("playAnimation: Reprieved:%4d", new Object[] { Integer.valueOf(N_REPRIEVE) }));
			}
			logger.log(LoggerConfig.STATSLevel, LoggerConfig.SYNCMarker,
					String.format("playAnimation: Scanned:  %4d", new Object[] { Integer.valueOf(N_FRAMES) }));
		}
	}

	protected void checkScannnerHasFrames() throws InterruptedException {
		if (this.SCAN.animationIsIncomplete()) {
			if (this.STREAMED_SIGNS) {
				this.SCAN.waitForSigns(1);
			} else {
				this.SCAN.waitForFramesWithTime(this.T_INIT_LOOKAHEAD);
			}
		}
	}

	private final JATimer D_TMR = new JATimer(logger, LoggerConfig.WARNLevel, LoggerConfig.PHASEMarker);

	public void delay(float ms) throws InterruptedException {
		if (0.0F < ms) {

			this.D_TMR.start();
			float mstogo = ms;
			while (0.5D <= mstogo) {
				try {
					int imstogo = (int) mstogo;
					int ins = 1000 * (int) (1000.0F * (mstogo - imstogo));
					Thread.sleep(imstogo, ins);
				} catch (InterruptedException ix) {
					logger.log(LoggerConfig.WARNLevel, LoggerConfig.THREADMarker,
							"AnimationScheduler: delay() interrupted");

					throw ix;
				}

				mstogo = ms - this.D_TMR.getTimeMS();
			}
		}
	}

	protected synchronized boolean stopRequestIsPending() {
		return this.stopPending;
	}

	protected synchronized void clearStopRequest() {
		this.stopPending = false;
	}

	protected void fireNewFrameEvent(boolean dropped) {
		if (this.EVENT_HANDLER != null) {
			this.EVENT_HANDLER.playerIsAtNewFrame(this.SCAN, dropped);
		}
	}
}
