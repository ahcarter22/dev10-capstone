package warehouse.data;

import warehouse.models.Vendor;

import java.util.List;

public interface VendorRepository {
    List<Vendor> findAll();
    Vendor findById(int vendorId);
    Vendor add(Vendor vendor);
    boolean update(Vendor vendor);
    boolean deleteById(int vendorId);
}
