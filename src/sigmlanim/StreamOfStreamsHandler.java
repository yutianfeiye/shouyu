package sigmlanim;

import java.io.InputStream;

public abstract interface StreamOfStreamsHandler {
	public abstract void streamOfStreamsStarted();

	public abstract void acceptStream(InputStream paramInputStream);

	public abstract void streamOfStreamsStopped();
}
