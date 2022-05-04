package warehouse.domain;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import warehouse.data.VendorRepository;
import warehouse.models.Vendor;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
class VendorServiceTest {

    @Autowired
    VendorService vendorService;

    @MockBean
    VendorRepository vendorRepository;

    @Test
    void shouldAdd() {
        Vendor vendor = new Vendor(0, "TEST", "email@test.com", "123-456-7890",null);
        Vendor mockOut = new Vendor(5, "TEST", "email@test.com", "123-456-7890",null);

        when(vendorRepository.add(vendor)).thenReturn(mockOut);

        Result<Vendor> actual = vendorService.add(vendor);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockOut, actual.getPayload());
    }

    @Test
    void shouldNotAddWhenInvalid() {

        Vendor vendor = new Vendor(35, "TEST", "email@test.com", "123-456-7890",null);

        Result<Vendor> actual = vendorService.add(vendor);
        assertEquals(ResultType.INVALID, actual.getType());

        vendor.setVendorId(0);
        vendor.setName(null);
        actual = vendorService.add(vendor);
        assertEquals(ResultType.INVALID, actual.getType());

        vendor.setName("TEST");
        vendor.setEmail("   ");
        actual = vendorService.add(vendor);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldUpdate() {
        Vendor vendor = new Vendor(5, "TEST", "email@test.com", "123-456-7890",null);

        when(vendorRepository.update(vendor)).thenReturn(true);
        Result<Vendor> actual = vendorService.update(vendor);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateMissing() {
        Vendor vendor = new Vendor(35, "TEST", "email@test.com", "123-456-7890",null);

        when(vendorRepository.update(vendor)).thenReturn(false);
        Result<Vendor> actual = vendorService.update(vendor);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }

    @Test
    void shouldNotUpdateWhenInvalid() {
        Vendor vendor = new Vendor(35, null, "email@test.com", "123-456-7890",null);

        Result<Vendor> actual = vendorService.update(vendor);
        assertEquals(ResultType.INVALID, actual.getType());

        vendor.setName("TEST");
        vendor.setEmail(" ");
        actual = vendorService.update(vendor);
        assertEquals(ResultType.INVALID, actual.getType());

       vendor.setVendorId(0);
       vendor.setEmail("Email Test");
       actual = vendorService.update(vendor);
       assertEquals(ResultType.INVALID, actual.getType());
    }

}
