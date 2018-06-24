/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.csl;

/**
 *
 * @author Rehman <12003065-317@umt.edu.pk>
 */
public class ListNode {
    String name;   //POS tag
    String value;  //word (if any)
    String depTag; //dependency tag
    int nodeNo; //number of node in list
    int wordNo; //number of word in input sentence
    public ListNode(String n, String v){
        name=n;
        value=v;
        wordNo=-1;
        depTag="";
    }
    public ListNode(String n, String v, int w, String dep){
        name=n;
        value=v;
        wordNo=w;
        depTag=dep;
    }
}