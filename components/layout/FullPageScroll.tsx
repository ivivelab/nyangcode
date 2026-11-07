
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
  const touchStartScrollable = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isPaused) return;

      e.preventDefault();

      if (isScrolling.current) return;
      if (Math.abs(e.deltaY) < 30) return;

      isScrolling.current = true;

      if (e.deltaY > 0) {
        onIndexChange?.(
          Math.min(externalIndex + 1, children.length - 1)
        );
      } else {
        onIndexChange?.(
          Math.max(externalIndex - 1, 0)
        );
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 800);
    };

    // 모바일 터치 시작
    const handleTouchStart = (e: TouchEvent) => {
      if (isPaused) return;

      touchStartY.current = e.touches[0].clientY;

      const target = e.target;

      if (target instanceof Element) {
        touchStartScrollable.current = target.closest(
          '[data-inner-scroll]'
        ) as HTMLElement | null;
      } else {
        touchStartScrollable.current = null;
      }
    };

    // 모바일 터치 종료
    const handleTouchEnd = (e: TouchEvent) => {
      if (isPaused) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY;
      const threshold = 50;

      if (Math.abs(diff) < threshold) return;
      if (isScrolling.current) return;

      const scrollable = touchStartScrollable.current;

      // 포트폴리오 내부 스크롤 처리
      if (scrollable) {
        const { scrollTop, scrollHeight, clientHeight } = scrollable;

        const hasVerticalScroll =
          scrollHeight > clientHeight + 1;

        if (hasVerticalScroll) {
          const isAtTop = scrollTop <= 1;

          const isAtBottom =
            scrollTop + clientHeight >= scrollHeight - 1;

          // 손가락을 위로 움직임:
          // 내부 콘텐츠를 아래로 스크롤할 수 있다면
          // 풀페이지 전환을 막는다.
          if (diff > 0 && !isAtBottom) {
            touchStartScrollable.current = null;
            return;
          }

          // 손가락을 아래로 움직임:
          // 내부 콘텐츠를 위로 스크롤할 수 있다면
          // 풀페이지 전환을 막는다.
          if (diff < 0 && !isAtTop) {
            touchStartScrollable.current = null;
            return;
          }
        }
      }

      touchStartScrollable.current = null;

      // 내부 스크롤의 끝에 도달했을 때만
      // 풀페이지 전환
      isScrolling.current = true;

      if (diff > 0) {
        onIndexChange?.(
          Math.min(externalIndex + 1, children.length - 1)
        );
      } else {
        onIndexChange?.(
          Math.max(externalIndex - 1, 0)
        );
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 800);
    };

    window.addEventListener('wheel', handleWheel, {
      passive: false,
    });

    window.addEventListener(
      'touchstart',
      handleTouchStart,
      { passive: true }
    );

    window.addEventListener(
      'touchend',
      handleTouchEnd,
      { passive: true }
    );

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [
    externalIndex,
    children.length,
    onIndexChange,
    isPaused,
  ]);

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <div
        className="w-full h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateY(-${externalIndex * 100}vh)`,
        }}
      >
        {children.map((child, index) => (
          <section
            key={index}
            className="w-screen h-screen relative overflow-hidden"
          >
            {child}
          </section>
        ))}
      </div>
    </div>
  );
}
