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
                    <img
                      src="/assets-image-logo/zhongguoyidong.jpg"
                      alt="中国移动通信集团"
                      className="w-full h-full object-contain object-center"
                    />
                  </div>
                  <span className="text-xs text-white/60">中国移动通信集团</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-28 h-28 rounded-xl bg-white/8 backdrop-blur-sm border border-white/15 flex items-center justify-center p-4 mb-2">
                    <img
                      src="/assets-image-logo/gongxinbu.jpg"
                      alt="工业和信息化部"
                      className="w-full h-full object-contain object-center"
                    />
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