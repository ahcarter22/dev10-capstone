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

    public Result<Vendor> add(Vendor vendor) {

        Result<Vendor> result = validate(vendor);
        if (!result.isSuccess()) {
            return result;
        }

        if (vendor.getVendorId() != 0) {
            result.addMessage("vendorId cannot be 'set' for 'add' operation", ResultType.INVALID);
            return result;
        }

        vendor = vendorRepository.add(vendor);
        result.setPayload(vendor);
        return result;
    }

    public Result<Vendor> update(Vendor vendor){
        Result<Vendor> result = validate(vendor);
        if (!result.isSuccess()) {
            return result;
        }

        if (vendor.getVendorId() <= 0) {
            result.addMessage("vendorId must be set for `update` operation", ResultType.INVALID);
            return result;
        }

        if (!vendorRepository.update(vendor)) {
            String msg = String.format("vendorId: %s, not found", vendor.getVendorId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;

    }

    public boolean deleteById(int vendorId){
        return vendorRepository.deleteById(vendorId);
    }

    private Result<Vendor> validate(Vendor vendor){
        Result<Vendor> result = new Result<>();

        if (vendor == null) {
            result.addMessage("vendor cannot be null", ResultType.INVALID);
            return result;
        }
        if (Validations.isNullOrBlank(vendor.getName())) {

            result.addMessage("name is required", ResultType.INVALID);
        }
        if (Validations.isNullOrBlank(vendor.getEmail())) {
            result.addMessage("email is required", ResultType.INVALID);
        }
        if (Validations.isNullOrBlank(vendor.getPhone())) {
            result.addMessage("phone number is required", ResultType.INVALID );
        }
        return result;
    }
//    public Result<Void> addItem(){}
//    public Result<Void> updateItem(){}
//    public boolean deleteItemByKey(){}
}
