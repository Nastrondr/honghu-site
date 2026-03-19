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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center py-12 px-4 animate-fadeIn">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">注册</h1>
          <p className="text-neutral-600">创建账号，开始你的AI创新之旅</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="请输入手机号"
              />
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="code" className="block text-sm font-medium text-neutral-700 mb-2">
                  验证码
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="请输入验证码"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  className="px-4 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors whitespace-nowrap"
                >
                  获取验证码
                </button>
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                密码
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="请输入密码"
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
                确认密码
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="请确认密码"
              />
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-neutral-600">
                  我已阅读并同意
                  <a href="#" className="text-primary hover:text-primary/80">用户协议</a>
                </label>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full bg-primary text-white px-4 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                注册
              </button>
            </div>
            
            <div className="text-center text-sm">
              <span className="text-neutral-600">已有账号？</span>
              <a href="/login" className="font-medium text-primary hover:text-primary/80 ml-1">
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