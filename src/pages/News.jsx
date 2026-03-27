import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { newsData } from '../data/newsData';

const News = () => {
  const [activeCategory, setActiveCategory] = useState('全部');

  const filteredNews = activeCategory === '全部' 
    ? newsData 
    : newsData.filter(item => item.category === activeCategory);

  // 取第一条作为头条新闻
  const featuredNews = filteredNews[0];
  // 剩余的作为列表
  const remainingNews = filteredNews.slice(1);
  // 前2条作为重要新闻（大卡片）
  const importantNews = remainingNews.slice(0, 2);
  // 其余作为普通新闻
  const normalNews = remainingNews.slice(2);

  return (
    <div className="min-h-screen bg-white animate-fadeIn">
      {/* 页面头部 */}
      <section className="pt-16 pb-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-3">新闻公告</h1>
            <p className="text-lg text-neutral-500">了解赛事最新动态与重要通知</p>
          </div>
        </div>
      </section>

      {/* 分类 Tabs */}
      <section className="pb-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-center">
            <div className="inline-flex bg-neutral-100 rounded-full p-1">
              {['全部', '公告通知', '赛事动态'].map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`relative px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                      isActive 
                        ? 'bg-white text-primary shadow-sm' 
                        : 'text-neutral-500 hover:text-neutral-700'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 头条新闻模块 */}
      {featuredNews && (
        <section className="pb-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="group bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-neutral-100 overflow-hidden hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* 左侧内容 */}
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {featuredNews.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-neutral-400">
                      <Calendar className="w-4 h-4" />
                      {featuredNews.date}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-neutral-800 mb-4 leading-tight">
                    {featuredNews.title}
                  </h2>
                  <p className="text-neutral-600 mb-6 line-clamp-2 leading-relaxed">
                    {featuredNews.summary}
                  </p>
                  <div>
                    <Link 
                      to={`/news/${featuredNews.slug}`}
                      className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                    >
                      查看详情
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                {/* 右侧视觉 */}
                <div className="relative bg-gradient-to-br from-primary/20 via-purple-500/10 to-primary/5 min-h-[240px] lg:min-h-full flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(116,99,236,0.15),transparent_50%)]"></div>
                  <div className="relative z-10 text-center p-8">
                    <div className="w-20 h-20 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-4xl font-bold text-primary">AI</span>
                    </div>
                    <p className="text-sm text-neutral-500 font-medium">梧桐·鸿鹄大赛</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 重要新闻 - 2个大卡片 */}
      {importantNews.length > 0 && (
        <section className="pb-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {importantNews.map((news) => (
                <div 
                  key={news.id} 
                  className="group bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-neutral-100 p-7 flex flex-col h-full hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {news.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-neutral-400">
                      <Calendar className="w-4 h-4" />
                      {news.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-800 mb-3 leading-tight">
                    {news.title}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-6 line-clamp-2 flex-1 leading-relaxed">
                    {news.summary}
                  </p>
                  <div className="flex justify-end">
                    <Link 
                      to={`/news/${news.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/link"
                    >
                      查看详情
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 普通新闻列表 */}
      {normalNews.length > 0 && (
        <section className="pb-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {normalNews.map((news) => (
                <div 
                  key={news.id} 
                  className="group bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-neutral-100 p-6 flex flex-col h-full hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {news.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {news.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-800 mb-2 leading-tight line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-5 line-clamp-2 flex-1 leading-relaxed">
                    {news.summary}
                  </p>
                  <div className="flex justify-end">
                    <Link 
                      to={`/news/${news.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/link"
                    >
                      查看详情
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 分隔区域 */}
      <div className="py-8 bg-neutral-50/50"></div>

      {/* CTA区 */}
      <section className="py-16 bg-neutral-50/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-gradient-to-r from-[#7463EC] via-[#5b4cdb] to-[#4338ca] rounded-2xl p-10 md:p-12 text-center shadow-lg shadow-primary/20 relative overflow-hidden">
            {/* 背景光效 */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                立即参与赛事，获取更多机会
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                关注大赛动态，把握每一个创新机会，开启你的AI应用创新之旅
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/competition-center"
                  className="group bg-white text-primary px-8 py-3.5 rounded-xl font-semibold hover:bg-neutral-50 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  查看赛事
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/register-competition"
                  className="px-8 py-3.5 rounded-xl font-semibold border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  立即报名
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
