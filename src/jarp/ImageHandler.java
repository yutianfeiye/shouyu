package jarp;

import com.jogamp.opengl.GL2;
import com.jogamp.opengl.glu.gl2.GLUgl2;
import jautil.JAException;
import jautil.JAIO;
import jautil.JAInputStream;
import jautil.JAOptions;
import jautil.JAOutputStream;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintStream;
import java.net.URL;
import javax.imageio.ImageIO;

public class ImageHandler {
	protected final JAOptions JA_OPTIONS;
	protected ImageBytes imageRGBA;
	protected int glTextureID;

	public int getGLTextureID() {
		return this.glTextureID;
	}

	public ImageHandler(JAOptions jopts) {
		this.JA_OPTIONS = jopts;
	}

	public void loadTextureFromURL(GL2 gl, GLUgl2 glu, String IMG_URL_STR) throws IOException, JAException {
		boolean IS_V22 = true;
		loadTextureFromURL(gl, glu, IMG_URL_STR, true);
	}

	public void loadTextureFromURL(GL2 gl, GLUgl2 glu, String IMG_URL_STR, boolean IS_V22)
			throws IOException, JAException {
		boolean IS_PNG = !this.JA_OPTIONS.textureInputFormatIsJARP();

		boolean IS_V_FLIPPED = this.JA_OPTIONS.textureInputIsFlipped();

		boolean IS_COMPRESSED = this.JA_OPTIONS.textureInputIsCompressed();

		URL IMG_URL = JAIO.stringToURL(IMG_URL_STR);
		loadTextureFromURL(gl, glu, IMG_URL, IS_COMPRESSED, IS_PNG, IS_V_FLIPPED, IS_V22);
	}

	public void loadTextureFromURL(GL2 gl, GLUgl2 glu, URL IMG_URL, boolean COMPRESSED, boolean PNG,
			boolean IS_V_FLIPPED) throws IOException, JAException {
		loadTextureFromURL(gl, glu, IMG_URL, COMPRESSED, PNG, IS_V_FLIPPED, true);
	}

	public void loadTextureFromURL(GL2 gl, GLUgl2 glu, URL IMG_URL, boolean COMPRESSED, boolean PNG,
			boolean IS_V_FLIPPED, boolean IS_V22) throws IOException, JAException {
		checkLoadFlags(COMPRESSED, PNG, IS_V_FLIPPED);

		if (PNG) {

			BufferedImage bi = ImageIO.read(IMG_URL);

			this.imageRGBA = new ImageBytes(bi, false, IS_V_FLIPPED);
		} else {
			InputStream uins = JAIO.getInputStream(IMG_URL);
			JAInputStream jins = new JAInputStream(uins);
			this.imageRGBA = new ImageBytes(jins, COMPRESSED, IS_V22);
		}

		if (((gl != null ? 1 : 0) & (glu != null ? 1 : 0)) != 0) {
			generateMipMaps(gl, glu);
		}
	}

	public void loadTextureFromStreamV21(GL2 gl, GLUgl2 glu, JAInputStream jins) throws IOException, JAException {
		if (!this.JA_OPTIONS.textureInputFormatIsJARP()) {
			throw new JAException("Embedded PNG texture not supported (v2.1)");
		}

		boolean IS_V_FLIPPED = this.JA_OPTIONS.textureInputIsFlipped();
		boolean COMPRESSED = this.JA_OPTIONS.textureInputIsCompressed();

		checkLoadFlags(COMPRESSED, false, IS_V_FLIPPED);

		int NI = jins.readInt();

		this.imageRGBA = new ImageBytes(jins, COMPRESSED, false);

		if (((gl != null ? 1 : 0) & (glu != null ? 1 : 0)) != 0) {
			generateMipMaps(gl, glu);
		}
	}

	public void loadTextureFromStreamV22(GL2 gl, GLUgl2 glu, JAInputStream jins, boolean COMPRESSED, boolean PNG,
			boolean IS_V_FLIPPED) throws IOException, JAException {
		checkLoadFlags(COMPRESSED, PNG, IS_V_FLIPPED);

		if (PNG) {

			BufferedImage bimg = jins.readImage(false);

			this.imageRGBA = new ImageBytes(bimg, false, IS_V_FLIPPED);
		} else {
			this.imageRGBA = new ImageBytes(jins, COMPRESSED, true);
		}

		if (((gl != null ? 1 : 0) & (glu != null ? 1 : 0)) != 0) {
			generateMipMaps(gl, glu);
		}
	}

	public void saveJAImageToFile() throws IOException {
		boolean COMPRESS = this.JA_OPTIONS.textureOutputDoCompressed();
		String OUTURL = this.JA_OPTIONS.textureSaveFileURL();
		String OUTPATH = JAIO.urlToOutputFilePath(OUTURL);

		if (OUTPATH != null) {
			JAIO.validateOutputFile(OUTPATH);
			saveJAImageToFile(OUTPATH, COMPRESS);
		} else {
			System.out.println("Invalid texture output file URL: " + OUTURL);
		}
	}

	public void saveJAImageToFile(String outpath, boolean COMPRESS) throws IOException {
		JAOutputStream jouts = new JAOutputStream(outpath);

		saveJAImageToStream(jouts, COMPRESS);

		System.out.println("####  Saved JA texture, v2.2 format" + (COMPRESS ? " (compressed)" : "") + ": " + outpath);
	}

	public void saveJAImageToStream(JAOutputStream jouts, boolean compress) throws IOException {
		this.imageRGBA.save(jouts, compress);
	}

	public void saveJAImageAsPNG(String pngpath, boolean vflippedpng) throws IOException {
		this.imageRGBA.saveAsPNG(pngpath, vflippedpng);
	}

	public void saveJAImageAsPNG(JAOutputStream jouts, boolean vflippedpng) throws IOException {
		this.imageRGBA.saveAsPNG(jouts, vflippedpng);
	}

	protected void checkLoadFlags(boolean COMPRESSED, boolean PNG, boolean IS_V_FLIPPED) throws JAException {
		if ((PNG) && (COMPRESSED)) {
			throw new JAException("(External) compression of PNG images is not supported");
		}

		if ((!PNG) && (IS_V_FLIPPED)) {
			throw new JAException("Vertically-flipped image input is supported only for PNG format.");
		}
	}

	protected void generateMipMaps(GL2 gl, GLUgl2 glu) {
		int[] id = new int[1];
		gl.glGenTextures(1, id, 0);
		int TEXID = id[0];
		this.glTextureID = TEXID;

		gl.glBindTexture(3553, TEXID);

		gl.glTexParameteri(3553, 10242, 10497);

		gl.glTexParameteri(3553, 10243, 10497);

		gl.glTexParameteri(3553, 10240, 9729);

		gl.glTexParameteri(3553, 10241, 9987);

		glu.gluBuild2DMipmaps(3553, 4, this.imageRGBA.W, this.imageRGBA.H, 6408, 5121, this.imageRGBA.IMG_BYTE_BUFFER);
	}
}
