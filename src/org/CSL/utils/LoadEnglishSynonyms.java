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
import java.util.ArrayList;
import org.json.*;

public class LoadEnglishSynonyms  {

	public static File synonymousFile = new File("F:/shouyu/data/Thesuraus1.txt");
	
	public LoadEnglishSynonyms() {

	}

	public static void listFilesForFolder(final File folder,EasyConnection con,String[][] words) throws Exception{
		
		BufferedReader grdr = getBufReader(synonymousFile);
		String[] synonymouses = readLines(grdr);
		
//		for(int i=0;i<words.length;i++){
//			boolean isSame=false;
//			ArrayList<String> synomList=new ArrayList<String>();
//			for(int k=0;k<synonymouses.length;k++){
//				if(synonymouses[k].indexOf("#")!=-1){
//					if(synonymouses[k].equals("#"+words[i][0])){
//					
//						isSame=true;
//					}else{
//						isSame=false;
//					}
//				}else{
//					if(isSame){
//						synomList.add(synonymouses[k]);
//					}
//				}
//			}
//			for(int k=0;k<synomList.size();k++){
//				String synom=synomList.get(k);
//				System.out.println(words[i][0]+"::::"+synom);;
//				con.exec("insert into synonyms_base (word,synonyms) VALUES (?,?) ",new String[]{words[i][0],synom});
//			}
//		}
	}
	  
	public static void main(String[] args) throws Exception {

		LoadEnglishSynonyms ST = new LoadEnglishSynonyms();
		
        Class.forName("com.mysql.jdbc.Driver");
		String url="jdbc:mysql://192.168.1.7:3306/shouyu?generateSimpleParameterMetadata=true&useUnicode=true&characterEncoding=utf8";
		EasyConnection con=ConnectionManager.currentManager(true).getConnection("MySQL","com.mysql.jdbc.Driver","plat", url, "shouyu", "bizdict", "", true);
		
		String sql="select word from word_base where lang='zh_cn'";
		String [][] words=con.query(sql);
		listFilesForFolder(synonymousFile,con,words);
		
//		for(int i=0;i<words.length;i++){
//			if(words[i][1].indexOf("(")!=-1){
//				String newWord=words[i][1].substring(0,words[i][1].indexOf("("));
//				String newPinyin=words[i][2].replaceAll("-", "");
//				if(words[i][2].indexOf("(")!=-1)
//					 newPinyin=words[i][2].substring(0,words[i][2].indexOf("(")).replaceAll("-", "");
//
//				String synonymous;
//				if(words[i][1].indexOf(")")!=-1){
//					synonymous=words[i][1].substring(words[i][1].indexOf("(")+1,words[i][1].indexOf(")"));
//				}else{
//					synonymous=words[i][1].substring(words[i][1].indexOf("(")+1,words[i][1].length());
//				}
//				
//				if(synonymous.indexOf("、")!=-1){
//					String[] synonymouses=synonymous.split("、");
//					for (int k=0;k<synonymouses.length;k++){
//						con.exec("insert into synonyms_base (word,synonyms) VALUES (?,?) ",new String[]{newWord,synonymouses[k]});
//					}
//				}else{
//					con.exec("insert into synonyms_base (word,synonyms) VALUES (?,?) ",new String[]{newWord,synonymous});
//				}
//				con.exec("update word_base set word=?,pinyin=? where id=? ",new String[]{newWord,newPinyin,words[i][0]});
//			}else{
//				String newPinyin=words[i][2].replaceAll("-", "");
//				con.exec("update word_base set pinyin=? where id=?",new String[]{newPinyin,words[i][0]});
//			}
//			System.out.println("Word:"+words[i][1]+";"+"Pinyin:"+words[i][2]);
//			String newPinyin=words[i][2].replaceAll("-", "");	
//			con.exec("update word_base set pinyin=? where id=?",new String[]{newPinyin,words[i][0]});
//		}
		
		//
	}

}
