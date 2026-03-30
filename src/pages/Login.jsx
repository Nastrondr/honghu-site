import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Star, Settings } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    phoneOrEmail: '',
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

    if (formData.phoneOrEmail && formData.password) {
      login({
        phoneOrEmail: formData.phoneOrEmail,
        name: formData.phoneOrEmail
      });
      navigate('/');
    } else {
      setError('请输入手机号/邮箱和密码');
    }

    setIsLoading(false);
  };

  // 统一颜色配置 - 用户登录：紫色主题
  const theme = {
    primary: '#7463EC',
    primaryLight: '#F3F0FF',
    primaryBorder: '#7463EC',
    gradient: 'from-[#7463EC] via-[#8B5CF6] to-[#6366F1]',
    iconBg: 'bg-[#7463EC]/10',
    iconColor: 'text-[#7463EC]',
    focusRing: 'focus:ring-[#7463EC]/10',
    focusBorder: 'focus:border-[#7463EC]',
    buttonHover: 'hover:shadow-lg hover:shadow-[#7463EC]/25 hover:-translate-y-0.5',
    currentBg: 'bg-[#7463EC]/5',
    currentBorder: 'border-2 border-[#7463EC]',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#7463EC]/5 flex flex-col">
      {/* 登录区域 - 垂直居中 */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-[420px]">
          {/* 顶部区：Icon + 标题 + 副标题 */}
          <div className="text-center mb-8">
            {/* 圆形Icon背景 */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#7463EC] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[#7463EC]/20">
              <User className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">用户登录</h1>
            <p className="text-sm text-gray-500">登录后可查看报名信息并继续参与赛事</p>
          </div>

          {/* 登录卡片 - 统一规格 */}
          <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100 p-8">
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
              {/* 账号输入框 - 统一高度48px，圆角12px */}
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
                    className={`w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white ${theme.focusBorder} ${theme.focusRing} transition-all duration-200`}
                    placeholder="请输入手机号或邮箱"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* 密码输入框 */}
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
                    className={`w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white ${theme.focusBorder} ${theme.focusRing} transition-all duration-200`}
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
                    className="w-4 h-4 rounded border-gray-300 text-[#7463EC] focus:ring-[#7463EC] focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                    记住我
                  </span>
                </label>
                <Link
                  to="#"
                  className="text-sm text-[#7463EC] hover:text-[#5b4cdb] font-medium transition-colors"
                >
                  忘记密码？
                </Link>
              </div>

              {/* 登录按钮 - 统一高度48px，圆角24px */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full h-12 bg-gradient-to-r ${theme.gradient} text-white rounded-full font-medium text-sm ${theme.buttonHover} active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0`}
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
                  '登录'
                )}
              </button>
            </form>

            {/* 注册入口 */}
            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <span className="text-sm text-gray-500">还没有账号？</span>
              <Link
                to="/register"
                className="ml-1 text-sm font-medium text-[#7463EC] hover:text-[#5b4cdb] transition-colors"
              >
                立即注册
              </Link>
            </div>

            {/* 底部"其他身份入口" - 统一三入口样式 */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center mb-4">其他身份入口</p>
              <div className="grid grid-cols-3 gap-3">
                {/* 用户登录 - 当前高亮 */}
                <div className={`flex flex-col items-center p-3 rounded-xl ${theme.currentBg} ${theme.currentBorder}`}>
                  <div className={`w-10 h-10 rounded-full ${theme.iconBg} flex items-center justify-center mb-2`}>
                    <User className={`w-5 h-5 ${theme.iconColor}`} />
                  </div>
                  <span className={`text-xs font-medium ${theme.iconColor}`}>用户登录</span>
                </div>

                {/* 管理后台 */}
                <Link 
                  to="/admin/login"
                  className="flex flex-col items-center p-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2 group-hover:bg-gray-200 transition-colors">
                    <Settings className="w-5 h-5 text-gray-500" />
                  </div>
                  <span className="text-xs font-medium text-gray-600 group-hover:text-gray-800">管理后台</span>
                </Link>

                {/* 专家评审 */}
                <Link 
                  to="/reviewer-login"
                  className="flex flex-col items-center p-3 rounded-xl border border-gray-200 hover:border-violet-300 hover:bg-violet-50/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center mb-2 group-hover:bg-violet-200 transition-colors">
                    <Star className="w-5 h-5 text-violet-600 fill-violet-600" />
                  </div>
                  <span className="text-xs font-medium text-violet-700 group-hover:text-violet-800">专家评审</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 底部版权 */}
      <footer className="py-6 text-center">
        <p className="text-xs text-gray-400">
          © 2024 梧桐·鸿鹄人工智能应用创新大赛 版权所有
        </p>
      </footer>
    </div>
  );
};

export default Login;
