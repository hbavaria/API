@echo off

echo.
echo.###################################################
echo.  Building DeltaDiagnostics
echo.###################################################
echo.
echo. Installing Node Modules...
cmd /c "cd DeltaDiagnostics && npm install"
echo. Compiling typescript...
cmd /c "cd DeltaDiagnostics && npm run build"

echo.
echo.###################################################
echo.  Building DeltaDiagnosticsAPI
echo.###################################################
echo.
echo. Installing Node Modules...
cmd /c "cd DeltaDiagnosticsAPI && npm install"
echo. Compiling typescript...
cmd /c "cd DeltaDiagnosticsAPI && npm run build"

:: Change the configuration and platform depending on which version of DeltaVLive is being used
set "Configuration=Debug"
set "Platform="ANY CPU"
echo.
echo.###################################################
echo.  Building DeltaVLiveAuthToken (%Configuration%)
echo.###################################################
echo.
msbuild "./DeltaVLiveAuthToken/DeltaVLiveAuthToken.sln" /p:Configuration=%Configuration% /p:Platform=%Platform%
