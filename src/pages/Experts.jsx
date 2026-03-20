import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const mockExperts = [
  {
    id: 1,
    name: '张某某',
    title: '数字金融赛道首席导师',
    organization: '某银行AI负责人',
    field: '数字金融',
    intro: '深耕金融科技领域15年，主导多个国家级金融AI项目落地',
    tags: ['企业导师', '评审专家'],
    avatar: null
  },
  {
    id: 2,
    name: '李某某',
    title: '数字健康专家',
    organization: '三甲医院信息化顾问',
    field: '数字健康',
    intro: '专注医疗AI应用，推动智慧医院建设与健康管理智能化',
    tags: ['企业导师', '评审专家'],
    avatar: null
  },
  {
    id: 3,
    name: '王某某',
    title: '鸿鹄学堂金牌讲师',
    organization: 'NLP方向资深专家',
    field: '自然语言处理',
    intro: '累计培养AI人才5000+，擅长将复杂技术转化为易懂知识',
    tags: ['金牌讲师'],
    avatar: null
  },
  {
    id: 4,
    name: '赵某某',
    title: '智慧教育产品总监',
    organization: '某在线教育平台',
    field: '智慧教育',
    intro: '打造多款AI教育产品，服务用户超过1000万',
    tags: ['企业导师'],
    avatar: null
  },
  {
    id: 5,
    name: '钱某某',
    title: '智能制造首席科学家',
    organization: '某制造企业研究院',
    field: '智能制造',
    intro: '推动AI在工业生产中的应用，实现降本增效30%+',
    tags: ['企业导师', '评审专家'],
    avatar: null
  },
  {
    id: 6,
    name: '孙某某',
    title: '计算机视觉负责人',
    organization: '某科技公司',
    field: '计算机视觉',
    intro: '主导多个视觉AI项目，在CVPR等顶会发表论文20+篇',
    tags: ['金牌讲师', '评审专家'],
    avatar: null
  },
  {
    id: 7,
    name: '周某某',
    title: '推荐系统架构师',
    organization: '某互联网大厂',
    field: '智能推荐',
    intro: '构建日活千万级的推荐系统，擅长大规模机器学习',
    tags: ['企业导师'],
    avatar: null
  },
  {
    id: 8,
    name: '吴某某',
    title: 'AI伦理研究员',
    organization: '某研究院',
    field: 'AI伦理',
    intro: '关注AI技术伦理与社会影响，推动AI可持续发展',
    tags: ['评审专家'],
    avatar: null
  },
];

const fields = ['全部', '数字金融', '数字健康', '智慧教育', '智能制造', '自然语言处理', '计算机视觉', '智能推荐', 'AI伦理'];

const Experts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState('全部');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredExperts = mockExperts.filter(expert => {
    const matchesSearch = expert.name.includes(searchTerm) || 
                         expert.intro.includes(searchTerm) ||
                         expert.title.includes(searchTerm);
    const matchesField = selectedField === '全部' || expert.field === selectedField;
    return matchesSearch && matchesField;
  });

  const totalPages = Math.ceil(filteredExperts.length / itemsPerPage);
  const paginatedExperts = filteredExperts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-800 mb-4">专家查询</h1>
          <p className="text-neutral-600 text-lg">查询大赛专家/导师库，了解各领域顶尖人才</p>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="搜索姓名、简介..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {fields.map(field => (
                <button
                  key={field}
                  onClick={() => {
                    setSelectedField(field);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
                    selectedField === field
                      ? 'bg-primary text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {field}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedExperts.map(expert => (
            <div key={expert.id} className="glass-card rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-neutral-800 truncate">{expert.name}</h3>
                  <p className="text-sm text-primary truncate">{expert.title}</p>
                  <p className="text-xs text-neutral-500 truncate">{expert.organization}</p>
                </div>
              </div>
              
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                  {expert.field}
                </span>
              </div>
              
              <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{expert.intro}</p>
              
              <div className="flex flex-wrap gap-2">
                {expert.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tag === '评审专家' 
                        ? 'bg-purple-50 text-purple-600' 
                        : tag === '金牌讲师'
                        ? 'bg-amber-50 text-amber-600'
                        : 'bg-green-50 text-green-600'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredExperts.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-neutral-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-neutral-500">未找到相关专家</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-neutral-100 text-neutral-600 hover:bg-primary/10 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              上一页
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-all ${
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-neutral-100 text-neutral-600 hover:bg-primary/10 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              下一页
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Experts;
