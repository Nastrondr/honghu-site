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

  return isMobile ? <HomeMobile /> : <HomeDesktop />;
};

export default Home;
