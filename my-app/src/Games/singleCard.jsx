import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Rate, Input, Button, message } from 'antd';
import Header from '../Home/Header';
import Footer from '../Home/Footer';

const SingleCard = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);
    const [feedbacks, setFeedbacks] = useState([]);

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
    const handleSubmitFeedback = () => {
        if (!feedback) {
            message.error('Please enter your name and feedback');
            return;
        }

        const newFeedback = { feedback, rating };
        const updatedFeedbacks = [...feedbacks, newFeedback];


        setFeedbacks(updatedFeedbacks);
        localStorage.setItem(`feedbacks_${id}`, JSON.stringify(updatedFeedbacks));

        const storedRatings = JSON.parse(localStorage.getItem('ratings')) || {};
        storedRatings[id] = rating;
        localStorage.setItem('ratings', JSON.stringify(storedRatings));


        setFeedback('');
        setRating(rating);

        message.success('Feedback submitted successfully');
    };
    const handleDeleteFeedback = (indexToDelete) => {
        const updatedFeedbacks = feedbacks.filter((_, index) => index !== indexToDelete);
        setFeedbacks(updatedFeedbacks);
        localStorage.setItem(`feedbacks_${id}`, JSON.stringify(updatedFeedbacks));

        message.success('Feedback deleted successfully');
    };
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
                    <Rate disabled value={post.rating} />
                        <h1>{post.title}</h1>
                        <p>{post.description}</p>

                    </div>
                    
                </div>
                <div className='feedbackContainer'>
                    <h3>Leave Feedback</h3>

                    <Input.TextArea
                        placeholder="Your Feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows={4}
                        style={{ marginBottom: '10px' }}
                    />
                    <div>
                        <Rate
                            onChange={setRating}
                            value={rating}
                        />
                    </div>
                    <Button 
                    type="primary" 
                    onClick={handleSubmitFeedback} 
                    className='feedbackBtn'
                    style={{ marginTop: '10px' }}>
                        Submit Feedback
                    </Button>
                    <Button
                        type="default"
                        className='backBtn'
                        onClick={() => navigate(-1)} 
                    >
                        Back
                    </Button>
                </div>
                <div className='submittedFeedbacks' style={{ marginTop: '20px' }}>
                    <h3>Customer Feedback</h3>
                    {feedbacks.length > 0 ? (
                        feedbacks.map((fb, index) => (
                            <div key={index} className='singleFeedback'>
                                <p><strong>{fb.name}</strong></p>
                                <Rate disabled value={fb.rating} />
                                <p>{fb.feedback}</p>
                                <Button
                                    type="link"
                                    onClick={() => handleDeleteFeedback(index)}
                                    style={{ color: 'red' }}>
                                    Delete Feedback
                                </Button>
                                <hr />
                            </div>
                        ))
                    ) : (
                        <p>No feedback yet. Be the first to leave feedback!</p>
                    )}
                </div>
            </div>


            <Footer />
        </div>
    );
}

export default SingleCard;
