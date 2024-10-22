import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Rate, Input, Button, message } from 'antd';
import Header from '../Home/Header';
import Footer from '../Home/Footer';

const SingleCard = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState('');
    const [feedbacks, setFeedbacks] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {

        const fetchUserName = async () => {
            if (userId) {
                try {
                    const response = await fetch(`/api/v1/user/${userId}`);
                    const data = await response.json();
                    setUserName(data.name);
                } catch (error) {
                    message.error('Error fetching user name:', error);
                }
            }
        };

        const fetchComments = async () => {
            try {
                const response = await fetch(`/api/v1/comment/?postId=${id}`);
                const data = await response.json();
                setFeedbacks(data);
            } catch (error) {
                message.error('Error fetching comments:', error);
            }
        };

        fetchPost();
        fetchUserName();
        fetchComments(); 
    }, [id, userId]);

    const fetchPost = async () => {
        try {
            const response = await fetch(`/api/v1/post/${id}`);
            const data = await response.json();
            setPost(data);
        } catch (error) {
            message.error('Error fetching post:', error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await fetch(`/api/v1/comment/?postId=${id}`);
            const data = await response.json();
            setFeedbacks(data);
        } catch (error) {
            message.error('Error fetching comments:', error);
        }
    };

    const handleSubmitFeedback = async () => {
        if (!feedback) {
            message.error('Please enter your feedback');
            return;
        }

        const newComment = {
            userId: parseInt(userId, 10),
            postId: parseInt(id, 10),
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
            setFeedback('');
            await fetchComments(); 
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
    };

    const handleEditPost = () => {
        navigate(`/edit-post/${post.id}`);
    };

    const handleDeletePost = async () => {
        try {
            const response = await fetch(`/api/v1/post/${post.id}?userId=${post.user.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to delete post: ${errorData.message || 'Unknown error'}`);
            }

            message.success('Post deleted successfully');
            navigate('/');
        } catch (error) {
            message.error(error.message);
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className='singleCardContainer'>
                <div className='singleCard'>
                    <div className='postAuthor'>
                        <Link className='postAuthorLink' to={`/user/${post.user.id}`}>
                            <img src={post.user.image} alt={post.user.name} className='postAuthorPic' />
                            <p className='postUserName'>
                                <b>{post.user.name}</b>
                            </p>
                        </Link>

                        <p className='postDate'>
                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </p>
                    </div>
                    <div>
                        <img src={post.image} alt={post.title} />
                    </div>

                    <div className="singleCard-details">
                        <div className='rating'>
                            <Rate disabled value={post.rating} />
                        </div>

                        <h1>{post.title}</h1>

                        <p className='genre'>{post.genre?.name || 'No genre available'}</p>
                        <p>{post.content}</p>

                        {userId && post.user.id === parseInt(userId, 10) && (
                            <div className='postActions'>
                                <Button type="primary" onClick={handleEditPost} style={{ marginRight: '10px' }}>
                                    Edit
                                </Button>
                                <Button type="danger" onClick={handleDeletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <RatingSection postId={post.id} userId={userId} fetchPost={fetchPost}/>

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
                        <Button
                            type="primary"
                            onClick={handleSubmitFeedback}
                            className='feedbackBtn'
                            style={{ marginTop: '10px' }} >
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
                                <Link className='feedbackAuthor' to={`/user/${fb.user.id}`}>
                                    <img src={fb.user?.image} alt={fb.user?.name} className='feedbackAuthorPic' />
                                    <p className='feedbackAuthorName'>{fb.user?.name}</p>
                                </Link>

                                <h2>{fb.message}</h2>
                                {userId && fb.user?.id === parseInt(userId, 10) && (
                                    <Button
                                        type="link"
                                        onClick={() => handleDeleteFeedback(index)}
                                        style={{ color: 'red' }}>
                                        Delete Feedback
                                    </Button>
                                )}
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
};

const RatingSection = ({ postId, userId, fetchPost }) => {
    const [existingRating, setExistingRating] = useState(null);
    const [rate, setRate] = useState(-1);
    
    useEffect(() => {
        const fetchUserRating = async () => {
            if (userId) {
                try {
                    const response = await fetch(`/api/v1/post/rate/${postId}?userId=${userId}`);
                    
                    if (response.status === 404) {
                        return;
                    }

                    if (!response.ok) {
                        throw new Error('Failed to fetch user rating');
                    }
                    
                    const data = await response.json();

                    if (data && data.postRate !== undefined) {
                        setExistingRating(data.postRate);
                    }
                } catch (error) {
                    message.error('Error fetching user rating');
                }
            }
        };

        fetchUserRating();
    }, [postId, userId]);

    const handleRatingSubmit = async (newRating) => {
        if (!userId) {
            message.error('You need to be logged in to submit a rating.');
            return;
        }

        try {
            const response = await fetch(`/api/v1/post/rate/${postId}?userId=${userId}&rating=${newRating}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to submit rating');
            }

            message.success('Rating submitted successfully');
            await fetchPost();
        } catch (error) {
            message.error(error.message);
        }
    };

    const handleRatingChange = (value) => {
        setRate(value);
        handleRatingSubmit(value);
    };

    return (
        <div className='ratingSection'>
            <Rate  
                value={existingRating || rate}
                onChange={handleRatingChange}
                disabled={existingRating != null || rate != -1}
            />
        </div>
    );
};

export default SingleCard;
