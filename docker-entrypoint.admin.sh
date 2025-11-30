#!/bin/sh
set -e

cd /app
npm install

if [ -d "/app/web" ]; then
  cd /app/web
  npm install
fi

if [ -d "/app/web/client" ]; then
  cd /app/web/client
  npm install
fi

cd /app/web

npm run server &
SERVER_PID=$!

npm run client &
CLIENT_PID=$!

trap 'kill -TERM "$SERVER_PID" "$CLIENT_PID" 2>/dev/null || true' INT TERM

SERVER_STATUS=0
CLIENT_STATUS=0

while :; do
  if ! kill -0 "$SERVER_PID" 2>/dev/null; then
    wait "$SERVER_PID" || SERVER_STATUS=$?
    break
  fi

  if ! kill -0 "$CLIENT_PID" 2>/dev/null; then
    wait "$CLIENT_PID" || CLIENT_STATUS=$?
    break
  fi

  sleep 1
done

# Cleanly stop the remaining process once one of them exits
if kill -0 "$SERVER_PID" 2>/dev/null; then
  kill "$SERVER_PID" 2>/dev/null || true
  wait "$SERVER_PID" || SERVER_STATUS=$?
fi

if kill -0 "$CLIENT_PID" 2>/dev/null; then
  kill "$CLIENT_PID" 2>/dev/null || true
  wait "$CLIENT_PID" || CLIENT_STATUS=$?
fi

if [ "$SERVER_STATUS" -ne 0 ] || [ "$CLIENT_STATUS" -ne 0 ]; then
  exit 1
fi
