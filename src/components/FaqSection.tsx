import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: "편집만 의뢰할 수 있나요?",
      answer: "물론입니다. 귀사 채널에 필요한 컷편집, 자막, 연출, 모션그래픽 등 개별 편집 공정만 선택하여 맞춤형으로 의뢰하실 수 있습니다."
    },
    {
      question: "계약 기간은 어떻게 되나요?",
      answer: "네, 가능합니다. 단발성 프로젝트부터 장기 파트너십까지 유연하게 진행할 수 있으며, 3개월 이상 계약 시에는 우대 견적 혜택을 제공합니다."
    },
    {
      question: "채널 규모가 작아도 가능한가요?",
      answer: "물론입니다. 신규 채널도 가능합니다. 초기 방향성과 맞춤 성장 전략을 탄탄하게 설계해 안정적인 시작을 지원해 드립니다."
    },
    {
      question: "상담 비용이 발생하나요?",
      answer: "아니요. 초기 견적 상담은 100% 무료입니다. 우측 상단의 ‘무료 상담 신청’ 또는 견적 문의를 통해 언제든 편하게 접수해 주세요."
    },
    {
      question: "협업 전 테스트 진행이 가능한가요?",
      answer: "네, 가능합니다. 테스트 편집 또는 샘플 제작을 협의하여 진행해 드리며, 자세한 내용은 무료 상담을 통해 안내해 드립니다."
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-transparent py-16 md:py-20 relative overflow-hidden border-t border-neutral-900" id="faq-section">
      {/* Background radial spotlight glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#4B89FF]/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 md:px-0 relative z-10">
        
        {/* Header container */}
        <div className="text-center space-y-2.5 mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-neutral-900/60 border border-neutral-800 px-3 py-1 rounded-full text-xs font-bold text-neutral-400 shadow-xs">
            <HelpCircle size={11} className="text-[#4B89FF]" />
            <span className="text-[10px] tracking-widest uppercase font-mono">FAQ SUPPORT</span>
          </div>
          
          <h2 className="text-2.5xl md:text-3.5xl font-bold text-[#4B89FF] tracking-normal font-display">
            자주 묻는 질문
          </h2>
          <p className="text-xs text-neutral-400 max-w-md mx-auto font-medium">
            유튜브 채널 성장과 모아픽의 업무 파트너십에 대해 파트너사들이 가장 많이 궁금해하시는 사항들을 정리했습니다.
          </p>
        </div>

        {/* Accordion container */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div 
                key={idx}
                className={`border rounded-2xl transition-all duration-300 relative overflow-hidden bg-neutral-950/60 outline-none ${
                  isOpen 
                    ? 'border-[#4B89FF]/40 shadow-[0_15px_40px_rgba(75,137,255,0.06)] bg-neutral-950/80' 
                    : 'border-neutral-900 hover:border-neutral-800'
                }`}
              >
                {/* Accordion Header Action */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left py-4.5 px-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`text-[13.5px] font-black tracking-tight transition-colors duration-200 ${
                    isOpen ? 'text-[#4B89FF]' : 'text-neutral-200'
                  }`}>
                    <span className="text-[#4B89FF] mr-1">Q.</span>{faq.question}
                  </span>
                  
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-300 ${
                    isOpen 
                      ? 'bg-[#4B89FF]/10 border-[#4B89FF]/25 text-[#4B89FF]' 
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                  }`}>
                    <ChevronDown 
                      size={14} 
                      className={`transform transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </span>
                </button>

                {/* Animated content element using motion/react */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 pt-0.5 border-t border-neutral-900">
                        <p className="text-[12.5px] leading-relaxed text-neutral-300 font-medium whitespace-pre-line tracking-wide text-justify">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
