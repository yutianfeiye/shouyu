package jautil;

public class FourCCBytes {
	public int n;

	public byte[] bytes;

	protected char[] sChars;

	public FourCCBytes() {
		this.n = 0;
		this.bytes = new byte[4];
		this.sChars = null;
	}

	public FourCCBytes(int n, byte[] bb) {
		this.bytes = new byte[4];
		this.sChars = null;
		set(n, bb);
	}

	public FourCCBytes(int tag) {
		this.bytes = new byte[4];
		this.sChars = null;
		set(tag);
	}

	public void set(int n, byte[] bb) {
		this.n = n;
		for (int i = 0; i != 4; i++) {

			this.bytes[i] = (i < n ? bb[i] : 0);
		}
	}

	public void set(int tag4cc) {
		int tbytes = tag4cc;
		int len = -1;
		byte[] bb = this.bytes;

		for (int i = 0; i != 4; i++) {
			byte b = (byte) (tbytes & 0xFF);
			tbytes >>= 8;

			if (((b == 0) || (b == 32)) && (len < 0)) {
				len = i;
			}
			bb[i] = (len < 0 ? b : 0);
		}

		this.n = (len < 0 ? 4 : len);
	}

	public String toString() {
		if (this.sChars == null) {
			this.sChars = new char[4];
		}
		for (int i = 0; i != this.n; i++) {
			this.sChars[i] = ((char) (0xFF & this.bytes[i]));
		}
		return new String(this.sChars, 0, this.n);
	}

	public String toStringPadded() {
		if (this.sChars == null) {
			this.sChars = new char[4];
		}
		for (int i = 0; i != this.n; i++) {
			this.sChars[i] = ((char) (0xFF & this.bytes[i]));
		}
		for (int i = this.n; i != 4; i++) {
			this.sChars[i] = ' ';
		}
		return new String(this.sChars, 0, 4);
	}

	public int toTag4CC() {
		byte[] BB = this.bytes;

		return (((0xFF & BB[3]) << 8 | 0xFF & BB[2]) << 8 | 0xFF & BB[1]) << 8 | 0xFF & BB[0];
	}
}
