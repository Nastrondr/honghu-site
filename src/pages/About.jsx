import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen animate-fadeIn">
      {/* 页面头部 */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">关于大赛</h1>
          <p className="text-xl text-gray-600">聚焦人工智能应用创新与人才孵化的赛事平台</p>
        </div>

        {/* 定位与愿景模块 */}
        <div className="bg-neutral-50/50 rounded-2xl border border-neutral-200/60 p-8 mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-800 mb-2">定位与愿景</h2>
            <p className="text-neutral-500 text-sm">面向未来的AI应用创新与人才孵化平台</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="relative pl-5">
              <div className="absolute left-0 top-1.5 w-1 h-5 bg-gradient-to-b from-violet-500 to-violet-400 rounded-full"></div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">定位</h3>
              <p className="text-neutral-600 leading-relaxed text-sm">
                梧桐·鸿鹄人工智能应用创新大赛致力于打造一个面向未来的人工智能应用创新与人才孵化平台。我们以"以赛促学、以赛促用、以赛促创"为理念，推动人工智能技术在实际场景中的应用落地，培养和发掘优秀的AI人才。
              </p>
            </div>
            
            <div className="relative pl-5 md:border-l md:border-neutral-200 md:pl-8">
              <div className="absolute left-0 top-1.5 w-1 h-5 bg-gradient-to-b from-cyan-500 to-cyan-400 rounded-full"></div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">愿景</h3>
              <p className="text-neutral-600 leading-relaxed text-sm">
                大赛聚焦人工智能应用创新，强调场景驱动和产学研协同，旨在搭建一个连接高校、企业和研究机构的桥梁，促进AI技术与产业需求的深度融合，为人工智能行业的可持续发展注入新动力。
              </p>
            </div>
          </div>
        </div>

        {/* 核心特色模块 */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">核心特色</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#7463EC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">AI应用导向</h3>
              <p className="text-gray-600">注重人工智能技术在实际场景中的应用，鼓励解决真实问题的创新方案。</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#7463EC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">场景驱动实践</h3>
              <p className="text-gray-600">基于真实产业场景设计赛题，推动理论与实践相结合的创新能力培养。</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#7463EC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">资源赋能支持</h3>
              <p className="text-gray-600">提供算力、数据、导师等全方位资源支持，为参赛团队创造良好的创新环境。</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#7463EC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">协同孵化机制</h3>
              <p className="text-gray-600">建立产学研协同机制，为优秀项目提供孵化机会和落地支持。</p>
            </div>
          </div>
        </div>

        {/* 组织架构模块 */}
        <div className="bg-neutral-50/50 rounded-2xl border border-neutral-200/60 p-8 mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-800 mb-2">组织架构</h2>
            <p className="text-neutral-500 text-sm">大赛主办、联合及支持单位</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            <div className="relative">
              <div className="absolute top-0 left-0 w-12 h-0.5 bg-gradient-to-r from-violet-500 to-violet-400 rounded-full"></div>
              <h3 className="text-base font-semibold text-neutral-800 mb-4 pt-2">主办单位</h3>
              <ul className="space-y-3 text-neutral-600">
                <li className="leading-relaxed">梧桐科技有限公司</li>
                <li className="leading-relaxed">中国人工智能学会</li>
              </ul>
            </div>
            <div className="relative md:border-l md:border-neutral-200 md:pl-6">
              <div className="absolute top-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"></div>
              <h3 className="text-base font-semibold text-neutral-800 mb-4 pt-2">联合单位</h3>
              <ul className="space-y-3 text-neutral-600">
                <li className="leading-relaxed">清华大学计算机科学与技术系</li>
                <li className="leading-relaxed">北京大学人工智能研究院</li>
                <li className="leading-relaxed">中国科学院自动化研究所</li>
              </ul>
            </div>
            <div className="relative md:border-l md:border-neutral-200 md:pl-6">
              <div className="absolute top-0 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"></div>
              <h3 className="text-base font-semibold text-neutral-800 mb-4 pt-2">支持机构</h3>
              <ul className="space-y-3 text-neutral-600">
                <li className="leading-relaxed">国家科技部</li>
                <li className="leading-relaxed">工业和信息化部</li>
                <li className="leading-relaxed">教育部</li>
                <li className="leading-relaxed">中国科学技术协会</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 参赛对象模块 */}
        <div className="bg-neutral-50/50 rounded-2xl border border-neutral-200/60 p-8 mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-800 mb-2">参赛对象</h2>
            <p className="text-neutral-500 text-sm">面向多元创新主体的开放赛事</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <div className="group bg-white rounded-xl border border-neutral-200/60 p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center mb-4">
                <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-neutral-800 mb-2">高校学生</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">全日制在校本科生、研究生，对人工智能应用创新有兴趣的学生团队。</p>
            </div>
            <div className="group bg-white rounded-xl border border-neutral-200/60 p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-neutral-800 mb-2">教师</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">高校和研究机构的教师，可作为团队指导老师或参与专项赛道。</p>
            </div>
            <div className="group bg-white rounded-xl border border-neutral-200/60 p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center mb-4">
                <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-neutral-800 mb-2">开发者</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">AI领域专业开发者，具备相关技术背景和项目经验的个人或团队。</p>
            </div>
            <div className="group bg-white rounded-xl border border-neutral-200/60 p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-neutral-800 mb-2">创新团队</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">由企业、高校或研究机构组成的跨学科创新团队。</p>
            </div>
            <div className="group bg-white rounded-xl border border-neutral-200/60 p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center mb-4">
                <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-neutral-800 mb-2">合作机构</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">关注AI应用创新的企业，投资机构、行业协会等组织。</p>
            </div>
          </div>
        </div>

        {/* 企业特别通道模块 */}
        <div className="bg-gradient-to-r from-violet-50 via-indigo-50 to-cyan-50 rounded-2xl border border-violet-100/60 p-8 mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-1">企业特别通道</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  设立人工智能企业数字化转型评审专项通道，为具有成熟AI应用方案的企业提供快速入选通道
                </p>
              </div>
            </div>
            <a 
              href="/partners" 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-colors duration-300 flex-shrink-0"
            >
              了解详情
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* 页面底部 CTA 模块 */}
        <div className="bg-gradient-to-r from-[#7463EC] via-[#5b4cdb] to-[#4338ca] rounded-2xl p-10 text-center shadow-lg shadow-primary/20">
          <h2 className="text-2xl font-bold text-white mb-4">了解赛事，参与创新实践</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            加入梧桐·鸿鹄人工智能应用创新大赛，展示你的创新能力，获得专业指导和资源支持，开启AI应用创新之旅。
          </p>
          <a href="/competition-center" className="inline-block bg-white text-[#7463EC] font-semibold px-8 py-3.5 rounded-xl hover:bg-neutral-50 transition-all duration-300 shadow-md">
            查看赛事
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;