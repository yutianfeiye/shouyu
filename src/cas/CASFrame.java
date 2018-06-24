package cas;

import jautil.JAInputStream;
import jautil.JAOutputStream;
import jautil.MapInt;
import java.io.IOException;
import java.io.PrintWriter;

public class CASFrame {
	private static final int MAP_LO_SIZE = 8;
	private static final CASTRSet[] NO_TRSETS = new CASTRSet[0];
	private static final CASMorph[] NO_MORPHS = new CASMorph[0];

	private float timeStamp;

	private float duration;

	private CASTRSet[] trSets;

	private CASMorph[] morphs;

	private boolean trSetsAreToBeMapped;

	private boolean morphsAreToBeMapped;

	private MapInt<CASTRSet> trSetMap;

	private MapInt<CASMorph> morphMap;

	public CASFrame() {
		this.timeStamp = -1.0F;
		this.duration = 0.0F;
		this.trSets = null;
		this.morphs = null;
		this.trSetMap = null;
		this.morphMap = null;
		this.morphsAreToBeMapped = false;
		this.trSetsAreToBeMapped = false;
	}

	public CASFrame(CASTRSet[] bones, CASMorph[] morphs) {
		set(-1.0F, 0.0F, bones, morphs);
	}

	public CASFrame(float time, CASTRSet[] bones, CASMorph[] morphs) {
		set(time, 0.0F, bones, morphs);
	}

	public CASFrame(float time, float dur, CASTRSet[] bones, CASMorph[] morphs) {
		set(time, dur, bones, morphs);
	}

	public CASFrame(CASFrame frame) {
		copy(frame.getTime(), frame.getDuration(), frame.getTRSets(), frame.getMorphs());
	}

	public void set(float time, float dur, CASTRSet[] bones, CASMorph[] morphs) {
		this.timeStamp = time;
		this.duration = dur;

		this.trSets = bones;
		this.morphs = morphs;
		if (this.trSets == null)
			this.trSets = NO_TRSETS;
		if (this.morphs == null) {
			this.morphs = NO_MORPHS;
		}
		this.trSetsAreToBeMapped = (8 <= this.trSets.length);
		this.morphsAreToBeMapped = (8 <= this.morphs.length);

		this.trSetMap = null;
		this.morphMap = null;
	}

	public void copy(float time, float dur, CASTRSet[] bones, CASMorph[] morphvec) {
		this.timeStamp = time;
		this.duration = dur;

		int NP = bones.length;
		this.trSets = new CASTRSet[NP];
		for (int i = 0; i != NP; i++) {
			this.trSets[i] = new CASTRSet(bones[i]);
		}

		int NM = morphvec.length;
		this.morphs = new CASMorph[NM];
		for (int j = 0; j != NM; j++) {
			this.morphs[j] = new CASMorph(morphvec[j]);
		}

		this.trSetsAreToBeMapped = (8 <= NP);
		this.morphsAreToBeMapped = (8 <= NM);

		this.trSetMap = null;
		this.morphMap = null;
	}

	public float getTime() {
		return this.timeStamp;
	}

	public float getDuration() {
		return this.duration;
	}

	public CASTRSet[] getTRSets() {
		return this.trSets;
	}

	public CASMorph[] getMorphs() {
		return this.morphs;
	}

	public CASTRSet getTRSet(int bone4cc) {
		CASTRSet trset = null;

		if (this.trSetsAreToBeMapped) {
			makeTRSetMap();
		}

		if (this.trSetMap != null) {
			trset = (CASTRSet) this.trSetMap.get(bone4cc);
		} else {
			int NTR = this.trSets.length;

			int i = 0;
			int ii = NTR;
			while (i != ii) {
				CASTRSet TRS_I = this.trSets[i];
				if (TRS_I.has4CCName(bone4cc)) {
					trset = TRS_I;
					ii = i;
				} else {
					i++;
				}
			}
		}
		return trset;
	}

	public CASMorph getMorph(int morph4cc) {
		CASMorph morph = null;
		int NM = this.morphs.length;

		if (NM != 0) {

			if (this.morphsAreToBeMapped) {
				makeMorphMap();
			}

			if (this.morphMap != null) {
				morph = (CASMorph) this.morphMap.get(morph4cc);
			} else {
				int i = 0;
				int ii = NM;
				while (i != ii) {
					CASMorph MPH_I = this.morphs[i];
					if (MPH_I.hasName(morph4cc)) {
						morph = MPH_I;
						ii = i;
					} else {
						i++;
					}
				}
			}
		}
		return morph;
	}

	public void setTime(float ts) {
		this.timeStamp = ts;
	}

	public void adjustTime(float tadj) {
		this.timeStamp += tadj;
	}

	public void setDuration(float dur) {
		this.duration = dur;
	}

	public CASFrame(JAInputStream jins, float t, float dur) throws IOException {
		this();

		this.timeStamp = t;
		this.duration = dur;

		int N_M = jins.readInt();
		this.morphs = new CASMorph[N_M];
		for (int m = 0; m != N_M; m++) {
			this.morphs[m] = new CASMorph(jins);
		}

		int N_B = jins.readInt();
		this.trSets = new CASTRSet[N_B];
		for (int b = 0; b != N_B; b++) {
			this.trSets[b] = new CASTRSet(jins);
		}

		this.trSetsAreToBeMapped = (8 <= N_B);
		this.morphsAreToBeMapped = (8 <= N_M);
	}

	public void save(JAOutputStream jouts) throws IOException {
		int N_M = this.morphs.length;
		jouts.writeInt(N_M);
		for (int m = 0; m != N_M; m++) {
			this.morphs[m].save(jouts);
		}

		int N_PRS = this.trSets.length;
		jouts.writeInt(N_PRS);
		for (int p = 0; p != N_PRS; p++) {
			this.trSets[p].save(jouts);
		}
	}

	protected void makeTRSetMap() {
		this.trSetMap = new MapInt();

		for (CASTRSet trset : this.trSets) {
			this.trSetMap.put(trset.getFourCC(), trset);
		}

		this.trSetsAreToBeMapped = false;
	}

	protected void makeMorphMap() {
		this.morphMap = new MapInt();

		for (CASMorph morph : this.morphs) {
			this.morphMap.put(morph.getName(), morph);
		}

		this.morphsAreToBeMapped = false;
	}

	public void saveText(PrintWriter pwrtr) {
		if (pwrtr != null) {
			pwrtr.println(this.timeStamp);
			pwrtr.println();
		}
	}
}
