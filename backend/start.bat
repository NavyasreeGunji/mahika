@echo off
echo Starting Shopping Backend with Java 17...
"C:\Program Files\Zulu\zulu-17\bin\java.exe" -version
echo.
echo Backend will start on http://localhost:8080
echo Press Ctrl+C to stop
echo.
"C:\Program Files\Zulu\zulu-17\bin\java.exe" -Dspring.profiles.active=dev -jar target\shopping-backend-1.0.0.jar