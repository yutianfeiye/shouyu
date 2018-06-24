package sigmlanim;

import java.io.FilterInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintStream;
import java.net.Socket;
import sigmlinlib.SiGMLInputServiceBase;
import sigmlinlib.SiGMLInputServiceBase.ServiceOperations;

public class InputConnectionsService extends SiGMLInputServiceBase {
	public InputConnectionsService(boolean rprt, String tag, int inport, int stopport, StreamOfStreamsHandler soshdlr)
			throws IOException {
		super(rprt, (tag == null ? "" : new StringBuilder().append(tag).append(" ").toString()) + "input streams",
				inport, stopport, new StreamOfStreamsOperations(soshdlr));
	}   

	protected static class StreamOfStreamsOperations implements SiGMLInputServiceBase.ServiceOperations {
		private StreamOfStreamsHandler STREAM_OF_STREAMS_HANDLER;

		public StreamOfStreamsOperations(StreamOfStreamsHandler soshdlr) {
			this.STREAM_OF_STREAMS_HANDLER = soshdlr;
		}

		public void beginService() {
			this.STREAM_OF_STREAMS_HANDLER.streamOfStreamsStarted();
		}

		public void processNextClientConnection(Socket ccsock) throws IOException {
			InputConnectionsService.WaitableInputStream wins = new InputConnectionsService.WaitableInputStream(
					ccsock.getInputStream());

			this.STREAM_OF_STREAMS_HANDLER.acceptStream(wins);

			try {
				wins.waitForClose();
			} catch (InterruptedException ix) {
				throw new IOException("interrupted: " + ix);
			}

			ccsock.close();
			ccsock = null;
		}

		public void endService() {
			this.STREAM_OF_STREAMS_HANDLER.streamOfStreamsStopped();
		}
	}

	protected static class WaitableInputStream extends FilterInputStream {
		private boolean closed;

		public WaitableInputStream(InputStream ins) {
			super(ins);
			this.closed = false;
		}

		public synchronized void close() throws IOException {
			if (this.closed) {
				System.out.println("####  Waitable input stream: extra close().");
			} else {
				super.close();
				this.closed = true;
				notify();
			}
		}

		public synchronized void waitForClose() throws InterruptedException {
			while (!this.closed) {
				wait();
			}
		}
	}
}
