# 🌱 How to Run EcoGuard Web Application

## Quick Start (2 minutes)

### Step 1: Start the Backend
```bash
cd /workspace/cmhj26wy702fypsim5hlntld6/climateapp
./start-backend.sh
```
*Backend will run on http://localhost:8080*

### Step 2: Start the Frontend (in new terminal)
```bash
cd /workspace/cmhj26wy702fypsim5hlntld6/climateapp
./start-frontend.sh
```
*Frontend will run on http://localhost:3000*

### Step 3: Open Your Browser
Navigate to **http://localhost:3000**

## 🎯 What You Can Do:

1. **Register a new account**
   - Email: your-email@example.com
   - Password: any 6+ character password

2. **Login and explore:**
   - 🏠 **Home**: Read 500+ words about climate change
   - 📊 **Climate Dashboard**: See real-time data for 6 Indian cities
   - 🧩 **Quizzes**: Take 10+ climate questions with immediate feedback
   - 👥 **About Us**: View team member information

## 📱 Features Demo:

### Authentication
- ✅ User registration with password encryption
- ✅ Secure login with JWT tokens
- ✅ Protected routes (all pages require login)

### Climate Dashboard
- ✅ Real-time data for: Navi Mumbai, Mumbai, Delhi, Bangalore, Hyderabad, Chennai
- ✅ Metrics: Temperature, AQI, PM2.5, PM10, Humidity, Wind Speed
- ✅ Color-coded AQI indicators
- ✅ Search and refresh functionality

### Quiz System
- ✅ 12 randomized climate questions
- ✅ Immediate feedback with explanations
- ✅ Progress tracking and final score
- ✅ Answer review

### Educational Content
- ✅ 500-word comprehensive climate change content
- ✅ 4 main sections with good formatting
- ✅ Call-to-action buttons

### Team Information
- ✅ Professional card layout
- ✅ Team members: Atharva Taur, Hitesh Pal, Abhishek Jagdale, Arya Shinde
- ✅ All Information Technology, Sem 3

## 🛠️ Technical Details:

**Backend:** Node.js + Express + JWT Authentication
**Frontend:** React 18 + Bootstrap 5 + React Router
**Database:** In-memory storage (demo mode)
**Climate Data:** Mock data with realistic variations

## 🚨 Troubleshooting:

If backend doesn't start:
```bash
cd backend-simple
npm install
npm start
```

If frontend doesn't start:
```bash
cd frontend
npm install
npm start
```

## 📞 Support:

The application includes comprehensive error handling and user-friendly messages. All features work with mock data, so no external API keys or database setup required.

---

**Built with ❤️ for climate education and awareness**