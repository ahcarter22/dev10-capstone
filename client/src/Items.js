import { getDefaultNormalizer } from "@testing-library/react";
import { useState, useEffect } from "react";
import Item from "./Item";
import Search from "./Search";



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
       
        return items.map(itemObj => (
            <Item
                key={itemObj.itemId}

                itemObj={itemObj}
                items={items}
                removeFromState={removeItemFromState}
            />
        ))
    }

    function changeSorting() {
        var sortBy = document.getElementById("select-sorting").value;
        let sortedItems = [...items];
        if (sortBy == "quantity") {
            sortedItems.sort((a, b) => a.quantity - b.quantity)
        } else if (sortBy == "name") {
            sortedItems.sort((a, b) => a.name.localeCompare(b.name))
        } else {
            sortedItems.sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate));
        }
        console.log("before", items === sortedItems);
        setItems(sortedItems);
        console.log("after", items === sortedItems);

        return sortedItems.map(itemObj => (
            <Item
                key={itemObj.itemId}
                itemObj={itemObj}
                items={items}
                removeFromState={removeItemFromState}
            />
        ))
    }
    // function changeSorting() {
    //     var sortBy = document.getElementById("select-sorting").value;
    //     document.getElementById("sort-value").innerHTML(sortBy);
    // }

   


    function handleEmail(e){
        e.preventDefault();
        const x = document.getElementById("hideEmailMsg");
        x.id = "showEmailMsg";
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

    function handleHideMsg() {
        const x = document.getElementById("showEmailMsg");
        x.id = "hideEmailMsg";
        const y = document.getElementById("hideEmailBtn");
        y.id = "showEmailBtn";

    }

    return (

        <>


            <div className="item">
                <div className="item-page">
                    
                    <h1 className="item-bg-text">Items</h1></div>
                <div>

                    <div className="emailbtn" id="showEmailBtn" ><button onClick={handleEmail} className="sendemail">Send Low Quantity Email Warning</button></div>
                    <div id="hideEmailMsg" onClick={handleHideMsg}>

                        <p className="animate__animated animate__heartBeat emailtxt">Warning emails successfully sent to vendors 📤 </p>
                        <button className="hideemail">Hide Msg</button>

                    </div>
                    <div className= "row">
                    <div className="col-md-6 sortitem">
                        <p className="sort-label">SORT BY: &emsp;
                            <select className="sortselect" id="select-sorting" onChange={changeSorting}>
                                <option value="random">Please Select</option>
                                <option value="expirationDate">Expiration Date</option>
                                <option value="quantity">Quantity (low to high)</option>
                                <option value="name">NAME (A to Z)</option>
                            </select></p></div>
                            <div className="col-md-6 searchbar">
                        <Search setItems={setItems} />
                    </div></div>

                    <div className="itemcards container row">

                        {itemFactory()}</div>
                </div>



            </div>
        </>


    )
}

export default Items;