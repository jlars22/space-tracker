package com.spacetracker.repository.isslocation;

import com.spacetracker.service.dto.ISSLocationDto;
import java.util.List;

public interface ISSLocationRepository {
    ISSLocationDto insert(ISSLocationDto issLocationDto);
    List<ISSLocationDto> fetchAll();
}
