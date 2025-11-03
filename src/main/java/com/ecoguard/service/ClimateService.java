package com.ecoguard.service;

import com.ecoguard.model.ClimateData;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ClimateService {

    @Value("${climate.api.key:}")
    private String climateApiKey;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    // Cities to monitor as specified in planning
    private final String[] cities = {
        "Navi Mumbai", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"
    };

    public ClimateService(WebClient.Builder webClientBuilder, ObjectMapper objectMapper) {
        this.webClient = webClientBuilder.build();
        this.objectMapper = objectMapper;
    }

    public List<ClimateData> getAllCitiesClimateData() {
        List<ClimateData> climateDataList = new ArrayList<>();

        for (String city : cities) {
            try {
                ClimateData data = getCityClimateData(city);
                climateDataList.add(data);
            } catch (Exception e) {
                // Create placeholder data if API fails
                climateDataList.add(createPlaceholderData(city));
            }
        }

        return climateDataList;
    }

    public List<ClimateData> refreshClimateData() {
        return getAllCitiesClimateData();
    }

    private ClimateData getCityClimateData(String city) {
        try {
            // Try World Air Quality Index API first
            return fetchFromWAQI(city);
        } catch (Exception e) {
            try {
                // Fallback to OpenAQ
                return fetchFromOpenAQ(city);
            } catch (Exception e2) {
                // Final fallback to mock data
                return createMockData(city);
            }
        }
    }

    private ClimateData fetchFromWAQI(String city) throws Exception {
        String url = "https://api.waqi.info/feed/" + city.replace(" ", "%20") + "/?token=" + climateApiKey;

        if (climateApiKey == null || climateApiKey.isEmpty()) {
            throw new Exception("No API key configured");
        }

        String response = webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        JsonNode root = objectMapper.readTree(response);

        if (root.get("status").asText().equals("error")) {
            throw new Exception("API error: " + root.get("data").asText());
        }

        JsonNode data = root.get("data");
        JsonNode iaqi = data.get("iaqi");

        return new ClimateData(
            city,
            getTemperatureFromData(data),
            data.get("aqi").asInt(),
            getPMFromNode(iaqi.get("pm25")),
            getPMFromNode(iaqi.get("pm10")),
            getHumidityFromData(data),
            getWindSpeedFromData(data),
            "", // Will be calculated by getter
            LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
        );
    }

    private ClimateData fetchFromOpenAQ(String city) throws Exception {
        String url = "https://api.openaq.org/v1/latest?city=" + city.replace(" ", "%20");

        String response = webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        JsonNode root = objectMapper.readTree(response);
        JsonNode results = root.get("results");

        if (results.size() == 0) {
            throw new Exception("No data found for city: " + city);
        }

        JsonNode latest = results.get(0);
        JsonNode measurements = latest.get("measurements");

        return new ClimateData(
            city,
            null, // OpenAQ doesn't provide temperature
            null, // OpenAQ doesn't provide AQI directly
            getPMFromMeasurements(measurements, "pm25"),
            getPMFromMeasurements(measurements, "pm10"),
            null, // OpenAQ doesn't provide humidity
            null, // OpenAQ doesn't provide wind speed
            "Limited Data",
            LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
        );
    }

    private ClimateData createMockData(String city) {
        // Generate realistic mock data for demonstration
        return new ClimateData(
            city,
            25.0 + Math.random() * 15, // 25-40°C
            50 + (int)(Math.random() * 200), // AQI 50-250
            20.0 + Math.random() * 80, // PM2.5 20-100
            30.0 + Math.random() * 120, // PM10 30-150
            40.0 + Math.random() * 40, // Humidity 40-80%
            5.0 + Math.random() * 15, // Wind Speed 5-20 km/h
            "Mock Data",
            LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
        );
    }

    private ClimateData createPlaceholderData(String city) {
        return new ClimateData(
            city,
            null,
            null,
            null,
            null,
            null,
            null,
            "No Data",
            LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
        );
    }

    // Helper methods to extract data from JSON responses
    private Double getTemperatureFromData(JsonNode data) {
        JsonNode iaqi = data.get("iaqi");
        if (iaqi != null && iaqi.has("t")) {
            return iaqi.get("t").get("v").asDouble();
        }
        return null;
    }

    private Double getHumidityFromData(JsonNode data) {
        JsonNode iaqi = data.get("iaqi");
        if (iaqi != null && iaqi.has("h")) {
            return iaqi.get("h").get("v").asDouble();
        }
        return null;
    }

    private Double getWindSpeedFromData(JsonNode data) {
        JsonNode iaqi = data.get("iaqi");
        if (iaqi != null && iaqi.has("w")) {
            return iaqi.get("w").get("v").asDouble();
        }
        return null;
    }

    private Double getPMFromNode(JsonNode node) {
        if (node != null && node.has("v")) {
            return node.get("v").asDouble();
        }
        return null;
    }

    private Double getPMFromMeasurements(JsonNode measurements, String parameter) {
        for (JsonNode measurement : measurements) {
            if (measurement.get("parameter").asText().equals(parameter)) {
                return measurement.get("value").asDouble();
            }
        }
        return null;
    }
}