import React, { useState, useMemo, useRef, useEffect } from 'react';

// TODO: 接入报名列表接口 GET /api/admin/enrollments
// TODO: 接入报名审核接口 PUT /api/admin/enrollments/:id/review
// TODO: 接入名单导出接口

// 审核状态标签组件 - 优化视觉权重
const StatusTag = ({ status }) => {
  const statusConfig = {
    '待审核': { 
      bg: 'bg-orange-100', 
      text: 'text-orange-700',
      border: 'border-orange-200',
      dot: 'bg-orange-500',
      label: '待审核',
      emphasis: true
    },
    '已通过': { 
      bg: 'bg-green-50', 
      text: 'text-green-600',
      border: 'border-green-100',
      dot: 'bg-green-400',
      label: '已通过',
      emphasis: false
    },
    '已驳回': { 
      bg: 'bg-red-50', 
      text: 'text-red-400',
      border: 'border-red-100',
      dot: 'bg-red-300',
      label: '已驳回',
      emphasis: false
    },
    '待补件': { 
      bg: 'bg-blue-50', 
      text: 'text-blue-600',
      border: 'border-blue-100',
      dot: 'bg-blue-400',
      label: '待补件',
      emphasis: false
    },
    '草稿': { 
      bg: 'bg-gray-100', 
      text: 'text-gray-500',
      border: 'border-gray-200',
      dot: 'bg-gray-400',
      label: '草稿',
      emphasis: false
    }
  };
  const config = statusConfig[status] || statusConfig['待审核'];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${config.bg} ${config.text} ${config.border} ${config.emphasis ? 'shadow-sm' : ''}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} ${config.emphasis ? 'animate-pulse' : ''}`}></span>
      {config.label}
    </span>
  );
};

// 审核操作下拉菜单组件
const ReviewDropdown = ({ enrollment, onApprove, onReject, onRequestSupplement, onViewDetail }) => {
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

  // 根据状态决定显示哪些操作
  const getMenuItems = () => {
    const items = [];
    
    if (enrollment.status === '待审核') {
      items.push(
        { type: 'approve', label: '通过', color: 'text-primary', bg: 'hover:bg-primary/5' },
        { type: 'reject', label: '驳回', color: 'text-red-500', bg: 'hover:bg-red-50' },
        { type: 'supplement', label: '补件', color: 'text-blue-600', bg: 'hover:bg-blue-50' }
      );
    } else if (enrollment.status === '待补件') {
      items.push(
        { type: 'approve', label: '通过', color: 'text-primary', bg: 'hover:bg-primary/5' },
        { type: 'reject', label: '驳回', color: 'text-red-500', bg: 'hover:bg-red-50' }
      );
    } else if (enrollment.status === '已驳回') {
      items.push(
        { type: 'approve', label: '重新通过', color: 'text-primary', bg: 'hover:bg-primary/5' }
      );
    } else if (enrollment.status === '已通过') {
      items.push(
        { type: 'reject', label: '撤回并驳回', color: 'text-red-500', bg: 'hover:bg-red-50' }
      );
    }
    
    return items;
  };

  const menuItems = getMenuItems();

  const handleItemClick = (type) => {
    setIsOpen(false);
    if (type === 'approve') {
      onApprove(enrollment.id);
    } else if (type === 'reject') {
      onViewDetail(enrollment); // 打开详情进行驳回
    } else if (type === 'supplement') {
      onViewDetail(enrollment); // 打开详情进行补件
    }
  };

  // 如果没有任何操作，不显示下拉菜单
  if (menuItems.length === 0) {
    return null;
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors"
      >
        审核
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-28 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(item.type)}
              className={`w-full px-4 py-2 text-sm text-left ${item.color} ${item.bg} transition-colors`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// 详情抽屉组件
const DetailDrawer = ({ enrollment, isOpen, onClose, onApprove, onReject, onRequestSupplement }) => {
  const [actionType, setActionType] = useState(null);
  const [remark, setRemark] = useState('');

  if (!isOpen || !enrollment) return null;

  const handleAction = () => {
    if (actionType === 'reject') {
      onReject(enrollment.id, remark);
    } else if (actionType === 'supplement') {
      onRequestSupplement(enrollment.id, remark);
    }
    setActionType(null);
    setRemark('');
  };

  const handleApprove = () => {
    onApprove(enrollment.id);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40 transition-opacity" onClick={onClose} />
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
                <span className="text-sm text-gray-500">{enrollment.participationType === '团队' ? '团队名称' : '姓名'}</span>
                <span className="text-sm font-medium text-gray-800">{enrollment.applicantName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">手机号</span>
                <span className="text-sm text-gray-800">{enrollment.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">邮箱</span>
                <span className="text-sm text-gray-800">{enrollment.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">学校/机构</span>
                <span className="text-sm text-gray-800">{enrollment.organization}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">专业/职位</span>
                <span className="text-sm text-gray-800">{enrollment.major}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">参赛方式</span>
                <span className="text-sm text-gray-800">{enrollment.participationType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">赛道</span>
                <span className="text-sm text-gray-800">{enrollment.track}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">报名时间</span>
                <span className="text-sm text-gray-800">{enrollment.submitTime}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              报名说明
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 leading-relaxed">{enrollment.description || '暂无说明'}</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              资格材料
            </h4>
            <div className="space-y-2">
              {enrollment.documents?.map((doc, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-gray-700">{doc.name}</span>
                  </div>
                  <button className="text-xs text-primary hover:text-primary/80 font-medium">下载</button>
                </div>
              )) || <p className="text-sm text-gray-400">暂无材料</p>}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              审核记录
            </h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">当前状态</span>
                <StatusTag status={enrollment.status} />
              </div>
              {enrollment.reviewRemark && (
                <div className="pt-3 border-t border-gray-200">
                  <span className="text-sm text-gray-500 block mb-1">审核意见</span>
                  <p className="text-sm text-gray-700">{enrollment.reviewRemark}</p>
                </div>
              )}
              {enrollment.hasSupplement && (
                <div className="pt-3 border-t border-gray-200">
                  <span className="text-sm text-blue-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    已要求补件
                  </span>
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
                <button
                  onClick={() => { setActionType(null); setRemark(''); }}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleAction}
                  disabled={!remark.trim()}
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

        {!actionType && enrollment.status !== '已通过' && (
          <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setActionType('supplement')}
                className="px-4 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                要求补件
              </button>
              <button
                onClick={() => setActionType('reject')}
                className="px-4 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                驳回
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
              >
                审核通过
              </button>
            </div>
          </div>
        )}

        {!actionType && enrollment.status === '已通过' && (
          <div className="border-t border-gray-100 px-6 py-4 bg-green-50">
            <p className="text-sm text-green-700 text-center">该报名已通过审核</p>
          </div>
        )}
      </div>
    </>
  );
};

const AdminEnrollments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [competitionFilter, setCompetitionFilter] = useState('all');
  const [participationFilter, setParticipationFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);

  const [enrollments, setEnrollments] = useState([
    {
      id: 1,
      applicantName: '张明',
      teamName: null,
      competitionName: '2024年梧桐·鸿鹄人工智能应用创新大赛',
      participationType: '个人',
      track: 'AI应用创新赛道',
      submitTime: '2024-11-15 14:30',
      status: '待审核',
      phone: '138****1234',
      email: 'zhangming@example.com',
      organization: '清华大学',
      major: '计算机科学与技术',
      description: '希望参加AI应用创新赛道，开发一个基于大语言模型的智能助手项目。',
      documents: [{ name: '学生证.pdf', size: '2.3MB' }, { name: '项目简介.docx', size: '1.1MB' }],
      reviewRemark: '',
      hasSupplement: false
    },
    {
      id: 2,
      applicantName: null,
      teamName: 'AI创新先锋队',
      competitionName: '2024年梧桐·鸿鹄人工智能应用创新大赛',
      participationType: '团队',
      track: 'AI应用创新赛道',
      submitTime: '2024-11-15 10:20',
      status: '已通过',
      phone: '139****5678',
      email: 'aiteam@example.com',
      organization: '北京大学',
      major: '人工智能研究院',
      description: '团队由5名成员组成，专注于计算机视觉和自然语言处理领域。',
      documents: [{ name: '团队信息表.pdf', size: '1.5MB' }, { name: '项目计划书.pdf', size: '3.2MB' }],
      reviewRemark: '材料齐全，通过审核',
      hasSupplement: false
    },
    {
      id: 3,
      applicantName: '李华',
      teamName: null,
      competitionName: '2024年清华大学校园赛',
      participationType: '个人',
      track: 'AI创意赛道',
      submitTime: '2024-11-14 16:45',
      status: '已驳回',
      phone: '137****9012',
      email: 'lihua@example.com',
      organization: '清华大学',
      major: '软件工程',
      description: '对AI创意赛道很感兴趣，希望展示创意项目。',
      documents: [{ name: '学生证.pdf', size: '2.1MB' }],
      reviewRemark: '缺少项目简介材料，请补充后重新提交',
      hasSupplement: false
    },
    {
      id: 4,
      applicantName: null,
      teamName: '智慧未来小组',
      competitionName: '2024年海淀区区县赛',
      participationType: '团队',
      track: 'AI教育赛道',
      submitTime: '2024-11-14 09:15',
      status: '待补件',
      phone: '136****3456',
      email: 'future@example.com',
      organization: '海淀区第一中学',
      major: '高中部',
      description: '团队致力于开发AI教育辅助工具，帮助中学生更好地学习编程。',
      documents: [{ name: '团队报名表.pdf', size: '1.8MB' }],
      reviewRemark: '请补充指导教师推荐信',
      hasSupplement: true
    },
    {
      id: 5,
      applicantName: '王芳',
      teamName: null,
      competitionName: '2024年北京大学校园赛',
      participationType: '个人',
      track: 'AI应用创新赛道',
      submitTime: '2024-11-13 20:00',
      status: '待审核',
      phone: '135****7890',
      email: 'wangfang@example.com',
      organization: '北京大学',
      major: '数据科学',
      description: '希望将数据科学与AI应用结合，开发创新项目。',
      documents: [{ name: '学生证.pdf', size: '2.0MB' }, { name: '项目提案.pdf', size: '2.5MB' }],
      reviewRemark: '',
      hasSupplement: false
    },
    {
      id: 6,
      applicantName: '陈杰',
      teamName: null,
      competitionName: '2024年梧桐·鸿鹄人工智能应用创新大赛',
      participationType: '个人',
      track: 'AI医疗赛道',
      submitTime: '2024-11-12 11:30',
      status: '草稿',
      phone: '134****2468',
      email: 'chenjie@example.com',
      organization: '中科院计算所',
      major: '医学影像处理',
      description: '专注于AI在医疗影像诊断领域的应用研究。',
      documents: [],
      reviewRemark: '',
      hasSupplement: false
    }
  ]);

  const competitions = ['全部赛事', ...new Set(enrollments.map(e => e.competitionName))];

  // 状态排序权重：待审核 > 待补件 > 已通过 > 已驳回 > 草稿
  const statusOrder = { '待审核': 1, '待补件': 2, '已通过': 3, '已驳回': 4, '草稿': 5 };

  const filteredEnrollments = useMemo(() => {
    let result = enrollments.filter(enrollment => {
      const searchLower = searchQuery.toLowerCase();
      const matchSearch = 
        enrollment.applicantName?.toLowerCase().includes(searchLower) ||
        enrollment.teamName?.toLowerCase().includes(searchLower) ||
        enrollment.competitionName.toLowerCase().includes(searchLower);
      const matchCompetition = competitionFilter === 'all' || enrollment.competitionName === competitionFilter;
      const matchParticipation = participationFilter === 'all' || enrollment.participationType === participationFilter;
      const matchStatus = statusFilter === 'all' || enrollment.status === statusFilter;
      const matchTab = activeTab === 'all' || enrollment.status === activeTab;
      return matchSearch && matchCompetition && matchParticipation && matchStatus && matchTab;
    });

    // 按状态排序：待审核排最前
    result.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
    
    return result;
  }, [enrollments, searchQuery, competitionFilter, participationFilter, statusFilter, activeTab]);

  const tabItems = [
    { key: 'all', label: '全部', count: enrollments.length },
    { key: '待审核', label: '待审核', count: enrollments.filter(e => e.status === '待审核').length },
    { key: '已通过', label: '已通过', count: enrollments.filter(e => e.status === '已通过').length },
    { key: '已驳回', label: '已驳回', count: enrollments.filter(e => e.status === '已驳回').length },
    { key: '待补件', label: '待补件', count: enrollments.filter(e => e.status === '待补件').length }
  ];

  const handleViewDetail = (enrollment) => {
    setSelectedEnrollment(enrollment);
    setIsDrawerOpen(true);
  };

  const handleApprove = (id) => {
    setEnrollments(prev => prev.map(e => 
      e.id === id ? { ...e, status: '已通过', reviewRemark: '审核通过' } : e
    ));
    setIsDrawerOpen(false);
  };

  const handleReject = (id, remark) => {
    setEnrollments(prev => prev.map(e => 
      e.id === id ? { ...e, status: '已驳回', reviewRemark: remark } : e
    ));
    setIsDrawerOpen(false);
  };

  const handleRequestSupplement = (id, remark) => {
    setEnrollments(prev => prev.map(e => 
      e.id === id ? { ...e, status: '待补件', reviewRemark: remark, hasSupplement: true } : e
    ));
    setIsDrawerOpen(false);
  };

  const handleExport = () => {
    alert('导出功能开发中...\n将导出当前筛选条件下的报名名单');
  };

  const getDisplayName = (enrollment) => {
    return enrollment.participationType === '团队' 
      ? enrollment.teamName 
      : enrollment.applicantName;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">报名审核</h2>
        <p className="text-sm text-gray-500 mt-2">审核个人/团队报名申请，处理补件与驳回</p>
      </div>

      {/* 轻筛选 Tabs */}
      <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
        {tabItems.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab.key
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
            <span className={`ml-1.5 text-xs ${activeTab === tab.key ? 'text-white/80' : 'text-gray-400'}`}>
              ({tab.count})
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">搜索姓名/团队/赛事</label>
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

          <div>
            <label className="block text-xs text-gray-500 mb-1.5">赛事筛选</label>
            <select
              value={competitionFilter}
              onChange={(e) => setCompetitionFilter(e.target.value)}
              className="px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-0 bg-white min-w-[160px]"
            >
              <option value="all">全部赛事</option>
              {competitions.filter(c => c !== '全部赛事').map((comp, index) => (
                <option key={index} value={comp}>{comp}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1.5">参赛方式</label>
            <select
              value={participationFilter}
              onChange={(e) => setParticipationFilter(e.target.value)}
              className="px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-0 bg-white min-w-[120px]"
            >
              <option value="all">全部</option>
              <option value="个人">个人</option>
              <option value="团队">团队</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:border-primary hover:text-primary transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          导出名单
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">报名人/团队</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">赛事信息</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">参赛方式</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">提交时间</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEnrollments.map((enrollment) => (
                <tr 
                  key={enrollment.id} 
                  className="hover:bg-blue-50/30 transition-colors group"
                >
                  <td className="px-6 py-5">
                    <span className="text-sm font-semibold text-gray-800">{getDisplayName(enrollment)}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-gray-800 line-clamp-1" title={enrollment.competitionName}>
                        {enrollment.competitionName}
                      </span>
                      <span className="text-xs text-gray-500">赛道：{enrollment.track}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded ${
                      enrollment.participationType === '团队' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {enrollment.participationType}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-gray-600">{enrollment.submitTime}</span>
                  </td>
                  <td className="px-6 py-5">
                    <StatusTag status={enrollment.status} />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleViewDetail(enrollment)}
                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        查看
                      </button>
                      
                      <ReviewDropdown
                        enrollment={enrollment}
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onRequestSupplement={handleRequestSupplement}
                        onViewDetail={handleViewDetail}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredEnrollments.length === 0 && (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500">暂无符合条件的报名记录</p>
          </div>
        )}
      </div>

      <DetailDrawer
        enrollment={selectedEnrollment}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onApprove={handleApprove}
        onReject={handleReject}
        onRequestSupplement={handleRequestSupplement}
      />
    </div>
  );
};

export default AdminEnrollments;
