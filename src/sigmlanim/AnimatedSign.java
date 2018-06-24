package sigmlanim;

import cas.CASFrame;
import sigmlgen.GSiGMLSign;
import sigmlgen.playerctrl.PlayerSettings;

public class AnimatedSign extends GSiGMLSign {
	protected CASFrame[] frames;
	protected int fLo;
	protected int fHi;

	public AnimatedSign(GSiGMLSign sign) {
		super(sign);
		this.frames = null;
		this.fLo = (this.fHi = -1);
	}

	public AnimatedSign(String gsigml, String gloss, PlayerSettings ps) {
		super(gsigml, gloss, ps);
		this.frames = null;
		this.fLo = (this.fHi = -1);
	}

	public AnimatedSign(String gloss, int base, CASFrame[] frms) {
		super(null, gloss, null);
		setFrames(frms, base);
	}

	public CASFrame[] getFrames() {
		return this.frames;
	}

	public CASFrame getFrame(int f) {
		return this.frames[(f - this.fLo)];
	}

	public int getFramesBase() {
		return this.fLo;
	}

	public int getFramesLimit() {
		return this.fHi;
	}

	public boolean hasFrame(int f) {
		return (this.fLo <= f) && (f < this.fHi);
	}

	public int compareFrames(int f) {
		return this.fLo <= f ? 0 : this.fHi <= f ? -1 : 1;
	}

	public float getStartTime(float stdefault) {
		return this.fLo == this.fHi ? stdefault : this.frames[0].getTime();
	}

	public float getLimitTime(float ltdefault) {
		float lt = ltdefault;

		if (this.fLo != this.fHi) {
			CASFrame F_LAST = this.frames[(this.frames.length - 1)];
			lt = F_LAST.getTime() + F_LAST.getDuration();
		}

		return lt;
	}

	public void setFrames(CASFrame[] frms, int base) {
		this.frames = frms;
		this.fLo = base;
		this.fHi = (base + this.frames.length);
	}

	public void ensureBaseIndex(int lo) {
		int DELTA = lo - this.fLo;
		if (DELTA != 0) {
			this.fLo = lo;
			this.fHi += DELTA;
		}
	}

	public void ensureStartTime(float t) {
		if (this.fLo != this.fHi) {
			float T_DELTA = t - this.frames[0].getTime();

			if (1.0E-5D <= Math.abs(T_DELTA)) {
				for (CASFrame frm : this.frames)
					frm.adjustTime(T_DELTA);
			}
		}
	}
}
