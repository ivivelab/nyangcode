'use client';

import { Code2, Zap, Palette, ShieldCheck } from 'lucide-react';

const SERVICES = [
  {
    id: 'web-app',
    icon: Code2,
    badge: '🚀 빠르게',
    title: '웹 & 앱 만들기',
    summary: '아이디어를 실제로 동작하는 웹과 앱으로 만듭니다.',
    color: 'group-hover:text-amber-400',
  },
  {
    id: 'automation',
    icon: Zap,
    badge: '⚡️ 똑똑하게',
    title: '귀찮은 업무 자동화',
    summary: '매일 반복되는 지루한 작업을 버튼 하나로 줄여드립니다.',
    color: 'group-hover:text-amber-400',
  },
  {
    id: 'ui-ux',
    icon: Palette,
    badge: '✨ 깔끔하게',
    title: '착 붙는 UI/UX 디자인',
    summary: '보기 쉽고 사용하기 편한 화면을 16년 노하우로 설계합니다.',
    color: 'group-hover:text-amber-400',
  },
  {
    id: 'maintenance',
    icon: ShieldCheck,
    badge: '🛡️ 든든하게',
    title: '안심 유지보수',
    summary: '만들고 끝이 아닙니다. 문제없이 돌아가도록 계속 케어합니다.',
    color: 'group-hover:text-amber-400',
  },
];

export default function ServicesSection() {
  return (
    <section 
      className="relative w-screen h-screen text-white flex flex-col justify-center px-6 md:px-16 overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(13, 13, 18, 0.85), rgba(13, 13, 18, 0.95)), url('/images/service.png')`,
      }}
    >
      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* 헤더 영역 */}
        <div className="text-center mb-10 md:mb-14">
          <span className="text-xs font-bold tracking-[0.2em] text-amber-500 uppercase block mb-2">
            SERVICES
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            냥코드는 이런 일을 잘해요
          </h2>
        </div>

        {/* 2x2 직관적인 4카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {SERVICES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative bg-zinc-900/80 border border-zinc-800/80 hover:border-amber-500/50 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 cursor-pointer flex items-start gap-4 backdrop-blur-sm"
              >
                {/* 왼쪽 직관적인 아이콘 박스 */}
                <div className="w-12 h-12 rounded-xl bg-zinc-800/90 flex items-center justify-center shrink-0 text-zinc-300 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                  <Icon className="w-6 h-6" />
                </div>

                {/* 오른쪽 타이틀 & 한 줄 요약 */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold text-white mb-1 transition-colors ${item.color}`}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}