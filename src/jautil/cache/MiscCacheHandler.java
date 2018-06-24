package jautil.cache;

import jautil.install.DeploymentParameters;
import java.io.File;

public class MiscCacheHandler extends JACacheHandler {
	private static final String MISC_DIR = "misc";
	private static MiscCacheHandler theMCH;

	public static MiscCacheHandler getTheMCH() {
		if (theMCH == null) {
			theMCH = new MiscCacheHandler();
		}
		return theMCH;
	}

	protected File getCacheRootDir() {
		return new File(DeploymentParameters.USER_BASE_DIR_FOR_JA_VERSION(), "misc");
	}

	protected String getCacheTag() {
		return "Misc";
	}
}
