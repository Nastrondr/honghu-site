import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { newsData } from '../data/newsData';
import SecondaryButton from '../components/common/SecondaryButton';

const NewsDetail = () => {
  const { slug } = useParams();
  
  // 根据 slug 查找新闻
  const news = newsData.find(item => item.slug === slug);
  
  if (!news) {
    return (
      <div className="container mx-auto px-4 py-12 animate-fadeIn">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h1 className="text-3xl font-bold text-neutral-800 mb-4">新闻不存在</h1>
          <p className="text-neutral-600 mb-8">抱歉，您访问的新闻不存在。</p>
          <Link to="/news">
            <SecondaryButton>
              返回新闻列表
            </SecondaryButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-4">{news.title}</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <span className={`px-4 py-1 rounded-full text-sm font-medium ${news.category === '公告通知' ? 'bg-[#7463EC]/10 text-[#7463EC]' : 'bg-[#F59E0B]/10 text-[#F59E0B]'}`}>
              {news.category}
            </span>
            <span className="text-neutral-500 text-sm">{news.date}</span>
            <span className="text-neutral-500 text-sm">来源：{news.source}</span>
          </div>
        </div>
        
        {news.cover && (
          <div className="mb-8">
            <img 
              src={news.cover} 
              alt={news.title} 
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}
        
        <div className="prose max-w-none mb-8">
          <div dangerouslySetInnerHTML={{ __html: news.content }} />
        </div>
        
        {news.images && news.images.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {news.images.slice(1).map((image, index) => (
              <img 
                key={index} 
                src={image} 
                alt={`${news.title} 图片 ${index + 1}`} 
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        )}
        
        {/* 相关新闻 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-6">相关新闻</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsData
              .filter(item => item.id !== news.id)
              .slice(0, 3)
              .map((relatedNews) => (
                <Link to={`/news/${relatedNews.slug}`} key={relatedNews.id}>
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-neutral-800 line-clamp-2">{relatedNews.title}</h3>
                      <span className={`px-3 py-0.5 rounded-full text-xs font-medium ${relatedNews.category === '公告通知' ? 'bg-[#7463EC]/10 text-[#7463EC]' : 'bg-[#F59E0B]/10 text-[#F59E0B]'}`}>
                        {relatedNews.category}
                      </span>
                    </div>
                    <span className="text-neutral-500 text-sm">{relatedNews.date}</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        
        {/* 底部导航 */}
        <div className="border-t border-neutral-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            {/* 上一篇 */}
            {newsData.indexOf(news) > 0 && (
              <Link to={`/news/${newsData[newsData.indexOf(news) - 1].slug}`} className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-neutral-700 hover:text-primary transition-colors">上一篇：{newsData[newsData.indexOf(news) - 1].title}</span>
              </Link>
            )}
            
            {/* 下一篇 */}
            {newsData.indexOf(news) < newsData.length - 1 && (
              <Link to={`/news/${newsData[newsData.indexOf(news) + 1].slug}`} className="flex items-center ml-auto">
                <span className="text-neutral-700 hover:text-primary transition-colors">下一篇：{newsData[newsData.indexOf(news) + 1].title}</span>
                <svg className="w-5 h-5 ml-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
          
          <div className="flex justify-center">
            <Link to="/news">
              <SecondaryButton>
                返回新闻列表
              </SecondaryButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;