package sigmlanim;

import cas.CASFrame;
import jautil.JAOptions;
import java.io.InputStream;
import java.io.StringReader;
import java.net.URL;
import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import player.SignsArrayAccess;
import sigmlanim.sigmlstream.FilteringSupplierForAnimGen;
import sigmlanim.sigmlstream.interfaces.StreamedSiGMLSupplierForAnimationGen;
import util.LoggerConfig;

public class NonStreamedAnimationLoader extends StreamableAnimationLoader {
	private static Logger logger= LogManager.getLogger();;;

	protected static final String NSAL_PREFIX = "NonStreamedAnimationLoader: ";

	protected static final String NSAL_MESSAGE = "NonStreamedAnimationLoader: unthreaded";

	protected SiGMLAnimation animation;

	private static final String EOL = "\n";

	private static final String REST_POSE_SIGML = "<sigml>\n  <hamgestural_sign gloss=\"REST\">\n    <sign_manual/>\n  </hamgestural_sign>\n</sigml>";

	public NonStreamedAnimationLoader(JAOptions jopts, URL url) {
		this(jopts, url.toString());
	}

	public NonStreamedAnimationLoader(String av, JAOptions jopts, URL url) {
		this(av, jopts, url.toString());
	}

	public NonStreamedAnimationLoader(JAOptions jopts, String url) {
		this(jopts.avatarID(), jopts, url);
	}

	public NonStreamedAnimationLoader(String av, JAOptions jopts, String url) {
		super(av, jopts, url, new SignsListBuilder(), "NonStreamedAnimationLoader: ",
				"NonStreamedAnimationLoader: unthreaded");
	}

	public NonStreamedAnimationLoader(JAOptions jopts, StringReader srdr) {
		this(jopts.avatarID(), jopts, srdr);
	}

	public NonStreamedAnimationLoader(String av, JAOptions jopts, StringReader srdr) {
		super(av, jopts, srdr, new SignsListBuilder(), "NonStreamedAnimationLoader: ",
				"NonStreamedAnimationLoader: unthreaded");
	}

	public NonStreamedAnimationLoader(JAOptions jopts, InputStream sins) {
		this(jopts.avatarID(), jopts, sins);
	}

	public NonStreamedAnimationLoader(String av, JAOptions jopts, InputStream sins) {
		super(av, jopts, sins, new SignsListBuilder(), "NonStreamedAnimationLoader: ",
				"NonStreamedAnimationLoader: unthreaded");
	}

	public void processSiGML() {
		runSiGMLScanner();
		generateAnimationData();
	}

	public SiGMLAnimation getAnimation() {
		return this.animation;
	}

	protected void generateAnimationData() {
		List<AnimatedSign> signs = ((SignsListBuilder) this.SIGNS_BUILDER).getSigns();

		if (signs != null) {
			this.animation = null;

			AnimatedSign[] A_SIGNS = new AnimatedSign[signs.size()];
			signs.toArray(A_SIGNS);

			SignsArraySupplier SUPPLIER = new SignsArraySupplier(A_SIGNS);

			StreamedSiGMLSupplierForAnimationGen FILTER = new FilteringSupplierForAnimGen(SUPPLIER);

			JAnimgen jag = new JAnimgen(this.JA_OPTIONS, this.JAG_CONFIG_DATA, FILTER);

			try {
				SUPPLIER.waitUntilAllAnimated();
				this.animation = new SiGMLAnimation(this.JAG_CONFIG_DATA.FPS, A_SIGNS);
			} catch (InterruptedException ix) {
				logger.log(LoggerConfig.WARNLevel, LoggerConfig.SIGMLMarker,
						"NonStreamedAnimationLoader: Waiting for animation data: " + ix);
			}
		}
	}

	public static CASFrame getRestPose(String av, JAOptions jopts) {
		NonStreamedAnimationLoader nsal = new NonStreamedAnimationLoader(av, jopts, new StringReader(
				"<sigml>\n  <hamgestural_sign gloss=\"REST\">\n    <sign_manual/>\n  </hamgestural_sign>\n</sigml>"));

		nsal.processSiGML();
		SiGMLAnimation anim = nsal.getAnimation();

		SignsArrayAccess saccess = anim.getSignsArray();
		while (!saccess.arrayIsFinal()) {
			try {
				saccess.waitForProgress();
			} catch (InterruptedException ix) {
			}
		}
		CASFrame rframe = null;
		int NS = saccess.countSigns();
		int NF = saccess.countFrames();
		AnimatedSign[] SIGNS = saccess.signs();
		if (NF != 0) {
			AnimatedSign sign = SIGNS[(NS - 1)];
			rframe = sign.getFrame(NF - 1);
		}

		if (rframe == null) {
			logger.log(LoggerConfig.ERRORLevel, LoggerConfig.SIGMLMarker,
					"NonStreamedAnimationLoader: getRestPose() failed.");
		}

		return rframe;
	}
}
