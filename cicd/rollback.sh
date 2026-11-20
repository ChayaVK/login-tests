#!/bin/bash
# Put the previous release back on an environment
set -e
DIR="$HOME/envs/$1"
echo "Rolling back $1 to $(cat "$DIR/previous")"
"$(dirname "$0")/deploy.sh" "$1" "$DIR/releases/$(cat "$DIR/previous")"
