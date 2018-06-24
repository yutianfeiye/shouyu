package jautil.install;

import jautil.JAIO;
import jautil.prefs.JAPreferencesHandler;
import java.io.File;
import java.net.URL;
import javax.swing.JOptionPane;

public class JAHomeLocalUpdateManager {
	public static final int JAVA_INIT_MEM_MB = 32;
	private static String MANUAL_STEP_i_LINES = "(i) Add the new JASigning installation folder path to the\n    library path for Java Applets.\n    To do this, use the Java Control Panel (Windows)\n    or the Java Preferences app (Mac OS X).\n\n";

	private static String MANUAL_STEP_ii_LINES = "(ii) Quit and restart your Web browser, so that\n    the library path update takes effect.\n\n";

	protected final File JA_HOME_DIR;

	protected String jaHomeURL;

	public JAHomeLocalUpdateManager(File jahdir, boolean dojpiargsupdate) {
		this.JA_HOME_DIR = jahdir;
		setNewLocalJAHome();

		if (dojpiargsupdate) {
			updateJPIArgsAndReport();
		}
	}

	private void setNewLocalJAHome() {
		this.jaHomeURL = JAIO.directoryToBaseURL(this.JA_HOME_DIR).toString();

		JAPreferencesHandler.setSystemPreference("JA_HOME", this.jaHomeURL);
	}

	private void updateJPIArgsAndReport() {
		String idirpath = JAIO.pathForFile(this.JA_HOME_DIR);
		JPIArgumentsUpdater updater = new JPIArgumentsUpdater(idirpath, 32, "JASigning");

		String oldargs = updater.getJPIArgs();
		String newargs = updater.getNewJPIArgs();

		if ((oldargs == null) || (newargs == null)) {
			showInstallOKMessage(oldargs != null);

		} else {
			boolean updateok = false;

			boolean doupdate = getUpdateJPIArgsPermission(oldargs, newargs);

			if (doupdate) {
				updateok = updater.saveAndUpdateJDPFile();
			}

			if (updateok) {
				showUpdateOKMessage();
			} else {
				showNoUpdateMessage();
			}
		}
	}

	private void showInstallOKMessage(boolean ready) {
		String TITLE = "JASigning Installation Complete";
		String MESSAGE = "JASigning avatar definitions and native libraries\nhave been successfully installed at:\n\n    "
				+ this.jaHomeURL + "\n\n"
				+ (ready ? "You should now be able to run a JASigning applet in an HTML\npage using this installation.\n\n(If this computer's Java Applet Runtime settings have been\nchanged since your Web browser was started, you may need\nquit and restart the browser.)"
						: new StringBuilder()
								.append("To run a JASigning applet in an HTML page using this\ninstallation you need to perform the following steps manually:\n\n")
								.append(MANUAL_STEP_i_LINES).append(MANUAL_STEP_ii_LINES).toString());

		JOptionPane.showMessageDialog(null, MESSAGE, "JASigning Installation Complete", 1);
	}

	private void showNoUpdateMessage() {
		String TITLE = "Java Applet Runtime Settings Not Updated";
		String MESSAGE = "Your Java Applet Runtime settings have not been updated.\nTo run a JASigning applet in an HTML page using this\ninstallation you need to perform the following steps manually:\n\n"
				+ MANUAL_STEP_i_LINES + "    The installation folder URL is:\n" + "        " + this.jaHomeURL + "\n\n"
				+ MANUAL_STEP_ii_LINES;

		JOptionPane.showMessageDialog(null, MESSAGE, "Java Applet Runtime Settings Not Updated", 1);
	}

	private void showUpdateOKMessage() {
		String TITLE = "Java Applet Runtime Settings Updated";
		String MESSAGE = "The JASigning installation is complete, and this computer's\nJava Applet Runtime settings have been successfully updated.\n\nYou should now be able to run a JASigning applet in an HTML\npage using this installation.\n\nBut if you cannot do this you may need to quit and restart\nyour Web browser to ensure that the Java settings update\nhas taken effect.\n\n";

		JOptionPane.showMessageDialog(null,
				"The JASigning installation is complete, and this computer's\nJava Applet Runtime settings have been successfully updated.\n\nYou should now be able to run a JASigning applet in an HTML\npage using this installation.\n\nBut if you cannot do this you may need to quit and restart\nyour Web browser to ensure that the Java settings update\nhas taken effect.\n\n",
				"Java Applet Runtime Settings Updated", 1);
	}

	private boolean getUpdateJPIArgsPermission(String oldargs, String newargs) {
		String TITLE = "Update Java Applet Runtime Settings?";

		String MESSAGE = "JASigning software avatar definitions and native libraries\nhave been successfully installed at:\n\n    "
				+ this.jaHomeURL + "\n\n" + "To run a JASigning applet in an HTML page using this\n"
				+ "installation this computer's current Java Applet Runtime settings\n\n" + "    "
				+ (oldargs.length() == 0 ? "(empty)" : oldargs) + "\n\n"
				+ "should be updated with the proposed new settings\n\n" + "    " + newargs + "\n\n"
				+ "Do you want this computer's Java Applet Runtime settings\n" + "to be updated now?\n\n";

		return getYesNoChoice("Update Java Applet Runtime Settings?", MESSAGE);
	}

	private boolean getYesNoChoice(String TITLE, String MESSAGE) {
		int choice = JOptionPane.showConfirmDialog(null, MESSAGE, TITLE, 0, 3);

		return choice == 0;
	}
}
