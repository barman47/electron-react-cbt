import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className="head">
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
        </ul>
    </div>
  )
}

export default Header;