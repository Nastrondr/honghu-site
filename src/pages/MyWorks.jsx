import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { request } from '../lib/api';

const MyWorks = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMyWorks = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await request('/v1/works/my');

      if (result.status === 401) {
        navigate('/login');
        return;
      }

      if (!result.ok) {
        setError(result.data?.message || '获取作品列表失败');
        return;
      }

      if (result.data.code === 0) {
        const worksList = result.data.data?.list || [];
        setWorks(worksList);
      } else {
        setError(result.data.message || '获取作品列表失败');
      }
    } catch (err) {
      setError('网络错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMyWorks();
    }
  }, [isAuthenticated]);

  const getStatusInfo = (status) => {
    switch (status) {
      case 'draft': return { color: 'text-blue-500 bg-blue-50 border-blue-200', text: '草稿' };
      case 'submitted': return { color: 'text-purple-500 bg-purple-50 border-purple-200', text: '已提交' };
      case 'under_review': return { color: 'text-orange-500 bg-orange-50 border-orange-200', text: '评审中' };
      case 'published': return { color: 'text-green-500 bg-green-50 border-green-200', text: '已公示' };
      case 'archived': return { color: 'text-gray-500 bg-gray-50 border-gray-200', text: '已归档' };
      default: return { color: 'text-gray-500 bg-gray-50 border-gray-200', text: status || '未知' };
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    try {
      return new Date(dateStr).toLocaleString('zh-CN', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 animate-fadeIn">
        <div className="max-w-lg mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-sm p-12 border border-gray-100">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">请先登录</h2>
            <p className="text-gray-500 mb-8">登录后可查看您的作品</p>
            <Link to="/login" className="bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">
              登录
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 animate-fadeIn">
      <div className="max-w-4xl mx-auto px-4">

        {/* Dev 调试区 */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-blue-700">我的作品 API 联调信息</h3>
              <span className="text-xs text-blue-500">开发环境可见</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">请求接口</p>
                <p className="font-mono text-gray-800 break-all">GET /api/v1/works/my</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">Token</p>
                <p className={`font-semibold ${token ? 'text-green-600' : 'text-red-600'}`}>
                  {token ? '✓ 存在' : '✗ 不存在'}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">HTTP 状态</p>
                {loading ? (
                  <p className="text-gray-400">请求中...</p>
                ) : error ? (
                  <p className="text-red-600 font-semibold">失败</p>
                ) : (
                  <p className="text-green-600 font-semibold">成功</p>
                )}
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">作品数量</p>
                <p className="text-gray-800 font-semibold">{loading ? '-' : works.length} 个</p>
              </div>
            </div>
            {!loading && !error && works.length > 0 && (
              <div className="mt-3 bg-green-100 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-700 font-semibold">✓ 已接入真实后端数据</p>
              </div>
            )}
            {!loading && error && (
              <div className="mt-3 bg-red-100 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-700">
                  <span className="font-semibold">错误:</span> {error}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">我的作品</h1>
          <p className="text-sm text-gray-500 mt-1">管理您的参赛作品</p>
        </div>

        {/* Loading 状态 */}
        {loading && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">加载中...</p>
          </div>
        )}

        {/* Error 状态 */}
        {!loading && error && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{error}</h2>
            <p className="text-gray-500 mb-6">无法加载作品列表</p>
            <button onClick={fetchMyWorks} className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90">
              重试
            </button>
          </div>
        )}

        {/* Empty 状态 */}
        {!loading && !error && works.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            <h2 className="text-xl font-bold text-gray-800 mb-2">暂无作品</h2>
            <p className="text-gray-500 mb-6">您还没有提交任何作品</p>
            <Link to="/work-submission" className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90">
              去提交作品
            </Link>
          </div>
        )}

        {/* 作品列表 */}
        {!loading && !error && works.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {works.map((work) => {
                const statusInfo = getStatusInfo(work.status);
                return (
                  <div key={work.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800 truncate">
                            {work.title || '未命名作品'}
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusInfo.color}`}>
                            {statusInfo.text}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          {work.competition && (
                            <span>{work.competition.name}</span>
                          )}
                          {work.track && (
                            <>
                              <span className="text-gray-300">|</span>
                              <span>{work.track.name}</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                          <span>更新: {formatDate(work.updatedAt || work.createdAt)}</span>
                          {work.versions && (
                            <span>{work.versions.length} 个版本</span>
                          )}
                        </div>
                      </div>
                      <Link
                        to={`/works/${work.id}`}
                        className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 flex-shrink-0"
                      >
                        查看详情
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyWorks;
