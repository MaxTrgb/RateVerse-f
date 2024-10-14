import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Rate, Input, Button, message } from 'antd';
import Header from '../Home/Header';
import Footer from '../Home/Footer';

const SingleCard = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);
    const [feedbacks, setFeedbacks] = useState([]);


    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/v1/post/${id}`);
                const data = await response.json();
                setPost({
                    id: data.id,
                    imgSrc: data.image,
                    title: data.title,
                    genre: data.genre,
                    description: data.content,
                    rating: data.rating,
                });
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        const fetchUserName = async () => {
            if (userId) {
                try {
                    const response = await fetch(`/api/v1/user/${userId}`);
                    const data = await response.json();
                    setUserName(data.name);
                } catch (error) {
                    console.error('Error fetching user name:', error);
                }
            }
        };

        const fetchComments = async () => {
            try {
                const response = await fetch(`/api/v1/comment/?postId=${id}`);
                const data = await response.json();
                setFeedbacks(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchPost();
        fetchUserName();
        fetchComments();
    }, [id, userId]);

    const handleSubmitFeedback = async () => {
        if (!feedback) {
            message.error('Please enter your feedback');
            return;
        }

        const newComment = {
            userId: parseInt(userId, 10),
            postId: parseInt(id, 10),
            rating: rating,
            message: feedback,
        };

        try {
            const response = await fetch('/api/v1/comment/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComment),
            });

            if (!response.ok) {
                throw new Error('Failed to submit feedback');
            }

            message.success('Feedback submitted successfully');
            setFeedbacks([...feedbacks, { ...newComment, userName }]);
            setFeedback('');
            setRating(0);
        } catch (error) {
            message.error(error.message);
        }
    };

    const handleDeleteFeedback = (indexToDelete) => {
        const feedbackToDelete = feedbacks[indexToDelete];

        if (feedbackToDelete.user.id !== parseInt(userId, 10)) {
            message.error('You can only delete your own comments.');
            return;
        }

        const updatedFeedbacks = feedbacks.filter((_, index) => index !== indexToDelete);
        setFeedbacks(updatedFeedbacks);
        message.success('Feedback deleted successfully');
    }

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className='singleCardContainer'>
                <div className='singleCard'>
                    <div>
                        <img src={post.imgSrc} alt={post.title} />
                    </div>

                    <div className="singleCard-details">
                        <div className='rating'>
                            <Rate disabled value={post.rating} />
                        </div>

                        <h1>{post.title}</h1>
                        <p className='genre'>{post.genre.name}</p>
                        <p>{post.description}</p>
                    </div>
                </div>

                {userId ? (
                    <div className='feedbackContainer'>
                        <h3>Leave Feedback</h3>

                        <Input.TextArea
                            placeholder="Your Feedback"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            rows={4}
                            style={{ marginBottom: '10px' }}
                        />
                        <div className='rating'>
                            <Rate
                                onChange={setRating}
                                defaultValue={5}
                            />
                        </div>
                        <Button
                            type="primary"
                            onClick={handleSubmitFeedback}
                            className='feedbackBtn'
                            style={{ marginTop: '10px' }}>
                            Submit Feedback
                        </Button>
                    </div>
                ) : (

                    <div className='feedbackNotice'>
                        <p>You need to be logged in to leave feedback.</p>
                    </div>
                )}

                <div className='submittedFeedbacks' style={{ marginTop: '20px' }}>
                    <h3>Customer Feedback</h3>
                    {feedbacks.length > 0 ? (
                        feedbacks.map((fb, index) => (
                            <div key={index} className='singleFeedback'>
                                <p>{fb.user.name}</p>
                                <Rate disabled value={fb.rating} />
                                <p>{fb.message}</p>
                                {userId && fb.user.id === parseInt(userId, 10) && (
                                    <Button
                                        type="link"
                                        onClick={() => handleDeleteFeedback(index)}
                                        style={{ color: 'red' }}>
                                        Delete Feedback
                                    </Button>
                                )}
                                <hr />
                            </div>
                        ))
                    ) : (
                        <p>No feedback yet. Be the first to leave feedback!</p>
                    )}
                </div>


                <Button
                    type="default"
                    className='backBtn'
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>
            </div>

            <Footer />
        </div>
    );
}

export default SingleCard;
