package com.spacetracker.service;

import static com.spacetracker.service.EventPublisher.EventType.ISS_INFORMATION_LIVE;

import com.spacetracker.service.dto.AstronautOnBoardDto;
import com.spacetracker.service.dto.ISSInformationDto;
import com.spacetracker.service.dto.ISSLocationDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ISSInformationService {

    private final ISSLocationService issLocationService;
    private final AstronautOnBoardService astronautOnBoardService;
    private final EventPublisher eventPublisher;

    @Scheduled(fixedRate = 10000)
    public void getCurrentISSInformation() {
        ISSLocationDto issLocationDto = issLocationService.fetchAndInsert();
        List<AstronautOnBoardDto> astronautOnBoardDto = astronautOnBoardService.fetchAndInsert(
            issLocationDto.getId()
        );

        ISSInformationDto dto = new ISSInformationDto.Builder()
            .latitude(issLocationDto.getLatitude())
            .longitude(issLocationDto.getLongitude())
            .altitude(issLocationDto.getAltitude())
            .velocity(issLocationDto.getVelocity())
            .visibility(issLocationDto.getVisibility())
            .country(issLocationDto.getCountry())
            .timezone(issLocationDto.getTimezone())
            .timestamp(issLocationDto.getTimestamp())
            .astronauts(astronautOnBoardDto)
            .build();

        eventPublisher.notifySubscribers(ISS_INFORMATION_LIVE, dto);
    }
}
