#!/usr/bin/env bash

npm pack
mkdir -p ./build
mv -f *.tgz ./build/
