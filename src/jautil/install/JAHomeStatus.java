package jautil.install;

import jautil.JAIO;
import jautil.prefs.JAPreferencesHandler;
import java.io.File;
import java.io.FileFilter;

public final class JAHomeStatus {
	public final String JA_HOME_VALUE;
	public final boolean JA_HOME_KEY_IS_DEFINED;
	public final boolean JA_HOME_IS_LOCAL;
	public final boolean LOCAL_JA_HOME_HAS_FILES;
	public final boolean LOCAL_JA_HOME_HAS_CONFIG_FOLDER;

	public JAHomeStatus() {
		boolean jahdef = false;
		boolean jahlocal = false;
		boolean ljahfiles = false;
		boolean ljahconfig = false;

		this.JA_HOME_VALUE = JAPreferencesHandler.getSystemPreference("JA_HOME");

		jahdef = this.JA_HOME_VALUE != null;

		if (jahdef) {
			jahlocal = JAIO.isFileURL(this.JA_HOME_VALUE);

			if (jahlocal) {
				File JAH_DIR = JAIO.fileForFileURL(this.JA_HOME_VALUE);

				ljahfiles = filesInLocalJAHome(JAH_DIR);
				ljahconfig = configInLocalJAHome(JAH_DIR);
			}
		}

		this.JA_HOME_KEY_IS_DEFINED = jahdef;
		this.JA_HOME_IS_LOCAL = jahlocal;
		this.LOCAL_JA_HOME_HAS_FILES = ljahfiles;
		this.LOCAL_JA_HOME_HAS_CONFIG_FOLDER = ljahconfig;
	}

	public boolean hasRemoteJAHome() {
		return (this.JA_HOME_KEY_IS_DEFINED) && (!this.JA_HOME_IS_LOCAL);
	}

	public boolean hasAvatarsLocalJAHome() {
		return this.LOCAL_JA_HOME_HAS_CONFIG_FOLDER;
	}

	public boolean lacksAvatarsJAHome() {
		return (!hasRemoteJAHome()) && (!hasAvatarsLocalJAHome());
	}

	public boolean hasValidLocalJAHome() {
		return (this.JA_HOME_KEY_IS_DEFINED) && (this.JA_HOME_IS_LOCAL) && (this.LOCAL_JA_HOME_HAS_FILES)
				&& (this.LOCAL_JA_HOME_HAS_CONFIG_FOLDER);
	}

	public static boolean filesInLocalJAHome(File JAH_DIR) {
		FileFilter FILE_FILTER = new FileFilter() {
			public boolean accept(File f) {
				return (!f.isHidden()) && (f.isFile());
			}

		};
		File[] SUB_FILES = JAH_DIR.listFiles(FILE_FILTER);

		return (SUB_FILES != null) && (SUB_FILES.length != 0);
	}

	public static boolean configInLocalJAHome(File JAH_DIR) {
		File AVCONFIG = new File(JAH_DIR, "agconfig");

		return isValidAvatarsFolder(AVCONFIG);
	}

	public static boolean isValidAvatarsFolder(File AVCONFIG) {
		boolean valid = false;

		if ((AVCONFIG.getName().equals("agconfig")) && (AVCONFIG.isDirectory())) {

			FileFilter DIR_FILTER = new FileFilter() {
				public boolean accept(File f) {
					return (!f.isHidden()) && (f.isDirectory());
				}

			};
			File[] CFG_DIRS = AVCONFIG.listFiles(DIR_FILTER);

			valid = (CFG_DIRS != null) && (CFG_DIRS.length != 0);
		}

		return valid;
	}
}
