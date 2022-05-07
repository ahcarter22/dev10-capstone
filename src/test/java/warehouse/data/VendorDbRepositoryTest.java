package warehouse.data;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import warehouse.models.Vendor;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class VendorDbRepositoryTest {
    @Autowired
    VendorDbRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindVendors() {
        List<Vendor> vendors = repository.findAll();
        assertNotNull(vendors);
        assertTrue(vendors.size() > 0);
    }

    @Test
    void shouldFindVendorById() {
        Vendor vendor = repository.findById(1);
        assertEquals("Johnny's Apples", vendor.getName());
    }

    @Test
    void shouldAddVendor() {
        Vendor vendor = new Vendor();
        vendor.setName("TEST");
        vendor.setEmail("test@test.com");
        vendor.setPhone("123-456-7890");
        Vendor actual = repository.add(vendor);
        assertNotNull(actual);
        assertEquals(4, actual.getVendorId());
    }

    @Test
    void shouldUpdateVendor() {

        Vendor vendor = new Vendor();
        vendor.setVendorId(3);
        vendor.setName("TEST");
        vendor.setEmail("update@test.com");
        vendor.setPhone(("012-345-6789"));

        assertTrue(repository.update(vendor));
    }

    @Test
    void shouldDeleteVendor() {
        assertTrue(repository.deleteById(2));
        assertFalse(repository.deleteById(2));
    }
}
