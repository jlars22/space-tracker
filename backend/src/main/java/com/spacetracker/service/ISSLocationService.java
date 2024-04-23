package com.spacetracker.service;

import com.spacetracker.external.SpaceAPI;
import com.spacetracker.repository.isslocation.ISSLocationRepository;
import com.spacetracker.service.dto.ISSLocationDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ISSLocationService {

    private final SpaceAPI spaceAPI;
    private final ISSLocationRepository issLocationRepository;

    public List<ISSLocationDto> getSavedLocations() {
        return issLocationRepository.fetchAll();
    }

    public ISSLocationDto fetchAndInsert() {
        return issLocationRepository.insert(spaceAPI.getISSLocation());
    }
}
