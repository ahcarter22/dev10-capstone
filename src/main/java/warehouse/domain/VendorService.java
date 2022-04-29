package warehouse.domain;

import org.springframework.stereotype.Service;
import warehouse.data.VendorRepository;
import warehouse.models.Vendor;

import java.util.List;
@Service
public class VendorService {

    private final VendorRepository vendorRepository;

    public VendorService(VendorRepository vendorRepository){
        this.vendorRepository = vendorRepository;
    }

    public List<Vendor> findAll() {
        return vendorRepository.findAll();
    }

    public Vendor findById(int vendorId){
        return vendorRepository.findById(vendorId);
    }

    public Result<Vendor> add(Vendor vendor){
        return null;
    }

    public Result<Vendor> update(Vendor vendor){
        return null;
    }

    public boolean deleteById(int vendorId){
        return false;
    }

    private Result<Vendor> validate(Vendor vendor){
        return null;
    }
//    public Result<Void> addItem(){}
//    public Result<Void> updateItem(){}
//    public boolean deleteItemByKey(){}
}
