import React, { useState, useMemo, useRef, useEffect } from 'react';

// TODO: 接入赛事列表接口
// TODO: 接入创建赛事接口
// TODO: 接入编辑赛事接口
// TODO: 接入状态切换接口

// 操作菜单组件
const ActionMenu = ({ competition, onView, onEdit, onToggleStatus }) => {
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
      {/* 查看 - 文字按钮 */}
      <button
        onClick={() => onView(competition)}
        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        查看
      </button>

      {/* 编辑 - 主操作（稍微突出） */}
      <button
        onClick={() => onEdit(competition)}
        className="px-3 py-1.5 text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors"
      >
        编辑
      </button>

      {/* 更多下拉菜单 */}
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
            {/* 上线/下线 */}
            <button
              onClick={() => {
                onToggleStatus(competition);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${
                competition.systemStatus === '已结束' ? 'text-green-600' : 'text-orange-600'
              }`}
            >
              {competition.systemStatus === '已结束' ? '上线' : '下线'}
            </button>
            {/* 删除（未来） */}
            <button
              onClick={() => {
                alert('删除功能开发中...');
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-sm text-left text-gray-400 hover:bg-gray-50 transition-colors cursor-not-allowed"
            >
              删除
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 类型标签组件
const TypeTag = ({ type }) => {
  const typeColors = {
    '总赛': 'bg-indigo-100 text-indigo-700',
    '校园赛': 'bg-emerald-100 text-emerald-700',
    '区县赛': 'bg-amber-100 text-amber-700'
  };
  return (
    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded ${typeColors[type] || 'bg-gray-100 text-gray-600'}`}>
      {type}
    </span>
  );
};

// 系统状态标签组件
const SystemStatusTag = ({ status }) => {
  const statusConfig = {
    '草稿': { color: 'bg-gray-100 text-gray-600', label: '草稿' },
    '进行中': { color: 'bg-green-100 text-green-600', label: '进行中' },
    '已结束': { color: 'bg-gray-200 text-gray-500', label: '已结束' }
  };
  const config = statusConfig[status] || statusConfig['进行中'];
  return (
    <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${config.color}`}>
      {config.label}
    </span>
  );
};

const AdminCompetitions = () => {
  // 搜索和筛选状态
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState([]);
  
  // 弹窗状态
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompetition, setEditingCompetition] = useState(null);
  
  // 表单数据
  const [formData, setFormData] = useState({
    name: '',
    type: '总赛',
    parentCompetition: '',
    description: '',
    enrollmentStart: '',
    enrollmentEnd: '',
    submissionEnd: '',
    currentPhase: '报名阶段',
    systemStatus: '草稿',
    trackCount: 1,
    isPublished: false
  });

  // Mock 数据 - 赛事列表
  const [competitions, setCompetitions] = useState([
    {
      id: 1,
      name: '2024年梧桐·鸿鹄人工智能应用创新大赛',
      type: '总赛',
      currentPhase: '报名审核阶段',
      enrollmentStart: '2024-10-01 00:00',
      enrollmentEnd: '2024-12-31 23:59',
      submissionEnd: '2025-01-15 23:59',
      systemStatus: '进行中',
      trackCount: 4,
      enrollmentCount: 156
    },
    {
      id: 2,
      name: '2024年清华大学校园赛',
      type: '校园赛',
      parentCompetition: '2024年梧桐·鸿鹄人工智能应用创新大赛',
      currentPhase: '报名阶段',
      enrollmentStart: '2024-10-15 00:00',
      enrollmentEnd: '2024-11-30 23:59',
      submissionEnd: '2024-12-15 23:59',
      systemStatus: '进行中',
      trackCount: 2,
      enrollmentCount: 45
    },
    {
      id: 3,
      name: '2024年海淀区区县赛',
      type: '区县赛',
      parentCompetition: '2024年梧桐·鸿鹄人工智能应用创新大赛',
      currentPhase: '提交阶段',
      enrollmentStart: '2024-09-01 00:00',
      enrollmentEnd: '2024-10-31 23:59',
      submissionEnd: '2024-11-30 23:59',
      systemStatus: '进行中',
      trackCount: 3,
      enrollmentCount: 89
    },
    {
      id: 4,
      name: '2024年北京大学校园赛',
      type: '校园赛',
      parentCompetition: '2024年梧桐·鸿鹄人工智能应用创新大赛',
      currentPhase: '评审阶段',
      enrollmentStart: '2024-09-01 00:00',
      enrollmentEnd: '2024-10-15 23:59',
      submissionEnd: '2024-11-01 23:59',
      systemStatus: '进行中',
      trackCount: 2,
      enrollmentCount: 67
    },
    {
      id: 5,
      name: '2023年梧桐·鸿鹄人工智能应用创新大赛',
      type: '总赛',
      currentPhase: '已结束',
      enrollmentStart: '2023-10-01 00:00',
      enrollmentEnd: '2023-12-31 23:59',
      submissionEnd: '2024-01-15 23:59',
      systemStatus: '已结束',
      trackCount: 4,
      enrollmentCount: 234
    },
    {
      id: 6,
      name: '2025年春季赛（草稿）',
      type: '总赛',
      currentPhase: '报名阶段',
      enrollmentStart: '',
      enrollmentEnd: '',
      submissionEnd: '',
      systemStatus: '草稿',
      trackCount: 4,
      enrollmentCount: 0
    }
  ]);

  // 筛选后的赛事列表
  const filteredCompetitions = useMemo(() => {
    return competitions.filter(comp => {
      const matchSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = typeFilter === 'all' || comp.type === typeFilter;
      const matchStatus = statusFilter === 'all' || comp.systemStatus === statusFilter;
      return matchSearch && matchType && matchStatus;
    });
  }, [competitions, searchQuery, typeFilter, statusFilter]);

  // 全选状态
  const isAllSelected = filteredCompetitions.length > 0 && selectedIds.length === filteredCompetitions.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < filteredCompetitions.length;

  // 处理全选
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredCompetitions.map(c => c.id));
    }
  };

  // 处理单选
  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // 打开新建弹窗
  const handleCreate = () => {
    setEditingCompetition(null);
    setFormData({
      name: '',
      type: '总赛',
      parentCompetition: '',
      description: '',
      enrollmentStart: '',
      enrollmentEnd: '',
      submissionEnd: '',
      currentPhase: '报名阶段',
      systemStatus: '草稿',
      trackCount: 1,
      isPublished: false
    });
    setIsModalOpen(true);
  };

  // 打开编辑弹窗
  const handleEdit = (competition) => {
    setEditingCompetition(competition);
    setFormData({
      name: competition.name,
      type: competition.type,
      parentCompetition: competition.parentCompetition || '',
      description: competition.description || '',
      enrollmentStart: competition.enrollmentStart,
      enrollmentEnd: competition.enrollmentEnd,
      submissionEnd: competition.submissionEnd,
      currentPhase: competition.currentPhase,
      systemStatus: competition.systemStatus,
      trackCount: competition.trackCount,
      isPublished: competition.systemStatus !== '草稿'
    });
    setIsModalOpen(true);
  };

  // 保存赛事
  const handleSave = (isDraft = false) => {
    const newCompetition = {
      id: editingCompetition ? editingCompetition.id : Date.now(),
      name: formData.name,
      type: formData.type,
      parentCompetition: formData.parentCompetition || undefined,
      description: formData.description,
      enrollmentStart: formData.enrollmentStart,
      enrollmentEnd: formData.enrollmentEnd,
      submissionEnd: formData.submissionEnd,
      currentPhase: formData.currentPhase,
      systemStatus: isDraft ? '草稿' : formData.systemStatus,
      trackCount: parseInt(formData.trackCount) || 1,
      enrollmentCount: editingCompetition ? editingCompetition.enrollmentCount : 0
    };

    if (editingCompetition) {
      setCompetitions(prev => prev.map(c => c.id === editingCompetition.id ? newCompetition : c));
    } else {
      setCompetitions(prev => [newCompetition, ...prev]);
    }
    setIsModalOpen(false);
  };

  // 切换赛事上下线状态
  const handleToggleStatus = (competition) => {
    const newStatus = competition.systemStatus === '已结束' ? '进行中' : '已结束';
    setCompetitions(prev => prev.map(c => 
      c.id === competition.id ? { ...c, systemStatus: newStatus } : c
    ));
  };

  // 批量操作
  const handleBatchOnline = () => {
    alert(`批量上线：${selectedIds.length} 个赛事`);
  };

  const handleBatchOffline = () => {
    alert(`批量下线：${selectedIds.length} 个赛事`);
  };

  // 查看详情
  const handleViewDetail = (competition) => {
    alert(`查看赛事详情：${competition.name}\n\n这里可以打开详情抽屉或跳转到详情页`);
  };

  return (
    <div className="space-y-6">
      {/* 1. 页面标题区 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">赛事管理</h2>
        <p className="text-sm text-gray-500 mt-2">创建、编辑和管理赛事信息与阶段</p>
      </div>

      {/* 2. 顶部操作区 */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          {/* 搜索框 */}
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

          {/* 赛事类型筛选 */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">类型筛选</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-0 bg-white min-w-[120px]"
            >
              <option value="all">全部类型</option>
              <option value="总赛">总赛</option>
              <option value="校园赛">校园赛</option>
              <option value="区县赛">区县赛</option>
            </select>
          </div>

          {/* 赛事状态筛选 */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">状态筛选</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-0 bg-white min-w-[120px]"
            >
              <option value="all">全部状态</option>
              <option value="草稿">草稿</option>
              <option value="进行中">进行中</option>
              <option value="已结束">已结束</option>
            </select>
          </div>
        </div>

        {/* 新建赛事按钮 */}
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

      {/* 批量操作栏 */}
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

      {/* 3. 赛事列表区 */}
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">当前阶段</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">报名截止</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">作品截止</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">报名</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCompetitions.map((competition) => (
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
                      <span className="text-sm font-semibold text-gray-800">{competition.name}</span>
                      <div className="flex items-center gap-2">
                        {competition.parentCompetition && (
                          <span className="text-xs text-gray-400">所属：{competition.parentCompetition}</span>
                        )}
                        <TypeTag type={competition.type} />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{competition.currentPhase}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{competition.enrollmentEnd || '-'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{competition.submissionEnd || '-'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <SystemStatusTag status={competition.systemStatus} />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{competition.enrollmentCount} 人</span>
                  </td>
                  <td className="px-6 py-4">
                    <ActionMenu
                      competition={competition}
                      onView={handleViewDetail}
                      onEdit={handleEdit}
                      onToggleStatus={handleToggleStatus}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredCompetitions.length === 0 && (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500">暂无符合条件的赛事</p>
          </div>
        )}
      </div>

      {/* 新建/编辑赛事弹窗 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* 弹窗头部 */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">
                {editingCompetition ? '编辑赛事' : '新建赛事'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 弹窗内容 */}
            <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 赛事名称 */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">赛事名称 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="请输入赛事名称"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* 赛事类型 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">赛事类型 <span className="text-red-500">*</span></label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                  >
                    <option value="总赛">总赛</option>
                    <option value="校园赛">校园赛</option>
                    <option value="区县赛">区县赛</option>
                  </select>
                </div>

                {/* 所属上级赛事 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">所属上级赛事</label>
                  <select
                    value={formData.parentCompetition}
                    onChange={(e) => setFormData({ ...formData, parentCompetition: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                  >
                    <option value="">无</option>
                    {competitions.filter(c => c.type === '总赛').map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* 赛事简介 */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">赛事简介</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="请输入赛事简介"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>

                {/* 报名开始时间 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">报名开始时间</label>
                  <input
                    type="datetime-local"
                    value={formData.enrollmentStart}
                    onChange={(e) => setFormData({ ...formData, enrollmentStart: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* 报名截止时间 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">报名截止时间</label>
                  <input
                    type="datetime-local"
                    value={formData.enrollmentEnd}
                    onChange={(e) => setFormData({ ...formData, enrollmentEnd: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* 作品提交截止时间 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">作品提交截止时间</label>
                  <input
                    type="datetime-local"
                    value={formData.submissionEnd}
                    onChange={(e) => setFormData({ ...formData, submissionEnd: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* 当前阶段 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">当前阶段</label>
                  <select
                    value={formData.currentPhase}
                    onChange={(e) => setFormData({ ...formData, currentPhase: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                  >
                    <option value="报名阶段">报名阶段</option>
                    <option value="报名审核阶段">报名审核阶段</option>
                    <option value="提交阶段">提交阶段</option>
                    <option value="评审阶段">评审阶段</option>
                    <option value="已结束">已结束</option>
                  </select>
                </div>

                {/* 系统状态 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">系统状态</label>
                  <select
                    value={formData.systemStatus}
                    onChange={(e) => setFormData({ ...formData, systemStatus: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                  >
                    <option value="草稿">草稿</option>
                    <option value="进行中">进行中</option>
                    <option value="已结束">已结束</option>
                  </select>
                </div>

                {/* 赛道数量 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">赛道数量</label>
                  <input
                    type="number"
                    min={1}
                    value={formData.trackCount}
                    onChange={(e) => setFormData({ ...formData, trackCount: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* 是否发布 */}
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-700">是否发布</label>
                  <button
                    onClick={() => setFormData({ ...formData, isPublished: !formData.isPublished })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.isPublished ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.isPublished ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* 弹窗底部 */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => handleSave(true)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                保存草稿
              </button>
              <button
                onClick={() => handleSave(false)}
                className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                {editingCompetition ? '保存修改' : '创建赛事'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCompetitions;
