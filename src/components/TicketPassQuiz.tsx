import React, { useState } from 'react';
import { Ticket, Award, CheckCircle2, XCircle, RotateCcw, Printer, Share2, Sparkles, Check, ChevronRight } from 'lucide-react';
import { TICKET_QUIZ_QUESTIONS, QuizQuestionTicket } from '../data/cinemaContent';
import { cineAudio } from '../utils/audioSystem';

export const TicketPassQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<'ก' | 'ข' | 'ค' | 'ง' | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [punchedSeats, setPunchedSeats] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [recipientName, setRecipientName] = useState<string>('ผู้ผ่านการทดสอบตั๋วภาพยนตร์ดิจิทัล');
  const [copied, setCopied] = useState<boolean>(false);

  const currentQ = TICKET_QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (optionId: 'ก' | 'ข' | 'ค' | 'ง') => {
    if (isAnswered) return;

    setSelectedOption(optionId);
    setIsAnswered(true);

    // Punch sound
    cineAudio.playTicketPunch();

    const selected = currentQ.options.find(o => o.id === optionId);
    const isCorrect = !!selected?.isCorrect;

    if (isCorrect) {
      setScore(prev => prev + 1);
      setTimeout(() => cineAudio.playCorrectChime(), 150);
    } else {
      setTimeout(() => cineAudio.playWrongBuzz(), 150);
    }

    setPunchedSeats(prev => [...prev, currentQ.id]);
  };

  const handleNextQuestion = () => {
    if (currentIdx < TICKET_QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      cineAudio.playSlateClap();
    } else {
      setIsFinished(true);
      cineAudio.playCorrectChime();
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setPunchedSeats([]);
    setIsFinished(false);
    cineAudio.playProjectorWhirr();
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const handleCopyResult = () => {
    const text = `🎟️ ฉันได้คะแนน ${score}/5 ใน "Ticket Pass Quiz" แอปพลิเคชัน CineLiteracy: รู้เท่าทันสื่อภาพยนตร์ในยุคดิจิทัล (โดย nunektd - ม.ศิลปากร) ✨🎬`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getRankBadge = (finalScore: number) => {
    if (finalScore === 5) {
      return {
        title: 'Grand Cinephile Master & Senior Critic',
        thaiTitle: 'นักวิจารณ์ภาพยนตร์ดิจิทัลระดับเกียรตินิยมยอดเยี่ยม',
        color: '#FFD700',
        note: 'เข้าใจหลักการภาพยนตร์ ลิขสิทธิ์ และ AI อย่างไร้ที่ติ!',
      };
    }
    if (finalScore >= 4) {
      return {
        title: 'Certified Digital Film Critic',
        thaiTitle: 'นักวิจารณ์ภาพยนตร์ดิจิทัลระดับชำนาญการ',
        color: '#05D9E8',
        note: 'มีวิจารณญาณที่เฉียบคม สามารถแยกแยะอคติและข้อความแฝงได้ดีเยี่ยม',
      };
    }
    if (finalScore >= 3) {
      return {
        title: 'Film Literacy Explorer',
        thaiTitle: 'ผู้รู้เท่าทันสื่อภาพยนตร์ระดับมาตรฐาน',
        color: '#FF2A6D',
        note: 'ผ่านเกณฑ์มาตรฐาน สามารถต่อยอดสู่ระดับมืออาชีพได้',
      };
    }
    return {
      title: 'Cinema Digital Apprentice',
      thaiTitle: 'ผู้เริ่มต้นเรียนรู้สื่อภาพยนตร์ดิจิทัล',
      color: '#9d4edd',
      note: 'สามารถทบทวนบทเรียนใน 4 โมดูลเพื่อเพิ่มพูนความรู้',
    };
  };

  const rank = getRankBadge(score);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FFD700] mb-1">
            <Ticket className="h-4 w-4" />
            <span>Ticket Pass Interactive Quiz</span>
            <span className="text-slate-600">·</span>
            <span>แบบทดสอบตั๋วภาพยนตร์ 5 ข้อ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-['Cinzel',serif]">
            แบบทดสอบจำลองสถานการณ์ตั๋วชมภาพยนตร์
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            เลือกคำตอบที่ถูกต้องเพื่อเจาะรูตั๋วหนัง (Punch Animation) พร้อมเสียงเอฟเฟกต์สมจริง 
            เมื่อทำครบ 5 ข้อจะได้รับใบประกาศเกียรติคุณประจำตัว
          </p>
        </div>

        {!isFinished && (
          <div className="text-xs font-mono text-slate-400 bg-black/60 px-3 py-1.5 rounded-lg border border-slate-800">
            คำถามข้อที่: <span className="text-[#FFD700] font-bold">{currentIdx + 1}</span> / 5
          </div>
        )}
      </div>

      {!isFinished ? (
        /* VINTAGE ADMISSION TICKET CONTAINER */
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border-2 border-[#FFD700] bg-gradient-to-r from-[#181818] via-[#121212] to-[#181818] shadow-[0_0_35px_rgba(255,215,0,0.25)]">
          
          {/* Perforated edge circles */}
          <div className="absolute -top-3 left-1/4 h-6 w-6 rounded-full bg-[#0d0d0d] border border-[#FFD700]/60 z-20" />
          <div className="absolute -bottom-3 left-1/4 h-6 w-6 rounded-full bg-[#0d0d0d] border border-[#FFD700]/60 z-20" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            
            {/* TICKET STUB (Left Col) */}
            <div className="md:col-span-3 border-b md:border-b-0 md:border-r-2 border-dashed border-[#FFD700]/60 p-5 flex flex-col justify-between bg-black/40">
              <div className="space-y-1">
                <div className="text-[10px] font-mono tracking-widest text-[#FFD700] uppercase font-bold">
                  ★ ADMIT ONE ★
                </div>
                <div className="text-lg font-black text-white font-['Cinzel',serif]">
                  CINELITERACY
                </div>
                <div className="text-[11px] font-mono text-[#05D9E8]">
                  {currentQ.theater}
                </div>
              </div>

              {/* Punch Hole Graphic */}
              <div className="my-4 flex flex-col items-center justify-center p-3 rounded-2xl bg-black/70 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block mb-1">PUNCH STATUS</span>
                <div className={`h-10 w-10 rounded-full border-2 border-dashed flex items-center justify-center transition-all ${
                  isAnswered
                    ? 'border-[#FF2A6D] bg-[#FF2A6D]/20 shadow-[0_0_12px_#FF2A6D]'
                    : 'border-slate-700 bg-slate-900'
                }`}>
                  {isAnswered ? (
                    <div className="h-6 w-6 rounded-full bg-black shadow-inner" />
                  ) : (
                    <span className="text-[9px] font-mono text-slate-500">READY</span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-[#FFD700] mt-1 font-bold">SEAT: {currentQ.seat}</span>
              </div>

              <div className="text-[9px] font-mono text-slate-500 text-center tracking-tighter">
                SERIES: 2026-NUNEKTD-SU
              </div>
            </div>

            {/* MAIN TICKET BODY (Right Col) */}
            <div className="md:col-span-9 p-6 sm:p-7 space-y-5">
              
              {/* Situation Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#05D9E8]/10 text-[#05D9E8] border border-[#05D9E8]/30 font-bold">
                    หมวด: {currentQ.category}
                  </span>
                  <span className="text-slate-400">
                    ความคืบหน้า: {punchedSeats.length} / 5
                  </span>
                </div>

                {/* Situation Box */}
                <div className="rounded-xl bg-black/60 p-3.5 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <strong className="text-[#FFD700] block mb-1">🎬 สถานการณ์จำลอง:</strong>
                  {currentQ.situation}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white pt-1">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options List */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  let btnStyle = 'border-slate-800 bg-black/50 text-slate-200 hover:border-slate-600 hover:bg-slate-900';

                  if (isAnswered) {
                    if (opt.isCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-500';
                    } else if (isSelected && !opt.isCorrect) {
                      btnStyle = 'border-[#FF2A6D] bg-rose-950/40 text-rose-200 ring-1 ring-[#FF2A6D]';
                    } else {
                      btnStyle = 'border-slate-900 bg-black/20 text-slate-600 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${btnStyle} ${
                        !isAnswered ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'
                      }`}
                    >
                      <span className={`h-6 w-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        isAnswered && opt.isCorrect
                          ? 'bg-emerald-500 text-black'
                          : isSelected && !opt.isCorrect
                          ? 'bg-[#FF2A6D] text-white'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {opt.id}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Instant Feedback & Explanation */}
              {isAnswered && (
                <div className="p-4 rounded-xl bg-black/80 border border-slate-700 text-xs space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className={`font-bold flex items-center gap-1.5 ${
                      selectedOption && currentQ.options.find(o => o.id === selectedOption)?.isCorrect
                        ? 'text-emerald-400'
                        : 'text-[#FF2A6D]'
                    }`}>
                      {selectedOption && currentQ.options.find(o => o.id === selectedOption)?.isCorrect ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          <span>เจาะตั๋วถูกต้อง! (Correct Punch)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4" />
                          <span>ยังไม่ถูกต้อง (เจาะตั๋วผิดช่อง)</span>
                        </>
                      )}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">PUNCH VERIFIED</span>
                  </div>

                  <p className="text-slate-300 leading-relaxed">
                    {currentQ.explanation}
                  </p>

                  <div className="text-[11px] text-[#05D9E8] font-mono pt-1">
                    แหล่งอ้างอิง: {currentQ.authorityNote}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleNextQuestion}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#FFD700] text-black hover:bg-[#ffc400] transition-colors shadow-md"
                    >
                      <span>{currentIdx < TICKET_QUIZ_QUESTIONS.length - 1 ? 'ข้อถัดไป (Next Seat)' : 'ดูผลคะแนน & รับใบประกาศ'}</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      ) : (
        /* QUIZ COMPLETION CERTIFICATE DASHBOARD */
        <div className="space-y-6 animate-fadeIn">
          
          {/* Certificate Print Wrapper */}
          <div id="digital-certificate-print" className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border-4 border-[#FFD700] bg-gradient-to-b from-[#161616] via-[#0f0f0f] to-[#0a0a0a] p-8 sm:p-12 text-center shadow-[0_0_50px_rgba(255,215,0,0.3)]">
            
            {/* Corner Decorative Cinema Badges */}
            <div className="absolute top-3 left-4 text-[10px] font-mono text-[#FFD700]/60">✦ CINELITERACY 2026 ✦</div>
            <div className="absolute top-3 right-4 text-[10px] font-mono text-[#FFD700]/60">✦ SILPAKORN UNIV ✦</div>
            <div className="absolute bottom-3 left-4 text-[10px] font-mono text-[#05D9E8]/60">✦ OCSC STANDARDS ✦</div>
            <div className="absolute bottom-3 right-4 text-[10px] font-mono text-[#FF2A6D]/60">✦ VERIFIED ✦</div>

            {/* Certificate Header */}
            <div className="space-y-1 mb-6">
              <div className="text-xs uppercase tracking-widest text-[#FFD700] font-mono font-bold">
                CERTIFICATE OF DIGITAL MOVIE LITERACY
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-['Cinzel',serif]">
                ใบประกาศเกียรติคุณการรู้เท่าทันสื่อภาพยนตร์
              </h3>
              <p className="text-xs text-slate-400">
                หลักสูตร CineLiteracy · พัฒนาโดย nunektd (ภาควิชาเทคโนโลยีการศึกษา คณะศึกษาศาสตร์ มหาวิทยาลัยศิลปากร)
              </p>
            </div>

            {/* Recipient Input (Editable before printing) */}
            <div className="my-5 py-3 border-y border-[#FFD700]/30 max-w-lg mx-auto">
              <span className="text-xs text-slate-400 block mb-1">ขอมอบประกาศนียบัตรฉบับนี้ให้แก่:</span>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="กรอกชื่อ-นามสกุลของคุณ"
                className="w-full text-center text-xl sm:text-2xl font-bold text-white bg-transparent border-b border-dashed border-[#FFD700]/50 focus:outline-none focus:border-[#FFD700] py-1"
              />
            </div>

            {/* Score & Rank */}
            <div className="space-y-3 max-w-md mx-auto my-6">
              <div className="flex items-center justify-center gap-2">
                <span className="text-5xl font-black text-white font-mono">{score}</span>
                <span className="text-2xl font-bold text-slate-500 font-mono">/ 5</span>
              </div>

              <div 
                className="px-4 py-2 rounded-xl border text-sm font-bold uppercase tracking-wider inline-block"
                style={{
                  backgroundColor: `${rank.color}15`,
                  borderColor: rank.color,
                  color: rank.color,
                }}
              >
                ★ {rank.title} ★
              </div>

              <p className="text-xs sm:text-sm text-slate-300">
                {rank.thaiTitle}
              </p>
              <p className="text-xs text-slate-400">
                {rank.note}
              </p>
            </div>

            {/* Verification Signatures */}
            <div className="pt-6 border-t border-slate-800 grid grid-cols-2 gap-4 text-xs font-mono text-slate-400">
              <div>
                <span className="block text-slate-200 font-bold">nunektd</span>
                <span className="text-[10px]">Instructional Designer & Developer</span>
                <span className="text-[9px] block text-slate-500">Silpakorn University</span>
              </div>
              <div>
                <span className="block text-slate-200 font-bold">{new Date().toLocaleDateString('th-TH')}</span>
                <span className="text-[10px]">Date of Certification</span>
                <span className="text-[9px] block text-slate-500">Digital Authenticated</span>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handlePrintCertificate}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#FFD700] text-black hover:bg-[#ffc400] transition-colors shadow-md"
            >
              <Printer className="h-4 w-4" />
              <span>พิมพ์ใบประกาศ (Print Certificate)</span>
            </button>

            <button
              onClick={handleCopyResult}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#1e1e1e] border border-slate-700 text-white hover:bg-slate-800 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400">คัดลอกผลลัพธ์แล้ว!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4 text-[#05D9E8]" />
                  <span>คัดลอกผลลัพธ์เพื่อแชร์</span>
                </>
              )}
            </button>

            <button
              onClick={handleRestartQuiz}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#260e16] border border-[#FF2A6D]/60 text-[#FF2A6D] hover:bg-[#FF2A6D] hover:text-black transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>ทำแบบทดสอบตั๋วใบใหม่</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
