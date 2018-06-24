package jautil;

import jautil.avatar.AvatarAccess;
import jautil.avatar.AvatarConfigDataset;
import jautil.avatar.AvatarData;
import jautil.avatar.AvatarDefinitionAccess;
import jautil.avatar.AvatarDefinitionForView;
import jautil.avatar.AvatarsMemCache;
import jautil.avatar.ClassPathAccess;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import util.LoggerConfig;

public class JAAvatarsEnv {
	private static Logger logger=LogManager.getLogger();

	private static final String AE_PFX = "JAAvatarsEnv: ";

	public static final String COMMON_BASE_NAME = "COMMON";

	public static final String CONFIG_XML_NAME = "config.xml";

	public static final String ASD_XML_NAME = "asd.xml";

	public static final String NONMANUALS_XML_NAME = "nonmanuals.xml";

	public static final String AVATAR_DEF_STEM = "avatardef";

	public static final String AVATAR_DEF_NAME_JARP = "avatardef.jarp";

	public static final String AVATAR_DEF_NAME_ARP = "avatardef.arp";

	public static final int AXI_COMMON_CONFIG = 0;

	public static final int AXI_AVATAR_CONFIG = 1;

	public static final int AXI_ASD = 2;

	public static final int AXI_NONMANUALS = 3;

	public static final int AXI_COUNT = 4;

	private final JAOptions JA_OPTS;

	private final AvatarConfigDataset AV_CONFIG_DATA;

	private final AvatarsMemCache AV_MEM_CACHE;

	private final String[] AVATARS;

	private String avCurrent;

	private byte[] commonConfigData = null;

	private String avForXMLConfigCache = "";

	private byte[][] xmlConfigCache = (byte[][]) null;

	public JAAvatarsEnv(JAOptions jaopts) {
		this.JA_OPTS = jaopts;

		this.AV_CONFIG_DATA = new AvatarConfigDataset(this.JA_OPTS);
		this.AVATARS = this.AV_CONFIG_DATA.getAvatars();
		this.avCurrent = this.AV_CONFIG_DATA.firstAvatar();

		this.AV_MEM_CACHE = new AvatarsMemCache(this.AV_CONFIG_DATA);
	}

	public int countAvatars() {
		return this.AVATARS.length;
	}

	public String currentAvatar() {
		return this.avCurrent;
	}

	public String[] getAvatars() {
		return this.AVATARS;
	}

	public void setAvatar(String av) {
		if (!this.AV_CONFIG_DATA.isValid(av)) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.AVATARMarker,
					"JAAvatarsEnv: Unknown avatar selected: " + av);
		} else {
			this.avCurrent = av;
		}
	}

	public byte[][] getXMLConfigTexts(String av) {
		if (!av.equals(this.avForXMLConfigCache)) {
			byte[][] texts = new byte[4][];
			texts[0] = getCommonConfigData();

			AvatarAccess aa = this.AV_MEM_CACHE.getAccess(av);

			if (aa != null) {
				texts[1] = aa.configData();
				texts[2] = aa.asdData();
				texts[3] = aa.nonmanualsData();

				this.xmlConfigCache = texts;
				this.avForXMLConfigCache = av;
				logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker, "Loaded XML texts for avatar: " + av);
			} else {
				logger.log(LoggerConfig.WARNLevel, LoggerConfig.AVATARMarker,
						"Unable to load XML texts for avatar: " + av);
			}
		}

		return this.xmlConfigCache;
	}

	protected byte[] getCommonConfigData() {
		if (this.commonConfigData == null) {

			String cburl = ClassPathAccess.getResourceBaseURL("COMMON");
			cburl="F:\\shouyu\\avatar\\COMMON";
			this.commonConfigData = AvatarData.getFileDataAtBase("config.xml", cburl, "COMMON");
		}

		return this.commonConfigData;
	}

	public boolean isValidAvatar(String av) {
		return (this.AV_CONFIG_DATA.isValid(av)) && (this.AV_MEM_CACHE.getAccess(av) != null);
	}

	public void terminate() {
		for (String av : this.AVATARS) {
			this.AV_MEM_CACHE.terminateAccess(av);
		}
	}

	public AvatarDefinitionAccess getDefinition(String av) {
		AvatarAccess access = this.AV_MEM_CACHE.getAccess(av);

		return access == null ? new AvatarDefinitionForView(av) : new AvatarDefinitionForView(access);
	}
}
