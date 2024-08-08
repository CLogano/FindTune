package com.findtune.backend.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Constants class to hold application-wide constants.
 */
@Component
public class Constants {
    
    // Static variable to hold the frontend API URL
    public static String FRONTEND_API_URL;

    /**
     * Sets the frontend API URL from the application properties.
     *
     * @param frontendApiUrl the frontend API URL to be set.
     */
    @Value("${frontend.api.url}")
    public void setFrontendApiUrl(String frontendApiUrl) {
        FRONTEND_API_URL = frontendApiUrl;
    }
}
