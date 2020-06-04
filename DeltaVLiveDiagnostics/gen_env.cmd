@echo off

echo.
echo.###################################################
echo.  Generating default .env for DeltaDiagnostics
echo.###################################################
echo.
echo. Creating .env file
cmd /c "cd DeltaDiagnostics && echo DELTA_DIAGNOSTICS_API_URL=http://localhost:4000 > .env && echo DELTA_DIAGNOSTICS_API_WS_URL=http://localhost:4001 >> .env"
echo. Creating .env.development file
cmd /c "cd DeltaDiagnostics && echo DELTA_DIAGNOSTICS_API_URL=http://localhost:4000 > .env.development && echo DELTA_DIAGNOSTICS_API_WS_URL=http://localhost:4001 >> .env.development"

echo.
echo.###################################################
echo.  Generating default .env for DeltaDiagnosticsAPI
echo.###################################################
echo.
echo. Creating .env file
cmd /c "cd DeltaDiagnosticsAPI && echo DELTA_DIAGNOSTICS_API_URL=http://localhost:4000 > .env && echo DELTA_DIAGNOSTICS_API_PORT=4000 >> .env && echo DELTA_DIAGNOSTICS_API_WS_PORT=4001 >> .env && echo DELTA_DIAGNOSTICS_URL=http://localhost:3000 >> .env && echo OE_WEB_SERVER_URL=http://localhost:5000 >> .env && echo AUTH_TOKEN_URL=http://localhost:5051 >> .env && echo DB_CONNECTION=mongodb://localhost:27017/demo >> .env && echo NODE_ENV=production >> .env"
