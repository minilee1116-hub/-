export interface PortfolioItem {
  id: string;
  title: string;
  category: 'shorts' | 'production' | 'shooting' | 'planning' | 'management';
  thumbnailUrl: string;
  videoUrl: string; // YouTube ID or direct URL
  stats: string; // e.g., "조회수 240만", "구독자 +15만"
  highlights: string[]; // e.g., ["3D 모션 그래픽", "템포 컷 편집", "썸네일 기획"]
  clientName: string;
  description: string;
  createdAt: string;
  isFeatured?: boolean;
}

export interface Consultation {
  id: string;
  submittedAt: string;
  status: 'pending' | 'reviewed' | 'completed';
  clientName: string;
  companyOrChannel: string;
  contact: string; // Email or phone number
  purpose: string; // e.g., "정기 영상 편집", "풀 채널 대행"
  videoLengthAndFrequency: string; // Specs e.g., "롱폼 / 주 2회"
  workScope: string[]; // e.g., ["기획 및 대본", "컷 편집 및 자막"]
  budgetRange: string; // e.g., "월 300~500만 원 선"
  timeline: string; // e.g., "ASAP", "2주 이내"
  referenceUrl?: string;
  memo?: string;
}

export type CategoryFilter = 'all' | 'shorts' | 'production' | 'shooting' | 'planning' | 'management';

