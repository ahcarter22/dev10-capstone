package warehouse.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import warehouse.domain.ItemService;
import warehouse.models.Item;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/item")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService){
        this.itemService=itemService;
    }

    @GetMapping
    public List<Item> findAll(){
        return itemService.findAll();
    }

    @GetMapping("/{itemId}")
    public ResponseEntity<Item> findById(@PathVariable int itemId){
        Item item=itemService.findById(itemId);
        if(item==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(item);
    }
}
