package warehouse.models;

import java.time.LocalDate;
import java.util.Objects;

public class Item {
    private int itemId;
    private String name;
    private int quantity;
    private String scale;
    private LocalDate expirationDate;
    private int vendorId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Item item = (Item) o;
        return itemId == item.itemId && quantity == item.quantity && vendorId == item.vendorId && Objects.equals(name, item.name) && Objects.equals(scale, item.scale) && Objects.equals(expirationDate, item.expirationDate) && category == item.category;
    }

    @Override
    public int hashCode() {
        return Objects.hash(itemId, name, quantity, scale, expirationDate, vendorId, category);
    }

    private Category category;

    public Item(){

    }

    public Item(int itemId, String name, int quantity, String scale,
                LocalDate expirationDate, int vendorId, Category category) {
        this.itemId = itemId;
        this.name = name;
        this.quantity = quantity;
        this.scale = scale;
        this.expirationDate = expirationDate;
        this.vendorId = vendorId;
        this.category = category;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getScale() {
        return scale;
    }

    public void setScale(String scale) {
        this.scale = scale;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public int getVendorId() {
        return vendorId;
    }

    public void setVendorId(int vendorId) {
        this.vendorId = vendorId;
    }





    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
