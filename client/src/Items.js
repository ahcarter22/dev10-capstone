import { useState, useEffect } from "react";
import Item from "./Item";
import Search from "./Search";


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
            sortedItems.sort((a, b) => a.name - b.name)
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

    function handleEmail() {

        const x = document.getElementById("hideEmailMsg");
        x.id = "showEmailMsg";
        console.log(x);
        const y = document.getElementById("showEmailBtn");
        y.id = "hideEmailBtn";

        items.forEach(item => {
            if (item.quantity < 10) {
                fetch("http://localhost:8080/api/message", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                        Accept: "application/json",
                    },
                    body: JSON.stringify()
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
                    <div className="searchbar">
                        <Search setItems={setItems} />
                    </div>
                    <h1 className="item-bg-text">Items</h1></div>
                <div>

                    <div className="emailbtn" id="showEmailBtn" ><button onClick={handleEmail} className="sendemail">Send Low Quantity Email Warning</button></div>
                    <div id="hideEmailMsg" onClick={handleHideMsg}>

                        <p className="animate__animated animate__heartBeat emailtxt">Warning emails successfully sent to vendors 📤 </p>
                        <button className="hideemail">Hide Msg</button>

                    </div>
                    <div className="sortitem">
                        <p className="sort-label">SORT BY: &emsp;
                            <select className="sortselect" id="select-sorting" onChange={changeSorting}>
                                <option value="random">Please Select</option>
                                <option value="expirationDate">Expiration Date</option>
                                <option value="quantity">Quantity</option>
                                <option value="name">NAME</option>
                            </select></p></div>

                    <div className="itemcards container row">

                        {itemFactory()}</div>
                </div>



            </div>
        </>

    )
}

export default Items;