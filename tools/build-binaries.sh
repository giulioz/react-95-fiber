#!/bin/bash

docker run --rm -v $(pwd):/prj giulioz/vc6-docker wine cmd /c z:/prj/win-runtime/bridge/build.bat
rm -f win-runtime/filesystem/WINDOWS/bridge.exe
mkdir -p win-runtime/filesystem/WINDOWS/
mv -f win-runtime/bridge/bridge.exe win-runtime/filesystem/WINDOWS/bridge.exe

docker run --rm -v $(pwd):/prj giulioz/vc6-docker wine cmd /c z:/prj/win-runtime/opengl32/build.bat
rm -f win-runtime/filesystem-optional/WINDOWS/opengl32.dll
mkdir -p win-runtime/filesystem-optional/WINDOWS/
mv -f win-runtime/opengl32/opengl32.dll win-runtime/filesystem-optional/WINDOWS/SYSTEM/opengl32.dll

# docker run --rm -v $(pwd):/prj giulioz/vc6-docker wine cmd /c z:/prj/win-runtime/glu32/build.bat
# rm -f win-runtime/filesystem/WINDOWS/glu32.dll
# mkdir -p win-runtime/filesystem/WINDOWS/
# mv -f win-runtime/glu32/glu32.dll win-runtime/filesystem/WINDOWS/SYSTEM/glu32.dll

docker run --rm -v $(pwd):/prj giulioz/vc6-docker wine cmd /c z:/prj/win-runtime/mouse-driver/build.bat
rm -f win-runtime/filesystem/WINDOWS/jsmouse.vxd
mkdir -p win-runtime/filesystem/WINDOWS/
mv -f win-runtime/mouse-driver/jsmouse.vxd win-runtime/filesystem/WINDOWS/SYSTEM/jsmouse.vxd

docker run --rm -v $(pwd):/prj giulioz/vc6-docker wine cmd /c z:/prj/win-runtime/comm-driver/build.bat
rm -f win-runtime/filesystem/WINDOWS/jscomm.vxd
mkdir -p win-runtime/filesystem/WINDOWS/
mv -f win-runtime/comm-driver/jscomm.vxd win-runtime/filesystem/WINDOWS/SYSTEM/jscomm.vxd

if test -f "win-runtime/filesystem/WINDOWS/SYSTEM.DAT"; then
  echo "Registry already exists, skipping"
else
  docker run --rm -v $(pwd):/mnt w95-imgtool sh reg.sh
fi

docker run --rm -v $(pwd):/mnt w95-imgtool sh create.sh
mkdir -p binaries
mv -f tools/imgtool/os.img binaries/os.img
