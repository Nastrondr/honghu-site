import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../components/common/PrimaryButton';
import SecondaryButton from '../components/common/SecondaryButton';

const Partners = () => {
  return (
    <div className="min-h-screen bg-neutral-50 animate-fadeIn">
      {/* 页面头部 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-neutral-800 mb-4">合作单位</h1>
            <p className="text-xl text-neutral-600">联合多方资源，共建人工智能创新生态</p>
          </div>
        </div>
      </section>

      {/* 主办单位 */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-10 text-center">主办单位</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-sm p-10 border border-neutral-100 flex items-center justify-center hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="w-32 h-32 bg-neutral-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-neutral-500 font-medium">某某科技创新中心</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-800">某某科技创新中心</h3>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-10 border border-neutral-100 flex items-center justify-center hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="w-32 h-32 bg-neutral-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-neutral-500 font-medium">某人工智能研究院</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-800">某人工智能研究院</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 联合主办/指导单位 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-10 text-center">联合主办 / 指导单位</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-neutral-100 flex items-center justify-center hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="w-24 h-24 bg-neutral-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-neutral-500 font-medium">重点大学</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-800">重点大学</h3>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-neutral-100 flex items-center justify-center hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="w-24 h-24 bg-neutral-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-neutral-500 font-medium">某科研机构</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-800">某科研机构</h3>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-neutral-100 flex items-center justify-center hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="w-24 h-24 bg-neutral-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-neutral-500 font-medium">行业协会</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-800">行业协会</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 合作伙伴 */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-10 text-center">合作伙伴</h2>
          
          {/* 技术支持单位 */}
          <div className="mb-16">
            <h3 className="text-xl font-medium text-neutral-800 mb-6">技术支持单位</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100 flex items-center justify-center hover:shadow-md transition-shadow">
                  <div className="w-20 h-20 bg-neutral-100 rounded-lg flex items-center justify-center">
                    <span className="text-neutral-500 text-sm">云计算平台{i}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 产业合作单位 */}
          <div className="mb-16">
            <h3 className="text-xl font-medium text-neutral-800 mb-6">产业合作单位</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100 flex items-center justify-center hover:shadow-md transition-shadow">
                  <div className="w-20 h-20 bg-neutral-100 rounded-lg flex items-center justify-center">
                    <span className="text-neutral-500 text-sm">科技企业{i}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 教育合作单位 */}
          <div>
            <h3 className="text-xl font-medium text-neutral-800 mb-6">教育合作单位</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100 flex items-center justify-center hover:shadow-md transition-shadow">
                  <div className="w-20 h-20 bg-neutral-100 rounded-lg flex items-center justify-center">
                    <span className="text-neutral-500 text-sm">高校{i}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 支持机构 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-10 text-center">支持机构</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100 flex items-center justify-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <span className="text-neutral-500 text-xs">支持机构{i}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 合作说明 */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-white rounded-2xl shadow-sm p-10 border border-neutral-100">
            <h2 className="text-2xl font-semibold text-neutral-800 mb-6 text-center">合作说明</h2>
            <p className="text-neutral-600 mb-4 text-center max-w-3xl mx-auto">
              梧桐·鸿鹄人工智能应用创新大赛致力于整合多方资源，构建产学研协同创新生态。我们与行业领先的企业、高校和研究机构建立深度合作，为参赛团队提供全方位支持。
            </p>
            <p className="text-neutral-600 text-center max-w-3xl mx-auto">
              通过资源整合和协同创新，我们旨在推动人工智能技术在实际场景中的应用落地，培养和发掘优秀的AI人才，为人工智能行业的可持续发展注入新动力。
            </p>
          </div>
        </div>
      </section>

      {/* 底部CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-gradient-to-r from-primary to-indigo-600 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">携手合作，共建创新生态</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              加入我们的合作伙伴网络，共同推动人工智能应用创新，培养优秀人才，构建可持续发展的AI生态系统
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <SecondaryButton className="text-lg px-8 py-3 bg-white text-primary hover:bg-neutral-100">
                联系我们
              </SecondaryButton>
              <PrimaryButton className="text-lg px-8 py-3 bg-white text-primary hover:bg-neutral-100">
                成为合作伙伴
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;