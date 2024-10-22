import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './games.css';
import { Rate } from 'antd';

const PostItem = ({ id, imgSrc, title, genre, description, rating, authorName, createdAt }) => {
    const [authorImg, setAuthorImg] = useState('');

    useEffect(() => {
        const fetchAuthorImg = async () => {
            try {
                const response = await fetch(`/api/v1/post/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post details');
                }
                const data = await response.json();
                setAuthorImg(data.user.image);
            } catch (error) {
                console.error('Error fetching author image:', error);
            }
        };

        fetchAuthorImg();
    }, [id]);

    return (
        <div>
            <Link style={{ textDecoration: 'none' }} to={`/post/${id}`}>
                <div className="card">
                    <div>
                        <div>
                            <div className='postAuthor'>
                                <Link className='postAuthorLink'to={`/user/${authorName}`}>
                                    <img src={authorImg} alt="" className='postAuthorPic' />
                                    <p className='postUserName'>
                                        <b>{authorName}</b>
                                    </p>
                                </Link>

                                <p className='postDate'>
                                    {new Date(createdAt).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </p>
                            </div>
                            <img src={imgSrc} alt="Post" />
                        </div>
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
