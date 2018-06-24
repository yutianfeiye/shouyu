package jautil.install;

import jautil.JAIO;
import jautil.JARemote;
import jautil.prefs.JAPreferencesHandler;
import java.io.File;
import java.io.PrintStream;
import javax.swing.JOptionPane;

public class AvatarsConfigManager {
	private static final String ACM_MSG_PFX = "####  AvatarsConfigManager: ";
	private final AvatarsAccessChooser AVATARS_ACCESS_CHOOSER;
	private final AvatarsAccessChooser.AccessChoice AVATARS_ACCESS_CHOICE;
	private final AvatarsFolderDialog AVATARS_FOLDER_DIALOG;
	private final JAHomeStatus JAH_STATUS;
	private transient boolean localConfigStatusIsFixed;
	private transient File localFolder;
	private transient boolean haveLocalNativeLibs;

	public static void main(String[] args) {
		AvatarsConfigManager acmgr = new AvatarsConfigManager();
		acmgr.establishJAHome();
	}

	public AvatarsConfigManager() {
		this.AVATARS_ACCESS_CHOOSER = new AvatarsAccessChooser();

		this.AVATARS_ACCESS_CHOICE = this.AVATARS_ACCESS_CHOOSER.getAccessChoice();
		this.AVATARS_FOLDER_DIALOG = new AvatarsFolderDialog();

		this.JAH_STATUS = new JAHomeStatus();
	}

	public void establishJAHome() {
		if ((this.JAH_STATUS.JA_HOME_IS_LOCAL) && (this.JAH_STATUS.lacksAvatarsJAHome())) {
			System.out.println("####  AvatarsConfigManager: current local avatars folder is invalid.");
		}

		if (this.JAH_STATUS.lacksAvatarsJAHome()) {
			JAPreferencesHandler.setSystemPreference("JA_HOME", DeploymentParameters.JA_REMOTE_BASE());
		}

		if (!JARemote.FORCE_REMOTE_JA_HOME()) {

			if (!this.JAH_STATUS.hasAvatarsLocalJAHome()) {

				workOutLocalInstallation();

				if (this.localFolder != null) {

					new JAHomeLocalUpdateManager(this.localFolder, this.haveLocalNativeLibs);
				}
			} else {
				System.out.println("####  AvatarsConfigManager: avatars are local.");
			}
		}
	}

	private void workOutLocalInstallation() {
		this.AVATARS_ACCESS_CHOOSER.showChoiceDialogFull();

		this.localFolder = null;
		this.haveLocalNativeLibs = false;

		this.localConfigStatusIsFixed = (!this.AVATARS_ACCESS_CHOICE.local);

		while (!this.localConfigStatusIsFixed) {
			if (this.AVATARS_ACCESS_CHOICE.existing) {
				tryForExistingLocalInstallation();
			} else {
				tryForNewLocalInstallation();
			}
		}
	}

	private void tryForExistingLocalInstallation() {
		File existingdir = this.AVATARS_FOLDER_DIALOG.getExistingFolder();
		if (existingdir == null) {
			this.AVATARS_ACCESS_CHOOSER.showChoiceDialogNoExisting();
			this.localConfigStatusIsFixed = (!this.AVATARS_ACCESS_CHOICE.local);

		} else if (JAHomeStatus.isValidAvatarsFolder(existingdir)) {
			this.localFolder = existingdir.getParentFile();
			this.localConfigStatusIsFixed = true;

		} else {

			showInvalidFolderDialog();
		}
	}

	private void tryForNewLocalInstallation() {
		File installdir = this.AVATARS_FOLDER_DIALOG.getInstallFolder();
		if (installdir == null) {
			this.AVATARS_ACCESS_CHOOSER.showChoiceDialogNoInstall();
			this.localConfigStatusIsFixed = (!this.AVATARS_ACCESS_CHOICE.local);
		} else {
			File avconfig = new File(installdir, "agconfig");

			if ((!avconfig.exists()) || (!avconfig.isDirectory()) || (JAIO.directoryIsEmpty(avconfig))
					|| (getOverwritePermission())) {
				this.localConfigStatusIsFixed = true;

				boolean DO_LIBS = askDoInstallNativeLibs();

				JAInstaller installer = new JAInstaller(installdir, DeploymentParameters.JA_REMOTE_BASE(), DO_LIBS);
				boolean installok = installer.doInstall();

				if (installok) {
					this.localFolder = installdir;
					this.haveLocalNativeLibs = DO_LIBS;
				}

				System.out.println("####  AvatarsConfigManager: avatars installation: OK=" + installok);
			}
		}
	}

	private boolean askDoInstallNativeLibs() {
		String TITLE = "Support JASigning in Web Pages?";
		String INSTALL_MSG = "Do you want to install local copies of native libraries\nto support JASigning applets in HTML pages?\n\n(For this to work you will need to set the java.library.path\nproperty using the Java Control/Preferences Panel.)\n\n";

		return showConfirmGivesYes("Support JASigning in Web Pages?",
				"Do you want to install local copies of native libraries\nto support JASigning applets in HTML pages?\n\n(For this to work you will need to set the java.library.path\nproperty using the Java Control/Preferences Panel.)\n\n");
	}

	private boolean getOverwritePermission() {
		String MESSAGE = "You have chosen a folder which already has a non-empty\navatar definitions folder.\n\nAre you sure you wish to proceed with a new installation\nin that folder?\n\n";

		String TITLE = "OK to Install Avatars in Existing Non-Empty Folder?";

		return showConfirmGivesYes("OK to Install Avatars in Existing Non-Empty Folder?",
				"You have chosen a folder which already has a non-empty\navatar definitions folder.\n\nAre you sure you wish to proceed with a new installation\nin that folder?\n\n");
	}

	private void showInvalidFolderDialog() {
		String MESSAGE = "The selected avatar definitions folder is not valid.";

		String TITLE = "Invalid Avatars Folder Selected";
		showErrorMessage(TITLE, "The selected avatar definitions folder is not valid.");
	}

	private boolean showConfirmGivesYes(String TITLE, String MESSAGE) {
		int choice = JOptionPane.showConfirmDialog(null, MESSAGE, TITLE, 0, 3);

		return choice == 0;
	}

	private void showErrorMessage(String TITLE, String MESSAGE) {
		JOptionPane.showMessageDialog(null, MESSAGE, TITLE, 0);
	}
}
