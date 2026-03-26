import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Dropdown from '../common/Dropdown';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const navItems = [
    { 
      path: '/competition-center', 
      label: '赛事中心',
      children: [
        { path: '/competition-center', label: '赛事列表' },
        { path: '/competition-center?tab=info', label: '关键信息' },
        { path: '/apply-competition', label: '申请办赛' },
      ]
    },
    { 
      path: '/resources', 
      label: '资源支持',
      children: [
        { type: 'header', label: '学习资源' },
        { path: '/resources?type=course', label: '在线课程' },
        { path: '/resources?type=docs', label: '技术文档' },
        { type: 'divider' },
        { type: 'header', label: '开发资源' },
        { path: '/resources?type=compute', label: '算力资源' },
        { path: '/resources?type=dataset', label: '数据集' },
      ]
    },
    { 
      path: '/news', 
      label: '新闻动态',
      children: [
        { type: 'header', label: '新闻' },
        { path: '/news?category=notice', label: '通知公告' },
        { path: '/news?category=progress', label: '赛程动态' },
        { path: '/news?category=result', label: '获奖名单', badge: '新' },
      ]
    },
    { 
      path: '/partners', 
      label: '合作单位',
      children: [
        { type: 'header', label: '合作伙伴' },
        { path: '/partners?type=enterprise', label: '企业合作' },
        { path: '/partners?type=university', label: '高校合作' },
        { path: '/partners?type=investor', label: '投资机构' },
      ]
    },
    { path: '/experts', label: '专家查询' },
    { path: '/eco-products', label: '生态产品' },
    { path: '/about', label: '关于大赛' },
    {
      path: '/contact',
      label: '联系我们',
      children: [
        { path: '/contact', label: '联系方式' },
        { type: 'divider' },
        { type: 'header', label: '合作与支持' },
        { path: '/enterprise', label: '企业通道' },
        { path: '/apply-competition', label: '申请办赛' },
      ]
    },
  ];

  const getLinkClass = (isActive) => {
    if (isHomePage) {
      return isActive 
        ? 'text-white font-medium' 
        : 'text-white/70 hover:text-white';
    }
    return isActive 
      ? 'text-primary font-medium' 
      : 'text-neutral-500 hover:text-primary';
  };

  const getDropdownTriggerClass = (isActive) => {
    if (isHomePage) {
      return `flex items-center text-[13px] transition-all duration-300 cursor-pointer ${isActive ? 'text-white font-medium' : 'text-white/70 hover:text-white'}`;
    }
    return `flex items-center text-[13px] transition-all duration-300 cursor-pointer ${isActive ? 'text-primary font-medium' : 'text-neutral-500 hover:text-primary'}`;
  };

  const renderNavLink = (item, index) => {
    const isActive = location.pathname === item.path;
    
    if (item.children) {
      return (
        <Dropdown
          key={index}
          trigger={
            <span className={getDropdownTriggerClass(isActive)}>
              {item.label}
              <svg className="w-3.5 h-3.5 ml-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          }
          items={item.children}
          onOpenChange={(isOpen) => setOpenDropdown(isOpen ? index : null)}
          isHomePage={isHomePage}
        />
      );
    }

    return (
      <Link
        key={index}
        to={item.path}
        className={`text-[13px] transition-all duration-300 relative ${getLinkClass(isActive)}`}
      >
        {item.label}
        {isActive && (
          <span className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full ${isHomePage ? 'bg-white' : 'bg-primary'}`}></span>
        )}
      </Link>
    );
  };

  const handleLogout = () => {
    logout();
  };

  const getHeaderClass = () => {
    if (isHomePage) {
      if (isScrolled) {
        return 'bg-black/70 backdrop-blur-md border-b border-white/15 fixed top-0 left-0 w-full z-50 transition-all duration-300';
      }
      return 'bg-black/30 backdrop-blur-sm border-b border-white/10 fixed top-0 left-0 w-full z-50 transition-all duration-300';
    }
    return 'bg-white/50 backdrop-blur-sm border-b border-slate-100/50 sticky top-0 z-50';
  };

  const logoTextClass = isHomePage ? 'text-white' : 'text-primary';
  const logoSubtitleClass = isHomePage ? 'text-white/60' : 'text-neutral-500';

  return (
    <header className={getHeaderClass()}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/assets/image/logo/logonotext.png" 
                alt="梧桐·鸿鹄" 
                className="w-8 h-8 mr-1.5"
              />
              <div>
                <span className={`text-xl font-semibold ${logoTextClass}`}>梧桐·鸿鹄</span>
                <span className={`ml-1.5 text-xs ${logoSubtitleClass}`}>AI创新大赛</span>
              </div>
            </Link>
          </div>
          
          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-[13px] transition-all duration-300 relative ${getLinkClass(location.pathname === '/')}`}
            >
              首页
            </Link>
            
            {navItems.map((item, index) => renderNavLink(item, index))}
            
            <div className={`flex items-center space-x-3 ml-3 pl-4 ${isHomePage ? 'border-l border-white/10' : 'border-l border-slate-200/50'}`}>
              {isAuthenticated ? (
                <Dropdown
                  trigger={
                    <span className={`flex items-center text-[13px] transition-all duration-300 cursor-pointer ${isHomePage ? 'text-white/70 hover:text-white' : 'text-neutral-500 hover:text-primary'}`}>
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-1.5 ${isHomePage ? 'bg-white/20' : 'bg-primary/10'}`}>
                        <svg className={`w-3.5 h-3.5 ${isHomePage ? 'text-white' : 'text-primary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </span>
                      {user?.name || user?.phone || user?.phoneOrEmail}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  }
                  items={[
                    { path: '/dashboard', label: '个人中心' },
                    { path: '/team-hall', label: '我的团队' },
                    { path: '/competition-data', label: '赛题数据' },
                    { path: '/work-submission', label: '作品提交' },
                    { type: 'divider' },
                    { path: '/admin', label: '后台管理', badge: '管理' },
                    { type: 'divider' },
                    { path: '#', label: '退出登录', onClick: handleLogout },
                  ]}
                  align="right"
                  isHomePage={isHomePage}
                />
              ) : (
                <>
                  <Link to="/login" className={`text-[13px] transition-all duration-300 ${isHomePage ? 'text-white/70 hover:text-white' : 'text-neutral-500 hover:text-primary'}`}>
                    登录
                  </Link>
                  <Link to="/register" className={`text-[13px] transition-all duration-300 ${isHomePage ? 'text-white hover:text-white' : 'text-primary hover:text-primary/80'}`}>
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
              className={`focus:outline-none ${isHomePage ? 'text-white hover:text-white/80' : 'text-neutral-700 hover:text-primary'}`}
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
          <div className="md:hidden py-4 space-y-2">
            <Link
              to="/"
              className={`block px-4 py-3 text-sm font-medium transition-all duration-300 ${location.pathname === '/' ? (isHomePage ? 'text-white bg-white/10' : 'text-primary bg-primary/5') : (isHomePage ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-neutral-700 hover:text-primary hover:bg-neutral-50')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              首页
            </Link>
            
            {navItems.map((item, index) => (
              <div key={index}>
                {item.children ? (
                  <div>
                    <button
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium ${isHomePage ? 'text-white/70 hover:bg-white/10' : 'text-neutral-700 hover:bg-neutral-50'}`}
                      onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                    >
                      <span>{item.label}</span>
                      <svg 
                        className={`w-4 h-4 transition-transform ${openDropdown === index ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {openDropdown === index && (
                      <div className={`ml-4 mt-1 space-y-1 rounded-xl p-3 ${isHomePage ? 'bg-black/30' : 'bg-white/50'}`}>
                        {item.children.map((child, childIndex) => (
                          child.type === 'header' ? (
                            <div key={childIndex} className="px-3 py-2 text-xs font-semibold text-neutral-400 uppercase">
                              {child.label}
                            </div>
                          ) : child.type === 'divider' ? (
                            <div key={childIndex} className="my-2 border-t border-neutral-200/50" />
                          ) : (
                            <Link
                              key={childIndex}
                              to={child.path}
                              className={`block px-3 py-2 text-sm rounded-lg transition-all duration-300 ${isHomePage ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-neutral-600 hover:text-primary hover:bg-primary/5'}`}
                              onClick={() => {
                                setIsMenuOpen(false);
                                setOpenDropdown(null);
                              }}
                            >
                              {child.label}
                            </Link>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`block px-4 py-3 text-sm font-medium transition-all duration-300 ${location.pathname === item.path ? (isHomePage ? 'text-white bg-white/10' : 'text-primary bg-primary/5') : (isHomePage ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-neutral-700 hover:text-primary hover:bg-neutral-50')}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.path}
                  </Link>
                )}
              </div>
            ))}
            
            <div className={`pt-4 border-t ${isHomePage ? 'border-white/10' : 'border-neutral-200'}`}>
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    to="/dashboard"
                    className={`block px-4 py-2 text-sm ${isHomePage ? 'text-white/70 hover:bg-white/10' : 'text-neutral-700 hover:bg-neutral-50'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    个人中心
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                  >
                    退出登录
                  </button>
                </div>
              ) : (
                <div className="flex space-x-4 px-4">
                  <Link to="/login" className={`text-sm font-medium ${isHomePage ? 'text-white/70 hover:text-white' : 'text-neutral-700 hover:text-primary'}`}>
                    登录
                  </Link>
                  <Link to="/register" className={`text-sm font-medium ${isHomePage ? 'text-white hover:text-white' : 'text-primary hover:text-primary/80'}`}>
                    注册
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
