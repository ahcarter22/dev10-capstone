package warehouse.data;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import warehouse.data.mappers.CategoryMapper;
import warehouse.data.mappers.VendorMapper;
import warehouse.models.Category;
import warehouse.models.Vendor;

import java.util.List;
@Repository
public class CategoryDbRepository implements CategoryRepository{
    private final JdbcTemplate jdbcTemplate;

    public CategoryDbRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate=jdbcTemplate;
    }

    @Override
    public List<Category> findAll() {
        final String sql = "select category_id,category_name from category;";
        return jdbcTemplate.query(sql, new CategoryMapper());
    }

    @Override
    public Category findById(int categoryId) {
        final String sql = "select * from category where category_id = ?;";
        Category result = jdbcTemplate.query(sql,new CategoryMapper(),categoryId).stream()
                .findAny().orElse(null);

        return result;
    }
}
