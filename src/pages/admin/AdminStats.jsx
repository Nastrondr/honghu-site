import React, { useState, useMemo } from 'react';
import {
  CARD_STYLES,
  SPACING,
  TYPOGRAPHY,
  BUTTON_STYLES,
  FORM_STYLES,
  getStatusTagClass
} from '../../styles/admin-theme';

// TODO: 接入统计数据接口
// TODO: 接入导出接口

// ==================== Toast 组件 ====================
const Toast = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-primary';

  return (
    <div className={`fixed top-6 right-6 ${bgColor} text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in`}>
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

// ==================== Mock 数据 ====================
const mockStatsData = {
  // 核心指标
  overview: {
    totalEnrollments: 1256,
    totalWorks: 892,
    pendingEnrollments: 45,
    reviewingWorks: 128,
    trends: {
      enrollments: '+12%',
      works: '+8%',
      pending: '-5%',
      reviewing: '+15%'
    }
  },

  // 报名趋势（最近7天）
  enrollmentTrend: [
    { date: '12-14', count: 45 },
    { date: '12-15', count: 62 },
    { date: '12-16', count: 38 },
    { date: '12-17', count: 85 },
    { date: '12-18', count: 72 },
    { date: '12-19', count: 96 },
    { date: '12-20', count: 68 }
  ],

  // 赛道分布
  trackDistribution: [
    { name: 'AI应用创新', count: 456, color: 'bg-blue-500' },
    { name: 'AI医疗', count: 234, color: 'bg-green-500' },
    { name: 'AI教育', count: 189, color: 'bg-amber-500' },
    { name: 'AI金融', count: 156, color: 'bg-purple-500' },
    { name: '其他', count: 98, color: 'bg-gray-400' }
  ],

  // 状态分布
  statusDistribution: [
    { name: '草稿', count: 156, color: 'bg-gray-400' },
    { name: '已提交', count: 892, color: 'bg-blue-500' },
    { name: '评审中', count: 128, color: 'bg-purple-500' },
    { name: '已完成', count: 234, color: 'bg-green-500' }
  ],

  // 热门赛道排行
  topTracks: [
    { name: 'AI应用创新赛道', count: 456 },
    { name: 'AI医疗赛道', count: 234 },
    { name: 'AI教育赛道', count: 189 },
    { name: 'AI金融赛道', count: 156 },
    { name: 'AI制造赛道', count: 98 }
  ],

  // 活跃团队排行
  activeTeams: [
    { name: 'AI创新先锋队', count: 5 },
    { name: '智慧医疗小组', count: 4 },
    { name: '未来教育实验室', count: 4 },
    { name: '金融科技团队', count: 3 },
    { name: '智能制造研究所', count: 3 }
  ]
};

// 赛事列表
const competitions = [
  '2024年梧桐·鸿鹄人工智能应用创新大赛',
  '2024年海淀区区县赛',
  '2024年北京大学校园赛',
  '2024年清华大学校园赛'
];

// ==================== 核心指标卡片组件（优化版）====================
const OverviewCard = ({ title, value, trend, trendUp, icon, color }) => {
  return (
    <div className={`${CARD_STYLES.base} ${CARD_STYLES.padding} ${CARD_STYLES.hover}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`${TYPOGRAPHY.label} mb-2`}>{title}</p>
          <div className="flex items-baseline gap-3">
            <p className={TYPOGRAPHY.statNumber}>{value.toLocaleString()}</p>
            {trend && (
              <span className={trendUp ? TYPOGRAPHY.trendUp : TYPOGRAPHY.trendDown}>
                {trendUp ? '↑' : '↓'} {trend}
              </span>
            )}
          </div>
        </div>
        <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// ==================== 折线图组件（报名趋势）====================
const LineChart = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.count));
  const minValue = Math.min(...data.map(d => d.count));
  const range = maxValue - minValue || 1;

  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((item.count - minValue) / range) * 80 - 10;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="h-52 relative pt-6 pb-8">
      {/* Y轴网格线 */}
      <div className="absolute inset-x-0 top-6 bottom-8 flex flex-col justify-between text-xs text-gray-400 pointer-events-none">
        <div className="border-b border-gray-100 pb-1">{maxValue}</div>
        <div className="border-b border-gray-100 pb-1">{Math.round((maxValue + minValue) / 2)}</div>
        <div className="border-b border-gray-100 pb-1">{minValue}</div>
      </div>

      {/* 折线图 */}
      <svg className="absolute inset-x-0 top-6 bottom-8 w-full h-full" preserveAspectRatio="none">
        <polygon
          points={`0,100 ${points} 100,100`}
          fill="rgba(99, 102, 241, 0.08)"
        />
        <polyline
          points={points}
          fill="none"
          stroke="#6366f1"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - ((item.count - minValue) / range) * 80 - 10;
          return (
            <circle
              key={index}
              cx={`${x}%`}
              cy={`${y}%`}
              r="5"
              fill="#6366f1"
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      {/* X轴标签 */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
        {data.map((item, index) => (
          <span key={index}>{item.date}</span>
        ))}
      </div>
    </div>
  );
};

// ==================== 柱状图组件 ====================
const BarChart = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.count));

  return (
    <div className="flex items-end justify-around h-44 gap-3 pt-4">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center gap-2 flex-1">
          <div className="w-full bg-gray-100 rounded-t-xl relative" style={{ height: '120px' }}>
            <div
              className={`absolute bottom-0 w-full ${item.color} rounded-t-xl transition-all duration-500`}
              style={{ height: `${(item.count / maxValue) * 100}%` }}
            />
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-gray-700">
              {item.count}
            </span>
          </div>
          <span className="text-xs text-gray-500 text-center truncate w-full">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

// ==================== 饼图组件（赛道分布）====================
const PieChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  let currentAngle = 0;

  return (
    <div className="flex items-center gap-6">
      <div className="relative w-36 h-36 flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {data.map((item, index) => {
            const angle = (item.count / total) * 360;
            const startAngle = currentAngle;
            currentAngle += angle;
            const endAngle = currentAngle;

            const x1 = 50 + 38 * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 50 + 38 * Math.sin((startAngle * Math.PI) / 180);
            const x2 = 50 + 38 * Math.cos((endAngle * Math.PI) / 180);
            const y2 = 50 + 38 * Math.sin((endAngle * Math.PI) / 180);

            const largeArc = angle > 180 ? 1 : 0;

            return (
              <path
                key={index}
                d={`M 50 50 L ${x1} ${y1} A 38 38 0 ${largeArc} 1 ${x2} ${y2} Z`}
                className={item.color}
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
          <circle cx="50" cy="50" r="22" fill="white" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-800">{total}</span>
        </div>
      </div>

      <div className="space-y-2 flex-1 min-w-0">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 min-w-0">
              <div className={`w-2.5 h-2.5 rounded-full ${item.color} flex-shrink-0`} />
              <span className="text-gray-600 truncate">{item.name}</span>
            </div>
            <span className="font-semibold text-gray-800 ml-2">{Math.round((item.count / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================== 排行榜组件（优化版）====================
const RankingList = ({ title, data, icon }) => {
  return (
    <div className={`${CARD_STYLES.base} ${CARD_STYLES.padding} h-full flex flex-col`}>
      <div className="flex items-center gap-2 mb-5">
        {icon}
        <h3 className={TYPOGRAPHY.cardTitle}>{title}</h3>
      </div>
      <div className="space-y-1 flex-1">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
            <div className="flex items-center gap-3 min-w-0">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                index < 3 ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'
              }`}>
                {index + 1}
              </span>
              <span className="text-sm text-gray-700 truncate" title={item.name}>{item.name}</span>
            </div>
            <span className="text-sm font-semibold text-primary ml-2">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================== 数据导出卡片（优化版）====================
const ExportCard = ({ onExport, loading }) => {
  const exportItems = [
    {
      key: 'enrollments',
      title: '导出报名数据',
      description: '包含所有报名团队信息、联系方式、报名状态',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'bg-blue-50 text-blue-600',
      borderColor: 'border-blue-200 hover:border-blue-300'
    },
    {
      key: 'works',
      title: '导出作品数据',
      description: '包含所有提交作品信息、所属赛道、作品状态',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: 'bg-green-50 text-green-600',
      borderColor: 'border-green-200 hover:border-green-300'
    },
    {
      key: 'reviews',
      title: '导出评审数据',
      description: '包含所有评审记录、评分结果、评委信息',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      color: 'bg-purple-50 text-purple-600',
      borderColor: 'border-purple-200 hover:border-purple-300'
    }
  ];

  return (
    <div className={`${CARD_STYLES.base} ${CARD_STYLES.padding}`}>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </div>
        <h3 className={TYPOGRAPHY.cardTitle}>数据导出</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exportItems.map((item) => (
          <div
            key={item.key}
            onClick={() => !loading && onExport(item.key, item.title)}
            className={`border rounded-xl p-5 cursor-pointer transition-all duration-300 group ${item.borderColor} hover:shadow-lg hover:-translate-y-1 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center transition-transform group-hover:scale-110`}>
                {item.icon}
              </div>
              <svg className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <h4 className="text-sm font-semibold text-gray-800 mb-1">{item.title}</h4>
            <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 p-4 bg-gray-50 rounded-xl">
        <p className="text-xs text-gray-500 flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          导出文件格式：CSV / Excel，数据为当前筛选条件下的结果
        </p>
      </div>
    </div>
  );
};

// ==================== 主组件 ====================
const AdminStats = () => {
  const [selectedCompetition, setSelectedCompetition] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // 显示Toast
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // 处理数据导出
  const handleExport = async (type, title) => {
    setLoading(true);
    // 模拟loading 0.5s
    await new Promise(resolve => setTimeout(resolve, 500));
    setLoading(false);
    showToast(`${title}成功`, 'success');
    console.log(`导出数据类型: ${type}`);
  };

  // 核心指标数据
  const overviewCards = [
    {
      title: '报名总数',
      value: mockStatsData.overview.totalEnrollments,
      trend: mockStatsData.overview.trends.enrollments,
      trendUp: mockStatsData.overview.trends.enrollments.startsWith('+'),
      color: 'bg-blue-50',
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: '作品总数',
      value: mockStatsData.overview.totalWorks,
      trend: mockStatsData.overview.trends.works,
      trendUp: mockStatsData.overview.trends.works.startsWith('+'),
      color: 'bg-green-50',
      icon: (
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: '待审核报名',
      value: mockStatsData.overview.pendingEnrollments,
      trend: mockStatsData.overview.trends.pending,
      trendUp: mockStatsData.overview.trends.pending.startsWith('+'),
      color: 'bg-orange-50',
      icon: (
        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: '评审中作品',
      value: mockStatsData.overview.reviewingWorks,
      trend: mockStatsData.overview.trends.reviewing,
      trendUp: mockStatsData.overview.trends.reviewing.startsWith('+'),
      color: 'bg-purple-50',
      icon: (
        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    }
  ];

  return (
    <div className={`${SPACING.section} pb-8`}>
      {/* Toast 通知 */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* 页面标题区 */}
      <div>
        <h2 className={TYPOGRAPHY.pageTitle}>统计分析</h2>
        <p className={TYPOGRAPHY.pageSubtitle}>查看赛事数据概览与导出业务数据</p>
      </div>

      {/* 筛选区 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <label className={TYPOGRAPHY.label}>选择赛事</label>
          <select
            value={selectedCompetition}
            onChange={(e) => setSelectedCompetition(e.target.value)}
            className={`mt-2 ${FORM_STYLES.select} min-w-[220px]`}
          >
            <option value="all">全部赛事</option>
            {competitions.map((comp, index) => (
              <option key={index} value={comp}>{comp}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={TYPOGRAPHY.label}>时间范围</label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className={`mt-2 ${FORM_STYLES.select} min-w-[140px]`}
          >
            <option value="7d">最近7天</option>
            <option value="30d">最近30天</option>
            <option value="90d">最近90天</option>
            <option value="all">全部时间</option>
          </select>
        </div>
      </div>

      {/* 核心指标卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {overviewCards.map((card, index) => (
          <OverviewCard key={index} {...card} />
        ))}
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 报名趋势 */}
        <div className={`${CARD_STYLES.base} ${CARD_STYLES.padding} lg:col-span-2`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className={TYPOGRAPHY.cardTitle}>报名趋势</h3>
            <span className={TYPOGRAPHY.helper}>最近7天</span>
          </div>
          <LineChart data={mockStatsData.enrollmentTrend} />
        </div>

        {/* 赛道分布 */}
        <div className={`${CARD_STYLES.base} ${CARD_STYLES.padding}`}>
          <h3 className={`${TYPOGRAPHY.cardTitle} mb-4`}>赛道分布</h3>
          <PieChart data={mockStatsData.trackDistribution} />
        </div>
      </div>

      {/* 状态分布 + 排行榜 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 状态分布 */}
        <div className={`${CARD_STYLES.base} ${CARD_STYLES.padding}`}>
          <h3 className={`${TYPOGRAPHY.cardTitle} mb-2`}>作品状态分布</h3>
          <BarChart data={mockStatsData.statusDistribution} />
        </div>

        {/* 热门赛道 */}
        <RankingList
          title="热门赛道"
          data={mockStatsData.topTracks}
          icon={
            <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
          }
        />

        {/* 活跃团队 */}
        <RankingList
          title="活跃团队"
          data={mockStatsData.activeTeams}
          icon={
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          }
        />
      </div>

      {/* 数据导出模块 */}
      <ExportCard onExport={handleExport} loading={loading} />
    </div>
  );
};

export default AdminStats;
