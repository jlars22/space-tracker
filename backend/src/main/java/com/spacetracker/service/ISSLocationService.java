package com.spacetracker.service;

import com.spacetracker.external.SpaceAPI;
import com.spacetracker.repository.ISSLocationRepository;
import com.spacetracker.service.dto.ISSLocationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ISSLocationService {

    private final ISSLocationRepository issLocationRepository;
    private final SpaceAPI spaceAPI;

    public ISSLocationDto getCurrentISSLocation() {
        return spaceAPI.getISSLocation();
    }
}
