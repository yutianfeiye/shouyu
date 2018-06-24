package jautil.avatar;

import jautil.cache.JACacheHandler;
import jautil.install.DeploymentParameters;
import java.io.File;

public class AvatarsCacheHandler extends JACacheHandler {
	private static final String AVATARS_DIR = "avatars";
	private static AvatarsCacheHandler theACH;

	public static AvatarsCacheHandler getTheACH() {
		if (theACH == null) {
			theACH = new AvatarsCacheHandler();
		}
		return theACH;
	}

	protected File getCacheRootDir() {
		return new File(DeploymentParameters.USER_BASE_DIR_FOR_JA_VERSION(), "avatars");
	}

	protected String getCacheTag() {
		return "Avatars";
	}
}
