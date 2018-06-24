package jautil;

import java.io.IOException;
import java.io.PrintStream;
import java.util.logging.FileHandler;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;

public class JALog {
	public static final String STD_LOG_NAME = "uk.ac.uea.cmp.ja";
	public static final String STD_LOG_FILE = "%h/Desktop/ja-log.txt";
	private static Logger log = null;
	private static boolean logIsOff = true;

	public static void createLog(String name, String file) {
		log = Logger.getLogger(name);
		try {
			FileHandler fh = new FileHandler(file);
			fh.setFormatter(new SimpleFormatter());
			log.addHandler(fh);
		} catch (IOException iox) {
			System.out.println("####  JALog.createLog(): " + iox);
		}

		log.setLevel(Level.INFO);
	}

	public static void createLog() {
		createLog("uk.ac.uea.cmp.ja", "%h/Desktop/ja-log.txt");
	}

	public Logger getLogger() {
		return log;
	}

	public static void enableLog() {
		logIsOff = false;
	}

	public static void disableLog() {
		logIsOff = true;
	}

	public static void info(String msg) {
		if (!logIsOff) {
			if (log == null) {
				createLog();
			}

			log.info(msg);
		}
	}

	public static void infoAndThread(String msg) {
		if (!logIsOff) {
			info(msg + threadInfo());
		}
	}

	public static void infoAndThread(String msg, Thread t) {
		if (!logIsOff) {
			info(msg + threadInfo(t));
		}
	}

	private static String threadInfo(Thread t) {
		return t.getName() + " " + t.getId();
	}

	private static String threadInfo() {
		return threadInfo(Thread.currentThread());
	}
}
