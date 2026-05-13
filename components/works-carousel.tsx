'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from './locale-provider';

type WorkProject = {
  id: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  cover: string;
  description: string;
  descriptionEn: string;
  url?: string;
  gallery?: string[];
  videos?: string[];
};

const PROJECTS: WorkProject[] = [
  {
    id: 'see-through',
    title: '车内外通透模式',
    titleEn: 'See-Through Mode',
    subtitle: '智能座舱',
    subtitleEn: 'Smart Cockpit',
    cover: '/works/see-through.jpg',
    description: '基于多模态感知的车内外通透显示技术，实现A柱盲区消除和全景透视效果，提升驾驶安全性。',
    descriptionEn: 'Multimodal perception-based see-through display for vehicles, eliminating A-pillar blind spots with panoramic transparency for enhanced driving safety.',
    url: 'https://mp.weixin.qq.com/s/d_WX3azo3EuVPndrZt8jgw',
    gallery: ['/works/see-through.jpg'],
  },
  {
    id: 'gui-agent',
    title: 'GUI Agent',
    titleEn: 'GUI Agent',
    subtitle: 'AI 智能体',
    subtitleEn: 'AI Agent',
    cover: '/works/gui-agent.png',
    description: '基于大语言模型的GUI操作智能体，能够理解屏幕内容并自主完成复杂的图形界面交互任务。',
    descriptionEn: 'LLM-powered GUI agent that understands screen content and autonomously completes complex graphical interface interaction tasks.',
    videos: ['/works/gui-agent-demo.mp4', '/works/gui-agent-xhs.mp4'],
  },
  {
    id: 'camera-agent',
    title: '相机 Agent',
    titleEn: 'Camera Agent',
    subtitle: 'AI 智能体',
    subtitleEn: 'AI Agent',
    cover: '/works/camera-agent.jpg',
    description: '智能相机控制Agent，通过自然语言指令实现相机参数调节、场景识别和自动拍摄优化。',
    descriptionEn: 'Intelligent camera control agent that adjusts parameters, recognizes scenes, and optimizes shots through natural language instructions.',
    gallery: ['/works/camera-agent.jpg'],
  },
  {
    id: 'cabin-architecture',
    title: '座舱问建筑',
    titleEn: 'Cabin × Architecture',
    subtitle: '多模态交互',
    subtitleEn: 'Multimodal',
    cover: '/works/cabin-architecture-v2.png',
    description: '座舱场景下的建筑识别与信息查询系统，结合视觉感知和知识图谱为用户提供沿途建筑的详细介绍。',
    descriptionEn: 'In-cabin architecture recognition and info system combining visual perception with knowledge graphs to introduce roadside buildings.',
    videos: ['/works/cabin-architecture-demo.mp4'],
  },
  {
    id: 'aigc',
    title: 'AIGC 项目',
    titleEn: 'AIGC Project',
    subtitle: 'AI 生成',
    subtitleEn: 'AI Generation',
    cover: '/works/aigc.jpeg',
    description: 'AI生成内容项目，涵盖图像生成、视频合成和创意内容制作，探索AIGC在产品中的落地应用。',
    descriptionEn: 'AI-generated content project covering image generation, video synthesis, and creative production — exploring AIGC product applications.',
    gallery: ['/works/aigc-1.jpeg', '/works/aigc-2.jpeg'],
  },
  {
    id: '3d-fireworks',
    title: '3D 烟花',
    titleEn: '3D Fireworks',
    subtitle: '创意开发',
    subtitleEn: 'Creative Dev',
    cover: '/works/3d-fireworks.jpg',
    description: '基于WebGL的3D烟花粒子效果，支持自定义烟花样式、颜色和爆炸物理模拟，用于节日氛围展示。',
    descriptionEn: 'WebGL-based 3D firework particle effects with custom styles, colors, and physics simulation for festive displays.',
    url: 'https://www.xiaohongshu.com/user/profile/5a96cf1011be1028baf292f3/698bffea000000001a02344c?xsec_token=ABU79H_Ffum_M8XvTd2WybKmF8NzCPaMLt9mnesOdUBGE=&xsec_source=pc_user',
    gallery: ['/works/3d-fireworks.jpg'],
  },
];

export function WorksCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<WorkProject | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);
  const pausedRef = useRef(false);
  const dragRef = useRef<{ startX: number; dragging: boolean }>({ startX: 0, dragging: false });
  const { locale } = useLocale();
  const isZh = locale === 'zh';
  const [cardSpacing, setCardSpacing] = useState(70);

  // Responsive card fan spacing
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCardSpacing(40);
      else if (w < 1024) setCardSpacing(55);
      else setCardSpacing(70);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Auto-rotate active card (faster: 2s)
  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
      }
    }, 2000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const activeProject = PROJECTS[activeIndex];

  return (
    <>
      <div
        className="relative w-full rounded-3xl bg-[#111] p-4 sm:p-8 lg:p-16 overflow-hidden min-h-[520px]"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left: card carousel */}
          <div
            className="relative w-full lg:w-1/2 h-[380px] lg:h-[420px] flex items-center justify-center select-none"
            onMouseDown={(e) => {
              dragRef.current = { startX: e.clientX, dragging: true };
            }}
            onMouseMove={(e) => {
              if (!dragRef.current.dragging) return;
              const diff = e.clientX - dragRef.current.startX;
              if (Math.abs(diff) > 50) {
                setActiveIndex((prev) =>
                  diff > 0
                    ? (prev - 1 + PROJECTS.length) % PROJECTS.length
                    : (prev + 1) % PROJECTS.length
                );
                dragRef.current = { startX: e.clientX, dragging: false };
              }
            }}
            onMouseUp={() => { dragRef.current.dragging = false; }}
            onMouseLeave={() => { dragRef.current.dragging = false; }}
            onTouchStart={(e) => {
              dragRef.current = { startX: e.touches[0].clientX, dragging: true };
            }}
            onTouchMove={(e) => {
              if (!dragRef.current.dragging) return;
              const diff = e.touches[0].clientX - dragRef.current.startX;
              if (Math.abs(diff) > 50) {
                setActiveIndex((prev) =>
                  diff > 0
                    ? (prev - 1 + PROJECTS.length) % PROJECTS.length
                    : (prev + 1) % PROJECTS.length
                );
                dragRef.current = { startX: e.touches[0].clientX, dragging: false };
              }
            }}
            onTouchEnd={() => { dragRef.current.dragging = false; }}
          >
            {PROJECTS.map((project, i) => {
              const n = PROJECTS.length;
              let offset = i - activeIndex;
              // Wrap around so cards always take the shortest path
              if (offset > n / 2) offset -= n;
              if (offset < -n / 2) offset += n;
              const absOffset = Math.abs(offset);
              const isActive = offset === 0;

              // Fan layout: active card center, others fan out
              const translateX = offset * cardSpacing;
              const translateY = absOffset * (cardSpacing < 50 ? 10 : 15);
              const rotate = offset * -4;
              const scale = isActive ? 1 : 0.82 - absOffset * 0.05;
              const opacity = isActive ? 1 : 0.4 - absOffset * 0.08;
              const zIndex = n - absOffset;

              return (
                <button
                  key={project.id}
                  onClick={() => {
                    if (isActive) {
                      setSelectedProject(project);
                    } else {
                      setActiveIndex(i);
                    }
                  }}
                  className="absolute w-52 h-72 sm:w-60 sm:h-80 lg:w-64 lg:h-[340px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer border border-white/10"
                  style={{
                    transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
                    opacity: Math.max(opacity, 0),
                    zIndex,
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.cover}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    )}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white/60 text-[10px] uppercase tracking-wider">
                          {isZh ? project.subtitle : project.subtitleEn}
                        </p>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: title + description */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <p className="text-white/40 text-[11px] uppercase tracking-[0.2em] mb-2">
              {isZh ? activeProject.subtitle : activeProject.subtitleEn}
            </p>
            <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              {isZh ? activeProject.title : activeProject.titleEn}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-md mx-auto lg:mx-0">
              {isZh ? activeProject.description : activeProject.descriptionEn}
            </p>
            <button
              onClick={() => setSelectedProject(activeProject)}
              className="inline-flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors"
            >
              {isZh ? '查看详情' : 'View details'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="flex gap-2 mt-8 justify-center lg:justify-start">
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'bg-white w-6'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detail modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative bg-[var(--background)] rounded-3xl w-[90vw] max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Scrollable content */}
            <div className="p-6 overflow-y-auto max-h-[85vh]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[var(--foreground)]">
                    {isZh ? selectedProject.title : selectedProject.titleEn}
                  </h3>
                  <p className="text-[12px] text-[var(--muted)] mt-0.5">
                    {isZh ? selectedProject.subtitle : selectedProject.subtitleEn}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--border)] transition-colors text-[var(--muted)] hover:text-[var(--foreground)] shrink-0"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <p className="text-[14px] text-[var(--foreground)] mt-4 leading-relaxed">
                {isZh ? selectedProject.description : selectedProject.descriptionEn}
              </p>
              {selectedProject.url && (
                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full bg-[var(--foreground)] text-[var(--background)] text-sm font-medium hover:opacity-80 transition-opacity"
                >
                  {isZh ? '查看作品' : 'View project'}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
              {/* Videos */}
              {selectedProject.videos && selectedProject.videos.length > 0 && (
                <div className={`mt-6 ${
                  selectedProject.videos.length === 1
                    ? 'flex justify-center'
                    : 'grid grid-cols-1 sm:grid-cols-2 gap-3'
                }`}>
                  {selectedProject.videos.map((src, i) => (
                    <video
                      key={i}
                      src={src}
                      controls
                      playsInline
                      className={`rounded-xl shadow-sm ${
                        selectedProject.videos!.length === 1
                          ? 'w-full max-w-sm'
                          : 'w-full'
                      }`}
                    />
                  ))}
                </div>
              )}
              {/* Gallery images */}
              {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                <div className={`mt-6 ${
                  selectedProject.gallery.length === 1
                    ? ''
                    : 'grid grid-cols-1 sm:grid-cols-2 gap-3'
                }`}>
                  {selectedProject.gallery.map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i}
                      src={src}
                      alt={`${selectedProject.title} ${i + 1}`}
                      className="w-full rounded-xl object-cover"
                      loading="lazy"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
