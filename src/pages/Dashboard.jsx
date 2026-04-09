import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { request } from '../lib/api';

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [works, setWorks] = useState([]);
  const [worksLoading, setWorksLoading] = useState(true);
  const [worksError, setWorksError] = useState('');
  const [worksData, setWorksData] = useState(null);

  const [enrollment, setEnrollment] = useState(null);
  const [enrollmentLoading, setEnrollmentLoading] = useState(true);
  const [enrollmentError, setEnrollmentError] = useState('');

  const [team, setTeam] = useState(null);
  const [teamLoading, setTeamLoading] = useState(true);
  const [teamError, setTeamError] = useState('');

  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const [currentStep, setCurrentStep] = useState(4);
  const [mobileActiveTab, setMobileActiveTab] = useState(0);

  const fetchMyWorks = async () => {
    setWorksLoading(true);
    setWorksError('');

    try {
      const result = await request('/v1/works/my');

      if (!result.ok) {
        if (result.status === 401) {
          setWorksError('登录已过期，请重新登录');
          logout();
          navigate('/login');
          return;
        }
        setWorksError('获取作品失败');
        return;
      }

      const data = result.data;
      if (data.code === 0) {
        const worksList = data.data?.list || [];
        setWorks(worksList);
        setWorksData(data.data);
      } else {
        setWorksError(data.message || '获取作品失败');
      }
    } catch (error) {
      setWorksError('网络错误，请重试');
    } finally {
      setWorksLoading(false);
    }
  };

  const fetchMyEnrollment = async () => {
    setEnrollmentLoading(true);
    setEnrollmentError('');

    try {
      const result = await request('/v1/enrollments');

      if (!result.ok) {
        if (result.status === 401) {
          setEnrollmentError('登录已过期');
          return;
        }
        setEnrollmentError('获取报名信息失败');
        return;
      }

      const data = result.data;
      if (data.code === 0) {
        const list = data.data?.list || [];
        setEnrollment(list.length > 0 ? list[0] : null);
      } else {
        setEnrollmentError(data.message || '获取报名信息失败');
      }
    } catch (error) {
      setEnrollmentError('网络错误');
    } finally {
      setEnrollmentLoading(false);
    }
  };

  const fetchMyTeam = async () => {
    setTeamLoading(true);
    setTeamError('');

    try {
      const result = await request('/v1/teams/my/list');

      if (!result.ok) {
        if (result.status === 401) {
          setTeamError('登录已过期');
          return;
        }
        setTeamError('获取团队信息失败');
        return;
      }

      const data = result.data;
      if (data.code === 0) {
        const list = data.data?.list || [];
        setTeam(list.length > 0 ? list[0] : null);
      } else {
        setTeamError(data.message || '获取团队信息失败');
      }
    } catch (error) {
      setTeamError('网络错误');
    } finally {
      setTeamLoading(false);
    }
  };

  const fetchUnreadNotificationCount = async () => {
    try {
      const result = await request('/v1/notifications/unread-count');
      if (result.ok && result.data.code === 0) {
        setUnreadNotificationCount(result.data.data?.count || 0);
      }
    } catch (error) {
      console.error('获取未读通知数失败:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMyWorks();
      fetchMyEnrollment();
      fetchMyTeam();
      fetchUnreadNotificationCount();
    }
  }, [isAuthenticated]);

  const token = localStorage.getItem('accessToken');

  const progressSteps = [
    { name: '报名参赛', date: '4-5月' },
    { name: '审核通过', date: '5月' },
    { name: '组建团队', date: '5-6月' },
    { name: '获取资源', date: '6月' },
    { name: '提交作品', date: '7-8月' },
    { name: '查看结果', date: '9月' }
  ];

  const getEnrollmentStatusInfo = (status) => {
    switch (status) {
      case 'draft':
        return { color: 'bg-gray-50 text-gray-600 border border-gray-200', text: '草稿' };
      case 'submitted':
        return { color: 'bg-blue-50 text-blue-600 border border-blue-200', text: '已提交' };
      case 'pending_review':
        return { color: 'bg-orange-50 text-orange-600 border border-orange-200', text: '待审核' };
      case 'approved':
        return { color: 'bg-green-50 text-green-600 border border-green-200', text: '已通过' };
      case 'rejected':
        return { color: 'bg-red-50 text-red-600 border border-red-200', text: '已驳回' };
      case 'need_more_material':
        return { color: 'bg-yellow-50 text-yellow-600 border border-yellow-200', text: '需补料' };
      case 'withdrawn':
        return { color: 'bg-gray-50 text-gray-600 border border-gray-200', text: '已撤回' };
      case 'not_applied':
      default:
        return { color: 'bg-yellow-50 text-yellow-600 border border-yellow-200', text: '未报名' };
    }
  };

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
      case 'published':
        return { color: 'text-green-500', text: '已公示' };
      default:
        return { color: 'text-gray-400', text: status || '未知' };
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 animate-fadeIn">
      {/* Dev 调试区 */}
      {process.env.NODE_ENV === 'development' && (
        <div className="max-w-6xl mx-auto px-4 mb-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-blue-700">API 联调信息</h3>
              <span className="text-xs text-blue-500">开发环境可见</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">我的作品</p>
                <p className="font-mono text-gray-800 break-all">GET /api/v1/works/my</p>
                <p className={`mt-1 ${worksLoading ? 'text-gray-400' : worksError ? 'text-red-600' : 'text-green-600'}`}>
                  {worksLoading ? '请求中...' : worksError ? '失败' : '成功'}
                </p>
                {!worksLoading && !worksError && <p className="text-gray-500">list: {works.length} 条</p>}
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">我的报名</p>
                <p className="font-mono text-gray-800 break-all">GET /api/v1/enrollments</p>
                <p className={`mt-1 ${enrollmentLoading ? 'text-gray-400' : enrollmentError ? 'text-red-600' : 'text-green-600'}`}>
                  {enrollmentLoading ? '请求中...' : enrollmentError ? '失败' : '成功'}
                </p>
                {!enrollmentLoading && !enrollmentError && <p className="text-gray-500">{enrollment ? '已报名' : '未报名'}</p>}
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">我的团队</p>
                <p className="font-mono text-gray-800 break-all">GET /api/v1/teams/my/list</p>
                <p className={`mt-1 ${teamLoading ? 'text-gray-400' : teamError ? 'text-red-600' : 'text-green-600'}`}>
                  {teamLoading ? '请求中...' : teamError ? '失败' : '成功'}
                </p>
                {!teamLoading && !teamError && <p className="text-gray-500">{team ? '已加入团队' : '未加入'}</p>}
              </div>
            </div>
            <div className="mt-3 bg-green-100 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-700 font-semibold">✓ 三块核心卡片已全部接入真实后端数据</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4">

        {/* 顶部欢迎区 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center gap-4">
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
            <div className={`mt-4 md:mt-0 px-5 py-2.5 rounded-full text-sm font-semibold ${getEnrollmentStatusInfo(enrollment?.status || 'not_applied').color}`}>
              {getEnrollmentStatusInfo(enrollment?.status || 'not_applied').text}
            </div>
          </div>
        </div>

        {/* 个人资料 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="font-semibold text-gray-800 flex-shrink-0">个人资料</h3>
            <button className="text-sm text-gray-400 hover:text-primary transition-colors flex-shrink-0">编辑资料</button>
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

        {/* 参赛进度 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-base font-semibold text-gray-500 mb-8 hidden md:block">参赛进度</h2>

          <div className="hidden md:flex items-start justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-100 -z-0" style={{ marginLeft: '20px', marginRight: '20px' }}></div>
            <div className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-primary to-primary/40 -z-0" style={{ width: `${(currentStep / (progressSteps.length - 1)) * 100}%`, marginLeft: '20px', marginRight: '20px', maxWidth: 'calc(100% - 40px)' }}></div>

            {progressSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center relative z-10">
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
                <div className="mt-3 text-center">
                  <p className={`text-sm font-medium ${index <= currentStep ? 'text-gray-800' : 'text-gray-400'}`}>
                    {step.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{step.date}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="md:hidden">
            <h2 className="text-base font-semibold text-gray-500 mb-4">参赛进度</h2>
            <div className="space-y-4">
              {progressSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    index < currentStep
                      ? 'bg-primary text-white'
                      : index === currentStep
                      ? 'bg-white text-primary border-2 border-primary'
                      : 'bg-white text-gray-300 border-2 border-gray-200'
                  }`}>
                    {index < currentStep ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-xs font-semibold">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${index <= currentStep ? 'text-gray-800' : 'text-gray-400'}`}>
                      {step.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4个概览卡片 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div
            onClick={() => setMobileActiveTab(0)}
            className={`bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-all cursor-pointer lg:hover:shadow-md ${
              mobileActiveTab === 0 ? 'md:border-gray-100 border-primary ring-1 ring-primary/20' : 'border-gray-100'
            }`}
          >
            <div className="hidden lg:block">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-500">我的报名</span>
              </div>
              {enrollmentLoading ? (
                <p className="text-xl font-bold text-gray-400">加载中...</p>
              ) : enrollmentError ? (
                <p className="text-xl font-bold text-red-500">错误</p>
              ) : !enrollment ? (
                <p className="text-xl font-bold text-yellow-500">未报名</p>
              ) : (
                <p className={`text-xl font-bold ${getEnrollmentStatusInfo(enrollment.status).color.replace('bg-', 'text-').split(' ')[0]}`}>
                  {getEnrollmentStatusInfo(enrollment.status).text}
                </p>
              )}
            </div>
            <div className="lg:hidden">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${mobileActiveTab === 0 ? 'bg-primary/10' : 'bg-blue-50'}`}>
                  <svg className={`w-4 h-4 ${mobileActiveTab === 0 ? 'text-primary' : 'text-blue-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className={`text-sm font-medium ${mobileActiveTab === 0 ? 'text-primary' : 'text-gray-500'}`}>我的报名</span>
              </div>
              {enrollmentLoading ? (
                <p className="text-xl font-bold text-gray-400">加载中...</p>
              ) : enrollmentError ? (
                <p className="text-xl font-bold text-red-500">错误</p>
              ) : !enrollment ? (
                <p className="text-xl font-bold text-yellow-500">未报名</p>
              ) : (
                <p className={`text-xl font-bold ${getEnrollmentStatusInfo(enrollment.status).color.replace('bg-', 'text-').split(' ')[0]}`}>
                  {getEnrollmentStatusInfo(enrollment.status).text}
                </p>
              )}
            </div>
          </div>

          <div
            onClick={() => setMobileActiveTab(1)}
            className={`bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-all cursor-pointer lg:hover:shadow-md ${
              mobileActiveTab === 1 ? 'md:border-gray-100 border-primary ring-1 ring-primary/20' : 'border-gray-100'
            }`}
          >
            <div className="hidden lg:block">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-500">我的团队</span>
              </div>
              {teamLoading ? (
                <p className="text-xl font-bold text-gray-400">加载中...</p>
              ) : teamError ? (
                <p className="text-xl font-bold text-red-500">错误</p>
              ) : !team ? (
                <p className="text-xl font-bold text-yellow-500">未加入</p>
              ) : (
                <p className="text-xl font-bold text-green-500">已加入</p>
              )}
            </div>
            <div className="lg:hidden">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${mobileActiveTab === 1 ? 'bg-primary/10' : 'bg-purple-50'}`}>
                  <svg className={`w-4 h-4 ${mobileActiveTab === 1 ? 'text-primary' : 'text-purple-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className={`text-sm font-medium ${mobileActiveTab === 1 ? 'text-primary' : 'text-gray-500'}`}>我的团队</span>
              </div>
              {teamLoading ? (
                <p className="text-xl font-bold text-gray-400">加载中...</p>
              ) : teamError ? (
                <p className="text-xl font-bold text-red-500">错误</p>
              ) : !team ? (
                <p className="text-xl font-bold text-yellow-500">未加入</p>
              ) : (
                <p className="text-xl font-bold text-green-500">已加入</p>
              )}
            </div>
          </div>

          <div
            onClick={() => navigate('/my-works')}
            className={`bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-all cursor-pointer lg:hover:shadow-md ${
              mobileActiveTab === 2 ? 'md:border-gray-100 border-primary ring-1 ring-primary/20' : 'border-gray-100'
            }`}
          >
            <div className="hidden lg:block">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-500">我的作品</span>
              </div>
              {worksLoading ? (
                <p className="text-xl font-bold text-gray-400">加载中...</p>
              ) : worksError ? (
                <p className="text-xl font-bold text-red-500">错误</p>
              ) : works.length === 0 ? (
                <p className="text-xl font-bold text-yellow-500">未提交</p>
              ) : (
                <p className={`text-xl font-bold ${getWorkStatusInfo(works[0].status).color}`}>
                  {getWorkStatusInfo(works[0].status).text}
                </p>
              )}
            </div>
            <div className="lg:hidden">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${mobileActiveTab === 2 ? 'bg-primary/10' : 'bg-green-50'}`}>
                  <svg className={`w-4 h-4 ${mobileActiveTab === 2 ? 'text-primary' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <span className={`text-sm font-medium ${mobileActiveTab === 2 ? 'text-primary' : 'text-gray-500'}`}>我的作品</span>
              </div>
              {worksLoading ? (
                <p className="text-xl font-bold text-gray-400">加载中...</p>
              ) : worksError ? (
                <p className="text-xl font-bold text-red-500">错误</p>
              ) : works.length === 0 ? (
                <p className="text-xl font-bold text-yellow-500">未提交</p>
              ) : (
                <p className={`text-xl font-bold ${getWorkStatusInfo(works[0].status).color}`}>
                  {getWorkStatusInfo(works[0].status).text}
                </p>
              )}
            </div>
          </div>

          <Link
            to="/notifications"
            className={`bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-all cursor-pointer lg:hover:shadow-md block ${
              mobileActiveTab === 3 ? 'md:border-gray-100 border-primary ring-1 ring-primary/20' : 'border-gray-100'
            }`}
          >
            <div className="hidden lg:block">
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
            <div className="lg:hidden">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${mobileActiveTab === 3 ? 'bg-primary/10' : 'bg-orange-50'}`}>
                  <svg className={`w-4 h-4 ${mobileActiveTab === 3 ? 'text-primary' : 'text-orange-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <span className={`text-sm font-medium ${mobileActiveTab === 3 ? 'text-primary' : 'text-gray-500'}`}>我的通知</span>
              </div>
              <p className="text-xl font-bold text-orange-500">
                {unreadNotificationCount}
                <span className="text-sm font-normal text-gray-400"> 条未读</span>
              </p>
            </div>
          </Link>
        </div>

        {/* 详细信息区 */}
        <div className="hidden lg:grid grid-cols-3 gap-4 mb-6">
          {/* 我的报名详情 - 真实API数据 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h3 className="font-semibold text-gray-800 flex-shrink-0">我的报名</h3>
              {enrollmentLoading ? (
                <span className="text-xs text-gray-400">加载中</span>
              ) : enrollmentError ? (
                <span className="text-xs text-red-500">错误</span>
              ) : !enrollment ? (
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-600">未报名</span>
              ) : (
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${getEnrollmentStatusInfo(enrollment.status).color}`}>
                  {getEnrollmentStatusInfo(enrollment.status).text}
                </span>
              )}
            </div>

            {enrollmentLoading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-gray-400 text-sm">加载中...</p>
              </div>
            ) : enrollmentError ? (
              <div className="text-center py-6">
                <p className="text-red-400 text-sm mb-3">{enrollmentError}</p>
                <button onClick={fetchMyEnrollment} className="text-sm bg-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  重试
                </button>
              </div>
            ) : !enrollment ? (
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
                  <p className="text-sm text-gray-700 font-medium truncate">{enrollment.competition?.name || '-'}</p>
                </div>
                <div className="pb-3 border-b border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">参赛方式 · 赛道</p>
                  <p className="text-sm text-gray-700">
                    {enrollment.enrollmentType === 'team' ? '团队参赛' : '个人参赛'} · {enrollment.track?.name || '-'}
                  </p>
                </div>
                <div className="pb-3 border-b border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">报名时间</p>
                  <p className="text-sm text-gray-700">{formatDate(enrollment.createdAt)}</p>
                </div>
                {enrollment.status === 'rejected' && enrollment.reviewComment && (
                  <div className="pt-2">
                    <p className="text-xs text-red-500 mb-1">驳回原因</p>
                    <p className="text-sm text-red-600">{enrollment.reviewComment}</p>
                  </div>
                )}
                <button className="block w-full text-center text-sm text-gray-400 pt-2 cursor-not-allowed" disabled>
                  查看详情（待接入）
                </button>
              </div>
            )}
          </div>

          {/* 我的团队详情 - 真实API数据 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h3 className="font-semibold text-gray-800 flex-shrink-0">我的团队</h3>
              {teamLoading ? (
                <span className="text-xs text-gray-400">加载中</span>
              ) : teamError ? (
                <span className="text-xs text-red-500">错误</span>
              ) : !team ? (
                <span className="text-xs text-gray-400">-</span>
              ) : (
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
                  {team.status === 'locked' ? '已锁定' : team.status === 'dissolved' ? '已解散' : team.status === 'complete' ? '已完成' : '组建中'}
                </span>
              )}
            </div>

            {teamLoading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-gray-400 text-sm">加载中...</p>
              </div>
            ) : teamError ? (
              <div className="text-center py-6">
                <p className="text-red-400 text-sm mb-3">{teamError}</p>
                <button onClick={fetchMyTeam} className="text-sm bg-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  重试
                </button>
              </div>
            ) : !team ? (
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
                  <p className="text-sm text-gray-700 font-medium">{team.name || '-'}</p>
                </div>
                <div className="pb-3 border-b border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">队长 · 成员</p>
                  <p className="text-sm text-gray-700">{team.leader?.username || '-'} · {team._count?.members || 0}人</p>
                </div>
                {team.maxMembers && (
                  <div className="pt-2">
                    <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                      <span>成员进度</span>
                      <span>{Math.round(((team._count?.members || 0) / team.maxMembers) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: `${Math.min(100, ((team._count?.members || 0) / team.maxMembers) * 100)}%` }}></div>
                    </div>
                  </div>
                )}
                <Link to="/team-hall" className="block w-full text-center text-sm text-primary hover:underline pt-2">
                  前往团队大厅
                </Link>
              </div>
            )}
          </div>

          {/* 我的作品详情 - 真实API数据 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h3 className="font-semibold text-gray-800 flex-shrink-0">我的作品</h3>
              {!worksLoading && !worksError && works.length > 0 && (
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${
                  works[0].status === 'submitted' ? 'bg-purple-50 text-purple-600' :
                  works[0].status === 'draft' ? 'bg-blue-50 text-blue-600' :
                  works[0].status === 'under_review' ? 'bg-orange-50 text-orange-600' :
                  works[0].status === 'published' ? 'bg-green-50 text-green-600' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {getWorkStatusInfo(works[0].status).text}
                </span>
              )}
            </div>

            {worksLoading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-gray-400 text-sm">加载中...</p>
              </div>
            ) : worksError ? (
              <div className="text-center py-6">
                <p className="text-red-400 text-sm mb-3">{worksError}</p>
                <button onClick={fetchMyWorks} className="text-sm bg-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  重试
                </button>
              </div>
            ) : works.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-400 text-sm mb-3">您还没有提交作品</p>
                <Link to="/my-works" className="text-sm bg-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  提交作品
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {works.map((work) => (
                  <div key={work.id} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <Link to={`/works/${work.id}`}>
                      <p className="text-xs text-gray-400 mb-1">作品名称</p>
                      <p className="text-sm text-gray-700 font-medium truncate">{work.title || '-'}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        更新: {formatDate(work.updatedAt || work.createdAt)}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 手机端：作品详情 */}
        <div className="lg:hidden mb-6">
          {mobileActiveTab === 2 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h3 className="font-semibold text-gray-800 flex-shrink-0">我的作品</h3>
                {!worksLoading && !worksError && works.length > 0 && (
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${
                    works[0].status === 'submitted' ? 'bg-purple-50 text-purple-600' :
                    works[0].status === 'draft' ? 'bg-blue-50 text-blue-600' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {getWorkStatusInfo(works[0].status).text}
                  </span>
                )}
              </div>

              {worksLoading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-gray-400 text-sm">加载中...</p>
                </div>
              ) : worksError ? (
                <div className="text-center py-6">
                  <p className="text-red-400 text-sm mb-3">{worksError}</p>
                  <button onClick={fetchMyWorks} className="text-sm bg-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    重试
                  </button>
                </div>
              ) : works.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-gray-400 text-sm mb-3">您还没有提交作品</p>
                  <Link to="/my-works" className="text-sm bg-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    提交作品
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {works.map((work) => (
                    <div key={work.id} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                      <p className="text-xs text-gray-400 mb-1">作品名称</p>
                      <p className="text-sm text-gray-700 font-medium truncate">{work.title || '-'}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        更新: {formatDate(work.updatedAt || work.createdAt)}
                      </p>
                    </div>
                  ))}
                  <Link to={`/works/${work.id}`} className="block text-center text-sm text-primary hover:underline pt-2">
                    查看详情
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
