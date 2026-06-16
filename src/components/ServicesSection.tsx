import { Play } from 'lucide-react';

interface ServicesSectionProps {
  onScrollToPortfolio?: () => void;
  onScrollToConsulting?: () => void;
}

export default function ServicesSection({ onScrollToPortfolio, onScrollToConsulting }: ServicesSectionProps) {
  
  const detailedServices = [
    {
      id: 1,
      title: '유튜브 콘텐츠 제작',
      subTitle: '(YouTube Content)',
      desc: '귀사 브랜드 자산에 부합하는 고감도 영상 연출과 정교한 호흡의 편집을 통해 시청 지속 시간(AVD)을 극대화하고 이탈을 확실하게 차단합니다.',
      alignLeft: true
    },
    {
      id: 2,
      title: '채널 컨설팅',
      subTitle: '(Channel Consulting)',
      desc: '10년 이상의 플랫폼 생태계 분석 연륜을 가진 실무진이 귀사 채널의 현 성능을 정밀 진단하고 명확한 성과 중심의 맞춤 로드맵을 수립합니다.',
      alignLeft: false
    },
    {
      id: 3,
      title: '채널 매니지먼트',
      subTitle: '(Channel Management)',
      desc: '채널 운영과 자산 관리를 완벽하게 전담하여 리소스 낭비를 없애며, 자동 예약 배포 및 알고리즘 입체 모니터링을 밀착 수행합니다.',
      alignLeft: true
    }
  ];

  return (
    <section className="relative bg-transparent pt-10 pb-16 px-4 md:px-0" id="services-details-section">
      
      {/* 4. Three alternating service presentation blocks */}
      <div className="max-w-4xl mx-auto space-y-12">
        {detailedServices.map((service) => (
          <div 
            key={service.id} 
            className="border border-neutral-900 bg-neutral-950/60 rounded-2xl p-6 md:p-8 hover:border-[#4B89FF]/40 transition duration-300 shadow-2xl shadow-black/80 relative overflow-hidden group"
          >
            {/* Ambient vector glow spotlight in the background */}
            <div className={`absolute -top-10 ${service.alignLeft ? '-right-10' : '-left-10'} w-56 h-56 bg-[#4B89FF]/1 rounded-full blur-3xl pointer-events-none group-hover:bg-[#4B89FF]/4 transition-all duration-500`} />
            
            <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10`}>
              
              {/* White Placeholder Element */}
              <div 
                className={`col-span-1 md:col-span-6 aspect-video bg-neutral-900/40 hover:bg-neutral-900/60 border border-neutral-900 rounded-xl flex items-center justify-center p-4 shadow-inner transition cursor-pointer ${
                  !service.alignLeft ? 'md:order-last' : ''
                }`}
                onClick={onScrollToPortfolio}
              >
                <div className="w-12 h-12 rounded-full bg-[#4B89FF] border border-[#4B89FF]/20 flex items-center justify-center text-white hover:scale-105 transition-all duration-300 shadow-md">
                  <Play size={18} className="fill-white translate-x-0.5 text-white" />
                </div>
              </div>

              {/* Text Information Element */}
              <div className={`col-span-1 md:col-span-6 space-y-4 ${!service.alignLeft ? 'md:text-right font-medium' : 'font-medium'}`}>
                <h3 className={`font-display text-xl md:text-2xl font-bold text-white tracking-normal border-l-4 border-[#4B89FF] pl-4 ${
                  !service.alignLeft 
                    ? 'md:border-l-0 md:border-r-4 md:pl-0 md:pr-4' 
                    : ''
                }`}>
                  <div className={`flex flex-col ${!service.alignLeft ? 'md:items-end' : 'md:items-start'}`}>
                    <span className="tracking-tight text-white">{service.title}</span>
                    {service.subTitle && (
                      <span className="text-xs md:text-sm font-mono font-bold text-[#4B89FF] mt-1.5 tracking-wider uppercase">
                        {service.subTitle}
                      </span>
                    )}
                  </div>
                </h3>
                <p className={`text-xs md:text-[13px] text-neutral-400 font-medium leading-relaxed tracking-wide text-justify ${
                  !service.alignLeft ? 'md:text-right text-right' : ''
                }`}>
                  {service.desc}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* 5. Refined Horizontal Video Highlights section removed (moved to Home page) */}

      {/* 6. Heroic final banner message */}
      <div className="max-w-4xl mx-auto mt-20 text-center relative py-12 px-4 select-none">
        <div className="relative z-10 space-y-3">
          <p className="text-md md:text-xl font-bold tracking-widest text-[#4B89FF] text-center filter drop-shadow font-display">
            최고의 파트너로서 거품을 뺀 최적의 예산으로,
          </p>
          <h3 className="text-xl md:text-3xl font-bold tracking-widest text-white text-center filter drop-shadow font-display">
            당신의 brand 가치를 높여드립니다.
          </h3>
        </div>

        {/* Faded grey 3D isometric cube logo watermark behind/below the text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] select-none">
          <svg viewBox="0 0 120 130" className="w-56 h-56 select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="60,10 85,25 60,40 35,25" fill="#cccccc" stroke="#bbbbbb" strokeWidth="1" />
            <polygon points="35,25 60,40 60,70 35,55" fill="#c0c0c0" stroke="#bbbbbb" strokeWidth="1" />
            <polygon points="60,40 85,25 85,55 60,70" fill="#b0b0b0" stroke="#bbbbbb" strokeWidth="1" />
            <polygon points="35,40 60,55 35,70 10,55" fill="#c2c2c2" stroke="#bbbbbb" strokeWidth="1" />
            <polygon points="10,55 35,70 35,100 10,85" fill="#a0a0a0" stroke="#bbbbbb" strokeWidth="1" />
            <polygon points="35,70 60,55 60,85 35,100" fill="#9c9c9c" stroke="#bbbbbb" strokeWidth="1" />
            <polygon points="85,40 110,55 85,70 60,55" fill="#cccccc" stroke="#bbbbbb" strokeWidth="1" />
            <polygon points="60,55 85,70 85,100 60,85" fill="#c0c0c0" stroke="#bbbbbb" strokeWidth="1" />
            <polygon points="85,70 110,55 110,85 85,100" fill="#a0a0a0" stroke="#bbbbbb" strokeWidth="1" />
          </svg>
        </div>
      </div>

    </section>
  );
}
