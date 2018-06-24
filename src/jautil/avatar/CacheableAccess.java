package jautil.avatar;

import jautil.cache.JACacheDescriptor;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import util.LoggerConfig;

public class CacheableAccess extends BaseAccess implements AvatarAccess {
	private static Logger logger = LogManager.getLogger();;

	private static final String PFX = "CacheableAccess: ";

	private URLClassLoader loader;

	public CacheableAccess(String avname, String avurl, AvatarsCacheHandler ach) throws AvatarDataException {
		logger.log(LoggerConfig.LOGLevel, LoggerConfig.AVATARMarker, "CacheableAccess: Data access for: " + avname);

		JACacheDescriptor desc = ach.ensureCached(avname, avurl);
		if (desc == null) {
			throw new AvatarDataException("No cache entry for " + avname + " at: " + avurl);
		}

		String DATA_F_URL = ach.getDataFileURLStr(desc);
		Class<?> aclass = getAccessClass(DATA_F_URL, avname);
		String baseurl = ClassPathAccess.getResourceBaseURL(aclass);
		logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker, "CacheableAccess: Base URL: " + baseurl);

		setAvatarData(new AvatarData(avname, aclass));
	}

	public void terminateAccess() {
	}

	protected Class<?> getAccessClass(String jarurl, String avname) {
		Class<?> aclass = null;
		try {
			URL[] URL_LIST = { new URL(jarurl) };
			this.loader = new URLClassLoader(URL_LIST);

			aclass = this.loader.loadClass(avname + ".Access");
		} catch (MalformedURLException mux) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.AVATARMarker,
					"CacheableAccess: Malformed URL: " + jarurl + ": " + mux);
		} catch (ClassNotFoundException cnfx) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.AVATARMarker,
					"CacheableAccess: No access class for " + avname + " at " + jarurl + ": " + cnfx);
		}

		return aclass;
	}
}
