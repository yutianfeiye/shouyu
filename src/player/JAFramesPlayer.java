package player;

import cas.CASFrame;
import jarp.CameraController;
import jarp.ThreadCompletionChecker;
import jarp.View;
import jautil.JAAvatarsEnv;
import jautil.JAException;
import jautil.JAOptions;
import jautil.SpeedProvider;
import jautil.avatar.AvatarDefinitionAccess;
import jautil.avatar.AvatarDefinitionForView;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import sigmlanim.AnimatedSign;
import sigmlanim.SiGMLAnimation;
import sigmlgen.playerctrl.AvatarSettings;
import sigmlgen.playerctrl.CameraSettings;
import util.LoggerConfig;

public class JAFramesPlayer implements AvatarEventHandler, SequencePlayManager.Client, OneFramePlayManager.Client {
	private static Logger logger= LogManager.getLogger();;;

	public static final int SZ_CAM_DATA = 8;

	private final JAOptions JA_OPTIONS;

	private final SynchCameraAccess CAM_ACCESS;

	private final boolean SHOW_ANIM_TIMES;

	private final boolean LOG_ANIM_SUMMARY;

	private final boolean LOG_DROPPED_FRAMES_SUMMARY;

	private final PlayerFlags FLAGS;

	private final int ANIM_INIT_LOOKAHEAD;

	private final int FRAME_DRIFT_LIMIT;

	private final int DROP_RANGE_LIMIT;

	private final SpeedProvider SPEED_CONTROL;

	private float TIME_BEGIN;

	private float TIME_END;

	private float SYNC_RATE;

	private final AvatarEventHandler AVATAR_EVENT_HANDLER;

	private final JAPlayerEventHandler PLAYER_EVENT_HANDLER;

	private View jaView;

	private CameraController camctrllr;

	private CameraChangeMonitor cameraMonitor;

	private boolean scanIsSet;

	private AnimationScan scan;

	private SequencePlayManager sequencePlayer;

	private OneFramePlayManager framePlayer;

	private boolean latestPlayIsStreamed;

	private boolean lastStopWasSuspend;

	public JAFramesPlayer(JAOptions jopts, JACanvasEmbedder embedder) {
		this(jopts, embedder, null, null, null);
	}

	public JAFramesPlayer(JAOptions jopts, JACanvasEmbedder embedder, AvatarEventHandler aehdlr,
			JAPlayerEventHandler pehdlr, SpeedProvider sp) {
		this(jopts, embedder, aehdlr, pehdlr, sp, false, false);
	}

	public JAFramesPlayer(JAOptions jopts, JACanvasEmbedder embedder, AvatarEventHandler aehdlr,
			JAPlayerEventHandler pehdlr, SpeedProvider sp, boolean cyclic, boolean onesign) {
		this.JA_OPTIONS = jopts;

		this.SHOW_ANIM_TIMES = this.JA_OPTIONS.doShowAnimationTimes();
		this.LOG_ANIM_SUMMARY = this.JA_OPTIONS.doLogAnimationSummary();

		this.LOG_DROPPED_FRAMES_SUMMARY = this.JA_OPTIONS.doLogDroppedFramesSummary();

		this.FLAGS = new PlayerFlags(cyclic, onesign, false);

		this.ANIM_INIT_LOOKAHEAD = this.JA_OPTIONS.playerInitialLookaheadMS();
		int fdl = this.JA_OPTIONS.playerFrameDriftLimitMS();
		this.FRAME_DRIFT_LIMIT = (fdl < 0 ? 0 : fdl);
		this.DROP_RANGE_LIMIT = this.JA_OPTIONS.playerDropRangeLimitMS();
		logger.log(LoggerConfig.LOGLevel, LoggerConfig.SESSIONMarker, "JAFramesPlayer created: Init-lookahead="
				+ this.ANIM_INIT_LOOKAHEAD + ", Drift-limit=" + (this.FRAME_DRIFT_LIMIT == 0 ? "(none)" :

						Integer.valueOf(this.FRAME_DRIFT_LIMIT))
				+ ", Drop-range-limit="
				+ (this.DROP_RANGE_LIMIT < 0 ? "(none)" : Integer.valueOf(this.DROP_RANGE_LIMIT)));

		this.PLAYER_EVENT_HANDLER = pehdlr;
		this.SPEED_CONTROL = sp;

		this.AVATAR_EVENT_HANDLER = aehdlr;
		this.jaView = new View(this, this.JA_OPTIONS, embedder);

		this.CAM_ACCESS = new SynchCameraAccess();

		this.scanIsSet = false;
		this.scan = null;

		this.sequencePlayer = null;
		this.framePlayer = null;
	}

	protected JAOptions getOptions() {
		return this.JA_OPTIONS;
	}

	protected boolean hasAvatar() {
		return this.FLAGS.hasAvatar();
	}

	protected JAPlayerEventHandler getPlayerEventHandler() {
		return this.PLAYER_EVENT_HANDLER;
	}

	public void setCyclicPlay(boolean cyclic) {
		this.FLAGS.setCyclicPlay(cyclic);
	}

	public void setSingleSignPlay(boolean single) {
		if (this.scan == null) {
			this.FLAGS.setSingleSignPlay(single);
		} else {
			this.scan.setSingleSignPlay(single);
		}
	}

	public void requestSwitchAvatar(String avatar) {
		runAsynchRequestSwitchAvatar(avatar);
	}

	protected void runAsynchRequestSwitchAvatar(final String AVATAR) {
		Thread trsa = new Thread() {
			public void run() {
				JAFramesPlayer.logger.log(LoggerConfig.INFOLevel, LoggerConfig.THREADMarker,
						"Run: AsynchRequestSwitchAvatar");
				JAFramesPlayer.this.doRequestSwitchAvatar(AVATAR);
				JAFramesPlayer.logger.log(LoggerConfig.STATSLevel, LoggerConfig.THREADMarker,
						"End: AsynchRequestSwitchAvatar");
			}
		};
		trsa.start();
	}

	protected void doRequestSwitchAvatar(String avatar) {
		JAAvatarsEnv avenv = this.JA_OPTIONS.getAvatarsEnv();
		AvatarDefinitionAccess avdef = avenv.getDefinition(avatar);
		if (avdef.isAvailable()) {
			logger.log(LoggerConfig.TRACELevel, LoggerConfig.CONTROLMarker, "doRequestSwitchAvatar " + avatar);

			this.jaView.requestSwitchAvatar(avdef);
			clearAnimation();
		} else {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.CONTROLMarker,
					"doRequestSwitchAvatar invalid for " + avatar + " so continue with " + this.jaView.currentAvatar());

			avdef = avenv.getDefinition(this.jaView.currentAvatar());

			this.jaView.requestSwitchAvatar(avdef);
			clearAnimation();
		}
	}

	public synchronized void avatarIsLoaded(String avatar) {
		boolean gotav = avatar != null;

		this.FLAGS.setHasAvatar(gotav);

		if (gotav) {

			this.JA_OPTIONS.updateAvatarID(avatar);

			if (this.camctrllr == null) {
				this.camctrllr = new CameraController(this.jaView);
			} else {
				this.camctrllr.reinitialiseCameraControl(this.jaView);
			}

			float[] ccvalues = this.JA_OPTIONS.cameraSettings();
			this.camctrllr.setCamera(ccvalues);

			this.CAM_ACCESS.setController(this.camctrllr);
			logger.log(LoggerConfig.LOGLevel, LoggerConfig.CONTROLMarker, "avatarIsLoaded " + avatar);

			checkCamera();
		}

		if (this.AVATAR_EVENT_HANDLER != null) {
			this.AVATAR_EVENT_HANDLER.avatarIsLoaded(avatar);
		}
	}

	public synchronized void avatarIsUnloaded(String avatar) {
		float[] ccvalues = new float[8];
		this.CAM_ACCESS.getController().getCameraSettings(ccvalues);
		logger.log(LoggerConfig.LOGLevel, LoggerConfig.CONTROLMarker, "avatarIsUnLoaded " + avatar);

		this.JA_OPTIONS.updateCameraSettings(ccvalues);

		this.FLAGS.setHasAvatar(false);
		this.CAM_ACCESS.setController(null);

		if (this.AVATAR_EVENT_HANDLER != null) {
			this.AVATAR_EVENT_HANDLER.avatarIsUnloaded(avatar);
		}
	}

	public synchronized void createStandardCameraChangeMonitor() {
		this.cameraMonitor = new CameraChangeMonitorForPlayer(this.CAM_ACCESS);
	}

	protected void checkCamera() {
		if (this.cameraMonitor != null) {
			if (this.cameraMonitor.checkCameraForChange()) {
				String camnew = this.cameraMonitor.cameraSettingsString();
				logger.log(LoggerConfig.LOGLevel, LoggerConfig.CAMERAMarker, "Camera change: " + camnew);
			}
		}
	}

	protected void handleInterrupt(String tag, InterruptedException ix) {
		String PREFIX = "JAFramesPlayer." + tag + ": ";
		logger.log(LoggerConfig.WARNLevel, LoggerConfig.CONTROLMarker, PREFIX + ix);
		Thread.currentThread().interrupt();
	}

	protected synchronized void awaitScanIsSet(String tag) {
		try {
			while (!this.scanIsSet) {
				logger.log(LoggerConfig.LOGLevel, LoggerConfig.SESSIONMarker,
						"JAFramesPlayer: Wait for scan to be set");

				wait();
			}
		} catch (InterruptedException ix) {
			handleInterrupt(tag, ix);
		}
	}

	public FrameIndexScanAccess getFrameIndexAccess() {
		awaitScanIsSet("getFrameIndexAccess()");

		return this.scan == null ? null : this.scan.getFrameIndexAccess();
	}

	public synchronized void clearAnimation() {
		this.scanIsSet = false;
		this.scan = null;
	}

	public synchronized void setAnimation(SiGMLAnimation anim) {
		this.scan = (anim == null ? null : new AnimationScan(anim, this.FLAGS));

		this.scanIsSet = true;
		notifyAll();
	}

	public synchronized SiGMLAnimation getAnimation() {
		awaitScanIsSet("getAnimation()");

		return this.scan == null ? null : this.scan.animation();
	}

	public synchronized void ensureAnimationIsComplete() {
		String TAG = "ensureAnimationIsComplete()";
		awaitScanIsSet("ensureAnimationIsComplete()");
		try {
			if (this.scan != null)
				this.scan.waitForFullAnimation();
		} catch (InterruptedException ix) {
			handleInterrupt("ensureAnimationIsComplete()", ix);
		}
	}

	public synchronized SignStatusRecord makeSignStatusRecord() {
		awaitScanIsSet("makeSignStatusRecord()");

		return this.scan == null ? null : new SignStatusRecord(this.scan);
	}

	public synchronized int countFrames() {
		return this.scan == null ? 0 : this.scan.fCount();
	}

	public synchronized int countSigns() {
		return this.scan == null ? -1 : this.scan.sCount();
	}

	public synchronized boolean hasAnimationData() {
		this.scan.checkForAnimationUpdate();

		return countFrames() != 0;
	}

	public synchronized AnimatedSign currentSign() {
		return this.scan == null ? null : this.scan.sign();
	}

	public synchronized void terminate() throws InterruptedException {
		stopPlaying();
		awaitPlayerInactive();

		ThreadCompletionChecker gldispschedcc = this.jaView.terminateViewDisplay();
		if (gldispschedcc != null) {
			gldispschedcc.waitForCompletion();
		}

		this.jaView.terminateView();
		this.jaView = null;
	}

	public synchronized void awaitPlayerInactive() throws InterruptedException {
		while (playerIsActive()) {
			wait();
		}
	}

	public synchronized void showFrame(int F) {
		showFrame(F, null);
	}

	public synchronized void showFrame(int f, SignStatusRecord ss) {
		if ((this.FLAGS.hasAvatar()) && (!playerIsActive()) && (this.scan != null) && (this.scan.frameExists(f))) {
			this.framePlayer = new OneFramePlayManager(f, ss, this.jaView, this.scan, this);

			this.framePlayer.startFramePlay();
		}
	}

	public synchronized void stopPlaying() {
		if (this.sequencePlayer != null) {
			this.lastStopWasSuspend = false;
			this.sequencePlayer.stopSequencePlay();
		}
	}

	public synchronized void suspendPlaying() {
		if (this.sequencePlayer != null) {
			this.lastStopWasSuspend = true;
			this.sequencePlayer.stopSequencePlay();
		}
	}

	public synchronized void startPlayingStreamed() {
		this.latestPlayIsStreamed = true;
		launchPlayingThread(true, false);
	}

	public synchronized void startPlaying() {
		this.latestPlayIsStreamed = false;
		launchPlayingThread(false, false);
	}

	public synchronized void resumePlaying() {
		if (!this.lastStopWasSuspend) {
			logger.log(LoggerConfig.ERRORLevel, LoggerConfig.SESSIONMarker, "JAFramesPlayer: spurious resume request");
		} else {
			launchPlayingThread(this.latestPlayIsStreamed, true);
		}
	}

	public synchronized boolean ServiceIsAvailable() {
		return VideoClient.serviceIsAvailable();
	}

	public synchronized boolean GenIsPossible() {
		if ((this.FLAGS.hasAvatar()) && (!playerIsActive()) && (this.scan != null)) {
		}

		return (hasAnimationData()) && (!this.scan.animationIsIncomplete());
	}

	public synchronized void doVideoGen(final String V_PATH, final boolean DO_LOG) {
		Thread vgt = new Thread() {
			public void run() {
				JAFramesPlayer.logger.log(LoggerConfig.INFOLevel, LoggerConfig.THREADMarker, "Run: runVideoGen");
				JAFramesPlayer.this.runVideoGen(V_PATH, DO_LOG);
				JAFramesPlayer.logger.log(LoggerConfig.STATSLevel, LoggerConfig.THREADMarker, "End: runVideoGen");
			}
		};
		vgt.start();
	}

	protected void runVideoGen(String V_PATH, boolean DO_LOG) {
		String PFX = "VideoGen: ";

		logger.log(LoggerConfig.INFOLevel, LoggerConfig.VIDEOMarker, "VideoGen: Output path: " + V_PATH);

		this.TIME_BEGIN = this.JA_OPTIONS.getFloatProperty("player.time.begin");
		this.TIME_END = this.JA_OPTIONS.getFloatProperty("player.time.end");

		float tBaseStart = this.TIME_BEGIN * 1000.0F;
		float tBaseEnd = this.TIME_END > this.TIME_BEGIN ? this.TIME_END * 1000.0F : 0.0F;

		if (DO_LOG) {
			logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.VIDEOMarker,
					"VideoGen: player.time.begin: " + this.TIME_BEGIN);

			logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.VIDEOMarker,
					"VideoGen: player.time.end: " + this.TIME_END);

			logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.VIDEOMarker, "VideoGen: Base Start time: " + tBaseStart);

			logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.VIDEOMarker, "VideoGen: Base End time: " + tBaseEnd);
		}

		this.PLAYER_EVENT_HANDLER.playerHasStarted();

		try {
			boolean FRAME_FINAL = false;

			AvatarSettings activeAvr = null;
			CameraSettings activeCam = null;
			int W = this.jaView.getWidth();
			int H = this.jaView.getHeight();
			int FPS = this.scan.animFPS();
			int playTotal = 0;

			if ((tBaseStart == 0.0F) && (tBaseEnd == 0.0F)) {
				playTotal = this.scan.fCount();
				logger.log(LoggerConfig.STATSLevel, LoggerConfig.VIDEOMarker,
						"VideoGen: Frames to play: " + playTotal + " (all)");
			} else {
				this.scan.setFrame(0);
				while ((!this.scan.scanIsAtLimit()) && (!FRAME_FINAL)) {
					CASFrame frameF = this.scan.frame();
					float tFrameEnd = frameF.getTime() + frameF.getDuration();
					if (tFrameEnd > tBaseStart)
						playTotal++;
					FRAME_FINAL = (tBaseEnd > 0.0F) && (tFrameEnd >= tBaseEnd);
					this.scan.advanceFrame();
				}
				logger.log(LoggerConfig.STATSLevel, LoggerConfig.VIDEOMarker, "VideoGen: Frames to play: " + playTotal);
			}

			int N = playTotal;

			byte[] pixels = new byte[W * H * 3];
			FrameDataExchange FRAME_EXCHG = new FrameDataExchange();
			VideoClient.startThread(FRAME_EXCHG, N, W, H, FPS, V_PATH);

			this.jaView.startAnimationForVideo(DO_LOG, W, H);
			this.jaView.resetAmbientClock();

			this.scan.setFrame(0);
			FRAME_FINAL = false;

			while ((!this.scan.scanIsAtLimit()) && (!FRAME_FINAL)) {
				int F = this.scan.f();

				if (this.scan.scanIsAtNewSign()) {
					logger.log(LoggerConfig.LOGLevel, LoggerConfig.VIDEOMarker,
							"VideoGen: Sign: \"" + this.scan.sign().getGloss() + "\"");
					AvatarSettings avr = this.scan.sign().getAvatarSettings();

					if ((F == 0) && (avr == null)) {
						avr = new AvatarSettings(this.jaView.currentAvatar());
						this.scan.sign().setAvatarSettings(avr);
					}
					if (avr != null) {
						activeAvr = avr;
					}
					CameraSettings cam = this.scan.sign().getCameraSettings();
					if (cam != null) {
						activeCam = cam;
					}
				}

				CASFrame frameF = this.scan.frame();
				float tFrameEnd = frameF.getTime() + frameF.getDuration();
				boolean PLAY_FRAME = tFrameEnd > tBaseStart;
				FRAME_FINAL = (tBaseEnd > 0.0F) && (tFrameEnd >= tBaseEnd);

				if (PLAY_FRAME) {
					if (activeAvr != null) {
						logger.log(LoggerConfig.LOGLevel, LoggerConfig.VIDEOMarker,
								"VideoGen: Avatar Change: " + activeAvr);

						AvatarDefinitionAccess avAc = new AvatarDefinitionForView(activeAvr.getName());

						this.jaView.requestSwitchAvatar(avAc);
						this.jaView.awaitAvatarAvailable();
						logger.log(LoggerConfig.TRACELevel, LoggerConfig.VIDEOMarker,
								"VideoGen: Avatar Available: " + activeAvr);

						activeAvr = null;
					}
					if (activeCam != null) {
						logger.log(LoggerConfig.LOGLevel, LoggerConfig.VIDEOMarker,
								"VideoGen: Camera Change: " + activeCam);

						this.camctrllr.setCamera(activeCam.getSettings());
						activeCam = null;
					}

					long t0 = System.nanoTime();
					this.jaView.playAndGrabOneFrame(this.scan.frame(), F, pixels, DO_LOG);
					pixels = FRAME_EXCHG.getEmptyForFull(pixels);
					long t1 = System.nanoTime();

					if (DO_LOG) {
						int tg = (int) ((t1 - t0) / 1000L);
						String msg = String.format("frame%4d @%9.3f: t-Grab = %d", new Object[] { Integer.valueOf(F),
								Float.valueOf(frameF.getTime()), Integer.valueOf(tg) });
						logger.log(LoggerConfig.LOGLevel, LoggerConfig.VIDEOMarker, "VideoGen: " + msg);
					}
				}

				this.scan.advanceFrame();
			}
			this.jaView.stopAnimationForVideo();
		} catch (InterruptedException ix) {
			handleInterrupt("doVideoGen()", ix);
		} catch (JAException jax) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.VIDEOMarker, "VideoGen: " + jax);
		}

		this.PLAYER_EVENT_HANDLER.playerIsDone(this.scan);
	}

	protected synchronized void launchPlayingThread(boolean pipedsigml, boolean resume) {
		if ((hasAvatar()) && (!playerIsActive()) && (this.scan != null)) {

			logger.log(LoggerConfig.LOGLevel, LoggerConfig.CONTROLMarker,
					"JAFramesPlayer: Creating SequencePlayManager");

			boolean dologdf = this.JA_OPTIONS.doLogDroppedFrames();
			this.TIME_BEGIN = this.JA_OPTIONS.getFloatProperty("player.time.begin");
			this.TIME_END = this.JA_OPTIONS.getFloatProperty("player.time.end");
			this.SYNC_RATE = this.JA_OPTIONS.getFloatProperty("player.sync.rate");

			this.sequencePlayer = new SequencePlayManager(resume, this.FLAGS, this.jaView,
					this.CAM_ACCESS.getController(), this.scan, this.PLAYER_EVENT_HANDLER, this.SPEED_CONTROL,
					this.TIME_BEGIN, this.TIME_END, this.SYNC_RATE, this.ANIM_INIT_LOOKAHEAD, this.FRAME_DRIFT_LIMIT,
					this.DROP_RANGE_LIMIT, pipedsigml, this.SHOW_ANIM_TIMES, this.LOG_ANIM_SUMMARY,
					this.LOG_DROPPED_FRAMES_SUMMARY, dologdf, this);

			this.sequencePlayer.startSequencePlay();
		} else {
			logger.log(LoggerConfig.LOGLevel, LoggerConfig.CONTROLMarker,
					"JAFramesPlayer: Not creating SequencePlayManager: " + (

					hasAvatar() ? "" : " !hasAvatar") + (this.scan == null ? " scan==null" : "") + (this.sequencePlayer == null ? "" : " sequencePlayer!=null") + (this.framePlayer == null ? "" : " framePlayer!=null"));
		}
	}

	public synchronized boolean playerIsActive() {
		return (this.sequencePlayer != null) || (this.framePlayer != null);
	}

	public synchronized void handleDoIdleAmbientChange() {
		if (this.jaView != null) {
			this.jaView.handleDoIdleAmbientChange();
		}
	}

	public synchronized void sequencePlayStarts() {
		checkCamera();
	}

	public synchronized void sequencePlayFinishes() {
		checkCamera();
		this.sequencePlayer = null;

		notifyAll();
	}

	public synchronized void framePlayStarts() {
		checkCamera();
	}

	public synchronized void framePlayFinishes() {
		this.framePlayer = null;

		notifyAll();
	}

	protected static final class SynchCameraAccess implements CameraAccess {
		private CameraController camController = null;

		public synchronized void setController(CameraController cc) {
			this.camController = cc;
		}

		public synchronized CameraController getController() {
			return this.camController;
		}
	}
}
