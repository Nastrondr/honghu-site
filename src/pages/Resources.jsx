import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Users, 
  Database, 
  Trophy, 
  Cpu, 
  Code2, 
  FileText, 
  GraduationCap, 
  Calendar, 
  MessageCircle, 
  Award, 
  Medal, 
  Rocket,
  ArrowRight,
  Check,
  Lightbulb,
  Layers,
  TrendingUp
} from 'lucide-react';

// 资源分类数据
const resourceCategories = [
  {
    title: '技术资源',
    icon: Cpu,
    color: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-50',
    items: ['高性能 GPU 算力', '开发工具链', '技术文档 / API']
  },
  {
    title: '数据资源',
    icon: Database,
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'bg-cyan-50',
    items: ['开放数据集', '脱敏行业数据', '训练/测试数据']
  },
  {
    title: '专家与成长',
    icon: GraduationCap,
    color: 'from-orange-500 to-amber-600',
    bgColor: 'bg-orange-50',
    items: ['导师辅导', '行业讲座 / 工作坊', '项目答疑支持']
  },
  {
    title: '结果与激励',
    icon: Trophy,
    color: 'from-rose-500 to-red-600',
    bgColor: 'bg-rose-50',
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
    featured: true,
    icon: Zap,
    color: 'from-violet-500 to-purple-600'
  },
  {
    title: '专业导师团队',
    summary: '1000+行业专家与学术导师全程指导',
    points: ['一对一项目辅导', '定期技术答疑', '行业经验分享'],
    action: '查看导师名单',
    link: '#',
    icon: Users,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    title: '开放数据集',
    summary: '多领域高质量数据，助力模型训练',
    points: ['计算机视觉数据', 'NLP语料库', '行业脱敏数据'],
    action: '查看数据说明',
    link: '#',
    icon: Database,
    color: 'from-cyan-500 to-teal-600'
  },
  {
    title: '开发工具支持',
    summary: '鸿鹄实训平台，低代码快速开发',
    points: ['可视化开发环境', '预置AI模型库', '一键部署上线'],
    action: '进入实训平台',
    link: '#',
    icon: Code2,
    color: 'from-indigo-500 to-blue-600'
  },
  {
    title: '项目孵化机会',
    summary: '优秀项目可获得全方位孵化支持',
    points: ['办公空间支持', '投融资对接', '商业化落地辅导'],
    action: '了解孵化计划',
    link: '#',
    icon: Rocket,
    color: 'from-amber-500 to-orange-600'
  },
  {
    title: '奖励与荣誉',
    summary: '丰厚奖金与权威证书，提升竞争力',
    points: ['总奖金池100万+', '官方认证证书', '行业曝光机会'],
    action: '查看奖项设置',
    link: '#',
    icon: Medal,
    color: 'from-rose-500 to-pink-600'
  }
];

// 核心亮点
const coreHighlights = [
  {
    title: '真实产业场景',
    desc: '赛题源自企业真实需求，作品可直接落地应用',
    icon: Lightbulb,
    color: 'from-amber-400 to-orange-500'
  },
  {
    title: '全流程资源支持',
    desc: '从报名到提交，算力、数据、导师全程陪伴',
    icon: Layers,
    color: 'from-blue-400 to-indigo-500'
  },
  {
    title: '成果转化机会',
    desc: '优秀项目对接投资与孵化，加速商业化进程',
    icon: TrendingUp,
    color: 'from-emerald-400 to-green-500'
  }
];

// 快速概览数据
const quickOverview = [
  { icon: Zap, text: '免费算力支持', color: 'text-violet-500', bgColor: 'bg-violet-50' },
  { icon: Users, text: '行业导师指导', color: 'text-blue-500', bgColor: 'bg-blue-50' },
  { icon: Database, text: '开放数据资源', color: 'text-cyan-500', bgColor: 'bg-cyan-50' },
  { icon: Trophy, text: '丰厚奖励与孵化', color: 'text-amber-500', bgColor: 'bg-amber-50' }
];

const Resources = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero 区 */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4 tracking-tight">
              资源支持
            </h1>
            <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto leading-relaxed">
              从算力、数据、导师到开发工具与奖励机制，为参赛团队提供全流程支持
            </p>
          </div>

          {/* 4 项快速概览 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {quickOverview.map((item, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl p-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 border border-neutral-100"
              >
                <div className={`w-12 h-12 ${item.bgColor} rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} strokeWidth={1.5} />
                </div>
                <span className="text-sm font-medium text-neutral-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. 资源分类区 */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-3">四大资源类型</h2>
            <p className="text-neutral-500">全方位的资源支持体系，助力你的AI创新之路</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resourceCategories.map((category, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl p-7 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 border border-neutral-100"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-5 shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-neutral-800 mb-4">{category.title}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-neutral-600 flex items-center gap-3">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.color}`}></span>
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
      <section className="py-20 bg-neutral-50/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-3">资源获取流程</h2>
            <p className="text-neutral-500">简单四步，即可获取全部赛事资源</p>
          </div>
          
          <div className="relative">
            {/* 连接线 - 桌面端 */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-violet-200 via-blue-200 to-emerald-200"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-2xl p-7 shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-neutral-100 relative z-10 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] transition-all duration-300">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold mb-5 mx-auto shadow-lg shadow-violet-500/30">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-bold text-neutral-800 mb-2 text-center">{step.title}</h3>
                    <p className="text-sm text-neutral-500 text-center leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. 重点资源详情区 */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-3">重点资源详情</h2>
            <p className="text-neutral-500">深入了解每一项核心资源的具体内容</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourceDetails.map((resource, index) => (
              <div 
                key={index} 
                className={`group bg-white rounded-2xl p-7 shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-neutral-100 flex flex-col h-full hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 ${resource.featured ? 'lg:scale-[1.02] ring-2 ring-violet-500/20' : ''}`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${resource.color} flex items-center justify-center mb-5 shadow-lg ${resource.featured ? 'shadow-violet-500/30' : ''}`}>
                  <resource.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-neutral-800 mb-2">{resource.title}</h3>
                <p className="text-sm text-neutral-500 mb-5 leading-relaxed">{resource.summary}</p>
                <ul className="space-y-3 mb-6 flex-1">
                  {resource.points.map((point, idx) => (
                    <li key={idx} className="text-sm text-neutral-600 flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${resource.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                      {point}
                    </li>
                  ))}
                </ul>
                <Link 
                  to={resource.link}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors group/link"
                >
                  {resource.action}
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 核心支持亮点区 */}
      <section className="py-20 bg-neutral-50/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-3">核心支持亮点</h2>
            <p className="text-neutral-500">三大核心价值，让你的参赛之旅更有保障</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreHighlights.map((highlight, index) => (
              <div 
                key={index} 
                className="group text-center"
              >
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${highlight.color} flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                  <span className="text-3xl font-bold text-white">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-800 mb-3">{highlight.title}</h3>
                <p className="text-neutral-500 leading-relaxed">{highlight.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA 区 */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-10 md:p-14 text-center shadow-2xl shadow-violet-500/20">
            {/* 背景光效 */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                加入大赛，开启你的 AI 创新实践
              </h2>
              <p className="text-white/80 mb-10 max-w-xl mx-auto text-lg">
                报名后可获取赛事资源、导师支持与作品孵化机会
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/register-competition"
                  className="group bg-white text-violet-600 px-10 py-4 rounded-xl font-bold text-base hover:bg-neutral-50 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5 transition-all duration-300"
                >
                  立即报名
                  <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/competition-center"
                  className="group px-10 py-4 rounded-xl font-bold text-base border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
                >
                  查看赛事中心
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
