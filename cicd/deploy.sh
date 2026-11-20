#!/bin/bash
# Deploy a package to an environment on this agent.
# Usage: cicd/deploy.sh staging|production dist/shopeasy-1.0.7.tgz
set -e
ENV=$1
PACKAGE=$(realpath "$2")
NAME=$(basename "$PACKAGE")
VERSION=${NAME#shopeasy-}; VERSION=${VERSION%.tgz}
if [ "$ENV" = production ]; then PORT=4002; else PORT=4001; fi
DIR="$HOME/envs/$ENV"
mkdir -p "$DIR/releases"

# Stop the running version, and remember it for a rollback
if [ -f "$DIR/app.pid" ]; then kill "$(cat "$DIR/app.pid")" 2>/dev/null || true; fi
if [ -f "$DIR/current" ] && [ "$(cat "$DIR/current")" != "$NAME" ]; then cp "$DIR/current" "$DIR/previous"; fi

# Unpack and start the new version
cp "$PACKAGE" "$DIR/releases/" 2>/dev/null || true
rm -rf "$DIR/app" && mkdir -p "$DIR/app"
tar xzf "$DIR/releases/$NAME" -C "$DIR/app"
echo "$NAME" > "$DIR/current"
cd "$DIR/app"
JENKINS_NODE_COOKIE=keep-running APP_VERSION=$VERSION PORT=$PORT nohup node server.js > "$DIR/app.log" 2>&1 &
echo $! > "$DIR/app.pid"

# Wait until the app answers
for i in $(seq 1 20); do
  curl -sf "http://localhost:$PORT/api/health" > /dev/null && break
  sleep 0.5
done
echo "Deployed $VERSION to $ENV (port $PORT)"
