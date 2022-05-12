import { getDefaultNormalizer } from "@testing-library/react";
import { useState, useEffect } from "react";
import Item from "./Item";



function Items() {
    const [items, setItems] = useState([]);

    const apiUrl=window.API_URL;

    useEffect(() => {
        fetch(apiUrl + "api/item",
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
        .then(itemData => setItems(itemData))
        .catch(rejection => alert("Failure: " + rejection.status + ": " + rejection.statusText));
        }, []);

    function removeItemFromState(itemId) {
        setItems(items.filter(itemObj => itemObj.itemId !== itemId));
    }

    function itemFactory() {
        const sortedItems = items.sort((a , b) => new Date(a.expirationDate) - new Date(b.expirationDate))
        console.log(sortedItems)
        return sortedItems.map(itemObj => (
            <Item 
                key={itemObj.itemId} 
                itemObj={itemObj} 
                items={items}
                removeFromState={removeItemFromState}
            />
        ))
    }

    function handleEmail(e){
        e.preventDefault();

       
        
        const x = document.getElementById("hideEmailMsg");
        x.id = "showEmailMsg";
        console.log(x);
        const y = document.getElementById("showEmailBtn");
        y.id = "hideEmailBtn";

        items.forEach(item => {
            if (item.quantity < 10){


                const newEmail = {
                    to: "ahcarter22@gmail.com",
                    subject: "warning: " + item.name,
                    text: item.name + "has low quantity"
                };

                fetch(apiUrl + "api/message", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                        Accept: "application/json",
                    },
                    body: JSON.stringify(newEmail)
                }).then(
                    (response) => {
                        if (response.ok) {
                            alert("SUCCESS");
                            // addItem(newItem);
                            // overwriteErrorList([]);
                            // navigate("/items");
                        } else { alert("Failed") }
                    }
                ).catch(
                    rejection => alert(rejection)
                );

            }
        });

    }

    function handleHideMsg(){
        const x = document.getElementById("showEmailMsg");
        x.id = "hideEmailMsg";
        const y = document.getElementById("hideEmailBtn");
        y.id = "showEmailBtn";

    }

    return (

        <>
        
        <div className="item">
        
        <div className="item-page">
        
        <h1 className="item-bg-text">Items</h1>
        
        
        
        <div className="itemcards container row">
        
        <div class="col-md-12">
        
        <div id="showEmailBtn" onClick={handleEmail}><button>Send Low Quantity Email Warning</button></div>
        
        <div id="hideEmailMsg" onClick={handleHideMsg}>
        
        <button>Hide Msg</button>
        
        <p>Low quantity warning emails sent to vendors</p>
        
        </div>
        
        {itemFactory()}</div></div>
        
        
        
        </div>
        
        
        
        </div>
        
        </>    
    )
}

export default Items;