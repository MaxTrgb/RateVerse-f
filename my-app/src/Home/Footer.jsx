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
    <footer className='myFooter'>
      
      {isVisible && (
        <button onClick={scrollToTop} className="backToTopBtn">
          Back to Top
        </button>
      )}
      <p>© 2022 Denmap. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
