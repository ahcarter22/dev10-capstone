package warehouse.controllers;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import warehouse.domain.VendorService;
import warehouse.models.Vendor;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
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
}
