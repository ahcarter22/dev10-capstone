package warehouse.data;

import warehouse.models.Item;
import warehouse.models.Vendor;

import java.util.List;

public interface VendorRepository {
    List<Vendor> findAll();
    Vendor findById(int vendorId);
    List<Vendor> findByName(String name);
    Vendor add(Vendor vendor);
    boolean update(Vendor vendor);
    boolean deleteById(int vendorId);
}
