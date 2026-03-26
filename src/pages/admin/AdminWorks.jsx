import React, { useState, useMemo, useRef, useEffect } from 'react';

// TODO: 接入作品列表接口
// TODO: 接入作品详情接口
// TODO: 接入状态更新接口

// 状态标签组件
const StatusTag = ({ status }) => {
  const statusConfig = {
    '草稿': { color: 'bg-gray-100 text-gray-600', label: '草稿' },
    '已提交': { color: 'bg-blue-100 text-blue-600', label: '已提交' },
    '评审中': { color: 'bg-purple-100 text-purple-600', label: '评审中' },
    '已评分': { color: 'bg-cyan-100 text-cyan-600', label: '已评分' },
    '已公示': { color: 'bg-green-100 text-green-600', label: '已公示' }
  };
  const config = statusConfig[status] || statusConfig['草稿'];
  return (
    <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${config.color}`}>
      {config.label}
    </span>
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
    { value: '评审中', label: '标记为评审中', color: 'text-purple-600' },
    { value: '已评分', label: '标记为已评分', color: 'text-cyan-600' },
    { value: '已公示', label: '标记为已公示', color: 'text-green-600' }
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

// 详情抽屉组件
const DetailDrawer = ({ work, isOpen, onClose, onStatusChange }) => {
  if (!isOpen || !work) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40 transition-opacity" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl z-50 flex flex-col">
        {/* 头部 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">作品详情</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 内容区 */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* 基本信息 */}
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
                <span className="text-sm font-medium text-gray-800">{work.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">团队/作者</span>
                <span className="text-sm text-gray-800">{work.teamName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">所属赛事</span>
                <span className="text-sm text-gray-800">{work.competitionName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">赛道</span>
                <span className="text-sm text-gray-800">{work.track}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">当前状态</span>
                <StatusTag status={work.status} />
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">当前版本</span>
                <span className="text-sm font-medium text-primary">{work.currentVersion}</span>
              </div>
            </div>
          </div>

          {/* 作品说明 */}
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

          {/* 文件列表 */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              提交文件
            </h4>
            <div className="space-y-2">
              {work.files?.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <span className="text-xs text-gray-400 ml-2">({file.size})</span>
                    </div>
                  </div>
                  <button className="text-xs text-primary hover:text-primary/80 font-medium">下载</button>
                </div>
              )) || <p className="text-sm text-gray-400">暂无文件</p>}
            </div>
          </div>

          {/* AI工具说明 */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              AI工具说明
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700">{work.aiTools || '未填写'}</p>
            </div>
          </div>

          {/* 算力使用说明 */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
              算力使用说明
            </h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">GPU型号</span>
                <span className="text-sm text-gray-800">{work.gpuInfo?.model || '未填写'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">使用时长</span>
                <span className="text-sm text-gray-800">{work.gpuInfo?.duration || '未填写'}</span>
              </div>
            </div>
          </div>

          {/* 版本记录 */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              版本记录
            </h4>
            <div className="space-y-3">
              {work.versions?.map((version, index) => (
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
                        {version.version}
                      </span>
                      {version.isCurrent && (
                        <span className="px-2 py-0.5 text-xs bg-primary text-white rounded">当前版本</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{version.submitTime}</span>
                  </div>
                  {version.changelog && (
                    <p className="text-sm text-gray-600 mt-2">{version.changelog}</p>
                  )}
                </div>
              )) || <p className="text-sm text-gray-400">暂无版本记录</p>}
            </div>
          </div>
        </div>

        {/* 底部操作区 */}
        <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => alert('分配评审功能开发中...')}
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
  const [selectedWork, setSelectedWork] = useState(null);

  // Mock 数据 - 作品列表
  const [works, setWorks] = useState([
    {
      id: 1,
      name: '基于大语言模型的智能助手',
      teamName: 'AI创新先锋队',
      competitionName: '2024年梧桐·鸿鹄人工智能应用创新大赛',
      track: 'AI应用创新赛道',
      currentVersion: 'V1.2',
      submitTime: '2024-11-15 14:30',
      status: '已提交',
      description: '本项目基于GPT-4架构开发了一款智能助手，能够处理自然语言问答、文档摘要、代码生成等多种任务。项目采用微服务架构，支持高并发访问。',
      files: [
        { name: '项目代码.zip', size: '15.2MB' },
        { name: '演示视频.mp4', size: '128.5MB' },
        { name: '项目文档.pdf', size: '3.8MB' }
      ],
      aiTools: '使用GPT-4 API进行自然语言处理，使用Stable Diffusion进行图像生成',
      gpuInfo: { model: 'NVIDIA A100', duration: '120小时' },
      versions: [
        { version: 'V1.2', submitTime: '2024-11-15 14:30', isCurrent: true, changelog: '优化了响应速度，增加了多语言支持' },
        { version: 'V1.1', submitTime: '2024-11-10 09:20', isCurrent: false, changelog: '修复了若干bug' },
        { version: 'V1.0', submitTime: '2024-11-01 16:45', isCurrent: false, changelog: '初始版本' }
      ]
    },
    {
      id: 2,
      name: '医疗影像智能诊断系统',
      teamName: '智慧医疗小组',
      competitionName: '2024年梧桐·鸿鹄人工智能应用创新大赛',
      track: 'AI医疗赛道',
      currentVersion: 'V2.0',
      submitTime: '2024-11-14 10:15',
      status: '评审中',
      description: '基于深度学习的医疗影像分析系统，能够辅助医生进行CT、MRI影像的诊断。系统采用U-Net和ResNet混合架构，诊断准确率达到95%以上。',
      files: [
        { name: '源代码.zip', size: '45.6MB' },
        { name: '模型文件.pth', size: '256.3MB' },
        { name: '技术白皮书.pdf', size: '5.2MB' }
      ],
      aiTools: '使用PyTorch框架，基于U-Net和ResNet架构',
      gpuInfo: { model: 'NVIDIA V100', duration: '200小时' },
      versions: [
        { version: 'V2.0', submitTime: '2024-11-14 10:15', isCurrent: true, changelog: '增加了3D影像支持' },
        { version: 'V1.0', submitTime: '2024-10-20 14:30', isCurrent: false, changelog: '初始版本' }
      ]
    },
    {
      id: 3,
      name: 'AI教育辅助平台',
      teamName: '智慧未来小组',
      competitionName: '2024年海淀区区县赛',
      track: 'AI教育赛道',
      currentVersion: 'V1.5',
      submitTime: '2024-11-13 16:00',
      status: '已评分',
      description: '面向中学生的AI编程学习平台，提供可视化编程环境和AI模型训练功能。平台内置多个教学案例，帮助学生理解机器学习原理。',
      files: [
        { name: '平台源码.zip', size: '32.1MB' },
        { name: '教学案例集.pdf', size: '8.5MB' }
      ],
      aiTools: '使用TensorFlow.js进行浏览器端模型训练',
      gpuInfo: { model: 'NVIDIA T4', duration: '80小时' },
      versions: [
        { version: 'V1.5', submitTime: '2024-11-13 16:00', isCurrent: true, changelog: '增加了5个新教学案例' },
        { version: 'V1.0', submitTime: '2024-11-05 11:20', isCurrent: false, changelog: '初始版本' }
      ]
    },
    {
      id: 4,
      name: '智能交通流量预测系统',
      teamName: '交通大脑团队',
      competitionName: '2024年北京大学校园赛',
      track: 'AI应用创新赛道',
      currentVersion: 'V1.0',
      submitTime: '2024-11-12 09:30',
      status: '已公示',
      description: '基于时空图神经网络的城市交通流量预测系统，能够提前30分钟预测各路段车流量，为城市交通管理提供决策支持。',
      files: [
        { name: '系统代码.zip', size: '28.4MB' },
        { name: '数据集.zip', size: '512.6MB' },
        { name: '论文.pdf', size: '2.1MB' }
      ],
      aiTools: '使用PyTorch Geometric进行图神经网络训练',
      gpuInfo: { model: 'NVIDIA A100', duration: '150小时' },
      versions: [
        { version: 'V1.0', submitTime: '2024-11-12 09:30', isCurrent: true, changelog: '初始版本' }
      ]
    },
    {
      id: 5,
      name: '创意AI绘画工具',
      teamName: '艺术科技工作室',
      competitionName: '2024年清华大学校园赛',
      track: 'AI创意赛道',
      currentVersion: 'V0.9',
      submitTime: '2024-11-11 20:00',
      status: '草稿',
      description: '一款面向设计师的AI辅助绘画工具，支持草图自动上色、风格迁移等功能。',
      files: [
        { name: '原型代码.zip', size: '18.7MB' }
      ],
      aiTools: '使用Stable Diffusion和ControlNet',
      gpuInfo: { model: 'NVIDIA RTX 4090', duration: '60小时' },
      versions: [
        { version: 'V0.9', submitTime: '2024-11-11 20:00', isCurrent: true, changelog: 'Beta版本' }
      ]
    }
  ]);

  // 提取筛选选项
  const competitions = ['全部赛事', ...new Set(works.map(w => w.competitionName))];
  const tracks = ['全部赛道', ...new Set(works.map(w => w.track))];

  // 筛选后的作品列表
  const filteredWorks = useMemo(() => {
    return works.filter(work => {
      const searchLower = searchQuery.toLowerCase();
      const matchSearch = 
        work.name.toLowerCase().includes(searchLower) ||
        work.teamName.toLowerCase().includes(searchLower);
      const matchCompetition = competitionFilter === 'all' || work.competitionName === competitionFilter;
      const matchStatus = statusFilter === 'all' || work.status === statusFilter;
      const matchTrack = trackFilter === 'all' || work.track === trackFilter;
      return matchSearch && matchCompetition && matchStatus && matchTrack;
    });
  }, [works, searchQuery, competitionFilter, statusFilter, trackFilter]);

  const handleViewDetail = (work) => {
    setSelectedWork(work);
    setIsDrawerOpen(true);
  };

  const handleStatusChange = (id, newStatus) => {
    setWorks(prev => prev.map(w => 
      w.id === id ? { ...w, status: newStatus } : w
    ));
  };

  return (
    <div className="space-y-6">
      {/* 页面标题区 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">作品管理</h2>
        <p className="text-sm text-gray-500 mt-2">管理参赛作品、查看提交内容与版本记录</p>
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
              {competitions.map((comp, index) => (
                <option key={index} value={index === 0 ? 'all' : comp}>{comp}</option>
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
              <option value="草稿">草稿</option>
              <option value="已提交">已提交</option>
              <option value="评审中">评审中</option>
              <option value="已评分">已评分</option>
              <option value="已公示">已公示</option>
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
              {tracks.map((track, index) => (
                <option key={index} value={index === 0 ? 'all' : track}>{track}</option>
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">版本</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">提交时间</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredWorks.map((work) => (
                <tr key={work.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-800">{work.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{work.teamName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 line-clamp-1" title={work.competitionName}>
                      {work.competitionName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-primary">{work.currentVersion}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{work.submitTime}</span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusTag status={work.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleViewDetail(work)}
                        className="px-3 py-1.5 text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        查看详情
                      </button>
                      <StatusDropdown work={work} onStatusChange={handleStatusChange} />
                      <button
                        onClick={() => alert('分配评审功能开发中...')}
                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        分配评审
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredWorks.length === 0 && (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500">暂无符合条件的作品</p>
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
    </div>
  );
};

export default AdminWorks;
