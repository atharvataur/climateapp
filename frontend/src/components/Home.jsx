import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <h1 className="display-4 fw-bold mb-4 fade-in">
            🌍 Understanding Climate Change
          </h1>
          <p className="lead mb-4 fade-in">
            Together, we can protect our planet for future generations
          </p>
          <div className="fade-in">
            <Button
              variant="light"
              size="lg"
              className="btn-eco me-3"
              onClick={() => navigate('/climate-dashboard')}
            >
              📊 View Climate Data
            </Button>
            <Button
              variant="outline-light"
              size="lg"
              className="btn-eco"
              onClick={() => navigate('/quizzes')}
            >
              🧩 Test Your Knowledge
            </Button>
          </div>
        </Container>
      </div>

      <Container className="py-5">
        {/* Section 1: Understanding Climate Change */}
        <Row className="mb-5">
          <Col lg={12}>
            <Card className="eco-card border-0 shadow-sm mb-4 fade-in">
              <Card.Body className="p-4">
                <h2 className="text-success mb-3">
                  🌡️ What is Climate Change?
                </h2>
                <p className="lead">
                  Climate change refers to long-term shifts in global temperatures and weather patterns.
                  While climate variations are natural, human activities have been the main driver of climate change
                  since the mid-20th century. The greenhouse effect, where certain gases trap heat in Earth's atmosphere,
                  has been intensified by human emissions, leading to global warming. This warming affects weather patterns,
                  sea levels, and ecosystems worldwide, creating unprecedented challenges for our planet's inhabitants.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Section 2: Primary Causes */}
        <Row className="mb-5">
          <Col lg={12}>
            <Card className="eco-card border-0 shadow-sm mb-4 fade-in">
              <Card.Body className="p-4">
                <h2 className="text-success mb-3">
                  🏭 Primary Causes of Climate Change
                </h2>
                <Row>
                  <Col md={6} className="mb-3">
                    <h5 className="text-primary">⚡ Fossil Fuels</h5>
                    <p>Burning coal, oil, and natural gas for energy releases massive amounts of CO₂,
                    the primary greenhouse gas driving global warming.</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <h5 className="text-primary">🌳 Deforestation</h5>
                    <p>Forest loss reduces Earth's capacity to absorb CO₂, while burning forests releases
                    stored carbon back into the atmosphere.</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <h5 className="text-primary">🏭 Industrial Processes</h5>
                    <p>Manufacturing, cement production, and chemical industries emit various greenhouse gases
                    and pollutants that contribute to warming.</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <h5 className="text-primary">🚗 Transportation</h5>
                    <p>Cars, trucks, ships, and airplanes running on fossil fuels are major sources of
                    CO₂ emissions globally.</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Section 3: Environmental Impacts */}
        <Row className="mb-5">
          <Col lg={12}>
            <Card className="eco-card border-0 shadow-sm mb-4 fade-in">
              <Card.Body className="p-4">
                <h2 className="text-success mb-3">
                  🌊 Environmental Impacts
                </h2>
                <p className="mb-3">
                  Climate change manifests through various environmental impacts that affect ecosystems and
                  human communities worldwide. Global temperatures have risen by approximately 1.1°C since pre-industrial
                  times, leading to more frequent and intense extreme weather events. Sea levels are rising at an
                  accelerating rate due to thermal expansion and melting ice sheets, threatening coastal communities worldwide.
                </p>
                <p className="mb-3">
                  Ocean acidification, caused by increased CO₂ absorption, threatens marine ecosystems and coral reefs.
                  Extreme weather events including hurricanes, droughts, floods, and wildfires have become more frequent
                  and severe, causing billions in damages and human suffering. These changes disrupt ecosystems,
                  force species migration or extinction, and threaten food and water security for millions of people.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Section 4: Prevention and Solutions */}
        <Row className="mb-5">
          <Col lg={12}>
            <Card className="eco-card border-0 shadow-sm mb-4 fade-in">
              <Card.Body className="p-4">
                <h2 className="text-success mb-3">
                  💡 Prevention & Solutions
                </h2>
                <p className="mb-3">
                  Addressing climate change requires urgent, comprehensive action at all levels of society.
                  Transitioning to renewable energy sources like solar, wind, and hydro power can dramatically reduce
                  our dependence on fossil fuels. Energy efficiency improvements in buildings, transportation, and industry
                  can significantly cut emissions while saving money.
                </p>
                <Row>
                  <Col md={6} className="mb-3">
                    <h5 className="text-primary">🌱 Individual Actions</h5>
                    <p>Reduce energy consumption, choose sustainable transportation, minimize waste,
                    and support climate-conscious businesses and policies.</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <h5 className="text-primary">🌍 Global Cooperation</h5>
                    <p>International agreements like the Paris Agreement aim to limit warming to 1.5°C,
                    requiring coordinated global action and commitment.</p>
                  </Col>
                </Row>
                <p className="mb-3">
                  Reforestation and sustainable land management can remove CO₂ from the atmosphere while protecting
                  biodiversity. Investment in green technology, carbon capture, and climate adaptation measures is essential
                  for building resilient communities. Education and awareness-raising efforts help drive behavioral change
                  and political support for climate action.
                </p>

                <div className="text-center mt-4">
                  <Button
                    variant="success"
                    size="lg"
                    className="btn-eco me-3"
                    onClick={() => navigate('/climate-dashboard')}
                  >
                    📊 Monitor Climate Data
                  </Button>
                  <Button
                    variant="outline-success"
                    size="lg"
                    className="btn-eco"
                    onClick={() => navigate('/quizzes')}
                  >
                    🧩 Take Climate Quiz
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Call to Action */}
        <Row>
          <Col lg={12}>
            <Card className="eco-card border-0 shadow-sm bg-gradient text-white fade-in">
              <Card.Body className="p-5 text-center">
                <h2 className="mb-3">🌍 Take Action Today!</h2>
                <p className="lead mb-4">
                  Every action counts in the fight against climate change. Start by monitoring your local climate
                  data and testing your knowledge about environmental issues.
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <Button
                    variant="light"
                    size="lg"
                    className="btn-eco"
                    onClick={() => navigate('/climate-dashboard')}
                  >
                    📊 Climate Dashboard
                  </Button>
                  <Button
                    variant="outline-light"
                    size="lg"
                    className="btn-eco"
                    onClick={() => navigate('/quizzes')}
                  >
                    🧩 Climate Quizzes
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};