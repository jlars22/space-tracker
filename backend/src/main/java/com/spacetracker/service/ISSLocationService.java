package com.spacetracker.service;

import com.spacetracker.external.SpaceAPI;
import com.spacetracker.repository.ISSLocationRepository;
import com.spacetracker.service.dto.ISSLocationDto;
import java.time.LocalTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@RequiredArgsConstructor
public class ISSLocationService {

    private final ISSLocationRepository issLocationRepository;
    private final SpaceAPI spaceAPI;
    private SseEmitter liveEmitter;
    private SseEmitter savedEmitter;
    private ISSLocationDto latestLocation;

    public List<ISSLocationDto> getSavedLocations() {
        return issLocationRepository.fetchAll();
    }

    public void subscribeLive(SseEmitter emitter) {
        this.liveEmitter = emitter;
    }

    public void subscribeSaved(SseEmitter emitter) {
        this.savedEmitter = emitter;
    }

    @Scheduled(fixedRate = 5000)
    private void fetchAndSendLive() {
        System.out.println(LocalTime.now() + ": Fetching and sending ISS location");
        latestLocation = spaceAPI.getISSLocation();
        sendSseEvent(liveEmitter, latestLocation);
    }

    @Scheduled(fixedRate = 30000)
    private void saveAndSend() {
        System.out.println(LocalTime.now() + ": Saving ISS location");
        if (latestLocation != null) {
            issLocationRepository.insert(latestLocation);
            sendSseEvent(savedEmitter, latestLocation);
        }
    }

    private void sendSseEvent(SseEmitter emitter, ISSLocationDto dto) {
        if (emitter != null) {
            try {
                emitter.send(dto);
            } catch (Exception e) {
                emitter.completeWithError(e);
            }
        }
    }
}
