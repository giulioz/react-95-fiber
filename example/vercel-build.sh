#!/bin/sh

amazon-linux-extras install -y docker
systemctl start docker

cd ..
tools/build-tools.sh
tools/build-binaries.sh
yarn build

cd example
yarn build
