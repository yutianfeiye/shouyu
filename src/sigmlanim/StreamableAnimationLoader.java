package sigmlanim;

import jautil.JAIO;
import jautil.JAOptions;
import java.io.InputStream;
import java.io.StringReader;
import java.net.URI;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParserFactory;
import javax.xml.transform.TransformerException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.xml.sax.SAXException;
import sigmlanim.sigmlstream.SiGMLInputAnimGenCoordinator;
import sigmlanim.sigmlstream.SiGMLSignsScanner;
import sigmlanim.sigmlstream.interfaces.SiGMLAnimationBuildHandler;
import sigmlstream.xml.XMLUnitDOMBuilder;
import util.LoggerConfig;
import util.NetUtils;

public abstract class StreamableAnimationLoader {
	private static Logger logger = LogManager.getLogger();;

	protected final String AVATAR;

	protected final JAOptions JA_OPTIONS;

	protected final JAnimgenConfigData JAG_CONFIG_DATA;

	protected final String SIGML_URL;

	protected final StringReader SIGML_READER;

	protected final InputStream SIGML_STREAM;

	protected final SiGMLAnimationBuildHandler SIGNS_BUILDER;

	protected final SiGMLInputAnimGenCoordinator ANIMGEN_COORDINATOR;

	protected final SiGMLSignsScanner SIGML_SCANNER;

	protected final boolean multiSignOptIsSet() {
		if (this.JA_OPTIONS != null) {
		}

		return this.JA_OPTIONS.getBooleanProperty("animgen.do.multi.sign.sigml");
	}

	public StreamableAnimationLoader(String av, JAOptions jopts, String url, SiGMLAnimationBuildHandler sabldr,
			String TAG, String MESSAGE) {
		this.AVATAR = av;
		this.JA_OPTIONS = jopts;
		this.SIGML_URL = url;
		this.SIGML_READER = null;
		this.SIGML_STREAM = null;
		this.SIGNS_BUILDER = sabldr;
		this.ANIMGEN_COORDINATOR = new SiGMLInputAnimGenCoordinator(this.SIGNS_BUILDER);

		this.JAG_CONFIG_DATA = new JAnimgenConfigData(av, jopts);
		this.SIGML_SCANNER = doMakeSiGMLScanner(TAG, MESSAGE);
	}

	public StreamableAnimationLoader(String av, JAOptions jopts, StringReader srdr, SiGMLAnimationBuildHandler sabldr,
			String TAG, String MESSAGE) {
		this.AVATAR = av;
		this.JA_OPTIONS = jopts;
		this.SIGML_URL = null;
		this.SIGML_READER = srdr;
		this.SIGML_STREAM = null;
		this.SIGNS_BUILDER = sabldr;
		this.ANIMGEN_COORDINATOR = new SiGMLInputAnimGenCoordinator(this.SIGNS_BUILDER);

		this.JAG_CONFIG_DATA = new JAnimgenConfigData(av, jopts);
		this.SIGML_SCANNER = doMakeSiGMLScanner(TAG, MESSAGE);
	}

	public StreamableAnimationLoader(String av, JAOptions jopts, InputStream ins, SiGMLAnimationBuildHandler sabldr,
			String TAG, String MESSAGE) {
		this.AVATAR = av;
		this.JA_OPTIONS = jopts;
		this.SIGML_URL = null;
		this.SIGML_READER = null;
		this.SIGML_STREAM = ins;
		this.SIGNS_BUILDER = sabldr;
		this.ANIMGEN_COORDINATOR = new SiGMLInputAnimGenCoordinator(this.SIGNS_BUILDER);

		this.JAG_CONFIG_DATA = new JAnimgenConfigData(av, jopts);
		this.SIGML_SCANNER = doMakeSiGMLScanner(TAG, MESSAGE);
	}

	protected StreamableAnimationLoader(String av, StringReader srdr, SiGMLAnimationBuildHandler sabldr, String TAG,
			String MESSAGE) {
		this.AVATAR = av;
		this.JA_OPTIONS = null;
		this.SIGML_URL = null;
		this.SIGML_READER = srdr;
		this.SIGML_STREAM = null;
		this.SIGNS_BUILDER = sabldr;
		this.ANIMGEN_COORDINATOR = new SiGMLInputAnimGenCoordinator(this.SIGNS_BUILDER);

		this.JAG_CONFIG_DATA = null;
		this.SIGML_SCANNER = doMakeSiGMLScanner(TAG, MESSAGE);
	}

	public abstract void processSiGML();

	public abstract SiGMLAnimation getAnimation();

	protected SiGMLSignsScanner doMakeSiGMLScanner(String TAG, String MESSAGE) {
		SiGMLSignsScanner scanner = null;
		try {
			scanner = makeSiGMLScanner(MESSAGE);
		} catch (ParserConfigurationException pcx) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.SIGMLMarker, TAG + pcx);
		} catch (SAXException sx) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.SIGMLMarker, TAG + sx);
		} catch (TransformerException tx) {
			logger.log(LoggerConfig.WARNLevel, LoggerConfig.SIGMLMarker, TAG + tx);
		}

		return scanner;
	}

	protected SiGMLSignsScanner makeSiGMLScanner(String MESSAGE)
			throws ParserConfigurationException, SAXException, TransformerException {
		logger.log(LoggerConfig.INFOLevel, LoggerConfig.SIGMLMarker, MESSAGE);

		URI baseuri = null;
		if (this.JA_OPTIONS != null) {
			String baseurl = this.JA_OPTIONS.defaultSiGMLBaseURL();
			baseuri = NetUtils.getResolvedURI(null, baseurl);
		}

		if (this.SIGML_URL != null) {
			String newbase = JAIO.tidyBaseURL(this.SIGML_URL);
			logger.log(LoggerConfig.TRACELevel, LoggerConfig.SIGMLMarker,
					"StreamableAnimationLoader: Base from SiGML URL: " + newbase);

			baseuri = NetUtils.getResolvedURI(baseuri, newbase);
		}

		SAXParserFactory spfac = SAXParserFactory.newInstance();
		spfac.setValidating(false);
		spfac.setNamespaceAware(true);

		XMLUnitDOMBuilder xudb = new XMLUnitDOMBuilder();

		return new SiGMLSignsScanner(baseuri, this.ANIMGEN_COORDINATOR, spfac, xudb);
	}

	protected void runSiGMLScanner() {
		if (this.SIGML_URL != null) {
			this.SIGML_SCANNER.scanSiGMLURL(this.SIGML_URL);
		} else if (this.SIGML_READER != null) {
			this.SIGML_SCANNER.scanSiGMLText(this.SIGML_READER);
		} else {
			this.SIGML_SCANNER.scanSiGMLStream(this.SIGML_STREAM);
		}
	}
}
