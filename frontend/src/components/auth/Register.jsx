import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearError();

    if (password !== confirmPassword) {
      clearError();
      return;
    }

    const result = await register(email, password);

    if (result.success) {
      navigate('/login');
    }

    setLoading(false);
  };

  const validatePasswords = () => {
    return password === confirmPassword && password.length >= 6;
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-lg border-0 eco-card">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h1 className="fw-bold text-success mb-2">
                    🌱 EcoGuard
                  </h1>
                  <h4 className="text-muted">Join Our Mission</h4>
                  <p className="text-muted">Create an account to protect our planet</p>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4 alert-eco">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="form-control-eco"
                      size="lg"
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="form-control-eco"
                      size="lg"
                      minLength={6}
                      isInvalid={password && password.length < 6}
                    />
                    <Form.Control.Feedback type="invalid">
                      Password must be at least 6 characters long.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="form-control-eco"
                      size="lg"
                      isInvalid={confirmPassword && password !== confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      Passwords do not match.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    variant="success"
                    type="submit"
                    className="w-100 btn-eco mb-3"
                    size="lg"
                    disabled={loading || !validatePasswords()}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating Account...
                      </>
                    ) : (
                      '🌍 Create Account'
                    )}
                  </Button>
                </Form>

                <div className="text-center">
                  <p className="text-muted mb-0">
                    Already have an account?{' '}
                    <Link to="/login" className="text-success text-decoration-none fw-semibold">
                      Login here
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>

            <div className="text-center mt-4">
              <p className="text-muted small">
                Join us in the fight against climate change 🌱
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};