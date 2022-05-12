package warehouse.controllers;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import warehouse.domain.Result;
import warehouse.domain.VendorService;
import warehouse.models.Item;
import warehouse.models.Vendor;

import java.util.List;

@RestController
// @CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/vendor")
public class VendorController {
    private final VendorService vendorService;
    public VendorController(VendorService vendorService){this.vendorService=vendorService;}

    @GetMapping
    public List<Vendor> findAll(){
        return vendorService.findAll();
    }

    @GetMapping("/{vendorId}")
    public ResponseEntity<Vendor> findById(@PathVariable int vendorId){
        Vendor vendor=vendorService.findById(vendorId);
        if(vendor==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(vendor);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Vendor vendor) {
        Result<Vendor> result = vendorService.add(vendor);
        if(result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{vendorId}")
    public ResponseEntity<Object> update(@PathVariable int vendorId, @RequestBody Vendor vendor) {
        if (vendorId != vendor.getVendorId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Vendor> result = vendorService.update(vendor);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{vendorId}")
    public ResponseEntity<Void> deleteById(@PathVariable int vendorId) {
        if (vendorService.deleteById(vendorId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/search")
    public ResponseEntity findByName(String name){
        if (name == null) {
            return new ResponseEntity("Name cannot be null", HttpStatus.BAD_REQUEST);
        }else{
            List<Vendor> foundItem = vendorService.findByName(name);
            if (foundItem != null) {
                return ResponseEntity.ok(foundItem);
            }else{
                return new ResponseEntity("Not found",HttpStatus.NOT_FOUND);
            }
        }

    }


}
