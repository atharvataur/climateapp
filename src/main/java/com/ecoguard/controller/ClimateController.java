package com.ecoguard.controller;

import com.ecoguard.model.ClimateData;
import com.ecoguard.service.ClimateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/climate")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ClimateController {

    @Autowired
    private ClimateService climateService;

    @GetMapping("/cities")
    public ResponseEntity<?> getAllCitiesClimateData() {
        try {
            List<ClimateData> data = climateService.getAllCitiesClimateData();

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", data);
            response.put("count", data.size());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", "Failed to fetch climate data: " + e.getMessage());

            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshClimateData() {
        try {
            List<ClimateData> data = climateService.refreshClimateData();

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Climate data refreshed successfully");
            response.put("data", data);
            response.put("count", data.size());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", "Failed to refresh climate data: " + e.getMessage());

            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping("/cities/{city}")
    public ResponseEntity<?> getCityClimateData(@PathVariable String city) {
        try {
            List<ClimateData> allData = climateService.getAllCitiesClimateData();

            ClimateData cityData = allData.stream()
                    .filter(data -> data.getCity().equalsIgnoreCase(city))
                    .findFirst()
                    .orElse(null);

            if (cityData == null) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("error", "City not found: " + city);

                return ResponseEntity.status(404).body(response);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", cityData);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", "Failed to fetch city data: " + e.getMessage());

            return ResponseEntity.status(500).body(response);
        }
    }
}