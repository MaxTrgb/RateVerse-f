import React, { useEffect, useState } from 'react';
import PostItem from './postItem';
import Tools from '../Home/Tools';
import './games.css';


const PostGrid = () => {
    const [posts, setPosts] = useState([]);
    const [sortCriteria, setSortCriteria] = useState(() => {
        const savedSort = localStorage.getItem('activeSort');
        return savedSort || 'date'; 
    });
    const [searchTerm, setSearchTerm] = useState(''); 

    const sortPosts = (criteria, posts) => {
        let sortedPosts;
        if (criteria === 'name') {
            sortedPosts = [...posts].sort((a, b) => a.title.localeCompare(b.title));
        }
        if (criteria === 'rating') {
            sortedPosts = [...posts].sort((a, b) => b.rating - a.rating);
        }
        if (criteria === 'genre') {
            sortedPosts = [...posts].sort((a, b) => a.genre.localeCompare(b.genre));
        }
        if (criteria === 'date') {
            sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
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
                    genre: post.category,
                    description: post.description,
                    rating: post.rating.rate,
                    date: post.date 
                }));

                setPosts(sortPosts(sortCriteria, mappedPosts));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchPosts();
    }, [sortCriteria]);

    const handleSortChange = (criteria) => {
        setSortCriteria(criteria);
        localStorage.setItem('activeSort', criteria); 
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            
            <Tools 
                onSortChange={handleSortChange} 
                onSearchChange={setSearchTerm} 
                activeSort={sortCriteria} 
            />
            <div className='postGrid'>
                {filteredPosts.map(post => ( 
                    <PostItem
                        key={post.id}
                        id={post.id}
                        imgSrc={post.imgSrc}
                        title={post.title}
                        genre={post.genre}
                        description={post.description}
                        rating={post.rating}
                    />
                ))}
            </div>
           
        </div>
    );
}

export default PostGrid;
