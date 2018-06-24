/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.csl;

/**
 *
 * @author Mobeen-133 <110165133@umt.edu.pk>
 */
public class Manual {

    private String Gloss, Code;

    public Manual()
    {
        Gloss = Code = "";
    }

    public Manual(String G, String C)
    {
        Gloss = G;
        Code = C;
    }

    public void put(String G, String C)
    {
        Gloss = G;
        Code = C;
    }

    public void setGloss(String G)
    {
        Gloss = G;
    }

    public void setCode(String C)
    {
        Code = C;
    }

    public String getGloss()
    {
        return Gloss;
    }

    public String getCode()
    {
        return Code;
    }
}
