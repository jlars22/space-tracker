package com.spacetracker.controller;

import static com.spacetracker.service.EventPublisher.EventType.ISS_LOCATION_LIVE;
import static com.spacetracker.service.EventPublisher.EventType.ISS_LOCATION_SAVED;

import com.spacetracker.factory.SseEmitterFactory;
import com.spacetracker.service.EventPublisher;
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
    private final EventPublisher eventPublisher;

    @GetMapping("/saved")
    public List<ISSLocationDto> getCurrentISSLocation() {
        return issLocationService.getSavedLocations();
    }

    @GetMapping("/subscribe/saved")
    public SseEmitter subscribeToSavedISSLocations() {
        SseEmitter emitter = sseEmitterFactory.create();
        eventPublisher.subscribe(ISS_LOCATION_SAVED, emitter);
        return emitter;
    }

    @GetMapping(value = "/subscribe/live")
    public SseEmitter subscribeToISSLocation() {
        SseEmitter emitter = sseEmitterFactory.create();
        eventPublisher.subscribe(ISS_LOCATION_LIVE, emitter);
        return emitter;
    }
}
