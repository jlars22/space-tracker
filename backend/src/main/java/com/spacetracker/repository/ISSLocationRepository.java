package com.spacetracker.repository;

import com.spacetracker.service.dto.ISSLocationDto;
import java.util.List;

public interface ISSLocationRepository {
    void insert(ISSLocationDto issLocationDto);
    List<ISSLocationDto> fetchAll();
}
