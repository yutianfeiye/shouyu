/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.csl;

import java.util.ArrayList;

/**
 *
 * @author Rehman <12003065-317@umt.edu.pk>
 */
public class Rule {
    String NT;
    ArrayList<ArrayList<String>> productions = new ArrayList();
    public Rule(String NT){
        this.NT = NT;
    }
}
