import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { request } from '../lib/api';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    code: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    if (formData.password.length < 6) {
      setError('密码长度至少6位');
      return;
    }

    setLoading(true);

    try {
      const result = await request('/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone: formData.phone || undefined,
          password: formData.password
        })
      });

      if (result.ok && result.data.code === 0) {
        login(result.data.data);
        navigate('/');
      } else {
        setError(result.data.message || '注册失败');
      }
    } catch (err) {
      setError('网络错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center py-6 md:py-12 px-4">
      <div className="max-w-md w-full space-y-6 md:space-y-8">
        <div className="text-center space-y-1 md:space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">注册</h1>
          <p className="text-[15px] md:text-base text-neutral-600">创建账号，开始你的AI创新之旅</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm md:shadow-md p-5 md:p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-neutral-700 mb-1.5 md:mb-2">
                用户名
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 h-12 md:h-[48px] text-sm md:text-base border border-neutral-200 md:border-neutral-300 rounded-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                placeholder="请输入用户名"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5 md:mb-2">
                邮箱
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 h-12 md:h-[48px] text-sm md:text-base border border-neutral-200 md:border-neutral-300 rounded-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                placeholder="请输入邮箱"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1.5 md:mb-2">
                手机号（选填）
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 h-12 md:h-[48px] text-sm md:text-base border border-neutral-200 md:border-neutral-300 rounded-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                placeholder="选填"
              />
            </div>

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
                minLength={6}
                className="w-full px-4 h-12 md:h-[48px] text-sm md:text-base border border-neutral-200 md:border-neutral-300 rounded-[14px] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                placeholder="至少6位"
              />
            </div>

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
                placeholder="请再次输入密码"
              />
            </div>

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

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 md:h-[48px] text-sm md:text-base font-medium text-white bg-gradient-to-r from-primary to-primary/90 rounded-[14px] shadow-sm hover:shadow-md hover:brightness-105 active:brightness-95 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '注册中...' : '注册'}
            </button>

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
