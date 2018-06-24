package sigmlanim;

import java.util.LinkedList;
import java.util.List;
import sigmlanim.sigmlstream.interfaces.SiGMLAnimationBuildHandler;

public class SignsListBuilder implements SiGMLAnimationBuildHandler {
	private LinkedList<AnimatedSign> signs = new LinkedList();
	private List<AnimatedSign> result;

	public void beginSignSequence() {
	}

	public void setNextSign(AnimatedSign as) {
		this.signs.addLast(as);
	}

	public void nextSignAnimationIsDone() {
	}

	public void endSignSequence() {
		this.result = this.signs;
		this.signs = null;
	}

	public List<AnimatedSign> getSigns() {
		return this.result;
	}
}
