/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.csl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author Rehman <12003065-317@umt.edu.pk>
 */
public class MyList {
    // this class will contain arrayList of tagged/annotated words/nodes.
    ArrayList<ListNode> list = new ArrayList();
    public void add(ListNode n){
        list.add(n);
    }
    public int getClauseCount(){
        int sCount=0;
        int prevClauseIndex = -1;
        for(int i=0; i<list.size(); i++){
            if(list.get(i).name.equals("S")||list.get(i).name.equals("SQ")){
                if(prevClauseIndex==-1){
                    prevClauseIndex=i;
                    sCount++;
                }else{
                    int diff = i-prevClauseIndex;
                    prevClauseIndex=i;
                    if(diff>=2){        // done to avoid identification of nested S tags as new clauses
                        boolean flag=false;
                        for(int j=i; j<list.size(); j++){
                            int diff2 = j-prevClauseIndex;
                            if(diff2<=1){
                                String posTag = list.get(j).name;
                                if(posTag.equals("VP")){  // done to avoid identification of verb phrases as clauses
                                    flag=true;
                                    break;
                                }
                            }else{
                                break;
                            }
                        }
                        if(flag==false)
                        sCount++;
                    }
                }
            }
        }
        return sCount;
    }
    public int getIndependentClauseCount(){
        ArrayList<Integer> startingIndices = new ArrayList();
        Map<String,String> fanboys = new HashMap();
        fanboys.put("for","a");
        fanboys.put("and","a");
        fanboys.put("nor","a");
        fanboys.put("but","a");
        fanboys.put("or","a");
        fanboys.put("yet","a");
        fanboys.put("so","a");
        int sCount=0;
        int count = 0;                            
        int prevClauseIndex = -1;
        for(int i=0; i<list.size(); i++){
            if(list.get(i).name.equals("S")){
                if(prevClauseIndex==-1){
                    prevClauseIndex=i;
                    for(int j=i; j<list.size(); j++){
                        if(list.get(j).wordNo!=-1){
                            startingIndices.add(list.get(j).wordNo);
                            break;
                        }
                    }
                    sCount++;
                }else{
                    int diff = i-prevClauseIndex;
                    prevClauseIndex=i;
                    if(diff>=2){
                        for(int j=i; j<list.size(); j++){
                            int diff2 = j-prevClauseIndex;
                            if(diff2<=1){
                                String posTag = list.get(j).name;
                                if(posTag.equals("VP"))
                                    break;
                            }
                            if(list.get(j).wordNo!=-1){
                                startingIndices.add(list.get(j).wordNo);
                                break;
                            }
                        }
                        sCount++;
                    }
                }
            }
        }
        for(int k=0; k<list.size(); k++){
            if(list.get(k).wordNo!=-1){
                String word = list.get(k).value.toLowerCase();
                String s = fanboys.get(word);
                if(s!=null){ // word is a coordinating conjunction
                    boolean flag = false;
                    for(int m=0; m<startingIndices.size(); m++){
                        int diff = startingIndices.get(m)-list.get(k).wordNo;
                        //System.out.println("index = "+startingIndices.get(m)+" diff= "+diff);
                        if(diff==1||diff==0){
                            flag=true;
                            count++;
                            break;
                        }
                    }
                }
            }
        }
        return count;
    }
    public ArrayList<SentenceNode> getSentences(){
        ArrayList<SentenceNode> sentences = new ArrayList();
        String s="";
        for(int i=0; i<list.size()-1; i++){
            //System.out.println("Name: "+list.get(i).name+"; Value: "+list.get(i).value);
            if(list.get(i).depTag.equals("mark")&&list.get(i+1).name.equals("S")){
                sentences.add(new SentenceNode("CC",list.get(i).value,0));
            }else if(list.get(i).name.equals("CC")&&list.get(i+1).name.equals("S")){
                sentences.add(new SentenceNode("CC",list.get(i).value,0));
            }else if(list.get(i).name.equals("WDT")&&list.get(i+1).name.equals("S")){
                sentences.add(new SentenceNode("CC",list.get(i).value,0));
            }else if(list.get(i).name.equals("WRB")&&list.get(i+1).name.equals("S")){
                sentences.add(new SentenceNode("CC",list.get(i).value,0));
            }else if(list.get(i).value.equals(",")&&list.get(i+1).name.equals("S")){
                sentences.add(new SentenceNode("CC",list.get(i).value,0));
            }else if(list.get(i).value.equals(",")&&list.get(i+1).name.equals("SUBJ")){
                sentences.add(new SentenceNode("CC",list.get(i).value,0));
            }else if(list.get(i).name.equals("S")&&list.get(i+1).name.equals("VP")){
                boolean firstValue = false;
                while(true){
                    if((list.get(i).depTag.equals("mark")&&list.get(i+1).name.equals("S"))
                            ||i==list.size()-1
                            ||(list.get(i).name.equals("CC")&&list.get(i+1).name.equals("S"))
                            ||(list.get(i).name.equals("WDT")&&list.get(i+1).name.equals("S"))
                            ||(list.get(i).name.equals("WRB")&&list.get(i+1).name.equals("S"))
                            ||(list.get(i).name.equals("SBAR")&&list.get(i+1).name.equals("S"))
                            ||(list.get(i).value.equals(",")&&list.get(i+1).name.equals("SUBJ"))
                            ||(list.get(i).value.equals(",")&&list.get(i+1).name.equals("S"))){
                        i--;
                        break;
                    }
                    if(firstValue==false && !list.get(i).value.equals("")){
                        firstValue = true;
                        s= list.get(i).value;
                    }else if(firstValue==true && !list.get(i).value.equals("")){
                        s+=" "+list.get(i).value;
                    }
                    i++;
                }
                sentences.add(new SentenceNode("S",s,0));
                s="";
            }else if((list.get(i).name.equals("S")&&list.get(i+1).name.equals("NP"))
                    ||(list.get(i).name.equals("SUBJ"))
                    ||(list.get(i).name.equals("S")&&list.get(i+1).name.equals("SUBJ"))){
                boolean firstValue = false;
                while(true){
                    if((list.get(i).depTag.equals("mark")&&list.get(i+1).name.equals("S"))
                            ||i==list.size()-1
                            ||(list.get(i).name.equals("CC")&&list.get(i+1).name.equals("S"))
                            ||(list.get(i).name.equals("WDT")&&list.get(i+1).name.equals("S"))
                            ||(list.get(i).name.equals("WRB")&&list.get(i+1).name.equals("S"))
                            ||(list.get(i).value.equals(",")&&list.get(i+1).name.equals("S"))
                            ||(list.get(i).value.equals(",")&&list.get(i+1).name.equals("SUBJ"))
                            ||(list.get(i).name.equals("SBAR")&&list.get(i+1).name.equals("S"))){
                        i--;
                        break;
                    }
                    if(firstValue==false && !list.get(i).value.equals("")){
                        firstValue = true;
                        s= list.get(i).value;
                    }else if(firstValue==true && !list.get(i).value.equals("")){
                        s+=" "+list.get(i).value;
                    }
                    i++;
                }
                sentences.add(new SentenceNode("S",s,0));
                s="";
            }else if(list.get(i).name.equals("S")&&list.get(i+1).name.equals("PP")){
                boolean firstValue = false;
                while(true){
                    if((list.get(i).depTag.equals("mark")&&list.get(i+1).name.equals("S"))
                            ||i==list.size()-1
                            ||(list.get(i).name.equals("CC")&&list.get(i+1).name.equals("S"))
                            ||(list.get(i).name.equals("WDT")&&list.get(i+1).name.equals("S"))
                            ||(list.get(i).name.equals("WRB")&&list.get(i+1).name.equals("S"))
                            ||(list.get(i).value.equals(",")&&list.get(i+1).name.equals("S"))
                            ||(list.get(i).name.equals("SBAR")&&list.get(i+1).name.equals("S"))){
                        i--;
                        break;
                    }
                    if(firstValue==false && !list.get(i).value.equals("")){
                        firstValue = true;
                        s= list.get(i).value;
                    }else if(firstValue==true && !list.get(i).value.equals("")){
                        s+=" "+list.get(i).value;
                    }
                    i++;
                }
                sentences.add(new SentenceNode("S",s,0));
                s="";
            }
        }
        /*
        System.out.println("SEnteNCES:");
        for(int j=0; j<sentences.size(); j++){
            System.out.println("Type: "+sentences.get(j).name+"; Value: "+sentences.get(j).value);
        }
        */
        return sentences;
    }
}

