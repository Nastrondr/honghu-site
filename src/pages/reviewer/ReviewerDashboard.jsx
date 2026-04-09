import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { request } from '../../lib/api';

const ReviewerDashboard = () => {
  const { user, isAuthenticated } = useAuth();

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMyAssignments = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await request('/v1/reviewer/works');

      if (!result.ok) {
        if (result.status === 403) {
          setError('您没有评审权限');
          return;
        }
        if (result.status === 401) {
          setError('登录已过期');
          return;
        }
        setError('获取待评作品失败');
        return;
      }

      if (result.data.code === 0) {
        setAssignments(result.data.data || []);
      } else {
        setError(result.data.message || '获取待评作品失败');
      }
    } catch (err) {
      setError('网络错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMyAssignments();
    }
  }, [isAuthenticated]);

  const stats = {
    pending: assignments.filter(a => !a.record || a.record.status === 'draft').length,
    completed: assignments.filter(a => a.record && a.record.status === 'submitted').length,
    total: assignments.length
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    try {
      return new Date(dateStr).toLocaleDateString('zh-CN');
    } catch {
      return dateStr;
    }
  };

  const getDeadlineInfo = (round) => {
    if (!round?.endTime) return null;
    const deadline = new Date(round.endTime);
    const now = new Date();
    const diff = deadline - now;
    if (diff <= 0) return { text: '已截止', expired: true };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days > 0) return { text: `${days}天 ${hours}小时`, expired: false };
    return { text: `${hours}小时`, expired: false };
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-xl shadow-md p-12 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">请先登录</h2>
          <p className="text-neutral-600 mb-8">登录后可进行评审工作</p>
          <Link to="/login" className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            登录
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-xl shadow-md p-12 max-w-md mx-auto">
          <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-500">加载中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-xl shadow-md p-12 max-w-md mx-auto">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={fetchMyAssignments} className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            重试
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-blue-700">API 联调信息</h3>
            <span className="text-xs text-blue-500">开发环境可见</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-400 mb-1">请求接口</p>
              <p className="font-mono text-gray-800">GET /v1/reviewer/works</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-400 mb-1">HTTP 状态</p>
              <p className="text-green-600 font-semibold">成功</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-400 mb-1">待评作品</p>
              <p className="text-gray-800">{stats.pending} 个</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-400 mb-1">已评作品</p>
              <p className="text-gray-800">{stats.completed} 个</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl p-6 text-white shadow-lg shadow-violet-500/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">欢迎，{user?.username || '评审专家'}！</h2>
            <p className="text-white/80">当前待评作品：{stats.pending} 个</p>
          </div>
          {getDeadlineInfo(assignments[0]?.round) && (
            <div className="flex items-center gap-4 bg-white/10 rounded-lg px-4 py-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-white/70">评审截止</p>
                <p className="font-semibold">{formatDate(assignments[0]?.round?.endTime)}</p>
                <p className={`text-xs ${getDeadlineInfo(assignments[0]?.round)?.expired ? 'text-red-300' : 'text-white/70'}`}>
                  剩余：{getDeadlineInfo(assignments[0]?.round)?.text}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">待评作品</p>
              <p className="text-2xl font-bold text-gray-800">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">已评作品</p>
              <p className="text-2xl font-bold text-gray-800">{stats.completed}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">分配总数</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-800">待评审作品</h2>
          <span className="text-sm text-gray-500">共 {assignments.length} 个作品</span>
        </div>

        {assignments.length === 0 ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500">暂无分配给您的作品</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">作品名称</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">团队</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">赛道</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">评审轮次</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">我的状态</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {assignments.map((assignment) => {
                  const isScored = assignment.record && assignment.record.status === 'submitted';
                  const isDraft = assignment.record && assignment.record.status === 'draft';

                  return (
                    <tr key={assignment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="text-sm font-medium text-gray-800">{assignment.work?.title || '-'}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-sm text-gray-600">{assignment.work?.team?.name || '-'}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-sm text-gray-600">{assignment.work?.track?.name || '-'}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-sm text-gray-600">{assignment.round?.roundName || '-'}</div>
                      </td>
                      <td className="px-5 py-4">
                        {!assignment.record ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-100">
                            待评审
                          </span>
                        ) : isScored ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                            已评分 {assignment.record.overallScore}
                          </span>
                        ) : isDraft ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
                            草稿
                          </span>
                        ) : null}
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          to={`/reviewer/review/${assignment.workId}`}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                            isScored
                              ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              : 'bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow'
                          }`}
                        >
                          {isScored ? (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                              修改评分
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              {isDraft ? '继续评审' : '开始评审'}
                            </>
                          )}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewerDashboard;
