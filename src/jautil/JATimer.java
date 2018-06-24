package jautil;

import java.io.PrintStream;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;

public class JATimer {
	private Logger logger = null;
	private Level logLevel = null;
	private Marker logMarker = null;

	private long t0;

	private long t1;

	private boolean displayIsDisabled = false;

	public JATimer() {
		start();
	}

	public JATimer(Logger log, Level lev, Marker mark) {
		this.logger = log;
		this.logLevel = lev;
		this.logMarker = mark;
		start();
	}

	public void setDisplayDisabled(boolean da) {
		this.displayIsDisabled = da;
	}

	public void start() {
		this.t0 = System.nanoTime();
	}

	public long getTimeNow() {
		return System.nanoTime();
	}

	public long startAndGet() {
		start();
		return this.t0;
	}

	public float getTimeDeltaMS(long tm0, long tm1) {
		long td = tm1 - tm0;
		return (float) (0.001D * (int) (td * 0.001D));
	}

	public float getTimeMS() {
		this.t1 = System.nanoTime();
		return getTimeDeltaMS(this.t0, this.t1);
	}

	public float getRelativeTimeMS(long tbase) {
		long tnow = System.nanoTime();
		return getTimeDeltaMS(tbase, tnow);
	}

	public void showGivenTimeMS(float tms, String tag) {
		if (!this.displayIsDisabled) {
			if (this.logger != null) {
				this.logger.log(this.logLevel, this.logMarker,
						String.format(tag + "%10.3f ms", new Object[] { Float.valueOf(tms) }));
			} else {
				System.out.printf("#### " + tag + "=%10.3f ms.\n", new Object[] { Float.valueOf(tms) });
			}
		}
	}

	public void showTimeMS(String tag) {
		showGivenTimeMS(getTimeMS(), tag);
	}

	public void showTimeMSAndRestart(String tag) {
		showGivenTimeMS(getTimeMS(), tag);
		this.t0 = this.t1;
	}

	public void showRelativeTimeMS(long tbase, String tag) {
		float tms = getRelativeTimeMS(tbase);
		showGivenTimeMS(tms, tag);
	}

	public float getAndShowTimeMS(String tag) {
		float tms = getTimeMS();
		showGivenTimeMS(tms, tag);
		return tms;
	}

	public float getAndShowRelativeTimeMS(long tbase, String tag) {
		float tms = getRelativeTimeMS(tbase);
		showGivenTimeMS(tms, tag);
		return tms;
	}
}
