import React, { useState, useEffect } from 'react';
import PartnersDesktop from './PartnersDesktop';
import PartnersMobile from './PartnersMobile';

const Partners = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return isMobile ? <PartnersMobile /> : <PartnersDesktop />;
};

export default Partners;
