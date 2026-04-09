import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { request } from '../lib/api';

const CompetitionResults = () => {
  const { id: competitionId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'awards');

  const [competition, setCompetition] = useState(null);
  const [awards, setAwards] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [apiStatus, setApiStatus] = useState({ awards: '-', results: '-' });

  const fetchCompetition = async () => {
    if (!competitionId) return;
    try {
      const result = await request(`/v1/competitions/${competitionId}`);
      if (result.ok && result.data.code === 0) {
        setCompetition(result.data.data);
      }
    } catch (err) {
      console.error('Fetch competition error:', err);
    }
  };

  const fetchAwards = async () => {
    if (!competitionId) return;
    try {
      const result = await request(`/v1/competitions/${competitionId}/awards`);
      setApiStatus(prev => ({ ...prev, awards: result.status }));
      if (result.ok && result.data.code === 0) {
        setAwards(result.data.data || []);
      }
    } catch (err) {
      setApiStatus(prev => ({ ...prev, awards: 'error' }));
      console.error('Fetch awards error:', err);
    }
  };

  const fetchResults = async () => {
    if (!competitionId) return;
    try {
      const result = await request(`/v1/competitions/${competitionId}/results`);
      setApiStatus(prev => ({ ...prev, results: result.status }));
      if (result.ok && result.data.code === 0) {
        setResults(result.data.data || []);
      }
    } catch (err) {
      setApiStatus(prev => ({ ...prev, results: 'error' }));
      console.error('Fetch results error:', err);
    }
  };

  useEffect(() => {
    if (competitionId) {
      setLoading(true);
      setError('');
      Promise.all([fetchCompetition(), fetchAwards(), fetchResults()])
        .then(() => setLoading(false))
        .catch(() => {
          setError('获取数据失败');
          setLoading(false);
        });
    }
  }, [competitionId]);

  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab]);

  const getAwardLevelBadge = (level) => {
    const colors = {
      'gold': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'silver': 'bg-gray-100 text-gray-800 border-gray-200',
      'bronze': 'bg-orange-100 text-orange-800 border-orange-200',
      'first': 'bg-red-100 text-red-800 border-red-200',
      'second': 'bg-blue-100 text-blue-800 border-blue-200',
      'third': 'bg-green-100 text-green-800 border-green-200',
    };
    return colors[level] || 'bg-purple-100 text-purple-800 border-purple-200';
  };

  const getAwardLevelText = (level) => {
    const texts = {
      'gold': '金奖',
      'silver': '银奖',
      'bronze': '铜奖',
      'first': '一等奖',
      'second': '二等奖',
      'third': '三等奖',
    };
    return texts[level] || level;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500">加载结果公示...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-primary text-white px-6 py-2 rounded-lg"
        >
          重试
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-blue-700">API 联调信息</h3>
            <span className="text-xs text-blue-500">开发环境可见</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-400 mb-1">Awards 接口</p>
              <p className="font-mono text-gray-800">GET /v1/competitions/:id/awards</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-400 mb-1">Results 接口</p>
              <p className="font-mono text-gray-800">GET /v1/competitions/:id/results</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-400 mb-1">Awards HTTP</p>
              <p className={`font-semibold ${apiStatus.awards === '200' ? 'text-green-600' : 'text-red-600'}`}>{apiStatus.awards}</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-400 mb-1">Results HTTP</p>
              <p className={`font-semibold ${apiStatus.results === '200' ? 'text-green-600' : 'text-red-600'}`}>{apiStatus.results}</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-400 mb-1">数据量</p>
              <p className="text-gray-800">Awards: {awards.length}, Works: {results.length}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <Link to="/competition-center" className="text-primary hover:underline text-sm mb-4 inline-block">← 返回赛事中心</Link>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {competition?.name || '赛事结果公示'}
        </h1>
        <p className="text-gray-600">获奖名单及完整评审结果</p>
      </div>

      {/* Tab 切换 */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('awards')}
          className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'awards' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          获奖名单
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'results' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          完整结果公示
        </button>
      </div>

      {/* 获奖名单 Tab */}
      {activeTab === 'awards' && (
        <div className="space-y-6">
          {awards.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">暂无获奖信息</p>
            </div>
          ) : (
            awards.map((award) => (
              <div key={award.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getAwardLevelBadge(award.awardLevel)}`}>
                      {getAwardLevelText(award.awardLevel)}
                    </span>
                    <h3 className="font-semibold text-gray-800">{award.awardName}</h3>
                  </div>
                  {award.prizeAmount && (
                    <span className="text-primary font-medium">¥{award.prizeAmount}</span>
                  )}
                </div>
                <div className="divide-y divide-gray-100">
                  {award.works?.map((work) => (
                    <div key={work.id} className="px-6 py-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">{work.title}</p>
                        {work.rank && <span className="text-sm text-gray-500">第 {work.rank} 名</span>}
                      </div>
                      {work.totalScore && (
                        <span className="text-lg font-bold text-primary">{work.totalScore} 分</span>
                      )}
                    </div>
                  ))}
                  {(!award.works || award.works.length === 0) && (
                    <div className="px-6 py-4 text-gray-400 text-sm">暂无获奖作品</div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 完整结果公示 Tab */}
      {activeTab === 'results' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">暂无评审结果</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">排名</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">作品名称</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">团队/个人</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">奖项</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">总分</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {results.map((work, index) => (
                  <tr key={work.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                        index < 3 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {work.rank || index + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">{work.title}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {work.team?.name || work.user?.username || '-'}
                    </td>
                    <td className="px-6 py-4">
                      {work.award ? (
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getAwardLevelBadge(work.award.awardLevel)}`}>
                          {work.award.awardName}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-bold text-primary">
                      {work.totalScore || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default CompetitionResults;
