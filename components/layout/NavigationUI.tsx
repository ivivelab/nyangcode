'use client';

import { useState } from 'react';
import { MessageCircle, Sparkles, ArrowUp, Menu, X } from 'lucide-react';

interface NavigationUIProps {
  totalSections: number;
  currentIndex: number;
  onSelectSection: (index: number) => void;
  onOpenArchive: () => void;
  onOpenChat: () => void;
  onToggleTheme?: () => void;
}

export default function NavigationUI({
  totalSections,
  currentIndex,
  onSelectSection,
  onOpenArchive,
  onOpenChat,
  onToggleTheme,
}: NavigationUIProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (index: number) => {
    onSelectSection(index);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* 1. 상단 헤더 */}
      <header className="fixed top-0 left-0 w-full z-40 px-6 md:px-12 py-5 flex justify-between items-center bg-gradient-to-b from-black/90 via-black/40 to-transparent backdrop-blur-sm">
        {/* 로고: 클릭 시 HERO(0번) 섹션으로 이동 */}
        <div 
          onClick={() => handleNavClick(0)} 
          className="text-xl md:text-2xl font-black tracking-tighter text-white cursor-pointer hover:text-emerald-400 transition-colors select-none"
        >
          NYANGCODE
        </div>
        
        {/* PC 상단 메뉴 (ABOUT: 1, SERVICES: 2, PORTFOLIO: 3, CONTACT: 4) */}
        <nav className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
          <button 
            onClick={() => handleNavClick(1)} 
            className={`cursor-pointer transition-colors hover:text-white ${currentIndex === 1 ? 'text-emerald-400' : ''}`}
          >
            ABOUT
          </button>
          <button 
            onClick={() => handleNavClick(2)} 
            className={`cursor-pointer transition-colors hover:text-white ${currentIndex === 2 ? 'text-emerald-400' : ''}`}
          >
            SERVICES
          </button>
          <button 
            onClick={() => handleNavClick(3)} 
            className={`cursor-pointer transition-colors hover:text-white ${currentIndex === 3 ? 'text-emerald-400' : ''}`}
          >
            PORTFOLIO
          </button>
          <button 
            onClick={() => handleNavClick(4)} 
            className={`cursor-pointer transition-colors hover:text-white ${currentIndex === 4 ? 'text-emerald-400' : ''}`}
          >
            CONTACT
          </button>
        </nav>

        {/* 우측 ARCHIVE 버튼 & 모바일 햄버거 토글 */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenArchive}
            className="cursor-pointer px-4 py-1.5 rounded-full border border-emerald-400 text-emerald-400 font-bold text-xs hover:bg-emerald-400 hover:text-black transition-all"
          >
            ARCHIVE
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="cursor-pointer md:hidden p-2 text-zinc-300 hover:text-white"
            aria-label="메뉴 열기"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* 2. 모바일 전체화면 드롭다운 메뉴 */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden text-lg font-bold tracking-widest">
          <button
            onClick={() => handleNavClick(1)}
            className={`cursor-pointer hover:text-emerald-400 transition-colors ${currentIndex === 1 ? 'text-emerald-400' : 'text-zinc-300'}`}
          >
            ABOUT
          </button>
          <button
            onClick={() => handleNavClick(2)}
            className={`cursor-pointer hover:text-emerald-400 transition-colors ${currentIndex === 2 ? 'text-emerald-400' : 'text-zinc-300'}`}
          >
            SERVICES
          </button>
          <button
            onClick={() => handleNavClick(3)}
            className={`cursor-pointer hover:text-emerald-400 transition-colors ${currentIndex === 3 ? 'text-emerald-400' : 'text-zinc-300'}`}
          >
            PORTFOLIO
          </button>
          <button
            onClick={() => handleNavClick(4)}
            className={`cursor-pointer hover:text-emerald-400 transition-colors ${currentIndex === 4 ? 'text-emerald-400' : 'text-zinc-300'}`}
          >
            CONTACT
          </button>
        </div>
      )}

      {/* 3. 왼쪽: 스크롤 도트 인디케이터 (5개) */}
      <div className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
        {Array.from({ length: totalSections }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onSelectSection(idx)}
            className={`cursor-pointer w-2.5 transition-all duration-300 rounded-full ${
              currentIndex === idx
                ? 'bg-emerald-400 h-8'
                : 'bg-white/30 hover:bg-white/70 h-2.5'
            }`}
            aria-label={`${idx + 1}번째 페이지로 이동`}
          />
        ))}
      </div>

      {/* 4. 오른쪽: 플로팅 퀵 메뉴 */}
      <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 md:gap-4 items-center">
        <button
          onClick={onOpenChat}
          className="cursor-pointer group relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-900/80 border border-zinc-700/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-emerald-500 hover:border-emerald-400 transition-all shadow-xl"
        >
          <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <button
          onClick={onToggleTheme || (() => alert("야니네코 캐릭터 모드 준비 중!"))}
          className="cursor-pointer group relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-900/80 border border-zinc-700/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-purple-500 hover:border-purple-400 transition-all shadow-xl"
        >
          <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <button
          onClick={() => onSelectSection(0)}
          className="cursor-pointer group relative w-9 h-9 md:w-10 md:h-10 rounded-full bg-zinc-900/60 border border-zinc-800 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all mt-1 shadow-md"
        >
          <ArrowUp className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </button>
      </div>
    </>
  );
}