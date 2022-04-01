#!/bin/bash

docker run --rm -v $(pwd):/prj giulioz/vc6-docker wine cmd /c z:/prj/win-runtime/bridge/build.bat
rm -f win-runtime/filesystem/WINDOWS/Start\ Menu/Programs/StartUp/bridge.exe
mkdir -p win-runtime/filesystem/WINDOWS/Start\ Menu/Programs/StartUp/
mv -f win-runtime/bridge/bridge.exe win-runtime/filesystem/WINDOWS/Start\ Menu/Programs/StartUp/bridge.exe

if test -f "../../win-runtime/filesystem/WINDOWS/SYSTEM.DAT"; then
  echo "Registry already exists, skipping"
else
  docker run --rm -v $(pwd):/mnt w95-imgtool sh reg.sh
fi

docker run --rm -v $(pwd):/mnt w95-imgtool sh create.sh
mkdir -p binaries
mv -f tools/imgtool/os.img binaries/os.img
