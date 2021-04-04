import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css' 
const Navbar = () => {
    return (
        <div className='container'>
            Welcome to Tweeter
            <div className="links">
            <Link to='/register' >Register</Link>
            <Link to='/login' >Login</Link>
            </div>
        </div>
    )
}

export default Navbar
