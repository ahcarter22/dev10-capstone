import { useContext, useState } from 'react';
import AuthContext from './AuthContext';
import { Link, useParams, useNavigate } from "react-router-dom";

function Nav(){
    const [user, setUser] = useContext(AuthContext);
    let {id} = useParams;
    const navigate = useNavigate();

    function handleLogOut(event) {
        event.preventDefault();
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
    }

    console.log(user);

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

                {user?.user ? (
                    <>
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

                        <li><button onClick={handleLogOut}>Logout of {user.user.sub}</button></li>
                    </>
                ): (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
        </div>
        </header>
    );
}

export default Nav;