export const competitions = [
  {
    id: 1,
    title: '2024年梧桐·鸿鹄人工智能应用创新大赛',
    date: '2024年10月15日 - 2024年12月31日',
    location: '线上',
    status: '进行中',
    tags: ['人工智能', '创新应用', '全国赛'],
    description: '面向全国的人工智能应用创新大赛，鼓励选手开发具有实际应用价值的AI解决方案。'
  },
  {
    id: 2,
    title: '2024年梧桐·鸿鹄AI算法挑战赛',
    date: '2024年9月1日 - 2024年10月15日',
    location: '线上',
    status: '已结束',
    tags: ['算法', 'AI', '技术挑战'],
    description: '专注于AI算法优化的技术挑战赛，考验选手的算法设计和实现能力。'
  },
  {
    id: 3,
    title: '2025年梧桐·鸿鹄AI+行业应用大赛',
    date: '2025年3月1日 - 2025年5月31日',
    location: '线上+线下',
    status: '即将开始',
    tags: ['行业应用', 'AI', '实战'],
    description: '聚焦AI技术在各行业的实际应用，推动产业数字化转型。'
  }
];

export const getCompetitionById = (id) => {
  return competitions.find(competition => competition.id === parseInt(id));
};