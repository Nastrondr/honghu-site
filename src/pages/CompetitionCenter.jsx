import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { request } from '../lib/api';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../components/common/Animations';

const STATUS_MAP = {
  'draft': { label: '即将开始', css: 'status-pending' },
  'active': { label: '进行中', css: 'status-active' },
  'ended': { label: '已结束', css: 'status-ended' },
};

const formatDateRange = (start, end) => {
  if (!start && !end) return '-';
  const fmt = (d) => {
    if (!d) return '';
    try {
      const date = new Date(d);
      return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`;
    } catch { return ''; }
  };
  if (start && end) return `${fmt(start)} - ${fmt(end)}`;
  if (start) return `${fmt(start)} 开始`;
  return `${fmt(end)} 结束`;
};

const ApiDebugPanel = ({ loading, error, competitions, filters }) => {
  if (process.env.NODE_ENV !== 'development') return null;
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-blue-700">赛事中心 API 联调信息</h3>
        <span className="text-xs text-blue-500">开发环境可见</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">请求接口</p>
          <p className="font-mono text-xs text-gray-800 truncate">GET /v1/competitions</p>
          <p className={`text-xs font-semibold mt-1 ${
            loading ? 'text-yellow-600' : error ? 'text-red-600' : 'text-green-600'
          }`}>
            {loading ? '⏳ 请求中' : error ? '❌ 请求失败' : `✅ ${competitions.length} 条`}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">搜索词</p>
          <p className="font-mono text-xs text-gray-800">{filters.search || '无'}</p>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">状态筛选</p>
          <p className="font-mono text-xs text-gray-800">{filters.status || '全部'}</p>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">赛道筛选</p>
          <p className="font-mono text-xs text-gray-800">{filters.track || '全部'}</p>
        </div>
      </div>
    </div>
  );
};

const CompetitionCenter = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'list';
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const reducedMotion = useReducedMotion();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('全部');
  const [selectedTime, setSelectedTime] = useState('全部');
  const [selectedStatus, setSelectedStatus] = useState(() => {
    const statusFromUrl = searchParams.get('status');
    return statusFromUrl && ['全部', '进行中', '即将开始', '已结束'].includes(statusFromUrl)
      ? statusFromUrl
      : '全部';
  });
  const [competitionForm, setCompetitionForm] = useState('personal');
  const [selectedTrackTab, setSelectedTrackTab] = useState(0);
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCompetitions = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await request('/v1/competitions');
      if (result.ok && result.data?.code === 0 && result.data.data) {
        const list = Array.isArray(result.data.data.list) ? result.data.data.list : [];
        setCompetitions(list);
      } else {
        setCompetitions([]);
        setError('获取赛事列表失败');
      }
    } catch (err) {
      console.error('Fetch competitions error:', err);
      setCompetitions([]);
      setError('网络错误，无法获取赛事列表');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCompetitions(); }, [fetchCompetitions]);

  const filteredCompetitions = useMemo(() => {
    return competitions.filter(comp => {
      const q = searchTerm.toLowerCase();
      const matchSearch = !q ||
        (comp.name || '').toLowerCase().includes(q) ||
        (comp.description || '').toLowerCase().includes(q);
      const matchTrack = selectedTrack === '全部' ||
        (comp.tracks && comp.tracks.some(t => t.name === selectedTrack));
      const matchStatus = selectedStatus === '全部' ||
        (STATUS_MAP[comp.status]?.label === selectedStatus);
      return matchSearch && matchTrack && matchStatus;
    });
  }, [competitions, searchTerm, selectedTrack, selectedStatus]);

  const tracks = useMemo(() => {
    const names = new Set();
    competitions.forEach(c => {
      if (c.tracks) c.tracks.forEach(t => names.add(t.name));
    });
    return ['全部', ...Array.from(names)];
  }, [competitions]);

  const trackDescriptions = [
    { title: '数字金融', description: '聚焦 AI 在金融风控、投顾与反欺诈中的创新应用', tags: ['场景应用', '算法创新'] },
    { title: '数字教育', description: '聚焦 AI 在个性化学习、教学辅助与教育服务中的应用', tags: ['智能辅导', '教育公平'] },
    { title: '数字健康', description: '聚焦 AI 在医疗辅助诊断、健康管理与药研中的应用', tags: ['智慧医疗', '健康管理'] },
    { title: '数字文旅', description: '聚焦 AI 在文化传播、文旅服务与沉浸体验中的应用', tags: ['数字文创', '智慧旅游'] },
    { title: '数字法务', description: '聚焦 AI 在法律服务、合规审查与司法辅助中的应用', tags: ['智能法务', '合规审查'] }
  ];

  const competitionForms = {
    personal: {
      title: '个人赛',
      subtitle: '个人创意型',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      description: '面向个人AI应用创意与实践，提交视频作品，展示个人创新能力和技术实力',
      tags: ['适合独立开发者', '评审周期短', '更高奖金']
    },
    team: {
      title: '团队赛',
      subtitle: '协作项目型 2-5人',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      description: '2-5人团队协作完成AI应用项目，展示团队协作能力和项目整体实力',
      tags: ['适合团队协作', '综合实力比拼', '资源共享']
    }
  };

  const tabs = [
    { key: 'list', label: '赛事列表', path: '/competition-center' },
    { key: 'info', label: '参赛指南', path: '/competition-center?tab=info' },
  ];

  const handleTabChange = (newTab) => {
    const tabConfig = tabs.find(t => t.key === newTab);
    if (tabConfig) navigate(tabConfig.path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-white to-white">
      <ApiDebugPanel
        loading={loading}
        error={error}
        competitions={competitions}
        filters={{ search: searchTerm, status: selectedStatus, track: selectedTrack }}
      />

      {tab === 'list' && (
      <>
        {/* 顶部背景区 */}
        <section className="relative overflow-hidden min-h-[60vh] md:min-h-[65vh]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-50 to-white" />
          <div className="absolute inset-0">
            <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute top-40 right-[15%] w-96 h-96 bg-purple-300/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-[30%] w-64 h-64 bg-blue-300/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 pt-12 md:pt-16 pb-8">
            <motion.h1
              className="text-3xl md:text-5xl font-bold text-neutral-800 mb-2 text-center"
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

            {/* 搜索框 */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索赛事名称或描述..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-full border-2 border-transparent bg-white shadow-lg text-sm focus:outline-none focus:border-primary transition-colors"
                />
                <svg className="w-5 h-5 text-gray-400 absolute right-5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* 筛选器 */}
            <div className="max-w-4xl mx-auto space-y-3">
              {/* 移动端：垂直布局 */}
              <div className="flex flex-col gap-3 md:hidden">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <select
                      value={selectedTrack}
                      onChange={(e) => setSelectedTrack(e.target.value)}
                      className="w-full px-3 py-2 rounded-2xl border border-neutral-200 text-xs focus:border-primary focus:outline-none bg-white"
                    >
                      {tracks.map(track => (
                        <option key={track} value={track}>{track}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-3 py-2 rounded-2xl border border-neutral-200 text-xs focus:border-primary focus:outline-none bg-white"
                    >
                      {['全部', '2024年', '2025年', '2026年'].map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-2xl border border-neutral-200 text-xs focus:border-primary focus:outline-none bg-white"
                  >
                    {['全部', '进行中', '即将开始', '已结束'].map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 桌面端：横向布局 */}
              <div className="hidden md:flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-600">赛道:</span>
                  <select
                    value={selectedTrack}
                    onChange={(e) => setSelectedTrack(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-neutral-200 text-sm focus:border-primary focus:outline-none bg-white"
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
                    className="px-3 py-2 rounded-lg border border-neutral-200 text-sm focus:border-primary focus:outline-none bg-white"
                  >
                    {['全部', '2024年', '2025年', '2026年'].map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-600">状态:</span>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-neutral-200 text-sm focus:border-primary focus:outline-none bg-white"
                  >
                    {['全部', '进行中', '即将开始', '已结束'].map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 赛事列表 */}
        <section className="mb-8 md:mb-16 max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-2xl font-semibold text-neutral-800">赛事列表</h2>
            <span className="text-xs md:text-sm text-neutral-500">
              {loading ? '加载中...' : error ? '加载失败' : `共 ${filteredCompetitions.length} 个`}
            </span>
          </div>

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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79 8-4" />
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

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <button onClick={fetchCompetitions} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm font-medium">
                重试
              </button>
            </div>
          ) : filteredCompetitions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-500">暂无符合条件的赛事</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCompetitions.map((competition) => {
                const statusConfig = STATUS_MAP[competition.status] || { label: competition.status || '-', css: 'status-pending' };
                return (
                  <Link
                    key={competition.id}
                    to={`/competition/${competition.id}`}
                    className="competition-card block"
                  >
                    <div className="competition-card__main">
                      <div className="competition-card__header">
                        <h3 className="competition-card__title">{competition.name || '-'}</h3>
                        <span className={`competition-card__status ${statusConfig.css}`}>
                          {statusConfig.label}
                        </span>
                      </div>

                      <div className="competition-card__meta">
                        <span className="meta-item">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {competition.createdBy ? '管理员' : '-'}
                        </span>
                        <span className="meta-item">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDateRange(competition.competitionStart, competition.competitionEnd)}
                        </span>
                      </div>

                      {competition.tracks && competition.tracks.length > 0 && (
                        <div className="competition-card__tags">
                          {competition.tracks.slice(0, 3).map((track, index) => (
                            <span key={index} className="tag-chip">{track.name}</span>
                          ))}
                          {competition.tracks.length > 3 && (
                            <span className="tag-chip">+{competition.tracks.length - 3}</span>
                          )}
                        </div>
                      )}

                      {competition.description && (
                        <p className="competition-card__desc">{competition.description}</p>
                      )}
                    </div>

                    <div className="competition-card__side">
                      <div className="flex flex-col items-end gap-2">
                        {competition.status === 'ended' && (
                          <Link
                            to={`/competitions/${competition.id}/results`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full hover:bg-primary/20 transition-colors"
                          >
                            查看结果
                          </Link>
                        )}
                        <svg className="w-5 h-5 arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

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
        <section className="mb-8 md:mb-16 max-w-6xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-semibold text-neutral-800 mb-4 md:mb-6">赛道设置</h2>

          <div className="md:hidden">
            <div className="grid grid-cols-2 gap-3 mb-4">
              {trackDescriptions.map((track, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTrackTab(index)}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border transition-all duration-150 ${
                    selectedTrackTab === index
                      ? 'border-[#7A7BFF] bg-[rgba(122,123,255,0.08)]'
                      : 'border-[rgba(0,0,0,0.08)] bg-white'
                  }`}
                >
                  <span className={`text-sm font-medium ${selectedTrackTab === index ? 'text-[#7A7BFF]' : 'text-[#666]'}`}>
                    {track.title}
                  </span>
                </button>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 p-4">
              <h3 className="text-base font-semibold text-neutral-800 mb-2">
                {trackDescriptions[selectedTrackTab].title}
              </h3>
              <p className="text-sm text-neutral-600 mb-3 leading-relaxed">
                {trackDescriptions[selectedTrackTab].description}
              </p>
              <div className="flex flex-wrap gap-2">
                {trackDescriptions[selectedTrackTab].tags.map((tag, index) => (
                  <span key={index} className="px-2.5 py-1 bg-[rgba(122,123,255,0.08)] text-[#7A7BFF] rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:grid grid-cols-5 gap-4">
            {trackDescriptions.map((track, index) => (
              <button
                key={index}
                onClick={() => setSelectedTrackTab(index)}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-200 ${
                  selectedTrackTab === index
                    ? 'border-[#7A7BFF] bg-[rgba(122,123,255,0.08)]'
                    : 'border-transparent bg-white shadow-sm hover:shadow-md'
                }`}
              >
                <h3 className={`text-base font-semibold mb-2 ${
                  selectedTrackTab === index ? 'text-[#7A7BFF]' : 'text-neutral-800'
                }`}>
                  {track.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed mb-3">
                  {track.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {track.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 bg-[rgba(122,123,255,0.06)] text-[#7A7BFF] rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                {selectedTrackTab === index && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#7A7BFF] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        <section className="mb-8 md:mb-16 max-w-6xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-semibold text-neutral-800 mb-4 md:mb-6">参赛形式</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(competitionForms).map(([key, form]) => (
              <div key={key} className="bg-white rounded-2xl p-6 border border-neutral-100 hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    {form.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800">{form.title}</h3>
                    <p className="text-xs text-neutral-500">{form.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-600 mb-4 leading-relaxed">{form.description}</p>
                <div className="flex flex-wrap gap-2">
                  {form.tags.map((tag, index) => (
                    <span key={index} className="px-2.5 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 md:mb-16 max-w-6xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-semibold text-neutral-800 mb-4 md:mb-6">参赛指南</h2>
          <div className="space-y-4">
            {[
              { step: '01', title: '注册账号', desc: '在平台上注册个人账号，填写基本信息' },
              { step: '02', title: '选择赛事', desc: '浏览并选择感兴趣的赛事和赛道' },
              { step: '03', title: '组建团队', desc: '个人参赛或创建/加入团队（2-5人）' },
              { step: '04', title: '提交作品', desc: '在规定时间内完成并提交作品' },
              { step: '05', title: '等待评审', desc: '作品进入评审阶段，等待结果公布' }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-5 border border-neutral-100 flex items-start gap-4 hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">{item.step}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-neutral-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </>
      )}
    </div>
  );
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default CompetitionCenter;
