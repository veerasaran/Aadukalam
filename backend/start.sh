#!/bin/bash

# Navigate to the backend directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Setting up Prisma Database Schema..."
cd "$SCRIPT_DIR/dbSchema" || exit
npm install
npx prisma generate

echo "Starting Proxy Service..."
cd "$SCRIPT_DIR/proxy" || exit
npm install --production
npm start &

# CRITICAL FIX: Azure injects PORT=8080. If we don't unset it, ALL services will try to bind to 8080 and crash!
unset PORT

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
