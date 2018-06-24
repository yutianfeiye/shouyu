package jarp;

import cas.CASFrame;
import com.jogamp.opengl.GL2;
import com.jogamp.opengl.GLAutoDrawable;
import com.jogamp.opengl.GLCapabilities;
import com.jogamp.opengl.GLEventListener;
import com.jogamp.opengl.GLProfile;
import com.jogamp.opengl.Threading;
import com.jogamp.opengl.awt.GLCanvas;
import com.jogamp.opengl.glu.gl2.GLUgl2;
import jautil.JAAvatarsEnv;
import jautil.JAException;
import jautil.JAIO;
import jautil.JAInputStream;
import jautil.JALog;
import jautil.JAOptions;
import jautil.JAOutputStream;
import jautil.JATimer;
import jautil.avatar.AvatarDefinitionAccess;
import jautil.geometry.Quaternion;
import jautil.geometry.TRTransform;
import jautil.geometry.Vector3f;
import java.awt.EventQueue;
import java.awt.event.MouseEvent;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.InvocationTargetException;
import java.nio.ByteBuffer;
import javax.swing.event.MouseInputAdapter;
import javax.swing.event.MouseInputListener;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import player.AvatarEventHandler;
import player.JACanvasEmbedder;
import player.JAPlayerStats;
import util.LoggerConfig;

public class View implements GLEventListener {
	private static Logger logger= LogManager.getLogger();

	private static final int GL_FINISH_LIMIT_MS = 30;

	private static final boolean DO_LOG_SLOW_GL_FINISH = false;

	public static final int CAM_NONE = 0;

	public static final int CAM_ROTATING = 1;

	public static final int CAM_ZOOMING = 2;

	public static final int CAM_PANNING = 3;

	public static final int CAM_PANNING_V = 4;

	public static final int CAM_PANNING_H = 5;

	protected Character character;

	protected String avatarName;

	protected boolean switchAvatarPending;

	protected boolean switchAvatarCommitted;

	protected AvatarDefinitionAccess pendingAvatarDef;

	protected boolean displayHaltRequested;

	protected boolean doingAnimation;

	protected CASFrame latestFrame;

	protected boolean useInternalCamera;

	protected int cameraActionMode;

	protected boolean mouseIsDown;
	protected int prevX;
	protected int prevY;
	protected float movementScalar;
	protected float pitch;
	protected float yaw;
	protected float lookDistance;
	protected Vector3f lockTarget;
	protected Vector3f internalCamLookAt;
	protected int defaultTarget;
	protected Vector3f camLocation;
	protected Vector3f camFacing;
	protected Vector3f camLookAt;
	protected float FOV;
	protected float nearClip;
	protected float farClip;
	protected Vector3f camUp;
	protected Vector3f camDir;
	protected float[] modelAmbient;
	public static final float[] BG_RGB_STD = { 0.625F, 0.675F, 0.825F };

	protected float[] bgRGB;

	protected int width;

	protected int height;

	protected int renderMode;

	protected float[] ambient1;

	protected float[] diffuse1;

	protected float[] specular1;

	protected float[] position1;

	protected float[] ambient2;

	protected float[] diffuse2;

	protected float[] specular2;

	protected float[] position2;

	protected boolean lightZeroIsOn;

	protected boolean lightOneIsOn;

	protected boolean eyeGaze;

	protected GLUgl2 glu;
	protected GLCanvas glCanvas;
	protected DisplayScheduler glDisplayScheduler;
	protected AvatarEventHandler avatarEventHandler;
	protected final JAOptions JA_OPTIONS;
	protected final JAAvatarsEnv AV_ENV;
	protected boolean oneTimeSaveCheckDone = false;

	protected boolean updateCameraPending;

	protected MouseInputListener internalMouseHandler;

	protected MouseInputListener externalMouseHandler;

	protected JAPlayerStats stats;

	private GLGrabCoordinator grabCoordinator;

	private IdleAvatarScheduler idleAvatarScheduler;

	private float curAnimAmbientScale;

	private AmbientManager curAnimAmbientManager;

	private boolean nextAnimAmbientIsStable;

	private float metresToInternal;

	private float extYShift;

	private static final int[] PSM_INDEX = { 3333, 3330, 3331, 3332, 3328 };

	private static final int[] PSM_FOR_READ_PIXELS = { 1, 0, 0, 0, 0 };

	private int[] psmSave = new int[5];

	public int getWidth() {
		return this.glCanvas.getWidth();
	}

	public int getHeight() {
		return this.glCanvas.getHeight();
	}

	public View(AvatarEventHandler aehdlr, JAOptions jopts, JACanvasEmbedder embedder) {
		this.avatarEventHandler = aehdlr;
		this.JA_OPTIONS = jopts;
		this.AV_ENV = jopts.getAvatarsEnv();

		clearSwitchAvatarRequest();
		this.displayHaltRequested = false;
		this.doingAnimation = false;

		GLCapabilities glcaps = new GLCapabilities(GLProfile.get("GL2"));

		this.glCanvas = new GLCanvas(glcaps);

		embedder.embedInContainer(this.glCanvas);

		this.glCanvas.addGLEventListener(this);

		this.grabCoordinator = new GLGrabCoordinator(this);
	}

	protected void initViewData() {
		initLightingData();

		this.renderMode = Mesh.TRM_SMOOTH;

		this.eyeGaze = false;

		float[] bgrgbopt = this.JA_OPTIONS.backgroundRGB();
		this.bgRGB = (bgrgbopt == null ? BG_RGB_STD : bgrgbopt);

		this.prevX = (this.prevY = 0);
		this.movementScalar = 0.3F;
		this.lookDistance = 100.0F;
		this.cameraActionMode = 0;
		this.lockTarget = new Vector3f(0.0F, 15.0F, 0.0F);
		this.mouseIsDown = false;
		this.pitch = (this.yaw = 0.0F);

		this.internalCamLookAt = new Vector3f(0.0F, 0.0F, 0.0F);
		this.camLookAt = new Vector3f(0.0F, 0.0F, 0.0F);
		this.camLocation = new Vector3f(0.0F, 0.0F, 60.0F);
		this.camFacing = new Vector3f(0.0F, 0.0F, -1.0F);
		this.camUp = new Vector3f(0.0F, 1.0F, 0.0F);

		this.FOV = 30.0F;
		this.nearClip = 1.0F;
		this.farClip = 1000.0F;

		this.useInternalCamera = false;

		this.defaultTarget = Skeleton.NEC1_4CC;
	}

	protected void setUpGLForView(GL2 gl) {
		gl.glEnable(2929);
		gl.glDisable(3553);
		gl.glEnable(3042);
		gl.glBlendFunc(770, 771);
		gl.glShadeModel(7425);
		gl.glClear(16640);
		gl.glClearColor(this.bgRGB[0], this.bgRGB[1], this.bgRGB[2], 0.5F);
		gl.glClearDepth(1.0D);
		gl.glHint(3152, 4354);
		gl.glPixelStorei(3317, 1);

		setLighting(gl);
	}

	protected synchronized DisplayScheduler getDisplayScheduler() {
		return this.glDisplayScheduler;
	}

	protected synchronized boolean displaySchedulerIsNull() {
		return this.glDisplayScheduler == null;
	}

	protected synchronized void startNewDisplayScheduler() {
		this.glDisplayScheduler = new DisplayScheduler(this.glCanvas);
		this.glDisplayScheduler.start();
	}

	protected synchronized void terminateDisplayScheduler() {
		this.glDisplayScheduler.stop();
		this.glDisplayScheduler = null;
	}

	public synchronized void awaitAvatarAvailable() throws InterruptedException {
		while (this.switchAvatarPending) {
			wait();
		}
	}

	protected synchronized FrameAnimationSynch getFrameSynch() {
		if (displaySchedulerIsNull()) {
			logger.log(LoggerConfig.ERRORLevel, LoggerConfig.RENDERMarker,
					"View: No displayScheduler in getFrameSynch");
		}

		return this.glDisplayScheduler.getFrameAnimationSynch();
	}

	protected synchronized FrameAnimationSynch getFrameSynchAndStartGeneration() throws InterruptedException {
		awaitAvatarAvailable();
		FrameAnimationSynch syn = getFrameSynch();
		syn.setFrameGenerationStarted();
		return syn;
	}

	public synchronized ThreadCompletionChecker terminateViewDisplay() {
		this.displayHaltRequested = true;

		requestSwitchAvatar(null);

		return getDisplayScheduler();
	}

	public synchronized void terminateView() {
		this.glCanvas.removeGLEventListener(this);

		if (switchAvatarCommitNow()) {

			doSwitchAvatar(null);
		}
	}

	protected synchronized boolean finalHaltRequestReceived() {
		return this.displayHaltRequested;
	}

	protected final Runnable RUN_DISPLAY_GLCANVAS = new Runnable() {
		public void run() {
			View.logger.log(LoggerConfig.INFOLevel, LoggerConfig.THREADMarker, "Run: Canvas Display");
			JALog.infoAndThread("View.RUN_DISP_GLCANVAS(): ");
			View.this.glCanvas.display();
			View.logger.log(LoggerConfig.STATSLevel, LoggerConfig.THREADMarker, "End: Canvas Display");
		}
	};

	protected final Runnable SYNCH_RUN_DISPLAY_GL_CANVAS = new Runnable() {

		public void run() {

			View.logger.log(LoggerConfig.INFOLevel, LoggerConfig.THREADMarker, "Run: Sync Canvas Display");
			JALog.infoAndThread("View.SYNCH_RUN_DISP_GLCANVAS(): ");
			if (!Threading.isOpenGLThread()) {

				View.logger.log(LoggerConfig.TRACELevel, LoggerConfig.THREADMarker,
						"View: Display GL Canvas: Invoke on GL thread");

				Threading.invokeOnOpenGLThread(true, View.this.RUN_DISPLAY_GLCANVAS);
			} else {
				JALog.info("... already on OpenGL thread.");
				View.logger.log(LoggerConfig.TRACELevel, LoggerConfig.THREADMarker,
						"View: Display GL Canvas: Run directly as on GL thread");

				View.this.RUN_DISPLAY_GLCANVAS.run();
			}
			View.logger.log(LoggerConfig.STATSLevel, LoggerConfig.THREADMarker, "End: Sync Canvas Display");
		}
	};

	protected Runnable runnableViaEDT(final Runnable r) {
		Runnable RUN_ON_EDT = new Runnable() {
			public void run() {
				View.logger.log(LoggerConfig.INFOLevel, LoggerConfig.THREADMarker, "Run: Runnable Via EDT");
				JALog.infoAndThread("View.runnableViaEDT(): ");
				String PFX = "View.runnableViaEDT: ";
				try {
					EventQueue.invokeAndWait(r);
				} catch (InterruptedException ix) {
					View.logger.log(LoggerConfig.WARNLevel, LoggerConfig.RENDERMarker, "View.runnableViaEDT: " + ix);
				} catch (InvocationTargetException itx) {
					View.logger.log(LoggerConfig.ERRORLevel, LoggerConfig.RENDERMarker, "View.runnableViaEDT: " + itx);
				}
				View.logger.log(LoggerConfig.STATSLevel, LoggerConfig.THREADMarker, "End: Runnable Via EDT");
			}

		};
		return RUN_ON_EDT;
	}

	protected void triggerDisplayGLCanvas() {
		Thread tadisp = new Thread(runnableViaEDT(this.SYNCH_RUN_DISPLAY_GL_CANVAS));
		tadisp.start();
	}

	public synchronized void requestSwitchAvatar(AvatarDefinitionAccess avdef) {
		if ((avdef == null) || (this.AV_ENV.isValidAvatar(avdef.avatarName()))) {
			if ((avdef != null) && (avdef.avatarName().equals(this.avatarName))) {
				logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker,
						"View: already loaded " + this.avatarName);
			} else {
				registerSwitchAvatarRequest(avdef);

				stopAnyIdleAvatarScheduler();

				triggerDisplayGLCanvas();
			}

		} else {
			logger.log(LoggerConfig.ERRORLevel, LoggerConfig.AVATARMarker,
					"View: no definition to load for " + avdef.avatarName());
		}
	}

	public synchronized AmbientManager getAmbientManager() {
		return this.character == null ? null : this.character.getAmbientManager();
	}

	protected synchronized void tryToStartIdleAvatarScheduler(boolean avisnew) {
		tryToStartIdleAvatarScheduler(avisnew, true);
	}

	protected synchronized void tryToStartIdleAvatarScheduler(boolean avisnew, boolean dowait) {
		this.idleAvatarScheduler = null;

		AmbientManager AMB_MGR = getAmbientManager();
		if ((AMB_MGR != null) && (this.JA_OPTIONS.doIdleAmbient())) {

			int AMB_WAIT_MS = avisnew ? this.JA_OPTIONS.idleAmbientInitialWaitMS()
					: !dowait ? 0 : this.JA_OPTIONS.idleAmbientContinueWaitMS();

			if (0 <= AMB_WAIT_MS) {
				float AMB_SCALE = this.JA_OPTIONS.idleAmbientMaxScale();

				CASFrame IDLE_FRM = (avisnew) || (this.latestFrame == null) ? this.character.getInitPose()
						: this.latestFrame;

				this.idleAvatarScheduler = new IdleAvatarScheduler(IDLE_FRM, AMB_MGR, AMB_WAIT_MS, AMB_SCALE, this,
						getFrameSynch());
			}
		}
	}

	protected synchronized void stopAnyIdleAvatarScheduler() {
		if (this.idleAvatarScheduler != null) {
			try {
				this.idleAvatarScheduler.stop();
				this.idleAvatarScheduler = null;
			} catch (InterruptedException ix) {
				String IAS = "idle avatar scheduler";
				logger.log(LoggerConfig.TRACELevel, LoggerConfig.THREADMarker,
						"View stopping idle avatar scheduler: " + ix);

				Thread.currentThread().interrupt();
			}
		}
	}

	public synchronized void handleDoIdleAmbientChange() {
		stopAnyIdleAvatarScheduler();

		if ((avatarIsLoaded()) && (!getFrameSynch().animationIsInProgress()) && (this.JA_OPTIONS.doIdleAmbient())) {
			boolean NEW_AV = this.latestFrame == null;
			boolean DO_WAIT = false;
			tryToStartIdleAvatarScheduler(NEW_AV, false);
		}
	}

	public void init(GLAutoDrawable gld) {
		GL2 gl = (GL2) gld.getGL();
		this.glu = new GLUgl2();

		this.width = gld.getSurfaceWidth();
		this.height = gld.getSurfaceHeight();

		initViewData();
		setUpGLForView(gl);

		Thread curt = Thread.currentThread();
	}

	private long ndisp = 0L;
	private final JATimer DISPLAY_TIMER = new JATimer();
	private final JATimer RENDER_TIMER = new JATimer();
	private final JATimer FINISH_TIMER = new JATimer();

	public void display(GLAutoDrawable gld) {
		if (!finalHaltRequestReceived()) {

			if (switchAvatarCommitNow()) {
				JALog.infoAndThread("View: starting doSwitchAvatar() ");
				doSwitchAvatar(gld);
			}

			this.DISPLAY_TIMER.start();
			this.DISPLAY_TIMER.setDisplayDisabled(true);

			byte[] grabbuf = this.grabCoordinator.getRequestBuffer();

			GL2 gl = (GL2) gld.getGL();

			this.RENDER_TIMER.start();

			renderGLScene(gl);

			this.FINISH_TIMER.start();

			gl.glFinish();

			float tfin = this.FINISH_TIMER.getTimeMS();

			if (grabbuf != null) {
				grabGLPixelData(gl, grabbuf);
				this.grabCoordinator.notifyFrame();
			}
		}

		this.ndisp += 1L;
	}

	public void reshape(GLAutoDrawable gld, int x, int y, int w, int h) {
		logger.log(LoggerConfig.TRACELevel, LoggerConfig.RENDERMarker, "View: Reshape (w,h)=(" + w + "," + h + ")");

		if ((this.width != w) || (this.height != h)) {
			GL2 gl = (GL2) gld.getGL();

			resizeGLScene(gl, w, h);
		}
	}

	public void displayChanged(GLAutoDrawable gld, boolean modeChanged, boolean deviceChanged) {
		logger.log(LoggerConfig.ERRORLevel, LoggerConfig.RENDERMarker, "~~~~~~~~~~~~  DISPLAY CHANGE  ~~~~~~~~~~~~");
	}

	public void dispose(GLAutoDrawable gld) {
	}

	private void grabGLPixelData(GL2 gl, byte[] pixels) {
		int[] wh = this.grabCoordinator.getWidthHeight();
		int W = wh[0];
		int H = wh[1];

		for (int i = 0; i != 5; i++) {
			gl.glGetIntegerv(PSM_INDEX[i], this.psmSave, i);
			gl.glPixelStorei(PSM_INDEX[i], PSM_FOR_READ_PIXELS[i]);
		}

		ByteBuffer bbuf = ByteBuffer.wrap(pixels);
		gl.glReadPixels(0, 0, W, H, 32992, 5121, bbuf);

		for (int i = 0; i != 5; i++) {
			gl.glPixelStorei(PSM_INDEX[i], this.psmSave[i]);
		}
	}

	public void setRenderMode(int mode) {
		if (mode == 0) {
			this.renderMode = Mesh.TRM_SMOOTH;
		} else if (mode == 1) {
			this.renderMode = Mesh.TRM_TEXTURED;
		}
	}

	public String currentAvatar() {
		return this.avatarName;
	}

	protected synchronized void registerSwitchAvatarRequest(AvatarDefinitionAccess avdef) {
		this.switchAvatarPending = true;
		this.switchAvatarCommitted = false;

		this.pendingAvatarDef = avdef;
	}

	protected synchronized void clearSwitchAvatarRequest() {
		this.switchAvatarPending = false;
		this.switchAvatarCommitted = false;
		this.pendingAvatarDef = null;
		notifyAll();
	}

	protected synchronized boolean switchAvatarCommitNow() {
		if ((this.switchAvatarPending) && (this.switchAvatarCommitted)) {
			logger.log(LoggerConfig.ERRORLevel, LoggerConfig.AVATARMarker,
					"View.switchAvatarCommitNow invoked while already commited");
		}

		boolean commitnow = (this.switchAvatarPending) && (!this.switchAvatarCommitted);

		commitnow = (commitnow) && ((displaySchedulerIsNull()) || (!getFrameSynch().frameAnimationIsBusy()));

		if (commitnow) {
			this.switchAvatarCommitted = true;
		}
		return commitnow;
	}

	protected synchronized boolean needsDisposeAvatar() {
		return (avatarIsLoaded())
				&& ((this.pendingAvatarDef == null) || (!this.avatarName.equals(this.pendingAvatarDef.avatarName())));
	}

	protected synchronized boolean needsLoadAvatar() {
		return (!avatarIsLoaded()) && (this.pendingAvatarDef != null);
	}

	protected synchronized boolean avatarIsLoaded() {
		return this.character != null;
	}

	protected synchronized void setNoAvatarIsLoaded() {
		this.character = null;
		this.avatarName = null;
	}

	protected void doSwitchAvatar(GLAutoDrawable gld) {
		boolean unloadneeded = false;
		boolean loadneeded = false;

		if (needsDisposeAvatar()) {
			unloadneeded = true;
			disposeOfCurrentAvatar();
		}

		if (needsLoadAvatar()) {
			loadneeded = true;
			tryToEstablishNewAvatar(gld, this.pendingAvatarDef);
		}

		if ((!unloadneeded) || (loadneeded)) {

			if (this.avatarEventHandler != null) {
				this.avatarEventHandler.avatarIsLoaded(this.avatarName);
			}
		}

		clearSwitchAvatarRequest();
	}

	protected void tryToEstablishNewAvatar(GLAutoDrawable gld, AvatarDefinitionAccess avdef) {
		if (avdef.isAvailable()) {
			establishNewAvatar(gld, avdef);
		} else {
			AvatarDefinitionAccess newdef = this.AV_ENV.getDefinition(avdef.avatarName());
			if (newdef.isAvailable()) {
				establishNewAvatar(gld, newdef);
			} else {
				logger.log(LoggerConfig.ERRORLevel, LoggerConfig.AVATARMarker,
						"View: no definition to load for " + avdef.avatarName());
			}
		}
	}

	protected void disposeOfCurrentAvatar() {
		String oldav = this.avatarName;

		setCamExternal(null);

		terminateDisplayScheduler();

		setNoAvatarIsLoaded();

		logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker, "View: Unloaded avatar " + oldav);

		if (this.avatarEventHandler != null) {
			this.avatarEventHandler.avatarIsUnloaded(oldav);
		}
	}

	protected void establishNewAvatar(GLAutoDrawable gld, AvatarDefinitionAccess avdef) {
		GL2 gl = (GL2) gld.getGL();

		loadAvatar(gl, avdef);

		if (avatarIsLoaded()) {

			saveAvatarIfRequested();

			this.avatarName = avdef.avatarName();

			this.useInternalCamera = false;
			this.internalMouseHandler = null;
			this.externalMouseHandler = null;

			this.metresToInternal = this.character.metresToInternal();
			this.extYShift = this.character.adjustViewYInternal();

			startNewDisplayScheduler();

			if (this.doingAnimation) {
				setAmbientParametersForAnimation();
			} else {
				this.grabCoordinator.reset();
				tryToStartIdleAvatarScheduler(true);
			}
		}
	}

	protected void logAvatarYValues() {
		float Y_MAX_METRES = this.character.maxYMetres();
		float HEIGHT_METRES = this.character.heightMetres();
		float Y_ROOT_METRES = this.character.rootYMetres();
		logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker,
				"Avatar values: y-max: %.2f m   height: %.2f m   y-root: %.2f m", new Object[] {

						Float.valueOf(Y_MAX_METRES), Float.valueOf(HEIGHT_METRES), Float.valueOf(Y_ROOT_METRES) });
	}

	protected void loadAvatar(GL2 gl, AvatarDefinitionAccess avdef) {
		String MSG_PFX = "View: loadAvatar";
		String MSG_PFX_C = "View: loadAvatar: ";

		try {
			InputStream avins = avdef.asNewStream();
			JAInputStream jins = new JAInputStream(avins);

			String IN_VERSION = this.JA_OPTIONS.avatarDefinitionVersion();

			logger.log(LoggerConfig.LOGLevel, LoggerConfig.AVATARMarker,
					"View: Load avatar: " + avdef.avatarName() + " from " + avdef.asURL());
			JATimer tmr = new JATimer(logger, LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker);

			this.character = new Character(avdef.asURL(), jins, IN_VERSION, gl, this.glu, this.JA_OPTIONS);

			jins.close();
			String cversion = this.character.getVersion();
			tmr.showTimeMS("View: loadAvatar (v" + cversion + "):  t");

			this.renderMode = Mesh.TRM_TEXTURED;
			initialiseCameraLocation();
		} catch (IOException iox) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.AVATARMarker, "View: loadAvatar" + iox);
		} catch (JAException jax) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.AVATARMarker, "View: loadAvatar: " + jax);
		}
	}

	public void saveAvatarIfRequested() {
		if (!this.oneTimeSaveCheckDone) {
			this.oneTimeSaveCheckDone = true;

			boolean SAVE_MAIN = this.JA_OPTIONS.avatarDefinitionIsToBeSaved();

			boolean SAVE_TEXTURE_ONLY = this.JA_OPTIONS.textureFileOnlyIsToBeSaved();

			if ((SAVE_MAIN) || (SAVE_TEXTURE_ONLY)) {
				try {
					try {
						if (SAVE_MAIN) {
							doSaveAvatar();
						}

						if (SAVE_TEXTURE_ONLY) {
							doSaveAvatarTexture();
						}
					} catch (IOException iox) {
						throw new JAException("" + iox);
					}
				} catch (JAException jax) {
					logger.log(LoggerConfig.WARNLevel, LoggerConfig.AVATARMarker, "View.saveAvatar: " + jax);
				}
			}
		}
	}

	protected void doSaveAvatar() throws IOException, JAException {
		String OUT_VERSION = this.character.versionIsAtLeast22() ? this.character.getVersion() : "2.2";

		String AV_URL = this.JA_OPTIONS.avatarDefinitionSaveURL();
		String AV_PATH = JAIO.urlToOutputFilePath(AV_URL);
		OutputStream AV_OUT_S = JAIO.validFileOutputStream(AV_PATH);

		if (AV_OUT_S == null) {
			throw new JAException("Invalid output file URL: " + AV_URL);
		}

		logger.log(LoggerConfig.INFOLevel, LoggerConfig.AVATARMarker,
				"Saving avatar definition on:  " + AV_PATH + "  (version=" + OUT_VERSION + ")");

		JAOutputStream J_OUT_S = new JAOutputStream(AV_OUT_S);
		this.character.save(J_OUT_S);
		J_OUT_S.close();
	}

	protected void doSaveAvatarTexture() throws IOException {
		logger.log(LoggerConfig.INFOLevel, LoggerConfig.AVATARMarker, "Saving avatar texture file");
		this.character.saveTextureFile();
	}

	protected void initialiseCameraLocation() {
		Bone target = this.character.getBone(this.defaultTarget);

		if (target != null) {
			this.internalCamLookAt = target.getGlobalPosition();
			this.internalCamLookAt.incrY(12.0F);
		}
	}

	public void setPlayerStats(JAPlayerStats ps) {
		this.stats = ps;
	}

	public void startAnimation() {
		if (this.doingAnimation) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.RENDERMarker, "View: Unexpected startAnimation");
		}
		this.doingAnimation = true;

		stopAnyIdleAvatarScheduler();

		setAmbientParametersForAnimation();

		FrameAnimationSynch FRAME_SYNCH = getFrameSynch();
		FRAME_SYNCH.setAnimationInProgress(true);
	}

	public void stopAnimation() {
		if (!this.doingAnimation) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.RENDERMarker, "View: Unexpected stopAnimation");
		}
		this.doingAnimation = false;

		FrameAnimationSynch FRAME_SYNCH = getFrameSynch();
		FRAME_SYNCH.setAnimationInProgress(false);

		this.curAnimAmbientManager = null;

		tryToStartIdleAvatarScheduler(false);
	}

	public void startAnimationForVideo(boolean log, int width, int height) {
		startAnimation();
		this.grabCoordinator.start(log, width, height);
	}

	public void stopAnimationForVideo() {
		this.grabCoordinator.reset();
		stopAnimation();
	}

	public void resetAmbientClock() {
		AmbientManager AMB_MGR = getAmbientManager();
		if (AMB_MGR != null) {
			AMB_MGR.resetClock();
		}
	}

	protected void setAmbientParametersForAnimation() {
		float AMB_SCALE = this.JA_OPTIONS.doBusyAmbient() ? this.JA_OPTIONS.busyAmbientMaxScale() : 0.0F;

		this.curAnimAmbientScale = AMB_SCALE;

		this.curAnimAmbientManager = (AMB_SCALE == 0.0F ? null : getAmbientManager());

		this.nextAnimAmbientIsStable = false;
	}

	protected CASFrame animAmbientAdust(CASFrame FRAME) {
		CASFrame adjfrm = FRAME;

		AmbientManager AMB_MGR = this.curAnimAmbientManager;
		if (AMB_MGR != null) {
			float AMB_SCALE = this.curAnimAmbientScale;

			adjfrm = this.nextAnimAmbientIsStable ? AMB_MGR.adjustForTimeDelta(FRAME, AMB_SCALE, 0.0F)
					: AMB_MGR.adjust(FRAME, AMB_SCALE);
		}

		this.nextAnimAmbientIsStable = false;

		return adjfrm;
	}

	public void playOneFrameWithStableAmbient(CASFrame FRAME, int F) throws InterruptedException, JAException {
		this.nextAnimAmbientIsStable = true;
		playOneFrame(FRAME, F);
	}

	public void playOneFrame(CASFrame FRAME, int F) throws InterruptedException, JAException {
		playOneFrame(FRAME, F, 1.0F, false, null);
	}

	public void playOneFrame(CASFrame FRAME, int F, float SPEED_UP, boolean T_DISPLAY, String DISPLAY_PREFIX)
			throws InterruptedException, JAException {
		JATimer tmr = new JATimer(logger, LoggerConfig.LOGLevel, LoggerConfig.FRAMEMarker);
		tmr.setDisplayDisabled(!T_DISPLAY);

		FrameAnimationSynch FRAME_SYNCH = getFrameSynchAndStartGeneration();

		this.latestFrame = FRAME;
		CASFrame ADJ_FRAME = animAmbientAdust(FRAME);

		setBonesAndMorphsForFrame(ADJ_FRAME);

		tmr.start();
		generateMeshForFrame();
		FRAME_SYNCH.setFrameGenerationDone();

		String tgenpfx = String.format("%s%3d: gen()    ", new Object[] { DISPLAY_PREFIX, Integer.valueOf(F) });
		float tgen = tmr.getAndShowTimeMS(tgenpfx);
		if (this.stats != null) {
			this.stats.setGenerateTime(tgen * SPEED_UP);
		}

		tmr.start();
		scheduleDisplayAvatar();
		FRAME_SYNCH.awaitFrameDisplayDone();

		String tdisppfx = String.format("%s%3d: disp()   ", new Object[] { DISPLAY_PREFIX, Integer.valueOf(F) });
		float tdisp = tmr.getAndShowTimeMS(tdisppfx);
		if (this.stats != null) {
			this.stats.setDisplayTime(tdisp * SPEED_UP);
		}
	}

	public void playOneIdleFrame(CASFrame FRAME) throws InterruptedException, JAException {
		FrameAnimationSynch FRAME_SYNCH = getFrameSynchAndStartGeneration();

		setBonesAndMorphsForFrame(FRAME);

		generateMeshForFrame();
		FRAME_SYNCH.setFrameGenerationDone();

		scheduleDisplayAvatar();
		FRAME_SYNCH.awaitFrameDisplayDone();
	}

	public void playAndGrabOneFrame(CASFrame FRAME, int F, byte[] pixels, boolean dolog)
			throws InterruptedException, JAException {
		String PFX = "View.playAndGrabOneFrame: ";

		FrameAnimationSynch FRAME_SYNCH = getFrameSynch();

		this.latestFrame = FRAME;
		CASFrame ADJ_FRAME = animAmbientAdust(FRAME);

		FRAME_SYNCH.setFrameGenerationStarted();
		setBonesAndMorphsForFrame(ADJ_FRAME);

		generateMeshForFrame();
		FRAME_SYNCH.setFrameGenerationDone();

		this.grabCoordinator.makeRequest(F, pixels);

		long t0 = System.nanoTime();

		scheduleDisplayAvatar();
		FRAME_SYNCH.awaitFrameDisplayDone();

		if (dolog) {
			logger.log(LoggerConfig.TRACELevel, LoggerConfig.VIDEOMarker,
					"View.playAndGrabOneFrame: Done await-Disp for " + F);
		}

		long t1 = System.nanoTime();

		this.grabCoordinator.waitForFrame();

		if (dolog) {
			logger.log(LoggerConfig.TRACELevel, LoggerConfig.VIDEOMarker,
					"View.playAndGrabOneFrame: Done await-Grab for " + F);
		}

		long t2 = System.nanoTime();

		if (dolog) {
			int td = (int) ((t1 - t0) / 1000L);
			int tr = (int) ((t2 - t1) / 1000L);
			logger.log(LoggerConfig.LOGLevel, LoggerConfig.VIDEOMarker,
					"View.playAndGrabOneFrame: Frame %d: t-disp=%d  t-retr=%d\n",
					new Object[] { Integer.valueOf(F), Integer.valueOf(td), Integer.valueOf(tr) });
		}
	}

	protected void setBonesAndMorphsForFrame(CASFrame frame) {
		if (!avatarIsLoaded()) {
			logger.log(LoggerConfig.ERRORLevel, LoggerConfig.RENDERMarker, "setBones:  no avatar loaded!");
		} else if (frame != null) {
			this.character.setFrame(frame);
		}
	}

	protected void generateMeshForFrame() throws JAException {
		this.character.generateFrame();
	}

	protected void scheduleDisplayAvatar() {
		if (!finalHaltRequestReceived()) {
			DisplayScheduler glds = getDisplayScheduler();
			if (glds != null) {
				glds.requestDisplayNow();
			} else {
				logger.log(LoggerConfig.ERRORLevel, LoggerConfig.RENDERMarker,
						"View.scheduleDisplayAvatar: GL display scheduler is null");
			}
		}
	}

	protected void resizeGLScene(GL2 gl, int w, int h) {
		this.width = w;
		this.height = h;

		if (this.height == 0) {
			this.height = 1;
		}

		gl.glViewport(0, 0, this.width, this.height);
		gl.glMatrixMode(5889);
		gl.glLoadIdentity();
		this.glu.gluPerspective(this.FOV, this.width / this.height, 0.1D, 1000.0D);

		gl.glMatrixMode(5888);
		gl.glLoadIdentity();

		this.updateCameraPending = true;
	}

	protected void renderGLScene(GL2 gl) {
		if (this.updateCameraPending) {
			logger.log(LoggerConfig.TRACELevel, LoggerConfig.CAMERAMarker, "View: updateCamera");
			updateCamera(gl);
			clearRequestUpdateCamera();
		}

		gl.glClear(16640);
		gl.glClearColor(this.bgRGB[0], this.bgRGB[1], this.bgRGB[2], 0.5F);

		if (avatarIsLoaded()) {
			gl.glPushMatrix();
			gl.glLoadIdentity();
			this.character.draw(gl);
			gl.glPopMatrix();
		}
	}

	protected void setLighting(GL2 gl) {
		gl.glLightModelfv(2899, this.modelAmbient, 0);
		gl.glLightfv(16384, 4608, this.ambient1, 0);
		gl.glLightfv(16384, 4609, this.diffuse1, 0);
		gl.glLightfv(16384, 4610, this.specular1, 0);
		gl.glLightfv(16384, 4611, this.position1, 0);

		gl.glLightfv(16385, 4608, this.ambient2, 0);
		gl.glLightfv(16385, 4609, this.diffuse2, 0);
		gl.glLightfv(16385, 4610, this.specular2, 0);
		gl.glLightfv(16385, 4611, this.position2, 0);

		gl.glEnable(2896);

		if (this.lightZeroIsOn) {
			gl.glEnable(16384);
		} else {
			gl.glDisable(16384);
		}

		if (this.lightOneIsOn) {
			gl.glEnable(16385);
		} else {
			gl.glDisable(16385);
		}
	}

	public void setCamInternal() {
		if (!this.useInternalCamera) {

			MouseInputListener emh = this.externalMouseHandler;
			if (emh != null) {
				this.glCanvas.removeMouseListener(emh);
				this.glCanvas.removeMouseMotionListener(emh);
				this.externalMouseHandler = null;
			}

			MouseInputListener imh = getInternalMouseHandler();
			this.glCanvas.addMouseListener(imh);
			this.glCanvas.addMouseMotionListener(imh);

			this.useInternalCamera = true;

			requestUpdateCamera();
		}
	}

	public void setCamExternal(MouseInputListener extmil) {
		if (this.useInternalCamera) {
			MouseInputListener imh = this.internalMouseHandler;
			if (imh != null) {
				this.glCanvas.removeMouseListener(imh);
				this.glCanvas.removeMouseMotionListener(imh);
			}

			this.useInternalCamera = false;
		}

		MouseInputListener oldemh = this.externalMouseHandler;
		if (oldemh != null) {
			this.glCanvas.removeMouseListener(oldemh);
			this.glCanvas.removeMouseMotionListener(oldemh);
		}

		if (extmil != null) {
			this.glCanvas.addMouseListener(extmil);
			this.glCanvas.addMouseMotionListener(extmil);
		}
		this.externalMouseHandler = extmil;

		if (extmil != null) {
			requestUpdateCamera();
		}
	}

	protected MouseInputListener getInternalMouseHandler() {
		if (this.internalMouseHandler == null) {
			this.internalMouseHandler = new InternalMouseListener();
		}

		return this.internalMouseHandler;
	}

	public void onLeftMouseDown(int x, int y) {
		this.cameraActionMode = 1;
		this.prevX = x;
		this.prevY = y;
		this.mouseIsDown = true;
	}

	public void onRightMouseDown(int x, int y) {
		this.cameraActionMode = 2;
		this.prevX = x;
		this.prevY = y;
		this.mouseIsDown = true;
	}

	public void onMouseMove(int x, int y) {
		if (this.mouseIsDown) {
			float deltaX = this.prevX - x;
			float deltaY = this.prevY - y;
			this.prevX = x;
			this.prevY = y;

			if (this.cameraActionMode == 1) {
				this.pitch += deltaY;
				this.yaw += deltaX;
			} else if (this.cameraActionMode == 2) {
				this.lookDistance += deltaY * this.movementScalar;
			} else if (this.cameraActionMode == 4) {
				float adjY = deltaY * this.movementScalar;
				this.lockTarget.setY(this.lockTarget.y() + adjY);
			} else if (this.cameraActionMode == 5) {
				float adjX = deltaX * this.movementScalar;
				this.lockTarget.setX(this.lockTarget.x() + adjX);
			}
		}
	}

	public void onMouseUp() {
		this.mouseIsDown = false;
		this.cameraActionMode = 0;
	}

	public void setCamLocation(float[] locxyz) {
		this.camLocation.set(locxyz);

		requestUpdateCamera();
	}

	public void setCamLocation(float x, float y, float z) {
		this.camLocation.set(x, y, z);

		requestUpdateCamera();
	}

	public void setCamFacing(float[] facingxyz) {
		setCamFacing(facingxyz[0], facingxyz[1], facingxyz[2]);
	}

	public void setCamFacing(float x, float y, float z) {
		this.camFacing.set(x, y, z);
		this.camFacing.unitize();

		this.camLookAt.set(this.camFacing);
		this.camLookAt.multScalarEq(this.camLocation.length());
		this.camLookAt.plusEq(this.camLocation);

		requestUpdateCamera();
	}

	public void setCamUp(float[] upxyz) {
		setCamUp(upxyz[0], upxyz[1], upxyz[2]);
	}

	public void setCamUp(float x, float y, float z) {
		this.camUp.set(x, y, z);
		this.camUp.unitize();

		requestUpdateCamera();
	}

	public void setCamClipPlanes(float znear, float zfar) {
		this.nearClip = znear;
		this.farClip = zfar;

		requestUpdateCamera();
	}

	public void setCamFOV(float fov) {
		this.FOV = fov;

		requestUpdateCamera();
	}

	public void getCamLocation(float[] locxyz) {
		locxyz[0] = this.camLocation.x();
		locxyz[1] = this.camLocation.y();
		locxyz[2] = this.camLocation.z();
	}

	public void getCamFacing(float[] facexyz) {
		facexyz[0] = this.camFacing.x();
		facexyz[1] = this.camFacing.y();
		facexyz[2] = this.camFacing.z();
	}

	public void getCamUp(float[] upxyz) {
		upxyz[0] = this.camUp.x();
		upxyz[1] = this.camUp.y();
		upxyz[2] = this.camUp.z();
	}

	public void getCamClipPlanes(float[] clipnf) {
		clipnf[0] = this.nearClip;
		clipnf[1] = this.farClip;
	}

	public float getCamFOV() {
		return this.FOV;
	}

	protected void requestUpdateCamera() {
		if (!this.updateCameraPending) {
			this.updateCameraPending = true;
			scheduleDisplayAvatar();
		}
	}

	protected void clearRequestUpdateCamera() {
		this.updateCameraPending = false;
	}

	protected void updateCamera(GL2 gl) {
		gl.glViewport(0, 0, this.width, this.height);
		gl.glMatrixMode(5889);
		gl.glLoadIdentity();

		if (this.useInternalCamera) {
			setGLCameraFromInternalControl(gl);
		} else {
			setGLCameraForExternalControl(gl);
		}

		gl.glMatrixMode(5888);
		gl.glLoadIdentity();
	}

	protected void setGLCameraFromInternalControl(GL2 gl) {
		this.camLocation.set(0.0F, 0.0F, this.lookDistance);

		Quaternion qcam = new Quaternion(this.pitch, this.yaw, 0.0F);
		TRTransform xfrmcam = new TRTransform(qcam);
		TRTransform xfrmcaminv = xfrmcam.getInverse();
		xfrmcaminv.transformPoint(this.camLocation);
		this.camLocation.plusEq(this.internalCamLookAt);

		this.glu.gluPerspective(this.FOV, this.width / this.height, 0.1D, 1000.0D);

		this.glu.gluLookAt(0.0F, 0.0F, this.lookDistance, 0.0F, 0.0F, 0.0F, 0.0F, 1.0F, 0.0F);

		gl.glRotatef(this.yaw, 0.0F, 1.0F, 0.0F);
		gl.glRotatef(this.pitch, 1.0F, 0.0F, 0.0F);
	}

	protected void setGLCameraForExternalControl(GL2 gl) {
		float LEN_SCALE = this.metresToInternal;
		float Y_ADJ = this.extYShift;

		this.glu.gluPerspective(this.FOV, this.width / this.height, this.nearClip * LEN_SCALE,
				this.farClip * LEN_SCALE);

		Vector3f CAM = this.camLocation;
		Vector3f TGT = this.camLookAt;
		Vector3f UP = this.camUp;

		this.glu.gluLookAt(CAM.x() * LEN_SCALE, CAM.y() * LEN_SCALE + Y_ADJ, CAM.z() * LEN_SCALE, TGT.x() * LEN_SCALE,
				TGT.y() * LEN_SCALE + Y_ADJ, TGT.z() * LEN_SCALE, UP.x(), UP.y(), UP.z());
	}

	protected void initLightingData() {
		this.modelAmbient = new float[4];
		this.modelAmbient[0] = (this.modelAmbient[1] = this.modelAmbient[2] = 0.6F);

		this.modelAmbient[3] = 1.0F;

		this.ambient1 = new float[4];
		this.ambient1[0] = (this.ambient1[1] = this.ambient1[2] = 0.0F);

		this.ambient1[3] = 1.0F;

		this.diffuse1 = new float[4];
		this.diffuse1[0] = (this.diffuse1[1] = this.diffuse1[2] = 0.6F);

		this.diffuse1[3] = 1.0F;

		this.specular1 = new float[4];
		this.specular1[0] = (this.specular1[1] = this.specular1[2] = 0.0F);

		this.specular1[3] = 1.0F;

		this.position1 = new float[4];
		this.position1[0] = (this.position1[1] = this.position1[2] = 1.0F);

		this.position1[3] = 0.0F;

		this.ambient2 = new float[4];
		this.ambient2[0] = (this.ambient2[1] = this.ambient2[2] = 0.1F);

		this.ambient2[3] = 1.0F;

		this.diffuse2 = new float[4];
		this.diffuse2[0] = (this.diffuse2[1] = this.diffuse2[2] = 0.3F);

		this.diffuse2[3] = 1.0F;

		this.specular2 = new float[4];
		this.specular2[0] = (this.specular2[1] = this.specular2[2] = 0.0F);

		this.specular2[3] = 1.0F;

		this.position2 = new float[4];
		this.position2[0] = -1.0F;
		this.position2[1] = (this.position2[2] = 1.0F);

		this.position2[3] = 0.0F;

		this.lightZeroIsOn = true;
		this.lightOneIsOn = false;
	}

	protected class InternalMouseListener extends MouseInputAdapter {
		protected InternalMouseListener() {
		}

		public void mousePressed(MouseEvent mevt) {
			int x = mevt.getX();
			int y = mevt.getY();

			if (mevt.getButton() == 1) {
				View.this.onLeftMouseDown(x, y);
			} else if (mevt.getButton() == 3) {
				View.this.onRightMouseDown(x, y);
			}

			View.this.requestUpdateCamera();
		}

		public void mouseReleased(MouseEvent mevt) {
			View.this.onMouseUp();
			View.this.requestUpdateCamera();
		}

		public void mouseMoved(MouseEvent mevt) {
			int x = mevt.getX();
			int y = mevt.getY();

			View.this.onMouseMove(x, y);
			View.this.requestUpdateCamera();
		}

		public void mouseDragged(MouseEvent mevt) {
			int x = mevt.getX();
			int y = mevt.getY();

			View.this.onMouseMove(x, y);
			View.this.requestUpdateCamera();
		}
	}
}
