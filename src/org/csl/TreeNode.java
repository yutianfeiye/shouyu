/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.csl;

/**
 *
 * @author Rehman
 */
public class TreeNode {
    String name;   //POS tag
    String value;  //word (if any)
    String depTag; //dependency tag
    String pslName;
    public TreeNode(String n, String v){
        name=n;
        value=v;
        depTag="";
        pslName="";
    }
    public TreeNode(String n, String v, String dep){
        name=n;
        value=v;
        depTag=dep;
        pslName="";
    }
}

