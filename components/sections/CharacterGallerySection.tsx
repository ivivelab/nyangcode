'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  image: string;
}

// 1. 주요 프로젝트 (Selected Works - 상단 그리드용)
const MAIN_WORKS: GalleryItem[] = [
  { id: 1, title: 'Shinhan Bank VML', image: '/images/portfolio_01.png' },
  { id: 2, title: 'Ahnlab Ad', image: '/images/portfolio_02.png' },
  { id: 3, title: 'SNU Bundang Hospital', image: '/images/portfolio_03.png' },
  { id: 4, title: 'Seongnam Medical Center', image: '/images/portfolio_04.png' },
  { id: 5, title: 'Seoul Arisu', image: '/images/portfolio_05.png' },
  { id: 6, title: 'World Jamboree', image: '/images/portfolio_06.png' },
  { id: 7, title: 'Smart Dispatch System', image: '/images/portfolio_07.png' },
  { id: 8, title: 'VV-ENTER APOKI', image: '/images/portfolio_08.png' },
  { id: 9, title: 'MOIBA', image: '/images/portfolio_09.png' },
  { id: 10, title: 'Saemaul HQ', image: '/images/portfolio_10.png' },
];

// 2. 서브 아카이브 목록 (Full Archive Index - 하단 그리드용)
const SUB_ARCHIVES: GalleryItem[] = [
  { id: 11, title: 'NH Sports Group', image: '/images/sub-portfolio-01.jpg' },
  { id: 12, title: 'VENEBLUE Walkerhill', image: '/images/sub-portfolio-02.jpg' },
  { id: 13, title: 'Idea Factory', image: '/images/sub-portfolio-03.jpg' },
  { id: 14, title: 'KRRESA', image: '/images/sub-portfolio-04.jpg' },
  { id: 15, title: 'Bongpo KOAROO', image: '/images/sub-portfolio-05.jpg' },
  { id: 16, title: 'G-Tower Center', image: '/images/sub-portfolio-06.jpg' },
  { id: 17, title: 'M-Cluster', image: '/images/sub-portfolio-07.jpg' },
  { id: 18, title: 'KGC - GiniPet', image: '/images/sub-portfolio-08.jpg' },
  { id: 19, title: 'Hyosung Harrington', image: '/images/sub-portfolio-09.jpg' },
  { id: 20, title: 'Jung Kwan Jang Mall', image: '/images/sub-portfolio-10.jpg' },
  { id: 21, title: 'Spring County Xi', image: '/images/sub-portfolio-11.jpg' },
  { id: 22, title: 'Xi Hybrid App', image: '/images/sub-portfolio-12.jpg' },
  { id: 23, title: 'KOAROO Car-Board', image: '/images/sub-portfolio-13.jpg' },
  { id: 24, title: "Sejong Leader's Foret", image: '/images/sub-portfolio-14.jpg' },
  { id: 25, title: 'Sejong Finance Center', image: '/images/sub-portfolio-15.jpg' },
  { id: 26, title: 'SK Chemicals', image: '/images/sub-portfolio-16.jpg' },
  { id: 27, title: 'Semiconductor Center', image: '/images/sub-portfolio-19.jpg' },
  { id: 28, title: 'Yurim Norwegian Wood', image: '/images/sub-portfolio-21.jpg' },
];

export default function CharacterGallerySection() {
  return (
    <div
      className="relative w-screen h-screen text-white overflow-y-auto px-6 md:px-16 py-20 bg-cover bg-center select-none"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(13, 13, 18, 0.92), rgba(13, 13, 18, 0.98)), url('/images/portfolio.png')`,
      }}
    >
      <div className="max-w-7xl mx-auto w-full z-15 relative">
        
        {/* 상단: Selected Works 헤더 */}
        <div className="mb-10">
          <span className="text-xs font-bold tracking-[0.25em] text-amber-500 uppercase block mb-1">
            PORTFOLIO EVIDENCE
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white">
            Selected Works
          </h2>
          <p className="text-sm text-zinc-400 font-light mt-2">
            Proven expertise and records of innovation across digital ecosystems.
          </p>
        </div>

        {/* 상단 메인 프로젝트 썸네일 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {MAIN_WORKS.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[16/10] bg-zinc-900/90 border border-zinc-800 rounded-xl overflow-hidden hover:border-amber-400/80 transition-all duration-300 hover:-translate-y-1 cursor-pointer shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-xs font-bold text-amber-300 truncate">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 하단: Full Archive Index (서브 포트폴리오 섹션) */}
        <div className="pt-10 border-t border-zinc-800/80">
          <h3 className="text-xs font-mono tracking-[0.3em] text-zinc-400 uppercase mb-6">
            FULL ARCHIVE INDEX ({SUB_ARCHIVES.length} SELECTED)
          </h3>

          {/* 6열 슬림 그리드 (레퍼런스 구조 반영) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {SUB_ARCHIVES.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="aspect-[16/11] bg-zinc-900/80 border border-zinc-800/80 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                    loading="lazy"
                  />
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-[11px] text-zinc-300 font-medium truncate group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}