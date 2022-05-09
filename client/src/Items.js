import { useState, useEffect } from "react";
import Item from "./Item";


function Items() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/item",
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

    return (
        <div className="item">
            <div className="item-page">
              <h1 className="item-bg-text">Items</h1>
                <div className="itemcards container row">
                    <div class="col-md-12">{itemFactory()}</div></div>
               
            </div>
          
        </div>
    )
}

export default Items;