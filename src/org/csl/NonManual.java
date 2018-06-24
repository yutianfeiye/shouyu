/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.csl;

//import java.util.StringTokenizer;
import static org.csl.HNSUtils2.sigmlFromNonManual;

/**
 *
 * @author Mobeen-133 <110165133@umt.edu.pk>
 */
public class NonManual {

    private String Gloss, Code;

    NonManual()
    {
        Gloss = Code = "";
    }

    NonManual(String G, String input)
    {
        Gloss = G;
        Code = HNSUtils2.sigmlFromNonManual(input);
    }

    public String getGloss()
    {
        return Gloss;
    }

    public String getCode()
    {
        return Code;
    }

    public void setGloss(String G)
    {
        Gloss = G;
    }

    public void setCode(String C)
    {
        Code = sigmlFromNonManual(C);
    }

}
