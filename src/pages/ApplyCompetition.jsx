import React, { useState } from 'react';

const ApplyCompetition = () => {
  const [formData, setFormData] = useState({
    name: '',
    unit: '',
    position: '',
    phone: '',
    email: '',
    type: '',
    location: '',
    scale: '',
    theme: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">申请已提交</h2>
            <p className="text-neutral-600 mb-6">
              感谢您的申请，工作人员将在3-5个工作日内与您联系。
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '',
                  unit: '',
                  position: '',
                  phone: '',
                  email: '',
                  type: '',
                  location: '',
                  scale: '',
                  theme: '',
                  notes: ''
                });
              }}
              className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all"
            >
              提交新申请
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-800 mb-4">申请办赛</h1>
          <p className="text-neutral-600 text-lg">申请举办梧桐·鸿鹄人工智能应用创新大赛分赛区</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  申请人姓名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="请输入姓名"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  单位名称 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="请输入单位名称"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  职位 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="请输入职位"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  联系电话 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="请输入联系电话"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  邮箱 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="请输入邮箱"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  申请类型 <span className="text-red-500">*</span>
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                >
                  <option value="">请选择申请类型</option>
                  <option value="区县赛">区县赛</option>
                  <option value="校园赛">校园赛</option>
                  <option value="企业赛">企业赛</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  拟举办地点 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="请输入拟举办地点"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  预计规模 <span className="text-red-500">*</span>
                </label>
                <select
                  name="scale"
                  value={formData.scale}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
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
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                赛事主题
              </label>
              <input
                type="text"
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="请输入赛事主题（可选）"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                备注
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                placeholder="请输入其他说明（可选）"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all"
            >
              提交申请
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyCompetition;
