package jautil;

import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.util.zip.GZIPInputStream;
import javax.imageio.ImageIO;

public class JAInputStream {
	protected InputStream ins;
	protected InputStream insUnzipped;

	public JAInputStream(InputStream instrm) throws IOException {
		this(instrm, false);
	}

	protected JAInputStream(InputStream instrm, boolean isbuffered) throws IOException {
		this.ins = (isbuffered ? instrm : new BufferedInputStream(instrm));
	}

	public void close() throws IOException {
		this.ins.close();
		this.ins = null;
	}

	public int read() throws IOException {
		return this.ins.read();
	}

	public boolean readBoolean() throws IOException {
		int b = this.ins.read();
		if (((b < 0 ? 1 : 0) | (1 < b ? 1 : 0)) != 0) {
			throw new IOException("Invalid boolean: " + b);
		}
		return b == 1;
	}

	public int readInt() throws IOException {
		int b0 = this.ins.read() & 0xFF;
		int b1 = this.ins.read() & 0xFF;
		int b2 = this.ins.read() & 0xFF;
		int b3 = this.ins.read() & 0xFF;

		return ((b3 << 8 | b2) << 8 | b1) << 8 | b0;
	}

	public short readUnsignedShort() throws IOException {
		int b0 = this.ins.read() & 0xFF;
		int b1 = this.ins.read() & 0xFF;

		return (short) (b1 << 8 | b0);
	}

	public float readFloat() throws IOException {
		return Float.intBitsToFloat(readInt());
	}

	protected int sMax = 32;
	protected char[] sChars = new char[this.sMax];

	public String readString() throws IOException {
		int N = readInt();

		if (this.sMax < N) {
			this.sChars = new char[N];
			this.sMax = N;
		}
		char[] schars = this.sChars;

		for (int i = 0; i != N; i++) {
			schars[i] = ((char) (this.ins.read() & 0xFF));
		}

		return new String(schars, 0, N);
	}

	public BufferedImage readImage() throws IOException {
		return ImageIO.read(this.ins);
	}

	public BufferedImage readImage(boolean compressed) throws IOException {
		byte[] imgbytes = readBytes(compressed);
		InputStream imgins = new ByteArrayInputStream(imgbytes);
		return ImageIO.read(imgins);
	}

	public void readBuf(byte[] bb, int pos, int n) throws IOException {
		int P_LIM = pos + n;
		int p = pos;
		while (p != P_LIM) {
			int nb = this.ins.read(bb, p, P_LIM - p);
			if (0 < nb) {
				p += nb;
			} else if (nb < 0) {
				throw new IOException("JAInputStream prematurely exhausted.");
			}
		}
	}

	public byte[] readBytes(boolean compressed) throws IOException {
		int N = readInt();

		byte[] bytes = new byte[N];
		readBuf(bytes, 0, N);

		byte[] unzipbytes = null;

		if (compressed) {
			InputStream bais = new ByteArrayInputStream(bytes);
			InputStream uzis = new GZIPInputStream(bais);
			JAInputStream uzjins = new JAInputStream(uzis);

			int N_UZ = uzjins.readInt();
			unzipbytes = new byte[N_UZ];
			uzjins.readBuf(unzipbytes, 0, N_UZ);
		}

		return compressed ? unzipbytes : bytes;
	}

	public ByteBuffer readByteBuffer(int N) throws IOException {
		ByteBuffer dbbuf = ByteBuffer.allocateDirect(N);
		dbbuf.order(ByteOrder.nativeOrder());
		dbbuf.clear();

		ReadableByteChannel chan = Channels.newChannel(this.ins);
		int NR = chan.read(dbbuf);
		chan.close();
		dbbuf.rewind();

		if (NR != N) {
			throw new IOException("Byte-buffer deficit: got " + NR + " bytes (wanted " + N + ").");
		}

		return dbbuf;
	}

	public void switchToUnGZIP() throws IOException {
		this.insUnzipped = this.ins;
		this.ins = new GZIPInputStream(this.ins);
	}
}
