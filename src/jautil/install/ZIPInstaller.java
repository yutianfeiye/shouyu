package jautil.install;

import jautil.JAIO;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class ZIPInstaller extends ZIPContentsDownloader {
	protected File TARGET_DIR;

	public void installZIPContents(String zipurl, File targetdir, String tag) {
		this.TARGET_DIR = targetdir;

		String tdpath = targetdir.getName();
		try {
			tdpath = targetdir.getCanonicalPath();
		} catch (IOException iox) {
		}

		String INTRO_MSG = "####  Installing " + tag + " from: " + zipurl + " to: " + tdpath + JAIO.FILE_SEPARATOR;

		downloadZIP(zipurl, tag, INTRO_MSG);
	}

	protected void processZipEntry(ZipInputStream zins, ZipEntry zentry) throws IOException {
		File T_DIR = this.TARGET_DIR;

		long Z_SIZE = zentry.getSize();
		String Z_NAME = zentry.getName();
		long Z_TIME = zentry.getTime();

		System.out.println("Transferring file: " + Z_NAME + "  size=" + Z_SIZE);

		File tfile = new File(T_DIR, Z_NAME);
		JAIO.validateOutputFile(tfile);

		OutputStream outs = new FileOutputStream(tfile);

		long n = 0L;
		int m = zins.read(this.BUFFER);
		while (0 < m) {
			outs.write(this.BUFFER, 0, m);
			n += m;
			m = zins.read(this.BUFFER);
		}

		outs.flush();
		outs.close();

		if (n != Z_SIZE) {
			throw new IOException("Bad ZIP entry size: " + Z_NAME + "  expected: " + Z_SIZE + " got: " + n);
		}

		tfile.setLastModified(Z_TIME);
	}
}
