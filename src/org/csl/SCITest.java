package org.csl;

import org.csl.util.SToCALogger;

import java.util.Properties;

import org.csl.util.JSONStreamGenFromAnim;
import org.csl.util.SToC.CASDataReceiver;

import jautil.JAEnv;
import jautil.JAOptions;
import java.io.BufferedReader;
import java.io.IOException;
import utilhc.HNSUtils;
import org.csl.util.SToC;


public class SCITest {

	public static void main(String args[])  {
		
		String PATH = ((args == null) || (args.length == 0)) ? null : args[0];
		
		BufferedReader srdr = (PATH == null) ? HNSUtils.getStdBufReader() : HNSUtils.getBufReader(PATH);
		
		System.out.println("动画测试开始");
		
		SToCALogger logger=new SToCALogger("false");
		
		 //argProps.setProperty(key, value);

		try{
			 Properties argProps=new Properties();
			 
			 argProps.setProperty("avatar.id.list", "anna:marc:max:luna");
			 argProps.setProperty("avatar.direct.base.uri.anna", "F:\\shouyu\\avatar\\anna.jar");
			 argProps.setProperty("avatar.direct.base.uri.marc", "F:\\shouyu\\avatar\\marc.jar");
			 argProps.setProperty("avatar.direct.base.uri.max", "F:\\shouyu\\avatar\\max.jar");
			 argProps.setProperty("avatar.direct.base.uri.luna", "F:\\shouyu\\avatar\\luna.jar");
			 
		//	 argProps.setProperty("cacheable.avatar.list", "anna:marc:max:luna");
			 argProps.setProperty("direct.files.avatar.list", "anna:marc:max:luna");
			 argProps.setProperty("camera.settings", "0.0:0.230:3.3:9.0:18.0:30.0:-1.0:-1.0");
			 argProps.setProperty("avatar.fps", "30");

			JAOptions jaopts=JAOptions.makeJAOptions("SiGMLServer", args, argProps,JAEnv.makeAppJAEnv());
			SToC stoc=new SToC(jaopts,logger); 
	
			String[] slines = HNSUtils.readLines(srdr);
			String sigml="";
			for (int i=0;i<slines.length;i++){
				sigml+=slines[i];
			}
			stoc.sigmlTextToJSON(sigml,"anna"); 
		}catch(Exception ie){
			ie.printStackTrace();
		}
    }
}
