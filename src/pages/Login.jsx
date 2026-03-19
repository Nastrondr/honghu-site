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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center py-12 px-4 animate-fadeIn">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">登录</h1>
          <p className="text-neutral-600">登录后可查看报名信息并继续参与赛事</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8">
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
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
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
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
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
                className="w-full bg-primary text-white px-4 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
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
    </div>
  );
};

export default Login;