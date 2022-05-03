import EditItem from './EditItem';
import DeleteItem from './DeleteItem';
import { useContext,useEffect,useState } from 'react';
import AuthContext from './AuthContext';
import {Link} from 'react-router-dom';


function Item(props) {
    console.log(props.itemObj)

    const {itemId, name, quantity, scale, 
        expirationDate, category, vendorId} = props.itemObj;
    // const [user, setUser] = useContext(AuthContext);

    //const [category,setCategory] = useState([]);

    const [vendor,setVendor] = useState([]);

    console.log(props);

    // useEffect(() => {
    //     fetch("http://localhost:8080/api/category/" + categoryId,
    //     {
    //         headers: {
    //         //     Authorization: "Bearer " + localStorage.getItem("token")
    //         }
    //     })
    //     .then(response => {
    //         if (response.status === 200) {
    //             return response.json();
    //         } else {
    //             alert("Something went wrong while fetching...");
    //         }
    //         })
    //     .then(categoryData=>setCategory(categoryData))
    //     .catch(rejection => alert("Failure: " + rejection.status + ": " + rejection.statusText));
    //     }, []);

    useEffect(() => {
            fetch("http://localhost:8080/api/vendor/" + vendorId,
            {
                headers: {
                //     Authorization: "Bearer " + localStorage.getItem("token")
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
            <p><b>Id: </b> {itemId}</p>
            <p><b>Name: </b> {name}</p>
            <p><b>Quantity: </b>{quantity}</p>
            <p><b>Scale: </b>{scale}</p>
            <p><b>Expiration Date: </b>{expirationDate}</p>
            <p><b>Category: </b> {category}</p>
            <p><b>Vendor: </b> {vendor.name}</p>
            <Link to ={'/editItem/'+itemId}><button >EDIT</button></Link>
            <Link to={"/deleteItem/" + itemId} ><button>DELETE</button></Link>
        
      
        </div>
    )

}

export default Item;