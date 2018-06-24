package player;

public class FrameDataExchange {
	private final SynchBuf EMPTY_DATA_BUF;

	private final SynchBuf FULL_DATA_BUF;

	public FrameDataExchange() {
		this.EMPTY_DATA_BUF = new SynchBuf();
		this.FULL_DATA_BUF = new SynchBuf();
	}

	public byte[] getEmptyForFull(byte[] fbuf) throws InterruptedException {
		byte[] ebuf = this.EMPTY_DATA_BUF.get();
		this.FULL_DATA_BUF.put(fbuf);
		return ebuf;
	}

	public byte[] getFullForEmpty(byte[] ebuf) throws InterruptedException {
		this.EMPTY_DATA_BUF.put(ebuf);
		byte[] fbuf = this.FULL_DATA_BUF.get();
		return fbuf;
	}

	private static class SynchBuf {
		private byte[] buf = null;

		public synchronized void put(byte[] bf) {
			this.buf = bf;
			notify();
		}

		public synchronized byte[] get() throws InterruptedException {
			if (this.buf == null)
				wait();
			byte[] bf = this.buf;
			this.buf = null;
			return bf;
		}
	}
}
