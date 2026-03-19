import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const WorkSubmission = () => {
  const { user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fileUrl: '',
    aiTools: '',
    computeUsage: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const mockSubmission = {
    version: 'V1.2',
    submitTime: '2024-11-15 14:30',
    status: '已提交',
    isCurrent: true
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('请先登录');
      return;
    }
    setSubmitStatus('success');
    alert('作品提交成功！');
  };

  const handleSaveDraft = () => {
    if (!isAuthenticated) {
      alert('请先登录');
      return;
    }
    alert('草稿保存成功');
  };

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

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-bold text-neutral-800 mb-4">提交作品</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                作品名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="请输入作品名称"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
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
                placeholder="请简要介绍您的作品（500字以内）"
                rows={4}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                上传作品文件 / 视频链接 <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <svg className="w-12 h-12 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-neutral-600 mb-2">点击或拖拽文件到此处上传</p>
                <p className="text-neutral-400 text-sm">支持 MP4、PDF、DOCX 格式，大小不超过500MB</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                AI工具说明 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.aiTools}
                onChange={(e) => setFormData({...formData, aiTools: e.target.value})}
                placeholder="请说明作品中使用的AI模型、工具及其作用"
                rows={3}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
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
                placeholder="请说明使用的算力资源，如GPU型号、训练时长等"
                rows={3}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
              >
                保存草稿
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                提交作品
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-bold text-neutral-800 mb-4">最近提交记录</h2>
          
          <div className="border border-neutral-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-neutral-50">
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-neutral-800">{mockSubmission.version}</span>
                {mockSubmission.isCurrent && (
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">当前版本</span>
                )}
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                {mockSubmission.status}
              </span>
            </div>
            <div className="p-4">
              <div className="flex items-center text-neutral-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>提交时间：{mockSubmission.submitTime}</span>
              </div>
            </div>
          </div>

          {submitStatus === 'success' && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-700">作品提交成功！</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkSubmission;