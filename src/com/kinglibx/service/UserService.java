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
public class UserService {

	@RequestMapping(value="/dictionary/listUser",method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	public String listGrammar(Jacper jacper) {
		
		JSONArray resultJSON = new JSONArray();
		
		try {
			Connection con=jacper.getConnection("shouyu");
			
			String sql0="select user_id,user_name,real_name,password from user_base ";
			String [][] users=con.get(sql0,new String[]{});
			for(int i=0;i<users.length;i++){
				JSONObject itemJSON = new JSONObject(); 
				itemJSON.put("id", users[i][0]);
				itemJSON.put("user_name", users[i][1]);
				itemJSON.put("password",users[i][3]);
				itemJSON.put("real_name",users[i][2]);
				resultJSON.put( itemJSON);
			}
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}    
		return resultJSON.toString();
	}
	
	
	@RequestMapping(value="/dictionary/getUser",method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	public String getWord(Jacper jacper) {

		String id=jacper.getString("id","0");
		
		String type=jacper.getString("type","get");
		
		JSONObject resultJSON = new JSONObject();
		try {
	
			Connection con=jacper.getConnection("shouyu");
			if(type.equals("get")){
				
				String sql0="select user_id,user_name,real_name,password from user_base where user_id=?";
				String [] user=con.getRow(sql0,new String[]{id});
				resultJSON.put("id", user[0]);
				resultJSON.put("user_name", user[1]);
				resultJSON.put("real_name",user[2]);
				resultJSON.put("password",user[3]);

			}else{
				String sql0="delete from user_base where user_id=?";
				con.exec(sql0,new String[]{id});
				resultJSON.put("success", true);
			}
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}    
		return resultJSON.toString();
	}
	
	@RequestMapping(value="/dictionary/postUser",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public String postUser(Jacper jacper) {

		String type=jacper.getString("type","save");

		JSONObject resultJSON = new JSONObject();
		try {
		
			Connection con=jacper.getConnection("shouyu");
			String userName=jacper.getStr("user_name");
			String password=jacper.getStr("password");
			String realName=jacper.getStr("real_name");

			if(type.equals("save")){
				String sql0="INSERT INTO user_base (user_name,real_name,password) values (?,?,?)";
				con.exec(sql0,new String[]{userName,realName,password});
				resultJSON.put("success", true);
			}else{
				String id=jacper.getString("id","0");
				String sql0="update user_base set user_name=?,real_name=?,password=? where user_id=?";
				con.execLarge(sql0,new Object[]{userName,realName,password,id});
				resultJSON.put("success", true);
			}
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}    
		return resultJSON.toString();
	}
}
