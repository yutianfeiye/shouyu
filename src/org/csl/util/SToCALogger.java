package org.csl.util;

import java.io.PrintWriter;
import org.csl.util.UseJLogger;

//############  Logging.  ############

/**
 * UseJLogger implementation for a SToC Applet, using standard output as the
 * target for logging output, also providing a means (
 * {@link #setLogEnabled(boolean)}) of dynamically switching logging on and off.
 */
public class SToCALogger implements UseJLogger {

	/** The current logging output target, if there is one. */
	private PrintWriter logWriter;

	/**
	 * Constructs a new logger, initially enabled or not as specified by the
	 * given flag string.
	 */
	public SToCALogger(String enabledflag) {

		this.logWriter = null;
		this.setLogEnabled(enabledflag);
	}

	/**
	 * Outputs the given message on the log writer, if SPA logging is enabled.
	 */
	public final void log(String msg) {

		if (this.logIsEnabled()) {
			this.logWriter.print("####  ");
			this.logWriter.println(msg);
		}
	}

	/**
	 * Outputs the given message on the log writer with the standard prefix, if
	 * SPA logging is enabled.
	 */
	public final void logp(String msg) {

		if (this.logIsEnabled()) {
			this.logWriter.print("####  SToCA: ");
			this.logWriter.println(msg);
		}
	}

	/**
	 * Outputs the given message on the log writer with no prefix (i.e. bare),
	 * if SPA logging is enabled.
	 */
	public final void logb(String msg) {

		if (this.logIsEnabled()) {
			this.logWriter.println(msg);
		}
	}

	/** Indicates if SPA logging is currently enabled. */
	public final synchronized boolean logIsEnabled() {

		return (this.logWriter != null);
	}

	/** Enables or disables SPA logging as specified. */
	public final synchronized void setLogEnabled(boolean enable) {

		// Do nothing unless the current state differs from
		// the one requested.
		if (enable != (this.logWriter != null)) {

			if (enable) {
				this.logWriter = new PrintWriter(System.out, true);
			} else {
				// DON'T close the log writer, since that also closes
				// the underlying print stream, e.g. System.out.
				this.logWriter = null;
			}
		}
	}

	/**
	 * Enables SPA logging if the given string is non-null and matches
	 * {@code "true"} (case-insensitively), and disables logging otherwise.
	 */
	public final void setLogEnabled(String enableflag) {

		this.setLogEnabled(enableflag != null && enableflag.equalsIgnoreCase("true"));
	}
}
