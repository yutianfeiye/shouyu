package player;

public class PlayerFlags {
	private boolean doCyclicPlay;

	private boolean doSingleSignPlay;

	private boolean hasAvatar;

	public PlayerFlags() {
		this(false, false, false);
	}

	public PlayerFlags(boolean cp, boolean ssp, boolean ha) {
		this.doCyclicPlay = cp;
		this.doSingleSignPlay = ssp;
		this.hasAvatar = ha;
	}

	public synchronized void setCyclicPlay(boolean cyclic) {
		this.doCyclicPlay = cyclic;
	}

	public synchronized boolean cyclicPlayIsOn() {
		return this.doCyclicPlay;
	}

	public synchronized void setSingleSignPlay(boolean ss) {
		this.doSingleSignPlay = ss;
	}

	public synchronized boolean singleSignPlayIsOn() {
		return this.doSingleSignPlay;
	}

	public synchronized void setHasAvatar(boolean ha) {
		this.hasAvatar = ha;
	}

	public synchronized boolean hasAvatar() {
		return this.hasAvatar;
	}
}
