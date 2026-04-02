import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Cpu, Code2, GraduationCap } from 'lucide-react';
import { ecosystemNodes, productGroups, usageSteps } from './ecoProductsData';

const EcoProductsMobile = () => {
  return (
    <div className="min-h-screen">
      {/* 1. 页面标题 */}
      <div className="py-8 px-4 text-center">
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">生态产品</h1>
        <p className="text-sm text-neutral-600">大赛配套的数字化产品与平台</p>
      </div>

      {/* 2. 生态总览 - 移动端简化 */}
      <section className="px-4 mb-8">
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">鸿鹄AI生态体系</h2>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="grid grid-cols-5 gap-2">
            {ecosystemNodes.map((node, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center mb-1">
                  <node.icon className="w-5 h-5 text-[#7463EC]" />
                </div>
                <span className="text-xs font-medium text-neutral-800">{node.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 产品分组 - 移动端简化 */}
      <section className="px-4 mb-8">
        {productGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-violet-500 rounded-full"></div>
              <h3 className="font-semibold text-neutral-800">{group.title}</h3>
            </div>
            <div className="space-y-3">
              {group.products.map((product) => (
                <Link
                  key={product.id}
                  to={product.link}
                  className="block bg-white rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0">
                      <product.icon className="w-6 h-6 text-[#7463EC]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-neutral-800 mb-0.5">{product.name}</h4>
                      <p className="text-xs text-neutral-500 line-clamp-1">{product.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 4. 使用流程 - 移动端简化 */}
      <section className="px-4 mb-8">
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">使用流程</h2>
        <div className="space-y-3">
          {usageSteps.map((step, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {step.step}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-neutral-800">{step.title}</h4>
                <p className="text-xs text-neutral-500">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA - 移动端简化 */}
      <section className="px-4 pb-8">
        <div className="bg-gradient-to-r from-[#7463EC] to-[#4338ca] rounded-xl p-6 text-center">
          <h2 className="text-lg font-bold text-white mb-2">开启AI创新之旅</h2>
          <p className="text-white/80 text-sm mb-4">
            立即报名参赛，解锁全部生态产品
          </p>
          <Link
            to="/register-competition"
            className="inline-block w-full bg-white text-[#7463EC] font-medium py-2.5 rounded-lg"
          >
            立即报名
          </Link>
        </div>
      </section>
    </div>
  );
};

export default EcoProductsMobile;
