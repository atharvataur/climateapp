#!/bin/bash

echo "🌱 Starting EcoGuard Frontend..."
echo "📍 Location: $(pwd)"
echo ""

cd frontend

if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🚀 Starting React development server..."
echo "🌐 Application will be available at: http://localhost:3000"
echo ""
echo "📋 Available Features:"
echo "  • User Registration & Login"
echo "  • Climate Education Content"
echo "  • Interactive Quizzes (10+ questions)"
echo "  • Team Information"
echo "  • Climate Dashboard (with mock data)"
echo ""

npm start