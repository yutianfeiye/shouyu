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
public class Dependency implements Comparable<Dependency>{
    String word;
    String dependency;
    String dependent;
    int wordNo;

    public Dependency(String word, String dependency, String dependent, int wordNo) {
        this.word = word;
        this.dependency = dependency;
        this.dependent = dependent;
        this.wordNo=wordNo;
    }

    @Override
    public int compareTo(Dependency t) {
        return Integer.compare(this.wordNo, t.wordNo);
    }
}
