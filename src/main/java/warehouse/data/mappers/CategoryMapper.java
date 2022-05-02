package warehouse.data.mappers;

import org.springframework.jdbc.core.RowMapper;
import warehouse.models.Category;
import warehouse.models.Vendor;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CategoryMapper implements RowMapper<Category> {
    public Category mapRow(ResultSet resultSet, int i) throws SQLException {
        Category category = Category.getCategoryById(resultSet.getInt("category_id"));
        return category;
    }
}
