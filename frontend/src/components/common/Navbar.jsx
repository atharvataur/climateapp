import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path || (path === '/home' && location.pathname === '/');
  };

  return (
    <BootstrapNavbar expand="lg" className="navbar-ecoguard sticky-top">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/home" className="fw-bold">
          🌱 EcoGuard
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link
              as={Link}
              to="/home"
              className={`nav-link ${isActive('/home') ? 'active' : ''}`}
            >
              🏠 Home
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/climate-dashboard"
              className={`nav-link ${isActive('/climate-dashboard') ? 'active' : ''}`}
            >
              📊 Climate Dashboard
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/quizzes"
              className={`nav-link ${isActive('/quizzes') ? 'active' : ''}`}
            >
              🧩 Quizzes
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/about-us"
              className={`nav-link ${isActive('/about-us') ? 'active' : ''}`}
            >
              👥 About Us
            </Nav.Link>

            {isAuthenticated && (
              <NavDropdown
                title={`👤 ${user?.email}`}
                id="user-dropdown"
                align="end"
                className="ms-3"
              >
                <NavDropdown.Item className="text-muted">
                  <small>Signed in as {user?.email}</small>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  🚪 Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};