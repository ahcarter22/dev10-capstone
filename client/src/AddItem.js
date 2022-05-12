import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AllErrors from './AllErrors';

function AddItem({ errorList,setErrorList }) {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [scale, setScale] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [categoryId, setCategoryId] = useState();
    const [vendorId, setVendorId] = useState("");
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showMessages, setShowMessages] = useState(false);
   

    const apiUrl=window.API_URL;

    useEffect(() => {

        
        fetch(apiUrl + "api/category", 
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                alert("Something went wrong while fetching...");
            }


            })
            .then(categoryData => setCategories(categoryData))
            .catch(rejection => alert("Failure: " + rejection.status + ": " + rejection.statusText));
    }, []);

    useEffect(() => {

        
        fetch(apiUrl + "api/vendor",
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                alert("Something went wrong while fetching...");
            }
        })
            .then(vendorData => setVendors(vendorData))
            .catch(rejection => alert("Failure: " + rejection.status + ": " + rejection.statusText));
    }, []);

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

    function handleImageUrlChange(event) {
        setImageUrl(event.target.value);
    }

    function handleVendorIdChange(event) {
        setVendorId(event.target.value);
        console.log(event.target.value)
    }


    function handleCategoryIdChange(event) {
        setCategoryId(event.target.value);
        console.log(event.target)
        console.log(categoryId)
    }

    function addItem(itemObj) {
        setItems([...items, itemObj])
    }

    function handleSubmit(e) {
        e.preventDefault();
        const allErrors = [];
        if (name == null || name.trim() === "") {
             allErrors.push("Please enter a valid name.") 
        }    
        if (isNaN(quantity) || quantity <= 0) {
            allErrors.push("Please enter a valid number");
        }
        if (scale == null || scale.trim() === ""){
            allErrors.push("Please enter a valid scale")
        }
        if (vendorId == null || vendorId ==0){
            allErrors.push("Please choose a valid vendor")
        }
        if (categoryId == null || categoryId == 0) {
            allErrors.push("Please choose a valid category");
       }

           if (allErrors.length > 0){
               setErrorList(allErrors);
               setShowMessages(true);
               }
       
        else {
            let newItem = {};
            newItem.name = name;
            newItem.quantity = quantity;
            newItem.scale = scale;
            newItem.expirationDate = expirationDate;
            newItem.imageUrl = imageUrl;
            newItem.vendorId = vendorId;
            newItem.categoryId = categoryId;


            fetch(apiUrl + "api/item", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    Accept: "application/json",
                },
                body: JSON.stringify(newItem)
            }).then(
                (response) => {
                    if (response.ok) {
                        alert("SUCCESS");
                        addItem(newItem);
                        setErrorList([]);
                        navigate("/items");
                    } else { alert("Failed") }
                }
            ).catch(
                rejection => alert(rejection)
            );
        }
    }


    useEffect(() => {
        fetch(apiUrl + "api/vendor",
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    alert("Something went wrong while fetching...");
                }
            })
            .then(vendorData => setVendors(vendorData))
            .catch(rejection => alert("Failure: " + rejection.status + ": " + rejection.statusText));
    }, []);

    return (
        <div className="additem-bg">
            <div className="row additem-form container">

                <div class="col-md-5 additem-left">
                    <h1 className="itemadd">ADD <br />ITEM</h1></div>
                <div class="col-md-6 additem-right">
                    <form onSubmit={handleSubmit}>

                        <label className="login-label" htmlFor="name"><b>Name:</b></label><br />
                        <input className="add-input" onChange={handleNameChange} id="name"></input><br />

                        <label className="login-label" htmlFor="quantity"><b>Quantity:</b></label><br />
                        <input className="add-input" onChange={handleQuantityChange} id="quantity"></input><br />

                        <label className="login-label" htmlFor="scale"><b>Scale:</b></label><br />
                        <input className="add-input" onChange={handleScaleChange} id="scale"></input><br />

                        <label className="login-label" htmlFor="expirationDate"><b>Expiration Date:</b></label><br />
                        <input className="add-input" onChange={handleExpirationDateChange} id="expirationDate"></input><br />

                        <label className="login-label" htmlFor="imageUrl"><b>Image URL:</b></label><br />
                        <input className="add-input" onChange={handleImageUrlChange} id="imageUrl"></input><br />


                        <label className="login-label" htmlFor="vendorId"><b>Vendor Name:</b></label><br />
                        <select className="add-input" id="selectVendorName" value={vendorId} onChange={(e) => handleVendorIdChange(e)} >
                            <option key={0} value="0">Please select an option</option>
                            {vendors.map((vendor) =>
                                <option key={vendor.vendorId} value={vendor.vendorId}>{vendor.name}</option>)
                            }
                        </select><br />


                        <label className="login-label" htmlFor="categoryId"><b>Category:</b></label><br />
                        <select className="add-input" id="selectCategory" value={categoryId} onChange={(e) => setCategoryId(parseInt(e.target.value))} >
                            <option value="0">Please select an option</option>
                            <option value="1">Meat</option>
                            <option value="2">Produce</option>
                            <option value="3">Dairy</option>
                            <option value="4">Frozen</option>
                            <option value="5">Alcohol</option>
                            <option value="6">Baked Goods</option>
                        </select><br /><br />
                        <div className="errormsg">
                        <AllErrors errorList={errorList}/></div><br />


                        <button className="additem-btn">Add</button> <br />
                    </form>
                </div>
            </div>
        </div>
    )
}

// This should auto populate category, but we need to change our back-end GET request to give us category ids as well
// <label htmlFor="categoryId"><b>Category:</b></label><br />
// <select id="selectCategory" value={categoryId} onChange={(e) => handleCategoryIdChange(e)} >
//     <option key={0} value="0">Please select an option</option>
//     {categories.map((category) => 
//         <option key={category.categoryId} value={category.categoryId}>{category}</option>)
//     }
// </select><br /><br /><br />



export default AddItem;