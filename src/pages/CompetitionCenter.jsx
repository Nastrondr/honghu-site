import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CompetitionCenter = () => {
  const [activeCategory, setActiveCategory] = useState('校园赛');
  const { isAuthenticated } = useAuth();
  
  const competitions = [
    {
      id: 1,
      title: '2024年梧桐·鸿鹄人工智能应用创新大赛',
      date: '2024年10月15日 - 2024年12月31日',
      location: '线上',
      status: '进行中',
      category: '校园赛',
      tags: ['人工智能', '创新应用', '全国赛'],
      description: '面向全国的人工智能应用创新大赛，鼓励选手开发具有实际应用价值的AI解决方案。'
    },
    {
      id: 2,
      title: '2024年梧桐·鸿鹄AI算法挑战赛',
      date: '2024年9月1日 - 2024年10月15日',
      location: '线上',
      status: '已结束',
      category: '校园赛',
      tags: ['算法', 'AI', '技术挑战'],
      description: '专注于AI算法优化的技术挑战赛，考验选手的算法设计和实现能力。'
    },
    {
      id: 3,
      title: '2024年梧桐·鸿鹄区县AI应用创新大赛',
      date: '2024年11月1日 - 2025年1月31日',
      location: '线下',
      status: '进行中',
      category: '区县赛',
      tags: ['人工智能', '区县应用', '地方赛'],
      description: '面向各区县的人工智能应用创新大赛，鼓励选手开发适合本地场景的AI解决方案。'
    },
    {
      id: 4,
      title: '2024年梧桐·鸿鹄区县AI算法挑战赛',
      date: '2024年8月1日 - 2024年9月30日',
      location: '线上',
      status: '已结束',
      category: '区县赛',
      tags: ['算法', 'AI', '区县赛'],
      description: '专注于区县场景的AI算法优化技术挑战赛，考验选手的算法设计和实现能力。'
    }
  ];
  
  const filteredCompetitions = activeCategory === '全部' 
    ? competitions 
    : competitions.filter(competition => competition.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-12 animate-fadeIn">
      <h1 className="text-3xl font-bold text-neutral-800 mb-8">赛事中心</h1>
      <p className="text-neutral-600 mb-8">这里展示了梧桐·鸿鹄人工智能应用创新大赛的相关赛事信息</p>
      
      {/* 分类切换控件 */}
      <div className="flex justify-center mb-10">
        <div className="bg-neutral-100 rounded-2xl p-2 inline-flex">
          <button 
            onClick={() => setActiveCategory('校园赛')}
            className={`px-6 py-2 rounded-xl text-sm font-medium transition-colors ${activeCategory === '校园赛' ? 'bg-white text-[#7463EC] shadow-sm font-medium' : 'bg-transparent text-neutral-700 hover:bg-neutral-200'}`}
          >
            校园赛
          </button>
          <button 
            onClick={() => setActiveCategory('区县赛')}
            className={`px-6 py-2 rounded-xl text-sm font-medium transition-colors ${activeCategory === '区县赛' ? 'bg-white text-[#7463EC] shadow-sm font-medium' : 'bg-transparent text-neutral-700 hover:bg-neutral-200'}`}
          >
            区县赛
          </button>
        </div>
      </div>
      
      {/* 参赛流程 */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-6">参赛流程</h2>
        <div className="relative">
          {/* 横向进度线 */}
          <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-neutral-200"></div>
          
          {/* 横向步骤条 */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-0">
            {[
              { step: '查看赛事', description: '了解赛事规则和奖励' },
              { step: '报名参赛', description: '填写个人或团队信息' },
              { step: '组队协作', description: '团队赛组建团队，个人赛无需组队' },
              { step: '提交作品', description: '按要求上传参赛作品' },
              { step: '查看结果', description: '关注比赛结果和后续通知' }
            ].map((item, index) => (
              <div key={index} className="relative text-center md:px-4 flex flex-col items-center">
                {/* 节点 */}
                <div className="flex justify-center mb-4">
                  <div className={`w-10 h-10 ${index === 2 ? 'bg-primary' : 'bg-neutral-200'} rounded-full flex items-center justify-center text-white font-bold`}>
                    {index + 1}
                  </div>
                </div>
                
                {/* 内容 */}
                <div className="flex flex-col items-center">
                  <h3 className={`text-lg font-semibold text-neutral-800 mb-2 ${index === 2 ? 'text-primary' : ''}`}>{item.step}</h3>
                  <p className="text-xs text-neutral-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 平台功能入口 - 仅登录后可见 */}
      {isAuthenticated ? (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-6">平台功能入口</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {
              [
                { title: '团队大厅', icon: 'users', link: '/team-hall' },
                { title: '赛题数据', icon: 'database', link: '/competition-data' },
                { title: '我的作品', icon: 'folder', link: '/work-submission' }
              ].map((item, index) => (
                <Link key={index} to={item.link} className="bg-neutral-50 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-primary/5 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    {item.icon === 'users' && (
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )}
                    {item.icon === 'database' && (
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                      </svg>
                    )}
                    {item.icon === 'folder' && (
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    )}
                  </div>
                  <p className="text-neutral-800 font-medium">{item.title}</p>
                </Link>
              ))
            }
          </div>
        </div>
      ) : (
        <div className="mb-10 bg-neutral-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-4">平台功能入口</h2>
          <p className="text-neutral-600 mb-6">登录后可访问团队大厅、赛题数据、作品提交等功能</p>
          <div className="flex justify-center gap-4">
            <Link to="/login" className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              登录
            </Link>
            <Link to="/register" className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/5 transition-colors">
              注册
            </Link>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6">
        {filteredCompetitions.map((competition) => (
          <div key={competition.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-neutral-800 mb-2 md:mb-0">
                <Link to={`/competition/${competition.id}`} className="hover:text-primary transition-colors">
                  {competition.title}
                </Link>
              </h2>
              <span className={`px-4 py-1 rounded-full text-sm font-medium ${competition.status === '进行中' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                {competition.status}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-4 text-neutral-600">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {competition.date}
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {competition.location}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {competition.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            
            <p className="text-neutral-600 mb-4">{competition.description}</p>
            
            <Link to={`/competition/${competition.id}`} className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              查看详情
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitionCenter;