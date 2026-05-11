'use client';

import { useState } from 'react';
import { useLocale } from './locale-provider';

type Tab = 'miki' | 'lucky' | 'concerts';

type ConcertArtist = {
  slug: string;
  name: string;
  nameEn: string;
  cover: string;
  photos: string[];
};

const MIKI_PHOTOS = [
  '/personal/miki/1.jpeg',
  '/personal/miki/2.jpeg',
  '/personal/miki/3.jpeg',
  '/personal/miki/4.jpeg',
  '/personal/miki/5.jpeg',
  '/personal/miki/6.JPG',
];
const LUCKY_PHOTOS = [
  ...Array.from({ length: 6 }, (_, i) => `/personal/lucky/${i + 1}.jpeg`),
  '/personal/lucky/7.JPEG',
  '/personal/lucky/8.JPEG',
];

const CONCERTS: ConcertArtist[] = [
  {
    slug: '周杰伦',
    name: '周杰伦',
    nameEn: 'Jay Chou',
    cover: '/personal/concerts/周杰伦/IMG_7614.JPG',
    photos: [
      '/personal/concerts/周杰伦/b11f0479d6768073ad197881b950ea4c.jpg',
      '/personal/concerts/周杰伦/FullSizeRender.jpeg',
      '/personal/concerts/周杰伦/IMG_7614.JPG',
      '/personal/concerts/周杰伦/IMG_7638.jpeg',
      '/personal/concerts/周杰伦/IMG_7644.JPG',
      '/personal/concerts/周杰伦/IMG_7646.JPG',
      '/personal/concerts/周杰伦/IMG_7712.jpeg',
      '/personal/concerts/周杰伦/IMG_7713.jpeg',
    ],
  },
  {
    slug: 'tyler swift',
    name: 'Taylor Swift',
    nameEn: 'Taylor Swift',
    cover: '/personal/concerts/tyler swift/IMG_6154.JPG',
    photos: [
      '/personal/concerts/tyler swift/4907bbbc74e29fa8579f6f970019a2bd.jpg',
      '/personal/concerts/tyler swift/IMG_6119.JPG',
      '/personal/concerts/tyler swift/IMG_6154.JPG',
      '/personal/concerts/tyler swift/IMG_6164.JPG',
      '/personal/concerts/tyler swift/IMG_6191.JPG',
      '/personal/concerts/tyler swift/IMG_6217.JPG',
      '/personal/concerts/tyler swift/IMG_6282.JPG',
      '/personal/concerts/tyler swift/IMG_9558.jpeg',
    ],
  },
  {
    slug: '陈奕迅',
    name: '陈奕迅',
    nameEn: 'Eason Chan',
    cover: '/personal/concerts/陈奕迅/IMG_3470.JPG',
    photos: [
      '/personal/concerts/陈奕迅/IMG_2350.jpeg',
      '/personal/concerts/陈奕迅/IMG_2396.jpeg',
      '/personal/concerts/陈奕迅/IMG_3470.JPG',
      '/personal/concerts/陈奕迅/IMG_3473.JPG',
      '/personal/concerts/陈奕迅/IMG_3502.JPG',
      '/personal/concerts/陈奕迅/IMG_3516.JPG',
      '/personal/concerts/陈奕迅/livePhoto_1743940951.jpeg',
    ],
  },
  {
    slug: 'keshi',
    name: 'keshi',
    nameEn: 'keshi',
    cover: '/personal/concerts/keshi/IMG_3068.JPG',
    photos: [
      '/personal/concerts/keshi/IMG_3059.JPG',
      '/personal/concerts/keshi/IMG_3068.JPG',
      '/personal/concerts/keshi/IMG_3078.JPG',
      '/personal/concerts/keshi/IMG_3117.JPG',
      '/personal/concerts/keshi/IMG_3149.PNG',
      '/personal/concerts/keshi/IMG_3152.JPG',
    ],
  },
  {
    slug: 'travis scott',
    name: 'Travis Scott',
    nameEn: 'Travis Scott',
    cover: '/personal/concerts/travis scott/IMG_2380.JPG',
    photos: [
      '/personal/concerts/travis scott/IMG_2346.JPG',
      '/personal/concerts/travis scott/IMG_2380.JPG',
      '/personal/concerts/travis scott/IMG_2382.JPG',
      '/personal/concerts/travis scott/IMG_2387.JPG',
      '/personal/concerts/travis scott/IMG_2394.JPG',
      '/personal/concerts/travis scott/IMG_2397.JPG',
    ],
  },
  {
    slug: '陶喆',
    name: '陶喆',
    nameEn: 'David Tao',
    cover: '/personal/concerts/陶喆/IMG_8292.JPG',
    photos: [
      '/personal/concerts/陶喆/IMG_8269.JPG',
      '/personal/concerts/陶喆/IMG_8292.JPG',
      '/personal/concerts/陶喆/IMG_8295.JPG',
      '/personal/concerts/陶喆/IMG_8325.JPG',
    ],
  },
  {
    slug: '罗言',
    name: '罗言',
    nameEn: 'Luo Yan',
    cover: '/personal/concerts/罗言/IMG_6235.JPG',
    photos: [
      '/personal/concerts/罗言/IMG_6235.JPG',
      '/personal/concerts/罗言/IMG_6240.JPG',
      '/personal/concerts/罗言/IMG_6242.JPG',
      '/personal/concerts/罗言/IMG_6246.JPG',
    ],
  },
  {
    slug: 'asen',
    name: 'Asen',
    nameEn: 'Asen',
    cover: '/personal/concerts/asen/IMG_8579.JPG',
    photos: [
      '/personal/concerts/asen/IMG_8563.JPG',
      '/personal/concerts/asen/IMG_8579.JPG',
      '/personal/concerts/asen/IMG_8589.JPG',
      '/personal/concerts/asen/IMG_8594.JPG',
      '/personal/concerts/asen/IMG_8606.JPG',
    ],
  },
];

export function PersonalSection({ locale }: { locale: string }) {
  const [activeTab, setActiveTab] = useState<Tab>('miki');
  const [selectedArtist, setSelectedArtist] = useState<ConcertArtist | null>(null);
  const isZh = locale === 'zh';

  const tabs: { key: Tab; label: string; labelEn: string }[] = [
    { key: 'miki', label: 'Miki 🐱', labelEn: 'Miki 🐱' },
    { key: 'lucky', label: 'Lucky 🐶', labelEn: 'Lucky 🐶' },
    { key: 'concerts', label: '演唱会', labelEn: 'Concerts' },
  ];

  return (
    <>
      <section id="personal" className="mb-24 pt-20 border-t border-[var(--border)]">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-serif italic">
            {isZh ? '更多关于我' : 'More about me'}
            <span className="text-[var(--muted)]">.</span>
          </h2>
          <p className="text-[var(--muted)] text-sm mt-3 max-w-md mx-auto leading-relaxed">
            {isZh
              ? '两只毛孩子 Miki & Lucky，和一颗追现场的心。'
              : 'Two fur babies — Miki & Lucky — and a heart that chases live music.'}
          </p>
        </div>

        {/* Tab pills */}
        <div className="flex justify-center gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-5 py-2 text-sm transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-[var(--foreground)] text-[var(--background)] shadow-sm'
                  : 'border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)]'
              }`}
            >
              {isZh ? tab.label : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'miki' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {MIKI_PHOTOS.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt={`Miki ${i + 1}`}
                className="w-full aspect-square object-cover rounded-2xl hover:scale-[1.02] transition-transform duration-300"
                loading="lazy"
              />
            ))}
          </div>
        )}

        {activeTab === 'lucky' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {LUCKY_PHOTOS.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt={`Lucky ${i + 1}`}
                className="w-full aspect-square object-cover rounded-2xl hover:scale-[1.02] transition-transform duration-300"
                loading="lazy"
              />
            ))}
          </div>
        )}

        {activeTab === 'concerts' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {CONCERTS.map((artist) => (
              <button
                key={artist.slug}
                onClick={() => setSelectedArtist(artist)}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={artist.cover}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold text-[15px]">
                    {isZh ? artist.name : artist.nameEn}
                  </p>
                  <p className="text-white/60 text-[12px] mt-0.5">
                    {artist.photos.length} {isZh ? '张照片' : 'photos'}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Concert gallery modal */}
      {selectedArtist && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedArtist(null)}
        >
          <div
            className="relative bg-[var(--background)] rounded-3xl max-w-4xl w-[90vw] max-h-[85vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--background)]">
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground)]">
                  {isZh ? selectedArtist.name : selectedArtist.nameEn}
                </h3>
                <p className="text-[13px] text-[var(--muted)] mt-0.5">
                  {selectedArtist.photos.length} {isZh ? '张照片' : 'photos'}
                </p>
              </div>
              <button
                onClick={() => setSelectedArtist(null)}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--border)] transition-colors text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Photo grid */}
            <div className="overflow-y-auto p-4 max-h-[calc(85vh-72px)]">
              <div className="columns-2 sm:columns-3 gap-3 space-y-3">
                {selectedArtist.photos.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={src}
                    alt={`${selectedArtist.name} ${i + 1}`}
                    className="w-full rounded-xl break-inside-avoid"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
