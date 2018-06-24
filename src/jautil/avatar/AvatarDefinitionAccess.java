package jautil.avatar;

import java.io.InputStream;

public abstract interface AvatarDefinitionAccess {
	public abstract String avatarName();

	public abstract boolean isAvailable();

	public abstract InputStream asNewStream();

	public abstract String asURL();
}
