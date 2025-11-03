# 🌱 EcoGuard Climate Web Application

A comprehensive climate awareness web application built with React and Node.js that provides users with educational content, real-time climate data, interactive quizzes, and team information.

## 🚀 **Quick Start (2 minutes)**

### Prerequisites
- Node.js 16+ installed
- Git installed

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd climateapp
```

### Step 2: Start Backend
```bash
cd backend-simple
npm install
npm start
```
*Backend will run on http://localhost:8080*

### Step 3: Start Frontend (New Terminal)
```bash
cd frontend
npm install
npm start
```
*Frontend will run on http://localhost:3000*

### Step 4: Open Browser
Navigate to **http://localhost:3000**

## 🌟 **Features**

- **🔐 Authentication**: Secure login/registration system
- **📊 Climate Dashboard**: Real-time data for 6 Indian cities
- **🧩 Interactive Quizzes**: 10+ climate questions with feedback
- **📖 Educational Content**: 500+ words about climate change
- **👥 Team Information**: Professional member cards
- **📱 Responsive Design**: Works on all devices

## 🏗️ **Technology Stack**

### Frontend
- React 18+ with functional components
- Bootstrap 5 for responsive design
- React Router DOM for navigation
- Axios for API communication
- Context API for state management

### Backend
- Node.js + Express.js
- JWT Authentication
- BCrypt Password Encryption
- CORS Configuration
- In-memory storage (demo mode)

## 📱 **How to Use**

1. **Register**: Create a new account with email + password
2. **Login**: Access all features with your credentials
3. **Navigate**: Use the menu to explore all sections
4. **Learn**: Read educational content about climate change
5. **Monitor**: View real-time climate data for Indian cities
6. **Test**: Take interactive quizzes about environmental topics
7. **Team**: View information about the development team

## 🌍 **Cities Monitored**

- Navi Mumbai
- Mumbai
- Delhi
- Bangalore
- Hyderabad
- Chennai

## 📊 **Climate Metrics**

- Temperature (°C)
- Air Quality Index (AQI)
- PM2.5 (μg/m³)
- PM10 (μg/m³)
- Humidity (%)
- Wind Speed (km/h)

## 🧩 **Quiz Categories**

- Climate Change Basics
- Environmental Science
- Pollution
- Renewable Energy
- Conservation
- Climate Policy
- Biodiversity

## 📋 **Project Structure**

```
climateapp/
├── backend-simple/          # Node.js backend
│   ├── package.json
│   └── server.js
├── frontend/                # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # Auth context
│   │   ├── services/       # API services
│   │   ├── data/           # Quiz questions
│   │   └── styles/         # CSS files
│   └── package.json
├── README.md
├── GITHUB_SETUP.md
└── RUN_ECOGUARD.md         # Quick start guide
```

## 👥 **Development Team**

- **Atharva Taur** - Information Technology, Sem 3
- **Hitesh Pal** - Information Technology, Sem 3
- **Abhishek Jagdale** - Information Technology, Sem 3
- **Arya Shinde** - Information Technology, Sem 3

## 🎨 **UI Features**

- **Eco-friendly Design**: Green and blue color scheme
- **Responsive Layout**: Mobile, tablet, desktop compatible
- **Interactive Elements**: Hover effects and animations
- **Loading States**: User-friendly loading indicators
- **Error Handling**: Comprehensive error messages
- **Color-coded AQI**: Visual air quality indicators

## 🔒 **Security Features**

- JWT token-based authentication
- Password encryption with BCrypt
- Input validation and sanitization
- CORS configuration
- Protected routes

## 🌐 **API Endpoints**

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/validate` - Token validation

### Climate Data
- `GET /api/climate/cities` - Get all cities data
- `POST /api/climate/refresh` - Refresh climate data
- `GET /api/climate/cities/{city}` - Get specific city data

## 📱 **Screenshots Preview**

*(Add screenshots when deploying)*

## 🚀 **Deployment**

### Frontend (Netlify/Vercel)
```bash
cd frontend
npm run build
# Deploy the build/ folder
```

### Backend (Heroku/Render)
```bash
cd backend-simple
# Deploy the Node.js application
```

## 📞 **Support**

For any questions or issues:
- Check the [RUN_ECOGUARD.md](RUN_ECOGUARD.md) for detailed setup
- All features work with mock data - no external API keys needed
- Comprehensive error handling included

## 📄 **License**

This project is developed for educational purposes as part of the Information Technology curriculum.

---

**Built with ❤️ for climate education and awareness**