package com.spacetracker.controller;

import static com.spacetracker.service.EventPublisher.EventType.ISS_INFORMATION_LIVE;

import com.spacetracker.factory.SseEmitterFactory;
import com.spacetracker.service.EventPublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/iss-information")
@RequiredArgsConstructor
public class ISSInformationController {

    private final SseEmitterFactory sseEmitterFactory;
    private final EventPublisher eventPublisher;

    @GetMapping("/stream")
    public SseEmitter getCurrentISSInformation() {
        SseEmitter emitter = sseEmitterFactory.create();
        eventPublisher.subscribe(ISS_INFORMATION_LIVE, emitter);
        return emitter;
    }
}
