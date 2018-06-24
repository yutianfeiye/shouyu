package jarp;

import cas.CASFrame;
import cas.CASMorph;
import cas.CASTRSet;
import jautil.geometry.Quaternion;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.Random;

public class AmbientManager {
	private static final String PREFIX = "####  AmbientManager";
	private final float AMBIENT_FPS;
	private final CASFrame[] AMBIENT_FRAMES;
	private final int N_FRAMES;
	private final float CYCLE_TIME;
	private final Random RANDOM;
	private int ixAmbient;
	private float tAmbient;
	private float tCurrent;

	public AmbientManager(CASFrame[] aframes, float fps) {
		this.AMBIENT_FPS = fps;

		this.AMBIENT_FRAMES = aframes;
		this.N_FRAMES = aframes.length;

		CASFrame lastfrm = aframes[(this.N_FRAMES - 1)];
		this.CYCLE_TIME = (lastfrm.getTime() + lastfrm.getDuration());

		this.RANDOM = new Random();

		resetClock();
	}

	public void resetClock() {
		this.ixAmbient = 0;
		this.tAmbient = 0.0F;
		this.tCurrent = 0.0F;
	}

	public float randomResetClock() {
		int IX = this.RANDOM.nextInt(this.N_FRAMES);

		this.ixAmbient = IX;
		this.tCurrent = (this.tAmbient = this.AMBIENT_FRAMES[IX].getTime());
		System.out.println("####  AmbientManager: reset index=" + IX);

		return this.tCurrent;
	}

	public float synchClock() {
		this.tCurrent = this.tAmbient;

		return this.tCurrent;
	}

	public float getTime() {
		return this.tCurrent;
	}

	public float getAmbientFPS() {
		return this.AMBIENT_FPS;
	}

	public CASFrame[] getAmbientFrames() {
		return this.AMBIENT_FRAMES;
	}

	public CASFrame adjust(CASFrame frame, float scale) {
		return adjustForTime(frame, scale, frame.getTime());
	}

	public CASFrame adjustForTimeDelta(CASFrame frame, float scale, float td) {
		return adjustForTime(frame, scale, this.tCurrent + td);
	}

	protected CASFrame adjustForTime(CASFrame frame, float scale, float t) {
		return applyAmbientToFrame(frame, findAmbientFrame(t), scale);
	}

	protected CASFrame findAmbientFrame(float t) {
		float T_DELTA = t - this.tAmbient;
		int N_CYCLES = (int) (T_DELTA / this.CYCLE_TIME);
		float T_CYCLES = N_CYCLES * this.CYCLE_TIME;
		float T_REL = T_DELTA - T_CYCLES;

		int ix = this.ixAmbient;
		float tix = 0.0F;
		float tixnext = this.AMBIENT_FRAMES[ix].getDuration();
		while (tixnext <= T_REL) {
			ix = nextAmbientIndex(ix);
			tix = tixnext;
			tixnext += this.AMBIENT_FRAMES[ix].getDuration();
		}
		float T_STEP = tixnext - tix;
		float EPS = T_STEP * 0.05F;

		CASFrame frame = null;
		if (T_DELTA < tix + EPS) {
			frame = this.AMBIENT_FRAMES[ix];
		} else if (tixnext < T_DELTA + EPS) {
			frame = this.AMBIENT_FRAMES[nextAmbientIndex(ix)];
		} else {
			CASFrame fcurr = this.AMBIENT_FRAMES[ix];
			CASFrame fnext = this.AMBIENT_FRAMES[nextAmbientIndex(ix)];
			frame = interpolate(fcurr, fnext, (T_DELTA - tix) / T_STEP);
		}

		this.ixAmbient = ix;
		this.tAmbient += T_CYCLES + tix;
		this.tCurrent = t;

		return frame;
	}

	protected int nextAmbientIndex(int ix) {
		int nextix = ix + 1;
		if (nextix == this.N_FRAMES) {
			nextix = 0;
		}
		return nextix;
	}

	protected CASFrame interpolate(CASFrame fa, CASFrame fb, float T) {
		CASTRSet[] bones = interpolateBones(fa.getTRSets(), fb.getTRSets(), T);

		CASMorph[] morphs = interpolateMorphs(fa, fb, T);

		float TM_A = fa.getTime();
		float DUR_A = fa.getDuration();
		float TM_ADJ = DUR_A * T;

		return new CASFrame(TM_A + TM_ADJ, DUR_A - TM_ADJ, bones, morphs);
	}

	protected CASTRSet[] interpolateBones(CASTRSet[] A_BONES, CASTRSet[] B_BONES, float T) {
		CASTRSet[] bones = null;

		boolean lenok = true;
		int fourccerrs = 0;
		if (A_BONES.length != B_BONES.length) {
			lenok = false;
		} else {
			int N_BONES = A_BONES.length;
			bones = new CASTRSet[N_BONES];

			Quaternion qa = new Quaternion();
			Quaternion qb = new Quaternion();
			Quaternion qnew = new Quaternion();
			Quaternion qwork = new Quaternion();

			for (int i = 0; i != N_BONES; i++) {
				CASTRSet A_BONE = A_BONES[i];
				CASTRSet B_BONE = B_BONES[i];

				qa.set(A_BONE.getRotation());
				qb.set(B_BONE.getRotation());
				Quaternion.slerp(qnew, qa, qb, qwork, T);
				float[] NEW_ROT = qnew.asFloats();

				int A_4CC = A_BONE.getFourCC();
				int B_4CC = B_BONE.getFourCC();
				if (A_4CC != B_4CC)
					fourccerrs++;
				float[] A_TRANS = A_BONE.getTranslation();

				bones[i] = new CASTRSet(A_4CC, NEW_ROT, A_TRANS);
			}
		}

		if ((!lenok) || (fourccerrs != 0)) {
			String PFX_ID = "####  AmbientManager.interpolateBones(): ";
			String ISSUE = fourccerrs + " nonmatching bone-set indices.";

			System.out.println("####  AmbientManager.interpolateBones(): " + ISSUE);
			bones = A_BONES;
		}

		return bones;
	}

	protected CASMorph[] makeMorphListWithExtras(CASFrame A_FRAME, CASMorph[] B_MORPHS) {
		CASMorph[] A_MORPHS = A_FRAME.getMorphs();
		int N_A = A_MORPHS.length;

		ArrayList<CASMorph> bextras = new ArrayList(B_MORPHS.length);

		for (CASMorph bmorph : B_MORPHS) {
			if (A_FRAME.getMorph(bmorph.getName()) == null) {
				bextras.add(bmorph);
			}
		}
		int N_EXTRAS = bextras.size();

		CASMorph[] morphs = new CASMorph[N_A + N_EXTRAS];

		for (int e = 0; e != N_EXTRAS; e++) {
			morphs[(N_A + e)] = ((CASMorph) bextras.get(e));
		}
		return morphs;
	}

	protected CASMorph[] interpolateMorphs(CASFrame fa, CASFrame fb, float T) {
		CASMorph[] A_MORPHS = fa.getMorphs();
		CASMorph[] B_MORPHS = fb.getMorphs();

		CASMorph[] morphs = null;
		if ((A_MORPHS.length == 0) && (B_MORPHS.length == 0)) {
			morphs = A_MORPHS;
		} else {
			morphs = makeMorphListWithExtras(fa, B_MORPHS);

			for (int m = 0; m != A_MORPHS.length; m++) {
				CASMorph A_MORPH = A_MORPHS[m];
				int M_4CC = A_MORPH.getName();
				CASMorph B_MORPH = fb.getMorph(M_4CC);

				CASMorph morph = A_MORPH;
				if (B_MORPH != null) {

					float AMOUNT = A_MORPH.getAmount() * (1.0F - T) + B_MORPH.getAmount() * T;
					morph = new CASMorph(M_4CC, AMOUNT);
				}

				morphs[m] = morph;
			}
		}

		return morphs;
	}

	protected CASFrame applyAmbientToFrame(CASFrame frame, CASFrame ambientframe, float scale) {
		CASTRSet[] NEW_BONES = bonesWithAmbient(frame, ambientframe, scale);

		CASMorph[] NEW_MORPHS = morphsWithAmbient(frame, ambientframe, scale);

		return (NEW_BONES == frame.getTRSets()) && (NEW_MORPHS == frame.getMorphs()) ? frame
				: new CASFrame(frame.getTime(), frame.getDuration(), NEW_BONES, NEW_MORPHS);
	}

	protected CASTRSet[] bonesWithAmbient(CASFrame frame, CASFrame ambientframe, float scale) {
		CASTRSet[] BONES = frame.getTRSets();
		CASTRSet[] AMB_BONES = ambientframe.getTRSets();
		int N_BONES = BONES.length;

		CASTRSet[] NEW_BONES = AMB_BONES.length == 0 ? BONES : new CASTRSet[N_BONES];

		if (NEW_BONES != BONES) {

			Quaternion qnew = new Quaternion();
			Quaternion qamb = new Quaternion();
			Quaternion qwk = new Quaternion();

			for (int i = 0; i != N_BONES; i++) {
				CASTRSet BONE = BONES[i];
				int NAME = BONE.getFourCC();

				CASTRSet newbone = BONE;

				CASTRSet AMB_BONE = ambientframe.getTRSet(NAME);
				if (AMB_BONE != null) {
					qnew.set(BONE.getRotation());
					qamb.set(AMB_BONE.getRotation());

					qamb.scale(qwk, scale);
					qnew.postMultiplyEq(qamb);
					float[] TRANS = BONE.getTranslation();
					newbone = new CASTRSet(NAME, qnew.asFloats(), TRANS);
				}

				NEW_BONES[i] = newbone;
			}
		}

		return NEW_BONES;
	}

	protected CASMorph[] morphsWithAmbient(CASFrame frame, CASFrame ambientframe, float scale) {
		CASMorph[] MORPHS = frame.getMorphs();
		CASMorph[] AMB_MORPHS = ambientframe.getMorphs();

		CASMorph[] newmorphs = MORPHS;
		if (AMB_MORPHS.length != 0) {
			newmorphs = makeMorphListWithExtras(frame, AMB_MORPHS);

			for (int m = 0; m != MORPHS.length; m++) {
				CASMorph MORPH = MORPHS[m];
				int M_4CC = MORPH.getName();

				CASMorph newmorph = MORPH;

				CASMorph AMB_MORPH = ambientframe.getMorph(M_4CC);
				if (AMB_MORPH != null) {
					float AMB_AMT = AMB_MORPH.getAmount() * scale;
					float amt = MORPH.getAmount() + AMB_AMT;
					if (1.0F < amt) {
						amt = 1.0F;
					}
					newmorph = new CASMorph(M_4CC, amt);
				}

				newmorphs[m] = newmorph;
			}
		}

		return newmorphs;
	}
}
