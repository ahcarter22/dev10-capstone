import EditItem from './EditItem';
import DeleteItem from './DeleteItem';
import { useContext } from 'react';
import AuthContext from './AuthContext';
import {Link} from 'react-router-dom';

function Item(props) {
    console.log(props.itemObj)

    const {itemId, name, quantity, scale, 
        expirationDate, categoryId, vendorId} = props.itemObj;
    // const [user, setUser] = useContext(AuthContext);

    return (
        <div className="item-card">
            <p><b>Id: </b> {itemId}</p>
            <p><b>Name: </b> {name}</p>
            <p><b>Quantity: </b>{quantity}</p>
            <p><b>Scale: </b>{scale}</p>
            <p><b>Expiration Date: </b>{expirationDate}</p>
            <p><b>Category Id: </b> {categoryId}</p>
            <p><b>Vendor Id: </b> {vendorId}</p>
        
      
        </div>
    )

}

export default Item;