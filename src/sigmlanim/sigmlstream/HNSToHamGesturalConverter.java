package sigmlanim.sigmlstream;

import hnscnvt.HMLToSiGML;
import hnscnvt.HMLToSiGML.HMLToSiGMLException;
import hnscnvt.HNSSign;
import hnscnvt.HNSSignElementToHNS;
import hnscnvt.HNSToHML;
import hnscnvt.HNSToHML.HNSToHMLException;
import java.io.PrintStream;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import org.w3c.dom.DOMException;
import org.w3c.dom.Element;
import xml.XmlElementTextGen;

public class HNSToHamGesturalConverter {
	private static HNSToHamGesturalConverter hhconverter;
	private static final String EMPTY_HAM_GESTURAL_SIGN = "<hamgestural_sign gloss=\"UNKNOWN\"></hamgestural_sign>";
	private final boolean CONVERTERS_OK;
	private HNSSignElementToHNS hstohConverter;
	private HNSToHML htohConverter;
	private HMLToSiGML htosConverter;
	private XmlElementTextGen xmlTextGen;
	private transient Element hgsigml;
	private transient String gloss;

	public static HNSToHamGesturalConverter getHHConverter() {
		if (hhconverter == null) {
			hhconverter = new HNSToHamGesturalConverter();
		}
		return hhconverter;
	}

	private HNSToHamGesturalConverter() {
		boolean cok = false;

		String MSG_PFX = "HNSToHamGesturalConverter ctor: ";
		try {
			this.hstohConverter = new HNSSignElementToHNS();
			this.htohConverter = new HNSToHML();
			this.htosConverter = new HMLToSiGML();
			this.xmlTextGen = new XmlElementTextGen(false);
			cok = true;
		} catch (HNSToHML.HNSToHMLException hhx) {
			System.out.println("HNSToHamGesturalConverter ctor: " + hhx);
		} catch (HMLToSiGML.HMLToSiGMLException hsx) {
			System.out.println("HNSToHamGesturalConverter ctor: " + hsx);
		} catch (TransformerConfigurationException tcx) {
			System.out.println("HNSToHamGesturalConverter ctor: " + tcx);
		}

		this.CONVERTERS_OK = cok;
	}

	public Element convertToElement(Element hsel) {
		doConversion(hsel);

		return this.hgsigml;
	}

	public String convertToText(Element hsel) {
		doConversion(hsel);

		return gSiGMLSignText(this.hgsigml, this.gloss);
	}

	public String gSiGMLSignText(Element gsel, String xgloss) {
		String gstxt = elText(gsel);

		if (gstxt == null) {
			gstxt = "<hamgestural_sign gloss=\"UNKNOWN\"></hamgestural_sign>";

			if (xgloss != null) {

				try {

					String SAFE_GLOSS = xgloss.replace("$", "\\$");
					gstxt = gstxt.replaceFirst("UNKNOWN", SAFE_GLOSS);
				} catch (Exception x) {
					System.out.println("HNSToHGCvtr.gSiGMLSignText(): wierd gloss " + xgloss + ": " + x);
				}
			}
		}

		return gstxt;
	}

	public String elText(Element el) {
		String eltxt = null;
		if (el != null) {
			try {
				eltxt = this.xmlTextGen.getText(el);
			} catch (TransformerException tx) {
				System.out.println("HNSToHamGesturalConverter: " + tx);
			}
		}

		return eltxt;
	}

	private void doConversion(Element hsel) {
		this.hgsigml = null;
		this.gloss = "UNKNOWN";

		if (this.CONVERTERS_OK) {
			String err = null;

			HNSSign hnssign = this.hstohConverter.convert(hsel);

			try {
				Element hml = this.htohConverter.hmlSign(hnssign);
				this.hgsigml = this.htosConverter.sigmlSignForHML(hml);
			} catch (HNSToHML.HNSToHMLException hhx) {
				err = "HNSToHML error: " + hhx.getMessage();
			} catch (HMLToSiGML.HMLToSiGMLException hsx) {
				err = "HMLToSiGML error: " + hsx.getMessage();
			} catch (DOMException dx) {
				err = "import error: " + dx.getMessage();
			}

			if (err != null) {
				System.out.println("<hns>-to-<hamgestural> sign conversion: " + err);
			}

			String hnsgloss = hnssign.gloss();
			if (hnsgloss != null)
				this.gloss = hnsgloss;
		}
	}
}
