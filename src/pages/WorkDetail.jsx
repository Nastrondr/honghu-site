import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { request } from '../lib/api';

const WorkDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 操作相关状态
  const [creatingVersion, setCreatingVersion] = useState(false);
  const [addingAttachment, setAddingAttachment] = useState(false);
  const [deletingAttachment, setDeletingAttachment] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [operationMessage, setOperationMessage] = useState('');
  const [operationType, setOperationType] = useState('');

  // 开发调试
  const [lastOperation, setLastOperation] = useState('');
  const [lastOperationStatus, setLastOperationStatus] = useState(null);

  // 新建版本弹窗
  const [showCreateVersion, setShowCreateVersion] = useState(false);
  const [newVersionTitle, setNewVersionTitle] = useState('');
  const [newVersionDesc, setNewVersionDesc] = useState('');

  // 提交最终版弹窗
  const [showSubmitFinal, setShowSubmitFinal] = useState(false);
  const [submitFinalVersionId, setSubmitFinalVersionId] = useState('');

  const fetchWorkDetail = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await request(`/v1/works/${id}`);

      setLastOperationStatus(result.status);

      if (result.status === 401) {
        setError('请先登录');
        navigate('/login');
        return;
      }

      if (result.status === 403) {
        setError('您没有权限查看此作品');
        return;
      }

      if (result.status === 404) {
        setError('作品不存在');
        return;
      }

      if (!result.ok) {
        setError(result.data?.message || '获取作品详情失败');
        return;
      }

      if (result.data.code === 0) {
        setWork(result.data.data);
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
    if (id) {
      fetchWorkDetail();
    }
  }, [id]);

  const totalAttachments = work?.versions?.reduce((acc, v) => acc + (v.attachments?.length || 0), 0) || 0;
  const isLocked = work?.status === 'submitted' || work?.status === 'under_review' || work?.isFinal === true;

  // 创建新版本
  const handleCreateVersion = async () => {
    if (!newVersionTitle.trim()) return;

    setCreatingVersion(true);
    setOperationMessage('');

    try {
      const result = await request(`/v1/works/${id}/versions`, {
        method: 'POST',
        body: JSON.stringify({
          title: newVersionTitle,
          description: newVersionDesc,
        }),
      });

      setLastOperation('POST /v1/works/:id/versions');
      setLastOperationStatus(result.status);

      if (result.ok && result.data.code === 0) {
        setOperationMessage('版本创建成功');
        setOperationType('success');
        setShowCreateVersion(false);
        setNewVersionTitle('');
        setNewVersionDesc('');
        fetchWorkDetail();
      } else {
        setOperationMessage(result.data.message || '创建版本失败');
        setOperationType('error');
      }
    } catch (err) {
      setOperationMessage('网络错误');
      setOperationType('error');
    } finally {
      setCreatingVersion(false);
    }
  };

  // 添加附件（模拟上传）
  const handleAddAttachment = async (versionId) => {
    setAddingAttachment(true);
    setOperationMessage('');

    try {
      const result = await request(`/v1/versions/${versionId}/attachments`, {
        method: 'POST',
        body: JSON.stringify({
          name: `附件_${Date.now()}.pdf`,
          fileUrl: `https://example.com/file_${Date.now()}.pdf`,
          fileSize: 1024 * 100,
          fileType: 'application/pdf',
        }),
      });

      setLastOperation(`POST /v1/versions/${versionId}/attachments`);
      setLastOperationStatus(result.status);

      if (result.ok && result.data.code === 0) {
        setOperationMessage('附件添加成功');
        setOperationType('success');
        fetchWorkDetail();
      } else {
        setOperationMessage(result.data.message || '添加附件失败');
        setOperationType('error');
      }
    } catch (err) {
      setOperationMessage('网络错误');
      setOperationType('error');
    } finally {
      setAddingAttachment(false);
    }
  };

  // 删除附件
  const handleDeleteAttachment = async (attachmentId) => {
    if (!window.confirm('确定删除此附件？')) return;

    setDeletingAttachment(true);
    setOperationMessage('');

    try {
      const result = await request(`/v1/attachments/${attachmentId}`, {
        method: 'DELETE',
      });

      setLastOperation(`DELETE /v1/attachments/${attachmentId}`);
      setLastOperationStatus(result.status);

      if (result.ok && result.data.code === 0) {
        setOperationMessage('附件删除成功');
        setOperationType('success');
        fetchWorkDetail();
      } else {
        setOperationMessage(result.data.message || '删除附件失败');
        setOperationType('error');
      }
    } catch (err) {
      setOperationMessage('网络错误');
      setOperationType('error');
    } finally {
      setDeletingAttachment(false);
    }
  };

  // 提交最终版
  const handleSubmitFinal = async () => {
    if (!submitFinalVersionId) return;

    setSubmitting(true);
    setOperationMessage('');

    try {
      const result = await request(`/v1/works/${id}/submit`, {
        method: 'POST',
        body: JSON.stringify({
          versionId: submitFinalVersionId,
          isFinal: true,
        }),
      });

      setLastOperation('POST /v1/works/:id/submit');
      setLastOperationStatus(result.status);

      if (result.ok && result.data.code === 0) {
        setOperationMessage('已提交为最终版');
        setOperationType('success');
        setShowSubmitFinal(false);
        setSubmitFinalVersionId('');
        fetchWorkDetail();
      } else {
        setOperationMessage(result.data.message || '提交失败');
        setOperationType('error');
      }
    } catch (err) {
      setOperationMessage('网络错误');
      setOperationType('error');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'draft': return { color: 'text-blue-500 bg-blue-50', text: '草稿' };
      case 'submitted': return { color: 'text-purple-500 bg-purple-50', text: '已提交' };
      case 'under_review': return { color: 'text-orange-500 bg-orange-50', text: '评审中' };
      case 'published': return { color: 'text-green-500 bg-green-50', text: '已公示' };
      case 'archived': return { color: 'text-gray-500 bg-gray-50', text: '已归档' };
      default: return { color: 'text-gray-500 bg-gray-50', text: status || '未知' };
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    try {
      return new Date(dateStr).toLocaleString('zh-CN', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '-';
    const size = Number(bytes);
    if (size < 1024) return size + ' B';
    if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
    return (size / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 animate-fadeIn">
      <div className="max-w-4xl mx-auto px-4">

        {/* Dev 调试区 */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-blue-700">作品详情 API 联调信息</h3>
              <span className="text-xs text-blue-500">开发环境可见</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">作品 ID</p>
                <p className="font-mono text-gray-800 truncate">{id || '-'}</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">status</p>
                <p className={`font-semibold ${work ? getStatusInfo(work.status).color : 'text-gray-400'}`}>
                  {work?.status || '-'}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">isFinal</p>
                <p className={`font-semibold ${work?.isFinal ? 'text-red-500' : 'text-green-500'}`}>
                  {work?.isFinal ? 'true' : 'false'}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">已锁定</p>
                <p className={`font-semibold ${isLocked ? 'text-red-500' : 'text-green-500'}`}>
                  {isLocked ? '✓ 是' : '✗ 否'}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">versions</p>
                <p className="font-semibold text-gray-800">{work?.versions?.length || 0} 个</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">attachments</p>
                <p className="font-semibold text-gray-800">{totalAttachments} 个</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">最近操作</p>
                <p className="font-mono text-gray-800 truncate" title={lastOperation}>
                  {lastOperation ? lastOperation.split('/').pop() || '-' : '-'}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">操作状态</p>
                <p className={`font-semibold ${lastOperationStatus === 200 || lastOperationStatus === 0 ? 'text-green-600' : lastOperationStatus ? 'text-red-600' : 'text-gray-400'}`}>
                  {lastOperationStatus || '-'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 顶部导航 */}
        <div className="mb-6">
          <Link to="/my-works" className="text-primary hover:underline flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回我的作品
          </Link>
        </div>

        {/* 操作结果提示 */}
        {operationMessage && (
          <div className={`mb-6 p-4 rounded-xl border ${
            operationType === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <p className="font-medium">{operationMessage}</p>
          </div>
        )}

        {/* Loading 状态 */}
        {loading && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">加载中...</p>
          </div>
        )}

        {/* Error 状态 */}
        {!loading && error && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{error}</h2>
            <p className="text-gray-500 mb-6">无法加载作品详情</p>
            <button onClick={fetchWorkDetail} className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90">
              重试
            </button>
          </div>
        )}

        {/* Success 状态 */}
        {!loading && !error && work && (
          <div className="space-y-6">
            {/* 基本信息卡片 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">{work.title || '-'}</h1>
                  <div className="flex items-center gap-3">
                    {work.competition && (
                      <span className="text-sm text-gray-500">{work.competition.name}</span>
                    )}
                    {work.track && (
                      <>
                        <span className="text-gray-300">|</span>
                        <span className="text-sm text-gray-500">{work.track.name}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {work.status && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusInfo(work.status).color}`}>
                      {getStatusInfo(work.status).text}
                    </span>
                  )}
                  {isLocked && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-50 text-red-600 border border-red-200">
                      作品已锁定
                    </span>
                  )}
                </div>
              </div>

              {work.description && (
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <p className="text-sm text-gray-400 mb-1">作品描述</p>
                  <p className="text-gray-700">{work.description}</p>
                </div>
              )}
            </div>

            {/* 版本列表 + 操作区 */}
            {work.versions && work.versions.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    版本列表 ({work.versions.length})
                  </h2>
                  {!isLocked && (
                    <button
                      onClick={() => setShowCreateVersion(true)}
                      disabled={creatingVersion}
                      className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 disabled:opacity-50"
                    >
                      {creatingVersion ? '创建中...' : '+ 新建版本'}
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {work.versions.map((version) => (
                    <div key={version.id} className="border border-gray-100 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded">
                              V{version.versionNumber}
                            </span>
                            {version.isFinal && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs font-medium rounded">
                                最终版
                              </span>
                            )}
                          </div>
                          <h3 className="font-medium text-gray-800">{version.title || '-'}</h3>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-xs text-gray-400">
                            {formatDate(version.createdAt)}
                          </span>
                          {!isLocked && !version.isFinal && (
                            <button
                              onClick={() => {
                                setSubmitFinalVersionId(version.id);
                                setShowSubmitFinal(true);
                              }}
                              disabled={submitting}
                              className="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 disabled:opacity-50"
                            >
                              提交最终版
                            </button>
                          )}
                        </div>
                      </div>

                      {version.description && (
                        <p className="text-sm text-gray-600 mb-3">{version.description}</p>
                      )}

                      {/* 附件列表 */}
                      <div className="border-t border-gray-100 pt-3 mt-3">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs text-gray-400">
                            附件 ({version.attachments?.length || 0})
                          </p>
                          {!isLocked && (
                            <button
                              onClick={() => handleAddAttachment(version.id)}
                              disabled={addingAttachment}
                              className="text-xs text-primary hover:underline disabled:opacity-50"
                            >
                              {addingAttachment ? '添加中...' : '+ 添加附件'}
                            </button>
                          )}
                        </div>

                        {version.attachments && version.attachments.length > 0 ? (
                          <div className="space-y-2">
                            {version.attachments.map((att) => (
                              <div key={att.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                                <div className="flex items-center gap-2 min-w-0">
                                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                  </svg>
                                  <span className="text-sm text-gray-700 truncate">{att.fileName || att.name}</span>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                  {att.fileSize && (
                                    <span className="text-xs text-gray-400">{formatFileSize(att.fileSize)}</span>
                                  )}
                                  {att.fileType && (
                                    <span className="text-xs text-gray-400 px-2 py-0.5 bg-gray-200 rounded">
                                      {att.fileType.split('/').pop()}
                                    </span>
                                  )}
                                  {!isLocked && (
                                    <button
                                      onClick={() => handleDeleteAttachment(att.id)}
                                      disabled={deletingAttachment}
                                      className="text-xs text-red-500 hover:text-red-700 disabled:opacity-50"
                                    >
                                      删除
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-gray-400 italic">暂无附件</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 无版本 */}
            {(!work.versions || work.versions.length === 0) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <p className="text-gray-400 mb-4">暂无版本信息</p>
                {!isLocked && (
                  <button
                    onClick={() => setShowCreateVersion(true)}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                  >
                    创建第一个版本
                  </button>
                )}
              </div>
            )}
          </div>
        )}

      </div>

      {/* 新建版本弹窗 */}
      {showCreateVersion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4">新建版本</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">版本标题 *</label>
                <input
                  type="text"
                  value={newVersionTitle}
                  onChange={(e) => setNewVersionTitle(e.target.value)}
                  placeholder="如：作品完善版"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">版本描述</label>
                <textarea
                  value={newVersionDesc}
                  onChange={(e) => setNewVersionDesc(e.target.value)}
                  placeholder="描述此版本的更新内容"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateVersion(false);
                  setNewVersionTitle('');
                  setNewVersionDesc('');
                }}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={handleCreateVersion}
                disabled={creatingVersion || !newVersionTitle.trim()}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
              >
                {creatingVersion ? '创建中...' : '创建'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 提交最终版确认弹窗 */}
      {showSubmitFinal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4">确认提交</h3>
            <p className="text-gray-600 mb-6">
              提交后将无法再修改作品内容，确认将此版本设为最终版？
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowSubmitFinal(false);
                  setSubmitFinalVersionId('');
                }}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={handleSubmitFinal}
                disabled={submitting}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
              >
                {submitting ? '提交中...' : '确认提交'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkDetail;
