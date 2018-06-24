package jautil;

public class FourCCUtil {
	public static final int NULL_FOURCC = 0;

	private static final int SPACE_AT_3 = 536870912;

	private static final int SPACE_AT_2 = 2097152;

	private static final int SPACE_AT_1 = 8192;

	private static final int SPACE_AT_0 = 32;

	public static int fourCCInt(String name) {
		int N = name.length();

		int ch0 = N < 1 ? '\000' : name.charAt(0) & 0xFF;
		int ch1 = N < 2 ? '\000' : name.charAt(1) & 0xFF;
		int ch2 = N < 3 ? '\000' : name.charAt(2) & 0xFF;
		int ch3 = N < 4 ? '\000' : name.charAt(3) & 0xFF;

		return ((ch3 << 8 | ch2) << 8 | ch1) << 8 | ch0;
	}

	protected static final FourCCBytes TMP_4CC_BYTES = new FourCCBytes();

	public static String fourCCString(int tag) {
		TMP_4CC_BYTES.set(tag);

		return TMP_4CC_BYTES.toString();
	}

	public static String fourCCStringPadded(int tag) {
		TMP_4CC_BYTES.set(tag);

		return TMP_4CC_BYTES.toStringPadded();
	}

	public static void fourCCBytes(int tag, FourCCBytes fccb) {
		fccb.set(tag);
	}

	public static int fixFourCCInt(int tag) {
		return ((tag & 0x20000000) == 536870912) || ((tag & 0x200000) == 2097152) || ((tag & 0x2000) == 8192)
				|| ((tag & 0x2000) == 32) ? new FourCCBytes(tag).toTag4CC() : tag;
	}

	public static boolean isNull(int fourcc) {
		return fourcc == 0;
	}

	public static boolean isNonNull(int fourcc) {
		return fourcc != 0;
	}
}
