import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ChevronLeft, ChevronRight, X, AlertCircle, AlertTriangle, Search } from 'lucide-react';
import { PortfolioItem, CategoryFilter } from '../types';
import { getYouTubeThumbnailUrl, getYouTubeWatchUrl, getYouTubeEmbedUrl } from '../utils/youtube';

interface PortfolioSectionProps {
  items: PortfolioItem[];
}

export default function PortfolioSection({ items }: PortfolioSectionProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  
  useEffect(() => {
    if (selectedItem) {
      setIsBlocked(false);
    }
  }, [selectedItem]);
  
  // Content Pagination States
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);
  
  // Custom cursor tracker states
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter lists
  const categories = [
    { key: 'all', label: '전체' },
    { key: 'production', label: '편집' },
    { key: 'shorts', label: '유튜브 숏츠' },
    { key: 'shooting', label: '촬영' },
    { key: 'planning', label: '기획' },
    { key: 'management', label: '매니지먼트' }
  ];

  const filteredItems = items.filter((item) => {
    // 1. Category Filter Comparison
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    if (!matchesCategory) return false;

    // 2. Search Query Comparison
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;

    // Support #hashtag search as well as general keyword search
    const isHashtagSearch = query.startsWith('#');
    const cleanSearch = isHashtagSearch ? query.slice(1).trim() : query;

    if (!cleanSearch) return true;

    const matchesTitle = item.title.toLowerCase().includes(cleanSearch);
    const matchesClient = item.clientName.toLowerCase().includes(cleanSearch);
    const matchesCategoryWord = item.category.toLowerCase().includes(cleanSearch);
    const matchesHighlights = item.highlights.some((hl) => hl.toLowerCase().includes(cleanSearch));

    return matchesTitle || matchesClient || matchesCategoryWord || matchesHighlights;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Continuous pointer track relative to container
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section 
      id="portfolio-section"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative bg-transparent py-20 border-b border-neutral-900 overflow-hidden"
    >
      {/* Background soft glowing accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#4B89FF]/2 rounded-full blur-[120px] pointer-events-none" />

      {/* Embedded Floating Reactive Cursor Bubble for card hovers */}
      {isHoveringCard && (
        <motion.div
          className="hidden lg:flex fixed z-100 pointer-events-none w-14 h-14 bg-[#4B89FF] text-white rounded-full items-center justify-center font-black text-xs font-mono tracking-widest uppercase shadow-[0_0_20px_rgba(75,137,255,0.4)]"
          style={{
            left: mousePosition.x + (containerRef.current?.getBoundingClientRect().left || 0) - 28,
            top: mousePosition.y + (containerRef.current?.getBoundingClientRect().top || 0) + 12,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <Play size={16} className="fill-white translate-x-0.5" />
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section title header - Centered Layout */}
        <div className="flex flex-col items-center text-center justify-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-[#4B89FF]/10 px-3.5 py-1.5 rounded-full border border-[#4B89FF]/20 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4B89FF] animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-[#4B89FF] uppercase tracking-widest">
              MOAPIC METRIC PORTFOLIOS
            </span>
          </div>
          
          <h2 className="text-3.5xl sm:text-[45px] font-black text-white tracking-tight leading-tight mt-3.5 font-display">
            모아픽컴퍼니 포트폴리오
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2.5 max-w-xl font-medium leading-relaxed whitespace-pre-line text-center">
            실제 달성한 조회수와 인바운드 유입 전환 등 모아픽컴퍼니의 손을 거쳐 만들어진 실질적인 비즈니스 데이터를 직접 확인해 보세요.
          </p>
        </div>

        {/* Tab Filter buttons & Search Input - Responsive Layout */}
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-nowrap md:flex-wrap gap-1.5 bg-neutral-950/60 p-1 rounded-2xl border border-neutral-900 shadow-inner max-w-full overflow-x-auto scrollbar-none shrink-0">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key as CategoryFilter)}
                  className={`px-4 py-2.5 text-xs font-bold rounded-xl transition cursor-pointer whitespace-nowrap duration-200 ${
                    isSelected 
                      ? 'bg-[#4B89FF] text-white shadow-md font-black shadow-[#4B89FF]/14' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search bar inputs */}
          <div className="relative w-full md:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
              <Search size={14} className="stroke-[2.5]" />
            </div>
            <input
              type="text"
              id="portfolio-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="검색어 또는 #해시태그 입력 (예: #기획)"
              className="w-full bg-neutral-950/60 border border-neutral-900 hover:border-neutral-800 focus:border-[#4B89FF] focus:ring-1 focus:ring-[#4B89FF]/18 text-xs text-neutral-200 placeholder-neutral-500 rounded-xl py-3 pl-10 pr-9 transition duration-200 outline-none font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-neutral-300 cursor-pointer transition-colors"
                title="검색어 지우기"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Portfolio gallery items grid */}
        {filteredItems.length === 0 ? (
          <div className="border border-dashed border-neutral-900 rounded-3xl p-16 text-center text-neutral-400 max-w-2xl mx-auto flex flex-col items-center justify-center space-y-4 bg-neutral-950/40">
            <AlertCircle size={32} className="text-neutral-500 animate-pulse" />
            <p className="text-sm font-medium leading-relaxed">
              {searchQuery 
                ? `수정하신 키워드 "${searchQuery}"를 포함하는 포트폴리오 정보를 찾을 수 없습니다.`
                : '이 카테고리에 준비된 포트폴리오는 현재 준비 중입니다. 관리자 채널에서 신규 항목을 추가해 보세요!'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="bg-neutral-900 border border-neutral-800 text-[#4B89FF] hover:bg-neutral-800 hover:text-white font-bold text-xs px-4 py-2 rounded-xl transition duration-200 cursor-pointer"
              >
                검색 필터 전체 초기화 ↺
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((item) => (
              <motion.div
                key={item.id}
                layoutId={`card-container-${item.id}`}
                onClick={() => setSelectedItem(item)}
                onMouseEnter={() => setIsHoveringCard(true)}
                onMouseLeave={() => setIsHoveringCard(false)}
                className="group bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden cursor-pointer hover:border-[#4B89FF]/40 hover:shadow-[0_15px_40px_rgba(75,137,255,0.06)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail cover representing video */}
                  <div className="relative aspect-video bg-neutral-900/60 overflow-hidden">
                    <img 
                      src={getYouTubeThumbnailUrl(item.videoUrl, item.thumbnailUrl)} 
                      alt={item.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-5 group-hover:grayscale-0 group-hover:scale-105 transition duration-500 opacity-80 group-hover:opacity-100"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition" />
                    
                    {/* Floating play preview hover bubble */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-11 h-11 rounded-full bg-[#4B89FF] text-white flex items-center justify-center shadow-[0_0_15px_rgba(75,137,255,0.4)]">
                        <Play size={16} className="fill-white translate-x-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Body elements */}
                  <div className="p-5 space-y-3.5">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-widest text-[#4B89FF] font-bold uppercase block">
                        {item.clientName}
                      </span>
                      <h3 className="text-base font-bold text-white leading-snug group-hover:text-[#4B89FF] transition-colors line-clamp-2 font-display">
                        {item.title}
                      </h3>
                    </div>

                    {/* Highlights bullets indicator (Interactive Hash Search button) */}
                    <div className="flex flex-wrap gap-1.5 relative z-20">
                      {item.highlights.slice(0, 3).map((hl, index) => (
                        <button 
                           key={index} 
                           type="button"
                           onClick={(e) => {
                             e.stopPropagation(); // Prevents launching details modal
                             setSearchQuery(`#${hl}`);
                           }}
                           className="text-[9.5px] bg-neutral-900 border border-neutral-800 hover:border-[#4B89FF]/45 text-neutral-400 hover:text-[#4B89FF] px-2 py-0.5 rounded-md font-bold transition duration-150 cursor-pointer text-left"
                           title={`#${hl} 해시태그 검색하기`}
                        >
                          #{hl}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-neutral-900 flex justify-between items-center mt-2">
                  <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider text-[#4B89FF]">
                    {item.category === 'shorts' ? 'Shorts' : 
                     item.category === 'production' ? 'Production' : 
                     item.category === 'shooting' ? 'Studio Shoot' : 
                     item.category === 'planning' ? 'Consultation' : 'Full Management'}
                  </span>
                  
                  <span className="text-[9.5px] font-mono text-neutral-400 flex items-center group-hover:text-[#4B89FF] transition">
                    세부 보기 <ChevronRight size={12} className="ml-0.5" />
                  </span>
                </div>
              </motion.div>
            ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 pt-6">
                <button
                  onClick={() => {
                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                    document.getElementById('portfolio-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl border border-neutral-900 bg-neutral-950/60 text-neutral-400 hover:text-white hover:border-[#4B89FF]/40 cursor-pointer transition disabled:opacity-25 disabled:hover:text-[#4B89FF]/30 disabled:cursor-not-allowed shadow-xs`}
                >
                  <ChevronLeft size={16} />
                </button>
                
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNum = idx + 1;
                  const isCurrent = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        document.getElementById('portfolio-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-10 h-10 rounded-xl text-xs font-bold font-mono transition cursor-pointer ${
                        isCurrent
                          ? 'bg-[#4B89FF] text-white font-black shadow-md shadow-[#4B89FF]/14'
                          : 'border border-neutral-900 bg-neutral-950/60 text-neutral-400 hover:text-white hover:border-neutral-900 shadow-xs'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => {
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                    document.getElementById('portfolio-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  disabled={currentPage === totalPages}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl border border-neutral-900 bg-neutral-950/60 text-neutral-400 hover:text-white hover:border-neutral-900 shadow-xs`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* YouTube Embed Policy Disclaimer Footer */}
            <div className="mt-16 pt-8 border-t border-neutral-900 text-center max-w-3xl mx-auto">
              <p className="text-[11px] sm:text-xs text-neutral-500 font-medium leading-relaxed">
                본 페이지의 영상은 각 채널의 공개 유튜브 영상을 유튜브 공식 임베드 기능을 통해 제공하며, 저작권은 각 원저작자에게 있습니다.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* PORTFOLIO LIGHTBOX VIEW MODAL DETAIL */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs overflow-y-auto">
            <motion.div 
              layoutId={`card-container-${selectedItem.id}`}
              className="w-full max-w-3xl bg-neutral-950 border border-neutral-900 rounded-3xl overflow-hidden shadow-2xl relative my-8"
            >
              {/* Close trigger upper right */}
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 p-2 rounded-full cursor-pointer transition border border-neutral-800 shadow-xs"
              >
                <X size={16} />
              </button>

              {/* Dynamic Video placeholder / Embedded Player preview in modal */}
              <div className="relative aspect-video bg-neutral-950 border-b border-neutral-900 overflow-hidden">
                {/* Controller Mode Switcher at top for convenience of testing/auditing both scenarios */}
                <div className="absolute top-3 right-12 bg-neutral-900/95 border border-neutral-800 rounded-xl p-1 flex items-center space-x-1 z-20 shadow-md">
                  <button
                    type="button"
                    onClick={() => setIsBlocked(false)}
                    className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all duration-200 cursor-pointer ${
                      !isBlocked 
                        ? 'bg-[#4B89FF] text-white shadow-xs' 
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    일반 재생 (임베드)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsBlocked(true)}
                    className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all duration-200 cursor-pointer ${
                      isBlocked 
                        ? 'bg-red-500 text-white shadow-xs' 
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    재생 제한 상태 테스트
                  </button>
                </div>

                {!isBlocked ? (
                  /* 영상 재생 가능 시: 표준 공식 Embed 플레이어 */
                  <iframe
                    title="Portfolio Playback"
                    src={getYouTubeEmbedUrl(selectedItem.videoUrl)}
                    className="w-full h-full border-none z-10 relative bg-black"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  /* 영상 재생 불가 시: 요구사항 안내 UI */
                  <div className="absolute inset-0 bg-neutral-900/40 flex flex-col items-center justify-center p-6 text-center z-10">
                    <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 animate-pulse">
                      <AlertTriangle size={28} className="text-red-500" />
                    </div>
                    
                    <h3 className="text-sm sm:text-base font-black text-white mb-2 tracking-tight">
                      해당 영상은 외부 사이트 재생이 제한되어 있습니다.
                    </h3>
                    
                    <p className="text-[11px] sm:text-xs text-neutral-400 mb-5 max-w-md leading-relaxed">
                      영상 저작권자 설정 및 국가 필터링 제한 등의 외부 도메인 다이렉트 프레임 임베드 제한이 감지되었습니다.
                    </p>
                    
                    <a
                      href={getYouTubeWatchUrl(selectedItem.videoUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-black text-xs sm:text-sm px-5 py-3 rounded-xl transition duration-200 shadow-lg shadow-red-500/20 active:scale-95 cursor-pointer"
                    >
                      <Play size={12} className="fill-white stroke-[3px]" />
                      <span>유튜브에서 원본 영상 보기 ↗</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Text Specs Context */}
              <div className="p-6 md:p-8 space-y-6 bg-neutral-950">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-[10px] bg-[#4B89FF]/10 border border-[#4B89FF]/20 px-2.5 py-0.5 rounded-md text-[#4B89FF] font-extrabold font-mono tracking-widest uppercase">
                        {selectedItem.category.toUpperCase()}
                      </span>
                      <span className="text-xs text-amber-500 font-extrabold flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 animate-pulse" />
                        {selectedItem.stats}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-normal leading-snug font-display">
                      {selectedItem.title}
                    </h3>
                    <p className="text-xs text-[#4B89FF] font-mono font-bold tracking-wider">{selectedItem.clientName}</p>
                  </div>

                  {/* Primary Link Direct Navigation CTA Button */}
                  <div className="pt-2">
                    <a
                      href={getYouTubeWatchUrl(selectedItem.videoUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center space-x-2 bg-[#4B89FF] hover:bg-[#3b75e0] text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl transition duration-200 shadow-lg shadow-[#4B89FF]/14 hover:scale-[1.01] active:scale-100 cursor-pointer text-center"
                    >
                      <Play size={14} className="fill-white stroke-[3px]" />
                      <span>유튜브 공식 앱/사이트에서 원본 영상 재생하기 ↗</span>
                    </a>
                  </div>
                </div>

                {/* Removed highlights and production guide section according to user request */}

                <div className="flex justify-between items-center pt-6 border-t border-neutral-900 text-neutral-500 text-[10px]">
                  <span>MOAPIC OFFICIAL ARCHIVE REFERER</span>
                  <span>등록시점: {selectedItem.createdAt || 'RECENT'}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
