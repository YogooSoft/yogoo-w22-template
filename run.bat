@title Yogoo W22 Development framework 
@echo.==============================================================
@echo.Yogoo W22 Development Framework 
@echo.==============================================================
@echo off
@echo.
@echo 1. Run         Press [1]
@echo.
@echo 2. Builder     Press [2]
@echo.
@echo Please select , press [1] or [2] and Enter
@echo off
set /p choice=":"
if %choice%==1 goto a1
if %choice%==2 goto a2

:a1
@echo.Start Run...
yarn serve
pause
exit

:a2
rem yarn build
pause

