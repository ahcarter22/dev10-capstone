package warehouse.data.mappers;

import org.springframework.jdbc.core.RowMapper;
import warehouse.models.Item;
import warehouse.models.Vendor;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class VendorMapper implements RowMapper<Vendor> {
    @Override
    public Vendor mapRow(ResultSet resultSet, int i) throws SQLException {
        Vendor vendor = new Vendor();
        vendor.setVendorId(resultSet.getInt("vendor_id"));
        vendor.setName(resultSet.getString("vendor_name"));
        vendor.setEmail(resultSet.getString("vendor_email"));
        vendor.setPhone(resultSet.getString("vendor_phone"));
        /*
        if(resultSet.getString("item_list") != null) {
            String itemList = resultSet.getString("item_list");
            List<String> myList = new ArrayList<String>(Arrays.asList(itemList.split(",")));
            vendor.setItems(myList);
        }
        */
        return vendor;
    }
}
