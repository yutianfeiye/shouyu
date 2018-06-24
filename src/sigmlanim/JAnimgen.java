package sigmlanim;

import cas.CASFrame;
import cas.CASMorph;
import cas.CASTRSet;
import jautil.JAAvatarsEnv;
import jautil.JAIO;
import jautil.JAOptions;
import jautil.JATimer;
import jautil.install.MSVCRedistInfo;
import jautil.install.NativeLibLoader;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;
import java.util.ArrayList;
import javax.swing.JOptionPane;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import sigmlanim.sigmlstream.interfaces.StreamedSiGMLSupplierForAnimationGen;
import sigmlgen.playerctrl.AvatarSettings;
import sigmlgen.playerctrl.TimeSettings;
import util.LoggerConfig;

public class JAnimgen {
	private static Logger logger = LogManager.getLogger();;
	public static final int AG_OK_STATUS = 0;
	public static final int AG_SIGML_WARNING = 1;
	public static final int JAG_PRIMORDIAL = 0;

	static {
		Thread tcur = Thread.currentThread();
		logger.log(LoggerConfig.TRACELevel, LoggerConfig.THREADMarker, "JAGLib Static load: tid=" + tcur.getId());

		try {
			NativeLibLoader.loadLibrary("JAGLib");
		} catch (UnsatisfiedLinkError ule) {
			String ulmsg = ule.getMessage();
			boolean says_no_jaglib = ulmsg.contains("no jaglib");
			boolean refers_to_jaglib_dll = ulmsg.contains("jaglib.dll:");
			String errtxt = null;
			if ((refers_to_jaglib_dll) && (!says_no_jaglib)) {
				errtxt = MSVCRedistInfo.getErrorText();
			}
			if (errtxt != null) {
				JOptionPane.showMessageDialog(null, errtxt, "JAGLib Link Error", 0);

				logger.log(LoggerConfig.ERRORLevel, LoggerConfig.ANIMGENMarker, errtxt);
			}

			throw ule;
		}
	}

	public static class JAGException extends RuntimeException {
		public JAGException(String msg) {
			super();
		}
	}

	public static final int JAG_SETTING_UP = 1;

	public static final int JAG_READY = 2;

	public static final int JAG_GENERATING = 3;

	public static final int JAG_DONE = 4;

	public static final int JAG_TERMINATED = 5;

	public static final int AGS_TBD = -1;

	public static final int AGS_OK = 0;

	public static final int AGS_SIGML_QUERY = 1;

	public static final int AGS_INIT_FAIL = 2;

	public static final int AGS_STATUS_FAIL = 3;

	public static final int AGS_FINAL_FAIL = 4;

	public static final int FBIX_DURATION = 0;

	public static final int FBIX_BONE_COUNT = 1;

	public static final int FBIX_MORPH_COUNT = 2;

	public static final int FBIX_DATA = 3;

	public static final int TRSET_SIZE = 7;

	static final float REST_TIME = 0.324F;

	static final float REST_MARGIN = 0.4F;

	static final float REST_MIN_GAP = 0.19440001F;

	public static final int MAX_JAG_INSTANCES = 8;

	private static JAnimgen[] mapJAGInstances;

	private int jagID = -1;

	private int jagState;

	private int animgenStatus;

	private int maxBones;

	private int maxMorphs;

	private FloatBuffer frameBuffer;

	private boolean framesOK;

	private int fbixBoneID;

	private int fbixBones;

	private int fbixMorphID;

	private int fbixMorphs;

	private int fbixEnd;

	private ArrayList<CASFrame> framesForSign;

	private int agCountFramesForSign;

	private ArrayList<Integer> agFrameCountAnomalies;

	private CASFrame lastFrame;

	private CASFrame emergencyFrame;

	private int[] boneID;

	private int[] morphID;

	private float timeStamp;

	private float baseTimeStamp;

	private float targetTimeStamp;

	private int nSignsOK;

	private int nSignsWithWarning;

	private int iSign;

	private int nFrames;

	private final JAOptions JA_OPTIONS;

	private JAnimgenConfigData CONFIG_DATA;

	private String AVATAR;

	private final boolean DO_MULTI_SIGN_SIGML;

	private final StreamedSiGMLSupplierForAnimationGen SIGML_SUPPLIER;

	private AnimatedSign currentSign;

	private AnimatedSign cachedSign;

	private int agNSigns;

	private int agNSignsFailed;

	private int agNSignsBad;

	private int agNSignsUnimplemented;

	private int agNSignsGood;

	private ArrayList<AnimatedSign> SIGNS_LIST;

	protected final class MasterThread extends Thread {
		protected MasterThread() {
		}

		public void run() {
			JAnimgen.logger.log(LoggerConfig.INFOLevel, LoggerConfig.THREADMarker, "Run: Animgen master thread");
			try {
				JAnimgen.this.spawnAnimgen();
			} catch (InterruptedException ix) {
				JAnimgen.logger.log(LoggerConfig.WARNLevel, LoggerConfig.THREADMarker,
						"JAnimgen master thread: Interrupted: " + ix);
			}

			JAnimgen.logger.log(LoggerConfig.STATSLevel, LoggerConfig.THREADMarker, "End: Animgen master thread");
		}
	}

	protected final class AnimgenThread extends Thread {
		protected AnimgenThread() {
		}

		public void run() {
			JAnimgen.logger.log(LoggerConfig.INFOLevel, LoggerConfig.THREADMarker, "Run: JAnimgen instance");
			try {
				JAnimgen.this.runAnimgen();
			} catch (InterruptedException ix) {
				JAnimgen.logger.log(LoggerConfig.WARNLevel, LoggerConfig.THREADMarker,
						"JAnimgen instance thread: Interrupted: " + ix);
			}
			JAnimgen.logger.log(LoggerConfig.LOGLevel, LoggerConfig.THREADMarker, "End: JAnimgen instance");
		}
	}

	public JAnimgen(JAOptions JA_OPTS, JAnimgenConfigData CFG_DATA,
			StreamedSiGMLSupplierForAnimationGen SIGML_SUPPLIER) {
		this(JA_OPTS, CFG_DATA, SIGML_SUPPLIER, false);
	}

	public JAnimgen(JAOptions JA_OPTS, JAnimgenConfigData CFG_DATA, StreamedSiGMLSupplierForAnimationGen SIGML_SUPPLIER,
			boolean MULTI_SIGN) {
		this.JA_OPTIONS = JA_OPTS;
		this.CONFIG_DATA = CFG_DATA;
		this.AVATAR = this.CONFIG_DATA.AVATAR;

		this.SIGML_SUPPLIER = SIGML_SUPPLIER;

		this.DO_MULTI_SIGN_SIGML = MULTI_SIGN;

		MasterThread T_MT = new MasterThread();
		T_MT.start();
	}

	protected void spawnAnimgen() throws InterruptedException {
		this.jagState = 0;

		while ((this.jagState == 0) || (this.cachedSign != null)) {
			this.framesOK = false;
			this.frameBuffer = null;
			this.jagState = 0;

			if (this.cachedSign == null) {
				this.timeStamp = 0.0F;
				this.baseTimeStamp = 0.0F;
				this.targetTimeStamp = 0.0F;
			} else {
				String av = this.cachedSign.getAvatarSettings().getName();
				if (this.JA_OPTIONS.getAvatarsEnv().isValidAvatar(av)) {
					this.CONFIG_DATA = new JAnimgenConfigData(av, this.JA_OPTIONS);

					this.AVATAR = av;
				} else {
					this.cachedSign.setAvatarSettings(null);
					logger.log(LoggerConfig.WARNLevel, LoggerConfig.ANIMGENMarker,
							"JAnimgen: spawnAnimgen ignored invalid avatar " + av);
				}
			}

			logger.log(LoggerConfig.TRACELevel, LoggerConfig.ANIMGENMarker, "JAnimgen: Spawn for " + this.AVATAR);

			this.animgenStatus = -1;
			allocateJAGID();

			AnimgenThread T_AG = new AnimgenThread();
			T_AG.start();
			try {
				waitForJAGState(5);
			} catch (Exception ex) {
				logger.log(LoggerConfig.WARNLevel, LoggerConfig.ANIMGENMarker,
						"JAnimgen: exception in spawnAnimgen(): " + ex);
				ex.printStackTrace(System.out);
			}
		}
	}

	protected void runAnimgen() throws InterruptedException {
		JATimer tmr = new JATimer(logger, LoggerConfig.STATSLevel, LoggerConfig.THREADMarker);

		logger.log(LoggerConfig.INFOLevel, LoggerConfig.ANIMGENMarker, "JAnimgen: Thread for " + this.AVATAR);

		doAnimgenInitialise();
		doAnimgenGenerateFrames();

		tmr.showTimeMS("JAnimgen: Thread time");
	}

	protected void doAnimgenInitialise() {
		byte[] AVATAR = JAIO.utf8Bytes(this.AVATAR);

		byte[] LOG_PATH = JAIO.utf8Bytes(JAIO.pathForFileURL(this.CONFIG_DATA.LOG_URL));

		byte[][] AV_XML = this.CONFIG_DATA.AVATAR_XML_TEXTS;

		byte[] XML_CFG_AV = AV_XML[1];
		byte[] XML_CFG_CMMN = AV_XML[0];
		byte[] XML_ASD = AV_XML[2];
		byte[] XML_NONMAN = AV_XML[3];

		establishPeerObject();
		updateJAGState(1);

		logger.log(LoggerConfig.TRACELevel, LoggerConfig.ANIMGENMarker, "doAnimgenInitialise: Avatar " + this.AVATAR);

		boolean agok = agInitialise(this.jagID, AVATAR, XML_CFG_AV, XML_CFG_CMMN, XML_ASD, XML_NONMAN, LOG_PATH,
				this.CONFIG_DATA.DO_APPEND_LOG, !this.CONFIG_DATA.DO_LOG);

		if (!agok) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.ANIMGENMarker, "doAnimgenInitialise: Failure");
			this.animgenStatus = 2;
		}

		updateJAGState(agok ? 2 : 4);
	}

	protected void doAnimgenGenerateFrames() throws InterruptedException {
		if (jagStateIs(2)) {
			generateFrames();
			recordAnimgenStatus();
			updateJAGState(4);
		} else {
			generateEmptyFrames();
		}
	}

	protected void generateFrames() throws InterruptedException {
		this.nSignsOK = 0;
		this.nSignsWithWarning = 0;
		this.iSign = 0;
		this.nFrames = 0;

		this.framesForSign = new ArrayList();
		this.agCountFramesForSign = 0;
		this.agFrameCountAnomalies = new ArrayList();
		this.emergencyFrame = null;

		if (this.DO_MULTI_SIGN_SIGML) {
			generateFramesMultiSignSiGML();
		} else {
			generateFramesSingleSignSiGML();
		}
	}

	protected void generateFramesMultiSignSiGML() throws InterruptedException {
		JATimer tmr = new JATimer(logger, LoggerConfig.TRACELevel, LoggerConfig.ANIMGENMarker);
		long tanim = 0L;

		agStartSequence(this.jagID, this.CONFIG_DATA.FPS);

		String SIGML_BEG = "<sigml>";
		String SIGML_END = "</sigml>";
		int SIGML_BEG_LEN = "<sigml>".length();
		int SIGML_END_LEN = "</sigml>".length();

		StringBuilder sigmlbuf = new StringBuilder(2048);
		sigmlbuf.append("<sigml>").append("\n");

		ArrayList<AnimatedSign> signs = new ArrayList();

		AnimatedSign cursign = this.cachedSign;
		this.cachedSign = null;
		if (cursign == null) {
			cursign = this.SIGML_SUPPLIER.getNextSignToBeAnimated();
		}
		while (cursign != null) {
			logger.log(LoggerConfig.LOGLevel, LoggerConfig.ANIMGENMarker, "Multi: Sign \"" + cursign.getGloss() + "\"");
			if (cursign.getCameraSettings() != null) {
				logger.log(LoggerConfig.LOGLevel, LoggerConfig.ANIMGENMarker,
						"Multi: Camera change: " + cursign.getCameraSettings());
			}

			if (cursign.getTimeSettings() != null) {
				logger.log(LoggerConfig.LOGLevel, LoggerConfig.ANIMGENMarker,
						"Multi: Time setting: " + cursign.getTimeSettings());
			}
			if (cursign.getAvatarSettings() != null) {
				if (cursign.getAvatarSettings().equals(this.AVATAR)) {
					logger.log(LoggerConfig.LOGLevel, LoggerConfig.ANIMGENMarker,
							"Multi: Avatar unchanged: " + cursign.getAvatarSettings());
				} else if (!this.JA_OPTIONS.getAvatarsEnv().isValidAvatar(cursign.getAvatarSettings().getName())) {
					logger.log(LoggerConfig.WARNLevel, LoggerConfig.ANIMGENMarker,
							"Multi: Avatar change ignored as invalid: " + cursign.getAvatarSettings());
					cursign.setAvatarSettings(null);
				} else {
					logger.log(LoggerConfig.TRACELevel, LoggerConfig.ANIMGENMarker,
							"JAnimgen Multi: Avatar change: " + cursign.getAvatarSettings());
					this.cachedSign = cursign;
					cursign = null;
				}
			}
			if (cursign != null) {
				String S_SIGML = cursign.getSiGMLForSign();

				if ((S_SIGML.startsWith("<sigml>")) && (S_SIGML.endsWith("</sigml>"))) {
					int SIGN_LEN = S_SIGML.length();

					String SIGN = S_SIGML.substring(SIGML_BEG_LEN, SIGN_LEN - SIGML_END_LEN);

					sigmlbuf.append(SIGN);

				} else {

					int N = signs.size();
					logger.log(LoggerConfig.ERRORLevel, LoggerConfig.ANIMGENMarker,
							"Bad SiGML sign for JAnimgen, ix=" + N);
				}
				signs.add(cursign);
				cursign = this.SIGML_SUPPLIER.getNextSignToBeAnimated();
			}
		}

		this.SIGNS_LIST = signs;

		sigmlbuf.append("</sigml>").append("\n");

		this.currentSign = null;

		byte[] SIGML_C = JAIO.utf8BytesForXML(sigmlbuf.toString());
		long TS0 = tmr.getTimeNow();
		agGenerateFrames(this.jagID, SIGML_C);
		tanim += tmr.getTimeNow() - TS0;

		logger.log(LoggerConfig.STATSLevel, LoggerConfig.ANIMGENMarker,
				"Multi: Done : #signs=" + signs.size() + "; #animgen-signs=" + this.iSign);

		tmr.showGivenTimeMS(tmr.getTimeDeltaMS(0L, tanim), "Multi: Animgen time");
	}

	protected void generateFramesSingleSignSiGML() throws InterruptedException {
		JATimer tmr = new JATimer(logger, LoggerConfig.TRACELevel, LoggerConfig.ANIMGENMarker);
		long tanim = 0L;
		boolean sameAvatar = true;

		agStartSequence(this.jagID, this.CONFIG_DATA.FPS);

		this.currentSign = this.cachedSign;
		this.cachedSign = null;
		if (this.currentSign == null) {
			this.currentSign = this.SIGML_SUPPLIER.getNextSignToBeAnimated();
		}

		while (this.currentSign != null) {

			float aimTimeStamp = this.baseTimeStamp;

			logger.log(LoggerConfig.TRACELevel, LoggerConfig.ANIMGENMarker,
					"Test: \"" + this.currentSign.getGloss() + "\"");

			if (this.currentSign.getTimeSettings() != null) {
				boolean doRest = this.currentSign.getTimeSettings().getMode().equalsIgnoreCase("rest");
				aimTimeStamp = Float.parseFloat(this.currentSign.getTimeSettings().getBegin()) * 1000.0F;
				float delta = (aimTimeStamp - this.baseTimeStamp) / 1000.0F;
				logger.log(LoggerConfig.LOGLevel, LoggerConfig.ANIMGENMarker,
						"Time setting: " + this.currentSign.getTimeSettings() + " Delta: " + delta + "s");

				if (delta > 0.19440001F) {
					this.cachedSign = this.currentSign;
					if ((doRest) || (this.lastFrame == null)) {
						float restTime = Math.min(delta, 0.324F);
						String restSign = restSiGML(restTime);
						logger.log(doRest ? LoggerConfig.TRACELevel : LoggerConfig.WARNLevel,
								LoggerConfig.ANIMGENMarker, "Inserted rest sign(s) for " + restTime + "s");

						logger.log(doRest ? LoggerConfig.LOGLevel : LoggerConfig.WARNLevel, LoggerConfig.SIGMLMarker,
								"Inserted rest sign(s): " + restSign);

						this.currentSign = new AnimatedSign(restSign, "rest", null);
					} else {
						this.currentSign = null;
					}
				} else if (delta > 1.0F / this.CONFIG_DATA.FPS) {
					if (this.lastFrame != null) {
						if (doRest) {
							logger.log(LoggerConfig.WARNLevel, LoggerConfig.ANIMGENMarker,
									"Delta less than minimum rest gap so hold will be applied");
						}

						this.cachedSign = this.currentSign;
						this.currentSign = null;
					} else {
						logger.log(LoggerConfig.WARNLevel, LoggerConfig.ANIMGENMarker,
								"Delta less than minimum rest gap. Following signs ahead by " + delta + "s");
					}
				} else if (delta >= -(1.0F / this.CONFIG_DATA.FPS)) {
					logger.log(LoggerConfig.TRACELevel, LoggerConfig.ANIMGENMarker, "Already at desired time");
				} else {
					logger.log(LoggerConfig.WARNLevel, LoggerConfig.ANIMGENMarker,
							"Negative delta. Following signs delayed by " + -delta + "s");
				}
			}

			if ((this.currentSign != null) && (this.currentSign.getAvatarSettings() != null)) {
				if (this.currentSign.getAvatarSettings().getName().equals(this.AVATAR)) {
					logger.log(LoggerConfig.LOGLevel, LoggerConfig.ANIMGENMarker,
							"Avatar unchanged: " + this.currentSign.getAvatarSettings());
				} else if (!this.JA_OPTIONS.getAvatarsEnv()
						.isValidAvatar(this.currentSign.getAvatarSettings().getName())) {
					logger.log(LoggerConfig.WARNLevel, LoggerConfig.ANIMGENMarker,
							"Avatar change ignored as invalid: " + this.currentSign.getAvatarSettings());
					this.currentSign.setAvatarSettings(null);
				} else {
					logger.log(LoggerConfig.LOGLevel, LoggerConfig.ANIMGENMarker,
							"Avatar change: " + this.currentSign.getAvatarSettings());
					this.cachedSign = this.currentSign;
					this.currentSign = null;

					sameAvatar = false;
				}
			}

			if (this.currentSign != null) {
				if (this.currentSign.getCameraSettings() != null) {
					logger.log(LoggerConfig.LOGLevel, LoggerConfig.ANIMGENMarker,
							"Camera change: " + this.currentSign.getCameraSettings());
				}

				String signSiGML = this.currentSign.getSiGMLForSign();
				if (signSiGML == null) {
					logger.log(LoggerConfig.LOGLevel, LoggerConfig.ANIMGENMarker,
							"Sign: \"" + this.currentSign.getGloss() + "\" Empty " + this.baseTimeStamp + "/"
									+ this.targetTimeStamp);

					CASFrame[] frames = new CASFrame[1];
					frames[0] = new CASFrame(this.baseTimeStamp, 0.0F, null, null);
					this.currentSign.setFrames(frames, this.nFrames);
					this.nFrames += 1;
					this.nSignsOK += 1;
				} else {
					logger.log(LoggerConfig.LOGLevel, LoggerConfig.ANIMGENMarker,
							"Sign: \"" + this.currentSign.getGloss() + "\" Start " + this.baseTimeStamp + "/"
									+ this.targetTimeStamp);

					byte[] SIGN_C = JAIO.utf8BytesForXML(signSiGML);
					long TS0 = tmr.getTimeNow();
					agGenerateFrames(this.jagID, SIGN_C);
					tanim += tmr.getTimeNow() - TS0;

					logger.log(LoggerConfig.TRACELevel, LoggerConfig.ANIMGENMarker,
							"Sign: \"" + this.currentSign.getGloss() + "\" Ended " + this.baseTimeStamp + "/"
									+ this.targetTimeStamp);
				}
				this.SIGML_SUPPLIER.putProcessedSign(this.currentSign);

				this.iSign += 1;
			}

			if ((this.baseTimeStamp < aimTimeStamp) && (this.lastFrame != null)) {
				logger.log(LoggerConfig.TRACELevel, LoggerConfig.ANIMGENMarker,
						"Hold in gap from " + this.baseTimeStamp + " to " + aimTimeStamp);

				logger.log(LoggerConfig.LOGLevel, LoggerConfig.ANIMGENMarker,
						"Sign: \"hold\" Start " + this.baseTimeStamp + "/" + this.targetTimeStamp);

				float frameDur = this.lastFrame.getDuration();
				CASTRSet[] frameBones = this.lastFrame.getTRSets();
				CASMorph[] frameMorphs = this.lastFrame.getMorphs();
				int newFrames = 0;

				this.framesForSign.clear();
				while (this.baseTimeStamp < aimTimeStamp) {
					CASFrame holdFrame = new CASFrame(this.baseTimeStamp, frameDur, frameBones, frameMorphs);

					this.baseTimeStamp += frameDur;

					this.timeStamp = this.baseTimeStamp;
					this.framesForSign.add(holdFrame);
					newFrames++;
				}
				CASFrame[] frames = new CASFrame[newFrames];
				this.framesForSign.toArray(frames);
				this.framesForSign.clear();
				AnimatedSign holdSign = new AnimatedSign("hold", this.nFrames, frames);
				this.nFrames += newFrames;
				logger.log(LoggerConfig.TRACELevel, LoggerConfig.ANIMGENMarker,
						"Sign: \"hold\" Ended " + this.baseTimeStamp + "/" + this.targetTimeStamp);

				this.SIGML_SUPPLIER.putProcessedSign(holdSign);

				this.nSignsOK += 1;
				this.iSign += 1;
			}

			if ((this.currentSign != null) && (this.cachedSign == null)) {
				this.SIGML_SUPPLIER.doneSignAnimation();

				this.currentSign = this.SIGML_SUPPLIER.getNextSignToBeAnimated();
			} else if (sameAvatar) {
				this.currentSign = this.cachedSign;
				this.cachedSign = null;
			}
		}

		tmr.showGivenTimeMS(tmr.getTimeDeltaMS(0L, tanim), "JAnimgen Single: Animgen time");
	}

	protected String restSiGML(float tim) {
		return "<sigml><hamgestural_sign gloss=\"rest\" duration=\"" + tim + "\"/></sigml>";
	}

	protected void recordAnimgenStatus() {
		logger.log(LoggerConfig.STATSLevel, LoggerConfig.ANIMGENMarker,
				"JAnimgen: Total Signs: " + this.agNSigns + "  Failed: " + this.agNSignsFailed + "  Bad: "
						+ this.agNSignsBad + "  Unimplemented: " + this.agNSignsUnimplemented + "  Good: "
						+ this.agNSignsGood);

		int N_SIGNS = this.iSign;
		boolean ALL_OK = this.nSignsOK == N_SIGNS;
		this.framesOK = (this.nSignsOK + this.nSignsWithWarning == N_SIGNS);

		if (this.agFrameCountAnomalies.size() != 0) {
			int N_FCA = this.agFrameCountAnomalies.size() / 2;
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.ANIMGENMarker, "JAnimgen: " + N_FCA + " out of " + N_SIGNS
					+ " signs with difference " + "between promised and actual frame count:");

			for (int i = 0; i != N_FCA; i++) {
				int S = ((Integer) this.agFrameCountAnomalies.get(2 * i)).intValue();
				int D = ((Integer) this.agFrameCountAnomalies.get(2 * i + 1)).intValue();
				logger.log(LoggerConfig.WARNLevel, LoggerConfig.ANIMGENMarker,
						String.format("JAnimgen: Sign %3d: %d %s on delivery.", new Object[] { Integer.valueOf(S),
								Integer.valueOf(D < 0 ? -D : D), D < 0 ? "extra" : "short" }));
			}
		}

		if (!ALL_OK) {
			String statusstr = "failure(s): OK " + this.nSignsOK + ". Total " + this.iSign;

			logger.log(LoggerConfig.WARNLevel, LoggerConfig.ANIMGENMarker, "JAnimgen: Status: " + statusstr);
		}

		this.animgenStatus = (this.framesOK ? 1 : ALL_OK ? 0 : 4);
	}

	protected void generateEmptyFrames() throws InterruptedException {
		this.iSign = 0;
		this.currentSign = this.SIGML_SUPPLIER.getNextSignToBeAnimated();
		while (this.currentSign != null) {
			this.currentSign.setFrames(new CASFrame[0], 0);
			this.SIGML_SUPPLIER.doneSignAnimation();
			this.iSign += 1;

			this.currentSign = this.SIGML_SUPPLIER.getNextSignToBeAnimated();
		}

		logger.log(LoggerConfig.WARNLevel, LoggerConfig.ANIMGENMarker,
				"JAnimgen: Not used as all " + this.iSign + " signs were empty");

		this.animgenStatus = 0;
	}

	protected void attachFramesToSign() {
		int N_FRM = this.framesForSign.size();
		CASFrame[] frames = new CASFrame[N_FRM];
		this.framesForSign.toArray(frames);
		this.framesForSign.clear();

		this.currentSign.setFrames(frames, this.nFrames);
		this.nFrames += N_FRM;
		this.baseTimeStamp = this.timeStamp;

		this.nSignsOK += 1;
	}

	protected void startNewSign() {
		this.currentSign = ((AnimatedSign) this.SIGNS_LIST.get(this.iSign));
		this.framesForSign.clear();
	}

	protected void setFrameFloatBufferCB(ByteBuffer bb, int nbones, int nmorphs) {
		try {
			bb.order(ByteOrder.nativeOrder());
			this.frameBuffer = bb.asFloatBuffer();

			this.maxBones = nbones;
			this.maxMorphs = nmorphs;

			this.fbixBoneID = 3;
			this.fbixBones = (this.fbixBoneID + nbones);
			this.fbixMorphID = (this.fbixBones + nbones * 7);
			this.fbixMorphs = (this.fbixMorphID + nmorphs);
			this.fbixEnd = (this.fbixMorphs + nmorphs);
		} catch (Exception ex) {
			logger.log(LoggerConfig.ERRORLevel, LoggerConfig.ANIMGENMarker,
					"JAnimgen: Callback setFrameFloatBufferCB:");

			ex.printStackTrace(System.out);
		}
	}

	protected boolean initStatusCB(int status, int nframes) {
		boolean keep_going = false;

		try {
			if ((status == 0) || (status == 1)) {
				keep_going = true;

				this.agCountFramesForSign = nframes;
				this.framesForSign.ensureCapacity(nframes + 1);

				this.boneID = new int[this.maxBones];
				this.morphID = new int[this.maxMorphs];

				updateJAGState(3);
			} else {
				this.animgenStatus = 3;
				updateJAGState(4);
			}
		} catch (Exception ex) {
			logger.log(LoggerConfig.ERRORLevel, LoggerConfig.ANIMGENMarker, "JAnimgen: Callback initStatusCB:");

			ex.printStackTrace(System.out);
		}

		return keep_going;
	}

	protected void signStartCB() {
		if (this.DO_MULTI_SIGN_SIGML) {
			try {
				if (this.currentSign != null) {
					attachFramesToSign();
					this.SIGML_SUPPLIER.doneSignAnimation();
					this.iSign += 1;
				}
				startNewSign();
			} catch (Exception ex) {
				logger.log(LoggerConfig.ERRORLevel, LoggerConfig.ANIMGENMarker, "JAnimgen: Callback signStartCB:");

				ex.printStackTrace(System.out);
			}
		}
	}

	protected void notifyFrameCB() {
		try {
			FloatBuffer fb = this.frameBuffer;
			int F_IX = this.framesForSign.size();

			fb.rewind();

			float DURATION = fb.get();

			int N_BONES = Float.floatToRawIntBits(fb.get());
			int N_MORPHS = Float.floatToRawIntBits(fb.get());

			CASTRSet[] bones = new CASTRSet[N_BONES];
			CASMorph[] morphs = N_MORPHS == 0 ? null : new CASMorph[N_MORPHS];

			for (int i = 0; i != N_BONES; i++) {
				this.boneID[i] = Float.floatToRawIntBits(fb.get());
			}

			fb.position(this.fbixMorphID);
			for (int i = 0; i != N_MORPHS; i++) {
				this.morphID[i] = Float.floatToRawIntBits(fb.get());
			}

			fb.position(this.fbixBones);
			for (int i = 0; i != N_BONES; i++) {
				float[] trans = new float[3];
				float[] rot = new float[4];
				int B_ID = this.boneID[i];
				fb.get(trans);
				fb.get(rot);
				bones[i] = new CASTRSet(B_ID, rot, trans);
			}

			if (N_MORPHS != 0) {

				fb.position(this.fbixMorphs);
				for (int i = 0; i != N_MORPHS; i++) {
					int M_ID = this.morphID[i];
					float AMOUNT = fb.get();
					morphs[i] = new CASMorph(M_ID, AMOUNT);
				}
			}

			this.lastFrame = new CASFrame(this.timeStamp, DURATION, bones, morphs);

			this.framesForSign.add(this.lastFrame);

			if ((this.iSign == 0) && (F_IX == 0)) {
				this.emergencyFrame = this.lastFrame;
			}
			this.timeStamp += DURATION;
		} catch (Exception ex) {
			logger.log(LoggerConfig.ERRORLevel, LoggerConfig.ANIMGENMarker, "JAnimgen: Callback notifyFrameCB:");

			ex.printStackTrace(System.out);
		}
	}

	protected void finalStatusCB(int status, int nsigns, int nfailed, int nbad, int nunimplemented, int ngood) {
		if (this.cachedSign != null) {
			logger.log(LoggerConfig.TRACELevel, LoggerConfig.ANIMGENMarker,
					"Cached sign \"" + this.cachedSign.getGloss()
							+ (this.cachedSign.getAvatarSettings() == null ? "\""
									: new StringBuilder().append("\" for ").append(this.cachedSign.getAvatarSettings())
											.toString()));
		}
		if (this.DO_MULTI_SIGN_SIGML) {
			finalStatusMultiSignSiGML(status, nsigns, nfailed, nbad, nunimplemented, ngood);

			return;
		}

		finalStatusSingleSignSiGML(status, nsigns, nfailed, nbad, nunimplemented, ngood);
	}

	protected void finalStatusMultiSignSiGML(int status, int nsigns, int nfailed, int nbad, int nunimplemented,
			int ngood) {
		try {
			this.agNSigns = nsigns;
			this.agNSignsFailed = nfailed;
			this.agNSignsBad = nbad;
			this.agNSignsUnimplemented = nunimplemented;
			this.agNSignsGood = ngood;

			boolean sigmlOK = status <= 1;

			if (sigmlOK) {

				if (this.currentSign != null) {
					attachFramesToSign();
					this.SIGML_SUPPLIER.doneSignAnimation();
					this.iSign += 1;
				}
			} else {
				if (1 < status) {
					logger.log(LoggerConfig.WARNLevel, LoggerConfig.ANIMGENMarker, "Multi: Failure: Status=" + status);
				}

				if (this.currentSign != null) {
					CASFrame[] eframe = { this.emergencyFrame };
					this.currentSign.setFrames(eframe, this.nFrames);
					this.timeStamp = this.baseTimeStamp;
					if (this.emergencyFrame != null) {
						this.timeStamp += this.emergencyFrame.getDuration();
					}
					this.SIGML_SUPPLIER.doneSignAnimation();
					this.iSign += 1;
				}

			}
		} catch (Exception ex) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.ANIMGENMarker,
					"Multi: Callback finalStatusMultiSignSiGML: " + ex);

			ex.printStackTrace(System.out);
		}
	}

	protected void finalStatusSingleSignSiGML(int status, int nsigns, int nfailed, int nbad, int nunimplemented,
			int ngood) {
		try {
			this.agNSigns = nsigns;
			this.agNSignsFailed = nfailed;
			this.agNSignsBad = nbad;
			this.agNSignsUnimplemented = nunimplemented;
			this.agNSignsGood = ngood;

			int N = this.agCountFramesForSign;
			int N_FRM = this.framesForSign.size();
			int DIFF = N - N_FRM;
			if (DIFF != 0) {
				this.agFrameCountAnomalies.add(Integer.valueOf(this.iSign));
				this.agFrameCountAnomalies.add(Integer.valueOf(DIFF));
			}
			CASFrame[] frames = new CASFrame[N_FRM];
			this.framesForSign.toArray(frames);
			this.framesForSign.clear();

			boolean signOK = status <= 1;

			if (signOK) {
				if (status == 0)
					this.nSignsOK += 1;
				else {
					this.nSignsWithWarning += 1;
				}

				this.currentSign.setFrames(frames, this.nFrames);
				this.nFrames += N_FRM;
				this.baseTimeStamp = this.timeStamp;
			} else {
				String SIGN_PFX = "Sign " + this.iSign + ": ";

				if (1 < status) {
					logger.log(LoggerConfig.WARNLevel, LoggerConfig.ANIMGENMarker,
							"Sign " + this.iSign + " failure: Status=" + status);
				}

				CASFrame[] eframe = { this.emergencyFrame };
				this.currentSign.setFrames(eframe, this.nFrames);
				this.timeStamp = this.baseTimeStamp;
				if (this.emergencyFrame != null) {
					this.timeStamp += this.emergencyFrame.getDuration();
				}

			}
		} catch (Exception ex) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.ANIMGENMarker,
					"JAnimgen Single: Callback finalStatusSingleSignSiGML: " + ex);

			ex.printStackTrace(System.out);
		}
	}

	protected synchronized void waitForJAGState(int state) throws InterruptedException {
		while (this.jagState != state) {
			wait();
		}
	}

	protected synchronized void updateJAGState(int state) {
		if (this.jagState != state) {
			this.jagState = state;

			if (state == 4) {
				terminatePeerObject();
				this.jagState = 5;
			}

		//	notifyAll();
		}
	}

	protected synchronized boolean jagStateIs(int state) {
		return this.jagState == state;
	}

	protected void allocateJAGID() {
		synchronized (JAnimgen.class) {
			if (mapJAGInstances == null) {
				mapJAGInstances = new JAnimgen[8];
			}

			int i = 0;
			int ii = 8;
			while (i != ii) {
				if (mapJAGInstances[i] != null)
					i++;
				else {
					ii = i;
				}
			}
			if (i == 8) {
				throw new JAGException("too many JAnimgen instances!");
			}
			mapJAGInstances[i] = this;

			this.jagID = i;
			logger.log(LoggerConfig.TRACELevel, LoggerConfig.ANIMGENMarker, "JAGID allocate " + i);
		}
	}

	protected void establishPeerObject() {
		synchronized (JAnimgen.class) {

			agEstablishJAGPeer(this.jagID);
		}
	}

	protected void terminatePeerObject() {
		synchronized (JAnimgen.class) {
			mapJAGInstances[this.jagID] = null;
			agTerminateJAGPeer(this.jagID);
			logger.log(LoggerConfig.TRACELevel, LoggerConfig.ANIMGENMarker, "JAGID release " + this.jagID);
		}
	}

	public static void init() {
	}

	protected native void agEstablishJAGPeer(int paramInt);

	protected native void agTerminateJAGPeer(int paramInt);

	protected native boolean agInitialise(int paramInt, byte[] paramArrayOfByte1, byte[] paramArrayOfByte2,
			byte[] paramArrayOfByte3, byte[] paramArrayOfByte4, byte[] paramArrayOfByte5, byte[] paramArrayOfByte6,
			boolean paramBoolean1, boolean paramBoolean2);

	protected native void agStartSequence(int paramInt, float paramFloat);

	protected native void agGenerateFrames(int paramInt, byte[] paramArrayOfByte);
}
