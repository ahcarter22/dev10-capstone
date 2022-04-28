package warehouse.data.mappers;

import org.springframework.jdbc.core.RowMapper;
import warehouse.models.Vendor;

import java.sql.ResultSet;
import java.sql.SQLException;

public class VendorMapper implements RowMapper<Vendor> {
    @Override
    public Vendor mapRow(ResultSet resultSet, int i) throws SQLException {
        Vendor vendor = new Vendor();
        vendor.setVendorId(resultSet.getInt("vendor_id"));
        vendor.setName(resultSet.getString("vendor_name"));
        vendor.setEmail(resultSet.getString("vendor_email"));
        vendor.setPhone(resultSet.getString("vendor_phone"));
        return vendor;
    }
}
