package sigmlanim.sigmlstream.interfaces;

import sigmlstream.xml.XMLUnitStreamHandler;

public abstract interface SiGMLUnitStreamHandler
  extends XMLUnitStreamHandler
{
  public abstract void notifyBaseURI(String paramString);
}
