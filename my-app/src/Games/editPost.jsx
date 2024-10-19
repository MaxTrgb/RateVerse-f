import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Button, message, Select, Spin } from 'antd';
import Header from '../Home/Header';
import Footer from '../Home/Footer';
import './games.css';

const { Option } = Select;

const EditPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [genreId, setGenreId] = useState(null);
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    // Fetch genres on component mount
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch('/api/v1/genre/');
                if (!response.ok) {
                    throw new Error('Failed to fetch genres');
                }
                const data = await response.json();
                setGenres(data);
            } catch (error) {
                message.error('Error fetching genres: ' + error.message);
            }
        };

        fetchGenres();
    }, []);

    // Fetch post details on component mount
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/v1/post/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                const data = await response.json();
                setPost(data);
                setTitle(data.title);
                setContent(data.content);
                setImage(data.image);
                setGenreId(data.genre ? data.genre.id : null); // Set genreId from fetched post
            } catch (error) {
                message.error(`Error fetching post: ${error.message || 'Please try again later.'}`);
            }
        };

        fetchPost();
    }, [id]);

    const handleSaveChanges = async () => {
        // Validate that all fields are filled
        if (!title || !content || !image || genreId === null) {
            message.error('Please fill in all fields');
            return;
        }

        // Construct the updatedPost object
        const updatedPost = {
            title,
            content,
            image,
            genreId, // Only send genreId
            userId: parseInt(userId, 10),
            updatedAt: new Date().toISOString(), // Set the updated timestamp
        };

        try {
            const response = await fetch(`/api/v1/post/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPost),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to update post: ${errorData.message || 'Unknown error'}`);
            }

            message.success('Post updated successfully');
            navigate(`/post/${id}`);
        } catch (error) {
            message.error(error.message);
        }
    };

    // Show a loading spinner while fetching post data
    if (!post) {
        return <Spin size="large" />;
    }

    return (
        <div>
            <Header />
            <div className='editPageContainer'>
                <h1>Edit Post</h1>
                <div className='editPostForm'>
                    <Input
                        placeholder='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ marginBottom: '20px' }}
                    />
                    <Select
                        placeholder="Select Genre"
                        value={genreId}
                        onChange={setGenreId}
                        style={{ width: '100%', marginBottom: '20px' }}
                    >
                        {genres.map((genre) => (
                            <Option key={genre.id} value={genre.id}>
                                {genre.name}
                            </Option>
                        ))}
                    </Select>
                    <Input.TextArea
                        placeholder='Content'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={4}
                        style={{ marginBottom: '20px' }}
                    />
                    <Input
                        placeholder='Image URL'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        style={{ marginBottom: '20px' }}
                    />
                    <Button type="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </div>
                <Button
                    type="default"
                    className='backBtn'
                    onClick={() => navigate(-1)}
                    style={{ marginTop: '20px' }}
                >
                    Back
                </Button>
            </div>
            <Footer />
        </div>
    );
};

export default EditPost;
