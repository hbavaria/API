@echo off

REM Change the configuration and platform depending on which version of DeltaVLive is being used
set "Configuration=Debug"
set "Platform="ANY CPU"

echo.
echo.###################################################
echo.  Starting DeltaDiagnosticsAPI in new window
echo.###################################################
echo.
start cmd /c "cd DeltaDiagnosticsAPI && npm start"


echo.
echo.###################################################
echo.  Starting DeltaDiagnostics in new window
echo.###################################################
echo.
start cmd /c "cd C:\Users\dvadmin\my-app\ && npm start"