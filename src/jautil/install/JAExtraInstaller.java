package jautil.install;

import jautil.JAIO;
import java.io.File;
import javax.swing.JOptionPane;

public class JAExtraInstaller {
	private final String JAS_VN_STR;
	private final String EXTRA_ITEM_TAG;
	private final String JA_VERSION;
	private final JAHomeStatus JAH_STATUS;

	public static final void main(String[] args) {
		JAExtraInstaller installer = new JAExtraInstaller();

		System.exit(0);
	}

	protected final String GET_EXTRA_ITEM_TAG() {
		return this.EXTRA_ITEM_TAG;
	}

	public JAExtraInstaller() {
		this.JA_VERSION = DeploymentParameters.JA_VERSION_TAG();
		this.JAS_VN_STR = ("JASigning " + DeploymentParameters.JA_VERSION_STRING());

		String EI_TAG = DeploymentParameters.JA_EXTRA_INSTALL_TAG();

		this.EXTRA_ITEM_TAG = (EI_TAG == null ? null : EI_TAG.replaceAll(".zip$", ""));

		this.JAH_STATUS = new JAHomeStatus();

		if (this.EXTRA_ITEM_TAG == null) {
			showFailureMessage("The property \"ja.extra.install.tag\" is\nnot defined, so the extra " + this.JAS_VN_STR
					+ " installation\n" + "cannot proceed.\n\n");

		} else if (!this.JAH_STATUS.hasValidLocalJAHome()) {
			showFailureMessage("The extra module " + this.EXTRA_ITEM_TAG + " cannot be\n"
					+ "installed because this computer does not yet have a\n" + "basic installation of "
					+ this.JAS_VN_STR + ".\n\n");

		} else if (confirmUserApproval()) {
			doInstall();
		}
	}

	protected void doInstall() {
		ZIPListInstaller zlinstaller = makeInstaller();

		boolean installok = zlinstaller.doInstall();

		reportOnInstall(installok);
	}

	protected ZIPListInstaller makeInstaller() {
		File homedir = JAIO.fileForFileURL(this.JAH_STATUS.JA_HOME_VALUE);

		return new ZIPListInstaller(homedir, DeploymentParameters.JA_REMOTE_BASE()) {

			protected void establishZIPList() {

				String Z_TAG = JAExtraInstaller.this.GET_EXTRA_ITEM_TAG();

				String[] zipvec = new String[1];
				String[] ztags = new String[1];
				zipvec[0] = (Z_TAG + ".zip");
				ztags[0] = Z_TAG;

				setZIPs(zipvec);
				setZIPTags(ztags);
			}
		};
	}

	protected boolean confirmUserApproval() {
		String TITLE = "Install " + this.EXTRA_ITEM_TAG + "?";

		String MESSAGE = "Ready to install " + this.EXTRA_ITEM_TAG + " at:\n\n" + "    " + this.JAH_STATUS.JA_HOME_VALUE
				+ "\n\n" + "Do you want this installation to proceed now?\n\n";

		return getYesNoChoice(TITLE, MESSAGE);
	}

	protected void reportOnInstall(boolean installok) {
		String MSG_PFX = "The installation of the extra module " + this.EXTRA_ITEM_TAG + "\n" + "into "
				+ this.JAS_VN_STR;

		if (installok) {
			ZIPListInstaller.showMessage("JASigning Extra Installation Completed",
					MSG_PFX + " has been successfully completed.\n\n");

		} else {

			showFailureMessage(
					MSG_PFX + " has failed.\n\n" + "Please see the Java console log for further details.\n\n");
		}
	}

	protected static void showFailureMessage(String F_MSG) {
		String TITLE = "JASigning Extra Installation Failure";

		ZIPListInstaller.showErrorMessage("JASigning Extra Installation Failure", F_MSG);
	}

	protected static boolean getYesNoChoice(String TITLE, String MESSAGE) {
		int choice = JOptionPane.showConfirmDialog(null, MESSAGE, TITLE, 0, 3);

		return choice == 0;
	}
}
