package warehouse.domain;

import org.springframework.stereotype.Service;
import warehouse.data.CategoryRepository;
import warehouse.data.VendorRepository;
import warehouse.models.Category;
import warehouse.models.Vendor;

import java.util.List;
@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category findById(int categoryId){

        return categoryRepository.findById(categoryId);
    }
}
