import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Star, Settings } from 'lucide-react';

// TODO: 接入专家评审登录接口
// TODO: 接入评审权限校验

const ReviewerLogin = () => {
  const [formData, setFormData] = useState({
    account: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

    // TODO: 接入真实评审登录接口
    await new Promise(resolve => setTimeout(resolve, 500));

    // mock 验证
    if (formData.account && formData.password) {
      console.log('评审专家登录成功:', formData.account);
      
      // 存储评审专家登录状态和角色信息
      const reviewerInfo = {
        name: formData.account,
        role: 'reviewer',
        email: formData.account + '@honghu-ai.com'
      };
      localStorage.setItem('reviewer_token', 'mock_token_' + Date.now());
      localStorage.setItem('reviewer_info', JSON.stringify(reviewerInfo));
      
      // 同时设置到 AuthContext 使用的格式，以便弹窗组件能识别
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(reviewerInfo));
      
      navigate('/reviewer/dashboard');
    } else {
      setError('请输入评审账号和密码');
    }

    setIsLoading(false);
  };

  // 统一颜色配置 - 专家评审登录：柔和橙色主题（高级克制）
  const theme = {
    primary: '#F97316',
    primaryLight: '#FFF7ED',
    primaryBorder: '#F97316',
    gradient: 'from-[#FB923C] to-[#F97316]',
    gradientEnd: '#F97316',
    iconBg: 'bg-[#F97316]/10',
    iconColor: 'text-[#F97316]',
    iconGradient: 'from-[#FB923C] to-[#F97316]',
    focusRing: 'focus:ring-[#F97316]/10',
    focusBorder: 'focus:border-[#F97316]',
    buttonHover: 'hover:shadow-[0_6px_18px_rgba(249,115,22,0.25)] hover:-translate-y-0.5',
    buttonShadow: 'shadow-[0_6px_18px_rgba(249,115,22,0.25)]',
    currentBg: 'bg-[#F97316]/5',
    currentBorder: 'border-2 border-[#F97316]',
    textLink: 'text-[#F97316]',
    textLinkHover: 'hover:text-[#EA580C]',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30 flex flex-col">
      
      {/* 登录区域 - 垂直居中 */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-[420px]">
          {/* 顶部区：Icon + 标题 + 副标题 */}
          <div className="text-center mb-8">
            {/* 圆形Icon背景 */}
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${theme.iconGradient} flex items-center justify-center ${theme.buttonShadow}`}>
              <Star className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">专家评审登录</h1>
            <p className="text-sm text-gray-500">专家评委专用入口，参与作品评审工作</p>
          </div>

          {/* 登录卡片 - 玻璃拟态设计 */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-orange-100/50 p-8">
            
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
              {/* 评审账号 - 统一高度48px，圆角12px */}
              <div>
                <label htmlFor="account" className="block text-sm font-medium text-gray-700 mb-2">
                  评审账号
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="account"
                    name="account"
                    value={formData.account}
                    onChange={handleChange}
                    required
                    className={`w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white ${theme.focusBorder} ${theme.focusRing} transition-all duration-200`}
                    placeholder="请输入评审账号"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Star className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

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

              {/* 记住登录状态 & 忘记密码 */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    className={`w-4 h-4 rounded border-gray-300 ${theme.textLink} focus:ring-[#F97316] focus:ring-offset-0 cursor-pointer`}
                  />
                  <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                    记住登录状态
                  </span>
                </label>
                <Link
                  to="#"
                  className={`text-sm ${theme.textLink} ${theme.textLinkHover} font-medium transition-colors`}
                >
                  忘记密码？
                </Link>
              </div>

              {/* 登录按钮 - 统一高度48px，圆角24px */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full h-12 bg-gradient-to-r ${theme.gradient} text-white rounded-full font-medium text-sm ${theme.buttonHover} active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0 shadow-lg ${theme.buttonShadow}`}
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
                  '进入评审系统'
                )}
              </button>
            </form>

            {/* 底部辅助链接 */}
            <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between text-sm">
              <Link
                to="/"
                className="text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                返回前台首页
              </Link>
              <Link
                to="/login"
                className="text-[#7463EC] hover:text-[#5b4cdb] font-medium transition-colors"
              >
                返回用户登录
              </Link>
            </div>

            {/* 底部"其他身份入口" - 统一三入口样式 */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center mb-4">其他身份入口</p>
              <div className="grid grid-cols-3 gap-3">
                {/* 用户登录 */}
                <Link 
                  to="/login"
                  className="flex flex-col items-center p-3 rounded-xl border border-gray-200 hover:border-[#7463EC] hover:bg-[#7463EC]/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2 group-hover:bg-[#7463EC]/10 transition-colors">
                    <User className="w-5 h-5 text-gray-500 group-hover:text-[#7463EC]" />
                  </div>
                  <span className="text-xs font-medium text-gray-600 group-hover:text-[#7463EC]">用户登录</span>
                </Link>

                {/* 管理后台 */}
                <Link 
                  to="/admin/login"
                  className="flex flex-col items-center p-3 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2 group-hover:bg-blue-100 transition-colors">
                    <Settings className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                  </div>
                  <span className="text-xs font-medium text-gray-600 group-hover:text-blue-600">管理后台</span>
                </Link>

                {/* 专家评审 - 当前高亮 */}
                <div className={`flex flex-col items-center p-3 rounded-xl ${theme.currentBg} ${theme.currentBorder}`}>
                  <div className={`w-10 h-10 rounded-full ${theme.iconBg} flex items-center justify-center mb-2`}>
                    <Star className={`w-5 h-5 ${theme.iconColor} fill-[#FB923C]`} />
                  </div>
                  <span className={`text-xs font-medium ${theme.iconColor}`}>专家评审</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 底部版权 */}
      <footer className="py-6 text-center relative z-10">
        <p className="text-xs text-gray-400">
          © 2024 梧桐·鸿鹄人工智能应用创新大赛 版权所有
        </p>
      </footer>
    </div>
  );
};

export default ReviewerLogin;
