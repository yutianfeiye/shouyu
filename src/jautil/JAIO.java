package jautil;

import jautil.install.ProgressInputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import util.LoggerConfig;

public class JAIO {
	private static Logger logger = LogManager.getLogger();;

	public static String FILE_SEPARATOR = System.getProperty("file.separator", "/");

	public static int STD_URL_TIMEOUT_MS = 1250;
	private static final String UTF_8 = "utf-8";

	public static String extendURL(String url, String step) {
		String[] steps = { step };
		return extendURL(url, steps);
	}

	public static String extendURL(String url, String[] steps) {
		boolean endslashok = url.endsWith("/");

		String ext = "";
		for (String step : steps) {
			ext = ext + (endslashok ? "" : "/") + step;
			endslashok = false;
		}

		return url + ext;
	}

	public static String extendBaseURL(String url, String step) {
		String[] steps = { step };

		return extendBaseURL(url, steps);
	}

	public static String extendBaseURL(String url, String[] steps) {
		String ext = "";
		for (String step : steps) {
			ext = ext + step + "/";
		}

		return url + ext;
	}

	public static URL extendBaseURL(URL url, String step) {
		String[] steps = { step };

		return extendBaseURL(url, steps);
	}

	public static URL extendBaseURL(URL url, String[] steps) {
		String eurls = extendBaseURL(url.toString(), steps);

		URL eurl = null;
		try {
			eurl = new URL(eurls);
		} catch (IOException iox) {
			iox.printStackTrace();
		}

		return eurl;
	}

	public static String forceBaseURL(String url) {
		return (url != null) && (!url.endsWith("/")) ? url + "/" : url;
	}

	public static URL forceBaseURL(URL url) {
		return (url != null) && (!url.getPath().endsWith("/")) ? stringToURL(forceBaseURL(url.toString())) : url;
	}

	public static String tidyBaseURL(String url) {
		String pburl = url;

		if ((url != null) && (!url.endsWith("/"))) {
			int i = url.lastIndexOf("/");
			pburl = url.substring(0, i + 1);
		}

		return pburl;
	}

	public static URL tidyBaseURL(URL url) {
		return (url != null) && (!url.getPath().endsWith("/")) ? stringToURL(tidyBaseURL(url.toString())) : url;
	}

	public static String decodeURL(String url) {
		if (url != null) {
			try {
				url = URLDecoder.decode(url, "UTF-8");
			} catch (UnsupportedEncodingException ex) {
			}
		}
		return url;
	}

	public static URL stringToURL(String url) {
		return resolveURL((URL) null, url);
	}

	public static URL resolveURL(String base, String url, String logprefix) {
		URL rurl = null;
		try {
			URL BASE_URL = base == null ? null : new URL(base);
			rurl = resolveURL(BASE_URL, url);
		} catch (IOException iox) {
			if (logprefix != null) {
				logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker, logprefix + iox);
			}
		}
		return rurl;
	}

	public static URL resolveURL(String base, String url) {
		return resolveURL(base, url, "JAIO.resolveURL: ");
	}

	public static URL resolveURL(URL base, String url, String logprefix) {
		URL rurl = null;
		if (url != null) {
			try {
				rurl = new URL(base, url);
			} catch (IOException iox) {
				if (logprefix != null) {
					logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker, logprefix + iox);
				}
			}
		}
		return rurl;
	}

	public static URL resolveURL(URL base, String url) {
		return resolveURL(base, url, "JAIO.resolveURL: ");
	}

	public static String getLastPathStep(String url) {
		return getLastPathStep(stringToURL(url));
	}

	public static String getLastPathStep(URL url) {
		String path = url.getPath();
		int i = path.lastIndexOf('/');
		String step = i < 0 ? path : path.substring(i + 1);
		return step;
	}

	public static InputStream getInputStream(File f, boolean silent) {
		InputStream ins = null;

		if (f != null) {
			try {
				ins = new FileInputStream(f);
			} catch (IOException iox) {
				if (!silent) {
					logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker, "JAIO.getInputStream: " + iox);
				}
			}
		}

		return ins;
	}

	public static InputStream getPossibleInputStream(File f) {
		return getInputStream(f, true);
	}

	public static InputStream getInputStream(File f) {
		return getInputStream(f, false);
	}

	public static InputStream getInputStream(URL url, boolean silent) {
		InputStream ins = null;
		if (url != null) {
			try {
				ins = getURLConnection(url).getInputStream();
			} catch (IOException iox) {
				if (!silent) {
					logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker, "JAIO.getInputStream: " + iox);
				}
			}
		}

		return ins;
	}

	public static InputStream getPossibleInputStream(URL url) {
		return getInputStream(url, true);
	}

	public static InputStream getInputStream(URL url) {
		return getInputStream(url, false);
	}

	public static InputStream getInputStream(String url) {
		return getInputStream(stringToURL(url));
	}

	public static InputStream getInputStream(String base, String url) {
		return getInputStream(resolveURL(base, url));
	}

	public static InputStream getInputStream(URL base, String url) {
		return getInputStream(resolveURL(base, url));
	}

	public static URLConnection getURLConnection(URL url, boolean silent) {
		URLConnection uc = null;
		if (url != null) {
			try {
				uc = url.openConnection();

				if (isFileURL(url)) {
					logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.CACHEMarker,
							"getURLConnection: Not caching " + url.toString());
					uc.setDefaultUseCaches(false);
					uc.setUseCaches(false);
				}
			} catch (IOException iox) {
				if (!silent) {
					logger.log(LoggerConfig.WARNLevel, LoggerConfig.CACHEMarker, "JAIO.getURLConnection: " + iox);
				}
			}
		}

		return uc;
	}

	public static URLConnection getURLConnection(URL url) {
		return getURLConnection(url, false);
	}

	public static URLConnection getURLConnection(String url, boolean silent) {
		return getURLConnection(stringToURL(url), silent);
	}

	public static URLConnection getURLConnection(String url) {
		return getURLConnection(url, false);
	}

	public static InputStream getProgressMonitorInputStream(URLConnection uc, String tag) {
		InputStream pins = null;
		if (uc != null) {
			try {
				int N = uc.getContentLength();
				InputStream ins = uc.getInputStream();
				pins = N <= 0 ? ins : new ProgressInputStream(ins, N, tag);
			} catch (IOException iox) {
				logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker,
						"JAIO.getProgressMonitorInputStream: " + iox);

				if (pins != null) {
					try {
						pins.close();
					} catch (IOException iiox) {
					}
					pins = null;
				}
			}
		}

		return pins;
	}

	public static InputStream getProgressMonitorInputStream(URL url, String tag) {
		URLConnection uc = getURLConnection(url);
		return getProgressMonitorInputStream(uc, tag);
	}

	public static InputStream getProgressMonitorInputStream(String url, String tag) {
		URLConnection uc = getURLConnection(url);
		return getProgressMonitorInputStream(uc, tag);
	}

	public static boolean isFileURL(String url) {
		return isFileURL(stringToURL(url));
	}

	public static boolean isFileURL(URL url) {
		return (url != null) && (url.getProtocol().equals("file"));
	}

	public static File fileForFileURL(URL url) {
		File file = null;

		if (url != null) {
			try {
				URI uri = new URI(url.getProtocol(), url.getAuthority(), url.getHost(), url.getPort(), url.getPath(),
						url.getQuery(), url.getRef());
				file = new File(uri);
			} catch (URISyntaxException usx) {
				
				logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker, "Bad file URI: " + url.toString());
			}
		}

		return file;
	}

	public static File fileForFileURL(String urlstr) {
		return urlstr == null ? null : fileForFileURL(stringToURL(urlstr));
	}

	public static String checkedURL(String url) {
		return checkedURL(url, false);
	}

	public static String checkedURL(String url, boolean silent) {
		return checkedURL(url, STD_URL_TIMEOUT_MS, silent);
	}

	public static String checkedURL(String url, int timeoutms, boolean silent) {
		String chkurl = null;
		if (url != null) {

			try {

				URLConnection ucnct = getURLConnection(url, true);
				ucnct.setConnectTimeout(timeoutms);

				ucnct.connect();

				InputStream uuins = ucnct.getInputStream();
				uuins.close();

				chkurl = url;
			} catch (IOException iox) {
				if (!silent) {
					logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker,
							"Check for URL: " + url + " Failed: " + iox);
				}
			}
		}

		return chkurl;
	}

	public static boolean isWellFormedURL(String url) {
		URL vurl = null;

		if (url != null) {
			try {
				vurl = new URL(url);
			} catch (IOException iox) {
			}
		}

		return vurl != null;
	}

	public static boolean isValidURL(URL url) {
		boolean valid = false;

		if (url != null) {
			InputStream uins = getPossibleInputStream(url);
			if (uins != null) {
				try {
					uins.close();
					valid = true;
				} catch (IOException iox) {
				}
			}
			logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.SESSIONMarker,
					"isValidURL " + (valid ? "succeeds" : "fails") + ": " + url.toString());
		}

		return valid;
	}

	public static boolean isValidURL(String url) {
		boolean valid = false;

		if (url != null) {
			try {
				valid = isValidURL(new URL(url));
			} catch (IOException iox) {
			}
		}

		return valid;
	}

	public static File checkedFileForFileURL(URL url) {
		File file = fileForFileURL(url);

		return file.exists() ? file : null;
	}

	public static File checkedFileForFileURL(String urlstr) {
		File file = fileForFileURL(urlstr);

		return file.exists() ? file : null;
	}

	public static File fileForAbsPath(String path) {
		File f = new File(path);
		try {
			f = f.getCanonicalFile();
		} catch (IOException iox) {
			iox.printStackTrace();
		}

		return f;
	}

	public static File fileForAbsDirectoryPath(String path) {
		File f = fileForAbsPath(path);

		return f.isDirectory() ? f : null;
	}

	public static File[] baseAndFileForFileURL(URL url) {
		File[] result = null;
		if (url != null) {
			File file = fileForFileURL(url);
			File parent = file.getParentFile();
			File child = new File(file.getName());

			result = new File[2];
			result[0] = parent;
			result[1] = child;
		}

		return result;
	}

	public static boolean isValidFile(File f) {
		return (f != null) && (f.exists()) && (!f.isDirectory());
	}

	public static boolean isValidFile(String path) {
		return (path != null) && (isValidFile(new File(path)));
	}

	public static boolean establishDirectory(File dir) {
		return dir.exists() ? dir.isDirectory() : dir.mkdirs();
	}

	public static String pathForFileURL(String urlstr) {
		String path = null;

		if (urlstr != null) {
			try {
				File file = fileForFileURL(urlstr);
				if (file != null) {
					path = file.getCanonicalPath();
				}
			} catch (IOException iox) {
				logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker, "JAIO.pathForFileURL: " + iox);
			}
		}

		return path;
	}

	public static String pathForFile(File f) {
		String path = null;
		try {
			if (f != null) {
				path = f.getCanonicalPath();
			}
		} catch (IOException iox) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker, "JAIO.pathForFile: " + iox);
		}

		return path;
	}

	public static boolean isAncestorOf(File dir, File f) {
		boolean afound = false;

		if (dir != null) {

			File fa = f;
			while ((fa != null) && (!afound)) {
				if (dir.equals(fa)) {
					afound = true;
				} else {
					fa = fa.getParentFile();
				}
			}
		}
		return afound;
	}

	public static File validOutputFile(String path) {
		File file = new File(path);
		validateOutputFile(file);

		return file;
	}

	public static void validateOutputFile(File file) {
		File dir = file.getParentFile();
		if (dir != null) {
			dir.mkdirs();
		}
	}

	public static void validateOutputFile(String path) {
		validateOutputFile(new File(path));
	}

	public static OutputStream validFileOutputStream(String path, String msgpfx) {
		OutputStream outs = null;

		if (path != null) {
			try {
				File file = validOutputFile(path);
				outs = new FileOutputStream(file);
			} catch (IOException iox) {
				logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker, (msgpfx == null ? "" : msgpfx) + iox);
			}
		}

		return outs;
	}

	public static OutputStream validFileOutputStream(String path) {
		return validFileOutputStream(path, null);
	}

	public static String urlToOutputFilePath(String url, String msgpfx) {
		String path = null;

		if (url != null) {

			if (isFileURL(url)) {

				path = pathForFileURL(url);
			}

			if ((path == null) && (msgpfx != null)) {
				logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker, msgpfx + "Invalid file URL: " + url);
			}
		}

		return path;
	}

	public static String urlToOutputFilePath(String url) {
		return urlToOutputFilePath(url, null);
	}

	public static OutputStream urlToFileOutputStream(String url, String msgpfx) {
		OutputStream outs = null;

		String path = urlToOutputFilePath(url, msgpfx);

		if (path != null) {
			outs = validFileOutputStream(path, msgpfx);
		}

		return outs;
	}

	public static OutputStream urlToFileOutputStream(String url) {
		return urlToFileOutputStream(url, null);
	}

	public static String[] getLines(InputStream ins) throws IOException {
		String[] lines = null;

		BufferedReader brdr = new BufferedReader(new InputStreamReader(ins, "UTF-8"));

		ArrayList<String> linesal = new ArrayList();

		String ln = brdr.readLine();
		while (ln != null) {
			linesal.add(ln);
			ln = brdr.readLine();
		}
		brdr.close();

		lines = new String[linesal.size()];
		linesal.toArray(lines);

		return lines;
	}

	public static byte[] getBytesFromStream(InputStream ins) {
		return getBytesFromStream(ins, 8192);
	}

	public static byte[] getBytesFromStream(InputStream ins, int estsz) {
		byte[] bytes = null;
		try {
			ByteArrayOutputStream baos = new ByteArrayOutputStream(estsz);
			byte[] buf = new byte['က'];
			int n = ins.read(buf);
			while (0 <= n) {
				baos.write(buf, 0, n);
				n = ins.read(buf);
			}
			ins.close();
			bytes = baos.toByteArray();
			baos.reset();
			baos = null;
		} catch (IOException iox) {
			iox.printStackTrace();
		}

		return bytes;
	}

	public static byte[] getBytesFromURL(URL url) {
		byte[] bytes = null;
		try {
			InputStream uins = url.openStream();
			bytes = getBytesFromStream(uins);
		} catch (IOException iox) {
			iox.printStackTrace();
		}

		return bytes;
	}

	public static byte[] getBytesFromURL(String url) {
		return getBytesFromURL(stringToURL(url));
	}

	public static byte[] getBytesFromURL(URL base, String url) {
		return getBytesFromURL(resolveURL(base, url));
	}

	public static byte[] getBytesFromURL(String base, String url) {
		return getBytesFromURL(resolveURL(base, url));
	}

	public static URL fileToURL(File file) {
		URL url = null;
		try {
			url = file.getCanonicalFile().toURI().toURL();
		} catch (IOException iox) {
			iox.printStackTrace();
		}

		return url;
	}

	public static URL fileToURL(String path) {
		return fileToURL(new File(path));
	}

	public static URL directoryToBaseURL(File dir) {
		return forceBaseURL(fileToURL(dir));
	}

	public static URL directoryToBaseURL(String dirpath) {
		return forceBaseURL(fileToURL(dirpath));
	}

	public static boolean directoryIsEmpty(File dir) {
		FileFilter NON_SYS_FILTER = new FileFilter() {
			public boolean accept(File file) {
				return !file.isHidden();
			}

		};
		File[] contents = dir.listFiles(NON_SYS_FILTER);

		return (contents == null) || (contents.length == 0);
	}

	public static byte[] utf8Bytes(String str) {
		byte[] bytes = null;

		if (str != null) {
			try {
				bytes = str.getBytes("UTF-8");
			} catch (UnsupportedEncodingException uex) {
			}
		}

		return bytes;
	}

	public static File tempFile(String oldpath) {
		return tempFile(oldpath, null, null);
	}

	public static File tempFile(String oldpath, String pfxtag, String sfx) {
		String tpfxtag = pfxtag;
		String tsfx = sfx;
		if ((pfxtag == null) || (sfx == null)) {
			String pfile = getLastPathStep(oldpath);
			int i = pfile.lastIndexOf('.');
			if (pfxtag == null) {
				tpfxtag = 0 <= i ? pfile.substring(0, i) : pfile;
			}
			if (sfx == null) {
				tsfx = 0 <= i ? pfile.substring(i) : "";
			}
		}
		long tid = Thread.currentThread().getId();
		String fullpfx = "jas-" + tid + "-" + tpfxtag + "-";

		return tempFile(fullpfx, tsfx);
	}

	public static File tempFile(String pfx, String sfx) {
		File tmpf = null;
		try {
			tmpf = File.createTempFile(pfx, sfx);
		} catch (IOException iox) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker, "JAIO.tempFile: " + iox);
		}

		return tmpf;
	}

	public static boolean copyStreams(InputStream ins, OutputStream outs) {
		boolean ok = false;

		if ((ins != null) && (outs != null)) {
			try {
				byte[] buf = new byte['က'];
				int n = ins.read(buf);
				while (0 <= n) {
					outs.write(buf, 0, n);
					n = ins.read(buf);
				}
				outs.flush();
				outs.close();
				ins.close();
				ok = true;
			} catch (IOException iox) {
				logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker, "JAIO.copyStreams: " + iox);
			}
		}

		return ok;
	}

	public static OutputStream fileOutputStream(File file, boolean silent) {
		OutputStream fouts = null;
		if (file != null) {
			try {
				fouts = new FileOutputStream(file);
			} catch (IOException iox) {
				if (!silent) {
					logger.log(LoggerConfig.WARNLevel, LoggerConfig.SESSIONMarker, "JAIO.fileOutputStream: " + iox);
				}
			}
		}
		return fouts;
	}

	public static OutputStream fileOutputStream(File file) {
		return fileOutputStream(file, false);
	}

	public static OutputStream possibleFileOutputStream(File file) {
		return fileOutputStream(file, true);
	}

	private static final String QUOTED_ENC_STR = "('[^']+'|\"[^\"]+\")";

	private static final String ENC_DECL_STR = "encoding\\s*=\\s*('[^']+'|\"[^\"]+\")";

	private static final Pattern ENC_DECL_RE = Pattern.compile("encoding\\s*=\\s*('[^']+'|\"[^\"]+\")");

	public static byte[] utf8BytesForXML(String xml) {
		String xmlu8 = xml;

		if (xml.startsWith("<?")) {
			int N = xml.indexOf('>') + 1;
			String XML_DECL = xml.substring(0, N);

			Matcher ENC_DECL_MATCHER = ENC_DECL_RE.matcher(XML_DECL);
			if (ENC_DECL_MATCHER.find()) {

				String Q_ENC = ENC_DECL_MATCHER.group(1);
				int NQE = Q_ENC.length();
				String ENC = Q_ENC.substring(1, NQE - 1);

				if (!ENC.equalsIgnoreCase("utf-8")) {

					String ENC_DECL = ENC_DECL_MATCHER.group();
					String NEW_ENC_DECL = ENC_DECL.replace(ENC, "utf-8");

					xmlu8 = xml.replaceFirst(ENC_DECL, NEW_ENC_DECL);
				}
			}
		}

		return utf8Bytes(xmlu8);
	}
}
