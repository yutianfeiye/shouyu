package player;

import cas.CASFrame;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import sigmlanim.AnimatedSign;
import sigmlanim.SiGMLAnimation;
import util.LoggerConfig;

public class AnimationScan {
	private static Logger logger= LogManager.getLogger();;;

	private final SiGMLAnimation ANIM;

	private final SignsArrayAccess ANIM_SIGNS;

	private final PlayerFlags FLAGS;

	private int ss;

	private int ff;

	private int ffAtAdvance;

	private int fLimitSignScan;

	private boolean signIsNew;

	public AnimationScan(SiGMLAnimation animdata, PlayerFlags flags) {
		this.ANIM = animdata;
		this.FLAGS = flags;

		this.ANIM_SIGNS = this.ANIM.getSignsArray();

		this.ANIM_SIGNS.update();

		reset();
	}

	public int animFPS() {
		return (int) this.ANIM.animFPS();
	}

	public synchronized void setSingleSignPlay(boolean single) {
		this.FLAGS.setSingleSignPlay(single);
		updateScanLimit();
	}

	public boolean animationIsIncomplete() {
		return !this.ANIM_SIGNS.arrayIsFinal();
	}

	public void checkForAnimationUpdate() {
		if ((scanIsAtLastFrameInSign()) && (animationIsIncomplete())) {
			this.ANIM_SIGNS.update();
			logger.log(LoggerConfig.LOGLevel, LoggerConfig.CONTROLMarker, "AnimationScan: Update: Signs=" +

					sCount() + ", Frames=" + fCount());
		}
	}

	public void waitForFramesWithTime(float tmillis) throws InterruptedException {
		this.ANIM_SIGNS.update();

		while ((!this.ANIM_SIGNS.arrayIsFinal()) && (this.ff == fCount())) {
			this.ANIM_SIGNS.waitForProgress();
		}

		if (this.ff != fCount()) {

			float T_WANTED = frame().getTime() + tmillis;

			while ((!this.ANIM_SIGNS.arrayIsFinal()) && (latestFrame().getTime() < T_WANTED)) {
				this.ANIM_SIGNS.waitForProgress();
			}
		}
	}

	public void waitForFrames(int nf) throws InterruptedException {
		this.ANIM_SIGNS.update();
		while ((!this.ANIM_SIGNS.arrayIsFinal()) && (fCount() < nf)) {
			this.ANIM_SIGNS.waitForProgress();
		}
	}

	public void waitForSigns(int ns) throws InterruptedException {
		this.ANIM_SIGNS.update();
		while ((!this.ANIM_SIGNS.arrayIsFinal()) && (sCount() < ns)) {
			this.ANIM_SIGNS.waitForProgress();
		}
	}

	public void tryWaitForFrames(int nf, String tag) {
		try {
			waitForFrames(nf);
		} catch (InterruptedException ix) {
			String prefix = tag + ": ";
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.CONTROLMarker, "AnimationScan: " + prefix + ix);
		}
	}

	public void waitForFrameIfNeeded() throws InterruptedException {
		if ((animationIsIncomplete()) && (this.ff == fCount()) && (!scanIsOneSign())) {
			waitForFrames(this.ff + 1);
		}
	}

	public void waitForFramesIfNeeded(int nf) throws InterruptedException {
		if ((animationIsIncomplete()) && (fCount() < this.ff + nf) && (!scanIsOneSign())) {
			waitForFrames(this.ff + nf);
		}
	}

	public void waitForFullAnimation() throws InterruptedException {
		while (!this.ANIM_SIGNS.arrayIsFinal()) {
			this.ANIM_SIGNS.waitForProgress();
		}
	}

	public synchronized void resetForSequencePlay() throws InterruptedException {
		if (this.FLAGS.singleSignPlayIsOn()) {

			waitForSigns(1);

			int s = s();

			resetToSign(scanIsAtLimit() ? s - 1 : s);
		} else {
			reset();
		}
	}

	protected synchronized void reset() {
		this.ss = 0;

		this.signIsNew = true;

		this.ff = 0;
		this.fLimitSignScan = -1;

		this.ffAtAdvance = -1;
	}

	protected synchronized void resetToSign(int s) {
		resetToSign(s, true);
	}

	protected synchronized void resetToSign(int s, boolean dolimit) {
		this.signIsNew = (s != this.ss);

		if (this.signIsNew) {
			this.ss = s;
		}
		AnimatedSign sgn = sign();

		if (sgn != null) {
			this.ff = sgn.getFramesBase();
			this.fLimitSignScan = (dolimit ? sgn.getFramesLimit() : -1);
		} else {
			this.ff = 0;
			this.fLimitSignScan = (dolimit ? 0 : -1);
		}

		this.ffAtAdvance = -1;
	}

	protected synchronized void updateScanLimit() {
		this.fLimitSignScan = (scanIsAtNewSign() ? this.ff
				: !this.FLAGS.singleSignPlayIsOn() ? -1 : sign().getFramesLimit());
	}

	public synchronized void advanceFrame() {
		if (this.ff != fCount()) {
			this.ffAtAdvance = this.ff;

			this.ff += 1;

			this.signIsNew = ((this.ff == fCount()) || (this.ff == sign(this.ss).getFramesLimit()));

			if (this.signIsNew) {
				this.ss += 1;
			}
		}
	}

	public synchronized void setFrame(int f) {
		if (this.ff + 1 == f) {
			advanceFrame();
		} else if ((this.ff != f) && (frameExists(f))) {
			this.ffAtAdvance = -1;

			this.ff = f;

			int SS = this.ss;

			this.signIsNew = ((SS == sCount()) || (!sign(SS).hasFrame(f)));

			if (this.signIsNew)
				this.ss = signIndex(f);
		}
	}

	public boolean scanIsOneSign() {
		return 0 <= this.fLimitSignScan;
	}

	public int scanLimit() {
		return scanIsOneSign() ? this.fLimitSignScan : fCount();
	}

	public boolean scanIsAtLimit() {
		return this.ff == scanLimit();
	}

	public boolean scanIsAtLastFrame() {
		return this.ff + 1 == scanLimit();
	}

	public boolean scanIsAtLastFrameInSign() {
		return (this.ss == sCount()) || (this.ff + 1 == sign(this.ss).getFramesLimit());
	}

	public SiGMLAnimation animation() {
		return this.ANIM;
	}

	public int sCount() {
		return this.ANIM_SIGNS.countSigns();
	}

	public int fCount() {
		return this.ANIM_SIGNS.countFrames();
	}

	public int s() {
		return this.ss;
	}

	public int f() {
		return this.ff;
	}

	public boolean frameExists(int f) {
		return (0 <= f) && (f < fCount());
	}

	public boolean signExists(int s) {
		return (0 <= s) && (s < sCount());
	}

	public boolean scanIsAtNewSign() {
		return this.signIsNew;
	}

	public boolean newSignExists() {
		return signExists(this.ss);
	}

	public AnimatedSign sign(int s) {
		return this.ANIM_SIGNS.signs()[s];
	}

	public AnimatedSign sign() {
		int SS = this.ss;
		return SS == sCount() ? null : sign(SS);
	}

	public synchronized CASFrame frame() {
		int FF = this.ff;
		return FF == fCount() ? null : sign(this.ss).getFrame(FF);
	}

	protected synchronized CASFrame latestFrame() {
		return sign(sCount() - 1).getFrame(fCount() - 1);
	}

	public int signIndex(int f) {
		int SS = this.ss;
		int S_LIM = sCount();

		return sign(SS - 1).hasFrame(f) ? SS - 1
				: SS == 0 ? 0
						: SS < S_LIM ? signIndexForValidSS(f)
								: SS < 0 ? signIndexInRange(f, 0, S_LIM) : signIndexInRange(f, 0, SS - 1);
	}

	protected int signIndexForValidSS(int f) {
		int SS = this.ss;
		int CMP = sign(SS).compareFrames(f);

		return sign(SS + 1).hasFrame(f) ? SS + 1
				: CMP == 0 ? SS
						: 0 < CMP ? signIndexInRange(f, 0, SS - 1)
								: sign(SS - 1).hasFrame(f) ? SS - 1 : signIndexInRange(f, SS + 2, sCount());
	}

	protected int signIndexInRange(int f, int slo, int shi) {
		int s = slo;
		int t = shi;
		while (s + 1 != t) {
			int m = (s + t) / 2;
			if (sign(m).getFramesBase() <= f)
				s = m;
			else {
				t = m;
			}
		}
		return s;
	}

	public FrameIndexScanAccess getFrameIndexAccess() {
		return new FrameIndexAccess();
	}

	protected int fBase() {
		return scanIsAtNewSign() ? sign(this.ss - 1).getFramesBase()
				: this.fLimitSignScan < 0 ? 0 : sign().getFramesBase();
	}

	protected int fLim() {
		return 0 <= this.fLimitSignScan ? this.fLimitSignScan : fCount();
	}

	protected int fIndex() {
		int fix = this.ffAtAdvance < 0 ? f() : this.ffAtAdvance;

		return fix;
	}

	protected int fNextIndex() {
		int fnxt = f();

		if (this.FLAGS.singleSignPlayIsOn()) {
			if (fnxt == this.fLimitSignScan) {
				fnxt = sign(s() - 1).getFramesBase();
			}

		} else if (scanIsAtLimit()) {
			fnxt = 0;
		}

		return fnxt;
	}

	protected int fPreviousIndex() {
		int fold = this.ffAtAdvance < 0 ? f() : this.ffAtAdvance;

		if (this.FLAGS.singleSignPlayIsOn()) {
			if (!scanIsAtNewSign()) {
				AnimatedSign sgn = sign();
				if (fold == sgn.getFramesBase()) {
					fold = sgn.getFramesLimit();
				}

			}
		} else if (fold == 0) {
			fold = fCount();
		}

		int fprv = fold - 1;

		return fprv;
	}

	protected class FrameIndexAccess implements FrameIndexScanAccess {
		protected FrameIndexAccess() {
		}

		public int value() {
			return AnimationScan.this.fIndex();
		}

		public int nextValue() {
			return AnimationScan.this.fNextIndex();
		}

		public int previousValue() {
			return AnimationScan.this.fPreviousIndex();
		}

		public int min() {
			return AnimationScan.this.fBase();
		}

		public int max() {
			return AnimationScan.this.fLim() - 1;
		}
	}
}
