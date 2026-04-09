import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { request } from '../lib/api';

const WorkSubmission = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [checkLoading, setCheckLoading] = useState(true);
  const [checkError, setCheckError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      setCheckLoading(false);
      return;
    }

    const checkUserWorks = async () => {
      setCheckLoading(true);
      setCheckError('');

      try {
        const result = await request('/v1/works/my');
        if (result.ok && result.data.code === 0) {
          const works = result.data.data?.list || [];
          if (works.length > 0) {
            navigate(`/works/${works[0].id}`, { replace: true });
            return;
          } else {
            navigate('/my-works', { replace: true });
            return;
          }
        }
      } catch (err) {
        // 继续显示表单
      } finally {
        setCheckLoading(false);
      }
    };

    checkUserWorks();
  }, [isAuthenticated]);

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
        clearInterval(interval);
        setIsUploading(false);

        // 模拟上传完成
        const newFiles = files.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type || 'application/octet-stream',
          uploadTime: new Date().toLocaleString('zh-CN')
        }));

        setUploadedFiles(prev => [...prev, ...newFiles]);
        showToast(`${files.length} 个文件上传成功`);
      }
      setUploadProgress(Math.min(progress, 100));
    }, 200);
  };

  // 移除文件
  const handleRemoveFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    showToast('文件已移除');
  };

  // 格式化文件大小
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // 处理表单输入
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 提交作品
  const handleSubmit = () => {
    if (!isAuthenticated) {
      showToast('请先登录', 'error');
      return;
    }
    if (!formData.title.trim()) {
      showToast('请填写作品标题', 'error');
      return;
    }
    setShowConfirmModal(true);
  };

  // 确认提交
  const confirmSubmit = () => {
    setWorkStatus('submitted');
    setShowConfirmModal(false);
    showToast('作品提交成功');
  };

  // 删除提交记录
  const handleDeleteSubmission = (index) => {
    const updated = submissions.filter((_, i) => i !== index);
    setSubmissions(updated);
    showToast('提交记录已删除');
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 animate-fadeIn">
        <div className="max-w-lg mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-md p-12 border border-gray-100">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">请先登录</h2>
            <p className="text-gray-500 mb-8">登录后可提交作品</p>
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

  // Loading 状态
  if (checkLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">检查作品状态...</p>
        </div>
      </div>
    );
  }

  // 有作品的用户会在 useEffect 中通过 navigate 跳走
  // 继续显示表单（无作品用户）

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">作品提交</h1>
          <p className="text-neutral-600">在规定阶段内完成作品提交</p>
        </div>

        {/* Dev 调试区 */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-700 font-semibold">开发模式：有作品用户将自动跳转</p>
          </div>
        )}

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
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                workStatus === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                workStatus === 'submitted' ? 'bg-green-100 text-green-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {workStatus === 'draft' ? '草稿' :
                 workStatus === 'submitted' ? '已提交' :
                 workStatus === 'under_review' ? '评审中' :
                 workStatus === 'reviewed' ? '已评审' : workStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Dev 调试区 */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-700">
              <span className="font-semibold">联调模式：</span>当前为无作品用户，显示作品提交表单
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：作品信息表单 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 基本信息 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-neutral-800 mb-4">基本信息</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">作品标题 *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="请输入作品标题"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">作品描述 *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="请详细描述您的作品，包括创新点、技术实现、预期效果等"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">使用的AI工具</label>
                  <input
                    type="text"
                    name="aiTools"
                    value={formData.aiTools}
                    onChange={handleInputChange}
                    placeholder="如：ChatGPT、Midjourney、Stable Diffusion 等"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">算力使用情况</label>
                  <input
                    type="text"
                    name="computeUsage"
                    value={formData.computeUsage}
                    onChange={handleInputChange}
                    placeholder="请描述您的算力使用情况"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* 文件上传 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-neutral-800 mb-4">附件上传</h3>
              <p className="text-sm text-neutral-500 mb-4">支持上传项目源码、架构图、演示视频等文件，请确保文件格式正确（doc/docx/pdf/mp4）</p>

              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".doc,.docx,.pdf,.mp4"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-neutral-600 mb-2">点击或拖拽文件到此区域</p>
                  <p className="text-sm text-neutral-400">支持 doc、docx、pdf、mp4 格式</p>
                </label>
              </div>

              {/* 上传进度 */}
              {isUploading && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-neutral-600">上传中...</span>
                    <span className="text-sm text-primary">{Math.round(uploadProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* 已上传文件列表 */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="text-sm font-medium text-neutral-700">已上传文件</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-neutral-700 truncate">{file.name}</p>
                          <p className="text-xs text-neutral-400">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 操作按钮 */}
            <div className="flex justify-end gap-4">
              <button
                onClick={handleSaveDraft}
                className="px-6 py-3 rounded-xl border border-gray-200 text-neutral-600 font-medium hover:bg-gray-50 transition-colors"
              >
                保存草稿
              </button>
              <button
                onClick={handleSubmit}
                className="px-8 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
              >
                提交作品
              </button>
            </div>
          </div>

          {/* 右侧：提交记录 */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-neutral-800 mb-4">提交记录</h3>

              {submissions.length === 0 ? (
                <p className="text-neutral-400 text-center py-8">暂无提交记录</p>
              ) : (
                <div className="space-y-4">
                  {submissions.map((item, index) => (
                    <div key={index} className="border border-gray-100 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            item.isFinal
                              ? 'bg-primary/10 text-primary'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {item.version}
                          </span>
                          {item.isFinal && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded">
                              最终版
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-neutral-400">{item.submitTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${
                          item.status === '已提交' ? 'text-green-600' :
                          item.status === '待修改' ? 'text-yellow-600' : 'text-gray-600'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AI 评分 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-neutral-800 mb-4">AI 自评</h3>
              <div className="text-center py-4">
                <div className="relative inline-flex items-center justify-center w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#e5e7eb"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#10b981"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(mockScore.totalScore / 100) * 351.86} 351.86`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-neutral-800">{mockScore.totalScore}</span>
                    <span className="text-xs text-neutral-400">AI评分</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">创新性</span>
                    <span className="font-medium text-neutral-800">{mockScore.innovation}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">技术实现</span>
                    <span className="font-medium text-neutral-800">{mockScore.technology}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">实用性</span>
                    <span className="font-medium text-neutral-800">{mockScore.practicality}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">展示效果</span>
                    <span className="font-medium text-neutral-800">{mockScore.presentation}</span>
                  </div>
                </div>

                <p className="mt-4 text-sm text-neutral-500 italic">{mockScore.comment}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 提交确认弹窗 */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
            <h3 className="text-xl font-bold text-neutral-800 mb-4">确认提交</h3>
            <p className="text-neutral-600 mb-6">
              提交后将无法修改作品内容，请确认所有信息无误后提交。
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-6 py-2 rounded-xl border border-gray-200 text-neutral-600 hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={confirmSubmit}
                className="px-6 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                确认提交
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast 通知 */}
      {showNotification && (
        <div className={`fixed top-24 right-8 px-6 py-4 rounded-xl shadow-lg z-50 animate-slideIn ${
          notificationType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notificationMessage}
        </div>
      )}
    </div>
  );
};

export default WorkSubmission;
