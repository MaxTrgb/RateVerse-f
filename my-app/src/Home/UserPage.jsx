import React, { useState, useEffect } from 'react';
import './UserPage.css';
import Header from './Header';
import Footer from './Footer';
import { message } from 'antd';

const UserPage = () => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',
        image: '',
    });

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`http://localhost:80/api/v1/user/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user info');
                }
                const data = await response.json();
                setUserInfo(data);
            } catch (error) {
                message.error('Failed to fetch user info');
            }
        };

        if (userId) {
            fetchUserInfo();
        }
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:80/api/v1/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo),
            });
            if (!response.ok) {
                throw new Error('Failed to update user info');
            }
           
        
        } catch (error) {
            message.error('Failed to update user info');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        window.location.href = '/';
    };

    return (
        <div>
            <Header />
            <div className="user-page">
                <main >
                    <h1>User Information</h1>
                    <div className="user-info">
                        <img
                            src={userInfo.image}
                            alt="User image"
                            className="ava"
                        />
                        <form onSubmit={handleSubmit} className="user-form">
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={userInfo.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">New Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={userInfo.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-button">Update Info</button>
                        </form>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </div>

                    
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default UserPage;
