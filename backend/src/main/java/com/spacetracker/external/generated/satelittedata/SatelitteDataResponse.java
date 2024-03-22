package com.spacetracker.external.generated.satelittedata;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;
import lombok.Data;

@Data
public class SatelitteDataResponse {

    private BigDecimal altitude;
    private String visibility;
    private BigDecimal latitude;
    private BigDecimal velocity;
    private String units;
    private BigDecimal footprint;

    @JsonProperty("solar_lon")
    private BigDecimal solarLon;

    private String name;
    private int id;

    @JsonProperty("solar_lat")
    private BigDecimal solarLat;

    private BigDecimal daynum;
    private BigDecimal longitude;
    private int timestamp;
}
