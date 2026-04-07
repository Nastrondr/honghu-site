import React, { useState, useEffect } from 'react';
import HomeDesktop from './HomeDesktop';
import HomeMobile from './HomeMobile';

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, background: 'yellow', padding: '10px', fontSize: '12px' }}>
        DEBUG: isMobile = {isMobile ? 'TRUE - 渲染HomeMobile' : 'FALSE - 渲染HomeDesktop'} | 屏幕宽度: {typeof window !== 'undefined' ? window.innerWidth : 'N/A'}px
      </div>
      {isMobile ? <HomeMobile /> : <HomeDesktop />}
    </>
  );
};

export default Home;
