import React, { useState, useEffect } from 'react';
import './Home.css';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <button onClick={scrollToTop} className="backToTopBtn">          
          <img src="https://img.icons8.com/ios/50/000000/up.png" alt="" />
        </button>
      )}
      <footer className='myFooter'>
        <p>© 2024 Denmap. All rights reserved.</p>
      </footer>
    </div>

  );
};

export default Footer;
