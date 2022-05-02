package warehouse.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Vendor {
    private int vendorId;
    private String name;
    private String email;
    private String phone;
    private List<Item> items = new ArrayList<>();

    public Vendor(){

    }

    public Vendor(int vendorId, String name, String email, String phone, List<Item> items) {
        this.vendorId = vendorId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.items = items;
    }

    public int getVendorId() {
        return vendorId;
    }

    public void setVendorId(int vendorId) {
        this.vendorId = vendorId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Vendor vendor = (Vendor) o;
        return vendorId == vendor.vendorId && Objects.equals(name, vendor.name) && Objects.equals(email, vendor.email) && Objects.equals(phone, vendor.phone) && Objects.equals(items, vendor.items);
    }

    @Override
    public int hashCode() {
        return Objects.hash(vendorId, name, email, phone, items);
    }
}
