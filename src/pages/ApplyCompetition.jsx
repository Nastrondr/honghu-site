import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ApplyCompetition = () => {
  const navigate = useNavigate();
  
  // TODO: 接入办赛申请接口 - 替换为真实API调用
  const [applyStatus, setApplyStatus] = useState('draft'); // draft | submitted

  const [formData, setFormData] = useState({
    organizationName: '',
    contactName: '',
    phone: '',
    email: '',
    organizationType: '',
    region: '',
    description: '',
    applyType: '',
    expectedScale: '',
    hasVenue: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 接入办赛申请接口 - 调用提交申请API
    setApplyStatus('submitted');
  };

  const handleReset = () => {
    setFormData({
      organizationName: '',
      contactName: '',
      phone: '',
      email: '',
      organizationType: '',
      region: '',
      description: '',
      applyType: '',
      expectedScale: '',
      hasVenue: '',
      notes: ''
    });
  };

  // ========== 已提交状态 ==========
  if (applyStatus === 'submitted') {
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
              感谢您的申请，我们将在
              <span className="text-primary font-medium">3-5个工作日</span>
              内与您联系
            </p>
            <p className="text-sm text-gray-400 mb-8">
              请保持联系方式畅通，工作人员将向您了解详细合作方案
            </p>

            {/* 进度提示 */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <p className="text-sm font-medium text-gray-700 mb-4">申请流程</p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs">1</span>
                <span className="w-8 h-0.5 bg-green-400"></span>
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs">2</span>
                <span className="w-8 h-0.5 bg-gray-200"></span>
                <span className="w-6 h-6 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center text-xs">3</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2 px-2">
                <span>提交申请</span>
                <span className="ml-8">审核联系</span>
                <span>合作启动</span>
              </div>
            </div>

            <button
              onClick={() => setApplyStatus('draft')}
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
    <div className="min-h-screen bg-gray-50/50 pb-20 md:py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* 页面标题 */}
        <div className="relative text-center mb-6 md:mb-10">
          {/* 返回按钮 - 移动端 */}
          <button
            onClick={() => navigate('/competition-center')}
            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-3">申请成为赛事合作单位</h1>
          <p className="text-sm md:text-base text-gray-500 hidden md:block">携手共建AI创新生态，欢迎加入梧桐·鸿鹄大赛</p>
        </div>

        {/* 申请类型选择（移动端按钮形式，PC端使用原select） */}
        <div className="md:hidden mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            申请类型 <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['区县赛', '校园赛', '联合主办'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, applyType: type }))}
                className={`py-2.5 text-sm font-medium rounded-lg border transition-all ${
                  formData.applyType === type
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-200 text-gray-600 bg-white hover:border-primary/50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* 申请表单 */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-8">
          {/* 基础信息 */}
          <div className="mb-5 md:mb-8">
            <h2 className="text-base font-semibold text-gray-800 mb-3 md:mb-4 flex items-center">
              <span className="w-6 h-6 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-xs font-bold mr-2">1</span>
              基础信息
            </h2>
            <div className="space-y-3 md:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                    单位名称 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 h-11 md:h-auto rounded-lg md:rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-base"
                    placeholder="请输入单位名称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                    联系人姓名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 h-11 md:h-auto rounded-lg md:rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-base"
                    placeholder="请输入联系人姓名"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                    联系电话 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 h-11 md:h-auto rounded-lg md:rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-base"
                    placeholder="请输入联系电话"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                    邮箱 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 h-11 md:h-auto rounded-lg md:rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-base"
                    placeholder="请输入邮箱"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 机构信息 */}
          <div className="mb-5 md:mb-8 pt-4 md:pt-6 border-t border-gray-100">
            <h2 className="text-base font-semibold text-gray-800 mb-3 md:mb-4 flex items-center">
              <span className="w-6 h-6 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-xs font-bold mr-2">2</span>
              机构信息
            </h2>
            <div className="space-y-3 md:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                    单位类型 <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="organizationType"
                    value={formData.organizationType}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 h-11 md:h-auto rounded-lg md:rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-base"
                  >
                    <option value="">请选择单位类型</option>
                    <option value="高校">高校</option>
                    <option value="企业">企业</option>
                    <option value="园区">园区</option>
                    <option value="政府">政府</option>
                    <option value="其他">其他</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                    所在地区 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 h-11 md:h-auto rounded-lg md:rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-base"
                    placeholder="请输入所在地区"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                  单位简介 <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all resize-none min-h-[100px] md:min-h-0 text-base"
                  placeholder="请简要介绍单位情况"
                />
              </div>
            </div>
          </div>

          {/* 申请内容 */}
          <div className="mb-5 md:mb-8 pt-4 md:pt-6 border-t border-gray-100">
            <h2 className="text-base font-semibold text-gray-800 mb-3 md:mb-4 flex items-center">
              <span className="w-6 h-6 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-xs font-bold mr-2">3</span>
              申请内容
            </h2>
            <div className="space-y-3 md:space-y-4">
              {/* PC端申请类型选择 */}
              <div className="hidden md:block">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  申请类型 <span className="text-red-500">*</span>
                </label>
                <select
                  name="applyType"
                  value={formData.applyType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                >
                  <option value="">请选择申请类型</option>
                  <option value="区县赛">区县赛</option>
                  <option value="校园赛">校园赛</option>
                  <option value="联合主办">联合主办</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                    预计规模 <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="expectedScale"
                    value={formData.expectedScale}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 h-11 md:h-auto rounded-lg md:rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-base"
                  >
                    <option value="">请选择预计规模</option>
                    <option value="50人以下">50人以下</option>
                    <option value="50-100人">50-100人</option>
                    <option value="100-500人">100-500人</option>
                    <option value="500人以上">500人以上</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                  是否有场地资源 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, hasVenue: '是' }))}
                    className={`py-2.5 text-sm font-medium rounded-lg border transition-all ${
                      formData.hasVenue === '是'
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-200 text-gray-600 bg-white hover:border-primary/50'
                    }`}
                  >
                    有场地
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, hasVenue: '否' }))}
                    className={`py-2.5 text-sm font-medium rounded-lg border transition-all ${
                      formData.hasVenue === '否'
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-200 text-gray-600 bg-white hover:border-primary/50'
                    }`}
                  >
                    无场地
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                  备注说明
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all resize-none min-h-[80px] md:min-h-0 text-base"
                  placeholder="如有其他合作意向或说明，请在此填写（可选）"
                />
              </div>
            </div>
          </div>

          {/* 提交按钮 */}
          <div className="pt-4 border-t border-gray-100">
            <div className="hidden md:flex gap-3">
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
            <button
              type="submit"
              className="md:hidden w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all"
            >
              提交申请
            </button>
          </div>
        </form>

        {/* 底部提示 */}
        <p className="hidden md:block text-center text-xs text-gray-400 mt-6">
          如有疑问，请联系工作人员：contact@honghu-ai.com
        </p>
      </div>
    </div>
  );
};

export default ApplyCompetition;