package jautil.install;

import jautil.JAIO;
import jautil.platform.OpSystem;
import java.io.File;
import javax.swing.JFileChooser;
import javax.swing.JOptionPane;

public final class JASigningInstaller {
	private final JAHomeStatus JAH_STATUS;
	private final String JAS_FOLDER_NAME;
	private JFileChooser FILE_CHOOSER;
	private File installDir;

	public static void main(String[] args) {
		JASigningInstaller jasi = new JASigningInstaller();

		System.exit(0);
	}

	public JASigningInstaller() {
		this.JAS_FOLDER_NAME = ("JASigning" + DeploymentParameters.JA_VERSION_TAG());

		this.JAH_STATUS = new JAHomeStatus();

		String abanobstacle = null;
		boolean doabandon = false;

		if ((this.JAH_STATUS.hasValidLocalJAHome()) && (!getSupersedePermission())) {
			doabandon = true;
			abanobstacle = "overwrite the existing installation";
		}

		if ((!doabandon) && (!LicenceDialog.isOKLicenceDialog(DeploymentParameters.JA_VERSION_STRING()))) {
			doabandon = true;
			abanobstacle = "accept the licence terms";
		}

		if (!doabandon) {

			getInstallFolder();
			boolean resolved = false;
			while (!resolved) {

				if ((this.installDir == null) || (!this.installDir.exists()) || (!this.installDir.isDirectory())
						|| (JAIO.directoryIsEmpty(this.installDir)) || (getOverwritePermission())) {
					resolved = true;

				} else {
					getInstallFolder();
				}
			}

			if (this.installDir != null) {

				boolean iok = doInstall();

				if (iok) {

					new JAHomeLocalUpdateManager(this.installDir, true);
				}
			} else {
				abanobstacle = "specify an installation folder";
			}
		}

		if (abanobstacle != null) {
			showAbandonedMessage("You have declined to " + abanobstacle + ".");
		}
	}

	private boolean doInstall() {
		JAInstaller installer = new JAInstaller(this.installDir, DeploymentParameters.JA_REMOTE_BASE(), true);
		boolean iok = installer.doInstall();

		return iok;
	}

	private boolean getSupersedePermission() {
		String TITLE = "Supersede Existing JASigning Installation?";

		String MESSAGE = "This computer seems to have a valid local JASigning\ninstallation already, at:\n\n    "
				+ this.JAH_STATUS.JA_HOME_VALUE + "\n\n" + "Do you wish to supersede this existing installation\n"
				+ "with a new one now?\n\n";

		return getYesNoChoice("Supersede Existing JASigning Installation?", MESSAGE);
	}

	private boolean getOverwritePermission() {
		String TITLE = "Install JASigning in Existing Non-Empty Folder?";

		String MESSAGE = "Your chosen installation folder, " + this.installDir.getName() + ", already exists \n"
				+ "and is not empty.\n\n" + "Are you sure you wish to use this folder for the new \n"
				+ "JASigning installation?\n\n";

		return getYesNoChoice("Install JASigning in Existing Non-Empty Folder?", MESSAGE);
	}

	private boolean getYesNoChoice(String TITLE, String MESSAGE) {
		int choice = JOptionPane.showConfirmDialog(null, MESSAGE, TITLE, 0, 3);

		return choice == 0;
	}

	private void showAbandonedMessage(String whymsg) {
		String TITLE = "JASigning Installation Abandoned";
		String MESSAGE = whymsg + "\n\n" + "So the JASigning installation has been abandoned without\n"
				+ "making any change to your computer system.\n\n";

		JOptionPane.showMessageDialog(null, MESSAGE, "JASigning Installation Abandoned", 1);
	}

	private void getInstallFolder() {
		File DEFAULT_PARENT = new File(DeploymentParameters.INSTALL_BASE);
		File DEFAULT_FOLDER = new File(DEFAULT_PARENT, this.JAS_FOLDER_NAME);

		boolean dpcreated = !DEFAULT_PARENT.exists();
		JAIO.validateOutputFile(DEFAULT_FOLDER);

		boolean dfcreated = false;
		if (!DEFAULT_FOLDER.exists()) {
			DEFAULT_FOLDER.mkdir();
			dfcreated = true;
		}

		if (this.FILE_CHOOSER == null) {
			this.FILE_CHOOSER = new JFileChooser(DEFAULT_PARENT);
		}
		this.FILE_CHOOSER.setFileSelectionMode(1);

		File folder = null;

		String TITLE = "Select JASigning installation folder";
		this.FILE_CHOOSER.setDialogTitle("Select JASigning installation folder");
		this.FILE_CHOOSER.setDialogType(1);
		this.FILE_CHOOSER.setCurrentDirectory(DEFAULT_PARENT);
		this.FILE_CHOOSER.ensureFileIsVisible(DEFAULT_FOLDER);

		File TARGET = OpSystem.IS_MAC() ? new File(this.JAS_FOLDER_NAME) : DEFAULT_FOLDER;
		this.FILE_CHOOSER.setSelectedFile(TARGET);

		int opt = this.FILE_CHOOSER.showDialog(null, "Install");
		if (opt == 0) {
			folder = this.FILE_CHOOSER.getSelectedFile();
		}

		if ((dfcreated) && ((folder == null) || (!JAIO.isAncestorOf(DEFAULT_FOLDER, folder)))) {
			DEFAULT_FOLDER.delete();
		}

		if ((dpcreated) && ((folder == null) || (!JAIO.isAncestorOf(DEFAULT_PARENT, folder)))) {
			DEFAULT_PARENT.delete();
		}

		this.installDir = folder;
	}
}
