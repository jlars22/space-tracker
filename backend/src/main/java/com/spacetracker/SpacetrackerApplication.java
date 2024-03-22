package com.spacetracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SpacetrackerApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpacetrackerApplication.class, args);
    }
}
