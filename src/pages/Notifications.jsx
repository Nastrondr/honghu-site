import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { request } from '../lib/api';

const Notifications = () => {
  const { isAuthenticated } = useAuth();
  
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0 });
  const [filters, setFilters] = useState({ isRead: '', type: '' });

  const fetchNotifications = async () => {
    setLoading(true);
    setError('');
    
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', String(pagination.page));
      queryParams.append('pageSize', String(pagination.pageSize));
      if (filters.isRead !== '') queryParams.append('isRead', filters.isRead);
      if (filters.type) queryParams.append('type', filters.type);
      
      const result = await request(`/v1/notifications?${queryParams.toString()}`);
      
      if (!result.ok) {
        if (result.status === 401) {
          setError('请先登录');
          return;
        }
        setError('获取通知失败');
        return;
      }
      
      if (result.data.code === 0) {
        setNotifications(result.data.data?.list || []);
        setPagination(prev => ({ ...prev, total: result.data.data?.total || 0 }));
      } else {
        setError(result.data.message || '获取通知失败');
      }
    } catch (err) {
      setError('网络错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const result = await request(`/v1/notifications/${id}/read`, { method: 'PUT' });
      if (result.ok && result.data.code === 0) {
        fetchNotifications();
      }
    } catch (err) {
      console.error('Mark as read failed:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const result = await request('/v1/notifications/read-all', { method: 'PUT' });
      if (result.ok && result.data.code === 0) {
        fetchNotifications();
      }
    } catch (err) {
      console.error('Mark all as read failed:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [isAuthenticated, pagination.page, filters]);

  const getNotificationTypeText = (type) => {
    const typeMap = {
      'enrollment_approved': '报名通过',
      'enrollment_rejected': '报名驳回',
      'work_submitted': '作品提交',
      'work_reviewed': '作品评审',
      'team_invitation': '团队邀请',
      'system': '系统通知'
    };
    return typeMap[type] || type;
  };

  const getNotificationTypeColor = (type) => {
    const colorMap = {
      'enrollment_approved': 'bg-green-100 text-green-700',
      'enrollment_rejected': 'bg-red-100 text-red-700',
      'work_submitted': 'bg-blue-100 text-blue-700',
      'work_reviewed': 'bg-purple-100 text-purple-700',
      'team_invitation': 'bg-orange-100 text-orange-700',
      'system': 'bg-gray-100 text-gray-700'
    };
    return colorMap[type] || 'bg-gray-100 text-gray-700';
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-xl shadow-md p-12 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">请先登录</h2>
          <Link to="/login" className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90">
            登录
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-blue-700">API 联调信息</h3>
            <span className="text-xs text-blue-500">开发环境可见</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-400 mb-1">请求接口</p>
              <p className="font-mono text-gray-800">GET /v1/notifications</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-400 mb-1">HTTP 状态</p>
              <p className={`font-semibold ${loading ? 'text-yellow-600' : error ? 'text-red-600' : 'text-green-600'}`}>
                {loading ? '请求中' : error ? '失败' : '成功'}
              </p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-400 mb-1">通知数量</p>
              <p className="text-gray-800">{notifications.length} / {pagination.total}</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-400 mb-1">当前页</p>
              <p className="text-gray-800">{pagination.page}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">我的通知</h1>
        <button
          onClick={markAllAsRead}
          className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          全部已读
        </button>
      </div>

      {/* 筛选器 */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">阅读状态</label>
            <select
              value={filters.isRead}
              onChange={(e) => setFilters(prev => ({ ...prev, isRead: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">全部</option>
              <option value="false">未读</option>
              <option value="true">已读</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">通知类型</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">全部类型</option>
              <option value="enrollment_approved">报名通过</option>
              <option value="enrollment_rejected">报名驳回</option>
              <option value="work_submitted">作品提交</option>
              <option value="work_reviewed">作品评审</option>
              <option value="team_invitation">团队邀请</option>
              <option value="system">系统通知</option>
            </select>
          </div>
        </div>
      </div>

      {/* 通知列表 */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-12 text-center">
            <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">加载中...</p>
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button onClick={fetchNotifications} className="bg-primary text-white px-6 py-2 rounded-lg">
              重试
            </button>
          </div>
        ) : notifications.length === 0 ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <p className="text-gray-500">暂无通知</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${!notification.isRead ? 'bg-blue-50/30' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getNotificationTypeColor(notification.type)}`}>
                        {getNotificationTypeText(notification.type)}
                      </span>
                      {!notification.isRead && (
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      )}
                    </div>
                    <h3 className="font-medium text-gray-800 mb-1">{notification.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{notification.content}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(notification.createdAt).toLocaleString('zh-CN')}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-sm text-primary hover:text-primary/80 ml-4 whitespace-nowrap"
                    >
                      标记已读
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 分页 */}
      {!loading && !error && notifications.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-500">
            共 {pagination.total} 条通知，第 {pagination.page} 页
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page <= 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              上一页
            </button>
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page * pagination.pageSize >= pagination.total}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              下一页
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
