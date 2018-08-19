package org.CSL.utils;

import com.susing.EasyConnection;
import com.susing.sql.ConnectionManager;


import static util.HNSUtils.getStdBufReader;
import static util.HNSUtils.hnsuFromHNS8;
import static util.HNSUtils.hnsuItemsFromHSiGML;
import static util.HNSUtils.getBufReader;
import static util.HNSUtils.readLines;
import static util.HNSUtils.sigmlFromHNS8Items;
import static util.HNSUtils.sigmlFromHNSUItems;
import static util.HNSUtils.signDocsFromSigns;
import static util.HNSUtils.signsFromSiGMLDoc;
import static util.HNSUtils.toStdOut;
import static util.HNSUtils.indentXML;
import static util.HNSUtils.joinLines;
import static util.HNSUtils.join;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import org.json.*;

public class LoadEnglishDictionary  {

	public static File folder = new File("F:/shouyu/data/SignFiles");
	
	public LoadEnglishDictionary() {

	}

	
	public  static  String readFile(File file){
	    String content = null;
	    FileReader reader = null;
	    try {
	        reader = new FileReader(file);
	        char[] chars = new char[(int) file.length()];
	        reader.read(chars);
	        content = new String(chars);
	        reader.close();
	    } catch (IOException e) {
	        e.printStackTrace();
	    } finally {
	        if(reader != null){
	        	 try {
	        		  reader.close();
	        	 }catch (IOException e) {
	    	        e.printStackTrace();
	    	    }
	        }
	    }
	    return content;
	}

	public static void listFilesForFolder(final File folder,EasyConnection con) throws Exception{
	    for (final File fileEntry : folder.listFiles()) {
	      if (fileEntry.isDirectory()) {
	        listFilesForFolder(fileEntry,con);
	      } else {
	        if (fileEntry.isFile()) {
	        	String fileName = fileEntry.getName();
	        	String word=fileName.substring(0,fileName.indexOf("."));
	        	String content=readFile(fileEntry);
	    		BufferedReader grdr = getBufReader(fileEntry);
	    		String[] gsigml = readLines(grdr);
	    		String sigml=joinLines(indentXML(gsigml));
	    		String[] hnsu = hnsuItemsFromHSiGML(gsigml);
	    		String hnsuString=join(hnsu,"").replace(word,"");
	  
	        	String sql="select id from category_base where lang='en_us' and name=?";
	    		String [][] categories=con.query(sql,new String[]{word.toUpperCase().charAt(0)+""});
	    		String[] dict;
	    		if(categories.length>0){
		        	dict=new String[]{word,word,categories[0][0],"en_us","",hnsuString,sigml};
	    		}else{
	    			dict=new String[]{word,word,"90","en_us","",hnsuString,sigml};
	    		}
	        	con.exec("insert into word_base (word,pinyin,category,lang,description,hamnosys,sigml) VALUES (?,?,?,?,?,?,?) ",dict);
	        }
	      }
	    }
	}
	  
	public static void main(String[] args) throws Exception {

		LoadEnglishDictionary ST = new LoadEnglishDictionary();
		
        Class.forName("com.mysql.jdbc.Driver");
		String url="jdbc:mysql://192.168.1.7:3306/shouyu?generateSimpleParameterMetadata=true&useUnicode=true&characterEncoding=utf8";
		EasyConnection con=ConnectionManager.currentManager(true).getConnection("MySQL","com.mysql.jdbc.Driver","plat", url, "shouyu", "bizdict", "", true);
		
		String sql="select id,name from category_base";
		String [][] categories=con.query(sql);

	    listFilesForFolder(folder,con);
		
//		for(int i=0;i<categories.length;i++){
//			ArrayList<Object[]> result=new ArrayList<Object[]>();
//			Object[][] dict=new Object[result.size()][6];
//			result.toArray(dict);
//			for(int k=0;k<dict.length;k++){
//				con.execLarge("insert into word_base (word,pinyin,categery,lang,description,image) VALUES (?,?,?,?,?,?) ",dict[k]);
//			}
//		}
	}
	
	private static void reportGToHErr(int ix, String msg) {
		System.err.println("gSiGMLToHNS() at item "+ix+": "+msg);
	}
}
