package warehouse.data;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import warehouse.data.mappers.ItemMapper;
import warehouse.data.mappers.VendorMapper;
import warehouse.models.Item;
import warehouse.models.Vendor;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class ItemDbRepository implements ItemRepository{
    private final JdbcTemplate jdbcTemplate;

    public ItemDbRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate=jdbcTemplate;
    }

    @Override
    public List<Item> findAll() {
        final String sql = "select item_id, item_name, quantity, scale, expiration_date, vendor_id, category_id from item;";
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
        final String sql = "insert into item (item_id, item_name, quantity, scale, expiration_date, vendor_id, category_id) values (?,?,?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, item.getItemId());
            ps.setString(2, item.getName());
            ps.setInt(3, item.getQuantity());
            ps.setString(4, item.getScale());
            ps.setDate(5, java.sql.Date.valueOf(item.getExpirationDate()));
            ps.setInt(6, item.getVendorId());
            ps.setString(7, item.getCategory().getCategoryName());
            return ps;
        }, keyHolder);


        if (rowsAffected <= 0) {
            return null;
        }

        item.setVendorId(keyHolder.getKey().intValue());

        return item;
    }

    @Override
    public boolean update(Item item) {
        final String sql = "update item set "
                + "item_id = ?, "
                + "item_name = ?, "
                + "quantity = ? "
                + "scale = ? "
                + "expiration_date = ? "
                + "vendor_id = ? "
                + "category_id = ? "
                + "where item_id = ?;";

        return jdbcTemplate.update(sql, item.getItemId(), item.getName(), item.getQuantity(), item.getScale(),
                item.getExpirationDate(), item.getVendorId(), item.getCategory(), item.getVendorId()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteById(int itemId) {

        return jdbcTemplate.update("delete from item where item_id = ?;", itemId) > 0;
    }

    private boolean validate(Item item){
        return false;
    }
}
