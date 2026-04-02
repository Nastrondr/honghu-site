import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0f] text-white py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-3">主办单位</h3>
              <div className="flex flex-wrap items-center gap-8 mt-4">
                <div className="flex flex-col items-center">
                  <div className="w-28 h-28 rounded-xl bg-white/8 backdrop-blur-sm border border-white/15 flex items-center justify-center p-4 mb-2">
                    <span className="text-xs text-white/40">中国移动</span>
                  </div>
                  <span className="text-xs text-white/60">中国移动通信集团</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-28 h-28 rounded-xl bg-white/8 backdrop-blur-sm border border-white/15 flex items-center justify-center p-4 mb-2">
                    <span className="text-xs text-white/40">工信部</span>
                  </div>
                  <span className="text-xs text-white/60">工业和信息化部</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-28 h-28 rounded-xl bg-white/8 backdrop-blur-sm border border-white/15 flex items-center justify-center p-4 mb-2">
                    <img
                      src="/assets-image-logo/zhonglong.png"
                      alt="北京中科北龙科技有限责任公司"
                      className="w-full h-full object-contain object-center"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<span class="text-xs text-white/40">中科北龙</span>';
                      }}
                    />
                  </div>
                  <span className="text-xs text-white/60">北京中科北龙</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4 text-white/80">联系方式</h4>
              <div className="space-y-2 text-sm text-white/60">
                <p>邮箱：contact@wutonghonghu.com</p>
                <p>客服电话：400-888-8888</p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-4 text-white/80">官方公众号 / 小程序</h4>
              <div className="flex gap-4">
                <div className="w-28 h-28 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-white/5 rounded-lg flex items-center justify-center">
                      <span className="text-[10px] text-white/40">公众号</span>
                    </div>
                    <span className="text-[10px] text-white/50">扫码关注</span>
                  </div>
                </div>
                <div className="w-28 h-28 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-white/5 rounded-lg flex items-center justify-center">
                      <span className="text-[10px] text-white/40">小程序</span>
                    </div>
                    <span className="text-[10px] text-white/50">扫码使用</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4 text-white/80">快速链接</h4>
              <ul className="grid grid-cols-2 gap-2 text-sm text-white/60">
                <li><Link to="/" className="hover:text-white transition-colors">首页</Link></li>
                <li><Link to="/competition-center" className="hover:text-white transition-colors">赛事中心</Link></li>
                <li><Link to="/partners" className="hover:text-white transition-colors">合作单位</Link></li>
                <li><Link to="/resources" className="hover:text-white transition-colors">资源支持</Link></li>
                <li><Link to="/expert-search" className="hover:text-white transition-colors">专家查询</Link></li>
                <li><Link to="/eco-products" className="hover:text-white transition-colors">生态产品</Link></li>
              </ul>
            </div>

            {/* 系统入口 - 轻量级辅助入口组 */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3 text-white/50">系统入口</h4>
              <div className="flex gap-3">
                {/* 专家评审入口 */}
                <Link 
                  to="/reviewer-login" 
                  title="进入评审系统"
                  className="group flex items-center gap-2.5 w-[160px] h-14 bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-xl px-4 hover:bg-white/[0.1] hover:-translate-y-px transition-all duration-200 cursor-pointer"
                >
                  {/* Icon with subtle glow */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-violet-500/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-violet-500/30 group-hover:to-purple-500/30 transition-all">
                      <svg className="w-4 h-4 text-violet-400 group-hover:text-violet-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                  </div>
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">专家评审</span>
                </Link>

                {/* 管理后台入口 */}
                <Link 
                  to="/admin/login" 
                  title="进入管理后台"
                  className="group flex items-center gap-2.5 w-[160px] h-14 bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-xl px-4 hover:bg-white/[0.1] hover:-translate-y-px transition-all duration-200 cursor-pointer"
                >
                  {/* Icon */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                      <svg className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">管理后台</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/image/logo/logonotext.png" 
                alt="梧桐·鸿鹄" 
                className="h-8 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="text-lg font-semibold">梧桐·鸿鹄</span>
            </div>
            <p className="text-sm text-white/50">© 2026 梧桐·鸿鹄人工智能创新应用大赛 · 保留所有权利</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;