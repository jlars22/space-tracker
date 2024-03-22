package com.spacetracker.controller;

import com.spacetracker.repository.ISSLocationRepository;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/insert")
@RequiredArgsConstructor
public class InsertJOOQController {

    private final ISSLocationRepository issLocationRepository;

    @GetMapping("/isslocation")
    public void insertISSLocation() {
        issLocationRepository.insert(
            new BigDecimal("51.5074"),
            new BigDecimal("0.1278"),
            new BigDecimal("408"),
            new BigDecimal("27600"),
            "daylight",
            LocalDateTime.now()
        );
    }
}
