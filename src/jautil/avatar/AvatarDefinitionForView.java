package jautil.avatar;

import java.io.InputStream;

public class AvatarDefinitionForView implements AvatarDefinitionAccess {
	private final String AVATAR_NAME;
	private final AvatarAccess AVATAR_ACCESS;

	public AvatarDefinitionForView(AvatarAccess avaccess) {
		this.AVATAR_ACCESS = avaccess;
		this.AVATAR_NAME = avaccess.avatarName();
	}

	public AvatarDefinitionForView(String avname) {
		this.AVATAR_ACCESS = null;
		this.AVATAR_NAME = avname;
	}

	public String avatarName() {
		return this.AVATAR_NAME;
	}

	public boolean isAvailable() {
		return this.AVATAR_ACCESS != null;
	}

	public InputStream asNewStream() {
		return this.AVATAR_ACCESS == null ? null : this.AVATAR_ACCESS.avatarDefStream();
	}

	public String asURL() {
		return this.AVATAR_ACCESS == null ? null : this.AVATAR_ACCESS.avatarDefURL();
	}
}
