package jautil.avatar;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import util.LoggerConfig;

public class DirectFilesAccess extends BaseAccess implements AvatarAccess {
	private static Logger logger = LogManager.getLogger();;

	public DirectFilesAccess(String av, String avburl) throws AvatarDataException {
		logger.log(LoggerConfig.TRACELevel, LoggerConfig.AVATARMarker,
				"Direct files data access for " + av + " at " + avburl);
		
		setAvatarData(new AvatarData(av, avburl));
	}
}
