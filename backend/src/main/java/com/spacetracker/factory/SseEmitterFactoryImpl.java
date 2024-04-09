package com.spacetracker.factory;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Component
public class SseEmitterFactoryImpl implements SseEmitterFactory {

    private final long KEEP_OPEN_INFINITE = -1L;

    @Override
    public SseEmitter create() {
        return new SseEmitter(KEEP_OPEN_INFINITE);
    }
}
