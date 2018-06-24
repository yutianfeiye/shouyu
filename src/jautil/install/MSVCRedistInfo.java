package jautil.install;

public class MSVCRedistInfo {
	public static final String MSVC_VERSION_FOR_JAGLIB_PROPERTY = "ja.msvc.version.for.jaglib";

	private static final String DEFAULT_VERSION = "2010";

	private static final String[] KNOWN_VERSIONS = { "2008", "2010" };

	private static final int IX_UNKNOWN_VERSION = KNOWN_VERSIONS.length;

	private static final String[] GUID_32 = { "a5c84275-3b97-4ab7-a40d-3802b2af5fc2",
			"a7b7a05e-6de6-4d3a-a423-37bf0912db84" };

	private static final String[] GUID_64 = { "ba9257ca-337f-4b40-8c14-157cfdffee4e",
			"bd512d9e-43c8-4655-81bf-9350143d5867" };

	private static final String MS_DOWNLOAD_URL_STEM = "http://www.microsoft.com/downloads/details.aspx?FamilyId=";

	public static String getErrorText() {
		String[] lines = new String[0];

		String VER = System.getProperty("ja.msvc.version.for.jaglib", "2010");

		int i = 0;
		int ii = IX_UNKNOWN_VERSION;
		while (i != ii) {
			if (KNOWN_VERSIONS[i].equals(VER))
				ii = i;
			else {
				i++;
			}
		}
		if (i == IX_UNKNOWN_VERSION) {

			String[] VAGUE_LINES = { "JAGLib Native Library Link Error.", "",
					"On Windows this may be because you need to install",
					"a suitable Visual Studio C++ Redistributable package." };

			lines = VAGUE_LINES;
		} else {
			String[] MESSAGE_LINES = { "JAGLib Native Library Link Error.", "",
					"On Windows this may be because you need to install", "32-bit and/or 64-bit versions of the",
					"Visual Studio C++ " + VER + " Redistributable package", "from Microsoft -- see:", "",
					"32-bit: http://www.microsoft.com/downloads/details.aspx?FamilyId=" + GUID_32[i],
					"64-bit: http://www.microsoft.com/downloads/details.aspx?FamilyId=" + GUID_64[i], "" };

			lines = MESSAGE_LINES;
		}

		StringBuilder TXT_BUF = new StringBuilder();
		for (String s : lines) {
			TXT_BUF.append(s).append("\r\n");
		}

		return TXT_BUF.toString();
	}
}
