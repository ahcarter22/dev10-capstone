package warehouse.models;

public enum Category {
    MEATS(1,"Meats"),
    PRODUCE(2,"Produce"),
    DAIRY(3,"Dairy"),
    FROZEN(4,"Frozen"),
    ALCOHOL(5,"Alcohol"),
    BAKED_GOODS(6,"Baked goods");

    private int categoryId;
    private String categoryName;
    private Category(int categoryId,String categoryName){
        this.categoryId=categoryId;
        this.categoryName=categoryName;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public static Category getCategoryById(int categoryId){
        switch (categoryId){
            case 1:
                return MEATS;
            case 2:
                return PRODUCE;
            case 3:
                return DAIRY;
            case 4:
                return FROZEN;
            case 5:
                return ALCOHOL;
            case 6:
                return BAKED_GOODS;
            default:
                break;
        }
        return null;
    }
}
