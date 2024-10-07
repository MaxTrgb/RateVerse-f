import React, { useEffect, useState } from 'react';
import PostItem from './postItem';


const PostGrid = () => {
    const [posts, setPosts] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('name');

    const sortPosts = (criteria, posts) => {
        let sortedPosts;
        if (criteria === 'name') {
            sortedPosts = [...posts].sort((a, b) => a.title.localeCompare(b.title));
        } else if (criteria === 'rating') {
            sortedPosts = [...posts].sort((a, b) => a.rate - b.rate);
        }
        return sortedPosts;
    };
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const apiPosts = await response.json();


                const mappedPosts = apiPosts.map(post => ({
                    id: post.id,
                    imgSrc: post.image,
                    title: post.title,
                    description: post.description,
                    rating: post.rating.rate
                }));

                setPosts(sortPosts(sortCriteria, mappedPosts));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchPosts();
    }, [sortCriteria]);

    return (
        <div >
            {posts.map(post => (
                <PostItem
                    key={post.id}
                    id={post.id}
                    imgSrc={post.imgSrc}
                    title={post.title}
                    description={post.description}
                    rating={post.rating}
                />
            ))}
        </div>
    );
}

export default PostGrid;
