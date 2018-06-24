package sigmlanim;

import java.io.PrintStream;
import sigmlanim.sigmlstream.interfaces.StreamedSiGMLSupplierForAnimationGen;

public class SignsArraySupplier implements StreamedSiGMLSupplierForAnimationGen {
	private final AnimatedSign[] SIGNS;
	private final int N_SIGNS;
	private int countGet;
	private int countDone;

	public SignsArraySupplier(AnimatedSign[] signs) {
		this.SIGNS = signs;
		this.N_SIGNS = signs.length;
		this.countGet = 0;
		this.countDone = 0;
	}

	public AnimatedSign getNextSignToBeAnimated() {
		AnimatedSign sign = null;

		if (this.countGet != this.N_SIGNS) {
			sign = this.SIGNS[this.countGet];
			this.countGet += 1;
		}

		return sign;
	}

	public void putProcessedSign(AnimatedSign as) {
		System.out.println("## SignsArraySupplier: putProcessedSign \"" + as.getGloss() + "\"");
	}

	public synchronized void doneSignAnimation() {
		this.countDone += 1;
		if (this.countDone == this.N_SIGNS) {
			notify();
		}
	}

	public synchronized void waitUntilAllAnimated() throws InterruptedException {
		while (this.countDone != this.N_SIGNS) {
			wait();
		}
	}
}
