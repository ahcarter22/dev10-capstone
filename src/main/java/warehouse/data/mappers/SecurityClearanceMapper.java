package warehouse.data.mappers;

import org.springframework.jdbc.core.RowMapper;
import warehouse.models.SecurityClearance;

import java.sql.ResultSet;
import java.sql.SQLException;

public class SecurityClearanceMapper implements RowMapper<SecurityClearance> {

    @Override
    public SecurityClearance mapRow(ResultSet resultSet, int i) throws SQLException {
        SecurityClearance securityClearance = new SecurityClearance();
        securityClearance.setSecurityClearanceId(resultSet.getInt("security_clearance_id"));
        securityClearance.setName(resultSet.getString("security_clearance_name"));
        return securityClearance;
    }
}
