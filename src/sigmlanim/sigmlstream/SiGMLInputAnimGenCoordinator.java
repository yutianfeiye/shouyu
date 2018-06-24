package sigmlanim.sigmlstream;

import java.util.LinkedList;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import sigmlanim.AnimatedSign;
import sigmlanim.sigmlstream.interfaces.SiGMLAnimationBuildHandler;
import sigmlanim.sigmlstream.interfaces.StreamedSiGMLReceiver;
import sigmlanim.sigmlstream.interfaces.StreamedSiGMLSupplierForAnimationGen;
import sigmlgen.playerctrl.PlayerSettings;
import util.LoggerConfig;

public class SiGMLInputAnimGenCoordinator implements StreamedSiGMLReceiver, StreamedSiGMLSupplierForAnimationGen {
	private static Logger logger = LogManager.getLogger();;

	private int streamLevel;

	private PlayerSettings pendingPS;

	private boolean allSignsReceived;

	private final SiGMLAnimationBuildHandler SIGML_ANIM_BUILDER;

	private final FilteringSupplierForAnimGen FILTER_FOR_JAG;

	private final LinkedList<AnimatedSign> JAG_SIGN_QUEUE;

	private int processingForAnimation;

	private boolean processingFinished;

	private final LinkedList<Integer> ABORT_LEVEL_STACK;

	private boolean levelZeroStreamIsPending;

	public SiGMLInputAnimGenCoordinator(SiGMLAnimationBuildHandler sab) {
		this.streamLevel = 0;
		this.pendingPS = null;
		this.allSignsReceived = false;
		this.processingFinished = false;
		this.SIGML_ANIM_BUILDER = sab;
		this.FILTER_FOR_JAG = new FilteringSupplierForAnimGen(this);
		this.JAG_SIGN_QUEUE = new LinkedList();
		this.processingForAnimation = 0;

		this.ABORT_LEVEL_STACK = new LinkedList();
	}

	public StreamedSiGMLSupplierForAnimationGen getSiGMLSupplierForAG() {
		return this.FILTER_FOR_JAG;
	}

	public void beginSignStream() {
		if (this.streamLevel == 0) {
			this.SIGML_ANIM_BUILDER.beginSignSequence();
			this.levelZeroStreamIsPending = false;
		}

		this.streamLevel += 1;
	}

	public void setNewPlayerSettings(PlayerSettings ps) {
		if (this.pendingPS == null) {
			this.pendingPS = ps;
		} else if (ps.getTimeSettings() == null) {
			logger.log(LoggerConfig.LOGLevel, LoggerConfig.SIGMLMarker,
					"SiGMLInputAnimGenCoordinator sNPS: Merge Player Settings");

			if (ps.getAvatarSettings() != null) {
				this.pendingPS.updateAvatarSettings(ps.getAvatarSettings());
			}
			if (ps.getCameraSettings() != null) {
				this.pendingPS.updateCameraSettings(ps.getCameraSettings());
			}
		} else {
			logger.log(LoggerConfig.LOGLevel, LoggerConfig.SIGMLMarker,
					"SiGMLInputAnimGenCoordinator sNPS: Insert spacer sign");

			AnimatedSign as = spacerSign(this.pendingPS);
			this.pendingPS = ps;

			addToJAGQueue(as);
		}
	}

	private AnimatedSign spacerSign(PlayerSettings ps) {
		return new AnimatedSign(null, "spacer", ps);
	}

	public void setNextSign(String gsigml, String gloss) {
		AnimatedSign as = new AnimatedSign(gsigml, gloss, this.pendingPS);
		this.pendingPS = null;
		logger.log(LoggerConfig.LOGLevel, LoggerConfig.SIGMLMarker,
				"SiGMLInputAnimGenCoordinator sNS: Sign \"" + as.getGloss() + "\"");
		if (as.getCameraSettings() != null) {
			logger.log(LoggerConfig.TRACELevel, LoggerConfig.SIGMLMarker,
					"SiGMLInputAnimGenCoordinator sNS: Camera change: " + as.getCameraSettings());
		}
		if (as.getAvatarSettings() != null) {
			logger.log(LoggerConfig.TRACELevel, LoggerConfig.SIGMLMarker,
					"SiGMLInputAnimGenCoordinator sNS: Avatar change: " + as.getAvatarSettings());
		}

		addToJAGQueue(as);
	}

	public synchronized void setNextSignWithAnim(AnimatedSign sign) {
		sign.supplementPlayerSettings(this.pendingPS);
		this.pendingPS = null;

		logger.log(LoggerConfig.LOGLevel, LoggerConfig.SIGMLMarker,
				"SiGMLInputAnimGenCoordinator sNSWA: Sign \"" + sign.getGloss() + "\" with animation");
		if (sign.getCameraSettings() != null) {
			logger.log(LoggerConfig.TRACELevel, LoggerConfig.SIGMLMarker,
					"SiGMLInputAnimGenCoordinator sNSWA: Camera change: " + sign.getCameraSettings());
		}
		if (sign.getAvatarSettings() != null) {
			logger.log(LoggerConfig.TRACELevel, LoggerConfig.SIGMLMarker,
					"SiGMLInputAnimGenCoordinator sNSWA: Avatar change: " + sign.getAvatarSettings());
		}

		addToJAGQueue(sign);
	}

	public void endSignStream() {
		this.streamLevel -= 1;

		if (this.streamLevel == 0) {
			if (this.pendingPS != null) {
				logger.log(LoggerConfig.LOGLevel, LoggerConfig.SIGMLMarker,
						"SiGMLInputAnimGenCoordinator eSS: Add spacer for outstanding Player Settings");

				AnimatedSign as = spacerSign(this.pendingPS);
				this.pendingPS = null;

				addToJAGQueue(as);
			}

			setAllSignsReceived();

			checkAnimationCompleted();
		}
	}

	public void addStreamAbortCheckpoint() {
		this.ABORT_LEVEL_STACK.add(Integer.valueOf(this.streamLevel));
		if (this.streamLevel == 0) {
			this.levelZeroStreamIsPending = true;
		}
	}

	public void abortCurrentSiGMLStream() {
		int alevel = ((Integer) this.ABORT_LEVEL_STACK.removeLast()).intValue();

		while (alevel != this.streamLevel) {
			endSignStream();
		}

		if (this.levelZeroStreamIsPending) {

			beginSignStream();
			endSignStream();
		}
	}

	public void clearStreamAbortCheckpoint() {
		this.ABORT_LEVEL_STACK.removeLast();
	}

	private synchronized void setAllSignsReceived() {
		logger.log(LoggerConfig.LOGLevel, LoggerConfig.SIGMLMarker, "SiGMLInputAnimGenCoordinator: All signs received");

		this.allSignsReceived = true;
		notify();
	}

	private synchronized void addToJAGQueue(AnimatedSign as) {
		this.JAG_SIGN_QUEUE.add(as);
		this.processingForAnimation += 1;
		notify();
	}

	public synchronized AnimatedSign getNextSignToBeAnimated() throws InterruptedException {
		logger.log(LoggerConfig.TRACELevel, LoggerConfig.SIGMLMarker,
				"SiGMLInputAnimGenCoordinator: getNextSignToBeAnimated: Request");

		AnimatedSign as = null;

		while ((this.JAG_SIGN_QUEUE.size() == 0) && (!this.allSignsReceived)) {
			wait();
		}
		if (this.JAG_SIGN_QUEUE.size() != 0) {
			as = (AnimatedSign) this.JAG_SIGN_QUEUE.remove();
		}

		if (as == null) {
			logger.log(LoggerConfig.LOGLevel, LoggerConfig.SIGMLMarker,
					"SiGMLInputAnimGenCoordinator: getNextSignToBeAnimated: End of input");
		} else {
			logger.log(LoggerConfig.LOGLevel, LoggerConfig.SIGMLMarker,
					"SiGMLInputAnimGenCoordinator: getNextSignToBeAnimated: \"" + as.getGloss() + "\"");
		}

		return as;
	}

	public void putProcessedSign(AnimatedSign as) {
		logger.log(LoggerConfig.LOGLevel, LoggerConfig.SIGMLMarker,
				"SiGMLInputAnimGenCoordinator: putProcessedSign \"" + as.getGloss() + "\"");

		this.SIGML_ANIM_BUILDER.setNextSign(as);
		this.SIGML_ANIM_BUILDER.nextSignAnimationIsDone();
	}

	public void doneSignAnimation() {
		this.processingForAnimation -= 1;
		checkAnimationCompleted();
	}

	private void checkAnimationCompleted() {
		if ((this.processingForAnimation == 0) && (this.allSignsReceived) && (!this.processingFinished)) {
			this.processingFinished = true;
			logger.log(LoggerConfig.LOGLevel, LoggerConfig.SIGMLMarker,
					"SiGMLInputAnimGenCoordinator: checkAnimationCompleted: Signal all processing done");

			this.SIGML_ANIM_BUILDER.endSignSequence();
		} else {
			logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.SIGMLMarker,
					"SiGMLInputAnimGenCoordinator: checkAnimationCompleted: allSignsReceived=" + this.allSignsReceived
							+ " JAG Queue=" + this.JAG_SIGN_QUEUE

									.size()
							+ " processingForAnimation=" + this.processingForAnimation + " processingFinished="
							+ this.processingFinished);
		}
	}
}
