import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import 'animate.css';

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
    <div className="deletepg">
        <h2 className="animate__animated animate__swing deletetxt">Are you sure you'd like to delete {toDelete.name}?</h2>
        <button className="cardbtn1" onClick={handleDelete}>Delete</button> &emsp;&emsp;&emsp;
        <button className="cardbtn1" onClick={handleCancel}>Cancel</button>
        <div className="rusure">
            <img src="https://st2.depositphotos.com/1273672/8787/v/950/depositphotos_87872136-stock-illustration-businessman-says-are-you-sure.jpg" width="250"></img>
        </div>
    </div>
: <></> }
    </>
}

export default DeleteItem;