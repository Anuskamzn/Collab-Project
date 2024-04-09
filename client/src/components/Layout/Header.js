import React from "react";
import { NavLink, Link } from 'react-router-dom';
import { MdOutlinePets } from "react-icons/md";
import { useAuth } from "../../context/auth";
import toast from 'react-hot-toast';
import SearchInput from "../Form/SearchInput";

const Header = () => {
    const [auth, setAuth] = useAuth();

    const handleLogout = () => {
        setAuth({
            ...auth, user:null, token: ''
        });
        localStorage.removeItem('auth');
        toast.success('Logout Success');
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand"><MdOutlinePets/>Pet Pals</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <SearchInput />
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link active" aria-current="page">Home</NavLink>
                            </li>
                            {auth.user ? (
                                <li className="nav-item dropdown">
                                    <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {auth?.user?.name}
                                    </NavLink>
                                    <ul className="dropdown-menu">
                                    <li>
                                    <NavLink to={`/dashboard/${
                                        auth?.user?.role === 1 ? "admin": auth?.user?.role === 2 ? "shelter": "user"
                                    }`}
                                        className="dropdown-item"
                                    >
                                        Dashboard
                                    </NavLink>
                      </li>
                                        <li>
                                            <NavLink onClick={handleLogout} to="/login" className="dropdown-item">Logout</NavLink>
                                        </li>
                                    </ul>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link">Login</NavLink>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
