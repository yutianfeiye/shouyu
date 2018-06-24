package jautil.install;

import java.io.FilterInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InterruptedIOException;
import javax.swing.ProgressMonitor;

public class ProgressInputStream extends FilterInputStream {
	private final String DESCRIPTION;
	private final int LIMIT;
	private int nRead;
	private int percent;
	private ProgressMonitor monitor;

	public ProgressInputStream(InputStream ins, int limit, String desc) {
		super(ins);

		this.DESCRIPTION = desc;
		this.LIMIT = limit;
		this.nRead = 0;
		this.percent = 0;
	}

	public void close() throws IOException {
		checkProgress(this.LIMIT - this.nRead);
		super.close();
	}

	public int read() throws IOException {
		int ch = super.read();
		checkProgress(1);
		return ch;
	}

	public int read(byte[] b) throws IOException {
		int n = super.read(b);
		checkProgress(n);
		return n;
	}

	public int read(byte[] b, int off, int len) throws IOException {
		int n = super.read(b, off, len);
		checkProgress(n);
		return n;
	}

	private void checkProgress(int n) throws IOException {
		if ((this.nRead == 0) && (this.monitor == null)) {
			createMonitor();
		}

		this.nRead += n;
		if (this.LIMIT < this.nRead) {
			this.nRead = this.LIMIT;
		}

		int newpc = Math.round(100.0F * this.nRead / this.LIMIT);
		if (newpc != this.percent) {
			this.percent = newpc;
			if (this.monitor != null) {
				this.monitor.setProgress(this.percent);
				if (this.monitor.isCanceled()) {
					InterruptedIOException iiox = new InterruptedIOException("user cancelled");

					iiox.bytesTransferred = this.nRead;
					throw iiox;
				}
			}
		}
	}

	private void createMonitor() {
		String DESCRIPTION_TEXT = "JASigning: Downloading " + this.DESCRIPTION + ".";

		this.monitor = new ProgressMonitor(null, DESCRIPTION_TEXT, null, 0, 100);
	}
}
