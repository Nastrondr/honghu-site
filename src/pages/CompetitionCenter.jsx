import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../components/common/Animations';

const CompetitionCenter = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'list';
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('全部');
  const [selectedTime, setSelectedTime] = useState('全部');
  const [selectedStatus, setSelectedStatus] = useState('全部');
  const { isAuthenticated } = useAuth();
  
  const competitions = [
    {
      id: 1,
      title: '2024年梧桐·鸿鹄人工智能应用创新大赛',
      date: '2024年10月15日 - 2024年12月31日',
      location: '线上',
      status: '进行中',
      category: '校园赛',
      track: '综合赛道',
      organizer: '武汉纺织大学',
      tags: ['人工智能', '创新应用', '全国赛'],
      description: '面向全国的人工智能应用创新大赛，鼓励选手开发具有实际应用价值的AI解决方案。'
    },
    {
      id: 2,
      title: '2024年梧桐·鸿鹄AI算法挑战赛',
      date: '2024年9月1日 - 2024年10月15日',
      location: '线上',
      status: '已结束',
      category: '校园赛',
      track: '算法赛道',
      organizer: '武汉纺织大学',
      tags: ['算法', 'AI', '技术挑战'],
      description: '专注于AI算法优化的技术挑战赛，考验选手的算法设计和实现能力。'
    },
    {
      id: 3,
      title: '2024年梧桐·鸿鹄区县AI应用创新大赛',
      date: '2024年11月1日 - 2025年1月31日',
      location: '线下',
      status: '进行中',
      category: '区县赛',
      track: '综合赛道',
      organizer: '武汉纺织大学',
      tags: ['人工智能', '区县应用', '地方赛'],
      description: '面向各区县的人工智能应用创新大赛，鼓励选手开发适合本地场景的AI解决方案。'
    },
    {
      id: 4,
      title: '2024年梧桐·鸿鹄区县AI算法挑战赛',
      date: '2024年8月1日 - 2024年9月30日',
      location: '线上',
      status: '已结束',
      category: '区县赛',
      track: '算法赛道',
      organizer: '武汉纺织大学',
      tags: ['算法', 'AI', '区县赛'],
      description: '专注于区县场景的AI算法优化技术挑战赛，考验选手的算法设计和实现能力。'
    }
  ];

  const tracks = ['全部', '综合赛道', '算法赛道', '创新赛道', '创业赛道'];
  const times = ['全部', '2024年', '2025年', '2026年'];
  const statuses = ['全部', '进行中', '即将开始', '已结束'];

  const filteredCompetitions = competitions.filter(competition => {
    const matchesSearch = searchTerm === '' || 
      competition.title.includes(searchTerm) || 
      competition.description.includes(searchTerm) ||
      competition.tags.some(tag => tag.includes(searchTerm));
    const matchesTrack = selectedTrack === '全部' || competition.track === selectedTrack;
    const matchesTime = selectedTime === '全部' || competition.date.includes(selectedTime);
    const matchesStatus = selectedStatus === '全部' || competition.status === selectedStatus;
    return matchesSearch && matchesTrack && matchesTime && matchesStatus;
  });

  const tabs = [
    { key: 'list', label: '赛事列表', path: '/competition-center' },
    { key: 'info', label: '关键信息', path: '/competition-center?tab=info' },
  ];

  const [activeTab, setActiveTab] = useState(tab);
  const reducedMotion = useReducedMotion();

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    const tabConfig = tabs.find(t => t.key === newTab);
    if (tabConfig) {
      navigate(tabConfig.path);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: reducedMotion ? 0 : 0.06, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0.1 : 0.35, ease: [0.25, 0.1, 0.25, 1] } }
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-neutral-50/30 min-h-screen">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-3xl font-bold text-neutral-800 mb-2 text-center"
          variants={itemVariants}
        >
          赛事中心
        </motion.h1>
        <motion.p
          className="text-neutral-600 mb-8 text-center"
          variants={itemVariants}
        >
          这里展示了梧桐·鸿鹄人工智能应用创新大赛的相关赛事信息
        </motion.p>

      {/* 分段切换控件 */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative bg-slate-100/60 backdrop-blur-sm rounded-full p-1 inline-flex">
          {tabs.map((t, index) => {
            const isActive = activeTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => handleTabChange(t.key)}
                className={`relative z-10 px-8 py-2 text-sm font-medium transition-all duration-300 rounded-full ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {t.label}
              </button>
            );
          })}
          {/* 滑动底板 */}
          <div 
            className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-[#7463EC] to-[#8B5CF6] shadow-md shadow-primary/25 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              width: `calc(50% - 4px)`,
              transform: `translateX(${activeTab === 'list' ? '0%' : '100%'})`,
              left: '4px'
            }}
          />
        </div>
        </div>

        {/* 合作申请入口提示卡片 */}
      <div className="glass-card rounded-2xl p-6 mb-8 bg-gradient-to-r from-primary/5 to-purple-500/5 border border-primary/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-neutral-800">希望成为合作单位或举办分赛区？</h3>
              <p className="text-xs text-neutral-500">我们欢迎高校、园区、机构申请成为分赛区或合作单位</p>
            </div>
          </div>
          <Link
            to="/apply-competition"
            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm flex-shrink-0"
          >
            申请办赛
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>

      {tab === 'list' && (
      <>
      {/* 搜索和筛选 */}
      <div className="glass-card rounded-2xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="搜索赛事名称、描述..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-600">赛道:</span>
            <select
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value)}
              className="px-3 py-2 rounded-lg border border-neutral-200 text-sm focus:border-primary focus:outline-none"
            >
              {tracks.map(track => (
                <option key={track} value={track}>{track}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-600">时间:</span>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="px-3 py-2 rounded-lg border border-neutral-200 text-sm focus:border-primary focus:outline-none"
            >
              {times.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-600">状态:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-lg border border-neutral-200 text-sm focus:border-primary focus:outline-none"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 赛事列表 */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-neutral-800">赛事列表</h2>
          <span className="text-sm text-neutral-500">共 {filteredCompetitions.length} 个赛事</span>
        </div>
        
        {/* 平台功能入口 - 仅登录后可见 */}
        {isAuthenticated && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {[
              { title: '团队大厅', icon: 'users', link: '/team-hall' },
              { title: '赛题数据', icon: 'database', link: '/competition-data' },
              { title: '我的作品', icon: 'folder', link: '/work-submission' }
            ].map((item, index) => (
              <Link key={index} to={item.link} className="glass-card rounded-xl p-4 flex flex-col items-center justify-center text-center hover:scale-[1.02] transition-transform">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  {item.icon === 'users' && (
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )}
                  {item.icon === 'database' && (
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  )}
                  {item.icon === 'folder' && (
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  )}
                </div>
                <p className="text-neutral-800 font-medium">{item.title}</p>
              </Link>
            ))}
          </div>
        )}

        <div className="space-y-4">
          {filteredCompetitions.map((competition) => (
            <Link
              key={competition.id}
              to={`/competition/${competition.id}`}
              className="competition-card block"
            >
              <div className="competition-card__main">
                <div className="competition-card__header">
                  <h3 className="competition-card__title">{competition.title}</h3>
                  <span className={`competition-card__status ${competition.status === '进行中' ? 'status-active' : 'status-ended'}`}>
                    {competition.status}
                  </span>
                </div>
                
                <div className="competition-card__meta">
                  <span className="meta-item">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {competition.organizer}
                  </span>
                  <span className="meta-item">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {competition.date}
                  </span>
                  <span className="meta-item">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {competition.location}
                  </span>
                </div>
                
                <div className="competition-card__tags">
                  {competition.tags.map((tag, index) => (
                    <span key={index} className="tag-chip">{tag}</span>
                  ))}
                </div>
                
                <p className="competition-card__desc">{competition.description}</p>
              </div>
              
              <div className="competition-card__side">
                <svg className="w-5 h-5 arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {!isAuthenticated && (
          <div className="mt-6 glass-card rounded-xl p-6 text-center">
            <p className="text-neutral-600 mb-4">登录后可访问团队大厅、赛题数据、作品提交等功能</p>
            <div className="flex justify-center gap-4">
              <Link to="/login" className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                登录
              </Link>
              <Link to="/register" className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/5 transition-colors">
                注册
              </Link>
            </div>
          </div>
        )}
      </section>
      </>
      )}

      {tab === 'info' && (
      <>
        {/* 赛道设置 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-6">赛道设置</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">综合赛道</h3>
              <p className="text-neutral-600 text-sm mb-4">涵盖多个领域的创新应用，包括智慧城市、智能制造、智慧金融、智慧医疗、智慧教育等</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">智慧城市</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">智能制造</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">智慧金融</span>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">算法赛道</h3>
              <p className="text-neutral-600 text-sm mb-4">专注于人工智能核心算法的优化与创新，包括机器学习、深度学习，自然语言处理等方向</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs">机器学习</span>
                <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs">深度学习</span>
                <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs">NLP</span>
              </div>
            </div>
          </div>
        </section>

        {/* 参赛形式 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-6">参赛形式</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 个人赛 */}
            <div className="glass-card rounded-2xl p-5 h-[320px]">
              <div className="flex h-full">
                <div className="w-[30%] flex flex-col items-center justify-center pr-4 border-r border-neutral-100">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                    <svg className="w-9 h-9 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-1">个人赛</h3>
                  <span className="px-3 py-1 bg-primary/8 text-primary/80 rounded-full text-xs">个人创意型</span>
                </div>
                <div className="w-[70%] pl-5 flex flex-col justify-center">
                  <p className="text-neutral-600 text-sm leading-relaxed mb-5 line-clamp-2">
                    面向个人AI应用创意与实践，提交视频作品，展示个人创新能力和技术实力
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-neutral-500 bg-neutral-50/50 px-3 py-2 rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                      适合独立开发者
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-500 bg-neutral-50/50 px-3 py-2 rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                      评审周期较短
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-500 bg-neutral-50/50 px-3 py-2 rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                      获奖机会均等
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 团队赛 */}
            <div className="glass-card rounded-2xl p-5 h-[320px]">
              <div className="flex h-full">
                <div className="w-[30%] flex flex-col items-center justify-center pr-4 border-r border-neutral-100">
                  <div className="w-20 h-20 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                    <svg className="w-9 h-9 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-1">团队赛</h3>
                  <span className="px-3 py-1 bg-secondary/8 text-secondary/80 rounded-full text-xs">协作项目型</span>
                </div>
                <div className="w-[70%] pl-5 flex flex-col justify-center">
                  <p className="text-neutral-600 text-sm leading-relaxed mb-5 line-clamp-2">
                    面向多领域AI应用项目，支持2-5人组队，协作完成创新项目并参与评审
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-neutral-500 bg-neutral-50/50 px-3 py-2 rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary/60"></span>
                      2-5人团队
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-500 bg-neutral-50/50 px-3 py-2 rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary/60"></span>
                      分工协作
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-500 bg-neutral-50/50 px-3 py-2 rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary/60"></span>
                      更高奖金
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 赛事流程 - 轻量时间线 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-8">赛事流程</h2>
          <div className="relative">
            {/* 主线 */}
            <div className="hidden md:block absolute top-5 left-0 right-0 h-[2px] bg-neutral-100"></div>
            <div className="hidden md:block absolute top-5 left-0 w-[60%] h-[2px] bg-gradient-to-r from-primary to-purple-400"></div>
            
            <div className="grid grid-cols-5 gap-2">
              {[
                { step: '查看赛事', description: '了解赛事规则和奖励' },
                { step: '报名参赛', description: '填写个人或团队信息' },
                { step: '组队协作', description: '团队赛组建团队，个人赛无需组队' },
                { step: '提交作品', description: '按要求上传参赛作品' },
                { step: '查看结果', description: '关注比赛结果和后续通知' }
              ].map((item, index) => (
                <div key={index} className="relative text-center flex flex-col items-center">
                  {/* 节点 */}
                  <div className={`relative z-10 w-3 h-3 rounded-full mb-6 transition-all ${
                    index <= 1 
                      ? 'bg-gradient-to-r from-primary to-purple-400 shadow-lg shadow-primary/30' 
                      : 'bg-neutral-200'
                  }`}>
                    {index === 2 && (
                      <div className="absolute -inset-1 rounded-full border border-primary/30 animate-pulse"></div>
                    )}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-neutral-400">
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* 标题和描述 */}
                  <div className="flex flex-col items-center">
                    <h3 className={`text-sm font-medium mb-1 ${index <= 1 ? 'text-primary' : 'text-neutral-600'}`}>
                      {item.step}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed max-w-[100px]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 关键信息 */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-800 mb-6">关键信息</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">参赛资格</h3>
              <p className="text-neutral-600 text-sm">全国高校学生、科研机构和企业团队均可报名参与</p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">奖金激励</h3>
              <p className="text-neutral-600 text-sm">总奖金池丰厚，设置金奖、银奖、铜奖及最佳创新奖</p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">资源支持</h3>
              <p className="text-neutral-600 text-sm">提供算力资源、课程培训、专家指导等全方位支持</p>
            </div>
          </div>
        </section>
      </>
      )}
      </motion.div>
    </div>
  );
};

export default CompetitionCenter;
