// 后台统一样式系统 - 产品级设计规范
// 所有后台页面共享的样式常量

// ==================== 卡片样式系统 ====================
export const CARD_STYLES = {
  // 基础卡片 - 统一圆角16px、轻阴影、padding 24px
  base: 'bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100',
  // 标准padding
  padding: 'p-6',
  // 大padding
  paddingLarge: 'p-8',
  // hover效果 - 轻微浮起
  hover: 'hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300',
  // 可点击卡片
  clickable: 'cursor-pointer hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:border-primary/20 transition-all duration-300',
};

// ==================== 状态标签颜色系统（全局统一）====================
export const STATUS_COLORS = {
  // 草稿 - 灰色
  draft: {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    border: 'border-gray-200',
  },
  // 待处理/待审核/待分配 - 橙色
  pending: {
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    border: 'border-orange-200',
  },
  // 进行中/报名中/已提交 - 蓝色
  processing: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200',
  },
  // 评审中 - 紫色
  reviewing: {
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    border: 'border-purple-200',
  },
  // 成功/已通过/已完成/已公示 - 绿色
  success: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    border: 'border-green-200',
  },
  // 失败/驳回/已结束/已下线 - 红色
  error: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    border: 'border-red-200',
  },
};

// 统一状态标签样式
export const STATUS_TAG_STYLE = 'inline-flex px-2.5 py-1 text-xs font-medium rounded-full';

// ==================== 按钮样式系统（全局统一）====================
export const BUTTON_STYLES = {
  // 主操作按钮 - 紫色主色
  primary: 'px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20 rounded-lg transition-all duration-200 active:scale-95',
  // 次操作按钮 - 灰色描边
  secondary: 'px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-lg transition-all duration-200',
  // 次操作按钮（带浅色背景）
  secondaryBg: 'px-3 py-1.5 text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-all duration-200',
  // 文字按钮
  text: 'text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 px-2 py-1 rounded transition-colors',
  // 危险操作
  danger: 'px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors',
  // 下拉菜单触发
  dropdown: 'flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors',
  // 表格内操作按钮
  tableAction: 'text-sm text-primary hover:text-primary/80 hover:underline transition-colors',
};

// ==================== 间距系统（全局统一）====================
export const SPACING = {
  // 页面模块间距 - 统一32px
  section: 'space-y-8',
  // 大模块间距
  sectionLarge: 'space-y-10',
  // 卡片内标题与内容间距
  titleContent: 'mb-5',
  titleContentLarge: 'mb-6',
  // 卡片之间间距
  cardGap: 'gap-6',
  // 表格行高 - 更舒适
  tableRow: 'py-6',
  // 表格单元格padding
  tableCell: 'px-6 py-5',
  // 元素间距
  element: 'gap-3',
  elementLarge: 'gap-4',
};

// ==================== 文字层级系统（全局统一）====================
export const TYPOGRAPHY = {
  // 页面标题 - 最大字号
  pageTitle: 'text-2xl font-bold text-gray-900 tracking-tight',
  // 页面副标题
  pageSubtitle: 'text-sm text-gray-500 mt-2',
  // 模块标题 - 次级加粗
  sectionTitle: 'text-lg font-semibold text-gray-800',
  // 卡片标题
  cardTitle: 'text-base font-semibold text-gray-800',
  // 小标题
  subTitle: 'text-sm font-medium text-gray-700',
  // 正文
  body: 'text-sm text-gray-600 leading-relaxed',
  // 辅助文字 - 浅色小号
  helper: 'text-xs text-gray-400',
  // 标签文字
  label: 'text-xs font-medium text-gray-500 uppercase tracking-wide',
  // 大数字（统计用）
  statNumber: 'text-3xl font-bold text-gray-900',
  // 趋势文字
  trendUp: 'text-sm font-medium text-green-600',
  trendDown: 'text-sm font-medium text-red-600',
};

// ==================== 表单样式系统 ====================
export const FORM_STYLES = {
  input: 'w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all',
  select: 'px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-white',
  label: 'block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2',
  textarea: 'w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none',
};

// ==================== 表格样式系统 ====================
export const TABLE_STYLES = {
  container: 'bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden',
  header: 'bg-gray-50/80 border-b border-gray-100',
  headerCell: 'px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider',
  row: 'hover:bg-blue-50/40 transition-colors duration-200',
  cell: 'px-6 py-5',
  divider: 'divide-y divide-gray-100',
};

// ==================== 抽屉/弹窗样式系统 ====================
export const DRAWER_STYLES = {
  overlay: 'fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity',
  container: 'fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col',
  header: 'flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-white',
  content: 'flex-1 overflow-y-auto px-6 py-6',
  footer: 'border-t border-gray-100 px-6 py-4 bg-gray-50/80',
  section: 'mb-8',
  sectionTitle: 'text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2',
  infoBox: 'bg-gray-50 rounded-xl p-5 space-y-4',
};

// ==================== Toast/通知样式 ====================
export const TOAST_STYLES = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  info: 'bg-primary text-white',
};

// ==================== 辅助函数：获取状态样式（全局统一）====================
export const getStatusStyle = (status) => {
  const statusMap = {
    // 草稿
    '草稿': STATUS_COLORS.draft,
    // 待处理
    '待审核': STATUS_COLORS.pending,
    '待分配': STATUS_COLORS.pending,
    '待补件': STATUS_COLORS.pending,
    // 进行中
    '进行中': STATUS_COLORS.processing,
    '报名中': STATUS_COLORS.processing,
    '已提交': STATUS_COLORS.processing,
    // 评审中
    '评审中': STATUS_COLORS.reviewing,
    '已评分': STATUS_COLORS.reviewing,
    // 成功
    '已通过': STATUS_COLORS.success,
    '已公示': STATUS_COLORS.success,
    '已完成': STATUS_COLORS.success,
    '已发布': STATUS_COLORS.success,
    // 失败
    '已驳回': STATUS_COLORS.error,
    '已结束': STATUS_COLORS.error,
    '已下线': STATUS_COLORS.error,
  };
  return statusMap[status] || STATUS_COLORS.draft;
};

// ==================== 状态标签样式字符串（用于手动构建）====================
export const getStatusTagClass = (status) => {
  const colors = getStatusStyle(status);
  return `${STATUS_TAG_STYLE} ${colors.bg} ${colors.text}`;
};