import React, { useRef, useState, useEffect } from 'react';
import Auth from '../Auth/Auth';
import './Home.css';
import { Link } from 'react-router-dom';

const Header = () => {
    const authRef = useRef();
    const isAuthorized = localStorage.getItem('userId');
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userId = localStorage.getItem('userId');
            if (userId) {
                try {
                    const response = await fetch(`/api/v1/user/${userId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch user info');
                    }
                    const data = await response.json();
                    setUserInfo(data);
                } catch (error) {
                    console.error('Error fetching user info:', error);
                }
            }
        };

        fetchUserInfo();
    }, [isAuthorized]);

    const handleRegisterClick = (event) => {
        event.preventDefault();
        authRef.current.showModal(false);
    };

    return (
        <header className='myHeader'>
            <Link to='/' className='logo'>RateVerse</Link>
            <div className='links'>
                <Link to='/'>Movies</Link>
                <Link to='/'>TV Shows</Link>
                <Link to='/'>Games</Link>
                <a href="#contacts">Contacts</a>
                {!isAuthorized && (
                    <a href="/" onClick={handleRegisterClick}>Register</a>
                )}

            </div>
            <div>
                {isAuthorized && userInfo && (
                    <Link to="/user">
                        <img
                            src={userInfo.image}
                            alt=""
                            className="user-avatar"
                        />
                    </Link>
                )}
            </div>
            <Auth ref={authRef} />
        </header>
    );
};

export default Header;
