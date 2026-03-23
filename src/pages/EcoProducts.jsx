import React from 'react';

const products = [
  {
    id: 1,
    name: '鸿鹄实训平台',
    description: '集成全流程开发工具，支持低代码快速实现AI应用。从数据处理到模型部署，一站式完成项目开发。',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: 'primary'
  },
  {
    id: 2,
    name: '个人算力账户',
    description: '为每位参赛者分配独立算力，支持GPU/CPU资源。按需分配，弹性调度，让创意不受资源限制。',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    color: 'blue'
  },
  {
    id: 3,
    name: '算力额度交易市场',
    description: '模拟真实算力交易机制，激发创意变现。参赛者可交易闲置算力，实现资源优化配置。',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'green'
  },
  {
    id: 4,
    name: '鸿鹄学堂',
    description: '6000+门AI课程，从基础到实战，免费向选手开放。系统化学习路径，助力技能快速提升。',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: 'purple'
  },
  {
    id: 5,
    name: 'OPC能力认证',
    description: '中国移动认证的OPC技能证书，提升就业竞争力。官方认证，为职业发展增添有力背书。',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    color: 'amber'
  },
];

const EcoProducts = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-800 mb-4">生态产品</h1>
          <p className="text-neutral-600 text-lg">大赛配套的数字化产品与平台，为参赛者提供全方位支持</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map(product => (
            <div key={product.id} className="glass-card rounded-2xl p-8">
              <div className="flex items-start gap-6">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  product.color === 'primary' ? 'bg-primary/10 text-primary' :
                  product.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                  product.color === 'green' ? 'bg-green-50 text-green-600' :
                  product.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                  'bg-amber-50 text-amber-600'
                }`}>
                  {product.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-neutral-800 mb-3">{product.name}</h3>
                  <p className="text-neutral-600 leading-relaxed">{product.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 glass-card rounded-2xl p-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-neutral-700">温馨提示</span>
          </div>
          <p className="text-neutral-600 text-center">
            以上产品和服务均面向大赛参赛者开放，部分产品需报名成功后登录使用。如有疑问，请联系大赛工作组。
          </p>
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#7463EC] via-[#5b4cdb] to-[#4338ca] rounded-2xl p-10 text-center shadow-lg shadow-primary/20">
          <h2 className="text-2xl font-bold text-white mb-4">开启AI创新之旅</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            立即报名参赛，解锁全部生态产品，在竞赛中快速成长
          </p>
          <a 
            href="/register-competition" 
            className="inline-block bg-white text-[#7463EC] font-semibold px-8 py-3.5 rounded-xl hover:bg-neutral-50 transition-all duration-300 shadow-md"
          >
            立即报名
          </a>
        </div>
      </div>
    </div>
  );
};

export default EcoProducts;
