package sigmlanim;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintStream;
import java.net.URI;
import java.net.URL;
import java.util.ArrayList;
import sigmlgen.GSiGMLSign;
import sigmlinlib.SiGMLInLib;
import util.InputStreamAsBytes;
import util.SILTimer;
import xml.XMLBytesDecoder;

public class SiGMLReader {
	protected static final String EOL = System.getProperty("line.separator", "\r\n");

	protected URI baseURI;

	protected SiGMLInLib sigmlInLib;

	public SiGMLReader(URI baseuri) {
		this.baseURI = baseuri;
		this.sigmlInLib = new SiGMLInLib();
		primeSiGMLInLib(this.sigmlInLib);
	}

	public AnimatedSign[] readString(String sigmlstr) throws IOException {
		SILTimer tmr = new SILTimer();

		GSiGMLSign[] gssigns = this.sigmlInLib.sigmlToGSiGMLSigns(sigmlstr, this.baseURI);
		tmr.showTimeMS("####  SiGML signs-generation:  t");

		return animatedSignsFor(gssigns);
	}

	public AnimatedSign[] readURL(URL url) throws IOException {
		System.out.println("####  Reading SiGML URL: " + url.toString());
		SILTimer tmr = new SILTimer();

		InputStream urlins = url.openStream();
		InputStreamAsBytes urlisab = new InputStreamAsBytes(urlins);
		byte[] urlbytes = urlisab.getBytes();
		int N = urlbytes.length;

		tmr.showTimeMS("####  Get SiGML URL (" + N + " bytes), t");

		XMLBytesDecoder urlxbd = new XMLBytesDecoder(urlbytes);

		String sigml = urlxbd.getXMLString();

		return readString(sigml);
	}

	public AnimatedSign[] readFile(String path) throws IOException {
		return readFile(new File(path));
	}

	public AnimatedSign[] readFile(File f) throws IOException {
		BufferedReader brdr = new BufferedReader(new FileReader(f));

		ArrayList<String> lines = new ArrayList();
		String line = brdr.readLine();
		while (line != null) {
			lines.add(line);
			line = brdr.readLine();
		}

		int N = lines.size();
		int chcount = N * EOL.length();
		for (int i = 0; i != N; i++) {
			chcount += ((String) lines.get(i)).length();
		}

		StringBuffer sbuf = new StringBuffer(chcount);
		for (int i = 0; i != N; i++) {
			sbuf.append((String) lines.get(i)).append(EOL);
		}
		String sigml = sbuf.toString();

		return readString(sigml);
	}

	protected AnimatedSign[] animatedSignsFor(GSiGMLSign[] gssigns) {
		AnimatedSign[] signs = null;

		if (gssigns != null) {

			int N = gssigns.length;
			signs = new AnimatedSign[N];

			for (int i = 0; i != N; i++) {
				signs[i] = new AnimatedSign(gssigns[i]);
			}
		}
		return signs;
	}

	private static final String H_SIGML = "<?xml version=\"1.0\" encoding=\"utf-8\"?>" + EOL + "<sigml>" + EOL
			+ "  <hns_sign gloss=\"junk\">" + EOL + "    <hamnosys_manual>" + EOL
			+ "      <hamfist/><hamextfingerol/><hampalml/>" + EOL + "    </hamnosys_manual>" + EOL + "  </hns_sign>"
			+ EOL + "</sigml>" + EOL;

	public static void primeSiGMLInLib(SiGMLInLib sil) {
		SILTimer tmr = new SILTimer();
		GSiGMLSign[] junksigns = sil.sigmlToGSiGMLSigns(H_SIGML);
		int N = junksigns.length;
		junksigns = null;
		tmr.showTimeMS("####  SiGMLInLib  prime-time");
	}
}
