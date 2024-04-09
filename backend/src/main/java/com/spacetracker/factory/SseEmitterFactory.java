package com.spacetracker.factory;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface SseEmitterFactory {
    SseEmitter create();
}
