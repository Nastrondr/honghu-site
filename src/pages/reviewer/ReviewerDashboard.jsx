import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';

// 当前评委ID（模拟登录用户）
const CURRENT_REVIEWER_ID = 'reviewer_001';

// 当前评审轮次
const CURRENT_ROUND = '初审';

// 评审截止时间
const DEADLINE = '2024-04-15 23:59';

// 评分权重配置
const SCORE_WEIGHTS = {
  innovation: 0.3,  // 创新性 30%
  technical: 0.3,   // 技术实现 30%
  value: 0.4        // 应用价值 40%
};

// 获取评审专家信息
const getReviewerInfo = () => {
  const info = localStorage.getItem('reviewer_info');
  return info ? JSON.parse(info) : { name: '评审专家' };
};

// 模拟作品数据（带多评委评分）
const mockWorks = [
  {
    id: 1,
    name: '智能医疗影像诊断系统',
    team: '医智先锋队',
    submitTime: '2024-03-15',
    round: '初审',
    assignedReviewers: ['reviewer_001', 'reviewer_002', 'reviewer_003'],
    scores: [
      {
        reviewerId: 'reviewer_002',
        reviewerName: '李教授',
        round: '初审',
        innovation: 8,
        technical: 9,
        value: 8,
        total: 8.2,
        comment: '技术实现较为成熟...',
        submittedAt: '2024-03-16',
        status: 'submitted'
      }
    ]
  },
  {
    id: 2,
    name: '基于深度学习的交通流量预测',
    team: '智慧交通实验室',
    submitTime: '2024-03-14',
    round: '初审',
    assignedReviewers: ['reviewer_001', 'reviewer_002'],
    scores: [
      {
        reviewerId: 'reviewer_001',
        reviewerName: '我',
        round: '初审',
        innovation: 7,
        technical: 8,
        value: 9,
        total: 8.1,
        comment: '应用场景明确...',
        submittedAt: '2024-03-15',
        status: 'locked'
      },
      {
        reviewerId: 'reviewer_002',
        reviewerName: '李教授',
        round: '初审',
        innovation: 8,
        technical: 8,
        value: 8,
        total: 8.0,
        comment: '算法选择合理...',
        submittedAt: '2024-03-16',
        status: 'submitted'
      }
    ]
  },
  {
    id: 3,
    name: 'AI辅助教育个性化推荐平台',
    team: '未来教育团队',
    submitTime: '2024-03-13',
    round: '初审',
    assignedReviewers: ['reviewer_001', 'reviewer_003'],
    scores: []
  },
  {
    id: 4,
    name: '智能客服机器人系统',
    team: 'NLP创新小组',
    submitTime: '2024-03-12',
    round: '复审',
    assignedReviewers: ['reviewer_001', 'reviewer_002', 'reviewer_003'],
    scores: [
      {
        reviewerId: 'reviewer_002',
        reviewerName: '李教授',
        round: '复审',
        innovation: 9,
        technical: 8,
        value: 9,
        total: 8.7,
        comment: 'NLP技术应用出色...',
        submittedAt: '2024-03-13',
        status: 'submitted'
      }
    ]
  }
];

const ReviewerDashboard = () => {
  const [works] = useState(mockWorks);
  const [reviewerInfo, setReviewerInfo] = useState({ name: '评审专家' });
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    setReviewerInfo(getReviewerInfo());
    
    // 计算剩余时间
    const calculateTimeLeft = () => {
      const deadline = new Date(DEADLINE);
      const now = new Date();
      const diff = deadline - now;
      
      if (diff <= 0) {
        setTimeLeft('已截止');
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      if (days > 0) {
        setTimeLeft(`${days}天 ${hours}小时`);
      } else {
        setTimeLeft(`${hours}小时`);
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // 每分钟更新
    
    return () => clearInterval(timer);
  }, []);

  // 只显示当前轮次且分配给当前评委的作品
  const assignedWorks = useMemo(() => {
    return works.filter(work => 
      work.assignedReviewers.includes(CURRENT_REVIEWER_ID) &&
      work.round === CURRENT_ROUND
    );
  }, [works]);

  // 检查当前评委在当前轮次是否已评分
  const hasScored = (work) => {
    return work.scores.some(s => 
      s.reviewerId === CURRENT_REVIEWER_ID && s.round === CURRENT_ROUND
    );
  };

  // 获取当前评委的评分记录
  const getMyScore = (work) => {
    return work.scores.find(s => 
      s.reviewerId === CURRENT_REVIEWER_ID && s.round === CURRENT_ROUND
    );
  };

  // 检查评分是否已锁定
  const isScoreLocked = (work) => {
    const myScore = getMyScore(work);
    return myScore?.status === 'locked';
  };

  // 计算当前轮次的平均分
  const getAverageScore = (work) => {
    const currentRoundScores = work.scores.filter(s => s.round === CURRENT_ROUND);
    if (currentRoundScores.length === 0) return null;
    const avg = currentRoundScores.reduce((sum, s) => sum + s.total, 0) / currentRoundScores.length;
    return avg.toFixed(1);
  };

  // 获取第一个待评审作品
  const firstPendingWork = useMemo(() => {
    return assignedWorks.find(w => !hasScored(w) && !isScoreLocked(w));
  }, [assignedWorks]);

  // 统计数据
  const stats = useMemo(() => {
    const pending = assignedWorks.filter(w => !hasScored(w)).length;
    const completed = assignedWorks.filter(w => hasScored(w)).length;
    const locked = assignedWorks.filter(w => {
      const score = getMyScore(w);
      return score?.status === 'locked';
    }).length;
    return {
      pending,
      completed,
      locked,
      total: assignedWorks.length,
      currentRound: CURRENT_ROUND
    };
  }, [assignedWorks]);

  // 状态标签渲染
  const renderStatusTag = (work) => {
    const myScore = getMyScore(work);
    if (!myScore) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-100">
          待评审
        </span>
      );
    }
    
    if (myScore.status === 'locked') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
          已锁定 {myScore.total}
        </span>
      );
    }
    
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
        已评分 {myScore.total}
      </span>
    );
  };

  // 渲染评分进度
  const renderScoreProgress = (work) => {
    const currentRoundScores = work.scores.filter(s => s.round === CURRENT_ROUND);
    const completedCount = currentRoundScores.length;
    const totalCount = work.assignedReviewers.length;
    const avgScore = getAverageScore(work);
    
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            {completedCount}/{totalCount} 已评
          </span>
          {avgScore && (
            <span className="text-xs font-medium text-primary">
              平均分：{avgScore}
            </span>
          )}
        </div>
        {/* 进度条 */}
        <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 欢迎信息卡片 */}
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl p-6 text-white shadow-lg shadow-violet-500/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">欢迎，{reviewerInfo.name}！</h2>
            <p className="text-white/80">当前评审轮次：{CURRENT_ROUND}</p>
          </div>
          
          {/* 截止时间提示 */}
          <div className="flex items-center gap-4 bg-white/10 rounded-lg px-4 py-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-white/70">评审截止</p>
              <p className="font-semibold">{DEADLINE}</p>
              <p className={`text-xs ${timeLeft === '已截止' ? 'text-red-300' : 'text-white/70'}`}>
                剩余：{timeLeft}
              </p>
            </div>
          </div>
        </div>

        {/* 待评审提示 */}
        {stats.pending > 0 && (
          <div className="mt-4 p-4 bg-white/10 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-amber-900 font-bold text-sm">
                {stats.pending}
              </div>
              <span className="text-white/90">您还有 {stats.pending} 个作品待评审</span>
            </div>
            {firstPendingWork && (
              <Link
                to={`/reviewer/review/${firstPendingWork.id}`}
                className="inline-flex items-center gap-2 bg-white text-violet-600 px-4 py-2 rounded-lg font-medium hover:bg-white/90 transition-all shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                继续评审
              </Link>
            )}
          </div>
        )}
      </div>

      {/* 评分权重提示 */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
        <div className="flex items-center gap-2 text-blue-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium">评分权重说明</span>
        </div>
        <p className="text-sm text-blue-600 mt-1">
          创新性 {SCORE_WEIGHTS.innovation * 100}% + 技术实现 {SCORE_WEIGHTS.technical * 100}% + 应用价值 {SCORE_WEIGHTS.value * 100}%
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* 待评作品 */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">待评作品</p>
              <p className="text-2xl font-bold text-gray-800">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* 已评作品 */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">已评作品</p>
              <p className="text-2xl font-bold text-gray-800">{stats.completed}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* 已锁定 */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">已锁定</p>
              <p className="text-2xl font-bold text-gray-800">{stats.locked}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* 分配总数 */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">分配总数</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        {/* 当前轮次 */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">当前轮次</p>
              <p className="text-lg font-bold text-primary">{stats.currentRound}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center">
              <svg className="w-6 h-6 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 作品列表 */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-800">
            {CURRENT_ROUND}分配给我的作品
          </h2>
          <span className="text-sm text-gray-500">共 {assignedWorks.length} 个作品</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  作品名称
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  团队
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  提交时间
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  评分进度
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  我的状态
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assignedWorks.map((work) => (
                <tr key={work.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="text-sm font-medium text-gray-800">{work.name}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm text-gray-600">{work.team}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm text-gray-500">{work.submitTime}</div>
                  </td>
                  <td className="px-5 py-4">
                    {renderScoreProgress(work)}
                  </td>
                  <td className="px-5 py-4">
                    {renderStatusTag(work)}
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      to={`/reviewer/review/${work.id}`}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        isScoreLocked(work)
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : !hasScored(work)
                            ? 'bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      onClick={(e) => {
                        if (isScoreLocked(work)) {
                          e.preventDefault();
                          alert('评分已锁定，无法修改');
                        }
                      }}
                    >
                      {isScoreLocked(work) ? (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          已锁定
                        </>
                      ) : !hasScored(work) ? (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          开始评审
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                          修改评分
                        </>
                      )}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {assignedWorks.length === 0 && (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500">{CURRENT_ROUND}暂无分配给您的作品</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewerDashboard;
