import React from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  Database,
  Code2,
  GraduationCap,
  Award,
  ArrowRight,
  Server,
  TrendingUp,
  BookOpen,
  BadgeCheck,
  ChevronRight
} from 'lucide-react';

export const ecosystemNodes = [
  { icon: Cpu, label: '算力', desc: 'GPU/CPU资源' },
  { icon: Database, label: '数据', desc: '数据集支持' },
  { icon: Code2, label: '开发', desc: '实训平台' },
  { icon: GraduationCap, label: '成长', desc: '学堂课程' },
  { icon: Award, label: '认证', desc: 'OPC证书' },
];

export const productGroups = [
  {
    title: '算力与基础设施',
    products: [
      {
        id: 1,
        name: '个人算力账户',
        description: '为每位参赛者分配独立算力，支持GPU/CPU资源。按需分配，弹性调度。',
        icon: Server,
        link: '/compute-account'
      },
      {
        id: 2,
        name: '算力交易市场',
        description: '模拟真实算力交易机制，参赛者可交易闲置算力，实现资源优化配置。',
        icon: TrendingUp,
        link: '/compute-market'
      }
    ]
  },
  {
    title: '开发平台',
    products: [
      {
        id: 3,
        name: '鸿鹄实训平台',
        description: '集成全流程开发工具，支持低代码快速实现AI应用。一站式完成项目开发。',
        icon: Code2,
        link: '/training-platform'
      }
    ]
  },
  {
    title: '学习与成长',
    products: [
      {
        id: 4,
        name: '鸿鹄学堂',
        description: '6000+门AI课程，从基础到实战，免费向选手开放。系统化学习路径。',
        icon: BookOpen,
        link: '/academy'
      }
    ]
  },
  {
    title: '认证与成果',
    products: [
      {
        id: 5,
        name: 'OPC能力认证',
        description: '中国移动认证的OPC技能证书，提升就业竞争力。官方认证背书。',
        icon: BadgeCheck,
        link: '/opc-certification'
      }
    ]
  }
];

export const usageSteps = [
  {
    step: '01',
    title: '获取算力',
    desc: '注册即送算力额度，按需申请GPU/CPU资源',
    icon: Cpu
  },
  {
    step: '02',
    title: '使用平台开发',
    desc: '登录实训平台，使用低代码工具快速开发',
    icon: Code2
  },
  {
    step: '03',
    title: '学习与提升',
    desc: '通过鸿鹄学堂学习AI课程，提升技能水平',
    icon: GraduationCap
  },
  {
    step: '04',
    title: '获得认证与机会',
    desc: '通过OPC认证，获得就业推荐与孵化机会',
    icon: Award
  }
];
