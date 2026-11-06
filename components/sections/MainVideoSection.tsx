'use client';

import { useEffect, useRef } from 'react';

export default function MainVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("비디오 자동 재생 중 에러:", error);
      });
    }
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-black">
      {/* 배경 비디오 */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/nyangcode.mp4" type="video/mp4" />
        브라우저가 비디오 태그를 지원하지 않습니다.
      </video>

      {/* 비디오 위 가독성을 위한 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* 영상 위 텍스트 컨텐츠 */}
      <div className="relative z-20 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
          NYANGCODE
        </h1>
        <p className="text-lg md:text-2xl font-light opacity-90">
          코딩하는 고양이 꾸꾸
        </p>
      </div>
    </div>
  );
}