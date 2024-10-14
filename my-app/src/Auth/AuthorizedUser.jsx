import React, { useState, useEffect } from 'react';
import { Avatar, Button } from 'antd';
import styles from './Form.module.css';

const AuthorizedUser = ({ onLogout }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId'); 

            if (!userId) {
                setError('No user ID found');
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(`/api/v1/user/${userId}`); 
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUserInfo(data);
                console.log(data); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <p className="loading">Loading...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        userInfo && (
            <div className="user-info">
                <Avatar
                    size={64}
                    src={userInfo.image} 
                    alt={userInfo.name}
                    className="avatar"
                />
                <h3 className="user-name">{userInfo.name}</h3>
                <Button
                    type="primary"
                    onClick={onLogout}
                    className="logout-btn"
                >
                    Logout
                </Button>
            </div>
        )
    );
};

export default AuthorizedUser;
