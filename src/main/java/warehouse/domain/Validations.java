package warehouse.domain;

import java.time.LocalDate;

public class Validations {

    public static boolean isNullOrBlank(String value) {
        return value == null || value.isBlank();
    }

    public static boolean isNull(Integer quantity) {
        return quantity == null;
    }

    public static boolean isNull(LocalDate date) {
        return date == null;
    }
}
