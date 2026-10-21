import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Award, 
  ArrowRight, 
  Sparkles, 
  Share2, 
  BookOpen, 
  Check, 
  AlertTriangle,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import { QuizQuestion, OptionId, BadgeInfo } from '../types';
import { QUESTION_BANK, BADGE_TIERS } from '../data/quizQuestions';
import { useTheme } from '../context/ThemeContext';
import badgeMasteryImage from '../assets/images/badge_cinephile_mastery_1792596275414.jpg';
import { FALLBACK_BADGE_IMAGE, handleImageError } from '../utils/imageFallbacks';

interface QuizModuleProps {
  onOpenCertificate: (score: number, total: number, badge: BadgeInfo) => void;
  onExploreReferences: () => void;
}

export const QuizModule: React.FC<QuizModuleProps> = ({
  onOpenCertificate,
  onExploreReferences,
}) => {
  const { themeConfig } = useTheme();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<OptionId | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [history, setHistory] = useState<Array<{
    question: QuizQuestion;
    selected: OptionId;
    isCorrect: boolean;
  }>>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [endTime, setEndTime] = useState<number | null>(null);

  // Initialize and randomize 3 questions
  const initializeQuiz = () => {
    const shuffledBank = [...QUESTION_BANK].sort(() => 0.5 - Math.random());
    const selectedThree = shuffledBank.slice(0, 3).map((q) => {
      const originalOptions = [...q.options];
      const shuffledTexts = originalOptions.map(o => o.text).sort(() => 0.5 - Math.random());
      const correctOriginalText = originalOptions.find(o => o.id === q.correctOption)!.text;
      
      const ids: OptionId[] = ['ก', 'ข', 'ค', 'ง'];
      const newOptions = ids.map((id, idx) => ({
        id,
        text: shuffledTexts[idx],
      }));

      const newCorrectOption = newOptions.find(o => o.text === correctOriginalText)!.id;

      return {
        ...q,
        options: newOptions,
        correctOption: newCorrectOption,
      };
    });

    setQuestions(selectedThree);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setScore(0);
    setHistory([]);
    setIsCompleted(false);
    setStartTime(Date.now());
    setEndTime(null);
  };

  useEffect(() => {
    initializeQuiz();
  }, []);

  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (optionId: OptionId) => {
    if (isAnswerChecked) return;
    setSelectedOption(optionId);
    
    // Instant real-time answer validation
    const isCorrect = optionId === currentQuestion.correctOption;
    setIsAnswerChecked(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setHistory((prev) => [
      ...prev,
      {
        question: currentQuestion,
        selected: optionId,
        isCorrect,
      },
    ]);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setIsCompleted(true);
      setEndTime(Date.now());
    }
  };

  const getBadge = (finalScore: number): BadgeInfo => {
    if (finalScore === 3) return BADGE_TIERS[0];
    if (finalScore === 2) return BADGE_TIERS[1];
    return BADGE_TIERS[2];
  };

  const earnedBadge = getBadge(score);
  const completionSeconds = endTime ? Math.max(1, Math.round((endTime - startTime) / 1000)) : 0;

  if (questions.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-slate-400">กำลังสุ่มชุดแบบทดสอบ...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-3.5 py-6 sm:px-6 sm:py-10">
      {/* Module Title & Context with Dynamic Theme Color (No Yellow!) */}
      <div className="mb-6 sm:mb-8 text-left flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-slate-800 pb-5 sm:pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-semibold uppercase tracking-wider mb-1">
            <span className={themeConfig.primaryText}>โมดูลแบบทดสอบความรู้เชิงโต้ตอบ</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Interactive Knowledge Quiz</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            แบบทดสอบความรู้ดิจิทัลด้านภาพยนตร์ (3 ข้อ)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            ตรวจคำตอบเรียลไทม์ทันทีที่เลือก พร้อมเฉลยละเอียดและป้ายสัญลักษณ์เกียรติยศเมื่อจบแบบทดสอบ
          </p>
        </div>

        <button
          onClick={initializeQuiz}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors self-start sm:self-auto shrink-0"
          title="สุ่มชุดคำถาม 3 ข้อใหม่"
        >
          <RotateCcw className={`h-3.5 w-3.5 ${themeConfig.primaryText}`} />
          <span>สุ่มคำถามชุดใหม่</span>
        </button>
      </div>

      {!isCompleted ? (
        /* ACTIVE QUIZ CARD (Mobile layout overflow-free with Tailwind flex/grid) */
        <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-4 sm:p-7 md:p-8 shadow-xl">
          
          {/* Header Bar: Question Counter & Progress */}
          <div className="mb-5 sm:mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <span className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-xs sm:text-sm font-bold ${themeConfig.primaryText} border ${themeConfig.borderPrimary}`}>
                {currentIndex + 1}
              </span>
              <div className="min-w-0">
                <span className="text-[11px] sm:text-xs uppercase font-medium text-slate-400 block truncate">
                  คำถามข้อที่ {currentIndex + 1} จาก 3 ข้อ
                </span>
                <p className={`text-[11px] sm:text-xs ${themeConfig.primaryText} font-medium truncate`}>
                  หมวด: {currentQuestion.category}
                </p>
              </div>
            </div>

            {/* Visual Step Dots with Dynamic Theme */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {[0, 1, 2].map((idx) => {
                const isPast = idx < currentIndex;
                const isCurrent = idx === currentIndex;
                const pastAnswer = history[idx];
                return (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isCurrent
                        ? `w-6 sm:w-8 ${themeConfig.primaryBg}`
                        : isPast
                        ? pastAnswer?.isCorrect
                          ? 'w-3.5 sm:w-4 bg-emerald-500'
                          : 'w-3.5 sm:w-4 bg-rose-500'
                        : 'w-2 sm:w-2.5 bg-slate-800'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Scenario Context */}
          {currentQuestion.scenario && (
            <div className="mb-4 rounded-lg bg-slate-950/60 p-3 text-xs text-slate-400 border border-slate-800/60 flex items-start gap-2 break-words">
              <Lightbulb className={`h-4 w-4 ${themeConfig.primaryText} shrink-0 mt-0.5`} />
              <span className="min-w-0 flex-1">{currentQuestion.scenario}</span>
            </div>
          )}

          {/* Question Text */}
          <h3 className="mb-5 sm:mb-6 text-base sm:text-lg md:text-xl font-semibold leading-relaxed text-white break-words">
            {currentQuestion.question}
          </h3>

          {/* Multiple Choice Options (ก ข ค ง) with touch targets and overflow protection */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOption === option.id;
              const isCorrect = option.id === currentQuestion.correctOption;

              let containerStyle = 'border-slate-800 bg-slate-950/70 hover:border-slate-700 hover:bg-slate-800/50 text-slate-200';
              let badgeStyle = 'bg-slate-800 text-slate-300 border-slate-700';

              if (isAnswerChecked) {
                if (isCorrect) {
                  containerStyle = 'border-emerald-500/80 bg-emerald-950/30 text-emerald-100 ring-1 ring-emerald-500/50';
                  badgeStyle = 'bg-emerald-500 text-slate-950 font-bold border-emerald-400';
                } else if (isSelected && !isCorrect) {
                  containerStyle = 'border-rose-500/80 bg-rose-950/30 text-rose-100 ring-1 ring-rose-500/50';
                  badgeStyle = 'bg-rose-500 text-white font-bold border-rose-400';
                } else {
                  containerStyle = 'border-slate-850 bg-slate-950/40 text-slate-500 opacity-60';
                  badgeStyle = 'bg-slate-900 text-slate-600 border-slate-800';
                }
              }

              return (
                <button
                  key={option.id}
                  disabled={isAnswerChecked}
                  onClick={() => handleSelectOption(option.id)}
                  className={`w-full min-w-0 text-left rounded-xl border p-3.5 sm:p-4.5 transition-all flex items-start gap-3 sm:gap-3.5 min-h-[44px] break-words overflow-hidden ${containerStyle} ${
                    !isAnswerChecked ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg border text-xs font-semibold transition-colors mt-0.5 ${badgeStyle}`}
                  >
                    {option.id}
                  </span>

                  <div className="flex-1 min-w-0 text-xs sm:text-sm md:text-base leading-relaxed break-words">
                    {option.text}
                  </div>

                  {isAnswerChecked && isCorrect && (
                    <div className="flex items-center gap-1 text-emerald-400 shrink-0 mt-0.5">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                  )}
                  {isAnswerChecked && isSelected && !isCorrect && (
                    <div className="flex items-center gap-1 text-rose-400 shrink-0 mt-0.5">
                      <XCircle className="h-5 w-5" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant Real-Time Validation Feedback & Explanation Box */}
          {isAnswerChecked && (
            <div className="mt-5 sm:mt-6 animate-fadeIn rounded-xl border border-slate-800 bg-slate-950/90 p-4 sm:p-5">
              <div className="flex items-start gap-3 min-w-0">
                {selectedOption === currentQuestion.correctOption ? (
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mt-0.5">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                ) : (
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 mt-0.5">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                )}

                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h4 className={`text-xs sm:text-sm font-bold ${
                      selectedOption === currentQuestion.correctOption ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {selectedOption === currentQuestion.correctOption 
                        ? 'ถูกต้อง! คุณเข้าใจหลักการอย่างแม่นยำ' 
                        : `ยังไม่ถูกต้อง (คำตอบที่ถูกต้องคือ ข้อ ${currentQuestion.correctOption})`}
                    </h4>
                    <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono">
                      ระบบตรวจคำตอบทันที
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed break-words">
                    {currentQuestion.explanation}
                  </p>

                  <div className="pt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
                    <span className={`${themeConfig.primaryText} font-medium`}>แหล่งอ้างอิง:</span>
                    <span className="break-words">{currentQuestion.referenceAuthority}</span>
                  </div>
                </div>
              </div>

              {/* Action: Next button with dynamic theme */}
              <div className="mt-4 sm:mt-5 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg ${themeConfig.primaryBg} ${themeConfig.primaryHoverBg} px-4 py-2.5 sm:px-5 text-xs sm:text-sm font-bold text-slate-950 transition-colors shadow-md active:scale-95`}
                >
                  <span>
                    {currentIndex < questions.length - 1 ? 'ไปยังคำถามถัดไป' : 'ดูผลคะแนนรวม & ป้ายสัญลักษณ์'}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* SCORE SUMMARY DASHBOARD & BADGE */
        <div className="space-y-6 sm:space-y-8 animate-fadeIn w-full min-w-0">
          <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-5 sm:p-8 md:p-10 shadow-2xl">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              
              {/* Badge Visual Column */}
              <div className="md:col-span-5 flex flex-col items-center text-center">
                <div className="relative group">
                  <div className="absolute -inset-2 rounded-full bg-cyan-500/20 blur-xl group-hover:blur-2xl transition-all" />
                  <img
                    src={badgeMasteryImage}
                    alt={earnedBadge.title}
                    onError={(e) => handleImageError(e, FALLBACK_BADGE_IMAGE)}
                    className={`relative h-36 w-36 sm:h-48 sm:w-48 rounded-2xl object-cover border-2 ${themeConfig.borderPrimary} shadow-2xl`}
                  />
                  <div className={`absolute bottom-2 left-2 right-2 backdrop-blur-md bg-slate-950/85 py-1 px-2 rounded-lg border ${themeConfig.borderPrimary} text-[10px] sm:text-[11px] font-semibold ${themeConfig.primaryText} truncate`}>
                    {earnedBadge.badgeTag}
                  </div>
                </div>

                <h4 className="mt-3 sm:mt-4 text-sm sm:text-base font-bold text-white">
                  {earnedBadge.title}
                </h4>
                <p className={`text-[11px] sm:text-xs ${themeConfig.primaryText} font-medium`}>
                  {earnedBadge.englishTitle}
                </p>
              </div>

              {/* Score & Summary Metrics Column */}
              <div className="md:col-span-7 space-y-4 sm:space-y-5">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <Award className={`h-4 w-4 ${themeConfig.primaryText}`} />
                  <span className={themeConfig.primaryText}>ผลการประเมินความรู้ดิจิทัลด้านภาพยนตร์</span>
                </div>

                <div>
                  <div className="flex items-baseline gap-2 sm:gap-3">
                    <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight font-mono tabular-nums">
                      {score}
                    </span>
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-500">/ 3</span>
                    <span className="text-xs sm:text-sm font-medium text-emerald-400 ml-2">
                      ({Math.round((score / 3) * 100)}% ความถูกต้อง)
                    </span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {earnedBadge.description}
                  </p>
                </div>

                {/* Score Stats strip */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-1 sm:pt-2">
                  <div className="rounded-lg bg-slate-950/70 p-2.5 sm:p-3 border border-slate-800">
                    <span className="text-[10px] sm:text-[11px] text-slate-400 block">เวลาที่ใช้ตอบ</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-200 font-mono tabular-nums">
                      {completionSeconds} วินาที
                    </span>
                  </div>
                  <div className="rounded-lg bg-slate-950/70 p-2.5 sm:p-3 border border-slate-800">
                    <span className="text-[10px] sm:text-[11px] text-slate-400 block">ระดับเกียรติบัตร</span>
                    <span className={`text-xs sm:text-sm font-semibold ${themeConfig.primaryText}`}>
                      {earnedBadge.tier.toUpperCase()} Level
                    </span>
                  </div>
                </div>

                {/* Main Action CTAs */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
                  <button
                    onClick={() => onOpenCertificate(score, 3, earnedBadge)}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg ${themeConfig.primaryBg} ${themeConfig.primaryHoverBg} px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 transition-colors shadow-md active:scale-95 whitespace-nowrap`}
                  >
                    <Award className="h-4 w-4" />
                    <span>รับเกียรติบัตร & แชร์ผลงาน</span>
                  </button>

                  <button
                    onClick={initializeQuiz}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-200 hover:bg-slate-700 transition-colors active:scale-95 whitespace-nowrap"
                  >
                    <RotateCcw className={`h-4 w-4 ${themeConfig.primaryText}`} />
                    <span>ทำข้อสอบชุดใหม่</span>
                  </button>

                  <button
                    onClick={onExploreReferences}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
                  >
                    <BookOpen className="h-4 w-4 text-slate-400" />
                    <span>ศึกษาคลังอ้างอิง</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Detailed Question Review Breakdown */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 sm:pb-4">
              <h3 className="text-base sm:text-lg font-bold text-white">
                ทบทวนรายละเอียดคำตอบ 3 ข้อ
              </h3>
              <span className="text-xs text-slate-400">
                ข้อถูก: {score} · ข้อผิด: {3 - score}
              </span>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {history.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800/90 bg-slate-950/60 p-3.5 sm:p-5 space-y-2.5 sm:space-y-3 min-w-0"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-md bg-slate-800 text-[11px] sm:text-xs font-bold text-slate-300 shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-[11px] sm:text-xs text-slate-400 truncate">
                        หมวด: {item.question.category}
                      </span>
                    </div>

                    {item.isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 shrink-0">
                        <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> ถูกต้อง
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-semibold text-rose-400 shrink-0">
                        <XCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> ตอบผิด
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-slate-200 break-words">
                    {item.question.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2 sm:p-2.5 rounded bg-slate-900 border border-slate-800 break-words">
                      <span className="text-slate-400 block mb-1">คำตอบที่คุณเลือก:</span>
                      <span className={item.isCorrect ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                        ข้อ {item.selected}: {item.question.options.find(o => o.id === item.selected)?.text}
                      </span>
                    </div>

                    {!item.isCorrect && (
                      <div className="p-2 sm:p-2.5 rounded bg-emerald-950/30 border border-emerald-800/40 break-words">
                        <span className="text-emerald-400/90 block mb-1">คำตอบที่ถูกต้อง:</span>
                        <span className="text-emerald-200 font-semibold">
                          ข้อ {item.question.correctOption}: {item.question.options.find(o => o.id === item.question.correctOption)?.text}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 flex items-start gap-2 break-words">
                    <Lightbulb className={`h-4 w-4 ${themeConfig.primaryText} shrink-0 mt-0.5`} />
                    <div className="min-w-0">
                      <span className="font-medium text-slate-300">คำอธิบาย: </span>
                      {item.question.explanation}
                      <span className={`block mt-1 text-[11px] ${themeConfig.primaryText}`}>
                        อ้างอิง: {item.question.referenceAuthority}
                      </span>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
