package player;

import jautil.JAAvatarsEnv;
import jautil.JAOptions;
import jautil.SpeedProvider;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintStream;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import sigmlanim.InputConnectionsService;
import sigmlanim.StreamOfStreamsAdapter;
import sigmlanim.StreamOfStreamsHandler;
import sigmlinlib.SIDefs;
import sigmlinlib.SiGMLInputServiceStopper;
import util.InputStreamAsBytes;
import xml.XMLBytesDecoder;
import xml.XMLScanner.ScanException;
import xml.XMLStringSAXHandler;

public class JASocketPlayer extends JALoadingPlayer {
	private static String JASP_PREFIX = "####  JASocketPlayer";

	public static final int SWITCH_AVATAR_PORT_OFFSET = -10;

	private InputConnectionsService sigmlConnectionsService;

	private InputConnectionsService switchAvConnectionsService;

	private boolean doAutoPlay;

	private int stopPort;

	private int switchAvStopPort;

	private final StreamOfStreamsHandler SIGML_STREAMS_HANDLER = new StreamOfStreamsAdapter() {

		public void acceptStream(InputStream sins) {

			JASocketPlayer.this.acceptSiGMLStream(sins);
		}
	};

	private final StreamOfStreamsHandler SWITCH_AVATAR_STREAMS_HANDLER = new StreamOfStreamsAdapter() {

		public void acceptStream(InputStream sins) {

			JASocketPlayer.this.acceptSwitchAvatar(sins);
		}
	};

	public JASocketPlayer(JAOptions jopts, JACanvasEmbedder embedder, AvatarEventHandler aehdlr,
			JASocketPlayerEventHandler spehdlr, SpeedProvider sp) {
		this(jopts, embedder, aehdlr, spehdlr, sp, false, false, true);
	}

	public JASocketPlayer(JAOptions jopts, JACanvasEmbedder embedder, AvatarEventHandler aehdlr,
			JASocketPlayerEventHandler spehdlr, SpeedProvider sp, boolean cyclic, boolean onesign, boolean auto) {
		super(jopts, embedder, aehdlr, spehdlr, sp, cyclic, onesign);

		this.doAutoPlay = auto;
	}

	public void startSiGMLInput(JAOptions jopts) {
		int sinport = SIDefs.inPort(2, -1);
		this.stopPort = SIDefs.stopPort(-1, -1);
		try {
			this.sigmlConnectionsService = new InputConnectionsService(true, "SiGML", sinport, this.stopPort,
					this.SIGML_STREAMS_HANDLER);

		} catch (IOException iox) {

			System.out.println(JASP_PREFIX + ".startSiGMLInput(): " + iox);
		}
	}

	public void startSwitchAvatarInput() {
		int sainport = SIDefs.inPort(2, -1) + -10;

		this.switchAvStopPort = (SIDefs.stopPort(-1, -1) + -10);
		try {
			this.switchAvConnectionsService = new InputConnectionsService(true, "Switch-Avatar", sainport,
					this.switchAvStopPort, this.SWITCH_AVATAR_STREAMS_HANDLER);

		} catch (IOException iox) {

			System.out.println(JASP_PREFIX + ".startSwitchAvatarInput(): " + iox);
		}
	}

	public synchronized void setAutoPlay(boolean auto) {
		this.doAutoPlay = auto;
	}

	public synchronized boolean autoPlayIsOn() {
		return this.doAutoPlay;
	}

	public synchronized void terminate() throws InterruptedException {
		SiGMLInputServiceStopper sstopper;
		if (this.sigmlConnectionsService != null) {
			sstopper = new SiGMLInputServiceStopper(this.stopPort);
		}

		SiGMLInputServiceStopper avstopper;
		if (this.switchAvConnectionsService != null) {
			avstopper = new SiGMLInputServiceStopper(this.switchAvStopPort);
		}

		super.terminate();
	}

	protected synchronized void ensurePlayerIsIdle() throws InterruptedException {
		if (playerIsActive()) {
			stopPlaying();
			awaitPlayerInactive();
		}
	}

	protected void acceptSiGMLStream(InputStream sins) {
		try {
			ensurePlayerIsIdle();
			fireInputReceived();

			processSiGMLInput(sins, (this.doAutoPlay) && (hasAvatar()));
		} catch (InterruptedException ix) {
			System.out.println(JASP_PREFIX + ".acceptSiGMLStream() interrupted: " + ix);
		}
	}

	protected void acceptSwitchAvatar(InputStream sains) {
		try {
			InputStreamAsBytes isab = new InputStreamAsBytes(sains);
			XMLBytesDecoder decoder = new XMLBytesDecoder(isab.getBytes());
			String av = AvatarXMLScanner.getAvatarName(decoder.getXMLString());

			if (av != null) {
				checkCanDoSwitchAvatar(av);
				requestSwitchAvatar(av);
			}
		} catch (IOException iox) {
			System.out.println(JASP_PREFIX + ".acceptSwitchAvatar(): " + iox);
		}
	}

	protected void checkCanDoSwitchAvatar(String av) throws IOException {
		System.out.println(JASP_PREFIX + " Switch-Avatar request for " + av + ".");

		if (!getOptions().getAvatarsEnv().isValidAvatar(av)) {
			throw new IOException("Invalid avatar name.");
		}
		if (playerIsActive()) {
			throw new IOException("Cannot switch avatar if player is active.");
		}
	}

	protected void fireInputReceived() {
		JASocketPlayerEventHandler SPEH = getSocketPlayerEventHandler();

		if (SPEH != null) {
			SPEH.sigmlInputReceived();
		}
	}

	protected JASocketPlayerEventHandler getSocketPlayerEventHandler() {
		return (JASocketPlayerEventHandler) getPlayerEventHandler();
	}

	protected static class AvatarXMLScanner extends XMLStringSAXHandler {
		private String avatarName;
		private boolean doneXMLScan;
		private int countElements;

		public static String getAvatarName(String avxml) {
			String avname = null;
			try {
				AvatarXMLScanner axscanner = new AvatarXMLScanner(avxml);
				avname = axscanner.getName();
			} catch (ScanException sx) {
				System.out.println(JASocketPlayer.JASP_PREFIX + ".AvatarXMLScanner: " + sx);
			}
			return avname;
		}

		private AvatarXMLScanner(String avxml) throws ScanException {
			super(avxml, "");
			this.doneXMLScan = false;
			this.countElements = 0;
			this.avatarName = null;
			runSAXScanner();
		}

		public void endDocument() throws SAXException {
			this.doneXMLScan = true;
		}

		public void startElement(String nsuri, String localnm, String rawnm, Attributes attribs) throws SAXException {
			this.countElements += 1;
			if (!nsuri.equals("")) {
				System.out.println("####  Avatar XML element has non-null namespace-uri: " + nsuri);

			} else if (localnm.equals("avatar")) {
				this.avatarName = attribs.getValue("name");
				if (this.avatarName == null) {
					System.out.println("####  Missing name in avatar element.");
				}
			}
		}

		private String getName() {
			boolean OK = (this.doneXMLScan) && (this.countElements == 1);
			if (!OK) {
				System.out.println("####  Switch avatar: document element must be just an empty <avatar> element.");
			}

			return OK ? this.avatarName : null;
		}
	}
}
