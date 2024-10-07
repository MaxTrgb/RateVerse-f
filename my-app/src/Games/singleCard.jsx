import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Rate, Input, Button, message } from 'antd';
import Header from '../Home/Header';
import Footer from '../Home/Footer';

const SingleCard = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await response.json();
                setPost({
                    id: data.id,
                    imgSrc: data.image,
                    title: data.title,
                    description: data.description,
                    rating: data.rating.rate,
                });
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchPost();
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div >
            <Header />
            <div className='singleCardContainer'>
                <div className='singleCard'>
                    <div>
                        <img src={post.imgSrc} alt={post.title} />
                    </div>
                    <div className="singleCard-details">
                        <h1>{post.title}</h1>
                        <p>{post.description}</p>

                    </div>
                </div>
                <div className='feedbackContainer'>
                    <Rate value={post.rating} />
                    <Input
                        placeholder="Enter your feedback"
                        onChange={(e) => {
                            message.success(e.target.value);
                        }}
                    />

                    <Button
                        type="primary"
                        className='feedbackBtn'
                        onClick={() => {
                            message.success('Thank you for your feedback!');
                        }}
                    >
                        Submit
                    </Button>
                    <Button
                        type="default"
                        className='backBtn'
                        onClick={() => navigate(-1)} 
                    >
                        Back
                    </Button>

                </div>
            </div>


            <Footer />
        </div>
    );
}

export default SingleCard;
