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

        return getIssLocationDto(response);
    }

    private ISSLocationDto getIssLocationDto(SatelitteDataResponse response) {
        CoordinateResponse coordinateResponse = getCountryAndTimezone(
            response.getLatitude(),
            response.getLongitude()
        );

        return new ISSLocationDto.Builder()
            .latitude(response.getLatitude())
            .longitude(response.getLongitude())
            .altitude(response.getAltitude())
            .velocity(response.getVelocity())
            .visibility(response.getVisibility())
            .country(coordinateResponse.getCountryCode())
            .timezone(coordinateResponse.getTimezoneId())
            .timestamp(
                LocalDateTime.ofInstant(
                    Instant.ofEpochSecond(response.getTimestamp()),
                    ZoneId.systemDefault()
                )
            )
            .build();
    }

    private CoordinateResponse getCountryAndTimezone(BigDecimal latitude, BigDecimal longitude) {
        return JsonParser.parse(
            HttpClient.get(whereTheISSAtBaseUrl + "/coordinates/" + latitude + "," + longitude),
            CoordinateResponse.class
        );
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
