import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [activeTab, setActiveTab] = useState('user'); // 'user' | 'admin'
  const [formData, setFormData] = useState({
    phoneOrEmail: '',
    account: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    if (activeTab === 'user') {
      // 用户登录
      if (formData.phoneOrEmail && formData.password) {
        login({
          phoneOrEmail: formData.phoneOrEmail,
          name: formData.phoneOrEmail
        });
        navigate('/');
      } else {
        setError('请输入手机号/邮箱和密码');
      }
    } else {
      // 管理员登录
      if (formData.account && formData.password) {
        console.log('管理员登录成功:', formData.account);
        navigate('/admin/dashboard');
      } else {
        setError('请输入管理员账号和密码');
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary/5 flex flex-col items-center justify-center py-12 px-4">
      {/* 登录卡片 */}
      <div className="w-full max-w-[440px]">
        {/* Tab 切换 */}
        <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">
          {/* Tab 头部 */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('user')}
              className={`flex-1 py-4 text-sm font-medium transition-all duration-200 relative ${
                activeTab === 'user'
                  ? 'text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              用户登录
              {activeTab === 'user' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-4 text-sm font-medium transition-all duration-200 relative ${
                activeTab === 'admin'
                  ? 'text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              管理员登录
              {activeTab === 'admin' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          </div>

          {/* 表单内容 */}
          <div className="p-8">
            {/* 标题 */}
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold text-gray-900 mb-1">
                {activeTab === 'user' ? '用户登录' : '管理员登录'}
              </h1>
              <p className="text-sm text-gray-500">
                {activeTab === 'user'
                  ? '登录后可查看报名信息并继续参与赛事'
                  : '仅限赛事组委会及授权管理人员使用'}
              </p>
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="mb-5 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-red-600">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 用户登录 - 手机号/邮箱 */}
              {activeTab === 'user' && (
                <div>
                  <label htmlFor="phoneOrEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    手机号或邮箱
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="phoneOrEmail"
                      name="phoneOrEmail"
                      value={formData.phoneOrEmail}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200"
                      placeholder="请输入手机号或邮箱"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* 管理员登录 - 账号 */}
              {activeTab === 'admin' && (
                <div>
                  <label htmlFor="account" className="block text-sm font-medium text-gray-700 mb-2">
                    管理员账号
                  </label>
                  <input
                    type="text"
                    id="account"
                    name="account"
                    value={formData.account}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200"
                    placeholder="请输入管理员账号"
                  />
                </div>
              )}

              {/* 密码 */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  密码
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200"
                    placeholder="请输入密码"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 记住我 & 忘记密码 */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                    记住我
                  </span>
                </label>
                <Link
                  to="#"
                  className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  忘记密码？
                </Link>
              </div>

              {/* 登录按钮 */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-primary/90 text-white py-3 px-4 rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    登录中...
                  </span>
                ) : (
                  activeTab === 'user' ? '登录' : '登录后台'
                )}
              </button>
            </form>

            {/* 注册入口 - 仅用户模式显示 */}
            {activeTab === 'user' && (
              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <span className="text-sm text-gray-500">还没有账号？</span>
                <Link
                  to="/register"
                  className="ml-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  立即注册
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 底部版权 */}
      <div className="mt-12 text-center">
        <p className="text-xs text-gray-400">
          © 2024 梧桐·鸿鹄人工智能应用创新大赛 版权所有
        </p>
      </div>
    </div>
  );
};

export default Login;
