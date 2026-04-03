const STATUS_CONFIG = {
  // 赛事状态
  '进行中': { color: 'green', hasDot: true, label: '进行中' },
  '报名中': { color: 'purple', hasDot: false, label: '报名中' },
  '即将开始': { color: 'blue', hasDot: false, label: '即将开始' },
  '已结束': { color: 'gray', hasDot: false, label: '已结束' },
  '已截止': { color: 'red', hasDot: false, label: '已截止' },

  // 报名审核状态
  '待审核': { color: 'orange', hasDot: false, label: '待审核' },
  '已通过': { color: 'green', hasDot: false, label: '已通过' },
  '已驳回': { color: 'red', hasDot: false, label: '已驳回' },
  '待补件': { color: 'orange', hasDot: false, label: '待补件' },

  // 作品状态
  '草稿': { color: 'gray', hasDot: false, label: '草稿' },
  '已提交': { color: 'purple', hasDot: false, label: '已提交' },
  '评审中': { color: 'purple', hasDot: true, label: '评审中' },
  '已完成': { color: 'green', hasDot: false, label: '已完成' },
  '已公示': { color: 'green', hasDot: false, label: '已公示' },

  // 评审状态
  '待分配': { color: 'orange', hasDot: false, label: '待分配' },
  '评审中': { color: 'purple', hasDot: true, label: '评审中' },
  '已完成': { color: 'green', hasDot: false, label: '已完成' },
};

const STATUS_COLORS = {
  green: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    dot: 'bg-green-500',
    ring: 'rgba(34, 197, 94, 0.4)',
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    dot: 'bg-purple-500',
    ring: 'rgba(147, 51, 234, 0.4)',
  },
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    dot: 'bg-blue-500',
    ring: 'rgba(59, 130, 246, 0.4)',
  },
  orange: {
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    dot: 'bg-orange-500',
    ring: 'rgba(249, 115, 22, 0.4)',
  },
  red: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    dot: 'bg-red-500',
    ring: 'rgba(239, 68, 68, 0.4)',
  },
  gray: {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    dot: 'bg-gray-400',
    ring: 'rgba(107, 114, 128, 0.4)',
  },
};

export { STATUS_CONFIG, STATUS_COLORS };
