package com.spacetracker.service.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ISSLocationDto {

    private BigDecimal latitude;
    private BigDecimal longitude;
    private BigDecimal altitude;
    private BigDecimal velocity;
    private String visibility;
    private String country;
    private String timezone;
    private LocalDateTime timestamp;

    private ISSLocationDto() {}

    public static class Builder {

        private BigDecimal latitude;
        private BigDecimal longitude;
        private BigDecimal altitude;
        private BigDecimal velocity;
        private String visibility;
        private String country;
        private String timezone;
        private LocalDateTime timestamp;

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

        public ISSLocationDto build() {
            ISSLocationDto dto = new ISSLocationDto();
            dto.latitude = this.latitude;
            dto.longitude = this.longitude;
            dto.altitude = this.altitude;
            dto.velocity = this.velocity;
            dto.visibility = this.visibility;
            dto.country = this.country;
            dto.timezone = this.timezone;
            dto.timestamp = this.timestamp;
            return dto;
        }
    }
}
