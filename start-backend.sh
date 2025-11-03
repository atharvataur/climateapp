#!/bin/bash

echo "🌱 Starting EcoGuard Backend..."
echo "📍 Location: $(pwd)"
echo ""

cd backend-simple

if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🚀 Starting Node.js backend server..."
echo "🔗 API will be available at: http://localhost:8080"
echo "📊 Climate API: http://localhost:8080/api/climate/cities"
echo "🔐 Auth API: http://localhost:8080/api/auth/login"
echo ""

npm start