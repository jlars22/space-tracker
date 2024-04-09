package com.spacetracker.service;

import static com.spacetracker.service.EventPublisher.EventType.ISS_LOCATION_LIVE;
import static com.spacetracker.service.EventPublisher.EventType.ISS_LOCATION_SAVED;

import com.spacetracker.external.SpaceAPI;
import com.spacetracker.repository.ISSLocationRepository;
import com.spacetracker.service.dto.ISSLocationDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ISSLocationService {

    private final ISSLocationRepository issLocationRepository;
    private final SpaceAPI spaceAPI;
    private final EventPublisher eventPublisher;
    private ISSLocationDto latestLocation;

    public List<ISSLocationDto> getSavedLocations() {
        return issLocationRepository.fetchAll();
    }

    @Scheduled(fixedRate = 5000)
    private void fetchAndSendLive() {
        latestLocation = spaceAPI.getISSLocation();
        eventPublisher.notifySubscribers(ISS_LOCATION_LIVE, latestLocation);
    }

    @Scheduled(fixedRate = 30000)
    private void saveAndSend() {
        if (latestLocation != null) {
            issLocationRepository.insert(latestLocation);
            eventPublisher.notifySubscribers(ISS_LOCATION_SAVED, latestLocation);
        }
    }
}
