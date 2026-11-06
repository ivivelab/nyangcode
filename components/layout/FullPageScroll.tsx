'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface FullPageScrollProps {
  children: ReactNode[];
  externalIndex?: number;
  onIndexChange?: (index: number) => void;
  isPaused?: boolean; // 💡 모달 등 열렸을 때 휠 막는 용도
}

export default function FullPageScroll({
  children,
  externalIndex = 0,
  onIndexChange,
  isPaused = false,
}: FullPageScrollProps) {
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // 💡 모달이 열려있으면 풀스크롤 휠 제어를 아예 동작시키지 않음
      if (isPaused) return;

      e.preventDefault();
      if (isScrolling.current) return;
      if (Math.abs(e.deltaY) < 30) return;

      isScrolling.current = true;

      if (e.deltaY > 0) {
        onIndexChange?.(Math.min(externalIndex + 1, children.length - 1));
      } else {
        onIndexChange?.(Math.max(externalIndex - 1, 0));
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 800);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [externalIndex, children.length, onIndexChange, isPaused]);

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <div
        className="w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateY(-${externalIndex * 100}vh)` }}
      >
        {children.map((child, index) => (
          <section key={index} className="w-screen h-screen relative overflow-hidden">
            {child}
          </section>
        ))}
      </div>
    </div>
  );
}