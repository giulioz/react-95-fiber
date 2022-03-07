#!/bin/bash

docker run --rm -it -v (pwd):/prj build-docker wine cmd /c z:/prj/npm-lib/win-runtime/build.bat
rm ../filesystem95/WINDOWS/Start\ Menu/Programs/StartUp/bridge.exe
mkdir -p ../filesystem95/WINDOWS/Start\ Menu/Programs/StartUp/
mv bridge.exe ../filesystem95/WINDOWS/Start\ Menu/Programs/StartUp/bridge.exe
docker run -it --rm -v $(pwd)/../:/mnt imgtool
mkdir -p npm-lib/binaries
cp ../imgtool/os.img ../npm-lib/binaries/os.img
