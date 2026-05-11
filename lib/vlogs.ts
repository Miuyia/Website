export type Vlog = {
  title: string;
  titleEn?: string;
  cover: string;
  bilibiliId: string;
  xiaohongshuUrl?: string;
  category: 'work' | 'life';
};

export const vlogs: Vlog[] = [
  {
    title: '大厂打工Vlog｜终于到周五啦;) 迎接新同事！',
    titleEn: 'Work Vlog | Finally Friday! Welcoming new colleagues',
    cover: '/vlogs/work-friday.jpg',
    bilibiliId: 'BV1i4bJzqEuL',
    xiaohongshuUrl: 'https://www.xiaohongshu.com/discovery/item/68971f8a000000002302d893',
    category: 'work',
  },
  {
    title: '大厂打工Vlog｜平常一天&体验小米眼镜',
    titleEn: 'Work Vlog | A normal day & trying Xiaomi glasses',
    cover: '/vlogs/work-glasses.jpg',
    bilibiliId: 'BV18zyuBXE2i',
    category: 'work',
  },
  {
    title: '大厂打工Vlog｜去上海出差我在做什么',
    titleEn: 'Work Vlog | Business trip to Shanghai',
    cover: '/vlogs/work-shanghai.jpg',
    bilibiliId: 'BV1ZGEBzYEFT',
    category: 'work',
  },
  {
    title: '大厂打工Vlog｜在园区见到小米yu7啦！',
    titleEn: 'Work Vlog | Spotted Xiaomi YU7 on campus!',
    cover: '/vlogs/work-yu7.jpg',
    bilibiliId: 'BV1929JYDEPc',
    category: 'work',
  },
  {
    title: '大厂打工Vlog｜小米食堂真的好好吃！',
    titleEn: 'Work Vlog | Xiaomi cafeteria is amazing!',
    cover: '/vlogs/work-cafeteria.jpg',
    bilibiliId: 'BV1WdNbedET9',
    category: 'work',
  },
  {
    title: '打工VLOG｜小米15发布会｜小米su7 ultra｜入职第一年就参加小米发布会',
    titleEn: 'Work Vlog | Xiaomi 15 Launch Event & SU7 Ultra',
    cover: '/vlogs/work-launch.jpg',
    bilibiliId: 'BV1Q3S7YAEYw',
    category: 'work',
  },
  {
    title: '剑桥 VLOG | 剑桥大学暑期学习 | 迪拜一日游 | 伦敦冒险',
    titleEn: 'Cambridge Vlog | Summer study, Dubai day trip & London adventures',
    cover: '/vlogs/life-cambridge.jpg',
    bilibiliId: 'BV1U4411S7aX',
    category: 'life',
  },
];

export const socialProfiles = {
  xiaohongshu: {
    url: 'https://xhslink.com/m/4Gqq19kgwoR',
    name: 'Meow',
    stats: '5741次赞与收藏',
    statsEn: '5,741 likes & favorites',
  },
  douyin: {
    url: '', // TODO: 用户提供
    name: 'Meow',
    stats: '',
    statsEn: '',
  },
};
