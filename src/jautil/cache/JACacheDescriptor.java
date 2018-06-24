package jautil.cache;

import jautil.JAIO;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintStream;
import java.io.PrintWriter;

public class JACacheDescriptor {
	private static final String PFX = "####  JACacheDescriptor: ";
	private final String ENTRY_NAME;
	private final String DATA_URL;
	private final long TIME_STAMP;
	private final int LENGTH;

	public JACacheDescriptor(String enm, String durl, long tstamp, int len) {
		this.ENTRY_NAME = enm;
		this.DATA_URL = durl;

		this.TIME_STAMP = tstamp;
		this.LENGTH = len;
	}

	public String entryName() {
		return this.ENTRY_NAME;
	}

	public String url() {
		return this.DATA_URL;
	}

	public long timeStamp() {
		return this.TIME_STAMP;
	}

	public int dataLength() {
		return this.LENGTH;
	}

	public boolean matches(JACacheDescriptor cd) {
		return (matchesTimeAndLength(cd.timeStamp(), cd.dataLength())) && (matchesNameAndURL(cd.entryName(), cd.url()));
	}

	public boolean matchesNameAndURL(String enm, String durl) {
		return (entryName().equals(enm)) && (matchesURL(durl));
	}

	public boolean matchesURL(String durl) {
		return url().equals(durl);
	}

	public boolean matchesTimeAndLength(long ts, int len) {
		return (timeStamp() == ts) && (dataLength() == len);
	}

	public void write(OutputStream outs) {
		PrintWriter pwrtr = new PrintWriter(outs);

		pwrtr.println(entryName());
		pwrtr.println(url());
		pwrtr.println(timeStamp());
		pwrtr.println(dataLength());

		pwrtr.flush();
		pwrtr.close();
	}

	public static JACacheDescriptor readDescriptor(InputStream dins) {
		String[] dlines = null;
		try {
			dlines = JAIO.getLines(dins);
		} catch (IOException iox) {
			System.out.println("####  JACacheDescriptor: readDescriptor(): " + iox);
		}

		return dlines == null ? null : makeDescriptor(dlines);
	}

	public static JACacheDescriptor makeDescriptor(String[] dlines) {
		JACacheDescriptor cd = null;
		String msg = null;

		int N = 4;
		if (dlines.length == 4) {
			try {
				String av = dlines[0];
				String url = dlines[1];
				long tstamp = Long.parseLong(dlines[2]);
				int len = Integer.parseInt(dlines[3]);

				cd = new JACacheDescriptor(av, url, tstamp, len);
			} catch (NumberFormatException nfx) {
				msg = "" + nfx;
			}
		} else {
			msg = "descriptor line count is " + dlines.length + " not " + 4 + ".";
		}

		if (msg != null) {
			System.out.println("####  JACacheDescriptor: makeDescriptor(): " + msg);
		}

		return cd;
	}
}
