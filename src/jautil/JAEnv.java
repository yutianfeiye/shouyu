package jautil;

import jautil.install.AvatarsConfigManager;
import jautil.install.DeploymentParameters;
import jautil.platform.OpSystem;
import jautil.prefs.JAPreferencesHandler;
import java.io.File;
import java.net.URL;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import sigmlanim.JAnimgen;
import sigmlanim.StreamedAnimationLoader;
import util.LoggerConfig;

public final class JAEnv {
	private static Logger logger = LogManager.getLogger();

	private static URL JA_HOME_BASE_URL = null;

	private static URL USER_HOME_BASE_URL = null;

	private boolean contextIsApplication;

	static {
		String jahomebase = null;

		if (JARemote.FORCE_REMOTE_JA_HOME()) {
			jahomebase = DeploymentParameters.JA_REMOTE_BASE();

		} else {
			logger.log(LoggerConfig.TRACELevel, LoggerConfig.SESSIONMarker, "Not forcing remote JA Home URL");
			AvatarsConfigManager acmgr = new AvatarsConfigManager();
			acmgr.establishJAHome();
			jahomebase = JAPreferencesHandler.getSystemPreference("JA_HOME");
		}
		JA_HOME_BASE_URL = JAIO.stringToURL(jahomebase);

		String UHB_RAW = OpSystem.IS_WIN() ? System.getenv("APPDATA") : System.getProperty("user.home");
		File UHB_DIR = JAIO.fileForAbsDirectoryPath(UHB_RAW);
		USER_HOME_BASE_URL = JAIO.fileToURL(UHB_DIR);

		logger.log(LoggerConfig.LOGLevel, LoggerConfig.SESSIONMarker, "JA Home   Base URL: " + getJAHomeURL());
		logger.log(LoggerConfig.TRACELevel, LoggerConfig.SESSIONMarker, "User Home Base URL: " + getUserHomeURL());
	}

	public static URL getJAHomeURL() {
		return JA_HOME_BASE_URL;
	}

	public static URL getUserHomeURL() {
		return USER_HOME_BASE_URL;
	}

	private static boolean isAppCall() {
		boolean isappcall = false;
		try {
			throw new Exception("dummy");

		} catch (Exception x) {

			StackTraceElement[] st = x.getStackTrace();
			if (4 <= st.length) {
				StackTraceElement POST_BASE_STE = st[2];
				String POST_BASE_METHOD = POST_BASE_STE.getMethodName();
				String POST_BASE_CLASS = POST_BASE_STE.getClassName();
				StackTraceElement BASE_STE = st[3];
				String BASE_METHOD = BASE_STE.getMethodName();
				String BASE_CLASS = BASE_STE.getClassName();
				if ((POST_BASE_METHOD.equals("<init>")) && (BASE_METHOD.equals("main"))
						&& (POST_BASE_CLASS.equals(BASE_CLASS))) {
					isappcall = true;
				}
			}
		}
		return isappcall;
	}

	private static boolean argMatches(String arg, String tag) {
		boolean ok = false;

		if ((arg != null) && (2 <= arg.length()) && (arg.charAt(0) == '-')) {
			String anorm = arg.substring(1).toLowerCase();
			ok = tag.startsWith(anorm);
		}

		return ok;
	}

	public static JAEnv makeAppJAEnv() {
		return new JAEnv(System.getProperty("user.dir"), true, isAppCall());
	}

	public static JAEnv makeAppletJAEnv(URL codebase) {
		return new JAEnv(codebase, false, isAppCall());
	}

	public JAEnv(String basedir, boolean appexpected, boolean isapp) {
		logger.log(LoggerConfig.TRACELevel, LoggerConfig.SESSIONMarker, "Codebase: " + basedir);

		if (basedir.equals("/")) {
			logger.log(LoggerConfig.LOGLevel, LoggerConfig.SESSIONMarker, "Found root codebase so use User home base");

			setAppBaseURL(USER_HOME_BASE_URL);
		} else {
			setAppBaseDirectory(basedir);
		}
		checkForContextIsApp(appexpected, isapp);

		JAnimgen.init();
		StreamedAnimationLoader.primeLoader();
	}

	public JAEnv(URL baseurl, boolean appexpected, boolean isapp) {
		setAppBaseURL(baseurl);
		checkForContextIsApp(appexpected, isapp);

		JAnimgen.init();
		StreamedAnimationLoader.primeLoader();
	}

	private void checkForContextIsApp(boolean appexpected, boolean isapp) {
		if (isapp != appexpected) {
			String ACTUAL = isapp ? "application" : "applet";
			String EXPECTED = isapp ? "applet" : "application";
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker,
					"JAEnv: Context is " + ACTUAL + ", but " + EXPECTED + " was expected.");
		}

		this.contextIsApplication = isapp;
	}

	public boolean isOwnedByApp() {
		return this.contextIsApplication;
	}

	private URL baseURL = null;

	private void setAppBaseURL(URL burl) {
		this.baseURL = burl;

		logger.log(LoggerConfig.LOGLevel, LoggerConfig.SESSIONMarker, "App(let)  Base URL: " + getAppBaseURL());
	}

	private void setAppBaseDirectory(String bd) {
		if (this.baseURL == null) {
			URL burl = JAIO.fileToURL(bd);
			if (burl == null) {
				logger.log(LoggerConfig.ERRORLevel, LoggerConfig.SESSIONMarker, "Invalid base directory: " + bd);
			}

			setAppBaseURL(burl);
		}
	}

	public URL getAppBaseURL() {
		return this.baseURL;
	}

	public String getClassBaseURLString(Class<?> clss, String clssname) {
		return getPackageBaseURLString(clss, clssname, 0);
	}

	public String getPackageBaseURLString(Class<?> clss, String clssname, int pkgheight) {
		URL localurl = clss.getResource(clssname);
		String lustr = localurl.toString();

		int i = lustr.lastIndexOf("/");
		for (int h = pkgheight; h != 0; h--) {
			i = lustr.substring(0, i).lastIndexOf("/");
		}
		String BASE_URL = lustr.substring(0, i + 1);

		return BASE_URL;
	}
}
