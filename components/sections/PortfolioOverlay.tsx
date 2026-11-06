'use client';

import { X } from 'lucide-react';

interface PortfolioOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: Array<{ title: string; desc?: string; bgImg?: string }>;
}

export default function PortfolioOverlay({ isOpen, onClose, title, items }: PortfolioOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl overflow-y-auto transition-all duration-500 p-8 md:p-16">
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="fixed top-8 right-8 text-zinc-400 hover:text-white flex items-center gap-2 text-sm uppercase tracking-widest bg-zinc-900/80 px-4 py-2 rounded-full border border-zinc-800 z-50"
      >
        <X className="w-4 h-4" /> CLOSE
      </button>

      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{title}</h2>
        <p className="text-emerald-400 tracking-widest text-sm uppercase mb-12">
          NYANGCODE ARCHIVE & SELECTED WORKS
        </p>

        {/* 포트폴리오 그리드 뷰 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="group bg-zinc-900/60 border border-zinc-800/80 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="aspect-video bg-zinc-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-sm">
                  {item.bgImg ? (
                    <img src={item.bgImg} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    `PROJECT_IMAGE_${idx + 1}`
                  )}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                {item.desc && <p className="text-zinc-400 text-sm mt-2 leading-relaxed">{item.desc}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}