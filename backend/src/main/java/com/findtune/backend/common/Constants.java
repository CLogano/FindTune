package com.findtune.backend.common;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Constants class to hold application-wide constants.
 */
@Component
public class Constants {

    private final String frontendApiUrl;

    /**
     * Constructor to set the frontend API URL from the application properties.
     *
     * @param frontendApiUrl the frontend API URL to be set.
     */
    public Constants(@Value("${frontend.api.url}") String frontendApiUrl) {
        this.frontendApiUrl = frontendApiUrl;
    }

    public String getFrontendApiUrl() {
        return frontendApiUrl;
    }
}