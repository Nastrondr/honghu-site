import React, { useState } from 'react';

const Enterprise = () => {
  // TODO: 接入企业申请接口 - 替换为真实API调用
  const [enterpriseStatus, setEnterpriseStatus] = useState('draft'); // draft | submitted

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    industry: '',
    description: '',
    hasAiProject: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 接入企业申请接口 - 调用提交申请API
    setEnterpriseStatus('submitted');
  };

  const handleReset = () => {
    setFormData({
      companyName: '',
      contactName: '',
      phone: '',
      email: '',
      industry: '',
      description: '',
      hasAiProject: ''
    });
  };

  // ========== 已提交状态 ==========
  if (enterpriseStatus === 'submitted') {
    return (
      <div className="min-h-screen bg-gray-50/50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            {/* 成功图标 */}
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">申请已提交</h2>
            <p className="text-gray-500 mb-2">
              感谢您的申请，我们将尽快
              <span className="text-primary font-medium">1-3个工作日</span>
              内与您联系
            </p>
            <p className="text-sm text-gray-400 mb-8">
              请保持联系方式畅通，工作人员将向您了解详细合作需求
            </p>

            {/* 合作价值 */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
              <p className="text-sm font-medium text-gray-700 mb-3">企业合作支持</p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>算力资源支持</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>AI项目评审与认证</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>生态资源对接</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setEnterpriseStatus('draft')}
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              查看其他合作方式
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========== 草稿/填写状态 ==========
  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* 页面标题 */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">企业数字化转型通道</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            企业可通过大赛提交AI应用方案，参与评审与认证，获得算力支持与生态资源
          </p>
        </div>

        {/* 合作价值卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-800 mb-1">算力支持</h3>
            <p className="text-xs text-gray-500">获得大赛提供的算力资源支持</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-800 mb-1">评审认证</h3>
            <p className="text-xs text-gray-500">参与AI项目评审与认证</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-800 mb-1">生态资源</h3>
            <p className="text-xs text-gray-500">对接大赛生态资源与合作机会</p>
          </div>
        </div>

        {/* 申请表单 */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* 基础信息 */}
          <div className="mb-8">
            <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-xs font-bold mr-2">1</span>
              企业信息
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    企业名称 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                    placeholder="请输入企业名称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    联系人 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                    placeholder="请输入联系人姓名"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    联系方式 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                    placeholder="请输入联系电话"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    邮箱 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                    placeholder="请输入邮箱"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  所属行业 <span className="text-red-500">*</span>
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                >
                  <option value="">请选择所属行业</option>
                  <option value="金融">金融</option>
                  <option value="医疗">医疗</option>
                  <option value="教育">教育</option>
                  <option value="制造">制造</option>
                  <option value="零售">零售</option>
                  <option value="物流">物流</option>
                  <option value="政务">政务</option>
                  <option value="其他">其他</option>
                </select>
              </div>
            </div>
          </div>

          {/* 合作需求 */}
          <div className="mb-8 pt-6 border-t border-gray-100">
            <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-xs font-bold mr-2">2</span>
              合作需求
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  需求描述 <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                  placeholder="请简要描述您的AI应用需求或合作意向"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  是否已有AI项目 <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="hasAiProject"
                      value="是"
                      checked={formData.hasAiProject === '是'}
                      onChange={handleChange}
                      required
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">是</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="hasAiProject"
                      value="否"
                      checked={formData.hasAiProject === '否'}
                      onChange={handleChange}
                      required
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">否</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* 提交按钮 */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 py-3.5 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-all"
            >
              重置
            </button>
            <button
              type="submit"
              className="flex-[2] py-3.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all"
            >
              提交申请
            </button>
          </div>
        </form>

        {/* 底部提示 */}
        <p className="text-center text-xs text-gray-400 mt-6">
          如有疑问，请联系工作人员：contact@honghu-ai.com
        </p>
      </div>
    </div>
  );
};

export default Enterprise;