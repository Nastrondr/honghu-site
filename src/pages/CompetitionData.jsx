import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CompetitionData = () => {
  const { user, isAuthenticated } = useAuth();
  const [dataStatus] = useState('开放中');
  
  const mockDataResources = [
    {
      id: 1,
      name: '工业缺陷检测数据集',
      type: '图像数据集',
      size: '2.5 GB',
      updateTime: '2024-10-15',
      description: '包含多种工业产品表面的缺陷图像，用于训练缺陷检测模型',
      downloadable: true
    },
    {
      id: 2,
      name: '智慧城市交通数据集',
      type: '时序数据',
      size: '1.8 GB',
      updateTime: '2024-10-20',
      description: '城市交通流量、车辆速度等时序数据，用于交通预测分析',
      downloadable: true
    },
    {
      id: 3,
      name: '医疗影像标注数据集',
      type: '医学影像',
      size: '5.2 GB',
      updateTime: '2024-11-01',
      description: '经过专业医生标注的CT和MRI影像数据，用于疾病辅助诊断',
      downloadable: false
    },
    {
      id: 4,
      name: '金融风控特征数据集',
      type: '结构化数据',
      size: '800 MB',
      updateTime: '2024-11-10',
      description: '金融交易特征数据，用于信用评估和风险预测模型训练',
      downloadable: true
    }
  ];

  const getStatusInfo = (status) => {
    switch (status) {
      case '开放中':
        return { color: 'bg-green-100 text-green-700', text: '开放中' };
      case '未开放':
        return { color: 'bg-yellow-100 text-yellow-700', text: '未开放' };
      case '已关闭':
        return { color: 'bg-gray-100 text-gray-700', text: '已关闭' };
      default:
        return { color: 'bg-gray-100 text-gray-700', text: status };
    }
  };

  const handleDownload = (item) => {
    if (!isAuthenticated) {
      alert('请先登录');
      return;
    }
    alert(`开始下载：${item.name}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12 animate-fadeIn">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-xl shadow-md p-12">
            <svg className="w-16 h-16 text-neutral-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">请先登录</h2>
            <p className="text-neutral-600 mb-8">登录后可查看和下载赛题数据</p>
            <div className="flex justify-center gap-4">
              <Link to="/login" className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                登录
              </Link>
              <Link to="/register" className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/5 transition-colors">
                注册
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">赛题数据</h1>
          <p className="text-neutral-600">查看和下载比赛相关数据资源</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-neutral-800 mb-2">2024年梧桐·鸿鹄人工智能应用创新大赛</h2>
              <p className="text-neutral-600">报名并组队成功后可下载完整赛题数据</p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusInfo(dataStatus).color}`}>
                数据状态：{getStatusInfo(dataStatus).text}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {mockDataResources.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-neutral-800 mb-2">{item.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                      {item.type}
                    </span>
                    <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs">
                      {item.size}
                    </span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs ${item.downloadable ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {item.downloadable ? '可下载' : '锁定'}
                </div>
              </div>
              
              <p className="text-neutral-600 text-sm mb-4">{item.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 text-xs">更新时间：{item.updateTime}</span>
                <div className="flex gap-2">
                  <button className="text-primary hover:underline text-sm">
                    查看说明
                  </button>
                  <button
                    onClick={() => handleDownload(item)}
                    disabled={!item.downloadable}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      item.downloadable
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    下载
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-neutral-800 mb-4">使用规范</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-3 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-neutral-600">数据仅限本参赛队伍使用，不得转让给其他队伍或第三方</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-3 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              <span className="text-neutral-600">严禁将数据外传、泄露或用于非参赛用途，违者将取消参赛资格</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-3 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-neutral-600">比赛结束后将关闭数据下载通道，请及时备份所需数据</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-3 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-neutral-600">提交作品需符合赛事规范，不得使用违规数据或作弊手段</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompetitionData;