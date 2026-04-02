import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0f] text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* 移动端紧凑布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-8 md:py-16">
          {/* 左侧列 */}
          <div>
            {/* 主办单位 - 移动端2列紧凑 */}
            <div className="mb-6 md:mb-8">
              <h3 className="text-sm md:text-2xl font-bold mb-3 md:mb-4">主办单位</h3>
              <div className="grid grid-cols-3 md:flex md:flex-wrap items-center gap-2 md:gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 md:w-28 md:h-28 rounded-lg md:rounded-xl bg-white/8 backdrop-blur-sm border border-white/15 flex items-center justify-center p-2 md:p-4 mb-1 md:mb-2">
                    <span className="text-[10px] md:text-xs text-white/40">中国移动</span>
                  </div>
                  <span className="text-[10px] md:text-xs text-white/60">中国移动通信集团</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 md:w-28 md:h-28 rounded-lg md:rounded-xl bg-white/8 backdrop-blur-sm border border-white/15 flex items-center justify-center p-2 md:p-4 mb-1 md:mb-2">
                    <span className="text-[10px] md:text-xs text-white/40">工信部</span>
                  </div>
                  <span className="text-[10px] md:text-xs text-white/60">工业和信息化部</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 md:w-28 md:h-28 rounded-lg md:rounded-xl bg-white/8 backdrop-blur-sm border border-white/15 flex items-center justify-center p-2 md:p-4 mb-1 md:mb-2">
                    <img
                      src="/assets-image-logo/zhonglong.png"
                      alt="北京中科北龙科技有限责任公司"
                      className="w-full h-full object-contain object-center"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<span class="text-[10px] md:text-xs text-white/40">中科北龙</span>';
                      }}
                    />
                  </div>
                  <span className="text-[10px] md:text-xs text-white/60">北京中科北龙</span>
                </div>
              </div>
            </div>
            
            {/* 联系方式 - 移动端紧凑 */}
            <div className="mt-4 md:mt-6">
              <h4 className="text-xs md:text-lg font-semibold mb-2 md:mb-4 text-white/80">联系方式</h4>
              <div className="space-y-1 md:space-y-2 text-[11px] md:text-sm text-white/60">
                <p>邮箱：contact@wutonghonghu.com</p>
                <p>客服电话：400-888-8888</p>
              </div>
            </div>
          </div>
          
          {/* 右侧列 */}
          <div>
            {/* 公众号/小程序 - 移动端紧凑双卡 */}
            <div className="mb-4 md:mb-6">
              <h4 className="text-xs md:text-lg font-semibold mb-2 md:mb-4 text-white/80">官方公众号 / 小程序</h4>
              <div className="flex gap-2 md:gap-4">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-md md:rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-10 h-10 md:w-16 md:h-16 mx-auto mb-1 md:mb-2 bg-white/5 rounded flex items-center justify-center">
                      <span className="text-[8px] md:text-[10px] text-white/40">公众号</span>
                    </div>
                    <span className="text-[8px] md:text-[10px] text-white/50">扫码关注</span>
                  </div>
                </div>
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-md md:rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-10 h-10 md:w-16 md:h-16 mx-auto mb-1 md:mb-2 bg-white/5 rounded flex items-center justify-center">
                      <span className="text-[8px] md:text-[10px] text-white/40">小程序</span>
                    </div>
                    <span className="text-[8px] md:text-[10px] text-white/50">扫码使用</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 快速链接 - 移动端紧凑2列 */}
            <div className="mt-4 md:mt-8">
              <h4 className="text-xs md:text-lg font-semibold mb-2 md:mb-4 text-white/80">快速链接</h4>
              <ul className="grid grid-cols-3 md:grid-cols-2 gap-x-2 gap-y-1 text-[11px] md:text-sm text-white/60">
                <li><Link to="/" className="hover:text-white transition-colors">首页</Link></li>
                <li><Link to="/competition-center" className="hover:text-white transition-colors">赛事中心</Link></li>
                <li><Link to="/partners" className="hover:text-white transition-colors">合作单位</Link></li>
                <li><Link to="/resources" className="hover:text-white transition-colors">资源支持</Link></li>
                <li><Link to="/expert-search" className="hover:text-white transition-colors">专家查询</Link></li>
                <li><Link to="/eco-products" className="hover:text-white transition-colors">生态产品</Link></li>
              </ul>
            </div>

            {/* 系统入口 - 移动端小型胶囊按钮 */}
            <div className="mt-4 md:mt-6">
              <h4 className="text-[10px] md:text-sm font-medium mb-2 md:mb-3 text-white/50">系统入口</h4>
              <div className="flex gap-2">
                {/* 专家评审入口 */}
                <Link 
                  to="/reviewer-login" 
                  title="进入评审系统"
                  className="flex items-center gap-1.5 md:gap-2.5 h-9 md:h-14 px-2.5 md:px-4 bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-lg md:rounded-xl hover:bg-white/[0.1] transition-all duration-200 cursor-pointer"
                >
                  <div className="w-6 md:w-8 h-6 md:h-8 rounded bg-violet-500/20 flex items-center justify-center">
                    <svg className="w-3 md:w-4 h-3 md:h-4 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <span className="text-[11px] md:text-sm text-white/70">专家评审</span>
                </Link>

                {/* 管理后台入口 */}
                <Link 
                  to="/admin/login" 
                  title="进入管理后台"
                  className="flex items-center gap-1.5 md:gap-2.5 h-9 md:h-14 px-2.5 md:px-4 bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-lg md:rounded-xl hover:bg-white/[0.1] transition-all duration-200 cursor-pointer"
                >
                  <div className="w-6 md:w-8 h-6 md:h-8 rounded bg-blue-500/20 flex items-center justify-center">
                    <svg className="w-3 md:w-4 h-3 md:h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-[11px] md:text-sm text-white/70">管理后台</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* 底部版权 - 移动端紧凑 */}
        <div className="border-t border-white/10 py-4 md:pt-8 md:pb-0">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2 md:gap-3">
              <img 
                src="/assets/image/logo/logonotext.png" 
                alt="梧桐·鸿鹄" 
                className="h-5 md:h-8 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="text-sm md:text-lg font-semibold">梧桐·鸿鹄</span>
            </div>
            <p className="text-[10px] md:text-sm text-white/50">© 2026 梧桐·鸿鹄人工智能创新应用大赛 · 保留所有权利</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
