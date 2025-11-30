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

trap 'kill -TERM $SERVER_PID $CLIENT_PID 2>/dev/null || true' INT TERM

while true; do
  if ! kill -0 "$SERVER_PID" 2>/dev/null; then
    break
  fi

  if ! kill -0 "$CLIENT_PID" 2>/dev/null; then
    break
  fi

  sleep 1
done

kill -TERM $SERVER_PID $CLIENT_PID 2>/dev/null || true
wait $SERVER_PID 2>/dev/null || true
wait $CLIENT_PID 2>/dev/null || true
