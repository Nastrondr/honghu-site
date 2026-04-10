import React, { useState, useMemo, useRef, useEffect } from 'react';
import { request } from '../../lib/api';

// 固定五大专项赛道
const FIXED_TRACKS = [
  { id: 'finance', name: '数字金融', slug: 'finance', description: '探索AI在金融风险控制、智能投顾、反欺诈等领域的创新应用' },
  { id: 'education', name: '数字教育', slug: 'education', description: '推动AI技术在教育场景中的应用，提升教学效率与学习体验' },
  { id: 'health', name: '数字健康', slug: 'health', description: '利用AI技术改善医疗服务质量，实现精准医疗与健康管理' },
  { id: 'tourism', name: '数字文旅', slug: 'tourism', description: '融合AI与文化旅游，打造智能化旅游体验与文化遗产保护' },
  { id: 'legal', name: '数字法务', slug: 'legal', description: '应用AI技术提升法律服务效率，实现智能合同审查与法律咨询' },
];

const ActionMenu = ({ competition, onView, onEdit, onToggleStatus, onDelete }) => {
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

  return (
    <div className="flex items-center gap-3" ref={menuRef}>
      <button
        onClick={() => onView(competition)}
        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        查看
      </button>
      <button
        onClick={() => onEdit(competition)}
        className="px-3 py-1.5 text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors"
      >
        编辑
      </button>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          更多
          <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
            {competition.status !== 'ended' && (
              <button
                onClick={() => { onToggleStatus(competition); setIsOpen(false); }}
                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors text-orange-600"
              >
                {competition.status === 'draft' ? '上线' : competition.status === 'active' ? '暂停' : competition.status === 'paused' ? '恢复' : '操作'}
              </button>
            )}
            <button
              onClick={() => { onDelete(competition); setIsOpen(false); }}
              className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 transition-colors"
            >
              删除
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const SystemStatusTag = ({ status }) => {
  const statusConfig = {
    'draft': { color: 'bg-gray-100 text-gray-600', label: '草稿' },
    'active': { color: 'bg-green-100 text-green-600', label: '进行中' },
    'paused': { color: 'bg-orange-100 text-orange-600', label: '已暂停' },
    'ended': { color: 'bg-gray-200 text-gray-500', label: '已结束' },
    '草稿': { color: 'bg-gray-100 text-gray-600', label: '草稿' },
    '进行中': { color: 'bg-green-100 text-green-600', label: '进行中' },
    '已暂停': { color: 'bg-orange-100 text-orange-600', label: '已暂停' },
    '已结束': { color: 'bg-gray-200 text-gray-500', label: '已结束' },
  };
  const config = statusConfig[status] || statusConfig['draft'];
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

// 赛事详情抽屉组件
const DetailDrawer = ({ competition, isOpen, onClose }) => {
  if (!isOpen || !competition) return null;

  const formatDate = (d) => {
    if (!d) return '-';
    try { return new Date(d).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }); }
    catch { return d; }
  };

  const statusConfig = {
    'draft': { label: '草稿', color: 'bg-gray-100 text-gray-600' },
    'active': { label: '进行中', color: 'bg-green-100 text-green-600' },
    'paused': { label: '已暂停', color: 'bg-orange-100 text-orange-600' },
    'ended': { label: '已结束', color: 'bg-gray-200 text-gray-500' },
  };
  const statusInfo = statusConfig[competition.status] || statusConfig['draft'];

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl z-50 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">赛事详情</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* 基本信息 */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              基本信息
            </h4>
            <div className="space-y-3 bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">赛事名称</span>
                <span className="text-sm font-medium text-gray-800">{competition.name || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">URL标识</span>
                <span className="text-sm text-gray-800 font-mono">{competition.slug || '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">当前状态</span>
                <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}>
                  {statusInfo.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">最大团队人数</span>
                <span className="text-sm text-gray-800">{competition.maxTeamSize || '-'} 人</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">公开状态</span>
                <span className="text-sm text-gray-800">{competition.isPublic !== false ? '公开' : '私有'}</span>
              </div>
            </div>
          </div>

          {/* 赛事简介 */}
          {competition.description && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                赛事简介
              </h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 leading-relaxed">{competition.description}</p>
              </div>
            </div>
          )}

          {/* 时间安排 */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              时间安排
            </h4>
            <div className="space-y-3 bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">报名开始</span>
                <span className="text-sm text-gray-800">{formatDate(competition.registrationStart)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">报名截止</span>
                <span className="text-sm text-gray-800">{formatDate(competition.registrationEnd)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">比赛开始</span>
                <span className="text-sm text-gray-800">{formatDate(competition.competitionStart)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">比赛截止</span>
                <span className="text-sm text-gray-800">{formatDate(competition.competitionEnd)}</span>
              </div>
            </div>
          </div>

          {/* 赛道信息 */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7" />
              </svg>
              赛道信息
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              {competition.tracks && competition.tracks.length > 0 ? (
                <div className="space-y-2">
                  {competition.tracks.map((track, index) => (
                    <div key={track.id || index} className="flex items-center gap-2">
                      <span className="w-6 h-6 flex items-center justify-center bg-primary/10 text-primary text-xs font-medium rounded">
                        {index + 1}
                      </span>
                      <span className="text-sm text-gray-700">{track.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">暂无赛道信息</p>
              )}
            </div>
          </div>

          {/* 创建信息 */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              创建信息
            </h4>
            <div className="space-y-3 bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">创建时间</span>
                <span className="text-sm text-gray-800">{formatDate(competition.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">更新时间</span>
                <span className="text-sm text-gray-800">{formatDate(competition.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-end">
            <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              关闭
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const ApiDebugPanel = ({ apiStatus, filters, competitions }) => {
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
          <p className="font-mono text-xs text-gray-800 truncate">GET /v1/competitions</p>
          <p className={`text-xs font-semibold mt-1 ${
            apiStatus.list === 200 ? 'text-green-600' :
            apiStatus.list === 'error' ? 'text-red-600' : 'text-gray-400'
          }`}>
            {apiStatus.list === 200 ? `✅ ${competitions.length} 条` :
             apiStatus.list === 'error' ? '❌ 请求失败' : '⏳ 等待中'}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">筛选条件</p>
          <p className="font-mono text-xs text-gray-800">
            {filters.status === 'all' ? '全部状态' : filters.status} | {filters.keyword || '无关键词'}
          </p>
        </div>
      </div>
    </div>
  );
};

const AdminCompetitions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [apiStatus, setApiStatus] = useState({ list: null });

  const fetchCompetitions = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('keyword', searchQuery);
      if (statusFilter !== 'all') params.append('status', statusFilter);

      const result = await request(`/v1/competitions${params.toString() ? '?' + params.toString() : ''}`);

      if (result.ok && result.data?.code === 0 && result.data.data) {
        const list = Array.isArray(result.data.data.list) ? result.data.data.list : [];
        setCompetitions(list);
        setApiStatus(prev => ({ ...prev, list: 200 }));
      } else {
        setCompetitions([]);
        setApiStatus(prev => ({ ...prev, list: 'error' }));
        setError('获取赛事列表失败');
      }
    } catch (err) {
      console.error('Fetch competitions error:', err);
      setCompetitions([]);
      setApiStatus(prev => ({ ...prev, list: 'error' }));
      setError('网络错误，无法获取赛事列表');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitions();
  }, [searchQuery, statusFilter]);

  const filteredCompetitions = useMemo(() => {
    return competitions.filter(comp => {
      const matchSearch = !searchQuery || (comp.name || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'all' || comp.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [competitions, searchQuery, statusFilter]);

  const isAllSelected = filteredCompetitions.length > 0 && selectedIds.length === filteredCompetitions.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < filteredCompetitions.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredCompetitions.map(c => c.id));
    }
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // 详情抽屉状态
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [viewingCompetition, setViewingCompetition] = useState(null);

  const handleViewDetail = (competition) => {
    setViewingCompetition(competition);
    setIsDetailDrawerOpen(true);
  };

  // 编辑赛事弹窗状态
  const [showEditModal, setShowEditModal] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editingCompetition, setEditingCompetition] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    slug: '',
    status: 'draft',
    maxTeamSize: 5,
    isPublic: true,
    registrationStart: '',
    registrationEnd: '',
    competitionStart: '',
    competitionEnd: '',
    trackIds: [], // 选中的赛道ID列表
  });

  const handleEdit = (competition) => {
    setEditingCompetition(competition);
    
    // 从赛事的tracks中提取已绑定的固定赛道ID
    const boundTrackIds = competition.tracks 
      ? competition.tracks.map(t => {
          // 尝试匹配固定赛道
          const fixedTrack = FIXED_TRACKS.find(ft => ft.name === t.name || ft.slug === t.slug);
          return fixedTrack ? fixedTrack.id : null;
        }).filter(Boolean)
      : [];
    
    setEditForm({
      name: competition.name || '',
      description: competition.description || '',
      slug: competition.slug || '',
      status: competition.status || 'draft',
      maxTeamSize: competition.maxTeamSize || 5,
      isPublic: competition.isPublic !== false,
      registrationStart: competition.registrationStart ? new Date(competition.registrationStart).toISOString().slice(0, 16) : '',
      registrationEnd: competition.registrationEnd ? new Date(competition.registrationEnd).toISOString().slice(0, 16) : '',
      competitionStart: competition.competitionStart ? new Date(competition.competitionStart).toISOString().slice(0, 16) : '',
      competitionEnd: competition.competitionEnd ? new Date(competition.competitionEnd).toISOString().slice(0, 16) : '',
      trackIds: boundTrackIds,
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingCompetition(null);
    setEditForm({
      name: '',
      description: '',
      slug: '',
      status: 'draft',
      maxTeamSize: 5,
      isPublic: true,
      registrationStart: '',
      registrationEnd: '',
      competitionStart: '',
      competitionEnd: '',
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editForm.name.trim()) {
      setToast({ message: '请输入赛事名称', type: 'error' });
      return;
    }

    setEditLoading(true);
    try {
      // 构建请求体，过滤空字符串
      const payload = {
        name: editForm.name.trim(),
        slug: editForm.slug.trim() || editForm.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, ''),
        maxTeamSize: parseInt(editForm.maxTeamSize) || 5,
        isPublic: editForm.isPublic,
      };

      // 只添加非空字段，并转换日期格式为ISO-8601
      if (editForm.description?.trim()) payload.description = editForm.description.trim();
      // 注意：不发送status字段，避免后端DTO验证错误
      if (editForm.posterUrl?.trim()) payload.posterUrl = editForm.posterUrl.trim();
      if (editForm.ruleUrl?.trim()) payload.ruleUrl = editForm.ruleUrl.trim();
      if (editForm.registrationStart) payload.registrationStart = new Date(editForm.registrationStart).toISOString();
      if (editForm.registrationEnd) payload.registrationEnd = new Date(editForm.registrationEnd).toISOString();
      if (editForm.competitionStart) payload.competitionStart = new Date(editForm.competitionStart).toISOString();
      if (editForm.competitionEnd) payload.competitionEnd = new Date(editForm.competitionEnd).toISOString();

      // 将选中的赛道ID转换为赛道名称数组
      const trackNames = editForm.trackIds
        .map(id => FIXED_TRACKS.find(t => t.id === id)?.name)
        .filter(Boolean);

      console.log('[DEBUG] Edit form trackIds:', editForm.trackIds);
      console.log('[DEBUG] Converted trackNames:', trackNames);

      // 添加trackNames到payload
      const payloadWithTracks = {
        ...payload,
        trackNames,
      };

      console.log('[DEBUG] Final payload:', payloadWithTracks);

      const result = await request(`/v1/admin/competitions/${editingCompetition.id}`, {
        method: 'PUT',
        body: JSON.stringify(payloadWithTracks),
      });

      console.log('[DEBUG] Update result:', result);

      if (result.ok && result.data.code === 0) {
        setToast({ message: `赛事 "${editForm.name}" 更新成功`, type: 'success' });
        handleCloseEditModal();
        fetchCompetitions(); // 刷新列表
      } else {
        setToast({ message: result.data.message || '更新失败', type: 'error' });
      }
    } catch (err) {
      console.error('Update competition error:', err);
      setToast({ message: '网络错误，更新失败', type: 'error' });
    } finally {
      setEditLoading(false);
    }
  };

  // 删除赛事状态
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deletingCompetition, setDeletingCompetition] = useState(null);

  const handleDelete = (competition) => {
    setDeletingCompetition(competition);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingCompetition(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingCompetition) return;

    setDeleteLoading(true);
    try {
      const result = await request(`/v1/admin/competitions/${deletingCompetition.id}`, {
        method: 'DELETE',
      });

      if (result.ok && result.data.code === 0) {
        setToast({ message: `赛事 "${deletingCompetition.name}" 已删除`, type: 'success' });
        handleCloseDeleteModal();
        fetchCompetitions(); // 刷新列表
      } else {
        setToast({ message: result.data.message || '删除失败', type: 'error' });
      }
    } catch (err) {
      console.error('Delete competition error:', err);
      setToast({ message: '网络错误，删除失败', type: 'error' });
    } finally {
      setDeleteLoading(false);
    }
  };

  // 创建赛事弹窗状态
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: '',
    description: '',
    slug: '',
    status: 'draft',
    maxTeamSize: 5,
    isPublic: true,
    registrationStart: '',
    registrationEnd: '',
    competitionStart: '',
    competitionEnd: '',
    trackIds: [], // 选中的赛道ID列表
  });

  const handleCreate = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setCreateForm({
      name: '',
      description: '',
      slug: '',
      status: 'draft',
      maxTeamSize: 5,
      isPublic: true,
      registrationStart: '',
      registrationEnd: '',
      competitionStart: '',
      competitionEnd: '',
    });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!createForm.name.trim()) {
      setToast({ message: '请输入赛事名称', type: 'error' });
      return;
    }

    setCreateLoading(true);
    try {
      // 自动生成slug
      const slug = createForm.slug || createForm.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');

      // 构建请求体 - 只包含DTO定义的字段
      const payload = {
        name: createForm.name.trim(),
        slug,
        maxTeamSize: parseInt(createForm.maxTeamSize) || 5,
        isPublic: createForm.isPublic,
      };

      // 可选字段 - 只添加有值的，并转换日期格式为ISO-8601
      if (createForm.description?.trim()) payload.description = createForm.description.trim();
      if (createForm.posterUrl?.trim()) payload.posterUrl = createForm.posterUrl.trim();
      if (createForm.ruleUrl?.trim()) payload.ruleUrl = createForm.ruleUrl.trim();
      if (createForm.registrationStart) payload.registrationStart = new Date(createForm.registrationStart).toISOString();
      if (createForm.registrationEnd) payload.registrationEnd = new Date(createForm.registrationEnd).toISOString();
      if (createForm.competitionStart) payload.competitionStart = new Date(createForm.competitionStart).toISOString();
      if (createForm.competitionEnd) payload.competitionEnd = new Date(createForm.competitionEnd).toISOString();

      // 注意：不发送status字段，让后端使用默认值"draft"

      console.log('[DEBUG] Create competition payload:', payload);

      const result = await request('/v1/admin/competitions', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      console.log('[DEBUG] Create competition result:', result);

      if (result.ok && result.data.code === 0) {
        const newCompetition = result.data.data;
        
        // 为选中的固定赛道创建track
        if (createForm.trackIds.length > 0) {
          try {
            for (const trackId of createForm.trackIds) {
              const fixedTrack = FIXED_TRACKS.find(t => t.id === trackId);
              if (fixedTrack) {
                await request(`/v1/admin/competitions/${newCompetition.id}/tracks`, {
                  method: 'POST',
                  body: JSON.stringify({
                    name: fixedTrack.name,
                    slug: fixedTrack.slug,
                    description: fixedTrack.description,
                    competitionId: newCompetition.id,
                  }),
                });
              }
            }
          } catch (trackErr) {
            console.error('Create tracks error:', trackErr);
            // 赛道创建失败不影响赛事创建成功提示
          }
        }
        
        setToast({ message: `赛事 "${createForm.name}" 创建成功`, type: 'success' });
        handleCloseCreateModal();
        fetchCompetitions(); // 刷新列表
      } else {
        setToast({ message: result.data.message || '创建失败', type: 'error' });
      }
    } catch (err) {
      console.error('Create competition error:', err);
      setToast({ message: '网络错误，创建失败', type: 'error' });
    } finally {
      setCreateLoading(false);
    }
  };

  // 状态切换确认弹窗
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusCompetition, setStatusCompetition] = useState(null);
  const [targetStatus, setTargetStatus] = useState('');

  const handleToggleStatus = (competition) => {
    let nextStatus = '';
    let actionText = '';

    if (competition.status === 'draft') {
      nextStatus = 'active';
      actionText = '上线';
    } else if (competition.status === 'active') {
      nextStatus = 'paused';
      actionText = '暂停';
    } else if (competition.status === 'paused') {
      nextStatus = 'active';
      actionText = '恢复';
    } else {
      setToast({ message: '该状态不支持此操作', type: 'error' });
      return;
    }

    setStatusCompetition(competition);
    setTargetStatus(nextStatus);
    setShowStatusModal(true);
  };

  const handleCloseStatusModal = () => {
    setShowStatusModal(false);
    setStatusCompetition(null);
    setTargetStatus('');
  };

  const handleConfirmStatusChange = async () => {
    if (!statusCompetition || !targetStatus) return;

    setStatusLoading(true);
    try {
      const result = await request(`/v1/admin/competitions/${statusCompetition.id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: targetStatus }),
      });

      if (result.ok && result.data.code === 0) {
        const actionText = targetStatus === 'active' ? '上线' : targetStatus === 'paused' ? '暂停' : '恢复';
        setToast({ message: `赛事 "${statusCompetition.name}" ${actionText}成功`, type: 'success' });
        handleCloseStatusModal();
        fetchCompetitions(); // 刷新列表
      } else {
        const errorMsg = result.data?.message || result.data?.error || '状态更新失败';
        if (result.status === 401) {
          setToast({ message: '登录已过期，请重新登录', type: 'error' });
        } else if (result.status === 403) {
          setToast({ message: '没有权限执行此操作', type: 'error' });
        } else {
          setToast({ message: errorMsg, type: 'error' });
        }
      }
    } catch (err) {
      console.error('Update status error:', err);
      setToast({ message: '网络错误，状态更新失败', type: 'error' });
    } finally {
      setStatusLoading(false);
    }
  };

  const handleBatchOnline = () => {
    setToast({ message: '批量上线功能暂未接入', type: 'info' });
  };

  const handleBatchOffline = () => {
    setToast({ message: '批量下线功能暂未接入', type: 'info' });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    try {
      const d = new Date(dateStr);
      return d.toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <ApiDebugPanel
        apiStatus={apiStatus}
        filters={{ status: statusFilter, keyword: searchQuery }}
        competitions={competitions}
      />

      <div>
        <h2 className="text-2xl font-bold text-gray-800">赛事管理</h2>
        <p className="text-sm text-gray-500 mt-2">创建、编辑和管理赛事信息与阶段</p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">搜索赛事名称</label>
            <div className="relative">
              <input
                type="text"
                placeholder="请输入赛事名称..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-0 w-full sm:w-64 bg-white"
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
              className="px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-0 bg-white min-w-[120px]"
            >
              <option value="all">全部状态</option>
              <option value="draft">草稿</option>
              <option value="active">进行中</option>
              <option value="ended">已结束</option>
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
          新建赛事
        </button>
      </div>

      {selectedIds.length > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 border border-blue-100 rounded-lg">
          <span className="text-sm text-blue-700">已选择 {selectedIds.length} 项</span>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleBatchOnline}
              className="px-3 py-1.5 text-sm text-green-700 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
            >
              批量上线
            </button>
            <button
              onClick={handleBatchOffline}
              className="px-3 py-1.5 text-sm text-orange-700 bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors"
            >
              批量下线
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={el => el && (el.indeterminate = isIndeterminate)}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">赛事名称</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">报名开始</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">报名截止</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">赛事截止</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">赛道数</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <tr key={index}>
                    <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-8 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div></td>
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                      onClick={fetchCompetitions}
                      className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90"
                    >
                      重试
                    </button>
                  </td>
                </tr>
              ) : filteredCompetitions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-500">暂无符合条件的赛事</p>
                  </td>
                </tr>
              ) : (
                filteredCompetitions.map((competition) => (
                  <tr key={competition.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(competition.id)}
                        onChange={() => handleSelectOne(competition.id)}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-sm font-semibold text-gray-800">{competition.name || '-'}</span>
                        {competition.description && (
                          <span className="text-xs text-gray-400 truncate max-w-xs">{competition.description}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{formatDate(competition.registrationStart)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{formatDate(competition.registrationEnd)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{formatDate(competition.competitionEnd)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <SystemStatusTag status={competition.status} />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{(competition.tracks && competition.tracks.length) || 0}</span>
                    </td>
                    <td className="px-6 py-4">
                      <ActionMenu
                        competition={competition}
                        onView={handleViewDetail}
                        onEdit={handleEdit}
                        onToggleStatus={handleToggleStatus}
                        onDelete={handleDelete}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 创建赛事抽屉 */}
      {showCreateModal && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={handleCloseCreateModal} />
          <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl z-50 flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">新建赛事</h3>
              <button
                onClick={handleCloseCreateModal}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {/* 基本信息 */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">基本信息</h4>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">赛事名称 *</label>
                  <input
                    type="text"
                    value={createForm.name}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="请输入赛事名称"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">赛事简介</label>
                  <textarea
                    value={createForm.description}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder="请输入赛事简介"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">最大团队人数</label>
                  <input
                    type="number"
                    value={createForm.maxTeamSize}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, maxTeamSize: e.target.value }))}
                    min={1}
                    max={20}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">URL标识 (slug)</label>
                  <input
                    type="text"
                    value={createForm.slug}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="留空将自动生成"
                  />
                  <p className="text-xs text-gray-400 mt-1">用于URL路径，如：my-competition-2024</p>
                </div>
              </div>

              {/* 赛道选择 */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">赛道选择</h4>
                <p className="text-xs text-gray-500">请选择该赛事包含的专项赛道（可多选）</p>
                
                <div className="grid grid-cols-1 gap-3">
                  {FIXED_TRACKS.map(track => (
                    <label 
                      key={track.id} 
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        createForm.trackIds.includes(track.id) 
                          ? 'border-primary bg-primary/5' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={createForm.trackIds.includes(track.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCreateForm(prev => ({
                              ...prev,
                              trackIds: [...prev.trackIds, track.id]
                            }));
                          } else {
                            setCreateForm(prev => ({
                              ...prev,
                              trackIds: prev.trackIds.filter(id => id !== track.id)
                            }));
                          }
                        }}
                        className="mt-0.5 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{track.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{track.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* 时间安排 */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">时间安排</h4>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">报名开始</label>
                    <input
                      type="datetime-local"
                      value={createForm.registrationStart}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, registrationStart: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">报名截止</label>
                    <input
                      type="datetime-local"
                      value={createForm.registrationEnd}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, registrationEnd: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">比赛开始</label>
                    <input
                      type="datetime-local"
                      value={createForm.competitionStart}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, competitionStart: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">比赛截止</label>
                    <input
                      type="datetime-local"
                      value={createForm.competitionEnd}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, competitionEnd: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>

              {/* 开发调试信息 */}
              {process.env.NODE_ENV === 'development' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-xs font-semibold text-blue-700 mb-2">开发调试</h4>
                  <p className="text-xs text-blue-600 font-mono">POST /v1/admin/competitions</p>
                  <p className="text-xs text-blue-500 mt-1">创建接口已就绪</p>
                </div>
              )}

              {/* 按钮 */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCloseCreateModal}
                  className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={createLoading || !createForm.name.trim()}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {createLoading ? '创建中...' : '创建赛事'}
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* 编辑赛事抽屉 */}
      {showEditModal && editingCompetition && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={handleCloseEditModal} />
          <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl z-50 flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">编辑赛事</h3>
              <button
                onClick={handleCloseEditModal}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {/* 基本信息 */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">基本信息</h4>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">赛事名称 *</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="请输入赛事名称"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">赛事简介</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder="请输入赛事简介"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">最大团队人数</label>
                  <input
                    type="number"
                    value={editForm.maxTeamSize}
                    onChange={(e) => setEditForm(prev => ({ ...prev, maxTeamSize: e.target.value }))}
                    min={1}
                    max={20}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">URL标识 (slug)</label>
                  <input
                    type="text"
                    value={editForm.slug}
                    onChange={(e) => setEditForm(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="用于URL路径"
                  />
                  <p className="text-xs text-gray-400 mt-1">用于URL路径，如：my-competition-2024</p>
                </div>
              </div>

              {/* 赛道选择 */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">赛道选择</h4>
                <p className="text-xs text-gray-500">请选择该赛事包含的专项赛道（可多选）</p>
                
                <div className="grid grid-cols-1 gap-3">
                  {FIXED_TRACKS.map(track => (
                    <label 
                      key={track.id} 
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        editForm.trackIds.includes(track.id) 
                          ? 'border-primary bg-primary/5' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={editForm.trackIds.includes(track.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setEditForm(prev => ({
                              ...prev,
                              trackIds: [...prev.trackIds, track.id]
                            }));
                          } else {
                            setEditForm(prev => ({
                              ...prev,
                              trackIds: prev.trackIds.filter(id => id !== track.id)
                            }));
                          }
                        }}
                        className="mt-0.5 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{track.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{track.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* 时间安排 */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">时间安排</h4>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">报名开始</label>
                    <input
                      type="datetime-local"
                      value={editForm.registrationStart}
                      onChange={(e) => setEditForm(prev => ({ ...prev, registrationStart: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">报名截止</label>
                    <input
                      type="datetime-local"
                      value={editForm.registrationEnd}
                      onChange={(e) => setEditForm(prev => ({ ...prev, registrationEnd: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">比赛开始</label>
                    <input
                      type="datetime-local"
                      value={editForm.competitionStart}
                      onChange={(e) => setEditForm(prev => ({ ...prev, competitionStart: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">比赛截止</label>
                    <input
                      type="datetime-local"
                      value={editForm.competitionEnd}
                      onChange={(e) => setEditForm(prev => ({ ...prev, competitionEnd: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>

              {/* 开发调试信息 */}
              {process.env.NODE_ENV === 'development' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-xs font-semibold text-blue-700 mb-2">开发调试</h4>
                  <p className="text-xs text-blue-600 font-mono">PUT /v1/admin/competitions/{editingCompetition.id}</p>
                  <p className="text-xs text-blue-500 mt-1">选中赛道: {editForm.trackIds.join(', ') || '无'}</p>
                  <p className="text-xs text-blue-500 mt-1">编辑接口已就绪</p>
                </div>
              )}

              {/* 按钮 */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={editLoading || !editForm.name.trim()}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editLoading ? '保存中...' : '保存修改'}
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* 删除确认弹窗 */}
      {showDeleteModal && deletingCompetition && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">确认删除</h3>
              </div>

              <p className="text-gray-600 mb-2">
                您确定要删除赛事 <span className="font-semibold text-gray-800">"{deletingCompetition.name}"</span> 吗？
              </p>
              <p className="text-sm text-red-600 mb-6">
                此操作不可恢复。如果该赛事下存在赛道、报名记录或作品，将无法删除。
              </p>

              {/* 开发调试信息 */}
              {process.env.NODE_ENV === 'development' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                  <p className="text-xs text-blue-600 font-mono">DELETE /v1/admin/competitions/{deletingCompetition.id}</p>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCloseDeleteModal}
                  disabled={deleteLoading}
                  className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={deleteLoading}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
                >
                  {deleteLoading ? '删除中...' : '确认删除'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 状态切换确认弹窗 */}
      {showStatusModal && statusCompetition && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  targetStatus === 'active' ? 'bg-green-100' : 'bg-orange-100'
                }`}>
                  <svg className={`w-6 h-6 ${
                    targetStatus === 'active' ? 'text-green-600' : 'text-orange-600'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {targetStatus === 'active' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    )}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {targetStatus === 'active' ? '上线' : targetStatus === 'paused' ? '暂停' : '恢复'}赛事
                </h3>
              </div>

              <p className="text-gray-600 mb-2">
                您确定要将赛事 <span className="font-semibold text-gray-800">"{statusCompetition.name}"</span> {targetStatus === 'active' ? '上线' : targetStatus === 'paused' ? '暂停' : '恢复'}吗？
              </p>
              <p className="text-sm text-gray-500 mb-6">
                {targetStatus === 'active'
                  ? '上线后赛事将对用户可见，可以进行报名等操作。'
                  : targetStatus === 'paused'
                  ? '暂停后赛事将暂时停止报名，但用户仍可查看赛事信息。'
                  : '恢复后将重新开放报名功能。'}
              </p>

              {/* 开发调试信息 */}
              {process.env.NODE_ENV === 'development' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                  <p className="text-xs text-blue-600 font-mono">PUT /v1/admin/competitions/{statusCompetition.id}/status</p>
                  <p className="text-xs text-blue-500 mt-1">目标状态: {targetStatus}</p>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCloseStatusModal}
                  disabled={statusLoading}
                  className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleConfirmStatusChange}
                  disabled={statusLoading}
                  className={`px-6 py-2.5 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50 ${
                    targetStatus === 'active'
                      ? 'bg-green-600 hover:bg-green-700'
                      : targetStatus === 'paused'
                      ? 'bg-orange-600 hover:bg-orange-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {statusLoading ? '处理中...' : (targetStatus === 'active' ? '确认上线' : targetStatus === 'paused' ? '确认暂停' : '确认恢复')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 赛事详情抽屉 */}
      <DetailDrawer
        competition={viewingCompetition}
        isOpen={isDetailDrawerOpen}
        onClose={() => setIsDetailDrawerOpen(false)}
      />
    </div>
  );
};

export default AdminCompetitions;
