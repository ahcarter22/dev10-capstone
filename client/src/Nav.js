import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";
import { useContext } from "react";

function Nav(){
    return(
        <nav>
            <ul className='nav-links'>
                <li>
                    <Link  to="/">Home</Link>
                </li> 

                <li>
                    <Link to="/items">Show All Items</Link>
                </li>

                <li>
                    <Link to="/addItem">Add an Item</Link>
                </li>

                <li>
                    <Link to="/vendors">Show All Vendors</Link>
                </li>

                <li>
                    <Link to="/addVendor">Add an Vendor</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;