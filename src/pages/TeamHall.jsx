import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { request } from '../lib/api';

const TeamHall = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [teams, setTeams] = useState([]);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [lastOperation, setLastOperation] = useState({ name: '-', status: '-', time: null });

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const [createTeamForm, setCreateTeamForm] = useState({
    name: '',
    description: '',
    competitionId: '',
    trackId: ''
  });

  // 可用赛事列表
  const [competitions, setCompetitions] = useState([]);
  const [tracks, setTracks] = useState([]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinCode, setJoinCode] = useState('');

  const showToast = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const fetchMyTeams = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await request('/v1/teams/my/list');

      if (!result.ok) {
        if (result.status === 401) {
          setError('登录已过期，请重新登录');
          return;
        }
        setError('获取团队信息失败');
        return;
      }

      const data = result.data;
      if (data.code === 0) {
        const list = data.data?.list || [];
        setTeams(list);
        if (list.length > 0) {
          setCurrentTeam(list[0]);
          const isLeader = list[0].leader?.id === user?.id;
          setCurrentUserRole(isLeader ? 'leader' : 'member');
        } else {
          setCurrentTeam(null);
          setCurrentUserRole(null);
        }
      } else {
        setError(data.message || '获取团队信息失败');
      }
    } catch (err) {
      setError('网络错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMyTeams();
      fetchCompetitions();
    }
  }, [isAuthenticated]);

  // 获取可用赛事列表
  const fetchCompetitions = async () => {
    try {
      const result = await request('/v1/competitions');
      if (result.ok && result.data.code === 0) {
        const list = result.data.data?.list || [];
        setCompetitions(list);
        if (list.length > 0) {
          setCreateTeamForm(prev => ({
            ...prev,
            competitionId: list[0].id,
            trackId: list[0].tracks?.[0]?.id || ''
          }));
          setTracks(list[0].tracks || []);
        }
      }
    } catch (err) {
      console.error('获取赛事列表失败:', err);
    }
  };

  // 赛事切换时更新赛道
  useEffect(() => {
    if (createTeamForm.competitionId) {
      const comp = competitions.find(c => c.id === createTeamForm.competitionId);
      if (comp) {
        setTracks(comp.tracks || []);
        if (comp.tracks?.length > 0) {
          setCreateTeamForm(prev => ({ ...prev, trackId: comp.tracks[0].id }));
        } else {
          setCreateTeamForm(prev => ({ ...prev, trackId: '' }));
        }
      }
    }
  }, [createTeamForm.competitionId, competitions]);

  const handleCopyInviteCode = () => {
    if (currentTeam?.inviteCode) {
      navigator.clipboard.writeText(currentTeam.inviteCode);
      showToast('邀请码已复制到剪贴板');
    }
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    setLastOperation({ name: '创建团队', status: '请求中...', time: new Date().toLocaleTimeString() });
    try {
      const result = await request('/v1/teams', {
        method: 'POST',
        body: JSON.stringify({
          name: createTeamForm.name,
          description: createTeamForm.description,
          competitionId: createTeamForm.competitionId || undefined,
          trackId: createTeamForm.trackId || undefined
        })
      });

      setLastOperation({ name: '创建团队', status: result.status, time: new Date().toLocaleTimeString() });
      if (result.ok && result.data.code === 0) {
        showToast('团队创建成功');
        fetchMyTeams();
        setCreateTeamForm({ name: '', description: '', competitionId: '', trackId: '' });
      } else {
        showToast(result.data.message || '创建失败');
      }
    } catch (err) {
      setLastOperation({ name: '创建团队', status: '网络错误', time: new Date().toLocaleTimeString() });
      showToast('网络错误');
    }
  };

  const handleJoinTeam = async (e) => {
    e.preventDefault();
    setLastOperation({ name: '加入团队', status: '请求中...', time: new Date().toLocaleTimeString() });
    try {
      const result = await request(`/v1/teams/join-by-code/${joinCode}`, {
        method: 'POST'
      });

      setLastOperation({ name: '加入团队', status: result.status, time: new Date().toLocaleTimeString() });
      if (result.ok && result.data.code === 0) {
        showToast('加入团队成功');
        setShowJoinModal(false);
        setJoinCode('');
        fetchMyTeams();
      } else {
        showToast(result.data.message || '加入失败');
      }
    } catch (err) {
      setLastOperation({ name: '加入团队', status: '网络错误', time: new Date().toLocaleTimeString() });
      showToast('网络错误');
    }
  };

  const handleLeaveTeam = async () => {
    if (!currentTeam) return;
    if (!confirm('确定要退出团队吗？')) return;
    setLastOperation({ name: '退出团队', status: '请求中...', time: new Date().toLocaleTimeString() });

    try {
      const result = await request(`/v1/teams/${currentTeam.id}/leave`, {
        method: 'POST',
        body: JSON.stringify({})
      });

      setLastOperation({ name: '退出团队', status: result.status, time: new Date().toLocaleTimeString() });
      if (result.ok && result.data.code === 0) {
        showToast('已退出团队');
        setCurrentTeam(null);
        fetchMyTeams();
      } else {
        showToast(result.data.message || '退出失败');
      }
    } catch (err) {
      setLastOperation({ name: '退出团队', status: '网络错误', time: new Date().toLocaleTimeString() });
      showToast('网络错误');
    }
  };

  const handleRemoveMember = async (memberId) => {
    if (!currentTeam || !confirm('确定要移除该成员吗？')) return;
    setLastOperation({ name: '移除成员', status: '请求中...', time: new Date().toLocaleTimeString() });

    try {
      const result = await request(`/v1/teams/${currentTeam.id}/remove-member`, {
        method: 'POST',
        body: JSON.stringify({ memberId })
      });

      setLastOperation({ name: '移除成员', status: result.status, time: new Date().toLocaleTimeString() });
      if (result.ok && result.data.code === 0) {
        showToast('成员已移除');
        fetchMyTeams();
      } else {
        showToast(result.data.message || '移除失败');
      }
    } catch (err) {
      setLastOperation({ name: '移除成员', status: '网络错误', time: new Date().toLocaleTimeString() });
      showToast('网络错误');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'forming': return 'bg-blue-100 text-blue-800';
      case 'complete': return 'bg-green-100 text-green-800';
      case 'locked': return 'bg-gray-100 text-gray-800';
      case 'dissolved': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'forming': return '组建中';
      case 'complete': return '已完成';
      case 'locked': return '已锁定';
      case 'dissolved': return '已解散';
      default: return status || '未知';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    try {
      return new Date(dateStr).toLocaleDateString('zh-CN');
    } catch {
      return dateStr;
    }
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
            <p className="text-neutral-600 mb-8">登录后可查看和管理您的团队</p>
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 animate-fadeIn">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-xl shadow-md p-12">
            <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-neutral-500">加载中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 animate-fadeIn">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-xl shadow-md p-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button onClick={fetchMyTeams} className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              重试
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentTeam) {
    return (
      <div className="container mx-auto px-4 py-12 animate-fadeIn">
        <div className="max-w-6xl mx-auto">
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-blue-700">API 联调信息</h3>
                <span className="text-xs text-blue-500">开发环境可见</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="bg-white rounded-lg p-3">
                  <p className="text-gray-400 mb-1">请求接口</p>
                  <p className="font-mono text-gray-800">GET /api/v1/teams/my/list</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-gray-400 mb-1">HTTP 状态</p>
                  <p className="text-green-600 font-semibold">{loading ? '请求中...' : '成功'}</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-gray-400 mb-1">团队数量</p>
                  <p className="text-gray-800">{teams.length}</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-gray-400 mb-1">当前用户身份</p>
                  <p className="text-gray-800">-</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-gray-400 mb-1">最近操作</p>
                  <p className="text-gray-800">{lastOperation.name}</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-gray-400 mb-1">操作状态</p>
                  <p className={`font-semibold ${lastOperation.status === '200' ? 'text-green-600' : lastOperation.status === '请求中...' ? 'text-yellow-600' : 'text-red-600'}`}>{lastOperation.status}</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-gray-400 mb-1">操作时间</p>
                  <p className="text-gray-800">{lastOperation.time || '-'}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">我的团队</h1>
            <p className="text-neutral-600">创建或加入团队，开始您的参赛之旅</p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">你还没有加入团队</h2>
              <p className="text-neutral-600 mb-8">你可以创建团队，或通过邀请码加入团队</p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => document.getElementById('create-team-form').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  创建团队
                </button>
                <button
                  onClick={() => setShowJoinModal(true)}
                  className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/5 transition-colors"
                >
                  输入邀请码加入
                </button>
              </div>
            </div>

            <div id="create-team-form" className="bg-white rounded-xl shadow-md p-6 mt-8">
              <h3 className="text-lg font-semibold text-neutral-800 mb-6">创建新团队</h3>
              <form onSubmit={handleCreateTeam} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">选择赛事 *</label>
                  <select
                    value={createTeamForm.competitionId}
                    onChange={(e) => setCreateTeamForm(prev => ({ ...prev, competitionId: e.target.value }))}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    required
                  >
                    {competitions.length === 0 && (
                      <option value="">暂无可用赛事</option>
                    )}
                    {competitions.map(comp => (
                      <option key={comp.id} value={comp.id}>{comp.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">选择赛道 *</label>
                  <select
                    value={createTeamForm.trackId}
                    onChange={(e) => setCreateTeamForm(prev => ({ ...prev, trackId: e.target.value }))}
                    disabled={tracks.length === 0}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:bg-gray-100"
                    required
                  >
                    {tracks.length === 0 && (
                      <option value="">请先选择赛事</option>
                    )}
                    {tracks.map(track => (
                      <option key={track.id} value={track.id}>{track.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">团队名称 *</label>
                  <input
                    type="text"
                    value={createTeamForm.name}
                    onChange={(e) => setCreateTeamForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="请输入团队名称"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">团队简介</label>
                  <textarea
                    value={createTeamForm.description}
                    onChange={(e) => setCreateTeamForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="请简要描述您的团队"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!createTeamForm.competitionId || !createTeamForm.trackId}
                  className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  创建团队
                </button>
              </form>
            </div>
          </div>
        </div>

        {showJoinModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-neutral-800 mb-6">加入团队</h3>
              <form onSubmit={handleJoinTeam} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">邀请码</label>
                  <input
                    type="text"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="请输入团队邀请码"
                    required
                  />
                </div>
                <p className="text-sm text-neutral-500">请向团队队长获取邀请码</p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowJoinModal(false)}
                    className="flex-1 border border-neutral-300 py-3 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    加入
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showNotification && (
          <div className="fixed bottom-4 right-4 bg-neutral-800 text-white px-4 py-3 rounded-lg shadow-lg">
            {notificationMessage}
          </div>
        )}
      </div>
    );
  }

  const isLeader = currentUserRole === 'leader';

  return (
    <div className="container mx-auto px-4 py-12 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-blue-700">API 联调信息</h3>
              <span className="text-xs text-blue-500">开发环境可见</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">请求接口</p>
                <p className="font-mono text-gray-800">GET /api/v1/teams/my/list</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">HTTP 状态</p>
                <p className="text-green-600 font-semibold">成功</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">团队 ID</p>
                <p className="text-gray-800 truncate">{currentTeam?.id || '-'}</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">成员数量</p>
                <p className="text-gray-800">{currentTeam?._count?.members || 0}人</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">队长</p>
                <p className="text-gray-800">{currentTeam?.leader?.username || '-'}</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">当前用户身份</p>
                <p className={`font-semibold ${isLeader ? 'text-yellow-600' : 'text-blue-600'}`}>
                  {isLeader ? '队长' : '成员'}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">最近操作</p>
                <p className="text-gray-800">{lastOperation.name}</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-400 mb-1">操作状态</p>
                <p className={`font-semibold ${lastOperation.status === '200' ? 'text-green-600' : lastOperation.status === '请求中...' ? 'text-yellow-600' : 'text-red-600'}`}>{lastOperation.status}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">我的团队</h1>
          <p className="text-neutral-600">管理您的团队，邀请成员或加入其他团队</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-neutral-800 mb-4">团队信息</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-neutral-800">{currentTeam.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentTeam.status)}`}>
                    {getStatusText(currentTeam.status)}
                  </span>
                </div>
                <p className="text-neutral-600 text-sm">{currentTeam.description || '暂无简介'}</p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
                  <div>
                    <p className="text-neutral-500 text-sm">队长</p>
                    <p className="text-neutral-800 font-medium">{currentTeam.leader?.username || '-'}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500 text-sm">成员数量</p>
                    <p className="text-neutral-800 font-medium">{currentTeam._count?.members || 0}{currentTeam.maxMembers ? `/${currentTeam.maxMembers}` : ''}</p>
                  </div>
                  {currentTeam.competition && (
                    <div className="col-span-2">
                      <p className="text-neutral-500 text-sm">所属赛事</p>
                      <p className="text-neutral-800 font-medium">{currentTeam.competition.name}</p>
                    </div>
                  )}
                  {currentTeam.track && (
                    <div className="col-span-2">
                      <p className="text-neutral-500 text-sm">参赛赛道</p>
                      <p className="text-neutral-800 font-medium">{currentTeam.track.name}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isLeader && currentTeam.inviteCode && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-neutral-800 mb-4">邀请成员</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="text-neutral-500 text-sm mb-1">邀请码</p>
                      <p className="text-lg font-mono text-neutral-800">{currentTeam.inviteCode}</p>
                    </div>
                    <button
                      onClick={handleCopyInviteCode}
                      className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                      复制
                    </button>
                  </div>
                  <p className="text-sm text-neutral-500">
                    被邀请成员可通过此邀请码加入团队
                  </p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-neutral-800 mb-4">团队操作</h2>
              <div className="space-y-3">
                {isLeader && (
                  <>
                    <button
                      onClick={() => setShowInviteModal(true)}
                      className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                      邀请成员
                    </button>
                  </>
                )}
                <Link
                  to="/my-works"
                  className="block w-full text-center bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  前往作品提交
                </Link>
                {!isLeader && (
                  <button
                    onClick={handleLeaveTeam}
                    className="w-full border border-red-300 text-red-600 py-3 rounded-lg font-medium hover:bg-red-50 transition-colors"
                  >
                    退出团队
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-neutral-800 mb-6">成员列表</h2>
            <div className="space-y-4">
              {currentTeam.members?.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary font-medium text-lg">
                        {member.user?.username?.[0] || member.user?.email?.[0] || '?'}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-neutral-800 font-medium">{member.user?.username || '-'}</p>
                        {member.user?.id === currentTeam.leader?.id && (
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                            队长
                          </span>
                        )}
                      </div>
                      <p className="text-neutral-500 text-sm">{member.user?.profile?.school || member.user?.email || '-'}</p>
                    </div>
                  </div>
                  {isLeader && member.user?.id !== currentTeam.leader?.id && (
                    <button
                      onClick={() => handleRemoveMember(member.user?.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      移除
                    </button>
                  )}
                  {!isLeader && (
                    <span className={`px-2 py-1 rounded text-xs ${
                      member.memberStatus === 'joined' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {member.memberStatus === 'joined' ? '已加入' : member.memberStatus}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {currentTeam.maxMembers && currentTeam._count?.members >= currentTeam.maxMembers && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
                <p className="text-neutral-600 text-sm">团队成员已满，无法继续添加</p>
              </div>
            )}

            {currentTeam.maxMembers && currentTeam._count?.members < currentTeam.maxMembers && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-blue-700 text-sm">
                  还可加入 {currentTeam.maxMembers - currentTeam._count?.members} 名成员
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-neutral-800 mb-6">邀请成员</h3>
            <div className="space-y-4">
              <div className="text-center p-6 bg-neutral-50 rounded-lg">
                <p className="text-neutral-500 text-sm mb-2">分享邀请码给队友</p>
                <p className="text-2xl font-mono font-bold text-primary">{currentTeam.inviteCode || '-'}</p>
              </div>
              <p className="text-sm text-neutral-500 text-center">
                队友在团队大厅点击"输入邀请码加入"即可加入
              </p>
              <button
                onClick={() => {
                  handleCopyInviteCode();
                  setShowInviteModal(false);
                }}
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                复制邀请码
              </button>
              <button
                onClick={() => setShowInviteModal(false)}
                className="w-full border border-neutral-300 py-3 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-neutral-800 text-white px-4 py-3 rounded-lg shadow-lg">
          {notificationMessage}
        </div>
      )}
    </div>
  );
};

export default TeamHall;
