import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    phone: '',
    code: '',
    password: '',
    confirmPassword: ''
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('两次输入的密码不一致');
      return;
    }
    login({
      phone: formData.phone,
      name: formData.phone
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center py-6 md:py-12 px-4">
      <div className="max-w-md w-full space-y-6 md:space-y-8">
        {/* 顶部区域 - 移动端紧凑 */}
        <div className="text-center space-y-1 md:space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">注册</h1>
          <p className="text-[15px] md:text-base text-neutral-600">创建账号，开始你的AI创新之旅</p>
        </div>

        {/* 表单卡片 - 移动端紧凑内边距 */}
        <div className="bg-white rounded-xl shadow-sm md:shadow-md p-5 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* 手机号 */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1.5 md:mb-2">
                手机号
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 h-12 md:h-[48px] text-sm md:text-base border border-neutral-200 md:border-neutral-300 rounded-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                placeholder="请输入手机号"
              />
            </div>

            {/* 验证码区域 - 移动端优化 */}
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-neutral-700 mb-1.5 md:mb-2">
                验证码
              </label>
              <div className="flex gap-2 md:gap-3">
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                  className="flex-[3] px-4 h-12 md:h-[48px] text-sm md:text-base border border-neutral-200 md:border-neutral-300 rounded-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  placeholder="请输入验证码"
                />
                <button
                  type="button"
                  className="flex-[2] h-12 md:h-[48px] text-xs md:text-sm border border-primary/40 md:border-primary text-primary rounded-[14px] font-medium bg-primary/5 md:bg-primary/10 hover:bg-primary/10 md:hover:bg-primary/15 transition-all whitespace-nowrap"
                >
                  获取验证码
                </button>
              </div>
            </div>

            {/* 密码 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1.5 md:mb-2">
                密码
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 h-12 md:h-[48px] text-sm md:text-base border border-neutral-200 md:border-neutral-300 rounded-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                placeholder="请输入密码"
              />
            </div>

            {/* 确认密码 */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1.5 md:mb-2">
                确认密码
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 h-12 md:h-[48px] text-sm md:text-base border border-neutral-200 md:border-neutral-300 rounded-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                placeholder="请确认密码"
              />
            </div>

            {/* 协议区域 - 移动端紧凑 */}
            <div className="flex items-start gap-2">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="mt-0.5 h-4 w-4 text-primary focus:ring-primary/20 border-neutral-300 rounded"
              />
              <label htmlFor="terms" className="text-[13px] md:text-sm text-neutral-600">
                我已阅读并同意
                <a href="#" className="text-primary hover:text-primary/80">用户协议</a>
              </label>
            </div>

            {/* 注册按钮 - 移动端优化 */}
            <button
              type="submit"
              className="w-full h-12 md:h-[48px] text-sm md:text-base font-medium text-white bg-gradient-to-r from-primary to-primary/90 rounded-[14px] shadow-sm hover:shadow-md hover:brightness-105 active:brightness-95 active:scale-[0.99] transition-all"
            >
              注册
            </button>

            {/* 底部登录引导 - 移动端紧凑 */}
            <div className="text-center pt-1">
              <span className="text-[13px] md:text-sm text-neutral-500">已有账号？</span>
              <a href="/login" className="text-[13px] md:text-sm font-medium text-primary hover:text-primary/80 ml-1">
                去登录
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
