#!/bin/bash

# Navigate to the backend directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Starting Proxy Service..."
cd "$SCRIPT_DIR/proxy" || exit
npm install --production
npm start &

echo "Starting Auth Service..."
cd "$SCRIPT_DIR/Auth" || exit
npm install --production
npm start &

echo "Starting Basic Service..."
cd "$SCRIPT_DIR/basic" || exit
npm install --production
npm start &

echo "Starting CodeSubmission Service..."
cd "$SCRIPT_DIR/codeSubmission" || exit
npm install --production
npm start &

echo "Starting Admin Service..."
cd "$SCRIPT_DIR/Admin" || exit
npm install --production
npm start &

echo "Starting AutoSubmission Service..."
cd "$SCRIPT_DIR/AutoSubmission" || exit
npm install --production
npm start &

echo "All microservices have been triggered. Keeping the container alive..."
wait
