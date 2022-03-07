#!/bin/bash

docker buildx create --name w95-builder
docker buildx use w95-builder

docker buildx build --tag w95-imgtool --platform=linux/amd64 tools/imgtool
docker buildx build --tag w95-vc98 --platform=linux/amd64 tools/vc98-docker
