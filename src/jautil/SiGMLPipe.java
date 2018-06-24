package jautil;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;
import java.io.Writer;
import player.JALoadingPlayer.SiGMLPipeWriter;

public class SiGMLPipe implements SiGMLPipeWriter {
	private final PipedInputStream SIGML_IN_STREAM;
	private final Writer SIGML_WRITER;
	private final boolean DO_SIGML_WRAP;
	private boolean isTerminated;

	public SiGMLPipe(boolean dosigmlwrap) throws IOException {
		this.DO_SIGML_WRAP = dosigmlwrap;
		PipedOutputStream pouts = new PipedOutputStream();
		this.SIGML_IN_STREAM = new PipedInputStream(pouts);
		this.SIGML_WRITER = new BufferedWriter(new OutputStreamWriter(pouts));

		if (this.DO_SIGML_WRAP) {
			this.SIGML_WRITER.write("<sigml>\n");
			this.SIGML_WRITER.flush();
		}
		this.isTerminated = false;
	}

	public SiGMLPipe() throws IOException {
		this(true);
	}

	public InputStream getSiGMLInputStream() {
		return this.SIGML_IN_STREAM;
	}

	public void appendSiGMLFragment(String sigmlfrag) throws IOException {
		if (this.isTerminated) {
			throw new IOException("Cannot write to SiGML pipe after termination.");
		}

		this.SIGML_WRITER.write(sigmlfrag);
		this.SIGML_WRITER.flush();
	}

	public void terminatePipe() throws IOException {
		if (this.isTerminated) {
			throw new IOException("SiGML pipe is already terminated.");
		}
		if (this.DO_SIGML_WRAP) {
			this.SIGML_WRITER.write("</sigml>\n");
		}
		this.SIGML_WRITER.flush();
		this.SIGML_WRITER.close();
		this.isTerminated = true;
	}
}
