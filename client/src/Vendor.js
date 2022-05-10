import EditVendor from './EditVendor';
import DeleteVendor from './DeleteVendor';
import { useContext } from 'react';
import AuthContext from './AuthContext';
import { NavLink } from 'react-router-dom';

function Vendor(props) {
    console.log(props.vendorObj)

    const { vendorId, name, email, phone } = props.vendorObj;
    const [user, setUser] = useContext(AuthContext);


    return (
        <div class="card col-md-4">
            <div className="row">
            <h1 class="card-titlev">{name}</h1>
                <img class="card-img-top img-fluid" src={"image/warehouse.jpeg"} alt="Card image cap"></img>
            </div>
            <div className="row vendorinfo">
               
                <p className="v"><b>Email:</b> {email}</p>
                <p><b>Phone:</b> {phone}</p>
                <div className="a row">
                    <div className="aa col-md-5">
                <NavLink className="nav-link" to={'/editVendor/' + vendorId}><button className="cardbtn">EDIT</button></NavLink> </div>
                <div className="col-md-6">
                <NavLink className="nav-link" to={"/deleteVendor/" + vendorId} ><button className="cardbtn">DELETE</button></NavLink></div>
                </div>
            </div>
        </div>
    )

}

export default Vendor;