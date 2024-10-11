import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import PostGrid from './Games/postGrid';
import SingleCard from './Games/singleCard';
import CreatePost from './Games/createPost';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/posts" element={<PostGrid />} />
                <Route path="/post/:id" element={<SingleCard />} />
                <Route path="/create-post" element={<CreatePost />} />
            </Routes>
        </Router>
    );
};

export default App;
