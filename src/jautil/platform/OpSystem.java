package jautil.platform;

import java.io.PrintStream;
import java.lang.reflect.Method;

public class OpSystem {
	public static final int WIN_SYSTEM = 0;
	public static final int MAC_SYSTEM = 1;

	static String osname = System.getProperty("os.name").toLowerCase();

	private static final int SYSTEM = osname.contains("mac os x") ? 1 : 0;
	private static final String CLASS_NAME = "jautil.platform.OpSystem";

	public static final boolean IS_WIN() {
		return SYSTEM == 0;
	}

	public static final boolean IS_MAC() {
		return SYSTEM == 1;
	}

	public static final String TAG_ID(String id) {
		return id + (IS_MAC() ? "_MAC" : IS_WIN() ? "_WIN" : "");
	}

	public static final int CTRL_MODIFIER_MASK = IS_MAC() ? 256 : 128;

	public static final int SHIFT_MODIFIER_MASK = 64;

	private static final String MAC_QUIT_HANDLER_CLASS = "jautil.platform.MacOSXQuitHandler";

	private static final String MAC_QH_REGISTER_METHOD = "registerMacOSXQuitter";

	public static final String nativeLibName(String libname) {
		return IS_WIN() ? libname.toLowerCase() : libname;
	}

	public static void registerMacOSXQuitter(Runnable quitter) {
		try {
			ClassLoader cloader = Class.forName("jautil.platform.OpSystem").getClassLoader();
			Class<?> qhdlrclass = cloader.loadClass("jautil.platform.MacOSXQuitHandler");

			Class<?>[] rgstrsig = { Runnable.class };

			Method rgstrmethod = qhdlrclass.getDeclaredMethod("registerMacOSXQuitter", rgstrsig);

			if (rgstrmethod != null) {
				Object[] rgstrargs = { quitter };
				rgstrmethod.invoke(qhdlrclass, rgstrargs);
			}
		} catch (NoClassDefFoundError ncdfe) {
			System.out.println("No Apple EAWT, so no Mac Quit handling: " + ncdfe);

		} catch (ClassNotFoundException cnfx) {
			System.out.println("No Mac Quit handling: " + cnfx);
		} catch (Exception x) {
			System.out.println("Failure in Mac OS X quit handler set up:");

			x.printStackTrace();
		}
	}
}
