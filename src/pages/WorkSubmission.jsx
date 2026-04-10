import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { request } from '../lib/api';

const WorkSubmission = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [checkLoading, setCheckLoading] = useState(true);

  // 可用赛事列表
  const [competitions, setCompetitions] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      setCheckLoading(false);
      return;
    }

    // 获取可用赛事列表
    const fetchCompetitions = async () => {
      try {
        const result = await request('/v1/competitions');
        if (result.ok && result.data.code === 0) {
          const list = result.data.data?.list || [];
          setCompetitions(list);
          if (list.length > 0) {
            setSelectedCompetition(list[0].id);
            setTracks(list[0].tracks || []);
            if (list[0].tracks?.length > 0) {
              setSelectedTrack(list[0].tracks[0].id);
            }
          }
        }
      } catch (err) {
        console.error('获取赛事列表失败:', err);
      } finally {
        setCheckLoading(false);
      }
    };

    fetchCompetitions();
  }, [isAuthenticated]);

  // 赛事切换时更新赛道
  useEffect(() => {
    if (selectedCompetition) {
      const comp = competitions.find(c => c.id === selectedCompetition);
      if (comp) {
        setTracks(comp.tracks || []);
        if (comp.tracks?.length > 0) {
          setSelectedTrack(comp.tracks[0].id);
        } else {
          setSelectedTrack('');
        }
      }
    }
  }, [selectedCompetition, competitions]);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');

  // 文件上传相关状态
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // 提交确认弹窗
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 表单数据
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fileUrl: '',
    aiTools: '',
    computeUsage: ''
  });

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
    showToast('草稿保存成功（本地模拟）');
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

  // 提交作品 - 创建新作品
  const handleSubmit = async () => {
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

  // 确认提交 - 调用创建作品API
  const confirmSubmit = async () => {
    if (!selectedCompetition || !selectedTrack) {
      showToast('请选择赛事和赛道', 'error');
      setShowConfirmModal(false);
      return;
    }

    setSubmitting(true);
    try {
      // 创建作品
      const result = await request('/v1/works', {
        method: 'POST',
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          competitionId: selectedCompetition,
          trackId: selectedTrack,
          userId: user?.id,
        }),
      });

      if (result.ok && result.data.code === 0) {
        const newWork = result.data.data;
        showToast('作品创建成功');
        // 跳转到作品详情页继续完善
        setTimeout(() => {
          navigate(`/works/${newWork.id}`);
        }, 1500);
      } else {
        showToast(result.data.message || '作品创建失败', 'error');
      }
    } catch (err) {
      showToast('网络错误，请重试', 'error');
    } finally {
      setSubmitting(false);
      setShowConfirmModal(false);
    }
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
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">作品提交</h1>
          <p className="text-neutral-600">创建您的参赛作品</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：作品信息表单 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 基本信息 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-neutral-800 mb-4">基本信息</h3>
              <div className="space-y-4">
                {/* 赛事选择 */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">选择赛事 *</label>
                  <select
                    value={selectedCompetition}
                    onChange={(e) => setSelectedCompetition(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  >
                    {competitions.length === 0 && (
                      <option value="">暂无可用赛事</option>
                    )}
                    {competitions.map(comp => (
                      <option key={comp.id} value={comp.id}>{comp.name}</option>
                    ))}
                  </select>
                </div>

                {/* 赛道选择 */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">选择赛道 *</label>
                  <select
                    value={selectedTrack}
                    onChange={(e) => setSelectedTrack(e.target.value)}
                    disabled={tracks.length === 0}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:bg-gray-100"
                  >
                    {tracks.length === 0 && (
                      <option value="">请先选择赛事</option>
                    )}
                    {tracks.map(track => (
                      <option key={track.id} value={track.id}>{track.name}</option>
                    ))}
                  </select>
                </div>

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
                disabled={submitting}
                className="px-8 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 disabled:opacity-50"
              >
                {submitting ? '提交中...' : '提交作品'}
              </button>
            </div>
          </div>

          {/* 右侧：帮助信息 */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-neutral-800 mb-4">提交须知</h3>
              <div className="space-y-3 text-sm text-neutral-600">
                <p>1. 请先选择要参加的赛事和赛道</p>
                <p>2. 填写作品标题和描述</p>
                <p>3. 上传相关附件（可选）</p>
                <p>4. 点击提交创建作品</p>
                <p className="text-primary">提交后可进入作品详情页继续完善版本</p>
              </div>
            </div>

            {/* 赛事信息 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-neutral-800 mb-4">当前赛事</h3>
              {selectedCompetition ? (
                <div className="text-sm">
                  <p className="font-medium text-neutral-800 mb-1">
                    {competitions.find(c => c.id === selectedCompetition)?.name || '-'}
                  </p>
                  <p className="text-neutral-500">
                    赛道：{tracks.find(t => t.id === selectedTrack)?.name || '-'}
                  </p>
                </div>
              ) : (
                <p className="text-neutral-400 text-sm">请先选择赛事</p>
              )}
            </div>

            {/* 开发调试 */}
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-sm font-bold text-blue-700 mb-2">开发调试</h3>
                <div className="text-xs text-blue-600 space-y-1">
                  <p>赛事数：{competitions.length}</p>
                  <p>赛道数：{tracks.length}</p>
                  <p>选中赛事：{selectedCompetition || '无'}</p>
                  <p>选中赛道：{selectedTrack || '无'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 提交确认弹窗 */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
            <h3 className="text-xl font-bold text-neutral-800 mb-4">确认提交</h3>
            <p className="text-neutral-600 mb-6">
              确认创建作品？创建后可进入作品详情页继续完善版本信息。
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
                disabled={submitting}
                className="px-6 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {submitting ? '创建中...' : '确认创建'}
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
