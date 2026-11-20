#!/bin/bash
# Build the release package: the app files, named with a version number
set -e
VERSION="${APP_VERSION:-1.0.${BUILD_NUMBER:-0}}"
rm -rf dist && mkdir -p dist
tar czf "dist/shopeasy-$VERSION.tgz" server.js site
echo "Packaged shopeasy-$VERSION.tgz"
