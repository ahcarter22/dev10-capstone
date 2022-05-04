package warehouse.data.mappers;

import org.springframework.jdbc.core.RowMapper;
import warehouse.models.Category;
import warehouse.models.Item;
import warehouse.models.Vendor;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;

public class ItemMapper implements RowMapper<Item> {
    @Override
    public Item mapRow(ResultSet resultSet, int i) throws SQLException {
        Item item = new Item();
        item.setItemId(resultSet.getInt("item_id"));
        item.setName(resultSet.getString("item_name"));
        item.setQuantity(resultSet.getInt("quantity"));
        item.setScale(resultSet.getString("scale"));

        if (resultSet.getDate("expiration_date") != null) {
            item.setExpirationDate(resultSet.getDate("expiration_date").toLocalDate());
        }
        item.setImage(resultSet.getString("image"));

        item.setVendorId(resultSet.getInt("vendor_id"));
        item.setCategoryId(resultSet.getInt("category_id"));

        return item;
    }
}
