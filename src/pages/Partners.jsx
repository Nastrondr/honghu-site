import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../components/common/PrimaryButton';
import SecondaryButton from '../components/common/SecondaryButton';

const universities = [
  { name: '中国科学院大学', type: 'university' },
  { name: '重庆理工大学', type: 'university' },
  { name: '北方工业大学', type: 'university' },
  { name: '汕头大学', type: 'university' },
  { name: '安徽师范大学', type: 'university' },
  { name: '广东工业大学', type: 'university' },
  { name: '南京邮电大学', type: 'university' },
  { name: '华南师范大学', type: 'university' },
  { name: '深圳大学', type: 'university' },
  { name: '北京邮电大学', type: 'university' },
  { name: '暨南大学', type: 'university' },
  { name: '北京交通大学', type: 'university' },
  { name: '华南理工大学', type: 'university' },
  { name: '南开大学', type: 'university' },
  { name: '北京师范大学', type: 'university' },
  { name: '北京理工大学', type: 'university' },
  { name: '北京航空航天大学', type: 'university' },
  { name: '中山大学', type: 'university' },
  { name: '华中科技大学', type: 'university' },
  { name: '南京大学', type: 'university' },
  { name: '西安电子科技大学', type: 'university' },
  { name: '东南大学', type: 'university' },
  { name: '浙江大学', type: 'university' },
  { name: '长沙理工大学', type: 'university' },
  { name: '珠海科技学院', type: 'university' },
  { name: '复旦大学', type: 'university' },
  { name: '湖南大学', type: 'university' },
  { name: '中南大学', type: 'university' },
  { name: '华中师范大学', type: 'university' },
  { name: '河北师范大学', type: 'university' },
  { name: '天津大学', type: 'university' },
  { name: '北京工业大学', type: 'university' },
  { name: '北京石油化工学院', type: 'university' },
  { name: '长沙民政职业技术学院', type: 'university' },
  { name: '宿州学院', type: 'university' },
  { name: '连云港职业技术学院', type: 'university' },
  { name: '宿迁泽达职业技术学院', type: 'university' },
  { name: '扬州工业职业技术学院', type: 'university' },
  { name: '上海闵行职业技术学院', type: 'university' },
  { name: '江苏农林职业技术学院', type: 'university' },
  { name: '南通职业大学', type: 'university' },
  { name: '宁夏理工学院', type: 'university' },
  { name: '河南机电职业学院', type: 'university' },
  { name: '郑州铁路职业技术学院', type: 'university' }
];

const companies = [
  { name: '华为', type: 'company' },
  { name: '文思海辉', type: 'company' },
  { name: '亚信科技', type: 'company' },
  { name: '东软', type: 'company' },
  { name: '嘉环', type: 'company' },
  { name: '中安国发', type: 'company' },
  { name: '帆软软件', type: 'company' },
  { name: '中兴', type: 'company' },
  { name: '启明星辰', type: 'company' },
  { name: '浪潮', type: 'company' },
  { name: '商汤科技', type: 'company' },
  { name: '科大讯飞', type: 'company' },
  { name: '天融信', type: 'company' },
  { name: '奇安信', type: 'company' },
  { name: '绿盟科技', type: 'company' },
  { name: '富数科技', type: 'company' },
  { name: '网神', type: 'company' },
  { name: '偶数科技', type: 'company' },
  { name: '天玑科技', type: 'company' },
  { name: '彩讯股份', type: 'company' },
  { name: '南大通用', type: 'company' },
  { name: '浩鲸科技', type: 'company' },
  { name: '智行科技', type: 'company' },
  { name: '观安信息', type: 'company' },
  { name: '东方国信', type: 'company' },
  { name: '超亮科技', type: 'company' },
  { name: '华胜天成', type: 'company' },
  { name: '九章云极', type: 'company' },
  { name: '神州泰岳', type: 'company' },
  { name: '深度零', type: 'company' },
  { name: '卓望', type: 'company' },
  { name: '领航动力', type: 'company' },
  { name: '新大陆软件', type: 'company' },
  { name: '明通科技', type: 'company' },
  { name: '龙盾数据', type: 'company' }
];

const Partners = () => {
  return (
    <div className="min-h-screen animate-fadeIn">
      {/* 页面头部 */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-neutral-800 mb-4">合作单位</h1>
            <p className="text-xl text-neutral-600">联合多方资源，共建人工智能创新生态</p>
          </div>
        </div>
      </section>

      {/* 主办单位 */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-10 text-center">主办单位</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card rounded-2xl p-8 group">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2 group-hover:text-primary transition-colors">工信部国际经济技术合作中心</h3>
                <p className="text-neutral-500 text-sm">推动国际经济技术合作，促进人工智能产业发展的重要机构</p>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-8 group">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2 group-hover:text-primary transition-colors">中科北龙</h3>
                <p className="text-neutral-500 text-sm">专注于人工智能技术研发与创新的前沿科技企业</p>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-8 group">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2 group-hover:text-primary transition-colors">中国移动</h3>
                <p className="text-neutral-500 text-sm">全球领先的通信运营商，提供5G网络与算力支持</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 联合主办/指导单位 */}
      <section className="py-16">
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
      <section className="py-16 bg-slate-50/50">
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
              {companies.map((company, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100 flex items-center justify-center hover:shadow-md transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(116,99,236,0.2)] opacity-70 hover:opacity-100"
                >
                  <div className="w-20 h-20 bg-neutral-100 rounded-lg flex items-center justify-center">
                    <span className="text-neutral-500 text-sm text-center">{company.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 教育合作单位 */}
          <div>
            <h3 className="text-xl font-medium text-neutral-800 mb-6">教育合作单位</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {universities.map((university, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100 flex items-center justify-center hover:shadow-md transition-all duration-300 hover:scale-105 grayscale-[80%] hover:grayscale-0"
                >
                  <div className="w-20 h-20 bg-neutral-100 rounded-lg flex items-center justify-center">
                    <span className="text-neutral-500 text-sm text-center">{university.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 支持机构 */}
      <section className="py-16">
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
      <section className="py-16 bg-slate-50/50">
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
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-gradient-to-r from-[#7463EC] via-[#5b4cdb] to-[#4338ca] rounded-2xl p-12 text-center shadow-lg shadow-primary/20">
            <h2 className="text-3xl font-bold text-white mb-6">携手合作，共建创新生态</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              加入我们的合作伙伴网络，共同推动人工智能应用创新，培养优秀人才，构建可持续发展的AI生态系统
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="border border-white/30 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                联系我们
              </button>
              <button className="bg-white text-[#7463EC] px-8 py-3.5 rounded-xl font-semibold hover:bg-neutral-50 transition-all duration-300 shadow-md">
                成为合作伙伴
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;