import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../components/common/PrimaryButton';
import SecondaryButton from '../components/common/SecondaryButton';
import InfoCard from '../components/common/InfoCard';
import StatusTag from '../components/common/StatusTag';
import { competitions } from '../data/competitions';

const Home = () => {
  // 获取当前主赛事（进行中的赛事）
  const currentCompetition = competitions.find(comp => comp.status === '进行中');
  // 获取精选赛事（前3个）
  const featuredCompetitions = competitions.slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-50 animate-fadeIn">
      {/* Hero 首屏 */}
      <section className="relative bg-gradient-to-br from-primary/10 to-primary/20 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(116,99,236,0.1),transparent_50%)]"></div>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-6xl md:text-7xl font-bold text-neutral-800 mb-10 leading-tight">
              梧桐·鸿鹄人工智能应用创新大赛
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 mb-16 max-w-3xl mx-auto">
              以赛促学 · 以赛促用 · 以赛促创，打造面向未来的人工智能应用创新与人才孵化平台
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <PrimaryButton as={Link} to="/register-competition" className="text-lg px-8 py-4">
                立即报名
              </PrimaryButton>
              <SecondaryButton as={Link} to="/competition-center" className="text-lg px-8 py-4">
                查看赛事
              </SecondaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* 当前主赛事模块 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-neutral-800 mb-12 text-center">当前主赛事</h2>
          <div className="max-w-5xl mx-auto">
            {currentCompetition && (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-100">
                <div className="p-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4 md:mb-0">
                      {currentCompetition.title}
                    </h3>
                    <StatusTag status={currentCompetition.status} className="text-base px-6 py-2" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500 mb-1">比赛时间</p>
                        <p className="text-neutral-800 font-medium">{currentCompetition.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500 mb-1">比赛地点</p>
                        <p className="text-neutral-800 font-medium">{currentCompetition.location}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-neutral-600 mb-10 text-lg">{currentCompetition.description}</p>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <Link to={`/competition/${currentCompetition.id}`} className="flex-1">
                      <PrimaryButton className="w-full text-lg py-4">查看详情</PrimaryButton>
                    </Link>
                    <Link to="/register-competition" className="flex-1">
                      <PrimaryButton className="w-full bg-secondary hover:bg-secondary/90 text-lg py-4">
                        立即报名
                      </PrimaryButton>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 参赛价值模块 */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-neutral-800 mb-12 text-center">参赛价值</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InfoCard className="border border-neutral-100 bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">算力支持</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                提供强大的AI算力资源，支持模型训练和应用开发，降低参赛成本
              </p>
            </InfoCard>
            <InfoCard className="border border-neutral-100 bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">数据资源</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                提供丰富的行业数据集，为参赛项目提供数据支撑，加速创新成果落地
              </p>
            </InfoCard>
            <InfoCard className="border border-neutral-100 bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">专家指导</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                获得行业专家的专业指导和评审，提升项目质量和竞争力
              </p>
            </InfoCard>
            <InfoCard className="border border-neutral-100 bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">项目孵化</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                优秀项目有机会获得孵化支持，对接投资资源，实现商业化落地
              </p>
            </InfoCard>
            <InfoCard className="border border-neutral-100 bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">能力培养</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                通过参赛提升AI技术应用能力、创新思维和团队协作能力
              </p>
            </InfoCard>
            <InfoCard className="border border-neutral-100 bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">就业机会</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                表现优秀的选手有机会获得企业实习和就业推荐机会
              </p>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* 参赛方式模块 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-neutral-800 mb-16 text-center">参赛方式</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InfoCard className="border border-neutral-100 bg-white">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">个人赛</h3>
              <p className="text-neutral-600">
                面向个人AI应用创意与实践，提交视频作品，展示个人创新能力和技术实力
              </p>
            </InfoCard>
            <InfoCard className="border border-neutral-100 bg-white">
              <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">团队赛</h3>
              <p className="text-neutral-600">
                面向多领域AI应用项目，支持2-5人组队，协作完成创新项目并参与评审
              </p>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* 赛事流程模块 */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-neutral-800 mb-16 text-center">赛事流程</h2>
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-neutral-100">
            {/* 桌面端横向进度 */}
            <div className="hidden md:block">
              <div className="relative">
                {/* 进度线 */}
                <div className="absolute top-8 left-0 right-0 h-1 bg-[#E5E7EB]"></div>
                
                {/* 流程节点 */}
                <div className="flex justify-between relative">
                  {
                    [
                      {
                        title: '报名阶段',
                        time: '2025年4月—2025年5月',
                        description: '提交报名信息，确认参赛方向与基础材料。',
                        icon: 'ClipboardCheck'
                      },
                      {
                        title: '初赛',
                        time: '2025年6月',
                        description: '提交作品初稿，完成校内或赛区初步评审。',
                        icon: 'FileText'
                      },
                      {
                        title: '决赛',
                        time: '2025年9月',
                        description: '进行终评展示与答辩，评选优胜项目与团队。',
                        icon: 'Trophy'
                      },
                      {
                        title: '成果支持',
                        time: '2025年10月—2025年12月',
                        description: '对接培训、实训、资源扶持与成果转化机会。',
                        icon: 'Rocket'
                      }
                    ].map((phase, index) => {
                      const isActive = index === 0; // 假设当前在报名阶段
                      return (
                        <div key={index} className="flex flex-col items-center relative w-1/4">
                          {/* 节点 */}
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${isActive ? 'bg-[#7463EC] text-white' : 'bg-[#E5E7EB] text-neutral-500'}`}>
                            {phase.icon === 'ClipboardCheck' && (
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                            {phase.icon === 'FileText' && (
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            )}
                            {phase.icon === 'Trophy' && (
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                            {phase.icon === 'Rocket' && (
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            )}
                          </div>
                          
                          {/* 阶段信息 */}
                          <div className="text-center">
                            <h3 className={`text-lg font-semibold mb-2 ${isActive ? 'text-[#7463EC]' : 'text-[#1F2937]'}`}>{phase.title}</h3>
                            <p className="text-sm text-[#6B7280] mb-2">{phase.time}</p>
                            <p className="text-xs text-[#6B7280]">{phase.description}</p>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              </div>
            </div>
            
            {/* 移动端纵向时间轴 */}
            <div className="md:hidden">
              <div className="relative pl-8">
                {/* 时间轴线 */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#E5E7EB]"></div>
                
                {/* 流程节点 */}
                <div className="space-y-8">
                  {
                    [
                      {
                        title: '报名阶段',
                        time: '2025年4月—2025年5月',
                        description: '提交报名信息，确认参赛方向与基础材料。',
                        icon: 'ClipboardCheck'
                      },
                      {
                        title: '初赛',
                        time: '2025年6月',
                        description: '提交作品初稿，完成校内或赛区初步评审。',
                        icon: 'FileText'
                      },
                      {
                        title: '决赛',
                        time: '2025年9月',
                        description: '进行终评展示与答辩，评选优胜项目与团队。',
                        icon: 'Trophy'
                      },
                      {
                        title: '成果支持',
                        time: '2025年10月—2025年12月',
                        description: '对接培训、实训、资源扶持与成果转化机会。',
                        icon: 'Rocket'
                      }
                    ].map((phase, index) => {
                      const isActive = index === 0; // 假设当前在报名阶段
                      return (
                        <div key={index} className="relative">
                          {/* 节点 */}
                          <div className={`absolute left-[-32px] w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-[#7463EC] text-white' : 'bg-[#E5E7EB] text-neutral-500'}`}>
                            {phase.icon === 'ClipboardCheck' && (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                            {phase.icon === 'FileText' && (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            )}
                            {phase.icon === 'Trophy' && (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                            {phase.icon === 'Rocket' && (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            )}
                          </div>
                          
                          {/* 阶段信息 */}
                          <div className="bg-white p-4 rounded-xl border border-neutral-100 hover:shadow-md transition-all duration-300">
                            <h3 className={`text-lg font-semibold mb-2 ${isActive ? 'text-[#7463EC]' : 'text-[#1F2937]'}`}>{phase.title}</h3>
                            <p className="text-sm text-[#6B7280] mb-2">{phase.time}</p>
                            <p className="text-xs text-[#6B7280]">{phase.description}</p>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 资源支持模块 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-neutral-800 mb-16 text-center">资源支持</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <InfoCard className="border border-neutral-100 bg-white">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">AI算力平台</h3>
              <p className="text-neutral-600">
                提供高性能GPU集群，支持大规模模型训练和推理
              </p>
            </InfoCard>
            <InfoCard className="border border-neutral-100 bg-white">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">鸿鹄学堂</h3>
              <p className="text-neutral-600">
                提供AI技术课程和实战培训，提升参赛选手技术能力
              </p>
            </InfoCard>
            <InfoCard className="border border-neutral-100 bg-white">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">数据集支持</h3>
              <p className="text-neutral-600">
                提供多领域高质量数据集，为项目开发提供数据基础
              </p>
            </InfoCard>
            <InfoCard className="border border-neutral-100 bg-white">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">实训工具</h3>
              <p className="text-neutral-600">
                提供开发工具和环境，简化项目开发和部署流程
              </p>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* 精选赛事预览模块 */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-neutral-800 mb-16 text-center">精选赛事</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCompetitions.map((competition) => (
              <InfoCard key={competition.id} className="border border-neutral-100">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-semibold text-neutral-800">
                    {competition.title}
                  </h3>
                  <StatusTag status={competition.status} />
                </div>
                <div className="text-neutral-600 mb-6">
                  <div className="flex items-center mb-4">
                    <svg className="w-5 h-5 text-neutral-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{competition.date}</span>
                  </div>
                  <div className="flex items-center mb-6">
                    <svg className="w-5 h-5 text-neutral-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{competition.location}</span>
                  </div>
                  <p className="mb-6">{competition.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {competition.tags.map((tag, index) => (
                    <span key={index} className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link to={`/competition/${competition.id}`}>
                  <SecondaryButton className="w-full py-3">查看详情</SecondaryButton>
                </Link>
              </InfoCard>
            ))}
          </div>
        </div>
      </section>

      {/* 合作单位模块 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-neutral-800 mb-16 text-center">合作单位</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-neutral-50 rounded-2xl p-8 flex items-center justify-center h-32 border border-neutral-100 hover:shadow-md transition-shadow">
                <div className="text-center">
                  <p className="text-neutral-600 font-medium">合作单位{i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 页尾 CTA 模块 */}
      <section className="py-32 bg-gradient-to-br from-primary/10 to-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(116,99,236,0.1),transparent_50%)]"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">立即加入 AI 创新实践</h2>
            <p className="text-xl text-neutral-600 mb-10 max-w-2xl mx-auto">
              参与梧桐·鸿鹄人工智能应用创新大赛，展示你的创新才华，开启AI领域的精彩旅程
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <PrimaryButton as={Link} to="/register-competition" className="text-lg px-10 py-4">
                立即报名
              </PrimaryButton>
              <SecondaryButton className="text-lg px-10 py-4">
                下载参赛说明
              </SecondaryButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;