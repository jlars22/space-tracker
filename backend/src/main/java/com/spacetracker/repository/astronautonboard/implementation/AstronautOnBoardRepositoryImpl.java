package com.spacetracker.repository.astronautonboard.implementation;

import static com.generated.Tables.ASTRONAUT_ON_BOARD;

import com.spacetracker.repository.astronautonboard.AstronautOnBoardRepository;
import com.spacetracker.service.dto.AstronautOnBoardDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AstronautOnBoardRepositoryImpl implements AstronautOnBoardRepository {

    private final DSLContext dslContext;

    @Override
    public void insert(Integer locationId, String name) {
        dslContext
            .insertInto(ASTRONAUT_ON_BOARD)
            .set(ASTRONAUT_ON_BOARD.LOCATION_ID, locationId)
            .set(ASTRONAUT_ON_BOARD.NAME, name)
            .execute();
    }

    @Override
    public List<AstronautOnBoardDto> fetchAllByLocationId(Integer locationId) {
        return dslContext
            .selectFrom(ASTRONAUT_ON_BOARD)
            .where(ASTRONAUT_ON_BOARD.LOCATION_ID.eq(locationId))
            .fetchInto(AstronautOnBoardDto.class);
    }

    @Override
    public List<AstronautOnBoardDto> fetchAll() {
        return dslContext.selectFrom(ASTRONAUT_ON_BOARD).fetchInto(AstronautOnBoardDto.class);
    }
}
