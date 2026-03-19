import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TeamHall = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [teamStatus, setTeamStatus] = useState('已创建');
  const [searchKeyword, setSearchKeyword] = useState('');
  
  const mockTeam = {
    name: 'AI创新先锋队',
    captain: {
      name: '张明',
      school: '清华大学',
      role: '队长'
    },
    members: [
      { id: 1, name: '张明', school: '清华大学', role: '队长', status: '已加入', phone: '138****1234' },
      { id: 2, name: '李华', school: '北京大学', role: '成员', status: '已加入', phone: '139****5678' },
      { id: 3, name: '王芳', school: '浙江大学', role: '成员', status: '待审核', phone: '137****9012' }
    ],
    inviteCode: 'HONGHU2024ABC',
    maxMembers: 5
  };

  const mockTeams = [
    { id: 1, name: 'AI创新先锋队', captain: '张明', currentMembers: 3, maxMembers: 5, recruiting: true },
    { id: 2, name: '智慧未来团队', captain: '李华', currentMembers: 2, maxMembers: 5, recruiting: true },
    { id: 3, name: '技术梦工场', captain: '王芳', currentMembers: 5, maxMembers: 5, recruiting: false },
    { id: 4, name: '创新探索者', captain: '赵强', currentMembers: 1, maxMembers: 5, recruiting: true },
    { id: 5, name: 'AI解决方案', captain: '刘洋', currentMembers: 4, maxMembers: 5, recruiting: true }
  ];

  const filteredTeams = mockTeams.filter(team => 
    team.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    team.captain.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const getStatusInfo = (status) => {
    switch (status) {
      case '未组队':
        return { color: 'bg-yellow-100 text-yellow-700', text: '未组队' };
      case '已创建':
        return { color: 'bg-green-100 text-green-700', text: '已创建' };
      case '已满员':
        return { color: 'bg-gray-100 text-gray-700', text: '已满员' };
      default:
        return { color: 'bg-gray-100 text-gray-700', text: status };
    }
  };

  const handleInvite = () => {
    navigator.clipboard.writeText(mockTeam.inviteCode);
    alert('邀请码已复制到剪贴板');
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

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">团队大厅</h1>
          <p className="text-neutral-600">管理您的团队，邀请成员或加入其他团队</p>
        </div>

        {teamStatus === '未组队' ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <svg className="w-16 h-16 text-neutral-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">您还未加入团队</h2>
            <p className="text-neutral-600 mb-8">创建一个新团队或加入已有团队</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setTeamStatus('已创建')} className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                创建团队
              </button>
              <button className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/5 transition-colors">
                加入团队
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-neutral-800 mb-2">2024年梧桐·鸿鹄人工智能应用创新大赛</h2>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusInfo(teamStatus).color}`}>
                      {getStatusInfo(teamStatus).text}
                    </span>
                    <span className="text-neutral-600">当前角色：{mockTeam.captain.role}</span>
                    <span className="text-neutral-600">当前人数：{mockTeam.members.filter(m => m.status === '已加入').length}/{mockTeam.maxMembers}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
                  <button onClick={handleInvite} className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    邀请成员
                  </button>
                  <button className="border border-primary text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/5 transition-colors">
                    编辑团队
                  </button>
                  <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${teamStatus === '已满员' ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}>
                    去提交作品
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-neutral-800 mb-6">我的团队</h2>
              
              <div className="mb-6 p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-1">{mockTeam.name}</h3>
                    <p className="text-neutral-600 text-sm">邀请码：{mockTeam.inviteCode}</p>
                  </div>
                  <button onClick={handleInvite} className="text-primary hover:underline text-sm">
                    复制邀请码
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-neutral-500 mb-3">队长信息</h3>
                <div className="flex items-center p-4 bg-neutral-50 rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-medium">{mockTeam.captain.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-neutral-800 font-medium">{mockTeam.captain.name}</p>
                    <p className="text-neutral-500 text-sm">{mockTeam.captain.school}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-neutral-500 mb-3">成员列表</h3>
                <div className="space-y-3">
                  {mockTeam.members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                          <span className="text-primary font-medium">{member.name[0]}</span>
                        </div>
                        <div>
                          <p className="text-neutral-800 font-medium">{member.name}</p>
                          <p className="text-neutral-500 text-sm">{member.school} · {member.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-xs ${member.status === '已加入' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {member.status}
                        </span>
                        {member.role !== '队长' && (
                          <button className="text-neutral-500 hover:text-red-500 text-sm">
                            移除
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-neutral-800 mb-6">全部队伍</h2>
              
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="搜索队伍名称或队长..."
                    className="w-full px-4 py-3 pl-12 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                  <svg className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <div className="space-y-4">
                {filteredTeams.map((team) => (
                  <div key={team.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-neutral-200 rounded-lg hover:border-primary/50 transition-colors">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-neutral-800 mb-1">{team.name}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600">
                        <span>队长：{team.captain}</span>
                        <span>人数：{team.currentMembers}/{team.maxMembers}</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${team.recruiting ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {team.recruiting ? '招募中' : '已满员'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      {team.recruiting && team.currentMembers < team.maxMembers ? (
                        <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                          申请加入
                        </button>
                      ) : (
                        <button className="bg-gray-200 text-gray-500 px-4 py-2 rounded-lg font-medium cursor-not-allowed" disabled>
                          无法加入
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TeamHall;