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
public class SentenceNode {
    // this class is used to process compound and complex sentences
    String name;
    String value;
    int tenseNo;
    
    public SentenceNode(String name, String value, int tenseNo) {
        this.name = name;
        this.value = value;
        this.tenseNo = tenseNo;
    }
}
