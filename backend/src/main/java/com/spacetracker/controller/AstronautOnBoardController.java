package com.spacetracker.controller;

import com.spacetracker.service.AstronautOnBoardService;
import com.spacetracker.service.dto.AstronautOnBoardDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/astronaut-on-board")
@RequiredArgsConstructor
public class AstronautOnBoardController {

    private final AstronautOnBoardService astronautOnBoardService;

    @GetMapping
    public List<AstronautOnBoardDto> getAstronautsOnBoard() {
        return astronautOnBoardService.getSavedAstronautsOnBoard();
    }

    @GetMapping("/{locationId}")
    public List<AstronautOnBoardDto> getAstronautsOnBoardByLocationId(
        @PathVariable String locationId
    ) {
        return astronautOnBoardService.getSavedAstronautsOnBoardByLocationId(
            Integer.valueOf(locationId)
        );
    }
}
