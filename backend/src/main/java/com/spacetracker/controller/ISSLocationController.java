package com.spacetracker.controller;

import com.spacetracker.factory.SseEmitterFactory;
import com.spacetracker.service.ISSLocationService;
import com.spacetracker.service.dto.ISSLocationDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/iss-location")
@RequiredArgsConstructor
public class ISSLocationController {

    private final ISSLocationService issLocationService;
    private final SseEmitterFactory sseEmitterFactory;

    @GetMapping("/saved")
    public List<ISSLocationDto> getCurrentISSLocation() {
        return issLocationService.getSavedLocations();
    }

    @GetMapping("/subscribe/saved")
    public SseEmitter subscribeToSavedISSLocations() {
        SseEmitter emitter = sseEmitterFactory.create();
        issLocationService.subscribeSaved(emitter);
        return emitter;
    }

    @GetMapping(value = "/subscribe/live")
    public SseEmitter subscribeToISSLocation() {
        SseEmitter emitter = sseEmitterFactory.create();
        issLocationService.subscribeLive(emitter);
        return emitter;
    }
}
