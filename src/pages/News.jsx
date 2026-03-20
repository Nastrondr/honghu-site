import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../components/common/PrimaryButton';
import SecondaryButton from '../components/common/SecondaryButton';
import { newsData } from '../data/newsData';

const News = () => {
  const [activeCategory, setActiveCategory] = useState('全部');

  const filteredNews = activeCategory === '全部' 
    ? newsData 
    : newsData.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen animate-fadeIn">
      {/* 页面头部 */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-neutral-800 mb-4">新闻公告</h1>
            <p className="text-xl text-neutral-600">了解赛事最新动态与重要通知</p>
          </div>
        </div>
      </section>

      {/* 分类筛选 */}
      <section className="py-10 bg-slate-50/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-center gap-3">
            <button 
              onClick={() => setActiveCategory('全部')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === '全部' ? 'bg-neutral-700 text-white' : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'}`}
            >
              全部
            </button>
            <button 
              onClick={() => setActiveCategory('公告通知')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === '公告通知' ? 'bg-[#7463EC] text-white' : 'bg-white text-neutral-700 hover:bg-[#7463EC]/10 border border-neutral-200'}`}
            >
              公告通知
            </button>
            <button 
              onClick={() => setActiveCategory('赛事动态')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === '赛事动态' ? 'bg-[#F59E0B] text-white' : 'bg-white text-neutral-700 hover:bg-[#F59E0B]/10 border border-neutral-200'}`}
            >
              赛事动态
            </button>
          </div>
        </div>
      </section>

      {/* 新闻列表 */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredNews.map((news) => (
              <div key={news.id} className="bg-white rounded-2xl shadow-sm p-8 border border-neutral-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-neutral-800 mb-2">{news.title}</h3>
                  <span className={`px-4 py-1 rounded-full text-xs font-medium ${news.category === '公告通知' ? 'bg-[#7463EC]/10 text-[#7463EC]' : 'bg-[#F59E0B]/10 text-[#F59E0B]'}`}>
                    {news.category}
                  </span>
                </div>
                <p className="text-neutral-600 mb-6">{news.summary}</p>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 text-sm">{news.date}</span>
                  <Link to={`/news/${news.slug}`}>
                    <SecondaryButton className="text-sm px-4 py-2">
                      查看详情
                    </SecondaryButton>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 底部CTA */}
      <section className="py-20 bg-slate-50/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-gradient-to-r from-primary to-indigo-600 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">立即参与赛事，获取更多机会</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              关注大赛动态，把握每一个创新机会，开启你的AI应用创新之旅
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/competition-center">
                <SecondaryButton className="text-lg px-8 py-3 bg-white text-primary hover:bg-neutral-100">
                  查看赛事
                </SecondaryButton>
              </Link>
              <Link to="/competition-center">
                <PrimaryButton className="text-lg px-8 py-3 bg-white text-primary hover:bg-neutral-100">
                  立即报名
                </PrimaryButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;