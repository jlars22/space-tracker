package com.spacetracker.external.implementation;

import com.spacetracker.external.SpaceAPI;
import com.spacetracker.external.generated.coordinates.CoordinateResponse;
import com.spacetracker.external.generated.peopleonboard.PeopleItem;
import com.spacetracker.external.generated.peopleonboard.PeopleOnBoardResponse;
import com.spacetracker.external.generated.satelittedata.SatelitteDataResponse;
import com.spacetracker.external.generated.satelittes.SatelitteResponse;
import com.spacetracker.service.dto.AstronautOnBoardDto;
import com.spacetracker.service.dto.ISSLocationDto;
import com.spacetracker.util.HttpClient;
import com.spacetracker.util.JsonParser;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class SpaceAPIImpl implements SpaceAPI {

    private final String whereTheISSAtBaseUrl = "https://api.wheretheiss.at/v1";
    private final String astroBaseUrl = "http://api.open-notify.org/astros.json";
    private Integer issId;

    @Override
    public ISSLocationDto getISSLocation() {
        String json = HttpClient.get(whereTheISSAtBaseUrl + "/satellites/" + getISSId());
        SatelitteDataResponse response = JsonParser.parse(json, SatelitteDataResponse.class);

        return getIssLocationDto(response);
    }

    @Override
    public List<AstronautOnBoardDto> getAstronautsOnBoard(Integer locationId) {
        String json = HttpClient.get(astroBaseUrl);
        PeopleOnBoardResponse response = JsonParser.parse(json, PeopleOnBoardResponse.class);

        return getAstronautOnBoardDtos(response, locationId);
    }

    private List<AstronautOnBoardDto> getAstronautOnBoardDtos(
        PeopleOnBoardResponse response,
        Integer locationId
    ) {
        List<AstronautOnBoardDto> dtos = new ArrayList<>();
        for (PeopleItem item : response.getPeople()) {
            dtos.add(
                new AstronautOnBoardDto.Builder()
                    .name(item.getName())
                    .locationId(locationId)
                    .build()
            );
        }
        return dtos;
    }

    private ISSLocationDto getIssLocationDto(SatelitteDataResponse response) {
        CoordinateResponse coordinateResponse = getCountryAndTimezone(
            response.getLatitude(),
            response.getLongitude()
        );

        return new ISSLocationDto.Builder()
            .latitude(response.getLatitude().setScale(1, RoundingMode.DOWN))
            .longitude(response.getLongitude().setScale(1, RoundingMode.DOWN))
            .altitude(response.getAltitude().setScale(1, RoundingMode.DOWN))
            .velocity(response.getVelocity().setScale(1, RoundingMode.DOWN))
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
        if (issId == null) {
            System.out.println("Making HTTP call");
            List<SatelitteResponse> responseList = JsonParser.parseList(
                HttpClient.get(whereTheISSAtBaseUrl + "/satellites"),
                SatelitteResponse.class
            );
            issId =
            responseList
                .stream()
                .filter(satellite -> "iss".equals(satellite.getName()))
                .findFirst()
                .map(SatelitteResponse::getId)
                .orElseThrow(() -> new RuntimeException("Satellite with name 'iss' not found"));
        }
        return issId;
    }
}
