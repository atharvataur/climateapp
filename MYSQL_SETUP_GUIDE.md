# 🗄️ MySQL Database Setup Guide for EcoGuard

## 🎯 Two Options to Add MySQL

### **Option A: Use Existing Spring Boot + MySQL (Recommended)**
- ✅ Fully implemented with JPA/Hibernate
- ✅ Professional Java backend
- ✅ Complete security features
- ⚠️ Requires Java 17+ and Maven

### **Option B: Use New Node.js + MySQL Version**
- ✅ Easy Node.js setup (no Java needed)
- ✅ Same API endpoints as current version
- ✅ MySQL database integration
- ✅ Works with existing React frontend

---

## 🚀 **Option A: Spring Boot + MySQL Setup**

### Step 1: Install Java 17+
```bash
# Check Java version
java -version

# Install Java 17 if needed
# Mac: brew install openjdk@17
# Ubuntu: sudo apt install openjdk-17-jdk
# Windows: Download from Oracle website
```

### Step 2: Install Maven
```bash
# Mac
brew install maven

# Ubuntu/Debian
sudo apt install maven

# Windows: Download from Maven website
```

### Step 3: Install MySQL
```bash
# Mac
brew install mysql
brew services start mysql

# Ubuntu/Debian
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql

# Windows: Download from MySQL website
```

### Step 4: Create Database
```sql
mysql -u root -p
CREATE DATABASE ecoguard_db;
EXIT;
```

### Step 5: Configure Application
Edit: `src/main/resources/application.properties`
```properties
# Update these lines with your MySQL credentials
spring.datasource.url=jdbc:mysql://localhost:3306/ecoguard_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### Step 6: Run Spring Boot Backend
```bash
cd climateapp
mvn clean install
mvn spring-boot:run
```

---

## 🚀 **Option B: Node.js + MySQL Setup (Easier)**

### Step 1: Install MySQL
```bash
# Mac
brew install mysql
brew services start mysql

# Ubuntu/Debian
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

### Step 2: Create Database
```sql
mysql -u root -p
CREATE DATABASE ecoguard_db;
EXIT;
```

### Step 3: Setup Node.js Backend
```bash
cd climateapp/backend-mysql
cp .env.example .env
```

### Step 4: Configure Environment
Edit `.env` file:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ecoguard_db
PORT=8080
```

### Step 5: Install and Run
```bash
npm install
npm start
```

---

## 🔄 **How to Switch Between Versions**

### **From In-Memory to MySQL:**

1. **Stop current backend**
2. **Start MySQL backend** (either Spring Boot or Node.js version)
3. **Frontend works the same** - no changes needed
4. **Register new accounts** - old in-memory users won't transfer

### **Keep Both Versions:**
```bash
# In-Memory (for quick testing)
cd backend-simple && npm start

# MySQL (for persistent data)
cd backend-mysql && npm start

# Spring Boot (professional Java version)
cd ../ && mvn spring-boot:run
```

---

## 📊 **Database Schema**

Both MySQL versions create the same table:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,  -- BCrypt hashed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 🧪 **Test MySQL Integration**

### **1. Test Database Connection:**
```bash
curl http://localhost:8080/api/health
```
Should return: `{"success": true, "message": "...MySQL is running", "database": "MySQL"}`

### **2. Register a User:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### **3. Verify in MySQL:**
```sql
mysql -u root -p
USE ecoguard_db;
SELECT * FROM users;
```

---

## 🛠️ **Troubleshooting**

### **Connection Issues:**
```bash
# Check MySQL status
brew services list | grep mysql  # Mac
sudo systemctl status mysql       # Linux

# Reset MySQL root password
mysql_secure_installation
```

### **Port Conflicts:**
```bash
# Kill processes on port 8080
npx kill-port 8080
```

### **Permission Issues:**
```bash
# Grant MySQL privileges
mysql -u root -p
GRANT ALL PRIVILEGES ON ecoguard_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

---

## 🎯 **Recommendation**

**For quick demo/learning**: Use the in-memory version (`backend-simple`)
**For portfolio/production**: Use Spring Boot + MySQL
**For easy MySQL setup**: Use Node.js + MySQL (`backend-mysql`)

All versions work identically from the frontend perspective - just choose the backend that fits your needs! 🌱