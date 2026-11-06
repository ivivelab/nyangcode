'use client';

import { useEffect, useState } from 'react';
import { X, ArrowLeft, MessageCircle, ExternalLink } from 'lucide-react';

interface BlogArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] };

type BlogPost = {
  id: string;
  category: string;
  title: string;
  image: string;
  intro: string;
  quote: string;
  subHeading: string;
  body: ArticleBlock[];
  conclusion: string;
};

/**
 * 나중에 챗봇 주소를 바꾸려면 아래 URL만 수정하세요.
 * 버튼은 새 탭에서 열립니다.
 */
const CHATBOT_URL = 'https://example.com/chatbot';

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    category: 'INSIGHT / SECURITY',
    title: '오래된 웹사이트, 언제까지 유지해야 할까? 보안과 유지보수',
    image: '/images/archive-01.png',
    intro:
      '오래 운영한 웹사이트는 익숙하고 잘 작동한다는 이유로 계속 유지되곤 합니다. 하지만 사용 중인 소프트웨어의 지원 종료, 누적된 업데이트, 오래된 플러그인과 관리되지 않는 코드가 있다면 보안과 유지보수 측면에서 점검할 필요가 있습니다. 무조건 새로 만드는 것보다 현재 상태를 파악하는 것이 먼저입니다.',
    quote: '웹사이트의 안전성은 언어 하나가 아니라 코드와 설정, 업데이트, 운영 방식이 함께 결정합니다.',
    subHeading: 'PHP 자체가 문제라기보다, 관리되지 않는 환경이 문제입니다.',
    body: [
      {
        type: 'paragraph',
        text: 'PHP를 비롯한 여러 기술은 적절히 업데이트하고 안전하게 구성하면 계속 사용할 수 있습니다. 반대로 최신 기술을 사용하더라도 취약한 코드나 잘못된 설정이 있다면 위험은 남습니다.',
      },
      {
        type: 'heading',
        text: '웹사이트 점검 시 살펴볼 항목',
      },
      {
        type: 'list',
        items: [
          '운영체제, 런타임, 프레임워크와 플러그인의 지원 및 업데이트 상태',
          '사용자 입력값 검증과 데이터베이스 쿼리 처리 방식',
          '관리자 계정, 접근 권한, 비밀키와 환경변수 관리',
          '백업 주기와 실제 복구 가능 여부',
          '장애 발생 시 로그 확인 및 대응 절차',
        ],
      },
      {
        type: 'heading',
        text: '기존 사이트 개선과 재구축, 무엇을 선택할까?',
      },
      {
        type: 'paragraph',
        text: '현재 구조를 유지하면서 업데이트와 보안 설정을 개선하는 편이 합리적일 수 있습니다. 반면 지원이 종료된 구성 요소가 많거나 기능 추가와 수정이 지나치게 어려운 경우에는 단계적인 재구축을 검토할 수 있습니다. Next.js 등 현대적인 프레임워크는 적절한 설계와 운영을 전제로 관리 편의성과 사용자 경험을 개선하는 선택지가 될 수 있습니다.',
      },
    ],
    conclusion:
      '먼저 현재 웹사이트의 기술 구성과 운영 위험을 점검하세요. 개선으로 충분한지, 재구축이 필요한지는 실제 상태와 예산, 필요한 기능을 기준으로 판단하는 것이 좋습니다.',
  },
  {
    id: 'post-2',
    category: 'AUTOMATION / EFFICIENCY',
    title: '혼자 일하는 사업자를 위한 반복 작업을 줄이는 현실적인 방법',
    image: '/images/archive-02.png',
    intro:
      '1인 사업자는 고객 응대와 자료 정리, 일정 확인, 주문 처리처럼 본업 외의 업무도 직접 맡는 경우가 많습니다. 모든 일을 자동화할 필요는 없지만, 자주 반복되고 규칙이 명확한 작업부터 개선하면 시간을 확보할 수 있습니다.',
    quote: '자동화의 목적은 모든 일을 기계에 맡기는 것이 아니라, 사람이 꼭 해야 하는 일에 시간을 돌려주는 것입니다.',
    subHeading: '자동화는 도구 선택보다 업무 흐름을 이해하는 데서 시작합니다.',
    body: [
      {
        type: 'paragraph',
        text: '먼저 반복 업무를 기록해 보세요. 얼마나 자주 발생하는지, 매번 같은 규칙으로 처리하는지, 실수했을 때 어떤 영향이 있는지를 파악하면 자동화 우선순위를 정하기 쉬워집니다.',
      },
      {
        type: 'heading',
        text: '자동화하기 좋은 업무의 예',
      },
      {
        type: 'list',
        items: [
          '문의 접수 후 담당자에게 알림 보내기',
          '예약이나 신청 정보를 표 또는 데이터베이스에 정리하기',
          '정해진 형식의 주간 보고서 초안 만들기',
          '결제·배송·일정 등 상태 변경을 고객에게 안내하기',
          '여러 자료에서 필요한 항목을 모아 정리하기',
        ],
      },
      {
        type: 'heading',
        text: '작게 시작하고 예외 상황을 확인하세요.',
      },
      {
        type: 'paragraph',
        text: '자동화에는 서비스 이용료, API 비용, 오류 대응과 유지관리 비용이 들 수 있습니다. 처음부터 전 과정을 자동화하기보다 한 가지 업무를 시험 운영하고, 오류가 발생했을 때 사람이 확인하거나 되돌릴 수 있는 절차를 마련하는 것이 안전합니다.',
      },
    ],
    conclusion:
      '반복 업무 하나를 골라 현재 처리 시간과 실수 빈도를 기록해 보세요. 작은 실험으로 실제 절감 효과를 확인한 뒤 자동화 범위를 넓히는 것이 현실적인 출발점입니다.',
  },
  {
    id: 'post-3',
    category: 'DESIGN / BRANDING',
    title: '좋은 웹사이트는 무엇이 다를까? 디자인보다 중요한 사용자 경험',
    image: '/images/archive-03.png',
    intro:
      '웹사이트가 세련되어 보이는 것도 중요하지만, 방문자가 필요한 정보를 쉽게 찾고 다음 행동을 이해할 수 있어야 합니다. 템플릿을 사용했는지 맞춤 제작했는지보다 브랜드와 목적에 맞게 설계했는지가 더 중요합니다.',
    quote: '좋은 디자인은 눈길을 끄는 데서 끝나지 않고, 사용자가 원하는 일을 쉽게 하도록 돕습니다.',
    subHeading: '시각적 완성도와 사용 편의성은 함께 설계해야 합니다.',
    body: [
      {
        type: 'paragraph',
        text: '방문자는 홈페이지에 들어와 짧은 시간 안에 이곳이 어떤 사업인지, 자신에게 필요한 정보가 있는지, 문의나 구매를 어떻게 할 수 있는지 파악하려고 합니다. 정보 구조가 복잡하면 좋은 디자인도 제 역할을 하기 어렵습니다.',
      },
      {
        type: 'heading',
        text: '사용자 경험을 만드는 기본 요소',
      },
      {
        type: 'list',
        items: [
          '브랜드와 서비스가 명확하게 전달되는 첫 화면',
          '읽기 쉬운 글자 크기와 적절한 여백',
          '모바일에서도 자연스럽게 이용할 수 있는 반응형 구성',
          '문의·예약·구매 등 핵심 행동으로 이어지는 동선',
          '이미지 최적화와 빠른 페이지 로딩',
        ],
      },
      {
        type: 'paragraph',
        text: '템플릿은 비용과 제작 시간을 줄이는 좋은 선택일 수 있습니다. 브랜드의 요구사항이나 기능이 템플릿의 한계를 넘어설 때 맞춤 설계를 고려하면 됩니다. 화려한 효과보다 목적에 맞는 구성과 일관성이 오래가는 디자인을 만듭니다.',
      },
    ],
    conclusion:
      '웹사이트를 평가할 때는 “멋있는가?”와 함께 “방문자가 필요한 정보를 찾고 원하는 행동을 쉽게 할 수 있는가?”를 확인하세요. 냥코드는 목적과 사용성을 함께 고려한 디자인을 지향합니다.',
  },
  {
    id: 'post-4',
    category: 'TECHNOLOGY / AI',
    title: '2026년 웹사이트, AI를 어디까지 활용해야 할까?',
    image: '/images/archive-04.png',
    intro:
      'AI 기능이 웹사이트에 빠르게 도입되고 있지만, 모든 사이트에 챗봇이나 에이전트가 필요한 것은 아닙니다. 중요한 것은 새로운 기술을 추가하는 일이 아니라 방문자와 운영자에게 실제로 도움이 되는 문제를 해결하는 것입니다.',
    quote: 'AI는 목적이 아니라 도구입니다. 사용자가 얻는 가치와 운영 비용을 함께 살펴야 합니다.',
    subHeading: 'AI 기능은 작고 명확한 문제부터 적용하는 것이 좋습니다.',
    body: [
      {
        type: 'paragraph',
        text: '예를 들어 자주 묻는 질문이 많다면 안내형 챗봇을 검토할 수 있고, 자료가 복잡하다면 검색이나 요약 기능이 도움이 될 수 있습니다. 반면 방문자가 단순히 영업시간이나 연락처만 찾는 사이트라면 명확한 정보 배치가 AI보다 효과적일 수 있습니다.',
      },
      {
        type: 'heading',
        text: 'AI 도입 전에 확인할 것',
      },
      {
        type: 'list',
        items: [
          '어떤 고객 문제 또는 운영 업무를 해결하려는가?',
          '기존의 검색·FAQ·문의 양식으로 해결할 수 없는가?',
          'AI가 잘못 답했을 때 이용자가 취할 수 있는 대안이 있는가?',
          '개인정보와 고객 데이터는 어떻게 보호할 것인가?',
          '사용료와 운영·검수 비용을 감당할 수 있는가?',
        ],
      },
      {
        type: 'paragraph',
        text: 'AI 답변은 틀릴 수 있으므로 중요한 정보에는 출처나 확인 경로를 제공하고, 필요한 경우 사람에게 연결하는 방식을 준비해야 합니다. 실제 이용 데이터를 확인하며 기능을 개선하는 것도 중요합니다.',
      },
    ],
    conclusion:
      'AI 도입은 작은 범위에서 효과와 위험을 검증한 뒤 확대하세요. 냥코드는 기술의 유행보다 사업에 필요한 기능과 운영 가능성을 먼저 고려합니다.',
  },
  {
    id: 'post-5',
    category: 'COMMERCE / STRATEGY',
    title: '임대형 쇼핑몰과 맞춤형 쇼핑몰, 어떤 선택이 내 사업에 맞을까?',
    image: '/images/archive-05.png',
    intro:
      '온라인 판매를 시작할 때 임대형 쇼핑몰과 맞춤형 쇼핑몰 중 무엇을 선택할지 고민하게 됩니다. 정답은 사업 규모와 필요한 기능, 운영 인력, 예산에 따라 달라집니다. 처음부터 복잡한 시스템을 만드는 것이 반드시 유리한 것은 아닙니다.',
    quote: '좋은 선택은 가장 복잡한 시스템이 아니라, 현재 사업에 필요한 기능을 적정한 비용으로 제공하는 시스템입니다.',
    subHeading: '기능과 운영 부담을 함께 비교해 보세요.',
    body: [
      {
        type: 'heading',
        text: '임대형 솔루션이 잘 맞는 경우',
      },
      {
        type: 'list',
        items: [
          '빠르게 판매를 시작하고 싶은 경우',
          '표준적인 상품·주문·결제 기능으로 충분한 경우',
          '플랫폼이 제공하는 운영 도구와 지원을 활용하고 싶은 경우',
        ],
      },
      {
        type: 'heading',
        text: '맞춤형 구축을 검토할 수 있는 경우',
      },
      {
        type: 'list',
        items: [
          '사업에 꼭 필요한 독특한 구매 흐름이나 기능이 있는 경우',
          '외부 시스템과 복잡한 연동이 필요한 경우',
          '브랜드 경험이나 데이터 구조를 세밀하게 설계해야 하는 경우',
        ],
      },
      {
        type: 'paragraph',
        text: '맞춤형 쇼핑몰은 개발비뿐 아니라 결제 연동, 보안, 장애 대응, 운영과 업데이트 비용까지 고려해야 합니다. 임대형 서비스도 요금제, 수수료, 기능 제한과 데이터 이전 조건을 확인하는 것이 좋습니다.',
      },
    ],
    conclusion:
      '현재 필요한 기능과 향후 계획을 목록으로 만든 뒤, 플랫폼의 비용과 제약을 비교하세요. 규모가 작다면 임대형으로 시작하고 필요가 분명해졌을 때 확장하는 방법도 충분히 합리적입니다.',
  },
  {
    id: 'post-6',
    category: 'MARKETING / CREATIVE',
    title: 'AI 숏폼 자동화, 대본부터 편집까지 어디까지 맡길 수 있을까?',
    image: '/images/archive-06.png',
    intro:
      '숏폼 콘텐츠 제작은 아이디어, 대본, 소스 준비, 편집, 자막, 검수와 게시까지 여러 단계를 포함합니다. AI와 자동화 도구는 일부 단계를 빠르게 만들 수 있지만, 결과물의 품질과 권리 문제를 확인하는 과정은 여전히 중요합니다.',
    quote: '반복 작업은 자동화하고, 최종 품질과 메시지는 사람이 책임지는 구조가 현실적입니다.',
    subHeading: '전체 제작 과정을 나누면 자동화할 부분이 보입니다.',
    body: [
      {
        type: 'heading',
        text: '자동화 파이프라인의 예',
      },
      {
        type: 'list',
        items: [
          '주제와 핵심 메시지를 정리하고 대본 초안 생성',
          '사용 권한이 확인된 영상·이미지·음원 소스 준비',
          '자막 초안, 장면 구성과 편집 작업 보조',
          '화면 비율과 출력 형식에 맞춰 렌더링',
          '사람이 사실관계, 표현, 권리와 최종 품질을 확인한 뒤 게시',
        ],
      },
      {
        type: 'paragraph',
        text: '자동 게시 기능을 사용할 때는 플랫폼의 정책과 계정 권한을 확인해야 합니다. 음악, 이미지, 영상 클립, 음성의 사용 권한도 점검하세요. AI가 만든 콘텐츠라도 권리나 사실관계 문제가 자동으로 해결되는 것은 아닙니다.',
      },
      {
        type: 'paragraph',
        text: '실제 구축 사례가 있다면 사용한 도구, 자동화한 단계, 남겨둔 사람의 검수, 시행착오를 구체적으로 기록하세요. 아직 실험 중이라면 실험기 또는 설계 노트로 소개하는 것이 정확합니다.',
      },
    ],
    conclusion:
      '먼저 제작 과정 중 반복적이고 규칙이 명확한 한 단계를 자동화해 보세요. 제작 시간과 수정 횟수를 비교하면 다음 단계에 투자할지 판단하기 쉬워집니다.',
  },
  {
    id: 'post-7',
    category: 'MAINTENANCE / SUPPORT',
    title: '웹사이트 유지보수, 어디까지 맡기고 무엇을 직접 관리해야 할까?',
    image: '/images/archive-07.png',
    intro:
      '웹사이트를 만든 뒤에도 콘텐츠 수정, 도메인과 호스팅 관리, 업데이트, 백업, 장애 대응 등 운영 업무가 남습니다. 유지보수 계약을 검토할 때는 “관리해 드립니다”라는 말보다 실제 제공 범위와 대응 기준을 확인하는 것이 중요합니다.',
    quote: '유지보수는 고장을 없다고 약속하는 일이 아니라, 상태를 관리하고 문제가 생겼을 때 대응할 기준을 마련하는 일입니다.',
    subHeading: '유지보수 범위는 구체적으로 정의해야 합니다.',
    body: [
      {
        type: 'heading',
        text: '유지보수 범위에 포함할 수 있는 항목',
      },
      {
        type: 'list',
        items: [
          '텍스트·이미지 등 정해진 범위의 콘텐츠 수정',
          '기본적인 사이트 상태와 오류 확인',
          '백업 및 복구 절차 확인',
          '프레임워크와 의존성 업데이트 검토',
          '장애 접수 방법과 대응 시간 기준',
        ],
      },
      {
        type: 'heading',
        text: '계약 전에 확인할 질문',
      },
      {
        type: 'list',
        items: [
          '월 정액에 포함되는 수정 횟수와 작업량은 얼마인가?',
          '새로운 기능 개발은 별도 견적인가?',
          '도메인, 호스팅, 외부 API 비용은 누가 부담하는가?',
          '긴급 장애와 일반 문의의 대응 기준은 어떻게 다른가?',
          '계약 종료 시 소스와 데이터는 어떻게 전달되는가?',
        ],
      },
      {
        type: 'paragraph',
        text: '기술 구조가 단순하고 관리하기 쉬우면 유지보수 부담을 낮추는 데 도움이 됩니다. 다만 어떤 구조도 장애 가능성을 완전히 없애지는 않으므로, 백업과 대응 절차를 함께 준비해야 합니다.',
      },
    ],
    conclusion:
      '유지보수 계약은 업무 범위, 비용, 대응 기준, 소유권과 종료 절차를 명확히 하는 것부터 시작하세요. 냥코드는 고객이 관리 상황을 이해할 수 있는 투명한 운영을 지향합니다.',
  },
  {
    id: 'post-8',
    category: 'STUDIO NOTE',
    title: '코드는 바뀌어도 구조는 남는다 — 냥코드가 웹사이트를 설계하는 기준',
    image: '/images/archive-08.png',
    intro:
      '웹 기술은 계속 바뀝니다. 새로운 프레임워크와 도구가 등장하고, 지금 익숙한 방식도 시간이 지나면 달라질 수 있습니다. 그래서 냥코드는 특정 기술의 유행보다 문제를 단순하게 정의하고, 이해하고 관리하기 쉬운 구조를 만드는 일을 중요하게 생각합니다.',
    quote: '기술은 목적을 이루는 도구입니다. 좋은 구조는 그 도구를 바꾸더라도 사업의 흐름을 이해할 수 있게 합니다.',
    subHeading: '냥코드가 중요하게 생각하는 세 가지',
    body: [
      {
        type: 'heading',
        text: '필요한 만큼만 만들기',
      },
      {
        type: 'paragraph',
        text: '기능이 많다고 좋은 웹사이트가 되는 것은 아닙니다. 고객이 실제로 사용할 기능을 먼저 정의하고, 불필요한 복잡성과 운영 부담을 줄입니다.',
      },
      {
        type: 'heading',
        text: '이해하고 관리하기 쉬운 구조',
      },
      {
        type: 'paragraph',
        text: '코드와 데이터의 역할을 분명히 나누고, 변경이 필요한 부분을 찾기 쉽게 구성합니다. 작은 수정이 전체 시스템에 불필요한 영향을 주지 않도록 설계하는 것을 지향합니다.',
      },
      {
        type: 'heading',
        text: '현실적인 운영을 함께 생각하기',
      },
      {
        type: 'paragraph',
        text: '제작 완료만이 목표는 아닙니다. 고객이 사이트를 어떻게 운영할지, 무엇을 직접 수정할지, 어떤 부분에 지원이 필요한지를 함께 고려합니다. 기술 선택도 성능과 보안뿐 아니라 예산과 유지관리 가능성을 기준으로 판단합니다.',
      },
    ],
    conclusion:
      '냥코드는 화려한 기술을 앞세우기보다, 사업에 필요한 웹사이트를 명확하고 관리하기 쉬운 형태로 만드는 파트너가 되고자 합니다. 좋은 구조는 지금의 문제를 해결하고, 이후의 변화에도 대응할 여지를 남깁니다.',
  },
];

export default function BlogArchiveModal({ isOpen, onClose }: BlogArchiveModalProps) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedPost = BLOG_POSTS.find((post) => post.id === selectedPostId);

  const handleClose = () => {
    setSelectedPostId(null);
    onClose();
  };

  const openChatbot = () => {
    window.open(CHATBOT_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Nyangcode blog archive"
      onWheel={(event) => event.stopPropagation()}
      className="fixed inset-0 z-50 h-screen w-screen overflow-y-auto bg-black/95 text-white"
    >
      <button
        type="button"
        onClick={handleClose}
        aria-label="Close archive"
        className="fixed right-4 top-4 z-50 flex cursor-pointer items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/90 px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-400 shadow-lg transition-colors hover:text-white md:right-8 md:top-8"
      >
        <X className="h-4 w-4" /> CLOSE
      </button>

      {!selectedPost && (
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-16">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-3xl" aria-hidden="true">
              🐱
            </span>
            <h2 className="text-4xl font-black tracking-tight md:text-6xl">Archive</h2>
          </div>
          <p className="mb-12 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
            NYANGCODE INSIGHTS & ARCHITECTURE
          </p>

          <div className="grid grid-cols-1 gap-8 pb-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {BLOG_POSTS.map((post) => (
              <button
                type="button"
                key={post.id}
                onClick={() => setSelectedPostId(post.id)}
                className="group cursor-pointer text-left transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="relative mb-4 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
                  <div className="absolute inset-0 z-0 flex flex-col items-center justify-center border border-zinc-800/80 bg-gradient-to-br from-zinc-900 to-zinc-950 p-4 text-center">
                    <span className="mb-1 text-3xl transition-transform duration-300 group-hover:scale-110">
                      🐱
                    </span>
                    <span className="font-mono text-[10px] font-bold tracking-widest text-emerald-400">
                      NYANGCODE
                    </span>
                  </div>
                  <img
                    src={post.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 z-10 h-full w-full object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                  {post.category}
                </span>
                <h3 className="line-clamp-3 text-lg font-medium text-zinc-200 transition-colors group-hover:text-emerald-400">
                  {post.title}
                </h3>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedPost && (
        <article className="mx-auto max-w-4xl px-6 pb-32 pt-24 md:px-12">
          <button
            type="button"
            onClick={() => setSelectedPostId(null)}
            className="mb-8 flex cursor-pointer items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 transition-colors hover:text-emerald-300"
          >
            <ArrowLeft className="h-4 w-4" /> BACK TO LIST
          </button>

          <div className="mb-3 flex items-center gap-2">
            <span className="text-emerald-400" aria-hidden="true">
              🐱
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
              {selectedPost.category}
            </span>
          </div>

          <h1 className="mb-8 text-3xl font-black leading-tight text-white md:text-5xl">
            {selectedPost.title}
          </h1>

          <div className="relative mb-12 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-zinc-900">
              <span className="mb-2 text-4xl" aria-hidden="true">
                🐱
              </span>
              <span className="font-mono text-xs text-zinc-500">NYANGCODE ARCHIVE DETAIL</span>
            </div>
            <img
              src={selectedPost.image}
              alt=""
              className="absolute inset-0 z-10 h-full w-full object-cover opacity-80"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
          </div>

          <div className="space-y-8 text-base font-light leading-relaxed text-zinc-300 md:text-lg">
            <p>{selectedPost.intro}</p>

            <blockquote className="my-8 rounded-r-lg border-l-2 border-emerald-400 bg-zinc-900/40 py-4 pl-6 text-xl italic text-white md:text-2xl">
              {selectedPost.quote}
            </blockquote>

            <h2 className="pt-4 text-2xl font-bold text-white">{selectedPost.subHeading}</h2>

            <div className="space-y-5">
              {selectedPost.body.map((block, index) => {
                if (block.type === 'heading') {
                  return (
                    <h3 key={`${selectedPost.id}-heading-${index}`} className="pt-3 text-xl font-bold text-white">
                      {block.text}
                    </h3>
                  );
                }

                if (block.type === 'list') {
                  return (
                    <ul
                      key={`${selectedPost.id}-list-${index}`}
                      className="list-disc space-y-2 pl-6 marker:text-emerald-400"
                    >
                      {block.items.map((item, itemIndex) => (
                        <li key={`${selectedPost.id}-list-${index}-${itemIndex}`}>{item}</li>
                      ))}
                    </ul>
                  );
                }

                return <p key={`${selectedPost.id}-paragraph-${index}`}>{block.text}</p>;
              })}
            </div>

            <h2 className="pt-6 text-2xl font-bold text-white">결론</h2>
            <p>{selectedPost.conclusion}</p>

            {/* 각 포스트 결론 아래에 표시되는 챗봇 이동 버튼. URL은 파일 상단의 CHATBOT_URL에서 수정하세요. */}
            <div className="border-t border-zinc-800 pt-8">
              <button
                type="button"
                onClick={openChatbot}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-6 py-4 text-sm font-semibold text-emerald-300 transition-colors hover:border-emerald-300 hover:bg-emerald-400/20 hover:text-emerald-200 md:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                이 내용에 대해 챗봇에게 문의하기
                <ExternalLink className="h-4 w-4" />
              </button>
              <p className="mt-3 text-xs text-zinc-500">
                궁금한 점이나 웹사이트 관련 상담을 이어가 보세요.
              </p>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}
