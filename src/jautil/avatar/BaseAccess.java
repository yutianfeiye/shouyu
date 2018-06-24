package jautil.avatar;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

public abstract class BaseAccess implements AvatarAccess {
	private AvatarData AV_DATA;

	protected void setAvatarData(AvatarData data) throws AvatarDataException {
		if (!data.isAllAvailable()) {
			throw new AvatarDataException("Missing data file(s) for " + data.AVATAR + " at: " + data.BASE_URL);
		}

		this.AV_DATA = data;
	}

	public String avatarName() {
		return this.AV_DATA.AVATAR;
	}

	public String baseURL() {
		return this.AV_DATA.BASE_URL;
	}

	public byte[] asdData() {
		return this.AV_DATA.ASD_XML;
	}

	public byte[] configData() {
		return this.AV_DATA.CONFIG_XML;
	}

	public byte[] nonmanualsData() {
		return this.AV_DATA.NONMANUALS_XML;
	}

	public InputStream avatarDefStream() {
		return new ByteArrayInputStream(this.AV_DATA.AVATAR_DEF);
	}

	public String avatarDefURL() {
		return this.AV_DATA.AVATAR_DEF_URL;
	}

	public void terminateAccess() {
	}
}
