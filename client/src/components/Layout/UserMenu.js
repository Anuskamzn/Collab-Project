import React from 'react';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
    return (
            <div className='text-center'>
                <div className="list-group">
                    <h4>Dashboard</h4>
                    <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Profile</NavLink>
                    <NavLink to="/dashboard/user/adopt" className="list-group-item list-group-item-action">Adopt Pet</NavLink>
                    {/* <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">All Users</NavLink> */}
                </div>
            </div>
    );
};

export default UserMenu;
