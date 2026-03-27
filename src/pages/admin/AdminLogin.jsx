import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// TODO: 接入管理员登录接口
// TODO: 接入后台权限校验

const AdminLogin = () => {
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

    // TODO: 接入真实管理员登录接口
    await new Promise(resolve => setTimeout(resolve, 500));

    // mock 验证
    if (formData.account && formData.password) {
      console.log('管理员登录成功:', formData.account);
      navigate('/admin/dashboard');
    } else {
      setError('请输入管理员账号和密码');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* 极简头部 - 仅系统标识 */}
      <header className="px-6 py-4">
        <div className="max-w-[440px] mx-auto">
          <span className="text-sm font-medium text-slate-600">鸿鹄大赛管理后台</span>
        </div>
      </header>

      {/* 登录区域 - 垂直居中 */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-[440px]">
          {/* 标题区域 */}
          <div className="text-center mb-8">
            <p className="text-sm text-slate-500 mb-1">鸿鹄大赛管理后台</p>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">管理员登录</h1>
            <p className="text-sm text-slate-400">仅限赛事组委会及授权管理人员使用</p>
          </div>

          {/* 登录卡片 - 后台系统风格 */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
            {/* 错误提示 */}
            {error && (
              <div className="mb-5 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-red-600">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 管理员账号 */}
              <div>
                <label htmlFor="account" className="block text-sm font-medium text-slate-700 mb-2">
                  管理员账号
                </label>
                <input
                  type="text"
                  id="account"
                  name="account"
                  value={formData.account}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  placeholder="请输入管理员账号"
                />
              </div>

              {/* 密码 */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                  密码
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  placeholder="请输入密码"
                />
              </div>

              {/* 记住登录状态 & 忘记密码 */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="ml-2 text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                    记住登录状态
                  </span>
                </label>
                <Link
                  to="#"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  忘记密码？
                </Link>
              </div>

              {/* 登录按钮 - 蓝色系，纯色 */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium text-sm hover:bg-blue-700 hover:shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-blue-600 disabled:hover:shadow-none"
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
                  '登录后台'
                )}
              </button>
            </form>

            {/* 底部辅助链接 */}
            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between text-sm">
              <Link
                to="/"
                className="text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                返回前台首页
              </Link>
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                返回用户登录
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* 底部版权 */}
      <footer className="py-6 text-center">
        <p className="text-xs text-slate-400">
          © 2024 梧桐·鸿鹄人工智能应用创新大赛 版权所有
        </p>
      </footer>
    </div>
  );
};

export default AdminLogin;
