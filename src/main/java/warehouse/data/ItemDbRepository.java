package warehouse.data;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import warehouse.data.mappers.ItemMapper;
import warehouse.data.mappers.VendorMapper;
import warehouse.models.Item;
import warehouse.models.Vendor;
import java.util.List;

@Repository
public class ItemDbRepository implements ItemRepository{
    private final JdbcTemplate jdbcTemplate;

    public ItemDbRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate=jdbcTemplate;
    }

    @Override
    public List<Item> findAll() {
        final String sql = "select item_id, item_name, quantity, scale, vendor_id, category_id from item;";
        return jdbcTemplate.query(sql, new ItemMapper());
    }

    @Override
    public Item findById(int itemId) {
        final String sql = "select * from item where item_id = ?;";
        Item result = jdbcTemplate.query(sql,new ItemMapper(), itemId).stream()
                .findAny().orElse(null);

        return result;
    }

    @Override
    public Item add(Item item) {
        return null;
    }

    @Override
    public boolean update(Item item) {
        return false;
    }

    @Override
    public boolean deleteById(int itemId) {
        return false;
    }

    private boolean validate(Item item){
        return false;
    }
}
