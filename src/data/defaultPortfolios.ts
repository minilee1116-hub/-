import { PortfolioItem } from '../types';

export const DEFAULT_PORTFOLIOS: PortfolioItem[] = [
  {
    id: 'p1',
    title: '테크 크리에이터 IT 트렌드 신작 리뷰 편집 대행',
    category: 'production',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder or sample
    stats: '조회수 235만회 달성',
    highlights: ['초단위 텐션 조절', '3D 이펙트 & 트래킹', '시청유지율 64% 돌파'],
    clientName: 'IT 테크튜브 (구독자 85만)',
    description: '신상 디바이스의 특징을 고속 컷편집과 직관적인 스펙 자막으로 시청자가 지루해할 틈 없이 구성했습니다. 알고리즘 추천을 유도하는 최적의 호흡을 구현했습니다.',
    createdAt: '2026-05-15',
    isFeatured: true
  },
  {
    id: 'p2',
    title: '성장 마인드셋 & 제테크 채널 컨설팅 및 기획',
    category: 'planning',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    stats: '구독자 +12만 급성장',
    highlights: ['심리학 기반 연출 기획', '썸네일 클릭률 12.4%', '유튜브 알고리즘 최적화'],
    clientName: '머니클래스 (자산 채널)',
    description: '딱딱한 금융/자산 지식을 극본 기반의 몰입감 높은 인트로와 서사 구조로 설계하여 비전공자도 15분 내내 시청할 수 있는 고부가가치 콘텐츠로 기획 제작했습니다.',
    createdAt: '2026-05-10',
    isFeatured: true
  },
  {
    id: 'p3',
    title: 'MZ 세대 타겟 감성 요리 숏폼 시리즈 제작',
    category: 'shorts',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    stats: '틱톡/릴스 누적 500만뷰',
    highlights: ['ASMR 고음질 마스터링', '네온 타이포그래피', '첫 2초 시선 장악 연출'],
    clientName: '쿠킹클럽 숏폼',
    description: '모바일 세로형 인터페이스에 맞춤화된 구도 타이틀 레이아웃, 감성적인 이펙트, 그리고 청각을 자극하는 프리미엄 사운드 엔지니어링을 결합한 숏폼 패키지입니다.',
    createdAt: '2026-05-20',
    isFeatured: true
  },
  {
    id: 'p4',
    title: '신작 웹예능 스케일업 촬영 및 멀티캠 현장 제작',
    category: 'shooting',
    thumbnailUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    stats: '인기 급상승 동영상 3위',
    highlights: ['4K 멀티캠 동기화', '전문 조명 디렉팅', '인물 포커스 사운드'],
    clientName: '엔터허브 스튜디오',
    description: '4인 출연진의 예능 구도를 위해 시네마 릭 카메라 5대와 고정 핀마이크, 다층적 조명 세팅을 거쳐 현장 현장감을 고스란히 담아낸 풀패키지 프로덕션 촬영 레퍼런스입니다.',
    createdAt: '2026-05-01'
  },
  {
    id: 'p5',
    title: '대형 브랜드 교육 웹 세미나 채널 풀 매니지먼트',
    category: 'management',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    stats: '유입 전환율 420% 성장',
    highlights: ['메타데이터 SEO 세팅', '고객 커뮤니티 정밀 관리', '댓글 구매 전환 퍼널'],
    clientName: '글로벌 Edu코리아',
    description: '단순한 영상 업로드를 넘어 유입 태그, 검색 최적화, 썸네일 테스트, 커뮤니티 소통 및 최종 웹사이트 상담으로 연결하는 전환 트리거를 설계하여 채널의 비즈니스 효율을 극대화했습니다.',
    createdAt: '2026-04-28'
  },
  {
    id: 'p6',
    title: '디지털 트렌디 팝업스토어 티저 프로덕션 무비',
    category: 'production',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    stats: '오프라인 대기 예약 완판',
    highlights: ['트렌디 스피드 램핑', '글로우 모션 이펙트', '브랜드 무아레 사선 기획'],
    clientName: '패션 스트릿 하우스',
    description: '성수동 팝업스토어 전경을 속도 감각적 슬로우/패스트 컷과 독보적인 컬러 그레이딩으로 표현하여 인스타그램 릴스를 후끈하게 달군 티저용 프리미엄 스케치 스릴 영상입니다.',
    createdAt: '2026-05-05'
  }
];

