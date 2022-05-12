package warehouse.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import warehouse.domain.ItemService;
import warehouse.domain.Result;
import warehouse.models.Item;

import java.util.List;

@RestController
// @CrossOrigin(origins = {"http://localhost:3000"})
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

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Item item) {
        Result<Item> result = itemService.add(item);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<Object> update(@PathVariable int itemId, @RequestBody Item item) {
        if (itemId != item.getItemId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Item> result = itemService.update(item);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> deleteById(@PathVariable int itemId) {
        if (itemService.deleteById(itemId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/search")
    public ResponseEntity findByName(String name){
        if (name == null) {
            return new ResponseEntity("Name cannot be null", HttpStatus.BAD_REQUEST);
        }else{
            List<Item> foundItem = itemService.findByName(name);
            if (foundItem != null) {
                return ResponseEntity.ok(foundItem);
            }else{
                return new ResponseEntity("Not found",HttpStatus.NOT_FOUND);
            }
        }

    }

}
