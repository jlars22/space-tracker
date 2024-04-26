package com.spacetracker.controller;

import com.spacetracker.service.ISSLocationService;
import com.spacetracker.service.dto.ISSLocationDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/iss-location")
@RequiredArgsConstructor
public class ISSLocationController {

    private final ISSLocationService issLocationService;

    @GetMapping
    public List<ISSLocationDto> getSavedLocations() {
        return issLocationService.getSavedLocations();
    }
}
