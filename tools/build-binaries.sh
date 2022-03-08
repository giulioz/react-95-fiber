#!/bin/bash

docker run --rm -it -v $(pwd):/prj giulioz/vc6-docker wine cmd /c z:/prj/win-runtime/bridge/build.bat
rm -f win-runtime/filesystem/WINDOWS/Start\ Menu/Programs/StartUp/bridge.exe
mkdir -p win-runtime/filesystem/WINDOWS/Start\ Menu/Programs/StartUp/
mv -f win-runtime/bridge/bridge.exe win-runtime/filesystem/WINDOWS/Start\ Menu/Programs/StartUp/bridge.exe

docker run -it --rm -v $(pwd):/mnt w95-imgtool
mkdir -p binaries
mv -f tools/imgtool/os.img binaries/os.img
