import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Alert, Spinner, InputGroup, Form, Badge } from 'react-bootstrap';
import { climateService } from '../services/climateService';

export const ClimateDashboard = () => {
  const [climateData, setClimateData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetchClimateData();
  }, []);

  useEffect(() => {
    // Filter data based on search term
    const filtered = climateData.filter(city =>
      city.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [climateData, searchTerm]);

  const fetchClimateData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await climateService.getAllCitiesData();

      if (response.success) {
        setClimateData(response.data);
        setLastUpdated(new Date().toLocaleString());
      } else {
        setError(response.error || 'Failed to fetch climate data');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch climate data');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      setError(null);
      const response = await climateService.refreshClimateData();

      if (response.success) {
        setClimateData(response.data);
        setLastUpdated(new Date().toLocaleString());
      } else {
        setError(response.error || 'Failed to refresh climate data');
      }
    } catch (err) {
      setError(err.message || 'Failed to refresh climate data');
    } finally {
      setRefreshing(false);
    }
  };

  const getAqiBadge = (aqi) => {
    const { status, color } = climateService.getAqiStatus(aqi);
    return (
      <Badge
        style={{
          backgroundColor: color,
          color: color === '#ffff00' ? '#000' : '#fff',
          minWidth: '100px'
        }}
      >
        {aqi || '—'} {status}
      </Badge>
    );
  };

  const sortData = (key) => {
    const sorted = [...filteredData].sort((a, b) => {
      if (a[key] === null || a[key] === undefined) return 1;
      if (b[key] === null || b[key] === undefined) return -1;
      return a[key] - b[key];
    });
    setFilteredData(sorted);
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading climate data...</span>
          </Spinner>
          <p className="mt-3 text-muted">Loading climate data...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold text-success mb-3">
          📊 Climate Dashboard
        </h1>
        <p className="lead text-muted">
          Real-time environmental data for major Indian cities
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="danger" className="mb-4 alert-eco">
          ⚠️ {error}
        </Alert>
      )}

      {/* Controls */}
      <Card className="eco-card border-0 shadow-sm mb-4">
        <Card.Body className="p-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            {/* Search */}
            <div className="flex-grow-1">
              <InputGroup>
                <InputGroup.Text>
                  🔍
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control-eco"
                />
              </InputGroup>
            </div>

            {/* Refresh Button */}
            <Button
              variant="success"
              onClick={handleRefresh}
              disabled={refreshing}
              className="btn-eco"
            >
              {refreshing ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  <span className="ms-2">Refreshing...</span>
                </>
              ) : (
                <>
                  🔄 Refresh Data
                </>
              )}
            </Button>
          </div>

          {/* Last Updated */}
          {lastUpdated && (
            <div className="text-center mt-3">
              <small className="text-muted">
                Last updated: {lastUpdated}
              </small>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Climate Data Table */}
      <Card className="eco-card border-0 shadow-sm">
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="climate-table mb-0">
              <thead>
                <tr>
                  <th onClick={() => sortData('city')} style={{ cursor: 'pointer' }}>
                    🏙️ City ↕
                  </th>
                  <th onClick={() => sortData('temperature')} style={{ cursor: 'pointer' }}>
                    🌡️ Temperature (°C) ↕
                  </th>
                  <th onClick={() => sortData('aqi')} style={{ cursor: 'pointer' }}>
                    💨 AQI ↕
                  </th>
                  <th onClick={() => sortData('pm25')} style={{ cursor: 'pointer' }}>
                    🌫️ PM2.5 (μg/m³) ↕
                  </th>
                  <th onClick={() => sortData('pm10')} style={{ cursor: 'pointer' }}>
                    💨 PM10 (μg/m³) ↕
                  </th>
                  <th onClick={() => sortData('humidity')} style={{ cursor: 'pointer' }}>
                    💧 Humidity (%) ↕
                  </th>
                  <th onClick={() => sortData('windSpeed')} style={{ cursor: 'pointer' }}>
                    🌪️ Wind Speed (km/h) ↕
                  </th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((city, index) => (
                    <tr key={index}>
                      <td className="fw-semibold">{city.city}</td>
                      <td>{climateService.formatTemperature(city.temperature)}</td>
                      <td>{getAqiBadge(city.aqi)}</td>
                      <td>{climateService.formatPMValue(city.pm25)}</td>
                      <td>{climateService.formatPMValue(city.pm10)}</td>
                      <td>{climateService.formatHumidity(city.humidity)}</td>
                      <td>{climateService.formatWindSpeed(city.windSpeed)}</td>
                      <td>
                        <small className="text-muted">{city.status || 'Live'}</small>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      <p className="text-muted mb-0">
                        {searchTerm ? 'No cities found matching your search.' : 'No climate data available.'}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Legend */}
      <Card className="eco-card border-0 shadow-sm mt-4">
        <Card.Body className="p-4">
          <h5 className="text-success mb-3">📖 AQI Legend</h5>
          <div className="d-flex flex-wrap gap-3">
            <div className="d-flex align-items-center">
              <div style={{ width: '20px', height: '20px', backgroundColor: '#00e400', borderRadius: '3px', marginRight: '8px' }}></div>
              <small>Good (0-50)</small>
            </div>
            <div className="d-flex align-items-center">
              <div style={{ width: '20px', height: '20px', backgroundColor: '#ffff00', borderRadius: '3px', marginRight: '8px' }}></div>
              <small>Moderate (51-100)</small>
            </div>
            <div className="d-flex align-items-center">
              <div style={{ width: '20px', height: '20px', backgroundColor: '#ff7e00', borderRadius: '3px', marginRight: '8px' }}></div>
              <small>Unhealthy for Sensitive (101-150)</small>
            </div>
            <div className="d-flex align-items-center">
              <div style={{ width: '20px', height: '20px', backgroundColor: '#ff0000', borderRadius: '3px', marginRight: '8px' }}></div>
              <small>Unhealthy (151-200)</small>
            </div>
            <div className="d-flex align-items-center">
              <div style={{ width: '20px', height: '20px', backgroundColor: '#8f3f97', borderRadius: '3px', marginRight: '8px' }}></div>
              <small>Very Unhealthy (201-300)</small>
            </div>
            <div className="d-flex align-items-center">
              <div style={{ width: '20px', height: '20px', backgroundColor: '#7e0023', borderRadius: '3px', marginRight: '8px' }}></div>
              <small>Hazardous (301+)</small>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};