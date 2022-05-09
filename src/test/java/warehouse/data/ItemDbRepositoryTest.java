package warehouse.data;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import warehouse.models.Item;
import warehouse.models.Vendor;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ItemDbRepositoryTest {
    @Autowired
    ItemDbRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindItems() {
        List<Item> items = repository.findAll();
        assertNotNull(items);
        assertTrue(items.size() > 0);
    }

    @Test
    void shouldFindItemById() {
        Item item = repository.findById(1);
        assertEquals("apples", item.getName());
    }

    @Test
    void shouldAddItem() {
        Item item = new Item();
        item.setName("TEST");
        item.setQuantity(2);
        item.setScale("kilos");
        item.setExpirationDate(LocalDate.of(2020, 9, 16));
        item.setImageUrl("");
        item.setVendorId(2);
        item.setCategoryId(3);
        Item actual = repository.add(item);
        assertNotNull(actual);
        assertEquals(4, actual.getItemId());
    }

    @Test
    void shouldUpdateItem() {

        Item item = new Item();
        item.setName("TEST Update");
        item.setQuantity(6);
        item.setScale("kilos");
        item.setExpirationDate(LocalDate.of(2020, 9, 16));
        item.setImageUrl("");
        item.setVendorId(2);
        item.setCategoryId(3);
        Item actual = repository.add(item);
        assertNotNull(actual);
        assertEquals(4, actual.getItemId());

        assertTrue(repository.update(item));
    }

    @Test
    void shouldDeleteItem() {
        assertTrue(repository.deleteById(2));
        assertFalse(repository.deleteById(2));
    }
}

