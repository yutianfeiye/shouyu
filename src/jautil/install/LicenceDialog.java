package jautil.install;

import jautil.JAIO;
import java.awt.Component;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Frame;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.io.PrintStream;
import java.net.MalformedURLException;
import java.net.URL;
import javax.swing.BorderFactory;
import javax.swing.Box;
import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JEditorPane;
import javax.swing.JLabel;
import javax.swing.JScrollPane;

public final class LicenceDialog extends JDialog {
	private static final String LICENCE_HTML = "JASLicenceV1.html";
	private static final String ACCEPT_NAME = "Accept";
	private static final String DECLINE_NAME = "Decline";
	private final ActionListener DECIDE_LISTENER = new ActionListener() {
		public void actionPerformed(ActionEvent aevt) {
			if ("Accept".equals(aevt.getActionCommand())) {
				LicenceDialog.this.accepted = true;
			}
			LicenceDialog.this.setVisible(false);
		}
	};

	protected boolean accepted = false;

	public static boolean isOKLicenceDialog(String version) {
		LicenceDialog ldlg = new LicenceDialog(null, null, version);
		ldlg.setVisible(true);

		boolean ok = ldlg.isAccepted();
		ldlg.dispose();

		return ok;
	}

	private LicenceDialog(Frame owner, String extlurl, String version) {
		super(owner, "JASigning " + version + " Install: Accept License Terms?", true);

		setResizable(false);

		Component intropane = makeIntroPane();
		Component licensepane = makeLicensePane(extlurl);
		Component decidepane = makeDecidePane();

		Container paneDlg = getContentPane();
		paneDlg.add(intropane, "North");
		paneDlg.add(licensepane, "Center");
		paneDlg.add(decidepane, "South");

		pack();
		setLocationRelativeTo(null);
	}

	public boolean isAccepted() {
		return this.accepted;
	}

	private Component makeIntroPane() {
		Box ipane = Box.createVerticalBox();
		JLabel ilabela = new JLabel(
				"<html>This <em>JASigning</em> software is distributed under the licence terms below.</html>");

		JLabel ilabelb = new JLabel("<html>Please decide whether or not you accept these terms.</html>");

		ipane.add(ilabela);
		ipane.add(ilabelb);
		ipane.setBorder(BorderFactory.createEmptyBorder(16, 8, 8, 8));

		return ipane;
	}

	private Component makeLicensePane(String extlurl) {
		JEditorPane licedpane = new JEditorPane();
		licedpane.setEditable(false);

		URL licenceurl = getLicenceURL(extlurl);
		try {
			licedpane.setPage(licenceurl);
		} catch (IOException iox) {
			System.out.println("Bad licence URL: " + licenceurl);
		}

		JScrollPane licencescroller = new JScrollPane(licedpane);
		licencescroller.setVerticalScrollBarPolicy(22);

		licencescroller.setPreferredSize(new Dimension(576, 384));
		licencescroller.setOpaque(false);
		licencescroller.setBorder(BorderFactory.createCompoundBorder(BorderFactory.createEmptyBorder(0, 8, 0, 8),
				BorderFactory.createLoweredBevelBorder()));

		return licencescroller;
	}

	private Component makeDecidePane() {
		JButton declinebttn = new JButton("Decline");
		JButton acceptbttn = new JButton("Accept");
		acceptbttn.setActionCommand("Accept");
		declinebttn.addActionListener(this.DECIDE_LISTENER);
		acceptbttn.addActionListener(this.DECIDE_LISTENER);

		Box decidepane = Box.createHorizontalBox();
		decidepane.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 16));

		decidepane.add(Box.createHorizontalGlue());
		decidepane.add(declinebttn);
		decidepane.add(Box.createHorizontalStrut(8));
		decidepane.add(acceptbttn);

		return decidepane;
	}

	private URL getLicenceURL(String extlurl) {
		URL lurl = null;

		if (extlurl != null) {
			try {
				lurl = new URL(extlurl);
			} catch (MalformedURLException mux) {
				System.out.println("Bad external licence URL: " + extlurl);
			}
		}

		if (lurl == null) {

			URL localurl = LicenceDialog.class.getResource("LicenceDialog.class");
			lurl = JAIO.resolveURL(localurl, "JASLicenceV1.html");
		}

		return lurl;
	}
}
