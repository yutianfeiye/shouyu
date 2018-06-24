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
public class HamNoSys {

    private Manual mMarker;
    private NonManual nmMarker;

    public HamNoSys()
    {
        mMarker = null;
        nmMarker = null;
    }

    public HamNoSys(Manual m, NonManual nm)
    {
        mMarker = m;
        nmMarker = nm;
    }

    public Manual getmanualMarker()
    {
        return mMarker;
    }

    public NonManual getnonmanualMarker()
    {
        return nmMarker;
    }

    public void setmanualMarker(Manual m)
    {
        mMarker = m;
    }

    public void setnonmanualMarker(NonManual nm)
    {
        nmMarker = nm;
    }
}
