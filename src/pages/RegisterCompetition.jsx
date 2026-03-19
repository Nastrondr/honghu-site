import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterCompetition = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    organization: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 模拟表单提交
    setIsSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-fadeIn">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-neutral-800 mb-4">报名参赛</h1>
          <p className="text-neutral-600">参加「梧桐·鸿鹄人工智能应用创新大赛」</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          {/* 报名说明 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">报名说明</h2>
            <ul className="space-y-3 text-neutral-600">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>报名后系统将自动创建团队</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>团队赛可邀请成员加入</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>报名成功后可访问赛题数据与提交作品</span>
              </li>
            </ul>
          </div>

          {/* 报名表单 */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
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
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
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
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="请输入您的邮箱"
                  required
                />
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-neutral-700 mb-2">
                  学校 / 公司
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="请输入您的学校或公司"
                  required
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  确认报名
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">报名成功</h2>
              <p className="text-neutral-600 mb-6">已创建团队，您可以开始邀请成员加入</p>
              <Link
                to="/competition-center"
                className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors inline-block"
              >
                前往团队大厅
              </Link>
            </div>
          )}
        </div>

        <div className="text-center">
          <Link to="/competition-center" className="text-primary hover:underline">
            返回赛事中心
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompetition;