package jarp;

import jautil.FourCCUtil;
import jautil.JAInputStream;
import jautil.JAOutputStream;
import jautil.MapInt;
import java.io.IOException;
import java.io.PrintStream;

public class MorphHandler {
	private MapInt<MorphTarget> mtMap;

	public MorphHandler() {
		this.mtMap = new MapInt();
	}

	public MorphHandler(JAInputStream jins, boolean mthasnorm) throws IOException {
		this();

		int NMT = jins.readInt();
		for (int m = 0; m != NMT; m++) {
			MorphTarget target = new MorphTarget(jins, mthasnorm);
			addMorphTarget(target);
		}
	}

	public int getSize() {
		return this.mtMap.size();
	}

	public MorphTarget getMorphTarget(int fourcc) {
		return (MorphTarget) this.mtMap.get(fourcc);
	}

	public void save(JAOutputStream jouts) throws IOException {
		int NMT = this.mtMap.size();
		MorphTarget[] mtargets = new MorphTarget[NMT];
		this.mtMap.getValues(mtargets);

		jouts.writeInt(NMT);
		for (MorphTarget mt : mtargets) {
			mt.save(jouts);
		}
	}

	protected void addMorphTarget(MorphTarget target) {
		int fourcc = target.getFourCCName();

		if (FourCCUtil.isNull(fourcc)) {
			System.out.println(">>>>#### null morph target name");

			System.out.println("         n=" + this.mtMap.size());
		}

		this.mtMap.put(fourcc, target);
	}
}
