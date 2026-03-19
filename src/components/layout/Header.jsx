import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { path: '/', label: '首页' },
    { path: '/competition-center', label: '赛事中心' },
    { path: '/resources', label: '资源支持' },
    { path: '/news', label: '新闻动态' },
    { path: '/partners', label: '合作生态' },
    { path: '/about', label: '关于大赛' },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">梧桐·鸿鹄</span>
              <span className="ml-2 text-sm text-neutral-600">AI创新大赛</span>
            </Link>
          </div>
          
          {/* 桌面导航 */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 relative ${location.pathname === link.path ? 'text-primary' : 'text-neutral-700 hover:text-primary'}`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                )}
              </Link>
            ))}
            <div className="flex space-x-4">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-sm font-medium text-neutral-700 hover:text-primary transition-all duration-300">
                    {user?.name || user?.phone || user?.phoneOrEmail}的个人中心
                  </Link>
                  <button onClick={handleLogout} className="text-sm font-medium text-neutral-700 hover:text-primary transition-all duration-300">
                    退出
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium text-neutral-700 hover:text-primary transition-all duration-300">
                    登录
                  </Link>
                  <Link to="/register" className="text-sm font-medium text-primary hover:text-primary/80 transition-all duration-300">
                    注册
                  </Link>
                </>
              )}
            </div>
          </nav>
          
          {/* 移动端菜单按钮 */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-700 hover:text-primary focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-2 text-sm font-medium transition-all duration-300 ${location.pathname === link.path ? 'text-primary bg-primary/5' : 'text-neutral-700 hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex space-x-4 px-4">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-sm font-medium text-neutral-700 hover:text-primary transition-all duration-300">
                    {user?.name || user?.phone || user?.phoneOrEmail}的个人中心
                  </Link>
                  <button onClick={handleLogout} className="text-sm font-medium text-neutral-700 hover:text-primary transition-all duration-300">
                    退出
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium text-neutral-700 hover:text-primary transition-all duration-300">
                    登录
                  </Link>
                  <Link to="/register" className="text-sm font-medium text-primary hover:text-primary/80 transition-all duration-300">
                    注册
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;