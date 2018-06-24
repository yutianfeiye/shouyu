package sigmlanim.sigmlstream;

import java.util.ArrayList;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import sigmlanim.AnimatedSign;
import sigmlanim.sigmlstream.interfaces.StreamedSiGMLSupplierForAnimationGen;
import util.LoggerConfig;

public class FilteringSupplierForAnimGen implements StreamedSiGMLSupplierForAnimationGen {
	private static Logger logger=LogManager.getLogger();

	private final StreamedSiGMLSupplierForAnimationGen PRIMARY_SUPPLIER;

	private ArrayList<AnimatedSign> signs;

	private ArrayList<Boolean> toAnimgen;

	private int countSigns;

	private int countDone;

	private boolean gotAllSigns;
	private int fBase;
	private float tBase;

	public FilteringSupplierForAnimGen(StreamedSiGMLSupplierForAnimationGen SUPPLIER) {
		this.PRIMARY_SUPPLIER = SUPPLIER;
		this.signs = new ArrayList();

		this.toAnimgen = new ArrayList();

		this.countSigns = 0;
		this.countDone = 0;
		this.gotAllSigns = false;
		this.fBase = 0;
		this.tBase = 0.0F;
	}

	public AnimatedSign getNextSignToBeAnimated() throws InterruptedException {
		AnimatedSign sign = null;

		while ((sign == null) && (!this.gotAllSigns)) {
			logger.log(LoggerConfig.INFOLevel, LoggerConfig.CONTROLMarker,
					"FilteringSupplierForAnimGen: countSigns " + this.countSigns + " countDone " + this.countDone);

			sign = this.PRIMARY_SUPPLIER.getNextSignToBeAnimated();
			if (sign != null) {
				boolean OK_FOR_AG = sign.getFrames() == null;
				logger.log(LoggerConfig.LOGLevel, LoggerConfig.CONTROLMarker, "FilteringSupplierForAnimGen: Sign \""
						+ sign.getGloss() + "\"" + (OK_FOR_AG ? " (no frames)" : ""));
				if (sign.getCameraSettings() != null) {
					logger.log(LoggerConfig.TRACELevel, LoggerConfig.CONTROLMarker,
							"FilteringSupplierForAnimGen: Camera change: " + sign.getCameraSettings());
				}
				if (sign.getAvatarSettings() != null) {
					logger.log(LoggerConfig.TRACELevel, LoggerConfig.CONTROLMarker,
							"FilteringSupplierForAnimGen: Avatar change: " + sign.getAvatarSettings());
				}
				this.countSigns += 1;

				if (!OK_FOR_AG) {
					putProcessedSign(sign);
					doneSignAnimation();
					sign = null;
				}
			} else {
				this.gotAllSigns = true;
				logger.log(LoggerConfig.STATSLevel, LoggerConfig.CONTROLMarker,
						"FilteringSupplierForAnimGen: getSigns count=" + this.countSigns);
			}
		}

		return sign;
	}

	public void putProcessedSign(AnimatedSign sign) {
		logger.log(LoggerConfig.LOGLevel, LoggerConfig.CONTROLMarker,
				"FilteringSupplierForAnimGen: putProcessedSign \"" + sign.getGloss() + "\"");

		this.signs.add(sign);
		this.toAnimgen.add(Boolean.valueOf(sign.getFrames() == null));

		sign.ensureBaseIndex(this.fBase);
		sign.ensureStartTime(this.tBase);

		this.fBase = sign.getFramesLimit();
		this.tBase = sign.getLimitTime(this.tBase);

		this.PRIMARY_SUPPLIER.putProcessedSign(sign);
	}

	public void doneSignAnimation() {
		this.PRIMARY_SUPPLIER.doneSignAnimation();
		this.countDone += 1;

		if ((this.gotAllSigns) && (this.countDone == this.countSigns)) {
			clearData();
			logger.log(LoggerConfig.STATSLevel, LoggerConfig.CONTROLMarker,
					"FilteringSupplierForAnimGen: done all signs, count=" + this.countSigns);
		}
	}

	private void clearData() {
		this.signs.clear();
		this.toAnimgen.clear();
		this.signs = null;
		this.toAnimgen = null;
	}
}
