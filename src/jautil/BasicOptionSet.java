package jautil;

import jautil.prefs.JAPreferencesHandler;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Properties;
import java.util.Set;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import util.LoggerConfig;

public class BasicOptionSet {
	private static Logger logger = LogManager.getLogger();;

	public static final String NULL_REP = "null";

	private final BasicOptionSet BACK_UP;

	private final URL BASE_URL;

	private final Properties PROPERTIES;

	private final JAPreferencesHandler PREFS_HANDLER;

	private final String PREFS_NODE;

	private final boolean PREFS_UPDATE_IS_VIABLE;

	private final JAOptions.KeyChecker KEY_VALIDATOR;

	public BasicOptionSet(BasicOptionSet backup, URL baseurl, Properties props) {
		this.KEY_VALIDATOR = null;

		this.PREFS_HANDLER = null;
		this.PREFS_NODE = null;
		this.PREFS_UPDATE_IS_VIABLE = false;

		this.BACK_UP = backup;
		this.BASE_URL = baseurl;
		this.PROPERTIES = props;
	}

	public BasicOptionSet(URL baseurl, URL propsurl, JAPreferencesHandler japhdlr, String prefsname) {
		this(null, baseurl, propsurl, japhdlr, prefsname);
	}

	public BasicOptionSet(BasicOptionSet backup, URL baseurl, URL propsurl, JAPreferencesHandler japhdlr,
			String prefsname) {
		this(null, backup, baseurl, propsurl, japhdlr, prefsname, false);
	}

	public BasicOptionSet(URL baseurl, URL propsurl, JAPreferencesHandler japhdlr, String prefsname,
			boolean updateprefs) {
		this(null, null, baseurl, propsurl, japhdlr, prefsname, updateprefs);
	}

	public BasicOptionSet(BasicOptionSet backup, URL baseurl, URL propsurl, JAPreferencesHandler japhdlr,
			String prefsname, boolean updateprefs) {
		this(null, backup, baseurl, propsurl, japhdlr, prefsname, updateprefs);
	}

	public BasicOptionSet(JAOptions.KeyChecker keychckr, BasicOptionSet backup, URL baseurl, URL propsurl,
			JAPreferencesHandler japhdlr, String prefsname, boolean updateprefs) {
		this.KEY_VALIDATOR = keychckr;
		this.BACK_UP = backup;

		this.BASE_URL = baseurl;
		this.PREFS_HANDLER = japhdlr;
		this.PREFS_NODE = prefsname;
		this.PREFS_UPDATE_IS_VIABLE = ((this.PREFS_NODE != null) && (this.PREFS_HANDLER != null));

		boolean NO_PROPS = (propsurl == null) || (JAIO.checkedURL(propsurl.toString(), true) == null);
		this.PROPERTIES = ((NO_PROPS) && (this.PREFS_NODE == null) ? null : new Properties());

		InputStream propsins = NO_PROPS ? null : JAIO.getPossibleInputStream(propsurl);
		String PREFS_ID = this.PREFS_NODE == null ? "(No prefs)" : this.PREFS_NODE;

		String PROPS_LOAD = (propsins == null ? ": (Missing) " : ": Load ") + propsurl.toString();
		logger.log(LoggerConfig.LOGLevel, LoggerConfig.SESSIONMarker, "BasicOptionSet " + PREFS_ID + PROPS_LOAD);

		if (this.PREFS_NODE != null) {
			this.PREFS_HANDLER.load(this.PREFS_NODE, this.PROPERTIES);
		}

		if (propsins != null) {
			if (!updateprefs) {
				loadProperties(propsins);
			} else {
				loadWithPreferencesUpdate(propsins);
			}
		}
	}

	protected void loadProperties(InputStream propsins) {
		loadProperties(propsins, this.PROPERTIES);
	}

	protected void loadProperties(InputStream propsins, Properties props) {
		try {
			props.load(propsins);

			if (this.KEY_VALIDATOR != null) {

				String[] PR_KEYS = (String[]) props.keySet().toArray(new String[0]);

				for (String key : PR_KEYS) {
					if (!isValidKey(key)) {
						props.remove(key);
						logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker, "Invalid property key: " + key);
					}
				}
			}
		} catch (IOException iox) {
			logger.log(LoggerConfig.ERRORLevel, LoggerConfig.SESSIONMarker, "Error: " + iox);
		}
	}

	protected void loadWithPreferencesUpdate(InputStream propsins) {
		Properties props = new Properties();
		loadProperties(propsins, props);

		String[] PR_KEYS = (String[]) props.keySet().toArray(new String[0]);

		for (String key : PR_KEYS) {
			String VAL = props.getProperty(key);
			String OLD_VAL = this.PROPERTIES.getProperty(key);

			if ((OLD_VAL == null) || (!OLD_VAL.equals(VAL))) {
				this.PROPERTIES.setProperty(key, VAL);

				this.PREFS_HANDLER.updatePreference(this.PREFS_NODE, key, VAL);

				logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.SESSIONMarker,
						"Preferences " + this.PREFS_NODE + ": Set " + key + " --> " + VAL);
			}
		}
	}

	public void updateStringProperty(String key, String value) {
		if (this.PROPERTIES != null) {
			if (isValidKey(key)) {
				if (value != null) {
					this.PROPERTIES.setProperty(key, value);
				}

				if (this.PREFS_UPDATE_IS_VIABLE) {
					String P_VAL = value == null ? "null" : value;
					this.PREFS_HANDLER.updatePreference(this.PREFS_NODE, key, P_VAL);
				}
			} else {
				logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker,
						"Preferences " + this.PREFS_NODE + ": Cannot update invalid key " + key);
			}
		}
	}

	public String getStringProperty(String key) {
		String prop = this.PROPERTIES == null ? null : this.PROPERTIES.getProperty(key);

		return this.BACK_UP == null ? null : prop != null ? prop : this.BACK_UP.getStringProperty(key);
	}

	public String getURLProperty(String key) {
		String urlstr = null;
		if (this.PROPERTIES != null) {
			urlstr = this.PROPERTIES.getProperty(key);
		}

		String uprop = null;
		if (urlstr != null) {

			URL url = JAIO.resolveURL(this.BASE_URL, checkForNull(urlstr));
			if (url != null) {
				uprop = url.toString();
			}
		} else if (this.BACK_UP != null) {
			uprop = this.BACK_UP.getURLProperty(key);
		}

		return uprop;
	}

	public String getBaseURLProperty(String key) {
		return JAIO.forceBaseURL(getURLProperty(key));
	}

	protected boolean isValidKey(String key) {
		return (this.KEY_VALIDATOR == null) || (this.KEY_VALIDATOR.keyIsOK(key));
	}

	public static String checkForNull(String prop) {
		String chkprop = prop;
		if (prop != null) {
			String tprop = prop.trim();
			if ((tprop.length() == 0) || (tprop.equalsIgnoreCase("null"))) {
				chkprop = null;
			}
		}
		return chkprop;
	}
}
