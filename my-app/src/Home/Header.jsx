import React, { useRef, useState, useEffect } from 'react';
import Auth from '../Auth/Auth';
import './Home.css';
import { Link } from 'react-router-dom';
import leftArrow from '../assets/leftArrow.png'; 
import rightArrow from '../assets/rightArrow.png'; 
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const authRef = useRef();
    const isAuthorized = localStorage.getItem('userId');
    const [userInfo, setUserInfo] = useState(null);
    const [totalPosts, setTotalPosts] = useState(0);
    const [isHeaderVisible, setIsHeaderVisible] = useState(false);
    const navigate = useNavigate();


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

        const fetchTotalPosts = async () => {
            try {
                const response = await fetch('/api/v1/post/');
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const posts = await response.json();
                setTotalPosts(posts.length);
            } catch (error) {
                console.error('Error fetching total posts:', error);
            }
        };

        fetchUserInfo();
        fetchTotalPosts();
    }, [isAuthorized]);

    const handleRegisterClick = (event) => {
        event.preventDefault();
        authRef.current.showModal(false);
    };

    const handleRandomPostClick = () => {
        const randomId = Math.floor(Math.random() * totalPosts) + 1;
        return `/post/${randomId}`;
    };

    const toggleHeaderVisibility = () => {
        setIsHeaderVisible((prev) => !prev);
    };

    return (
        <>
            <header className={`myHeader ${isHeaderVisible ? 'visible' : ''}`}>
                
                <div className='links'>
                    <Link to={handleRandomPostClick()} onClick={handleRandomPostClick}>Feeling Lucky</Link>
                    <Link to='/'>Games</Link>
                    <a href="#contacts">Contacts</a>
                    {!isAuthorized && (
                        <a href="/" onClick={handleRegisterClick}>Register</a>
                    )}
                </div>
                <hr style={{ width: '80%', backgroundColor: 'gray' }} />
                <div>
                    {isAuthorized && userInfo && (
                        <Link to={`/user/${userInfo.id}`}>
                            <img
                                src={userInfo.image}
                                alt=""
                                className="user-avatar"
                            />
                        </Link>
                    )}
                </div>
                <Auth ref={authRef} />
                {isAuthorized && (
                <div className='addPost'>
                    <Button
                        type="primary"
                        onClick={() => navigate('/create-post')}
                        className='addPostBtn'>
                        Add Post
                    </Button>
                </div>
            )}
            </header>
            <button className="toggleButton" onClick={toggleHeaderVisibility}>
                <img
                    src={isHeaderVisible ? leftArrow : rightArrow}
                    alt={isHeaderVisible ? 'Hide Header' : 'Show Header'}
                    style={{ width: '20px', height: '20px', backgroundColor: 'transparent' }} 
                />
            </button>
        </>
    );
};

export default Header;
