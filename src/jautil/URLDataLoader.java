package jautil;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InterruptedIOException;
import java.io.PrintStream;

public class URLDataLoader {
	protected static final String UDL_NAME_PFX = "URLDataLoader: ";
	protected static final String UDL_PFX = "####  URLDataLoader: ";
	protected final String SOURCE_URL;
	protected final byte[] URL_DATA;

	public static byte[] getURLData(String url, String tag) {
		URLDataLoader udl = new URLDataLoader(url, tag);
		return udl.urlData();
	}

	public URLDataLoader(String url, String tag) {
		this.SOURCE_URL = url;

		byte[] udata = null;

		if (this.SOURCE_URL != null) {
			InputStream ins = null;

			boolean usepm = isRemoteURL(url);
			//ins = usepm ? JAIO.getProgressMonitorInputStream(url, tag) : JAIO.getInputStream(JAIO.fileForFileURL(url));
			ins = JAIO.getInputStream(new File(url));

			if (ins != null) {
				int sz = -1;
				udata = readData(ins, sz);
			}
		}

	
		this.URL_DATA = udata;
	}

	private static boolean isRemoteURL(String url) {
		return (url.startsWith("http://")) || (url.startsWith("https://"));
	}

	public byte[] urlData() {
		return this.URL_DATA;
	}

	public String url() {
		return this.SOURCE_URL;
	}

	private void reportFail(String msg) {
		String msgu = msg + ", URL=" + this.SOURCE_URL;
		System.out.println("####  URLDataLoader: " + msgu);
	}

	private byte[] readData(InputStream ins, int size) {
		byte[] data = null;

		try {
			data = 0 < size ? readDirect(ins, size) : readIndirect(ins);
		} catch (InterruptedIOException iiox) {
			reportFail("User cancelled input");
		} catch (IOException iox) {
			reportFail("Remote read error (" + iox + ")");
		}

		return data;
	}

	private byte[] readIndirect(InputStream ins) throws IOException {
		int BUF_SZ = 8192;
		ByteArrayOutputStream baos = new ByteArrayOutputStream(65536);
		byte[] buf = new byte[' '];

		int n = ins.read(buf, 0, 8192);
		while (0 < n) {
			baos.write(buf, 0, n);
			n = ins.read(buf, 0, 8192);
		}

		ins.close();

		byte[] data = baos.toByteArray();
		baos = null;

		return data;
	}

	private byte[] readDirect(InputStream ins, int size) throws IOException {
		int N = size;

		byte[] data = new byte[N];
		int i = 0;
		int n = ins.read(data, i, N - i);
		if (0 < n) {
			i += n;
		}

		int m = 1;
		while ((i != N) && (0 < n)) {
			n = ins.read(data, i, N - i);
			if (0 < n)
				i += n;
			m++;
		}

		if (i == N) {
			int b = ins.read();
			while (0 <= b) {
				i++;
				b = ins.read();
			}
		}

		ins.close();

		if (i != N) {
			throw new IOException("Bad download length. Expected " + N + " but got " + i + ".");
		}

		return data;
	}
}
