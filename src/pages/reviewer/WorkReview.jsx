import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// 当前评委ID（模拟登录用户）
const CURRENT_REVIEWER_ID = 'reviewer_001';

// 当前评审轮次
const CURRENT_ROUND = '初审';

// 评分权重配置
const SCORE_WEIGHTS = {
  innovation: 0.3,  // 创新性 30%
  technical: 0.3,   // 技术实现 30%
  value: 0.4        // 应用价值 40%
};

// 计算加权总分
const calculateWeightedScore = (innovation, technical, value) => {
  return (
    innovation * SCORE_WEIGHTS.innovation +
    technical * SCORE_WEIGHTS.technical +
    value * SCORE_WEIGHTS.value
  ).toFixed(1);
};

// 模拟作品数据（带多轮评审和评分状态）
const mockWorkDetail = {
  id: 1,
  name: '智能医疗影像诊断系统',
  team: '医智先锋队',
  members: ['张三', '李四', '王五'],
  round: '初审',
  description: `本项目基于深度学习技术，开发了一套智能医疗影像诊断系统。系统能够自动识别CT、MRI等医学影像中的异常区域，辅助医生进行疾病诊断。

主要创新点：
1. 采用改进的U-Net架构，分割精度提升15%
2. 引入注意力机制，增强病灶区域特征提取
3. 支持多模态影像融合分析
4. 实时处理速度达到临床要求

技术栈：Python、PyTorch、OpenCV、Flask

应用场景：可部署于医院影像科，辅助放射科医生提高诊断效率和准确率。`,
  attachments: [
    { name: '项目说明书.pdf', size: '2.5 MB' },
    { name: '技术架构图.png', size: '1.2 MB' },
    { name: '演示视频.mp4', size: '15.8 MB' },
    { name: '源代码.zip', size: '8.3 MB' }
  ],
  assignedReviewers: ['reviewer_001', 'reviewer_002', 'reviewer_003'],
  scores: [
    {
      reviewerId: 'reviewer_002',
      reviewerName: '李教授',
      round: '初审',
      innovation: 8,
      technical: 9,
      value: 8,
      total: 8.2, // 加权计算: 8*0.3 + 9*0.3 + 8*0.4
      comment: '项目技术实现较为成熟，创新性较好，在医疗场景有实际应用价值。建议进一步完善用户界面设计。',
      submittedAt: '2024-03-16 14:30',
      status: 'submitted'
    },
    {
      reviewerId: 'reviewer_003',
      reviewerName: '王专家',
      round: '复审', // 不同轮次的评分
      innovation: 9,
      technical: 8,
      value: 9,
      total: 8.7,
      comment: '在复审阶段表现优秀，技术深度足够。',
      submittedAt: '2024-03-20 10:00',
      status: 'locked'
    }
  ]
};

const WorkReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [work, setWork] = useState(mockWorkDetail);
  
  // 检查当前评委在当前轮次是否已评分
  const myScore = useMemo(() => {
    return work.scores.find(s => 
      s.reviewerId === CURRENT_REVIEWER_ID && s.round === CURRENT_ROUND
    );
  }, [work.scores]);
  
  const hasScored = !!myScore;
  const isLocked = myScore?.status === 'locked';
  
  // 初始化表单数据
  const [scores, setScores] = useState({
    innovation: myScore?.innovation?.toString() || '',
    technical: myScore?.technical?.toString() || '',
    value: myScore?.value?.toString() || ''
  });
  const [comment, setComment] = useState(myScore?.comment || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 计算当前加权总分
  const totalScore = useMemo(() => {
    const { innovation, technical, value } = scores;
    if (!innovation || !technical || !value) return 0;
    return calculateWeightedScore(
      parseInt(innovation),
      parseInt(technical),
      parseInt(value)
    );
  }, [scores]);

  // 计算当前轮次的平均分
  const averageScore = useMemo(() => {
    const currentRoundScores = work.scores.filter(s => s.round === CURRENT_ROUND);
    if (currentRoundScores.length === 0) return null;
    const avg = currentRoundScores.reduce((sum, s) => sum + s.total, 0) / currentRoundScores.length;
    return avg.toFixed(1);
  }, [work.scores]);

  // 处理评分输入
  const handleScoreChange = (field, value) => {
    if (isLocked) return; // 锁定状态下禁止修改
    const num = parseInt(value);
    if (value === '' || (num >= 1 && num <= 10)) {
      setScores(prev => ({ ...prev, [field]: value }));
    }
  };

  // 提交评分
  const handleSubmit = async (isDraft = false) => {
    if (isLocked) {
      alert('评分已锁定，无法修改');
      return;
    }

    if (!isDraft) {
      // 验证
      if (!scores.innovation || !scores.technical || !scores.value) {
        alert('请完成所有评分项');
        return;
      }
      if (comment.length < 20) {
        alert('评语最少需要20字');
        return;
      }
    }

    setIsSubmitting(true);
    
    // 模拟提交
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 更新本地数据
    const newScore = {
      reviewerId: CURRENT_REVIEWER_ID,
      reviewerName: '我',
      round: CURRENT_ROUND,
      innovation: parseInt(scores.innovation),
      technical: parseInt(scores.technical),
      value: parseInt(scores.value),
      total: parseFloat(totalScore),
      comment: comment,
      submittedAt: new Date().toLocaleString('zh-CN'),
      status: isDraft ? 'draft' : 'submitted'
    };
    
    setWork(prev => {
      const existingIndex = prev.scores.findIndex(s => 
        s.reviewerId === CURRENT_REVIEWER_ID && s.round === CURRENT_ROUND
      );
      let newScores;
      if (existingIndex >= 0) {
        // 更新已有评分
        newScores = [...prev.scores];
        newScores[existingIndex] = newScore;
      } else {
        // 添加新评分
        newScores = [...prev.scores, newScore];
      }
      return { ...prev, scores: newScores };
    });
    
    setIsSubmitting(false);
    
    if (!isDraft) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/reviewer/dashboard');
      }, 1500);
    } else {
      alert('草稿已保存');
    }
  };

  // 成功提示
  if (showSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">评分提交成功</h3>
          <p className="text-gray-500">正在返回工作台...</p>
        </div>
      </div>
    );
  }

  // 获取当前轮次的其他评委评分
  const otherScoresCurrentRound = work.scores.filter(s => 
    s.reviewerId !== CURRENT_REVIEWER_ID && s.round === CURRENT_ROUND
  );

  // 获取其他轮次的评分
  const otherRoundScores = work.scores.filter(s => 
    s.reviewerId !== CURRENT_REVIEWER_ID && s.round !== CURRENT_ROUND
  );

  return (
    <div className="space-y-6">
      {/* 返回按钮 */}
      <div className="flex items-center gap-2">
        <Link
          to="/reviewer/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回工作台
        </Link>
      </div>

      {/* 当前轮次提示 */}
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl p-4 text-white shadow-lg shadow-violet-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-white/80">当前评审轮次</p>
              <p className="text-xl font-bold">{CURRENT_ROUND}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/80">评分权重</p>
            <p className="text-xs text-white/60">
              创新性{SCORE_WEIGHTS.innovation * 100}% + 
              技术实现{SCORE_WEIGHTS.technical * 100}% + 
              应用价值{SCORE_WEIGHTS.value * 100}%
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* 左侧 - 作品信息 */}
        <div className="flex-1 lg:w-[55%] space-y-4">
          {/* 作品标题卡片 */}
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{work.name}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {work.team}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    {work.members.join('、')}
                  </span>
                </div>
              </div>
              <div className="text-right">
                {isLocked ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    已锁定
                  </span>
                ) : hasScored ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                    已评分
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-100">
                    待评审
                  </span>
                )}
                <div className="mt-2 text-xs text-gray-500">
                  评分进度：{work.scores.filter(s => s.round === CURRENT_ROUND).length}/{work.assignedReviewers.length}
                </div>
              </div>
            </div>
          </div>

          {/* 项目说明 */}
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              项目说明
            </h3>
            <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {work.description}
            </div>
          </div>

          {/* 附件列表 */}
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              附件材料
            </h3>
            <div className="space-y-2">
              {work.attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{file.name}</p>
                      <p className="text-xs text-gray-500">{file.size}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    下载
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 视频占位 */}
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              演示视频
            </h3>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md mx-auto mb-3">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500">点击播放演示视频</p>
              </div>
            </div>
          </div>

          {/* 当前轮次其他评委评分 */}
          {otherScoresCurrentRound.length > 0 && (
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {CURRENT_ROUND}其他评委评分
                {averageScore && (
                  <span className="ml-2 text-sm font-normal text-primary">
                    当前平均分：{averageScore}
                  </span>
                )}
              </h3>
              <div className="space-y-4">
                {otherScoresCurrentRound.map((score, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800">{score.reviewerName}</span>
                      <div className="flex items-center gap-2">
                        {score.status === 'locked' && (
                          <span className="text-xs text-gray-400 flex items-center gap-0.5">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            已锁定
                          </span>
                        )}
                        <span className="text-lg font-bold text-primary">{score.total}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                      <span>创新性：{score.innovation}</span>
                      <span>技术实现：{score.technical}</span>
                      <span>应用价值：{score.value}</span>
                    </div>
                    <p className="text-sm text-gray-600">{score.comment}</p>
                    <p className="text-xs text-gray-400 mt-2">{score.submittedAt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 其他轮次评分 */}
          {otherRoundScores.length > 0 && (
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                历史评分记录
              </h3>
              <div className="space-y-4">
                {otherRoundScores.map((score, index) => (
                  <div key={index} className="p-4 bg-gray-50/50 rounded-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">{score.reviewerName}</span>
                        <span className="px-2 py-0.5 text-xs bg-violet-100 text-violet-600 rounded">
                          {score.round}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {score.status === 'locked' && (
                          <span className="text-xs text-gray-400 flex items-center gap-0.5">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            已锁定
                          </span>
                        )}
                        <span className="text-lg font-bold text-gray-600">{score.total}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                      <span>创新性：{score.innovation}</span>
                      <span>技术实现：{score.technical}</span>
                      <span>应用价值：{score.value}</span>
                    </div>
                    <p className="text-sm text-gray-600">{score.comment}</p>
                    <p className="text-xs text-gray-400 mt-2">{score.submittedAt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 右侧 - 评分卡片 */}
        <div className="lg:w-[45%]">
          <div className={`bg-white rounded-xl p-5 border shadow-sm sticky top-6 ${
            isLocked ? 'border-gray-200 bg-gray-50/50' : 'border-gray-100'
          }`}>
            {/* 锁定提示 */}
            {isLocked && (
              <div className="mb-4 p-3 bg-gray-100 rounded-lg flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-sm font-medium">评分已锁定，无法修改</span>
              </div>
            )}

            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              {isLocked ? '评分详情（已锁定）' : hasScored ? '修改评分' : '我的评分'}
            </h3>

            {/* 评分项 */}
            <div className="space-y-4 mb-6">
              {/* 创新性 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  创新性 
                  <span className="text-primary font-semibold">({SCORE_WEIGHTS.innovation * 100}%)</span>
                  <span className="text-gray-400"> (1-10分)</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={scores.innovation}
                  onChange={(e) => handleScoreChange('innovation', e.target.value)}
                  disabled={isLocked}
                  className={`w-full px-3 py-2 border rounded-lg transition-all ${
                    isLocked 
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                      : 'border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
                  }`}
                  placeholder="请输入1-10的分数"
                />
              </div>

              {/* 技术实现 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  技术实现 
                  <span className="text-primary font-semibold">({SCORE_WEIGHTS.technical * 100}%)</span>
                  <span className="text-gray-400"> (1-10分)</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={scores.technical}
                  onChange={(e) => handleScoreChange('technical', e.target.value)}
                  disabled={isLocked}
                  className={`w-full px-3 py-2 border rounded-lg transition-all ${
                    isLocked 
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                      : 'border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
                  }`}
                  placeholder="请输入1-10的分数"
                />
              </div>

              {/* 应用价值 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  应用价值 
                  <span className="text-primary font-semibold">({SCORE_WEIGHTS.value * 100}%)</span>
                  <span className="text-gray-400"> (1-10分)</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={scores.value}
                  onChange={(e) => handleScoreChange('value', e.target.value)}
                  disabled={isLocked}
                  className={`w-full px-3 py-2 border rounded-lg transition-all ${
                    isLocked 
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                      : 'border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
                  }`}
                  placeholder="请输入1-10的分数"
                />
              </div>
            </div>

            {/* 总分显示 */}
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg p-4 mb-6 border border-violet-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">加权总分</span>
                <span className="text-2xl font-bold text-primary">{totalScore}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                计算方式：创新性×{SCORE_WEIGHTS.innovation} + 技术实现×{SCORE_WEIGHTS.technical} + 应用价值×{SCORE_WEIGHTS.value}
              </p>
            </div>

            {/* 评语 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                评语 <span className="text-gray-400">(最少20字)</span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => !isLocked && setComment(e.target.value)}
                disabled={isLocked}
                rows={5}
                className={`w-full px-3 py-2 border rounded-lg transition-all resize-none ${
                  isLocked 
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                    : 'border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
                }`}
                placeholder="请输入您的评审意见..."
              />
              {!isLocked && (
                <div className="flex justify-between mt-1.5">
                  <span className={`text-xs ${comment.length < 20 ? 'text-amber-500' : 'text-emerald-500'}`}>
                    {comment.length < 20 ? `还需${20 - comment.length}字` : '字数已满足'}
                  </span>
                  <span className="text-xs text-gray-400">{comment.length}字</span>
                </div>
              )}
            </div>

            {/* 操作按钮 */}
            {!isLocked && (
              <div className="space-y-3">
                <button
                  onClick={() => handleSubmit(false)}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      提交中...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {hasScored ? '更新评分' : '提交评分'}
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleSubmit(true)}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  保存草稿
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkReview;
