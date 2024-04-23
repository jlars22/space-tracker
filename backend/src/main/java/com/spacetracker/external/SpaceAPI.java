package com.spacetracker.external;

import com.spacetracker.service.dto.AstronautOnBoardDto;
import com.spacetracker.service.dto.ISSLocationDto;
import java.util.List;

public interface SpaceAPI {
    ISSLocationDto getISSLocation();
    List<AstronautOnBoardDto> getAstronautsOnBoard(Integer locationId);
}
