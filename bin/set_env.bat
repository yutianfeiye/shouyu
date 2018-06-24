@ECHO OFF

set APR_ICONV_PATH=d:\tools\svn\iconv

IF NOT ""%JAVA_HOME%""=="""" GOTO java_end
SET JAVA_HOME=D:\Platform\jdk
:java_end

if not ""%KINGLE_HOME%""=="""" goto end

REM ************************************************************************
REM SET classpath

CALL %~dp0var_path.bat KINGLE_HOME %~dp0..
SET CLASS_CACHE=%KINGLE_HOME%\dist

IF EXIST "%KINGLE_HOME%\src" goto no_kingle_lib
CALL %~dp0lib_jar.bat "%KINGLE_HOME%\dist"
:no_kingle_lib
CALL %~dp0path_append.bat classpath "%CLASS_CACHE%" 1
CALL %~dp0lib_jar.bat "%KINGLE_HOME%\lib"

IF NOT ""%1""==""console"" GOTO no_console 

ECHO %CLASSPATH%

ECHO Kingle command console

SET TOOLS_PATH=D:\tools

FOR /D %%i in (%TOOLS_PATH%\*) do call %~dp0path_append.bat PATH %%i\bin

SET PATH=%JAVA_HOME%\bin;%PATH%;

GOTO set_dev
:no_console

IF ""%1""==""dev"" GOTO end
:set_dev

REM  CALL %~dp0lib_jar.bat "%KINGLE_HOME%\lib\api"

:end
@ECHO ON