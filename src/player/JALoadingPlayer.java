package player;

import jautil.JAOptions;
import jautil.SiGMLPipe;
import jautil.SpeedProvider;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.net.URL;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import sigmlanim.NonStreamedAnimationLoader;
import sigmlanim.SiGMLAnimation;
import sigmlanim.StreamedAnimationLoader;
import sigmlanim.sigmlstream.interfaces.SiGMLAnimationLoadEventHandler;
import util.LoggerConfig;

public class JALoadingPlayer extends JAFramesPlayer {
	private static Logger logger= LogManager.getLogger();;;

	public JALoadingPlayer(JAOptions jopts, JACanvasEmbedder embedder) {
		this(jopts, embedder, null, null, null);
	}

	public JALoadingPlayer(JAOptions jopts, JACanvasEmbedder embedder, AvatarEventHandler aehdlr,
			JALoadingPlayerEventHandler lpehdlr, SpeedProvider sp) {
		this(jopts, embedder, aehdlr, lpehdlr, sp, false, false);
	}

	public JALoadingPlayer(JAOptions jopts, JACanvasEmbedder embedder, AvatarEventHandler aehdlr,
			JALoadingPlayerEventHandler lpehdlr, SpeedProvider sp, boolean cyclic, boolean onesign) {
		super(jopts, embedder, aehdlr, lpehdlr, sp, cyclic, onesign);
	}

	protected JALoadingPlayerEventHandler getLoadingPlayerEventHandler() {
		return (JALoadingPlayerEventHandler) getPlayerEventHandler();
	}

	protected SiGMLAnimationLoadEventHandler makeLoadEventConverter() {
		JALoadingPlayerEventHandler LPEH = getLoadingPlayerEventHandler();

		return LPEH == null ? null : new LoadEventConverter(LPEH);
	}

	protected void fireLoaderDoneEvent(boolean gotanim, int ns, int nf) {
		JALoadingPlayerEventHandler LPEH = getLoadingPlayerEventHandler();

		if (LPEH != null) {
			LPEH.loaderIsDone(gotanim, ns, nf);
		}
	}

	public void playSiGMLURL(URL url, Boolean doplay) throws InterruptedException {
		String S_URL = url.toString();
		logger.log(LoggerConfig.LOGLevel, LoggerConfig.CONTROLMarker, "JALoadingPlayer: SiGML URL: " + S_URL);

		if (getOptions().doStreamedAnimationBuild()) {
			playSiGMLURLStreamed(url, doplay);
		} else {
			playSiGMLURLNonStreamed(url, doplay);
		}
	}

	public void playSiGMLURL(URL url) throws InterruptedException {
		playSiGMLURL(url, Boolean.valueOf(true));
	}

	private void playSiGMLURLNonStreamed(URL url, Boolean doplay) throws InterruptedException {
		clearAnimation();

		NonStreamedAnimationLoader NSA_LOADER = new NonStreamedAnimationLoader(getOptions(), url);
		doSynchronousLoadAndMaybePlay(NSA_LOADER, doplay.booleanValue());
	}

	private void playSiGMLURLStreamed(URL url, Boolean doplay) throws InterruptedException {
		clearAnimation();

		StreamedAnimationLoader SA_LOADER = new StreamedAnimationLoader(getOptions(), url, makeLoadEventConverter());
		SA_LOADER.processSiGML();
		setAnimation(SA_LOADER.getAnimation());
		if (doplay.booleanValue()) {
			startPlaying();
		}
	}

	public void playSiGML(String sigml) throws InterruptedException {
		if (getOptions().doStreamedAnimationBuild()) {
			playSiGMLStreamed(sigml);
		} else {
			playSiGMLNonStreamed(sigml);
		}
	}

	private void playSiGMLNonStreamed(String sigml) throws InterruptedException {
		clearAnimation();

		NonStreamedAnimationLoader NSA_LOADER = new NonStreamedAnimationLoader(getOptions(), new StringReader(sigml));
		doSynchronousLoadAndMaybePlay(NSA_LOADER);
	}

	private void playSiGMLStreamed(String sigml) {
		clearAnimation();

		StreamedAnimationLoader SA_LOADER = new StreamedAnimationLoader(getOptions(), new StringReader(sigml),
				makeLoadEventConverter());
		SA_LOADER.processSiGML();
		setAnimation(SA_LOADER.getAnimation());
		startPlaying();
	}

	public SiGMLPipeWriter playSiGMLPiped() throws IOException, InterruptedException {
		SiGMLPipe sigmlpipe = null;
		if (!getOptions().doStreamedAnimationBuild()) {
			throw new IOException("Piped SiGML requires streamed animation build.");
		}

		sigmlpipe = new SiGMLPipe();
		processSiGMLInputStreamed(sigmlpipe.getSiGMLInputStream(), true);

		return sigmlpipe;
	}

	public void processSiGMLInput(InputStream sins, boolean doplay) throws InterruptedException {
		if (getOptions().doStreamedAnimationBuild()) {
			processSiGMLInputStreamed(sins, doplay);
		} else {
			processSiGMLInputNonStreamed(sins, doplay);
		}
	}

	private void processSiGMLInputNonStreamed(InputStream sins, boolean doplay) throws InterruptedException {
		clearAnimation();

		NonStreamedAnimationLoader NSA_LOADER = new NonStreamedAnimationLoader(getOptions(), sins);
		doSynchronousLoadAndMaybePlay(NSA_LOADER, doplay);
	}

	private void processSiGMLInputStreamed(InputStream sins, boolean doplay) throws InterruptedException {
		clearAnimation();

		StreamedAnimationLoader SA_LOADER = new StreamedAnimationLoader(getOptions(), sins, makeLoadEventConverter());
		SA_LOADER.processSiGML();
		setAnimation(SA_LOADER.getAnimation());
		if (doplay) {
			startPlayingStreamed();
		}
	}

	public void replay() {
		startPlaying();
	}

	public void saveCAS(String av, File caspath) {
		getAnimation().asynchWriteCAS(av, caspath);
	}

	private void doSynchronousLoadAndMaybePlay(NonStreamedAnimationLoader NSA_LOADER) {
		doSynchronousLoadAndMaybePlay(NSA_LOADER, true);
	}

	private void doSynchronousLoadAndMaybePlay(NonStreamedAnimationLoader NSA_LOADER, boolean doplay) {
		NSA_LOADER.processSiGML();
		SiGMLAnimation ANIM = NSA_LOADER.getAnimation();
		setAnimation(ANIM);
		boolean GOT_ANIM = ANIM != null;

		SignsArrayAccess SIGNS = GOT_ANIM ? ANIM.getSignsArray() : null;
		int N_S = GOT_ANIM ? SIGNS.countSigns() : 0;
		int N_F = GOT_ANIM ? SIGNS.countFrames() : 0;
		fireLoaderDoneEvent(GOT_ANIM, N_S, N_F);
		if ((GOT_ANIM) && (doplay)) {
			startPlaying();
		}
	}

	protected static class LoadEventConverter implements SiGMLAnimationLoadEventHandler {
		private final JALoadingPlayerEventHandler JA_LPE_HANDLER;

		public LoadEventConverter(JALoadingPlayerEventHandler lpeh) {
			this.JA_LPE_HANDLER = lpeh;
		}

		public void animLoadStarted() {
			this.JA_LPE_HANDLER.loaderHasStarted();
		}

		public void animSignLoaded(int s, int flimit) {
			this.JA_LPE_HANDLER.nextSignLoaded(s, flimit);
		}

		public void animLoadDone(int nsigns, int nframes) {
			this.JA_LPE_HANDLER.loaderIsDone(nframes != 0, nsigns, nframes);
		}
	}

	public static abstract interface SiGMLPipeWriter {
		public abstract void appendSiGMLFragment(String paramString) throws IOException;

		public abstract void terminatePipe() throws IOException;
	}
}
