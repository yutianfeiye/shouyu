package player;

import sigmlanim.AnimatedSign;

public class SignStatusRecord {
	protected final AnimationScan SCAN;
	protected int sIndex;
	protected String sGloss;

	public SignStatusRecord(AnimationScan scan) {
		this.SCAN = scan;
		update(-1, null);
	}

	public void update(int s, String glss) {
		this.sIndex = s;
		this.sGloss = glss;
	}

	public void update() {
		this.sIndex = this.SCAN.s();
		this.sGloss = this.SCAN.sign().getGloss();
	}

	public AnimationScan scan() {
		return this.SCAN;
	}

	public int sign() {
		return this.sIndex;
	}

	public int signLimit() {
		return this.SCAN.sCount();
	}

	public String gloss() {
		return this.sGloss;
	}
}
