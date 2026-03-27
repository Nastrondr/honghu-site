import React from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  Database,
  Code2,
  GraduationCap,
  Award,
  ArrowRight,
  Server,
  TrendingUp,
  BookOpen,
  BadgeCheck,
  ChevronRight
} from 'lucide-react';

// 生态体系节点数据
const ecosystemNodes = [
  { icon: Cpu, label: '算力', desc: 'GPU/CPU资源' },
  { icon: Database, label: '数据', desc: '数据集支持' },
  { icon: Code2, label: '开发', desc: '实训平台' },
  { icon: GraduationCap, label: '成长', desc: '学堂课程' },
  { icon: Award, label: '认证', desc: 'OPC证书' },
];

// 产品分组数据
const productGroups = [
  {
    title: '算力与基础设施',
    products: [
      {
        id: 1,
        name: '个人算力账户',
        description: '为每位参赛者分配独立算力，支持GPU/CPU资源。按需分配，弹性调度。',
        icon: Server,
        link: '/compute-account'
      },
      {
        id: 2,
        name: '算力交易市场',
        description: '模拟真实算力交易机制，参赛者可交易闲置算力，实现资源优化配置。',
        icon: TrendingUp,
        link: '/compute-market'
      }
    ]
  },
  {
    title: '开发平台',
    products: [
      {
        id: 3,
        name: '鸿鹄实训平台',
        description: '集成全流程开发工具，支持低代码快速实现AI应用。一站式完成项目开发。',
        icon: Code2,
        link: '/training-platform'
      }
    ]
  },
  {
    title: '学习与成长',
    products: [
      {
        id: 4,
        name: '鸿鹄学堂',
        description: '6000+门AI课程，从基础到实战，免费向选手开放。系统化学习路径。',
        icon: BookOpen,
        link: '/academy'
      }
    ]
  },
  {
    title: '认证与成果',
    products: [
      {
        id: 5,
        name: 'OPC能力认证',
        description: '中国移动认证的OPC技能证书，提升就业竞争力。官方认证背书。',
        icon: BadgeCheck,
        link: '/opc-certification'
      }
    ]
  }
];

// 使用流程数据
const usageSteps = [
  {
    step: '01',
    title: '获取算力',
    desc: '注册即送算力额度，按需申请GPU/CPU资源',
    icon: Cpu
  },
  {
    step: '02',
    title: '使用平台开发',
    desc: '登录实训平台，使用低代码工具快速开发',
    icon: Code2
  },
  {
    step: '03',
    title: '学习与提升',
    desc: '通过鸿鹄学堂学习AI课程，提升技能水平',
    icon: GraduationCap
  },
  {
    step: '04',
    title: '获得认证与机会',
    desc: '通过OPC认证，获得就业推荐与孵化机会',
    icon: Award
  }
];

const EcoProducts = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* 1. 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-800 mb-4">生态产品</h1>
          <p className="text-neutral-600 text-lg">大赛配套的数字化产品与平台，为参赛者提供全方位支持</p>
        </div>

        {/* 2. 生态总览 - 鸿鹄AI生态体系 */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-neutral-800 mb-2">鸿鹄AI生态体系</h2>
            <p className="text-neutral-500">从算力到应用，从开发到认证的完整闭环</p>
          </div>

          {/* 生态节点横向展示 */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-0">
              {ecosystemNodes.map((node, index) => (
                <React.Fragment key={index}>
                  {/* 节点 */}
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-xl bg-violet-50 flex items-center justify-center mb-3">
                      <node.icon className="w-7 h-7 text-[#7463EC]" strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-semibold text-neutral-800">{node.label}</span>
                    <span className="text-xs text-neutral-500 mt-0.5">{node.desc}</span>
                  </div>
                  {/* 连接线 */}
                  {index < ecosystemNodes.length - 1 && (
                    <div className="hidden md:flex items-center px-6">
                      <ChevronRight className="w-5 h-5 text-neutral-300" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* 3. 产品分组展示 */}
        <section className="mb-16">
          {productGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-12 last:mb-0">
              {/* 分组标题 */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-5 bg-gradient-to-b from-violet-500 to-violet-400 rounded-full"></div>
                <h3 className="text-lg font-semibold text-neutral-800">{group.title}</h3>
              </div>

              {/* 产品卡片网格 */}
              <div className={`grid gap-6 ${group.products.length === 1 ? 'grid-cols-1 md:grid-cols-2 md:max-w-2xl' : 'grid-cols-1 md:grid-cols-2'}`}>
                {group.products.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-start gap-5">
                      {/* 统一图标样式 */}
                      <div className="w-16 h-16 rounded-2xl bg-violet-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <product.icon className="w-8 h-8 text-[#7463EC]" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-neutral-800 mb-2">{product.name}</h4>
                        <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-2">{product.description}</p>
                        <Link
                          to={product.link}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#7463EC] hover:text-violet-700 transition-colors group/link"
                        >
                          进入产品
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* 4. 使用流程模块 */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-neutral-800 mb-2">如何使用鸿鹄生态</h2>
            <p className="text-neutral-500">四步开启你的AI创新之旅</p>
          </div>

          <div className="relative">
            {/* 桌面端连接线 */}
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-violet-200 via-violet-300 to-violet-200"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {usageSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative z-10">
                    {/* 步骤编号 */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold mb-4 mx-auto shadow-lg shadow-violet-500/20">
                      {step.step}
                    </div>
                    {/* 图标 */}
                    <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center mb-3 mx-auto">
                      <step.icon className="w-5 h-5 text-[#7463EC]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-base font-semibold text-neutral-800 mb-2 text-center">{step.title}</h3>
                    <p className="text-sm text-neutral-500 text-center leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. 温馨提示 */}
        <div className="bg-neutral-50 rounded-2xl p-8 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
              <Award className="w-4 h-4 text-[#7463EC]" strokeWidth={1.5} />
            </div>
            <span className="font-medium text-neutral-700">温馨提示</span>
          </div>
          <p className="text-neutral-600 text-center text-sm">
            以上产品和服务均面向大赛参赛者开放，部分产品需报名成功后登录使用。如有疑问，请联系大赛工作组。
          </p>
        </div>

        {/* 6. CTA */}
        <div className="bg-gradient-to-r from-[#7463EC] via-[#5b4cdb] to-[#4338ca] rounded-2xl p-10 text-center shadow-lg shadow-violet-500/20">
          <h2 className="text-2xl font-bold text-white mb-4">开启AI创新之旅</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            立即报名参赛，解锁全部生态产品，在竞赛中快速成长
          </p>
          <Link
            to="/register-competition"
            className="inline-flex items-center gap-2 bg-white text-[#7463EC] font-semibold px-8 py-3.5 rounded-xl hover:bg-neutral-50 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            立即报名
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EcoProducts;
