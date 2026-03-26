import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  // ========== 页面状态控制（MOCK数据）==========
  // TODO: 接入 dashboard 接口 - 替换为真实API数据
  const [enrollmentStatus, setEnrollmentStatus] = useState('approved'); // not_applied | pending_review | approved | rejected
  const [hasTeam, setHasTeam] = useState(true);
  const [workStatus, setWorkStatus] = useState('submitted'); // none | draft | submitted | under_review
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(3);
  const [currentStep, setCurrentStep] = useState(4); // 0-5 对应6个步骤

  // MOCK报名数据
  const mockEnrollment = {
    competitionName: '2024年梧桐·鸿鹄人工智能应用创新大赛',
    participationType: '团队参赛',
    track: '数字金融',
    enrollmentTime: '2024-11-01',
    rejectionReason: ''
  };

  // MOCK团队数据
  const mockTeam = {
    name: 'AI创新先锋队',
    captainName: '张明',
    currentMembers: 3,
    maxMembers: 5,
    status: '已报名'
  };

  // MOCK作品数据
  const mockWork = {
    title: '智能金融风控系统',
    version: 'V1.2',
    lastUpdateTime: '2024-11-15 14:30'
  };

  // MOCK通知数据
  const mockNotifications = [
    { id: 1, title: '您的报名已通过审核', content: '恭喜！您的参赛报名已通过审核，请尽快组建团队。', date: '2024-11-02', isRead: false, type: '报名' },
    { id: 2, title: '团队成员加入申请', content: '李华申请加入您的团队，是否同意？', date: '2024-11-10', isRead: false, type: '团队' },
    { id: 3, title: '作品提交成功', content: '您提交的作品 V1.2 已成功提交，等待评审。', date: '2024-11-15', isRead: true, type: '作品' }
  ];

  // 参赛进度步骤
  const progressSteps = [
    { name: '报名参赛', date: '4-5月' },
    { name: '审核通过', date: '5月' },
    { name: '组建团队', date: '5-6月' },
    { name: '获取资源', date: '6月' },
    { name: '提交作品', date: '7-8月' },
    { name: '查看结果', date: '9月' }
  ];

  // ========== 辅助函数 ==========

  // 获取报名状态颜色和文字
  const getEnrollmentStatusInfo = (status) => {
    switch (status) {
      case 'not_applied':
        return { color: 'bg-yellow-50 text-yellow-600 border border-yellow-200', text: '未报名' };
      case 'pending_review':
        return { color: 'bg-orange-50 text-orange-600 border border-orange-200', text: '待审核' };
      case 'approved':
        return { color: 'bg-green-50 text-green-600 border border-green-200', text: '已通过' };
      case 'rejected':
        return { color: 'bg-red-50 text-red-600 border border-red-200', text: '已驳回' };
      default:
        return { color: 'bg-gray-50 text-gray-600 border border-gray-200', text: status };
    }
  };

  // 获取作品状态颜色和文字
  const getWorkStatusInfo = (status) => {
    switch (status) {
      case 'none':
        return { color: 'text-gray-400', text: '未提交' };
      case 'draft':
        return { color: 'text-blue-500', text: '草稿' };
      case 'submitted':
        return { color: 'text-purple-500', text: '已提交' };
      case 'under_review':
        return { color: 'text-orange-500', text: '评审中' };
      default:
        return { color: 'text-gray-400', text: status };
    }
  };

  // ========== 未登录状态 ==========
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 animate-fadeIn">
        <div className="max-w-lg mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-sm p-12 border border-gray-100">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">请先登录</h2>
            <p className="text-gray-500 mb-8">登录后可查看个人参赛状态</p>
            <div className="flex justify-center gap-3">
              <Link to="/login" className="bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">
                登录
              </Link>
              <Link to="/register" className="border border-gray-200 text-gray-600 px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                注册
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========== 主页面 ==========
  return (
    <div className="min-h-screen bg-gray-50/50 py-8 animate-fadeIn">
      <div className="max-w-6xl mx-auto px-4">

        {/* ========== 第一层：顶部欢迎区（精简）========== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center gap-4">
              {/* 用户头像 */}
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-white text-lg font-bold">
                  {user?.name?.[0] || user?.phone?.[0] || user?.phoneOrEmail?.[0] || '参'}
                </span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">
                  {user?.name || user?.phone || user?.phoneOrEmail || '参赛选手'}
                </h1>
                <p className="text-sm text-gray-400">继续完成你的参赛流程</p>
              </div>
            </div>
            {/* 状态徽章 - 突出显示 */}
            <div className={`mt-4 md:mt-0 px-5 py-2.5 rounded-full text-sm font-semibold ${getEnrollmentStatusInfo(enrollmentStatus).color}`}>
              {getEnrollmentStatusInfo(enrollmentStatus).text}
            </div>
          </div>
        </div>

        {/* ========== 第二层：参赛进度（主视觉区）========== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-base font-semibold text-gray-500 mb-8">参赛进度</h2>

          <div className="flex items-start justify-between relative">
            {/* 进度连接线 */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-100 -z-0" style={{ marginLeft: '20px', marginRight: '20px' }}></div>
            <div className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-primary to-primary/40 -z-0" style={{ width: `${(currentStep / (progressSteps.length - 1)) * 100}%`, marginLeft: '20px', marginRight: '20px', maxWidth: 'calc(100% - 40px)' }}></div>

            {progressSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center relative z-10">
                {/* 步骤圆点 */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index < currentStep
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : index === currentStep
                      ? 'bg-white text-primary border-2 border-primary shadow-lg shadow-primary/20 scale-110'
                      : 'bg-white text-gray-300 border-2 border-gray-200'
                  }`}
                >
                  {index < currentStep ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
                {/* 步骤文字 */}
                <div className="mt-3 text-center">
                  <p className={`text-sm font-medium ${index <= currentStep ? 'text-gray-800' : 'text-gray-400'}`}>
                    {step.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========== 第三层：4个概览卡片（轻量）========== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {/* 我的报名 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer">
            <Link to="/register-competition" className="block">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-500">我的报名</span>
              </div>
              <p className={`text-xl font-bold ${enrollmentStatus === 'not_applied' ? 'text-yellow-500' : 'text-green-500'}`}>
                {getEnrollmentStatusInfo(enrollmentStatus).text}
              </p>
            </Link>
          </div>

          {/* 我的团队 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer">
            <Link to="/team-hall" className="block">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-500">我的团队</span>
              </div>
              <p className={`text-xl font-bold ${hasTeam ? 'text-green-500' : 'text-yellow-500'}`}>
                {hasTeam ? '已加入' : '未加入'}
              </p>
            </Link>
          </div>

          {/* 我的作品 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer">
            <Link to="/work-submission" className="block">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-500">我的作品</span>
              </div>
              <p className={`text-xl font-bold ${getWorkStatusInfo(workStatus).color}`}>
                {getWorkStatusInfo(workStatus).text}
              </p>
            </Link>
          </div>

          {/* 我的通知 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="block">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-500">我的通知</span>
              </div>
              <p className="text-xl font-bold text-orange-500">
                {unreadNotificationCount}
                <span className="text-sm font-normal text-gray-400"> 条未读</span>
              </p>
            </div>
          </div>
        </div>

        {/* ========== 第四层：详细信息区（三列布局）========== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* 我的报名详情 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">我的报名</h3>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getEnrollmentStatusInfo(enrollmentStatus).color}`}>
                {getEnrollmentStatusInfo(enrollmentStatus).text}
              </span>
            </div>

            {enrollmentStatus === 'not_applied' ? (
              <div className="text-center py-6">
                <p className="text-gray-400 text-sm mb-3">您还没有报名参赛</p>
                <Link to="/register-competition" className="text-sm bg-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  立即报名
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="pb-3 border-b border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">赛事名称</p>
                  <p className="text-sm text-gray-700 font-medium truncate">{mockEnrollment.competitionName}</p>
                </div>
                <div className="pb-3 border-b border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">参赛方式 · 赛道</p>
                  <p className="text-sm text-gray-700">{mockEnrollment.participationType} · {mockEnrollment.track}</p>
                </div>
                <div className="pb-3 border-b border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">报名时间</p>
                  <p className="text-sm text-gray-700">{mockEnrollment.enrollmentTime}</p>
                </div>
                {enrollmentStatus === 'rejected' && (
                  <div className="pt-2">
                    <p className="text-xs text-red-500 mb-1">驳回原因</p>
                    <p className="text-sm text-red-600">{mockEnrollment.rejectionReason || '材料不符合要求'}</p>
                  </div>
                )}
                <Link to="/register-competition" className="block text-center text-sm text-primary hover:underline pt-2">
                  {enrollmentStatus === 'rejected' ? '补充材料' : '查看详情'}
                </Link>
              </div>
            )}
          </div>

          {/* 我的团队详情 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">我的团队</h3>
              {hasTeam && (
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
                  {mockTeam.status}
                </span>
              )}
            </div>

            {!hasTeam ? (
              <div className="text-center py-6">
                <p className="text-gray-400 text-sm mb-3">您还没有加入团队</p>
                <Link to="/team-hall" className="text-sm bg-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  创建/加入团队
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="pb-3 border-b border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">团队名称</p>
                  <p className="text-sm text-gray-700 font-medium">{mockTeam.name}</p>
                </div>
                <div className="pb-3 border-b border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">队长 · 成员</p>
                  <p className="text-sm text-gray-700">{mockTeam.captainName} · {mockTeam.currentMembers}/{mockTeam.maxMembers}人</p>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                    <span>成员进度</span>
                    <span>{Math.round((mockTeam.currentMembers / mockTeam.maxMembers) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: `${(mockTeam.currentMembers / mockTeam.maxMembers) * 100}%` }}></div>
                  </div>
                </div>
                <Link to="/team-hall" className="block text-center text-sm text-primary hover:underline pt-2">
                  前往团队大厅
                </Link>
              </div>
            )}
          </div>

          {/* 我的作品详情 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">我的作品</h3>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${workStatus === 'none' ? 'bg-gray-100 text-gray-500' : workStatus === 'draft' ? 'bg-blue-50 text-blue-600' : workStatus === 'submitted' ? 'bg-purple-50 text-purple-600' : 'bg-orange-50 text-orange-600'}`}>
                {getWorkStatusInfo(workStatus).text}
              </span>
            </div>

            {workStatus === 'none' ? (
              <div className="text-center py-6">
                <p className="text-gray-400 text-sm mb-3">您还没有提交作品</p>
                <Link to="/work-submission" className="text-sm bg-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  提交作品
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="pb-3 border-b border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">作品名称</p>
                  <p className="text-sm text-gray-700 font-medium truncate">{mockWork.title}</p>
                </div>
                <div className="pb-3 border-b border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">当前版本</p>
                  <p className="text-sm text-gray-700">{mockWork.version}</p>
                </div>
                <div className="pt-2">
                  <p className="text-xs text-gray-400 mb-1">最近更新</p>
                  <p className="text-sm text-gray-700">{mockWork.lastUpdateTime}</p>
                </div>
                <Link to="/work-submission" className="block text-center text-sm text-primary hover:underline pt-2">
                  {workStatus === 'draft' ? '继续编辑' : '查看详情'}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ========== 第五层：通知列表 ========== */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">我的通知</h3>
            <button className="text-sm text-primary hover:underline">查看全部</button>
          </div>
          <div className="space-y-2">
            {mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-xl flex items-start justify-between ${notification.isRead ? 'bg-gray-50/50' : 'bg-blue-50/30'}`}
              >
                <div className="flex items-start flex-1">
                  {!notification.isRead && (
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  )}
                  {notification.isRead && <span className="w-2 mr-3"></span>}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`text-sm font-medium ${notification.isRead ? 'text-gray-500' : 'text-gray-800'}`}>
                        {notification.title}
                      </h4>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        notification.type === '报名' ? 'bg-blue-100 text-blue-600' :
                        notification.type === '团队' ? 'bg-purple-100 text-purple-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {notification.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">{notification.content}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{notification.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ========== 个人资料（最底部）========== */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">个人资料</h3>
            <button className="text-sm text-gray-400 hover:text-primary transition-colors">编辑资料</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div>
              <p className="text-xs text-gray-400 mb-1">姓名</p>
              <p className="text-sm text-gray-700">{user?.name || user?.phone || user?.phoneOrEmail || '参赛选手'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">邮箱</p>
              <p className="text-sm text-gray-700 truncate">{user?.email || 'user@example.com'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">手机号</p>
              <p className="text-sm text-gray-700">{user?.phone || '138****1234'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">学校/机构</p>
              <p className="text-sm text-gray-700">清华大学</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">专业/职位</p>
              <p className="text-sm text-gray-700">计算机科学</p>
            </div>
          </div>
        </div>

        {/* ========== 企业/机构合作入口 ========== */}
        <div className="bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-xl border border-primary/10 p-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-800">企业/机构合作</h3>
                <p className="text-xs text-gray-500">欢迎企业、高校、机构加入我们</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                to="/enterprise"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                企业通道
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                to="/apply-competition"
                className="inline-flex items-center gap-2 text-sm text-secondary hover:text-secondary/80 font-medium transition-colors"
              >
                申请办赛
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;