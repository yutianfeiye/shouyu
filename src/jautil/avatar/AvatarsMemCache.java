package jautil.avatar;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import util.LoggerConfig;

public class AvatarsMemCache {
	private static Logger logger = LogManager.getLogger();

	private final AvatarConfigDataset AV_OPTS;

	private final Map<String, AvatarAccess> AV_ACCESS_MAP;

	private AvatarsCacheHandler avCacheHandler;

	private transient String tmpAvatar;

	private transient AvatarAccess tmpAccess;

	public AvatarsMemCache(AvatarConfigDataset acdata) {
		this.AV_OPTS = acdata;

		this.AV_ACCESS_MAP = new HashMap();
		this.avCacheHandler = null;

		this.tmpAvatar = null;
		this.tmpAccess = null;
	}

	public boolean isAvailable(String av) {
		this.tmpAvatar = av;
		this.tmpAccess = ((AvatarAccess) this.AV_ACCESS_MAP.get(av));

		return this.tmpAccess != null;
	}

	public boolean isLocallyAvailable(String av) {
		boolean isavail = isAvailable(av);

		if (!isavail) {
			if (this.AV_OPTS.isClassPathAvatar(av)) {
				isavail = true;
			}
			if (this.AV_OPTS.isDirectFilesAvatar(av)) {
				String avburl = this.AV_OPTS.directFilesBaseURL(av);
				isavail = avburl.startsWith("file:");
			} else if (this.AV_OPTS.isCacheableAvatar(av)) {
				String avurl = this.AV_OPTS.cacheableAvatarJarURL(av);
				AvatarsCacheHandler ach = AvatarsCacheHandler.getTheACH();
				isavail = ach.isCached(av, avurl);
			} else {
				logger.log(LoggerConfig.ERRORLevel, LoggerConfig.AVATARMarker,
						"AvatarsMemCache: Unknown access mode for: " + av);
			}
		}

		return isavail;
	}

	public AvatarAccess getAccess(String av) {
		logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker, "AvatarsMemCache: getAccess for \"" + av + "\"");
		if (this.tmpAvatar != av) {
			this.tmpAvatar = av;
			this.tmpAccess = ((AvatarAccess) this.AV_ACCESS_MAP.get(av));
		}

		if (this.tmpAccess == null) {
			this.tmpAccess = loadAccess(av);
			this.AV_ACCESS_MAP.put(av, this.tmpAccess);
		}

		if (this.tmpAccess == NULL_AV_ACCESS) {
			logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker,
					"AvatarsMemCache: getAccess for \"" + av + "\" is invalid");
		}

		return this.tmpAccess == NULL_AV_ACCESS ? null : this.tmpAccess;
	}

	public void terminateAccess(String av) {
		this.tmpAvatar = null;

		AvatarAccess access = (AvatarAccess) this.AV_ACCESS_MAP.get(av);

		if (access != null) {
			access.terminateAccess();
			this.AV_ACCESS_MAP.remove(av);
		}
	}

	protected AvatarAccess loadAccess(String av) {
		AvatarAccess aa = NULL_AV_ACCESS;
		try {
//			if (this.AV_OPTS.isClassPathAvatar(av)) {
//				System.out.println("111");
//				aa = new ClassPathAccess(av);
//			}
//			if (this.AV_OPTS.isDirectFilesAvatar(av)) {
//				System.out.println("222:"+av);
//				String avburl = this.AV_OPTS.directFilesBaseURL(av);
//				
//				System.out.println(avburl+"@@@@@@@@@@@@@@@");
//				
//				aa = new DirectFilesAccess(av, avburl);
//			} else if (this.AV_OPTS.isCacheableAvatar(av)) {
//				.println("333");
//				String avurl = this.AV_OPTS.cacheableAvatarJarURL(av);
//				AvatarsCacheHandler ach = AvatarsCacheHandler.getTheACH();
//				aa = new CacheableAccess(av, avurl, ach);
//			}
//			

			String avburl = "F:\\shouyu\\avatar\\"+av;  //this.AV_OPTS.directFilesBaseURL(av);
			aa = new DirectFilesAccess(av, avburl);
		} catch (AvatarDataException adx) {
			adx.printStackTrace();
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.AVATARMarker, "AvatarsMemCache: loadAccess: " + adx);
		}

		return aa;
	}

	protected static final AvatarAccess NULL_AV_ACCESS = new AvatarAccess() {
		public String avatarName() {
			return null;
		}

		public String baseURL() {
			return null;
		}

		public byte[] asdData() {
			return null;
		}

		public byte[] configData() {
			return null;
		}

		public byte[] nonmanualsData() {
			return null;
		}

		public InputStream avatarDefStream() {
			return null;
		}

		public String avatarDefURL() {
			return null;
		}

		public void terminateAccess() {
		}
	};
}
