package com.spacetracker.repository.astronautonboard;

import com.spacetracker.service.dto.AstronautOnBoardDto;
import java.util.List;

public interface AstronautOnBoardRepository {
    void batchInsert(List<AstronautOnBoardDto> dtos);
    List<AstronautOnBoardDto> fetchAllByLocationId(Integer locationId);
    List<AstronautOnBoardDto> fetchAll();
}
