import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/common/Navbar';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Home } from './components/Home';
import { ClimateDashboard } from './components/ClimateDashboard';
import { Quiz } from './components/Quiz';
import { AboutUs } from './components/AboutUs';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Navbar />
                <Home />
              </ProtectedRoute>
            } />

            <Route path="/home" element={
              <ProtectedRoute>
                <Navbar />
                <Home />
              </ProtectedRoute>
            } />

            <Route path="/climate-dashboard" element={
              <ProtectedRoute>
                <Navbar />
                <ClimateDashboard />
              </ProtectedRoute>
            } />

            <Route path="/quizzes" element={
              <ProtectedRoute>
                <Navbar />
                <Quiz />
              </ProtectedRoute>
            } />

            <Route path="/about-us" element={
              <ProtectedRoute>
                <Navbar />
                <AboutUs />
              </ProtectedRoute>
            } />

            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;