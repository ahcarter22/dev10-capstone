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

        return itemRepository.deleteById(itemId);
    }

    private Result<Item> validate(Item item){

        Result<Item> result = new Result<>();
        if (item == null) {
            result.addMessage("item cannot be null", ResultType.INVALID);
            return result;
        }
        if(Validations.isNullOrBlank(item.getName())){
            result.addMessage("Name is required", ResultType.INVALID);
        }

        if(Validations.isNull(item.getQuantity())){
            result.addMessage("Quantity is required", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(item.getScale())){
            result.addMessage("Scale is required", ResultType.INVALID);
        }

        if (Validations.isNull(item.getExpirationDate())) {
            result.addMessage("Date is required", ResultType.INVALID);
        }

        if (Validations.isNull(item.getVendorId())) {
            result.addMessage("VendorId required", ResultType.INVALID);
        }

        if (Validations.isNull(item.getCategoryId())){
            result.addMessage("CategoryId required", ResultType.INVALID);
        }

        return result;
    }
}
