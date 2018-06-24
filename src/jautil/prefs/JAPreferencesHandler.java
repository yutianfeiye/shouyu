package jautil.prefs;

import jautil.install.DeploymentParameters;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;
import java.util.Map;
import java.util.prefs.BackingStoreException;
import java.util.prefs.InvalidPreferencesFormatException;
import java.util.prefs.Preferences;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import util.LoggerConfig;

public class JAPreferencesHandler {
	private static Logger logger= LogManager.getLogger();;;

	protected static final Preferences SYSTEM_ROOT = Preferences.systemRoot();

	protected static final Preferences USER_ROOT = Preferences.userRoot();

	protected static final String JA_PREFS_BASE_RELATIVE_PATH_WITH_VERSION = "uk/ac/uea/cmp/ja/" +

			DeploymentParameters.JA_VERSION_TAG();

	protected Preferences jarpRoot;

	protected static Preferences jarpSysRoot;

	protected static final String JAPrefsBase() {
		return JA_PREFS_BASE_RELATIVE_PATH_WITH_VERSION;
	}

	public Preferences jarpUserRoot() {
		if (this.jarpRoot == null) {
			this.jarpRoot = USER_ROOT.node(JAPrefsBase());
		}
		return this.jarpRoot;
	}

	public Preferences jarpUserNode(String node) {
		return jarpUserRoot().node(node);
	}

	public boolean jarpUserNodeIsAvailable(String node) {
		boolean avail = false;
		try {
			try {
				avail = jarpUserRoot().nodeExists(node);
			} catch (BackingStoreException bsx) {
				report("jarpUserNodeIsAvailable", bsx);
			}
		} catch (IllegalStateException isx) {
			report("update", isx);
		}

		return avail;
	}

	public void export(String node, OutputStream outs) throws IOException, BackingStoreException {
		if (!jarpUserNodeIsAvailable(node)) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker,
					"JAPreferencesHandler.export(): node \"" + node + "\" is unavailable!");

		} else {
			jarpUserNode(node).exportNode(outs);
		}
	}

	public void export(String node, String path) throws IOException, BackingStoreException {
		OutputStream outs = new FileOutputStream(path);
		export(node, outs);
	}

	public void importPreferences(InputStream ins) throws IOException, InvalidPreferencesFormatException {
		Preferences.importPreferences(ins);
	}

	public void importPreferences(String path) throws IOException, InvalidPreferencesFormatException {
		InputStream ins = new FileInputStream(path);
		importPreferences(ins);
	}

	public void clear(String node) {
		Preferences PREFS = jarpUserNode(node);
		try {
			PREFS.clear();
		} catch (BackingStoreException bsx) {
			report("clearNode", node, bsx);
		}
	}

	public void update(String node, Properties props) {
		try {
			Preferences PREFS = jarpUserNode(node);

			Set<Map.Entry<Object, Object>> ENTRIES = props.entrySet();
			for (Map.Entry<Object, Object> entry : ENTRIES) {
				String KEY = (String) entry.getKey();
				String VALUE = (String) entry.getValue();

				PREFS.put(KEY, VALUE);
			}

			try {
				PREFS.flush();
			} catch (BackingStoreException bsx) {
				report("update", "sync() failure", bsx);
			}
		} catch (IllegalStateException isx) {
			report("update", isx);
		}
	}

	public void reset(String node, Properties props) {
		clear(node);
		update(node, props);
	}

	public void updatePreference(String node, String key, String value) {
		try {
			Preferences PREFS = jarpUserNode(node);
			if (value != null) {
				PREFS.put(key, value);
			} else {
				PREFS.remove(key);
			}

			try {
				PREFS.flush();
			} catch (BackingStoreException bsx) {
				report("updatePreference", "sync() failure", bsx);
			}
		} catch (IllegalStateException isx) {
			report("updatePreference", isx);
		}
	}

	public void load(String node, Properties props) {
		if (jarpUserNodeIsAvailable(node)) {
			Preferences PREFS = jarpUserNode(node);
			String[] KEYS = getKeys(PREFS);

			for (String key : KEYS) {
				String VALUE = PREFS.get(key, null);

				if (VALUE != null) {
					props.put(key, VALUE);
				}
			}
		}
	}

	protected String[] getKeys(Preferences prefs) {
		String[] keys = new String[0];
		try {
			keys = prefs.keys();
		} catch (BackingStoreException bsx) {
			report("getKeys", bsx);
		}

		return keys;
	}

	public static Preferences jarpSystemRoot() {
		if (jarpSysRoot == null) {
			jarpSysRoot = SYSTEM_ROOT.node(JAPrefsBase());
		}

		return jarpSysRoot;
	}

	public static String getSystemPreference(String skey) {
		Preferences SPREFS = jarpSystemRoot();

		return SPREFS.get(skey, null);
	}

	public static void setSystemPreference(String skey, String sval) {
		try {
			Preferences SPREFS = jarpSystemRoot();
			if (sval != null) {
				SPREFS.put(skey, sval);
			} else {
				SPREFS.remove(skey);
			}

			try {
				SPREFS.flush();
			} catch (BackingStoreException bsx) {
				report("setSystemPreference", "sync() failure", bsx);
			}
		} catch (IllegalStateException isx) {
			report("setSystemPreference", isx);
		}
	}

	protected static void report(String where, Exception x) {
		report(where, null, x);
	}

	protected static void report(String where, String what, Exception x) {
		String whatstr = what + ", ";
		logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.SESSIONMarker,
				"JAPreferencesHandler." + where + "(): " + whatstr + x);
	}
}
