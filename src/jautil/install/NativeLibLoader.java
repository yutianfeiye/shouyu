package jautil.install;

import jautil.platform.OpSystem;
import java.io.PrintStream;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class NativeLibLoader {
	public static void loadLibrary(String libname) {
		loadLibraryInternal(libname);
	}

	private static void loadLibraryInternal(String libname) {
		String adj_libname = OpSystem.nativeLibName(libname);

		String sunAppletLauncher = System.getProperty("sun.jnlp.applet.launcher");

		boolean usingJNLPAppletLauncher = Boolean.valueOf(sunAppletLauncher).booleanValue();

		boolean jal_loaded = false;
		if (usingJNLPAppletLauncher) {
			try {
				Class<?> jnlpAppletLauncherClass = Class.forName("org.jdesktop.applet.util.JNLPAppletLauncher");

				Method jnlpLoadLibraryMethod = jnlpAppletLauncherClass.getDeclaredMethod("loadLibrary",
						new Class[] { String.class });

				jnlpLoadLibraryMethod.invoke(null, new Object[] { adj_libname });
				jal_loaded = true;
			} catch (ClassNotFoundException ex) {
				System.err.println("loadLibrary(" + adj_libname + ")");
				System.err.println(ex);
				System.err.println("Attempting to use System.loadLibrary instead");
			} catch (Exception e) {
				Throwable t = e;
				if ((t instanceof InvocationTargetException)) {
					t = ((InvocationTargetException) t).getTargetException();
				}
				if ((t instanceof Error)) {
					throw ((Error) t);
				}
				if ((t instanceof RuntimeException)) {
					throw ((RuntimeException) t);
				}

				throw ((UnsatisfiedLinkError) new UnsatisfiedLinkError().initCause(e));
			}
		}

		if (!jal_loaded) {
			try {
				System.loadLibrary(adj_libname);
			} catch (UnsatisfiedLinkError e) {
				System.out.println("####  UnsatisfiedLinkError for " + adj_libname);
				throw e;
			}
		}
	}
}
