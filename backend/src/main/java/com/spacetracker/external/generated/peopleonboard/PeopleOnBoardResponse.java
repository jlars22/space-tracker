package com.spacetracker.external.generated.peopleonboard;

import java.util.List;
import lombok.Data;

@Data
public class PeopleOnBoardResponse {

    int number;
    String message;
    List<PeopleItem> people;
}
