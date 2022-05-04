import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";
import { useContext } from "react";

function Nav(){
    return(
        <header>
            <div class="container">
            <h1 class="logo"></h1>
            <img src="https://www.seekpng.com/png/detail/212-2124944_the-warehouse-logo-png-transparent-logo-warehouse.png"
                 width="180" height="60" alt=""></img>
        <nav>
            <ul className='nav-links'>
                <li>
                    <Link  to="/">Home</Link>
                </li> 

                <li>
                    <Link to="/items">Items</Link>
                </li>

                <li>
                    <Link to="/vendors">Vendors</Link>
                </li>

                <li>
                    <Link to="/addItem">Add Item</Link>
                </li>

                <li>
                    <Link to="/addVendor">Add Vendor</Link>
                </li>
            </ul>
        </nav>
        </div>
        </header>
    );
}

export default Nav;