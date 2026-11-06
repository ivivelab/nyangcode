'use client';

import { useState } from 'react';
import FullPageScroll from '@/components/layout/FullPageScroll';
import MainVideoSection from '@/components/sections/MainVideoSection';
import ImageTextSection from '@/components/sections/ImageTextSection';
import ServicesSection from '@/components/sections/ServicesSection';
import CharacterGallerySection from '@/components/sections/CharacterGallerySection';
import ContactSection from '@/components/sections/ContactSection';
import NavigationUI from '@/components/layout/NavigationUI';
import BlogArchiveModal from '@/components/sections/BlogArchiveModal';

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  // 카카오톡 채널 1:1 채팅 새창으로 띄우는 함수
  const handleOpenKakaoTalk = () => {
    window.open('http://pf.kakao.com/_VWPxeX/chat', '_blank');
  };

  return (
    <main className="relative bg-black w-screen h-screen overflow-hidden text-white font-sans">
      <NavigationUI
        totalSections={5}
        currentIndex={currentIndex}
        onSelectSection={(idx) => setCurrentIndex(idx)}
        onOpenArchive={() => setIsArchiveOpen(true)}
        onOpenChat={handleOpenKakaoTalk}
      />

      <BlogArchiveModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
      />

      <FullPageScroll
        externalIndex={currentIndex}
        onIndexChange={setCurrentIndex}
        isPaused={isArchiveOpen}
      >
        {/* 0번: HERO */}
        <MainVideoSection />

        {/* 1번: ABOUT */}
        <ImageTextSection
          title="ABOUT NYANGCODE"
          description={`간식보다 코드가 더 짜릿한 개발 메이트 꾸꾸와 함께\n기획부터 배포까지 비즈니스 로직도 깔끔하게 풀어냅니다.`}
        />

        {/* 2번: SERVICES */}
        <ServicesSection />

        {/* 3번: PORTFOLIO */}
        <CharacterGallerySection />

        {/* 4번: CONTACT */}
        <ContactSection />
      </FullPageScroll>
    </main>
  );
}