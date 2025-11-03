const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = 8080;
const JWT_SECRET = 'ecoguardSecretKeyForJWTTokenGenerationAndValidation123456789';

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecoguard_db'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL database');

  // Create users table if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('❌ Error creating table:', err);
    } else {
      console.log('✅ Users table ready');
    }
  });
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper functions
const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Mock climate data
const mockClimateData = [
  {
    city: "Navi Mumbai",
    temperature: 28.5,
    aqi: 85,
    pm25: 35.2,
    pm10: 45.8,
    humidity: 65.0,
    windSpeed: 12.3,
    status: "Moderate",
    lastUpdated: new Date().toLocaleString()
  },
  {
    city: "Mumbai",
    temperature: 30.2,
    aqi: 120,
    pm25: 55.4,
    pm10: 68.9,
    humidity: 70.5,
    windSpeed: 8.7,
    status: "Unhealthy for Sensitive",
    lastUpdated: new Date().toLocaleString()
  },
  {
    city: "Delhi",
    temperature: 32.8,
    aqi: 165,
    pm25: 75.6,
    pm10: 95.2,
    humidity: 45.3,
    windSpeed: 6.2,
    status: "Unhealthy",
    lastUpdated: new Date().toLocaleString()
  },
  {
    city: "Bangalore",
    temperature: 26.4,
    aqi: 65,
    pm25: 28.9,
    pm10: 38.5,
    humidity: 55.8,
    windSpeed: 10.1,
    status: "Moderate",
    lastUpdated: new Date().toLocaleString()
  },
  {
    city: "Hyderabad",
    temperature: 29.7,
    aqi: 95,
    pm25: 42.3,
    pm10: 52.7,
    humidity: 60.2,
    windSpeed: 9.4,
    status: "Moderate",
    lastUpdated: new Date().toLocaleString()
  },
  {
    city: "Chennai",
    temperature: 31.2,
    aqi: 78,
    pm25: 33.8,
    pm10: 43.1,
    humidity: 68.7,
    windSpeed: 11.5,
    status: "Moderate",
    lastUpdated: new Date().toLocaleString()
  }
];

// Routes

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const checkQuery = 'SELECT id FROM users WHERE email = ?';
    db.query(checkQuery, [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, error: 'Database error' });
      }

      if (results.length > 0) {
        return res.status(400).json({ success: false, error: 'Email already registered' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const insertQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
      db.query(insertQuery, [email, hashedPassword], (err, result) => {
        if (err) {
          return res.status(500).json({ success: false, error: 'Registration failed' });
        }

        res.status(201).json({
          success: true,
          message: 'User registered successfully',
          user: { id: result.insertId, email }
        });
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const query = 'SELECT id, email, password FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, error: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ success: false, error: 'Invalid email or password' });
      }

      const user = results[0];

      // Check password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ success: false, error: 'Invalid email or password' });
      }

      // Generate token
      const token = generateToken(user);

      res.json({
        success: true,
        token,
        user: { id: user.id, email: user.email }
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

// Validate token
app.post('/api/auth/validate', (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ success: false, error: 'Token is required' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const query = 'SELECT id, email FROM users WHERE id = ?';
    db.query(query, [decoded.userId], (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, error: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ success: false, error: 'User not found' });
      }

      const user = results[0];

      res.json({
        success: true,
        valid: true,
        user: { id: user.id, email: user.email }
      });
    });
  } catch (error) {
    res.status(401).json({ success: false, valid: false, error: 'Invalid token' });
  }
});

// Get all users (admin endpoint)
app.get('/api/users', (req, res) => {
  const query = 'SELECT id, email, created_at FROM users ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Database error' });
    }
    res.json({ success: true, data: results });
  });
});

// Climate endpoints (same as before)
app.get('/api/climate/cities', (req, res) => {
  const dataWithVariation = mockClimateData.map(city => ({
    ...city,
    temperature: city.temperature + (Math.random() - 0.5) * 2,
    aqi: Math.max(20, Math.min(300, city.aqi + Math.floor((Math.random() - 0.5) * 20))),
    pm25: Math.max(10, city.pm25 + (Math.random() - 0.5) * 10),
    pm10: Math.max(15, city.pm10 + (Math.random() - 0.5) * 15),
    humidity: Math.max(20, Math.min(90, city.humidity + (Math.random() - 0.5) * 10)),
    windSpeed: Math.max(2, city.windSpeed + (Math.random() - 0.5) * 5),
    lastUpdated: new Date().toLocaleString()
  }));

  res.json({
    success: true,
    data: dataWithVariation,
    count: dataWithVariation.length
  });
});

app.post('/api/climate/refresh', (req, res) => {
  const refreshedData = mockClimateData.map(city => ({
    ...city,
    temperature: city.temperature + (Math.random() - 0.5) * 4,
    aqi: Math.max(20, Math.min(300, city.aqi + Math.floor((Math.random() - 0.5) * 30))),
    pm25: Math.max(10, city.pm25 + (Math.random() - 0.5) * 15),
    pm10: Math.max(15, city.pm10 + (Math.random() - 0.5) * 20),
    humidity: Math.max(20, Math.min(90, city.humidity + (Math.random() - 0.5) * 15)),
    windSpeed: Math.max(2, city.windSpeed + (Math.random() - 0.5) * 8),
    lastUpdated: new Date().toLocaleString()
  }));

  res.json({
    success: true,
    message: 'Climate data refreshed successfully',
    data: refreshedData,
    count: refreshedData.length
  });
});

app.get('/api/climate/cities/:city', (req, res) => {
  const { city } = req.params;
  const cityData = mockClimateData.find(c =>
    c.city.toLowerCase() === city.toLowerCase()
  );

  if (!cityData) {
    return res.status(404).json({
      success: false,
      error: `City not found: ${city}`
    });
  }

  res.json({
    success: true,
    data: {
      ...cityData,
      temperature: cityData.temperature + (Math.random() - 0.5) * 2,
      lastUpdated: new Date().toLocaleString()
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'EcoGuard API with MySQL is running',
    database: 'MySQL',
    timestamp: new Date().toLocaleString()
  });
});

app.listen(PORT, () => {
  console.log(`🌱 EcoGuard Backend with MySQL running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💾 Database: MySQL`);
});