package com.spacetracker.repository.astronautonboard;

import com.spacetracker.service.dto.AstronautOnBoardDto;
import java.util.List;

public interface AstronautOnBoardRepository {
    void insert(Integer locationId, String name);
    List<AstronautOnBoardDto> fetchAllByLocationId(Integer locationId);
    List<AstronautOnBoardDto> fetchAll();
}
