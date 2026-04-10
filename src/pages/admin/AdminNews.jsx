import React, { useState, useMemo, useRef, useEffect } from 'react';
import { request } from '../../lib/api';

const STATUS_MAP = {
  true: { label: '已发布', color: 'bg-green-50 text-green-600', dot: 'bg-green-400' },
  false: { label: '草稿', color: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' },
};

const TYPE_MAP = {
  'news': { label: '新闻动态', color: 'bg-blue-100 text-blue-700' },
  'announcement': { label: '公告通知', color: 'bg-amber-100 text-amber-700' },
  'media': { label: '媒体报道', color: 'bg-purple-100 text-purple-700' },
};

const StatusTag = ({ isPublished }) => {
  const config = STATUS_MAP[String(isPublished)] || STATUS_MAP['false'];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${config.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      {config.label}
    </span>
  );
};

const TypeTag = ({ newsType }) => {
  const config = TYPE_MAP[newsType] || TYPE_MAP['news'];
  return (
    <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${config.color}`}>
      {config.label}
    </span>
  );
};

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm ${
      type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-primary'
    }`}>
      {message}
    </div>
  );
};

const ApiDebugPanel = ({ apiStatus, filters, newsCount }) => {
  if (process.env.NODE_ENV !== 'development') return null;
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-blue-700">API 联调信息</h3>
        <span className="text-xs text-blue-500">开发环境可见</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">列表接口</p>
          <p className="font-mono text-xs text-gray-800 truncate">GET /v1/news</p>
          <p className={`text-xs font-semibold mt-1 ${
            apiStatus.list === 200 ? 'text-green-600' :
            apiStatus.list === 'error' ? 'text-red-600' : 'text-gray-400'
          }`}>
            {apiStatus.list === 200 ? `✅ ${newsCount} 条` :
             apiStatus.list === 'error' ? '❌ 请求失败' : '⏳ 等待中'}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">筛选条件</p>
          <p className="font-mono text-xs text-gray-800">
            {filters.type === 'all' ? '全部类型' : filters.type} | {filters.isPublished === 'all' ? '全部状态' : filters.isPublished}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">最近操作</p>
          <p className={`text-xs font-semibold mt-1 ${
            apiStatus.lastAction === 'success' ? 'text-green-600' :
            apiStatus.lastAction === 'error' ? 'text-red-600' :
            apiStatus.lastAction === 'loading' ? 'text-orange-600' : 'text-gray-400'
          }`}>
            {apiStatus.lastAction === 'success' ? '✅ 操作成功' :
             apiStatus.lastAction === 'error' ? '❌ 操作失败' :
             apiStatus.lastAction === 'loading' ? '⏳ 处理中...' : '—'}
          </p>
        </div>
      </div>
    </div>
  );
};

const AdminNews = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [apiStatus, setApiStatus] = useState({ list: null, lastAction: null });

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.append('isPublished', 'false');
      if (typeFilter !== 'all') params.append('newsType', typeFilter);
      if (searchQuery) params.append('keyword', searchQuery);

      const result = await request(`/v1/news?${params.toString()}`);
      if (result.ok && result.data?.code === 0 && result.data.data) {
        const list = Array.isArray(result.data.data.list) ? result.data.data.list : [];
        setNewsList(list);
        setApiStatus(prev => ({ ...prev, list: 200 }));
      } else {
        setNewsList([]);
        setApiStatus(prev => ({ ...prev, list: 'error' }));
        setError('获取新闻列表失败');
      }
    } catch (err) {
      console.error('Fetch news error:', err);
      setNewsList([]);
      setApiStatus(prev => ({ ...prev, list: 'error' }));
      setError('网络错误，无法获取新闻列表');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNews(); }, [typeFilter]);

  const filteredNews = useMemo(() => {
    return newsList.filter(n => {
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || (n.title || '').toLowerCase().includes(q) || (n.summary || '').toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || String(n.isPublished) === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [newsList, searchQuery, statusFilter]);

  const handleAction = async (action, id) => {
    setApiStatus(prev => ({ ...prev, lastAction: 'loading' }));
    try {
      let result;
      if (action === 'publish') {
        result = await request(`/v1/admin/news/${id}/publish`, { method: 'PUT' });
      } else if (action === 'unpublish') {
        result = await request(`/v1/admin/news/${id}/unpublish`, { method: 'PUT' });
      } else if (action === 'delete') {
        if (!confirm('确定要删除这条新闻吗？')) return;
        result = await request(`/v1/admin/news/${id}`, { method: 'DELETE' });
      }

      if (result.ok && result.data?.code === 0) {
        setApiStatus(prev => ({ ...prev, lastAction: 'success' }));
        setToast({ message: action === 'delete' ? '删除成功' : action === 'publish' ? '发布成功' : '下线成功', type: 'success' });
        fetchNews();
      } else {
        setApiStatus(prev => ({ ...prev, lastAction: 'error' }));
        setToast({ message: result.data?.message || '操作失败', type: 'error' });
      }
    } catch (err) {
      setApiStatus(prev => ({ ...prev, lastAction: 'error' }));
      setToast({ message: '网络错误，操作失败', type: 'error' });
    }
  };

  const handleCreate = () => {
    setToast({ message: '新建新闻功能暂未接入（需要 slug 字段支撑）', type: 'info' });
  };

  const handleEdit = (news) => {
    setToast({ message: '编辑新闻功能暂未接入（需要 slug 字段支撑）', type: 'info' });
  };

  const formatDate = (d) => {
    if (!d) return '-';
    try { return new Date(d).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }); }
    catch { return d; }
  };

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <ApiDebugPanel
        apiStatus={apiStatus}
        filters={{ type: typeFilter, isPublished: statusFilter }}
        newsCount={newsList.length}
      />

      <div>
        <h2 className="text-2xl font-bold text-gray-800">新闻管理</h2>
        <p className="text-sm text-gray-500 mt-2">发布、编辑和管理赛事新闻公告</p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">搜索新闻</label>
            <div className="relative">
              <input
                type="text"
                placeholder="搜索标题/摘要..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary w-full sm:w-64 bg-white"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">类型筛选</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary bg-white min-w-[140px]"
            >
              <option value="all">全部类型</option>
              <option value="news">新闻动态</option>
              <option value="announcement">公告通知</option>
              <option value="media">媒体报道</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">状态筛选</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary bg-white min-w-[120px]"
            >
              <option value="all">全部状态</option>
              <option value="true">已发布</option>
              <option value="false">草稿</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          新建新闻
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">新闻标题</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">类型</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">发布时间</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">浏览量</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div></td>
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button onClick={fetchNews} className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90">重试</button>
                  </td>
                </tr>
              ) : filteredNews.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-500">暂无符合条件的新闻</p>
                  </td>
                </tr>
              ) : (
                filteredNews.map((news) => (
                  <tr key={news.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold text-gray-800">{news.title || '-'}</span>
                        {news.summary && (
                          <span className="text-xs text-gray-400 truncate max-w-xs">{news.summary}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <TypeTag newsType={news.newsType} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusTag isPublished={news.isPublished} />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{formatDate(news.publishedAt)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{news.viewCount || 0}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(news)}
                          className="px-3 py-1.5 text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors"
                        >
                          编辑
                        </button>
                        {!news.isPublished ? (
                          <button
                            onClick={() => handleAction('publish', news.id)}
                            className="px-3 py-1.5 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          >
                            发布
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAction('unpublish', news.id)}
                            className="px-3 py-1.5 text-sm text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          >
                            下线
                          </button>
                        )}
                        <button
                          onClick={() => handleAction('delete', news.id)}
                          className="px-3 py-1.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminNews;
