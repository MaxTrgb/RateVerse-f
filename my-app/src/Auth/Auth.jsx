import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Registration from './Registration';
import Login from './Login';
import './Form.module.css';

const Auth = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginForm, setIsLoginForm] = useState(true);

    const showModal = () => {
        setIsModalOpen(true);
    };



    const toggleForm = () => {
        setIsLoginForm(!isLoginForm);
    }
    return (
        <>
            <Button
                calssName="authBtn"
                type="primary"
                shape="circle"
                onClick={showModal}
                icon={<UserOutlined style={{color: '#222831'}} />}
                style={{backgroundColor: '#9B3922'}}/>

            <Modal                
                open={isModalOpen}                
                footer={null}
                onCancel={() => setIsModalOpen(false)}
                style={{ backgroundColor: '#222831', color: '#ffffff', borderRadius: '8px', padding: '0px' }}
            >
                {isLoginForm ? <Login toggleForm={toggleForm} /> : <Registration toggleForm={toggleForm} />}
            </Modal>
        </>
    )
}

export default Auth;