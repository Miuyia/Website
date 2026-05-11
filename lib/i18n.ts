export type Locale = 'en' | 'zh';

export const LOCALE_STORAGE_KEY = 'site-locale';
export const DEFAULT_LOCALE: Locale = 'en';

export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'zh';
}

export type Dict = {
  nav: {
    about: string;
    travel: string;
    writing: string;
    resume: string;
  };
  home: {
    eyebrow: string;
    title: string;
    bio: string[];
    links: { galleries: string; writing: string; email: string };
    recent: string;
    all: string;
  };
  toggle: { en: string; zh: string; aria: string };
  travel: {
    pageTitle: string;
    pageSubtitle: string;
    galleriesTitle: string;
    back: string;
    galleryHeading: string;
  };
  blog: {
    pageTitle: string;
    eyebrow: string;
    empty: string;
    countTemplate: (n: number) => string;
    back: string;
  };
resume: {
    pageTitle: string;
    eyebrow: string;
    sections: { experience: string; education: string; skills: string };
    labels: { location: string; email: string; website: string };
  };
  vlog: {
    title: string;
    subtitle: string;
    work: string;
    life: string;
    followMe: string;
    watchOn: string;
  };
  footer: { rights: string };
  notFound: string;
};

export const dict: Record<Locale, Dict> = {
  en: {
    nav: {
      about: 'About',
      travel: 'Travel',
      writing: 'Writing',
      resume: 'Resume',
    },
    home: {
      eyebrow: 'Hello',
      title: "Hi, I'm Meow.",
      bio: [
        'A 2-year experienced Product Manager & AI Creator.',
        'Graduated from Beijing University of Posts and Telecommunications with Bachelor and Master degrees.',
        'Lover of life, photography and video editing.',
      ],
      links: {
        galleries: 'Galleries →',
        writing: 'Writing →',
        email: 'Email →',
      },
      recent: 'Recent writing',
      all: 'All →',
    },
    toggle: { en: 'EN', zh: '中', aria: 'Switch language' },
    travel: {
      pageTitle: 'Travel',
      pageSubtitle: "Meow's travel galleries — places I've been, captured in photos.",
      galleriesTitle: "Meow's Galleries",
      back: '← Back to travel',
      galleryHeading: 'Gallery',
    },
    blog: {
      pageTitle: 'Writing',
      eyebrow: 'Writing',
      empty: 'No posts yet.',
      countTemplate: n => `Notes, project reflections and essays. ${n} posts.`,
      back: '← Back to writing',
    },
    resume: {
      pageTitle: 'Resume',
      eyebrow: 'Resume / CV',
      sections: { experience: 'Experience', education: 'Education', skills: 'Skills' },
      labels: { location: 'Location', email: 'Email', website: 'Website' },
    },
    vlog: {
      title: 'Vlogs',
      subtitle: 'Work life, side projects and everyday moments.',
      work: 'Work',
      life: 'Life',
      followMe: 'Follow me',
      watchOn: 'Watch on',
    },
    footer: { rights: '' },
    notFound: 'Not found',
  },
  zh: {
    nav: {
      about: '关于',
      travel: '旅行',
      writing: '博客',
      resume: '简历',
    },
    home: {
      eyebrow: '你好',
      title: '你好,我是 Meow。',
      bio: [
        '有两年经验的产品经理,同时是一名 AI 创作者。',
        '本科与硕士均毕业于北京邮电大学。',
        '热爱生活、摄影与视频剪辑。',
      ],
      links: {
        galleries: '相册 →',
        writing: '博客 →',
        email: '邮件 →',
      },
      recent: '最近写作',
      all: '全部 →',
    },
    toggle: { en: 'EN', zh: '中', aria: '切换语言' },
    travel: {
      pageTitle: '旅行',
      pageSubtitle: '去过的地方与所见所感。',
      galleriesTitle: 'Meow 的相册',
      back: '← 返回旅行',
      galleryHeading: '更多照片',
    },
    blog: {
      pageTitle: '博客',
      eyebrow: '写作',
      empty: '暂无文章。',
      countTemplate: n => `技术笔记、项目复盘与日常随笔。共 ${n} 篇。`,
      back: '← 返回博客',
    },
    resume: {
      pageTitle: '简历',
      eyebrow: '简历',
      sections: { experience: '经历', education: '教育', skills: '技能' },
      labels: { location: '所在地', email: '邮箱', website: '网站' },
    },
    vlog: {
      title: '视频',
      subtitle: '工作日常、创作记录和生活碎片。',
      work: '工作',
      life: '生活',
      followMe: '关注我',
      watchOn: '观看',
    },
    footer: { rights: '' },
    notFound: '未找到',
  },
};
