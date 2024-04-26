package com.spacetracker.repository.astronautonboard.implementation;

import static com.generated.Tables.ASTRONAUT_ON_BOARD;

import com.generated.tables.records.AstronautOnBoardRecord;
import com.spacetracker.repository.astronautonboard.AstronautOnBoardRepository;
import com.spacetracker.service.dto.AstronautOnBoardDto;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AstronautOnBoardRepositoryImpl implements AstronautOnBoardRepository {

    private final DSLContext dslContext;

    @Override
    public void batchInsert(List<AstronautOnBoardDto> dtos) {
        List<AstronautOnBoardRecord> records = dtos
            .stream()
            .map(dto -> {
                AstronautOnBoardRecord record = dslContext.newRecord(ASTRONAUT_ON_BOARD);
                record.setLocationId(dto.getLocationId());
                record.setName(dto.getName());
                return record;
            })
            .collect(Collectors.toList());

        dslContext.batchInsert(records).execute();
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
