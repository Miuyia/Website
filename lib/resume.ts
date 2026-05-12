export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  location?: string;
  bullets: string[];
};

export type Education = {
  school: string;
  degree: string;
  start: string;
  end: string;
  details?: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Resume = {
  name: string;
  tagline: string;
  summary: string;
  /** Rich summary paragraphs with **bold** markers for homepage display */
  summaryParagraphs: string[];
  location: string;
  email: string;
  website: string;
  experience: Experience[];
  education: Education[];
  skills: SkillGroup[];
};

import type { Locale } from './i18n';

const resumeZh: Resume = {
  name: '周妙矣',
  tagline: '感知AI产品经理',
  summary: '2年多模态AI产品经理，聚焦多模态大模型方向，拥有技术背景，擅长用AI coding验证技术可行性并提效，先后在小米大模型团队及字节跳动AI Lab主导多项视觉AI产品从0到1落地，具备技术预研、产品设计到评测体系搭建的全链路能力。',
  summaryParagraphs: [
    '**2年多模态AI产品经理**，聚焦**多模态大模型与图像生成**方向，拥有技术背景，擅长用**AI coding**验证技术可行性并提效。',
    '先后在**小米大模型团队**及**字节跳动AI Lab**主导多项视觉AI产品**从0到1**落地，涵盖**AIGC图像编辑**、**语音P图**、智能构图等方向。',
    '具备**技术预研**、**产品设计**到**评测体系搭建**的全链路能力。',
  ],
  location: '北京',
  email: '247420935@qq.com',
  website: 'https://miaoyi.me',
  experience: [
    {
      company: '小米科技有限责任公司',
      role: 'AI产品经理',
      start: '2024-07',
      end: '',
      location: '北京',
      bullets: [
        'GUI Agent：通过用户数据挖掘梳理手机/车机端高频操作场景，推动GUI手机端从0到1上线亮相OS3发布会，执行完成率稳定90%+、端到端满足率达92.08%。车机端整体执行完成率达94.67%。',
        'GUI Agent异常感知专项：定义12类异常界面分类标准，建立"线上badcase驱动→评测集更新→模型优化"的产品迭代闭环，实现异常检测模型准确率94.7%、双模型准确率95.3%。',
        '相机Agent-拍人引导：识别用户痛点，设计基于多模态大模型的摄影拍人引导方案，从0到1搭建系统化评测体系，整体合格率达82.22%，负优化率仅4.20%。',
        '相机Agent-智能构图：主导搭建美学构图大模型可量化评测体系，将构图合格率从不到50%提升至79%、负优化率从8%降至4%，完成智能构图demo搭建。',
        'AIGC图像编辑（扩图/消除/换背景）& 语音P图：主导AIGC功能上云，搭建专项评测体系累计完成30余次竞品对标评测，功能日请求量40W次，综合排名所有AIGC功能第一，算法效果满足率达95%+。完成"语音P图"功能需求设计与迭代5个版本，Action支持从8个扩展至72个，已完成各媒体宣发并在线下门店陈展。',
        '智能眼镜-多模态图像问答：主导体验优化，实现文字/通用场景端到端可用率分别提升13.4pp和6.8pp（78.99%/83.18%）。推动Thinking with image方案落地，图片ROI裁切准确率达94.09%。',
      ],
    },
    {
      company: '北京字节跳动科技有限公司',
      role: 'AI策略产品经理实习生',
      start: '2023-07',
      end: '2023-11',
      location: '北京',
      bullets: [
        'AI tutor通用聊天策略从0到1建设：将通用聊天策略分成中控模块和各垂类模块，分发准确率由裸模型的50%提升至90%+。',
        'AI tutor历史记录整合策略建设：依赖LLM能力制定历史记录整合策略规则，最终效果正确率从裸模型的60%达到90%以上。',
      ],
    },
    {
      company: '北京字节跳动科技有限公司',
      role: 'AI产品经理实习生',
      start: '2020-10',
      end: '2021-05',
      location: '北京',
      bullets: [
        '视觉计算组体验平台从0到1搭建：调研竞品平台输出报告，根据目标用户需求对组内产品功能分类，协同团队将平台成功落地。',
        '完整产品上线流程体系：在职期间总计40余项产品上线，采用Axure设计产品展示原型及功能结构，提供功能操作流程图，整理产品技术文档。',
      ],
    },
    {
      company: '网易有道',
      role: '产品运营实习生',
      start: '2020-06',
      end: '2020-09',
      location: '北京',
      bullets: [
        '负责网易有道事业群的产品运营，主导老师课程设计与运营。',
      ],
    },
  ],
  education: [
    {
      school: '北京邮电大学',
      degree: '信息与通信工程 硕士',
      start: '2021',
      end: '2024',
      details: '校级一等奖学金（7/181）、校级优秀毕业生、三好学生',
    },
    {
      school: '北京邮电大学',
      degree: '电子商务及法律 本科',
      start: '2017',
      end: '2021',
      details: '英方一等学位（15%）、学生组织优秀个人奖项',
    },
  ],
  skills: [
    { category: '产品能力', items: ['需求分析', '竞品调研', '数据驱动决策', '评测体系搭建', '从0到1产品设计'] },
    { category: '技术方向', items: ['多模态大模型', 'AIGC图像生成', 'GUI Agent', '计算机视觉', 'AI Coding'] },
    { category: '工具', items: ['Axure', 'Figma', 'Python', 'SQL'] },
  ],
};

const resumeEn: Resume = {
  name: 'Miaoyi Zhou',
  tagline: 'Perception AI Product Manager',
  summary: 'AI Product Manager with 2 years of experience specializing in multimodal large models. Strong technical background with expertise in using AI coding to validate feasibility and boost efficiency. Led multiple visual AI products from 0 to 1 at Xiaomi\'s LLM team and ByteDance AI Lab, with full-cycle capabilities spanning technical research, product design, and evaluation system development.',
  summaryParagraphs: [
    '**2 years of AI Product Management** experience, specializing in **multimodal large models and image generation**. Strong technical background with expertise in **AI coding** to validate feasibility and boost efficiency.',
    'Led multiple visual AI products **from 0 to 1** at **Xiaomi\'s LLM team** and **ByteDance AI Lab**, covering **AIGC image editing**, **voice photo editing**, smart composition, and more.',
    'Full-cycle capabilities spanning **technical research**, **product design**, and **evaluation system development**.',
  ],
  location: 'Beijing, China',
  email: '247420935@qq.com',
  website: 'https://miaoyi.me',
  experience: [
    {
      company: 'Xiaomi Technology',
      role: 'AI Product Manager',
      start: '2024-07',
      end: '',
      location: 'Beijing',
      bullets: [
        'GUI Agent: Mined user data to identify high-frequency operation scenarios on mobile/in-vehicle devices. Drove mobile GUI Agent from 0 to 1, launched at OS3 keynote. Achieved 90%+ execution completion rate and 92.08% end-to-end satisfaction. In-vehicle execution completion reached 94.67%.',
        'GUI Agent Anomaly Detection: Defined 12 categories of UI anomaly classification standards. Established a product iteration loop of "online bad-case driven → evaluation set update → model optimization". Achieved 94.7% anomaly detection accuracy (95.3% with dual-model).',
        'Camera Agent - Portrait Posing Guide: Identified user pain points, designed a multimodal LLM-based photography posing guidance system. Built a systematic evaluation framework from scratch, achieving 82.22% overall pass rate with only 4.20% negative optimization rate.',
        'Camera Agent - Smart Composition: Led the development of a quantifiable evaluation system for aesthetic composition models. Improved composition pass rate from under 50% to 79%, reduced negative optimization rate from 8% to 4%. Completed smart composition demo with aesthetic scoring and intelligent framing.',
        'AIGC Image Editing (Outpainting/Erasing/Background Swap) & Voice Photo Editing: Led cloud migration of AIGC features. Built dedicated evaluation system with 30+ competitive benchmarks. Achieved 400K daily requests, ranking #1 among all AIGC features with 95%+ algorithm satisfaction rate. Designed and iterated "Voice Photo Editing" through 5 versions, expanding supported actions from 8 to 72. Completed media promotion and in-store exhibitions.',
        'Smart Glasses - Multimodal Visual QA: Led experience optimization, improving end-to-end availability by 13.4pp for text and 6.8pp for general scenarios (78.99%/83.18%). Drove Thinking-with-Image solution to production, achieving 94.09% ROI cropping accuracy.',
      ],
    },
    {
      company: 'ByteDance',
      role: 'AI Strategy Product Manager Intern',
      start: '2023-07',
      end: '2023-11',
      location: 'Beijing',
      bullets: [
        'AI Tutor Chat Strategy: Built general chat strategy from scratch with a central control module and vertical-specific modules. Improved intent routing accuracy from 50% (base model) to 90%+.',
        'AI Tutor History Integration: Designed history aggregation rules leveraging LLM capabilities, clustering records by topic and extracting titles/answers. Improved accuracy from 60% (base model) to over 90%.',
      ],
    },
    {
      company: 'ByteDance',
      role: 'AI Product Manager Intern',
      start: '2020-10',
      end: '2021-05',
      location: 'Beijing',
      bullets: [
        'Visual Computing Experience Platform: Conducted competitive analysis, categorized internal product features based on target user needs, built prototypes, and coordinated team to successfully launch the platform.',
        'Product Launch Pipeline: Managed 40+ product launches during tenure, including Axure prototype design, functional architecture documentation, workflow diagrams, and technical documentation.',
      ],
    },
    {
      company: 'NetEase Youdao',
      role: 'Product Operations Intern',
      start: '2020-06',
      end: '2020-09',
      location: 'Beijing',
      bullets: [
        'Responsible for product operations at NetEase Youdao, leading course design and operations for instructors.',
      ],
    },
  ],
  education: [
    {
      school: 'Beijing University of Posts and Telecommunications',
      degree: 'M.S. in Information and Communication Engineering',
      start: '2021',
      end: '2024',
      details: 'First-class Scholarship (top 7/181), Outstanding Graduate, Merit Student',
    },
    {
      school: 'Beijing University of Posts and Telecommunications',
      degree: 'B.S. in E-Commerce and Law',
      start: '2017',
      end: '2021',
      details: 'UK Partner First-class Honours (top 15%), Outstanding Student Leader',
    },
  ],
  skills: [
    { category: 'Product', items: ['Requirements Analysis', 'Competitive Research', 'Data-Driven Decision Making', 'Evaluation System Design', '0-to-1 Product Design'] },
    { category: 'Technical', items: ['Multimodal LLMs', 'AIGC Image Generation', 'GUI Agent', 'Computer Vision', 'AI Coding'] },
    { category: 'Tools', items: ['Axure', 'Figma', 'Python', 'SQL'] },
  ],
};

export function getResume(locale: Locale): Resume {
  return locale === 'zh' ? resumeZh : resumeEn;
}

/** @deprecated Use getResume(locale) instead */
export const resume = resumeZh;
