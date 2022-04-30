package warehouse.data;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import warehouse.data.mappers.VendorMapper;
import warehouse.models.Vendor;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
@Repository
public class VendorDbRepository implements VendorRepository{

    private final JdbcTemplate jdbcTemplate;

    public VendorDbRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate=jdbcTemplate;
    }

    @Override
    public List<Vendor> findAll() {
        final String sql = "select vendor_id,vendor_name,vendor_email,vendor_phone from vendor;";
        return jdbcTemplate.query(sql, new VendorMapper());
    }

    @Override
    public Vendor findById(int vendorId) {
        final String sql = "select * from vendor where vendor_id = ?;";
        Vendor result = jdbcTemplate.query(sql,new VendorMapper(),vendorId).stream()
                .findAny().orElse(null);

        return result;
    }

    @Override
    public Vendor add(Vendor vendor) {

        final String sql = "insert into vendor (vendor_name,vendor_email,vendor_phone) values (?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, vendor.getName());
            ps.setString(2, vendor.getEmail());
            ps.setString(3, vendor.getPhone());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        vendor.setVendorId(keyHolder.getKey().intValue());
        return vendor;
    }

    @Override
    public boolean update(Vendor vendor) {

        final String sql = "update vendor set "
                + "vendor_name = ?, "
                + "vendor_email = ?, "
                + "vendor_phone = ? "
                + "where vendor_id = ?;";

        return jdbcTemplate.update(sql, vendor.getName(), vendor.getEmail(), vendor.getPhone(), vendor.getVendorId()) > 0;
    }

    @Override
    public boolean deleteById(int vendorId) {

        return jdbcTemplate.update("delete from vendor where vendor_id = ?;", vendorId) > 0;

    }
}
