'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface FullPageScrollProps {
  children: ReactNode[];
  externalIndex?: number;
  onIndexChange?: (index: number) => void;
  isPaused?: boolean;
}

export default function FullPageScroll({
  children,
  externalIndex = 0,
  onIndexChange,
  isPaused = false,
}: FullPageScrollProps) {
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  useEffect(() => {
    // 1. PC 마우스 휠 핸들러
    const handleWheel = (e: WheelEvent) => {
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

    // 2. 모바일 터치 시작 핸들러
    const handleTouchStart = (e: TouchEvent) => {
      if (isPaused) return;
      touchStartY.current = e.touches[0].clientY;
    };

    // 3. 모바일 터치 종료 핸들러 (스와이프 방향 감지)
    const handleTouchEnd = (e: TouchEvent) => {
      if (isPaused) return;
      touchEndY.current = e.changedTouches[0].clientY;

      const diff = touchStartY.current - touchEndY.current;
      const threshold = 50; // 스와이프 인식 최소 거리 (px)

      if (Math.abs(diff) < threshold) return;
      if (isScrolling.current) return;

      isScrolling.current = true;

      if (diff > 0) {
        // 손가락을 위로 올림 (다음 섹션으로)
        onIndexChange?.(Math.min(externalIndex + 1, children.length - 1));
      } else {
        // 손가락을 아래로 내림 (이전 섹션으로)
        onIndexChange?.(Math.max(externalIndex - 1, 0));
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 800);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
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