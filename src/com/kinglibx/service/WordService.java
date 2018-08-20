package com.kinglibx.service;

import com.kinglib.Connection;
import com.kinglib.Jacper;
import com.kinglib.KingleException;
import com.kinglib.util.json.JSONObject;

import hnscnvt.HNSSign;
import hnsgen.GToHNSSignSiGML.GToHNSException;
import sigmlinlib.SiGMLInLib;

import com.kinglib.util.Files;

import java.io.IOException;
import java.io.InputStream;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.http.HttpServletResponse;

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

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController 
public class WordService {

	@RequestMapping(value="/dictionary/getWord",method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	public String getWord(Jacper jacper) {

		String id=jacper.getString("id","0");
		
		String type=jacper.getString("type","get");
		
		JSONObject resultJSON = new JSONObject();
		try {

			Connection con=jacper.getConnection("shouyu");
			if(type.equals("get")){
				JSONObject itemJSON = new JSONObject(); 

				
				String sql0="select id,category,word,lang,pinyin,description,hamnosys,sigml from word_base where id=?";
				String [] word=con.getRow(sql0,new String[]{id});
				itemJSON.put("id", word[0]);
				itemJSON.put("category", word[1]);
				itemJSON.put("word",word[2]);
				itemJSON.put("lang",word[3]);
				itemJSON.put("pinyin", word[4]);
				itemJSON.put("description",word[5]);
				itemJSON.put("hamnosys",word[6]);
				itemJSON.put("sigml",word[7]);
//				String[] gsigml =word[7].split("\n");
//				String[] hnsu = hnsuItemsFromHSiGML(gsigml);
//				String aaa=join(hnsu,"");
//				itemJSON.put("hamnosys",aaa);
				
				resultJSON.put("result", itemJSON);
				resultJSON.put("success", true);
				
			}else{
				String sql0="delete from word_base where id=?";
				con.exec(sql0,new String[]{id});
				resultJSON.put("success", true);
			}
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}    
		return resultJSON.toString();
	}
	
	@RequestMapping(value="/dictionary/postWord",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public String postWord(Jacper jacper) {
		
		String type=jacper.getString("type","save");
		JSONObject resultJSON = new JSONObject();
		try {

			Connection con=jacper.getConnection("shouyu");
			String word=jacper.getStr("word");
			String pinyin=jacper.getStr("pinyin");
			String category=jacper.getStr("category");
			String lang=jacper.getStr("lang");
			String description=jacper.getStr("description");
			String hamnosys=jacper.getStr("hamnosys");
			
			//把汉堡编码转成sigml
			String[] hnssigml = sigmlFromHNSUItems(new String[]{hamnosys});
			String sigml=joinLines(indentXML(hnssigml));
			
			if(type.equals("save")){
				JSONObject itemJSON = new JSONObject(); 
				String sql0="INSERT INTO word_base (word,pinyin,category,lang,description,hamnosys,sigml) values (?,?,?,?,?,?,?)";
				con.exec(sql0,new String[]{word,pinyin,category,lang,description,hamnosys,sigml});
				resultJSON.put("success", true);
			}else{
				String id=jacper.getString("id","0");
				String sql0="update word_base set word=?,pinyin=?,category=?,lang=?,description=?,hamnosys=?,sigml=?  where id=?";
				con.exec(sql0,new String[]{word,pinyin,category,lang,description,hamnosys,sigml,id});
				resultJSON.put("success", true);
			}
			
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}    
		return resultJSON.toString();
	}
	
//	@RequestMapping(value="/dictionary/image",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
//	public void getImage(Jacper jacper) {
//		try {
//				
//			Connection con=jacper.getConnection("shouyu");
//			HttpServletResponse res = jacper.getResponse();
//			
//			String id=jacper.getStr("id");
//			
//			String fileName="";
//			String ContentType="";
//			try{
//				Statement stmt = con.createStatement();
//				String sql0="select image from word_base where id='"+id+"'";
//				ResultSet rs = stmt.executeQuery(sql0);
//				rs.next();
//				ContentType = rs.getString(1);
//				fileName = rs.getString(2);
//				InputStream dis = rs.getBinaryStream(3);
//				try {
//					fileName=new String(fileName.getBytes("GBK"),"8859_1");
//				}catch(Exception se){}
//				res.setContentType(ContentType);
//				res.setHeader("Content-Disposition","attachment;filename="+fileName);
//				Files.copyRange(dis,res.getOutputStream(),2048);
//				dis.close();
//				rs.close();
//				stmt.close();
//			}catch(SQLException se){
//				throw new KingleException(jacper.trans("数据库更新错误!"),se);
//			}catch(IOException oe){
//				throw new KingleException(jacper.trans("数据写入错误"),oe);
//			}
//			con.close();
//		} catch (Exception e) {
//			e.printStackTrace();
//		}    
//	}
}
