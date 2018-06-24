package jautil.avatar;

import jautil.JAIO;
import java.net.URL;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import util.LoggerConfig;

public class ClassPathAccess extends BaseAccess implements AvatarAccess {
	private static Logger logger = LogManager.getLogger();;

	protected static final String PFX = "ClassPathAccess: ";

	public ClassPathAccess(String avname) throws AvatarDataException {
		logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker, "ClassPathAccess: Data access for " + avname);

		Class<?> accessclass = getAccessClass(avname);
		setAvatarData(new AvatarData(avname, accessclass));
	}

	public static String getResourceBaseURL(String rbname) {
		String rburl = null;
		try {
			Class<?> accessclass = Class.forName(rbname + ".Access");
			rburl = getResourceBaseURL(accessclass);
		} catch (ClassNotFoundException cnfx) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.AVATARMarker,
					"ClassPathAccess:  No access class for " + rbname + ": " + cnfx);
		}

		return rburl;
	}

	public static String getResourceBaseURL(Class<?> accessclass) {
		String acurl = accessclass.getResource("Access.class").toString();
		return JAIO.tidyBaseURL(acurl);
	}

	public static Class<?> getAccessClass(String rbname) {
		Class<?> accessclass = null;
		try {
			accessclass = Class.forName(rbname + ".Access");
		} catch (ClassNotFoundException cnfx) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.AVATARMarker,
					"ClassPathAccess:  for " + rbname + ": " + cnfx);
		}
		return accessclass;
	}
}
