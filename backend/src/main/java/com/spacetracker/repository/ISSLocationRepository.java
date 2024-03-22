package com.spacetracker.repository;

import lombok.RequiredArgsConstructor;
import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static com.generated.Tables.ISS_LOCATION;

@Repository
@RequiredArgsConstructor
public class ISSLocationRepository {

    private final DSLContext dslContext;

    public void insert(BigDecimal latitude, BigDecimal longitude, BigDecimal altitude, BigDecimal velocity, String visibility, LocalDateTime timestamp) {
        dslContext.insertInto(ISS_LOCATION)
                .set(ISS_LOCATION.LATITUDE, latitude)
                .set(ISS_LOCATION.LONGITUDE, longitude)
                .set(ISS_LOCATION.ALTITUDE, altitude)
                .set(ISS_LOCATION.VELOCITY, velocity)
                .set(ISS_LOCATION.VISIBILITY, visibility)
                .set(ISS_LOCATION.TIMESTAMP, timestamp)
                .execute();
    }
}
