package sigmlanim;

import casxml.CASWriter;
import casxml.CASWriter.CASWriterException;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import player.SignsArrayAccess;
import sigmlanim.sigmlstream.interfaces.SiGMLAnimationBuildHandler;
import sigmlanim.sigmlstream.interfaces.SiGMLAnimationLoadEventHandler;
import util.LoggerConfig;

public class SiGMLAnimation implements SiGMLAnimationBuildHandler {
	private static Logger logger= LogManager.getLogger();;;

	private final float FPS;

	private final List<AnimatedSign> A_SIGNS;

	private final Object SIGNS_SYNCH = new Object();

	private int nFrames;

	private AtomicInteger nAnimated;

	private AtomicBoolean hasAllSigns;

	private AtomicBoolean allAnimated;

	private final LinkedList<SiGMLAnimationLoadEventHandler> LOAD_EVENT_HANDLERS;

	private final SignsArray SIGNS_ARRAY;

	public SiGMLAnimation(float fps) {
		this(fps, (SiGMLAnimationLoadEventHandler) null);
	}

	public SiGMLAnimation(float fps, SiGMLAnimationLoadEventHandler saleh) {
		this.FPS = fps;

		this.A_SIGNS = new ArrayList(8);
		this.nFrames = 0;

		this.nAnimated = new AtomicInteger(0);
		this.hasAllSigns = new AtomicBoolean(false);
		this.allAnimated = new AtomicBoolean(false);

		this.SIGNS_ARRAY = new SignsArray();

		this.LOAD_EVENT_HANDLERS = new LinkedList();

		addLoadEventHandler(this.SIGNS_ARRAY);
		addLoadEventHandler(saleh);
	}

	public SiGMLAnimation(float fps, AnimatedSign[] asigns) {
		this.FPS = fps;

		int N = asigns.length;
		this.A_SIGNS = new ArrayList(N);

		this.nAnimated = new AtomicInteger(0);
		this.hasAllSigns = new AtomicBoolean(false);
		this.allAnimated = new AtomicBoolean(false);

		this.LOAD_EVENT_HANDLERS = new LinkedList();

		this.SIGNS_ARRAY = new SignsArray();
		addLoadEventHandler(this.SIGNS_ARRAY);

		beginSignSequence();
		int i = 0;
		for (AnimatedSign asign : asigns) {
			setNextSign(asign);
			nextSignAnimationIsDone();
			i++;
		}
		endSignSequence();
	}

	public float animFPS() {
		return this.FPS;
	}

	public SignsArrayAccess getSignsArray() {
		return this.SIGNS_ARRAY;
	}

	public synchronized void waitForAnimationComplete() throws InterruptedException {
		while (!allAreAnimated()) {
			wait();
		}
	}

	private void addLoadEventHandler(SiGMLAnimationLoadEventHandler saleh) {
		if (saleh != null) {
			this.LOAD_EVENT_HANDLERS.addLast(saleh);
		}
	}

	private void fireLoadStartedEvent() {
		for (SiGMLAnimationLoadEventHandler lehdlr : this.LOAD_EVENT_HANDLERS) {
			lehdlr.animLoadStarted();
		}
	}

	private void fireLoadDoneEvent() {
		for (SiGMLAnimationLoadEventHandler lehdlr : this.LOAD_EVENT_HANDLERS) {
			lehdlr.animLoadDone(countSigns(), this.nFrames);
		}
	}

	private void fireSignLoadedEvent(int s, int flimit) {
		for (SiGMLAnimationLoadEventHandler lehdlr : this.LOAD_EVENT_HANDLERS) {
			lehdlr.animSignLoaded(s, flimit);
		}
	}

	private static boolean DO_REPORT = false;

	public void beginSignSequence() {
		fireLoadStartedEvent();
	}

	public void setNextSign(AnimatedSign as) {
		addSign(as);

		notifyProgress();

		if (DO_REPORT)
			report("++++");
	}

	private synchronized void addSign(AnimatedSign as) {
		synchronized (this.SIGNS_SYNCH) {
			this.A_SIGNS.add(as);
			this.SIGNS_SYNCH.notify();
		}
	}

	public void nextSignAnimationIsDone() {
		int s = this.nAnimated.getAndIncrement();

		AnimatedSign as = getSign(s);
		this.nFrames += as.getFrames().length;

		fireSignLoadedEvent(s, this.nFrames);

		notifyProgress();

		checkSetAllAnimated();

		if (DO_REPORT) {
			report(">>>>");
		}
	}

	public void endSignSequence() {
		this.hasAllSigns.set(true);
		checkSetAllAnimated();

		logger.log(LoggerConfig.LOGLevel, LoggerConfig.CONTROLMarker,
				"SiGMLAnimation: All signs received (maybe not all animated), N-signs=" +

						countSigns());
	}

	private void checkSetAllAnimated() {
		if ((allAreReceived()) && (countAnimatedSigns() == countSigns())) {
			this.allAnimated.set(true);
			logger.log(LoggerConfig.LOGLevel, LoggerConfig.CONTROLMarker, "SiGMLAnimation: Build complete, N-signs=" +

					countSigns());
			fireLoadDoneEvent();
			notifyProgress();
		}
	}

	private synchronized void notifyProgress() {
		notifyAll();
	}

	private int countSigns() {
		return allAreReceived() ? this.A_SIGNS.size() : synchCountSigns();
	}

	private int countAnimatedSigns() {
		return this.nAnimated.get();
	}

	private AnimatedSign getSign(int s) {
		return allAreAnimated() ? (AnimatedSign) this.A_SIGNS.get(s) : waitForSign(s);
	}

	private AnimatedSign waitForSign(int s) {
		synchronized (this.SIGNS_SYNCH) {

			while (this.A_SIGNS.size() <= s) {
				logger.log(LoggerConfig.TRACELevel, LoggerConfig.CONTROLMarker,
						"SiGMLAnimation: Waiting for sign " + s);

				try {
					this.SIGNS_SYNCH.wait();
				} catch (InterruptedException ix) {
					logger.log(LoggerConfig.WARNLevel, LoggerConfig.CONTROLMarker,
							"SiGMLAnimation: waitForSign: " + ix);

					Thread.currentThread().interrupt();
				}
			}
		}

		return synchSign(s);
	}

	private boolean allAreReceived() {
		return this.hasAllSigns.get();
	}

	private boolean allAreAnimated() {
		return this.allAnimated.get();
	}

	private synchronized int synchCountSigns() {
		return this.A_SIGNS.size();
	}

	private synchronized AnimatedSign synchSign(int s) {
		return (AnimatedSign) this.A_SIGNS.get(s);
	}

	private synchronized int synchCountFrames() {
		return this.nFrames;
	}

	private synchronized void report(String pfx) {
		report(pfx, "");
	}

	private synchronized void report(String pfx, String sfx) {
		int na = countAnimatedSigns();
		int ns = countSigns();
		int nf = this.nFrames;
		boolean gotall = allAreReceived();
		logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.CONTROLMarker, pfx + "  n-Anim=" + na + "  n-Signs=" + ns
				+ "  n-frames=" + nf + (gotall ? "" : "  (Continues)") + sfx);
	}

	protected synchronized void waitForAnimationProgress(int nanim) throws InterruptedException {
		while ((nanim == countAnimatedSigns()) && (!allAreAnimated())) {
			wait();
		}
	}

	protected void updateSignsArray(SignsArray sa) {
		int N_OLD;

		int N_NEW;
		boolean IS_FINAL;
		synchronized (this) {
			N_OLD = sa.countSigns();
			N_NEW = countAnimatedSigns();
			IS_FINAL = allAreAnimated();
		}

		if (N_OLD != N_NEW) {
			AnimatedSign[] asigns = sa.signs();
			int N_ARRAY = asigns.length;
			int lo = N_OLD;
			if (N_ARRAY < N_NEW) {

				int N = allAreReceived() ? countSigns() : N_NEW;
				asigns = new AnimatedSign[N];
				lo = 0;
			}
			for (int i = lo; i != N_NEW; i++) {
				asigns[i] = waitForSign(i);
			}
			sa.set(asigns, N_NEW, IS_FINAL);
		} else if (IS_FINAL) {
			sa.setFinal();
		}
	}

	protected void writeCAS(String av, File caspath) {
		String MSG_PFX = "SiGMLAnimation: writeCAS: ";
		int NS;
		try {
			Writer wrtr = new FileWriter(caspath);

			AnimatedSign[] SIGNS = getSignsArray().signs();
			CASWriter.writeDocument(wrtr, av, SIGNS);
			logger.log(LoggerConfig.LOGLevel, LoggerConfig.CONTROLMarker,
					"SiGMLAnimation: CAS written to file " + caspath);

			NS = SIGNS.length;
		} catch (IOException iox) {

			logger.log(LoggerConfig.WARNLevel, LoggerConfig.CONTROLMarker, "SiGMLAnimation: writeCAS: " + iox);
		} catch (CASWriter.CASWriterException cwx) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.CONTROLMarker, "SiGMLAnimation: writeCAS: " + cwx);
		}
	}

	public void asynchWriteCAS(final String AV, final File CAS_PATH) {
		Runnable CAS_WRITE_RUNNER = new Runnable() {
			public void run() {
				SiGMLAnimation.logger.log(LoggerConfig.INFOLevel, LoggerConfig.THREADMarker, "Run: Write CAS");
				SiGMLAnimation.this.writeCAS(AV, CAS_PATH);
				SiGMLAnimation.logger.log(LoggerConfig.STATSLevel, LoggerConfig.THREADMarker, "End: Write CAS");
			}
		};
		Thread cwthread = new Thread(CAS_WRITE_RUNNER);
		cwthread.start();
	}

	protected class SignsArray implements SignsArrayAccess, SiGMLAnimationLoadEventHandler {
		private AnimatedSign[] signs;

		private int nValid;

		private boolean isFinal;

		public SignsArray() {
			set(new AnimatedSign[0], 0, false);
		}

		public void set(AnimatedSign[] sgns, int n, boolean isf) {
			this.signs = sgns;
			this.nValid = n;
			this.isFinal = isf;
		}

		public void setFinal() {
			this.isFinal = true;
		}

		public AnimatedSign[] signs() {
			return this.signs;
		}

		public int countSigns() {
			return this.nValid;
		}

		public int countFrames() {
			return this.nValid == 0 ? 0 : this.signs[(this.nValid - 1)].getFramesLimit();
		}

		public boolean arrayIsFinal() {
			return this.isFinal;
		}

		public void update() {
			if (!this.isFinal)
				doPendingUpdates();
		}

		public void waitForProgress() throws InterruptedException {
			if (!this.isFinal) {
				doWaitForProgress();
			}
		}

		private int nValidPending = 0;

		private boolean isFinalPending = false;

		private synchronized void updateNValidPending(int n) {
			this.nValidPending = n;
		}

		private synchronized void setIsFinalPending() {
			this.isFinalPending = true;
		}

		private synchronized boolean updateIsPending() {
			return (this.nValid != this.nValidPending) || (this.isFinal != this.isFinalPending);
		}

		private synchronized void clearPendingUpdates() {
			this.nValidPending = this.nValid;
			this.isFinalPending = this.isFinal;
		}

		private synchronized void doPendingUpdates() {
			if (updateIsPending()) {
				SiGMLAnimation.this.updateSignsArray(this);
				clearPendingUpdates();
			}
		}

		private synchronized void doUpdate() {
			SiGMLAnimation.this.updateSignsArray(this);
			clearPendingUpdates();
		}

		private void doWaitForProgress() throws InterruptedException {
			SiGMLAnimation.this.waitForAnimationProgress(this.nValid);

			doUpdate();
		}

		public void animLoadStarted() {
		}

		public void animSignLoaded(int s, int flimit) {
			updateNValidPending(s + 1);
		}

		public void animLoadDone(int nsint, int nf) {
			setIsFinalPending();
		}
	}
}
