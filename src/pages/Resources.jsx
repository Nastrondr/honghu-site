import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../components/common/PrimaryButton';

const Resources = () => {
  return (
    <div className="min-h-screen animate-fadeIn">
      {/* 页面头部 */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-neutral-800 mb-4">资源支持</h1>
            <p className="text-xl text-neutral-600">为参赛团队提供全方位创新支持与成长资源</p>
          </div>
        </div>
      </section>

      {/* 资源类型总览 */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="glass-card rounded-2xl p-6 group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2 group-hover:text-primary transition-colors duration-300">算力支持</h3>
              <p className="text-neutral-600 text-sm">提供GPU算力资源与训练环境支持</p>
            </div>
            <div className="glass-card rounded-2xl p-6 group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2 group-hover:text-primary transition-colors duration-300">导师指导</h3>
              <p className="text-neutral-600 text-sm">行业专家与技术导师全程辅导</p>
            </div>
            <div className="glass-card rounded-2xl p-6 group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2 group-hover:text-primary transition-colors duration-300">数据与工具</h3>
              <p className="text-neutral-600 text-sm">开放数据集与开发工具支持</p>
            </div>
            <div className="glass-card rounded-2xl p-6 group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2 group-hover:text-primary transition-colors duration-300">孵化与对接</h3>
              <p className="text-neutral-600 text-sm">优秀项目可获得产业资源与落地机会</p>
            </div>
            <div className="glass-card rounded-2xl p-6 group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2 group-hover:text-primary transition-colors duration-300">奖励与激励</h3>
              <p className="text-neutral-600 text-sm">奖金、证书与荣誉体系</p>
            </div>
          </div>
        </div>
      </section>

      {/* 详细说明模块 */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-neutral-800 mb-12 text-center">资源详情</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card rounded-2xl p-8 group">
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">高性能GPU算力</h3>
              <p className="text-neutral-600 mb-4">
                提供大规模GPU集群资源，支持复杂模型训练和推理，为参赛项目提供强大的计算支持。
              </p>
              <p className="text-neutral-600">
                包含多种型号GPU，满足不同场景的计算需求，降低参赛团队的硬件成本。
              </p>
            </div>
            <div className="glass-card rounded-2xl p-8 group">
              <h3 className="text-xl font-semibold text-neutral-800 mb-4 group-hover:text-primary transition-colors duration-300">专业导师团队</h3>
              <p className="text-neutral-600 mb-4">
                汇聚行业专家和学术大咖，为参赛团队提供专业指导和技术支持，助力项目优化。
              </p>
              <p className="text-neutral-600">
                定期举办线上线下辅导活动，解答技术难题，分享行业经验和最佳实践。
              </p>
            </div>
            <div className="glass-card rounded-2xl p-8 group">
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">开放数据集</h3>
              <p className="text-neutral-600 mb-4">
                提供多领域高质量数据集，覆盖计算机视觉、自然语言处理、语音识别等多个AI应用方向。
              </p>
              <p className="text-neutral-600">
                数据经过脱敏处理，确保合规性，为参赛项目提供丰富的训练和测试数据。
              </p>
            </div>
            <div className="glass-card rounded-2xl p-8 group">
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">开发工具支持</h3>
              <p className="text-neutral-600 mb-4">
                提供主流AI开发框架和工具，包括PyTorch、TensorFlow、Hugging Face等，简化开发流程。
              </p>
              <p className="text-neutral-600">
                配置开发环境，提供技术文档和教程，帮助参赛团队快速上手和开发。
              </p>
            </div>
            <div className="glass-card rounded-2xl p-8 group">
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">项目孵化机会</h3>
              <p className="text-neutral-600 mb-4">
                优秀项目有机会获得孵化支持，包括办公空间、资金支持、市场推广等全方位资源。
              </p>
              <p className="text-neutral-600">
                对接投资机构和产业合作伙伴，为项目提供商业化落地的机会和渠道。
              </p>
            </div>
            <div className="glass-card rounded-2xl p-8 group">
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">丰厚奖励体系</h3>
              <p className="text-neutral-600 mb-4">
                设立多个奖项，包括一二三等奖、最佳创新奖、最佳应用奖等，提供丰厚奖金和证书。
              </p>
              <p className="text-neutral-600">
                获奖团队将获得行业认可和曝光机会，提升团队知名度和项目影响力。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 重点强化模块 */}
      <section className="py-20 bg-slate-50/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-neutral-800 mb-12 text-center">核心支持亮点</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card rounded-2xl p-8 group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4 group-hover:text-primary transition-colors duration-300">高性能算力资源</h3>
              <p className="text-neutral-600">
                提供最新GPU集群和AI训练环境，支持大规模模型训练，为参赛项目提供强大计算支持。
              </p>
            </div>
            <div className="glass-card rounded-2xl p-8 group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4 group-hover:text-primary transition-colors duration-300">专业导师团队</h3>
              <p className="text-neutral-600">
                汇聚行业专家和学术大咖，为参赛团队提供全程辅导，解答技术难题，分享行业经验。
              </p>
            </div>
            <div className="glass-card rounded-2xl p-8 group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4 group-hover:text-primary transition-colors duration-300">真实产业应用场景</h3>
              <p className="text-neutral-600">
                基于真实产业需求设计赛题，为参赛项目提供实际应用场景，促进成果落地和商业化。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 底部CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-gradient-to-r from-[#7463EC] via-[#5b4cdb] to-[#4338ca] rounded-2xl p-12 text-center shadow-lg shadow-primary/20">
            <h2 className="text-3xl font-bold text-white mb-6">加入大赛，开启你的AI创新实践</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              我们提供全方位的资源支持，助你在AI领域展现才华，实现创新梦想
            </p>
            <Link to="/competition-center">
              <button className="bg-white text-[#7463EC] px-8 py-3.5 rounded-xl font-semibold hover:bg-neutral-50 transition-all duration-300 shadow-md">
                立即报名
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;