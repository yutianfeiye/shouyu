package com.kinglibx.service;

import com.kinglib.Connection;
import com.kinglib.Jacper;
import com.kinglib.JacperFile;
import com.kinglib.KingleException;
import com.susing.EFile;
import com.susing.EasyConnection;
import com.susing.sql.ConnectionManager;
import com.susing.upload.FileUpload;
import com.kinglib.util.json.JSONObject;
import com.kinglib.util.Files;
import com.kinglib.util.json.JSONArray;

import java.io.IOException;
import java.io.InputStream;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController 
public class SynonymsService {

	@RequestMapping(value="/dictionary/listSynonym",method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	public String listSynonym(Jacper jacper) {
		
		JSONArray resultJSON = new JSONArray();
		String word=jacper.getStr("word");
		
		try {
			Connection con=jacper.getConnection("shouyu");
			
			String sql0="select id,synonyms from synonyms_base where word=?";
			String [][] users=con.get(sql0,new String[]{word});
			for(int i=0;i<users.length;i++){
				JSONObject itemJSON = new JSONObject(); 
				itemJSON.put("id", users[i][0]);
				itemJSON.put("synonyms", users[i][1]);
				resultJSON.put(itemJSON);
			}
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}    
		return resultJSON.toString();
	}
	
	@RequestMapping(value="/dictionary/getSynonym",method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	public String getSynonym(Jacper jacper) {

		String id=jacper.getString("id","0");
		String type=jacper.getString("type","get");
		
		JSONObject resultJSON = new JSONObject();
		try {
			Connection con=jacper.getConnection("shouyu");
			if(type.equals("get")){
				String sql0="select id,word,synonyms from synonyms_base where id=?";
				String [] synonyms=con.getRow(sql0,new String[]{id});
				resultJSON.put("id", synonyms[0]);
				resultJSON.put("word", synonyms[1]);
				resultJSON.put("synonyms",synonyms[2]);
			}else{
				String sql0="delete from synonyms_base where id=?";
				con.exec(sql0,new String[]{id});
				resultJSON.put("success", true);
			}
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}    
		return resultJSON.toString();
	}
	
	@RequestMapping(value="/dictionary/postSynonym",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public String postSynonym(Jacper jacper) {

		String type=jacper.getString("type","save");

		JSONObject resultJSON = new JSONObject();
		try {
	
			Connection con=jacper.getConnection("shouyu");
			String word=jacper.getStr("word");
			String synonyms=jacper.getStr("synonyms");
			
			if(type.equals("save")){
				String sql0="INSERT INTO synonyms_base (word,synonyms) values (?,?)";
				con.exec(sql0,new String[]{word,synonyms});
				resultJSON.put("success", true);
			}else{
				String id=jacper.getString("id","0");
				String sql0="update synonyms_base set word=?,synonyms=? where id=?";
				con.exec(sql0,new String[]{word,synonyms,id});
				resultJSON.put("success", true);
			}
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}    
		return resultJSON.toString();
	}
}
