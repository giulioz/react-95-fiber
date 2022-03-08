#!/bin/bash

docker buildx build --platform linux/amd64 tools/imgtool -t w95-imgtool
