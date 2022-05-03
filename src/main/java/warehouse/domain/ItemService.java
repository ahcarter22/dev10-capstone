package warehouse.domain;

import org.springframework.stereotype.Service;
import warehouse.data.ItemRepository;
import warehouse.data.ItemRepository;
import warehouse.models.Item;
import warehouse.models.Vendor;

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

        Result<Item> result = validate(item);
        if (!result.isSuccess()) {
            return result;
        }

        if (item.getItemId() != 0) {
            result.addMessage("itemId cannot be 'set' for 'add' operation", ResultType.INVALID);
            return result;
        }

        item = itemRepository.add(item);
        result.setPayload(item);
        return result;
    }

    public Result<Item> update(Item item){
        Result<Item> result = validate(item);
        if (!result.isSuccess()) {
            return result;
        }

        if (item.getItemId() <= 0) {
            result.addMessage("vendorId must be set for `update` operation", ResultType.INVALID);
            return result;
        }

        if (!itemRepository.update(item)) {
            String msg = String.format("itemId: %s, not found", item.getItemId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
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

        /*
        if (Validations.isNull(item.getCategory())){
            result.addMessage("CategoryId required", ResultType.INVALID);
        }
        */

        return result;
    }
}
