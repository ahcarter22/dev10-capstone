package warehouse.domain;

import org.springframework.stereotype.Service;
import warehouse.data.ItemRepository;
import warehouse.data.ItemRepository;
import warehouse.models.Item;

import java.util.List;

@Service
public class ItemService {
    
    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository){
        this.itemRepository = itemRepository;
    }

    public List<Item> findAll() {
        return itemRepository.findAll();
    }

    public Item findById(int itemId){
        return itemRepository.findById(itemId);
    }

    public Result<Item> add(Item item){
        return null;
    }

    public Result<Item> update(Item item){
        return null;
    }

    public boolean deleteById(int itemId){
        return false;
    }

    private Result<Item> validate(Item item){
        return null;
    }
}
