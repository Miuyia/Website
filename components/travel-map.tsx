'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from './locale-provider';
import { travelPlaces, type TravelPlace } from '@/lib/travel';

// Show 12 featured places on homepage
const FEATURED_PLACES = travelPlaces.slice(0, 12);

export function TravelMap() {
  const [selectedPlace, setSelectedPlace] = useState<TravelPlace | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const { locale } = useLocale();
  const isZh = locale === 'zh';

  // Slow auto-scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let paused = false;

    const scroll = () => {
      if (!paused && container) {
        container.scrollLeft += 0.5;
        // Loop: when scrolled halfway (the duplicated set), reset
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    const pause = () => { paused = true; };
    const resume = () => { paused = false; };

    container.addEventListener('mouseenter', pause);
    container.addEventListener('mouseleave', resume);
    container.addEventListener('touchstart', pause);
    container.addEventListener('touchend', resume);

    return () => {
      cancelAnimationFrame(animationRef.current);
      container.removeEventListener('mouseenter', pause);
      container.removeEventListener('mouseleave', resume);
      container.removeEventListener('touchstart', pause);
      container.removeEventListener('touchend', resume);
    };
  }, []);

  return (
    <>
      {/* Scrolling photo strip */}
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex gap-4 w-max py-2">
          {/* Duplicate for infinite scroll illusion */}
          {[...FEATURED_PLACES, ...FEATURED_PLACES].map((place, i) => (
            <button
              key={`${place.slug}-${i}`}
              onClick={() => setSelectedPlace(place)}
              className="group relative flex-shrink-0 w-72 h-96 rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={place.cover}
                alt={place.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-[15px]">
                  {isZh ? place.name : place.subtitle}
                </p>
                <p className="text-white/70 text-[12px] mt-0.5">
                  {place.gallery?.length || 0} {isZh ? '张照片' : 'photos'}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal: gallery for selected place */}
      {selectedPlace && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedPlace(null)}
        >
          <div
            className="relative bg-[var(--background)] rounded-3xl max-w-4xl w-[90vw] max-h-[85vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--background)]">
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground)]">
                  {isZh ? selectedPlace.name : selectedPlace.subtitle}
                </h3>
                <p className="text-[13px] text-[var(--muted)] mt-0.5">
                  {selectedPlace.date} · {selectedPlace.gallery?.length || 0} {isZh ? '张照片' : 'photos'}
                </p>
              </div>
              <button
                onClick={() => setSelectedPlace(null)}
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
                {selectedPlace.gallery?.map((photo, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={photo.src}
                    alt={photo.alt}
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
