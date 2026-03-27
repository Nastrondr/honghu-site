import React from 'react';
import { Link } from 'react-router-dom';

// 资源分类数据
const resourceCategories = [
  {
    title: '技术资源',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    items: ['高性能 GPU 算力', '开发工具链', '技术文档 / API']
  },
  {
    title: '数据资源',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    items: ['开放数据集', '脱敏行业数据', '训练/测试数据']
  },
  {
    title: '专家与成长',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    items: ['导师辅导', '行业讲座 / 工作坊', '项目答疑支持']
  },
  {
    title: '结果与激励',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    items: ['奖项奖金', '证书荣誉', '孵化 / 投资机会']
  }
];

// 获取流程数据
const processSteps = [
  {
    step: '01',
    title: '报名参赛',
    desc: '选择赛道，填写团队信息，提交报名申请'
  },
  {
    step: '02',
    title: '审核通过',
    desc: '组委会审核报名信息，确认参赛资格'
  },
  {
    step: '03',
    title: '获取资源权限',
    desc: '开通算力账户、数据访问、导师对接等权限'
  },
  {
    step: '04',
    title: '开发并提交作品',
    desc: '使用平台资源开发作品，按时提交参赛'
  }
];

// 重点资源详情
const resourceDetails = [
  {
    title: '高性能算力资源',
    summary: '免费GPU/CPU算力支持，满足模型训练需求',
    points: ['V100/A100 GPU集群', '弹性算力调度', '7×24小时稳定服务'],
    action: '了解申请方式',
    link: '#',
    color: 'violet'
  },
  {
    title: '专业导师团队',
    summary: '1000+行业专家与学术导师全程指导',
    points: ['一对一项目辅导', '定期技术答疑', '行业经验分享'],
    action: '查看导师名单',
    link: '#',
    color: 'blue'
  },
  {
    title: '开放数据集',
    summary: '多领域高质量数据，助力模型训练',
    points: ['计算机视觉数据', 'NLP语料库', '行业脱敏数据'],
    action: '查看数据说明',
    link: '#',
    color: 'cyan'
  },
  {
    title: '开发工具支持',
    summary: '鸿鹄实训平台，低代码快速开发',
    points: ['可视化开发环境', '预置AI模型库', '一键部署上线'],
    action: '进入实训平台',
    link: '#',
    color: 'indigo'
  },
  {
    title: '项目孵化机会',
    summary: '优秀项目可获得全方位孵化支持',
    points: ['办公空间支持', '投融资对接', '商业化落地辅导'],
    action: '了解孵化计划',
    link: '#',
    color: 'amber'
  },
  {
    title: '奖励与荣誉',
    summary: '丰厚奖金与权威证书，提升竞争力',
    points: ['总奖金池100万+', '官方认证证书', '行业曝光机会'],
    action: '查看奖项设置',
    link: '#',
    color: 'rose'
  }
];

// 核心亮点
const coreHighlights = [
  {
    title: '真实产业场景',
    desc: '赛题源自企业真实需求，作品可直接落地应用'
  },
  {
    title: '全流程资源支持',
    desc: '从报名到提交，算力、数据、导师全程陪伴'
  },
  {
    title: '成果转化机会',
    desc: '优秀项目对接投资与孵化，加速商业化进程'
  }
];

const Resources = () => {
  const getColorClasses = (color) => {
    const colors = {
      violet: 'bg-violet-50 text-violet-600 border-violet-100',
      blue: 'bg-blue-50 text-blue-600 border-blue-100',
      cyan: 'bg-cyan-50 text-cyan-600 border-cyan-100',
      indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      amber: 'bg-amber-50 text-amber-600 border-amber-100',
      rose: 'bg-rose-50 text-rose-600 border-rose-100'
    };
    return colors[color] || colors.violet;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero 区 */}
      <section className="pt-16 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-3">资源支持</h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              从算力、数据、导师到开发工具与奖励机制，为参赛团队提供全流程支持
            </p>
          </div>

          {/* 4 项快速概览 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: '⚡', text: '免费算力支持' },
              { icon: '👨‍🏫', text: '行业导师指导' },
              { icon: '📊', text: '开放数据资源' },
              { icon: '🏆', text: '丰厚奖励与孵化' }
            ].map((item, index) => (
              <div key={index} className="bg-neutral-50 rounded-xl p-4 text-center">
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <span className="text-sm font-medium text-neutral-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. 资源分类区 */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl font-bold text-neutral-800 mb-8 text-center">四大资源类型</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resourceCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-neutral-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary/60 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 获取流程区 */}
      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl font-bold text-neutral-800 mb-8 text-center">资源获取流程</h2>
          <div className="relative">
            {/* 连接线 - 桌面端 */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-neutral-200"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl p-6 border border-neutral-200 relative z-10">
                    <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto md:mx-0">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2 text-center md:text-left">{step.title}</h3>
                    <p className="text-sm text-neutral-600 text-center md:text-left">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. 重点资源详情区 */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl font-bold text-neutral-800 mb-8 text-center">重点资源详情</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourceDetails.map((resource, index) => (
              <div key={index} className="bg-white rounded-xl border border-neutral-200 p-6 flex flex-col h-full hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${getColorClasses(resource.color)}`}>
                  <span className="text-lg font-bold">{resource.title.charAt(0)}</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">{resource.title}</h3>
                <p className="text-sm text-neutral-600 mb-4">{resource.summary}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {resource.points.map((point, idx) => (
                    <li key={idx} className="text-sm text-neutral-600 flex items-start gap-2">
                      <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
                <Link 
                  to={resource.link}
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                >
                  {resource.action}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 核心支持亮点区 */}
      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl font-bold text-neutral-800 mb-8 text-center">核心支持亮点</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreHighlights.map((highlight, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold text-primary">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">{highlight.title}</h3>
                <p className="text-sm text-neutral-600">{highlight.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA 区 */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-gradient-to-r from-[#7463EC] via-[#5b4cdb] to-[#4338ca] rounded-2xl p-8 md:p-10 text-center shadow-lg shadow-primary/20">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">加入大赛，开启你的 AI 创新实践</h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              报名后可获取赛事资源、导师支持与作品孵化机会
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register-competition"
                className="bg-white text-[#7463EC] px-8 py-3 rounded-xl font-semibold hover:bg-neutral-50 transition-all duration-300 shadow-md"
              >
                立即报名
              </Link>
              <Link
                to="/competition-center"
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
              >
                查看赛事中心
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
