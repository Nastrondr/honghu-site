import React, { useState, useMemo, useRef, useEffect } from 'react';
import { request } from '../../lib/api';

// API 联调区组件
const ApiDebugPanel = ({ apiStatus, filters }) => {
  if (process.env.NODE_ENV !== 'development') return null;

  const params = new URLSearchParams();
  if (filters.competitionId) params.append('competitionId', filters.competitionId);
  if (filters.trackId) params.append('trackId', filters.trackId);
  if (filters.status) params.append('status', filters.status);
  params.append('page', filters.page);
  params.append('pageSize', filters.pageSize);
  const queryString = params.toString() ? `?${params.toString()}` : '';

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-blue-700">API 联调信息</h3>
        <span className="text-xs text-blue-500">开发环境可见</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">接口 URL</p>
          <p className="font-mono text-xs text-gray-800 truncate">GET /v1/admin/works{queryString}</p>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">HTTP 状态</p>
          <p className={`text-sm font-semibold ${
            apiStatus.status === 200 ? 'text-green-600' : 
            apiStatus.status === 'error' ? 'text-red-600' : 
            apiStatus.status === 'loading' ? 'text-blue-600' : 'text-gray-400'
          }`}>
            {apiStatus.status || '-'}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">作品数量</p>
          <p className="text-sm font-semibold text-gray-800">{apiStatus.count ?? '-'}</p>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">筛选条件</p>
          <p className="text-xs text-gray-800 truncate">
            赛事: {filters.competitionId || '全部'} | 状态: {filters.status || '全部'}
          </p>
        </div>
      </div>
    </div>
  );
};

// 状态标签组件
const StatusTag = ({ status }) => {
  const statusConfig = {
    'draft': { color: 'bg-gray-100 text-gray-600', label: '草稿' },
    'submitted': { color: 'bg-blue-100 text-blue-600', label: '已提交' },
    'reviewing': { color: 'bg-purple-100 text-purple-600', label: '评审中' },
    'scored': { color: 'bg-cyan-100 text-cyan-600', label: '已评分' },
    'published': { color: 'bg-green-100 text-green-600', label: '已公示' }
  };
  const config = statusConfig[status] || statusConfig['draft'];
  return (
    <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${config.color}`}>
      {config.label}
    </span>
  );
};

// 评分进度组件
const ScoreProgress = ({ scores, assignedReviewers }) => {
  const completedCount = scores?.length || 0;
  const totalCount = assignedReviewers?.length || 0;
  
  const averageScore = useMemo(() => {
    if (!scores || scores.length === 0) return null;
    const avg = scores.reduce((sum, s) => sum + (s.total || 0), 0) / scores.length;
    return avg.toFixed(1);
  }, [scores]);

  if (totalCount === 0) {
    return <span className="text-xs text-gray-400">未分配评委</span>;
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">
          {completedCount}/{totalCount} 已评
        </span>
        {averageScore && (
          <span className="text-xs font-medium text-primary">
            平均分：{averageScore}
          </span>
        )}
      </div>
      <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: `${(completedCount / totalCount) * 100}%` }}
        />
      </div>
    </div>
  );
};

// 状态管理下拉菜单
const StatusDropdown = ({ work, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const statusOptions = [
    { value: 'reviewing', label: '标记为评审中', color: 'text-purple-600' },
    { value: 'scored', label: '标记为已评分', color: 'text-cyan-600' },
    { value: 'published', label: '标记为已公示', color: 'text-green-600' }
  ];

  const handleStatusChange = (newStatus) => {
    onStatusChange(work.id, newStatus);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
      >
        状态管理
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleStatusChange(option.value)}
              disabled={work.status === option.value}
              className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${option.color} ${
                work.status === option.value ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {option.label}
              {work.status === option.value && <span className="ml-2 text-xs">(当前)</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// 评分详情弹窗
const ScoreDetailModal = ({ work, isOpen, onClose, onLockScores }) => {
  const averageScore = useMemo(() => {
    if (!work?.scores || work.scores.length === 0) return null;
    const avg = work.scores.reduce((sum, s) => sum + (s.total || 0), 0) / work.scores.length;
    return avg.toFixed(1);
  }, [work?.scores]);

  if (!isOpen || !work) return null;

  const allScoresLocked = work.scores?.length > 0 && work.scores.every(s => s.status === 'locked');
  const hasLockableScores = work.scores?.some(s => s.status === 'submitted');

  const handleLock = () => {
    if (confirm('确定要锁定所有评分吗？锁定后评委将无法修改评分。')) {
      onLockScores(work.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">评分详情</h3>
            <p className="text-sm text-gray-500">{work.title}</p>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">分配评委</p>
              <p className="text-xl font-bold text-gray-800">{work.assignedReviewers?.length || 0}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">已评分</p>
              <p className="text-xl font-bold text-primary">{work.scores?.length || 0}</p>
            </div>
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg p-4 text-center border border-violet-100">
              <p className="text-xs text-gray-500 mb-1">当前平均分</p>
              <p className="text-xl font-bold text-primary">{averageScore || '-'}</p>
            </div>
          </div>

          {allScoresLocked && (
            <div className="mb-4 p-3 bg-gray-100 rounded-lg flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm font-medium">所有评分已锁定</span>
            </div>
          )}

          <h4 className="text-sm font-semibold text-gray-700 mb-3">评委评分</h4>
          {work.scores && work.scores.length > 0 ? (
            <div className="space-y-3">
              {work.scores.map((score, index) => (
                <div key={index} className={`border rounded-lg p-4 ${
                  score.status === 'locked' ? 'border-gray-200 bg-gray-50/50' : 'border-gray-100'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">{score.reviewerName}</span>
                      {score.round && (
                        <span className="px-2 py-0.5 text-xs bg-violet-100 text-violet-600 rounded">
                          {score.round}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {score.status === 'locked' && (
                        <span className="text-xs text-gray-400 flex items-center gap-0.5">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          已锁定
                        </span>
                      )}
                      <span className="text-lg font-bold text-primary">{score.total}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                    <span>创新性：{score.innovation}</span>
                    <span>技术实现：{score.technical}</span>
                    <span>应用价值：{score.value}</span>
                  </div>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded p-2">{score.comment}</p>
                  <p className="text-xs text-gray-400 mt-2">{score.submittedAt}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>暂无评分记录</p>
            </div>
          )}

          {work.assignedReviewers && work.assignedReviewers.length > (work.scores?.length || 0) && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">待评分评委</h4>
              <div className="flex flex-wrap gap-2">
                {work.assignedReviewers
                  .filter(id => !work.scores?.some(s => s.reviewerId === id))
                  .map((id, index) => (
                    <span key={index} className="px-3 py-1 bg-amber-50 text-amber-600 text-xs rounded-full">
                      评委 {index + 1}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 flex justify-between">
          {hasLockableScores && !allScoresLocked && (
            <button
              onClick={handleLock}
              className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 hover:border-gray-400 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              锁定评分
            </button>
          )}
          <div className="flex-1"></div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};

// 详情抽屉组件
const DetailDrawer = ({ work, isOpen, onClose, onStatusChange }) => {
  const averageScore = useMemo(() => {
    if (!work?.scores || work.scores.length === 0) return null;
    const avg = work.scores.reduce((sum, s) => sum + (s.total || 0), 0) / work.scores.length;
    return avg.toFixed(1);
  }, [work?.scores]);

  if (!isOpen || !work) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40 transition-opacity" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl z-50 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">作品详情</h3>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              基本信息
            </h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">作品名称</span>
                <span className="text-sm font-medium text-gray-800">{work.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">团队/作者</span>
                <span className="text-sm text-gray-800">{work.team?.name || work.user?.name || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">所属赛事</span>
                <span className="text-sm text-gray-800">{work.competition?.name || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">赛道</span>
                <span className="text-sm text-gray-800">{work.track?.name || '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">当前状态</span>
                <StatusTag status={work.status} />
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">最近更新</span>
                <span className="text-sm text-gray-800">{work.updatedAt ? new Date(work.updatedAt).toLocaleString() : '-'}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              评分统计
            </h4>
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg p-4 border border-violet-100">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-500 mb-1">分配评委</p>
                  <p className="text-xl font-bold text-gray-800">{work.assignedReviewers?.length || 0}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">已评分</p>
                  <p className="text-xl font-bold text-primary">{work.scores?.length || 0}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">平均分</p>
                  <p className="text-xl font-bold text-primary">{averageScore || '-'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              作品说明
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 leading-relaxed">{work.description || '暂无说明'}</p>
            </div>
          </div>

          {work.versions && work.versions.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                版本记录
              </h4>
              <div className="space-y-3">
                {work.versions.map((version, index) => (
                  <div 
                    key={index} 
                    className={`rounded-lg p-4 border ${
                      version.isCurrent 
                        ? 'bg-primary/5 border-primary/20' 
                        : 'bg-gray-50 border-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-semibold ${
                          version.isCurrent ? 'text-primary' : 'text-gray-600'
                        }`}>
                          V{version.versionNumber}
                        </span>
                        {version.isCurrent && (
                          <span className="px-2 py-0.5 text-xs bg-primary text-white rounded">当前版本</span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">
                        {version.createdAt ? new Date(version.createdAt).toLocaleString() : '-'}
                      </span>
                    </div>
                    {version.changeLog && (
                      <p className="text-sm text-gray-600 mt-2">{version.changeLog}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => alert('分配评审功能暂未接入')}
              className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 hover:border-primary hover:text-primary rounded-lg transition-colors"
            >
              分配评审
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const AdminWorks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [competitionFilter, setCompetitionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [trackFilter, setTrackFilter] = useState('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  
  // 数据状态
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 20, total: 0 });
  const [apiStatus, setApiStatus] = useState({ status: 'loading', count: 0 });
  
  // 筛选选项
  const [competitions, setCompetitions] = useState([]);
  const [tracks, setTracks] = useState([]);

  // 获取作品列表
  const fetchWorks = async () => {
    setLoading(true);
    setError(null);
    setApiStatus(prev => ({ ...prev, status: 'loading' }));

    try {
      const params = new URLSearchParams();
      if (competitionFilter !== 'all') params.append('competitionId', competitionFilter);
      if (trackFilter !== 'all') params.append('trackId', trackFilter);
      if (statusFilter !== 'all') params.append('status', statusFilter);
      params.append('page', pagination.page);
      params.append('pageSize', pagination.pageSize);

      const result = await request(`/v1/admin/works?${params.toString()}`);
      
      setApiStatus({
        status: result.status,
        count: result.ok && result.data?.code === 0 ? (result.data.data?.list?.length || 0) : 0
      });

      if (result.ok && result.data?.code === 0) {
        const data = result.data.data;
        setWorks(data.list || []);
        setPagination(prev => ({
          ...prev,
          total: data.pagination?.total || 0
        }));
      } else {
        setError(result.data?.message || '获取作品列表失败');
        setWorks([]);
      }
    } catch (err) {
      console.error('Fetch works error:', err);
      setError('获取作品列表失败');
      setApiStatus({ status: 'error', count: 0 });
      setWorks([]);
    } finally {
      setLoading(false);
    }
  };

  // 获取赛事列表（用于筛选）
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

  // 获取作品详情
  const fetchWorkDetail = async (workId) => {
    try {
      const result = await request(`/v1/works/${workId}`);
      if (result.ok && result.data?.code === 0) {
        return result.data.data;
      }
      return null;
    } catch (err) {
      console.error('Fetch work detail error:', err);
      return null;
    }
  };

  // 初始加载
  useEffect(() => {
    fetchCompetitions();
    fetchWorks();
  }, []);

  // 筛选条件变化时重新加载
  useEffect(() => {
    fetchWorks();
  }, [competitionFilter, statusFilter, trackFilter, pagination.page]);

  // 前端搜索筛选
  const filteredWorks = useMemo(() => {
    if (!searchQuery) return works;
    const searchLower = searchQuery.toLowerCase();
    return works.filter(work => 
      work.title?.toLowerCase().includes(searchLower) ||
      work.team?.name?.toLowerCase().includes(searchLower) ||
      work.user?.name?.toLowerCase().includes(searchLower)
    );
  }, [works, searchQuery]);

  const handleViewDetail = async (work) => {
    // 获取完整详情
    const detail = await fetchWorkDetail(work.id);
    setSelectedWork(detail || work);
    setIsDrawerOpen(true);
  };

  const handleViewScores = (work) => {
    setSelectedWork(work);
    setIsScoreModalOpen(true);
  };

  const handleStatusChange = async (id, newStatus) => {
    // TODO: 接入状态更新接口
    alert(`状态更新功能暂未接入\n作品ID: ${id}\n新状态: ${newStatus}`);
  };

  const handleLockScores = (workId) => {
    alert(`锁定评分功能暂未接入\n作品ID: ${workId}`);
  };

  if (error) {
    return (
      <div className="space-y-6 p-6">
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={fetchWorks} 
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* API 联调区 */}
      <ApiDebugPanel 
        apiStatus={apiStatus} 
        filters={{
          competitionId: competitionFilter === 'all' ? '' : competitionFilter,
          trackId: trackFilter === 'all' ? '' : trackFilter,
          status: statusFilter === 'all' ? '' : statusFilter,
          page: pagination.page,
          pageSize: pagination.pageSize
        }}
      />

      {/* 页面标题区 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">作品管理</h2>
        <p className="text-sm text-gray-500 mt-2">管理参赛作品、查看提交内容与评分情况</p>
      </div>

      {/* 顶部筛选区 */}
      <div className="flex flex-col lg:flex-row lg:items-end gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          {/* 搜索框 */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">搜索作品/团队</label>
            <div className="relative">
              <input
                type="text"
                placeholder="请输入搜索内容..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-0 w-full sm:w-64 bg-white"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* 赛事筛选 */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">赛事筛选</label>
            <select
              value={competitionFilter}
              onChange={(e) => setCompetitionFilter(e.target.value)}
              className="px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-0 bg-white min-w-[180px]"
            >
              <option value="all">全部赛事</option>
              {competitions.map((comp) => (
                <option key={comp.id} value={comp.id}>{comp.name}</option>
              ))}
            </select>
          </div>

          {/* 状态筛选 */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">状态筛选</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-0 bg-white min-w-[120px]"
            >
              <option value="all">全部状态</option>
              <option value="draft">草稿</option>
              <option value="submitted">已提交</option>
              <option value="reviewing">评审中</option>
              <option value="scored">已评分</option>
              <option value="published">已公示</option>
            </select>
          </div>

          {/* 赛道筛选 */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">赛道筛选</label>
            <select
              value={trackFilter}
              onChange={(e) => setTrackFilter(e.target.value)}
              className="px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-0 bg-white min-w-[150px]"
            >
              <option value="all">全部赛道</option>
              {tracks.map((track) => (
                <option key={track.id} value={track.id}>{track.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 作品列表区 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">作品名称</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">团队/作者</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">所属赛事</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">赛道</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">更新时间</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">评分进度</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                // Loading 骨架屏
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div></td>
                  </tr>
                ))
              ) : (
                filteredWorks.map((work) => (
                  <tr key={work.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-gray-800">{work.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{work.team?.name || work.user?.name || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 line-clamp-1" title={work.competition?.name}>
                        {work.competition?.name || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{work.track?.name || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {work.updatedAt ? new Date(work.updatedAt).toLocaleString() : '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusTag status={work.status} />
                    </td>
                    <td className="px-6 py-4">
                      <ScoreProgress 
                        scores={work.scores} 
                        assignedReviewers={work.assignedReviewers} 
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetail(work)}
                          className="px-3 py-1.5 text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors"
                        >
                          查看详情
                        </button>
                        {work.scores && work.scores.length > 0 && (
                          <button
                            onClick={() => handleViewScores(work)}
                            className="px-3 py-1.5 text-sm font-medium text-violet-600 bg-violet-50 hover:bg-violet-100 rounded-lg transition-colors"
                          >
                            查看评分
                          </button>
                        )}
                        <StatusDropdown work={work} onStatusChange={handleStatusChange} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Empty 状态 */}
        {!loading && filteredWorks.length === 0 && (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500">暂无符合条件的作品</p>
          </div>
        )}

        {/* 分页 */}
        {!loading && pagination.total > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              共 {pagination.total} 条记录
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page <= 1}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一页
              </button>
              <span className="text-sm text-gray-600">
                第 {pagination.page} 页
              </span>
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page * pagination.pageSize >= pagination.total}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一页
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 详情抽屉 */}
      <DetailDrawer
        work={selectedWork}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onStatusChange={handleStatusChange}
      />

      {/* 评分详情弹窗 */}
      <ScoreDetailModal
        work={selectedWork}
        isOpen={isScoreModalOpen}
        onClose={() => setIsScoreModalOpen(false)}
        onLockScores={handleLockScores}
      />
    </div>
  );
};

export default AdminWorks;
