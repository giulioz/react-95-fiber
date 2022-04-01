#!/bin.sh

amazon-linux-extras install -y docker

cd ..
tools/build-tools.sh
tools/build-binaries.sh
yarn install
yarn build

cd example
yarn install
yarn build
