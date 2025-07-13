@echo off
echo Starting Backend Server...
cd "%~dp0backend"
echo Installing dependencies...
cd ..
npm install
cd backend
echo Starting server...
node server.js
pause