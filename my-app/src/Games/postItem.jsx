import React from 'react';
import { Link } from 'react-router-dom';
import './games.css';
import { Rate } from 'antd';

const PostItem = ({ id, imgSrc, title, description, rating }) => {
    return (
        <div className='postGrid'>
            <Link style={{ textDecoration: 'none' }} to={`/post/${id}`}>
                <div className="card">
                    <div>
                        <img src={imgSrc} alt="Post" />
                    </div>
                    <div className="card-details">
                        <h2>{title}</h2>
                        <p>{description}</p>
                        <Rate disabled value={rating} />
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default PostItem;
