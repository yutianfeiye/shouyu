package casxml;

import cas.CASFrame;
import cas.CASMorph;
import cas.CASTRSet;
import java.io.InputStream;
import java.io.PrintStream;
import java.util.ArrayList;
import org.xml.sax.Attributes;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import sigmlanim.AnimatedSign;
import sigmlgen.playerctrl.AvatarSettings;
import sigmlgen.playerctrl.CameraSettings;
import xml.BasicSAXHandler;
import xml.XMLScanner;
import xml.XMLScanner.ScanException;

public class CASHandler extends BasicSAXHandler {
	public static AnimatedSign[] readCASSigns(InputStream casins) {
		return readCASSigns(new InputSource(casins));
	}

	public static AnimatedSign[] readCASSigns(String casurl) {
		return readCASSigns(new InputSource(casurl));
	}

	public static AnimatedSign[] readCASSigns(InputSource cassrc) {
		AnimatedSign[] signs = null;
		try {
			XMLScanner casscan = new XMLScanner("CAS-Reader", false);
			CASHandler cashdlr = new CASHandler();
			casscan.scanXML(cassrc, cashdlr);

			signs = cashdlr.extractAnimation();
		} catch (XMLScanner.ScanException sx) {
			System.out.println("####  CASHandler: " + sx);
		}

		return signs;
	}

	public static final String CAS_TAG = "CAS".intern();
	public static final String FRAMES_TAG = "frames".intern();
	public static final String FRAME_TAG = "frame".intern();
	public static final String MORPH_TAG = "morph".intern();
	public static final String BONE_TAG = "bone".intern();
	public static final String POSITION_TAG = "position".intern();
	public static final String QROTATION_TAG = "qRotation".intern();

	public static final String AVATAR_TAG = "avatar".intern();
	public static final String COUNT_TAG = "count".intern();
	public static final String DURATION_TAG = "duration".intern();
	public static final String NAME_TAG = "name".intern();
	public static final String VALUE_TAG = "amount".intern();
	public static final String BONECOUNT_TAG = "boneCount".intern();
	public static final String MORPHCOUNT_TAG = "morphCount".intern();

	public static final String ISCOMPLETE_TAG = "isComplete".intern();
	public static final String SIGNCOUNT_TAG = "signCount".intern();
	public static final String SIGNSTART_TAG = "signStart".intern();
	public static final String GLOSS_TAG = "gloss".intern();
	public static final String VERSION_TAG = "version".intern();
	public static final String TIME_TAG = "time".intern();
	public static final String INDEX_TAG = "index".intern();

	public static final String X_TAG = "x".intern();
	public static final String Y_TAG = "y".intern();
	public static final String Z_TAG = "z".intern();
	public static final String W_TAG = "w".intern();
	public static final String BLANK = "".intern();

	public static final String CAMERA_TAG = "camera_location".intern();
	public static final String CX_TAG = "cx".intern();
	public static final String CY_TAG = "cy".intern();
	public static final String FOV_TAG = "fov".intern();
	public static final String PHI_TAG = "phi".intern();
	public static final String R_TAG = "r".intern();
	public static final String THETA_TAG = "theta".intern();

	private static final String ET_BASE_TAG = "[[BASE]]".intern();

	private int casElementCount;

	private int framesElementCount;

	private boolean doneCAS;

	private ArrayList<String> elTypeStack;

	private String casVersion;

	private String avatarName;

	private String newAvatarName;

	private CameraSettings cam;
	private CameraSettings newCam;
	private int nSigns;
	private int nFrames;
	private int nAllBones;
	private int nAllMorphs;
	private boolean fComplete;
	private AnimatedSign[] signs;
	private ArrayList<CASFrame> frames;
	private float time;
	private float duration;
	private float[] rotation;
	private float[] translation;
	private float morphValue;
	private String itemName;
	private int nBones;
	private int nMorphs;
	private CASTRSet[] oldBones;
	private CASTRSet[] bones;
	private ArrayList<CASMorph> morphs;
	private int iSign;
	private int iFrame;
	private int iFrameBase;
	private int iBone;
	private String gloss;

	public CASHandler() {
		super(null);

		this.morphs = new ArrayList(96);
		resetCASData();
	}

	protected void resetCASData() {
		this.signs = null;
		this.frames = null;

		this.elTypeStack = new ArrayList(8);
		this.casElementCount = 0;
		this.framesElementCount = 0;
		this.doneCAS = false;
	}

	public AnimatedSign[] extractAnimation() {
		AnimatedSign[] sgns = this.signs;
		resetCASData();

		return sgns;
	}

	public void startDocument() throws SAXException {
		resetCASData();
		this.elTypeStack.add(ET_BASE_TAG);
	}

	public void endDocument() throws SAXException {
		this.doneCAS = true;
	}

	public void startElement(String nsuri, String localnm, String rawnm, Attributes attribs) throws SAXException {
		if (nsuri != BLANK) {
			fatalFormatError("Non-null namespace-uri: " + nsuri);
		}

		if (localnm == CAS_TAG) {
			checkNewCAS();

			this.avatarName = null;
			this.newAvatarName = stringAttrib(AVATAR_TAG, attribs);

			this.cam = null;
			this.newCam = null;

			this.casVersion = attribs.getValue(VERSION_TAG);
			this.oldBones = null;
			this.bones = null;
			this.nBones = 0;

		} else if (localnm == FRAMES_TAG) {
			checkNewFrames();

			this.nFrames = intAttrib(COUNT_TAG, attribs);
			Integer ns = optIntAttrib(SIGNCOUNT_TAG, attribs);
			this.nSigns = (ns == null ? 1 : ns.intValue());
			this.signs = new AnimatedSign[this.nSigns];
			this.iSign = 0;

			int F_A_SIZE = 2 * (1 + this.nFrames / this.nSigns);

			this.frames = new ArrayList(F_A_SIZE);
			this.iFrame = 0;
			this.iFrameBase = this.iFrame;
			this.frames.clear();
			this.gloss = "unknown";
		} else if (localnm == AVATAR_TAG) {
			checkParent(FRAMES_TAG, AVATAR_TAG);

			endSign();

			this.newAvatarName = stringAttrib(NAME_TAG, attribs);
		} else if (localnm == CAMERA_TAG) {
			checkParent(FRAMES_TAG, CAMERA_TAG);

			endSign();

			this.newCam = new CameraSettings(floatAttrib(CX_TAG, attribs), floatAttrib(CY_TAG, attribs),
					floatAttrib(R_TAG, attribs), floatAttrib(THETA_TAG, attribs), floatAttrib(PHI_TAG, attribs),
					floatAttrib(FOV_TAG, attribs));

		} else if (localnm == SIGNSTART_TAG) {
			checkParent(FRAMES_TAG, SIGNSTART_TAG);

			endSign();

			Integer ix = optIntAttrib(INDEX_TAG, attribs);
			if ((ix != null) && (this.iSign != ix.intValue())) {
				fatalFormatError("CAS sign index error @ " + this.iSign + ".");
			}
			if (this.iSign == this.nSigns) {
				fatalFormatError("Too many signs.");
			}
			this.gloss = attribs.getValue(GLOSS_TAG);
			this.iFrameBase = this.iFrame;
		} else if (localnm == FRAME_TAG) {
			checkNewParent(FRAMES_TAG, FRAME_TAG);

			this.fComplete = boolAttrib(ISCOMPLETE_TAG, attribs);
			this.nBones = intAttrib(BONECOUNT_TAG, attribs);
			this.nMorphs = intAttrib(MORPHCOUNT_TAG, attribs);
			this.time = floatAttrib(TIME_TAG, attribs);
			this.duration = floatAttrib(DURATION_TAG, attribs);

			if ((this.iFrame == 0) && (!this.fComplete)) {
				fatalFormatError("Initial frame must be complete.");
			}

			if (this.fComplete) {
				this.nAllBones = this.nBones;
				this.nAllMorphs = this.nMorphs;
				this.bones = new CASTRSet[this.nAllBones];
				this.iBone = 0;
			} else {
				this.bones = new CASTRSet[this.nAllBones];

				for (int b = 0; b != this.nAllBones; b++) {
					this.bones[b] = this.oldBones[b];
				}

			}
		} else if (localnm == MORPH_TAG) {
			checkParent(FRAME_TAG, MORPH_TAG);

			this.itemName = stringAttrib(NAME_TAG, attribs);
			this.morphValue = floatAttrib(VALUE_TAG, attribs);

		} else if (localnm == BONE_TAG) {
			checkNewParent(FRAME_TAG, BONE_TAG);

			this.itemName = stringAttrib(NAME_TAG, attribs);
			Integer bb = optIntAttrib(INDEX_TAG, attribs);
			if (this.fComplete) {
				if ((bb != null) && (this.iBone != bb.intValue())) {
					fatalFormatError("Invalid bone index.");
				}
			} else {
				if (bb == null) {
					fatalFormatError("Missing bone index.");
				}
				this.iBone = bb.intValue();
			}
			this.translation = null;
			this.rotation = null;

		} else if (localnm == POSITION_TAG) {
			checkParent(BONE_TAG, POSITION_TAG);

			this.translation = new float[3];
			this.translation[0] = floatAttrib(X_TAG, attribs);
			this.translation[1] = floatAttrib(Y_TAG, attribs);
			this.translation[2] = floatAttrib(Z_TAG, attribs);

		} else if (localnm == QROTATION_TAG) {
			checkParent(BONE_TAG, QROTATION_TAG);

			this.rotation = new float[4];
			this.rotation[0] = floatAttrib(X_TAG, attribs);
			this.rotation[1] = floatAttrib(Y_TAG, attribs);
			this.rotation[2] = floatAttrib(Z_TAG, attribs);
			this.rotation[3] = floatAttrib(W_TAG, attribs);
		} else {
			fatalFormatError("Unknown CAS element type.");
		}
	}

	public void endElement(String nsuri, String localnm, String rawnm) throws SAXException {
		if (localnm == CAS_TAG) {
			popElType();

		} else if (localnm == FRAMES_TAG) {
			popElType();

			endSign();

		} else if (localnm != SIGNSTART_TAG) {
			if (localnm != AVATAR_TAG) {
				if (localnm != CAMERA_TAG) {

					if (localnm == FRAME_TAG) {
						popElType();

						CASMorph[] mrphs = null;
						int NM = this.morphs.size();
						if (NM != 0) {
							mrphs = new CASMorph[NM];
							this.morphs.toArray(mrphs);
							this.morphs.clear();
						}

						CASFrame FRAME = new CASFrame(this.time, this.duration, this.bones, mrphs);

						this.frames.add(FRAME);

						this.oldBones = this.bones;
						this.bones = null;
						this.iFrame += 1;

					} else if (localnm == MORPH_TAG) {

						this.morphs.add(new CASMorph(this.itemName, this.morphValue));
						this.itemName = null;

					} else if (localnm == BONE_TAG) {
						popElType();

						String bname = this.itemName.intern();
						int I_B = this.iBone;
						if (this.rotation == null) {
							this.rotation = this.oldBones[I_B].getRotation();
						}
						if (this.translation == null) {
							this.translation = this.oldBones[I_B].getTranslation();
						}
						this.bones[I_B] = new CASTRSet(bname, this.rotation, this.translation);

						if (!this.fComplete) {
							checkBoneName(this.iBone);
						}
						this.itemName = null;
						this.rotation = null;
						this.translation = null;

						if (this.fComplete)
							this.iBone += 1;
						else {
							this.iBone = -1;
						}
					} else if (localnm != POSITION_TAG) {

						if (localnm != QROTATION_TAG) {
						}
					}
				}
			}
		}
	}

	protected void endSign() throws SAXException {
		int F_LO = this.iFrameBase;
		int F_HI = this.iFrame;
		int N_F = F_HI - F_LO;

		if (N_F > 0) {
			CASFrame[] sframes = new CASFrame[N_F];

			this.frames.toArray(sframes);

			this.signs[this.iSign] = new AnimatedSign(this.gloss, F_LO, sframes);

			if ((this.avatarName == null) || (!this.avatarName.equals(this.newAvatarName))) {
				this.avatarName = this.newAvatarName;
				AvatarSettings avr = new AvatarSettings(this.avatarName);
				this.signs[this.iSign].setAvatarSettings(avr);
			}

			if ((this.newCam != null) && ((this.cam == null) || (!this.newCam.equals(this.cam)))) {
				this.cam = this.newCam;
				this.signs[this.iSign].setCameraSettings(this.cam);
				System.out.println("#### Camera from CAS: " + this.cam + " Sign: " + this.iSign);
			}

			this.iFrameBase = this.iFrame;
			this.frames.clear();
			this.gloss = null;
			this.iSign += 1;
		}
	}

	private boolean elTypeParentIs(String etp) {
		return etp.equals(this.elTypeStack.get(this.elTypeStack.size() - 1));
	}

	private void popElType() {
		this.elTypeStack.remove(this.elTypeStack.size() - 1);
	}

	private void checkParent(String par, String child) throws SAXException {
		if (!elTypeParentIs(par)) {
			String MSG = "Parent of " + child + " should be " + par + ".";

			fatalFormatError(MSG);
		}
	}

	private void checkNewParent(String par, String child) throws SAXException {
		checkParent(par, child);
		this.elTypeStack.add(child);
	}

	private void checkNewCAS() throws SAXException {
		checkNewParent(ET_BASE_TAG, CAS_TAG);
		if (this.casElementCount != 0) {
			fatalFormatError("Extra CAS element - one is enough!");
		}
		this.casElementCount += 1;
	}

	private void checkNewFrames() throws SAXException {
		checkNewParent(CAS_TAG, FRAMES_TAG);
		if (this.framesElementCount != 0) {
			fatalFormatError("Extra frames element - one is enough!");
		}
		this.framesElementCount += 1;
	}

	private void checkBoneName(int b) throws SAXException {
		int BONE_NAME = this.bones[b].getFourCC();
		if (BONE_NAME != this.oldBones[b].getFourCC()) {
			fatalFormatError("Wrong bone name (" + BONE_NAME + ") for index.");
		}
	}

	protected String stringAttrib(String name, Attributes attrs) throws SAXException {
		String str = attrs.getValue(name);
		if (str == null) {
			fatalFormatError("Missing attribute " + name + ".");
		}

		return str;
	}

	protected boolean boolAttrib(String name, Attributes attrs) throws SAXException {
		String bstr = attrs.getValue(name);
		boolean isfalse = (bstr == null) || (bstr.equals("false"));
		boolean istrue = (!isfalse) && (bstr.equals("true"));
		if ((!isfalse) && (!istrue)) {
			fatalFormatError("CAS boolean error.");
		}

		return istrue;
	}

	protected int intAttrib(String name, Attributes attrs) throws SAXException {
		Integer ii = optIntAttrib(name, attrs);
		if (ii == null) {
			fatalFormatError("CAS int error.");
		}
		return ii.intValue();
	}

	protected float floatAttrib(String name, Attributes attrs) throws SAXException {
		Float ff = optFloatAttrib(name, attrs);
		if (ff == null) {
			fatalFormatError("CAS float error.");
		}
		return ff.floatValue();
	}

	protected static Integer optIntAttrib(String name, Attributes attrs) {
		Integer ii = null;
		String vstr = attrs.getValue(name);
		if (vstr != null) {
			try {
				ii = Integer.valueOf(Integer.parseInt(vstr));
			} catch (NumberFormatException nfx) {
			}
		}
		return ii;
	}

	protected static Float optFloatAttrib(String name, Attributes attrs) {
		Float ff = null;
		String vstr = attrs.getValue(name);
		if (vstr != null) {
			try {
				ff = Float.valueOf(Float.parseFloat(vstr));
			} catch (NumberFormatException nfx) {
			}
		}
		return ff;
	}
}
