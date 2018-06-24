package jautil.avatar;

import jautil.JAIO;
import jautil.URLDataLoader;
import java.io.InputStream;
import java.net.URL;

public final class AvatarData {
	public static final String[] XML_NAMES = { "asd.xml", "config.xml", "nonmanuals.xml" };

	public static final int ASD_IX = 0;

	public static final int CONFIG_IX = 1;

	public static final int NONMANUALS_IX = 2;

	public final String AVATAR;

	public final String BASE_URL;

	public final Class<?> ACCESS_CLASS;

	public final String AVATAR_DEF_URL;

	public final String AVATAR_DEF_NAME;

	public final byte[] ASD_XML;

	public final byte[] CONFIG_XML;

	public final byte[] NONMANUALS_XML;

	public final byte[] AVATAR_DEF;

	public AvatarData(String av, String burl) {
		this.AVATAR = av;
		this.BASE_URL = burl;
		this.ACCESS_CLASS = null;

		byte[][] xmlsdata = getXMLData();
		this.ASD_XML = xmlsdata[0];
		this.CONFIG_XML = xmlsdata[1];
		this.NONMANUALS_XML = xmlsdata[2];

		this.AVATAR_DEF_NAME = getAvatarDefName();

		this.AVATAR_DEF_URL = (this.AVATAR_DEF_NAME == null ? null : JAIO.extendURL(burl, this.AVATAR_DEF_NAME));

		this.AVATAR_DEF = (this.AVATAR_DEF_URL == null ? null
				: URLDataLoader.getURLData(this.AVATAR_DEF_URL, av + " definition"));
	}

	public AvatarData(String av, Class<?> access) {
		this.AVATAR = av;
		this.BASE_URL = null;
		this.ACCESS_CLASS = access;

		byte[][] xmlsdata = getXMLData();
		this.ASD_XML = xmlsdata[0];
		this.CONFIG_XML = xmlsdata[1];
		this.NONMANUALS_XML = xmlsdata[2];

		this.AVATAR_DEF_NAME = getAvatarDefName();

		this.AVATAR_DEF_URL = (this.AVATAR_DEF_NAME == null ? null
				: access.getResource(this.AVATAR_DEF_NAME).toString());

		this.AVATAR_DEF = (this.AVATAR_DEF_NAME == null ? null : getResourceData(access, this.AVATAR_DEF_NAME));
	}

	public boolean isAllAvailable() {
		
		return (this.ASD_XML != null) && (this.CONFIG_XML != null) && (this.NONMANUALS_XML != null);
		//return (this.ASD_XML != null) && (this.CONFIG_XML != null) && (this.NONMANUALS_XML != null)	&& (this.AVATAR_DEF != null);
	}

	private byte[][] getXMLData() {
		int N = XML_NAMES.length;
		byte[][] xdata = new byte[N][];
		for (int i = 0; i != N; i++) {
			xdata[i] = getData(XML_NAMES[i]);
		}
		return xdata;
	}

	private String getAvatarDefName() {
		String dname = "avatardef.jarp";

		if (this.BASE_URL != null) {

			String durl = JAIO.extendURL(this.BASE_URL, dname);
			if (!JAIO.isValidURL(durl)) {
				dname = "avatardef.arp";
				durl = JAIO.extendURL(this.BASE_URL, dname);
				if (!JAIO.isValidURL(durl)) {
					dname = null;
				}
			}
		} else {
			InputStream dins = this.ACCESS_CLASS.getResourceAsStream(dname);
			if (dins == null) {
				dname = "avatardef.arp";
				dins = this.ACCESS_CLASS.getResourceAsStream(dname);
				if (dins == null) {
					dname = null;
				}
			}
		}

		return dname;
	}

	public byte[] getData(String rname) {
		boolean VIA_URL = this.BASE_URL != null;
		return VIA_URL ? getFileDataAtBase(rname, this.BASE_URL, this.AVATAR)
				: getResourceData(this.ACCESS_CLASS, rname);
	}

	public static byte[] getFileDataAtBase(String fname, String baseurl, String btag) {
		

		
		String furl = JAIO.extendURL(baseurl, fname);
		
		return URLDataLoader.getURLData(furl, fname + " for " + btag);
	}

	public static byte[] getResourceData(Class<?> access, String rname) {
		InputStream ins = JAIO.getInputStream(access.getResource(rname));
		return JAIO.getBytesFromStream(ins);
	}
}
