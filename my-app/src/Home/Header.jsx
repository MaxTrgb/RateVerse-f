import React, { useRef } from 'react';
import Auth from '../Auth/Auth';
import './Home.css';
import { Link } from 'react-router-dom';

const Header = () => {
    const authRef = useRef();

    const handleRegisterClick = (event) => {
        event.preventDefault();
        authRef.current.showModal(false); 
    };

    return (
        <header className='myHeader'>
            <Link to='/' className='logo'>Denmap</Link>
            <div className='links'>
                <Link to='/'>Games</Link>
                <a href="#contacts">Contacts</a>
                <a href="/" onClick={handleRegisterClick}>Register</a> 
            </div>
            <Auth ref={authRef} />
        </header>
    );
};

export default Header;
