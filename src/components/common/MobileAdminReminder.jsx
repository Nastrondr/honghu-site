import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MobileAdminReminder = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 检查是否为移动端
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 从 localStorage 获取用户信息
  useEffect(() => {
    const checkAuth = () => {
      const storedAuth = localStorage.getItem('isAuthenticated');
      const storedUser = localStorage.getItem('user');
      
      if (storedAuth === 'true' && storedUser) {
        setIsAuthenticated(true);
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    
    // 立即检查一次
    checkAuth();
    
    // 监听 storage 变化（跨标签页）
    window.addEventListener('storage', checkAuth);
    
    // 设置轮询检查，以捕获同一标签页内的 localStorage 变化
    const intervalId = setInterval(checkAuth, 500);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(intervalId);
    };
  }, []);

  // 检查是否应该显示弹窗
  useEffect(() => {
    if (!isAuthenticated || !isMobile || !user) {
      setIsVisible(false);
      return;
    }

    // 检查用户角色
    const userRole = user.role || user.userType;
    const isAdmin = userRole === 'admin' || userRole === 'administrator';
    const isReviewer = userRole === 'reviewer' || userRole === 'expert';

    // 普通用户不显示
    if (!isAdmin && !isReviewer) {
      setIsVisible(false);
      return;
    }

    // 检查 localStorage 是否设置了今日不再提示
    const hideUntil = localStorage.getItem('mobileAdminReminderHideUntil');
    if (hideUntil) {
      const hideDate = new Date(parseInt(hideUntil));
      const now = new Date();
      // 如果当前时间还在隐藏期限内，不显示
      if (now < hideDate) {
        setIsVisible(false);
        return;
      }
    }

    // 延迟显示弹窗，让页面先加载完成
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsAnimating(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [isAuthenticated, isMobile, user]);

  // 关闭弹窗
  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
    }, 150);
  };

  // 处理"我知道了，继续使用"
  const handleContinue = () => {
    // 如果勾选了"今日不再提示"
    if (dontShowAgain) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      localStorage.setItem('mobileAdminReminderHideUntil', tomorrow.getTime().toString());
    }
    handleClose();
  };

  // 处理"返回首页"
  const handleGoHome = () => {
    if (dontShowAgain) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      localStorage.setItem('mobileAdminReminderHideUntil', tomorrow.getTime().toString());
    }
    handleClose();
    navigate('/');
  };

  // 点击遮罩层关闭
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-150 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleOverlayClick}
    >
      {/* 遮罩层 */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      {/* 弹窗内容 */}
      <div 
        className={`relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-150 ${
          isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* 顶部装饰条 */}
        <div className="h-1.5 bg-gradient-to-r from-purple-500 to-purple-600" />
        
        {/* 内容区域 */}
        <div className="p-6">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-4 bg-purple-50 rounded-2xl flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-purple-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
          </div>
          
          {/* 标题 */}
          <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
            建议在电脑端使用
          </h3>
          
          {/* 说明文字 */}
          <p className="text-sm text-gray-500 text-center mb-2 leading-relaxed">
            当前系统包含较多评审与管理操作，在电脑端体验更完整、更高效
          </p>
          
          {/* 补充说明 */}
          <p className="text-xs text-gray-400 text-center mb-6 leading-relaxed">
            为保证评审效率与数据准确性，建议使用电脑登录后台系统
          </p>
          
          {/* 按钮组 */}
          <div className="space-y-3">
            {/* 主按钮 */}
            <button
              onClick={handleContinue}
              className="w-full py-3 px-4 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-xl transition-colors duration-200 shadow-lg shadow-purple-500/25"
            >
              我知道了，继续使用
            </button>
            
            {/* 次按钮 */}
            <button
              onClick={handleGoHome}
              className="w-full py-3 px-4 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            >
              返回首页
            </button>
          </div>
          
          {/* 今日不再提示 */}
          <div className="mt-4 flex items-center justify-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-xs text-gray-400">今日不再提示</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAdminReminder;
