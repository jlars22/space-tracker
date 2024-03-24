package com.spacetracker.service;

import com.spacetracker.external.SpaceAPI;
import com.spacetracker.repository.ISSLocationRepository;
import com.spacetracker.service.dto.ISSLocationDto;
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

    public List<ISSLocationDto> getSavedLocations() {
        return issLocationRepository.fetchAll();
    }

    public void subscribe(SseEmitter emitter) {
        this.emitter = emitter;
    }

    @Scheduled(fixedRate = 60000)
    private void insert() {
        System.out.println("Inserting ISS location");
        ISSLocationDto dto = spaceAPI.getISSLocation();
        issLocationRepository.insert(dto);

        sendSseEvent(dto);
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
