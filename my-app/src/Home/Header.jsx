import React, { useRef } from 'react';
import Auth from '../Auth/Auth';
import './Home.css';
import { Link } from 'react-router-dom';

const Header = () => {
    const authRef = useRef();
    const isAuthorized = !!localStorage.getItem('userId'); 

    const handleRegisterClick = (event) => {
        event.preventDefault();
        authRef.current.showModal(false);
    };

    return (
        <header className='myHeader'>
            <Link to='/' className='logo'>RateVerse</Link>
            <div className='links'>
                <Link to='/'>Games</Link>
                <a href="#contacts">Contacts</a>
                {!isAuthorized && (  
                    <a href="/" onClick={handleRegisterClick}>Register</a>
                )}
            </div>
            <Auth ref={authRef} />
        </header>
    );
};

export default Header;
