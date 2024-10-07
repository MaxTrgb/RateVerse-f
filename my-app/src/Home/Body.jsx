import React from 'react';
import PostGrid from '../Games/postGrid';
import './Home.css';
import Tools from '../Home/Tools';

const Body = () => {
  return (
    <main className='myBody'>
      <h2>Games</h2>
      <Tools />
      <PostGrid />
    </main>
  );
};



export default Body;
