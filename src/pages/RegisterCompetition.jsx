import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterCompetition = () => {
  // 模拟赛事数据 - 后续需从API获取
  const mockCompetition = {
    id: 1,
    title: '2024年梧桐·鸿鹄人工智能应用创新大赛',
    status: '报名中', // 报名中 / 审核中 / 已截止
    deadline: '2024年12月31日 23:59',
    trackCount: 5,
    description: '面向全国的人工智能应用创新大赛，鼓励选手开发具有实际应用价值的AI解决方案。大赛设置数字金融、数字教育、数字健康、数字文旅、数字法务五大赛道，欢迎各界人士报名参加。'
  };

  // 模拟报名状态 - 后续需从API获取
  const [applyStatus, setApplyStatus] = useState('draft'); // draft（未提交）/ submitted（已提交，待审核）/ rejected（被驳回）/ approved（已通过）
  const [rejectionReason, setRejectionReason] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // 表单数据
  const [formData, setFormData] = useState({
    participationType: 'individual', // individual / team
    track: '',
    name: '',
    phone: '',
    email: '',
    organization: '',
    major: '',
    projectDescription: '',
    attachments: []
  });

  // 处理表单输入变化
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 处理参赛方式切换
  const handleParticipationTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      participationType: type
    }));
  };

  // 处理赛道选择
  const handleTrackChange = (track) => {
    setFormData(prev => ({
      ...prev,
      track
    }));
  };

  // 处理文件上传
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // 限制上传文件数量
      const newAttachments = [...formData.attachments, ...files].slice(0, 3);
      setFormData(prev => ({
        ...prev,
        attachments: newAttachments
      }));
    }
  };

  // 移除已上传文件
  const removeAttachment = (index) => {
    const newAttachments = formData.attachments.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      attachments: newAttachments
    }));
  };

  // 保存草稿
  const handleSaveDraft = (e) => {
    e.preventDefault();
    // 模拟保存草稿
    setNotificationMessage('草稿已保存');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // 提交报名
  const handleSubmit = (e) => {
    e.preventDefault();
    // 模拟提交报名
    setApplyStatus('submitted');
  };

  // 重新提交
  const handleResubmit = () => {
    setApplyStatus('draft');
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-fadeIn">
      {/* 页面标题 */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-neutral-800 mb-4">报名参赛</h1>
        <p className="text-neutral-600">参加「{mockCompetition.title}」</p>
      </div>

      {/* 驳回提示 */}
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

      {/* 两栏布局 */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：报名表单区 */}
          <div className="bg-white rounded-xl shadow-md p-6 lg:p-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-6">报名信息</h2>

            {/* 参赛方式切换 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-3">参赛方式</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  disabled={applyStatus === 'submitted' || applyStatus === 'approved'}
                  className={`flex-1 py-3 px-4 rounded-lg border transition-all ${formData.participationType === 'individual' ? 'border-primary bg-primary/5 text-primary' : 'border-neutral-300 hover:border-primary'} ${(applyStatus === 'submitted' || applyStatus === 'approved') ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handleParticipationTypeChange('individual')}
                >
                  个人参赛
                </button>
                <button
                  type="button"
                  disabled={applyStatus === 'submitted' || applyStatus === 'approved'}
                  className={`flex-1 py-3 px-4 rounded-lg border transition-all ${formData.participationType === 'team' ? 'border-primary bg-primary/5 text-primary' : 'border-neutral-300 hover:border-primary'} ${(applyStatus === 'submitted' || applyStatus === 'approved') ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handleParticipationTypeChange('team')}
                >
                  团队参赛
                </button>
              </div>
              {formData.participationType === 'team' && (
                <p className="text-sm text-neutral-500 mt-2">
                  若以团队形式参赛，可在报名后前往团队大厅创建或加入团队
                </p>
              )}
            </div>

            {/* 参赛赛道选择 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-3">参赛赛道</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { value: 'finance', label: '数字金融' },
                  { value: 'education', label: '数字教育' },
                  { value: 'health', label: '数字健康' },
                  { value: 'culture', label: '数字文旅' },
                  { value: 'legal', label: '数字法务' }
                ].map(track => (
                  <button
                    key={track.value}
                    type="button"
                    disabled={applyStatus === 'submitted' || applyStatus === 'approved'}
                    className={`py-3 px-4 rounded-lg border transition-all text-left ${formData.track === track.value ? 'border-primary bg-primary/5 text-primary' : 'border-neutral-300 hover:border-primary'} ${(applyStatus === 'submitted' || applyStatus === 'approved') ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handleTrackChange(track.value)}
                  >
                    {track.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 基础报名字段 */}
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                  姓名
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={applyStatus === 'submitted' || applyStatus === 'approved'}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${(applyStatus === 'submitted' || applyStatus === 'approved') ? 'bg-neutral-50 cursor-not-allowed' : ''}"
                  placeholder="请输入您的姓名"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                  手机号
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={applyStatus === 'submitted' || applyStatus === 'approved'}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${(applyStatus === 'submitted' || applyStatus === 'approved') ? 'bg-neutral-50 cursor-not-allowed' : ''}"
                  placeholder="请输入您的手机号"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  邮箱
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={applyStatus === 'submitted' || applyStatus === 'approved'}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${(applyStatus === 'submitted' || applyStatus === 'approved') ? 'bg-neutral-50 cursor-not-allowed' : ''}"
                  placeholder="请输入您的邮箱"
                  required
                />
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-neutral-700 mb-2">
                  学校/机构名称
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  disabled={applyStatus === 'submitted' || applyStatus === 'approved'}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${(applyStatus === 'submitted' || applyStatus === 'approved') ? 'bg-neutral-50 cursor-not-allowed' : ''}"
                  placeholder="请输入您的学校或机构名称"
                  required
                />
              </div>

              <div>
                <label htmlFor="major" className="block text-sm font-medium text-neutral-700 mb-2">
                  专业/职位
                </label>
                <input
                  type="text"
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  disabled={applyStatus === 'submitted' || applyStatus === 'approved'}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${(applyStatus === 'submitted' || applyStatus === 'approved') ? 'bg-neutral-50 cursor-not-allowed' : ''}"
                  placeholder="请输入您的专业或职位"
                  required
                />
              </div>

              <div>
                <label htmlFor="projectDescription" className="block text-sm font-medium text-neutral-700 mb-2">
                  项目/参赛方向简介
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  disabled={applyStatus === 'submitted' || applyStatus === 'approved'}
                  rows={4}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${(applyStatus === 'submitted' || applyStatus === 'approved') ? 'bg-neutral-50 cursor-not-allowed' : ''}"
                  placeholder="请简要描述您的项目或参赛方向"
                  required
                />
              </div>

              {/* 资格材料上传区 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-3">资格材料上传</label>
                <div className={`border-2 border-dashed ${applyStatus === 'submitted' || applyStatus === 'approved' ? 'border-neutral-200 bg-neutral-50' : 'border-neutral-300 hover:border-primary'} rounded-lg p-6 text-center transition-colors ${(applyStatus === 'submitted' || applyStatus === 'approved') ? 'opacity-50' : ''}`}>
                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    multiple
                    onChange={handleFileUpload}
                    disabled={applyStatus === 'submitted' || applyStatus === 'approved'}
                  />
                  <label htmlFor="file-upload" className={`cursor-pointer ${(applyStatus === 'submitted' || applyStatus === 'approved') ? 'cursor-not-allowed' : ''}`}>
                    <div className="flex flex-col items-center justify-center">
                      <svg className="w-10 h-10 text-neutral-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-sm text-neutral-600">点击或拖拽文件到此处上传</p>
                      <p className="text-xs text-neutral-500 mt-1">支持上传1-3个附件</p>
                    </div>
                  </label>
                </div>
                {/* 已上传文件列表 */}
                {formData.attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-neutral-50 rounded-lg p-3">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-neutral-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="text-sm text-neutral-700 truncate max-w-[200px]">{file.name}</span>
                        </div>
                        <button
                          type="button"
                          disabled={applyStatus === 'submitted' || applyStatus === 'approved'}
                          className={`text-red-500 hover:text-red-700 ${(applyStatus === 'submitted' || applyStatus === 'approved') ? 'opacity-50 cursor-not-allowed' : ''}`}
                          onClick={() => removeAttachment(index)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 表单底部按钮 */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  disabled={applyStatus === 'submitted' || applyStatus === 'approved'}
                  className="flex-1 py-3 px-4 border border-neutral-300 rounded-lg font-medium hover:bg-neutral-50 transition-colors disabled:bg-neutral-100 disabled:cursor-not-allowed"
                >
                  保存草稿
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={applyStatus === 'submitted' || applyStatus === 'approved'}
                  className="flex-1 bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:bg-neutral-300 disabled:cursor-not-allowed"
                >
                  {applyStatus === 'submitted' ? '已提交' : '提交报名'}
                </button>
              </div>
            </form>
          </div>

          {/* 右侧：赛事信息与状态区 */}
          <div className="space-y-6">
            {/* 赛事信息卡片 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-neutral-800 mb-4">赛事信息</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-neutral-800">{mockCompetition.title}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${mockCompetition.status === '报名中' ? 'bg-blue-100 text-blue-800' : mockCompetition.status === '审核中' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'}`}>
                    {mockCompetition.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">报名截止时间</span>
                    <span className="font-medium">{mockCompetition.deadline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">赛道数量</span>
                    <span className="font-medium">{mockCompetition.trackCount}个</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">赛事简介</h4>
                  <p className="text-sm text-neutral-600 line-clamp-4">{mockCompetition.description}</p>
                </div>
              </div>
            </div>

            {/* 报名进度卡片 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-neutral-800 mb-4">报名进度</h2>
              <div className="space-y-4">
                {[
                  { step: 1, title: '填写信息', status: applyStatus === 'draft' || applyStatus === 'rejected' ? 'current' : 'completed' },
                  { step: 2, title: '提交报名', status: applyStatus === 'draft' || applyStatus === 'rejected' ? 'pending' : applyStatus === 'submitted' ? 'current' : 'completed' },
                  { step: 3, title: '等待审核', status: applyStatus === 'submitted' ? 'current' : applyStatus === 'approved' || applyStatus === 'rejected' ? 'completed' : 'pending' },
                  { step: 4, title: '进入团队/作品流程', status: applyStatus === 'approved' ? 'current' : 'pending' }
                ].map((item, index) => (
                  <div key={item.step} className="flex items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${item.status === 'completed' ? 'bg-green-100 text-green-600' : item.status === 'current' ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-400'}`}>
                      {item.status === 'completed' ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        item.step
                      )}
                    </div>
                    <div>
                      <h3 className={`font-medium ${item.status === 'current' ? 'text-primary' : 'text-neutral-700'}`}>{item.title}</h3>
                      {index < 3 && (
                        <div className="h-8 w-0.5 bg-neutral-200 ml-4 mt-1"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 审核结果提示区域 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-neutral-800 mb-4">审核结果</h2>
              {applyStatus === 'draft' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-blue-700">请填写并提交报名</p>
                  </div>
                </div>
              )}
              {applyStatus === 'submitted' && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-.633-1.964-.633-2.732 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-orange-700">报名已提交，正在审核中</p>
                  </div>
                </div>
              )}
              {applyStatus === 'approved' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="text-green-700">报名已通过</p>
                      <Link
                        to="/team-hall"
                        className="mt-3 text-primary hover:underline text-sm font-medium inline-block"
                      >
                        进入团队流程
                      </Link>
                      <Link
                        to="/work-submission"
                        className="mt-3 text-primary hover:underline text-sm font-medium inline-block ml-4"
                      >
                        进入作品流程
                      </Link>
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
                      <button
                        type="button"
                        onClick={handleResubmit}
                        className="mt-3 text-primary hover:underline text-sm font-medium"
                      >
                        重新补充材料
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 返回链接 */}
        <div className="text-center mt-8">
          <Link to="/competition-center" className="text-primary hover:underline">
            返回赛事中心
          </Link>
        </div>
      </div>

      {/* 通知提示 */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-neutral-800 text-white px-4 py-3 rounded-lg shadow-lg">
          {notificationMessage}
        </div>
      )}
    </div>
  );
};

export default RegisterCompetition;