/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.csl;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

/**
 *
 * @author Rehman <12003065-317@umt.edu.pk>
 */
public class MyTree {
    String name;
    String value;
    String depTag; //dependency tag
    String pslName;
    MyTree parent;
    int nodeNo; //number of node in whole tree
    int wordNo; //number of word in input sentence
    ArrayList<MyTree> children;
    int childCount;       // childCount is (No of Children -1 )
    int childNo;          // child index of current node w.r.t parent
   public MyTree(String n, String v){
        children= new ArrayList();
        name=n;
        value=v;
        parent=null;
        childCount=-1;
        nodeNo=-1;
        wordNo=-1;
        depTag="";
        pslName="";
        childNo=-1;
    }
   public MyTree(String n, String v, MyTree parent){
       children=new ArrayList();
       name=n;
       value=v;
       this.parent=parent;
       childCount=-1;
       nodeNo=-1;
       wordNo=-1;
       depTag="";
       pslName="";
       childNo=-1;
   }
   // add a child and return pointer to newly added child
   public MyTree addChild(MyTree child){
       children.add(child);
       childCount++;
       return children.get(childCount);
   }
   private void printTreeNode(MyTree tree){
        System.out.print("("+tree.name);
        if(tree.value!=""){
            System.out.print("-"+tree.value);
        }
        for(int i=0; i<=tree.childCount; i++){
            System.out.print(" ");
            printTreeNode(tree.children.get(i));
        }
        System.out.print(")");
    }
   private void printNodeSentence(MyTree tree){
        if(tree.value!=""){
            System.out.print(tree.value+" ");
        }
        for(int i=0; i<=tree.childCount; i++){
            printNodeSentence(tree.children.get(i));
        }
    }
   
   public void printTree(){
       printTreeNode(this);
       System.out.println();
   }
   public void printSentence(){
       printNodeSentence(this);
       System.out.println();
   }
   private void printNodeSentence2(MyTree tree){
        if(tree.value!=""){
            System.out.print("("+tree.wordNo+")");
            System.out.print(tree.value+" ");
            System.out.print(tree.depTag);
        }
        for(int i=0; i<=tree.childCount; i++){
            printNodeSentence2(tree.children.get(i));
        }
    }
   public void printSentence2(){
       // prints sentence with dependency tags
       printNodeSentence2(this);
       System.out.println();
   }
   private String toStringNode(MyTree tree){
       if(tree.children.size()==0){
            return tree.value;
        }else{
            String s= toStringNode(tree.children.get(0));
            for(int i=1; i<tree.children.size(); i++){
                s+=" "+toStringNode(tree.children.get(i));
            }
            return s;
       }
   }
   
   
   public String toString(){
       String s=toStringNode(this);
       return s;
   }
   private void printNodeDiagram(String prefix, boolean isTail) {
        if(value!=""){
            System.out.print(prefix + (isTail ? "└── " : "├── ") +value+" ("+name);
        }else{
            System.out.print(prefix + (isTail ? "└──" : "├──")+"("+name);
        }
        if(depTag!=""){
            System.out.println("-"+depTag+")");
        }else{
            System.out.println(")");
        }
        
        for (int i = 0; i < children.size() - 1; i++) {
            children.get(i).printNodeDiagram(prefix + (isTail ? "    " : "│   "), false);
        }
        if (children.size() > 0) {
            children.get(children.size() - 1).printNodeDiagram(prefix + (isTail ?"    " : "│   "), true);
        }
    }
   public void printTreeDiagram(){
        printNodeDiagram("",false);
   }
   private String getNodeDiagram(String prefix, boolean isTail, String diagram) {
        // this function returns node diagram as string
        diagram+=prefix;
        if(value!=""){
            if(isTail){
                diagram+="└── ";
            }else{
                diagram+="├── ";
            }
            diagram+=value+" ("+name;
        }else{
            if(isTail){
                diagram+="└──";
            }else{
                diagram+="├──";
            }
            diagram+="("+name;
        }
        if(depTag!=""){
            diagram+="-"+depTag+")"+"\n";
        }else{
            diagram+=")"+"\n";
        }
        for (int i = 0; i < children.size() - 1; i++) {
            diagram+=children.get(i).getNodeDiagram(prefix + (isTail ? "    " : "│   "), false,"");
        }
        if (children.size() > 0) {
            diagram+=children.get(children.size() - 1).getNodeDiagram(prefix + (isTail ?"    " : "│   "), true,"");
        }
        return diagram;
    }
   public String getTreeDiagram(){
       // returns tree diagram as string
            String diagram="";
            diagram = getNodeDiagram("",false,diagram);
            return diagram;
   }
   private void printNodeDiagramToFile(String prefix, boolean isTail, PrintWriter out) {
        if(value!=""){
            out.print(prefix + (isTail ? "└── " : "├── ") +value+" ("+name);
        }else{
            out.print(prefix + (isTail ? "└──" : "├──")+"("+name);
        }
        if(depTag!=""){
            out.println("-"+depTag+")");
        }else{
            out.println(")");
        }
        
        for (int i = 0; i < children.size() - 1; i++) {
            children.get(i).printNodeDiagramToFile(prefix + (isTail ? "    " : "│   "), false,out);
        }
        if (children.size() > 0) {
            children.get(children.size() - 1).printNodeDiagramToFile(prefix + (isTail ?"    " : "│   "), true,out);
        }
    }
   public void printTreeDiagramToFile(String str){
       try(FileWriter fw = new FileWriter("d:/out.txt", true);
    BufferedWriter bw = new BufferedWriter(fw);
    PrintWriter out = new PrintWriter(bw))
    {
        out.println();
        out.println();
        out.println(str);
        out.println();
        out.println();
            printNodeDiagramToFile("",false,out);
            } catch (IOException e) {
    e.printStackTrace();
    }
   }
   private MyTree getNodeByName(String posTag){
       // this function is used by function getChildByName
       if(name.equals(posTag)){
           return this;
       }
       for(int i=0; i<children.size(); i++){
           MyTree ref;
           ref=children.get(i).getNodeByName(posTag);
           if(ref!=null)
               return ref;
       }
       return null;
   }
   public MyTree getChildByName(String posTag){
       for(int i=0; i<children.size(); i++){
           MyTree ref;
           ref=children.get(i).getNodeByName(posTag);
           if(ref!=null)
               return ref;
       }
       return null;
   }
   private MyTree getNodeByDependency(String dependency){
       // this function is used by function getChildByName
       if(dependency.equals(depTag)){
           return this;
       }
       for(int i=0; i<children.size(); i++){
           MyTree ref;
           ref=children.get(i).getNodeByDependency(dependency);
           if(ref!=null)
               return ref;
       }
       return null;
   }
   public MyTree getChildByDependency(String dependency){
       for(int i=0; i<children.size(); i++){
           MyTree ref;
           ref=children.get(i).getNodeByDependency(dependency);
           if(ref!=null)
               return ref;
       }
       return null;
   }
   public MyList toMyList(){
       MyList list = new MyList();
       for(int i=0; i<children.size(); i++){
           MyList list2 = children.get(i).toMyList();
           for(int j=0; j<list2.list.size(); j++){
               list.add(list2.list.get(j));
           }
       }
       list.list.add(0,new ListNode(name,value,wordNo,depTag));
       return list;
   }
}


