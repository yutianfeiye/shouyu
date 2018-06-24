package jautil.install;

import java.io.File;
import javax.swing.JFileChooser;

public final class AvatarsFolderDialog {
	private final File JAS_PARENT_FOLDER;
	private final File JAS_FOLDER;
	private final File AVATARS_SUB_FOLDER;
	private final JFileChooser FILE_CHOOSER;

	public AvatarsFolderDialog() {
		this.JAS_PARENT_FOLDER = new File(DeploymentParameters.INSTALL_BASE);

		this.JAS_FOLDER = new File(this.JAS_PARENT_FOLDER, "JASigning" + DeploymentParameters.JA_VERSION_TAG());
		this.AVATARS_SUB_FOLDER = new File(this.JAS_FOLDER, "agconfig");

		this.FILE_CHOOSER = new JFileChooser(this.JAS_PARENT_FOLDER);
		this.FILE_CHOOSER.setFileSelectionMode(1);
	}

	public File getInstallFolder() {
		File folder = null;

		String TITLE = "Select parent folder for new avatar definitions folder";

		this.FILE_CHOOSER.setDialogTitle("Select parent folder for new avatar definitions folder");
		this.FILE_CHOOSER.setDialogType(1);
		this.FILE_CHOOSER.setSelectedFile(this.JAS_FOLDER);
		this.FILE_CHOOSER.setCurrentDirectory(this.JAS_PARENT_FOLDER);
		this.FILE_CHOOSER.ensureFileIsVisible(this.JAS_FOLDER);

		int opt = this.FILE_CHOOSER.showDialog(null, "Install");
		if (opt == 0) {
			folder = this.FILE_CHOOSER.getSelectedFile();
		}
		this.FILE_CHOOSER.setSelectedFile(null);

		return folder;
	}

	public File getExistingFolder() {
		File folder = null;

		String TITLE = "Select existing avatar definitions folder";
		this.FILE_CHOOSER.setDialogTitle("Select existing avatar definitions folder");
		this.FILE_CHOOSER.setDialogType(0);
		this.FILE_CHOOSER.setCurrentDirectory(this.JAS_FOLDER);
		this.FILE_CHOOSER.setSelectedFile(this.AVATARS_SUB_FOLDER);
		this.FILE_CHOOSER.ensureFileIsVisible(this.AVATARS_SUB_FOLDER);

		int opt = this.FILE_CHOOSER.showDialog(null, "Use Folder");
		if (opt == 0) {
			folder = this.FILE_CHOOSER.getSelectedFile();
		}
		this.FILE_CHOOSER.setSelectedFile(null);

		return folder;
	}
}
