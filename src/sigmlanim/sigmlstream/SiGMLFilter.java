package sigmlanim.sigmlstream;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;
import sigmlanim.sigmlstream.interfaces.SiGMLUnitStreamHandler;
import sigmlstream.xml.XMLUnitFilter;

public class SiGMLFilter extends XMLUnitFilter {
	public SiGMLFilter(XMLReader parent, SiGMLUnitStreamHandler sshdlr) {
		super(parent, sshdlr);
	}

	protected SiGMLUnitStreamHandler getSiGMLUnitStreamHandler() {
		return (SiGMLUnitStreamHandler) getXMLUnitStreamHandler();
	}

	public void startElement(String uri, String lname, String qname, Attributes attrs) throws SAXException {
		if ((getLevel() == 0) && (qname.equals("sigml"))) {
			String buval = attrs.getValue("base_uri");

			if (buval != null) {
				getSiGMLUnitStreamHandler().notifyBaseURI(buval);
			}
		}

		super.startElement(uri, lname, qname, attrs);
	}
}
