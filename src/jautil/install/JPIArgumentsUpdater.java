package jautil.install;

import jautil.JAIO;
import jautil.platform.OpSystem;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintStream;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.xml.transform.Result;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

public class JPIArgumentsUpdater {
	protected static final String EOLN_STR = System.getProperty("line.separator");
	protected static final byte[] EOLN_BYTES = EOLN_STR.getBytes();

	protected static final String PATH_SEP = System.getProperty("path.separator");

	protected static final String FILE_SEP = System.getProperty("file.separator");

	protected static final String[] JPI_VERSION_MAC_XSLT_LINES = { "<?xml version='1.0'?>",
			"<!-- Extract Java plugin version no. from Apple Mac OS X JavaPreferences plist. -->",
			"<xsl:transform xmlns:xsl='http://www.w3.org/1999/XSL/Transform' version='1.0'>",
			"    <xsl:output method='text' />", "    <xsl:template match='/'>",
			"        <xsl:value-of select='plist/dict/key[.=\"Plugin Version\"]/following-sibling::string' />",
			"    </xsl:template>", "</xsl:transform>" };

	protected static final String BJV_WIN_KEY = "HKLM\\SOFTWARE\\JavaSoft\\Java Runtime Environment\\BrowserJavaVersion";

	protected static final String[] BJV_WIN_SCRIPT_LINES = { "' WSH script to get Browser Java Version", "'",
			"Dim wshShell, bjvKey, bjVersion", "Set wshShell = WScript.CreateObject(\"WScript.Shell\")",
			"bjvKey = \"HKLM\\SOFTWARE\\JavaSoft\\Java Runtime Environment\\BrowserJavaVersion\"",
			"bjVersion = wshShell.RegRead( bjvKey )", "WScript.StdOut.Write bjVersion", "'", "' End WSH script." };

	protected static final String DEPLOYMENT_PROPS_DIR_WIN = System.getProperty("user.home")
			+ "\\Application Data\\Sun\\Java\\Deployment";

	protected static final String DEPLOYMENT_PROPS_DIR_MAC = System.getProperty("user.home") + "/Library/Caches/Java";

	protected static final String DEPLOYMENT_PROPS_DIR = OpSystem.IS_MAC() ? DEPLOYMENT_PROPS_DIR_MAC
			: DEPLOYMENT_PROPS_DIR_WIN;

	protected static final File DEPLOYMENT_PROPS_FILE = new File(DEPLOYMENT_PROPS_DIR, "deployment.properties");

	protected static final File NEW_DEPLOYMENT_PROPS_FILE = new File(DEPLOYMENT_PROPS_DIR, "deployment-NEW.properties");

	protected static final File SAVE_DEPLOYMENT_PROPS_FILE = new File(DEPLOYMENT_PROPS_DIR,
			"deployment-OLD.properties");

	protected static final String JPI_VERSION_MAC_XSLT_TEXT = joinLines(JPI_VERSION_MAC_XSLT_LINES);

	protected static final String VERSION_KEY_MAC = "Plugin Version";

	protected static final String JPREFS_PLIST_PATH_MAC = System.getProperty("user.home")
			+ "/Library/Preferences/com.apple.java.JavaPreferences.plist";

	protected static final String PLUTIL_JPREFS_CONVERT_CMD_MAC = "plutil -convert xml1 -o /dev/stdout "
			+ JPREFS_PLIST_PATH_MAC;

	protected static final String JPI_ARGS_KEY_RE = "deployment\\.javapi\\.jre\\.(.+)\\.args";

	protected static final Pattern JPI_ARGS_KEY_PAT = Pattern.compile("deployment\\.javapi\\.jre\\.(.+)\\.args");

	protected static final String CSCRIPT_JPI_VERSION_CMD_WIN = "cscript //nologo ";

	protected List<Properties> javaDeploymentPropertySets;

	protected List<String> javaDeploymentPSComments;

	protected String jpiVersion;

	protected String fullVersion;

	protected Properties argsProps;

	protected String argsKey;

	protected String jpiArgsText;

	protected ArrayList<String> jpiArgs;

	protected transient boolean argsHaveChanged;

	protected ArrayList<String> newJPIArgs;

	protected String newJPIArgsText;

	public JPIArgumentsUpdater(String libpath, int szmb, String duppistr) {
		this.javaDeploymentPropertySets = new ArrayList();
		this.javaDeploymentPSComments = new ArrayList();
		try {
			readJavaDeploymentPropertySets();
			findJPIVersion();

			if (this.jpiVersion != null) {
				findJPIArgsKey();
				setJPIArgs();

				checkUpdateArgs(libpath, szmb, duppistr);
			}
		} catch (IOException iox) {
			iox.printStackTrace();
		} catch (TransformerException tx) {
			tx.printStackTrace();
		}
	}

	public String getJPIArgs() {
		return this.jpiArgsText;
	}

	public String getNewJPIArgs() {
		return this.newJPIArgsText;
	}

	protected void setJPIArgs() {
		this.jpiArgsText = (this.argsKey == null ? null : this.argsProps.getProperty(this.argsKey));

		this.jpiArgs = new ArrayList();

		if (this.jpiArgsText != null) {
			int N = this.jpiArgsText.length();
			int i = 0;
			while (i != N) {
				int j = this.jpiArgsText.indexOf("-", i + 1);
				if (j < 0) {
					j = N;
				}
				this.jpiArgs.add(this.jpiArgsText.substring(i, j).trim());
				i = j;
			}
		}
	}

	protected void findJPIVersion() throws IOException, TransformerException {
		if (OpSystem.IS_MAC()) {
			findJPIVersion_MAC();
		} else {
			findJPIVersion_WIN();
		}
	}

	protected void findJPIVersion_MAC() throws IOException, TransformerException {
		Source macxformsrc = new StreamSource(new StringReader(JPI_VERSION_MAC_XSLT_TEXT));

		TransformerFactory tfactory = TransformerFactory.newInstance();
		Transformer fvxform = tfactory.newTransformer(macxformsrc);

		Source jprefssrc = getMacJavaPrefsXMLSource();

		Writer vwrtr = new StringWriter();
		Result vrslt = new StreamResult(vwrtr);

		fvxform.transform(jprefssrc, vrslt);

		this.jpiVersion = vwrtr.toString();
	}

	protected Source getMacJavaPrefsXMLSource() throws IOException {
		String jprefstxt = getCommandOutputText(PLUTIL_JPREFS_CONVERT_CMD_MAC);

		Matcher jpmatcher = Pattern.compile("(.+</plist>)(.*)", 32).matcher(jprefstxt);
		jpmatcher.matches();

		return new StreamSource(new StringReader(jpmatcher.group(1)));
	}

	protected void findJPIVersion_WIN() throws IOException {
		File bjvtmpf = JAIO.tempFile("bjv-script", ".vbs");
		Writer bjvtmpwrtr = new FileWriter(bjvtmpf);
		for (String ln : BJV_WIN_SCRIPT_LINES) {
			bjvtmpwrtr.write(ln);
			bjvtmpwrtr.write("\r\n");
		}
		bjvtmpwrtr.close();

		String bjvtmppath = "\"" + bjvtmpf.getCanonicalPath() + "\"";

		String csbjvcmd = "cscript //nologo " + bjvtmppath;

		this.jpiVersion = getCommandOutputText(csbjvcmd).trim();

		bjvtmpf.delete();
	}

	protected void findJPIArgsKey() {
		this.argsKey = null;

		Iterator<Properties> psiter = this.javaDeploymentPropertySets.iterator();
		while ((this.argsKey == null) && (psiter.hasNext())) {

			Properties PROPS = (Properties) psiter.next();
			Iterator<?> kiter = PROPS.keySet().iterator();

			while ((this.argsKey == null) && (kiter.hasNext())) {
				String KEY = (String) kiter.next();

				Matcher jakmtchr_k = JPI_ARGS_KEY_PAT.matcher(KEY);
				if ((jakmtchr_k.matches()) && (jakmtchr_k.group(1).startsWith(this.jpiVersion))) {
					this.argsProps = PROPS;
					this.argsKey = KEY;
					this.fullVersion = jakmtchr_k.group(1);
				}
			}
		}
	}

	protected void readJavaDeploymentPropertySets() {
		ArrayList<String> dpslines = null;

		try {
			InputStream dpfins = new FileInputStream(DEPLOYMENT_PROPS_FILE);
			dpslines = readLines(dpfins, "iso-8859-1");
		} catch (IOException iox) {
			System.out.println("####  JPIArgumentsUpdater: unable to read deployment properties file:");

			System.out.println(iox);
		}

		if (dpslines != null) {
			makeJDPSets(dpslines);
		}
	}

	protected void makeJDPSets(ArrayList<String> dpslines) {
		int i = 0;
		int N = dpslines.size();
		while (i != N) {

			int LO = i;

			String ln0 = (String) dpslines.get(i);
			String pscomment = "";
			if (ln0.startsWith("#")) {
				pscomment = ln0.substring(1);
				i++;
				if (((String) dpslines.get(i)).startsWith("#")) {
					i++;
				}
			}

			this.javaDeploymentPSComments.add(pscomment);

			int hi = N;
			while (i != hi) {
				String LN_I = (String) dpslines.get(i);
				if (LN_I.startsWith("#"))
					hi = i;
				else {
					i++;
				}
			}

			addDeploymentPropertySet(dpslines, LO, hi);
		}
	}

	protected void addDeploymentPropertySet(ArrayList<String> dpslines, int LO, int HI) {
		Properties pset = new Properties();

		try {
			ByteArrayOutputStream psetbaos = new ByteArrayOutputStream();
			for (int i = LO; i != HI; i++) {
				psetbaos.write(((String) dpslines.get(i)).getBytes());
				psetbaos.write(EOLN_BYTES);
			}
			psetbaos.flush();
			byte[] psbytes = psetbaos.toByteArray();
			psetbaos.close();

			pset.load(new ByteArrayInputStream(psbytes));
		} catch (IOException iox) {
			iox.printStackTrace();
		}

		this.javaDeploymentPropertySets.add(pset);
	}

	protected void checkUpdateArgs(String libpath, int szmb, String duppistr) {
		initNewJPIArgs();

		checkUpdatePathsDefArg("java.library.path", fixLibPath(libpath), duppistr);
		checkUpdateMemArg("Xms", szmb);

		if (OpSystem.IS_MAC()) {
			checkUpdateArgs_MAC();
		} else {
			checkUpdateArgs_WIN();
		}

		setNewJPIArgsText();
	}

	protected String fixLibPath(String libpath) {
		String ESCAPED_FS = FILE_SEP.replaceAll("\\\\", "\\\\\\\\");

		return OpSystem.IS_WIN() ? libpath.replaceAll(ESCAPED_FS, "/") : libpath;
	}

	protected void initNewJPIArgs() {
		this.newJPIArgs = new ArrayList(this.jpiArgs);
		this.newJPIArgsText = null;
		this.argsHaveChanged = false;
	}

	protected void setNewJPIArgsText() {
		System.out.println("####  Initial JPI args: " + this.jpiArgsText);

		if (this.argsHaveChanged) {
			StringBuilder buf = new StringBuilder();
			for (String arg : this.newJPIArgs) {
				buf.append(' ').append(arg);
			}

			this.newJPIArgsText = buf.substring(1);
			buf.setLength(0);
		}

		System.out.println("####  Final JPI args:   " + (this.argsHaveChanged ? this.newJPIArgsText : "(unchanged)"));
	}

	protected void checkUpdateArgs_MAC() {
	}

	protected void checkUpdateArgs_WIN() {
		checkUpdateDefArg("sun.java2d.opengl", "true");
		checkUpdateDefArg("sun.java2d.noddraw", "true");
	}

	protected void checkUpdatePathsDefArg(String aname, String path, String duppistr) {
		String argpfx = "-D" + aname + "=";

		int i = findArg(argpfx);

		if (i < 0) {
			updateArg(i, argpfx + path);

		} else {

			String oldval = ((String) this.jpiArgs.get(i)).substring(argpfx.length());

			if (!oldval.contains(path)) {
				String rdpval = removeDuplicatePaths(oldval, duppistr);

				String newval = path + PATH_SEP + rdpval;

				updateArg(i, argpfx + newval);
			}
		}
	}

	protected void checkUpdateDefArg(String aname, String val) {
		String argpfx = "-D" + aname + "=";

		int i = findArg(argpfx);

		if ((i < 0) || (!argValueEquals(i, argpfx, val))) {
			updateArg(i, argpfx + val);
		}
	}

	protected void checkUpdateMemArg(String atag, int newszmb) {
		String argpfx = "-" + atag;

		int i = findArg(argpfx);

		if ((i < 0) || (sizeArgIsBigger(i, argpfx, newszmb * 1024))) {
			updateArg(i, argpfx + newszmb + "m");
		}
	}

	protected String removeDuplicatePaths(String paths, String dupstr) {
		StringBuilder buf = new StringBuilder();
		String DUP_STR_L = dupstr.toLowerCase();

		for (String p : paths.split(PATH_SEP)) {
			if (!p.toLowerCase().contains(DUP_STR_L)) {
				buf.append(p).append(PATH_SEP);
			}
		}

		int B_LEN = buf.length();
		return B_LEN == 0 ? "" : buf.substring(0, B_LEN - PATH_SEP.length());
	}

	protected boolean argValueEquals(int i, String argpfx, String val) {
		String argval = ((String) this.jpiArgs.get(i)).substring(argpfx.length());

		return argval.equals(val);
	}

	protected boolean sizeArgIsBigger(int i, String argpfx, long newszkb) {
		char scale = '\000';

		String arg = (String) this.jpiArgs.get(i);
		String szstr = arg.substring(argpfx.length()).toLowerCase();

		if ((szstr.endsWith("m")) || (szstr.endsWith("k"))) {
			int n = szstr.length();
			scale = szstr.charAt(n - 1);
			szstr = szstr.substring(0, n - 1);
		}

		long szkb = 0L;
		try {
			szkb = Long.parseLong(szstr);
		} catch (NumberFormatException nfx) {
			System.out.println("JPIArgumentsUpdater.updateMemArg(): " + nfx);
		}

		if (scale == 'm') {
			szkb *= 1024L;
		} else if (scale != 'k') {
			szkb /= 1024L;
		}

		return szkb < newszkb;
	}

	protected void updateArg(int i, String arg) {
		this.argsHaveChanged = true;

		if (i < 0) {
			this.newJPIArgs.add(arg);
		} else {
			this.newJPIArgs.set(i, arg);
		}
	}

	protected int findArg(String argpfx) {
		int N = this.jpiArgs.size();
		int i = 0;
		int ii = N;
		while (i != ii) {
			if (((String) this.jpiArgs.get(i)).startsWith(argpfx))
				ii = i;
			else {
				i++;
			}
		}
		return i == N ? -1 : i;
	}

	public boolean saveAndUpdateJDPFile() {
		boolean ok = false;
		try {
			writeNewJDPFile();
			copyFile(DEPLOYMENT_PROPS_FILE, SAVE_DEPLOYMENT_PROPS_FILE);
			moveFile(NEW_DEPLOYMENT_PROPS_FILE, DEPLOYMENT_PROPS_FILE);
			ok = true;
		} catch (IOException iox) {
			System.out.println("####  Java deployment properties file update failure ...");

			System.out.println(iox);
		}

		return ok;
	}

	protected void writeNewJDPFile() throws IOException {
		this.argsProps.setProperty(this.argsKey, this.newJPIArgsText);

		OutputStream dpouts = new FileOutputStream(NEW_DEPLOYMENT_PROPS_FILE);

		int N = this.javaDeploymentPropertySets.size();
		for (int i = 0; i != N; i++) {
			String comment = (String) this.javaDeploymentPSComments.get(i);
			if ((comment != null) && (comment.length() == 0)) {
				comment = null;
			}

			((Properties) this.javaDeploymentPropertySets.get(i)).store(dpouts, comment);
		}

		dpouts.close();
	}

	protected static String getCommandOutputText(String cmd) throws IOException {
		BufferedReader cmdrdr = bufferedReader(Runtime.getRuntime().exec(cmd).getInputStream());

		StringBuilder buf = new StringBuilder();
		String ln = cmdrdr.readLine();
		while (ln != null) {
			buf.append(ln).append(EOLN_STR);
			ln = cmdrdr.readLine();
		}

		cmdrdr.close();

		return buf.toString();
	}

	protected static void moveFile(File f, File fmove) throws IOException {
		if (OpSystem.IS_WIN()) {

			boolean dok = fmove.delete();
			if (!dok) {
				System.out.println("####  delete old properties file failed.");
			}
		}

		boolean mvok = f.renameTo(fmove);

		if (!mvok) {
			throw new IOException("rename failed for file " + f.getCanonicalPath());
		}
	}

	protected static void copyFile(File f, File fcopy) throws IOException {
		if (OpSystem.IS_MAC()) {
			copyFile_MAC(f, fcopy);
		} else {
			copyFile_WIN(f, fcopy);
		}
	}

	protected static void copyFile_WIN(File f, File fcopy) throws IOException {
		InputStream fins = new FileInputStream(f);
		OutputStream fcouts = new FileOutputStream(fcopy);

		int b = fins.read();
		while (0 <= b) {
			fcouts.write(b);
			b = fins.read();
		}
		fcouts.flush();
		fcouts.close();
		fins.close();
	}

	protected static void copyFile_MAC(File f, File fcopy) throws IOException {
		boolean ok = false;

		String cmd = "cp -p -f " + f.getCanonicalPath() + " " + fcopy.getCanonicalPath();
		try {
			int status = Runtime.getRuntime().exec(cmd).waitFor();
			ok = status == 0;
		} catch (InterruptedException ix) {
			ix.printStackTrace();
		}

		if (!ok) {
			throw new IOException("copy command failed for file: " + f.getCanonicalPath());
		}
	}

	protected static String joinLines(String[] lns) {
		StringBuilder buf = new StringBuilder();
		for (String ln : lns) {
			buf.append(ln).append(EOLN_STR);
		}

		return buf.toString();
	}

	protected static BufferedReader bufferedReader(InputStream ins) throws IOException {
		return new BufferedReader(new InputStreamReader(ins));
	}

	protected static BufferedReader bufferedReader(InputStream ins, String enc) throws IOException {
		return new BufferedReader(new InputStreamReader(ins, enc));
	}

	protected static ArrayList<String> readLines(InputStream ins) throws IOException {
		return readLines(bufferedReader(ins));
	}

	protected static ArrayList<String> readLines(InputStream ins, String enc) throws IOException {
		return readLines(bufferedReader(ins, enc));
	}

	protected static ArrayList<String> readLines(BufferedReader brdr) throws IOException {
		ArrayList<String> lines = new ArrayList();
		String ln = brdr.readLine();
		while (ln != null) {
			lines.add(ln);
			ln = brdr.readLine();
		}

		brdr.close();

		return lines;
	}
}
