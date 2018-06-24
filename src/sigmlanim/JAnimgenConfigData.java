package sigmlanim;

import jautil.JAAvatarsEnv;
import jautil.JAIO;
import jautil.JAOptions;
import java.io.PrintStream;

public class JAnimgenConfigData {
	private static final String JACD_PREFIX = "####  JAnimgenConfigData: ";
	public final byte[][] AVATAR_XML_TEXTS;
	public final String AVATAR;
	public final boolean DO_LOG;
	public final boolean DO_APPEND_LOG;
	public final String LOG_URL;
	public final float FPS;

	public JAnimgenConfigData(JAOptions JA_OPTS) {
		this(null, JA_OPTS);
	}

	public JAnimgenConfigData(String AV, JAOptions JA_OPTS) {
		JAAvatarsEnv AV_ENV = JA_OPTS.getAvatarsEnv();

		this.AVATAR = (AV != null ? AV : JA_OPTS.avatarID());
		this.AVATAR_XML_TEXTS = AV_ENV.getXMLConfigTexts(this.AVATAR);
		this.DO_LOG = JA_OPTS.animgenDoLog();
		this.DO_APPEND_LOG = JA_OPTS.animgenLogDoAppend();

		this.FPS = JA_OPTS.animgenFPS();

		String logurl = null;
		if (this.DO_LOG) {
			String OPT_LOG_URL = JA_OPTS.animgenLogFileURL();

			if ((OPT_LOG_URL == null) || (JAIO.isFileURL(OPT_LOG_URL))) {
				logurl = OPT_LOG_URL;
			} else {
				System.out.println("####  JAnimgenConfigData: Invalid log file URL: " + OPT_LOG_URL);
			}
		}

		this.LOG_URL = logurl;
	}
}
