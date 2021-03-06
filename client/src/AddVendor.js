import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AllErrors from './AllErrors';

function AddVendor({errorList, setErrorList}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();

    const [vendors, setVendors] = useState([]);
    const [showMessages, setShowMessages] = useState(false);

    const apiUrl=window.API_URL;

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePhoneChange(event) {
        setPhone(event.target.value);
    }

    function handleImageUrlChange(event){
        setImageUrl(event.target.value);
    }

    function addVendor(vendorObj) {
        setVendors([...vendors, vendorObj])
    }

    function handleSubmit(e) {
        e.preventDefault();
        const allErrors = [];
        if (name == null || name.trim() === "") {
             allErrors.push("Please enter a valid name.") 
        }    
        if (email == null || email.trim() === "") {
            allErrors.push("Please enter a valid email");
        }
        if (phone == null || phone.trim() === "" || isNaN(phone)){
            allErrors.push("Please enter a valid phone number")
        }
        

           if (allErrors.length > 0){
               setErrorList(allErrors);
               setShowMessages(true);
               }else{
        let newVendor = {};
        newVendor.name = name;
        newVendor.email = email;
        newVendor.phone = phone;

        fetch(apiUrl + "api/vendor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
                Accept: "application/json",
            },
            body: JSON.stringify(newVendor)
        }).then(
            (response) => {
                if (response.ok) {
                    alert("SUCCESS")
                    addVendor(newVendor)
                    navigate("/vendors")
                } else { alert("Failed") }
            }
        ).catch(
            rejection => alert(rejection)
        );}
    }

    return (
        <div className="addvendor-bg">
            <div className="row addvendor-form container">

                <div class="col-md-5 addvendor-left">
                    <h1 className="vendoradd">ADD <br />VENDOR</h1></div>
                <div class="col-md-6 addvendor-right">
                    <form onSubmit={handleSubmit}>
                        <label className="login-label" htmlFor="name"><b>Name:</b></label><br />
                        <input className="add-input" onChange={handleNameChange} id="name"></input><br />

                        <label className="login-label" htmlFor="email"><b>Email:</b></label><br />
                        <input className="add-input" onChange={handleEmailChange} id="email"></input><br />

                        <label className="login-label" htmlFor="phone"><b>Phone:</b></label><br />
                        <input className="add-input" onChange={handlePhoneChange} id="phone"></input><br />
                        <label className="login-label" htmlFor="imageUrl"><b>Image URL:</b></label><br />
                        <input className="add-input" onChange={handleImageUrlChange} id="imageUrl"></input><br /><br />
                        <div className="errormsg">
                        <AllErrors errorList={errorList}/></div><br />
                        <button className="additem-btn">Submit</button> <br />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddVendor;