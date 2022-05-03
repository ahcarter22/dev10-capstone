import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddItem(){
    const [name, setName] = useState("");
    const [quantity,setQuantity] = useState("");
    const [scale, setScale] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [category, setCategory] = useState("");
    const [vendorId, setVendorId] =useState("");
    const navigate = useNavigate();

    const [items, setItems] = useState([]);

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleQuantityChange(event) {
        setQuantity(event.target.value);
    }

    function handleScaleChange(event) {
        setScale(event.target.value);
    }

    function handleExpirationDateChange(event) {
        setExpirationDate(event.target.value);
    }
    function getOption(){
        setCategory(document.queryselector('selectCategory').value);
    }

    function addItem(itemObj) {
        setItems([...items, itemObj])
    }

    function handleSubmit(e) {
        e.preventDefault();
        let newItem = {};
        newItem.name = name;
        newItem.quantity = quantity;
        newItem.scale = scale;
        newItem.expirationDate = expirationDate;
        newItem.category = category;
        newItem.vendorId = vendorId;

        fetch("http://localhost:8080/api/item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(newItem)
        }).then(
            (response) =>{ if(response.ok){
                alert("SUCCESS")
                addItem(newItem)
                navigate("/items")}else{alert("Failed")}}
        ).catch(
            rejection => alert(rejection)
        );
    }

    return (
        <div>
            <div className="addItem">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name"><b>Name:</b></label><br />
                    <input onChange={handleNameChange} id="name"></input><br />

                    <label htmlFor="quantity"><b>Quantity:</b></label><br />
                    <input onChange={handleQuantityChange} id="quantity"></input><br />

                    <label htmlFor="scale"><b>Scale:</b></label><br />
                    <input onChange={handleScaleChange} id="scale"></input><br />

                    <label htmlFor="expirationDate"><b>Expiration Date:</b></label><br />
                    <input onChange={handleExpirationDateChange} id="expirationDate"></input><br />

                    <label htmlFor="category"><b>Category:</b></label><br />
                    <select id="selectCategory">
                        <option value="MEATS">Meat</option>
                        <option value="PRODUCE">Produce</option>
                        <option value="DAIRY">Dairy</option>
                    </select><br />
                    <script onChange ={getOption}></script><br />

                    <label htmlFor="vendor"><b>Vendor:</b></label><br />
                    <select id="selectVendor">
                        <option value="a">a</option>
                        <option value="b">b</option>
                        <option value="c">c</option>
                    </select><br />

                    <button>Submit</button> <br />
                </form>
            </div>
        </div>
    )
}

export default AddItem;