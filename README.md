# EcoGuard Climate Web Application

A comprehensive climate awareness web application built with Spring Boot and React that provides users with educational content, real-time climate data, interactive quizzes, and team information.

## 🌱 Features

- **User Authentication**: Secure login and registration system with JWT tokens
- **Educational Content**: 500-word comprehensive information about climate change
- **Climate Dashboard**: Real-time environmental data for major Indian cities
- **Interactive Quizzes**: 10+ climate and environment questions with immediate feedback
- **Team Information**: Professional card-based layout for team members
- **Responsive Design**: Mobile-friendly interface with Bootstrap

## 🏗️ Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Security**: Spring Security 6.x with JWT authentication
- **Database**: MySQL 8.x with Spring Data JPA
- **Build Tool**: Maven
- **Java Version**: JDK 17+

### Frontend
- **Framework**: React 18+
- **Routing**: React Router DOM 6+
- **UI Library**: Bootstrap 5+
- **HTTP Client**: Axios
- **State Management**: React Hooks

### External APIs
- **Climate Data**: World Air Quality Index API (with OpenAQ fallback)

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

### Database Setup

1. Create MySQL database:
```sql
CREATE DATABASE ecoguard_db;
```

2. Update database credentials in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecoguard_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Backend Setup

1. Navigate to the project directory:
```bash
cd climateapp
```

2. Build and run the Spring Boot application:
```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/validate` - Token validation

### Climate Data
- `GET /api/climate/cities` - Get climate data for all cities
- `POST /api/climate/refresh` - Refresh climate data
- `GET /api/climate/cities/{city}` - Get data for specific city

## 🌍 Cities Monitored

- Navi Mumbai
- Mumbai
- Delhi
- Bangalore
- Hyderabad
- Chennai

## 📋 Climate Metrics

- Temperature (°C)
- Air Quality Index (AQI)
- PM2.5 (μg/m³)
- PM10 (μg/m³)
- Humidity (%)
- Wind Speed (km/h)

## 🧩 Quiz Categories

- Climate Change Basics
- Environmental Science
- Pollution
- Renewable Energy
- Conservation
- Climate Policy
- Biodiversity
- Water Conservation
- Sustainable Living

## 👥 Team Members

- **Atharva Taur** - Information Technology, Sem 3
- **Hitesh Pal** - Information Technology, Sem 3
- **Abhishek Jagdale** - Information Technology, Sem 3
- **Arya Shinde** - Information Technology, Sem 3

## 🔧 Configuration

### Environment Variables

#### Backend
Create `.env` file in the backend root:
```env
DB_URL=jdbc:mysql://localhost:3306/ecoguard_db
DB_USERNAME=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=86400000
CLIMATE_API_KEY=your_climate_api_key
```

#### Frontend
Create `.env` file in the frontend root:
```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

## 🎨 UI Features

- **Responsive Navigation**: Mobile-friendly hamburger menu
- **Protected Routes**: All pages require authentication
- **Loading States**: User-friendly loading indicators
- **Error Handling**: Comprehensive error messages
- **Interactive Elements**: Hover effects and animations
- **Color-coded AQI**: Visual indicators for air quality
- **Search & Filter**: Climate dashboard search functionality
- **Progress Tracking**: Quiz progress bar
- **Immediate Feedback**: Quiz answers with explanations

## 🔒 Security Features

- JWT token-based authentication
- Password encryption with BCrypt
- CORS configuration
- Input validation
- SQL injection protection
- Token expiration handling

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## 🌐 Climate Data Sources

1. **Primary**: World Air Quality Index (aqicn.org)
2. **Fallback**: OpenAQ platform
3. **Mock Data**: Sample data for demonstration

## 🧪 Testing

### Running Tests

#### Backend Tests
```bash
mvn test
```

#### Frontend Tests
```bash
cd frontend
npm test
```

## 📝 License

This project is developed for educational purposes as part of the Information Technology curriculum.

## 🤝 Contributing

This is a student project developed for climate awareness education.

## 📞 Support

For any questions or issues, please contact the development team.

---

**Built with ❤️ for climate education and awareness**