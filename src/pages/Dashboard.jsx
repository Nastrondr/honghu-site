import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  
  const userStatus = '已组队';
  
  const getStatusInfo = (status) => {
    switch (status) {
      case '未报名':
        return { color: 'bg-yellow-100 text-yellow-700', text: '未报名' };
      case '已报名':
        return { color: 'bg-blue-100 text-blue-700', text: '已报名' };
      case '已组队':
        return { color: 'bg-green-100 text-green-700', text: '已组队' };
      case '已提交':
        return { color: 'bg-purple-100 text-purple-700', text: '已提交' };
      default:
        return { color: 'bg-gray-100 text-gray-700', text: status };
    }
  };

  const getMainButton = (status) => {
    switch (status) {
      case '未报名':
        return { text: '立即报名', link: '/register-competition', primary: true };
      case '已报名':
        return { text: '去组队', link: '/team-hall', primary: true };
      case '已组队':
        return { text: '提交作品', link: '/work-submission', primary: true };
      case '已提交':
        return { text: '查看作品', link: '/work-submission', primary: false };
      default:
        return { text: '查看详情', link: '/competition-center', primary: true };
    }
  };

  const mockTeam = {
    name: 'AI创新先锋队',
    currentMembers: 3,
    maxMembers: 5,
    role: '队长'
  };

  const mockSubmission = {
    version: 'V1.2',
    submitTime: '2024-11-15 14:30',
    status: '已提交'
  };

  const mockNotifications = [
    { id: 1, title: '初赛作品提交截止时间延长至11月30日', date: '2024-11-20', type: '通知' },
    { id: 2, title: '新增金融风控数据集可供下载', date: '2024-11-18', type: '公告' },
    { id: 3, title: '决赛入围名单即将公布', date: '2024-11-15', type: '提醒' }
  ];

  const steps = [
    { name: '报名参赛', status: 'completed' },
    { name: '组队协作', status: 'completed' },
    { name: '下载数据', status: 'completed' },
    { name: '提交作品', status: 'current' },
    { name: '查看结果', status: 'pending' }
  ];

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12 animate-fadeIn">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-xl shadow-md p-12">
            <svg className="w-16 h-16 text-neutral-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">请先登录</h2>
            <p className="text-neutral-600 mb-8">登录后可查看个人参赛状态</p>
            <div className="flex justify-center gap-4">
              <Link to="/login" className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                登录
              </Link>
              <Link to="/register" className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/5 transition-colors">
                注册
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const mainButton = getMainButton(userStatus);

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">个人中心</h1>
          <p className="text-neutral-600">查看和管理您的参赛状态</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary text-xl font-bold">{user?.name?.[0] || user?.phone?.[0] || user?.phoneOrEmail?.[0] || '用'}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-neutral-800">{user?.name || user?.phone || user?.phoneOrEmail || '参赛选手'}</h2>
                  <p className="text-neutral-500">2024年梧桐·鸿鹄人工智能应用创新大赛</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusInfo(userStatus).color}`}>
                  {getStatusInfo(userStatus).text}
                </span>
                <span className="text-neutral-500 text-sm">当前阶段：初赛提交阶段</span>
              </div>
            </div>
            <div>
              <Link
                to={mainButton.link}
                className={`inline-block px-8 py-3 rounded-lg font-medium transition-colors ${
                  mainButton.primary
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'border border-primary text-primary hover:bg-primary/5'
                }`}
              >
                {mainButton.text}
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-bold text-neutral-800 mb-6">参赛流程</h2>
          <div className="relative">
            <div className="hidden md:block absolute top-5 left-0 right-0 h-1 bg-neutral-200"></div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {steps.map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="flex justify-center mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                      step.status === 'completed' ? 'bg-primary text-white' :
                      step.status === 'current' ? 'bg-primary text-white ring-4 ring-primary/20' :
                      'bg-neutral-200 text-neutral-500'
                    }`}>
                      {step.status === 'completed' ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                  </div>
                  <p className={`text-sm font-medium ${
                    step.status === 'completed' || step.status === 'current' ? 'text-neutral-800' : 'text-neutral-400'
                  }`}>
                    {step.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-neutral-800">我的团队</h2>
              </div>
              <Link to="/team-hall" className="text-primary hover:underline text-sm">
                进入团队大厅
              </Link>
            </div>
            <div className="p-4 bg-neutral-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-neutral-800">{mockTeam.name}</h3>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                  {mockTeam.role}
                </span>
              </div>
              <div className="flex items-center justify-between text-neutral-600">
                <span>当前人数</span>
                <span className="font-medium">{mockTeam.currentMembers}/{mockTeam.maxMembers}</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${(mockTeam.currentMembers / mockTeam.maxMembers) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-neutral-800">我的作品</h2>
              </div>
              <Link to="/work-submission" className="text-primary hover:underline text-sm">
                进入我的作品
              </Link>
            </div>
            <div className="p-4 bg-neutral-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-neutral-800">{mockSubmission.version}</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">当前版本</span>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                  {mockSubmission.status}
                </span>
              </div>
              <p className="text-neutral-500 text-sm">提交时间：{mockSubmission.submitTime}</p>
            </div>
            <Link 
              to="/work-submission" 
              className="mt-4 block text-center border border-primary text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/5 transition-colors"
            >
              重新提交
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-neutral-800">赛题数据</h2>
              </div>
              <Link to="/competition-data" className="text-primary hover:underline text-sm">
                进入赛题数据
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                <span className="text-neutral-600">数据下载权限</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">已解锁</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                <span className="text-neutral-600">可下载数据</span>
                <span className="text-neutral-800 font-medium">4 项</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                <span className="text-neutral-600">已下载数据</span>
                <span className="text-neutral-800 font-medium">2 项</span>
              </div>
            </div>
            <Link 
              to="/competition-data" 
              className="mt-4 block text-center bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              前往下载
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold text-neutral-800 mb-4">通知公告</h2>
            <div className="space-y-3">
              {mockNotifications.map((notification) => (
                <div key={notification.id} className="p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-neutral-800 text-sm font-medium flex-1">{notification.title}</h3>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs ml-2 flex-shrink-0">
                      {notification.type}
                    </span>
                  </div>
                  <p className="text-neutral-400 text-xs">{notification.date}</p>
                </div>
              ))}
            </div>
            <Link 
              to="/news" 
              className="mt-4 block text-center text-primary hover:underline text-sm"
            >
              查看更多
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;