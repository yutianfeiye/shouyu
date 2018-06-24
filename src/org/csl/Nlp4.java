/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.csl;

import org.csl.Demo;
import org.csl.Preferences;
import org.csl.MyUtils;
import java.io.*;
import edu.stanford.nlp.ling.CoreLabel;
import edu.stanford.nlp.ling.Sentence;
import edu.stanford.nlp.process.TokenizerFactory;
import edu.stanford.nlp.parser.lexparser.LexicalizedParser;
import edu.stanford.nlp.process.CoreLabelTokenFactory;
import edu.stanford.nlp.process.PTBTokenizer;
import edu.stanford.nlp.process.Tokenizer;
import edu.stanford.nlp.trees.GrammaticalStructure;
import edu.stanford.nlp.trees.GrammaticalStructureFactory;
import edu.stanford.nlp.trees.PennTreebankLanguagePack;
import edu.stanford.nlp.trees.Tree;
import edu.stanford.nlp.trees.TreebankLanguagePack;
import edu.stanford.nlp.trees.TypedDependency;
import java.util.Collection;
import java.util.List;

/**
 *
 * @author Rehman <12003065-317@umt.edu.pk>
 */
class Nlp4 {

    private final static String PCG_MODEL = "edu/stanford/nlp/models/lexparser/englishPCFG.ser.gz";        

    private final TokenizerFactory<CoreLabel> tokenizerFactory = PTBTokenizer.factory(new CoreLabelTokenFactory(), "invertible=true");

    private final LexicalizedParser parser = LexicalizedParser.loadModel(PCG_MODEL);

    public Tree parse(String str) {                
        List<CoreLabel> tokens = tokenize(str);
        Tree tree = parser.apply(tokens);
        return tree;
    }

    private List<CoreLabel> tokenize(String str) {
        Tokenizer<CoreLabel> tokenizer =
            tokenizerFactory.getTokenizer(
                new StringReader(str));    
        return tokenizer.tokenize();
    }

    public static void main(String[] args) { 
        // make all writes to the System.err stream silent (done to remove stanford log output)
        
        PrintStream err = System.err;
        System.setErr(new PrintStream(new OutputStream() {
            public void write(int b) {
            }
        }));
        /*
        MyUtils.initializeVerbsHashtable();
        MyUtils.readRulesFile();
        MyUtils.translateTextFile();
       */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {


               if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                    }
                }
        } catch (Exception ex) {
                   ex.printStackTrace();
        }
        Preferences.setDefaultPreferences();
        Demo demo = new Demo();
        demo.setVisible(true);
        /*
        System.out.println("Verb entries ="+MyUtils.verbs.size());
        System.out.println(MyUtils.rules.size()+" rules found.");
        
        String str = "He is going to school.";
        //String str = "I do not read the books.";
        Nlp4 parser = new Nlp4(); 
        Tree tree = parser.parse(str);
        System.out.println("Input String:\n"+str+"\n");
        
        String treeOutput=tree.toString();
        System.out.println("Stanford Tree output:\n"+treeOutput+"\n");
        
        //treeOutput=removeUnwantedWords(treeOutput);
        //System.out.println("After Removal:\n"+treeOutput+"\n");
        
        String str2 = str.replace("?", ""); // remove question mark if any (dependency tool correction)
        String dep= getDependencies(str2);
        System.out.println(dep);
        
        MyTree tree3= MyUtils.constructAnnotatedTree(treeOutput,dep);
        tree3.printTree();
        //System.out.println("\nSentence");
        //tree3.printSentence2();   
        tree3.printTreeDiagram();
        
        //MyUtils.printTense(str, tree3);
        //tree3.printTreeDiagramToFile(str);
        
        
        //MyList myList = MyUtils.constructAnnotatedList(treeOutput, dep);
        //int clauses = myList.getClauseCount();
        //System.out.println("No of Clauses = "+clauses);
        //int indClauses = myList.getIndependentClauseCount();
        //System.out.println("No of Ind Clauses = "+indClauses);
        //MyUtils.printSentenceStructureType(myList);
        
        */
        // set error to normal again
        System.setErr(err); 
        
    }
    public static String removeUnwantedWords(String tree){
        String words="a,an,the";
        String tokens[]= words.split(",");
        for(int i=0; i<tokens.length; i++){
            tree=MyUtils.removeNodesByValue(tree,tokens[i]);
        }
        return tree;
    }
    public static String getDependencies(String sent){
        String[] sent2 = sent.split(" ");
        LexicalizedParser lp = LexicalizedParser.loadModel(
                "edu/stanford/nlp/models/lexparser/englishPCFG.ser.gz",
                "-maxLength", "80", "-retainTmpSubcategories");
        TreebankLanguagePack tlp = new PennTreebankLanguagePack();
        // Uncomment the following line to obtain original Stanford Dependencies
        // tlp.setGenerateOriginalDependencies(true);
        GrammaticalStructureFactory gsf = tlp.grammaticalStructureFactory();
        Tree parse = lp.apply(Sentence.toWordList(sent2));
        GrammaticalStructure gs = gsf.newGrammaticalStructure(parse);
        Collection<TypedDependency> tdl = gs.typedDependenciesCCprocessed();
        //System.out.println(tdl);
        String output=tdl.toString();
        return output;
    }
}
