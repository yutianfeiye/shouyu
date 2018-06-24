package jautil;

import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.ByteBuffer;
import java.nio.channels.Channels;
import java.nio.channels.WritableByteChannel;
import java.util.zip.GZIPOutputStream;
import javax.imageio.ImageIO;

public class JAOutputStream {
	protected OutputStream outs;
	protected boolean doingGZIP = false;
	protected CopiableBytesStream outsCopiable = null;
	protected OutputStream outsMain = null;

	public JAOutputStream(String path) throws IOException {
		this(new File(path));
	}

	public JAOutputStream(File file) throws IOException {
		this(new FileOutputStream(file));
	}

	public JAOutputStream(OutputStream outs) throws IOException {
		this(outs, false);
	}

	public JAOutputStream(OutputStream outs, boolean isbuffered) throws IOException {
		this.outs = (isbuffered ? outs : new BufferedOutputStream(outs));
	}

	public void close() throws IOException {
		if (this.doingGZIP) {
			throw new IOException("JAOutputStream: close while GZIP in progress.");
		}

		this.outs.flush();
		this.outs.close();
		this.outs = null;
	}

	public void writeBoolean(boolean b) throws IOException {
		this.outs.write(b ? 1 : 0);
	}

	protected byte[] bb = new byte[4];

	public void writeInt(int i) throws IOException {
		byte[] bbuf = this.bb;
		int ib = i;
		bbuf[0] = ((byte) (ib & 0xFF));
		ib >>= 8;
		bbuf[1] = ((byte) (ib & 0xFF));
		ib >>= 8;
		bbuf[2] = ((byte) (ib & 0xFF));
		ib >>= 8;
		bbuf[3] = ((byte) (ib & 0xFF));

		this.outs.write(bbuf);
	}

	public void writeUnsignedShort(short s) throws IOException {
		byte[] bbuf = this.bb;
		short sb = s;
		bbuf[0] = ((byte) (sb & 0xFF));
		sb = (short) (sb >> 8);
		bbuf[1] = ((byte) (sb & 0xFF));

		this.outs.write(bbuf, 0, 2);
	}

	public void writeFloat(float f) throws IOException {
		writeInt(Float.floatToRawIntBits(f));
	}

	protected int sMax = 32;
	protected byte[] sBytes = new byte[this.sMax];

	public void writeString(String s) throws IOException {
		int N = s.length();

		if (this.sMax < N) {
			this.sBytes = new byte[N];
			this.sMax = N;
		}
		byte[] sbytes = this.sBytes;

		for (int i = 0; i != N; i++) {
			sbytes[i] = ((byte) s.charAt(i));
		}

		writeInt(N);
		this.outs.write(sbytes, 0, N);
	}

	protected final FourCCBytes TMP_4CC_BYTES = new FourCCBytes();

	public void write4CCString(int tag) throws IOException {
		FourCCBytes tmp4ccb = this.TMP_4CC_BYTES;
		tmp4ccb.set(tag);
		int N = tmp4ccb.n;

		writeInt(N);
		this.outs.write(tmp4ccb.bytes, 0, N);
	}

	public void writeBuf(byte[] bytes, int pos, int n) throws IOException {
		this.outs.write(bytes, pos, n);
	}

	public void writeByteBuffer(ByteBuffer bbuf) throws IOException {
		this.outs.flush();

		int N = bbuf.limit();

		WritableByteChannel chan = Channels.newChannel(this.outs);
		bbuf.rewind();
		int NW = chan.write(bbuf);
		chan.close();

		bbuf.rewind();

		if (NW != N) {
			throw new IOException("Write-Byte-buffer, too few bytes: " + NW + " (wanted " + N + ")");
		}
	}

	public void writePNGImage(BufferedImage bimg) throws IOException {
		ImageIO.write(bimg, "PNG", this.outs);
	}

	public void startGZIPBlock(int capacity) throws IOException {
		startGZIPBlock(capacity, true);
	}

	public void startGZIPBlock(int capacity, boolean doszpfx) throws IOException {
		if (this.doingGZIP) {
			throw new IOException("JAOutputStream: GZIP already in progress.");
		}
		this.outsMain = this.outs;
		this.outsCopiable = new CopiableBytesStream(capacity, doszpfx);
		this.outs = new GZIPOutputStream(this.outsCopiable);

		this.doingGZIP = true;
	}

	public void completeGZIPBlock() throws IOException {
		if (!this.doingGZIP) {
			throw new IOException("JAOutputStream: GZIP complete before start.");
		}

		this.outs = this.outsMain;
		this.outsMain = null;
		this.doingGZIP = false;

		this.outsCopiable.copyData(this.outs);

		this.outsCopiable.close();
		this.outsCopiable = null;
	}
}
