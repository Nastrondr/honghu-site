import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    phoneOrEmail: '',
    password: ''
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
    login({
      phoneOrEmail: formData.phoneOrEmail,
      name: formData.phoneOrEmail
    });
    navigate('/');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    // TODO: 接入管理员登录接口
    console.log('管理员登录');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center py-12 px-4 animate-fadeIn">
      <div className="max-w-5xl w-full flex flex-col lg:flex-row gap-8 items-start">
        
        {/* 普通用户登录 - 主卡片 */}
        <div className="flex-1 w-full max-w-md mx-auto lg:mx-0">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">用户登录</h1>
            <p className="text-neutral-600">登录后可查看报名信息并继续参与赛事</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="phoneOrEmail" className="block text-sm font-medium text-neutral-700 mb-2">
                  手机号或邮箱
                </label>
                <input
                  type="text"
                  id="phoneOrEmail"
                  name="phoneOrEmail"
                  value={formData.phoneOrEmail}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="请输入手机号或邮箱"
                />
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
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="请输入密码"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-neutral-700">
                    记住我
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-primary hover:text-primary/80">
                    忘记密码？
                  </a>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white px-4 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
                >
                  登录
                </button>
              </div>
              
              <div className="text-center text-sm">
                <span className="text-neutral-600">没有账号？</span>
                <a href="/register" className="font-medium text-primary hover:text-primary/80 ml-1">
                  去注册
                </a>
              </div>
            </form>
          </div>
        </div>

        {/* 分隔线 - 移动端隐藏 */}
        <div className="hidden lg:flex flex-col items-center justify-center">
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-neutral-300 to-transparent"></div>
          <span className="my-4 text-xs text-neutral-400 font-medium">或</span>
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-neutral-300 to-transparent"></div>
        </div>

        {/* 管理员登录 - 次级卡片 */}
        <div className="w-full lg:w-80">
          <div className="text-center mb-4 lg:mb-8">
            <h2 className="text-xl font-semibold text-neutral-700 mb-1">管理员入口</h2>
            <p className="text-xs text-neutral-400">仅限内部授权人员使用</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 border border-neutral-200/60">
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label htmlFor="adminAccount" className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">
                  管理员账号
                </label>
                <input
                  type="text"
                  id="adminAccount"
                  name="adminAccount"
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                  placeholder="请输入管理员账号"
                />
              </div>
              
              <div>
                <label htmlFor="adminPassword" className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">
                  密码
                </label>
                <input
                  type="password"
                  id="adminPassword"
                  name="adminPassword"
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                  placeholder="请输入密码"
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full bg-neutral-700 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-neutral-800 transition-colors text-sm"
                >
                  管理员登录
                </button>
              </div>
            </form>

            <div className="mt-4 pt-4 border-t border-neutral-100">
              <p className="text-xs text-neutral-400 text-center leading-relaxed">
                此入口仅限赛事组委会<br/>内部授权人员使用
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
