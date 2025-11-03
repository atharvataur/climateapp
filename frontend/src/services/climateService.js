import api from './authService';

export const climateService = {
  // Get climate data for all cities
  async getAllCitiesData() {
    try {
      const response = await api.get('/climate/cities');
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw new Error('Failed to fetch climate data. Please try again.');
    }
  },

  // Refresh climate data
  async refreshClimateData() {
    try {
      const response = await api.post('/climate/refresh');
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw new Error('Failed to refresh climate data. Please try again.');
    }
  },

  // Get data for specific city
  async getCityData(city) {
    try {
      const response = await api.get(`/climate/cities/${city}`);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw new Error(`Failed to fetch data for ${city}. Please try again.`);
    }
  },

  // Helper function to get AQI status
  getAqiStatus(aqi) {
    if (!aqi) return { status: 'No Data', color: '#cccccc' };

    if (aqi <= 50) return { status: 'Good', color: '#00e400' };
    if (aqi <= 100) return { status: 'Moderate', color: '#ffff00' };
    if (aqi <= 150) return { status: 'Unhealthy for Sensitive', color: '#ff7e00' };
    if (aqi <= 200) return { status: 'Unhealthy', color: '#ff0000' };
    if (aqi <= 300) return { status: 'Very Unhealthy', color: '#8f3f97' };
    return { status: 'Hazardous', color: '#7e0023' };
  },

  // Helper function to format temperature
  formatTemperature(temp) {
    if (temp === null || temp === undefined) return '—';
    return `${temp.toFixed(1)}°C`;
  },

  // Helper function to format humidity
  formatHumidity(humidity) {
    if (humidity === null || humidity === undefined) return '—';
    return `${humidity.toFixed(0)}%`;
  },

  // Helper function to format wind speed
  formatWindSpeed(speed) {
    if (speed === null || speed === undefined) return '—';
    return `${speed.toFixed(1)} km/h`;
  },

  // Helper function to format PM values
  formatPMValue(value) {
    if (value === null || value === undefined) return '—';
    return `${value.toFixed(1)} μg/m³`;
  }
};