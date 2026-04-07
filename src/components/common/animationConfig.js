// ============================================
// 统一动效配置常量
// ============================================

// 核心缓动函数 - 优雅、克制的曲线
export const EASING = {
  smooth: [0.22, 1, 0.36, 1],
  enter: [0.25, 0.1, 0.25, 1],
  exit: [0.4, 0, 1, 1],
  button: [0.4, 0, 0.2, 1],
};

export const DURATION = {
  pageEnter: 0.4,
  pageExit: 0.2,
  sectionEnter: 0.45,
  sectionEnterMobile: 0.35,
  itemEnter: 0.4,
  itemEnterMobile: 0.3,
  hover: 0.2,
  active: 0.15,
  tab: 0.25,
};

export const DISTANCE = {
  pageOffset: 16,
  pageOffsetMobile: 12,
  sectionOffset: 20,
  sectionOffsetMobile: 16,
  itemOffset: 16,
  itemOffsetMobile: 12,
  cardLift: 4,
};

export const STAGGER = {
  default: 0.08,
  mobile: 0.06,
  fast: 0.05,
};

// 页面切换动效
export const pageTransitionVariants = {
  initial: { opacity: 0, y: DISTANCE.pageOffset },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.pageEnter, ease: EASING.smooth, when: 'beforeChildren', staggerChildren: STAGGER.default }
  },
  exit: { opacity: 0, transition: { duration: DURATION.pageExit, ease: EASING.exit } }
};

export const pageTransitionMobileVariants = {
  initial: { opacity: 0, y: DISTANCE.pageOffsetMobile },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.pageEnter * 0.85, ease: EASING.smooth, when: 'beforeChildren', staggerChildren: STAGGER.mobile }
  },
  exit: { opacity: 0, transition: { duration: DURATION.pageExit, ease: EASING.exit } }
};

// 区块进入动效
export const sectionVariants = {
  hidden: { opacity: 0, y: DISTANCE.sectionOffset },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.sectionEnter, ease: EASING.smooth } }
};

export const sectionMobileVariants = {
  hidden: { opacity: 0, y: DISTANCE.sectionOffsetMobile },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.sectionEnterMobile, ease: EASING.smooth } }
};

// 列表/卡片容器动效
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: STAGGER.default, delayChildren: 0.1 } }
};

export const containerMobileVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: STAGGER.mobile, delayChildren: 0.05 } }
};

// 列表项/卡片动效
export const itemVariants = {
  hidden: { opacity: 0, y: DISTANCE.itemOffset },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.itemEnter, ease: EASING.smooth } }
};

export const itemMobileVariants = {
  hidden: { opacity: 0, y: DISTANCE.itemOffsetMobile },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.itemEnterMobile, ease: EASING.smooth } }
};

// 标题动效
export const titleVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASING.smooth } }
};

// 淡入动效
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: EASING.enter } }
};

// Tab/切换动效
export const tabContentVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.tab, ease: EASING.smooth } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: EASING.exit } }
};

// 辅助函数
export const useReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const useIsMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

// 统一 CSS 类名
export const ANIMATION_CLASSES = {
  cardHover: 'transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg',
  buttonHover: 'transition-all duration-200 ease-out hover:brightness-105 hover:shadow-md',
  buttonActive: 'active:translate-y-px active:brightness-95',
  linkHover: 'transition-colors duration-200 ease-out',
  imageHover: 'transition-transform duration-300 ease-out hover:scale-[1.02]',
  tabIndicator: 'transition-all duration-250 ease-out',
};
