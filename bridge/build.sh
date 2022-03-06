#!/bin/bash

env WINEPREFIX=$(pwd)/../devc++ WINEARCH=win32 wine cmd /c build.bat
rm ../filesystem95/WINDOWS/Start\ Menu/Programs/StartUp/bridge.exe
mv bridge.exe ../filesystem95/WINDOWS/Start\ Menu/Programs/StartUp/bridge.exe
docker run -it --rm -v $(pwd)/../:/mnt imgtool
cp ../imgtool/os.img ../npm-lib/binaries/os.img
