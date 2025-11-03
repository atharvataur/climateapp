import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

export const AboutUs = () => {
  const teamMembers = [
    {
      name: "Atharva Taur",
      role: "Information Technology",
      semester: "Semester 3"
    },
    {
      name: "Hitesh Pal",
      role: "Information Technology",
      semester: "Semester 3"
    },
    {
      name: "Abhishek Jagdale",
      role: "Information Technology",
      semester: "Semester 3"
    },
    {
      name: "Arya Shinde",
      role: "Information Technology",
      semester: "Semester 3"
    }
  ];

  return (
    <div>
      {/* Header Section */}
      <div className="hero-section">
        <Container>
          <h1 className="display-4 fw-bold mb-4 fade-in">
            👥 About Us
          </h1>
          <p className="lead mb-4 fade-in">
            Meet our climate action team
          </p>
        </Container>
      </div>

      <Container className="py-5">
        {/* Project Description */}
        <Row className="mb-5">
          <Col lg={12}>
            <Card className="eco-card border-0 shadow-sm mb-4 fade-in">
              <Card.Body className="p-4">
                <h2 className="text-success mb-3">
                  🌱 Our Mission
                </h2>
                <p className="lead mb-3">
                  Welcome to EcoGuard, where technology meets environmental consciousness.
                </p>
                <p className="mb-3">
                  EcoGuard is a comprehensive climate awareness platform designed to educate, inform, and empower
                  individuals in the fight against climate change. Our web application provides real-time climate data,
                  educational content, and interactive quizzes to help users understand environmental issues and take
                  meaningful action.
                </p>
                <p>
                  Built with modern web technologies including Spring Boot and React, EcoGuard demonstrates how
                  software development can be leveraged for environmental education and awareness. We believe that
                  access to accurate climate information and engaging educational content is crucial for fostering
                  a generation of environmentally conscious citizens.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Team Section Header */}
        <Row className="mb-4">
          <Col lg={12} className="text-center">
            <h2 className="fw-bold text-success mb-3">
              🚀 Meet Our Team
            </h2>
            <p className="lead text-muted">
              Passionate students working together for a sustainable future
            </p>
          </Col>
        </Row>

        {/* Team Member Cards - Vertical Layout as Requested */}
        <Row className="justify-content-center">
          {teamMembers.map((member, index) => (
            <Col lg={8} md={10} key={index} className="mb-4">
              <Card className="team-card eco-card border-0 shadow-sm fade-in">
                <Card.Body className="p-4">
                  <div className="text-center">
                    {/* Avatar Placeholder */}
                    <div className="mb-3">
                      <div
                        className="rounded-circle mx-auto d-flex align-items-center justify-content-center"
                        style={{
                          width: '100px',
                          height: '100px',
                          background: 'linear-gradient(135deg, #3498db 0%, #2ecc71 100%)',
                          color: 'white',
                          fontSize: '2.5rem',
                          fontWeight: 'bold'
                        }}
                      >
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>

                    {/* Member Information */}
                    <h3 className="team-member-name mb-2">
                      {member.name}
                    </h3>

                    <p className="team-member-role mb-2">
                      <strong>{member.role}</strong>
                    </p>

                    <p className="team-member-semester mb-0">
                      {member.semester}
                    </p>

                    {/* Additional Info */}
                    <div className="mt-3 pt-3 border-top">
                      <small className="text-muted">
                        Contributing to climate awareness through innovative web solutions
                      </small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Project Details */}
        <Row className="mt-5">
          <Col lg={12}>
            <Card className="eco-card border-0 shadow-sm fade-in">
              <Card.Body className="p-4">
                <h3 className="text-success mb-3">
                  💻 About This Project
                </h3>
                <Row>
                  <Col md={6} className="mb-3">
                    <h5 className="text-primary">🎯 Purpose</h5>
                    <p>
                      To create an engaging platform that combines climate education with real-time data
                      visualization, making environmental information accessible and interactive.
                    </p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <h5 className="text-primary">🛠️ Technology Stack</h5>
                    <p>
                      Built with Spring Boot backend, React frontend, MySQL database, and integrated
                      climate APIs for real-time environmental data.
                    </p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <h5 className="text-primary">🌍 Key Features</h5>
                    <ul className="list-unstyled">
                      <li>• Real-time climate monitoring dashboard</li>
                      <li>• Educational content on climate change</li>
                      <li>• Interactive climate quizzes</li>
                      <li>• User authentication system</li>
                    </ul>
                  </Col>
                  <Col md={6} className="mb-3">
                    <h5 className="text-primary">🎓 Academic Context</h5>
                    <p>
                      Developed as part of our Information Technology curriculum, this project
                      demonstrates our skills in full-stack web development while addressing
                      important environmental issues.
                    </p>
                  </Col>
                </Row>

                <div className="text-center mt-4">
                  <p className="text-muted mb-0">
                    Together, we believe in using technology to create positive environmental change. 🌱
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};