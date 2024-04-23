package com.spacetracker.service.dto;

import lombok.Getter;

@Getter
public class AstronautOnBoardDto {

    private Integer id;
    private Integer locationId;
    private String name;

    private AstronautOnBoardDto() {}

    public static class Builder {

        private Integer id;
        private Integer locationId;
        private String name;

        public Builder id(Integer id) {
            this.id = id;
            return this;
        }

        public Builder locationId(Integer locationId) {
            this.locationId = locationId;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public AstronautOnBoardDto build() {
            AstronautOnBoardDto astronautOnBoardDto = new AstronautOnBoardDto();
            astronautOnBoardDto.id = this.id;
            astronautOnBoardDto.locationId = this.locationId;
            astronautOnBoardDto.name = this.name;
            return astronautOnBoardDto;
        }
    }
}
