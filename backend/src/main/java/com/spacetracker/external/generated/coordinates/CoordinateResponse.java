package com.spacetracker.external.generated.coordinates;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CoordinateResponse {

    @JsonProperty("country_code")
    private String countryCode;

    private int offset;
    private String latitude;

    @JsonProperty("timezone_id")
    private String timezoneId;

    @JsonProperty("map_url")
    private String mapUrl;

    private String longitude;
}
