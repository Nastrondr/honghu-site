import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const WorkSubmission = () => {
  const { isAuthenticated } = useAuth();

  // 作品状态控制 - draft / submitted / under_review / reviewed / awarded
  const [workStatus, setWorkStatus] = useState('draft');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const [currentVersion, setCurrentVersion] = useState('V1.2');
  const [finalVersion, setFinalVersion] = useState('V1.2');

  // 文件上传相关状态
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // 提交确认弹窗
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // 表单数据
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fileUrl: '',
    aiTools: '',
    computeUsage: ''
  });

  // 模拟提交记录数据
  const [submissions, setSubmissions] = useState([
    { version: 'V1.0', submitTime: '2024-11-10 10:00', status: '已提交', isFinal: false },
    { version: 'V1.1', submitTime: '2024-11-12 15:30', status: '已提交', isFinal: false },
    { version: 'V1.2', submitTime: '2024-11-15 14:30', status: '已提交', isFinal: true }
  ]);

  // 模拟评分数据（预留）
  const mockScore = {
    totalScore: 85,
    innovation: 88,
    technology: 82,
    practicality: 85,
    presentation: 85,
    comment: '作品整体表现良好，创新性强，技术实现有一定难度。'
  };

  // 显示通知提示
  const showToast = (message, type = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // 保存草稿
  const handleSaveDraft = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      showToast('请先登录', 'error');
      return;
    }
    // TODO: 接入作品接口 - 调用保存草稿API
    showToast('草稿保存成功');
  };

  // 处理文件上传
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // 模拟上传进度
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        setUploadProgress(100);

        // 上传完成后添加文件到列表
        const newFiles = files.map(file => ({
          id: Date.now() + Math.random(),
          name: file.name,
          size: formatFileSize(file.size),
          type: file.type
        }));

        setUploadedFiles(prev => [...prev, ...newFiles]);
        setIsUploading(false);
        clearInterval(interval);
        showToast(`${files.length}个文件上传成功`);
      } else {
        setUploadProgress(Math.min(progress, 99));
      }
    }, 300);
  };

  // 格式化文件大小
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // 删除文件
  const handleRemoveFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    showToast('文件已删除');
  };

  // 提交作品
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      showToast('请先登录', 'error');
      return;
    }
    // 显示确认弹窗
    setShowConfirmModal(true);
  };

  // 确认提交
  const handleConfirmSubmit = () => {
    // TODO: 接入作品接口 - 调用提交作品API
    setWorkStatus('submitted');
    // 添加新提交记录
    const newSubmission = {
      version: currentVersion,
      submitTime: new Date().toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(/\//g, '-'),
      status: '已提交',
      isFinal: true
    };
    // 将之前的最终版本标记为非最终
    setSubmissions(prev => prev.map(s => ({ ...s, isFinal: false })));
    setSubmissions(prev => [...prev, newSubmission]);
    setFinalVersion(currentVersion);
    setShowConfirmModal(false);
    showToast('作品提交成功');
  };

  // 新建版本
  const handleNewVersion = () => {
    // 解析当前版本号
    const versionParts = currentVersion.split('.');
    const major = versionParts[0];
    const minor = parseInt(versionParts[1]) + 1;
    const newVersion = `${major}.${minor}`;

    setCurrentVersion(newVersion);
    setWorkStatus('draft');
    // 清空表单
    setFormData({
      title: '',
      description: '',
      fileUrl: '',
      aiTools: '',
      computeUsage: ''
    });
    // 清空已上传文件
    setUploadedFiles([]);
    showToast(`已创建新版本 ${newVersion}`);
  };

  // 获取状态颜色
  const getStatusColor = (status) => {
    switch (status) {
      case 'draft':
        return 'bg-blue-100 text-blue-800';
      case 'submitted':
        return 'bg-orange-100 text-orange-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-green-100 text-green-800';
      case 'awarded':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 获取状态文字
  const getStatusText = (status) => {
    switch (status) {
      case 'draft':
        return '草稿';
      case 'submitted':
        return '已提交';
      case 'under_review':
        return '评审中';
      case 'reviewed':
        return '已评审';
      case 'awarded':
        return '已获奖';
      default:
        return status;
    }
  };

  // 判断表单是否可编辑
  const isFormEditable = () => {
    return workStatus === 'draft';
  };

  // 未登录状态
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12 animate-fadeIn">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-xl shadow-md p-12">
            <svg className="w-16 h-16 text-neutral-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">请先登录</h2>
            <p className="text-neutral-600 mb-8">登录后可提交作品</p>
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

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">作品提交</h1>
          <p className="text-neutral-600">在规定阶段内完成作品提交</p>
        </div>

        {/* 赛事信息卡片 */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-neutral-800 mb-2">2024年梧桐·鸿鹄人工智能应用创新大赛</h2>
              <div className="flex flex-wrap gap-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  初赛提交阶段
                </span>
                <span className="text-neutral-600 text-sm">截止时间：2024-11-30 23:59</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-neutral-500 text-sm mb-1">当前团队</p>
              <p className="text-lg font-semibold text-neutral-800">AI创新先锋队</p>
            </div>
          </div>
        </div>

        {/* 作品状态提示区域 */}
        {workStatus === 'submitted' && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-orange-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-.633-1.964-.633-2.732 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-orange-700">作品已提交，当前版本已锁定，无法修改</p>
              </div>
              <button
                onClick={handleNewVersion}
                className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                新建版本
              </button>
            </div>
          </div>
        )}

        {workStatus === 'under_review' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-yellow-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-yellow-700">评审中，请耐心等待...</p>
            </div>
          </div>
        )}

        {/* 获奖提示（预留） */}
        {workStatus === 'awarded' && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <p className="text-purple-700">恭喜！您的作品在本次大赛中获奖</p>
            </div>
          </div>
        )}

        {/* 提交要求卡片 */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-bold text-neutral-800 mb-4">提交要求</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
              <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-neutral-700">支持格式：MP4（1080p）、PDF、DOCX</span>
            </div>
            <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
              <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-neutral-700">时长要求：个人赛3-5分钟，团队赛5-8分钟</span>
            </div>
            <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
              <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-neutral-700">文字说明：500字以内</span>
            </div>
            <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
              <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="text-neutral-700">AI工具说明：需说明使用的AI模型</span>
            </div>
            <div className="flex items-center p-3 bg-neutral-50 rounded-lg md:col-span-2">
              <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              <span className="text-neutral-700">算力使用记录：需说明使用的算力资源</span>
            </div>
          </div>
        </div>

        {/* 作品表单 */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold text-neutral-800">提交作品</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(workStatus)}`}>
                {getStatusText(workStatus)}
              </span>
            </div>
            <span className="text-neutral-500">当前版本：{currentVersion}</span>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                作品名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                disabled={!isFormEditable()}
                className={`w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${!isFormEditable() ? 'bg-neutral-50 cursor-not-allowed' : ''}`}
                placeholder="请输入作品名称"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                作品简介 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                disabled={!isFormEditable()}
                placeholder="请简要介绍您的作品（500字以内）"
                rows={4}
                className={`w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none ${!isFormEditable() ? 'bg-neutral-50 cursor-not-allowed' : ''}`}
                required
              />
            </div>

            {/* 文件上传区域 */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                上传作品文件 / 视频链接 <span className="text-red-500">*</span>
              </label>

              {/* 上传区域 */}
              {isFormEditable() ? (
                <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 hover:border-primary transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    multiple
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer block">
                    <div className="flex flex-col items-center justify-center">
                      <svg className="w-10 h-10 text-neutral-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-neutral-600 mb-1">点击或拖拽文件到此处上传</p>
                      <p className="text-neutral-400 text-sm">支持 MP4、PDF、DOCX 格式，大小不超过500MB</p>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="border-2 border-dashed border-neutral-200 bg-neutral-50 rounded-lg p-6 text-center">
                  <p className="text-neutral-500">文件已锁定，不可修改</p>
                </div>
              )}

              {/* 上传进度条 */}
              {isUploading && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-600">上传中...</span>
                    <span className="text-primary">{Math.round(uploadProgress)}%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* 已上传文件列表 */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium text-neutral-700">已上传文件</h4>
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between bg-neutral-50 rounded-lg p-3">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-neutral-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div>
                          <p className="text-sm text-neutral-700 truncate max-w-[200px]">{file.name}</p>
                          <p className="text-xs text-neutral-500">{file.size}</p>
                        </div>
                      </div>
                      {isFormEditable() && (
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(file.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                AI工具说明 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.aiTools}
                onChange={(e) => setFormData({...formData, aiTools: e.target.value})}
                disabled={!isFormEditable()}
                placeholder="请说明作品中使用的AI模型、工具及其作用"
                rows={3}
                className={`w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none ${!isFormEditable() ? 'bg-neutral-50 cursor-not-allowed' : ''}`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                算力使用记录 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.computeUsage}
                onChange={(e) => setFormData({...formData, computeUsage: e.target.value})}
                disabled={!isFormEditable()}
                placeholder="请说明使用的算力资源，如GPU型号、训练时长等"
                rows={3}
                className={`w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none ${!isFormEditable() ? 'bg-neutral-50 cursor-not-allowed' : ''}`}
                required
              />
            </div>

            {/* 评分展示区域（已评审状态显示） */}
            {workStatus === 'reviewed' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4">评审结果</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">总分</span>
                    <span className="text-2xl font-bold text-green-700">{mockScore.totalScore}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">创新性</span>
                    <span className="font-medium">{mockScore.innovation}分</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">技术实现</span>
                    <span className="font-medium">{mockScore.technology}分</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">实用性</span>
                    <span className="font-medium">{mockScore.practicality}分</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">展示效果</span>
                    <span className="font-medium">{mockScore.presentation}分</span>
                  </div>
                  <div className="pt-3 border-t border-green-200">
                    <p className="text-neutral-600 mb-2">评委评语</p>
                    <p className="text-neutral-700">{mockScore.comment}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 获奖信息展示（预留） */}
            {workStatus === 'awarded' && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <svg className="w-8 h-8 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-purple-800">恭喜获奖！</h3>
                </div>
                <p className="text-purple-700">您的作品在本次大赛中获得优异成绩，具体奖项信息请查看官方公告。</p>
              </div>
            )}

            {/* 表单操作按钮 */}
            {isFormEditable() && (
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
                >
                  保存草稿
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  提交作品
                </button>
              </div>
            )}
          </form>
        </div>

        {/* 提交记录 */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-bold text-neutral-800 mb-4">提交记录</h2>

          <div className="space-y-4">
            {submissions.map((submission, index) => (
              <div key={index} className={`border rounded-lg overflow-hidden ${submission.isFinal ? 'border-primary' : 'border-neutral-200'}`}>
                <div className="flex items-center justify-between p-4 bg-neutral-50">
                  <div className="flex items-center gap-4">
                    <span className={`text-lg font-semibold ${submission.isFinal ? 'text-primary' : 'text-neutral-800'}`}>
                      {submission.version}
                    </span>
                    {submission.isFinal && (
                      <span className="px-2 py-1 bg-primary text-white rounded text-xs">最终提交版本</span>
                    )}
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {submission.status}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center text-neutral-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>提交时间：{submission.submitTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 提交确认弹窗 */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-.633-1.964-.633-2.732 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">确认提交</h3>
              <p className="text-neutral-600 mb-6">提交后将无法修改，是否确认提交？</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-3 border border-neutral-300 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleConfirmSubmit}
                  className="flex-1 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  确认提交
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast通知 */}
      {showNotification && (
        <div className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg ${notificationType === 'error' ? 'bg-red-600 text-white' : 'bg-neutral-800 text-white'}`}>
          {notificationMessage}
        </div>
      )}
    </div>
  );
};

export default WorkSubmission;