package com.kinglibx.service;

import com.kinglib.Connection;
import com.kinglib.Jacper;
import com.susing.EasyConnection;
import com.susing.sql.ConnectionManager;
import com.kinglib.util.json.JSONObject;
import com.kinglib.util.json.JSONArray;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController 
public class GrammarService {

	@RequestMapping(value="/dictionary/listGrammar",method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	public String listGrammar(Jacper jacper) {
		
		JSONArray resultJSON = new JSONArray();
		
		try {
			Connection con=jacper.getConnection("shouyu");
			
			String sql0="select id,lang,nl_grammar,sl_grammer from grammar_base";
			String [][] grammars=con.get(sql0,new String[]{});
			for(int i=0;i<grammars.length;i++){
				JSONObject itemJSON = new JSONObject(); 
				itemJSON.put("id", grammars[i][0]);
				itemJSON.put("lang", grammars[i][1]);
				itemJSON.put("nl_grammar",grammars[i][2]);
				itemJSON.put("sl_grammer",grammars[i][3]);
				resultJSON.put( itemJSON);
			}
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}    
		return resultJSON.toString();
	}
	
	@RequestMapping(value="/dictionary/getGrammar",method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	public String getGrammar(Jacper jacper) {

		String id=jacper.getString("id","0");
		
		String type=jacper.getString("type","get");
		
		JSONObject resultJSON = new JSONObject();
		
		try {
			Connection con=jacper.getConnection("shouyu");
			if(type.equals("get")){
				
				String sql0="select id,lang,nl_grammar,sl_grammer from grammar_base where id=?";
				String [] grammars=con.getRow(sql0,new String[]{id});
				resultJSON.put("id", grammars[0]);
				resultJSON.put("lang", grammars[1]);
				resultJSON.put("nl_grammar",grammars[2]);
				resultJSON.put("sl_grammer",grammars[3]);

				
			}else{
				String sql0="delete from grammar_base where id=?";
				con.exec(sql0,new String[]{id});
				resultJSON.put("success", true);
			}
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}    
		return resultJSON.toString();
	}
	
	@RequestMapping(value="/dictionary/postGrammar",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public String postSynonym(Jacper jacper) {

		String type=jacper.getString("type","save");

		JSONObject resultJSON = new JSONObject();
		try {
	
			Connection con=jacper.getConnection("shouyu");
			String lang=jacper.getStr("lang");
			String nl_grammar=jacper.getStr("nl_grammar");
			String sl_grammer=jacper.getStr("sl_grammer");
			
			if(type.equals("save")){
				String sql0="INSERT INTO grammar_base (lang,nl_grammar,sl_grammer) values (?,?,?)";
				con.exec(sql0,new String[]{lang,nl_grammar,sl_grammer});
				resultJSON.put("success", true);
			}else{
				String id=jacper.getString("id","0");
				String sql0="update grammar_base set lang=?,nl_grammar=?,sl_grammer=? where id=?";
				con.exec(sql0,new String[]{lang,nl_grammar,sl_grammer,id});
				resultJSON.put("success", true);
			}
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}    
		return resultJSON.toString();
	}
}
