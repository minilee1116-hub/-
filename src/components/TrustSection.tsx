import { useState, useEffect, useRef } from 'react';

interface TrustSectionProps {
  onScrollToConsulting?: () => void;
  subscribers?: string;
  videos?: string;
  views?: string;
}

function AnimatedCounter({ value }: { value: string }) {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  const suffix = value.replace(/[0-9,]/g, '');
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -10% 0px' // Trigger slightly before center, when it has entered the screen
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!inView) return;

    // Ensure we start with visual state set to hidden
    setAnimate(false);

    let start = 0;
    const end = numericValue;
    if (start === end) {
      setCount(end);
      setAnimate(true);
      return;
    }

    // Set a tiny transition offset to let the browser register start state
    const animationStartTimeout = setTimeout(() => {
      setAnimate(true);
    }, 50);

    // Interactive count-up animation - 2 seconds for an energetic start
    const duration = 2000;
    const startTime = performance.now();

    let animationFrameId: number;
    let resetTransitionTimeoutId: any;
    let nextLoopTimeoutId: any;

    const updateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutCubic style (starts faster and flows smoothly into completion)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeProgress * end);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        // Complete! Wait exactly 4 seconds (4000ms)
        resetTransitionTimeoutId = setTimeout(() => {
          // 1. Instantly hide and reset with NO visible transition animation (disappearing motion deleted)
          setIsTransitioning(false);
          setAnimate(false);
          setCount(0);

          // 2. Next tick, re-enable transition and trigger the count-down descend loop immediately
          nextLoopTimeoutId = setTimeout(() => {
            setIsTransitioning(true);
            setTrigger((prev) => prev + 1);
          }, 50); 
        }, 4000);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      clearTimeout(animationStartTimeout);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resetTransitionTimeoutId);
      clearTimeout(nextLoopTimeoutId);
    };
  }, [inView, numericValue, trigger]);

  return (
    <span 
      ref={elementRef} 
      className={`inline-block tabular-nums transform ${
        isTransitioning ? 'transition-all duration-1000 ease-out' : ''
      } ${
        animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'
      }`}
    >
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function TrustSection({ 
  onScrollToConsulting,
  subscribers = '7,120,000+',
  videos = '531개',
  views = '84,230,000+'
}: TrustSectionProps) {
  const stats = [
    {
      value: subscribers,
      label: '누적 구독자'
    },
    {
      value: videos,
      label: '누적 편집 영상'
    },
    {
      value: views,
      label: '누적 조회수'
    }
  ];

  return (
    <section className="relative bg-transparent py-8 px-6">
      
      {/* Premium Trust badge container */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center space-x-2.5 bg-neutral-900/60 hover:bg-neutral-900/80 border border-neutral-800 px-5 py-2.5 rounded-full transition-colors duration-200 shadow-xs">
          <span className="w-2.5 h-2.5 bg-[#4B89FF] rounded-full animate-pulse shadow-[0_0_10px_rgba(75,137,255,0.4)]" />
          <span className="text-xs sm:text-sm font-bold text-neutral-300 tracking-widest text-shadow-sm uppercase font-display">
            10년 이상의 유튜브 생태계 경험
          </span>
        </div>
      </div>

      {/* 3. Dark Stat Card block matching layout of mockup */}
      <div className="max-w-7xl mx-auto bg-neutral-950/80 border border-neutral-900 rounded-2xl overflow-hidden shadow-2xl shadow-black/40 relative" id="stats-block">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4B89FF]/10 to-transparent" />
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-neutral-900 text-center py-2 sm:py-9 md:py-12 bg-neutral-950/40">
          {stats.map((stat, idx) => {
            const isTotalViews = stat.label === '누적 조회수';
            return (
              <div key={idx} className="flex flex-col items-center justify-center px-4 py-7 sm:py-0 text-center">
                <span className={`w-full flex items-center justify-center text-center font-bold tracking-normal font-outfit transition-all duration-300 ${
                  isTotalViews 
                    ? 'text-[#4B89FF] text-3xl sm:text-2xl md:text-3.5xl lg:text-[42px] xl:text-5xl' 
                    : 'text-white text-3xl sm:text-2.5xl md:text-4xl lg:text-[46px] xl:text-[52px]'
                }`}>
                  <AnimatedCounter value={stat.value} />
                </span>
                <span className={`text-[10px] sm:text-[10.5px] md:text-xs font-bold tracking-wider mt-3 whitespace-nowrap ${
                  isTotalViews ? 'text-[#4B89FF] font-bold' : 'text-neutral-400'
                }`}>
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
 
    </section>
  );
}
