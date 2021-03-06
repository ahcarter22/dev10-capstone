package warehouse.models;

import java.sql.Blob;
import java.time.LocalDate;
import java.util.Objects;

public class Item {
    private int itemId;
    private String name;
    private Integer quantity;
    private String scale;
    private LocalDate expirationDate;
    private String imageUrl;
    private Integer vendorId;
    private Integer categoryId;

    public Item() {

    }

    public Item(int itemId, String name, Integer quantity, String scale,
                LocalDate expirationDate, String imageUrl, Integer vendorId, Integer categoryId) {
        this.itemId = itemId;
        this.name = name;
        this.quantity = quantity;
        this.scale = scale;
        this.expirationDate = expirationDate;
        this.imageUrl=imageUrl;
        this.vendorId = vendorId;
        this.categoryId = categoryId;
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

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
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

    public Integer getVendorId() {
        return vendorId;
    }

    public void setVendorId(Integer vendorId) {
        this.vendorId = vendorId;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }
  


    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Item item = (Item) o;
        return itemId == item.itemId && Objects.equals(name, item.name) && Objects.equals(quantity, item.quantity) && Objects.equals(scale, item.scale) && Objects.equals(expirationDate, item.expirationDate) && Objects.equals(imageUrl, item.imageUrl) && Objects.equals(vendorId, item.vendorId) && Objects.equals(categoryId, item.categoryId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(itemId, name, quantity, scale, expirationDate, imageUrl, vendorId, categoryId);
    }
}
