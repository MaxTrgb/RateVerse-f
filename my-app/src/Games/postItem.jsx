import React from 'react';
import { Link } from 'react-router-dom';
import './games.css';
import { Rate } from 'antd';

const PostItem = ({ id, imgSrc, title,genre, description, rating }) => {
    return (
        <div>
            <Link style={{ textDecoration: 'none' }} to={`/post/${id}`}>
                <div className="card">
                    <div>
                        <img src={imgSrc} alt="Post" />
                    </div>
                    <div className="card-details">
                        <h2>{title}</h2>
                        <Rate disabled value={rating} />
                        <p className="genre">{genre}</p>
                        <p>{description}</p>                        
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default PostItem;
