package com.kinglibx.service;

import javax.servlet.http.*;

import com.kinglib.Connection;
import com.kinglib.Jacper;
import com.susing.*;
import com.susing.core.*;
import com.kinglib.util.json.*;
import com.social.api.core.model.*;
import com.kinglib.util.event.SystemEvent;
import javax.servlet.*;
import javax.servlet.http.Cookie;
import com.kinglib.sso.ticket.*;
import com.kinglib.sso.auth.*;
import com.kinglib.workbench.portal.*;
import com.kinglib.workbench.usertype.*;
import com.kinglib.i18n.I18n;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.ServletConfigAware;
import org.springframework.web.context.ServletContextAware;

@RestController
public class LoginService implements ServletConfigAware,ServletContextAware{
	
	 private static final String TGC_ID = "CASTGC";
	 private static final String PRIVACY_ID = "CASPRIVACY";

	 private GrantorCache tgcCache;
	 private ServiceTicketCache stCache;
	 private LoginTicketCache ltCache;

	// private String loginForm;
	 private String serviceSuccess,confirmService, redirect;
	 private ServletContext app;
	
	 @Override
	 public void setServletContext(ServletContext arg0) {
		 this.app=arg0;
	 }
	 @Override  
	 public void setServletConfig(ServletConfig config) {
		app = config.getServletContext();
		tgcCache = (GrantorCache) app.getAttribute("tgcCache");
		stCache = (ServiceTicketCache) app.getAttribute("stCache");
		ltCache = (LoginTicketCache) app.getAttribute("ltCache");
		serviceSuccess = (String) KingleSystem.getSSOProperty("serviceSuccess");
		confirmService = (String) KingleSystem.getSSOProperty("confirmService");
		redirect =(String) KingleSystem.getSSOProperty("redirect"); 
	}
	 
	@RequestMapping(value="/login",method = RequestMethod.GET)
	public String checkLogin(Jacper jacper) {
		KingleSession session = null;
		KingleServletRequest request = jacper.getRequest();
		String sessionId = SessionUtil.getSessionIdFromCookie(request);
		if (sessionId != null)
			session = KingleSystem.getSessionContext().getSession(sessionId);
		JSONObject authJSON = new JSONObject();
		try {
			if (session == null || session.getUserId() == null|| session.isTimeout()) {
				authJSON.put("authenticated", false);
			}else{
				authJSON.put("authenticated", true);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return authJSON.toString();
	}
	@RequestMapping(value="/login",method = RequestMethod.POST)
	public String login(Jacper jacper) {
		JSONObject resultJSON = new JSONObject();

		KingleServletRequest request = jacper.getRequest();
		KingleServletResponse response = jacper.getResponse();  
		HttpSession session = request.getSession();
		
		String email = request.getParameter("usrMail").trim();
		String pwd = request.getParameter("usrPwd").trim();
		response.setContentType("application/x-json");

		response.setHeader("Pragma", "no-cache");
		response.setHeader("Cache-Control","no-store");
		response.setDateHeader("Expires",-1);

		try {
			Cookie[] cookies = request.getCookies();
			String userId=this.authenticate(jacper,email,pwd);
			if (!userId.equals("")){
				  //session.invalidate();
				  String portalId = request.getParameter("portal");	  
				 // request.createSession(userId,-1);
				 // SystemEvent.fire("USER_LOGIN", jacper);
				  request.getSession().setAttribute("user_name",email);
				  request.getSession().setAttribute("password",pwd);
				  request.getSession().setAttribute("portal",portalId);
				  sendPrivacyCookie(request, response);
				  return  grantForService(jacper,request.getParameter("service"),true,userId);
			}else{
					resultJSON.put("message", jacper.trans("登陆名")+"/"+jacper.trans("Email或密码错误"));
					return resultJSON.toString();
			}
		}catch (Exception jx){
			jx.printStackTrace();
		}
		return resultJSON.toString();
	}
	
	@RequestMapping(value="/logout",method = RequestMethod.GET)
	public String logout(Jacper jacper) {
		KingleServletRequest request = jacper.getRequest();
		KingleServletResponse response = jacper.getResponse();
		String isMobile=jacper.getStr("isMobile");
		String from=jacper.getStr("from");
	    response.setHeader("pragma", "no-cache");
	    response.setHeader("Cache-Control","no-cache");
	    response.setHeader("Cache-Control","no-store");
	    response.setDateHeader("Expires", 0);

		HttpSession session = request.getSession();
		session.invalidate();  
		JSONObject resultJSON = new JSONObject();
		try {
			resultJSON.put("success", true);
			resultJSON.put("isMobile", isMobile);
			resultJSON.put("from", from);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultJSON.toString();
	}
	
	private String authenticate(Jacper jacper,String userName,String password){
		String  userId="";
		try {
			Connection con=jacper.getConnection("shouyu");
			String sql0="select user_id from user_base where user_name=? and password=?";
			String [] user=con.getRow(sql0,new String[]{userName,password});
			System.out.println(user[0]+"+++++++++++++++++++++++++++++++");;
			if(user!=null) userId=user[0];
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		} 
		return userId;
	}
	
	private void destroyTgc(HttpServletRequest request,HttpServletResponse response){
			Cookie tgcOverwrite = new Cookie(TGC_ID, "destroyed");
			tgcOverwrite.setPath(request.getContextPath());
			tgcOverwrite.setMaxAge(0);
			tgcOverwrite.setSecure(true);
			response.addCookie(tgcOverwrite);
    }
	private String grantForService(Jacper jacper,String serviceId,boolean first,String userId){
		  	HttpServletRequest request = jacper.getRequest();
			HttpServletResponse response = jacper.getResponse();  
			JSONObject resultJSON = new JSONObject();
		    try {
		      if (serviceId != null) {
		        request.setAttribute("serviceId", serviceId);
				if (!first) {
				  if (privacyRequested(request)) {
					app.getRequestDispatcher(confirmService).forward(request, response);
				  } else {
					request.setAttribute("first","false");
					app.getRequestDispatcher(serviceSuccess).forward(request, response);
				  }
				}else{
				    request.setAttribute("first","true");
				    app.getRequestDispatcher(serviceSuccess).forward(request, response);
				}
		      }else{
		    	  resultJSON.put("success", true);
				  resultJSON.put("user_id", userId);
			  }
		    }catch (Exception ex) {
				ex.printStackTrace();
		     // throw new Exception(ex.toString());
		    }
		    return resultJSON.toString();
	}
    private TicketGrantingTicket sendTgc(String username,HttpServletRequest request,HttpServletResponse response){
			try {
			  TicketGrantingTicket t = new TicketGrantingTicket(username);
			  String token = tgcCache.addTicket(t);
			  Cookie tgc = new Cookie(TGC_ID, token);
			  tgc.setSecure(true);
			  tgc.setMaxAge(-1);
			  tgc.setPath("/");
			  response.addCookie(tgc);
			  return t;
			} catch (TicketException ex) {
			  ex.printStackTrace();
			  return null;
			}
   }
  private void sendPrivacyCookie(HttpServletRequest request, HttpServletResponse response){
	    if (request.getParameter("warn") != null) {
	      Cookie privacy = new Cookie(PRIVACY_ID, "enabled");
	      privacy.setSecure(true);
	      privacy.setMaxAge(-1);
	      privacy.setPath(request.getContextPath());
	      response.addCookie(privacy);
	    }else if (privacyRequested(request)) {
	      Cookie privacy = new Cookie(PRIVACY_ID, "disabled");
	      privacy.setSecure(true);
	      privacy.setMaxAge(0);
	      privacy.setPath(request.getContextPath());
	      response.addCookie(privacy);
	    }
  }
  private boolean privacyRequested(HttpServletRequest request) {
	    Cookie[] cookies = request.getCookies();
	    if (cookies != null) {
	      for (int i = 0; i < cookies.length; i++)
	        if (cookies[i].getName().equals(PRIVACY_ID)
	            && cookies[i].getValue().equals("enabled"))
		  return true;
	    }
	    return false;
  }
}
