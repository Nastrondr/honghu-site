import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import StatusTag from '../components/common/StatusTag';
import { request } from '../lib/api';

const STATUS_MAP = {
  'draft': { label: '即将开始', css: 'status-pending' },
  'active': { label: '进行中', css: 'status-active' },
  'ended': { label: '已结束', css: 'status-ended' },
};

const formatDate = (d) => {
  if (!d) return '-';
  try {
    const date = new Date(d);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  } catch { return d; }
};

const formatDateRange = (start, end) => {
  if (!start && !end) return '-';
  if (start && end) return `${formatDate(start)} - ${formatDate(end)}`;
  if (start) return `${formatDate(start)} 开始`;
  return `${formatDate(end)} 结束`;
};

const EmptySection = ({ title }) => (
  <div className="text-center py-6 text-sm text-gray-400">
    <p>{title}信息暂未录入</p>
  </div>
);

const ApiDebugPanel = ({ loading, error, competitionId, trackCount }) => {
  if (process.env.NODE_ENV !== 'development') return null;
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-blue-700">赛事详情 API 联调信息</h3>
        <span className="text-xs text-blue-500">开发环境可见</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">详情接口</p>
          <p className="font-mono text-xs text-gray-800 truncate">GET /v1/competitions/:id</p>
          <p className="text-xs text-gray-400 mt-1">ID: {competitionId || '-'}</p>
          <p className={`text-xs font-semibold mt-1 ${
            loading ? 'text-yellow-600' : error ? 'text-red-600' : 'text-green-600'
          }`}>
            {loading ? '⏳ 请求中' : error ? '❌ 请求失败' : '✅ 加载成功'}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">赛道接口</p>
          <p className="font-mono text-xs text-gray-800 truncate">GET /v1/competitions/:id</p>
          <p className="text-xs text-gray-400 mt-1">包含 tracks</p>
          <p className="text-xs font-semibold mt-1 text-green-600">
            ✅ {trackCount} 个赛道
          </p>
        </div>
      </div>
    </div>
  );
};

const CompetitionDetail = () => {
  const { id } = useParams();
  const [competition, setCompetition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isRewardsOpen, setIsRewardsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState('timeline');
  const [expandedCriteria, setExpandedCriteria] = useState(0);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError('');
    const fetchCompetition = async () => {
      try {
        const result = await request(`/v1/competitions/${id}`);
        if (result.ok && result.data?.code === 0 && result.data.data) {
          setCompetition(result.data.data);
        } else {
          setError('赛事不存在或加载失败');
        }
      } catch (err) {
        console.error('Fetch competition error:', err);
        setError('网络错误，无法加载赛事详情');
      } finally {
        setLoading(false);
      }
    };
    fetchCompetition();
  }, [id]);

  const statusConfig = competition?.status
    ? STATUS_MAP[competition.status] || { label: competition.status, css: 'status-pending' }
    : { label: '-', css: 'status-pending' };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-12 animate-fadeIn">
        <ApiDebugPanel loading={true} error="" competitionId={id} trackCount={0} />
        <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="h-4 bg-gray-100 rounded w-1/2 mb-6"></div>
          <div className="h-32 bg-gray-100 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (error || !competition) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-12 animate-fadeIn">
        <ApiDebugPanel loading={false} error={error} competitionId={id} trackCount={0} />
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-red-500 mb-4">{error || '赛事不存在'}</p>
          <Link to="/competition-center" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm font-medium">
            返回赛事列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-12 animate-fadeIn">
      <ApiDebugPanel
        loading={false}
        error=""
        competitionId={id}
        trackCount={competition.tracks?.length || 0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* 左侧主要内容 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-8">
            {/* 首屏赛事信息卡 */}
            <div className="mb-6 md:mb-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
                <h1 className="text-xl md:text-[26px] font-semibold text-neutral-800 leading-tight">
                  {competition.name || '-'}
                </h1>
                <StatusTag status={statusConfig.label} className="text-xs" />
              </div>

              {/* 紧凑信息行 */}
              <div className="flex flex-wrap gap-3 md:gap-6 mb-4">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs md:text-sm text-neutral-500">比赛时间</span>
                  <span className="text-xs md:text-sm text-neutral-800">
                    {formatDateRange(competition.competitionStart, competition.competitionEnd)}
                  </span>
                </div>
                {competition.registrationEnd && (
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs md:text-sm text-neutral-500">报名截止</span>
                    <span className="text-xs md:text-sm text-neutral-800">
                      {formatDate(competition.registrationEnd)}
                    </span>
                  </div>
                )}
              </div>

              {/* 赛事简介 */}
              <div className="text-sm text-neutral-600 line-clamp-3 md:line-clamp-none">
                {competition.description || '暂无赛事简介'}
              </div>
            </div>

            {/* 赛道信息 */}
            <div className="mb-6 md:mb-8">
              <h2 className="text-lg md:text-xl font-semibold text-neutral-800 mb-3 md:mb-4">赛道设置</h2>
              {competition.tracks && competition.tracks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {competition.tracks.map((track, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-neutral-800 mb-1">{track.name || '-'}</h3>
                      <p className="text-xs text-neutral-500">{track.description || '暂无赛道描述'}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptySection title="赛道" />
              )}
            </div>

            {/* 赛程安排 - 纵向timeline */}
            <div className="mb-6 md:mb-8">
              <h2 className="text-lg md:text-xl font-semibold text-neutral-800 mb-3 md:mb-4">赛程安排</h2>
              <div className="md:hidden relative pl-4">
                <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-neutral-200"></div>
                <div className="space-y-3">
                  {[
                    { phase: '报名阶段', time: formatDateRange(competition.registrationStart, competition.registrationEnd), status: competition.status === 'draft' ? 'current' : competition.status === 'active' ? 'completed' : 'completed' },
                    { phase: '初赛评审', time: '评审阶段', status: competition.status === 'active' ? 'current' : competition.status === 'ended' ? 'completed' : 'pending' },
                    { phase: '决赛展示', time: '决赛阶段', status: competition.status === 'ended' ? 'completed' : 'pending' },
                    { phase: '成果支持', time: '后续支持', status: competition.status === 'ended' ? 'completed' : 'pending' }
                  ].map((item, index) => (
                    <div key={index} className="relative flex items-start gap-3">
                      <div className={`relative z-10 w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${
                        item.status === 'current' ? 'bg-primary' : item.status === 'completed' ? 'bg-primary' : 'bg-neutral-300'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-medium ${item.status === 'current' ? 'text-primary' : item.status === 'completed' ? 'text-neutral-800' : 'text-neutral-500'}`}>
                          {item.phase}
                        </div>
                        <div className="text-xs text-neutral-400">{item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden md:grid grid-cols-4 gap-4">
                {[
                  { phase: '报名阶段', time: formatDateRange(competition.registrationStart, competition.registrationEnd), status: competition.status === 'draft' ? 'current' : competition.status === 'active' || competition.status === 'ended' ? 'completed' : 'pending' },
                  { phase: '初赛评审', time: '评审阶段', status: competition.status === 'active' ? 'current' : competition.status === 'ended' ? 'completed' : 'pending' },
                  { phase: '决赛展示', time: '决赛阶段', status: competition.status === 'ended' ? 'completed' : 'pending' },
                  { phase: '成果支持', time: '后续支持', status: competition.status === 'ended' ? 'completed' : 'pending' }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-base font-semibold mb-1 ${item.status === 'current' ? 'text-primary' : item.status === 'completed' ? 'text-neutral-800' : 'text-neutral-500'}`}>
                      {item.phase}
                    </div>
                    <div className="text-sm text-neutral-500 mb-3">{item.time}</div>
                    <div className="h-1.5 rounded-full bg-neutral-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${item.status === 'completed' ? 'bg-primary w-full' : item.status === 'current' ? 'bg-primary w-2/3' : 'bg-neutral-200 w-0'}`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 作品提交要求 */}
            <div className="mb-6 md:mb-8">
              <h2 className="text-lg md:text-xl font-semibold text-neutral-800 mb-3 md:mb-4">作品提交要求</h2>
              <EmptySection title="作品提交要求" />
            </div>

            {/* 评审标准 */}
            <div className="mb-6 md:mb-8">
              <h2 className="text-lg md:text-xl font-semibold text-neutral-800 mb-3 md:mb-4">评审标准</h2>
              <EmptySection title="评审标准" />
            </div>
          </div>
        </div>

        {/* 右侧边栏 */}
        <div className="space-y-6">
          {/* 立即报名卡片 */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">参赛报名</h3>

            {competition.status === 'ended' ? (
              <div className="text-center py-4">
                <p className="text-sm text-neutral-500 mb-3">该赛事报名已结束</p>
                <Link
                  to={`/competitions/${competition.id}/results`}
                  className="block w-full py-3 text-center bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
                >
                  查看比赛结果
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>报名时间</span>
                    <span className="ml-auto text-neutral-800">
                      {formatDateRange(competition.registrationStart, competition.registrationEnd)}
                    </span>
                  </div>
                  {competition.tracks?.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span>赛道数量</span>
                      <span className="ml-auto text-neutral-800">{competition.tracks.length} 个</span>
                    </div>
                  )}
                </div>
                <Link
                  to={`/register-competition?competitionId=${competition.id}`}
                  className="block w-full py-3 text-center bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  立即报名
                </Link>
                <Link
                  to="/register-competition"
                  className="block w-full py-3 text-center mt-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors text-sm font-medium"
                >
                  了解参赛形式
                </Link>
              </>
            )}

            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-neutral-700 mb-2">赛事价值</h4>
              <EmptySection title="赛事价值" />
            </div>
          </div>

          {/* 奖项设置 */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsRewardsOpen(!isRewardsOpen)}
            >
              <h3 className="text-lg font-semibold text-neutral-800">奖项设置</h3>
              <svg
                className={`w-5 h-5 text-neutral-400 transition-transform ${isRewardsOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {isRewardsOpen && (
              <div className="mt-4 space-y-3">
                <EmptySection title="奖项设置" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionDetail;
