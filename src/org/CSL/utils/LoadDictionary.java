package org.CSL.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Date;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URL;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;

import org.htmlparser.Parser;
import org.htmlparser.filters.AndFilter;
import org.htmlparser.filters.TagNameFilter;
import org.htmlparser.filters.HasAttributeFilter;
import org.htmlparser.filters.StringFilter;

import org.htmlparser.NodeFilter;
import org.htmlparser.util.NodeList;
import org.joda.time.DateTime;
import org.htmlparser.Node;
import org.htmlparser.nodes.TagNode;
import java.io.InputStream;
import java.io.ByteArrayOutputStream;
import java.io.ByteArrayInputStream;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;

import com.susing.EasyConnection;
import com.susing.sql.ConnectionManager;
import com.susing.util.Files;
import com.susing.EFile;

import org.apache.http.Header;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
//import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.http.HttpStatus;
import org.apache.http.HttpException;
import org.apache.http.HttpResponse;
import org.apache.http.client.CookieStore;
import org.apache.http.client.config.CookieSpecs;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.cookie.CookieSpecProvider;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.cookie.BasicClientCookie;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.HttpEntity;
import org.apache.http.util.EntityUtils;
import org.apache.http.client.methods.CloseableHttpResponse;
import java.io.File;
import org.json.*;

public class LoadDictionary  {

	//private static Logger log = Logger.getLogger(SmartLottery.class);
	  
	private HttpClientBuilder httpClientBuilder = HttpClientBuilder.create();
	private CloseableHttpClient closeableHttpClient = httpClientBuilder.build();
	private String url = "";
	private String site = "";

	public LoadDictionary() {

	}

	public long unixtime() {
		Date dt = new Date();
		long ux = Date.UTC(dt.getYear(), dt.getMonth(), dt.getDay(), dt.getHours(), dt.getMinutes(), dt.getSeconds())
				/ 1000;
		return ux;
	}


	public ArrayList<String> getList(String url) {
		
		ArrayList<String> mulus=new ArrayList<String>();
		
		HttpGet getMethod = new HttpGet(url);
		try {
		
			CloseableHttpResponse httpResponse = closeableHttpClient.execute(getMethod);
			if (httpResponse.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
				System.out.println("不能连接" + url + ",请确认网址正确!");
			}
			HttpEntity entity = httpResponse.getEntity();
			
			if (entity != null) {
				try{
					
					String res=EntityUtils.toString(entity, "GBK").trim();
					Parser parser = new Parser(res);
					
					NodeFilter filter = new TagNameFilter("a");
					NodeList nodes = parser.extractAllNodesThatMatch(filter);

					for(int i=0;i<nodes.size();i++){
						Node textnode = (Node) nodes.elementAt(i);
						String key=textnode.getChildren().asString();
						key=textnode.getChildren().asString().substring(0, key.indexOf("("));
						mulus.add(key);
					}
				}catch(Exception e){
					e.printStackTrace();
				}
			}
		} catch (IOException e) {
			System.out.println("无法连接到服务器，网络故障或被防火墙阻隔。");
		} catch (IllegalArgumentException e) {
			System.out.println("数据服务地址设置错误，请系统管理员重新设置。");
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			getMethod.releaseConnection();
		}
		return mulus;
	};
	
	public EFile getImage(String url) {

		HttpGet getMethod = new HttpGet(url);
		EFile file=new EFile();
		try {
			CloseableHttpResponse httpResponse = closeableHttpClient.execute(getMethod);
			if (httpResponse.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
				System.out.println("不能连接" + url + ",请确认网址正确!");
			}
			HttpEntity entity = httpResponse.getEntity();
			InputStream inputStream = entity.getContent();
			
			Files.copyRange(inputStream, file.getOutputStream(), 4096);

		} catch (IOException e) {
			System.out.println("无法连接到服务器，网络故障或被防火墙阻隔。");
		} catch (IllegalArgumentException e) {
			System.out.println("数据服务地址设置错误，请系统管理员重新设置。");
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			getMethod.releaseConnection();
		}
		return file;
	};

	public void getDictionnary(String id,String catetory,String page,ArrayList<Object[]> result) {
	
		HttpGet getMethod = new HttpGet();
		try {
			String url="http://www.xkrjy.com/sy/show.php?w="+ URLEncoder.encode(catetory, "GBK") + "&p="+page;
			getMethod.setURI(new URI(url));
			CloseableHttpResponse httpResponse = closeableHttpClient.execute(getMethod);
			if (httpResponse.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
				System.out.println("不能连接" + url + ",请确认网址正确!");
			}
			HttpEntity entity = httpResponse.getEntity();
			
			if (entity != null) {
				try {
					String res=EntityUtils.toString(entity, "GBK");
					Parser parser = new Parser(res);
	
					NodeFilter filter = new TagNameFilter("div");
					NodeFilter filter1 = new HasAttributeFilter("class", "box1");
					NodeFilter filter2 = new AndFilter(filter, filter1);
					NodeList nodes = parser.extractAllNodesThatMatch(filter2);
					
					parser = new Parser(res);
					filter = new TagNameFilter("div");
					filter1 = new HasAttributeFilter("class", "box2");
					filter2 = new AndFilter(filter, filter1);
					NodeList nodes1 = parser.extractAllNodesThatMatch(filter2);
					
					for(int i=0;i<nodes.size();i++){
						Node textnode = (Node) nodes.elementAt(i);
						String key=textnode.getChildren().asString();
						
						System.out.println(catetory+"====");
						if(catetory.equals("字母")&&key.indexOf("(")!=-1){
							String word=key.substring(0, key.indexOf("("));
							String pinyin=key.substring(key.indexOf("(")+1,key.indexOf(")"));
							String description=key.substring(key.indexOf(")")+3,key.length()).trim();
							Object[] wordObj=new Object[6];
							wordObj[0]=word;
							wordObj[1]=pinyin;
							wordObj[2]=id;
							wordObj[3]="zh_cn";
							wordObj[4]=description;

							Node textnode1 = (Node) nodes1.elementAt(i);
							Node imageNode=textnode1.getChildren().elementAt(1);
							
							if(imageNode instanceof TagNode){
								TagNode textnode3 = (TagNode)imageNode;
								String imageUrl="http://www.xkrjy.com/sy/"+textnode3.getAttribute("src");
								EFile file=this.getImage(imageUrl);
								wordObj[5]=file;
							}
							result.add(wordObj);
						}else{
							System.out.println(key);
							String separator="--";
							if(key.indexOf(separator)==-1) separator="-";
							
							String word=key.substring(0, key.indexOf(separator)).trim();
							String pinyin=key.substring(key.indexOf(separator)+1,key.indexOf("　　\n		"));
							String description=key.substring(key.indexOf("　　\n		")+1,key.length()).trim();
							
							Object[] wordObj=new Object[6];
							wordObj[0]=word;
							wordObj[1]=pinyin;
							wordObj[2]=id;
							wordObj[3]="zh_cn";
							wordObj[4]=description;

							Node textnode1 = (Node) nodes1.elementAt(i);
							Node imageNode=textnode1.getChildren().elementAt(1);
							
							if(imageNode instanceof TagNode){
								TagNode textnode3 = (TagNode)imageNode;
								String imageUrl="http://www.xkrjy.com/sy/"+textnode3.getAttribute("src");
								EFile file=this.getImage(imageUrl);
								wordObj[5]=file;
							}
							result.add(wordObj);
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		} catch (IOException e) {
			System.out.println("无法连接到服务器，网络故障或被防火墙阻隔。");
		} catch (IllegalArgumentException e) {
			System.out.println("数据服务地址设置错误，请系统管理员重新设置。");
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			getMethod.releaseConnection();
		}
	};

	public void getAllDictionnary(String id,String catetory,ArrayList<Object[]> result) {
		
		HttpGet getMethod = new HttpGet();
		try {
			String url="http://www.xkrjy.com/sy/show.php?w="+ URLEncoder.encode(catetory, "GBK");
			getMethod.setURI(new URI(url));
			CloseableHttpResponse httpResponse = closeableHttpClient.execute(getMethod);
			if (httpResponse.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
				System.out.println("不能连接" + url + ",请确认网址正确!");
			}
			HttpEntity entity = httpResponse.getEntity();
			
			if (entity != null) {
				try {
					String res=EntityUtils.toString(entity, "GBK");
					Parser parser = new Parser(res);
	
					NodeFilter  filter = new TagNameFilter("div");
					NodeFilter filter1 = new HasAttributeFilter("align", "center");
					NodeFilter filter2 = new AndFilter(filter, filter1);
					NodeList nodes2 = parser.extractAllNodesThatMatch(filter2);
					Node textnode = (Node) nodes2.elementAt(0);
					NodeList nodes3 = textnode.getChildren();
//					
					
					for(int i=0;i<nodes3.size();i++){
						if(nodes3.elementAt(i) instanceof TagNode){
							TagNode textnode3 = (TagNode) nodes3.elementAt(i);
						
							if(textnode3.getTagName().equals("A")){
								String pageNum=textnode3.getChildren().asString();
								if(!pageNum.equals("上一页")&&!pageNum.equals("下一页")){
									 getDictionnary(id,catetory,pageNum.trim(),result);
								}
							}
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		} catch (IOException e) {
			System.out.println("无法连接到服务器，网络故障或被防火墙阻隔。");
		} catch (IllegalArgumentException e) {
			System.out.println("数据服务地址设置错误，请系统管理员重新设置。");
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			getMethod.releaseConnection();
		}
	};
	
	
	public static void main(String[] args) throws Exception {

		LoadDictionary ST = new LoadDictionary();
		
        Class.forName("com.mysql.jdbc.Driver");
		String url="jdbc:mysql://192.168.1.7:3306/shouyu?generateSimpleParameterMetadata=true&useUnicode=true&characterEncoding=utf8";
		EasyConnection con=ConnectionManager.currentManager(true).getConnection("MySQL","com.mysql.jdbc.Driver","plat", url, "shouyu", "bizdict", "", true);
		
		String sql="select id,name from category_base";
		String [][] categories=con.query(sql);

		for(int i=0;i<categories.length;i++){
			ArrayList<Object[]> result=new ArrayList<Object[]>();
			ST.getAllDictionnary(categories[i][0],categories[i][1].trim(),result);
			Object[][] dict=new Object[result.size()][6];
			result.toArray(dict);
			System.out.println(categories[i][1]+":"+dict.length);
			for(int k=0;k<dict.length;k++){
				con.execLarge("insert into word_base (word,pinyin,categery,lang,description,image) VALUES (?,?,?,?,?,?) ",dict[k]);
			}
		}
	}
}
