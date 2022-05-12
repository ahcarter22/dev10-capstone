import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

function EditVendor() {

    const [toEdit, setToEdit] = useState(null);
    const [userStatus, setUserStatus] = useContext(AuthContext);
    const navigate = useNavigate();

    const{vendorId} = useParams();
    const apiUrl=window.API_URL;

    useEffect(() => {
        const jwt = localStorage.getItem( "token" );
        if(jwt) 
        {
            fetch(apiUrl + "api/vendor/" + vendorId,
                    {
                        headers: {
                           "Authorization": "Bearer " + jwt
                        }

                    }
                
            )
                .then((response) => {
                    if (response.status !== 200) {
                        return Promise.reject("Failed");
                    }
                    return response.json();
                })
                .then(retrievedVendor => {
                    console.log(retrievedVendor);
                    setToEdit(retrievedVendor);
                })
                .catch(console.log);
        }
        else {
            navigate("./login");
        }

    }, []);

    function handleNameChange(event) {
        let copy = { ...toEdit }
        copy.name = event.target.value;
        setToEdit(copy);
    }
    function handleEmailChange(event) {
        let copy = { ...toEdit }
        copy.email = event.target.value;
        setToEdit(copy);
    }
    function handlePhoneChange(event) {
        let copy = { ...toEdit }
        copy.phone = event.target.value;
        setToEdit(copy);
    }
    function handleImageUrlChange(event) {
        let copy = { ...toEdit }
        copy.imageUrl = event.target.value;
        setToEdit(copy);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const jwt = localStorage.getItem("token");


        fetch(apiUrl + "api/vendor/" + vendorId,{

            method: "PUT",
            headers: {
                "Authorization": "Bearer " + jwt,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(toEdit)
        }).then(
            response => {
                if (response.status == 204) {
                    navigate("/vendors");
                } else {
                    alert("failed");
                }
            }
        ).catch(
            rejection => alert(rejection)
        );
    }

    function handleCancel() {
        navigate("/vendors");
    }

    return toEdit ?
        <div className="addvendor-bg">
            <div className="row addvendor-form container">

                <div class="col-md-5 addvendor-left">
                    <h1 className="vendoradd">EDIT <br />VENDOR</h1></div>
                <div class="col-md-6 addvendor-right">
                    <form onSubmit={handleSubmit}>
                        <label className="login-label" htmlFor="name">Name:</label><br />
                        <input className="add-input" id="name" value={toEdit.name} onChange={handleNameChange}></input><br />
                        <label className="login-label" htmlFor="email">Email:</label><br />
                        <input className="add-input" id="email" value={toEdit.email} onChange={handleEmailChange}></input><br />
                        <label className="login-label" htmlFor="phone">Phone:</label><br />
                        <input className="add-input" id="phone" value={toEdit.phone} onChange={handlePhoneChange}></input><br />
                        <label className="login-label" htmlFor="imageUrl">ImageUrl:</label><br />
                        <input className="add-input" id="imageUrl" value={toEdit.imageUrl} onChange={handleImageUrlChange}></input><br /><br /><br />
                        <button className="cardbtn1"> Submit </button> &emsp;&emsp;
                        <button className="cardbtn1" onClick={handleCancel}>Cancel</button>
                    </form>
                </div>
            </div>
        </div> :
        <></>
}

export default EditVendor;