package jautil;

import jautil.avatar.AvatarsCacheHandler;
import jautil.cache.JACacheDescriptor;
import jautil.cache.MiscCacheHandler;
import jautil.install.DeploymentParameters;
import jautil.platform.OpSystem;
import jautil.prefs.JAPreferencesHandler;
import java.applet.Applet;
import java.io.File;
import java.io.PrintStream;
import java.net.URL;
import java.util.HashSet;
import java.util.Locale;
import java.util.Properties;
import java.util.Set;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import util.LoggerConfig;

public class JAOptions {
	private static Logger logger = LogManager.getLogger();;

	private static final String BUILT_IN_DEFAULT_PROPS_FILE = OpSystem.TAG_ID("jadefaults") + ".properties";

	public static JAOptions makeJAOptions(String dfltnm, String[] args, Applet applet, JAEnv jaenv) {
		return makeJAOptions(dfltnm, args, applet, null, jaenv);
	}

	public static JAOptions makeJAOptions(String dfltnm, String[] args, Properties argProps, JAEnv jaenv) {
		return makeJAOptions(dfltnm, args, null, argProps, jaenv);
	}

	public static JAOptions makeJAOptions(String dfltnm, String[] args, Applet applet, Properties argProps,
			JAEnv jaenv) {
		boolean update = false;
		String props = dfltnm + ".properties";
		String prefs = dfltnm;
		String remBase = JAIO.forceBaseURL(DeploymentParameters.JA_REMOTE_BASE());
		String newTag = remBase;
		String argString = "Arguments: ";

		if ((args != null) && (args.length != 0)) {
			boolean argserror = false;

			boolean HAVE_FLAG = args[0].charAt(0) == '-';
			if (HAVE_FLAG) {
				String FLAG_ARG = args[0];

				if ((!argMatches(FLAG_ARG, "session")) && (!argMatches(FLAG_ARG, "open"))) {

					if (argMatches(FLAG_ARG, "update")) {
						update = true;
					} else {
						argserror = true;
					}
				}
			}
			if (!argserror) {
				int PROP_IX = HAVE_FLAG ? 1 : 0;

				if (PROP_IX < args.length) {
					props = args[PROP_IX];
					int IFILE = props.lastIndexOf('/') + 1;
					String PFILE = props.substring(IFILE);
					int IDOT = PFILE.lastIndexOf('.');
					if (0 <= IDOT) {
						prefs = PFILE.substring(0, IDOT);
					} else {
						prefs = PFILE;
						props = props + ".properties";
					}

					if (!props.contains(":")) {
						props = remBase + props;
					}
				}
			}

			if (argserror) {
				argsUsage(dfltnm);
			}

			for (int ix = 0; ix < args.length; ix++) {
				argString = argString + args[ix] + (ix + 1 < args.length ? " | " : "");
			}
			logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.SESSIONMarker, argString);
			if (argProps != null) {
				logger.log(LoggerConfig.LOGLevel, LoggerConfig.SESSIONMarker,
						"Arguments as Properties: " + argProps.toString());
			}
			logger.log(LoggerConfig.TRACELevel, LoggerConfig.SESSIONMarker,
					"Argument Options: " + args[0] + " | " + props + " | " + prefs);
		}

		if (System.getProperty("ja.version.tag") == null) {
			if (newTag.endsWith("/")) {
				newTag = newTag.substring(0, newTag.length() - 1);
			}
			newTag = newTag.substring(newTag.lastIndexOf("/") + 1);
			System.setProperty("ja.version.tag", newTag);
		}

		return new JAOptions(jaenv, applet, argProps, props, prefs, update);
	}

	public static String[] fixArgs(String[] args) {
		if ((args.length == 2) && (args[0].equals("-open"))) {
			return ("-session " + args[1]).split("\\s+");
		}
		return args;
	}

	private static boolean argMatches(String arg, String tag) {
		boolean ok = false;

		if ((arg != null) && (2 <= arg.length()) && (arg.charAt(0) == '-')) {
			String anorm = arg.substring(1).toLowerCase();
			ok = tag.startsWith(anorm);
		}

		return ok;
	}

	private static void argsUsage(String dfltnm) {
		System.out.println("options spec. format:  [ (-s[ession] | -o[pen] | -u[pdate]) ] [properties-URL]");

		System.out.println(
				"...  default flag is -session, i.e. the Preferences node is not updated from the properties;");

		if (dfltnm != null) {
			System.out.println("...  default properties-URL is " + dfltnm + ".properties;");
		}
	}

	protected final KeyChecker APPLET_KEY_CHECKER = new KeyChecker() {

		public boolean keyIsOK(String key) {

			return (JAOptions.VALID_APPLET_KEYS_SET.contains(key)) || (key.startsWith("avatar.direct.base.uri."))
					|| (key.startsWith("avatar.jar.uri."));
		}
	};

	private JAOptions(JAEnv jaenv, Applet applet, Properties argProps, String propsurl, String prefsname,
			boolean updateprefs) {
		this.JA_ENV = jaenv;

		this.STANDARD_AVATAR_OPTIONS = makeStandardAvatarOptions();

		this.PREFS_HANDLER = new JAPreferencesHandler();

		String PKG_BASE = this.JA_ENV.getClassBaseURLString(JAOptions.class, "JAOptions.class");

		URL JA_HOME_BASE = JAEnv.getJAHomeURL();
		URL USR_HOME_BASE = JAEnv.getUserHomeURL();
		URL APP_BASE = this.JA_ENV.getAppBaseURL();

		String RMT_JA_DFLTS_URL = JAIO.resolveURL(JA_HOME_BASE, "jadefaults.properties").toString();

		if (this.JA_ENV.isOwnedByApp()) {
			createMiscCacheEntryIfNeeded(propsurl);
			createMiscCacheEntryIfNeeded(RMT_JA_DFLTS_URL);
		}

		URL BI_DFLTS_URL = JAIO.resolveURL(PKG_BASE, BUILT_IN_DEFAULT_PROPS_FILE);
		BasicOptionSet builtins = new BasicOptionSet(JA_HOME_BASE, BI_DFLTS_URL, null, null);

		File LOCAL_JA_DFLTS = new File(DeploymentParameters.USER_BASE_DIR_FOR_JA_VERSION(), "jadefaults.properties");

		URL JA_DFLTS_URL = this.JA_ENV.isOwnedByApp()
				? MiscCacheHandler.getTheMCH().getCachedDataURL(propertiesEntryName(RMT_JA_DFLTS_URL), RMT_JA_DFLTS_URL)
				: JAIO.isValidFile(LOCAL_JA_DFLTS) ? JAIO.fileToURL(LOCAL_JA_DFLTS)
						: JAIO.resolveURL(JA_HOME_BASE, "jadefaults.properties");
		BasicOptionSet defaults = new BasicOptionSet(builtins, USR_HOME_BASE, JA_DFLTS_URL, this.PREFS_HANDLER,
				"jadefaults", true);

		URL APP_PROPS_URL = getAppPropertiesURL(APP_BASE, propsurl);

		KeyChecker KEY_CHECKER = this.JA_ENV.isOwnedByApp() ? null : this.APPLET_KEY_CHECKER;

		BasicOptionSet appoptions = new BasicOptionSet(KEY_CHECKER, defaults, APP_BASE, APP_PROPS_URL,
				this.PREFS_HANDLER, prefsname, updateprefs);

		this.OPTIONS_CHAIN = new BasicOptionSet(appoptions, APP_BASE, argProps);

		String davstr = potentialAvatarList("direct.files.avatar.list");
		String cavstr = potentialAvatarList("cacheable.avatar.list");
		
		
		this.APPLET_OPTIONS = makeAppletOptions(APP_BASE, applet, argProps, davstr, cavstr);

		this.AVATARS_ENV = new JAAvatarsEnv(this);
	}

	protected String potentialAvatarList(String listkey) {
		String optavstr = this.OPTIONS_CHAIN.getStringProperty(listkey);

		String stdavstr = this.STANDARD_AVATAR_OPTIONS.getStringProperty(listkey);

		if (optavstr == null)
			optavstr = "";
		if (stdavstr == null) {
			stdavstr = "";
		}

		String join = ":";
		if ((optavstr.length() == 0) && (stdavstr.length() == 0)) {
			join = "";
		}
		return optavstr + join + stdavstr;
	}

	protected BasicOptionSet makeStandardAvatarOptions() {
		AvatarsCacheHandler ACH = AvatarsCacheHandler.getTheACH();

		String jarmtbase = DeploymentParameters.JA_REMOTE_BASE();
		URL jarmtbaseurl = JAIO.stringToURL(jarmtbase);

		String acpurl = JAIO.extendURL(jarmtbase, "avconfig.properties");
		String acpurlhash = String.format("%08x", new Object[] { Integer.valueOf(acpurl.hashCode()) });
		String acpentryname = "avconfigprops_" + acpurlhash;

		URL acpentryurl = null;
		JACacheDescriptor acpdesc = ACH.ensureCached(acpentryname, acpurl);
		if (acpdesc == null) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.AVATARMarker,
					"Avatar cache: No data for avconfig.properties");

			logger.log(LoggerConfig.WARNLevel, LoggerConfig.AVATARMarker,
					"Avatar cache: Name: " + acpentryname + ";  URL: " + acpurl);
		} else {
			acpentryurl = ACH.getDataFileURL(acpdesc);
		}

		return acpentryurl == null ? new BasicOptionSet(null, jarmtbaseurl, new Properties())
				: new BasicOptionSet(jarmtbaseurl, acpentryurl, null, null);
	}

	private static String propertiesEntryName(URL propsurl) {
		return propertiesEntryName(propsurl.toString());
	}

	private static String propertiesEntryName(String propsurl) {
		String P_NAME = JAIO.getLastPathStep(propsurl);
		int i = P_NAME.lastIndexOf('.');
		String P_STEM = i < 0 ? P_NAME : P_NAME.substring(0, i);
		String P_URL_HASH = String.format("%08x", new Object[] { Integer.valueOf(propsurl.hashCode()) });

		return P_STEM + "_properties_" + P_URL_HASH;
	}

	private void createMiscCacheEntryIfNeeded(String propsurl) {
		String P_ENTRY = propertiesEntryName(propsurl);

		MiscCacheHandler MCH = MiscCacheHandler.getTheMCH();

		if (!MCH.hasACacheEntry(P_ENTRY, propsurl)) {
			JACacheDescriptor pdesc = MCH.ensureCached(P_ENTRY, propsurl);
			if (pdesc == null) {
				logger.log(LoggerConfig.WARNLevel, LoggerConfig.CACHEMarker,
						"Misc cache: Unable to make cache entry: " + propsurl);
			}
		}
	}

	private URL getAppPropertiesURL(URL appbase, String propsurl) {
		URL result = null;

		if ((this.JA_ENV.isOwnedByApp()) && (JAIO.isWellFormedURL(propsurl))) {

			URL purl = JAIO.stringToURL(propsurl);
			result = purl;

			if (purl.getProtocol().equals("http")) {

				String pfile = JAIO.getLastPathStep(purl);
				URL adjustedurl = JAIO.resolveURL(appbase, pfile);

				if (JAIO.isValidURL(adjustedurl)) {
					logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.SESSIONMarker,
							"JAOptions: HTTP app properties URL has been adjusted to resolve against local base.");

					result = adjustedurl;
				}
			}

			if (result == purl) {
				result = MiscCacheHandler.getTheMCH().getCachedDataURL(propertiesEntryName(propsurl), propsurl);
			}
		} else {
			result = JAIO.resolveURL(appbase, propsurl);
		}

		return result;
	}

	protected BasicOptionSet makeAppletOptions(URL baseurl, Applet applet, Properties argProps, String davs,
			String cavs) {
		BasicOptionSet bos = null;

		if ((applet != null) || (argProps != null)) {
			Properties aprops = new Properties();

			for (String key : VALID_APPLET_KEYS_SET) {
				copyParameterProperty(applet, argProps, aprops, key);
			}

			addAppletAvatarOptions(applet, argProps, aprops, davs, "direct.files.avatar.list");

			addAppletAvatarOptions(applet, argProps, aprops, cavs, "cacheable.avatar.list");

			if (!aprops.isEmpty()) {
				logger.log(LoggerConfig.TRACELevel, LoggerConfig.SESSIONMarker,
						"Properties for AppletOptions: " + aprops.toString());
			}
			bos = new BasicOptionSet(null, baseurl, aprops);
		}

		return bos;
	}

	protected void addAppletAvatarOptions(Applet applet, Properties argProps, Properties aprops, String avs,
			String avlistkey) {
		String apavs = aprops.getProperty(avlistkey);
		
	

		String AVS = avs != null ? avs : apavs != null ? apavs : null;

		if (AVS != null) {

			for (String av : AVS.split(":", -1)) {

				String AV_KEY = avlistkey == "cacheable.avatar.list" ? cacheableAvatarURIKey(av)
						: avlistkey == "direct.files.avatar.list" ? directFilesAvatarURIKey(av) : "HELP!";
				copyParameterProperty(applet, argProps, aprops, AV_KEY);
			}
		}
	}

	protected static void copyParameterProperty(Applet applet, Properties argProps, Properties props, String key) {
		String P_VAL = applet != null ? applet.getParameter(key) : argProps.getProperty(key);
		if (P_VAL != null) {

		
			props.setProperty(key, P_VAL);
		}
	}

	public JAEnv getJAEnv() {
		return this.JA_ENV;
	}

	public JAAvatarsEnv getAvatarsEnv() {
		return this.AVATARS_ENV;
	}

	public BasicOptionSet getStandardAvatarOptions() {
		return this.STANDARD_AVATAR_OPTIONS;
	}

	public void updateStringProperty(String key, String value) {
		this.OPTIONS_CHAIN.updateStringProperty(key, value);

		if (this.APPLET_OPTIONS != null) {
			this.APPLET_OPTIONS.updateStringProperty(key, value);
		}
	}

	public void updateBooleanProperty(String key, boolean bval) {
		updateStringProperty(key, bval ? "true" : "false");
	}

	public String getStringProperty(String key) {
		String sprop = null;

		if (this.APPLET_OPTIONS != null) {
			sprop = this.APPLET_OPTIONS.getStringProperty(key);
		}

		if (sprop == null) {
			sprop = this.OPTIONS_CHAIN.getStringProperty(key);
		}

		return BasicOptionSet.checkForNull(sprop);
	}

	public static String[] stringList(String list) {
		return list == null ? new String[0] : list.split(":", -1);
	}

	public String[] getStringListProperty(String key) {
		return stringList(getStringProperty(key));
	}

	public boolean getBooleanProperty(String key, Boolean def) {
		String prop = getStringProperty(key);

		boolean bprop = (prop == null) || (prop.length() == 0) ? def.booleanValue() : prop.equalsIgnoreCase("true");

		return bprop;
	}

	public boolean getBooleanProperty(String key) {
		return getBooleanProperty(key, Boolean.valueOf(false));
	}

	public String getURLProperty(String key) {
		String url = null;

		if (this.APPLET_OPTIONS != null) {
			url = this.APPLET_OPTIONS.getURLProperty(key);
		}

		if (url == null) {
			url = this.OPTIONS_CHAIN.getURLProperty(key);
		}
		return url;
	}

	public String getBaseURLProperty(String key) {
		String burl = null;

		if (this.APPLET_OPTIONS != null) {
			burl = this.APPLET_OPTIONS.getBaseURLProperty(key);
		}

		if (burl == null) {
			burl = this.OPTIONS_CHAIN.getBaseURLProperty(key);
		}
		return burl;
	}

	public String getOutputURLProperty(String key) {
		String rurlstr = null;

		String purlstr = getStringProperty(key);
		if (purlstr != null) {

			URL base = this.JA_ENV.getAppBaseURL();
			if (!JAIO.isFileURL(base)) {
				base = null;
			}

			URL rurl = JAIO.resolveURL(base, purlstr);
			if (JAIO.isFileURL(rurl)) {
				rurlstr = rurl.toString();
			}
		}

		return rurlstr;
	}

	public int getIntegerProperty(String key) {
		String sprop = getStringProperty(key);

		return getIntValue(sprop, "Bad integer property for key " + key);
	}

	public float getFloatProperty(String key) {
		String sprop = getStringProperty(key);

		return getFloatValue(sprop, "Bad float property for key " + key);
	}

	public float getScaleProperty(String key) {
		String sprop = getStringProperty(key);

		return getScaleValue(sprop, "Bad scale property for key " + key);
	}

	protected static int getIntValue(String istr, String errmsg) {
		int ival = 0;
		if (istr != null) {
			try {
				ival = Integer.parseInt(istr);
			} catch (NumberFormatException nfx) {
				logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker, errmsg + ": " + nfx.getMessage());
			}
		}

		return ival;
	}

	protected static float getScaleValue(String fstr, String errmsg) {
		float fval = getFloatValue(fstr, errmsg);
		float scale = fval;

		if (scale < 0.0F) {
			scale = 0.0F;
		} else if (1.0F < scale) {
			scale = 1.0F;
		}
		if (scale != fval) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker,
					errmsg + ": scale must be in range [0..1]: " + fval);
		}

		return scale;
	}

	protected static float getFloatValue(String fstr, String errmsg) {
		float fval = 0.0F;
		if (fstr != null) {
			try {
				fval = Float.parseFloat(fstr);
			} catch (NumberFormatException nfx) {
				logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker, errmsg + ": " + nfx.getMessage());
			}
		}

		return fval;
	}

	public boolean doForceAWT() {
		return getBooleanProperty("do.use.awt.only");
	}

	public boolean doStreamedAnimationBuild() {
		Boolean prop = Boolean.valueOf(getBooleanProperty("do.streamed.animation.build", Boolean.valueOf(true)));
		if (!prop.booleanValue()) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker,
					"Request to use unstreamed animation building ignored.");
		}

		return true;
	}

	public void updateDoStreamedAnimationBuild(boolean dosab) {
		updateBooleanProperty("do.streamed.animation.build", dosab);
	}

	public boolean doAvatarSkinSliding() {
		return getBooleanProperty("do.avatar.skin.sliding");
	}

	public boolean doAvatarSelfSliding() {
		return getBooleanProperty("do.avatar.self.sliding");
	}

	public int[] appWindowLocationAndSize() {
		int[] xywh = new int[4];

		String[] xywhstr = getStringListProperty("app.window.loc.size");
		if (xywhstr.length == 4) {
			for (int i = 0; i != 4; i++) {
				xywh[i] = getIntValue(xywhstr[i], "Bad app window loc/size data");
			}

		} else {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker, "Invalid window data list length");
		}

		return xywh;
	}

	public void updateAppWindowLocationAndSize(int[] xywh) {
		String awls = "" + xywh[0] + ':' + xywh[1] + ':' + xywh[2] + ':' + xywh[3];

		updateStringProperty("app.window.loc.size", awls);
	}

	public float[] backgroundRGB() {
		int RGB_MAX = 255;

		float[] result = null;

		String rgblist = getStringProperty("background.rgb");
		if (rgblist != null) {
			String[] rgbstr = rgblist.split(":", -1);
			if (rgbstr.length == 3) {
				int errcount = 0;
				float[] rgb = new float[3];

				for (int i = 0; i != 3; i++) {
					int ival = -1;
					try {
						ival = Integer.parseInt(rgbstr[i]);
					} catch (NumberFormatException nfx) {
					}
					if ((0 <= ival) && (ival <= 255)) {

						rgb[i] = (ival / 255.0F);
					} else {
						errcount++;
					}
				}

				if (errcount == 0) {
					result = rgb;
				}
			}
			if (result == null) {
				logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker, "Bad Background RGB string");
			}
		}

		return result;
	}

	public float[] cameraSettings(int SIZE, float DFLT) {
		String[] camss = getStringListProperty("camera.settings");

		int VEC_SIZE = 0 <= SIZE ? SIZE : camss.length;
		float[] cam = new float[VEC_SIZE];

		int N_AVAIL = camss.length;

		for (int i = 0; i != VEC_SIZE; i++) {

			cam[i] = (i < N_AVAIL ? getFloatValue(camss[i], "Bad camera-setting item") : DFLT);
		}

		return cam;
	}

	public float[] cameraSettings(int SIZE) {
		return cameraSettings(SIZE, -1.0F);
	}

	public float[] cameraSettings() {
		return cameraSettings(-1, -1.0F);
	}

	public void updateCameraSettings(float[] cam) {
		updateStringProperty("camera.settings", cameraSettingsString(cam));
	}

	public static String cameraSettingsString(float[] cam) {
		StringBuilder cambuild = new StringBuilder(64);

		String pfx = "";

		for (float cval : cam) {

			float cv10 = cval * 10.0F;
			String cvfmt = "%." + ((int) cv10 == cv10 ? 1 : 3) + "f";
			cambuild.append(pfx).append(String.format(Locale.UK, cvfmt, new Object[] { Float.valueOf(cval) }));
			pfx = ":";
		}

		return cambuild.toString();
	}

	public String avatarConfigBaseURL() {
		return getBaseURLProperty("avatar.config.base.uri");
	}

	public String avatarJarBaseURL() {
		return getBaseURLProperty("avatar.jar.base.uri");
	}

	public String avatarID() {
		return getStringProperty("avatar.id");
	}

	public void updateAvatarID(String avatar) {
		updateStringProperty("avatar.id", avatar);
		this.AVATARS_ENV.setAvatar(avatar);
	}

	public String[] avatarIDList() {
		return getStringListProperty("avatar.id.list");
	}

	public String[] directFilesAvatarList() {
		return getStringListProperty("direct.files.avatar.list");
	}

	public String[] cacheableAvatarList() {
		return getStringListProperty("cacheable.avatar.list");
	}

	public String directFilesAvatarURI(String avatar) {

		return getURLProperty(directFilesAvatarURIKey(avatar));
	}

	public String cacheableAvatarURI(String avatar) {
		return getURLProperty(cacheableAvatarURIKey(avatar));
	}

	public boolean avatarMenuDoUseSubmenus() {
		return getBooleanProperty("avatar.menu.do.use.submenus");
	}

	public String avatarSubmenuSpecs() {
		return getStringProperty("avatar.submenu.specs");
	}

	public String avatarDefinitionVersion() {
		return getStringProperty("avatar.definition.version");
	}

	public String avatarDefinitionSaveURL() {
		return getURLProperty("avatar.definition.save.uri");
	}

	public boolean avatarDefinitionIsToBeSaved() {
		return getBooleanProperty("avatar.definition.do.save");
	}

	public boolean doLazyAvatarCacheRefresh() {
		return getBooleanProperty("do.lazy.avatar.cache.refresh");
	}

	public String animgenLogFileURL() {
		return getURLProperty("animgen.log.file.uri");
	}

	public boolean animgenDoLog() {
		return getBooleanProperty("animgen.do.log");
	}

	public boolean animgenLogDoAppend() {
		return getBooleanProperty("animgen.log.do.append");
	}

	public float animgenFPS() {
		return getFloatProperty("animgen.fps");
	}

	public void updateAnimgenFPS(float fps) {
		updateStringProperty("animgen.fps", "" + fps);
	}

	public String defaultSiGMLBaseURL() {
		return getURLProperty("default.sigml.base.uri");
	}

	public void updateDefaultSiGMLBaseURL(String base) {
		updateStringProperty("default.sigml.base.uri", base);
	}

	public int playerInitialLookaheadMS() {
		return getIntegerProperty("player.initial.lookahead.ms");
	}

	public int playerFrameDriftLimitMS() {
		return getIntegerProperty("player.frame.drift.limit.ms");
	}

	public int playerDropRangeLimitMS() {
		return getIntegerProperty("player.drop.range.limit.ms");
	}

	public boolean doLogDroppedFrames() {
		return getBooleanProperty("player.do.log.dropped.frames");
	}

	public boolean doShowAnimationTimes() {
		return getBooleanProperty("player.do.show.animation.times");
	}

	public boolean doLogAnimationSummary() {
		return getBooleanProperty("player.do.log.animation.summary");
	}

	public boolean doLogDroppedFramesSummary() {
		return getBooleanProperty("player.do.log.dropped.frames.summary");
	}

	public void updateDoLogDroppedFrames(boolean doldf) {
		updateBooleanProperty("player.do.log.dropped.frames", doldf);
	}

	public boolean doIdleAmbient() {
		return getBooleanProperty("do.idle.ambient");
	}

	public boolean doBusyAmbient() {
		return getBooleanProperty("do.busy.ambient");
	}

	public float idleAmbientMaxScale() {
		return getScaleProperty("idle.ambient.max.scale");
	}

	public float busyAmbientMaxScale() {
		return getScaleProperty("busy.ambient.max.scale");
	}

	public int idleAmbientInitialWaitMS() {
		int ival = getIntegerProperty("idle.ambient.initial.wait.ms");
		return ival < 0 ? -1 : ival;
	}

	public int idleAmbientContinueWaitMS() {
		int ival = getIntegerProperty("idle.ambient.continue.wait.ms");
		return ival < 0 ? -1 : ival;
	}

	public void updateDoIdleAmbient(boolean dia) {
		updateBooleanProperty("do.idle.ambient", dia);
	}

	public void updateDoBusyAmbient(boolean dba) {
		updateBooleanProperty("do.busy.ambient", dba);
	}

	protected void updateScaleProperty(String key, float s) {
		String ustr = 1.0F <= s ? "1" : s <= 0.0F ? "0" : String.format("%5.3f", new Object[] { Float.valueOf(s) });
		updateStringProperty(key, ustr);
	}

	public boolean meshDuplicatesFormatIsNew() {
		return getBooleanProperty("mesh.duplicates.format.is.new");
	}

	public String textureInputURL() {
		return getURLProperty("texture.input.uri");
	}

	public boolean textureInputIsSeparate() {
		return getBooleanProperty("texture.input.is.separate");
	}

	public boolean textureInputFormatIsJARP() {
		return getBooleanProperty("texture.input.format.is.jarp");
	}

	public boolean textureInputIsCompressed() {
		return getBooleanProperty("texture.input.is.compressed");
	}

	public boolean textureInputIsFlipped() {
		return getBooleanProperty("texture.input.is.flipped");
	}

	public String textureSeparateFileName() {
		return getStringProperty("texture.separate.file.name");
	}

	public boolean textureOutputIsSeparate() {
		return getBooleanProperty("texture.output.is.separate");
	}

	public boolean textureOutputDoCompressed() {
		return getBooleanProperty("texture.output.do.compressed");
	}

	public boolean textureOutputDoPNG() {
		return getBooleanProperty("texture.output.do.png");
	}

	public boolean textureOutputDoFlipPNG() {
		return getBooleanProperty("texture.output.do.flip.png");
	}

	public String textureSaveFileURL() {
		return getURLProperty("texture.save.file.uri");
	}

	public boolean textureIsToBeSaved() {
		return getBooleanProperty("texture.do.save");
	}

	public boolean textureFileOnlyIsToBeSaved() {
		return (textureIsToBeSaved()) && ((!avatarDefinitionIsToBeSaved()) || (!textureOutputIsSeparate()));
	}

	private static final String[] JO_KEYS = { "do.use.awt.only", "do.streamed.animation.build",
			"do.avatar.skin.sliding", "do.avatar.self.sliding", "app.window.loc.size", "camera.settings",
			"background.rgb", "avatar.config.base.uri", "avatar.jar.base.uri", "avatar.id", "avatar.id.list",
			"direct.files.avatar.list", "cacheable.avatar.list", "avatar.menu.do.use.submenus", "avatar.submenu.specs",
			"avatar.definition.version", "avatar.definition.save.uri", "avatar.definition.do.save",
			"do.lazy.avatar.cache.refresh", "animgen.log.file.uri", "animgen.do.log", "animgen.log.do.append",
			"animgen.fps", "default.sigml.base.uri", "player.initial.lookahead.ms", "player.frame.drift.limit.ms",
			"player.drop.range.limit.ms", "player.do.log.dropped.frames", "player.do.show.animation.times",
			"player.do.log.animation.summary", "player.do.log.dropped.frames.summary", "do.idle.ambient",
			"do.busy.ambient", "idle.ambient.max.scale", "busy.ambient.max.scale", "idle.ambient.initial.wait.ms",
			"idle.ambient.continue.wait.ms", "mesh.duplicates.format.is.new", "texture.input.uri",
			"texture.input.is.separate", "texture.input.format.is.jarp", "texture.input.is.compressed",
			"texture.input.is.flipped", "texture.separate.file.name", "texture.output.is.separate",
			"texture.output.do.compressed", "texture.output.do.png", "texture.output.do.flip.png",
			"texture.save.file.uri", "texture.do.save" };

	private static final String[] OK_FOR_APPLET_KEYS = { "do.use.awt.only", "do.streamed.animation.build",
			"do.avatar.skin.sliding", "do.avatar.self.sliding", "app.window.loc.size", "camera.settings",
			"background.rgb", "avatar.config.base.uri", "avatar.jar.base.uri", "avatar.id", "avatar.id.list",
			"direct.files.avatar.list", "cacheable.avatar.list", "avatar.menu.do.use.submenus", "avatar.submenu.specs",
			"avatar.definition.version", "do.lazy.avatar.cache.refresh", "animgen.fps", "default.sigml.base.uri",
			"player.initial.lookahead.ms", "player.frame.drift.limit.ms", "player.drop.range.limit.ms",
			"player.do.log.dropped.frames", "player.do.show.animation.times", "player.do.log.animation.summary",
			"player.do.log.dropped.frames.summary", "do.idle.ambient", "do.busy.ambient", "idle.ambient.max.scale",
			"busy.ambient.max.scale", "idle.ambient.initial.wait.ms", "idle.ambient.continue.wait.ms",
			"mesh.duplicates.format.is.new", "texture.input.uri", "texture.input.is.separate",
			"texture.input.format.is.jarp", "texture.input.is.compressed", "texture.input.is.flipped",
			"siwiki.kinect.server.ip" };

	public static String directFilesAvatarURIKey(String avname) {
		return "avatar.direct.base.uri." + avname;
	}

	public static String cacheableAvatarURIKey(String avname) {
		return "avatar.jar.uri." + avname;
	}

	private static final String[] VALID_APPLET_KEYS() {
		return OK_FOR_APPLET_KEYS;
	}

	private static final Set<String> toSet(String[] strings) {
		int N = strings.length;
		Set<String> set = new HashSet(2 * N);

		for (String str : strings) {
			set.add(str);
		}
		return set;
	}

	public static final String[] JA_OPTION_KEYS() {
		return JO_KEYS;
	}

	protected static final Set<String> VALID_APPLET_KEYS_SET = toSet(VALID_APPLET_KEYS());
	public static final char SEPARATOR = ':';
	public static final String SEPARATOR_STR = ":";
	public static final String DEFAULT_JA_PREFS = "jadefaults";
	public static final String DEFAULT_PROPS_FILE = "jadefaults.properties";
	private static final String AVATAR_CONFIG_STEM = "avconfig";
	public static final String AVATAR_CONFIG_PROPS_FILE = "avconfig.properties";
	public static final String AVATAR_CONFIG_PROPS_PFX = "avconfigprops_";
	private final BasicOptionSet OPTIONS_CHAIN;
	private final BasicOptionSet APPLET_OPTIONS;
	private final BasicOptionSet STANDARD_AVATAR_OPTIONS;
	private final JAPreferencesHandler PREFS_HANDLER;
	private final JAEnv JA_ENV;
	private JAAvatarsEnv AVATARS_ENV;
	private static final String DIRECT_FILES_AVATAR_URI_KEY_STEM = "avatar.direct.base.uri.";
	private static final String CACHEABLE_AVATAR_URI_KEY_STEM = "avatar.jar.uri.";
	private static final String DO_USE_AWT_ONLY_KEY = "do.use.awt.only";
	private static final String DO_STREAMED_ANIMATION_BUILD_KEY = "do.streamed.animation.build";
	private static final String DO_AVATAR_SKIN_SLIDING_KEY = "do.avatar.skin.sliding";
	private static final String DO_AVATAR_SELF_SLIDING_KEY = "do.avatar.self.sliding";
	private static final String APP_WINDOW_LOC_SIZE_KEY = "app.window.loc.size";
	private static final String CAMERA_SETTINGS_KEY = "camera.settings";
	private static final String BACKGROUND_RGB_KEY = "background.rgb";
	public static final String AVATAR_CONFIG_BASE_URI_KEY = "avatar.config.base.uri";
	public static final String AVATAR_JAR_BASE_URI_KEY = "avatar.jar.base.uri";
	public static final String AVATAR_ID_KEY = "avatar.id";
	public static final String AVATAR_ID_LIST_KEY = "avatar.id.list";
	public static final String DIRECT_FILES_AVATAR_LIST_KEY = "direct.files.avatar.list";
	public static final String CACHEABLE_AVATAR_LIST_KEY = "cacheable.avatar.list";
	private static final String AVATAR_MENU_DO_USE_SUBMENUS_KEY = "avatar.menu.do.use.submenus";
	private static final String AVATAR_SUBMENU_SPECS_KEY = "avatar.submenu.specs";
	private static final String AVATAR_DEFINITION_VERSION_KEY = "avatar.definition.version";
	private static final String AVATAR_DEFINITION_SAVE_URI_KEY = "avatar.definition.save.uri";
	private static final String AVATAR_DEFINITION_DO_SAVE_KEY = "avatar.definition.do.save";
	private static final String DO_LAZY_AVATAR_CACHE_REFRESH_KEY = "do.lazy.avatar.cache.refresh";
	private static final String ANIMGEN_LOG_FILE_URI_KEY = "animgen.log.file.uri";
	private static final String ANIMGEN_DO_LOG_KEY = "animgen.do.log";
	private static final String ANIMGEN_LOG_DO_APPEND_KEY = "animgen.log.do.append";
	private static final String ANIMGEN_FPS_KEY = "animgen.fps";
	private static final String DEFAULT_SIGML_BASE_URI_KEY = "default.sigml.base.uri";
	private static final String PLAYER_INITIAL_LOOKAHEAD_MS_KEY = "player.initial.lookahead.ms";
	private static final String PLAYER_FRAME_DRIFT_LIMIT_MS_KEY = "player.frame.drift.limit.ms";
	private static final String PLAYER_DROP_RANGE_LIMIT_MS_KEY = "player.drop.range.limit.ms";
	private static final String PLAYER_DO_LOG_DROPPED_FRAMES_KEY = "player.do.log.dropped.frames";
	private static final String PLAYER_DO_SHOW_ANIMATION_TIMES_KEY = "player.do.show.animation.times";
	private static final String PLAYER_DO_LOG_ANIMATION_SUMMARY_KEY = "player.do.log.animation.summary";
	private static final String PLAYER_DO_LOG_DROPPED_FRAMES_SUMMARY_KEY = "player.do.log.dropped.frames.summary";
	public static final String PLAYER_BEGIN = "player.time.begin";
	public static final String PLAYER_END = "player.time.end";
	public static final String PLAYER_SYNC_RATE = "player.sync.rate";
	private static final String DO_IDLE_AMBIENT_KEY = "do.idle.ambient";
	private static final String DO_BUSY_AMBIENT_KEY = "do.busy.ambient";
	private static final String IDLE_AMBIENT_MAX_SCALE_KEY = "idle.ambient.max.scale";
	private static final String BUSY_AMBIENT_MAX_SCALE_KEY = "busy.ambient.max.scale";
	private static final String IDLE_AMBIENT_INITIAL_WAIT_MS_KEY = "idle.ambient.initial.wait.ms";
	private static final String IDLE_AMBIENT_CONTINUE_WAIT_MS_KEY = "idle.ambient.continue.wait.ms";
	private static final String MESH_DUPLICATES_FORMAT_IS_NEW_KEY = "mesh.duplicates.format.is.new";
	private static final String TEXTURE_INPUT_URI_KEY = "texture.input.uri";
	private static final String TEXTURE_INPUT_IS_SEPARATE_KEY = "texture.input.is.separate";
	private static final String TEXTURE_INPUT_FORMAT_IS_JARP_KEY = "texture.input.format.is.jarp";
	private static final String TEXTURE_INPUT_IS_COMPRESSED_KEY = "texture.input.is.compressed";
	private static final String TEXTURE_INPUT_IS_FLIPPED_KEY = "texture.input.is.flipped";
	private static final String TEXTURE_SEPARATE_FILE_NAME_KEY = "texture.separate.file.name";
	private static final String TEXTURE_OUTPUT_IS_SEPARATE_KEY = "texture.output.is.separate";
	private static final String TEXTURE_OUTPUT_DO_COMPRESSED_KEY = "texture.output.do.compressed";
	private static final String TEXTURE_OUTPUT_DO_PNG_KEY = "texture.output.do.png";
	private static final String TEXTURE_OUTPUT_DO_FLIP_PNG_KEY = "texture.output.do.flip.png";
	private static final String TEXTURE_SAVE_FILE_URI_KEY = "texture.save.file.uri";
	private static final String TEXTURE_DO_SAVE_KEY = "texture.do.save";
	private static final String SIWIKI_KINECT_SERVER_IP_KEY = "siwiki.kinect.server.ip";

	public static abstract interface KeyChecker {
		public abstract boolean keyIsOK(String paramString);
	}
}
