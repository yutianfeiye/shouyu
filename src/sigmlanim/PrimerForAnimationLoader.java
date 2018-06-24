package sigmlanim;

import java.io.StringReader;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import util.LoggerConfig;
import util.SILTimer;

public class PrimerForAnimationLoader {
	private static Logger logger= LogManager.getLogger();;;

	private static final String EOL = "\n";

	private static final String H_SIGML = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<sigml>\n  <hns_sign gloss=\"junk\">\n    <hamnosys_manual>\n      <hamfist/><hamextfingerol/><hampalml/>\n    </hamnosys_manual>\n  </hns_sign>\n</sigml>\n";

	public static StringReader getNewPrimerSource() {
		return new StringReader(
				"<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<sigml>\n  <hns_sign gloss=\"junk\">\n    <hamnosys_manual>\n      <hamfist/><hamextfingerol/><hampalml/>\n    </hamnosys_manual>\n  </hns_sign>\n</sigml>\n");
	}

	public static void runLoaderPrimer(Runnable PRIMER, String PREFIX) {
		SILTimer tmr = new SILTimer(logger, LoggerConfig.LOGLevel, LoggerConfig.THREADMarker);
		PRIMER.run();
		tmr.showTimeMS(PREFIX + "Loader primed: time ");
	}
}
