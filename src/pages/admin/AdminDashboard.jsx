import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CARD_STYLES, 
  STATUS_COLORS, 
  BUTTON_STYLES, 
  SPACING, 
  TYPOGRAPHY 
} from '../../styles/admin-theme';

// TODO: 接入后台首页统计接口
// TODO: 接入最近动态接口

// 统一状态标签组件
const StatusTag = ({ status, color = 'success' }) => {
  const colors = STATUS_COLORS[color] || STATUS_COLORS.success;
  return (
    <span className={`inline-flex px-3 py-1.5 text-xs font-medium rounded-full ${colors.bg} ${colors.text}`}>
      {status}
    </span>
  );
};

const AdminDashboard = () => {
  // Mock 数据 - 核心数据概览
  const statsData = {
    todayEnrollments: { value: 28, change: '+12%', trend: 'up' },
    pendingEnrollments: { value: 12, tip: '请尽快处理' },
    submittedWorks: { value: 86, tip: '当前赛事累计提交' },
    pendingReviews: { value: 18, tip: '待分配或待评分' }
  };

  // Mock 数据 - 赛事状态
  const competitionStatus = {
    name: '2024年梧桐·鸿鹄人工智能应用创新大赛',
    currentPhase: '报名审核阶段',
    enrollmentDeadline: '2024-12-31 23:59',
    submissionDeadline: '2025-01-15 23:59',
    trackCount: 4,
    totalEnrollments: 156,
    status: '报名中'
  };

  // Mock 数据 - 快捷操作
  const quickActions = [
    {
      title: '赛事管理',
      desc: '管理赛事信息与阶段',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      path: '/admin/competitions',
      color: 'bg-blue-500'
    },
    {
      title: '报名审核',
      desc: '审核参赛报名申请',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      path: '/admin/enrollments',
      color: 'bg-orange-500'
    },
    {
      title: '作品管理',
      desc: '查看与管理参赛作品',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      path: '/admin/works',
      color: 'bg-purple-500'
    },
    {
      title: '新闻管理',
      desc: '发布与管理赛事新闻',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      path: '/admin/news',
      color: 'bg-teal-500'
    }
  ];

  // Mock 数据 - 最近动态
  const recentActivities = [
    { type: '报名', content: '张明提交了团队报名申请', time: '10分钟前', typeColor: 'bg-blue-100 text-blue-700' },
    { type: '作品', content: 'AI创新先锋队提交了作品 V1.2', time: '30分钟前', typeColor: 'bg-purple-100 text-purple-700' },
    { type: '新闻', content: '新闻《赛事正式启动》已发布', time: '1小时前', typeColor: 'bg-teal-100 text-teal-700' },
    { type: '团队', content: '有 3 条团队加入申请待处理', time: '2小时前', typeColor: 'bg-orange-100 text-orange-700' }
  ];

  // Mock 数据 - 运营提醒
  const reminders = [
    { content: '当前有 12 个报名待审核', priority: 'high', color: 'error' },
    { content: '当前有 18 个作品待评审', priority: 'medium', color: 'pending' },
    { content: '距离作品截止还有 6 天', priority: 'normal', color: 'processing' }
  ];

  return (
    <div className={SPACING.sectionLarge}>
      {/* 1. 顶部欢迎与概览说明 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={TYPOGRAPHY.pageTitle}>后台首页</h2>
          <p className={TYPOGRAPHY.pageSubtitle}>赛事运营总览与快捷操作</p>
        </div>
        <StatusTag status="当前赛事进行中" color="success" />
      </div>

      {/* 2. 核心数据概览卡片区 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 卡片1：今日新增报名 */}
        <div className={`${CARD_STYLES.base} ${CARD_STYLES.padding}`}>
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_COLORS.success.bg} ${STATUS_COLORS.success.text}`}>
              {statsData.todayEnrollments.change}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-800">{statsData.todayEnrollments.value}</p>
            <p className={TYPOGRAPHY.helper}>今日新增报名</p>
          </div>
        </div>

        {/* 卡片2：待审核报名 */}
        <div className={`${CARD_STYLES.base} ${CARD_STYLES.padding}`}>
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-800">{statsData.pendingEnrollments.value}</p>
            <p className={TYPOGRAPHY.helper}>待审核报名</p>
            <p className={`${TYPOGRAPHY.helper} ${STATUS_COLORS.pending.text} mt-1`}>{statsData.pendingEnrollments.tip}</p>
          </div>
        </div>

        {/* 卡片3：已提交作品 */}
        <div className={`${CARD_STYLES.base} ${CARD_STYLES.padding}`}>
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 bg-purple-50 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-800">{statsData.submittedWorks.value}</p>
            <p className={TYPOGRAPHY.helper}>已提交作品</p>
            <p className={`${TYPOGRAPHY.helper} mt-1`}>{statsData.submittedWorks.tip}</p>
          </div>
        </div>

        {/* 卡片4：待评审作品 */}
        <div className={`${CARD_STYLES.base} ${CARD_STYLES.padding}`}>
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-800">{statsData.pendingReviews.value}</p>
            <p className={TYPOGRAPHY.helper}>待评审作品</p>
            <p className={`${TYPOGRAPHY.helper} ${STATUS_COLORS.pending.text} mt-1`}>{statsData.pendingReviews.tip}</p>
          </div>
        </div>
      </div>

      {/* 3. 赛事状态概览模块 + 运营提醒 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 赛事状态概览 */}
        <div className={`lg:col-span-2 ${CARD_STYLES.base} ${CARD_STYLES.paddingLarge}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={TYPOGRAPHY.sectionTitle}>赛事状态概览</h3>
            <StatusTag status={competitionStatus.status} color="success" />
          </div>
          
          <div className="space-y-4">
            {/* 赛事名称 */}
            <div className="pb-4 border-b border-gray-100">
              <p className="text-sm text-gray-800 font-medium">{competitionStatus.name}</p>
            </div>
            
            {/* 信息列表 */}
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-6">
                <span className="text-xs text-gray-500 w-20">当前阶段</span>
                <span className="text-sm text-gray-800">{competitionStatus.currentPhase}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xs text-gray-500 w-20">赛道数量</span>
                <span className="text-sm text-gray-800">{competitionStatus.trackCount} 个赛道</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xs text-gray-500 w-20">报名截止</span>
                <span className="text-sm text-gray-800">{competitionStatus.enrollmentDeadline}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xs text-gray-500 w-20">作品截止</span>
                <span className="text-sm text-gray-800">{competitionStatus.submissionDeadline}</span>
              </div>
            </div>
            
            {/* 报名人数 */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-6">
                <span className="text-xs text-gray-500">当前报名人数</span>
                <span className="text-xl font-bold text-primary">{competitionStatus.totalEnrollments}</span>
              </div>
              <Link 
                to="/admin/competitions" 
                className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
              >
                查看详情
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* 运营提醒模块 */}
        <div className={`${CARD_STYLES.base} ${CARD_STYLES.paddingLarge}`}>
          <h3 className={`${TYPOGRAPHY.sectionTitle} ${SPACING.titleContentLarge}`}>运营提醒</h3>
          <div className="divide-y divide-gray-100">
            {reminders.map((reminder, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${STATUS_COLORS[reminder.color].bg}`}>
                  <svg className={`w-5 h-5 ${STATUS_COLORS[reminder.color].text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <p className={TYPOGRAPHY.body}>{reminder.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. 快捷操作区 */}
      <div>
        <h3 className={`${TYPOGRAPHY.sectionTitle} ${SPACING.titleContentLarge}`}>快捷操作</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.path}
              className={`${CARD_STYLES.base} ${CARD_STYLES.padding} ${CARD_STYLES.hover}`}
            >
              <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-105 transition-transform`}>
                {action.icon}
              </div>
              <h4 className={TYPOGRAPHY.cardTitle}>
                {action.title}
              </h4>
              <p className={`${TYPOGRAPHY.helper} mt-2`}>{action.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* 5. 最近动态模块 */}
      <div className={`${CARD_STYLES.base} ${CARD_STYLES.paddingLarge}`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={TYPOGRAPHY.sectionTitle}>最近动态</h3>
          <button className={BUTTON_STYLES.secondary}>
            查看全部
          </button>
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-4">
                <span className={`px-2.5 py-1 text-xs font-medium rounded ${activity.typeColor}`}>
                  {activity.type}
                </span>
                <p className={TYPOGRAPHY.body}>{activity.content}</p>
              </div>
              <span className={TYPOGRAPHY.helper}>{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
