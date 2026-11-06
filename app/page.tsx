'use client';

import { useState } from 'react';
import FullPageScroll from '@/components/layout/FullPageScroll';
import MainVideoSection from '@/components/sections/MainVideoSection';
import ImageTextSection from '@/components/sections/ImageTextSection';
import CharacterGallerySection from '@/components/sections/CharacterGallerySection';
import ContactSection from '@/components/sections/ContactSection'; // 👈 기존에 있던 ContactSection 임포트!
import NavigationUI from '@/components/layout/NavigationUI';
import BlogArchiveModal from '@/components/sections/BlogArchiveModal';

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  return (
    <main className="relative bg-black w-screen h-screen overflow-hidden text-white font-sans">
      <NavigationUI
        totalSections={5}
        currentIndex={currentIndex}
        onSelectSection={(idx) => setCurrentIndex(idx)}
        onOpenArchive={() => setIsArchiveOpen(true)}
        onOpenChat={() => alert('문의 챗봇창이 열립니다!')}
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
          description={`냥코드(NyangCode)는 감각적인 디지털 경험을 설계하는 스튜디오입니다.\n마스코트 '야니'와 함께 유니크하고 트렌디한 가치를 만듭니다.`}
        />

        {/* 2번: SERVICES */}
        <ImageTextSection
          title="OUR SERVICES"
          description={`• High-End Web Development\n• Character Branding & Design\n• Interactive UI/UX Architecture`}
        />

        {/* 3번: PORTFOLIO */}
        <CharacterGallerySection />

        {/* 4번: CONTACT (기존에 있던 ContactSection 컴포넌트 출력) */}
        <ContactSection />
      </FullPageScroll>
    </main>
  );
}