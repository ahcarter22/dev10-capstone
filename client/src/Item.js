import EditItem from './EditItem';
import DeleteItem from './DeleteItem';
import { useContext } from 'react';
import AuthContext from './AuthContext';
import {Link} from 'react-router-dom';

function Item(props) {
    console.log(props.itemObj)

    const {itemId, name, email, phone} = props.itemObj;
    // const [user, setUser] = useContext(AuthContext);

    return (
        <div className="item-card">
            <p><b>Id:</b> {itemId}</p>
            <p><b>Name:</b> {name}</p>
            <p><b>Email:</b> {email}.</p>
            <p><b>Phone:</b> {phone}</p>
      
        </div>
    )

}

export default Item;