'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useLocale } from '@/components/locale-provider';
import { getResume } from '@/lib/resume';
import { socialProfiles } from '@/lib/vlogs';
import { travelPlaces } from '@/lib/travel';
import { TravelMap } from '@/components/travel-map';
import { WorksCarousel } from '@/components/works-carousel';
import { PersonalSection } from '@/components/personal-section';

const PHOTOS = [
  { src: '/首图.JPG', alt: 'Meow' },
  { src: '/生活照.jpg', alt: 'Meow' },
  { src: '/IMG_5700.JPG', alt: 'Meow' },
  { src: '/IMG_4932.JPG', alt: 'Meow' },
  { src: '/证件照2026.jpeg', alt: 'Meow' },
];

// Each card's transform when fanned out (hovered)
const FAN_TRANSFORMS = [
  { rotate: 0, x: 0, y: 0 },
  { rotate: -6, x: -30, y: -20 },
  { rotate: 8, x: 35, y: -15 },
  { rotate: -12, x: -20, y: 25 },
  { rotate: 5, x: 25, y: 30 },
];

function PhotoStack() {
  const [hovered, setHovered] = useState(false);
  const [current, setCurrent] = useState(0);

  const handleClick = () => {
    setCurrent((current + 1) % PHOTOS.length);
  };

  return (
    <div
      className="relative mx-auto w-full max-w-sm md:max-w-none aspect-[3/4] cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {PHOTOS.map((photo, i) => {
        // Calculate position relative to current top card
        const offset = (i - current + PHOTOS.length) % PHOTOS.length;
        const fan = FAN_TRANSFORMS[offset];
        const isTop = offset === 0;
        return (
          <div
            key={photo.src}
            className="absolute inset-0 rounded-xl overflow-hidden border border-[var(--border)] shadow-lg transition-all duration-500 ease-out"
            style={{
              zIndex: PHOTOS.length - offset,
              transform: hovered
                ? `rotate(${fan.rotate}deg) translate(${fan.x}px, ${fan.y}px)`
                : `rotate(0deg) translate(0px, 0px)`,
              opacity: hovered ? 1 : isTop ? 1 : 0,
            }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority={isTop}
              sizes="(min-width: 1024px) 26rem, (min-width: 768px) 22rem, 24rem"
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}

export function HomeContent() {
  const { t, locale } = useLocale();

  return (
    <div className="px-8 lg:px-12">
      <section id="about" className="grid grid-cols-1 md:grid-cols-[1fr_minmax(0,22rem)] lg:grid-cols-[1fr_minmax(0,26rem)] gap-10 lg:gap-16 items-center min-h-screen mb-20">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-4">
            {t.home.eyebrow}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight mb-6 italic">
            {t.home.title}
          </h1>
          <div className="space-y-4 text-base leading-relaxed text-[var(--foreground)] max-w-xl">
            {t.home.bio.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href="#galleries" className="underline underline-offset-4 decoration-1 hover:decoration-2">
              {t.home.links.galleries}
            </a>
<a
              href="mailto:{{YOUR_EMAIL}}"
              className="underline underline-offset-4 decoration-1 hover:decoration-2"
            >
              {t.home.links.email}
            </a>
          </div>
        </div>

        <div style={{ transform: 'translateX(-6rem)' }}>
          <PhotoStack />
        </div>
      </section>

      {/* About Me / Resume Section */}
      <ResumeSection locale={locale} />

      {/* Works Section */}
      <WorksSection locale={locale} />

      {/* Vlog Section */}
      <VlogSection locale={locale} />

      {/* Galleries Section */}
      <TravelSection locale={locale} />

      {/* Personal Section */}
      <PersonalSection locale={locale} />

    </div>
  );
}

type TimelineCard = {
  company: string;
  role: string;
  period: string;
  image: string;
  description: string;
  imagePosition?: string;
  imageScale?: number;
};

const WORK_ZH: TimelineCard[] = [
  {
    company: '小米科技',
    role: 'AI产品经理',
    period: '2024.07 — 2026.03',
    image: '/experience/xiaomi.JPG',
    description: '聚焦多模态大模型与图像生成方向，负责相机Agent、GUI Agent、眼镜图像问答、AIGC等项目，具备技术预研、产品设计到评测体系搭建的全链路能力。',
  },
  {
    company: '字节跳动',
    role: 'AI策略产品经理实习生',
    period: '2023.07 — 2023.11',
    image: '/experience/bytedance-2022.jpeg',
    description: '主导AI Tutor通用聊天策略从0到1建设，负责AI Tutor的历史记录整合策略。',
  },
  {
    company: '字节跳动',
    role: 'AI产品经理实习生',
    period: '2020.10 — 2021.05',
    image: '/experience/bytedance-2019.png',
    imagePosition: 'center center',
    imageScale: 1.3,
    description: '搭建视觉计算组体验平台，在职期间完成40余项产品上线全流程管理。',
  },
  {
    company: '网易有道',
    role: '产品运营实习生',
    period: '2020.06 — 2020.09',
    image: '/experience/netease-2020-v2.jpg',
    imagePosition: 'center 95%',
    description: '负责网易有道事业群的产品运营，主导老师课程设计与运营。',
  },
];

const WORK_EN: TimelineCard[] = [
  {
    company: 'Xiaomi',
    role: 'AI Product Manager',
    period: '2024.07 — 2026.03',
    image: '/experience/xiaomi.JPG',
    description: 'Focused on multimodal LLMs and image generation. Led Camera Agent, GUI Agent, Smart Glasses Visual QA, and AIGC projects. Full-cycle capabilities from technical research and product design to evaluation system development.',
  },
  {
    company: 'ByteDance',
    role: 'AI Strategy PM Intern',
    period: '2023.07 — 2023.11',
    image: '/experience/bytedance-2022.jpeg',
    description: 'Built AI Tutor general chat strategy from 0 to 1, and led the history integration strategy for AI Tutor.',
  },
  {
    company: 'ByteDance',
    role: 'AI PM Intern',
    period: '2020.10 — 2021.05',
    image: '/experience/bytedance-2019.png',
    imagePosition: 'center center',
    imageScale: 1.3,
    description: 'Built the Visual Computing experience platform and managed 40+ product launches end-to-end.',
  },
  {
    company: 'NetEase Youdao',
    role: 'Product Ops Intern',
    period: '2020.06 — 2020.09',
    image: '/experience/netease-2020-v2.jpg',
    imagePosition: 'center 95%',
    description: 'Led product operations and course design for instructors at NetEase Youdao.',
  },
];

const EDU_ZH: TimelineCard[] = [
  {
    company: '北京邮电大学',
    role: '硕士 · 信息与通信工程',
    period: '2021 — 2024',
    image: '/experience/master.jpg',
    description: '主要研究人工智能方向，基于GCN的网络流量预测。获校级一等奖学金（7/181）、校级优秀毕业生、三好学生等荣誉。',
  },
  {
    company: '北京邮电大学',
    role: '本科 · 电子商务及法律',
    period: '2017 — 2021',
    image: '/experience/bachelor.jpg',
    description: '获工学与管理学双学位，英方一等学位（前15%），优秀毕业生。曾任学生会副主席及文艺部部长，主办多项校园文艺活动。',
  },
];

const EDU_EN: TimelineCard[] = [
  {
    company: 'BUPT',
    role: 'M.S. · Information & Communication Engineering',
    period: '2021 — 2024',
    image: '/experience/master.jpg',
    description: 'Research focused on AI — GCN-based network traffic prediction. Awarded First-class Scholarship (top 7/181), Outstanding Graduate, and Merit Student.',
  },
  {
    company: 'BUPT',
    role: 'B.S. · E-Commerce & Law',
    period: '2017 — 2021',
    image: '/experience/bachelor.jpg',
    description: 'Dual degree in Engineering and Management. UK Partner First-class Honours (top 15%), Outstanding Graduate. Served as Vice President of Student Union and Head of Arts Department, organizing multiple campus cultural events.',
  },
];

function CardGrid({
  cards,
  activeCard,
  setActiveCard,
  offset,
  showTimeline = false,
  locale = 'en',
}: {
  cards: TimelineCard[];
  activeCard: number | null;
  setActiveCard: (i: number | null) => void;
  offset: number;
  showTimeline?: boolean;
  locale?: string;
}) {
  return (
    <div>
      {/* Timeline bar */}
      {showTimeline && (() => {
        const allYears = Array.from(new Set(
          cards.flatMap(card => {
            const parts = card.period.split(' — ');
            return parts.map(p => p.split('.')[0]);
          })
        )).sort((a, b) => Number(b) - Number(a));
        return (
          <div className="hidden lg:flex items-center mb-6 px-2">
            {allYears.map((year, i) => (
              <div key={year} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full border-2 bg-[var(--background)] border-[var(--muted)]" />
                  <span className="font-mono text-[10px] text-[var(--muted)] mt-1.5">
                    {year}
                  </span>
                </div>
                {i < allYears.length - 1 && (
                  <div className="flex-1 h-px bg-[var(--border)] mx-2 mt-[-12px]" />
                )}
              </div>
            ))}
          </div>
        );
      })()}

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => {
          const isActive = activeCard === i + offset;
          return (
            <div
              key={i}
              className="cursor-pointer group [perspective:1000px]"
              onClick={() => setActiveCard(isActive ? null : i + offset)}
            >
              <div
                className="relative h-full transition-transform duration-500 [transform-style:preserve-3d]"
                style={{ transform: isActive ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
              >
                {/* Front face - company, role, period */}
                <div className="[backface-visibility:hidden] rounded-2xl overflow-hidden border border-[var(--border)] hover:shadow-lg hover:scale-[1.01] transition-all duration-300">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.company}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{
                        ...(card.imagePosition ? { objectPosition: card.imagePosition } : {}),
                        ...(card.imageScale ? { transform: `scale(${card.imageScale})` } : {}),
                      }}
                    />
                  </div>
                  <div className="p-4 bg-[var(--background)]">
                    <h3 className="text-[15px] font-semibold text-[var(--foreground)] leading-tight">{card.company}</h3>
                    <p className="text-[12px] text-[var(--muted)] mt-0.5">{card.role}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--muted)]" />
                      <span className="font-mono text-[11px] text-[var(--muted)]">
                        {card.period}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Back face - detailed description */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl overflow-hidden border border-[var(--foreground)] shadow-xl bg-[var(--background)]">
                  <div className="h-full flex flex-col p-4 overflow-y-auto">
                    <h3 className="text-[14px] font-semibold text-[var(--foreground)] mb-0.5">{card.company}</h3>
                    <p className="text-[11px] text-[var(--muted)] mb-0.5">{card.role}</p>
                    <p className="font-mono text-[10px] text-[var(--muted)] mb-2">{card.period}</p>
                    <p className="text-[12px] leading-relaxed text-[var(--foreground)] flex-1">
                      {card.description}
                    </p>
                    <p className="mt-2 text-[10px] text-[var(--muted)] text-center shrink-0">
                      {locale === 'zh' ? '点击翻回' : 'Click to flip back'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ResumeSection({ locale }: { locale: string }) {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const resume = getResume(locale as 'en' | 'zh');
  const taglineLines = locale === 'zh'
    ? ['多模态感知。', 'AI产品落地。']
    : ['Multimodal Perception.', 'AI Products.'];
  const workCards = locale === 'zh' ? WORK_ZH : WORK_EN;
  const eduCards = locale === 'zh' ? EDU_ZH : EDU_EN;
  const workLabel = locale === 'zh' ? '工作经历' : 'WORK EXPERIENCE';
  const eduLabel = locale === 'zh' ? '教育经历' : 'EDUCATION';

  const sectionTitle = locale === 'zh' ? '关于我' : 'About Me';

  return (
    <section id="experience" className="mb-24 pt-16 border-t border-[var(--border)]">
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight leading-[1.15] mb-6">
        <span className="block">{taglineLines[0]}</span>
        <span className="block font-serif italic font-normal">{taglineLines[1]}</span>
      </h3>

      {/* Work Experience */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h3 className="text-base font-semibold text-[var(--foreground)]">
            {workLabel}
          </h3>
          <div className="flex-1 h-px bg-[var(--border)]" />
          <span className="font-mono text-[11px] text-[var(--muted)]">
            2020 — 2026
          </span>
        </div>
        <CardGrid cards={workCards} activeCard={activeCard} setActiveCard={setActiveCard} offset={0} showTimeline locale={locale} />
      </div>

      {/* Education */}
      <div>
        <div className="flex items-center gap-4 mb-4">
          <h3 className="text-base font-semibold text-[var(--foreground)]">
            {eduLabel}
          </h3>
          <div className="flex-1 h-px bg-[var(--border)]" />
          <span className="font-mono text-[11px] text-[var(--muted)]">
            2017 — 2024
          </span>
        </div>
        <CardGrid cards={eduCards} activeCard={activeCard} setActiveCard={setActiveCard} offset={workCards.length} locale={locale} />
      </div>

    </section>
  );
}

const momentCards = [
  // Left col [0]: portrait — tall start
  {
    title: '🧩北京东四Citywalk',
    cover: '/moments/xhs-citywalk.jpg',
    url: 'https://www.xiaohongshu.com/user/profile/5a96cf1011be1028baf292f3/66a8f09d00000000050302e1?xsec_token=ABslHeB-NEdXzCjuGXw-RA1lXWWhML27cMQ60iBWVjgj4=&xsec_source=pc_user',
    showHeart: true,
    aspect: 'portrait' as const,
  },
  // Right col [1]: portrait
  {
    title: '九寨沟你美🫶🏻',
    cover: '/moments/xhs-jiuzhaigou.jpg',
    url: 'https://www.xiaohongshu.com/user/profile/5a96cf1011be1028baf292f3/6992a778000000001a01f11d?xsec_token=ABNAGT5bpduZjNE1-B9raiwYKZgyYvhIC58UxcR95rRjI=&xsec_source=pc_user',
    showHeart: false,
    aspect: 'portrait' as const,
  },
  // Left col [2]: video — short break
  {
    title: '大厂打工Vlog｜终于到周五啦',
    cover: '/moments/bilibili-work-friday.jpg',
    url: 'https://www.bilibili.com/video/BV1i4bJzqEuL/?spm_id_from=333.1387.homepage.video_card.click',
    showHeart: false,
    aspect: 'video' as const,
  },
  // Right col [3]: portrait
  {
    title: '大厂打工Plog｜好好工作生活的一周📝',
    cover: '/moments/xhs-work-plog.jpg',
    url: 'https://www.xiaohongshu.com/discovery/item/688caea1000000002302ca5f?source=webshare&xhsshare=pc_web&xsec_token=ABcvH6CYxOy7vwDuXMsBK3CshyKSb8KRIn1JDkovaSnIY=&xsec_source=pc_share',
    showHeart: true,
    aspect: 'portrait' as const,
  },
  // Left col [4]: portrait
  {
    title: '打卡北京日系小众地：双秀公园🎏',
    cover: '/moments/xhs-shuangxiu.jpg',
    url: 'https://www.xiaohongshu.com/discovery/item/695b4902000000001a0349e7?source=webshare&xhsshare=pc_web&xsec_token=ABAWDeyZch9QzD8dxal_SYBvVosU9YLhYZGF8mKsH_GDE=&xsec_source=pc_share',
    showHeart: true,
    aspect: 'portrait' as const,
  },
  // Right col [5]: video — short break
  {
    title: '剑桥VLOG｜剑桥大学暑期学习',
    cover: '/moments/bilibili-cambridge.jpg',
    url: 'https://www.bilibili.com/video/BV1U4411S7aX/?spm_id_from=333.1387.homepage.video_card.click',
    showHeart: false,
    aspect: 'video' as const,
  },
  // Left col [6]: portrait
  {
    title: '😋小米食堂美食排行榜',
    cover: '/moments/xhs-xiaomi-food.jpg',
    url: 'https://www.xiaohongshu.com/discovery/item/69733f1d000000002801d86c?source=webshare&xhsshare=pc_web&xsec_token=ABiHZK96AxloGb6xUSFKSFab_pIGsOErTJ9gDWxfBc9TA=&xsec_source=pc_share',
    showHeart: false,
    aspect: 'portrait' as const,
  },
  // Right col [7]: portrait
  {
    title: '2024旅行结算｜我的年度18图',
    cover: '/moments/xhs-travel-2024.jpg',
    url: 'https://www.xiaohongshu.com/discovery/item/6799c672000000001800b715?source=webshare&xhsshare=pc_web&xsec_token=ABUrgKQdjfu5C195r4R2B7MAwxxeZdTf6uQKDIgnvEHSw=&xsec_source=pc_share',
    showHeart: true,
    aspect: 'portrait' as const,
  },
  // Left col [8]: video
  {
    title: '小米15发布会｜入职第一年就参加发布会',
    cover: '/moments/bilibili-xiaomi-launch.jpg',
    url: 'https://www.bilibili.com/video/BV1Q3S7YAEYw/?spm_id_from=333.1387.homepage.video_card.click',
    showHeart: true,
    aspect: 'video' as const,
  },
  // Right col [9]: video
  {
    title: '大厂打工Vlog｜去上海出差我在做什么',
    cover: '/moments/bilibili-shanghai.jpg',
    url: 'https://www.bilibili.com/video/BV1ZGEBzYEFT/?spm_id_from=333.1387.homepage.video_card.click',
    showHeart: false,
    aspect: 'video' as const,
  },
  // Left col [10]: portrait
  {
    title: '成功和老板互动！千亿总裁让我好好吃饭🤣',
    cover: '/moments/xhs-xiaomi-boss.jpg',
    url: 'https://www.xiaohongshu.com/user/profile/5a96cf1011be1028baf292f3/67ad71ab000000001902ce70?xsec_token=AB7qU0agItAtJhW962bU6-YGq1bV04xye1OsJE7EcpSmI=&xsec_source=pc_user',
    showHeart: true,
    aspect: 'portrait' as const,
  },
  // Right col [11]: portrait
  {
    title: '踩雷！千万别来阿那亚',
    cover: '/moments/xhs-anaya.jpg',
    url: 'https://www.xiaohongshu.com/user/profile/5a96cf1011be1028baf292f3/64354ee20000000013011e09?xsec_token=AByzAG0TLzEpfix0b1CbCE7H34zh3DELuXhUz-pphSGwE=&xsec_source=pc_user',
    showHeart: false,
    aspect: 'portrait' as const,
  },
];

/* ─────────────────────────────────────────────────────────── */
/*  Works Section – Project Carousel                            */
/* ─────────────────────────────────────────────────────────── */

function WorksSection({ locale }: { locale: string }) {
  const isZh = locale === 'zh';
  return (
    <section id="works" className="mb-24 pt-20 border-t border-[var(--border)] -mx-8 lg:-mx-12 px-8 lg:px-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-serif italic">
          {isZh ? '作品' : "What I've built"}
          <span className="text-[var(--muted)]">.</span>
        </h2>
        <p className="text-[var(--muted)] text-sm mt-3 max-w-md mx-auto">
          {isZh
            ? '精选工作项目，涵盖智能座舱、AI智能体与创意开发。'
            : 'A curated selection of projects spanning smart cockpit, AI agents, and creative development.'}
        </p>
      </div>
      <WorksCarousel />
    </section>
  );
}

function VlogSection({ locale }: { locale: string }) {
  const isZh = locale === 'zh';
  const subtitleLines = isZh
    ? ['工作日常、创作记录', '和生活碎片。']
    : ['Work life, side projects', 'and everyday moments.'];
  const hasItalicPart = !isZh;

  const leftCol = momentCards.filter((_, i) => i % 2 === 0);
  const rightCol = momentCards.filter((_, i) => i % 2 === 1);

  return (
    <section id="moments" className="mb-24 pt-20 border-t border-[var(--border)] min-h-screen flex items-center justify-center">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center w-full max-w-5xl mx-auto">
        {/* Left side — tagline + avatar + bio + stats */}
        <div className="flex flex-col gap-7 lg:flex-1 max-w-lg">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.2]">
            {hasItalicPart ? (
              <>
                <span className="block">Work life, side projects</span>
                <span className="block">and <em className="font-serif italic font-normal">everyday moments.</em></span>
              </>
            ) : (
              <>
                <span className="block">工作日常、创作记录</span>
                <span className="block">和<em className="font-serif italic font-normal">生活碎片。</em></span>
              </>
            )}
          </h3>
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/avatar.webp"
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover shrink-0"
            />
            <div>
              <p className="text-[16px] font-medium text-[var(--foreground)] leading-relaxed">
                {isZh ? 'ENFJ｜北邮信通｜大厂AI PM' : 'ENFJ | BUPT | AI PM at Big Tech'}
              </p>
              <p className="text-[15px] text-[var(--muted)] mt-1">
                {isZh ? '从校园到大厂｜记录生活中的7788🫢' : 'From campus to big tech | Documenting life moments 🫢'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div>
              <p className="text-3xl font-bold text-[var(--foreground)]">1,172</p>
              <p className="text-[12px] text-[var(--muted)] mt-1">{isZh ? '粉丝' : 'Followers'}</p>
            </div>
            <div className="w-px h-10 bg-[var(--border)]" />
            <div>
              <p className="text-3xl font-bold text-[var(--foreground)]">5,741</p>
              <p className="text-[12px] text-[var(--muted)] mt-1">{isZh ? '赞与收藏' : 'Likes'}</p>
            </div>
          </div>
          <a
            href={socialProfiles.xiaohongshu.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff2442] text-white text-[14px] font-medium hover:bg-[#e6203b] transition-colors w-fit"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.8 14.4c-.4.4-1 .6-1.6.6H8.8c-.6 0-1.2-.2-1.6-.6-.4-.4-.6-1-.6-1.6V9.2c0-.6.2-1.2.6-1.6.4-.4 1-.6 1.6-.6h6.4c.6 0 1.2.2 1.6.6.4.4.6 1 .6 1.6v5.6c0 .6-.2 1.2-.6 1.6zM14 9.5h-1.5v1.5H14V9.5zm-2.5 0H10v1.5h1.5V9.5zM14 12h-1.5v1.5H14V12zm-2.5 0H10v1.5h1.5V12z" />
            </svg>
            {isZh ? '小红书主页' : 'Xiaohongshu'}
          </a>
        </div>

        {/* Right side — iPhone frame with light 2-column masonry grid */}
        <div className="w-full lg:w-auto flex justify-center lg:justify-end shrink-0 lg:-mr-6">
          <div className="relative w-[360px] h-[740px] rounded-[3.5rem] border-[12px] border-[#1c1c1e] bg-[#f5f5f7] shadow-2xl overflow-hidden">
            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[80px] h-[22px] bg-[#1c1c1e] rounded-full z-10" />
            {/* Screen content — 2-column masonry grid */}
            <div className="h-full overflow-y-auto scrollbar-hide pt-11 pb-6 px-2">
              <div className="flex gap-2">
                {/* Left column */}
                <div className="flex-1 flex flex-col gap-2">
                  {leftCol.map((card, i) => (
                    <a
                      key={i}
                      href={card.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md hover:scale-[1.02] transition-all"
                    >
                      <div className={`relative ${card.aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-video'} overflow-hidden`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={card.cover}
                          alt={card.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="px-2.5 py-2">
                        <p className="text-[10px] font-medium text-[#1a1a1a] leading-snug line-clamp-2">
                          {card.title}
                        </p>
                        {card.showHeart && (
                          <div className="flex items-center mt-1.5">
                            <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
                {/* Right column — offset for masonry effect */}
                <div className="flex-1 flex flex-col gap-2">
                  {rightCol.map((card, i) => (
                    <a
                      key={i}
                      href={card.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md hover:scale-[1.02] transition-all"
                    >
                      <div className={`relative ${card.aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-video'} overflow-hidden`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={card.cover}
                          alt={card.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="px-2.5 py-2">
                        <p className="text-[10px] font-medium text-[#1a1a1a] leading-snug line-clamp-2">
                          {card.title}
                        </p>
                        {card.showHeart && (
                          <div className="flex items-center mt-1.5">
                            <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            {/* Home indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] rounded-full bg-black/15" />
          </div>
        </div>
      </div>

    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Travel Section – Photo Strip                                */
/* ─────────────────────────────────────────────────────────── */

function TravelSection({ locale }: { locale: string }) {
  const isZh = locale === 'zh';
  const countryCount = new Set(travelPlaces.map(p => p.country).filter(Boolean)).size;

  return (
    <section id="galleries" className="mb-24 pt-20 border-t border-[var(--border)]">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          {isZh ? '旅行' : 'Travel'}
          <span className="font-serif italic font-normal"> {isZh ? '足迹' : 'footprints'}</span>
        </h2>
        <p className="text-[var(--muted)] text-sm mt-3 max-w-md mx-auto leading-relaxed">
          {isZh
            ? '喜欢在路上的感觉，用镜头记录沿途风景。每次出发都能找回自在与快乐。'
            : 'I love being on the road, capturing moments along the way. Every trip brings back a sense of freedom and joy.'}
        </p>
        <p className="text-[var(--muted)] text-sm mt-2">
          <span className="font-mono text-lg font-semibold text-[var(--foreground)]">{travelPlaces.length}</span>
          {' '}{isZh ? '个城市' : ' cities'}
          <span className="mx-2 opacity-40">·</span>
          <span className="font-mono text-lg font-semibold text-[var(--foreground)]">{countryCount}</span>
          {' '}{isZh ? '个国家' : ' countries'}
        </p>
      </div>
      <div className="-mx-8 lg:-mx-12">
        <TravelMap />
      </div>
    </section>
  );
}

