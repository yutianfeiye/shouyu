package sigmlanim.sigmlstream;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintStream;
import java.io.StringReader;
import java.net.URI;
import java.net.URL;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;
import sigmlanim.sigmlstream.interfaces.StreamedSiGMLReceiver;
import sigmlgen.SiGMLResolver;
import sigmlstream.xml.XMLUnitDOMBuilder;
import util.NetUtils;
import xml.BasicSAXHandler;

public class SiGMLSignsScanner {
	protected static final String SSX_PREFIX = "####  SiGMLSignsScanner:  ";
	private final URI BASE_URI;
	private final XMLReader XML_READER;
	private final StreamedSiGMLReceiver SIGML_RECEIVER;

	public SiGMLSignsScanner(URI base, StreamedSiGMLReceiver ssrcvr, SAXParserFactory spfac, XMLUnitDOMBuilder xudb)
			throws ParserConfigurationException, SAXException {
		this.BASE_URI = base;
		this.SIGML_RECEIVER = ssrcvr;

		SAXParser sp = spfac.newSAXParser();
		XMLReader xrdr = sp.getXMLReader();

		SiGMLUnitStreamToSignStream ssin = new SiGMLUnitStreamToSignStream(base, ssrcvr, spfac, xudb);

		this.XML_READER = new SiGMLFilter(xrdr, ssin);

		this.XML_READER.setEntityResolver(new SiGMLResolver());
		this.XML_READER.setErrorHandler(new BasicSAXHandler(null));
	}

	public void scanSiGMLURL(String SIGML_URL) {
		this.SIGML_RECEIVER.addStreamAbortCheckpoint();

		try {
			InputSource SIGML_SOURCE = getSiGMLInputSource(SIGML_URL);
			this.XML_READER.parse(SIGML_SOURCE);
			this.SIGML_RECEIVER.clearStreamAbortCheckpoint();
		} catch (IOException iox) {
			System.out.println("####  SiGMLSignsScanner:  " + iox);
			this.SIGML_RECEIVER.abortCurrentSiGMLStream();
		} catch (SAXException sx) {
			System.out.println("####  SiGMLSignsScanner:  " + sx);
			this.SIGML_RECEIVER.abortCurrentSiGMLStream();
		}
	}

	public void scanSiGMLText(StringReader SIGML_STR_RDR) {
		this.SIGML_RECEIVER.addStreamAbortCheckpoint();

		try {
			InputSource SIGML_SOURCE = getSiGMLInputSource(SIGML_STR_RDR);
			this.XML_READER.parse(SIGML_SOURCE);
			this.SIGML_RECEIVER.clearStreamAbortCheckpoint();
		} catch (IOException iox) {
			System.out.println("####  SiGMLSignsScanner:  " + iox);
			this.SIGML_RECEIVER.abortCurrentSiGMLStream();
		} catch (SAXException sx) {
			System.out.println("####  SiGMLSignsScanner:  " + sx);
			this.SIGML_RECEIVER.abortCurrentSiGMLStream();
		}
	}

	public void scanSiGMLStream(InputStream SIGML_STRM) {
		this.SIGML_RECEIVER.addStreamAbortCheckpoint();

		try {
			InputSource SIGML_SOURCE = getSiGMLInputSource(SIGML_STRM);
			this.XML_READER.parse(SIGML_SOURCE);
			this.SIGML_RECEIVER.clearStreamAbortCheckpoint();
		} catch (IOException iox) {
			System.out.println("####  SiGMLSignsScanner:  " + iox);
			try {
				SIGML_STRM.close();
			} catch (IOException ioxx) {
			}
			this.SIGML_RECEIVER.abortCurrentSiGMLStream();
		} catch (SAXException sx) {
			System.out.println("####  SiGMLSignsScanner:  " + sx);
			try {
				SIGML_STRM.close();
			} catch (IOException ioxx) {
			}
			this.SIGML_RECEIVER.abortCurrentSiGMLStream();
		}
	}

	protected InputSource getSiGMLInputSource(String URL) throws IOException {
		URI S_URI = NetUtils.getResolvedURI(this.BASE_URI, URL);

		if (S_URI == null) {
			throw new IOException("Invalid URL: " + URL);
		}
		URL S_URL = S_URI.toURL();
		InputStream S_INS = S_URL.openStream();

		return new InputSource(S_INS);
	}

	protected InputSource getSiGMLInputSource(StringReader S_RDR) {
		return new InputSource(S_RDR);
	}

	protected InputSource getSiGMLInputSource(InputStream S_STRM) {
		return new InputSource(S_STRM);
	}
}
