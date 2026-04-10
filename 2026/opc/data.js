// Policy Data
const policies = [
  {
    id: 'p1',
    title: '广东省支持人工智能OPC创新发展行动方案',
    region: '广东省',
    level: 'provincial',
    publishDate: '2026-01-01',
    updateDate: '2026-04-05',
    summary: '到2028年建成百个OPC生态社区，培育千家标杆企业，集聚万名创新创业人才',
    keyPoints: [
      '通过"算力券"为初创期OPC提供算力支持',
      '优化"开放广东"平台，推动重点领域数据资源开放',
      '建设公共模型服务平台，提供免费模型接口',
      '打造OPC生态社区，提供低成本独立办公区',
      '推出"人才贷、研发贷、成果贷、算力贷"等专属信贷产品'
    ],
    supportAmount: '累计最高2500万元',
    category: 'funding'
  },
  {
    id: 'p2',
    title: '深圳市打造人工智能OPC创业生态引领地行动计划',
    region: '深圳市',
    level: 'city',
    publishDate: '2026-01-01',
    updateDate: '2026-04-05',
    summary: '构建"一张办公桌、一间办公室、一层办公楼"全周期办公体系',
    keyPoints: [
      '最长36个月过渡性住房（租金为市场价60%）',
      '每月1250元安居补贴',
      '鲲鹏青年项目最高5万元奖励+100万元研发资助',
      '最高1000万元"训力券"、200万元"模型券"',
      '政务领域AI产品最高500万元资助'
    ],
    supportAmount: '累计最高2000万元',
    contact: '深圳市科技创新委员会',
    category: 'talent'
  },
  {
    id: 'p3',
    title: '成都市支持人工智能OPC创新发展若干措施',
    region: '成都市',
    level: 'city',
    publishDate: '2026-02-01',
    updateDate: '2026-04-05',
    summary: '先行布局10家以上高水平OPC社区，打造全国OPC创新发展高地',
    keyPoints: [
      '算力券补贴：不超过算力购买费用的60%，每年最高500万元',
      '模型券补贴：按Token消耗量的30%，最高100万元',
      '国家级孵化器认定：最高200万元一次性补助',
      '提供低成本办公空间和共享设施'
    ],
    supportAmount: '累计最高2500万元',
    contact: '成都市科技局',
    category: 'computing'
  },
  {
    id: 'p4',
    title: '合肥市人工智能OPC扶持政策',
    region: '合肥市',
    level: 'city',
    publishDate: '2026-01-15',
    updateDate: '2026-04-05',
    summary: '模立方OPC社区提供全方位支持，打造AI创业高地',
    keyPoints: [
      '模立方OPC社区2000平方米免租开放工位',
      '仅收100元/月水电物业费',
      '免费算力额度+算力券补贴',
      '最长6个月免费人才驿站',
      '每年最高3.6万元租房补贴'
    ],
    supportAmount: '免费工位+算力支持',
    contact: '合肥市科技局',
    category: 'space'
  },
  {
    id: 'p5',
    title: '苏州市加快建设"人工智能+"城市若干措施',
    region: '苏州市',
    level: 'city',
    publishDate: '2026-01-01',
    updateDate: '2026-04-05',
    summary: '建设人工智能产业园和OPC社区，提供全方位支持',
    keyPoints: [
      '人工智能产业园：标杆类200万元、特色类100万元建设补助',
      'OPC社区：算力券最高100%支持（20万元）',
      '语料券支持（10万元）',
      '人工智能发展驱动中心：最高6000万元资金支持'
    ],
    supportAmount: '最高6000万元',
    contact: '苏州市科技局',
    category: 'funding'
  },
  {
    id: 'p6',
    title: '上海临港新片区人工智能OPC支持政策',
    region: '上海临港',
    level: 'city',
    publishDate: '2026-04-01',
    updateDate: '2026-04-05',
    summary: '提供办公场地、算力补贴、跨境服务等全方位支持',
    keyPoints: [
      '办公场地：最长3年免租期',
      '算力补贴：最高80%补贴，高校学生创办额外20%',
      '免费算力：所有OPC可直接申领半个月100卡时免费算力',
      '技术创新奖励：AI工具上架国际开源社区，年度最高100万元',
      '跨境服务：不超过2年跨境专线补贴'
    ],
    supportAmount: '年度最高30万元算力补贴',
    contact: '临港新片区管委会',
    category: 'computing'
  },
  {
    id: 'p7',
    title: '武汉市支持人工智能OPC创新发展若干措施',
    region: '武汉市',
    level: 'city',
    publishDate: '2026-01-01',
    updateDate: '2026-04-05',
    summary: '认定OPC社区，提供多维度支持',
    keyPoints: [
      'OPC社区核心办公面积不低于3000平方米',
      '入驻AI相关企业不少于20家，其中OPC不少于10家',
      '设立专项投资基金，入驻金融机构不少于2家',
      '每年组织投融资路演不少于5场',
      '每年为OPC挖掘不少于20个应用场景'
    ],
    supportAmount: '根据认定标准提供支持',
    contact: '武汉市科技创新局',
    applicationUrl: 'http://kjj.wuhan.gov.cn',
    category: 'computing'
  },
  {
    id: 'p8',
    title: '青岛市人工智能OPC政策清单',
    region: '青岛市',
    level: 'city',
    publishDate: '2026-01-01',
    updateDate: '2026-04-05',
    summary: '发布两批OPC政策清单，涵盖创业空间、启动扶持、场景供给等10条措施',
    keyPoints: [
      '创业空间支持：提供免费或低成本办公空间',
      '启动扶持：创业启动资金支持',
      '场景供给：开放政府和企业应用场景',
      '投融资支持：设立专项投资基金'
    ],
    supportAmount: '根据项目情况确定',
    contact: '青岛市科技局',
    category: 'funding'
  }
];

// Park Data
const parks = [
  {
    id: 'pk1',
    name: '深圳前海OPC社区',
    city: '深圳',
    address: '前海深港现代服务业合作区',
    type: 'OPC生态社区',
    area: '5000平方米',
    features: [
      '低成本独立办公区',
      '灵活共享工位',
      'AI算力中心',
      '模型服务平台',
      '投融资对接'
    ],
    subsidies: [
      '最长36个月过渡性住房（租金为市场价60%）',
      '每月1250元安居补贴',
      '最高1000万元训力券'
    ],
    applicationProcess: [
      '线上咨询/官网申请',
      '材料提交（BP+简历等）',
      '评审初筛',
      '面试/路演',
      '签约入驻',
      '资源对接'
    ],
    contact: '前海管理局',
    email: 'chenli@qh.sz.gov.cn',
    phone: '0755-88105087'
  },
  {
    id: 'pk2',
    name: '成都天府软件π立方',
    city: '成都',
    address: '天府软件园',
    type: 'OPC生态社区',
    area: '3000平方米',
    features: [
      '免租开放工位',
      'AI算力支持',
      '模型服务平台',
      '投融资服务',
      '人才公寓'
    ],
    subsidies: [
      '算力券补贴：不超过算力购买费用的60%，每年最高500万元',
      '模型券补贴：按Token消耗量的30%，最高100万元'
    ],
    applicationProcess: [
      '官网/二维码申请',
      '材料审核',
      '面试评估',
      '签约入驻'
    ],
    contact: '成都天府软件园',
    phone: '028-86031523'
  },
  {
    id: 'pk3',
    name: '合肥模立方OPC社区',
    city: '合肥',
    address: '合肥市高新区',
    type: 'OPC生态社区',
    area: '2000平方米',
    features: [
      '免租开放工位',
      '免费算力额度',
      '共享会议室',
      '创业辅导',
      '投融资对接'
    ],
    subsidies: [
      '2000平方米免租开放工位',
      '仅收100元/月水电物业费',
      '免费算力额度+算力券补贴',
      '最长6个月免费人才驿站'
    ],
    applicationProcess: [
      '关注"模立方"官方公众号',
      '线上提交申请',
      '资格审核',
      '签约入驻'
    ],
    contact: '合肥市科技局'
  },
  {
    id: 'pk4',
    name: '武汉光谷OPC社区',
    city: '武汉',
    address: '武汉东湖高新区',
    type: 'OPC生态社区',
    area: '3000平方米',
    features: [
      '独立办公空间',
      '共享工位',
      'AI算力中心',
      '投融资服务',
      '场景对接'
    ],
    subsidies: [
      '低成本办公空间',
      '算力券支持',
      '场景开放支持',
      '投融资对接'
    ],
    applicationProcess: [
      '武汉市科技创新局门户网站在线申报',
      '材料提交',
      '评审认定',
      '签约入驻'
    ],
    contact: '武汉市科技创新局',
    website: 'http://kjj.wuhan.gov.cn'
  },
  {
    id: 'pk5',
    name: '南京栖霞OPC社区',
    city: '南京',
    address: '南京栖霞区',
    type: 'OPC生态社区',
    area: '2500平方米',
    features: [
      '免费算力资源',
      'API调用补贴',
      '共享办公空间',
      '创业辅导',
      '投融资对接'
    ],
    subsidies: [
      '免费算力资源',
      'API调用补贴',
      '低成本办公空间'
    ],
    applicationProcess: [
      '栖智OPC云平台在线申请',
      '材料审核',
      '面试评估',
      '签约入驻'
    ],
    contact: '南京栖霞区科技局'
  },
  {
    id: 'pk6',
    name: '苏州人工智能产业园',
    city: '苏州',
    address: '苏州工业园区',
    type: '人工智能产业园',
    area: '10000平方米',
    features: [
      '独立办公楼',
      '共享办公区',
      'AI算力中心',
      '数据中心',
      '投融资服务'
    ],
    subsidies: [
      '标杆类200万元建设补助',
      '特色类100万元建设补助',
      '算力券最高100%支持（20万元）',
      '语料券（10万元）'
    ],
    applicationProcess: [
      '线上申请',
      '材料提交',
      '评审认定',
      '签约入驻'
    ],
    contact: '苏州市科技局'
  },
  {
    id: 'pk7',
    name: '上海临港OPC社区',
    city: '上海临港',
    address: '临港新片区',
    type: 'OPC生态社区',
    area: '4000平方米',
    features: [
      '最长3年免租期',
      '免费算力额度',
      '跨境专线',
      '共享办公区',
      '投融资服务'
    ],
    subsidies: [
      '办公场地：最长3年免租期',
      '算力补贴：最高80%，年度最高30万元',
      '免费算力：半个月100卡时',
      '跨境服务：不超过2年跨境专线补贴'
    ],
    applicationProcess: [
      '线上申请',
      '材料审核',
      '面试评估',
      '签约入驻'
    ],
    contact: '临港新片区管委会'
  },
  {
    id: 'pk8',
    name: '深圳龙岗OPC社区',
    city: '深圳',
    address: '深圳龙岗区',
    type: 'OPC生态社区',
    area: '3500平方米',
    features: [
      '低成本办公空间',
      'AI算力中心',
      '模型服务平台',
      '投融资对接',
      '人才公寓'
    ],
    subsidies: [
      '低成本办公空间',
      '最高1000万元训力券',
      '200万元模型券',
      '人才安居补贴'
    ],
    applicationProcess: [
      '深圳市产业用地供需服务平台在线申请',
      '材料提交',
      '评审认定',
      '签约入驻'
    ],
    contact: '龙岗区科技局',
    website: 'https://pnr.sz.gov.cn/d-cyyf/home.jsp'
  }
];

// Process Steps
const processSteps = [
  {
    icon: 'file',
    title: '在线申请',
    description: '通过官网或公众号提交入驻申请，上传商业计划书、团队简历等基础材料',
    details: ['准备商业计划书（BP）', '整理核心团队简历', '填写线上申请表', '提交项目Demo或研发方案']
  },
  {
    icon: 'search',
    title: '资质审核',
    description: '园区管理方对申请材料进行初步审核，评估项目符合度和入驻资格',
    details: ['材料完整性审核', '项目技术评估', '团队背景调查', '符合度评分']
  },
  {
    icon: 'mic',
    title: '面试/路演',
    description: '通过初筛的项目进入面试或路演环节，展示项目亮点和发展潜力',
    details: ['项目路演展示', '专家问答环节', '商业模式验证', '发展规划评估']
  },
  {
    icon: 'handshake',
    title: '签署协议',
    description: '通过评审后与园区签署入驻协议，明确双方权利义务',
    details: ['入驻协议签署', '优惠政策确认', '服务内容约定', '考核指标明确']
  },
  {
    icon: 'rocket',
    title: '入驻办公',
    description: '完成入驻手续，开始享受园区提供的各项服务和资源支持',
    details: ['办公空间分配', '算力资源开通', '政策补贴申请', '资源对接服务']
  }
];

// Update Log
const updateLog = [
  {
    date: '2026-04-05',
    content: '新增上海临港新片区人工智能OPC支持政策，更新深圳市政策细则',
    isNew: true
  },
  {
    date: '2026-04-03',
    content: '更新成都市OPC政策，新增算力券补贴细则',
    isNew: false
  },
  {
    date: '2026-04-01',
    content: '新增武汉市OPC社区认定标准，更新入驻流程',
    isNew: false
  },
  {
    date: '2026-03-28',
    content: '更新合肥市模立方OPC社区信息，新增免费工位申请',
    isNew: false
  },
  {
    date: '2026-03-25',
    content: '新增青岛市人工智能OPC政策清单',
    isNew: false
  }
];

// Category Labels
const categoryLabels = {
  funding: '资金支持',
  tax: '税收优惠',
  talent: '人才政策',
  space: '空间支持',
  computing: '算力支持',
  data: '数据支持'
};

const levelLabels = {
  national: '国家级',
  provincial: '省级',
  city: '市级'
};
