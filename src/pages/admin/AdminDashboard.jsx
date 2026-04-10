import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { request } from '../../lib/api';

const ApiDebugPanel = ({ apiStatus, blockStatus }) => {
  if (process.env.NODE_ENV !== 'development') return null;
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-600">Dashboard API 联调信息</h3>
        <span className="text-xs text-gray-400">开发环境可见</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg p-3 border border-gray-100">
          <p className="text-xs text-gray-400 mb-1">统计数据接口</p>
          <p className="font-mono text-xs text-gray-700 truncate">GET /v1/admin/stats/overview</p>
          <p className={`text-xs font-medium mt-1 ${
            apiStatus.overview === 200 ? 'text-green-600' :
            apiStatus.overview === 'error' ? 'text-red-600' : 'text-gray-400'
          }`}>
            {apiStatus.overview === 200 ? '✓ 正常' :
             apiStatus.overview === 'error' ? '✗ 请求失败' : '○ 等待中'}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-100">
          <p className="text-xs text-gray-400 mb-1">核心卡片</p>
          <p className="font-mono text-xs text-gray-700">users / competitions / works / assignments</p>
          <p className="text-xs text-green-600 font-medium mt-1">✓ 真实数据</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-100">
          <p className="text-xs text-gray-400 mb-1">快捷入口</p>
          <p className="font-mono text-xs text-gray-700">已接通 6 个页面</p>
          <p className="text-xs text-green-600 font-medium mt-1">✓ 全部可用</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-100">
          <p className="text-xs text-gray-400 mb-1">最近动态</p>
          <p className="font-mono text-xs text-gray-700">/admin/activities</p>
          <p className="text-xs text-amber-600 font-medium mt-1">○ 暂无接口</p>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, description }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className={`text-3xl font-bold ${color} mt-2`}>{value ?? 0}</p>
        {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${icon.bg}`}>
        {icon.svg}
      </div>
    </div>
  </div>
);

const EmptyStateCard = ({ title, description, icon }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center min-h-[120px]">
    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-3">
      {icon}
    </div>
    <p className="text-sm font-medium text-gray-400">{title}</p>
    {description && <p className="text-xs text-gray-300 mt-1">{description}</p>}
  </div>
);

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState({ overview: null });
  const [stats, setStats] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await request('/v1/admin/stats/overview');
      if (res.ok && res.data?.code === 0) {
        setStats(res.data.data);
        setApiStatus(prev => ({ ...prev, overview: 200 }));
      } else {
        setApiStatus(prev => ({ ...prev, overview: 'error' }));
        setError('获取统计数据失败');
      }
    } catch (err) {
      console.error('Fetch dashboard data error:', err);
      setApiStatus(prev => ({ ...prev, overview: 'error' }));
      setError('网络错误，无法获取统计数据');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboardData(); }, []);

  const quickActions = [
    {
      title: '赛事管理',
      desc: '管理赛事信息与阶段',
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      path: '/admin/competitions',
      color: 'bg-primary/10 group-hover:bg-primary'
    },
    {
      title: '报名审核',
      desc: '审核参赛报名申请',
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      path: '/admin/enrollments',
      color: 'bg-primary/10 group-hover:bg-primary'
    },
    {
      title: '作品管理',
      desc: '查看与管理参赛作品',
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      path: '/admin/works',
      color: 'bg-primary/10 group-hover:bg-primary'
    },
    {
      title: '评审管理',
      desc: '管理评审轮次与分配',
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      path: '/admin/reviews',
      color: 'bg-primary/10 group-hover:bg-primary'
    },
    {
      title: '新闻管理',
      desc: '发布与管理赛事新闻',
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      path: '/admin/news',
      color: 'bg-primary/10 group-hover:bg-primary'
    },
    {
      title: '统计分析',
      desc: '查看详细数据报表',
      icon: (
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      path: '/admin/stats',
      color: 'bg-primary/10 group-hover:bg-primary'
    }
  ];

  if (error) {
    return (
      <div className="space-y-6">
        <ApiDebugPanel apiStatus={apiStatus} blockStatus={{}} />
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={fetchDashboardData} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm font-medium">
            重试
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ApiDebugPanel apiStatus={apiStatus} blockStatus={{}} />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">后台首页</h2>
          <p className="text-sm text-gray-500 mt-2">赛事运营总览与快捷操作</p>
        </div>
        <span className="px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
          数据已接通
        </span>
      </div>

      {/* 核心数据概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <>
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-28 animate-pulse"></div>
              </div>
            ))}
          </>
        ) : (
          <>
            <StatCard
              title="用户总数"
              value={stats?.users ?? 0}
              color="text-primary"
              description="系统注册用户"
              icon={{
                bg: 'bg-primary/10',
                svg: (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )
              }}
            />
            <StatCard
              title="赛事总数"
              value={stats?.competitions ?? 0}
              color="text-primary"
              description="全部赛事"
              icon={{
                bg: 'bg-primary/10',
                svg: (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                )
              }}
            />
            <StatCard
              title="作品总数"
              value={stats?.works ?? 0}
              color="text-primary"
              description="全部作品"
              icon={{
                bg: 'bg-primary/10',
                svg: (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                )
              }}
            />
            <StatCard
              title="评审分配数"
              value={stats?.assignments ?? 0}
              color="text-primary"
              description="当前评审分配"
              icon={{
                bg: 'bg-primary/10',
                svg: (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                )
              }}
            />
          </>
        )}
      </div>

      {/* 快捷操作入口 */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">快捷入口</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.path}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col items-center text-center hover:shadow-md hover:border-gray-200 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${action.color} transition-colors group-hover:[&>svg]:text-white`}>
                {action.icon}
              </div>
              <p className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors">{action.title}</p>
              <p className="text-xs text-gray-400 mt-1">{action.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* 最近动态 - 空态 */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">最近动态</h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <EmptyStateCard
            title="暂无真实数据"
            description="/admin/activities 接口暂未接入"
            icon={
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
