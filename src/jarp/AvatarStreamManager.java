package jarp;

import jautil.JAIO;
import jautil.JAOptions;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InterruptedIOException;
import java.io.PrintStream;
import java.net.URLConnection;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import util.LoggerConfig;

public class AvatarStreamManager {
	private static Logger logger= LogManager.getLogger();;;

	protected static final String ASM_NAME_PREFIX = "AvatarStreamManager: ";

	protected static final String ASM_MESSAGE_PREFIX = "####  AvatarStreamManager: ";

	protected static final String AVATAR_DEF_TAG = "Avatar Definition";

	protected static final String AVATAR_DEF_FILE_JARP = "avatardef.jarp";

	protected static final String AVATAR_DEF_FILE_ARP = "avatardef.arp";

	protected final JAOptions JA_OPTIONS;

	protected final ASMClient CLIENT;

	protected final String AVATAR_NAME;

	protected final String NON_STANDARD_AVATAR_URL;

	protected final boolean AVATAR_URL_IS_REMOTE;

	protected final String AVATAR_URL;

	protected String failureMessage;

	protected InputStream avatarStream;

	protected Thread downloadThread;

	public AvatarStreamManager(JAOptions jaopts, ASMClient client, String av, String avnonstdurl) {
		this.JA_OPTIONS = jaopts;
		this.CLIENT = client;
		this.AVATAR_NAME = av;
		this.NON_STANDARD_AVATAR_URL = avnonstdurl;

		String avrutest = this.NON_STANDARD_AVATAR_URL != null ? this.NON_STANDARD_AVATAR_URL
				: this.JA_OPTIONS.avatarConfigBaseURL();

		this.AVATAR_URL_IS_REMOTE = avrutest.startsWith("http:");

		this.AVATAR_URL = determineInputURL();

		if (this.AVATAR_URL != null) {
			if (this.AVATAR_URL_IS_REMOTE) {

				setUpDownloadThread();

			} else {

				this.avatarStream = JAIO.getInputStream(this.AVATAR_URL);

				if (this.avatarStream == null) {
					this.failureMessage = ("(Unexpectedly) invalid avatar URL " + this.AVATAR_URL);
				}
			}
		}
	}

	public synchronized boolean isFinished() {
		return this.downloadThread == null;
	}

	protected synchronized void setFinished() {
		this.downloadThread = null;
	}

	public String getAvatarURL() {
		return this.AVATAR_URL;
	}

	public InputStream getAvatarStream() throws IOException {
		if (!isFinished()) {
			throw new IOException("AvatarStreamManager: stream requested during remote download.");
		}

		if (this.failureMessage != null) {
			throw new IOException("AvatarStreamManager: " + this.failureMessage);
		}
		return this.avatarStream;
	}

	protected String determineInputURL() {
		String avurl = null;

		if (this.NON_STANDARD_AVATAR_URL != null) {

			avurl = this.NON_STANDARD_AVATAR_URL;

			if (!JAIO.isValidURL(avurl)) {
				this.failureMessage = ("Missing avatar definition, URL=" + avurl);
			}
		} else {
			String AV = this.AVATAR_NAME;

			avurl = null;

			if (avurl == null) {
				this.failureMessage = ("Missing definition for avatar: " + AV);
			}
		}

		return this.failureMessage != null ? null : avurl;
	}

	protected void acceptDownloadFailure(String msg) {
		System.out.println("####  AvatarStreamManager: Download failed.");

		this.failureMessage = msg;
		setFinished();
		this.CLIENT.notifyLocalStreamIsReady();
	}

	protected void acceptDownloadSuccess(byte[] avdata) {
		System.out.println("####  AvatarStreamManager: Download complete, length=" + avdata.length);

		this.avatarStream = new ByteArrayInputStream(avdata);
		setFinished();
		this.CLIENT.notifyLocalStreamIsReady();
	}

	protected void setUpDownloadThread() {
		System.out.println("####  AvatarStreamManager: Starting avatar download, URL=" + this.AVATAR_URL);

		this.downloadThread = new DownloadThread(this.AVATAR_URL);
		this.downloadThread.start();
	}

	protected class DownloadThread extends Thread {
		private final String REMOTE_URL;

		private final InputStream REMOTE_STREAM;

		private final int REMOTE_SIZE;

		public DownloadThread(String url) {
			this.REMOTE_URL = url;
			URLConnection ruc = JAIO.getURLConnection(this.REMOTE_URL);

			int sz = -1;
			InputStream ins = null;

			if (ruc != null) {
				sz = ruc.getContentLength();
				ins = JAIO.getProgressMonitorInputStream(ruc, "Avatar Definition");
			}

			this.REMOTE_SIZE = sz;
			this.REMOTE_STREAM = ins;
		}

		public void run() {
			AvatarStreamManager.logger.log(LoggerConfig.INFOLevel, LoggerConfig.THREADMarker, "Run: Avatar Download");
			if (this.REMOTE_STREAM == null) {
				fail("(Unexpected) connection failure");
			} else {
				doDownload();
			}
			AvatarStreamManager.logger.log(LoggerConfig.STATSLevel, LoggerConfig.THREADMarker, "End: Avatar Download");
		}

		private void succeed(byte[] avdata) {
			AvatarStreamManager.this.acceptDownloadSuccess(avdata);
		}

		private void fail(String msg) {
			String msgu = msg + ", URL=" + this.REMOTE_URL;
			AvatarStreamManager.this.acceptDownloadFailure(msgu);
		}

		private void doDownload() {
			try {
				if (0 < this.REMOTE_SIZE) {
					doDirectDownload();
				} else {
					doIndirectDownload();
				}
			} catch (InterruptedIOException iiox) {
				fail("User cancelled avatar input");
			} catch (IOException iox) {
				fail("Remote read error (" + iox.getMessage() + ")");
			}
		}

		private void doIndirectDownload() throws IOException {
			System.out.println("####  AvatarStreamManager: Indirect download.");

			ByteArrayOutputStream baos = new ByteArrayOutputStream(524288);

			byte[] buf = new byte[' '];

			int n = this.REMOTE_STREAM.read(buf, 0, 8192);
			while (0 < n) {
				baos.write(buf, 0, n);
				n = this.REMOTE_STREAM.read(buf, 0, 8192);
			}

			byte[] avdata = baos.toByteArray();
			baos = null;

			succeed(avdata);
		}

		private void doDirectDownload() throws IOException {
			int N = this.REMOTE_SIZE;

			byte[] avdata = new byte[N];
			int i = 0;
			int n = this.REMOTE_STREAM.read(avdata, i, N - i);
			if (0 < n) {
				i += n;
			}
			int m = 1;
			while ((i != N) && (0 < n)) {
				n = this.REMOTE_STREAM.read(avdata, i, N - i);
				if (0 < n)
					i += n;
				m++;
			}

			System.out.println("####  AvatarStreamManager: Download read()-count=" + m);

			if (i == N) {

				int b = this.REMOTE_STREAM.read();
				if (0 <= b) {

					avdata = getExtraBytes(avdata, b);
				}

			} else {
				System.out.println("####  AvatarStreamManager: Unexpectedly low download length.");

				byte[] xavdata = avdata;
				avdata = new byte[i];
				System.arraycopy(xavdata, 0, avdata, 0, i);

				xavdata = null;
			}
			this.REMOTE_STREAM.close();
			succeed(avdata);
		}

		public byte[] getExtraBytes(byte[] xavdata, int xb0) throws IOException {
			System.out.println("####  AvatarStreamManager: Download unexpected extra bytes.");

			int N = xavdata.length;

			int b = xb0;
			ByteArrayOutputStream baos = new ByteArrayOutputStream(8192);
			while (0 <= b) {
				baos.write(b);
				b = this.REMOTE_STREAM.read();
			}

			byte[] baosdata = baos.toByteArray();
			baos = null;

			byte[] avdata = new byte[N + baosdata.length];
			System.arraycopy(xavdata, 0, avdata, 0, N);
			System.arraycopy(baosdata, 0, avdata, N, baosdata.length);

			xavdata = null;
			baosdata = null;

			return avdata;
		}
	}

	public static abstract interface ASMClient {
		public abstract void notifyLocalStreamIsReady();
	}
}
