package com.spacetracker.service;

import com.spacetracker.external.SpaceAPI;
import com.spacetracker.repository.astronautonboard.AstronautOnBoardRepository;
import com.spacetracker.service.dto.AstronautOnBoardDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AstronautOnBoardService {

    private final SpaceAPI spaceAPI;
    private final AstronautOnBoardRepository astronautOnBoardRepository;

    public List<AstronautOnBoardDto> getSavedAstronautsOnBoardByLocationId(Integer locationId) {
        return astronautOnBoardRepository.fetchAllByLocationId(locationId);
    }

    public List<AstronautOnBoardDto> getSavedAstronautsOnBoard() {
        return astronautOnBoardRepository.fetchAll();
    }

    public List<AstronautOnBoardDto> fetchAndInsert(Integer locationId) {
        List<AstronautOnBoardDto> astronautsOnBoard = spaceAPI.getAstronautsOnBoard(locationId);
        astronautsOnBoard.forEach(astronaut ->
            astronautOnBoardRepository.insert(locationId, astronaut.getName())
        );
        return astronautsOnBoard;
    }
}
