import React, { useState, useMemo, useRef, useEffect } from 'react';
import { request } from '../../lib/api';

const STATUS_MAP = {
  'draft': { label: '草稿', color: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' },
  'submitted': { label: '已提交', color: 'bg-blue-50 text-blue-600', dot: 'bg-blue-400' },
  'pending_review': { label: '待审核', color: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500', pulse: true },
  'approved': { label: '已通过', color: 'bg-green-50 text-green-600', dot: 'bg-green-400' },
  'rejected': { label: '已驳回', color: 'bg-red-50 text-red-400', dot: 'bg-red-300' },
  'need_more_material': { label: '待补件', color: 'bg-blue-50 text-blue-600', dot: 'bg-blue-400' },
  'withdrawn': { label: '已撤回', color: 'bg-gray-100 text-gray-500', dot: 'bg-gray-400' },
};

const StatusTag = ({ status }) => {
  const config = STATUS_MAP[status] || { label: status || '-', color: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${config.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} ${config.pulse ? 'animate-pulse' : ''}`}></span>
      {config.label}
    </span>
  );
};

const ActionButtons = ({ enrollment, onView, onApprove }) => {
  const canReview = enrollment.status === 'submitted' || enrollment.status === 'pending_review' || enrollment.status === 'need_more_material';
  const canRevoke = enrollment.status === 'approved';
  const canReapprove = enrollment.status === 'rejected';

  const handleReviewClick = () => {
    onView(enrollment, 'review');
  };

  const handleViewClick = () => {
    onView(enrollment, 'view');
  };

  const handleQuickApprove = () => {
    onApprove(enrollment.id);
  };

  return (
    <div className="flex items-center gap-2">
      {/* 查看详情按钮 - 始终显示 */}
      <button
        onClick={handleViewClick}
        className="px-3 py-1.5 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
      >
        查看详情
      </button>

      {/* 审核按钮 - 待审核/已提交/待补件状态显示 */}
      {canReview && (
        <button
          onClick={handleReviewClick}
          className="px-3 py-1.5 text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors"
        >
          审核
        </button>
      )}

      {/* 重新通过按钮 - 已驳回状态显示 */}
      {canReapprove && (
        <button
          onClick={handleQuickApprove}
          className="px-3 py-1.5 text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
        >
          重新通过
        </button>
      )}

      {/* 撤销通过按钮 - 已通过状态显示 */}
      {canRevoke && (
        <button
          onClick={handleReviewClick}
          className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
        >
          撤销通过
        </button>
      )}
    </div>
  );
};

const DetailDrawer = ({ enrollment, isOpen, onClose, onApprove, onReject, onNeedMore, initialAction = 'view' }) => {
  const [actionType, setActionType] = useState(null);
  const [remark, setRemark] = useState('');

  // 根据 initialAction 和状态决定显示什么操作
  useEffect(() => {
    if (initialAction === 'review') {
      // 审核模式：待审核/已提交/待补件状态
      if (['submitted', 'pending_review', 'need_more_material'].includes(enrollment?.status)) {
        setActionType(null); // 显示操作按钮区
      }
    } else if (initialAction === 'revoke') {
      // 撤销模式：已通过状态，直接显示驳回输入框
      if (enrollment?.status === 'approved') {
        setActionType('reject');
      }
    }
  }, [initialAction, enrollment?.status]);

  // 关闭时重置状态
  useEffect(() => {
    if (!isOpen) {
      setActionType(null);
      setRemark('');
    }
  }, [isOpen]);

  if (!isOpen || !enrollment) return null;

  const handleAction = () => {
    if (actionType === 'reject') onReject(enrollment.id, remark);
    else if (actionType === 'needMore') onNeedMore(enrollment.id, remark);
    setActionType(null);
    setRemark('');
  };

  const handleApprove = () => { onApprove(enrollment.id); };

  const formatDate = (d) => {
    if (!d) return '-';
    try { return new Date(d).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }); }
    catch { return d; }
  };

  // 判断是否可以进行审核操作
  const canReview = ['submitted', 'pending_review', 'need_more_material'].includes(enrollment.status);
  // 判断是否可以撤销通过（需要填写原因）
  const canRevoke = enrollment.status === 'approved';

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl z-50 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">报名详情</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              基础信息
            </h4>
            <div className="space-y-3 bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">参赛者</span>
                <span className="text-sm font-medium text-gray-800">{enrollment.user?.username || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">邮箱</span>
                <span className="text-sm text-gray-800">{enrollment.user?.email || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">赛事</span>
                <span className="text-sm text-gray-800">{enrollment.competition?.name || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">赛道</span>
                <span className="text-sm text-gray-800">{enrollment.track?.name || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">报名类型</span>
                <span className="text-sm text-gray-800">{enrollment.enrollmentType === 'team' ? '团队' : '个人'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">状态</span>
                <StatusTag status={enrollment.status} />
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">提交时间</span>
                <span className="text-sm text-gray-800">{formatDate(enrollment.submittedAt || enrollment.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              审核记录
            </h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">当前状态</span>
                <StatusTag status={enrollment.status} />
              </div>
              {enrollment.reviewComment && (
                <div className="pt-3 border-t border-gray-200">
                  <span className="text-sm text-gray-500 block mb-1">审核意见</span>
                  <p className="text-sm text-gray-700">{enrollment.reviewComment}</p>
                </div>
              )}
            </div>
          </div>

          {actionType && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                {actionType === 'reject' ? '驳回原因' : '补件说明'}
              </h4>
              <textarea
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder={`请输入${actionType === 'reject' ? '驳回原因' : '补件说明'}...`}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
              />
              <div className="flex items-center justify-end gap-2 mt-3">
                <button onClick={() => { setActionType(null); setRemark(''); }} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">取消</button>
                <button
                  onClick={handleAction}
                  disabled={!remark.trim() && actionType === 'reject'}
                  className={`px-3 py-1.5 text-sm text-white rounded-lg transition-colors ${
                    actionType === 'reject'
                      ? 'bg-red-500 hover:bg-red-600 disabled:bg-red-300'
                      : 'bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300'
                  }`}
                >
                  确认
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 底部操作按钮区 */}
        {!actionType && (
          <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
            {canReview && (
              // 待审核/已提交/待补件状态：显示完整审核操作
              <div className="flex items-center justify-end gap-3">
                <button onClick={() => setActionType('needMore')} className="px-4 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">要求补件</button>
                <button onClick={() => setActionType('reject')} className="px-4 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">驳回</button>
                <button onClick={handleApprove} className="px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors">审核通过</button>
              </div>
            )}
            {canRevoke && (
              // 已通过状态：显示撤销通过操作
              <div className="flex items-center justify-end gap-3">
                <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">关闭</button>
                <button onClick={() => setActionType('reject')} className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors">撤销通过</button>
              </div>
            )}
            {!canReview && !canRevoke && (
              // 其他状态：只显示关闭按钮
              <div className="flex items-center justify-end">
                <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">关闭</button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
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

const ApiDebugPanel = ({ apiStatus, reviewStatus, filters, enrollmentCount }) => {
  if (process.env.NODE_ENV !== 'development') return null;
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-blue-700">API 联调信息</h3>
        <span className="text-xs text-blue-500">开发环境可见</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">列表接口</p>
          <p className="font-mono text-xs text-gray-800 truncate">GET /v1/admin/enrollments</p>
          <p className={`text-xs font-semibold mt-1 ${
            apiStatus.list === 200 ? 'text-green-600' :
            apiStatus.list === 'error' ? 'text-red-600' : 'text-gray-400'
          }`}>
            {apiStatus.list === 200 ? `✅ ${enrollmentCount} 条` :
             apiStatus.list === 'error' ? '❌ 请求失败' : '⏳ 等待中'}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">筛选条件</p>
          <p className="font-mono text-xs text-gray-800">
            {filters.status === 'all' ? '全部状态' : filters.status} | {filters.competitionId || '全部赛事'}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">最近审核</p>
          <p className={`text-xs font-semibold mt-1 ${
            reviewStatus === 'success' ? 'text-green-600' :
            reviewStatus === 'error' ? 'text-red-600' :
            reviewStatus === 'loading' ? 'text-orange-600' : 'text-gray-400'
          }`}>
            {reviewStatus === 'success' ? '✅ 审核成功' :
             reviewStatus === 'error' ? '❌ 审核失败' :
             reviewStatus === 'loading' ? '⏳ 审核中...' : '—'}
          </p>
        </div>
      </div>
    </div>
  );
};

const AdminEnrollments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [competitionFilter, setCompetitionFilter] = useState('all');
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [reviewAction, setReviewAction] = useState(null);
  const [apiStatus, setApiStatus] = useState({ list: null });
  const [reviewStatus, setReviewStatus] = useState(null);

  const fetchEnrollments = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (competitionFilter !== 'all') params.append('competitionId', competitionFilter);

      const result = await request(`/v1/admin/enrollments${params.toString() ? '?' + params.toString() : ''}`);
      if (result.ok && result.data?.code === 0 && result.data.data) {
        const list = Array.isArray(result.data.data.list) ? result.data.data.list : [];
        setEnrollments(list);
        setApiStatus(prev => ({ ...prev, list: 200 }));
      } else {
        setEnrollments([]);
        setApiStatus(prev => ({ ...prev, list: 'error' }));
        setError('获取报名列表失败');
      }
    } catch (err) {
      console.error('Fetch enrollments error:', err);
      setEnrollments([]);
      setApiStatus(prev => ({ ...prev, list: 'error' }));
      setError('网络错误，无法获取报名列表');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEnrollments(); }, [statusFilter, competitionFilter]);

  const filteredEnrollments = useMemo(() => {
    return enrollments.filter(e => {
      const q = searchQuery.toLowerCase();
      const matchSearch = !q ||
        (e.user?.username || '').toLowerCase().includes(q) ||
        (e.user?.email || '').toLowerCase().includes(q) ||
        (e.competition?.name || '').toLowerCase().includes(q) ||
        (e.track?.name || '').toLowerCase().includes(q);
      return matchSearch;
    });
  }, [enrollments, searchQuery]);

  const handleApprove = async (id) => {
    setReviewStatus('loading');
    try {
      const result = await request(`/v1/admin/enrollments/${id}/approve`, { method: 'PUT', body: JSON.stringify({}) });
      if (result.ok && result.data?.code === 0) {
        setReviewStatus('success');
        setToast({ message: '审核通过成功', type: 'success' });
        setIsDrawerOpen(false);
        fetchEnrollments();
      } else {
        setReviewStatus('error');
        setToast({ message: result.data?.message || '审核通过失败', type: 'error' });
      }
    } catch (err) {
      setReviewStatus('error');
      setToast({ message: '网络错误，审核失败', type: 'error' });
    }
  };

  const handleReject = async (id, comment) => {
    if (!comment?.trim()) {
      setToast({ message: '请输入驳回原因', type: 'error' });
      return;
    }
    setReviewStatus('loading');
    try {
      const result = await request(`/v1/admin/enrollments/${id}/reject`, { method: 'PUT', body: JSON.stringify({ comment }) });
      if (result.ok && result.data?.code === 0) {
        setReviewStatus('success');
        setToast({ message: '已驳回', type: 'success' });
        setIsDrawerOpen(false);
        fetchEnrollments();
      } else {
        setReviewStatus('error');
        setToast({ message: result.data?.message || '驳回失败', type: 'error' });
      }
    } catch (err) {
      setReviewStatus('error');
      setToast({ message: '网络错误，驳回失败', type: 'error' });
    }
  };

  const handleNeedMore = async (id, comment) => {
    setReviewStatus('loading');
    try {
      const result = await request(`/v1/admin/enrollments/${id}/need-more-material`, { method: 'PUT', body: JSON.stringify({ comment: comment || '' }) });
      if (result.ok && result.data?.code === 0) {
        setReviewStatus('success');
        setToast({ message: '已要求补件', type: 'success' });
        setIsDrawerOpen(false);
        fetchEnrollments();
      } else {
        setReviewStatus('error');
        setToast({ message: result.data?.message || '操作失败', type: 'error' });
      }
    } catch (err) {
      setReviewStatus('error');
      setToast({ message: '网络错误，操作失败', type: 'error' });
    }
  };

  const handleViewDetail = async (enrollment, action) => {
    setReviewAction(action);
    setIsDrawerOpen(true);

    // 如果没有完整详情，先获取详情
    if (!enrollment.competition || !enrollment.user) {
      try {
        const result = await request(`/v1/admin/enrollments/${enrollment.id}`);
        if (result.ok && result.data?.code === 0 && result.data.data) {
          setSelectedEnrollment(result.data.data);
        } else {
          setSelectedEnrollment(enrollment);
        }
      } catch (err) {
        setSelectedEnrollment(enrollment);
      }
    } else {
      setSelectedEnrollment(enrollment);
    }
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setReviewAction(null);
    fetchEnrollments();
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
        reviewStatus={reviewStatus}
        filters={{ status: statusFilter, competitionId: competitionFilter }}
        enrollmentCount={enrollments.length}
      />

      <div>
        <h2 className="text-2xl font-bold text-gray-800">报名管理</h2>
        <p className="text-sm text-gray-500 mt-2">审核报名资格，管理参赛者信息</p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">搜索</label>
            <div className="relative">
              <input
                type="text"
                placeholder="搜索参赛者/赛事/赛道..."
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
            <label className="block text-xs text-gray-500 mb-1.5">状态筛选</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary bg-white min-w-[140px]"
            >
              <option value="all">全部状态</option>
              <option value="pending_review">待审核</option>
              <option value="approved">已通过</option>
              <option value="rejected">已驳回</option>
              <option value="need_more_material">待补件</option>
              <option value="draft">草稿</option>
              <option value="submitted">已提交</option>
              <option value="withdrawn">已撤回</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">参赛者</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">赛事</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">赛道</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">类型</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">提交时间</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div></td>
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button onClick={fetchEnrollments} className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90">重试</button>
                  </td>
                </tr>
              ) : filteredEnrollments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-500">暂无符合条件的报名</p>
                  </td>
                </tr>
              ) : (
                filteredEnrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold text-gray-800">{enrollment.user?.username || '-'}</span>
                        <span className="text-xs text-gray-400">{enrollment.user?.email || '-'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{enrollment.competition?.name || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{enrollment.track?.name || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{enrollment.enrollmentType === 'team' ? '团队' : '个人'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusTag status={enrollment.status} />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{formatDate(enrollment.submittedAt || enrollment.createdAt)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <ActionButtons
                        enrollment={enrollment}
                        onView={handleViewDetail}
                        onApprove={handleApprove}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DetailDrawer
        enrollment={selectedEnrollment}
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        onApprove={handleApprove}
        onReject={handleReject}
        onNeedMore={handleNeedMore}
        initialAction={reviewAction}
      />
    </div>
  );
};

export default AdminEnrollments;
