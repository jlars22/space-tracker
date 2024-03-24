package com.spacetracker.controller;

import com.spacetracker.service.ISSLocationService;
import com.spacetracker.service.dto.ISSLocationDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/iss-location")
@RequiredArgsConstructor
public class ISSLocationController {

    private final ISSLocationService issLocationService;
    private final long KEEP_OPEN_INFINITE = -1L;

    @GetMapping("/saved")
    public List<ISSLocationDto> getCurrentISSLocation() {
        return issLocationService.getSavedLocations();
    }

    @GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribeToISSLocation() {
        SseEmitter emitter = new SseEmitter(KEEP_OPEN_INFINITE);
        issLocationService.subscribe(emitter);
        return emitter;
    }
}
