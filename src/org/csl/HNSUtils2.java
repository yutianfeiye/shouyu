/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.csl;

import java.util.StringTokenizer;

/**
 *
 * @author Mobeen-133 <110165133@umt.edu.pk>
 */
public class HNSUtils2 {

    private static String head = "", shoulder = "", body = "";
    //Flags
    private static boolean flagHead = true, flagBody = true, flagShoulder = true;

    public static String sigmlFromNonManual(String input)
    {
        StringTokenizer token;
        head = shoulder = body = "";
        flagHead = flagBody = flagShoulder = true;
        if (input.length() == 34)
        {
            token = new StringTokenizer(input, ",");
            String line;
            input = "";
            for (int i = 0; token.hasMoreTokens(); i++)
            {
                line = token.nextToken();
//                if (line.equals("0000000001000"))
//                    System.out.println(i + ": " + line + " " + line.length());
                if (i == 0) //Means head 
                    for (byte j = 0; j < line.length(); j++)
                    {
                        if (line.charAt(j) == '1')
                        {
                            if (j == 0)
                            {
                                head = "<hnm_head tag=\"NO\"/>\n";
                                flagHead = false;
                            }

                            if (j == 1 && flagHead)
                            {
                                head = "<hnm_head tag=\"SH\"/>\n";
                                flagHead = false;
                            }
                            if (j == 2 && flagHead && flagHead)
                            {
                                head = "<hnm_head tag=\"SR\"/>\n";
                                flagHead = false;
                            }
                            if (j == 3 && flagHead)
                            {
                                head = "<hnm_head tag=\"SL\"/>\n";

                                flagHead = false;
                            }
                            if (j == 4 && flagHead)
                            {
                                head = "<hnm_head tag=\"TR\"/>\n";

                                flagHead = false;
                            }
                            if (j == 5 && flagHead)
                            {
                                head = "<hnm_head tag=\"TL\"/>\n";

                                flagHead = false;
                            }
                            if (j == 6 && flagHead)
                            {
                                head = "<hnm_head tag=\"NF\"/>\n";

                                flagHead = false;
                            }
                            if (j == 7 && flagHead)
                            {
                                head = "<hnm_head tag=\"NB\"/>\n";
                                flagHead = false;
                            }
                            if (j == 8 && flagHead)
                            {
                                head = "<hnm_head tag=\"NU\"/>\n";
                                flagHead = false;
                            }
                            if (j == 9 && flagHead)
                            {
                                head = "<hnm_head tag=\"ND\"/><hnm_head tag=\"ND\"/><hnm_head tag=\"ND\"/>\n";
                                flagHead = false;
                            }
                            if (j == 10 && flagHead)
                            {
                                head = "<hnm_head tag=\"PF\"/>\n";
                                flagHead = false;
                            }
                            if (j == 11 && flagHead)
                            {
                                head = "<hnm_head tag=\"PB\"/>\n";
                                flagHead = false;
                            }
                            if (j == 12 && flagHead)
                            {
                                head = "<hnm_head tag=\"LI\"/>\n";
                                flagHead = false;
                            }
                        }
                        else if (line.charAt(j) != '0')
                            return "Invalid Non-Manual Character Entry";
                    }
                if (i == 1) //Means Shoulder
                    for (byte j = 0; j < line.length(); j++)
                    {
                        if (line.charAt(j) == '1')
                        {
                            if (j == 0)
                                shoulder = "<hnm_shoulder tag=\"UL\"/>\n";
                            if (j == 1 && flagShoulder)
                            {
                                shoulder = "<hnm_shoulder tag=\"UR\"/>\n";
                                flagShoulder = false;
                            }
                            if (j == 2 && flagShoulder)
                            {
                                shoulder = "<hnm_shoulder tag=\"UB\"/>\n";
                                flagShoulder = false;
                            }
                            if (j == 3 && flagShoulder)
                            {
                                shoulder = "<hnm_shoulder tag=\"HL\"/>\n";
                                flagShoulder = false;
                            }
                            if (j == 4 && flagShoulder)
                            {
                                shoulder = "<hnm_shoulder tag=\"HR\"/>\n";
                                flagShoulder = false;
                            }
                            if (j == 5 && flagShoulder)
                            {
                                shoulder = "<hnm_shoulder tag=\"HB\"/>\n";
                                flagShoulder = false;
                            }
                            if (j == 6 && flagShoulder)
                            {
                                shoulder = "<hnm_shoulder tag=\"SL\"/>\n";
                                flagShoulder = false;
                            }
                            if (j == 7 && flagShoulder)
                            {
                                shoulder = "<hnm_shoulder tag=\"SR\"/>\n";
                                flagShoulder = false;
                            }
                            if (j == 8 && flagShoulder)
                            {
                                shoulder = "<hnm_shoulder tag=\"SB\"/>\n";
                                flagShoulder = false;
                            }
                        }
                        else if (line.charAt(j) != '0')
                            return "Invalid Non-Manual Character Entry";
                    }
                if (i == 2) //Means body
                    for (byte j = 0; j < line.length(); j++)
                    {
                        if (line.charAt(j) == '1')
                        {
                            if (j == 0)
                            {
                                body = "<hnm_body tag=\"RL\"/>\n";
                                flagBody = false;
                            }

                            if (j == 1 && flagBody)
                            {
                                body = "<hnm_body tag=\"RR\"/>\n";
                                flagBody = false;
                            }
                            if (j == 2 && flagBody)
                            {
                                body = "<hnm_body tag=\"TL\"/>\n";
                                flagBody = false;
                            }
                            if (j == 3 && flagBody)
                            {
                                body = "<hnm_body tag=\"TR\"/>\n";
                                flagBody = false;
                            }
                            if (j == 4 && flagBody)
                            {
                                body = "<hnm_body tag=\"TF\"/>\n";
                                flagBody = false;
                            }
                            if (j == 5 && flagBody)
                            {
                                body = "<hnm_body tag=\"TB\"/>\n";
                                flagBody = false;
                            }
                            if (j == 6 && flagBody)
                            {
                                body = "<hnm_body tag=\"SI\"/>\n";
                                flagBody = false;
                            }
                            if (j == 7 && flagBody)
                            {
                                body = "<hnm_body tag=\"HE\"/>\n";
                                flagBody = false;
                            }

                            if (j == 8 && flagBody)
                            {
                                body = "<hnm_body tag=\"ST\"/>\n";
                                flagBody = false;
                            }
                            if (j == 9 && flagBody)
                            {
                                body = "<hnm_body tag=\"RD\"/>\n";
                                flagBody = false;
                            }
                        }
                        else if (line.charAt(j) != '0')
                            return "Invalid Non-Manual Character Entry";
                    }
            }
            if (!(head.length() == 0 && body.length() == 0 && shoulder.length() == 0))
            {
                input = "\n<hamnosys_nonmanual>\n" + head + shoulder + body + "</hamnosys_nonmanual>";
//                System.out.println("Input is :" + input);

            }
            return input;
        }
        else
            return "Invalid Non-Manual Entry Length";
    }
}
