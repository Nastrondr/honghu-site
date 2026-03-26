import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  CARD_STYLES,
  SPACING,
  TYPOGRAPHY,
  TABLE_STYLES,
  FORM_STYLES,
  DRAWER_STYLES,
  getStatusTagClass,
  BUTTON_STYLES
} from '../../styles/admin-theme';

// ==================== 状态标签组件 ====================
const StatusTag = ({ status }) => {
  return (
    <span className={getStatusTagClass(status)}>
      {status}
    </span>
  );
};

// TODO: 接入评审任务列表接口
// TODO: 接入评委分配接口
// TODO: 接入评审进度接口
// TODO: 接入评审轮次创建接口

// ==================== Toast 组件 ====================
const Toast = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-primary';

  return (
    <div className={`fixed top-6 right-6 ${bgColor} text-white px-6 py-3 rounded-xl shadow-lg z-50`}>
      <div className="flex items-center gap-2">
        {type === 'success' && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};

// ==================== 轮次标签组件（统一标签样式）====================
const RoundTag = ({ round }) => {
  const roundColors = {
    '初审': 'bg-blue-50 text-blue-600 border border-blue-100',
    '复审': 'bg-purple-50 text-purple-600 border border-purple-100',
    '决赛': 'bg-amber-50 text-amber-600 border border-amber-100'
  };
  return (
    <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${roundColors[round] || 'bg-gray-100 text-gray-600'}`}>
      {round}
    </span>
  );
};

// ==================== 评委进度组件（优化版）====================
const ReviewerProgress = ({ completed, total }) => {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <div className="flex flex-col gap-2 min-w-[90px]">
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-bold text-gray-800">{completed}</span>
        <span className="text-sm text-gray-400">/{total}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

// ==================== 操作下拉菜单（优化版）====================
const ActionDropdown = ({ work, onViewDetail, onAssign, onViewProgress, showToast }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (action) => {
    setIsOpen(false);
    action();
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${BUTTON_STYLES.dropdown} ${isOpen ? 'bg-gray-100' : ''}`}
      >
        更多
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10 animate-fade-in">
          {work.status !== '待分配' && (
            <button
              onClick={() => handleAction(() => { onViewProgress(work); showToast('查看评审进度', 'info'); })}
              className="w-full px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-gray-50 transition-colors"
            >
              查看进度
            </button>
          )}
          <button
            onClick={() => handleAction(() => { onAssign(work); showToast('打开分配评审', 'info'); })}
            className="w-full px-4 py-2.5 text-sm text-left text-primary hover:bg-primary/5 transition-colors"
          >
            {work.status === '待分配' ? '分配评审' : '重新分配'}
          </button>
        </div>
      )}
    </div>
  );
};

// ==================== 新建评审轮次抽屉（优化版）====================
const CreateRoundDrawer = ({ isOpen, onClose, onCreate, competitions, showToast }) => {
  const [formData, setFormData] = useState({
    roundName: '初审',
    competition: '',
    roundOrder: 1,
    startTime: '',
    endTime: '',
    reviewerCount: 3,
    allowRepeat: false,
    remark: ''
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        roundName: '初审',
        competition: competitions[0] || '',
        roundOrder: 1,
        startTime: '',
        endTime: '',
        reviewerCount: 3,
        allowRepeat: false,
        remark: ''
      });
    }
  }, [isOpen, competitions]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onCreate(formData);
    showToast('评审轮次创建成功', 'success');
    onClose();
  };

  return (
    <>
      <div className={DRAWER_STYLES.overlay} onClick={onClose} />
      <div className={DRAWER_STYLES.container}>
        <div className={DRAWER_STYLES.header}>
          <h3 className={TYPOGRAPHY.sectionTitle}>新建评审轮次</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className={DRAWER_STYLES.content}>
          <div className={DRAWER_STYLES.section}>
            <h4 className={DRAWER_STYLES.sectionTitle}>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              基础信息
            </h4>
            <div className="space-y-4">
              <div>
                <label className={FORM_STYLES.label}>轮次名称</label>
                <select
                  value={formData.roundName}
                  onChange={(e) => setFormData({ ...formData, roundName: e.target.value })}
                  className={FORM_STYLES.input}
                >
                  <option value="初审">初审</option>
                  <option value="复审">复审</option>
                  <option value="决赛">决赛</option>
                </select>
              </div>
              <div>
                <label className={FORM_STYLES.label}>所属赛事</label>
                <select
                  value={formData.competition}
                  onChange={(e) => setFormData({ ...formData, competition: e.target.value })}
                  className={FORM_STYLES.input}
                >
                  {competitions.map((comp, index) => (
                    <option key={index} value={comp}>{comp}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={FORM_STYLES.label}>轮次顺序</label>
                <input
                  type="number"
                  min={1}
                  value={formData.roundOrder}
                  onChange={(e) => setFormData({ ...formData, roundOrder: parseInt(e.target.value) || 1 })}
                  className={FORM_STYLES.input}
                />
              </div>
            </div>
          </div>

          <div className={DRAWER_STYLES.section}>
            <h4 className={DRAWER_STYLES.sectionTitle}>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              时间配置
            </h4>
            <div className="space-y-4">
              <div>
                <label className={FORM_STYLES.label}>开始时间</label>
                <input
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className={FORM_STYLES.input}
                />
              </div>
              <div>
                <label className={FORM_STYLES.label}>截止时间</label>
                <input
                  type="datetime-local"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className={FORM_STYLES.input}
                />
              </div>
            </div>
          </div>

          <div className={DRAWER_STYLES.section}>
            <h4 className={DRAWER_STYLES.sectionTitle}>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              评审规则
            </h4>
            <div className="space-y-4">
              <div>
                <label className={FORM_STYLES.label}>每个作品需要评委数量</label>
                <input
                  type="number"
                  min={1}
                  value={formData.reviewerCount}
                  onChange={(e) => setFormData({ ...formData, reviewerCount: parseInt(e.target.value) || 1 })}
                  className={FORM_STYLES.input}
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <label className={FORM_STYLES.label}>是否允许重复评审</label>
                <button
                  onClick={() => setFormData({ ...formData, allowRepeat: !formData.allowRepeat })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.allowRepeat ? 'bg-primary' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.allowRepeat ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className={DRAWER_STYLES.section}>
            <h4 className={DRAWER_STYLES.sectionTitle}>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              备注说明
            </h4>
            <textarea
              value={formData.remark}
              onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
              placeholder="请输入备注说明..."
              rows={3}
              className={FORM_STYLES.textarea}
            />
          </div>
        </div>

        <div className={DRAWER_STYLES.footer}>
          <div className="flex items-center justify-end gap-3">
            <button onClick={onClose} className={BUTTON_STYLES.secondary}>
              取消
            </button>
            <button
              onClick={handleSubmit}
              className={BUTTON_STYLES.primary}
            >
              创建轮次
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// ==================== 分配评审弹窗（优化版）====================
const AssignReviewerModal = ({ work, isOpen, onClose, onAssign, showToast }) => {
  const [selectedReviewers, setSelectedReviewers] = useState([]);

  const availableReviewers = [
    { id: 1, name: '王教授', organization: '清华大学计算机系' },
    { id: 2, name: '李研究员', organization: '中科院自动化所' },
    { id: 3, name: '张博士', organization: '北京大学AI研究院' },
    { id: 4, name: '陈专家', organization: '华为AI实验室' },
    { id: 5, name: '刘教授', organization: '浙江大学计算机学院' },
    { id: 6, name: '赵研究员', organization: '腾讯AI Lab' },
    { id: 7, name: '钱教授', organization: '上海交大计算机系' },
  ];

  useEffect(() => {
    if (isOpen && work?.reviewers) {
      const existingIds = work.reviewers.map((r, idx) => idx + 1);
      setSelectedReviewers(existingIds);
    }
  }, [isOpen, work]);

  if (!isOpen || !work) return null;

  const handleToggleReviewer = (reviewerId) => {
    if (selectedReviewers.includes(reviewerId)) {
      setSelectedReviewers(prev => prev.filter(id => id !== reviewerId));
    } else {
      setSelectedReviewers(prev => [...prev, reviewerId]);
    }
  };

  const handleSave = () => {
    onAssign(work.id, selectedReviewers);
    showToast('评委分配成功', 'success');
    setSelectedReviewers([]);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-50">
        <div className={DRAWER_STYLES.header}>
          <h3 className={TYPOGRAPHY.sectionTitle}>分配评审</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="mb-5 p-4 bg-gray-50 rounded-xl">
            <span className={TYPOGRAPHY.label}>当前作品</span>
            <p className="text-sm font-semibold text-gray-800 mt-2">{work.workName}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500">当前轮次：</span>
              <RoundTag round={work.currentRound} />
            </div>
          </div>

          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <span className={TYPOGRAPHY.label}>可选评委</span>
              <span className="text-xs text-gray-500">已选择 {selectedReviewers.length} 人</span>
            </div>
            <div className="border border-gray-200 rounded-xl max-h-64 overflow-y-auto">
              {availableReviewers.map(reviewer => (
                <label
                  key={reviewer.id}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedReviewers.includes(reviewer.id)}
                    onChange={() => handleToggleReviewer(reviewer.id)}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{reviewer.name}</p>
                    <p className="text-xs text-gray-500">{reviewer.organization}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className={DRAWER_STYLES.footer}>
          <div className="flex items-center justify-end gap-3">
            <button onClick={onClose} className={BUTTON_STYLES.secondary}>
              取消
            </button>
            <button
              onClick={handleSave}
              disabled={selectedReviewers.length === 0}
              className={`${BUTTON_STYLES.primary} ${selectedReviewers.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              保存分配
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// ==================== 查看进度弹窗（优化版）====================
const ProgressModal = ({ work, isOpen, onClose }) => {
  if (!isOpen || !work) return null;

  const progressPercent = work.totalReviewers > 0
    ? Math.round((work.completedReviewers / work.totalReviewers) * 100)
    : 0;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50">
        <div className={DRAWER_STYLES.header}>
          <h3 className={TYPOGRAPHY.sectionTitle}>评审进度</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="mb-5">
            <p className="text-sm font-semibold text-gray-800">{work.workName}</p>
            <p className="text-xs text-gray-500 mt-1">{work.teamName}</p>
          </div>

          <div className="mb-5">
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-gray-600">总体进度</span>
              <span className="font-semibold text-gray-800">{work.completedReviewers}/{work.totalReviewers}</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
            <p className="text-xs text-gray-500 mt-2">{progressPercent}% 已完成</p>
          </div>

          <div className="space-y-2">
            {work.reviewers?.map((reviewer, index) => (
              <div key={index} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-700">{reviewer.name}</span>
                <StatusTag status={reviewer.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 rounded-b-2xl">
          <button onClick={onClose} className="w-full px-4 py-2.5 text-sm text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors">
            关闭
          </button>
        </div>
      </div>
    </>
  );
};

// ==================== 详情抽屉（优化版）====================
const DetailDrawer = ({ work, isOpen, onClose }) => {
  if (!isOpen || !work) return null;

  const progressPercent = work.totalReviewers > 0
    ? Math.round((work.completedReviewers / work.totalReviewers) * 100)
    : 0;

  return (
    <>
      <div className={DRAWER_STYLES.overlay} onClick={onClose} />
      <div className={DRAWER_STYLES.container}>
        <div className={DRAWER_STYLES.header}>
          <h3 className={TYPOGRAPHY.sectionTitle}>评审详情</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className={DRAWER_STYLES.content}>
          <div className={DRAWER_STYLES.section}>
            <h4 className={DRAWER_STYLES.sectionTitle}>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              基础信息
            </h4>
            <div className={DRAWER_STYLES.infoBox}>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">作品名称</span>
                <span className="text-sm font-semibold text-gray-800">{work.workName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">团队名称</span>
                <span className="text-sm text-gray-700">{work.teamName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">所属赛事</span>
                <span className="text-sm text-gray-700">{work.competitionName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">当前轮次</span>
                <RoundTag round={work.currentRound} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">当前状态</span>
                <StatusTag status={work.status} />
              </div>
            </div>
          </div>

          <div className={DRAWER_STYLES.section}>
            <h4 className={DRAWER_STYLES.sectionTitle}>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              评委分配
            </h4>
            <div className="space-y-2">
              {work.reviewers?.map((reviewer, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{reviewer.name}</p>
                    <p className="text-xs text-gray-500">{reviewer.organization}</p>
                  </div>
                  <StatusTag status={reviewer.status} />
                </div>
              )) || <p className="text-sm text-gray-400">暂无评委分配</p>}
            </div>
          </div>

          <div className={DRAWER_STYLES.section}>
            <h4 className={DRAWER_STYLES.sectionTitle}>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              评分进度
            </h4>
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-gray-600">已完成评分</span>
                <span className="font-semibold text-gray-800">{work.completedReviewers}/{work.totalReviewers}</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
              </div>
              <p className="text-xs text-gray-500 mt-2">{progressPercent}% 已完成</p>
            </div>
          </div>

          <div className={DRAWER_STYLES.section}>
            <h4 className={DRAWER_STYLES.sectionTitle}>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              截止时间
            </h4>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-800">{work.deadline}</p>
            </div>
          </div>
        </div>

        <div className={DRAWER_STYLES.footer}>
          <button onClick={onClose} className="w-full px-4 py-2.5 text-sm text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors">
            关闭
          </button>
        </div>
      </div>
    </>
  );
};

// ==================== 主组件 ====================
const AdminReviews = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [competitionFilter, setCompetitionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [isCreateRoundOpen, setIsCreateRoundOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const [works, setWorks] = useState([
    {
      id: 1,
      workName: '基于大语言模型的智能助手',
      teamName: 'AI创新先锋队',
      competitionName: '2024年梧桐·鸿鹄人工智能应用创新大赛',
      currentRound: '初审',
      totalReviewers: 3,
      completedReviewers: 2,
      status: '评审中',
      deadline: '2024-12-20 23:59',
      reviewers: [
        { name: '王教授', organization: '清华大学计算机系', status: '已提交' },
        { name: '李研究员', organization: '中科院自动化所', status: '已提交' },
        { name: '张博士', organization: '北京大学AI研究院', status: '评分中' }
      ]
    },
    {
      id: 2,
      workName: '医疗影像智能诊断系统',
      teamName: '智慧医疗小组',
      competitionName: '2024年梧桐·鸿鹄人工智能应用创新大赛',
      currentRound: '初审',
      totalReviewers: 3,
      completedReviewers: 0,
      status: '待分配',
      deadline: '2024-12-20 23:59',
      reviewers: []
    },
    {
      id: 3,
      workName: 'AI教育辅助平台',
      teamName: '智慧未来小组',
      competitionName: '2024年海淀区区县赛',
      currentRound: '复审',
      totalReviewers: 5,
      completedReviewers: 5,
      status: '已完成',
      deadline: '2024-12-15 23:59',
      reviewers: [
        { name: '王教授', organization: '清华大学计算机系', status: '已提交' },
        { name: '李研究员', organization: '中科院自动化所', status: '已提交' },
        { name: '张博士', organization: '北京大学AI研究院', status: '已提交' },
        { name: '陈专家', organization: '华为AI实验室', status: '已提交' },
        { name: '刘教授', organization: '浙江大学计算机学院', status: '已提交' }
      ]
    },
    {
      id: 4,
      workName: '智能交通流量预测系统',
      teamName: '交通大脑团队',
      competitionName: '2024年北京大学校园赛',
      currentRound: '决赛',
      totalReviewers: 7,
      completedReviewers: 4,
      status: '评审中',
      deadline: '2024-12-25 23:59',
      reviewers: [
        { name: '王教授', organization: '清华大学计算机系', status: '已提交' },
        { name: '李研究员', organization: '中科院自动化所', status: '已提交' },
        { name: '张博士', organization: '北京大学AI研究院', status: '评分中' },
        { name: '陈专家', organization: '华为AI实验室', status: '已提交' },
        { name: '刘教授', organization: '浙江大学计算机学院', status: '未开始' },
        { name: '赵研究员', organization: '腾讯AI Lab', status: '评分中' },
        { name: '钱教授', organization: '上海交大计算机系', status: '未开始' }
      ]
    },
    {
      id: 5,
      workName: '创意AI绘画工具',
      teamName: '艺术科技工作室',
      competitionName: '2024年清华大学校园赛',
      currentRound: '初审',
      totalReviewers: 3,
      completedReviewers: 1,
      status: '评审中',
      deadline: '2024-12-20 23:59',
      reviewers: [
        { name: '王教授', organization: '清华大学计算机系', status: '已提交' },
        { name: '李研究员', organization: '中科院自动化所', status: '未开始' },
        { name: '张博士', organization: '北京大学AI研究院', status: '未开始' }
      ]
    }
  ]);

  const competitions = useMemo(() => {
    return [...new Set(works.map(w => w.competitionName))];
  }, [works]);

  const filteredWorks = useMemo(() => {
    return works.filter(work => {
      const searchLower = searchQuery.toLowerCase();
      const matchSearch =
        work.workName.toLowerCase().includes(searchLower) ||
        work.teamName.toLowerCase().includes(searchLower);
      const matchCompetition = competitionFilter === 'all' || work.competitionName === competitionFilter;
      const matchStatus = statusFilter === 'all' || work.status === statusFilter;
      return matchSearch && matchCompetition && matchStatus;
    });
  }, [works, searchQuery, competitionFilter, statusFilter]);

  const handleViewDetail = (work) => {
    setSelectedWork(work);
    setIsDetailOpen(true);
  };

  const handleAssign = (work) => {
    setSelectedWork(work);
    setIsAssignOpen(true);
  };

  const handleViewProgress = (work) => {
    setSelectedWork(work);
    setIsProgressOpen(true);
  };

  const handleAssignReviewers = (workId, reviewerIds) => {
    setWorks(prev => prev.map(w => {
      if (w.id === workId) {
        const newStatus = reviewerIds.length > 0 ? '评审中' : '待分配';
        return {
          ...w,
          totalReviewers: reviewerIds.length,
          completedReviewers: 0,
          status: newStatus,
          reviewers: reviewerIds.map(id => ({
            name: ['王教授', '李研究员', '张博士', '陈专家', '刘教授', '赵研究员', '钱教授'][id - 1],
            organization: ['清华大学计算机系', '中科院自动化所', '北京大学AI研究院', '华为AI实验室', '浙江大学计算机学院', '腾讯AI Lab', '上海交大计算机系'][id - 1],
            status: '未开始'
          }))
        };
      }
      return w;
    }));
  };

  const handleCreateRound = (formData) => {
    console.log('创建评审轮次:', formData);
  };

  return (
    <div className={`${SPACING.section} pb-8`}>
      {/* Toast 通知 */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* 页面标题区 */}
      <div>
        <h2 className={TYPOGRAPHY.pageTitle}>评审管理</h2>
        <p className={TYPOGRAPHY.pageSubtitle}>分配评审任务，跟踪评分进度与当前轮次</p>
      </div>

      {/* 顶部操作区 */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <div>
            <label className={TYPOGRAPHY.label}>搜索作品/团队</label>
            <div className="relative mt-2">
              <input
                type="text"
                placeholder="请输入搜索内容..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${FORM_STYLES.input} pl-10 w-full sm:w-64`}
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div>
            <label className={TYPOGRAPHY.label}>赛事筛选</label>
            <select
              value={competitionFilter}
              onChange={(e) => setCompetitionFilter(e.target.value)}
              className={`${FORM_STYLES.select} mt-2 min-w-[180px]`}
            >
              <option value="all">全部赛事</option>
              {competitions.map((comp, index) => (
                <option key={index} value={comp}>{comp}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={TYPOGRAPHY.label}>评审状态</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`${FORM_STYLES.select} mt-2 min-w-[120px]`}
            >
              <option value="all">全部状态</option>
              <option value="待分配">待分配</option>
              <option value="评审中">评审中</option>
              <option value="已完成">已完成</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => setIsCreateRoundOpen(true)}
          className={BUTTON_STYLES.primary}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          新建评审轮次
        </button>
      </div>

      {/* 评审任务列表区 */}
      <div className={TABLE_STYLES.container}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={TABLE_STYLES.header}>
              <tr>
                <th className={TABLE_STYLES.headerCell}>作品名称</th>
                <th className={TABLE_STYLES.headerCell}>团队名称</th>
                <th className={TABLE_STYLES.headerCell}>所属赛事</th>
                <th className={TABLE_STYLES.headerCell}>当前轮次</th>
                <th className={TABLE_STYLES.headerCell}>评委进度</th>
                <th className={TABLE_STYLES.headerCell}>评审状态</th>
                <th className={TABLE_STYLES.headerCell}>截止时间</th>
                <th className={TABLE_STYLES.headerCell}>操作</th>
              </tr>
            </thead>
            <tbody className={TABLE_STYLES.divider}>
              {filteredWorks.map((work) => (
                <tr key={work.id} className={TABLE_STYLES.row}>
                  <td className={TABLE_STYLES.cell}>
                    <span className="text-sm font-semibold text-gray-800 line-clamp-1" title={work.workName}>
                      {work.workName}
                    </span>
                  </td>
                  <td className={TABLE_STYLES.cell}>
                    <span className="text-sm text-gray-600">{work.teamName}</span>
                  </td>
                  <td className={TABLE_STYLES.cell}>
                    <span className="text-sm text-gray-600 line-clamp-1" title={work.competitionName}>
                      {work.competitionName}
                    </span>
                  </td>
                  <td className={TABLE_STYLES.cell}>
                    <RoundTag round={work.currentRound} />
                  </td>
                  <td className={TABLE_STYLES.cell}>
                    <ReviewerProgress completed={work.completedReviewers} total={work.totalReviewers} />
                  </td>
                  <td className={TABLE_STYLES.cell}>
                    <StatusTag status={work.status} />
                  </td>
                  <td className={TABLE_STYLES.cell}>
                    <span className="text-sm text-gray-600">{work.deadline}</span>
                  </td>
                  <td className={TABLE_STYLES.cell}>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetail(work)}
                        className={BUTTON_STYLES.secondaryBg}
                      >
                        查看详情
                      </button>
                      {work.status === '待分配' ? (
                        <button
                          onClick={() => handleAssign(work)}
                          className={BUTTON_STYLES.primary}
                        >
                          分配评审
                        </button>
                      ) : (
                        <ActionDropdown
                          work={work}
                          onViewDetail={handleViewDetail}
                          onAssign={handleAssign}
                          onViewProgress={handleViewProgress}
                          showToast={showToast}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredWorks.length === 0 && (
          <div className="py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500">暂无符合条件的评审任务</p>
          </div>
        )}
      </div>

      {/* 组件实例 */}
      <DetailDrawer
        work={selectedWork}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />

      <AssignReviewerModal
        work={selectedWork}
        isOpen={isAssignOpen}
        onClose={() => setIsAssignOpen(false)}
        onAssign={handleAssignReviewers}
        showToast={showToast}
      />

      <ProgressModal
        work={selectedWork}
        isOpen={isProgressOpen}
        onClose={() => setIsProgressOpen(false)}
      />

      <CreateRoundDrawer
        isOpen={isCreateRoundOpen}
        onClose={() => setIsCreateRoundOpen(false)}
        onCreate={handleCreateRound}
        competitions={competitions}
        showToast={showToast}
      />
    </div>
  );
};

export default AdminReviews;
