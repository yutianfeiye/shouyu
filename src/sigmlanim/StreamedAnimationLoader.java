package sigmlanim;

import jautil.JAOptions;
import java.io.InputStream;
import java.io.StringReader;
import java.net.URL;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import sigmlanim.sigmlstream.SiGMLInputAnimGenCoordinator;
import sigmlanim.sigmlstream.interfaces.SiGMLAnimationLoadEventHandler;
import util.LoggerConfig;

public class StreamedAnimationLoader extends StreamableAnimationLoader {
	private static Logger logger = LogManager.getLogger();

	protected static final boolean RUN_SCAN_IN_THREAD = true;

	protected static final String SAL_PREFIX = "StreamedAnimationLoader: ";

	protected static final String SAL_MESSAGE = "StreamedAnimationLoader: threaded";

	protected Thread scanThread;

	public StreamedAnimationLoader(JAOptions jopts, URL url) {
		this(jopts.avatarID(), jopts, url, null);
	}

	public StreamedAnimationLoader(String av, JAOptions jopts, URL url) {
		this(av, jopts, url, null);
	}

	public StreamedAnimationLoader(JAOptions jopts, URL url, SiGMLAnimationLoadEventHandler saleh) {
		this(jopts.avatarID(), jopts, url.toString(), saleh);
	}

	public StreamedAnimationLoader(String av, JAOptions jopts, URL url, SiGMLAnimationLoadEventHandler saleh) {
		this(av, jopts, url.toString(), saleh);
	}

	public StreamedAnimationLoader(JAOptions jopts, String url) {
		this(jopts.avatarID(), jopts, url, null);
	}

	public StreamedAnimationLoader(String av, JAOptions jopts, String url) {
		this(av, jopts, url, null);
	}

	public StreamedAnimationLoader(JAOptions jopts, String url, SiGMLAnimationLoadEventHandler saleh) {
		this(jopts.avatarID(), jopts, url, saleh);
	}

	public StreamedAnimationLoader(String av, JAOptions jopts, String url, SiGMLAnimationLoadEventHandler saleh) {
		super(av, jopts, url, new SiGMLAnimation(jopts.animgenFPS(), saleh), "StreamedAnimationLoader: ",
				"StreamedAnimationLoader: threaded");

		setUpStreamedJAnimgen();
	}

	public StreamedAnimationLoader(JAOptions jopts, StringReader srdr) {
		this(jopts, srdr, null);
	}

	public StreamedAnimationLoader(JAOptions jopts, StringReader srdr, SiGMLAnimationLoadEventHandler saleh) {
		this(jopts.avatarID(), jopts, srdr, saleh);
	}

	public StreamedAnimationLoader(String av, JAOptions jopts, StringReader srdr,
			SiGMLAnimationLoadEventHandler saleh) {
		super(av, jopts, srdr, new SiGMLAnimation(jopts.animgenFPS(), saleh), "StreamedAnimationLoader: ",
				"StreamedAnimationLoader: threaded");

		setUpStreamedJAnimgen();
	}

	protected StreamedAnimationLoader(StringReader srdr) {
		super("anna", srdr, new SiGMLAnimation(25.0F), "StreamedAnimationLoader: ",
				"StreamedAnimationLoader: threaded");
	}

	public StreamedAnimationLoader(JAOptions jopts, InputStream sins) {
		this(jopts.avatarID(), jopts, sins, null);
	}

	public StreamedAnimationLoader(JAOptions jopts, InputStream sins, SiGMLAnimationLoadEventHandler saleh) {
		this(jopts.avatarID(), jopts, sins, saleh);
	}

	public StreamedAnimationLoader(String av, JAOptions jopts, InputStream sins, SiGMLAnimationLoadEventHandler saleh) {
		super(av, jopts, sins, new SiGMLAnimation(jopts.animgenFPS(), saleh), "StreamedAnimationLoader: ",
				"StreamedAnimationLoader: threaded");

		setUpStreamedJAnimgen();
	}

	public void processSiGML() {
		runSiGMLScannerThread();
	}

	public SiGMLAnimation getAnimation() {
		return (SiGMLAnimation) this.SIGNS_BUILDER;
	}

	public static void primeLoader() {
		Runnable PRIMER = new Runnable() {
			public void run() {
				StreamedAnimationLoader.logger.log(LoggerConfig.INFOLevel, LoggerConfig.THREADMarker,
						"Run: Prime StreamedAnimationLoader");

				StreamedAnimationLoader sal = new StreamedAnimationLoader(
						PrimerForAnimationLoader.getNewPrimerSource());
				sal.processSiGML();
				StreamedAnimationLoader.logger.log(LoggerConfig.STATSLevel, LoggerConfig.THREADMarker,
						"End: Prime StreamedAnimationLoader");
			}

		};
		PrimerForAnimationLoader.runLoaderPrimer(PRIMER, "StreamedAnimationLoader: ");
	}

	protected void runSiGMLScannerThread() {
		this.scanThread = new Thread() {
			public void run() {
				StreamedAnimationLoader.logger.log(LoggerConfig.INFOLevel, LoggerConfig.THREADMarker,
						"Run: StreamedAnimationLoader");
				StreamedAnimationLoader.this.runSiGMLScanner();
				StreamedAnimationLoader.logger.log(LoggerConfig.STATSLevel, LoggerConfig.THREADMarker,
						"End: StreamedAnimationLoader");
			}

		};
		this.scanThread.start();
	}

	private void setUpStreamedJAnimgen() {
		JAnimgen jag = new JAnimgen(this.JA_OPTIONS, this.JAG_CONFIG_DATA,
				this.ANIMGEN_COORDINATOR.getSiGMLSupplierForAG(), multiSignOptIsSet());
	}
}
