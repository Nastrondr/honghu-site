import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  CARD_STYLES,
  STATUS_COLORS,
  BUTTON_STYLES,
  SPACING,
  TYPOGRAPHY,
  TABLE_STYLES,
  FORM_STYLES,
  DRAWER_STYLES
} from '../../styles/admin-theme';

// TODO: 接入新闻列表接口
// TODO: 接入创建新闻接口
// TODO: 接入编辑新闻接口
// TODO: 接入发布/下线接口
// TODO: 接入删除新闻接口

// ==================== 状态标签组件 ====================
const StatusTag = ({ status }) => {
  const statusMap = {
    '草稿': STATUS_COLORS.draft,
    '已发布': STATUS_COLORS.success,
    '已下线': STATUS_COLORS.error
  };
  const colors = statusMap[status] || STATUS_COLORS.draft;
  return (
    <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${colors.bg} ${colors.text}`}>
      {status}
    </span>
  );
};

// ==================== 分类标签组件 ====================
const CategoryTag = ({ category }) => {
  const categoryColors = {
    '新闻动态': 'bg-blue-100 text-blue-700',
    '公告通知': 'bg-amber-100 text-amber-700',
    '媒体报道': 'bg-purple-100 text-purple-700'
  };
  return (
    <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${categoryColors[category] || 'bg-gray-100 text-gray-600'}`}>
      {category}
    </span>
  );
};

// ==================== 操作下拉菜单 ====================
const ActionDropdown = ({ news, onPublish, onOffline, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={BUTTON_STYLES.dropdown}
      >
        更多
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
          {news.status === '草稿' && (
            <button
              onClick={() => { onPublish(news.id); setIsOpen(false); }}
              className="w-full px-4 py-2 text-sm text-left text-green-600 hover:bg-green-50 transition-colors"
            >
              发布
            </button>
          )}
          {news.status === '已下线' && (
            <button
              onClick={() => { onPublish(news.id); setIsOpen(false); }}
              className="w-full px-4 py-2 text-sm text-left text-green-600 hover:bg-green-50 transition-colors"
            >
              重新发布
            </button>
          )}
          {news.status === '已发布' && (
            <button
              onClick={() => { onOffline(news.id); setIsOpen(false); }}
              className="w-full px-4 py-2 text-sm text-left text-orange-600 hover:bg-orange-50 transition-colors"
            >
              下线
            </button>
          )}
          <button
            onClick={() => { onDelete(news.id); setIsOpen(false); }}
            className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 transition-colors"
          >
            删除
          </button>
        </div>
      )}
    </div>
  );
};

// ==================== 新建/编辑新闻抽屉 ====================
const NewsFormDrawer = ({ isOpen, onClose, onSave, initialData = null }) => {
  const isEdit = !!initialData;
  const [formData, setFormData] = useState({
    title: '',
    category: '新闻动态',
    author: '',
    publishTime: '',
    summary: '',
    content: '',
    coverImage: null,
    status: '草稿'
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          title: '',
          category: '新闻动态',
          author: '',
          publishTime: '',
          summary: '',
          content: '',
          coverImage: null,
          status: '草稿'
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (publish = false) => {
    const data = { ...formData };
    if (publish) {
      data.status = '已发布';
    }
    onSave(data, isEdit);
    onClose();
  };

  return (
    <>
      <div className={DRAWER_STYLES.overlay} onClick={onClose} />
      <div className={DRAWER_STYLES.container}>
        <div className={DRAWER_STYLES.header}>
          <h3 className={TYPOGRAPHY.sectionTitle}>{isEdit ? '编辑新闻' : '新建新闻'}</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className={DRAWER_STYLES.content}>
          {/* 基础信息 */}
          <div className={DRAWER_STYLES.section}>
            <h4 className={DRAWER_STYLES.sectionTitle}>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              基础信息
            </h4>
            <div className="space-y-4">
              <div>
                <label className={FORM_STYLES.label}>新闻标题</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="请输入新闻标题"
                  className={FORM_STYLES.input}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={FORM_STYLES.label}>新闻分类</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={FORM_STYLES.input}
                  >
                    <option value="新闻动态">新闻动态</option>
                    <option value="公告通知">公告通知</option>
                    <option value="媒体报道">媒体报道</option>
                  </select>
                </div>
                <div>
                  <label className={FORM_STYLES.label}>作者</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="请输入作者"
                    className={FORM_STYLES.input}
                  />
                </div>
              </div>
              <div>
                <label className={FORM_STYLES.label}>发布时间</label>
                <input
                  type="datetime-local"
                  value={formData.publishTime}
                  onChange={(e) => setFormData({ ...formData, publishTime: e.target.value })}
                  className={FORM_STYLES.input}
                />
              </div>
            </div>
          </div>

          {/* 内容信息 */}
          <div className={DRAWER_STYLES.section}>
            <h4 className={DRAWER_STYLES.sectionTitle}>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              内容信息
            </h4>
            <div className="space-y-4">
              <div>
                <label className={FORM_STYLES.label}>摘要</label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="请输入新闻摘要..."
                  rows={3}
                  className={`${FORM_STYLES.input} resize-none`}
                />
              </div>
              <div>
                <label className={FORM_STYLES.label}>正文内容</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="请输入新闻正文内容..."
                  rows={10}
                  className={`${FORM_STYLES.input} resize-none`}
                />
              </div>
            </div>
          </div>

          {/* 封面图 */}
          <div className={DRAWER_STYLES.section}>
            <h4 className={DRAWER_STYLES.sectionTitle}>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              封面图
            </h4>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">点击上传封面图</p>
              <p className="text-xs text-gray-400 mt-1">支持 JPG、PNG 格式，建议尺寸 800x450</p>
            </div>
          </div>

          {/* 状态 */}
          <div className={DRAWER_STYLES.section}>
            <h4 className={DRAWER_STYLES.sectionTitle}>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              发布状态
            </h4>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={formData.status === '草稿'}
                  onChange={() => setFormData({ ...formData, status: '草稿' })}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-sm text-gray-700">保存为草稿</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={formData.status === '已发布'}
                  onChange={() => setFormData({ ...formData, status: '已发布' })}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-sm text-gray-700">立即发布</span>
              </label>
            </div>
          </div>
        </div>

        <div className={DRAWER_STYLES.footer}>
          <div className="flex items-center justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              取消
            </button>
            <button
              onClick={() => handleSubmit(false)}
              className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
            >
              保存草稿
            </button>
            <button
              onClick={() => handleSubmit(true)}
              className="px-4 py-2 text-sm text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
            >
              {isEdit ? '保存并发布' : '发布新闻'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// ==================== 查看新闻抽屉 ====================
const NewsDetailDrawer = ({ news, isOpen, onClose }) => {
  if (!isOpen || !news) return null;

  return (
    <>
      <div className={DRAWER_STYLES.overlay} onClick={onClose} />
      <div className={DRAWER_STYLES.container}>
        <div className={DRAWER_STYLES.header}>
          <h3 className={TYPOGRAPHY.sectionTitle}>新闻详情</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className={DRAWER_STYLES.content}>
          {/* 基础信息 */}
          <div className={DRAWER_STYLES.section}>
            <h4 className={DRAWER_STYLES.sectionTitle}>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              基础信息
            </h4>
            <div className={DRAWER_STYLES.infoBox}>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">新闻标题</span>
                <span className="text-sm font-medium text-gray-800">{news.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">分类</span>
                <CategoryTag category={news.category} />
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">发布时间</span>
                <span className="text-sm text-gray-800">{news.publishTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">作者</span>
                <span className="text-sm text-gray-800">{news.author}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">状态</span>
                <StatusTag status={news.status} />
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">浏览量</span>
                <span className="text-sm text-gray-800">{news.views}</span>
              </div>
            </div>
          </div>

          {/* 摘要 */}
          <div className={DRAWER_STYLES.section}>
            <h4 className={DRAWER_STYLES.sectionTitle}>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              摘要
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 leading-relaxed">{news.summary || '暂无摘要'}</p>
            </div>
          </div>

          {/* 正文内容 */}
          <div className={DRAWER_STYLES.section}>
            <h4 className={DRAWER_STYLES.sectionTitle}>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              正文内容
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{news.content || '暂无内容'}</p>
            </div>
          </div>

          {/* 封面图 */}
          <div className={DRAWER_STYLES.section}>
            <h4 className={DRAWER_STYLES.sectionTitle}>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              封面图
            </h4>
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              {news.coverImage ? (
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">封面图预览</span>
                </div>
              ) : (
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-gray-400">暂无封面图</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={DRAWER_STYLES.footer}>
          <button onClick={onClose} className="w-full px-4 py-2 text-sm text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors">
            关闭
          </button>
        </div>
      </div>
    </>
  );
};

// ==================== 主组件 ====================
const AdminNews = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  // Mock 数据
  const [newsList, setNewsList] = useState([
    {
      id: 1,
      title: '2024年梧桐·鸿鹄人工智能应用创新大赛正式启动',
      category: '公告通知',
      publishTime: '2024-11-15 10:00',
      author: '赛事组委会',
      status: '已发布',
      views: 1256,
      summary: '2024年梧桐·鸿鹄人工智能应用创新大赛正式启动，面向全国高校学生开放报名。',
      content: '2024年梧桐·鸿鹄人工智能应用创新大赛正式启动，面向全国高校学生开放报名。本届大赛旨在推动人工智能技术的创新应用，培养AI领域创新人才。',
      coverImage: null
    },
    {
      id: 2,
      title: '赛事报名常见问题解答',
      category: '新闻动态',
      publishTime: '2024-11-18 14:30',
      author: '赛事组委会',
      status: '已发布',
      views: 892,
      summary: '针对近期报名过程中遇到的常见问题，我们整理了详细解答。',
      content: '针对近期报名过程中遇到的常见问题，我们整理了详细解答，帮助参赛团队顺利完成报名。',
      coverImage: null
    },
    {
      id: 3,
      title: '人工智能产业发展趋势报告发布',
      category: '媒体报道',
      publishTime: '2024-11-20 09:00',
      author: '技术编辑部',
      status: '已发布',
      views: 2341,
      summary: '最新人工智能产业发展趋势报告正式发布，涵盖多个细分领域。',
      content: '最新人工智能产业发展趋势报告正式发布，涵盖计算机视觉、自然语言处理、机器学习等多个细分领域。',
      coverImage: null
    },
    {
      id: 4,
      title: '决赛评审规则说明',
      category: '公告通知',
      publishTime: '',
      author: '赛事组委会',
      status: '草稿',
      views: 0,
      summary: '决赛阶段评审规则详细说明。',
      content: '决赛阶段将采用现场答辩+作品展示的形式进行评审。',
      coverImage: null
    },
    {
      id: 5,
      title: '往届优秀作品回顾',
      category: '新闻动态',
      publishTime: '2024-10-01 08:00',
      author: '内容运营',
      status: '已下线',
      views: 567,
      summary: '回顾往届大赛中的优秀作品和创新亮点。',
      content: '回顾往届大赛中的优秀作品和创新亮点，展示AI技术的无限可能。',
      coverImage: null
    }
  ]);

  // 筛选逻辑
  const filteredNews = useMemo(() => {
    return newsList.filter(news => {
      const searchLower = searchQuery.toLowerCase();
      const matchSearch = news.title.toLowerCase().includes(searchLower);
      const matchStatus = statusFilter === 'all' || news.status === statusFilter;
      const matchCategory = categoryFilter === 'all' || news.category === categoryFilter;
      return matchSearch && matchStatus && matchCategory;
    });
  }, [newsList, searchQuery, statusFilter, categoryFilter]);

  // 查看新闻
  const handleView = (news) => {
    setSelectedNews(news);
    setIsDetailOpen(true);
  };

  // 编辑新闻
  const handleEdit = (news) => {
    setSelectedNews(news);
    setIsFormOpen(true);
  };

  // 新建新闻
  const handleCreate = () => {
    setSelectedNews(null);
    setIsFormOpen(true);
  };

  // 保存新闻（新建/编辑）
  const handleSave = (formData, isEdit) => {
    if (isEdit && selectedNews) {
      // 编辑
      setNewsList(prev => prev.map(n => 
        n.id === selectedNews.id ? { ...formData, id: n.id, views: n.views } : n
      ));
    } else {
      // 新建
      const newNews = {
        ...formData,
        id: Date.now(),
        views: 0,
        publishTime: formData.status === '已发布' ? new Date().toLocaleString('zh-CN', { 
          year: 'numeric', month: '2-digit', day: '2-digit', 
          hour: '2-digit', minute: '2-digit' 
        }).replace(/\//g, '-') : ''
      };
      setNewsList(prev => [newNews, ...prev]);
    }
  };

  // 发布新闻
  const handlePublish = (id) => {
    setNewsList(prev => prev.map(n => 
      n.id === id ? { 
        ...n, 
        status: '已发布',
        publishTime: new Date().toLocaleString('zh-CN', { 
          year: 'numeric', month: '2-digit', day: '2-digit', 
          hour: '2-digit', minute: '2-digit' 
        }).replace(/\//g, '-')
      } : n
    ));
  };

  // 下线新闻
  const handleOffline = (id) => {
    setNewsList(prev => prev.map(n => 
      n.id === id ? { ...n, status: '已下线' } : n
    ));
  };

  // 删除新闻
  const handleDelete = (id) => {
    if (confirm('确定要删除这条新闻吗？')) {
      setNewsList(prev => prev.filter(n => n.id !== id));
    }
  };

  return (
    <div className={SPACING.section}>
      {/* 页面标题区 */}
      <div>
        <h2 className={TYPOGRAPHY.pageTitle}>新闻管理</h2>
        <p className={TYPOGRAPHY.pageSubtitle}>发布、编辑和管理赛事新闻公告</p>
      </div>

      {/* 顶部操作区 */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          {/* 搜索框 */}
          <div>
            <label className={TYPOGRAPHY.label}>搜索新闻</label>
            <div className="relative mt-1.5">
              <input
                type="text"
                placeholder="请输入新闻标题..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-0 w-full sm:w-64 bg-white"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* 状态筛选 */}
          <div>
            <label className={TYPOGRAPHY.label}>状态筛选</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-0 bg-white min-w-[120px] mt-1.5"
            >
              <option value="all">全部状态</option>
              <option value="草稿">草稿</option>
              <option value="已发布">已发布</option>
              <option value="已下线">已下线</option>
            </select>
          </div>

          {/* 分类筛选 */}
          <div>
            <label className={TYPOGRAPHY.label}>分类筛选</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-0 bg-white min-w-[120px] mt-1.5"
            >
              <option value="all">全部分类</option>
              <option value="新闻动态">新闻动态</option>
              <option value="公告通知">公告通知</option>
              <option value="媒体报道">媒体报道</option>
            </select>
          </div>
        </div>

        {/* 新建新闻按钮 */}
        <button
          onClick={handleCreate}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          新建新闻
        </button>
      </div>

      {/* 新闻列表区 */}
      <div className={TABLE_STYLES.container}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={TABLE_STYLES.header}>
              <tr>
                <th className={TABLE_STYLES.headerCell}>新闻标题</th>
                <th className={TABLE_STYLES.headerCell}>分类</th>
                <th className={TABLE_STYLES.headerCell}>发布时间</th>
                <th className={TABLE_STYLES.headerCell}>作者</th>
                <th className={TABLE_STYLES.headerCell}>状态</th>
                <th className={TABLE_STYLES.headerCell}>浏览量</th>
                <th className={TABLE_STYLES.headerCell}>操作</th>
              </tr>
            </thead>
            <tbody className={TABLE_STYLES.divider}>
              {filteredNews.map((news) => (
                <tr key={news.id} className={TABLE_STYLES.row}>
                  <td className={TABLE_STYLES.cell}>
                    <span className="text-sm font-semibold text-gray-800 line-clamp-1" title={news.title}>
                      {news.title}
                    </span>
                  </td>
                  <td className={TABLE_STYLES.cell}>
                    <CategoryTag category={news.category} />
                  </td>
                  <td className={TABLE_STYLES.cell}>
                    <span className="text-sm text-gray-600">{news.publishTime || '-'}</span>
                  </td>
                  <td className={TABLE_STYLES.cell}>
                    <span className="text-sm text-gray-600">{news.author}</span>
                  </td>
                  <td className={TABLE_STYLES.cell}>
                    <StatusTag status={news.status} />
                  </td>
                  <td className={TABLE_STYLES.cell}>
                    <span className="text-sm text-gray-600">{news.views.toLocaleString()}</span>
                  </td>
                  <td className={TABLE_STYLES.cell}>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleView(news)}
                        className={BUTTON_STYLES.secondaryBg}
                      >
                        查看
                      </button>
                      <button
                        onClick={() => handleEdit(news)}
                        className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        编辑
                      </button>
                      <ActionDropdown
                        news={news}
                        onPublish={handlePublish}
                        onOffline={handleOffline}
                        onDelete={handleDelete}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredNews.length === 0 && (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <p className="text-gray-500">暂无符合条件的新闻</p>
          </div>
        )}
      </div>

      {/* 抽屉组件 */}
      <NewsFormDrawer
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
        initialData={selectedNews}
      />

      <NewsDetailDrawer
        news={selectedNews}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  );
};

export default AdminNews;
