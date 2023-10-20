import React from 'react'
import '../UserCSS.css'
import { Outlet, Link } from "react-router-dom";
const Navbar = () => {
    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <h1 className="navbar-brand">Admin</h1>
                    <div className="  d-flex justify-content-between" >
                        <Link to="/adduser">
                            <button className=" m-2 btn btn-success" > Add </button>
                        </Link>
                        <Link to="/">
                            <button className=" m-2 btn btn-info" > List </button>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
};

export default Navbar;