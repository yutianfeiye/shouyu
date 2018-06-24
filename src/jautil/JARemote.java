package jautil;

public class JARemote {
	public static final String FORCE_REMOTE_JA_HOME_KEY = "ja.force.remote.ja.home";

	public static final boolean FORCE_REMOTE_JA_HOME() {
		String FRJA_PROP = System.getProperty("ja.force.remote.ja.home");
		return (FRJA_PROP == null) || (!FRJA_PROP.equalsIgnoreCase("false"));
	}
}
