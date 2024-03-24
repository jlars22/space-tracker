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
    private SseEmitter emitter;
    private ISSLocationDto latestLocation;

    public List<ISSLocationDto> getSavedLocations() {
        return issLocationRepository.fetchAll();
    }

    public void subscribe(SseEmitter emitter) {
        this.emitter = emitter;
    }

    @Scheduled(fixedRate = 5000)
    private void fetchAndSend() {
        System.out.println(LocalTime.now() + ": Fetching and sending ISS location");
        latestLocation = spaceAPI.getISSLocation();
        sendSseEvent(latestLocation);
    }

    @Scheduled(fixedRate = 30000)
    private void insert() {
        System.out.println(LocalTime.now() + ": Saving ISS location");
        if (latestLocation != null) {
            issLocationRepository.insert(latestLocation);
        }
    }

    private void sendSseEvent(ISSLocationDto dto) {
        if (emitter != null) {
            try {
                emitter.send(dto);
            } catch (Exception e) {
                emitter.completeWithError(e);
            }
        }
    }
}
