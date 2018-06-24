@ECHO OFF
CALL %~dp0set_env.bat console
@ECHO OFF

java.exe -version

if "%2" =="JCP" goto exec_jcp
if "%2" == "JSS" goto exec_js2
if "%~x1" == ".jcp" goto exec_jcp
if "%~x1" == ".java" goto exec_java
if "%~x1" == ".jss" goto exec_js2

REM if "%~x1" == ".jsex" goto exec_jsex
if "%~x1" == ".jjt" goto exec_jjt
if "%~x1" == ".html" goto exec_html
if "%~x1" == ".htm" goto exec_html


:exec_warning
echo 只能编译 java,jcp,jjt,html,jss 文件
goto exec_end


:exec_jcp
java.exe com.susing.jacper.JacperCompiler %CLASS_CACHE% %KINGLE_HOME%\web %1
goto exec_end

:exec_java
javac.exe %* -sourcepath %KINGLE_HOME%\java-src -d %CLASS_CACHE% -g -Xlint:unchecked -encoding utf-8
goto exec_end

:exec_html
java.exe com.susing.js2.Main %KINGLE_HOME%\js2\src %1
goto exec_end


:exec_jjt
call jjtree %~n1.jjt
call javacc %~n1.jj
echo 开始编译 Parser.java
jc.bat Parser.java
goto exec_end

:exec_js2
java.exe com.susing.js.JSCompile --type  js  --charset UTF-8  --preserve-semi %1 
goto exec_end


REM :exec_jsex
REM java.exe com.susing.jsex.Main %1 %KINGLE_HOME%\js2\src %KINGLE_HOME%\web\JAVASCRIPT2
REM goto exec_end
:exec_end
@ECHO ON

