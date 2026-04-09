import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { request } from '../../lib/api';

const WorkReview = () => {
  const { id: workId } = useParams();
  const { user, isAuthenticated } = useAuth();

  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [overallScore, setOverallScore] = useState('');
  const [overallComment, setOverallComment] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitType, setSubmitType] = useState('');
  const [lastOperation, setLastOperation] = useState({ name: '-', status: '-' });

  const fetchWorkDetail = async () => {
    if (!workId) return;
    setLoading(true);
    setError('');

    try {
      const result = await request(`/v1/reviewer/works/${workId}`);

      if (!result.ok) {
        if (result.status === 403) {
          setError('您没有权限评审此作品');
          return;
        }
        if (result.status === 404) {
          setError('作品不存在');
          return;
        }
        setError('获取作品详情失败');
        return;
      }

      if (result.data.code === 0) {
        setAssignment(result.data.data);
        if (result.data.data.record) {
          setOverallScore(result.data.data.record.overallScore || '');
          setOverallComment(result.data.data.record.overallComment || '');
          setRecommendation(result.data.data.record.recommendation || '');
        }
      } else {
        setError(result.data.message || '获取作品详情失败');
      }
    } catch (err) {
      setError('网络错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchWorkDetail();
    }
  }, [isAuthenticated, workId]);

  const handleSaveDraft = async () => {
    setSubmitType('draft');
    setSubmitting(true);
    setLastOperation({ name: '保存草稿', status: '请求中...' });

    try {
      const result = await request(`/v1/reviewer/assignments/${assignment.id}/score`, {
        method: 'POST',
        body: JSON.stringify({
          overallScore: overallScore ? Number(overallScore) : undefined,
          overallComment: overallComment || undefined,
          recommendation: recommendation || undefined,
          isDraft: true
        })
      });

      setLastOperation({ name: '保存草稿', status: result.status });
      if (result.ok && result.data.code === 0) {
        fetchWorkDetail();
      }
    } catch (err) {
      setLastOperation({ name: '保存草稿', status: '网络错误' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitScore = async () => {
    if (!overallScore) {
      alert('请输入总分');
      return;
    }
    if (!recommendation) {
      alert('请选择推荐意见');
      return;
    }

    setSubmitType('submit');
    setSubmitting(true);
    setLastOperation({ name: '提交评分', status: '请求中...' });

    try {
      const result = await request(`/v1/reviewer/assignments/${assignment.id}/score`, {
        method: 'POST',
        body: JSON.stringify({
          overallScore: Number(overallScore),
          overallComment: overallComment || undefined,
          recommendation,
          isDraft: false
        })
      });

      setLastOperation({ name: '提交评分', status: result.status });
      if (result.ok && result.data.code === 0) {
        alert('评分提交成功');
        fetchWorkDetail();
      }
    } catch (err) {
      setLastOperation({ name: '提交评分', status: '网络错误' });
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-xl shadow-md p-12 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">请先登录</h2>
          <Link to="/login" className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90">
            登录
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-xl shadow-md p-12 max-w-md mx-auto">
          <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-500">加载作品详情...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-xl shadow-md p-12 max-w-md mx-auto">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={fetchWorkDetail} className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90">
            重试
          </button>
        </div>
      </div>
    );
  }

  if (!assignment) return null;

  const isAlreadySubmitted = assignment.record?.status === 'submitted';
  const work = assignment.work;
  const record = assignment.record;

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
              <p className="text-gray-400 mb-1">详情接口</p>
              <p className="font-mono text-gray-800">GET /v1/reviewer/works/:id</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-400 mb-1">评分接口</p>
              <p className="font-mono text-gray-800">POST /v1/reviewer/assignments/:id/score</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-400 mb-1">Work ID</p>
              <p className="text-gray-800 truncate">{workId}</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-400 mb-1">Assignment ID</p>
              <p className="text-gray-800 truncate">{assignment.id}</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-400 mb-1">评分状态</p>
              <p className={`font-semibold ${record?.status === 'submitted' ? 'text-green-600' : 'text-yellow-600'}`}>
                {record?.status === 'submitted' ? '已提交' : record?.status === 'draft' ? '草稿' : '未评分'}
              </p>
            </div>
          </div>
          {lastOperation.name !== '-' && (
            <div className="mt-2 bg-white rounded-lg p-3 text-xs">
              <span className="text-gray-400">最近操作：</span>
              <span className="text-gray-800">{lastOperation.name}</span>
              <span className="ml-2 text-gray-400">状态：</span>
              <span className={`font-semibold ${lastOperation.status === '200' ? 'text-green-600' : 'text-red-600'}`}>{lastOperation.status}</span>
            </div>
          )}
        </div>
      )}

      <div className="mb-6">
        <Link to="/reviewer/dashboard" className="text-primary hover:underline text-sm">← 返回评审列表</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{work?.title || '-'}</h1>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">赛事</p>
                <p className="text-gray-800 font-medium">{work?.competition?.name || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">赛道</p>
                <p className="text-gray-800 font-medium">{work?.track?.name || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">团队</p>
                <p className="text-gray-800 font-medium">{work?.team?.name || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">负责人</p>
                <p className="text-gray-800 font-medium">{work?.user?.username || '-'}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">作品描述</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{work?.description || '暂无描述'}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">版本列表</h3>
              {work?.versions?.length > 0 ? (
                <div className="space-y-2">
                  {work.versions.map((version) => (
                    <div key={version.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="text-sm font-medium text-gray-800">版本 {version.versionNumber}</span>
                        {version.isFinal && <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">最终版</span>}
                      </div>
                      <span className="text-xs text-gray-500">{new Date(version.createdAt).toLocaleDateString('zh-CN')}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">暂无版本</p>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">附件列表</h3>
              {work?.attachments?.length > 0 ? (
                <div className="space-y-2">
                  {work.attachments.map((att) => (
                    <div key={att.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm text-gray-700">{att.fileName || att.name || '-'}</span>
                      </div>
                      <span className="text-xs text-gray-500">{att.fileType || '-'}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">暂无附件</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">评分表单</h2>

            {isAlreadySubmitted ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-2">评分已提交</p>
                <p className="text-2xl font-bold text-green-600">{record?.overallScore} 分</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">总分 (0-100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={overallScore}
                    onChange={(e) => setOverallScore(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="0-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">总体评价</label>
                  <textarea
                    value={overallComment}
                    onChange={(e) => setOverallComment(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="请输入评语..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">推荐意见</label>
                  <select
                    value={recommendation}
                    onChange={(e) => setRecommendation(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">请选择</option>
                    <option value="strongly_recommend">强烈推荐</option>
                    <option value="recommend">推荐</option>
                    <option value="neutral">中立</option>
                    <option value="not_recommend">不推荐</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={handleSaveDraft}
                    disabled={submitting}
                    className="w-full py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    {submitting && submitType === 'draft' ? '保存中...' : '保存草稿'}
                  </button>
                  <button
                    onClick={handleSubmitScore}
                    disabled={submitting}
                    className="w-full py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {submitting && submitType === 'submit' ? '提交中...' : '提交评分'}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">评审信息</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">评审轮次</span>
                <span className="text-gray-800 font-medium">{assignment.round?.roundName || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">截止时间</span>
                <span className="text-gray-800">{assignment.round?.endTime ? new Date(assignment.round.endTime).toLocaleDateString('zh-CN') : '-'}</span>
              </div>
              {record?.submittedAt && (
                <div className="flex justify-between">
                  <span className="text-gray-500">提交时间</span>
                  <span className="text-gray-800">{new Date(record.submittedAt).toLocaleDateString('zh-CN')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkReview;
