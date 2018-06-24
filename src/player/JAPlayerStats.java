package player;

import java.util.LinkedList;

public class JAPlayerStats {
	private final LinkedList<FrameData> FRAMES_LIST;
	private int iFrame;
	private int nFrames;
	private FrameData fdCurrent;

	private static abstract interface FDFloatGetter {
		public abstract float get(JAPlayerStats.FrameData paramFrameData);
	}

	private static class FrameData {
		public int f;
		public float tGen;
		public float tDisp;
		public float tPlay;
		public float tIdle;

		public FrameData(int ff) {
			this.f = ff;
		}
	}

	public JAPlayerStats() {
		this.FRAMES_LIST = new LinkedList();
		this.iFrame = -1;
		this.nFrames = 0;
		this.fdCurrent = null;
	}

	public void startNewFrame(int f) {
		if (this.iFrame < f) {

			this.fdCurrent = new FrameData(f);
			this.FRAMES_LIST.addLast(this.fdCurrent);
			this.iFrame = f;
			this.nFrames += 1;
		} else {
			System.out.println("####  JAPlayerStats low frame index error f-new,f-cur=" + f + "," + this.iFrame);
		}
	}

	public void setGenerateTime(float gt) {
		this.fdCurrent.tGen = gt;
	}

	public void setDisplayTime(float dt) {
		this.fdCurrent.tDisp = dt;
	}

	public void setPlayTime(float pt) {
		this.fdCurrent.tPlay = pt;
	}

	public void setIdleTime(float it) {
		this.fdCurrent.tIdle = it;
	}

	public float getAverageGenerateTime(int istart) {
		return getAverage(this.T_GEN_GETTER, istart);
	}

	public float getAverageDisplayTime(int istart) {
		return getAverage(this.T_DISP_GETTER, istart);
	}

	public float getAveragePlayTime(int istart) {
		return getAverage(this.T_PLAY_GETTER, istart);
	}

	public float getAverageIdleTime(int istart) {
		return getAverage(this.T_IDLE_GETTER, istart);
	}

	private int cacheNVFInit = 0;
	private int cacheNValid = -1;

	public int getCountValid(int finit) {
		int nv = 0;

		if ((finit == this.cacheNVFInit) && (0 <= this.cacheNValid)) {
			nv = this.cacheNValid;
		} else {
			nv = this.nFrames;

			java.util.Iterator<FrameData> fditer = this.FRAMES_LIST.iterator();
			while ((fditer.hasNext()) && (((FrameData) fditer.next()).f < finit)) {
				nv--;
			}

			this.cacheNVFInit = finit;
			this.cacheNValid = nv;
		}

		return nv;
	}

	private float getAverage(FDFloatGetter fdfgetter, int finit) {
		float ave = 0.0F;
		int N = getCountValid(finit);

		if (N != 0) {
			float total = 0.0F;
			for (FrameData fd : this.FRAMES_LIST) {
				if (finit <= fd.f)
					total += fdfgetter.get(fd);
			}
			ave = total / N;
		}

		return ave;
	}

	public final FDFloatGetter T_GEN_GETTER = new FDFloatGetter() {
		public float get(JAPlayerStats.FrameData fd) {
			return fd.tGen;
		}
	};
	public final FDFloatGetter T_DISP_GETTER = new FDFloatGetter() {
		public float get(JAPlayerStats.FrameData fd) {
			return fd.tDisp;
		}
	};
	public final FDFloatGetter T_PLAY_GETTER = new FDFloatGetter() {
		public float get(JAPlayerStats.FrameData fd) {
			return fd.tPlay;
		}
	};
	public final FDFloatGetter T_IDLE_GETTER = new FDFloatGetter() {
		public float get(JAPlayerStats.FrameData fd) {
			return fd.tIdle;
		}
	};
}
