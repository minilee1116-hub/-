import { motion } from 'motion/react';
import { Play, BarChart3, Clock, CheckSquare, Layers } from 'lucide-react';
import companyLogo from '../assets/images/company_logo1_1780221044248.png';
import logoMini from '../assets/images/logo-mini-blue.png';
import logoCompany from '../assets/images/logo-company-gray.png';

interface HeroSectionProps {
  onScrollToPortfolio: () => void;
  onScrollToConsulting: () => void;
  customLogo?: string | null;
  customMiniLogo?: string | null;
}

export default function HeroSection({ onScrollToPortfolio, onScrollToConsulting, customLogo, customMiniLogo }: HeroSectionProps) {
  return (
    <section className="relative bg-transparent pt-5 pb-10 px-4 md:px-0">
      
      {/* 1. Main Isometric Branding Box (MOAPIC YOUTUBE PRODUCTION) */}
      <div className="max-w-7xl mx-auto border-none bg-transparent pt-0 pb-6 px-6 text-center relative overflow-hidden mb-6">
        <div className="absolute inset-0 bg-radial-gradient(circle at center, rgba(75,137,255,0.015), transparent 75%) pointer-events-none" />
        
        {/* Company Logo (hardcoded gray cube, size 220) */}
        <div className="flex justify-center mb-1 mt-0">
          <img
            src={logoCompany}
            alt="MOAPIC Company Logo"
            className="w-full max-w-[220px] h-auto object-contain drop-shadow-xs select-none"
          />
        </div>

        {/* Title Name In Solid Custom Blue */}
        <h1 className="text-5xl md:text-7xl font-black tracking-[-0.03em] text-[#4B89FF] mb-2 font-sans select-none leading-none">
          MOAPIC
        </h1>

        {/* Subtitle - Bold Bold sans-serif to match mockup precisely */}
        <p className="text-[10px] md:text-sm font-black tracking-[0.42em] text-[#4B89FF]/55 uppercase font-sans">
          YOUTUBE PRODUCTION
        </p>

        {/* Premium Hero Copywriting & CTA */}
        <div className="max-w-2xl mx-auto mt-8 mb-4 space-y-5">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2.5xl sm:text-3.5xl md:text-4.5xl font-bold text-white tracking-normal leading-snug whitespace-normal font-display"
          >
            유튜브 채널 제작부터 운영까지, 한 번에 해결합니다.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm text-neutral-400 font-medium tracking-wide flex items-center justify-center gap-2 flex-wrap"
          >
            <span className="px-2.5 py-1 rounded-md bg-neutral-900/60 border border-neutral-800 text-neutral-300">기획</span>
            <span className="text-neutral-800 sm:inline hidden">•</span>
            <span className="px-2.5 py-1 rounded-md bg-neutral-900/60 border border-neutral-800 text-neutral-300">촬영</span>
            <span className="text-neutral-800 sm:inline hidden">•</span>
            <span className="px-2.5 py-1 rounded-md bg-neutral-900/60 border border-neutral-800 text-neutral-300">편집</span>
            <span className="text-neutral-800 sm:inline hidden">•</span>
            <span className="px-2.5 py-1 rounded-md bg-[#4B89FF]/10 border border-[#4B89FF]/30 font-semibold text-[#4B89FF]">채널 운영</span>
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-3"
          >
            <button
              onClick={onScrollToPortfolio}
              className="px-7 py-3.5 rounded-xl text-sm sm:text-base font-black bg-[#4B89FF] text-black hover:bg-[#3b75e0] hover:text-white active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-lg shadow-[#4B89FF]/14"
            >
              포트폴리오 보기
            </button>
            <button
              onClick={onScrollToConsulting}
              className="px-7 py-3.5 rounded-xl text-sm sm:text-base font-black bg-transparent border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 active:scale-[0.98] transition-all duration-200 cursor-pointer hover:bg-neutral-900/40"
            >
              무료 상담 신청
            </button>
          </motion.div>
        </div>
      </div>

      {/* 2. Core services block matching layout exactly (유튜브 프로덕션) */}
      <div className="max-w-7xl mx-auto border border-neutral-900 bg-neutral-950/80 rounded-2xl p-6 md:p-8 shrink-0 relative z-10 shadow-2xl shadow-black/40" id="services-block">
        
        {/* Header container */}
        <div className="flex items-center justify-center space-x-3 mb-8 border-b border-neutral-900 pb-5">
          <img
            src={logoMini}
            alt="MOAPIC Mini Logo"
            className="h-9 md:h-11 w-auto max-w-[140px] object-contain block relative -top-[3px]"
          />
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-widest font-display">
            유튜브 프로덕션
          </h2>
        </div>

        {/* 3 columns matching layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: 유튜브 영상 편집 */}
          <div className="flex flex-col justify-between bg-neutral-900/20 border border-neutral-900 rounded-xl p-5 hover:border-[#4B89FF]/40 hover:bg-neutral-900/45 transition group/edit-card shadow-xs">
            <div>
              <div className="flex items-center space-x-1 mb-2">
                <span className="text-[#4B89FF] font-bold text-sm">*</span>
                <h3 className="text-md font-bold text-white font-display">유튜브 영상 편집</h3>
              </div>
              <p className="text-xs text-neutral-400 font-medium leading-relaxed mb-6">
                채널 특성과 타겟 시청층에 최적화된 콘텐츠 편집 및 템포 조율 서비스
              </p>
            </div>
            
            {/* Premium Dark Editing Workspace Mockup */}
            <div 
              className="aspect-[16/10] bg-black border border-neutral-900 rounded-lg p-3 flex flex-col justify-between relative overflow-hidden group/m1 shadow-inner group-hover/edit-card:border-[#4B89FF]/30 transition-all duration-300"
            >
              {/* Subtle blue accent glow inside the dark visual */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#4B89FF]/4 rounded-full blur-xl pointer-events-none group-hover/m1:bg-[#4B89FF]/8 transition duration-300" />
              
              {/* Top: Pseudo-editor header */}
              <div className="flex items-center justify-between border-b border-neutral-900 pb-1.5 z-10 font-medium">
                <div className="flex items-center space-x-1">
                  <Layers size={10} className="text-[#4B89FF]" />
                  <span className="text-[9px] font-mono font-bold tracking-wider text-neutral-400">CUT_TIMELINE.mp4</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-[#4B89FF] rounded-full animate-pulse" />
                  <span className="text-[8px] font-mono text-[#4B89FF]/80">PREVIEW</span>
                </div>
              </div>

              {/* Middle: Video layer with central play trigger */}
              <div className="relative h-12 bg-neutral-900/40 border border-neutral-900 rounded-md flex items-center justify-center overflow-hidden my-1">
                {/* Simulated waveforms */}
                <div className="absolute inset-x-2 bottom-1 flex items-end justify-center space-x-[2px] h-3 opacity-30">
                  <span className="w-[3px] h-1.5 bg-[#4B89FF] rounded-sm" />
                  <span className="w-[3px] h-2 bg-[#4B89FF] rounded-sm" />
                  <span className="w-[3px] h-3 bg-[#4B89FF] rounded-sm" />
                  <span className="w-[3px] h-2 bg-[#4B89FF] rounded-sm" />
                  <span className="w-[3px] h-1 bg-[#4B89FF] rounded-sm" />
                  <span className="w-[3px] h-2 bg-[#4B89FF] rounded-sm" />
                  <span className="w-[3px] h-2.5 bg-[#4B89FF] rounded-sm" />
                </div>
                
                {/* Miniature Play button */}
                <div className="w-7 h-7 rounded-full bg-[#4B89FF]/10 border border-[#4B89FF]/20 flex items-center justify-center text-[#4B89FF] transition duration-300 shadow-xs">
                  <Play size={11} className="fill-current translate-x-[0.5px]" />
                </div>
              </div>

              {/* Bottom: Sequenced video tracks */}
              <div className="space-y-1 z-10">
                <div className="h-2 w-full bg-neutral-950 border border-neutral-900 rounded-sm overflow-hidden relative">
                  <div className="absolute top-0 left-0 h-full w-2/3 bg-[#4B89FF]/50 rounded-r-sm animate-[pulse_2s_infinite]" />
                  <div className="absolute top-0 left-2/3 h-full w-[2px] bg-red-500" />
                </div>
                <div className="flex items-center justify-between text-[8px] font-mono text-neutral-400 font-medium">
                  <span>00:03:40</span>
                  <span className="text-neutral-550 font-bold">TIMELINE</span>
                </div>
              </div>
            </div>
          </div>
 
          {/* Card 2: 채널 컨설팅 */}
          <div className="flex flex-col justify-between bg-neutral-900/20 border border-neutral-900 rounded-xl p-5 hover:border-[#4B89FF]/40 hover:bg-neutral-900/45 transition group/edit-card shadow-xs">
            <div>
              <div className="flex items-center space-x-1 mb-2">
                <span className="text-[#4B89FF] font-bold text-sm">*</span>
                <h3 className="text-md font-bold text-white font-display">채널 컨설팅</h3>
              </div>
              <p className="text-xs text-neutral-400 font-medium leading-relaxed mb-6">
                데이터 기반 운영 방향 제안과 체계화된 채널 성장 전략 맞춤 제안 안내
              </p>
            </div>
            
            {/* Premium Dark Analytics Chart Mockup */}
            <div 
              className="aspect-[16/10] bg-black border border-neutral-900 rounded-lg p-3 flex flex-col justify-between relative overflow-hidden group/m2 shadow-inner group-hover/edit-card:border-[#4B89FF]/30 transition-all duration-300"
            >
              {/* Subtle blue accent glow inside the dark visual */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#4B89FF]/4 rounded-full blur-xl pointer-events-none group-hover/m2:bg-[#4B89FF]/8 transition duration-300" />

              {/* Top: Analytics Label & Metrics */}
              <div className="flex items-center justify-between border-b border-neutral-900 pb-1.5 z-10 font-medium">
                <div className="flex items-center space-x-1">
                  <BarChart3 size={10} className="text-[#4B89FF]" />
                  <span className="text-[9px] font-mono font-bold tracking-wider text-neutral-400">ALGORITHM TRAFFIC</span>
                </div>
                <span className="text-[8px] font-mono text-emerald-400 font-black bg-emerald-500/10 border border-emerald-500/20 px-1 py-0.2 rounded">+214% CTR</span>
              </div>

              {/* Middle: Grid and climbing stroke line chart */}
              <div className="relative h-12 flex items-center justify-center my-1 font-medium">
                {/* Chart baseline grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between opacity-10">
                  <div className="h-px bg-neutral-700 w-full" />
                  <div className="h-px bg-neutral-700 w-full" />
                  <div className="h-px bg-neutral-700 w-full" />
                </div>

                {/* SVG Climbing Curve (Simulated) */}
                <svg className="w-full h-full overflow-visible z-10" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path 
                    d="M 0 25 Q 25 15 50 15 T 90 4 Q 95 2 100 0.5" 
                    fill="none" 
                    stroke="rgba(75,137,255,0.08)" 
                    strokeWidth="3.5" 
                    strokeLinecap="round"
                  />
                  <path 
                    d="M 0 25 Q 25 15 50 15 T 90 4 Q 95 2 100 0.5" 
                    fill="none" 
                    stroke="#4B89FF" 
                    strokeWidth="1.8" 
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  <circle cx="100" cy="0.5" r="2" fill="#4B89FF" />
                </svg>
              </div>

              {/* Bottom: Engagement status report */}
              <div className="flex items-end justify-between z-10">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-neutral-200 font-mono font-bold leading-none block">AVD 58.4%</span>
                  <span className="text-[7.5px] text-neutral-500 font-mono block">VIEW DURATION</span>
                </div>
                <span className="text-[8px] font-mono text-[#4B89FF] font-semibold">
                  OPTIMIZED
                </span>
              </div>
            </div>
          </div>
 
          {/* Card 3: 채널 매니지먼트 */}
          <div className="flex flex-col justify-between bg-neutral-900/20 border border-neutral-900 rounded-xl p-5 hover:border-[#4B89FF]/40 hover:bg-neutral-900/45 transition group/edit-card shadow-xs">
            <div>
              <div className="flex items-center space-x-1 mb-2">
                <span className="text-[#4B89FF] font-bold text-sm">*</span>
                <h3 className="text-md font-bold text-white font-display">채널 매니지먼트</h3>
              </div>
              <p className="text-xs text-neutral-400 font-medium leading-relaxed mb-6">
                콘텐츠 업로드 및 세밀한 채널 케어와 구조화된 채널 구축 운영 시스템
              </p>
            </div>
            
            {/* Premium Dark SEO Scheduling & Management Mockup */}
            <div 
              className="aspect-[16/10] bg-black border border-neutral-900 rounded-lg p-3 flex flex-col justify-between relative overflow-hidden group/m3 shadow-inner group-hover/edit-card:border-[#4B89FF]/30 transition-all duration-300"
            >
              {/* Subtle blue accent glow inside the dark visual */}
              <div className="absolute top-0 right-1 w-24 h-24 bg-[#4B89FF]/4 rounded-full blur-xl pointer-events-none group-hover/m3:bg-[#4B89FF]/8 transition duration-300" />

              {/* Top: Scheduler status header */}
              <div className="flex items-center justify-between border-b border-neutral-900 pb-1.5 z-10 font-medium">
                <div className="flex items-center space-x-1">
                  <Clock size={10} className="text-[#4B89FF]" />
                  <span className="text-[9px] font-mono font-bold tracking-wider text-neutral-400">SEO SCHEDULER</span>
                </div>
                <span className="text-[8px] font-mono text-[#4B89FF] font-bold bg-[#4B89FF]/10 border border-[#4B89FF]/20 px-1 py-0.2 rounded">ON TIME</span>
              </div>

              {/* Middle: Queued task rows with checkmarks */}
              <div className="space-y-1 my-1 z-10 font-medium">
                {/* Task Item 1 */}
                <div className="flex items-center justify-between bg-neutral-950/80 border border-neutral-900 px-1.5 py-0.5 rounded">
                  <div className="flex items-center space-x-1 min-w-0">
                    <CheckSquare size={9} className="text-[#4B89FF]" />
                    <span className="text-[8px] text-neutral-300 truncate tracking-tight">키워드 알고리즘 부스팅</span>
                  </div>
                  <span className="text-[7px] text-neutral-500 font-mono">DONE</span>
                </div>
                
                {/* Task Item 2 */}
                <div className="flex items-center justify-between bg-[#4B89FF]/10 border border-[#4B89FF]/20 px-1.5 py-0.5 rounded">
                  <div className="flex items-center space-x-1 min-w-0">
                    <CheckSquare size={9} className="text-[#4B89FF]" />
                    <span className="text-[8px] text-[#4B89FF] truncate tracking-tight font-semibold">최적 업로드 자동 예약</span>
                  </div>
                  <span className="text-[7.5px] font-bold text-[#4B89FF] font-mono animate-pulse">LIVE</span>
                </div>
              </div>

              {/* Bottom: Management status */}
              <div className="flex items-end justify-between z-10">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-neutral-200 font-mono font-bold leading-none block">365 CARE</span>
                  <span className="text-[7.5px] text-neutral-500 font-mono block">ALL-IN-ONE SYSTEM</span>
                </div>
                <span className="text-[8px] font-mono text-neutral-400">
                  MANAGED
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
