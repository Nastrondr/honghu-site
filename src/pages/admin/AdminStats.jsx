import React, { useState, useEffect, useMemo } from 'react';
import { request } from '../../lib/api';
import {
  CARD_STYLES,
  SPACING,
  TYPOGRAPHY,
  BUTTON_STYLES,
  FORM_STYLES,
} from '../../styles/admin-theme';

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

// ==================== 核心指标卡片组件 ====================
const OverviewCard = ({ title, value, trend, trendUp, icon, color, loading }) => {
  if (loading) {
    return (
      <div className={`${CARD_STYLES.base} ${CARD_STYLES.padding}`}>
        <div className="animate-pulse">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="w-11 h-11 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${CARD_STYLES.base} ${CARD_STYLES.padding} ${CARD_STYLES.hover}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`${TYPOGRAPHY.label} mb-2`}>{title}</p>
          <div className="flex items-baseline gap-3">
            <p className={TYPOGRAPHY.statNumber}>{value?.toLocaleString?.() || value || 0}</p>
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
const LineChart = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="h-52 flex items-center justify-center">
        <div className="animate-pulse bg-gray-200 rounded-lg w-full h-full"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-52 flex items-center justify-center text-gray-400">
        暂无数据
      </div>
    );
  }

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
const BarChart = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="h-44 flex items-center justify-center">
        <div className="animate-pulse bg-gray-200 rounded-lg w-full h-full"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-44 flex items-center justify-center text-gray-400">
        暂无数据
      </div>
    );
  }

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
const PieChart = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center gap-6">
        <div className="w-36 h-36 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="space-y-2 flex-1">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-36 text-gray-400">
        暂无数据
      </div>
    );
  }

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

// ==================== 排行榜组件 ====================
const RankingList = ({ title, data, icon, loading }) => {
  if (loading) {
    return (
      <div className={`${CARD_STYLES.base} ${CARD_STYLES.padding} h-full flex flex-col`}>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-8 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${CARD_STYLES.base} ${CARD_STYLES.padding} h-full flex flex-col`}>
      <div className="flex items-center gap-2 mb-5">
        {icon}
        <h3 className={TYPOGRAPHY.cardTitle}>{title}</h3>
      </div>
      <div className="space-y-1 flex-1">
        {(!data || data.length === 0) ? (
          <div className="text-center py-8 text-gray-400">暂无数据</div>
        ) : (
          data.map((item, index) => (
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
          ))
        )}
      </div>
    </div>
  );
};

// ==================== 数据导出卡片 ====================
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

// ==================== API 联调区组件 ====================
const ApiDebugPanel = ({ apiStatus }) => {
  if (process.env.NODE_ENV !== 'development') return null;

  const endpoints = [
    { key: 'overview', name: 'Overview', url: 'GET /v1/admin/stats/overview' },
    { key: 'works', name: 'Works', url: 'GET /v1/admin/stats/works' },
    { key: 'reviews', name: 'Reviews', url: 'GET /v1/admin/stats/reviews' },
    { key: 'enrollments', name: 'Enrollments', url: 'GET /v1/admin/stats/enrollments' },
  ];

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-blue-700">API 联调信息</h3>
        <span className="text-xs text-blue-500">开发环境可见</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {endpoints.map(({ key, name, url }) => (
          <div key={key} className="bg-white rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">{name}</p>
            <p className="font-mono text-xs text-gray-800 truncate">{url}</p>
            <p className={`text-xs font-semibold mt-1 ${
              apiStatus[key] === 200 ? 'text-green-600' : 
              apiStatus[key] === 'error' ? 'text-red-600' : 
              apiStatus[key] === 'loading' ? 'text-blue-600' : 'text-gray-400'
            }`}>
              {apiStatus[key] === 'loading' ? '加载中...' : 
               apiStatus[key] === 'error' ? '错误' : 
               apiStatus[key] || '-'}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Users</p>
          <p className="text-sm font-semibold text-gray-800">{apiStatus.data?.overview?.users ?? '-'}</p>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Competitions</p>
          <p className="text-sm font-semibold text-gray-800">{apiStatus.data?.overview?.competitions ?? '-'}</p>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Works</p>
          <p className="text-sm font-semibold text-gray-800">{apiStatus.data?.overview?.works ?? '-'}</p>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Assignments</p>
          <p className="text-sm font-semibold text-gray-800">{apiStatus.data?.overview?.assignments ?? '-'}</p>
        </div>
      </div>
    </div>
  );
};

// ==================== 主组件 ====================
const AdminStats = () => {
  const [selectedCompetition, setSelectedCompetition] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [error, setError] = useState(null);

  // 统计数据状态
  const [statsData, setStatsData] = useState({
    overview: null,
    works: null,
    reviews: null,
    enrollments: null,
    enrollmentTrend: [],
    trackDistribution: [],
    statusDistribution: [],
    topTracks: [],
    activeTeams: []
  });

  // API 状态追踪
  const [apiStatus, setApiStatus] = useState({
    overview: '-',
    works: '-',
    reviews: '-',
    enrollments: '-',
    data: {}
  });

  // 赛事列表
  const [competitions, setCompetitions] = useState([]);

  // 显示Toast
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // 获取统计数据
  const fetchStats = async () => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (selectedCompetition !== 'all') params.append('competitionId', selectedCompetition);
    const queryString = params.toString() ? `?${params.toString()}` : '';

    try {
      // 并行请求所有统计数据，每个请求独立处理错误
      const [overviewRes, worksRes, reviewsRes, enrollmentsRes] = await Promise.allSettled([
        request(`/v1/admin/stats/overview${queryString}`),
        request(`/v1/admin/stats/works${queryString}`),
        request(`/v1/admin/stats/reviews${queryString}`),
        request(`/v1/admin/stats/enrollments${queryString}`)
      ]);

      // 处理每个响应，即使失败也不影响其他请求
      const overview = overviewRes.status === 'fulfilled' ? overviewRes.value : { ok: false, status: 500 };
      const works = worksRes.status === 'fulfilled' ? worksRes.value : { ok: false, status: 500 };
      const reviews = reviewsRes.status === 'fulfilled' ? reviewsRes.value : { ok: false, status: 500 };
      const enrollments = enrollmentsRes.status === 'fulfilled' ? enrollmentsRes.value : { ok: false, status: 500 };

      // 更新 API 状态
      setApiStatus({
        overview: overview.ok ? overview.status : 'error',
        works: works.ok ? works.status : 'error',
        reviews: reviews.ok ? reviews.status : 'error',
        enrollments: enrollments.ok ? enrollments.status : 'error',
        data: {
          overview: overview.ok && overview.data?.code === 0 ? overview.data.data : null
        }
      });

      // 处理 overview 数据
      let overviewData = null;
      if (overview.ok && overview.data?.code === 0) {
        overviewData = overview.data.data;
      }

      // 处理 works 数据
      let worksData = null;
      let trackDistribution = [];
      let statusDistribution = [];
      let topTracks = [];
      if (works.ok && works.data?.code === 0) {
        worksData = works.data.data;
        
        // 转换赛道分布数据
        if (worksData.byTrack) {
          const colors = ['bg-blue-500', 'bg-green-500', 'bg-amber-500', 'bg-purple-500', 'bg-gray-400'];
          trackDistribution = Object.entries(worksData.byTrack).map(([name, count], index) => ({
            name,
            count,
            color: colors[index % colors.length]
          }));
          topTracks = trackDistribution
            .sort((a, b) => b.count - a.count)
            .slice(0, 5)
            .map(item => ({ name: item.name, count: item.count }));
        }

        // 转换状态分布数据
        if (worksData.byStatus) {
          const statusColors = {
            'draft': 'bg-gray-400',
            'submitted': 'bg-blue-500',
            'reviewing': 'bg-purple-500',
            'completed': 'bg-green-500',
            'pending': 'bg-orange-500'
          };
          const statusNames = {
            'draft': '草稿',
            'submitted': '已提交',
            'reviewing': '评审中',
            'completed': '已完成',
            'pending': '待审核'
          };
          statusDistribution = Object.entries(worksData.byStatus).map(([status, count]) => ({
            name: statusNames[status] || status,
            count,
            color: statusColors[status] || 'bg-gray-400'
          }));
        }
      }

      // 处理 reviews 数据
      let reviewsData = null;
      if (reviews.ok && reviews.data?.code === 0) {
        reviewsData = reviews.data.data;
      }

      // 处理 enrollments 数据
      let enrollmentsData = null;
      if (enrollments.ok && enrollments.data?.code === 0) {
        enrollmentsData = enrollments.data.data;
      }

      // 报名趋势数据 - 仅使用后端返回的真实数据
      const enrollmentTrend = overviewData?.trend || [];

      // 活跃团队数据 - 仅使用后端返回的真实数据
      const activeTeams = worksData?.activeTeams || [];

      setStatsData({
        overview: overviewData,
        works: worksData,
        reviews: reviewsData,
        enrollments: enrollmentsData,
        enrollmentTrend,
        trackDistribution,
        statusDistribution,
        topTracks,
        activeTeams
      });

    } catch (err) {
      console.error('Fetch stats error:', err);
      setError('获取统计数据失败');
      setApiStatus(prev => ({ ...prev, overview: 'error', works: 'error', reviews: 'error', enrollments: 'error' }));
    } finally {
      setLoading(false);
    }
  };

  // 获取赛事列表
  const fetchCompetitions = async () => {
    try {
      const result = await request('/v1/competitions');
      if (result.ok && result.data?.code === 0) {
        setCompetitions(result.data.data || []);
      }
    } catch (err) {
      console.error('Fetch competitions error:', err);
    }
  };

  // 初始加载
  useEffect(() => {
    fetchCompetitions();
    fetchStats();
  }, []);

  // 筛选条件变化时重新加载
  useEffect(() => {
    fetchStats();
  }, [selectedCompetition, timeRange]);

  // 处理数据导出
  const handleExport = async (type, title) => {
    setLoading(true);
    try {
      // 模拟导出请求
      await new Promise(resolve => setTimeout(resolve, 500));
      showToast(`${title}成功`, 'success');
      console.log(`导出数据类型: ${type}`);
    } catch (err) {
      showToast('导出失败', 'error');
    } finally {
      setLoading(false);
    }
  };

  // 核心指标数据
  const overviewCards = useMemo(() => {
    const overview = statsData.overview;
    const works = statsData.works;
    const reviews = statsData.reviews;
    const enrollments = statsData.enrollments;

    return [
      {
        title: '赛事总数',
        value: overview?.competitions || 0,
        trend: overview?.trends?.competitions || '+0%',
        trendUp: (overview?.trends?.competitions || '+0%').startsWith('+'),
        color: 'bg-green-50',
        icon: (
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        )
      },
      {
        title: '报名总数',
        value: enrollments?.total || overview?.enrollments || 0,
        trend: overview?.trends?.enrollments || '+0%',
        trendUp: (overview?.trends?.enrollments || '+0%').startsWith('+'),
        color: 'bg-blue-50',
        icon: (
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      },
      {
        title: '作品总数',
        value: works?.total || overview?.works || 0,
        trend: overview?.trends?.works || '+0%',
        trendUp: (overview?.trends?.works || '+0%').startsWith('+'),
        color: 'bg-purple-50',
        icon: (
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        )
      },
      {
        title: '待评审',
        value: reviews?.pending || overview?.assignments - overview?.submittedReviews || 0,
        trend: overview?.trends?.assignments || '+0%',
        trendUp: (overview?.trends?.assignments || '+0%').startsWith('+'),
        color: 'bg-orange-50',
        icon: (
          <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        )
      }
    ];
  }, [statsData]);

  if (error) {
    return (
      <div className={`${SPACING.section} pb-8`}>
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={fetchStats} 
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
      {/* Toast 通知 */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* 页面标题区 */}
      <div>
        <h2 className={TYPOGRAPHY.pageTitle}>统计分析</h2>
        <p className={TYPOGRAPHY.pageSubtitle}>查看赛事数据概览与导出业务数据</p>
      </div>

      {/* API 联调区 */}
      <ApiDebugPanel apiStatus={apiStatus} />

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
            {competitions.map((comp) => (
              <option key={comp.id} value={comp.id}>{comp.name}</option>
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
          <OverviewCard key={index} {...card} loading={loading} />
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
          <LineChart data={statsData.enrollmentTrend} loading={loading} />
        </div>

        {/* 赛道分布 */}
        <div className={`${CARD_STYLES.base} ${CARD_STYLES.padding}`}>
          <h3 className={`${TYPOGRAPHY.cardTitle} mb-4`}>赛道分布</h3>
          <PieChart data={statsData.trackDistribution} loading={loading} />
        </div>
      </div>

      {/* 状态分布 + 排行榜 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 状态分布 */}
        <div className={`${CARD_STYLES.base} ${CARD_STYLES.padding}`}>
          <h3 className={`${TYPOGRAPHY.cardTitle} mb-2`}>作品状态分布</h3>
          <BarChart data={statsData.statusDistribution} loading={loading} />
        </div>

        {/* 热门赛道 */}
        <RankingList
          title="热门赛道"
          data={statsData.topTracks}
          icon={
            <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
          }
          loading={loading}
        />

        {/* 活跃团队 */}
        <RankingList
          title="活跃团队"
          data={statsData.activeTeams}
          icon={
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          }
          loading={loading}
        />
      </div>

      {/* 数据导出模块 */}
      <ExportCard onExport={handleExport} loading={loading} />
    </div>
  );
};

export default AdminStats;
