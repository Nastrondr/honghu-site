import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CompetitionDetail = () => {
  const { id } = useParams();
  const [isRewardsOpen, setIsRewardsOpen] = useState(false);
  
  const competition = {
    title: '梧桐·鸿鹄人工智能应用创新大赛-武汉纺织大学赛区',
    status: '进行中',
    organizer: '武汉纺织大学',
    date: '2025.4-2026.3',
    location: '武汉纺织大学',
    description: '面向全国的人工智能应用创新大赛，鼓励选手开发具有实际应用价值的AI解决方案。',
    tracks: [
      {
        name: '个人赛方向',
        description: 'AI在学习/工作/生活应用，包括智能学习助手、工作效率工具、生活服务应用等。'
      },
      {
        name: '团队赛方向',
        description: '12个领域 + 软件硬件结合，包括智能制造、智慧医疗、智慧教育、智慧金融、智慧交通、智慧农业、智慧零售、智慧安防、智慧能源、智慧环保、智慧家居、智慧城市等。'
      }
    ],
    timeline: [
      {
        phase: '报名阶段',
        time: '2024年10月15日 - 2024年11月30日',
        description: '在线提交报名信息和项目初步方案'
      },
      {
        phase: '初赛评审',
        time: '2024年12月1日 - 2024年12月15日',
        description: '专家评审团队对提交的项目进行评审'
      },
      {
        phase: '复赛路演',
        time: '2024年12月20日 - 2024年12月25日',
        description: '晋级项目进行线上路演展示'
      },
      {
        phase: '决赛展示',
        time: '2024年12月31日',
        description: '总决赛及颁奖仪式'
      }
    ],
    rewards: [
      {
        title: '奖项激励',
        description: '设置金奖、银奖、铜奖和最佳创新奖，总奖金池丰厚'
      },
      {
        title: '算力支持',
        description: '为参赛团队提供免费的GPU/CPU算力资源'
      },
      {
        title: '导师辅导',
        description: '邀请行业专家和学术导师提供一对一辅导'
      },
      {
        title: '孵化与合作',
        description: '优秀项目有机会获得孵化支持和投资对接'
      }
    ],
    resources: [
      {
        title: 'GPU/CPU 算力',
        description: '提供高性能GPU集群，支持大规模模型训练和推理'
      },
      {
        title: '数据资源',
        description: '提供多领域高质量数据集，为项目开发提供数据基础'
      },
      {
        title: '鸿鹄学堂课程',
        description: '提供AI技术课程和实战培训，提升参赛选手技术能力'
      },
      {
        title: '实训工具',
        description: '提供开发工具和环境，简化项目开发和部署流程'
      }
    ],
    mentors: [
      {
        name: '张教授',
        title: '清华大学计算机科学与技术系教授',
        direction: '人工智能、机器学习',
        description: '主要研究方向为深度学习和计算机视觉，曾主持多个国家级科研项目'
      },
      {
        name: '李博士',
        title: '字节跳动AI实验室主任',
        direction: '自然语言处理、大语言模型',
        description: '在NLP领域有多年研究经验，发表多篇高水平论文'
      },
      {
        name: '王总监',
        title: '华为云AI产品总监',
        direction: 'AI工程化、云服务',
        description: '专注于AI技术的工程化落地和云服务架构设计'
      },
      {
        name: '陈教授',
        title: '北京大学信息科学技术学院教授',
        direction: '智能推荐、数据挖掘',
        description: '在推荐系统和数据挖掘领域有丰富的研究和实践经验'
      }
    ],
    requirements: {
      personal: [
        {
          title: '参赛资格',
          description: '个人赛面向所有对AI创新有热情的个人，不限年龄、职业、学历'
        },
        {
          title: '作品要求',
          description: '作品必须为个人独立完成，不得团队合作'
        },
        {
          title: '技术要求',
          description: '鼓励使用最新AI技术，确保项目具有创新性和实用性'
        },
        {
          title: '原创要求',
          description: '参赛作品必须为原创，不得抄袭或盗用他人成果'
        }
      ],
      team: [
        {
          title: '团队人数',
          description: '团队赛支持2-5人组队，需指定一名队长'
        },
        {
          title: '成员要求',
          description: '团队成员可以跨学校、跨专业、跨地区组队'
        },
        {
          title: '作品要求',
          description: '作品必须为团队集体创作，体现团队协作精神'
        },
        {
          title: '技术要求',
          description: '鼓励多学科交叉，软件硬件结合，解决实际问题'
        },
        {
          title: '原创要求',
          description: '参赛作品必须为原创，不得抄袭或盗用他人成果'
        }
      ]
    },
    submissionRequirements: [
      {
        title: '视频格式',
        description: 'MP4格式，1080p分辨率，画面清晰，声音清楚'
      },
      {
        title: '时长要求',
        description: '个人赛：3-5分钟；团队赛：5-8分钟'
      },
      {
        title: '文字说明',
        description: '提交500字以内的作品说明，包括项目背景、技术方案、创新点等'
      },
      {
        title: 'AI工具说明',
        description: '详细说明使用的AI工具、框架和模型，包括版本信息'
      },
      {
        title: '算力使用记录',
        description: '提供算力使用情况记录，包括训练时间、资源消耗等'
      },
      {
        title: '提交方式',
        description: '通过大赛官方平台提交，截止日期前完成所有材料提交'
      }
    ],
    evaluationCriteria: [
      {
        title: '创新性',
        description: '项目是否具有新颖的思路和方法，是否有独特的技术创新点'
      },
      {
        title: '实用性',
        description: '项目是否能解决实际问题，是否具有应用价值和市场潜力'
      },
      {
        title: '技术可行性',
        description: '技术方案是否合理可行，是否具有可实现性和可扩展性'
      },
      {
        title: '社会价值',
        description: '项目是否对社会发展、环境保护、民生改善等方面有积极影响'
      }
    ],
    competitionValue: [
      {
        title: '能力培养',
        description: '通过参赛提升AI技术应用能力、创新思维和团队协作能力'
      },
      {
        title: '项目孵化',
        description: '优秀项目有机会获得孵化支持，对接投资资源，实现商业化落地'
      },
      {
        title: '就业机会',
        description: '表现优秀的选手有机会获得企业实习和就业推荐机会'
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧主要内容 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <h1 className="text-[26px] font-semibold text-neutral-800 mb-4 md:mb-0">{competition.title}</h1>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${competition.status === '进行中' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                {competition.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-sm text-neutral-500">比赛时间</p>
                  <p className="text-neutral-800">{competition.date}</p>
                </div>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-sm text-neutral-500">比赛地点</p>
                  <p className="text-neutral-800">{competition.location}</p>
                </div>
              </div>
            </div>
            
            
            
            <div className="mb-20">
              <h2 className="text-xl font-semibold text-neutral-800 mb-4">赛事简介</h2>
              <p className="text-neutral-600">
                本次大赛旨在推动人工智能技术在各行业的应用落地，鼓励创新思维和实践能力。通过比赛平台，参赛选手可以展示自己的技术实力和创新想法，获得专业指导和资源支持。
              </p>
            </div>
            
            
            
            <div className="mb-20">
              <h2 className="text-xl font-semibold text-neutral-800 mb-4">赛程安排</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { phase: '报名阶段', time: '2025.4-5', status: 'completed' },
                  { phase: '初赛', time: '2025.6', status: 'current' },
                  { phase: '决赛', time: '2025.9', status: 'pending' },
                  { phase: '成果支持', time: '2025.10-12', status: 'pending' }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-base font-semibold mb-1 ${item.status === 'current' ? 'text-primary' : item.status === 'completed' ? 'text-neutral-800' : 'text-neutral-500'}`}>
                      {item.phase}
                    </div>
                    <div className="text-sm text-neutral-500 mb-3">
                      {item.time}
                    </div>
                    <div className="h-1.5 rounded-full bg-neutral-200 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${item.status === 'completed' ? 'bg-primary w-full' : item.status === 'current' ? 'bg-primary w-2/3' : 'bg-neutral-200 w-0'}`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            

            
            <div className="mb-20">
              <h2 className="text-xl font-semibold text-neutral-800 mb-4">作品提交要求</h2>
              <div className="space-y-4">
                {competition.submissionRequirements.map((req, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-neutral-800 mb-1">{req.title}</h3>
                      <p className="text-neutral-600">{req.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            

            
            <div className="mb-20">
              <h2 className="text-xl font-semibold text-neutral-800 mb-4">评审标准</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {competition.evaluationCriteria.map((criterion, index) => (
                  <div key={index} className="bg-neutral-50 rounded-xl p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      {index === 0 && (
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )}
                      {index === 1 && (
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {index === 2 && (
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      )}
                      {index === 3 && (
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      )}
                    </div>
                    <h3 className="text-base font-medium text-neutral-800 mb-3">{criterion.title}</h3>
                    <p className="text-neutral-600">{criterion.description}</p>
                  </div>
                ))}
              </div>
            </div>
            

            

            
            <div className="bg-primary/10 rounded-xl p-8 text-center mb-8">
              <h2 className="text-xl font-semibold text-neutral-800 mb-4">立即报名参赛</h2>
              <p className="text-neutral-600 mb-6">
                参与梧桐·鸿鹄人工智能应用创新大赛，展示你的创新才华，开启AI领域的精彩旅程
              </p>
              <Link to="/register-competition" className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors inline-block">
                立即报名
              </Link>
            </div>
            
            <div className="flex justify-center">
              <Link to="/competition-center" className="border border-primary text-primary px-8 py-3 rounded-lg font-medium hover:bg-primary/5 transition-colors text-center">
                返回赛事中心
              </Link>
            </div>
          </div>
        </div>
        
        {/* 右侧边栏 */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* 报名卡 */}
            <div className="bg-[#7463EC] text-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">立即报名</h3>
              <p className="mb-6 text-white/90">报名参赛，参与人工智能应用创新实践</p>
              <Link to="/register-competition" className="w-full bg-white text-[#7463EC] px-6 py-3 rounded-lg font-medium hover:bg-neutral-100 transition-colors mb-4 inline-block text-center">
                立即报名
              </Link>
              <button className="w-full bg-transparent border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
                下载参赛说明
              </button>
            </div>
            
            {/* 参赛指引 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-base font-medium text-neutral-800 mb-4">参赛指引</h3>
              <ul className="space-y-3 text-neutral-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-3 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>填写报名表，选择参赛类型（个人赛/团队赛）</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-3 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>系统自动创建团队（团队赛）</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-3 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>团队赛可在团队大厅补充成员</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-3 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>报名成功后开放赛题数据与作品提交</span>
                </li>
              </ul>
            </div>
            
            {/* 联系方式 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-base font-medium text-neutral-800 mb-4">联系方式</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <p className="text-sm text-neutral-500">联系人</p>
                    <p className="text-neutral-800">张老师</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-sm text-neutral-500">电话</p>
                    <p className="text-neutral-800">010-12345678</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-neutral-500">邮箱</p>
                    <p className="text-neutral-800">contact@honghu-competition.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-neutral-500">工作时间</p>
                    <p className="text-neutral-800">周一至周五 9:00-18:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionDetail;