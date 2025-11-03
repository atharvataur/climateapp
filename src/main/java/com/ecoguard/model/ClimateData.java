package com.ecoguard.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ClimateData {

    private String city;
    private Double temperature;
    private Integer aqi;
    private Double pm25;
    private Double pm10;
    private Double humidity;
    private Double windSpeed;
    private String status;
    private String lastUpdated;

    public ClimateData() {}

    public ClimateData(String city, Double temperature, Integer aqi, Double pm25, Double pm10,
                      Double humidity, Double windSpeed, String status, String lastUpdated) {
        this.city = city;
        this.temperature = temperature;
        this.aqi = aqi;
        this.pm25 = pm25;
        this.pm10 = pm10;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
        this.status = status;
        this.lastUpdated = lastUpdated;
    }

    // Getters and Setters
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public Integer getAqi() {
        return aqi;
    }

    public void setAqi(Integer aqi) {
        this.aqi = aqi;
    }

    public Double getPm25() {
        return pm25;
    }

    public void setPm25(Double pm25) {
        this.pm25 = pm25;
    }

    public Double getPm10() {
        return pm10;
    }

    public void setPm10(Double pm10) {
        this.pm10 = pm10;
    }

    public Double getHumidity() {
        return humidity;
    }

    public void setHumidity(Double humidity) {
        this.humidity = humidity;
    }

    public Double getWindSpeed() {
        return windSpeed;
    }

    public void setWindSpeed(Double windSpeed) {
        this.windSpeed = windSpeed;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(String lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public String getAqiStatus() {
        if (aqi == null) return "No Data";
        if (aqi <= 50) return "Good";
        if (aqi <= 100) return "Moderate";
        if (aqi <= 150) return "Unhealthy for Sensitive";
        if (aqi <= 200) return "Unhealthy";
        if (aqi <= 300) return "Very Unhealthy";
        return "Hazardous";
    }

    public String getAqiColor() {
        if (aqi == null) return "#cccccc";
        if (aqi <= 50) return "#00e400";      // Green
        if (aqi <= 100) return "#ffff00";     // Yellow
        if (aqi <= 150) return "#ff7e00";     // Orange
        if (aqi <= 200) return "#ff0000";     // Red
        if (aqi <= 300) return "#8f3f97";     // Purple
        return "#7e0023";                     // Maroon
    }
}