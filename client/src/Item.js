import EditItem from './EditItem';
import DeleteItem from './DeleteItem';
import { useContext,useEffect,useState } from 'react';
import AuthContext from './AuthContext';
import {Link} from 'react-router-dom';


function Item(props) {
    console.log(props.itemObj)

    const {itemId, name, quantity, scale, 
        expirationDate, categoryId, vendorId} = props.itemObj;
    // const [user, setUser] = useContext(AuthContext);

    const [categoryName,setCategoryName] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/category",
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
        .then(categoryData=>setCategoryName(categoryData))
        .catch(rejection => alert("Failure: " + rejection.status + ": " + rejection.statusText));
        }, []);


    return (
        <div className="item-card">
            <p><b>Id: </b> {itemId}</p>
            <p><b>Name: </b> {name}</p>
            <p><b>Quantity: </b>{quantity}</p>
            <p><b>Scale: </b>{scale}</p>
            <p><b>Expiration Date: </b>{expirationDate}</p>
            <p><b>Category Name: </b> {categoryName}</p>
            <p><b>Vendor Id: </b> {vendorId}</p>
            <Link to ={'/editItem/'+itemId}><button >EDIT</button></Link>
            <Link to={"/deleteItem/" + itemId} ><button>DELETE</button></Link>
        
      
        </div>
    )

}

export default Item;