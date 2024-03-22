package com.spacetracker.util;

import org.springframework.web.client.RestTemplate;

public class HttpClient {

    private static final RestTemplate restTemplate = new RestTemplate();

    public static String get(String url) {
        return restTemplate.getForObject(url, String.class);
    }
}
