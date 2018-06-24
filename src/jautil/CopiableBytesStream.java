package jautil;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;

public class CopiableBytesStream extends ByteArrayOutputStream {
	private boolean doSizePrefix;

	public CopiableBytesStream(int capacity) {
		this(capacity, true);
	}

	public CopiableBytesStream(int capacity, boolean doszpfx) {
		super(capacity);
		this.doSizePrefix = doszpfx;
	}

	public void copyData(JAOutputStream jouts) throws IOException {
		int N = size();
		if (this.doSizePrefix)
			jouts.writeInt(N);
		jouts.writeBuf(this.buf, 0, N);
	}

	public void copyData(OutputStream outs) throws IOException {
		int N = size();
		if (this.doSizePrefix)
			writeIntLE(N, outs);
		outs.write(this.buf, 0, N);
	}

	private static void writeIntLE(int i, OutputStream outs) throws IOException {
		int val = i;
		for (int j = 0; j != 4; j++) {
			outs.write(val & 0xFF);
			val >>= 8;
		}
	}
}
