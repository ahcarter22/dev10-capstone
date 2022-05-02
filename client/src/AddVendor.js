import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddVendor(){
    const [name, setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const [vendors, setVendors] = useState([]);

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePhoneChange(event) {
        setPhone(event.target.value);
    }

    function addVendor(vendorObj) {
        setVendors([...vendors, vendorObj])
    }

    function handleSubmit(e) {
        e.preventDefault();
        let newVendor = {};
        newVendor.name = name;
        newVendor.email = email;
        newVendor.phone = phone;

        fetch("http://localhost:8080/api/vendor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(newVendor)
        }).then(
            (response) =>{ if(response.ok){
                alert("SUCCESS")
                addVendor(newVendor)
                navigate("/vendors")}else{alert("Failed")}}
        ).catch(
            rejection => alert(rejection)
        );
    }

    return (
        <div>
            <div className="addVendor">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name"><b>Name:</b></label><br />
                    <input onChange={handleNameChange} id="name"></input><br />

                    <label htmlFor="email"><b>Email:</b></label><br />
                    <input onChange={handleEmailChange} id="email"></input><br />

                    <label htmlFor="phone"><b>Phone:</b></label><br />
                    <input onChange={handlePhoneChange} id="phone"></input><br />
                    <button>Submit</button> <br />
                </form>
            </div>
        </div>
    )
}

export default AddVendor;