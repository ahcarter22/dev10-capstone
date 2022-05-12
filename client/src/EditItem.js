import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

function EditItem() {
    const [toEdit, setToEdit] = useState(null);
    const [userStatus, setUserStatus] = useContext(AuthContext);
    const navigate = useNavigate();
    const { itemId } = useParams();

    const apiUrl=window.API_URL;

    useEffect(() => {

        const jwt = localStorage.getItem( "token" );
        if(jwt) 
        {
            fetch(apiUrl + "api/item/" + itemId,
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
                .then(retrievedItem => {
                    console.log(retrievedItem);
                    setToEdit(retrievedItem);
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
    function handleQuantityChange(event) {
        let copy = { ...toEdit }
        copy.quantity = event.target.value;
        setToEdit(copy);
    }
    function handleScaleChange(event) {
        let copy = { ...toEdit }
        copy.scale = event.target.value;
        setToEdit(copy);
    }
    function handleExpirationDateChange(event){
        let copy = { ...toEdit }
        copy.expirationDate = event.target.value;
        setToEdit(copy);
    }
    function handleImageUrlChange(event){
        let copy = { ...toEdit }
        copy.imageUrl = event.target.value;
        setToEdit(copy);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const jwt = localStorage.getItem("token");

        fetch(apiUrl + "api/item/" + itemId,{

            method: "PUT",
            headers: {
                "Authorization": "Bearer " + jwt,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(toEdit)
        }).then(
            response => {
                if (response.status == 204) {
                    navigate("/items");
                } else {
                    alert("failed");
                }
            }
        ).catch(
            rejection => alert(rejection)
        );
    }

    function handleCancel() {
        navigate("/items");
    }

    return toEdit ?
        <>
            <div className="additem-bg">
                <div className="row additem-form container">

                    <div class="col-md-5 additem-left">
                        <h1 className="itemadd">EDIT <br />ITEM</h1></div>
                    <div class="col-md-6 additem-right">
                        <form onSubmit={handleSubmit}>
                            <label className="login-label" htmlFor="name">Name:</label><br />
                            <input className="add-input" id="name" value={toEdit.name} onChange={handleNameChange}></input><br />
                            <label className="login-label" htmlFor="quantity">Quantity:</label><br />
                            <input className="add-input" id="quantity" value={toEdit.quantity} onChange={handleQuantityChange}></input><br />
                            <label className="login-label" htmlFor="scale">Scale:</label><br />
                            <input className="add-input" id="scale" value={toEdit.scale} onChange={handleScaleChange}></input><br />
                            <label className="login-label" htmlFor="exp">Expiration Date:</label><br />
                            <input className="add-input" id="exp" value={toEdit.expirationDate} onChange={handleExpirationDateChange}></input><br />
                            <label className="login-label" htmlFor="imageUrl">ImageUrl:</label><br />
                            <input className="add-input" id="imageUrl" value={toEdit.imageUrl} onChange={handleImageUrlChange}></input><br /><br /><br />
                            <button className="cardbtn1"> Submit </button>  &emsp; &emsp;
                            <button className="cardbtn1" onClick={handleCancel}>Cancel</button>

                        </form>
                    </div>
                </div>
            </div>
        </>
        :
        <></>
}

export default EditItem;