package jautil.install;

import jautil.platform.OpSystem;
import java.io.File;

public class JAInstaller extends ZIPListInstaller {
	private final boolean DO_INSTALL_LIBS;

	public JAInstaller(File localdir, String remotebase, boolean dolibs) {
		super(localdir, remotebase);
		this.DO_INSTALL_LIBS = dolibs;
	}

	protected void establishZIPList() {
		int N_ZIPS = 1 + (this.DO_INSTALL_LIBS ? DeploymentParameters.NATIVE_LIB_TAGS.length : 0);

		String[] zipvec = new String[N_ZIPS];
		String[] ztags = new String[N_ZIPS];

		zipvec[0] = "agconfig.zip";
		ztags[0] = "avatar definitions";

		if (this.DO_INSTALL_LIBS) {
			for (int i = 0; i != DeploymentParameters.NATIVE_LIB_TAGS.length; i++) {
				zipvec[(1 + i)] = (OpSystem.TAG_ID(DeploymentParameters.NATIVE_LIB_TAGS[i]) + ".zip");
				ztags[(1 + i)] = DeploymentParameters.NATIVE_LIB_TAGS[i];
			}
		}

		setZIPs(zipvec);
		setZIPTags(ztags);
	}
}
