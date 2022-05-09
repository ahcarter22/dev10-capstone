import { useContext, useState } from 'react';
import AuthContext from './AuthContext';
import { Link, useParams, useNavigate, NavLink } from "react-router-dom";

function Nav() {
    const [user, setUser] = useContext(AuthContext);
    let { id } = useParams;
    const navigate = useNavigate();

    function handleLogOut(event) {
        event.preventDefault();
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
    }

    console.log(user);

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div class="container">
                <a class="navbar-brand-image" href="#"><img src="https://template68190.motopreview.com/mt-demo/68100/68190/mt-content/uploads/2018/06/mt-1508-home-logo.png" /></a>
                <a class="navbar-brand" href="#">

                    <name>DUNDER MIFFLIN</name><small>WAREHOUSING & STORAGE</small>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/">Home</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/about">About</NavLink>
                        </li>

                        {user?.user ? (
                            <>
                                <li className="nav-item dropdown">
                                    <a href="#" class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Item</a>
                                    <ul className="dropdown-menu">
                                        <li className="nav-item" aria-labelledby="navbarDropdown">
                                            <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/items">View Items</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/addItem">Add Item</NavLink>
                                        </li>
                                    </ul>
                                </li>

                                <li className="nav-item dropdown">
                                    <a href="#" class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Vendor</a>
                                    <ul className="dropdown-menu">
                                        <li className="nav-item" aria-labelledby="navbarDropdown">
                                            <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/vendors">View Vendors</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/addVendor">Add Vendor</NavLink>
                                        </li>
                                    </ul>
                                </li>

                                <li><button className="logout-btn" onClick={handleLogOut}>Logout of {user.user.sub}</button></li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to="/login">Login</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>

    );
}

export default Nav;