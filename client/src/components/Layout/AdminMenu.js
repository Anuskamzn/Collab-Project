import React from 'react';
import { NavLink } from 'react-router-dom';
import  { useEffect, useState } from 'react';
import axios from 'axios';

const AdminMenu = () => {
    
    return (
        <div className='text-center'>
            <div className="list-group">
                <NavLink to="/dashboard/admin" style={{ textDecoration: 'none' }}>
                    <h4>Admin Panel</h4>
                </NavLink>
                
                <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create Category</NavLink>
                {/* <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Product</NavLink>
                <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Products</NavLink> */}
                <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">All Users</NavLink>
            </div>
            <div>
    </div>
        </div>
    );
};

export default AdminMenu;
