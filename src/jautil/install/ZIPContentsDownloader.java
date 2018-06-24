package jautil.install;

import jautil.JAIO;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintStream;
import java.net.URLConnection;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public abstract class ZIPContentsDownloader {
	protected static final String MESSAGE_PFX = "####  ZIPContentsDownloader(): ";
	protected static final int BUFFER_SIZE = 4096;
	protected final byte[] BUFFER;
	protected int errorCount;

	public ZIPContentsDownloader() {
		this.BUFFER = new byte['က'];
		this.errorCount = -1;
	}

	public boolean zipDownloadIsOK() {
		boolean OK = this.errorCount == 0;
		this.errorCount = -1;

		return OK;
	}

	protected void downloadZIP(String zipurl, String tag, String msg) {
		URLConnection zuconnect = JAIO.getURLConnection(zipurl);
		downloadZIP(zuconnect, tag, msg);
	}

	protected void downloadZIP(URLConnection zuconnect, String tag, String msg) {
		this.errorCount = 0;

		try {
			int N = zuconnect.getContentLength();

			InputStream pmins = JAIO.getProgressMonitorInputStream(zuconnect, tag);

			ZipInputStream zins = new ZipInputStream(pmins);

			System.out.println(msg);
			System.out.println("####  Download size=" + N);

			ZipEntry zentry = zins.getNextEntry();
			while (zentry != null) {
				processZipEntry(zins, zentry);
				zentry = zins.getNextEntry();
			}

			pmins.close();
		} catch (IOException iox) {
			this.errorCount += 1;
			System.out.println("####  ZIPContentsDownloader(): " + iox);
		} catch (Exception x) {
			this.errorCount += 1;
			System.out.println("####  ZIPContentsDownloader(): " + x);
		}
	}

	protected abstract void processZipEntry(ZipInputStream paramZipInputStream, ZipEntry paramZipEntry)
			throws IOException;
}
