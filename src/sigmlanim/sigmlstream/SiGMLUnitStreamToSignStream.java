package sigmlanim.sigmlstream;

import casxml.CASHandler;
import java.io.PrintStream;
import java.net.URI;
import java.util.ArrayList;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParserFactory;
import org.w3c.dom.DOMConfiguration;
import org.w3c.dom.DOMImplementation;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.ls.DOMImplementationLS;
import org.w3c.dom.ls.LSSerializer;
import org.xml.sax.SAXException;
import sigmlanim.AnimatedSign;
import sigmlanim.sigmlstream.interfaces.SiGMLUnitStreamHandler;
import sigmlanim.sigmlstream.interfaces.StreamedSiGMLReceiver;
import sigmlgen.SiGMLTagDefs;
import sigmlgen.playerctrl.PlayerSettings;
import sigmlstream.xml.XMLUnitDOMBuilder;
import sigmlstream.xml.XMLUnitEvent;
import util.NetUtils;

public class SiGMLUnitStreamToSignStream implements SiGMLUnitStreamHandler {
	private static final String SUS_TO_SS_PREFIX = "####  SiGMLUnitStreamToSignStream: ";
	private static final String SIGML_OPEN = SiGMLTagDefs.EL_OPEN("sigml");

	private static final String SIGML_CLOSE = SiGMLTagDefs.EL_CLOSE("sigml");

	protected URI baseURI;

	protected final SAXParserFactory SAX_PARSER_FACTORY;

	protected final XMLUnitDOMBuilder UNIT_DOM_BUILDER;

	protected final StreamedSiGMLReceiver SIGML_RECEIVER;

	public SiGMLUnitStreamToSignStream(URI base, StreamedSiGMLReceiver ssrcvr, SAXParserFactory spfac,
			XMLUnitDOMBuilder xudb) {
		this.baseURI = base;
		this.SAX_PARSER_FACTORY = spfac;
		this.UNIT_DOM_BUILDER = xudb;
		this.SIGML_RECEIVER = ssrcvr;
	}

	public void notifyBaseURI(String base) {
		this.baseURI = NetUtils.getResolvedURI(this.baseURI, base);

		System.out.println("####  SiGMLUnitStreamToSignStream: Revised base URL: "
				+ (this.baseURI == null ? "[null]" : this.baseURI

						.toASCIIString()));
	}

	public void notifyBeginXMLUnitStream() {
		this.SIGML_RECEIVER.beginSignStream();
	}

	public void notifyXMLUnit(ArrayList<XMLUnitEvent> uevts) {
		Document eldoc = this.UNIT_DOM_BUILDER.buildDocument(uevts);
		if (eldoc != null) {
			processElement(eldoc);
		}
	}

	public void notifyEndXMLUnitStream() {
		this.SIGML_RECEIVER.endSignStream();
	}

	private void processElement(Document eldoc) {
		Element el = eldoc.getDocumentElement();
		String eltype = el.getTagName();

		boolean ishgs = eltype.equals("hamgestural_sign");
		boolean ishns = (!ishgs) && (eltype.equals("hns_sign"));

		if ((ishgs) || (ishns)) {
			String gloss = el.getAttribute("gloss");
			if ((gloss != null) && (gloss.length() == 0)) {
				gloss = null;
			}
			if (ishns) {
				el = convertHNSElement(el);
			}

			HNSToHamGesturalConverter hgcvtr = HNSToHamGesturalConverter.getHHConverter();
			String eltxt = hgcvtr.gSiGMLSignText(el, gloss);

			String sigmltxt = wrapSiGMLSign(eltxt);

			this.SIGML_RECEIVER.setNextSign(sigmltxt, gloss);
		} else if (eltype.equals("signing_ref")) {
			processSigningRefElement(el);
		} else if (eltype.equals("player_settings")) {
			PlayerSettings ps = new PlayerSettings(el);
			this.SIGML_RECEIVER.setNewPlayerSettings(ps);
		} else {
			System.out.println("####  SiGMLUnitStreamToSignStream: IGNORING element \"" + eltype + "\"");
		}
	}

	private Element convertHNSElement(Element hnsel) {
		HNSToHamGesturalConverter cvtr = HNSToHamGesturalConverter.getHHConverter();
		Element hgel = cvtr.convertToElement(hnsel);

		return hgel;
	}

	private StringBuilder XML_BUF = new StringBuilder(2048);

	private String wrapSiGMLSign(String stxt) {
		this.XML_BUF.setLength(0);
		this.XML_BUF.append(SIGML_OPEN).append(stxt).append(SIGML_CLOSE);
		String wtxt = this.XML_BUF.toString();

		this.XML_BUF.setLength(0);

		return wtxt;
	}

	private String xmlText(Node nd) {
		DOMImplementation dimpl = nd.getOwnerDocument().getImplementation();

		DOMImplementationLS domls = (DOMImplementationLS) dimpl.getFeature("LS", "3.0");
		LSSerializer srlzr = domls.createLSSerializer();
		DOMConfiguration dcfg = srlzr.getDomConfig();

		dcfg.setParameter("xml-declaration", Boolean.FALSE);

		return srlzr.writeToString(nd);
	}

	private void processSigningRefElement(Element srel) {
		String SR_URI = srel.getAttribute("uri");

		String format = srel.getAttribute("format");
		String compressed = srel.getAttribute("compressed");
		boolean IS_SIGML = format.equals("SiGML");

		boolean IS_CAS = (!IS_SIGML) && (format.equals("CAS"));

		if ((!IS_SIGML) && (!IS_CAS)) {
			System.out.println("<signing_ref> format=" + format + " is unsupported;  URI: " + SR_URI);

		} else if (!compressed.equals("no")) {
			System.out.println("<signing_ref> compressed=" + compressed + " is unsupported;  URI: " + SR_URI);

		} else {

			URI S_OR_C_URI = NetUtils.getResolvedURI(this.baseURI, SR_URI);
			System.out.println("####  <signing_ref> URI: " + (S_OR_C_URI == null ? "[null]" : S_OR_C_URI

					.toASCIIString()));

			if (S_OR_C_URI != null) {
				if (IS_SIGML) {
					scanSiGMLRef(SR_URI);
				} else if (IS_CAS) {
					scanCASRef(S_OR_C_URI.toASCIIString());
				}
			}
		}
	}

	private void scanSiGMLRef(String suri) {
		SiGMLSignsScanner SS_SCANNER = makeSiGMLScanner();
		if (SS_SCANNER != null) {
			SS_SCANNER.scanSiGMLURL(suri);
		}
	}

	private void scanCASRef(String curi) {
		this.SIGML_RECEIVER.addStreamAbortCheckpoint();

		AnimatedSign[] CAS_SIGNS = CASHandler.readCASSigns(curi);

		if (CAS_SIGNS != null) {
			this.SIGML_RECEIVER.beginSignStream();

			for (AnimatedSign sign : CAS_SIGNS) {
				this.SIGML_RECEIVER.setNextSignWithAnim(sign);
			}

			this.SIGML_RECEIVER.endSignStream();
		}

		this.SIGML_RECEIVER.clearStreamAbortCheckpoint();
	}

	private SiGMLSignsScanner makeSiGMLScanner() {
		SiGMLSignsScanner ssscan = null;
		try {
			ssscan = new SiGMLSignsScanner(this.baseURI, this.SIGML_RECEIVER, this.SAX_PARSER_FACTORY,
					this.UNIT_DOM_BUILDER);

		} catch (ParserConfigurationException pcx) {

			System.out.println("####  SiGMLUnitStreamToSignStream: " + pcx);
		} catch (SAXException sx) {
			System.out.println("####  SiGMLUnitStreamToSignStream: " + sx);
		}

		return ssscan;
	}
}
