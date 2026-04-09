import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { request } from '../lib/api';

const RegisterCompetition = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [applyStatus, setApplyStatus] = useState('draft');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const [formData, setFormData] = useState({
    participationType: 'individual',
    trackId: '',
    name: '',
    phone: '',
    email: '',
    organization: '',
    major: '',
    projectDescription: ''
  });

  const showToast = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const fetchCompetitions = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await request('/v1/competitions');
      if (result.ok && result.data.code === 0) {
        const list = result.data.data?.list || [];
        setCompetitions(list);
        if (list.length > 0) {
          setSelectedCompetition(list[0]);
        }
      } else {
        setError(result.data.message || '获取赛事列表失败');
      }
    } catch (err) {
      setError('网络错误');
    } finally {
      setLoading(false);
    }
  };

  const fetchTracks = async (competitionId) => {
    try {
      const result = await request(`/v1/competitions/${competitionId}/tracks`);
      if (result.ok && result.data.code === 0) {
        setTracks(result.data.data?.list || []);
      }
    } catch (err) {
      setTracks([]);
    }
  };

  const fetchMyEnrollment = async () => {
    try {
      const result = await request('/v1/enrollments');
      if (result.ok && result.data.code === 0) {
        const list = result.data.data?.list || [];
        if (list.length > 0) {
          const myEnrollment = list[0];
          setEnrollment(myEnrollment);
          setApplyStatus(myEnrollment.status || 'draft');
          setRejectionReason(myEnrollment.reviewComment || '');
          if (myEnrollment.trackId) {
            setFormData(prev => ({ ...prev, trackId: myEnrollment.trackId }));
          }
          if (myEnrollment.enrollmentType) {
            setFormData(prev => ({ ...prev, participationType: myEnrollment.enrollmentType }));
          }
        }
      }
    } catch (err) {
      console.error('fetchMyEnrollment error:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCompetitions();
      fetchMyEnrollment();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedCompetition?.id) {
      fetchTracks(selectedCompetition.id);
    }
  }, [selectedCompetition?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleParticipationTypeChange = (type) => {
    setFormData(prev => ({ ...prev, participationType: type }));
  };

  const handleTrackChange = (trackId) => {
    setFormData(prev => ({ ...prev, trackId }));
  };

  const handleSaveDraft = async () => {
    if (!selectedCompetition) return;
    setSubmitting(true);
    try {
      const payload = {
        competitionId: selectedCompetition.id,
        enrollmentType: formData.participationType,
        trackId: formData.trackId || undefined
      };
      const result = await request('/v1/enrollments', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      if (result.ok && result.data.code === 0) {
        showToast('草稿已保存');
        fetchMyEnrollment();
      } else {
        showToast(result.data.message || '保存失败');
      }
    } catch (err) {
      showToast('网络错误');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCompetition) return;
    if (!formData.trackId) {
      showToast('请选择参赛赛道');
      return;
    }
    setSubmitting(true);
    try {
      let result;
      if (enrollment?.id) {
        result = await request(`/v1/enrollments/${enrollment.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            enrollmentType: formData.participationType,
            trackId: formData.trackId
          })
        });
      } else {
        result = await request('/v1/enrollments', {
          method: 'POST',
          body: JSON.stringify({
            competitionId: selectedCompetition.id,
            enrollmentType: formData.participationType,
            trackId: formData.trackId
          })
        });
      }
      if (result.ok && result.data.code === 0) {
        showToast('报名提交成功');
        fetchMyEnrollment();
      } else {
        showToast(result.data.message || '提交失败');
      }
    } catch (err) {
      showToast('网络错误');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResubmit = () => {
    setApplyStatus('draft');
  };

  const isLocked = applyStatus === 'submitted' || applyStatus === 'approved' || applyStatus === 'pending_review';

  const getStatusBadge = (status) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-600';
      case 'submitted': return 'bg-blue-100 text-blue-600';
      case 'pending_review': return 'bg-orange-100 text-orange-600';
      case 'approved': return 'bg-green-100 text-green-600';
      case 'rejected': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'draft': return '草稿';
      case 'submitted': return '已提交';
      case 'pending_review': return '待审核';
      case 'approved': return '已通过';
      case 'rejected': return '已驳回';
      default: return status;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-xl shadow-md p-12 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">请先登录</h2>
          <p className="text-neutral-600 mb-8">登录后可进行报名</p>
          <Link to="/login" className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            登录
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-xl shadow-md p-12 max-w-md mx-auto">
          <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-500">加载赛事信息...</p>
        </div>
      </div>
    );
  }

  if (error && competitions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-xl shadow-md p-12 max-w-md mx-auto">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={fetchCompetitions} className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90">
            重试
          </button>
        </div>
      </div>
    );
  }

  if (competitions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-xl shadow-md p-12 max-w-md mx-auto">
          <p className="text-neutral-500 mb-4">当前没有可报名的赛事</p>
          <Link to="/competition-center" className="text-primary hover:underline">返回赛事中心</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-fadeIn">
      {process.env.NODE_ENV === 'development' && (
        <div className="max-w-6xl mx-auto mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-blue-700">API 联调信息</h3>
              <span className="text-xs text-blue-500">开发环境可见</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">赛事接口</p>
                <p className="font-mono text-gray-800">GET /v1/competitions</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">报名接口</p>
                <p className="font-mono text-gray-800">POST /v1/enrollments</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">报名状态</p>
                <p className={`font-semibold ${enrollment ? 'text-green-600' : 'text-yellow-600'}`}>
                  {enrollment ? getStatusText(applyStatus) : '未报名'}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">HTTP</p>
                <p className={`font-semibold ${loading ? 'text-yellow-600' : 'text-green-600'}`}>
                  {loading ? '请求中' : '成功'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-neutral-800 mb-4">报名参赛</h1>
        {selectedCompetition && (
          <p className="text-neutral-600">参加「{selectedCompetition.name}」</p>
        )}
      </div>

      {applyStatus === 'rejected' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-.633-1.964-.633-2.732 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-medium text-red-800">报名被驳回</h3>
              <p className="text-red-700 text-sm mt-1">{rejectionReason || '您的报名信息不符合要求，请补充完善后重新提交。'}</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 lg:p-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-6">报名信息</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-3">参赛方式</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  disabled={isLocked}
                  className={`flex-1 py-3 px-4 rounded-lg border transition-all ${formData.participationType === 'individual' ? 'border-primary bg-primary/5 text-primary' : 'border-neutral-300 hover:border-primary'} ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handleParticipationTypeChange('individual')}
                >
                  个人参赛
                </button>
                <button
                  type="button"
                  disabled={isLocked}
                  className={`flex-1 py-3 px-4 rounded-lg border transition-all ${formData.participationType === 'team' ? 'border-primary bg-primary/5 text-primary' : 'border-neutral-300 hover:border-primary'} ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handleParticipationTypeChange('team')}
                >
                  团队参赛
                </button>
              </div>
              {formData.participationType === 'team' && (
                <p className="text-sm text-neutral-500 mt-2">报名后可在团队大厅创建或加入团队</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-3">参赛赛道</label>
              {tracks.length === 0 ? (
                <p className="text-neutral-400 text-sm">暂无可选赛道</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tracks.map(track => (
                    <button
                      key={track.id}
                      type="button"
                      disabled={isLocked}
                      className={`py-3 px-4 rounded-lg border transition-all text-left ${formData.trackId === track.id ? 'border-primary bg-primary/5 text-primary' : 'border-neutral-300 hover:border-primary'} ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => handleTrackChange(track.id)}
                    >
                      {track.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">姓名</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLocked}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:bg-neutral-50 disabled:cursor-not-allowed"
                  placeholder="请输入您的姓名"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">手机号</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isLocked}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:bg-neutral-50 disabled:cursor-not-allowed"
                  placeholder="请输入您的手机号"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">邮箱</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLocked}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:bg-neutral-50 disabled:cursor-not-allowed"
                  placeholder="请输入您的邮箱"
                  required
                />
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-neutral-700 mb-2">学校/机构名称</label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  disabled={isLocked}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:bg-neutral-50 disabled:cursor-not-allowed"
                  placeholder="请输入您的学校或机构名称"
                  required
                />
              </div>

              <div>
                <label htmlFor="major" className="block text-sm font-medium text-neutral-700 mb-2">专业/职位</label>
                <input
                  type="text"
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  disabled={isLocked}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:bg-neutral-50 disabled:cursor-not-allowed"
                  placeholder="请输入您的专业或职位"
                  required
                />
              </div>

              <div>
                <label htmlFor="projectDescription" className="block text-sm font-medium text-neutral-700 mb-2">项目/参赛方向简介</label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  disabled={isLocked}
                  rows={4}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:bg-neutral-50 disabled:cursor-not-allowed"
                  placeholder="请简要描述您的项目或参赛方向"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-2">
                {!isLocked && (
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    disabled={submitting}
                    className="flex-1 py-3 px-4 border border-neutral-300 rounded-lg font-medium hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? '保存中...' : '保存草稿'}
                  </button>
                )}
                {!isLocked && (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex-1 bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? '提交中...' : '提交报名'}
                  </button>
                )}
                {isLocked && (
                  <div className="flex-1 py-3 px-4 bg-neutral-100 rounded-lg text-center text-neutral-600 font-medium">
                    {getStatusText(applyStatus)}
                  </div>
                )}
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-neutral-800 mb-4">赛事信息</h2>
              {selectedCompetition && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-800">{selectedCompetition.name}</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusBadge(selectedCompetition.status)}`}>
                      {selectedCompetition.status === 'open' ? '报名中' : selectedCompetition.status === 'closed' ? '已截止' : selectedCompetition.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {selectedCompetition.registrationDeadline && (
                      <div className="flex justify-between">
                        <span className="text-neutral-600">报名截止时间</span>
                        <span className="font-medium">{new Date(selectedCompetition.registrationDeadline).toLocaleDateString('zh-CN')}</span>
                      </div>
                    )}
                    {tracks.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-neutral-600">赛道数量</span>
                        <span className="font-medium">{tracks.length}个</span>
                      </div>
                    )}
                  </div>
                  {selectedCompetition.description && (
                    <div>
                      <h4 className="text-sm font-medium text-neutral-700 mb-2">赛事简介</h4>
                      <p className="text-sm text-neutral-600 line-clamp-4">{selectedCompetition.description}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-neutral-800 mb-4">报名进度</h2>
              <div className="space-y-4">
                {[
                  { step: 1, title: '填写信息', status: applyStatus === 'draft' || applyStatus === 'rejected' ? 'current' : 'completed' },
                  { step: 2, title: '提交报名', status: applyStatus === 'draft' || applyStatus === 'rejected' ? 'pending' : applyStatus === 'submitted' || applyStatus === 'pending_review' ? 'current' : 'completed' },
                  { step: 3, title: '等待审核', status: applyStatus === 'submitted' || applyStatus === 'pending_review' ? 'current' : applyStatus === 'approved' ? 'completed' : 'pending' },
                  { step: 4, title: '进入团队/作品流程', status: applyStatus === 'approved' ? 'current' : 'pending' }
                ].map((item, index) => (
                  <div key={item.step} className="flex items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${item.status === 'completed' ? 'bg-green-100 text-green-600' : item.status === 'current' ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-400'}`}>
                      {item.status === 'completed' ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : item.step}
                    </div>
                    <div>
                      <h3 className={`font-medium ${item.status === 'current' ? 'text-primary' : 'text-neutral-700'}`}>{item.title}</h3>
                      {index < 3 && <div className="h-8 w-0.5 bg-neutral-200 ml-4 mt-1"></div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-neutral-800 mb-4">审核结果</h2>
              {applyStatus === 'draft' && !enrollment && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-blue-700">请填写并提交报名</p>
                  </div>
                </div>
              )}
              {applyStatus === 'submitted' || applyStatus === 'pending_review' ? (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-.633-1.964-.633-2.732 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-orange-700">报名已提交，正在审核中</p>
                  </div>
                </div>
              ) : null}
              {applyStatus === 'approved' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="text-green-700">报名已通过</p>
                      <Link to="/team-hall" className="mt-3 text-primary hover:underline text-sm font-medium inline-block">进入团队流程</Link>
                      <Link to="/work-submission" className="mt-3 text-primary hover:underline text-sm font-medium inline-block ml-4">进入作品流程</Link>
                    </div>
                  </div>
                </div>
              )}
              {applyStatus === 'rejected' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-.633-1.964-.633-2.732 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <p className="text-red-700">报名被驳回</p>
                      <p className="text-red-600 text-sm mt-1">{rejectionReason || '您的报名信息不符合要求，请补充完善后重新提交。'}</p>
                      <button type="button" onClick={handleResubmit} className="mt-3 text-primary hover:underline text-sm font-medium">重新补充材料</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/competition-center" className="text-primary hover:underline">返回赛事中心</Link>
        </div>
      </div>

      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-neutral-800 text-white px-4 py-3 rounded-lg shadow-lg">
          {notificationMessage}
        </div>
      )}
    </div>
  );
};

export default RegisterCompetition;
