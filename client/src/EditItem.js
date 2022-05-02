import { useEffect, useState,useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

function EditItem(){

    const [toEdit, setToEdit] = useState(null);
    //const [userStatus, setUserStatus] = useContext(AuthContext);
    const navigate = useNavigate();
    const{itemId} = useParams();

    useEffect(() => {
        //const jwt = localStorage.getItem( "token" );
        //if(jwt) 
        //{
            fetch("http://localhost:8080/api/item/" + itemId,
                    {
                        headers: {
                        //    "Authorization": "Bearer " + jwt
                        }
                    }
            )
            .then((response) => {
                if(response.status !== 200){
                    return Promise.reject("Failed");
                }
                return response.json();
            })
            .then(retrievedItem => {
                console.log( retrievedItem );
                setToEdit( retrievedItem );})
            .catch(console.log);
        //}
        //else{
        //   navigate("./login");
        //}
   
    },[])

    function handleNameChange(event) {
        let copy = {...toEdit}
        copy.name=event.target.value;
        setToEdit(copy);
    }
    function handleQuantityChange(event) {
        let copy = {...toEdit}
        copy.quantity=event.target.value;
        setToEdit(copy);
    }
    function handleScaleChange(event) {
        let copy = {...toEdit}
        copy.scale=event.target.value;
        setToEdit(copy);
    }

    function handleSubmit(e) {
        e.preventDefault();

        //const jwt = localStorage.getItem("token");

        fetch("http://localhost:8080/api/item/" + itemId,{
            method: "PUT",
            headers: {
            //    "Authorization": "Bearer " + jwt,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(toEdit)
        }).then(
            response => {
                if(response.status == 204){
                    navigate("/items");
                }else{
                    alert("failed");
                }
            }
        ).catch(
            rejection => alert(rejection)
        );
    }

    return toEdit ? <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label><br/>
        <input id = "name" value={toEdit.name} onChange={handleNameChange}></input><br/>
        <label htmlFor="quantity">Quantity:</label><br/>
        <input id = "quantity" value={toEdit.quantity} onChange={handleQuantityChange}></input><br/>
        <label htmlFor="scale">Scale:</label><br/>
        <input id = "scale" value={toEdit.scale} onChange={handleScaleChange}></input><br/>
        <button> Submit </button>
    </form>:
       <></>
}

export default EditItem;