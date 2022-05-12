import EditItem from './EditItem';
import DeleteItem from './DeleteItem';
import { useContext, useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { NavLink,Link } from 'react-router-dom';


function Item(props) {
    console.log(props.itemObj)

    const { itemId, name, quantity, scale,
        expirationDate, imageUrl, categoryId, vendorId } = props.itemObj;
    const [user, setUser] = useContext(AuthContext);

    const [category, setCategory] = useState([]);

    const [vendor, setVendor] = useState([]);

    console.log(props);

    const apiUrl=window.API_URL;

    useEffect(() => {

        fetch(apiUrl + "api/category/" + categoryId,
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
            .then(categoryData => setCategory(categoryData))
            .catch(rejection => alert("Failure: " + rejection.status + ": " + rejection.statusText));
    }, []);

    useEffect(() => {

            fetch(apiUrl + "api/vendor/" + vendorId,

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
            .then(vendorData => setVendor(vendorData))
            .catch(rejection => alert("Failure: " + rejection.status + ": " + rejection.statusText));
    }, []);


    return (
        <div class="card col-md-6">
            <div className="row"><h1 class="card-title">{name}</h1>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <img class="card-img-top img-fluid" src={imageUrl} alt="Card image cap"></img></div>

                <div className="col-md-6">
                     
                        <p className="cardinfo"><b>Quantity:</b> {quantity} {scale}</p>
                        <p className="cardinfo"><b>Expiration Date: </b>{expirationDate}</p>
                        <p className="cardinfo"><b>Category: </b> {category}</p>
                        <p className="cardinfo"><b>Vendor: </b> {vendor.name}</p>
                      
                    <NavLink className="nav-link" to={'/editItem/' + itemId}><button className="cardbtn">EDIT</button></NavLink> 
                    <NavLink className="nav-link" to={"/deleteItem/" + itemId} ><button className="cardbtn">DELETE</button></NavLink>
              
                </div>
            </div>


        </div>
    )

}

export default Item;