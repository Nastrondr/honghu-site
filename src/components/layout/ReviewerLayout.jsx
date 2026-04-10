import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import MobileAdminReminder from '../common/MobileAdminReminder';

// 检查是否已登录评审员
const isReviewerAuthenticated = () => {
  const reviewerAuth = localStorage.getItem('reviewerAuthenticated');
  const currentRole = localStorage.getItem('currentRole');
  const token = localStorage.getItem('reviewerToken') || localStorage.getItem('accessToken');
  if (!token) return false;
  if (reviewerAuth !== 'true' || currentRole !== 'reviewer') return false;
  return true;
};

const getReviewerInfo = () => {
  const userStr = localStorage.getItem('reviewerUser') || localStorage.getItem('user');
  if (!userStr) return null;
  try {
    const userData = JSON.parse(userStr);
    return userData.user || userData;
  } catch {
    return null;
  }
};

const ReviewerLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [reviewerInfo, setReviewerInfo] = useState(null);

  // 权限检查
  useEffect(() => {
    if (!isReviewerAuthenticated()) {
      navigate('/reviewer-login', { replace: true });
      return;
    }
    setReviewerInfo(getReviewerInfo());
  }, [navigate]);

  // 侧边栏菜单配置
  const menuItems = [
    {
      path: '/reviewer/dashboard',
      label: '评审工作台',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    }
  ];

  // 获取当前页面标题
  const getPageTitle = () => {
    if (location.pathname.startsWith('/reviewer/review/')) {
      return '作品评审';
    }
    const currentMenu = menuItems.find(item => location.pathname.startsWith(item.path));
    return currentMenu ? currentMenu.label : '评审工作台';
  };

  // 判断是否为当前页面
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // 退出登录
  const handleLogout = () => {
    localStorage.removeItem('reviewerToken');
    localStorage.removeItem('reviewerUser');
    localStorage.removeItem('reviewerAuthenticated');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentRole');
    navigate('/reviewer-login');
  };

  // 如果未登录，不渲染内容
  if (!isReviewerAuthenticated()) {
    return null;
  }

  return (
    <>
      {/* 移动端使用提示弹窗 */}
      <MobileAdminReminder />
      <div className="min-h-screen bg-gray-50 flex">
        {/* 侧边栏 */}
        <aside
          className={`bg-slate-800 text-white flex flex-col transition-all duration-300 ${
            isSidebarCollapsed ? 'w-16' : 'w-56'
          }`}
        >
          {/* Logo区域 */}
          <div className="h-16 flex items-center justify-center border-b border-slate-700">
            {isSidebarCollapsed ? (
              <span className="text-xl font-bold">评</span>
            ) : (
              <span className="text-lg font-semibold">鸿鹄大赛评审端</span>
            )}
          </div>

          {/* 菜单列表 */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1 px-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive(item.path)
                        ? 'bg-primary text-white'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!isSidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 折叠按钮 */}
          <div className="p-4 border-t border-slate-700">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
            >
              <svg
                className={`w-5 h-5 transition-transform ${isSidebarCollapsed ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
              {!isSidebarCollapsed && <span className="text-sm">收起</span>}
            </button>
          </div>
        </aside>

        {/* 主内容区 */}
        <div className="flex-1 flex flex-col">
          {/* 顶部栏 */}
          <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
            <div>
              <h1 className="text-lg font-semibold text-gray-800">{getPageTitle()}</h1>
              <p className="text-xs text-gray-500">作品评审系统</p>
            </div>

            <div className="flex items-center gap-4">
              {/* 返回前台按钮 */}
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:text-primary transition-colors border border-gray-200 rounded-lg hover:border-primary"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                返回前台
              </Link>

              {/* 评委信息 */}
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary text-sm font-medium">
                    {reviewerInfo?.name?.charAt(0) || '评'}
                  </span>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-800">{reviewerInfo?.name || '评审专家'}</p>
                  <p className="text-xs text-gray-500">{reviewerInfo?.email || ''}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="ml-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="退出登录"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          {/* 内容区域 */}
          <main className="flex-1 p-6 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default ReviewerLayout;
