import EditItem from './EditItem';
import DeleteItem from './DeleteItem';
import { useContext,useEffect,useState } from 'react';
import AuthContext from './AuthContext';
import {Link} from 'react-router-dom';


function Item(props) {
    console.log(props.itemObj)

    const {itemId, name, quantity, scale, 
        expirationDate,imageUrl, categoryId, vendorId} = props.itemObj;
    const [user, setUser] = useContext(AuthContext);

    const [category,setCategory] = useState([]);

    const [vendor,setVendor] = useState([]);

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
        .then(categoryData=>setCategory(categoryData))
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
            .then(vendorData=>setVendor(vendorData))
            .catch(rejection => alert("Failure: " + rejection.status + ": " + rejection.statusText));
            }, []);


    return (
        <div className="item-card">
            <p className="name"><b>{name}</b></p>
            <img src={imageUrl}  width="180" height="160"></img>
            <p><b>Quantity: </b>{quantity} {scale}</p>
            <p><b>Expiration Date: </b>{expirationDate}</p>
            <p><b>Category: </b> {category}</p>
            <p><b>Vendor: </b> {vendor.name}</p>
            <Link to ={'/editItem/'+itemId}><button >EDIT</button></Link> &emsp;
            <Link to={"/deleteItem/" + itemId} ><button>DELETE</button></Link>
        
      
        </div>
    )

}

export default Item;