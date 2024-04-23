package com.spacetracker.repository.isslocation.implementation;

import static com.generated.Tables.ISS_LOCATION;

import com.spacetracker.repository.isslocation.ISSLocationRepository;
import com.spacetracker.service.dto.ISSLocationDto;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ISSLocationRepositoryImpl implements ISSLocationRepository {

    private final DSLContext dslContext;

    @Override
    public ISSLocationDto insert(ISSLocationDto issLocationDto) {
        return dslContext
            .insertInto(ISS_LOCATION)
            .set(ISS_LOCATION.LATITUDE, issLocationDto.getLatitude())
            .set(ISS_LOCATION.LONGITUDE, issLocationDto.getLongitude())
            .set(ISS_LOCATION.ALTITUDE, issLocationDto.getAltitude())
            .set(ISS_LOCATION.VELOCITY, issLocationDto.getVelocity())
            .set(ISS_LOCATION.VISIBILITY, issLocationDto.getVisibility())
            .set(ISS_LOCATION.COUNTRY, issLocationDto.getCountry())
            .set(ISS_LOCATION.TIMEZONE, issLocationDto.getTimezone())
            .set(ISS_LOCATION.TIMESTAMP, LocalDateTime.now())
            .returning()
            .fetchOne()
            .into(ISSLocationDto.class);
    }

    @Override
    public List<ISSLocationDto> fetchAll() {
        return dslContext.selectFrom(ISS_LOCATION).fetchInto(ISSLocationDto.class);
    }
}
