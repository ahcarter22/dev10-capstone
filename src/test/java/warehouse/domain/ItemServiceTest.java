package warehouse.domain;

        import org.junit.jupiter.api.Test;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.boot.test.context.SpringBootTest;
        import org.springframework.boot.test.mock.mockito.MockBean;
        import warehouse.data.ItemRepository;
        import warehouse.models.Item;

        import java.time.LocalDate;

        import static org.junit.jupiter.api.Assertions.assertEquals;
        import static org.mockito.Mockito.when;

@SpringBootTest
class ItemServiceTest {

    @Autowired
    ItemService itemService;

    @MockBean
    ItemRepository itemRepository;

    @Test
    void shouldAdd() {
        Item item = new Item(0, "TEST", 100, "pounds",(LocalDate.of(2020, 9, 16)),null,1,2);
        Item mockOut = new Item(0, "TEST", 100, "pounds",(LocalDate.of(2020, 9, 16)),null,1,2);

        when(itemRepository.add(item)).thenReturn(mockOut);

        Result<Item> actual = itemService.add(item);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockOut, actual.getPayload());
    }

    @Test
    void shouldNotAddWhenInvalid() {

        Item item = new Item(0, "TEST", 100, "pounds",(LocalDate.of(2020, 9, 16)),null,1,2);

        Result<Item> actual = itemService.add(item);
        assertEquals(ResultType.INVALID, actual.getType());

        item.setItemId(0);
        item.setName(null);
        actual = itemService.add(item);
        assertEquals(ResultType.INVALID, actual.getType());

        item.setName("TEST");

        actual = itemService.add(item);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldUpdate() {
        Item item = new Item(0, "TEST", 100, "pounds",(LocalDate.of(2020, 9, 16)),null,1,2);

        when(itemRepository.update(item)).thenReturn(true);
        Result<Item> actual = itemService.update(item);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateMissing() {
        Item item = new Item(0, "TEST", 100, "pounds",(LocalDate.of(2020, 9, 16)),null,1,2);

        when(itemRepository.update(item)).thenReturn(false);
        Result<Item> actual = itemService.update(item);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }

    @Test
    void shouldNotUpdateWhenInvalid() {
        Item item = new Item(0, "TEST", 100, "pounds",(LocalDate.of(2020, 9, 16)),null,1,2);

        Result<Item> actual = itemService.update(item);
        assertEquals(ResultType.INVALID, actual.getType());

        item.setName("TEST Update");
        item.setQuantity(6);
        item.setScale("kilos");
        item.setExpirationDate(LocalDate.of(2020, 9, 16));
        item.setImageUrl("");
        item.setVendorId(2);
        item.setCategoryId(3);
        actual = itemService.update(item);
        assertEquals(ResultType.INVALID, actual.getType());

        item.setName("TEST Update");
        item.setQuantity(6);
        item.setScale("kilos");
        item.setExpirationDate(LocalDate.of(2020, 9, 16));
        item.setImageUrl("");
        item.setVendorId(2);
        item.setCategoryId(3);
        actual = itemService.update(item);
        assertEquals(ResultType.INVALID, actual.getType());
    }

}
