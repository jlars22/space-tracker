package com.spacetracker.external;

import com.spacetracker.service.dto.ISSLocationDto;

public interface SpaceAPI {
    ISSLocationDto getISSLocation();
    // TODO PeopleOnBoardDto getPeopleInSpace();
}
