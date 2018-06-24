package jautil.cache;

import jautil.JAIO;
import jautil.URLDataLoader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLConnection;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import util.LoggerConfig;

public abstract class JACacheHandler {
	private static Logger logger = LogManager.getLogger();;

	private static final String ENTRY_DESC_NAME = "desc";

	private static final String ENTRY_DATA_NAME = "data";

	private transient URLConnection entryConnection;

	private transient int entryLength;

	private transient long entryLastModTime;

	private final File CACHE_ROOT_DIR;

	private final String C_TAG;

	protected JACacheHandler() {
		this.CACHE_ROOT_DIR = getCacheRootDir();
		JAIO.establishDirectory(this.CACHE_ROOT_DIR);
		this.C_TAG = getCacheTag();
	}

	protected abstract File getCacheRootDir();

	protected abstract String getCacheTag();

	public boolean hasACacheEntry(String ename, String url) {
		return lookForExistingCacheEntry(ename, url) != null;
	}

	public boolean isCached(String ename, String url) {
		boolean incache = false;

		JACacheDescriptor desc = lookForExistingCacheEntry(ename, url);
		if (desc != null) {
			getRemoteURLProperties(url);
			if (this.entryConnection != null) {
				incache = desc.matchesTimeAndLength(this.entryLastModTime, this.entryLength);
			}
		}

		return incache;
	}

	public JACacheDescriptor ensureCached(String name, String url) {
		JACacheDescriptor cdesc = lookForExistingCacheEntry(name, url);
		JACacheDescriptor vdesc = null;

		getRemoteURLProperties(url);
		if (this.entryConnection == null) {

			if (cdesc != null) {
				logger.log(LoggerConfig.LOGLevel, LoggerConfig.CACHEMarker, "Using " + this.C_TAG + " cache entry for "
						+ name + " as " + "original is currently inaccessible");

				vdesc = cdesc;
			}
		} else if ((cdesc != null) && (cdesc.matchesTimeAndLength(this.entryLastModTime, this.entryLength))) {
			logger.log(LoggerConfig.LOGLevel, LoggerConfig.CACHEMarker,
					this.C_TAG + " cache: Entry is up to date for " + name);

			logger.log(LoggerConfig.TRACELevel, LoggerConfig.CACHEMarker,
					this.C_TAG + " cache: Remote URL for " + name + ": " + cdesc.url());

			vdesc = cdesc;

		} else {

			logger.log(LoggerConfig.TRACELevel, LoggerConfig.CACHEMarker,
					this.C_TAG + " cache: Entry for " + name + " is inaccessible or stale");

			JACacheDescriptor desc = new JACacheDescriptor(name, url, this.entryLastModTime, this.entryLength);

			flushFromCache(name);

			boolean dlok = downloadDataToCache(desc);
			if (dlok) {
				makeCacheEntryForDescriptor(desc);
				vdesc = desc;

				logger.log(LoggerConfig.LOGLevel, LoggerConfig.CACHEMarker,
						this.C_TAG + " cache: New entry for " + name + " loaded from " + desc

								.url());

			} else {
				flushFromCache(name);
				vdesc = desc;
			}
		}
		if (vdesc == null) {
			logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.CACHEMarker,
					"ensureCached for [" + name + "," + url + "] returns null");
		} else {
			logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.CACHEMarker,
					"ensureCached for [" + name + "," + url + "] returns " + vdesc.url());
		}
		return vdesc;
	}

	public URL getCachedDataURL(String ename, String durl) {
		JACacheDescriptor desc = ensureCached(ename, durl);

		return getDataFileURL(desc);
	}

	public URL getDataFileURL(JACacheDescriptor desc) {
		URL resURL = null;
		if (desc != null) {
			URL dataURL = JAIO.fileToURL(DATA_FILE(desc));
			if (JAIO.getPossibleInputStream(dataURL) == null) {
				logger.log(LoggerConfig.TRACELevel, LoggerConfig.CACHEMarker,
						"Data URL for " + desc.entryName() + ": " + dataURL.toString());
				resURL = JAIO.stringToURL(desc.url());
			} else {
				resURL = dataURL;
			}
			logger.log(LoggerConfig.TRACELevel, LoggerConfig.CACHEMarker,
					"Accessible URL for " + desc.entryName() + ": " + resURL.toString());
		}
		return resURL;
	}

	public String getDataFileURLStr(JACacheDescriptor desc) {
		URL DF_URL = getDataFileURL(desc);

		return DF_URL == null ? null : DF_URL.toString();
	}

	protected JACacheDescriptor lookForExistingCacheEntry(String name, String url) {
		JACacheDescriptor desc = null;

		InputStream dins = JAIO.getPossibleInputStream(DESC_FILE(name));
		if (dins != null) {
			desc = JACacheDescriptor.readDescriptor(dins);

			if ((desc != null) && (!desc.matchesURL(url))) {
				desc = null;
				logger.log(LoggerConfig.TRACELevel, LoggerConfig.CACHEMarker, "New URL for " + name + ": " + url);
			}
		}

		return desc;
	}

	protected void getRemoteURLProperties(String url) {
		this.entryConnection = null;
		if (JAIO.checkedURL(url, true) != null) {
			this.entryConnection = JAIO.getURLConnection(url, true);
		}

		if (this.entryConnection != null) {
			this.entryLength = this.entryConnection.getContentLength();
			this.entryLastModTime = this.entryConnection.getLastModified();
		} else {
			logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.CACHEMarker, "Cannot connect to " + url);
		}
	}

	protected boolean downloadDataToCache(JACacheDescriptor desc) {
		return downloadDataToCache(desc.entryName(), desc.url());
	}

	protected boolean downloadDataToCache(String NAME, String URL) {
		boolean dtcok = false;

		byte[] udata = URLDataLoader.getURLData(URL, "item " + NAME);
		if (udata != null) {
			File E_BASE = BASE_DIR(NAME);
			JAIO.establishDirectory(E_BASE);

			OutputStream couts = JAIO.possibleFileOutputStream(DATA_FILE(E_BASE));
			if (couts != null) {
				try {
					couts.write(udata);
					couts.flush();
					couts.close();
					udata = null;
					dtcok = true;
				} catch (IOException iox) {
					logger.log(LoggerConfig.WARNLevel, LoggerConfig.CACHEMarker,
							"Error downloading to cache for " + NAME + ": " + iox);
				}
			}
		}

		return dtcok;
	}

	protected void makeCacheEntryForDescriptor(JACacheDescriptor desc) {
		File BASE_DIR = BASE_DIR(desc.entryName());
		JAIO.establishDirectory(BASE_DIR);

		OutputStream douts = JAIO.fileOutputStream(DESC_FILE(BASE_DIR));
		if (douts != null) {
			desc.write(douts);
		}
	}

	protected void flushFromCache(String ename) {
		File AV_BASE = BASE_DIR(ename);

		DATA_FILE(AV_BASE).delete();
		DESC_FILE(AV_BASE).delete();

		AV_BASE.delete();
	}

	protected final File BASE_DIR(String ename) {
		return new File(this.CACHE_ROOT_DIR, ename);
	}

	protected final File CACHE_FILE(File dir, String f) {
		return new File(dir, f);
	}

	protected final File DESC_FILE(File ebase) {
		return CACHE_FILE(ebase, "desc");
	}

	protected final File DESC_FILE(String ename) {
		return CACHE_FILE(BASE_DIR(ename), "desc");
	}

	protected final File DESC_FILE(JACacheDescriptor desc) {
		return DESC_FILE(desc.entryName());
	}

	protected final File DATA_FILE(File ebase) {
		return CACHE_FILE(ebase, "data");
	}

	protected final File DATA_FILE(String ename) {
		return CACHE_FILE(BASE_DIR(ename), "data");
	}

	protected final File DATA_FILE(JACacheDescriptor desc) {
		return DATA_FILE(desc.entryName());
	}
}
