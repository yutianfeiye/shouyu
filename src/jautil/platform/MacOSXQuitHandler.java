///*    */ package jautil.platform;
///*    */ 
///*    */ import com.apple.eawt.AppEvent.QuitEvent;
///*    */ import com.apple.eawt.Application;
///*    */ import com.apple.eawt.QuitHandler;
///*    */ import com.apple.eawt.QuitResponse;
///*    */ import org.apache.logging.log4j.LogManager;
///*    */ import org.apache.logging.log4j.Logger;
///*    */ import util.LoggerConfig;
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */  
///*    */ 
///*    */ public final class MacOSXQuitHandler
///*    */   implements QuitHandler
///*    */ {
///* 23 */   private static final Logger logger = ;
///*    */   
///*    */   private Runnable quitter;
///*    */   
///* 27 */   private int quitCount = 0;
///*    */   private static Application theMacApp;
///*    */   private static MacOSXQuitHandler theMacQuitHandler;
///*    */   
///*    */   private MacOSXQuitHandler(Runnable quitter) {
///* 32 */     this.quitter = quitter;
///*    */   }
///*    */   
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */   public void handleQuitRequestWith(AppEvent.QuitEvent evt, QuitResponse res)
///*    */   {
///* 44 */     this.quitCount += 1;
///* 45 */     logger.log(LoggerConfig.INFOLevel, LoggerConfig.SESSIONMarker, "handleQuitRequestWith: Call #" + this.quitCount);
///*    */     
///* 47 */     if ((this.quitCount == 1) && (this.quitter != null)) {
///* 48 */       logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.SESSIONMarker, "handleQuitRequestWith: Run Java Quitter");
///*    */       
///* 50 */       this.quitter.run();
///*    */     } else {
///* 52 */       logger.log(LoggerConfig.DEBUGLevel, LoggerConfig.SESSIONMarker, "handleQuitRequestWith: QuitResponse is performQuit");
///*    */       
///* 54 */       res.performQuit();
///*    */     }
///*    */   }
///*    */   
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */ 
///*    */   public static void registerMacOSXQuitter(Runnable quitter)
///*    */   {
///* 79 */     if (theMacApp == null) {
///* 80 */       theMacApp = Application.getApplication();
///* 81 */       theMacQuitHandler = new MacOSXQuitHandler(quitter);
///* 82 */       theMacApp.setQuitHandler(theMacQuitHandler);
///*    */     }
///*    */   }
///*    */ }
//
//
///* Location:              K:\web2\jas\loc2018\jars\jarpb.jar!\jautil\platform\MacOSXQuitHandler.class
// * Java compiler version: 6 (50.0)
// * JD-Core Version:       0.7.1
// */