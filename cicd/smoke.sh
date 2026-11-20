#!/bin/bash
# Post-deploy checks: is the app up, which version runs, do the smoke tests pass?
set -e
if [ "$1" = production ]; then PORT=4002; else PORT=4001; fi
URL="http://localhost:$PORT"
echo "Health: $(curl -sf "$URL/api/health")"
BASE_URL=$URL npx playwright test --project=api --project=chromium --grep @smoke
