# EcoGuard Backend with MySQL

This is the MySQL-powered version of the EcoGuard backend that stores user data permanently in a MySQL database.

## 🚀 Quick Setup

### 1. Install MySQL
```bash
# Mac
brew install mysql
brew services start mysql

# Ubuntu/Debian
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql

# Windows: Download from https://dev.mysql.com/downloads/mysql/
```

### 2. Create Database
```sql
mysql -u root -p
CREATE DATABASE ecoguard_db;
EXIT;
```

### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env with your MySQL credentials
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Start Server
```bash
npm start
```

## 📁 Database Schema

The application automatically creates this table:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/validate` - Validate JWT token

### Admin
- `GET /api/users` - Get all users (admin)

### Climate Data
- `GET /api/climate/cities` - Get climate data
- `POST /api/climate/refresh` - Refresh climate data

## 🛠️ Features

✅ **Persistent Storage**: Users stored in MySQL database
✅ **Password Security**: BCrypt encryption
✅ **JWT Authentication**: Secure token-based auth
✅ **Auto Table Creation**: Database setup handled automatically
✅ **Error Handling**: Comprehensive error responses
✅ **Environment Config**: Secure credential management

## 🔄 Switching from In-Memory Version

To switch from the in-memory version to MySQL:

1. Stop the current backend
2. Install and configure MySQL
3. Run this MySQL version instead
4. All existing users will need to register again

## 📊 Example Requests

### Register User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Login User
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Health Check
```bash
curl http://localhost:8080/api/health
```