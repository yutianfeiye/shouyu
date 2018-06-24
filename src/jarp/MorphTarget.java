package jarp;

import jautil.FourCCUtil;
import jautil.JAInputStream;
import jautil.JAOutputStream;
import java.io.IOException;

public class MorphTarget {
	private int fourCCName;
	private MorphSet[] morphSets;

	public MorphTarget() {
		this("");
	}

	public MorphTarget(String name) {
		this.fourCCName = FourCCUtil.fourCCInt(name);
		this.morphSets = null;
	}

	public int getFourCCName() {
		return this.fourCCName;
	}

	public int getMorphSetCount() {
		return this.morphSets.length;
	}

	public MorphSet[] getMorphSets() {
		return this.morphSets;
	}

	public MorphSet getMorphSet(int i) {
		return this.morphSets[i];
	}

	public MorphTarget(JAInputStream jins, boolean mthasnorm) throws IOException {
		String name = jins.readString();
		this.fourCCName = FourCCUtil.fourCCInt(name);

		int N_MS = jins.readInt();
		this.morphSets = new MorphSet[N_MS];

		for (int i = 0; i != N_MS; i++) {
			this.morphSets[i] = new MorphSet(jins, mthasnorm);
		}
	}

	public void save(JAOutputStream jouts) throws IOException {
		jouts.write4CCString(this.fourCCName);

		int N_MS = this.morphSets.length;
		jouts.writeInt(N_MS);
		for (int i = 0; i != N_MS; i++) {
			this.morphSets[i].save(jouts);
		}
	}
}
