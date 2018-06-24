package jautil.avatar;

import java.io.InputStream;

public abstract interface AvatarAccess {
	public abstract String avatarName();

	public abstract String baseURL();

	public abstract byte[] asdData();

	public abstract byte[] configData();

	public abstract byte[] nonmanualsData();

	public abstract InputStream avatarDefStream();

	public abstract String avatarDefURL();

	public abstract void terminateAccess();
}
