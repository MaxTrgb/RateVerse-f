import React, { useState, useEffect } from 'react';
import { Input, Button, message, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from '../Home/Header';
import Footer from '../Home/Footer';
import './games.css';

const { Option } = Select;

const CreatePost = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch('http://34.116.253.154/api/v1/genre/');
                const data = await response.json();
                setGenres(data);
            } catch (error) {
                message.error('Error fetching genres: ' + error.message);
            }
        };

        fetchGenres();
    }, []);

    const handleSubmit = async () => {
        if (!title || !genre || !description || !imgUrl) {
            message.error('Please fill in all fields');
            return;
        }

        const userId = localStorage.getItem('userId');

        const newPost = {
            userId: parseInt(userId, 10),
            title,
            image: imgUrl,
            content: description,
            genreId: parseInt(genre, 10)
        };

        setLoading(true);

        try {
            const response = await fetch('http://34.116.253.154/api/v1/post/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPost)
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            const result = await response.json();
            if (result && result.id) {
                console.log('New Post Created:', result);
                message.success('Post created successfully');
                navigate(`/post/${result.id}`);
            } else {
                message.error('Error: Post creation succeeded, but no post ID was returned.');
            }




        } catch (error) {
            message.error('Error creating post: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <div className='createPost'>
                <div className='createPostContainer'>
                    <h1>Create Post</h1>
                    <Input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ marginBottom: '10px' }}
                    />
                    <Select
                        placeholder="Select Genre"
                        value={genre}
                        onChange={setGenre}
                        style={{ width: '50%', marginBottom: '10px' }}
                    >
                        {genres.map((g) => (
                            <Option key={g.id} value={g.id}>
                                {g.name}
                            </Option>
                        ))}
                    </Select>
                    <Input.TextArea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        style={{ marginBottom: '10px' }}
                    />
                    <Input
                        placeholder="Image URL"
                        value={imgUrl}
                        onChange={(e) => setImgUrl(e.target.value)}
                        style={{ marginBottom: '10px' }}
                    />
                    <div className='buttons'>
                        <Button
                            type="primary"
                            onClick={handleSubmit}
                            style={{ marginRight: '10px' }}
                            className='createPostBtn'
                            loading={loading}
                        >
                            Submit
                        </Button>
                        <Button
                            type="default"
                            onClick={() => navigate(-1)}
                            className='backBtn'
                        >
                            Back
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CreatePost;
