package player;

import java.io.IOException;
import java.io.OutputStream;
import java.net.Socket;
import java.util.zip.GZIPOutputStream;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import util.LoggerConfig;

public class VideoClient extends Thread {
	private static Logger logger= LogManager.getLogger();;;

	public static int VIDEO_SERVICE_PORT = 41414;
	public static int VIDEO_SERVICE_CHECK_PORT = 41415;
	private static final String PREFIX = "VideoClient: ";
	private final FrameDataExchange FRAMES_SOURCE;

	private static final String msg(String ext) {
		return "VideoClient: " + ext;
	}

	private static final void log(Level lev, String ext) {
		logger.log(lev, LoggerConfig.VIDEOMarker, msg(ext));
	}

	private static final void logException(Level lev, String ext, Exception ex) {
		logger.log(lev, LoggerConfig.VIDEOMarker, msg(ext + ": " + ex));
	}

	private static final void logException(String ext, Exception ex) {
		logException(LoggerConfig.WARNLevel, ext, ex);
	}

	public static boolean serviceIsAvailable() {
		boolean available = false;

		try {
			Socket sckt = new Socket("localhost", VIDEO_SERVICE_CHECK_PORT);
			sckt.close();
			available = true;
		} catch (IOException iox) {
			logException(LoggerConfig.DEBUGLevel, "serviceIsAvailable()", iox);
		}
		return available;
	}

	public static void startThread(FrameDataExchange fdx, int n, int w, int h, int fps, String moviepath) {
		try {
			VideoClient mcthread = new VideoClient(fdx, n, w, h, fps, moviepath);

			mcthread.start();
		} catch (IOException iox) {
			logException(" ctor", iox);
		}
	}

	private final int N_FRAMES;

	private final int W;

	private final int H;

	private final int FPS;

	private final String MOVIE_PATH;

	private OutputStream OUT_TO_SERVER;

	private final byte[] BUF;

	private int nWrite;

	private VideoClient(FrameDataExchange fdx, int n, int w, int h, int fps, String moviepath) throws IOException {
		log(LoggerConfig.LOGLevel, " Starts");

		this.FRAMES_SOURCE = fdx;

		this.N_FRAMES = n;
		this.W = w;
		this.H = h;
		this.FPS = fps;
		this.MOVIE_PATH = moviepath;

		Socket sckt = new Socket("localhost", VIDEO_SERVICE_PORT);
		OutputStream couts = sckt.getOutputStream();
		this.OUT_TO_SERVER = new GZIPOutputStream(couts);

		this.BUF = new byte[4];
		this.nWrite = 0;
	}

	public void run() {
		logger.log(LoggerConfig.INFOLevel, LoggerConfig.THREADMarker, "Run: videoClient");
		try {
			log(LoggerConfig.LOGLevel, "run()");

			long ta = System.nanoTime();

			writeInt(this.N_FRAMES);
			writeInt(this.W);
			writeInt(this.H);
			writeInt(this.FPS);
			writeString(this.MOVIE_PATH);

			int P_SIZE = this.W * this.H * 3;
			byte[] pixels = new byte[P_SIZE];
			for (int f = 0; f != this.N_FRAMES; f++) {
				pixels = this.FRAMES_SOURCE.getFullForEmpty(pixels);
				writePixels(pixels);
			}
			this.OUT_TO_SERVER.close();

			long tb = System.nanoTime();

			log(LoggerConfig.STATSLevel, " Output: nWrite=" + this.nWrite);
			int tall = (int) ((tb - ta) / 1000000L);
			log(LoggerConfig.STATSLevel, String.format(" Total t=%d ms", new Object[] { Integer.valueOf(tall) }));

			log(LoggerConfig.STATSLevel, " Done: N_FRAMES=" + this.N_FRAMES);
		} catch (IOException iox) {
			logException("run() ", iox);
		} catch (InterruptedException ix) {
			logException("", ix);
			Thread.currentThread().interrupt();
		}
		logger.log(LoggerConfig.STATSLevel, LoggerConfig.THREADMarker, "End: videoClient");
	}

	private void writePixels(byte[] pixels) throws IOException {
		this.OUT_TO_SERVER.write(pixels);
		this.nWrite += pixels.length;
	}

	private void writeString(String s) throws IOException {
		int N = s.length();
		writeInt(N);
		for (int i = 0; i != N; i++) {
			writeInt(s.charAt(i) & 0xFFFF);
		}
	}

	private void writeInt(int val) throws IOException {
		int i = val;
		this.BUF[0] = ((byte) i);
		i >>= 8;
		this.BUF[1] = ((byte) i);
		i >>= 8;
		this.BUF[2] = ((byte) i);
		i >>= 8;
		this.BUF[3] = ((byte) i);
		this.OUT_TO_SERVER.write(this.BUF);
		this.nWrite += 4;
	}
}
