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
import java.time.LocalDate;
import java.util.List;

@Repository
public class ItemDbRepository implements ItemRepository{
    private final JdbcTemplate jdbcTemplate;

    public ItemDbRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate=jdbcTemplate;
    }

    @Override
    public List<Item> findAll() {
        final String sql = "select * from item;";
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
        final String sql = "insert into item (item_name, quantity, scale, expiration_date, vendor_id, category_id) values (?,?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, item.getName());
            ps.setInt(2, item.getQuantity());
            ps.setString(3, item.getScale());
            ps.setDate(4, java.sql.Date.valueOf(item.getExpirationDate()));
            ps.setInt(5, item.getVendorId());
            ps.setInt(6, item.getCategoryId());
            return ps;
        }, keyHolder);


        if (rowsAffected <= 0) {
            return null;
        }

        item.setItemId(keyHolder.getKey().intValue());

        return item;
    }

    @Override
    public boolean update(Item item) {
        final String sql = "update item set "
                + "item_id = ?, "
                + "item_name = ?, "
                + "quantity = ?, "
                + "scale = ?, "
                + "expiration_date = ?, "
                + "vendor_id = ?, "
                + "category_id = ? "
                + "where item_id = ?;";

        return jdbcTemplate.update(sql, item.getItemId(), item.getName(), item.getQuantity(), item.getScale(),
                item.getExpirationDate(), item.getVendorId(), item.getCategoryId(), item.getItemId()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteById(int itemId) {

        return jdbcTemplate.update("delete from item where item_id = ?;", itemId) > 0;
    }

    private boolean validate(Item item){
        if(item == null) {
            return false;
        }

        if(item.getItemId() <= 0) {
            return false;
        }

        if(item.getName() == null || item.getName().isBlank()) {
            return false;
        }

        if(item.getQuantity() <= 0) {
            return false;
        }

        if(item.getScale() == null || item.getScale().isBlank()) {
            return false;
        }

        if(item.getExpirationDate().isAfter(LocalDate.now())){
            return false;
        }

        if(item.getVendorId() == null || item.getVendorId().intValue() <= 0) {
            return false;
        }

        if(item.getCategoryId() == null) {
            return false;
        }

        return true;
    }
}
