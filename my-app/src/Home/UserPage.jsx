import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserPage.css';
import Header from './Header';
import Footer from './Footer';
import { Rate, message } from 'antd';
import PostGrid from '../Games/postGrid';

const UserPage = () => {
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',
        image: '',
        rating: 0.0,
    });

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`/api/v1/user/${id == null ? userId : id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user info');
                }
                const data = await response.json();
                setUserInfo(data);
            } catch (error) {
                message.error('Failed to fetch user info');
            }
        };

        if (userId || id) {
            fetchUserInfo();
        }
    }, [id, userId]);

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
            const response = await fetch(`/api/v1/user/${userId}`, {
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
                        <div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <img
                                    src={userInfo.image}
                                    alt={`${userInfo.name}'s avatar`}
                                    className="ava"
                                />

                                <div className='rating'>
                                    <Rate
                                        disabled
                                        value={userInfo.rating}
                                    />
                                </div>
                            </div>

                            <div>
                                {id == null || userId === id
                                    ? <form onSubmit={handleSubmit} className="user-form">
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
                                    :
                                    <h1>{userInfo.name}</h1>
                                }
                            </div>
                        </div>
                        <div>
                            {id == null || userId === id ? <button onClick={handleLogout} className="logout-button">Logout</button> : null}
                        </div>
                    </div>


                </main>
            </div>
            <PostGrid userId={id} userName={userInfo.name} />
            <Footer />
        </div>
    );
};

export default UserPage;
