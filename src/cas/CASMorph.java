package cas;

import jautil.FourCCUtil;
import jautil.JAInputStream;
import jautil.JAOutputStream;
import java.io.IOException;
import java.io.PrintWriter;

public class CASMorph {
	private int fourCCName;
	private float amount;

	public CASMorph(String name, float value) {
		this(FourCCUtil.fourCCInt(name), value);
	}

	public CASMorph(int name4cc, float value) {
		this.fourCCName = name4cc;
		this.amount = value;
	}

	public CASMorph(CASMorph morph) {
		this.fourCCName = morph.getName();
		this.amount = morph.getAmount();
	}

	public CASMorph(JAInputStream jins) throws IOException {
		this.fourCCName = jins.readInt();
		this.amount = jins.readFloat();
	}

	public boolean hasName(int nm4cc) {
		return this.fourCCName == nm4cc;
	}

	public int getName() {
		return this.fourCCName;
	}

	public float getAmount() {
		return this.amount;
	}

	public void save(JAOutputStream jouts) throws IOException {
		jouts.writeInt(this.fourCCName);
		jouts.writeFloat(this.amount);
	}

	public void saveText(PrintWriter pwrtr) {
		String fccstr = FourCCUtil.fourCCString(this.fourCCName);
		int NX = 4 - fccstr.length();

		pwrtr.print(fccstr);

		if (0 < NX) {
			pwrtr.print("    ".substring(0, NX));
		}
		pwrtr.print("  ");
		pwrtr.print(this.amount);
	}
}
