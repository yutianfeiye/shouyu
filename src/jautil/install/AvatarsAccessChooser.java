package jautil.install;

import javax.swing.JOptionPane;

public final class AvatarsAccessChooser {
	private static final int OID_REMOTE = 0;
	private static final int OID_EXISTING_LOCAL = 1;
	private static final int OID_INSTALL_LOCAL = 2;
	private static final int COUNT_OPTION_IDS = 3;

	public static class AccessChoice {
		public boolean local;
		public boolean existing;

		public AccessChoice() {
			this(false, false);
		}

		public AccessChoice(boolean local, boolean existing) {
			set(local, existing);
		}

		public void set(boolean local, boolean existing) {
			this.local = local;
			this.existing = existing;
		}
	}

	private static final String[] LABELS = { "Use Remote", "Select Existing Local", "Install Local" };

	private static final String[] DESCRIPTIONS = { "- Just continue, using remote avatar definitions",
			"- Select existing local avatar definitions, if you\n   believe they are already installed on your system",
			"- Install local avatar definitions now" };

	private final AccessChoice ACCESS_CHOICE;

	public AvatarsAccessChooser() {
		this.ACCESS_CHOICE = new AccessChoice();
	}

	public AccessChoice getAccessChoice() {
		return this.ACCESS_CHOICE;
	}

	public void showChoiceDialogFull() {
		String MESSAGE = "Your system does not appear to have locally installed avatar\ndefinition files.\n\nIt is not essential for these files to be installed locally,\nbut this software will start up more efficiently in future\nif they are.\n";

		int[] OIDS = { 0, 1, 2 };

		getUserChoice(
				"Your system does not appear to have locally installed avatar\ndefinition files.\n\nIt is not essential for these files to be installed locally,\nbut this software will start up more efficiently in future\nif they are.\n",
				OIDS);
	}

	public void showChoiceDialogNoInstall() {
		int[] OIDS = { 0, 1 };

		getUserChoice(null, OIDS);
	}

	public void showChoiceDialogNoExisting() {
		int[] OIDS = { 0, 2 };

		getUserChoice(null, OIDS);
	}

	private void getUserChoice(String INIT_MSG, int[] OIDS) {
		int N = OIDS.length;
		String[] OPTIONS = new String[N];
		String[] DESCS = new String[N];
		for (int i = 0; i != N; i++) {
			int OID = OIDS[i];

			OPTIONS[OPT_INDEX_INVERT(i, N)] = LABELS[OID];
			DESCS[i] = (DESCRIPTIONS[OID] + (i + 1 == N ? ".\n\n" : ";\n"));
		}

		StringBuilder msgbuf = new StringBuilder(1024);
		msgbuf.append(INIT_MSG != null ? INIT_MSG : "").append("\n");
		msgbuf.append("Please choose one of the following options:\n");
		for (String DESC : DESCS) {
			msgbuf.append(DESC);
		}
		String FULL_MSG = msgbuf.toString();

		String TITLE = "Establish Locally Installed Avatar Definition Files?";

		int choice = JOptionPane.showOptionDialog(null, FULL_MSG,
				"Establish Locally Installed Avatar Definition Files?", 0, 3, null, OPTIONS, OPTIONS[0]);

		this.ACCESS_CHOICE.set(false, false);

		if ((0 <= choice) && (choice < N)) {
			int OPT = OPT_INDEX_INVERT(choice, N);
			int OID = OIDS[OPT];

			this.ACCESS_CHOICE.set(OID != 0, OID == 1);
		}
	}

	private static int OPT_INDEX_INVERT(int i, int N) {
		return N - 1 - i;
	}
}
