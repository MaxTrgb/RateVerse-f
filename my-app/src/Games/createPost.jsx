import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from '../Home/Header';
import Footer from '../Home/Footer';
import './games.css';

const CreatePost = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');

    const handleSubmit = () => {
        if (!title || !genre || !description || !imgUrl) {
            message.error('Please fill in all fields');
            return;
        }

        const newPost = {
            title,
            genre,
            description,
            imgUrl,
        };


        console.log('New Post Created:', newPost);
        message.success('Post created successfully');


        navigate('/posts');
    };

    return (
        <div >
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
                    <Input
                        placeholder="Genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        style={{ marginBottom: '10px' }}
                    />
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
}

export default CreatePost;
