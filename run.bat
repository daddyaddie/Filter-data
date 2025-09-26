@echo off
setlocal
set ROOT=%~dp0
start powershell -NoExit -Command "cd \"%ROOT%backend\"; npm run dev"
start powershell -NoExit -Command "cd \"%ROOT%frontend\"; npm start"
echo Launched backend and frontend in separate terminals.
endlocal
