package warehouse.data;

import warehouse.models.Category;
import warehouse.models.Vendor;

import java.util.List;

public interface CategoryRepository {
    List<Category> findAll();
    Category findById(int categoryId);
}
