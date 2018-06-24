package jautil.avatar;

import jautil.BasicOptionSet;
import jautil.JAIO;
import jautil.JAOptions;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import util.LoggerConfig;

public class AvatarConfigDataset {
	private static Logger logger = LogManager.getLogger();;

	private static final String[] EMPTY = new String[0];

	private final BasicOptionSet STD_AVATAR_OPTS;

	private final JAOptions JA_OPTS;

	private final Set<String> ALL_AVATARS;

	private final Set<String> USER_OPT_AVATARS;

	private final Set<String> CLASSPATH_AVATARS;

	private final Set<String> DIRECT_FILES_AVATARS;

	private final Set<String> CACHEABLE_AVATARS;

	private final String FIRST_AVATAR;

	private final String STD_CONFIG_BASE;

	private final String STD_JAR_BASE;

	private final String OPTS_CONFIG_BASE;

	private final String OPTS_JAR_BASE;

	public AvatarConfigDataset(JAOptions jaopts) {
		this.JA_OPTS = jaopts;
		this.STD_AVATAR_OPTS = this.JA_OPTS.getStandardAvatarOptions();

		String stdavid = null;

		String stdcfgbase = null;
		String stdjarbase = null;

		String[] stdavs = EMPTY;
		String[] stddfavs = EMPTY;
		String[] stdcavs = EMPTY;

		if (this.STD_AVATAR_OPTS != null) {

			stdavid = this.STD_AVATAR_OPTS.getStringProperty("avatar.id");

			stdcfgbase = this.STD_AVATAR_OPTS.getBaseURLProperty("avatar.config.base.uri");

			stdjarbase = this.STD_AVATAR_OPTS.getBaseURLProperty("avatar.jar.base.uri");

			stdavs = getStdAvatarListOption("avatar.id.list");

			stddfavs = getStdAvatarListOption("direct.files.avatar.list");

			stdcavs = getStdAvatarListOption("cacheable.avatar.list");

		}

		Set<String> stdavset = copy(stdavs);
		Set<String> stddfavset = copy(stddfavs);
		Set<String> stdcavset = copy(stdcavs);

		Set<String> optavset = copy(jaopts.avatarIDList());
		Set<String> optdfavset = copy(jaopts.directFilesAvatarList());
		Set<String> optcavset = copy(jaopts.cacheableAvatarList());

		Set<String> origavset = new HashSet(stdavset);
		origavset.removeAll(optavset);

		Set<String> avset = new HashSet(origavset);
		avset.addAll(optavset);

		Set<String> dfavset = new HashSet();
		Set<String> cavset = new HashSet();
		Set<String> cpavset = new HashSet();

		for (String av : origavset) {

			Set<String> TARGET = stdcavset.contains(av) ? cavset : stddfavset.contains(av) ? dfavset : cpavset;
			TARGET.add(av);
		}

		for (String av : optavset) {

			Set<String> TARGET = optcavset.contains(av) ? cavset : optdfavset.contains(av) ? dfavset : cpavset;
			TARGET.add(av);
		}

		this.ALL_AVATARS = avset;
		this.USER_OPT_AVATARS = optavset;

		this.CLASSPATH_AVATARS = cpavset;
		this.DIRECT_FILES_AVATARS = dfavset;
		this.CACHEABLE_AVATARS = cavset;

		this.STD_CONFIG_BASE = stdcfgbase;
		this.STD_JAR_BASE = stdjarbase;

		this.OPTS_CONFIG_BASE = this.JA_OPTS.avatarConfigBaseURL();
		this.OPTS_JAR_BASE = this.JA_OPTS.avatarJarBaseURL();

		this.FIRST_AVATAR = findFirstAvatar(stdavid);

		listAvatarsData();
	}

	public String[] getAvatars() {
		int N = this.ALL_AVATARS.size();
		String[] avs = new String[N];
		this.ALL_AVATARS.toArray(avs);

		return avs;
	}

	public String firstAvatar() {
		return this.FIRST_AVATAR;
	}

	public boolean isValid(String av) {
		return this.ALL_AVATARS.contains(av);
	}

	public boolean isClassPathAvatar(String av) {
		return this.CLASSPATH_AVATARS.contains(av);
	}

	public boolean isDirectFilesAvatar(String av) {
		return this.DIRECT_FILES_AVATARS.contains(av);
	}

	public boolean isCacheableAvatar(String av) {
		return this.CACHEABLE_AVATARS.contains(av);
	}

	public String directFilesBaseURL(String av) {
		String dfburl = this.JA_OPTS.directFilesAvatarURI(av);

		if ((dfburl == null) && (this.OPTS_CONFIG_BASE != null)) {
			dfburl = JAIO.extendBaseURL(this.OPTS_CONFIG_BASE, av);
		}

		if ((dfburl == null) && (!this.USER_OPT_AVATARS.contains(av))) {
			String DF_AV_KEY = JAOptions.directFilesAvatarURIKey(av);
			dfburl = this.STD_AVATAR_OPTS.getBaseURLProperty(DF_AV_KEY);
		}

		if ((dfburl == null) && (this.STD_CONFIG_BASE != null)) {
			dfburl = JAIO.extendBaseURL(this.STD_CONFIG_BASE, av);
		}

		return dfburl;
	}

	public String cacheableAvatarJarURL(String av) {
		String AVJAR = av + ".jar";

		String cajurl = this.JA_OPTS.cacheableAvatarURI(av);

		if ((cajurl == null) && (this.OPTS_JAR_BASE != null)) {
			cajurl = JAIO.extendURL(this.OPTS_JAR_BASE, AVJAR);
		}

		if ((cajurl == null) && (!this.USER_OPT_AVATARS.contains(av))) {
			String C_AV_KEY = JAOptions.cacheableAvatarURIKey(av);
			cajurl = this.STD_AVATAR_OPTS.getURLProperty(C_AV_KEY);
		}

		if ((cajurl == null) && (this.STD_JAR_BASE != null)) {
			cajurl = JAIO.extendURL(this.STD_JAR_BASE, AVJAR);
		}

		return cajurl;
	}

	protected String findFirstAvatar(String stdav) {
		String avinit = null;

		if (this.ALL_AVATARS.isEmpty()) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker, "Avatars list is empty!");
		} else {
			String optav = this.JA_OPTS.avatarID();
			avinit = optav != null ? optav : stdav;

			if ((avinit == null) || (!this.ALL_AVATARS.contains(avinit))) {
				logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker, "Initial avatar " + (avinit == null
						? "unspecified" : new StringBuilder().append("unknown: ").append(avinit).toString()));

				Set<String> avsettmp = !this.CACHEABLE_AVATARS.isEmpty() ? this.CACHEABLE_AVATARS
						: !this.CLASSPATH_AVATARS.isEmpty() ? this.CLASSPATH_AVATARS : this.DIRECT_FILES_AVATARS;

				avinit = (String) avsettmp.iterator().next();

				logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker,
						"Avatar " + avinit + " chosen as initial avatar");
			}
		}

		return avinit;
	}

	protected void listAvatarsData() {
		showAvatarsList(this.DIRECT_FILES_AVATARS, "with file path access");
		showAvatarsList(this.CLASSPATH_AVATARS, "with classpath access");
		showAvatarsList(this.CACHEABLE_AVATARS, "with cacheable access");
		showAvatarsList(this.USER_OPT_AVATARS, "from options settings");

		showAvatarsBase(this.OPTS_CONFIG_BASE, "Optional avatars direct");
		showAvatarsBase(this.OPTS_JAR_BASE, "Optional avatars jar");
		showAvatarsBase(this.STD_CONFIG_BASE, "Installation avatars direct");
		showAvatarsBase(this.STD_JAR_BASE, "Installation avatars jar");
	}

	protected static void showAvatarsList(Set<String> AVS, String DESC) {
		String avStr = "Avatars " + DESC + ":";
		String av;
		for (Iterator localIterator = AVS.iterator(); localIterator.hasNext(); avStr = avStr + " " + av)
			av = (String) localIterator.next();
		if (AVS.isEmpty())
			avStr = avStr + " [NONE]";
		logger.log(LoggerConfig.LOGLevel, LoggerConfig.SESSIONMarker, avStr);
	}

	protected static void showAvatarsBase(String BASE, String DESC) {
		if (BASE != null) {
			logger.log(LoggerConfig.TRACELevel, LoggerConfig.SESSIONMarker, DESC + " base: " + BASE);
		}
	}

	protected String[] getStdAvatarListOption(String listkey) {
		String liststr = this.STD_AVATAR_OPTS.getStringProperty(listkey);

		return JAOptions.stringList(liststr);
	}

	protected static Set<String> copy(String[] slist) {
		Set<String> set = new HashSet();
		for (String s : slist) {
			set.add(s);
		}

		return set;
	}
}
