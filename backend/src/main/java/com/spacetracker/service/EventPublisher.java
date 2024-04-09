package com.spacetracker.service;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Component
public class EventPublisher {

    public enum EventType {
        ISS_LOCATION_SAVED,
        ISS_LOCATION_LIVE,
    }

    private final Map<EventType, List<SseEmitter>> subscribers = new EnumMap<>(EventType.class);

    public void subscribe(EventType event, SseEmitter emitter) {
        subscribers.computeIfAbsent(event, k -> new ArrayList<>()).add(emitter);
        addCompletionCallback(emitter, subscribers.get(event));
    }

    public void notifySubscribers(EventType event, Object data) {
        List<SseEmitter> emitters = subscribers.get(event);
        if (emitters != null) {
            for (SseEmitter emitter : emitters) {
                sendEvent(emitter, data);
            }
        }
    }

    private void sendEvent(SseEmitter emitter, Object data) {
        try {
            emitter.send(data);
        } catch (Exception e) {
            emitter.completeWithError(e);
        }
    }

    private void addCompletionCallback(SseEmitter emitter, List<SseEmitter> subscriberList) {
        emitter.onCompletion(() -> {
            subscriberList.remove(emitter);
        });
    }
}
