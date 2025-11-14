@echo off
echo Starting local web server...
echo.
echo Open your browser and go to: http://localhost:8000/src/index.html
echo.
echo Press Ctrl+C to stop the server
echo.
cd src
python -m http.server 8000
