import React, { useState, useMemo, useEffect } from 'react';
import { request } from '../../lib/api';
import {
  SPACING,
  TYPOGRAPHY,
  TABLE_STYLES,
  FORM_STYLES,
  DRAWER_STYLES,
  getStatusTagClass,
  BUTTON_STYLES
} from '../../styles/admin-theme';

// ==================== API 联调区组件 ====================
const ApiDebugPanel = ({ apiStatus, filters }) => {
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-blue-700">API 联调信息</h3>
        <span className="text-xs text-blue-500">开发环境可见</span>
      </div>
      
      {/* 第一行：轮次和评委接口 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">轮次接口</p>
          <p className="font-mono text-xs text-gray-800 truncate">GET /v1/admin/review-rounds</p>
          <p className={`text-xs font-semibold mt-1 ${
            apiStatus.rounds === 200 ? 'text-green-600' : 
            apiStatus.rounds === 'error' ? 'text-red-600' : 'text-gray-400'
          }`}>
            {apiStatus.rounds || '-'}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">轮次数量</p>
          <p className="text-sm font-semibold text-gray-800">{apiStatus.roundCount ?? '-'}</p>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">评委接口</p>
          <p className="font-mono text-xs text-gray-800 truncate">GET /v1/admin/reviewers</p>
          <p className={`text-xs font-semibold mt-1 ${
            apiStatus.reviewers === 200 ? 'text-green-600' : 
            apiStatus.reviewers === 'error' ? 'text-red-600' : 
            apiStatus.reviewers === 'not-found' ? 'text-orange-600' : 'text-gray-400'
          }`}>
            {apiStatus.reviewers || '-'}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">评委数量</p>
          <p className="text-sm font-semibold text-gray-800">{apiStatus.reviewerCount ?? '-'}</p>
        </div>
      </div>

      {/* 第二行：分配和筛选 */}
      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">分配保存接口</p>
          <p className="font-mono text-xs text-gray-800 truncate">POST /v1/admin/review-rounds/:id/assignments</p>
          <p className={`text-xs font-semibold mt-1 ${
            apiStatus.saveAssignment === 200 ? 'text-green-600' : 
            apiStatus.saveAssignment === 'error' ? 'text-red-600' : 'text-gray-400'
          }`}>
            {apiStatus.saveAssignment || '-'}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">分配数量</p>
          <p className="text-sm font-semibold text-gray-800">{apiStatus.assignmentCount ?? '-'}</p>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">筛选条件</p>
          <p className="text-xs text-gray-800 truncate">
            赛事: {filters.competitionId || '全部'}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">当前轮次ID</p>
          <p className="text-xs text-gray-800 truncate">{filters.roundId || '-'}</p>
        </div>
      </div>

      {/* 进度数据 */}
      {apiStatus.progress && (
        <div className="mt-3 grid grid-cols-3 gap-3">
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">总分配</p>
            <p className="text-sm font-semibold text-gray-800">{apiStatus.progress.total || 0}</p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">已提交</p>
            <p className="text-sm font-semibold text-green-600">{apiStatus.progress.submitted || 0}</p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">待评分</p>
            <p className="text-sm font-semibold text-orange-600">{apiStatus.progress.pending || 0}</p>
          </div>
        </div>
      )}

      {/* 接口缺失警告 */}
      {apiStatus.reviewers === 'not-found' && (
        <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-xs text-orange-600">
            <span className="font-semibold">⚠️ 后端接口缺失：</span>
            未找到 GET /v1/admin/reviewers 接口，评委列表功能暂时不可用。
            需要后端添加此接口或提供按角色筛选的用户列表接口。
          </p>
        </div>
      )}
    </div>
  );
};

// ==================== 状态标签组件 ====================
const StatusTag = ({ status }) => {
  const statusMap = {
    'draft': '草稿',
    'active': '进行中',
    'completed': '已完成',
    'cancelled': '已取消'
  };
  return (
    <span className={getStatusTagClass(status)}>
      {statusMap[status] || status}
    </span>
  );
};

// ==================== Toast 组件 ====================
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-primary';

  return (
    <div className={`fixed top-6 right-6 ${bgColor} text-white px-6 py-3 rounded-xl shadow-lg z-50`}>
      <div className="flex items-center gap-2">
        {type === 'success' && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};

// ==================== 分配评审弹窗 ====================
const AssignReviewerModal = ({ round, isOpen, onClose, onAssign, showToast, onApiStatusUpdate }) => {
  const [selectedWorks, setSelectedWorks] = useState([]);
  const [selectedReviewers, setSelectedReviewers] = useState([]);
  const [works, setWorks] = useState([]);
  const [reviewers, setReviewers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviewersLoading, setReviewersLoading] = useState(false);
  const [reviewersError, setReviewersError] = useState(null);

  useEffect(() => {
    if (isOpen && round) {
      fetchWorksAndReviewers();
    }
  }, [isOpen, round]);

  const fetchWorksAndReviewers = async () => {
    setReviewersLoading(true);
    setReviewersError(null);
    
    try {
      // 获取作品列表
      const worksRes = await request(`/v1/admin/works?competitionId=${round.competitionId}&status=submitted`);
      if (worksRes.ok && worksRes.data?.code === 0) {
        setWorks(worksRes.data.data?.list || []);
      }

      // 尝试获取评委列表
      try {
        const reviewersRes = await request(`/v1/admin/reviewers?competitionId=${round.competitionId}`);
        if (reviewersRes.ok && reviewersRes.data?.code === 0) {
          setReviewers(reviewersRes.data.data || []);
          onApiStatusUpdate?.({ reviewers: 200, reviewerCount: reviewersRes.data.data?.length || 0 });
        } else if (reviewersRes.status === 404) {
          setReviewersError('not-found');
          onApiStatusUpdate?.({ reviewers: 'not-found', reviewerCount: 0 });
        } else {
          setReviewersError('error');
          onApiStatusUpdate?.({ reviewers: 'error', reviewerCount: 0 });
        }
      } catch (reviewerErr) {
        console.error('Fetch reviewers error:', reviewerErr);
        setReviewersError('not-found');
        onApiStatusUpdate?.({ reviewers: 'not-found', reviewerCount: 0 });
      }
    } catch (err) {
      console.error('Fetch works error:', err);
    } finally {
      setReviewersLoading(false);
    }
  };

  if (!isOpen || !round) return null;

  const handleSave = async () => {
    if (selectedWorks.length === 0) {
      showToast('请选择作品', 'error');
      return;
    }
    if (selectedReviewers.length === 0 && reviewers.length > 0) {
      showToast('请选择评委', 'error');
      return;
    }
    if (reviewers.length === 0) {
      showToast('评委列表接口不可用，无法保存分配', 'error');
      return;
    }

    setLoading(true);
    try {
      const assignments = [];
      selectedWorks.forEach(workId => {
        selectedReviewers.forEach(reviewerId => {
          assignments.push({ workId, reviewerId });
        });
      });

      const result = await request(`/v1/admin/review-rounds/${round.id}/assignments`, {
        method: 'POST',
        body: JSON.stringify({ assignments })
      });

      if (result.ok && result.data?.code === 0) {
        showToast('评委分配成功', 'success');
        onApiStatusUpdate?.({ saveAssignment: 200 });
        onAssign();
        onClose();
      } else {
        onApiStatusUpdate?.({ saveAssignment: 'error' });
        showToast(result.data?.message || '分配失败', 'error');
      }
    } catch (err) {
      onApiStatusUpdate?.({ saveAssignment: 'error' });
      showToast('分配失败', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl z-50 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">分配评审</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">当前轮次</span>
            <p className="text-sm font-semibold text-gray-800 mt-2">{round.roundName}</p>
            <p className="text-xs text-gray-500 mt-1">赛事: {round.competition?.name}</p>
            <p className="text-xs text-gray-400 mt-1">轮次ID: {round.id}</p>
          </div>

          {/* 作品选择 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">选择作品</span>
              <span className="text-xs text-gray-500">已选择 {selectedWorks.length} 个</span>
            </div>
            <div className="border border-gray-200 rounded-xl max-h-40 overflow-y-auto">
              {works.map(work => (
                <label key={work.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0">
                  <input
                    type="checkbox"
                    checked={selectedWorks.includes(work.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedWorks(prev => [...prev, work.id]);
                      } else {
                        setSelectedWorks(prev => prev.filter(id => id !== work.id));
                      }
                    }}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700 truncate">{work.title}</span>
                </label>
              ))}
              {works.length === 0 && (
                <p className="px-4 py-3 text-sm text-gray-400">暂无可用作品</p>
              )}
            </div>
          </div>

          {/* 评委选择 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">选择评委</span>
              <span className="text-xs text-gray-500">已选择 {selectedReviewers.length} 人</span>
            </div>
            <div className="border border-gray-200 rounded-xl max-h-40 overflow-y-auto">
              {reviewersLoading ? (
                <div className="px-4 py-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              ) : reviewersError === 'not-found' ? (
                <div className="px-4 py-4 text-center">
                  <p className="text-sm text-orange-600 mb-1">⚠️ 后端接口缺失</p>
                  <p className="text-xs text-gray-500">未找到 GET /v1/admin/reviewers 接口</p>
                  <p className="text-xs text-gray-400 mt-1">需要后端添加评委列表接口</p>
                </div>
              ) : reviewers.length > 0 ? (
                reviewers.map(reviewer => (
                  <label key={reviewer.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0">
                    <input
                      type="checkbox"
                      checked={selectedReviewers.includes(reviewer.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedReviewers(prev => [...prev, reviewer.id]);
                        } else {
                          setSelectedReviewers(prev => prev.filter(id => id !== reviewer.id));
                        }
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 truncate">{reviewer.name || reviewer.username}</p>
                      <p className="text-xs text-gray-400 truncate">{reviewer.email}</p>
                    </div>
                  </label>
                ))
              ) : (
                <p className="px-4 py-3 text-sm text-gray-400">暂无可用评委</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-end gap-3">
            <button 
              onClick={onClose} 
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors" 
              disabled={loading}
            >
              取消
            </button>
            <button
              onClick={handleSave}
              disabled={loading || selectedWorks.length === 0 || reviewers.length === 0 || (reviewers.length > 0 && selectedReviewers.length === 0)}
              className={`px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? '保存中...' : '保存分配'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// ==================== 轮次详情抽屉（整合进度和详情） ====================
const RoundDetailDrawer = ({ round, isOpen, onClose, onAssign, showToast }) => {
  const [activeTab, setActiveTab] = useState('overview'); // overview | assignments | progress
  const [progress, setProgress] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && round) {
      fetchRoundData();
    }
  }, [isOpen, round]);

  const fetchRoundData = async () => {
    setLoading(true);
    try {
      // 并行获取进度和分配情况
      const [progressRes, assignmentsRes] = await Promise.all([
        request(`/v1/admin/review-rounds/${round.id}/progress`),
        request(`/v1/admin/review-rounds/${round.id}/assignments`)
      ]);

      if (progressRes.ok && progressRes.data?.code === 0) {
        setProgress(progressRes.data.data);
      }

      if (assignmentsRes.ok && assignmentsRes.data?.code === 0) {
        setAssignments(assignmentsRes.data.data || []);
      }
    } catch (err) {
      console.error('Fetch round data error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignClick = () => {
    onClose();
    onAssign(round);
  };

  if (!isOpen || !round) return null;

  const progressPercent = progress?.total > 0
    ? Math.round((progress.submitted / progress.total) * 100)
    : 0;

  // 分配状态判断（与列表保持一致）
  const assignmentCount = assignments.length;
  const uniqueWorks = new Set(assignments.map(a => a.workId)).size;
  const uniqueReviewers = new Set(assignments.map(a => a.reviewerId)).size;

  const hasAssignments = progress?.total > 0;
  const hasSubmitted = progress?.submitted > 0;
  const isAllSubmitted = hasAssignments && progress.submitted === progress.total;

  let assignmentStatus = 'none';
  if (!hasAssignments) {
    assignmentStatus = 'none';
  } else if (isAllSubmitted) {
    assignmentStatus = 'completed';
  } else if (hasSubmitted) {
    assignmentStatus = 'in_progress';
  } else {
    assignmentStatus = 'assigned';
  }

  const statusConfig = {
    'none': { label: '未分配', color: 'bg-gray-100 text-gray-600', desc: '需要分配作品和评委' },
    'assigned': { label: '已分配', color: 'bg-blue-100 text-blue-700', desc: '等待评审员评分' },
    'in_progress': { label: '评审中', color: 'bg-amber-100 text-amber-700', desc: '已有评审员提交评分' },
    'completed': { label: '评审完成', color: 'bg-green-100 text-green-700', desc: '所有评分已提交' }
  };
  const currentStatus = statusConfig[assignmentStatus];

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl z-50 flex flex-col">
        {/* 头部 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{round.roundName}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{round.competition?.name}</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab 导航 */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            概览
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'assignments'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            分配情况 ({assignmentCount})
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'progress'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            评审进度
          </button>
        </div>

        {/* 内容区 */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {loading ? (
            <div className="space-y-4">
              <div className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
              <div className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
              <div className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
            </div>
          ) : (
            <>
              {/* 概览 Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* 分配状态卡片 */}
                  <div className={`p-4 rounded-xl ${currentStatus.color} bg-opacity-50`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">分配状态</span>
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${currentStatus.color}`}>
                        {currentStatus.label}
                      </span>
                    </div>
                    <p className="text-sm opacity-80">{currentStatus.desc}</p>
                  </div>

                  {/* 基础信息 */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      基础信息
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">轮次名称</span>
                        <span className="text-sm text-gray-800">{round.roundName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">所属赛事</span>
                        <span className="text-sm text-gray-800">{round.competition?.name || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">轮次顺序</span>
                        <span className="text-sm text-gray-800">第 {round.roundOrder} 轮</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">评审类型</span>
                        <span className="text-sm text-gray-800">{round.roundType === 'preliminary' ? '初审' : round.roundType === 'final' ? '终审' : round.roundType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">当前状态</span>
                        <StatusTag status={round.status} />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">时间范围</span>
                        <span className="text-sm text-gray-800">
                          {round.startTime && round.endTime
                            ? `${new Date(round.startTime).toLocaleDateString()} - ${new Date(round.endTime).toLocaleDateString()}`
                            : '-'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 分配统计 */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      分配统计
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">已分配作品</p>
                        <p className="text-xl font-bold text-gray-800">{uniqueWorks}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">参与评委</p>
                        <p className="text-xl font-bold text-gray-800">{uniqueReviewers}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">总分配数</p>
                        <p className="text-xl font-bold text-gray-800">{assignmentCount}</p>
                      </div>
                    </div>
                  </div>

                  {/* 评审进度摘要 */}
                  {progress && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        评审进度
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-600">总体完成度</span>
                          <span className="font-semibold text-gray-800">{progress.submitted}/{progress.total}</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                        </div>
                        <p className="text-xs text-gray-500">{progressPercent}% 已完成</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 分配情况 Tab */}
              {activeTab === 'assignments' && (
                <div>
                  {assignments.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <p className="text-gray-500 mb-2">暂无分配记录</p>
                      <p className="text-sm text-gray-400">点击底部按钮开始分配</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {assignments.map((assignment) => (
                        <div key={assignment.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-800 truncate">{assignment.work?.title || '未知作品'}</span>
                            {assignment.record?.status === 'submitted' ? (
                              <span className="px-2 py-0.5 text-xs bg-green-100 text-green-600 rounded-full">已评分 {assignment.record?.overallScore}</span>
                            ) : assignment.record?.status === 'draft' ? (
                              <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">草稿</span>
                            ) : (
                              <span className="px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded-full">待评审</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>评委: {assignment.reviewer?.username || assignment.reviewer?.name || '-'}</span>
                            <span>·</span>
                            <span>分配方式: {assignment.assignmentType === 'auto' ? '自动' : '手动'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 评审进度 Tab */}
              {activeTab === 'progress' && (
                <div className="space-y-6">
                  {progress ? (
                    <>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">总体进度</h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between text-sm mb-3">
                            <span className="text-gray-600">完成度</span>
                            <span className="font-semibold text-gray-800">{progress.submitted}/{progress.total}</span>
                          </div>
                          <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                          </div>
                          <p className="text-xs text-gray-500">{progressPercent}% 已完成</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-500 mb-1">总分配</p>
                          <p className="text-2xl font-bold text-gray-800">{progress.total}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3 text-center">
                          <p className="text-xs text-green-600 mb-1">已提交</p>
                          <p className="text-2xl font-bold text-green-600">{progress.submitted}</p>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-3 text-center">
                          <p className="text-xs text-orange-600 mb-1">待评分</p>
                          <p className="text-2xl font-bold text-orange-600">{progress.pending}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-center text-gray-400 py-8">暂无进度数据</p>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* 底部操作 */}
        <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              关闭
            </button>
            <button
              onClick={handleAssignClick}
              className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
            >
              {assignmentCount === 0 ? '开始分配' : '调整分配'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// ==================== 主组件 ====================
const AdminReviews = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [competitionFilter, setCompetitionFilter] = useState('all');
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [selectedRound, setSelectedRound] = useState(null);
  const [roundStats, setRoundStats] = useState({}); // 存储每个轮次的分配统计
  const [toast, setToast] = useState(null);
  
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState({ 
    rounds: '-', 
    roundCount: 0, 
    assignmentCount: 0,
    reviewers: '-',
    reviewerCount: 0,
    saveAssignment: '-',
    progress: null 
  });
  
  const [competitions, setCompetitions] = useState([]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const fetchRounds = async () => {
    setLoading(true);
    setError(null);
    setApiStatus(prev => ({ ...prev, rounds: 'loading' }));

    try {
      const params = new URLSearchParams();
      if (competitionFilter !== 'all') {
        params.append('competitionId', competitionFilter);
      }

      const result = await request(`/v1/admin/review-rounds?${params.toString()}`);
      
      setApiStatus(prev => ({
        ...prev,
        rounds: result.status,
        roundCount: result.ok && result.data?.code === 0 ? (result.data.data?.length || 0) : 0
      }));

      if (result.ok && result.data?.code === 0) {
        setRounds(result.data.data || []);
      } else {
        setError(result.data?.message || '获取评审轮次失败');
        setRounds([]);
      }
    } catch (err) {
      console.error('Fetch rounds error:', err);
      setError('获取评审轮次失败');
      setApiStatus(prev => ({ ...prev, rounds: 'error' }));
      setRounds([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompetitions = async () => {
    try {
      const result = await request('/v1/competitions');
      if (result.ok && result.data?.code === 0 && result.data.data) {
        setCompetitions(Array.isArray(result.data.data.list) ? result.data.data.list : []);
      } else {
        setCompetitions([]);
      }
    } catch (err) {
      console.error('Fetch competitions error:', err);
      setCompetitions([]);
    }
  };

  useEffect(() => {
    fetchCompetitions();
    fetchRounds();
  }, []);

  useEffect(() => {
    fetchRounds();
  }, [competitionFilter]);

  const filteredRounds = useMemo(() => {
    if (!searchQuery) return rounds;
    const searchLower = searchQuery.toLowerCase();
    return rounds.filter(round => 
      round.roundName?.toLowerCase().includes(searchLower) ||
      round.competition?.name?.toLowerCase().includes(searchLower)
    );
  }, [rounds, searchQuery]);

  const handleViewDetail = (round) => {
    setSelectedRound(round);
    setIsDetailOpen(true);
  };

  const handleAssign = (round) => {
    setSelectedRound(round);
    setIsAssignOpen(true);
  };

  // 获取轮次的分配统计（用于列表显示）
  const fetchRoundStats = async (roundId) => {
    try {
      const result = await request(`/v1/admin/review-rounds/${roundId}/progress`);
      if (result.ok && result.data?.code === 0) {
        setRoundStats(prev => ({
          ...prev,
          [roundId]: result.data.data
        }));
      }
    } catch (err) {
      console.error('Fetch round stats error:', err);
    }
  };

  // 获取所有轮次的统计
  useEffect(() => {
    if (rounds.length > 0) {
      rounds.forEach(round => {
        fetchRoundStats(round.id);
      });
    }
  }, [rounds]);

  const handleApiStatusUpdate = (updates) => {
    setApiStatus(prev => ({ ...prev, ...updates }));
  };

  if (error) {
    return (
      <div className={`${SPACING.section} pb-8`}>
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={fetchRounds} 
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${SPACING.section} pb-8`}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <ApiDebugPanel 
        apiStatus={apiStatus} 
        filters={{ 
          competitionId: competitionFilter === 'all' ? '' : competitionFilter,
          roundId: selectedRound?.id || ''
        }}
      />

      <div>
        <h2 className={TYPOGRAPHY.pageTitle}>评审管理</h2>
        <p className={TYPOGRAPHY.pageSubtitle}>管理评审轮次，分配评审任务，跟踪评分进度</p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label className={TYPOGRAPHY.label}>搜索轮次</label>
            <div className="relative mt-2">
              <input
                type="text"
                placeholder="请输入搜索内容..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${FORM_STYLES.input} pl-10 w-full sm:w-64`}
                style={{ height: '44px' }}
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label className={TYPOGRAPHY.label}>赛事筛选</label>
            <select
              value={competitionFilter}
              onChange={(e) => setCompetitionFilter(e.target.value)}
              className={`${FORM_STYLES.select} mt-2 min-w-[180px]`}
            >
              <option value="all">全部赛事</option>
              {competitions.map((comp) => (
                <option key={comp.id} value={comp.id}>{comp.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={TABLE_STYLES.container}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={TABLE_STYLES.header}>
              <tr>
                <th className={TABLE_STYLES.headerCell}>轮次名称</th>
                <th className={TABLE_STYLES.headerCell}>所属赛事</th>
                <th className={TABLE_STYLES.headerCell}>轮次顺序</th>
                <th className={TABLE_STYLES.headerCell}>状态</th>
                <th className={TABLE_STYLES.headerCell}>分配进度</th>
                <th className={TABLE_STYLES.headerCell}>评审进度</th>
                <th className={TABLE_STYLES.headerCell}>操作</th>
              </tr>
            </thead>
            <tbody className={TABLE_STYLES.divider}>
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    <td className={TABLE_STYLES.cell}><div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div></td>
                    <td className={TABLE_STYLES.cell}><div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div></td>
                    <td className={TABLE_STYLES.cell}><div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div></td>
                    <td className={TABLE_STYLES.cell}><div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div></td>
                    <td className={TABLE_STYLES.cell}><div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div></td>
                    <td className={TABLE_STYLES.cell}><div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div></td>
                    <td className={TABLE_STYLES.cell}><div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div></td>
                  </tr>
                ))
              ) : (
                filteredRounds.map((round) => {
                  const stats = roundStats[round.id];
                  const hasStats = stats && stats.total > 0;
                  const progressPercent = hasStats && stats.total > 0
                    ? Math.round((stats.submitted / stats.total) * 100)
                    : 0;

                  return (
                    <tr key={round.id} className={TABLE_STYLES.row}>
                      <td className={TABLE_STYLES.cell}>
                        <span className="text-sm font-semibold text-gray-800">{round.roundName}</span>
                      </td>
                      <td className={TABLE_STYLES.cell}>
                        <span className="text-sm text-gray-600 line-clamp-1" title={round.competition?.name}>
                          {round.competition?.name || '-'}
                        </span>
                      </td>
                      <td className={TABLE_STYLES.cell}>
                        <span className="text-sm text-gray-600">第 {round.roundOrder} 轮</span>
                      </td>
                      <td className={TABLE_STYLES.cell}>
                        <StatusTag status={round.status} />
                      </td>
                      <td className={TABLE_STYLES.cell}>
                        {hasStats ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{stats.total} 作品已分配</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">未分配</span>
                        )}
                      </td>
                      <td className={TABLE_STYLES.cell}>
                        {hasStats ? (
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${progressPercent}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-600">{stats.submitted}/{stats.total}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                    <td className={TABLE_STYLES.cell}>
                      {(() => {
                        const stats = roundStats[round.id];
                        const hasAssignments = stats && stats.total > 0;
                        const hasSubmitted = stats && stats.submitted > 0;
                        const isAllSubmitted = hasAssignments && stats.submitted === stats.total;

                        // 状态判定
                        let status = 'none';
                        if (!hasAssignments) {
                          status = 'none';
                        } else if (isAllSubmitted) {
                          status = 'completed';
                        } else if (hasSubmitted) {
                          status = 'in_progress';
                        } else {
                          status = 'assigned';
                        }

                        return (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleViewDetail(round)}
                              className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                            >
                              查看详情
                            </button>
                            {status === 'none' && (
                              <button
                                onClick={() => handleAssign(round)}
                                className="px-3 py-1.5 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
                              >
                                分配评审
                              </button>
                            )}
                            {status === 'assigned' && (
                              <button
                                onClick={() => handleAssign(round)}
                                className="px-3 py-1.5 text-sm font-medium text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
                              >
                                调整分配
                              </button>
                            )}
                            {status === 'in_progress' && (
                              <button
                                onClick={() => handleAssign(round)}
                                className="px-3 py-1.5 text-sm font-medium text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
                              >
                                调整分配
                              </button>
                            )}
                            {status === 'completed' && (
                              <button
                                onClick={() => handleViewDetail(round)}
                                className="px-3 py-1.5 text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                              >
                                评审完成
                              </button>
                            )}
                          </div>
                        );
                      })()}
                    </td>
                  </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {!loading && filteredRounds.length === 0 && (
          <div className="py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500">暂无评审轮次</p>
          </div>
        )}
      </div>

      <AssignReviewerModal
        round={selectedRound}
        isOpen={isAssignOpen}
        onClose={() => setIsAssignOpen(false)}
        onAssign={fetchRounds}
        showToast={showToast}
        onApiStatusUpdate={handleApiStatusUpdate}
      />

      <RoundDetailDrawer
        round={selectedRound}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onAssign={handleAssign}
        showToast={showToast}
      />
    </div>
  );
};

export default AdminReviews;
