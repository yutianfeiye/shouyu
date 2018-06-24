package jautil.install;

import jautil.JAEnv;
import jautil.JAIO;
import jautil.platform.OpSystem;
import java.io.File;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import util.LoggerConfig;

public final class DeploymentParameters {
	private static Logger logger= LogManager.getLogger();;;

	public static final String JA_VERSION_TAG_KEY = "ja.version.tag";

	public static final String JA_VERSION_TAG_DEFAULT = "std";

	public static final String JA_REMOTE_BASE_KEY = "ja.remote.base.url";

	public static final String JA_REMOTE_BASE_STEM = "http://vhg.cmp.uea.ac.uk/tech/jas/";

	public static final String JA_VERSION_TAG() {
		return System.getProperty("ja.version.tag", "std");
	}

	public static final String JA_REMOTE_BASE_DEFAULT = "http://vhg.cmp.uea.ac.uk/tech/jas/" + JA_VERSION_TAG() + "/";

	public static final String JA_USER_BASE = ".jasigning";

	public static final String JA_PREFS_BASE_RELATIVE_PATH = "uk/ac/uea/cmp/ja";

	public static final String JA_HOME_KEY = "JA_HOME";

	public static final String JA_VERSION_STRING() {
		String vs = JA_VERSION_TAG();

		int N_LEN = vs.length() - vs.replaceFirst("\\d+", "").length();
		if (N_LEN != 0) {

			for (int i = 0; i != N_LEN - 1; i++) {
				vs = vs.replaceFirst("(\\d)(\\d)", "$1.$2");
			}
		}

		return vs;
	}

	public static final String JA_REMOTE_BASE() {
		return System.getProperty("ja.remote.base.url", JA_REMOTE_BASE_DEFAULT);
	}

	public static final String INSTALL_BASE = OpSystem.IS_WIN() ? "C:\\Program Files\\eSign\\" : "/Library";

	public static final String DOWNLOAD_FOLDER = "download";

	public static final String JAS_FOLDER_STEM = "JASigning";

	public static final String AVATARS_FOLDER = "agconfig";

	public static final String AVATARS_CONFIG_ZIP = "agconfig.zip";

	public static final String[] NATIVE_LIB_TAGS = { "jogl-natives", "jaglib-native" };

	public static final String JA_EXTRA_INSTALL_TAG_KEY = "ja.extra.install.tag";

	public static final String JA_EXTRA_INSTALL_TAG() {
		return System.getProperty("ja.extra.install.tag");
	}

	public static final File USER_BASE_DIR_FOR_JA_VERSION() {
		File UH_D = JAIO.fileForFileURL(JAEnv.getUserHomeURL());
		File JAUH_D = new File(UH_D, ".jasigning");
		File VTJAUH_D = new File(JAUH_D, JA_VERSION_TAG());

		if (!JAIO.establishDirectory(VTJAUH_D)) {
			logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.SESSIONMarker,
					"DeploymentParameters: cannot use cache directory: " + VTJAUH_D

							.toString());
		}

		return VTJAUH_D;
	}
}
