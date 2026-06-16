import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, ArrowLeft, Send, Sparkles, AlertCircle } from 'lucide-react';
import { Consultation } from '../types';

interface ConsultingFormProps {
  onSuccess: () => void;
}

export default function ConsultingForm({ onSuccess }: ConsultingFormProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formError, setFormError] = useState<string>('');

  // Form Fields State
  // Step 1: 기본 인적 정보
  const [clientName, setClientName] = useState('');
  const [contact, setContact] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Step 2: 채널 및 서비스 선택
  const [channelInfo, setChannelInfo] = useState('');
  const [subscriberCount, setSubscriberCount] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Step 3: 선호하는 영상 편집 스타일
  const [subtitleStyle, setSubtitleStyle] = useState<'불필요함' | '풀자막' | '강조 자막만' | ''>('');
  const [audioStyle, setAudioStyle] = useState<'불필요함' | '적절함' | '강조된 장면만' | ''>('');
  const [transitionStyle, setTransitionStyle] = useState<'불필요함' | '적절함' | '강조된 장면만' | ''>('');

  // Step 4: 채널 고민 및 스펙
  const [painPoint, setPainPoint] = useState('');
  const [avgRunningTime, setAvgRunningTime] = useState('');
  const [weeklyUploads, setWeeklyUploads] = useState('');

  // Step 5: 예산, 시작일 및 기타
  const [budgetRange, setBudgetRange] = useState('');
  const [startDate, setStartDate] = useState('');
  const [memo, setMemo] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Constants mapping options
  const subscriberOptions = [
    '신규 채널 (0명)',
    '100명 미만',
    '100명 ~ 1,000명',
    '1,000명 ~ 1만 명',
    '1만 명 ~ 10만 명',
    '10만 명 이상'
  ];

  const serviceOptions = [
    '영상 편집 (컷편집, 자막, 모션 그래픽 등)',
    '유튜브 채널 컨설팅 (전략, 기획)',
    '채널 매니징 (업로드, SEO, 댓글 관리)',
    '전체 패키지 (편집 + 컨설팅 + 매니징)',
    '기타 (Step5 \'기타 요청 사항\'에 기재)'
  ];

  const painPointOptions = [
    '시청 지속 시간(시청자들이 금방 이탈함)',
    '클릭률(썸네일/제목 문제)',
    '영상 콘텐츠 기획의 어려움',
    '편집 시간 부족/퀄리티 문제',
    '수익화 및 광고 관련 문제'
  ];

  const uploadOptions = [
    '주 1회 이하',
    '주 2회',
    '주 3회',
    '주 4회',
    '주 5회 이상'
  ];

  const budgetOptions = [
    '상담 후 결정',
    '50만원 미만',
    '50만원 ~ 100만원',
    '100만원 ~ 200만원',
    '200만원 이상'
  ];

  const handleServiceToggle = (option: string) => {
    if (selectedServices.includes(option)) {
      setSelectedServices(selectedServices.filter((item) => item !== option));
    } else {
      setSelectedServices([...selectedServices, option]);
    }
  };

  const validateStep = (step: number): boolean => {
    setFormError('');
    if (step === 1) {
      if (!clientName.trim()) {
        setFormError('신청자(채널 대표) 성함을 입력해 주세요.');
        return false;
      }
      if (!contact.trim()) {
        setFormError('연락 가능한 이메일 주소, 또는 DM을 입력해 주세요.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setFormError('');
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      const formattedChannel = channelInfo.trim() 
        ? `${channelInfo.trim()} ${subscriberCount ? `(구독자: ${subscriberCount})` : ''}`
        : (subscriberCount ? `개인 채널 (구독자: ${subscriberCount})` : '개인 크리에이터');

      const formattedContact = phoneNumber.trim()
        ? `${contact.trim()} (연락처: ${phoneNumber.trim()})`
        : contact.trim();

      const formattedPurpose = selectedServices.length > 0 
        ? selectedServices.join(', ') 
        : '맞춤 상담';

      const formattedSpecs = `평균 러닝타임: ${avgRunningTime || '미정'} / 주간 업로드: ${weeklyUploads || '미정'}`;

      const styleScopeList = [
        `자막의 양: ${subtitleStyle || '선택 안 함'}`,
        `BGM/효과음: ${audioStyle || '선택 안 함'}`,
        `화면전환 화려함: ${transitionStyle || '선택 안 함'}`
      ];

      const formattedMemo = [
        painPoint ? `[해결하고 싶은 채널 고민 (1순위)]\n- ${painPoint}\n` : '',
        memo.trim() ? `[추가 요구 및 기타 전달 사항]\n${memo.trim()}` : ''
      ].filter(Boolean).join('\n\n') || undefined;

      const newConsultation: Consultation = {
        id: 'c_' + Date.now().toString(36),
        submittedAt: new Date().toISOString(),
        status: 'pending',
        clientName: clientName.trim(),
        companyOrChannel: formattedChannel,
        contact: formattedContact,
        purpose: formattedPurpose,
        videoLengthAndFrequency: formattedSpecs,
        workScope: styleScopeList,
        budgetRange: budgetRange || '상담 후 결정',
        timeline: startDate || '상담 후 조율',
        referenceUrl: undefined,
        memo: formattedMemo
      };

      const existing = localStorage.getItem('moapic_consultations');
      const consultationsList = existing ? JSON.parse(existing) : [];
      consultationsList.unshift(newConsultation);
      localStorage.setItem('moapic_consultations', JSON.stringify(consultationsList));

      setTimeout(() => {
        setIsSubmitting(false);
        setIsFinished(true);
        if (onSuccess) onSuccess();
      }, 1200);

    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
      setFormError('상담 신청을 전송하는 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const progressPercentage = (currentStep / 5) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl bg-neutral-950/80 border border-neutral-900 shadow-2xl shadow-black/50 p-6 md:p-8 relative overflow-hidden">
      {/* Glow highlight effects */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#4B89FF]/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#4B89FF]/[0.015] rounded-full blur-3xl pointer-events-none" />

      {/* Header and Progress Bar */}
      {!isFinished && (
        <div className="mb-8 relative z-10">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-mono tracking-widest text-[#4B89FF] font-bold uppercase">
              MOAPIC PREMIUM CONSULTING
            </span>
            <span className="text-sm font-mono text-neutral-400 font-semibold">
              Step <span className="text-[#4B89FF] font-extrabold">{currentStep}</span> / 5
            </span>
          </div>
          <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-linear-to-r from-blue-500 to-[#4B89FF] transition-all duration-500 ease-out shadow-[0_0_12px_rgba(75,137,255,0.3)]"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
        </div>
      )}

      {/* Form Area */}
      <div className="relative z-10 min-h-[340px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="flex-1 flex flex-col justify-between"
            >
              <div>
                {/* Step 1: 기본 인적 정보 */}
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <div className="border-l-2 border-[#4B89FF] pl-3">
                      <h3 className="text-xl font-bold text-white tracking-normal font-display">기본 정보를 입력해주세요.</h3>
                      <p className="text-sm text-neutral-400 mt-1">
                        피드백 및 서비스 안내서를 직접 전달하기 위한 소통 채널입니다.
                      </p>
                    </div>

                    <div className="space-y-4 pt-1">
                      <div>
                        <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                          신청자(채널 대표) 명선 / 회사명 <span className="text-[#4B89FF]">*</span>
                        </label>
                        <input
                          type="text"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="성함 혹은 회사명을 입력해 주세요"
                          className="w-full bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 focus:border-[#4B89FF] focus:ring-1 focus:ring-[#4B89FF]/18 rounded-xl px-4 py-3 text-neutral-200 placeholder-neutral-500 focus:outline-hidden transition-all text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                          연락 가능한 이메일 주소, 또는 SNS DM <span className="text-[#4B89FF]">*</span>
                        </label>
                        <input
                          type="text"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          placeholder="가장 빠르게 연락 가능한 이메일, SNS, 메신저 입력"
                          className="w-full bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 focus:border-[#4B89FF] focus:ring-1 focus:ring-[#4B89FF]/18 rounded-xl px-4 py-3 text-neutral-200 placeholder-neutral-500 focus:outline-hidden transition-all text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                          휴대폰 번호 (작성하지 않으셔도 괜찮습니다)
                        </label>
                        <input
                          type="text"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="예: 010-1234-5678"
                          className="w-full bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 focus:border-[#4B89FF] focus:ring-1 focus:ring-[#4B89FF]/18 rounded-xl px-4 py-3 text-neutral-200 placeholder-neutral-500 focus:outline-hidden transition-all text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: 채널명 및 서비스 유형 */}
                {currentStep === 2 && (
                  <div className="space-y-5">
                    <div className="border-l-2 border-[#4B89FF] pl-3">
                      <h3 className="text-xl font-bold text-white tracking-normal font-display">현재 운영 중인 채널 정보 및 서비스 구도를 알려주세요.</h3>
                      <p className="text-sm text-neutral-400 mt-1">
                        어떠한 서비스 범위에 대해 의뢰하고 싶으신지 최적의 솔루션을 매칭합니다.
                      </p>
                    </div>

                    <div className="space-y-4 pt-1">
                      <div>
                        <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                          채널명 및 채널 URL (운영 중인 경우)
                        </label>
                        <input
                          type="text"
                          value={channelInfo}
                          onChange={(e) => setChannelInfo(e.target.value)}
                          placeholder="예: 모아픽 스튜디오 / youtube.com/@moapic"
                          className="w-full bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 focus:border-[#4B89FF] focus:ring-1 focus:ring-[#4B89FF]/18 rounded-xl px-4 py-3 text-neutral-200 placeholder-neutral-500 focus:outline-hidden transition-all text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2.5">
                          현재 채널 구독자 수
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {subscriberOptions.map((opt) => {
                            const isSelected = subscriberCount === opt;
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setSubscriberCount(opt)}
                                className={`py-2.5 px-3 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                                  isSelected
                                    ? 'border-[#4B89FF] bg-[#4B89FF]/10 text-[#4B89FF] shadow-xs font-bold'
                                    : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-[#4B89FF]/40 hover:text-[#4B89FF]'
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                          신청하고자 하는 주요 서비스 유형 (중복 선택 가능)
                        </label>
                        <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto pr-1">
                          {serviceOptions.map((option) => {
                            const isChecked = selectedServices.includes(option);
                            return (
                              <button
                                key={option}
                                type="button"
                                onClick={() => handleServiceToggle(option)}
                                className={`text-left p-3 rounded-xl border text-xs transition-all flex items-center cursor-pointer ${
                                  isChecked
                                    ? 'border-[#4B89FF] bg-[#4B89FF]/10 text-[#4B89FF] font-semibold'
                                    : 'border-neutral-800 bg-neutral-900/40 text-neutral-300 hover:border-[#4B89FF]/30'
                                }`}
                              >
                                <span className={`w-4 h-4 rounded-sm border mr-2.5 flex items-center justify-center shrink-0 ${
                                  isChecked ? 'bg-[#4B89FF] border-[#4B89FF] text-white' : 'border-neutral-700 bg-neutral-950'
                                }`}>
                                  {isChecked && <Check size={10} className="stroke-[3]" />}
                                </span>
                                <span>{option}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: 선호하는 영상 편집 스타일 */}
                {currentStep === 3 && (
                  <div className="space-y-5">
                    <div className="border-l-2 border-[#4B89FF] pl-3">
                      <h3 className="text-xl font-bold text-white tracking-normal font-display">외주 진행 시 선호하는 세부 편집 스타일에 알려주세요.</h3>
                      <p className="text-sm text-neutral-400 mt-1">
                        대표님이 원하시는 편집의 방향성과 화려함 정도에 딱 맞춰 작업해 드립니다.
                      </p>
                    </div>

                    <div className="space-y-4 pt-2">
                      {[
                        { key: 'subtitle', label: '자막의 양 (텍스트 정보량)', value: subtitleStyle, setter: setSubtitleStyle, options: ['불필요함', '풀자막', '강조 자막만'] },
                        { key: 'audio', label: 'BGM 및 효과음 사용 정도', value: audioStyle, setter: setAudioStyle, options: ['불필요함', '적절함', '강조된 장면만'] },
                        { key: 'transition', label: '화면 전환(트랜지션)의 속도 및 화려함', value: transitionStyle, setter: setTransitionStyle, options: ['불필요함', '적절함', '강조된 장면만'] }
                      ].map((styleGroup) => (
                        <div key={styleGroup.key} className="p-4 bg-neutral-900/20 border border-neutral-905 rounded-2xl space-y-3">
                          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider">
                            {styleGroup.label}
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {styleGroup.options.map((opt) => {
                              const isSel = styleGroup.value === opt;
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => styleGroup.setter(opt as any)}
                                  className={`py-2.5 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                                    isSel
                                      ? 'border-[#4B89FF] bg-[#4B89FF]/10 text-[#4B89FF] shadow-xs shadow-[#4B89FF]/15 font-bold'
                                      : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-[#4B89FF]/30 hover:text-[#4B89FF]'
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: 해결 과제 및 런타임 스펙 */}
                {currentStep === 4 && (
                  <div className="space-y-5">
                    <div className="border-l-2 border-[#4B89FF] pl-3">
                      <h3 className="text-xl font-bold text-white tracking-normal font-display">가장 시급하게 해결하고 싶으신 고민점은 무엇인가요?</h3>
                      <p className="text-sm text-neutral-400 mt-1">
                        어려움을 느끼시는 부분에 대한 진단과 맞춤 채널 기획을 동봉해 드릴 것입니다.
                      </p>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div>
                        <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                          해결하고 싶으신 1순위 고민점 <span className="text-[#4B89FF]">*</span>
                        </label>
                        <div className="grid grid-cols-1 gap-1.5">
                          {painPointOptions.map((opt) => {
                            const isSelected = painPoint === opt;
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setPainPoint(opt)}
                                className={`w-full text-left p-3 px-4 rounded-xl border text-xs transition-all flex justify-between items-center cursor-pointer ${
                                  isSelected
                                    ? 'border-[#4B89FF] bg-[#4B89FF]/10 text-[#4B89FF] font-semibold shadow-xs'
                                    : 'border-neutral-800 bg-neutral-900/40 text-neutral-300 hover:border-[#4B89FF]/40'
                                }`}
                              >
                                <span>{opt}</span>
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                  isSelected ? 'bg-[#4B89FF] border-[#4B89FF] text-white' : 'border-neutral-700 bg-neutral-950'
                                }`}>
                                  {isSelected && <Check size={10} className="stroke-[3]" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                            영상 1개당 예상 러닝타임
                          </label>
                          <input
                            type="text"
                            value={avgRunningTime}
                            onChange={(e) => setAvgRunningTime(e.target.value)}
                            placeholder="예: 10분 내외, 1분 미만 쇼츠"
                            className="w-full bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 focus:border-[#4B89FF] focus:ring-1 focus:ring-[#4B89FF]/18 rounded-xl px-4 py-3 text-neutral-200 placeholder-neutral-500 focus:outline-hidden transition-all text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                            주당 예상 업로드 횟수
                          </label>
                          <select
                            value={weeklyUploads}
                            onChange={(e) => setWeeklyUploads(e.target.value)}
                            className="w-full bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 rounded-xl px-4 py-3 text-neutral-200 focus:outline-hidden focus:border-[#4B89FF] focus:ring-1 focus:ring-[#4B89FF]/18 transition-all cursor-pointer text-xs"
                          >
                            <option value="">선택해 주세요</option>
                            {uploadOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: 예산 및 시작 예정일 */}
                {currentStep === 5 && (
                  <div className="space-y-5">
                    <div className="border-l-2 border-[#4B89FF] pl-3">
                      <h3 className="text-xl font-bold text-white tracking-normal font-display">예상하시는 월 예산 범위와 시작일을 선택해 주세요.</h3>
                      <p className="text-sm text-neutral-400 mt-1">
                        예산 구조에 귀속된 최고의 고성능 프리미엄 전담 편집 리소스를 매칭해 드립니다.
                      </p>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div>
                        <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                          프로젝트 월 예상 예산 범위 <span className="text-[#4B89FF]">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {budgetOptions.map((range) => {
                            const isSel = budgetRange === range;
                            return (
                              <button
                                key={range}
                                type="button"
                                onClick={() => setBudgetRange(range)}
                                className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                                  isSel
                                    ? 'border-[#4B89FF] bg-[#4B89FF]/10 text-[#4B89FF] font-semibold'
                                    : 'border-neutral-800 bg-neutral-900/40 text-neutral-300 hover:border-[#4B89FF]/45'
                                }`}
                              >
                                {range}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                            희망하는 프로젝트 시작일
                          </label>
                          <input
                            type="text"
                            placeholder="예시) 2026-06-14"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 focus:border-[#4B89FF] focus:ring-1 focus:ring-[#4B89FF]/18 rounded-xl px-4 py-3 text-neutral-200 placeholder-neutral-500 focus:outline-hidden transition-all text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                          기타 요청 사항이나 구체적으로 전달하고 싶은 내용
                        </label>
                        <textarea
                          rows={3}
                          value={memo}
                          onChange={(e) => setMemo(e.target.value)}
                          placeholder="원하는 영상의 톤앤매너, 특정 편집자 매칭 등 구체적인 바를 자유롭게 기술해 주세요."
                          className="w-full bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 focus:border-[#4B89FF] focus:ring-1 focus:ring-[#4B89FF]/18 rounded-xl px-4 py-3 text-neutral-200 placeholder-neutral-500 focus:outline-hidden resize-none transition-all text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Error messages */}
              {formError && (
                <div className="mt-4 flex items-center space-x-2 text-rose-450 text-xs bg-rose-500/5 border border-rose-520/20 p-2.5 rounded-xl">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Controls bar */}
              <div className="flex justify-between items-center mt-8 pt-4 border-t border-neutral-900">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex items-center space-x-1 px-4 py-2 text-neutral-400 hover:text-white transition-colors text-sm font-medium cursor-pointer"
                  >
                    <ArrowLeft size={16} />
                    <span>이전 단계</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center space-x-1.5 bg-[#4B89FF] hover:bg-[#3b75e0] text-black hover:text-white rounded-xl px-5 py-2.5 text-sm font-bold transition-all border border-[#4B89FF]/40 cursor-pointer"
                  >
                    <span>다음 단계</span>
                    <ArrowRight size={15} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="inline-flex items-center space-x-1.5 bg-[#4B89FF] hover:bg-[#3b75e0] text-white rounded-xl px-6 py-2.5 text-sm font-bold transition-all shadow-[0_0_15px_rgba(75,137,255,0.3)] disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                        <span>전송 처리 중...</span>
                      </>
                    ) : (
                      <>
                        <span>프리미엄 상담 접수하기</span>
                        <Send size={15} className="fill-white stroke-2" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 flex flex-col items-center justify-center space-y-5"
            >
              <div className="w-16 h-16 rounded-full bg-[#4B89FF]/10 border border-[#4B89FF]/30 flex items-center justify-center text-[#4B89FF] shadow-[0_0_20px_rgba(75,137,255,0.25)]">
                <Sparkles size={28} className="animate-pulse" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white tracking-normal font-display">의뢰서 성공적 접수 완료!</h3>
                <p className="text-sm text-[#4B89FF] font-semibold mt-1">24시간 내 채널 진단 리포트 가이드라인을 발송해 드립니다.</p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl max-w-md text-left shadow-xs">
                <p className="text-xs text-neutral-400 leading-relaxed text-center">
                  등록해주신 이메일/SNS DM을 통해 총괄 크레이티브 디렉터 정민성이 24시간 이내에 직접 맞춤형 서비스 예산과 채널 진단 가이드를 전달할 수 있도록 소통을 전개하겠습니다.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(1);
                    setClientName('');
                    setContact('');
                    setPhoneNumber('');
                    setChannelInfo('');
                    setSubscriberCount('');
                    setSelectedServices([]);
                    setSubtitleStyle('');
                    setAudioStyle('');
                    setTransitionStyle('');
                    setPainPoint('');
                    setAvgRunningTime('');
                    setWeeklyUploads('');
                    setBudgetRange('');
                    setStartDate('');
                    setMemo('');
                    setIsFinished(false);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-800 transition cursor-pointer shadow-xs"
                >
                  새로운 상담 폼 작성하기
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
