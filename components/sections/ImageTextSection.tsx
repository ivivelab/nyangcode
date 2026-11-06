interface ImageTextSectionProps {
  title: string;
  description: string;
  characterImage?: string; // 나중에 왼쪽 이미지를 삭제하거나 바꿀 때 유연하게 대응
}

export default function ImageTextSection({
  title,
  description,
  characterImage = '/images/nyangcat.png', // 기본 고양이 이미지 경로
}: ImageTextSectionProps) {
  return (
    <div 
  className="relative w-screen h-screen text-white flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 py-12 lg:py-0 overflow-hidden bg-cover bg-center"
  style={{
    backgroundImage: `linear-gradient(to bottom, rgba(13, 13, 18, 0.85), rgba(13, 13, 18, 0.95)), url('/images/about.png')`,
  }}
>
      
      {/* 1. 모바일: 위 / PC: 왼쪽 -> 고양이 캐릭터 및 백그라운드 텍스트 영역 */}
      {/* (추후 캐릭터 갤러리처럼 왼쪽 이미지를 완전히 제거하려면 이 div 블록만 걷어내면 돼!) */}
      <div className="relative w-full lg:w-1/2 h-2/5 lg:h-full flex items-center justify-center select-none">
        {/* 뒤에 거대하게 깔리는 배경 타이포그래피 */}
        <h1 className="absolute text-[20vw] lg:text-[13vw] font-black tracking-tighter text-zinc-900/90 leading-none z-0">
          nyang
        </h1>

        {/* 고양이 캐릭터 PNG 누끼 이미지 */}
        <div className="relative z-10 w-full max-w-xs lg:max-w-lg aspect-square flex items-center justify-center">
          {characterImage && (
            <img
              src={characterImage}
              alt="Nyang Mascot Character"
              className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          
          {/* 이미지 부재 시 대체 가이드 박스 */}
          <div className="hidden error-fallback absolute inset-0 border border-dashed border-zinc-700/80 rounded-2xl flex flex-col items-center justify-center p-4 text-center bg-zinc-900/40 backdrop-blur-sm">
            <span className="text-2xl mb-1">🐱</span>
            <span className="text-[10px] text-zinc-400 font-mono">
              public/images/nyangcat.png
            </span>
          </div>
        </div>
      </div>

      {/* 2. 모바일: 아래 / PC: 오른쪽 -> 소개 문구 영역 */}
      <div className="relative z-10 w-full lg:w-1/2 h-3/5 lg:h-full flex flex-col items-center lg:items-start justify-center px-4 lg:pl-12">
        <div className="max-w-xl text-center lg:text-left">
          <span className="text-xs font-bold tracking-[0.25em] text-amber-500/90 block uppercase mb-3">
            NYANG CODE INTRODUCTION
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-white leading-tight">
            {title}
          </h2>
          <p className="text-base md:text-lg font-light whitespace-pre-line leading-relaxed text-zinc-300">
            {description}
          </p>
        </div>
      </div>

    </div>
  );
}