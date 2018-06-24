package jautil.install;

import java.io.File;
import javax.swing.JOptionPane;

public abstract class ZIPListInstaller {
	private final File INSTALL_DIR;
	private final String REMOTE_DOWNLOAD_BASE;
	protected String[] zips;
	protected String[] zipTags;
	private boolean installIsOK;

	public ZIPListInstaller(File localdir, String remotebase) {
		this.INSTALL_DIR = localdir;
		this.REMOTE_DOWNLOAD_BASE = (remotebase + "download" + "/");
	}

	public boolean doInstall() {
		establishZIPList();

		installZIPs();

		return this.installIsOK;
	}

	protected abstract void establishZIPList();

	protected void setZIPs(String[] zips) {
		this.zips = zips;
	}

	protected void setZIPTags(String[] ztags) {
		this.zipTags = ztags;
	}

	private void installZIPs() {
		ZIPInstaller zinstaller = new ZIPInstaller();

		this.installIsOK = true;

		int i = 0;
		for (String zip : this.zips) {
			String ZIP_URL = this.REMOTE_DOWNLOAD_BASE + zip;
			String ZIP_TAG = this.zipTags[i];
			i++;

			zinstaller.installZIPContents(ZIP_URL, this.INSTALL_DIR, ZIP_TAG);
			boolean zok = zinstaller.zipDownloadIsOK();

			this.installIsOK &= zok;
			if (!zok) {
				showInstallFailureDialog(ZIP_TAG);
			}
		}
	}

	private static void showInstallFailureDialog(String tag) {
		String MESSAGE = "Local installation of " + tag + " failed.\n"
				+ "Please see the console log for more information.";

		String TITLE = "JASigning Installation Failure";
		showErrorMessage(TITLE, MESSAGE);
	}

	public static void showMessage(String TITLE, String MESSAGE) {
		JOptionPane.showMessageDialog(null, MESSAGE, TITLE, 1);
	}

	public static void showErrorMessage(String TITLE, String MESSAGE) {
		JOptionPane.showMessageDialog(null, MESSAGE, TITLE, 0);
	}
}
