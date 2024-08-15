package com.findtune.backend.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.findtune.backend.services.FilterService;

@RestController
@CrossOrigin(origins = "${frontend.api.url}")
@RequestMapping("/api/filters")
public class FilterController {

    @Autowired
    private FilterService filterService;

    @GetMapping("/genres")
    @ResponseBody
    public JsonNode getAvailableGenres(@RequestHeader("Authorization") String authorization)
            throws IOException, InterruptedException {
        try {
            String accessToken = authorization.substring("Bearer ".length());
            return filterService.getAvailableGenres(accessToken);
        } catch (IOException | InterruptedException e) {
            System.out.println("Method: getAvailableGenres | Error: " + e.getMessage());
            throw e;
        }
    }

    @GetMapping("/markets")
    @ResponseBody
    public JsonNode getAvailableMarkets(@RequestHeader("Authorization") String authorization)
            throws IOException, InterruptedException {
        try {
            String accessToken = authorization.substring("Bearer ".length());
            return filterService.getAvailableMarkets(accessToken);
        } catch (IOException | InterruptedException e) {
            System.out.println("Method: getAvailableMarkets | Error: " + e.getMessage());
            throw e;
        }
    }

    @GetMapping("/artists")
    @ResponseBody
    public JsonNode searchArtists(@RequestHeader("Authorization") String authorization,
            @RequestParam("query") String query) throws IOException, InterruptedException {
        try {
            String accessToken = authorization.substring("Bearer ".length());
            return filterService.searchArtists(accessToken, query);
        } catch (IOException | InterruptedException e) {
            System.out.println("Method: searchArtists | Error: " + e.getMessage());
            throw e;
        }
    }

    @GetMapping("/tracks")
    @ResponseBody
    public JsonNode searchTracks(@RequestHeader("Authorization") String authorization,
            @RequestParam("query") String query) throws IOException, InterruptedException {
        try {
            String accessToken = authorization.substring("Bearer ".length());
            return filterService.searchTracks(accessToken, query);
        } catch (IOException | InterruptedException e) {
            System.out.println("Method: searchTracks | Error: " + e.getMessage());
            throw e;
        }
    }
}