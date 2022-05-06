import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function DeleteItem(){
    const nav = useNavigate();
    const{itemId} = useParams();

    const [toDelete, setToDelete] = useState(null);

    useEffect( 
        () => {

            const jwt = localStorage.getItem( "token" );
            if( jwt ){
                
                fetch( "http://localhost:8080/api/item/" + itemId,
                    {
                        headers: {
                           Authorization: "Bearer " + jwt
                        }
                    }
                )
                .then( response => {
                    if( response.status == 200 ){
                        return response.json();
                    } else {
                        console.log( response );
                        alert( "retrieving toDelete failed");
                    }
                })
                .then( retrievedItem => {
                    console.log( retrievedItem );
                    setToDelete( retrievedItem );
                })
                .catch( rejection => {
                    console.log( rejection );
                    alert( "something very bad happened...");
                });
           } else {
               nav("/login");
            }
        },
        []
    );

    function handleCancel() {
        nav("/items");
    }

    function handleDelete() {
        fetch("http://localhost:8080/api/item/" + itemId, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            if (response.status === 204) {
                alert("Deleted successfully!");
                nav("/items");
            } else {
                console.log(response);
                alert("Delete unsuccessful.");
            }
        })
        .catch(
            rejection => { 
                console.log("Failure ", rejection);
                alert("Something really bad happened"); 
            }

        );
    }

    return <>
    { toDelete ?
    <div className="formInfo">
        <h2>Are you sure you'd like to delete {toDelete.name}?</h2>
        <button onClick={handleDelete}>Delete</button> &emsp;
        <button onClick={handleCancel}>Cancel</button>
    </div>
: <></> }
    </>
}

export default DeleteItem;