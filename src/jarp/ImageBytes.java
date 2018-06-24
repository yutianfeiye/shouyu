package jarp;

import jautil.CopiableBytesStream;
import jautil.JAInputStream;
import jautil.JAOutputStream;
import java.awt.image.BufferedImage;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.channels.Channels;
import java.nio.channels.WritableByteChannel;
import javax.imageio.ImageIO;

public class ImageBytes {
	private static final int BYTES_PER_INT = 4;
	public final int W;
	public final int H;
	public final ByteBuffer IMG_BYTE_BUFFER;

	public ImageBytes(int w, int h, byte[] imgbytes) {
		this.W = w;
		this.H = h;
		this.IMG_BYTE_BUFFER = makeDirectByteBuffer(imgbytes);
	}

	public ImageBytes(BufferedImage bimg) {
		this(bimg, true, true);
	}

	public ImageBytes(BufferedImage bimg, boolean israwRGBA, boolean vflippedbimg) {
		this.W = bimg.getWidth();
		this.H = bimg.getHeight();

		this.IMG_BYTE_BUFFER = makeBytesFromBufferedImage(bimg, israwRGBA, vflippedbimg);
	}

	public ImageBytes(JAInputStream jins, boolean COMPRESSED, boolean IS_V22) throws IOException {
		if (!IS_V22) {
			if (COMPRESSED) {
				jins.switchToUnGZIP();
			}

			int N_IMG = jins.readInt();

			this.W = jins.readInt();
			this.H = jins.readInt();

			String CTAG = COMPRESSED ? " (compressed)" : "";
			int N_COMPUTED = imageSize();
			if (N_COMPUTED != N_IMG) {
				throw new IOException("ImageBytes ctor" + CTAG + ", bad image-size: " + "stated=" + N_IMG
						+ ", computed=" + N_COMPUTED);
			}

			this.IMG_BYTE_BUFFER = jins.readByteBuffer(N_IMG);

		} else {

			int n = jins.readInt();
			if (COMPRESSED) {
				jins.switchToUnGZIP();
				n = jins.readInt();
			}

			int N_ALL = n;

			this.W = jins.readInt();
			this.H = jins.readInt();

			String CTAG = COMPRESSED ? " (compressed)" : "";
			int N_COMPUTED = totalSize();
			if (N_COMPUTED != N_ALL) {
				throw new IOException(
						"ImageBytes ctor" + CTAG + ", bad size: " + "stated=" + N_ALL + ", computed=" + N_COMPUTED);
			}

			this.IMG_BYTE_BUFFER = jins.readByteBuffer(imageSize());
		}
	}

	public void save(JAOutputStream jouts, boolean compress) throws IOException {
		int N_ALL = totalSize();

		if (compress) {
			jouts.startGZIPBlock(N_ALL / 3, true);
		}

		jouts.writeInt(N_ALL);
		writeToStream(jouts, false);

		if (compress) {
			jouts.completeGZIPBlock();
		}
	}

	public void writeToStream(JAOutputStream jouts, boolean pfxbcount) throws IOException {
		if (pfxbcount) {
			jouts.writeInt(imageSize());
		}

		jouts.writeInt(this.W);
		jouts.writeInt(this.H);

		jouts.writeByteBuffer(this.IMG_BYTE_BUFFER);
	}

	public void saveAsPNG(String outfile, boolean vflippng) throws IOException {
		BufferedImage IMG = toImageForPNG(vflippng);

		OutputStream fouts = new FileOutputStream(outfile);
		ImageIO.write(IMG, "PNG", fouts);
	}

	public void saveAsPNG(JAOutputStream jouts, boolean vflippng) throws IOException {
		BufferedImage IMG = toImageForPNG(vflippng);

		CopiableBytesStream cbs = new CopiableBytesStream(totalSize() / 4, true);
		ImageIO.write(IMG, "PNG", cbs);
		cbs.copyData(jouts);
	}

	protected int totalSizeWithPrefix() {
		return 4 + totalSize();
	}

	protected int totalSize() {
		return 8 + imageSize();
	}

	protected int imageSize() {
		return 4 * this.H * this.W;
	}

	protected ByteBuffer makeBytesFromBufferedImage(BufferedImage bimg, boolean isRGBA, boolean vflippedbimg) {
		int WW = bimg.getWidth();
		int HH = bimg.getHeight();

		byte[] imgbytes = new byte[imageSize()];
		int b = 0;

		if (vflippedbimg) {

			if (isRGBA) {
				for (int y = 0; y != HH; y++) {
					for (int x = 0; x != WW; x++) {
						rgbaToBytesLE(bimg.getRGB(x, y), imgbytes, b);
						b += 4;
					}

				}
			} else {
				for (int y = 0; y != HH; y++) {
					for (int x = 0; x != WW; x++) {
						bgraToBytesLE(bimg.getRGB(x, y), imgbytes, b);
						b += 4;
					}

				}
			}
		} else if (isRGBA) {
			for (int y = HH - 1; y + 1 != 0; y--) {
				for (int x = 0; x != WW; x++) {
					rgbaToBytesLE(bimg.getRGB(x, y), imgbytes, b);
					b += 4;
				}

			}
		} else {
			for (int y = HH - 1; y + 1 != 0; y--)
				for (int x = 0; x != WW; x++) {
					bgraToBytesLE(bimg.getRGB(x, y), imgbytes, b);
					b += 4;
				}
		}
		return makeDirectByteBuffer(imgbytes);
	}

	protected BufferedImage toImageForPNG(boolean vflipimg) {
		BufferedImage IMG = new BufferedImage(this.W, this.H, 2);

		byte[] bb = new byte[4];

		this.IMG_BYTE_BUFFER.rewind();

		for (int y = 0; y != this.H; y++) {

			int Y_IMG = vflipimg ? y : this.H - 1 - y;

			for (int x = 0; x != this.W; x++) {

				this.IMG_BYTE_BUFFER.get(bb);
				int argb = 0;
				argb |= bb[3] & 0xFF;
				argb <<= 8;
				argb |= bb[0] & 0xFF;
				argb <<= 8;
				argb |= bb[1] & 0xFF;
				argb <<= 8;
				argb |= bb[2] & 0xFF;

				IMG.setRGB(x, Y_IMG, argb);
			}
		}

		this.IMG_BYTE_BUFFER.rewind();

		return IMG;
	}

	protected static void rgbaToBytesLE(int pxl, byte[] bb, int pos) {
		int rgba = pxl;

		bb[pos] = ((byte) rgba);
		bb[(pos + 1)] = ((byte) (rgba >>= 8));
		bb[(pos + 2)] = ((byte) (rgba >>= 8));
		bb[(pos + 3)] = ((byte) (rgba >>= 8));
	}

	protected static void bgraToBytesLE(int pxl, byte[] bb, int pos) {
		int bgra = pxl;

		bb[(pos + 2)] = ((byte) bgra);
		bb[(pos + 1)] = ((byte) (bgra >>= 8));
		bb[pos] = ((byte) (bgra >>= 8));
		bb[(pos + 3)] = ((byte) (bgra >>= 8));
	}

	protected static byte[] intToBytesLE(int i, byte[] bb) {
		int ii = i;

		bb[0] = ((byte) ii);
		bb[1] = ((byte) (ii >>= 8));
		bb[2] = ((byte) (ii >>= 8));
		bb[3] = ((byte) (ii >>= 8));

		return bb;
	}

	protected static byte[] intAsBytesLE(int i) {
		byte[] bb = new byte[4];

		return intToBytesLE(i, bb);
	}

	protected static int bytesAsIntLE(byte[] bb, int pos) {
		int i = 0;
		i |= bb[(pos + 3)] & 0xFF;
		i <<= 8;
		i |= bb[(pos + 2)] & 0xFF;
		i <<= 8;
		i |= bb[(pos + 1)] & 0xFF;
		i <<= 8;
		i |= bb[(pos + 0)] & 0xFF;

		return i;
	}

	protected static int bytesAsIntLE(byte[] bb) {
		return bytesAsIntLE(bb, 0);
	}

	private static ByteBuffer makeDirectByteBuffer(byte[] bb) {
		int N = bb.length;
		ByteBuffer dbbuf = ByteBuffer.allocateDirect(N);
		dbbuf.order(ByteOrder.nativeOrder());

		dbbuf.clear();
		dbbuf.put(bb);
		dbbuf.rewind();

		return dbbuf;
	}

	private static void byteBufferToStream(OutputStream outs, ByteBuffer bbuf) throws IOException {
		int N = bbuf.limit();

		WritableByteChannel chan = Channels.newChannel(outs);
		bbuf.rewind();
		int NW = chan.write(bbuf);
		chan.close();

		bbuf.rewind();

		if (NW != N) {
			throw new IOException("Image save-bytes limited: " + NW + " (wanted " + N + ")");
		}
	}
}
