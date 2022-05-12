package warehouse.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import warehouse.domain.CategoryService;
import warehouse.domain.VendorService;
import warehouse.models.Category;
import warehouse.models.Vendor;

import java.util.List;

@RestController
// @CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/category")
public class CategoryController {
    private final CategoryService categoryService;
    public CategoryController(CategoryService categoryService){this.categoryService=categoryService;}

    @GetMapping
    public List<Category> findAll(){
        return categoryService.findAll();
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<Category> findById(@PathVariable int categoryId){
        Category category=categoryService.findById(categoryId);
        if(category==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(category);
    }
}
