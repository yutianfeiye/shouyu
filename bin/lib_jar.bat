

IF NOT EXIST %~f1 GOTO nothing
FOR %%i in (%~f1\*.jar) DO CALL %~dp0path_append.bat classpath %%i
:nothing
