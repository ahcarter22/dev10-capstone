package warehouse.data;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import warehouse.data.mappers.VendorMapper;
import warehouse.models.Vendor;

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

        return null;
    }

    @Override
    public boolean update(Vendor vendor) {
        return false;
    }

    @Override
    public boolean deleteById(int vendorId) {
        return false;
    }
}
