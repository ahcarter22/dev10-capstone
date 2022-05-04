import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddItem(){
    const [name, setName] = useState("");
    const [quantity,setQuantity] = useState("");
    const [scale, setScale] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [vendorId, setVendorId] =useState("");
    const navigate = useNavigate();

    const [items, setItems] = useState([]);

    // const [categories,setCategories] = useState([]);

    // useEffect(() => {
    //     fetch("http://localhost:8080/api/category", 
    //     {
    //         headers: {
    //         //     Authorization: "Bearer " + localStorage.getItem("token")
    //         }
    //     })
    //     .then(response => {
    //         if (response.status === 200) {
    //             return response.json();
    //         } else {
    //             alert("Something went wrong while fetching...");
    //         }
    //         })
    //     .then(categoryData=>setCategories(categoryData))
    //     .catch(rejection => alert("Failure: " + rejection.status + ": " + rejection.statusText));
    //     }, []);

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
    
    function handleVendorIdChange(event){
        setVendorId(event.target.value);
    }

    function getOption(){
        setCategoryId(parseInt(document.queryselector('selectCategory').value));
        // console.log(document.queryselector('selectCategory'))
    }
   
   // console.log(document.queryselector('selectCategory')
    
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
        newItem.categoryId = categoryId;
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

                    <label htmlFor="vendorId"><b>VendorId:</b></label><br />
                    <input onChange={handleVendorIdChange} id="vendorId"></input><br />

                    <label htmlFor="categoryId"><b>Category:</b></label><br />
                    <select id="selectCategory">
                        <option value={1}>Meat</option>
                        <option value={2}>Produce</option>
                        <option value={3}>Dairy</option>
                        <option value={4}>Frozen</option>
                        <option value={5}>Alcohol</option>
                        <option value={6}>Baked Goods</option>
                    </select><br />
                    <script onChange ={getOption} id="categoryId"> </script><br /> 

                    {/* <label htmlFor="vendor"><b>Vendor:</b></label><br />
                    <select id="selectVendor">
                        <option value="1">a</option>
                        <option value="2">b</option>
                        <option value="3">c</option>
                    </select><br /><br /><br /> */}

                    <button>Submit</button> <br />
                </form>
            </div>
        </div>
    )
}

export default AddItem;