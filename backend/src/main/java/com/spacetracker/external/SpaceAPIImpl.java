package com.spacetracker.external;

import com.spacetracker.external.generated.coordinates.CoordinateResponse;
import com.spacetracker.external.generated.satelittedata.SatelitteDataResponse;
import com.spacetracker.external.generated.satelittes.SatelitteResponse;
import com.spacetracker.service.dto.ISSLocationDto;
import com.spacetracker.util.HttpClient;
import com.spacetracker.util.JsonParser;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class SpaceAPIImpl implements SpaceAPI {

    private final String whereTheISSAtBaseUrl = "https://api.wheretheiss.at/v1";

    @Override
    public ISSLocationDto getISSLocation() {
        String json = HttpClient.get(whereTheISSAtBaseUrl + "/satellites/" + getISSId());
        SatelitteDataResponse response = JsonParser.parse(json, SatelitteDataResponse.class);

        ISSLocationDto dto = new ISSLocationDto(
            response.getLatitude(),
            response.getLongitude(),
            response.getAltitude(),
            response.getVelocity(),
            response.getVisibility(),
            null,
            null,
            LocalDateTime.ofInstant(
                Instant.ofEpochSecond(response.getTimestamp()),
                ZoneId.systemDefault()
            )
        );
        setCountryAndTimezone(dto.getLatitude(), dto.getLongitude(), dto);
        return dto;
    }

    private void setCountryAndTimezone(
        BigDecimal latitude,
        BigDecimal longitude,
        ISSLocationDto dto
    ) {
        CoordinateResponse response = JsonParser.parse(
            HttpClient.get(whereTheISSAtBaseUrl + "/coordinates/" + latitude + "," + longitude),
            CoordinateResponse.class
        );
        dto.setTimezone(response.getTimezoneId());
        dto.setCountry(response.getCountryCode());
    }

    private int getISSId() {
        List<SatelitteResponse> responseList = JsonParser.parseList(
            HttpClient.get(whereTheISSAtBaseUrl + "/satellites"),
            SatelitteResponse.class
        );
        return responseList
            .stream()
            .filter(satellite -> "iss".equals(satellite.getName()))
            .findFirst()
            .map(SatelitteResponse::getId)
            .orElseThrow(() -> new RuntimeException("Satellite with name 'iss' not found"));
    }
}
