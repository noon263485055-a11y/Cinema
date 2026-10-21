import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, RotateCcw, Clapperboard, Award, Sparkles, FastForward } from 'lucide-react';
import { cineAudio } from '../utils/audioSystem';

interface EndCreditsRollProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EndCreditsRoll: React.FC<EndCreditsRollProps> = ({
  isOpen,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    cineAudio.playSlateClap();

    let animId: number;
    let lastTime = performance.now();

    const scrollLoop = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (isPlaying && scrollRef.current) {
        scrollRef.current.scrollTop += delta * 45 * speed;
        if (
          scrollRef.current.scrollTop >=
          scrollRef.current.scrollHeight - scrollRef.current.clientHeight
        ) {
          // Loop or reach end
        }
      }
      animId = requestAnimationFrame(scrollLoop);
    };

    animId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animId);
  }, [isOpen, isPlaying, speed]);

  if (!isOpen) return null;

  const handleReset = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    setIsPlaying(true);
    cineAudio.playProjectorWhirr();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fadeIn">
      <div className="relative w-full max-w-2xl h-[85vh] rounded-3xl border-2 border-[#FFD700] bg-black shadow-[0_0_50px_rgba(255,215,0,0.4)] flex flex-col overflow-hidden">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0c0c0c] z-20">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FFD700]">
            <Clapperboard className="h-4 w-4" />
            <span>HOLLYWOOD END CREDITS ROLL</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
              title={isPlaying ? 'หยุดชั่วคราว' : 'เล่นต่อ'}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setSpeed(speed === 1 ? 2 : 1)}
              className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-[11px] font-mono font-bold text-[#05D9E8]"
              title="สลับความเร็ว"
            >
              {speed}X
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
              title="เริ่มใหม่"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white ml-2"
              title="ปิด"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Rolling Text Viewport */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-6 py-16 text-center select-none no-scrollbar space-y-14 font-sans"
          style={{ scrollBehavior: 'auto' }}
        >
          {/* Film Production Title */}
          <div className="space-y-3 pt-24">
            <div className="text-xs font-mono tracking-widest text-[#FFD700] uppercase">
              A CINELITERACY ORIGINAL PRODUCTION
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-['Cinzel',serif] tracking-wider uppercase">
              CineLiteracy
            </h2>
            <p className="text-sm font-medium text-[#05D9E8]">
              รู้เท่าทันสื่อภาพยนตร์ในยุคดิจิทัล
            </p>
          </div>

          {/* Lead Creator & Instructional Designer */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">
              LEAD DEVELOPER & INSTRUCTIONAL DESIGNER
            </span>
            <span className="text-2xl font-black text-[#FF2A6D] font-mono tracking-wide block">
              nunektd
            </span>
          </div>

          {/* Academic Affiliation */}
          <div className="space-y-2 max-w-md mx-auto">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">
              DEPARTMENT & FACULTY AFFILIATION
            </span>
            <span className="text-base font-bold text-white block">
              ภาควิชาเทคโนโลยีการศึกษา
            </span>
            <span className="text-sm text-slate-300 block">
              คณะศึกษาศาสตร์ มหาวิทยาลัยศิลปากร
            </span>
            <span className="text-xs font-mono text-[#FFD700] block mt-1">
              Department of Educational Technology, Faculty of Education, Silpakorn University
            </span>
          </div>

          {/* Methodology */}
          <div className="space-y-3 max-w-md mx-auto pt-4">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">
              INSTRUCTIONAL DESIGN FRAMEWORK
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              พัฒนาบนพื้นฐานกระบวนการคิดสร้างสรรค์เพื่อแก้ปัญหา (Creative Problem Solving - CPS 5 ขั้นตอน)
              ผสานเทคโนโลยี AI Vibe Coding เพื่อสร้างสรรค์สื่อดิจิทัลเชิงโต้ตอบที่มีชีวิต
            </p>
          </div>

          {/* Sound & Audio Engineering */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">
              AUDIO SYSTEM & SYNTHESIZER
            </span>
            <span className="text-sm font-bold text-white block font-mono">
              Web Audio API In-Browser Acoustic Engine
            </span>
            <span className="text-xs text-slate-400 block">
              เสียงสเลทสับ · เสียงเครื่องฉายหมุน · เสียงเจาะตั๋ว · เสียงชามระฆังทอง
            </span>
          </div>

          {/* Official Reference Canisters */}
          <div className="space-y-4 max-w-md mx-auto">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">
              CURRICULUM & STANDARDS REFERENCES
            </span>
            <div className="text-xs text-slate-300 space-y-1.5 font-mono">
              <p>• สำนักงาน ก.พ. (OCSC Digital Literacy Framework)</p>
              <p>• คลังความรู้ SciMath (สสวท. / กระทรวงศึกษาธิการ)</p>
              <p>• หอภาพยนตร์ (องค์การมหาชน) - Thai Film Archive</p>
              <p>• UNESCO Media and Information Literacy (MIL)</p>
              <p>• กรมทรัพย์สินทางปัญญา (พ.ร.บ. ลิขสิทธิ์ & Fair Use)</p>
            </div>
          </div>

          {/* Final Studio Logo Signoff */}
          <div className="space-y-3 pb-32 pt-8">
            <div className="mx-auto h-16 w-16 rounded-full border-2 border-[#FFD700] flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-[#FFD700]" />
            </div>
            <div className="text-sm font-black text-white font-['Cinzel',serif]">
              SILPAKORN UNIVERSITY · 2026
            </div>
            <div className="text-[10px] font-mono text-slate-500">
              © 2026 CineLiteracy Hub. All Rights Reserved.
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="p-3 bg-[#0c0c0c] border-t border-slate-800 text-center text-xs text-slate-400 z-20">
          <button
            onClick={onClose}
            className="px-6 py-1.5 rounded-xl text-xs font-bold bg-[#FFD700] text-black hover:bg-[#ffc400] transition-colors"
          >
            ปิดม่านการแสดง (Close Credits)
          </button>
        </div>

      </div>
    </div>
  );
};
