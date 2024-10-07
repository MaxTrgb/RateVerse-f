import React from 'react';
import PostGrid from '../Games/postGrid';
import './Home.css';
import Tools from '../Home/Tools';

const Body = () => {
  return (
    <main className='myBody'>
      
      <Tools />
      <PostGrid />
    </main>
  );
};



export default Body;
