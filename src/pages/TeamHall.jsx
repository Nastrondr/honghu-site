import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TeamHall = () => {
  const { isAuthenticated } = useAuth();

  // 页面状态控制
  const [hasTeam, setHasTeam] = useState(false); // 是否已加入团队
  const [isLeader, setIsLeader] = useState(true); // TODO: 接入团队接口 - 模拟当前用户是否为队长
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // 团队状态 - 组建中 / 已报名 / 已提交作品 / 已锁定
  const [teamStatus, setTeamStatus] = useState('组建中');

  // 创建团队表单数据
  const [createTeamForm, setCreateTeamForm] = useState({
    name: '',
    description: '',
    competition: '2024年梧桐·鸿鹄人工智能应用创新大赛'
  });

  // 邀请码弹窗状态
  const [showInviteModal, setShowInviteModal] = useState(false);

  // 加入团队弹窗状态
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinCode, setJoinCode] = useState('');

  // 模拟团队数据 - TODO: 接入团队接口
  const [teamData, setTeamData] = useState({
    name: 'AI创新先锋队',
    description: '致力于人工智能应用创新的优秀团队',
    captainName: '张明',
    memberCount: 3,
    maxMembers: 5,
    competition: '2024年梧桐·鸿鹄人工智能应用创新大赛',
    inviteCode: 'HONGHU2024ABC',
    members: [
      { id: 1, name: '张明', school: '清华大学', role: '队长', status: '已加入', avatar: null },
      { id: 2, name: '李华', school: '北京大学', role: '成员', status: '已加入', avatar: null },
      { id: 3, name: '王芳', school: '浙江大学', role: '成员', status: '已加入', avatar: null }
    ]
  });

  // 获取团队状态颜色
  const getStatusColor = (status) => {
    switch (status) {
      case '组建中':
        return 'bg-blue-100 text-blue-800';
      case '已报名':
        return 'bg-orange-100 text-orange-800';
      case '已提交作品':
        return 'bg-green-100 text-green-800';
      case '已锁定':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 显示通知提示
  const showToast = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // 复制邀请码
  const handleCopyInviteCode = () => {
    navigator.clipboard.writeText(teamData.inviteCode);
    showToast('邀请码已复制到剪贴板');
  };

  // 创建团队
  const handleCreateTeam = (e) => {
    e.preventDefault();
    // TODO: 接入团队接口 - 调用创建团队API
    setTeamData(prev => ({
      ...prev,
      name: createTeamForm.name,
      description: createTeamForm.description
    }));
    setHasTeam(true);
    setIsLeader(true);
    showToast('团队创建成功');
  };

  // 移除成员
  const handleRemoveMember = (memberId) => {
    // TODO: 接入团队接口 - 调用移除成员API
    setTeamData(prev => ({
      ...prev,
      members: prev.members.filter(m => m.id !== memberId),
      memberCount: prev.memberCount - 1
    }));
    showToast('成员已移除');
  };

  // 加入团队
  const handleJoinTeam = (e) => {
    e.preventDefault();
    // TODO: 接入团队接口 - 调用加入团队API
    setHasTeam(true);
    setIsLeader(false);
    setShowJoinModal(false);
    showToast('加入团队成功');
  };

  // 退出团队
  const handleLeaveTeam = () => {
    // TODO: 接入团队接口 - 调用退出团队API
    setHasTeam(false);
    showToast('已退出团队');
  };

  // 未登录状态
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

  // ========== 未加入团队状态 ==========
  if (!hasTeam) {
    return (
      <div className="container mx-auto px-4 py-12 animate-fadeIn">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">我的团队</h1>
            <p className="text-neutral-600">创建或加入团队，开始您的参赛之旅</p>
          </div>

          {/* 未加入团队 - 居中卡片 */}
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

            {/* 创建团队表单 */}
            <div id="create-team-form" className="bg-white rounded-xl shadow-md p-6 mt-8">
              <h3 className="text-lg font-semibold text-neutral-800 mb-6">创建新团队</h3>
              <form onSubmit={handleCreateTeam} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">团队名称</label>
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
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">所属赛事</label>
                  <input
                    type="text"
                    value={createTeamForm.competition}
                    disabled
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg bg-neutral-50 text-neutral-600"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  创建团队
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 加入团队弹窗 */}
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

        {/* Toast通知 */}
        {showNotification && (
          <div className="fixed bottom-4 right-4 bg-neutral-800 text-white px-4 py-3 rounded-lg shadow-lg">
            {notificationMessage}
          </div>
        )}
      </div>
    );
  }

  // ========== 已加入团队状态 ==========
  return (
    <div className="container mx-auto px-4 py-12 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">我的团队</h1>
          <p className="text-neutral-600">管理您的团队，邀请成员或加入其他团队</p>
        </div>

        {/* 主内容区 - 左右两栏布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧 - 团队信息卡 */}
          <div className="space-y-6">
            {/* 团队信息卡片 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-neutral-800 mb-4">团队信息</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-neutral-800">{teamData.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(teamStatus)}`}>
                    {teamStatus}
                  </span>
                </div>
                <p className="text-neutral-600 text-sm">{teamData.description}</p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
                  <div>
                    <p className="text-neutral-500 text-sm">队长</p>
                    <p className="text-neutral-800 font-medium">{teamData.captainName}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500 text-sm">成员数量</p>
                    <p className="text-neutral-800 font-medium">{teamData.memberCount}/{teamData.maxMembers}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-neutral-500 text-sm">所属赛事</p>
                    <p className="text-neutral-800 font-medium">{teamData.competition}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 邀请成员卡片（仅队长可见） */}
            {isLeader && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-neutral-800 mb-4">邀请成员</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="text-neutral-500 text-sm mb-1">邀请码</p>
                      <p className="text-lg font-mono text-neutral-800">{teamData.inviteCode}</p>
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

            {/* 操作按钮区 */}
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
                    <button className="w-full border border-neutral-300 text-neutral-700 py-3 rounded-lg font-medium hover:bg-neutral-50 transition-colors">
                      编辑团队信息
                    </button>
                  </>
                )}
                <Link
                  to="/work-submission"
                  className="block w-full text-center bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  前往作品提交
                </Link>
                <p className="text-sm text-neutral-500 text-center">团队创建完成后，即可进入作品提交流程</p>
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

          {/* 右侧 - 成员列表 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-neutral-800 mb-6">成员列表</h2>
            <div className="space-y-4">
              {teamData.members.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div className="flex items-center">
                    {/* 默认头像 */}
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary font-medium text-lg">{member.name[0]}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-neutral-800 font-medium">{member.name}</p>
                        {member.role === '队长' && (
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                            队长
                          </span>
                        )}
                      </div>
                      <p className="text-neutral-500 text-sm">{member.school}</p>
                    </div>
                  </div>
                  {/* 队长操作按钮 */}
                  {isLeader && member.role !== '队长' && (
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      移除
                    </button>
                  )}
                  {/* 非队长显示状态 */}
                  {!isLeader && (
                    <span className={`px-2 py-1 rounded text-xs ${member.status === '已加入' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {member.status}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* 成员已满提示 */}
            {teamData.memberCount >= teamData.maxMembers && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
                <p className="text-neutral-600 text-sm">团队成员已满，无法继续添加</p>
              </div>
            )}

            {/* 招募提示 */}
            {teamData.memberCount < teamData.maxMembers && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-blue-700 text-sm">
                  还可加入 {teamData.maxMembers - teamData.memberCount} 名成员
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 邀请成员弹窗 */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-neutral-800 mb-6">邀请成员</h3>
            <div className="space-y-4">
              <div className="text-center p-6 bg-neutral-50 rounded-lg">
                <p className="text-neutral-500 text-sm mb-2">分享邀请码给队友</p>
                <p className="text-2xl font-mono font-bold text-primary">{teamData.inviteCode}</p>
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

      {/* Toast通知 */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-neutral-800 text-white px-4 py-3 rounded-lg shadow-lg">
          {notificationMessage}
        </div>
      )}
    </div>
  );
};

export default TeamHall;