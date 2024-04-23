package com.spacetracker.service.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;

@Getter
public class ISSInformationDto {

    private BigDecimal latitude;
    private BigDecimal longitude;
    private BigDecimal altitude;
    private BigDecimal velocity;
    private String visibility;
    private String country;
    private String timezone;
    private LocalDateTime timestamp;
    private List<AstronautOnBoardDto> astronauts;

    private ISSInformationDto() {}

    public static class Builder {

        private BigDecimal latitude;
        private BigDecimal longitude;
        private BigDecimal altitude;
        private BigDecimal velocity;
        private String visibility;
        private String country;
        private String timezone;
        private LocalDateTime timestamp;
        private List<AstronautOnBoardDto> astronauts;

        public Builder latitude(BigDecimal latitude) {
            this.latitude = latitude;
            return this;
        }

        public Builder longitude(BigDecimal longitude) {
            this.longitude = longitude;
            return this;
        }

        public Builder altitude(BigDecimal altitude) {
            this.altitude = altitude;
            return this;
        }

        public Builder velocity(BigDecimal velocity) {
            this.velocity = velocity;
            return this;
        }

        public Builder visibility(String visibility) {
            this.visibility = visibility;
            return this;
        }

        public Builder country(String country) {
            this.country = country;
            return this;
        }

        public Builder timezone(String timezone) {
            this.timezone = timezone;
            return this;
        }

        public Builder timestamp(LocalDateTime timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public Builder astronauts(List<AstronautOnBoardDto> astronauts) {
            this.astronauts = astronauts;
            return this;
        }

        public ISSInformationDto build() {
            ISSInformationDto issInformationDto = new ISSInformationDto();
            issInformationDto.latitude = this.latitude;
            issInformationDto.longitude = this.longitude;
            issInformationDto.altitude = this.altitude;
            issInformationDto.velocity = this.velocity;
            issInformationDto.visibility = this.visibility;
            issInformationDto.country = this.country;
            issInformationDto.timezone = this.timezone;
            issInformationDto.timestamp = this.timestamp;
            issInformationDto.astronauts = this.astronauts;
            return issInformationDto;
        }
    }
}
