/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.csl;

import edu.stanford.nlp.trees.Tree;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import static org.csl.Nlp4.getDependencies;

/**
 *
 * @author Rehman <12003065-317@umt.edu.pk>
 */
public class MyUtils {
    public static HashMap<String,String> verbs = new HashMap();
    public static HashMap<String,Rule> rules = new HashMap();
    
    public static boolean translatingComplex = false; // for demo purposes
    public static String pslTreeComplex = ""; // for demo purposes
    public static boolean prepareGrammarRuleString = false; // for demo + efficiency (grammar rules string will not be prepared always
    public static String grammarRules = ""; //for demo purposes
    
    public static MyTree constructTree(String s){
        // this function constructs tree from Stanford's tagged sentence
        // (function is no longer required, new function is constructAnnotatedTree)
        int size= s.length();
        int nodeNo=0;
        int wordNo=1;
        MyTree tree=null;
        boolean nameFlag;
        int i=0;
        while(i<size)
        {
            String name="";
            String value="";
            if(s.charAt(i)=='('){
                if(tree==null){
                    tree= new MyTree("","");
                    tree.nodeNo=nodeNo;
                    nodeNo++;
                    }
                    else{
                        tree=tree.addChild(new MyTree("","",tree));
                        tree.nodeNo=nodeNo;
                        nodeNo++;
                    }
                nameFlag=false;
                i++;
                while(s.charAt(i)!=')'&&s.charAt(i)!='('){
                    if(s.charAt(i)==' ')
                        nameFlag=true;
                    if(nameFlag==false && s.charAt(i)!=' ')
                        name+=s.charAt(i);
                    else if(s.charAt(i)!=' ')
                        value+=s.charAt(i);
                    i++;
                    }
                tree.name=name;
                tree.value=value;
                if(!(value.equals("")||value.equals(",")||value.equals(";")||value.equals("."))){
                        tree.wordNo=wordNo;
                        wordNo++;
                    }
                }
            else if(s.charAt(i)==')'){
                if(tree.parent!=null)
                {
                    tree=tree.parent;
                }
                i++;
            }
            else
                i++;
        }
        return tree;
    }
    public static MyTree constructAnnotatedTree(String s,String depStr){
        // this function constructs tree from given tagged sentence and dependencies string.
        ArrayList<Dependency> dependencies= getDependenciesList(depStr);
        int depSize=dependencies.size();
        int size= s.length();
        int nodeNo=0;
        int wordNo=1;
        MyTree tree=null;
        boolean nameFlag;
        int i=0;
        while(i<size)
        {
            String name="";
            String value="";
            if(s.charAt(i)=='('){
                if(tree==null){
                    tree= new MyTree("","");
                    tree.nodeNo=nodeNo;
                    nodeNo++;
                    }
                    else{
                        int nextChildIndex = tree.children.size();
                        tree=tree.addChild(new MyTree("","",tree));
                        tree.nodeNo=nodeNo;
                        tree.childNo=nextChildIndex;
                        nodeNo++;
                    }
                nameFlag=false;
                i++;
                while(s.charAt(i)!=')'&&s.charAt(i)!='('){
                    if(s.charAt(i)==' ')
                        nameFlag=true;
                    if(nameFlag==false && s.charAt(i)!=' ')
                        name+=s.charAt(i);
                    else if(s.charAt(i)!=' ')
                        value+=s.charAt(i);
                    i++;
                    }
                tree.name=name;
                tree.value=value;
                if(!(value.equals("")||value.equals(",")||value.equals(";")||value.equals("."))){
                        tree.wordNo=wordNo;
                        for(int j=0; j<dependencies.size(); j++){
                            if(dependencies.get(j).wordNo==wordNo){
                                tree.depTag=dependencies.get(j).dependency;
                            }
                        }
                        wordNo++;
                    }
                }
            else if(s.charAt(i)==')'){
                if(tree.parent!=null)
                {
                    tree=tree.parent;
                }
                i++;
            }
            else
                i++;
        }
        return tree;
    }
    public static MyList constructAnnotatedList(String s,String depStr){
        ArrayList<Dependency> dependencies= getDependenciesList(depStr);
        int size= s.length();
        int wordNo=1;
        MyList list = new MyList();
        boolean nameFlag;
        int i=0;
        while(i<size)
        {
            String name="";
            String value="";
            if(s.charAt(i)=='('){
                nameFlag=false;
                i++;
                while(s.charAt(i)!=')'&&s.charAt(i)!='('){
                    if(s.charAt(i)==' ')
                        nameFlag=true;
                    if(nameFlag==false && s.charAt(i)!=' ')
                        name+=s.charAt(i);
                    else if(s.charAt(i)!=' ')
                        value+=s.charAt(i);
                    i++;
                    }
                if(!(value.equals("")||value.equals(",")||value.equals(";")||value.equals("."))){
                        String depTag="";
                        for(int j=0; j<dependencies.size(); j++){
                            if(dependencies.get(j).wordNo==wordNo){
                                depTag=dependencies.get(j).dependency;
                            }
                        }
                        list.add(new ListNode(name,value,wordNo,depTag));
                        wordNo++;
                    }else{
                    list.add(new ListNode(name,value));
                }
                }
            else if(s.charAt(i)==')'){
                i++;
            }
            else
                i++;
        }
        return list;
    }
    public static String removeNodesByValue(String tree, String value){
        // this function removes node by value from Stanford's tagged sentence
        int size=tree.length();
        value=value+')';    //necessary to avoid false matching of partial words, eg: "an" in "and"
        int valueIndex;
        while((valueIndex=tree.indexOf(value))!=-1){
            int beginIndex=0;
            int endIndex=size-1;
            for(int i=valueIndex; i>=0; i--){
                if(tree.charAt(i)=='('){
                    beginIndex=i;
                    break;
                }
            }
            int bracketCount=1;
            for(int j=beginIndex+1; j<size; j++){
                // In case another node lies within the node to be deleted,
                // that node will be deleted too.
                if(tree.charAt(j)=='('){ 
                    bracketCount++;
                }
                else if(tree.charAt(j)==')'){
                    bracketCount--;
                    if(bracketCount==0){
                      endIndex=j;
                      break;
                    }
                }
            }
            //Java substring(int start, int end) function returns string from start to (end-1)
            System.out.println("Removing node: "+tree.substring(beginIndex,endIndex+1));
            tree=tree.substring(0, beginIndex).concat(tree.substring(endIndex+1));
        }
        return tree;
    }
    public static ArrayList<Dependency> getDependenciesList(String dep){
        // this function creates an arrayList of Dependency class objects, from stanford's dependencies string
        ArrayList<Dependency> dependencies= new ArrayList();
        String dep2= dep.substring(1,dep.length()-1);
        //System.out.println(dep2);
        
      Pattern pattern = Pattern.compile("[a-z]+[\\(][a-zA-Z0-9\\,\\-\\. ]+[\\)]");
      Matcher matcher = pattern.matcher(dep2);

      while (matcher.find()) {
          String dep3=dep2.substring(matcher.start(), matcher.end());
          String word="",dependency="",dependent="";
          int wordNo=0;
          
          Pattern wordPattern = Pattern.compile("\\, [a-zA-Z0-9\\.]+\\-");
          Matcher wordMatcher = wordPattern.matcher(dep3);
          if(wordMatcher.find()){
          word = dep3.substring(wordMatcher.start()+2,wordMatcher.end()-1);
          }
          
          wordPattern = Pattern.compile("[a-z]+[\\(]");
          wordMatcher = wordPattern.matcher(dep3);
          if(wordMatcher.find()){
          dependency = dep3.substring(wordMatcher.start(),wordMatcher.end()-1);
          }
          
          wordPattern = Pattern.compile("\\([a-zA-Z0-9\\.]+\\-");
          wordMatcher = wordPattern.matcher(dep3);
          if(wordMatcher.find()){
          dependent = dep3.substring(wordMatcher.start()+1,wordMatcher.end()-1);
          }
          
          wordPattern = Pattern.compile("\\-[0-9]+\\)");
          wordMatcher = wordPattern.matcher(dep3);
          if(wordMatcher.find()){
              try{
                String temp =dependent = dep3.substring(wordMatcher.start()+1,wordMatcher.end()-1);
                wordNo= Integer.parseInt(temp);
              }catch(NumberFormatException e){
                  System.out.println("Number format error");
              }
          }   
        //System.out.println(dep3);
        //System.out.println("Word ="+word+"& Dependency ="+dependency+"& Dependent ="+dependent+"& wordNo="+wordNo);
        dependencies.add(new Dependency(word,dependency,dependent,wordNo));
      } 
        return dependencies;
    }
    public static void writeToFile(String str, String outputFile){
        try {
        Files.write(Paths.get(outputFile), str.getBytes(), StandardOpenOption.APPEND);
        }catch (IOException e) {
            e.printStackTrace();
        }
    }
    public static void printTense(String sentence, MyTree tree){
        // this function identifies and prints the tense of input sentence (for test purposes)
        int a= isFuture(sentence, tree);
        if(a==1){
                System.out.println("Future Indefinite Tense.");
        }else if(a==2){
            System.out.println("Future Continuous Tense.");
        }else if(a==3){
            System.out.println("Future Perfect Tense.");
        }else if(a==4){
            System.out.println("Future Perfect Continuous Tense.");
        }
        if(a!=0)
            return;
        a= isPastPerfect(sentence, tree);
        if(a==1){
                System.out.println("Simple Past Tense.");
        }else if(a==2){
            System.out.println("Past Perfect Tense.");
        }else if(a==3){
            System.out.println("Past Perfect Continuous Tense.");
        }
        if(a!=0)
            return;
        a = isPast(sentence,tree);
        if(a==1){
                System.out.println("Simple Past Tense.");
        }else if(a==2){
            System.out.println("Past continuous Tense.");
        }
        if(a!=0)
            return;
        a= isPresent(sentence, tree);
        if(a==1){
                System.out.println("Simple Present Tense.");
        }else if(a==2){
            System.out.println("Present continuous Tense.");
        }
        if(a!=0)
            return;
        a= isPastIndefinite(sentence, tree);
        if(a==1){
            System.out.println("Past Indefinite Tense");
        }
        if(a!=0)
            return;
        a= isPresentPerfect(sentence, tree);
        if(a==1){
                System.out.println("Simple Present Tense.");
        }else if(a==2){
            System.out.println("Present Perfect Tense.");
        }else if(a==3){
            System.out.println("Present Perfect Continuous Tense.");
        }
        if(a==0)
            System.out.println("Present Indefinite Tense.");
    }
    public static int getTense(String sentence, MyTree tree){
        // this function identifies and returns the tense
        // return 13 if Simple Present Tense
        // return 14 if Simple Past Tense
        // return 1 if Present Indefinite Tense
        // return 2 if Present Continuous Tense
        // return 3 if Present Perfect Tense
        // return 4 if Present Perfect Continuous Tense
        // return 5 if Past Indefinite Tense
        // return 6 if Past Continuous Tense
        // return 7 if Past Perfect Tense
        // return 8 if Past Perfect Continuous Tense
        // return 9 if Future Indefinite Tense
        // return 10 if Future Continuous Tense
        // return 11 if Future Perfect Tense
        // return 12 if Future Perfect Continuous Tense
        int a= isFuture(sentence,tree);
        if(a==1){
                return 9;
        }else if(a==2){
            return 10;
        }else if(a==3){
            return 11;
        }else if(a==4){
            return 12;
        }
        a= isPastPerfect(sentence, tree);
        if(a==1){
                return 14;
        }else if(a==2){
            return 7;
        }else if(a==3){
            return 8;
        }
        a = isPast(sentence,tree);
        if(a==1){
                return 14;
        }else if(a==2){
            return 6;
        }
        a= isPresent(sentence, tree);
        if(a==1){
                return 13;
        }else if(a==2){
            return 2;
        }
        a= isPresentPerfect(sentence, tree);
        if(a==1){
                return 13;
        }else if(a==2){
            return 3;
        }else if(a==3){
            return 4;
        }
        a= isPastIndefinite(sentence, tree);
        if(a==1){
            return 5;
        }
        return 1;
    }
    public static int isPast(String sentence, MyTree tree){
        // return 1 if simple past
        // return 2 if past continuous
        // return 0 if neither
        if(!(sentence.contains(" was ")|| sentence.contains("Was ")||
                sentence.contains(" were ")||sentence.contains("Were ")||
                sentence.startsWith("was ")||sentence.startsWith("were "))){
            return 0;
        }
        MyTree auxNode = tree.getChildByDependency("aux");
        if(auxNode==null){
            MyTree ingNode = tree.getChildByName("VBG");
            if(ingNode!=null){
                if(ingNode.value.endsWith("ing")){
                    return 2;
                }else{
                    return 1;
                }
            }else{
                ingNode = tree.getChildByName("VBN");
                if(ingNode!=null && ingNode.value.endsWith("ing")){
                    return 2;
                }else{
                    return 1;
                }
            }
        }else{
            String val = auxNode.value;
            if(val.equalsIgnoreCase("was")||val.equalsIgnoreCase("were")){
                return 2;
            }else{
                return 1;
            }
        }
    }
    public static int isPresent(String sentence, MyTree tree){
        // return 0 if not simple/continuous present, return 1 if simple present, return 2 if present continuous
        if(!(sentence.contains(" is ")|| sentence.contains("Is ")||
                sentence.contains(" am ")||sentence.contains("Am ")
                ||sentence.contains(" are ")||sentence.contains("Are ")
                ||sentence.startsWith("is ")||sentence.startsWith("am ")
                ||sentence.startsWith("are "))){
            return 0;
        }
        MyTree auxNode = tree.getChildByDependency("aux");
        if(auxNode==null){
            MyTree ingNode = tree.getChildByName("VBG");
            if(ingNode!=null){
                if(ingNode.value.endsWith("ing")){
                    return 2;
                }else{
                    return 1;
                }
            }else{
                return 1;
            }
        }else{
            String val = auxNode.value;
            if(val.equalsIgnoreCase("is")||val.equalsIgnoreCase("am")
                    ||val.equalsIgnoreCase("are")){
                return 2;
            }else{
                return 1;
            }
        }
    }
    public static int isPastIndefinite(String sentence, MyTree tree){
        if(sentence.contains(" did ")||sentence.contains("Did ")){
            return 1;
        }
        MyTree vbdNode= tree.getChildByName("VBD");
        if(vbdNode!=null)
            return 1;
        return 0;
    }
    public static int isPastPerfect(String sentence, MyTree tree){
        // return 1 if simple past, return 2 if past perfect
        // return 3 if past perfect continuous, return 0 if none of these.
        if(!(sentence.contains(" had ")||sentence.contains("Had ")||sentence.startsWith("had ")))
            return 0;
        if(sentence.contains(" been ")){
            return 3;
        }
        MyTree auxNode = tree.getChildByDependency("aux");
        if(auxNode==null){
            MyTree vbnNode = tree.getChildByName("VBN");
            if(vbnNode!=null){
                return 2;
            }else{
                return 1;
            }
        }else{
            String val = auxNode.value;
            if(val.equalsIgnoreCase("had")){
                return 2;
            }else{
                return 1;
            }
        }
    }
    public static int isPresentPerfect(String sentence, MyTree tree){
        // return 1 if simple present, return 2 if present perfect
        // return 3 if present perfect continuous, return 0 if none of these.
        if(!(sentence.contains(" has ")||sentence.contains("Has ")
                ||sentence.contains(" have ")||sentence.contains("Have")
                ||sentence.startsWith("has ")||sentence.startsWith("have ")))
            return 0;
        if(sentence.contains(" been ")){
            return 3;
        }
        MyTree auxNode = tree.getChildByDependency("aux");
        if(auxNode==null){
            MyTree vbnNode = tree.getChildByName("VBN");
            if(vbnNode!=null){
                return 2;
            }
            return 1;
        }else{
            String val = auxNode.value;
            if(val.equalsIgnoreCase("has")||val.equalsIgnoreCase("have")){
                return 2;
            }else{
                return 1;
            }
        }
    }
    public static int isFuture(String sentence, MyTree tree){
        // return 1 if future indefinite
        // return 2 if future continuous
        // return 3 if future perfect
        // return 4 if future perfect continuous
        if(!(sentence.contains(" shall ")||sentence.contains("Shall ")||
                sentence.contains(" will ")||sentence.contains("Will ")||
                sentence.startsWith("shall ")||sentence.startsWith("will "))){
            return 0;
        }
        if(sentence.contains("been")){
            return 4;
        }
        if(sentence.contains(" have ")){
            return 3;
        }
        if(sentence.contains(" be ")){
            MyTree ingNode = tree.getChildByName("VBG");
            if(ingNode!=null){
                return 2;
            }
        }
        return 1;
    }
    public static Boolean isNegative(String sentence){
        if(sentence.contains(" not ")){
            return true;
        }
        return false;
    }
    public static Boolean isInterrogative(String sentence){
        if(sentence.contains("?")){
            return true;
        }
        return false;
    }
    public static Boolean isWHQuestion(String sentence){
        if(sentence.startsWith("What ")||sentence.startsWith("what ")
                ||sentence.startsWith("How ")||sentence.startsWith("how ")
                ||sentence.startsWith("When ")||sentence.startsWith("when ")
                ||sentence.startsWith("Why ")||sentence.startsWith("why ")
                ||sentence.startsWith("Where ")||sentence.startsWith("where ")
                ||sentence.startsWith("Who")||sentence.startsWith("who")){
            return true;
        }
        return false;
    }
    public static MyTree removeNodesByTag(MyTree tree, String posTag){
        MyTree unwantedChild = tree.getChildByName(posTag);
        while(unwantedChild!=null){
            int childIndex= unwantedChild.childNo;
            MyTree faultyParent=unwantedChild.parent;
            faultyParent.children.remove(childIndex);
            faultyParent.childCount--;
            unwantedChild=tree.getChildByName(posTag);
        }
        return tree;
    }
    public static void printSentenceStructureType(MyList sentence){
        int type = getSentenceStructureType(sentence);
        if(type==1){
            System.out.println("Simple Sentence.");
        }else if(type==2){
            System.out.println("Compound Sentence.");
        }else if(type==3){
            System.out.println("Complex Sentence.");
        }else if(type==4){
            System.out.println("Complex-Compound Sentence.");
        }
    }
    public static int getSentenceStructureType(MyList sentence){
        // return 1 if simple sentence
        // return 2 if compound sentence
        // return 1 if complex sentence
        // return 1 if complex-compound sentence
        int clauseCount = sentence.getClauseCount();
        if(clauseCount==1){
            return 1;
        }else{
            int independentClauses = sentence.getIndependentClauseCount();
            int diff = clauseCount - independentClauses;
            if(diff==1){
                return 2;
            }else{
                if(independentClauses==0){
                    return 3;
                }else{
                    return 4;
                }
            }
        }
    }
    public static void renameSubjectObject(MyTree tree, boolean isWH){
        if(tree.children.size()==0){
            return;
        }
        if(tree.name.equals("ROOT")){
            for(int i=0; i<tree.children.size(); i++){
                if(i==0 && isWH && tree.children.get(i).name.equals("SBARQ")){
                    MyTree whNode= tree.children.get(i);
                    whNode.name = "WH-QUESTION";
                    if(whNode.children.get(0).name.startsWith("WH")){
                        whNode.children.get(0).name= "WH";
                    }
                    if(whNode.children.size()>2 && whNode.children.get(1).name.equals("SQ")){
                        whNode.children.get(1).pslName = "Sentence";
                    }
                }
                if(tree.children.get(i).name.equals("S")||tree.children.get(i).name.equals("SQ")){
                    tree.children.get(i).pslName = "Sentence";
                }
            }
        }else if(tree.name.equals("S")||tree.name.equals("SQ")){
            for(int i=0; i<tree.children.size()-1; i++){
                if(tree.children.get(i).name.equals("NP")&&tree.children.get(i+1).name.equals("VP")){
                    tree.children.get(i).name = "SUBJ";
                }
            }
        }else if(tree.name.contains("VP")){
            for(int i=0; i<tree.children.size(); i++){
                if(tree.children.get(i).name.contains("NP")){
                   MyTree NP = tree.children.get(i);
                   MyTree OBJ = NP.getChildByDependency("dobj");
                   if(OBJ==null){
                       OBJ = NP.getChildByDependency("nsubj");
                   }
                   if(OBJ!=null){
                       NP.name = "OBJ";
                   }
                }
            }
        }
        for(int i=0; i<tree.children.size(); i++){
            renameSubjectObject(tree.children.get(i),isWH);
        }
    }
    public static void renameSubjectOnly(MyTree tree){
        // function to be used in translation of compound/complex sentences
        if(tree.children.size()==0){
            return;
        }
        if(tree.name.equals("ROOT")){
            for(int i=0; i<tree.children.size(); i++){
                if(tree.children.get(i).name.equals("S")||tree.children.get(i).name.equals("SQ")){
                    tree.children.get(i).pslName = "Sentence";
                }
            }
        }else if(tree.name.equals("S")||tree.name.equals("SQ")){
            for(int i=0; i<tree.children.size()-1; i++){
                if(tree.children.get(i).name.equals("NP")&&tree.children.get(i+1).name.equals("VP")){
                    tree.children.get(i).name = "SUBJ";
                }
            }
        }
        for(int i=0; i<tree.children.size(); i++){
            renameSubjectOnly(tree.children.get(i));
        }
    }
    public static void renameTreeNode(MyTree tree, String name, int tense){
        if(tree.depTag.equals("aux")){
            tree.name = "AUX";
        }if(tense>12&&(tree.value.equals("has")||tree.value.equals("have")||tree.value.equals("had"))){
            tree.name = "VERB";
        }else if(isVerbNode(tree.name)){
            if(isAuxiliaryVerbNode(tree.value)){
                tree.name = "AUX";
            }else if(tree.value.equals("been")&&(tense==4||tense==8||tense==12)){
                tree.name = "AUX";
            }else if(tree.value.equals("be")&&(tense==10)){
                tree.name = "AUX";
            }else{
                tree.name = "VERB";
                tree.value = getFirstForm(tree.value);
            }
        }else if(isNounNode(tree.name)){
            tree.name = "NOUN";
        }else if(tree.name.equals("PRP$")){
            tree.name = "PRPS";
        }else if(tree.name.equals("JJ")||tree.name.equals("JJS")){
            tree.name = "ADJ";
        }else if(tree.value.equals("not")||tree.depTag.equals("neg")){
            tree.name = "NEG";
        }else if(tree.name.equals("RB")&&tree.depTag.equals("advmod")){
            tree.name = "ADV";
        }else if(tree.depTag.equals("case")){
            tree.name = "PREP";
        }else if(tree.pslName.equals("Sentence")){
            tree.name = name;
        }else if(tree.name.equals("SQ")&&tree.children.get(1).name.equals("NP")){
            tree.name = name;
        }
        for(int i=0; i<tree.children.size(); i++){
            renameTreeNode(tree.children.get(i),name,tense);
        }
    }
    public static void changeDuplicateNames(MyTree tree){
        // this function is used in functin renameTree
        // this function renames two or more children having same name and same parent
        // e.g. PP,PP to PP1,PP2
        if(tree.children.size()<2){
            // do nothing
        }else{
            HashMap<String,DuplicateChild> duplicates = new HashMap();
            ArrayList<String> duplicateNames = new ArrayList();
            for(int i=0; i<tree.children.size(); i++){
                if(!(tree.children.get(i).name.equals("S")||tree.children.get(i).name.equals(","))){
                    DuplicateChild c = duplicates.get(tree.children.get(i).name);
                    String childName = tree.children.get(i).name;
                    if(c==null){
                        DuplicateChild d = new DuplicateChild();
                        d.name = childName;
                        d.locations.add(i);
                        duplicates.put(childName, d);
                    }else{
                        c.locations.add(i);
                        boolean alreadyExists = false;
                        for(int j=0; j<duplicateNames.size(); j++){
                            if(childName.equals(duplicateNames.get(j))){
                                alreadyExists = true;
                            }
                        }
                        if(!alreadyExists){
                            duplicateNames.add(childName);
                        }
                    }
                }
            }
            for(int k=0; k<duplicateNames.size(); k++){
                String name = duplicateNames.get(k);
                DuplicateChild c = duplicates.get(name);
                int count = 1;
                for(int m=0; m<c.locations.size(); m++){
                    String newName = name+Integer.toString(count);
                    tree.children.get(c.locations.get(m)).name = newName;
                    count++;
                }
            }
        }
        for(int n=0; n<tree.children.size(); n++){
            changeDuplicateNames(tree.children.get(n));
        }
    }
    public static void renameTree(String str, MyTree tree){
        int a = getTense(str,tree);
        boolean wh = isWHQuestion(str);
        String name = getSentenseName(str,a,wh);
        renameSubjectObject(tree,wh);
        renameTreeNode(tree,name,a);
        changeDuplicateNames(tree);
    }
    public static String getSentenseName(String str, int a, boolean isWH){
        String name = "";
        if(a==13){
            name = "SIMPLE-PRESENT";
        }else if(a==14){
            name = "SIMPLE-PAST";
        }else if(a==1){
            name = "PRESENT-INDEFINITE";
        }else if(a==2){
            name = "PRESENT-CONTINUOUS";
        }else if(a==3){
            name = "PRESENT-PERFECT";
        }else if(a==4){
            name = "PRESENT-PERFECT-CONTINUOUS";
        }else if(a==5){
            name = "PAST-INDEFINITE";
        }else if(a==6){
            name = "PAST-CONTINUOUS";
        }else if(a==7){
            name = "PAST-PERFECT";
        }else if(a==8){
            name = "PAST-PERFECT-CONTINUOUS";
        }else if(a==9){
            name = "FUTURE-INDEFINITE";
        }else if(a==10){
            name = "FUTURE-CONTINUOUS";
        }else if(a==11){
            name = "FUTURE-PERFECT";
        }else if(a==12){
            name = "FUTURE-PERFECT-CONTINUOUS";
        }
        if(isWH){
            name+="-WH";
            boolean neg = isNegative(str);
            if(neg){
                name+="-NEGATIVE";
            }
            return name;
        }
        boolean neg = isNegative(str);
        boolean inter = isInterrogative(str);
        if(neg){
            name+="-NEGATIVE";
            if(inter){
                name+="-INTERROGATIVE";
            }
        }else if(inter){
            name+="-INTERROGATIVE";
        }else{
            name+="-AFFIRMATIVE";
        }
        return name;
    }
    public static void constructPSLTree(MyTree tree){
        if(tree.children.size()!=0){
                Rule rule = rules.get(tree.name);
                if(rule!=null){
                int max = 0;
                int productionIndex = 0;
                for(int i=0; i<rule.productions.size(); i++){
                    ArrayList<String> production = rule.productions.get(i);
                    int count = 0;
                    for(int j=0; j<production.size(); j++){
                        String token = production.get(j);
                        for(int k=0; k<tree.children.size(); k++){
                            if(token.equals(tree.children.get(k).name)){
                                count++;
                                if(count>max){
                                    max=count;
                                    productionIndex = i;
                                }
                            }
                        }
                    }
                }
                ArrayList<String> chosenProduction = rule.productions.get(productionIndex);
                if(prepareGrammarRuleString){
                    grammarRules+= rule.NT+" --> ";
                    for(int i=0; i<chosenProduction.size(); i++){
                        grammarRules+=chosenProduction.get(i)+" ";
                    }
                    grammarRules+='\n';
                }
                ArrayList<MyTree> newChildren = new ArrayList();
                for(int m=0; m<chosenProduction.size(); m++){
                    String token = chosenProduction.get(m);
                    if(token.contains("\"")){
                        String value = token.replaceAll("\"", "");
                        String name = value.toUpperCase();
                        newChildren.add(new MyTree(name,value));
                    }else{
                        for(int n=0; n<tree.children.size(); n++){
                            if(token.equals(tree.children.get(n).name)){
                                newChildren.add(tree.children.get(n));
                            }
                        }
                    }
                }
                tree.children.clear();
                tree.children = newChildren;
                tree.childCount = tree.children.size();
            }
            for(int p=0; p<tree.children.size(); p++){
                constructPSLTree(tree.children.get(p));
            }    
        }
    }
    public static boolean isVerbNode(String posTag){
        if(posTag.equals("VB")||posTag.equals("VBD")
                    ||posTag.equals("VBG")||posTag.equals("VBZ")
                    ||posTag.equals("VBP")||posTag.equals("VBN")){
                return true;
        }else{
            return false;
        }
    }
    public static boolean isAuxiliaryVerbNode(String value){
        if(value.equals("is")||value.equals("am")
                    ||value.equals("are")||value.equals("Is")
                    ||value.equals("Am")||value.equals("Are")
                ||value.equals("was")||value.equals("were")
                ||value.equals("Was")||value.equals("Were")
                ||value.equals("has")||value.equals("have")
                ||value.equals("Has")||value.equals("Have")
                ||value.equals("Does")||value.equals("Do")){
                return true;
        }else{
            return false;
        }
    }
    public static boolean isNounNode(String posTag){
        if(posTag.equals("NN")||posTag.equals("NNS")
                    ||posTag.equals("NNP")||posTag.equals("NNPS")
                ||posTag.equals("PRP")){
                return true;
        }else{
            return false;
        }
    }
    public static void initializeVerbsHashtable(){
        String path = System.getProperty("user.dir")+"\\resources\\verbs.txt";
        File file = new File(path);
        if(file.exists()){
            try{
            FileReader fr = new FileReader(file);
            BufferedReader br = new BufferedReader(fr);
            String s="";
            while((s=br.readLine())!=null){
                //System.out.println("Line = "+s);
                String[] forms= s.split("\t");
                if(forms.length==5){
                    String verb = forms[0];
                    String secondForm = forms[1];
                    String thirdForm = forms[2];
                    String esForm = forms[3];
                    String ingForm = forms[4];
                    
                    if(!secondForm.equals(verb)){
                        verbs.put(secondForm, verb);
                    }
                    if(!thirdForm.equals(verb)&&!thirdForm.equals(secondForm)){
                        verbs.put(thirdForm, verb);
                    }
                    if(!esForm.equals(verb)){
                        verbs.put(esForm, verb);
                    }
                    verbs.put(ingForm, verb);
                }
            }
            }catch(Exception e){
                e.printStackTrace();
            }
        }else{
            System.out.println("Error: File "+path+" not found.");
        }
    }
    public static String getFirstForm(String verb){
        String firstForm = verbs.get(verb);
        if(firstForm==null)
            return verb;
        else
            return firstForm;
    }
    public static String translate(String str, MyTree tree, MyList list){
        String output;
        if(list==null){
            renameTree(str,tree);
            constructPSLTree(tree);
            output = tree.toString();
            if(!pslTreeComplex.equals("")){
                pslTreeComplex+="\n";
            }
            pslTreeComplex+=tree.getTreeDiagram();
        }else{
            int type = getSentenceStructureType(list);
            if(type==1){ // sentence is simple sentence
                renameTree(str,tree);
                constructPSLTree(tree);
                output = tree.toString();
                if(isInterrogative(str)){
                    output = output+"?";
                }else{
                    output = output+".";
                }
            }else{ // sentence is not a simple sentence
                renameSubjectOnly(tree);
                MyList list2 = tree.toMyList();
                output = translateComplex(str, list2);
            }
        }
        return output;
    }
    public static String translateComplex(String sentence, MyList list){
        pslTreeComplex = "";
        translatingComplex = true;
        ArrayList<SentenceNode> sentences = list.getSentences();
        String t="";
        Nlp4 parser = new Nlp4();
        for(int i=0; i<sentences.size(); i++){
            if(sentences.get(i).name.equals("S")){
                String str = sentences.get(i).value;
                Tree tree = parser.parse(str);
                String treeOutput=tree.toString();

                String str2 = str.replace("?", ""); // remove question mark if any (dependency tool correction)
                String dep= getDependencies(str2);
                MyTree tree3= MyUtils.constructAnnotatedTree(treeOutput,dep);
                String output = translate(str,tree3,null);
                if(i==0){
                    t=output;
                }else{
                    t+=" "+output;
                }
            }else{
                if(i==0){
                    t=sentences.get(i).value;
                }else{
                    t+=" "+sentences.get(i).value;
                }
            }
        }
        if(isInterrogative(sentence)){
            t+="?";
        }else{
            t+=".";
        }
        translatingComplex = false;
        return t;
    }
    public static void translateTextFile(){
        // this function translates a text file (line by line) and writes in output file
        String path = "C:/Users/Rehman/Desktop/clever_fox.txt";
        String outputPath = "result1.txt";
        File file = new File(path);
        if(file.exists()){
            Nlp4 parser = new Nlp4(); 
            PrintStream err = System.err;
            System.setErr(new PrintStream(new OutputStream() {
                public void write(int b) {
                }
            }));

            try{
            FileReader fr = new FileReader(file);
            BufferedReader br = new BufferedReader(fr);
            String s="";
            int count = 0;
            while((s=br.readLine())!=null){
                count++;
                //System.out.println("Translating Line no= "+count);
                
                Tree tree = parser.parse(s);
                String treeOutput=tree.toString();

                String str2 = s.replace("?", ""); // remove question mark if any (dependency tool correction)
                String dep= getDependencies(str2);

                MyTree tree3= constructAnnotatedTree(treeOutput,dep);
                MyList list = constructAnnotatedList(treeOutput,dep);
                //printTense(s, tree3);
                String str = translate(s, tree3, list);
                System.out.println(str);
            }
            }catch(Exception e){
                e.printStackTrace();
            }
            // set error to normal again
        System.setErr(err); 
        }else{
            System.out.println("Error: File "+path+" not found.");
        }   
    }
    public static void readRulesFile(){
        String path = Preferences.rulesDirectory;
        path = path.replace("\\","/");
        File file = new File(path);
        if(file.exists()){
            try{
            FileReader fr = new FileReader(file);
            BufferedReader br = new BufferedReader(fr);
            String s="";
            int lineNo = 0;
            while((s=br.readLine())!=null){
                lineNo++;
                //System.out.println("Line = "+s);
                //System.out.println("Line no= "+count);
                if(s.contains("::=")){
                    String[] ruleStr = s.split("::");
                    String NTstr = ruleStr[0];
                    String productionStr = ruleStr[1];
                    String NT = "";
                    Pattern pattern = Pattern.compile("<[^<^>]+>");
                    Matcher matcher = pattern.matcher(NTstr);
                    if(matcher.find()){
                        NT = s.substring(matcher.start()+1, matcher.end()-1);        
                    }
                    Rule oldRule = rules.get(NT);
                    if(oldRule!=null){
                        System.out.println("Error: Duplicate rule for "+NT+" on line no "+lineNo);
                        continue;
                    }
                    Rule rule = new Rule(NT);
                    String [] productions = productionStr.split("\\|");
                    for(int i=0; i<productions.length; i++){
                        //System.out.println("Production = "+productions[i]);
                        Matcher matcher2 = pattern.matcher(productions[i]);
                        ArrayList<String> production = new ArrayList();
                        while(matcher2.find()){
                            String token = productions[i].substring(matcher2.start()+1,matcher2.end()-1);
                            production.add(token);
                        }
                        rule.productions.add(production);
                    }
                    rules.put(NT, rule);
                }
            }
            }catch(Exception e){
                e.printStackTrace();
            }
        }else{
            System.out.println("Error: File "+path+" not found.");
        }
    }
    public static String getTypeName(int type){
        switch(type){
            case 1:
                return "Simple Sentence";
            case 2:
                return "Compound Sentence";
            case 3:
                return "Complex Sentence";
            case 4:
                return "Compound-Complex Sentence";
            default:
                return "Simple Sentence";
        }
    }
    public static String mapCompoundWords(String pslSentence){
        String str = pslSentence;
        
        str=str.replace(" here and there", " here-and-there");
        str=str.replace(" rise up", " rise-up ");
        str=str.replace(" At last", " at-last");
        
        return str;
    }
    
    private static class DuplicateChild{
        // this class is used in function changeDuplicateNames
        String name;
        ArrayList<Integer> locations = new ArrayList();
    }
}
