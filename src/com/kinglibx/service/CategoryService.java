package com.kinglibx.service;

import com.kinglib.Jacper;
import com.kinglib.Connection;
import com.kinglib.util.json.JSONObject;
import com.kinglib.util.json.JSONArray;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController 
public class CategoryService {

	@RequestMapping(value="/dictionary/getCategory",method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	public String getTree(Jacper jacper) {

		String lang=jacper.getString("lang","zh_cn");
		
		//String type=jacper.getString("type","category");
		
		JSONObject treeJSON = new JSONObject();
		try {
			Connection con=jacper.getConnection("shouyu");

			//if(type.equals("category")){
			String sql="select a.id,a.name,count(b.id) from category_base a left outer join word_base b on a.id=b.category  where a.lang=? group by  a.id";
			String [][] categories=con.get(sql,new String[]{lang});
			JSONArray arrayJSON = new JSONArray();
			for(int i=0;i<categories.length;i++){
				JSONObject itemJSON = new JSONObject();
				JSONArray arrayJSON1 = new JSONArray();
				itemJSON.put("id", categories[i][0]);
				itemJSON.put("name", categories[i][1].trim()+"("+categories[i][2]+")");
				itemJSON.put("expandable", true);
				itemJSON.put("parent", "");
				itemJSON.put("type", "category");
				
				String sql0="select id,word from word_base where category=?";
				String [][] words=con.get(sql0,new String[]{categories[i][0]});
				for(int k=0;k<words.length;k++){
					JSONObject itemJSON1 = new JSONObject();
					itemJSON1.put("id", words[k][0]);
					itemJSON1.put("name", words[k][1]);
					itemJSON1.put("parent", categories[i][0]);
					itemJSON1.put("type", "word");
					itemJSON1.put("expandable", false);
					arrayJSON1.put(itemJSON1);
				}
				
				itemJSON.put("children",arrayJSON1);
				arrayJSON.put(itemJSON);
			}
			treeJSON.put("result", arrayJSON);
//			}else{
//				String id=jacper.getString("id","0");
//				String sql0="select id,word from word_base where category=?";
//				String [][] words=con.get(sql0,new String[]{id});
//				JSONArray arrayJSON = new JSONArray();
//				for(int k=0;k<words.length;k++){
//					JSONObject itemJSON1 = new JSONObject();
//					itemJSON1.put("id", words[k][0]);
//					itemJSON1.put("name", words[k][1]);
//					itemJSON1.put("type", "word");
//					itemJSON1.put("expandable", false);
//					arrayJSON.put(itemJSON1);
//				}
//				treeJSON.put("result", arrayJSON);
//			}
			treeJSON.put("success", true);
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}    
		return treeJSON.toString();
	}
	

	@RequestMapping(value="/dictionary/postCategory",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public String postCategory(Jacper jacper) {
		String lang=jacper.getString("lang","zh_cn");
		String name=jacper.getStr("name");
		
		JSONObject resultJSON = new JSONObject();
		try {
			Connection con=jacper.getConnection("shouyu");
			String sql="insert into  category_base (name,lang) values (?,?)";
			con.exec(sql,new String[]{name,lang});
			
			resultJSON.put("success", true);
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}    
		return resultJSON.toString();
	}
}
