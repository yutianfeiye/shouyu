/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.csl;

import edu.stanford.nlp.trees.Tree;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.Font;
import java.awt.FontFormatException;
import java.awt.ScrollPane;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.StringTokenizer;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.SwingWorker;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.DefaultTableModel;
import static org.csl.Nlp4.getDependencies;
import java.io.InputStream;
import static utilhc.HNSUtils.indentXML;
import static utilhc.HNSUtils.sigmlFromHNSUItems;
import static utilhc.HNSUtils.symHNSItemsFromHNSUItems;

/**
 *
 * @author Rehman
 */
public class TranslationWithAvatar extends javax.swing.JPanel {

    /**
     * Creates new form TranslationWithAvatar
     */
    static ArrayList<File> inputFiles = new ArrayList<File>();
    static ArrayList<String> sentences = new ArrayList();
    JFileChooser chooser;
    String chooserTitle = "Open Text File";
    static String filePath = "";
    static String fileName = "";
    public static boolean fileOpened = false;
    public static boolean stopTranslation = false;
    public static boolean pauseTranslation = false;
    public static int currentSentence = 1;
    public static boolean preferencesChanged = false;
    public TranslationWithAvatar() {

        if(!Preferences.preferencesInitialized){
            Preferences.setUserPreferences();
        }
        if(MyUtils.verbs.size()==0){
            MyUtils.initializeVerbsHashtable();
            System.out.println("Verb entries ="+MyUtils.verbs.size());
        }
        if(MyUtils.rules.size()==0){
            MyUtils.readRulesFile();
            System.out.println(MyUtils.rules.size()+" rules found.");
        }
        initComponents();
        /*
        this.addWindowListener(new WindowAdapter(){
            public void windowClosing(WindowEvent e){
                stopTranslation = true;
            }
        });
        */
        btnStop.setEnabled(false);
        btnPause.setEnabled(false);
        HNSBtn.setVisible(false);
        sigmlTA.setVisible(false);
        btnAnimate.setVisible(false);
        btnTranslateNext.setEnabled(false);
        jScrollPane3.setVisible(false);
        lblHamnosysDatabase.setText("   Hamnosys Database:  "+Preferences.selectedLanguageName);
        //txaEnglishSentence.setVisible(false);
        //txaTranslatedSentence.setVisible(false);
        setTablesProperties();
        initSwingComponents();
        initUtilComponents();
//        initBrowser();
//        mainWindow = new ScrollPane(ScrollPane.SCROLLBARS_AS_NEEDED);
//        mainWindow.add(jPanel1);
        //       initBrowserWithProxy("172.2.0.6");

        modelT2 = (DefaultTableModel) jTable2.getModel();
    }


    public final String mergeSiGML(String[] manualSiGML, String nmanual) {
        String wordSiGML = "";
        byte flag = 0;
        for (String lineOfCode : manualSiGML) {
            if (flag == 2) {
                lineOfCode += nmanual;
            }
            wordSiGML += lineOfCode + "\n";
            flag++;
        }
        return wordSiGML;
    }

    public final String wordToSentenceSiGML(ArrayList<String> wordList) {
        String output = "", temp = "";
        for (int i = 0; i < wordList.size(); i++) {
            temp = wordList.get(i);
//            System.out.println(i + ": Before : \n" + temp);
            if (i == 0) {
                temp = temp.replaceFirst("</sigml>", "");
            } else if (i == wordList.size() - 1) {
                temp = temp.replace("<?xml version=\"1.0\" encoding=\"utf-8\"?>", "");
                temp = temp.replaceFirst("<sigml>", "");
            } else {
                temp = temp.replace("<?xml version=\"1.0\" encoding=\"utf-8\"?>", "");
                temp = temp.replaceFirst("<sigml>", "");
                temp = temp.replaceFirst("</sigml>", "");
            }
            output += temp;
//            System.out.println(i + ": After : \n" + temp);
        }
//        System.out.println(temp.contains("<?xml version=\"1.0\" encoding=\"utf-8\"?>"));
//        output = output.replace("\n\n", "");
//        ManualSiGML = indentXML(ManualSiGML);
//        return output.replace("\n\n", "");
        return output.replaceAll("\n+", "\n");
    }
    
    private class TranslationThread extends Thread{
        int start;
        public TranslationThread(int startSentenceIndex){
            start = startSentenceIndex;
        }
        public void run(){
            Nlp4 parser = new Nlp4();
            int j;
            for(j=start; j<sentences.size(); j++){
                currentSentence = j;
                if(stopTranslation||pauseTranslation){
                    break;
                }
                txtSentenceNo.setText(Integer.toString(j+1));
                String str = sentences.get(j);
                txaEnglishSentence.setText(str);
                System.out.println("Sentence = "+str);
                Tree tree = parser.parse(str);
                String treeOutput=tree.toString();
                String str2 = str.replace("?", ""); // remove question mark if any (dependency tool correction)
                String dep= getDependencies(str2);

                MyTree tree3= MyUtils.constructAnnotatedTree(treeOutput,dep);
                MyList list = MyUtils.constructAnnotatedList(treeOutput, dep);
                String output= MyUtils.translate(str, tree3, list);
                System.out.println("Output = "+output);
                output = MyUtils.mapCompoundWords(output);
                txaTranslatedSentence.setText(output);
                int error = playAnimation(output);
                if(error==1){
                    break;
                }
                try{
                TimeUnit.SECONDS.sleep(3);
                }catch(Exception e){
                    System.out.println("Error stopping thread.");
                }
            }
            if(stopTranslation||j==sentences.size()){
                btnTranslateAll.setEnabled(true);
                btnStop.setEnabled(false);
                btnPause.setEnabled(false);
                txtSentenceNo.setText("1");
                btnTranslate.setEnabled(true);
                btnTranslateNext.setEnabled(true);
                txtSentenceNo.setEditable(true);
            }
        }
    }
    public int playAnimation(String sentence){
        if (!sentence.equals(input)) {
            HNSBtnActionPerformed(null);
            }
            Socket socket = null;
            if (avatarReady) {
                try {

                    socket = new Socket("127.0.0.1", 8052);
                    if (socket.isConnected()) {
                        OutputStream outstream = socket.getOutputStream();
                        PrintWriter out = new PrintWriter(outstream);
                        out.print(outputSiGML);
                        out.close();
                        socket.close();
                    } else {
                        JOptionPane.showMessageDialog(null, "Please make sure the Avatar Program is running", "Error: " + "Operation Failed!", JOptionPane.INFORMATION_MESSAGE);
                        return 1;
                    }
                } catch (Exception e) {
    //                if (frame.isVisible())
                    {
                        JOptionPane.showMessageDialog(null, "Please make sure the Signing Avatar Program is running", "Error: " + "Operation Failed!", JOptionPane.INFORMATION_MESSAGE);
                        System.err.print(e);
                        return 1;
                    }
                }
            }
            return 0;
    }
    public static void readTextFile(){
        // this function translates a text file (line by line) and writes in output file
        //String path = "C:/Users/Rehman/Desktop/test3.txt";
        File file = new File(filePath);
        if(file.exists()){
            sentences.clear();
            try{
            FileReader fr = new FileReader(file);
            BufferedReader br = new BufferedReader(fr);
            String s="";
            String sentence = "";
            //int count = 0;
            while((s=br.readLine())!=null){
                //count++;
                //System.out.println("Translating Line no= "+count);
                for(int i=0; i<s.length(); i++){
                    sentence+=s.charAt(i);
                    if(sentence.equals(" ")){
                        sentence="";
                    }
                    if(s.charAt(i)=='.'||s.charAt(i)=='?'){
                        sentences.add(sentence);
                        sentence = "";
                    }
                }
            }
            }catch(Exception e){
                e.printStackTrace();
            }
        }else{
            System.out.println("Error: File "+filePath+" not found.");
        }   
    }
    private void setTablesProperties() {
        jTable2.setRowHeight(27);
//        jTable1.getCellRenderer(0, 0).getTableCellRendererComponent(jTable1, "", rootPaneCheckingEnabled, rootPaneCheckingEnabled, 1, 1).setBackground(new Color(39, 174, 96));
        if (jTable2.getColumnModel().getColumnCount() > 0) {
            //      Table 2
            jTable2.getColumnModel().getColumn(0).setMinWidth(30);
            jTable2.getColumnModel().getColumn(0).setPreferredWidth(40);
            jTable2.getColumnModel().getColumn(0).setMaxWidth(50);
            //      Table 2
            jTable2.getColumnModel().getColumn(1).setMinWidth(70);
            jTable2.getColumnModel().getColumn(1).setPreferredWidth(100);
            jTable2.getColumnModel().getColumn(1).setMaxWidth(150);
            //      Table 2
            jTable2.getColumnModel().getColumn(3).setMinWidth(30);
            jTable2.getColumnModel().getColumn(3).setPreferredWidth(55);
            jTable2.getColumnModel().getColumn(3).setMaxWidth(105);
        }
        setColumnFont("Manual (Symbols)");
        setColumnFont("Manual (Unicode)");
        setColumnFont("Gloss");
    }

    public void setColumnFont(String col) {
        if (col.equals("Manual (Symbols)")) {
            jTable2.getColumn(col).setCellRenderer(new DefaultTableCellRenderer() {
                        @Override
                        public Component getTableCellRendererComponent(JTable table, Object value, boolean isSelected, boolean hasFocus, int row, int column) {
//                        GraphicsEnvironment ge = GraphicsEnvironment.getLocalGraphicsEnvironment();
                            Font HNSFont = null;

                            try {
                                //HNSFont = java.awt.Font.createFont(java.awt.Font.TRUETYPE_FONT, new File(System.getProperty("user.dir")+"\\resources\\HamNoSys\\HamNoSysUnicode.ttf"));
                                HNSFont = Font.createFont( Font.TRUETYPE_FONT,new FileInputStream(System.getProperty("user.dir")+"\\resources\\HamNoSys\\HamNoSysUnicode.ttf")); 
                                HNSFont = HNSFont.deriveFont(Font.PLAIN, 14);
                                
                                /*
                                InputStream is = this.getClass().getResourceAsStream("/HamNoSysUnicode.TTF");
                                HNSFont=Font.createFont(Font.TRUETYPE_FONT,is);
                                is.close();
                                */

                            } catch (FontFormatException | IOException ex) {
                                Logger.getLogger(TranslationWithAvatar.class
                                        .getName()).log(Level.SEVERE, null, ex);
                            }
                            try {

                                boolean isEng = (value.toString().charAt(0) >= 'a' && value.toString().charAt(0) <= 'z')
                                || (value.toString().charAt(0) >= 'A' && value.toString().charAt(0) <= 'Z');

                                setText(value.toString());

                                if (column == 2 && !isEng) {
                                    this.setFont(HNSFont);
                                } else {
                                    this.setFont(monoFont);
                                }
                            } catch (NullPointerException e) {
                                if (column == 2) {
                                    this.setFont(monoFont);
                                }
                                setText("NULL");
                            }
                            if (row % 2 == 0) {
                                this.setBackground(Color.WHITE);
                            } else {
                                this.setBackground(new Color(242, 242, 242));
                            }
                            return this;
                        }
                    }
            );
        } else if (col.equals("Manual (Unicode)")) {
            this.jTable2.getColumn(col).setCellRenderer(
                    new DefaultTableCellRenderer() {
                        @Override
                        public Component getTableCellRendererComponent(JTable table, Object value, boolean isSelected, boolean hasFocus, int row, int column) {
                            try {
                                //System.out.println("In it to win it!");
                                setText(value.toString());
                                if (column == 4) {
                                    this.setFont(monoFont.deriveFont(15));
                                }
                            } catch (NullPointerException e) {
                                setText("NULL");
                            }
                            if (row % 2 == 0) {
                                this.setBackground(Color.WHITE);
                            } else {
                                this.setBackground(new Color(242, 242, 242));
                            }
                            return this;
                        }
                    }
            );
        } else {
            this.jTable2.getColumn(col).setCellRenderer(
                    new DefaultTableCellRenderer() {
                        @Override
                        public Component getTableCellRendererComponent(JTable table, Object value, boolean isSelected, boolean hasFocus, int row, int column) {
                            try {
                                //System.out.println("In it to win it!");
                                setText(value.toString());
                                if (column == 1) {
                                    this.setFont(monoFont.deriveFont(15));
                                }
                            } catch (NullPointerException e) {
                                setText("NULL");
                            }
                            if (row % 2 == 0) {
                                this.setBackground(Color.WHITE);
                            } else {
                                this.setBackground(new Color(242, 242, 242));
                            }
                            return this;
                        }
                    }
            );
        }
    }

    public static void removeAllRows(DefaultTableModel model) {
        while (model.getRowCount() != 0) {
            model.removeRow(0);
        }
    }

    public static void outputLOGS(Exception e) {
        FileWriter fw;
        PrintWriter pw;
        try {
            fw = new FileWriter("Log.txt", true);
            pw = new PrintWriter(fw);
            e.printStackTrace(pw);
            pw.close();
            fw.close();
            System.exit(1);

        } catch (IOException ex) {
            Logger.getLogger(TranslationWithAvatar.class
                    .getName()).log(Level.SEVERE, null, ex);
        }
    }

    public static final void loadSignDataBase() {
        Hamnosys.clear();
        inputFiles.clear();
        HashMap<String, String> mMapper = new HashMap<>();
        String gloss, manual, nmanual;
        try {
            File folder = new File(Preferences.hamnosysDirectory);
            if(folder==null){
                System.out.println("Hamnosys Directory not found");
                return;
            }
//            File folder = new File(System.getProperty("user.dir"));
            File[] listOfFiles = folder.listFiles();
//            System.out.println(folder.getAbsolutePath());
            for (int i = 0; i < listOfFiles.length; i++) {
                if (listOfFiles[i].getName().endsWith(".txt")) {
                    inputFiles.add(listOfFiles[i]);
                }
            }
            FileInputStream inputFile;
            InputStreamReader inputStreamReader;
            BufferedReader in;
            String line;
            for (int i = 0; i < inputFiles.size(); i++) //        int i=5;
            {
//                System.out.println(inputFiles.get(i).getAbsolutePath());
                inputFile = new FileInputStream(inputFiles.get(i));
                System.out.println("reading file "+inputFiles.get(i).getName());
//                inputStreamReader = new InputStreamReader(inputFile, "UTF-8");
                inputStreamReader = new InputStreamReader(inputFile,"UTF-8");
                in = new BufferedReader(inputStreamReader);

                line = in.readLine();
                line = line.substring(1, line.length());
//                System.out.println("This is the text file line: " + line);
                while (line != null) {
                    StringTokenizer token;
                    token = new StringTokenizer(line, "\t");
//                    System.out.println("Token of line: " + token.countTokens());
                    if (token.countTokens() == 3) {
                        gloss = token.nextToken();
                        gloss = gloss.toLowerCase();
                        manual = token.nextToken();
                        nmanual = token.nextToken();
//                        if (!nmanual.equals("0000000000000,000000000,0000000000"))
//                            gloss = gloss + "*";
                        Hamnosys.put(gloss, new HamNoSys(new Manual(gloss, manual), new NonManual(gloss, nmanual)));
//                        System.out.println(gloss + " : " + manual + " , " + nmanual);
//                        mMapper.put(token.nextToken(), token.nextToken());
                    }
                    //                    System.out.println(token.nextToken() + "   " + token.nextToken() + " " + token.nextToken());
                    //                        System.out.println(token.nextToken());
                    line = in.readLine();

                }
            }
        } catch (FileNotFoundException ex) {
            Logger.getLogger(TranslationWithAvatar.class
                    .getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(TranslationWithAvatar.class
                    .getName()).log(Level.SEVERE, null, ex);
        }
    }

    public final void initSwingComponents() {
        addressBar = new JTextField();
        addressBar.setSize(100, 50);
        addressBar.addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
                if (e.getKeyCode() == KeyEvent.VK_ENTER) {
                    URL = addressBar.getText();

                }

            }
        });
        frame = new JFrame("Browser");
        frame.add(addressBar, BorderLayout.NORTH);
        frame.addWindowListener(new java.awt.event.WindowAdapter() {
            @Override
            public void windowClosing(java.awt.event.WindowEvent windowEvent) {
                setVisible(true);
                frame.setVisible(false);
            }
        });
        frame.pack();
        frame.setSize(1300, 730);
        frame.setVisible(false);
        monoFont = this.getFont();
    }

    public final void initUtilComponents() {
        Hamnosys = new HashMap<>();
//        Thread readModel = new Thread() {
//            public void run()
//            {
        try {

            warningL.setText("Please Wait, Reading Model...");
            loadSignDataBase();
            warningL.setText("Ready!");
        } catch (Exception ex) {
            System.out.println(ex);
            Logger
                    .getLogger(TranslationWithAvatar.class
                            .getName()).log(Level.SEVERE, null, ex);
        }
    }
    public void refreshFrame(){
        // this function refreshes frame (by tranlating a null sentence) if the language preference is changed in Preferences class (Program settings)
        lblHamnosysDatabase.setText("   Hamnosys Database:  "+Preferences.selectedLanguageName);
        lblPSLSentence.setText("PSL Sentence:");
        String str="-";
        txaTranslatedSentence.setText(str);
        btnAnimateActionPerformed(null);
    }
    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        btnOpenFile = new javax.swing.JButton();
        lblFileName = new javax.swing.JLabel();
        btnPause = new javax.swing.JButton();
        btnStop = new javax.swing.JButton();
        lblEnglishSentence = new javax.swing.JLabel();
        jScrollPane1 = new javax.swing.JScrollPane();
        txaEnglishPara = new javax.swing.JTextArea();
        btnTranslateAll = new javax.swing.JButton();
        jLabel1 = new javax.swing.JLabel();
        jScrollPane6 = new javax.swing.JScrollPane();
        txaEnglishSentence = new javax.swing.JTextArea();
        HNSBtn = new javax.swing.JButton();
        jScrollPane3 = new javax.swing.JScrollPane();
        sigmlTA = new javax.swing.JTextArea();
        warningL = new javax.swing.JLabel();
        jScrollPane4 = new javax.swing.JScrollPane();
        jTable2 = new javax.swing.JTable()
        {
            public boolean isCellEditable(int row, int column)
            {
                return false;
            }
        };
        jScrollPane2 = new javax.swing.JScrollPane();
        txaTranslatedSentence = new javax.swing.JTextArea();
        lblPSLSentence = new javax.swing.JLabel();
        btnTranslate = new javax.swing.JButton();
        btnTranslateNext = new javax.swing.JButton();
        txtSentenceNo = new javax.swing.JTextField();
        btnAnimate = new javax.swing.JButton();
        lblHamnosysDatabase = new javax.swing.JLabel();

        setBackground(new java.awt.Color(182, 207, 164));
        setMaximumSize(new java.awt.Dimension(745, 32767));

        btnOpenFile.setBackground(new java.awt.Color(201, 201, 121));
        btnOpenFile.setFont(new java.awt.Font("Tahoma", 0, 14)); // NOI18N
        btnOpenFile.setText("Open File");
        btnOpenFile.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnOpenFileActionPerformed(evt);
            }
        });

        lblFileName.setFont(new java.awt.Font("Tahoma", 0, 14)); // NOI18N
        lblFileName.setForeground(new java.awt.Color(204, 51, 0));
        lblFileName.setText("No File Selected.");

        btnPause.setBackground(new java.awt.Color(201, 201, 121));
        btnPause.setFont(new java.awt.Font("Tahoma", 0, 14)); // NOI18N
        btnPause.setText("Pause Translation");
        btnPause.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnPauseActionPerformed(evt);
            }
        });

        btnStop.setBackground(new java.awt.Color(201, 201, 121));
        btnStop.setFont(new java.awt.Font("Tahoma", 0, 14)); // NOI18N
        btnStop.setText("Stop Translation");
        btnStop.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnStopActionPerformed(evt);
            }
        });

        lblEnglishSentence.setFont(new java.awt.Font("Tahoma", 0, 14)); // NOI18N
        lblEnglishSentence.setText("Input Panel:");

        txaEnglishPara.setColumns(20);
        txaEnglishPara.setFont(new java.awt.Font("Monospaced", 0, 14)); // NOI18N
        txaEnglishPara.setRows(5);
        jScrollPane1.setViewportView(txaEnglishPara);

        btnTranslateAll.setBackground(new java.awt.Color(201, 201, 121));
        btnTranslateAll.setFont(new java.awt.Font("Tahoma", 0, 16)); // NOI18N
        btnTranslateAll.setText("Translate All");
        btnTranslateAll.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnTranslateAllActionPerformed(evt);
            }
        });

        jLabel1.setFont(new java.awt.Font("Tahoma", 0, 14)); // NOI18N
        jLabel1.setText("Sentence No: ");

        txaEnglishSentence.setColumns(20);
        txaEnglishSentence.setFont(new java.awt.Font("Monospaced", 0, 18)); // NOI18N
        txaEnglishSentence.setRows(5);
        jScrollPane6.setViewportView(txaEnglishSentence);

        HNSBtn.setFont(new java.awt.Font("Tahoma", 0, 8)); // NOI18N
        HNSBtn.setText("Hamnosys");
        HNSBtn.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                HNSBtnActionPerformed(evt);
            }
        });

        jScrollPane3.setBackground(new java.awt.Color(204, 204, 255));

        sigmlTA.setBackground(new java.awt.Color(204, 204, 204));
        sigmlTA.setColumns(4);
        sigmlTA.setFont(new java.awt.Font("Monospaced", 0, 12)); // NOI18N
        sigmlTA.setLineWrap(true);
        sigmlTA.setRows(5);
        sigmlTA.setWrapStyleWord(true);
        sigmlTA.setBorder(javax.swing.BorderFactory.createEtchedBorder());
        jScrollPane3.setViewportView(sigmlTA);

        warningL.setFont(new java.awt.Font("Tahoma", 0, 14)); // NOI18N
        warningL.setForeground(new java.awt.Color(204, 51, 0));
        warningL.setText("[Building Corpus] Please Wait......");

        jTable2.setFont(new java.awt.Font("Monospaced", 0, 18)); // NOI18N
        jTable2.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {

            },
            new String [] {
                "#", "Gloss", "Manual (Symbols)", "Non-Manual", "Manual (Unicode)"
            }
        ) {
            Class[] types = new Class [] {
                java.lang.Integer.class, java.lang.String.class, java.lang.String.class, java.lang.Boolean.class, java.lang.String.class
            };

            public Class getColumnClass(int columnIndex) {
                return types [columnIndex];
            }
        });
        jTable2.setOpaque(false);
        jScrollPane4.setViewportView(jTable2);

        jScrollPane2.setBackground(new java.awt.Color(204, 204, 255));

        txaTranslatedSentence.setColumns(4);
        txaTranslatedSentence.setFont(new java.awt.Font("Monospaced", 0, 18)); // NOI18N
        txaTranslatedSentence.setLineWrap(true);
        txaTranslatedSentence.setRows(5);
        txaTranslatedSentence.setWrapStyleWord(true);
        txaTranslatedSentence.setBorder(javax.swing.BorderFactory.createEtchedBorder());
        jScrollPane2.setViewportView(txaTranslatedSentence);

        lblPSLSentence.setFont(new java.awt.Font("Tahoma", 0, 14)); // NOI18N
        lblPSLSentence.setText("PSL Sentence: ");

        btnTranslate.setBackground(new java.awt.Color(201, 201, 121));
        btnTranslate.setFont(new java.awt.Font("Tahoma", 0, 16)); // NOI18N
        btnTranslate.setText("Translate");
        btnTranslate.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnTranslateActionPerformed(evt);
            }
        });

        btnTranslateNext.setBackground(new java.awt.Color(201, 201, 121));
        btnTranslateNext.setFont(new java.awt.Font("Tahoma", 0, 16)); // NOI18N
        btnTranslateNext.setText("Translate Next");
        btnTranslateNext.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnTranslateNextActionPerformed(evt);
            }
        });

        txtSentenceNo.setFont(new java.awt.Font("Tahoma", 0, 14)); // NOI18N
        txtSentenceNo.setForeground(new java.awt.Color(204, 0, 0));
        txtSentenceNo.setHorizontalAlignment(javax.swing.JTextField.CENTER);
        txtSentenceNo.setText("1");

        btnAnimate.setBackground(new java.awt.Color(201, 201, 121));
        btnAnimate.setFont(new java.awt.Font("Tahoma", 0, 12)); // NOI18N
        btnAnimate.setText("Animate");
        btnAnimate.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnAnimateActionPerformed(evt);
            }
        });

        lblHamnosysDatabase.setFont(new java.awt.Font("Tahoma", 0, 12)); // NOI18N
        lblHamnosysDatabase.setText("Hamnosys Database: ");

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(this);
        this.setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(warningL)
                                .addGap(18, 18, 18)
                                .addComponent(lblHamnosysDatabase, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                            .addGroup(layout.createSequentialGroup()
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addComponent(lblEnglishSentence, javax.swing.GroupLayout.PREFERRED_SIZE, 120, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addGroup(layout.createSequentialGroup()
                                        .addComponent(jLabel1)
                                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                        .addComponent(txtSentenceNo, javax.swing.GroupLayout.PREFERRED_SIZE, 41, javax.swing.GroupLayout.PREFERRED_SIZE)))
                                .addGap(0, 0, Short.MAX_VALUE)))
                        .addContainerGap())
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(btnOpenFile)
                        .addGap(24, 24, 24)
                        .addComponent(lblFileName, javax.swing.GroupLayout.PREFERRED_SIZE, 240, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 85, Short.MAX_VALUE)
                        .addComponent(btnPause)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addComponent(btnStop)
                        .addGap(19, 19, 19))
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING, false)
                            .addGroup(javax.swing.GroupLayout.Alignment.LEADING, layout.createSequentialGroup()
                                .addComponent(btnTranslate, javax.swing.GroupLayout.PREFERRED_SIZE, 231, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(18, 18, 18)
                                .addComponent(btnTranslateNext, javax.swing.GroupLayout.PREFERRED_SIZE, 220, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(18, 18, 18)
                                .addComponent(btnTranslateAll, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                            .addComponent(jScrollPane1)
                            .addComponent(jScrollPane6, javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jScrollPane2, javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(javax.swing.GroupLayout.Alignment.LEADING, layout.createSequentialGroup()
                                .addComponent(lblPSLSentence)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                .addComponent(btnAnimate)
                                .addGap(18, 18, 18)
                                .addComponent(jScrollPane3, javax.swing.GroupLayout.PREFERRED_SIZE, 45, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(38, 38, 38)
                                .addComponent(HNSBtn, javax.swing.GroupLayout.PREFERRED_SIZE, 155, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(16, 16, 16))
                            .addComponent(jScrollPane4, javax.swing.GroupLayout.Alignment.LEADING, javax.swing.GroupLayout.DEFAULT_SIZE, 725, Short.MAX_VALUE))
                        .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(btnOpenFile)
                    .addComponent(lblFileName)
                    .addComponent(btnPause)
                    .addComponent(btnStop))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 22, Short.MAX_VALUE)
                .addComponent(lblEnglishSentence)
                .addGap(3, 3, 3)
                .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 103, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(btnTranslateAll, javax.swing.GroupLayout.PREFERRED_SIZE, 35, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(btnTranslate, javax.swing.GroupLayout.PREFERRED_SIZE, 35, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(btnTranslateNext, javax.swing.GroupLayout.PREFERRED_SIZE, 35, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel1, javax.swing.GroupLayout.PREFERRED_SIZE, 20, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(txtSentenceNo, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(10, 10, 10)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(jScrollPane6, javax.swing.GroupLayout.PREFERRED_SIZE, 60, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                .addComponent(lblPSLSentence)
                                .addComponent(btnAnimate))
                            .addComponent(HNSBtn, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.PREFERRED_SIZE, 25, javax.swing.GroupLayout.PREFERRED_SIZE)))
                    .addComponent(jScrollPane3, javax.swing.GroupLayout.PREFERRED_SIZE, 25, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(13, 13, 13)
                .addComponent(jScrollPane2, javax.swing.GroupLayout.PREFERRED_SIZE, 60, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 18, Short.MAX_VALUE)
                .addComponent(jScrollPane4, javax.swing.GroupLayout.PREFERRED_SIZE, 182, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(8, 8, 8)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(warningL)
                    .addComponent(lblHamnosysDatabase))
                .addGap(24, 24, 24))
        );
    }// </editor-fold>//GEN-END:initComponents

    private void HNSBtnActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_HNSBtnActionPerformed
        try {
            ArrayList<String> HNSList = new ArrayList<>();
            ArrayList<String> wordSiGMLList = new ArrayList<>();
            words.clear();
            boolean isEng, isNM = false;
            HamNoSys HNS;
            String manual = null, nmanual = null, wordSiGML = null;
            input = txaTranslatedSentence.getText();
            if (!input.equals("")) {
                isEng = (input.charAt(0) >= 'a' && input.charAt(0) <= 'z')
                || (input.charAt(0) >= 'A' && input.charAt(0) <= 'Z');
                if (isEng) {
                    input = input.toLowerCase();
                }
            }
            removeAllRows(modelT2);
            input = input.replaceAll("[\\s\\_\\<۔*?>,.]", " ");
            StringTokenizer token;
            String word;
            String[] manualSiGML = null;
            int i = 0;
            token = new StringTokenizer(input, " ");
            while (token.hasMoreTokens()) {
                i++;
                word = token.nextToken();
                words.add(word);
                if (Hamnosys.containsKey(word)) {
                    HNS = Hamnosys.get(word);

                    //                    System.out.println(Hamnosys.containsKey(word));
                    manual = HNS.getmanualMarker().getCode();
                    nmanual = HNS.getnonmanualMarker().getCode();

                    //                HNSSymbol = Hamnosys.get(word);
                    String[] HNSSybmol
                    = {
                        manual
                    };

                    String[] HNSEnglish
                    = {
                        "Null"
                    };

                    if (manual != null) {
                        isEng = (manual.charAt(0) >= 'a' && manual.charAt(0) <= 'z')
                        || (manual.charAt(0) >= 'A' && manual.charAt(0) <= 'Z');
                        if (!isEng) {
                            HNSEnglish = symHNSItemsFromHNSUItems(HNSSybmol);
                            //toStdOut(HNSsymbol);
                            HNSList.add(manual + "\t" + word);
                        }
                    } else {
                        manual = "Null";
                    }
                    //                    System.out.println(word + "\t" + manual + "\t" + Arrays.toString(HNSString));
                    isNM = nmanual.length() != 0;
                    modelT2.addRow(new Object[]{
                        i, word, manual, isNM, Arrays.toString(HNSEnglish)
                    });

                    String[] ManualwithGloss
                    = {
                        manual + "\t" + word
                    };
                    manualSiGML = sigmlFromHNSUItems(ManualwithGloss);
                    wordSiGML = mergeSiGML(manualSiGML, nmanual);
                    wordSiGMLList.add(wordSiGML);
                } else {
                    modelT2.addRow(new Object[]{
                        i, word, "Null", false, "Null"
                    });
                }
            }

            if (wordSiGMLList.size() > 1) {
                outputSiGML = wordToSentenceSiGML(wordSiGMLList);
            } else {
                outputSiGML = wordSiGML;
            }
            if (outputSiGML != null) {
                String[] SiGML
                = {
                    outputSiGML
                };
                SiGML = indentXML(SiGML);
                //            toStdOut(SiGML);
                outputSiGML = "";
                for (String lineOfCode : SiGML) {
                    outputSiGML += lineOfCode + "\n";
                }
                sigmlTA.setText(outputSiGML);
                sigmlTA.setCaretPosition(0);
                avatarReady = sigmlTA.getLineCount() > 4;
                //            this.jScrollPane3.setVerticalScrollBar(null);
            } else {
                sigmlTA.setText("Gloss not Found in SignBank!");
                sigmlTA.setCaretPosition(0);
                avatarReady = sigmlTA.getLineCount() > 4;
            }
        } catch (Exception ex) {
            System.out.println(ex);
            Logger.getLogger(TranslationWithAvatar.class.getName()).log(Level.SEVERE, null, ex);
            //            outputLOGS(ex);
        }
    }//GEN-LAST:event_HNSBtnActionPerformed

    private void btnTranslateAllActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnTranslateAllActionPerformed
        lblPSLSentence.setText("PSL Sentence:");
        stopTranslation = false;
        pauseTranslation = false;
        btnStop.setEnabled(true);
        btnPause.setEnabled(true);
        btnTranslateAll.setEnabled(false);
        btnTranslate.setEnabled(false);
        btnTranslateNext.setEnabled(false);
        txtSentenceNo.setEditable(false);
        if(fileOpened==false){
            sentences.clear();
            String para = txaEnglishPara.getText();
            String sentence = "";
            for(int i=0; i<para.length(); i++){
                sentence+=para.charAt(i);
                if(sentence.equals(" ")){
                    sentence="";
                }
                if(para.charAt(i)=='.'||para.charAt(i)=='?'){
                    sentences.add(sentence);
                    sentence = "";
                }
            }
        }
        new TranslationThread(0).start();
    }//GEN-LAST:event_btnTranslateAllActionPerformed

    private void btnOpenFileActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnOpenFileActionPerformed
        if(fileOpened==false){
            chooser = new JFileChooser();
            chooser.setCurrentDirectory(new java.io.File("."));
            chooser.setDialogTitle(chooserTitle);
            chooser.setFileSelectionMode(JFileChooser.FILES_AND_DIRECTORIES);

            if(chooser.showOpenDialog(this)== JFileChooser.APPROVE_OPTION){
                String name = chooser.getSelectedFile().getPath();
                if(name.contains(".txt")){
                    filePath = name;
                    fileName = chooser.getSelectedFile().getName();
                    readTextFile();
                    lblFileName.setText(fileName+" ("+sentences.size()+" sentences)");
                    lblFileName.setForeground(Color.BLUE);
                    fileOpened = true;
                    btnOpenFile.setText("Close File");
                    if(sentences.size()>0){
                        txtSentenceNo.setText("1");
                        btnTranslateNext.setEnabled(true);
                    }
                }
                System.out.println("getCurrentDirectory(): "+ chooser.getCurrentDirectory());
                System.out.println("getSelectedFile(): "+ chooser.getSelectedFile());
            }else{
                System.out.println("No selection.");
            }
        }else{
            btnOpenFile.setText("Open File");
            lblFileName.setText("No File Selected.");
            lblFileName.setForeground(new Color(204,51,0));
            sentences.clear();
            txtSentenceNo.setText("1");
            txaEnglishSentence.setText("");
            txaTranslatedSentence.setText("");
            fileOpened = false;
        }
    }//GEN-LAST:event_btnOpenFileActionPerformed

    private void btnStopActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnStopActionPerformed
        stopTranslation = true;
        btnStop.setEnabled(false);
        btnPause.setEnabled(false);
        btnTranslateAll.setEnabled(true);
        currentSentence = 1;
    }//GEN-LAST:event_btnStopActionPerformed

    private void btnPauseActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnPauseActionPerformed
        if(pauseTranslation==false){
            pauseTranslation = true;
            btnPause.setText("Resume Translation");
        }else{
            pauseTranslation = false;
            btnPause.setText("Pause Translation");
            new TranslationThread(currentSentence).start();
        }
    }//GEN-LAST:event_btnPauseActionPerformed

    private void btnTranslateActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnTranslateActionPerformed
        if(preferencesChanged){
            refreshFrame();
            preferencesChanged = false;
        }
        // make all writes to the System.err stream silent (done to remove stanford log output)
        lblPSLSentence.setText("PSL Sentence:");
        PrintStream err = System.err;
        System.setErr(new PrintStream(new OutputStream() {
            public void write(int b) {
            }
        }));

        String str="";
        if(fileOpened==false){
            sentences.clear();
            String para = txaEnglishPara.getText();
            String[] words = para.split(" ");
            if(words.length==1){
                lblPSLSentence.setText("Entered Word:");
                txaEnglishSentence.setText("----- Word Entered -----");
                txaTranslatedSentence.setText(para);
                btnAnimateActionPerformed(null);
                return;
            }
            String sentence = "";
            for(int i=0; i<para.length(); i++){
                sentence+=para.charAt(i);
                if(sentence.equals(" ")){
                    sentence="";
                }
                if(para.charAt(i)=='.'||para.charAt(i)=='?'){
                    sentences.add(sentence);
                    sentence = "";
                }
            }
            if(sentences.size()>1){
                btnTranslateNext.setEnabled(true);
            }else{
                btnTranslateNext.setEnabled(false);
            }
            int sentenceNo = Integer.parseInt(txtSentenceNo.getText());
            if(sentenceNo>0 && sentenceNo<=sentences.size()){
                str = sentences.get(sentenceNo-1);
                txaEnglishSentence.setText(str);
            }else{
                txaEnglishSentence.setText("Sentence No "+sentenceNo+" not found.");
                txaTranslatedSentence.setText("Sentence No "+sentenceNo+" not found.");
                return;
            }
        }else{
            int sentenceNo = Integer.parseInt(txtSentenceNo.getText());
            if(sentenceNo>0 && sentenceNo<=sentences.size()){
                str = sentences.get(sentenceNo-1);
                txaEnglishSentence.setText(str);
            }else{
                txaEnglishSentence.setText("Sentence No "+sentenceNo+" not found.");
                txaTranslatedSentence.setText("Sentence No "+sentenceNo+" not found.");
                return;
            }
        }
        Nlp4 parser = new Nlp4();
        Tree tree = parser.parse(str);
        String treeOutput=tree.toString();

        String str2 = str.replace("?", ""); // remove question mark if any (dependency tool correction)
        String dep= getDependencies(str2);

        MyTree tree3= MyUtils.constructAnnotatedTree(treeOutput,dep);
        MyList list = MyUtils.constructAnnotatedList(treeOutput, dep);
        String output = MyUtils.translate(str, tree3, list);
        output = MyUtils.mapCompoundWords(output);
        txaTranslatedSentence.setText(output);
        // set error to normal again
        System.setErr(err);
        btnAnimateActionPerformed(null);
    }//GEN-LAST:event_btnTranslateActionPerformed

    private void btnTranslateNextActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnTranslateNextActionPerformed
        // make all writes to the System.err stream silent (done to remove stanford log output)
        PrintStream err = System.err;
        System.setErr(new PrintStream(new OutputStream() {
            public void write(int b) {
            }
        }));

        String str="";
        if(fileOpened==false){
            int sentenceNo = Integer.parseInt(txtSentenceNo.getText())+1;
            txtSentenceNo.setText(Integer.toString(sentenceNo));
            if(sentenceNo>0 && sentenceNo<=sentences.size()){
                str = sentences.get(sentenceNo-1);
                txaEnglishSentence.setText(str);
            }else{
                txaEnglishSentence.setText("Sentence No "+sentenceNo+" not found.");
                txaTranslatedSentence.setText("Sentence No "+sentenceNo+" not found.");
                return;
            }
        }else{
            int sentenceNo = Integer.parseInt(txtSentenceNo.getText())+1;
            txtSentenceNo.setText(Integer.toString(sentenceNo));
            if(sentenceNo>0 && sentenceNo<=sentences.size()){
                str = sentences.get(sentenceNo-1);
                txaEnglishSentence.setText(str);
            }else{
                txaEnglishSentence.setText("Sentence No "+sentenceNo+" not found.");
                txaTranslatedSentence.setText("Sentence No "+sentenceNo+" not found.");
                return;
            }
        }
        Nlp4 parser = new Nlp4();
        Tree tree = parser.parse(str);
        String treeOutput=tree.toString();

        String str2 = str.replace("?", ""); // remove question mark if any (dependency tool correction)
        String dep= getDependencies(str2);

        MyTree tree3= MyUtils.constructAnnotatedTree(treeOutput,dep);
        MyList list = MyUtils.constructAnnotatedList(treeOutput, dep);
        String output = MyUtils.translate(str, tree3, list);
        output = MyUtils.mapCompoundWords(output);
        txaTranslatedSentence.setText(output);
        // set error to normal again
        System.setErr(err);
        btnAnimateActionPerformed(null);
    }//GEN-LAST:event_btnTranslateNextActionPerformed

    private void btnAnimateActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnAnimateActionPerformed
        //        System.out.println("Lines : " + sigmlTA.getLineCount());
        if (!txaTranslatedSentence.getText().equals(input)) {
            HNSBtnActionPerformed(null);
        }
        Socket socket = null;
        if (avatarReady) {
            try {

                socket = new Socket("127.0.0.1", 8052);
                if (socket.isConnected()) {
                    OutputStream outstream = socket.getOutputStream();
                    PrintWriter out = new PrintWriter(outstream);
                    out.print(outputSiGML);
                    out.close();
                    socket.close();
                } else {
                    JOptionPane.showMessageDialog(null, "Please make sure the Signing Avatar is active!", "Info: " + "Operation Failed!", JOptionPane.INFORMATION_MESSAGE);
                }
            } catch (Exception e) {
                //                if (frame.isVisible())
                {
                    JOptionPane.showMessageDialog(null, "Please make sure the Signing Avatar is active!", "Info: " + "Operation Failed!", JOptionPane.INFORMATION_MESSAGE);
                    System.err.print(e);
                    /*
                    ProcessBuilder pb = new ProcessBuilder("C:\\Program Files\\Java\\jre1.8.0_73\\bin\\javaws.exe -localfile -offline -J-Djnlp.application.href=http://vhg.cmp.uea.ac.uk/tech/jas/vhg2015/jnlp/SiGMLPlayer.jnlp");
                    try {
                        pb.start();
                    } catch (IOException ex) {
                        Logger.getLogger(Preferences.class.getName()).log(Level.SEVERE, null, ex);
                    }
                    */
                }
            }
        }
    }//GEN-LAST:event_btnAnimateActionPerformed

    //Utilities
    private static HashMap<String, String> tagset;
    public static HashMap<String, HamNoSys> Hamnosys;
    ArrayList<String> words = new ArrayList();
    //ArrayList<String> abbrivations = new ArrayList<>();
    private Font monoFont = null;
    private String outputSiGML = "", URL = "http://www.w3schools.com";
    private boolean avatarReady = false;
    private String input = "";
    //private String inputLine = "";

    // Swing Components
    private JFrame frame;
    public static DefaultTableModel modelT2;
    private JTextField addressBar;

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton HNSBtn;
    private javax.swing.JButton btnAnimate;
    private javax.swing.JButton btnOpenFile;
    private javax.swing.JButton btnPause;
    private javax.swing.JButton btnStop;
    private javax.swing.JButton btnTranslate;
    private javax.swing.JButton btnTranslateAll;
    private javax.swing.JButton btnTranslateNext;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JScrollPane jScrollPane2;
    private javax.swing.JScrollPane jScrollPane3;
    private javax.swing.JScrollPane jScrollPane4;
    private javax.swing.JScrollPane jScrollPane6;
    private javax.swing.JTable jTable2;
    private javax.swing.JLabel lblEnglishSentence;
    private javax.swing.JLabel lblFileName;
    private javax.swing.JLabel lblHamnosysDatabase;
    private javax.swing.JLabel lblPSLSentence;
    private javax.swing.JTextArea sigmlTA;
    private javax.swing.JTextArea txaEnglishPara;
    private javax.swing.JTextArea txaEnglishSentence;
    private javax.swing.JTextArea txaTranslatedSentence;
    private javax.swing.JTextField txtSentenceNo;
    private javax.swing.JLabel warningL;
    // End of variables declaration//GEN-END:variables
}
