IF ""%3"" == ""1"" goto :start_set

IF NOT EXIST %~f2 goto EOF

:start_set

CALL SET %1=%~f2;%%%1%%

:EOF