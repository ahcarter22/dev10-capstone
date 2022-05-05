import EditVendor from './EditVendor';
import DeleteVendor from './DeleteVendor';
import { useContext } from 'react';
import AuthContext from './AuthContext';
import {Link} from 'react-router-dom';

function Vendor(props) {
    console.log(props.vendorObj)

    const {vendorId, name, email, phone} = props.vendorObj;
    const [user, setUser] = useContext(AuthContext);


    return (
        <div className="vendor-card">
            <p><b>Id:</b> {vendorId}</p>
            <img src="image/warehouse.jpeg"></img>
            <p><b>Name:</b> {name}</p>
            <p><b>Email:</b> {email}</p>
            <p><b>Phone:</b> {phone}</p>
            <Link to ={'/editVendor/'+vendorId}><button >EDIT</button></Link> &emsp;
            <Link to={"/deleteVendor/" + vendorId} ><button>DELETE</button></Link>

      
        </div>
    )

}

export default Vendor;