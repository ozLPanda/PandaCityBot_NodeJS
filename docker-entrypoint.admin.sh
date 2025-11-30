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

wait -n $SERVER_PID $CLIENT_PID
kill -TERM $SERVER_PID $CLIENT_PID 2>/dev/null || true
wait
