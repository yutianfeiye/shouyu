package jautil;

import java.applet.Applet;
import java.io.PrintStream;
import java.net.URL;
import java.util.Properties;

public class AppletPropertiesSetter {
	private static final String[] SYS_PROP_KEYS = { "ja.version.tag", "ja.force.remote.ja.home" };

	private static final String[] SYS_PROP_URL_KEYS = { "ja.remote.base.url" };

	public static final void copyStdAppletProperties(Applet applet) {
		copyJAProperties(applet, null, SYS_PROP_KEYS, SYS_PROP_URL_KEYS);
	}

	public static final void copyStdAppProperties(Properties argProps) {
		copyJAProperties(null, argProps, SYS_PROP_KEYS, SYS_PROP_URL_KEYS);
	}

	private static final void copyJAProperties(Applet applet, Properties argProps, String[] propnames,
			String[] urlpropnames) {
		if (propnames != null) {
			for (String pname : propnames) {
				copyProperty(applet, argProps, pname);
			}
		}

		if (urlpropnames != null) {
			for (String upname : urlpropnames) {
				copyURLProperty(applet, argProps, upname);
			}
		}
	}

	private static final void copyProperty(Applet applet, Properties argProps, String propname) {
		String PROP_VAL = argProps == null ? applet.getParameter(propname) : argProps.getProperty(propname);
		if (PROP_VAL != null) {
			System.setProperty(propname, PROP_VAL);
		}
	}

	private static final void copyURLProperty(Applet applet, Properties argProps, String urlpropname) {
		String URL_PROP_VAL = argProps == null ? applet.getParameter(urlpropname) : argProps.getProperty(urlpropname);
		if (URL_PROP_VAL != null) {
			if (applet != null) {
				URL base = applet.getDocumentBase();

				String RESOLVED_URL_VAL = JAIO.resolveURL(base, URL_PROP_VAL).toString();
				System.setProperty(urlpropname, RESOLVED_URL_VAL);
			} else {
				System.setProperty(urlpropname, URL_PROP_VAL);
			}
		}
	}

	public static Properties argsToProperties(String[] args) {
		Properties props = new Properties();
		if (args != null) {
			int argsIx = 0;
			while (argsIx < args.length) {
				if (args[argsIx].charAt(0) == '-') {
					int eqPos = args[argsIx].indexOf("=");
					if (eqPos < 0) {
						argsIx++;
						if (argsIx < args.length) {
							props.setProperty(args[(argsIx - 1)].substring(1), args[argsIx]);
						} else {
							System.out.println("####  AppletPropertiesSetter: Further argument expected after "
									+ args[(argsIx - 1)]);
						}
					} else {
						props.setProperty(args[argsIx].substring(1, eqPos), args[argsIx].substring(eqPos + 1));
					}
				} else {
					System.out.println("####  AppletPropertiesSetter: Malformed argument " + args[argsIx]);
				}
				argsIx++;
			}
		}

		return props;
	}
}
