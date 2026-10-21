import React, { useState } from 'react';
import { Film, Clapperboard, Sparkles, Volume2, VolumeX, Download } from 'lucide-react';
import { cineAudio } from '../utils/audioSystem';

interface MarqueeBannerProps {
  onDownloadSingleFile: () => void;
  onOpenCredits: () => void;
}

export const MarqueeBanner: React.FC<MarqueeBannerProps> = ({
  onDownloadSingleFile,
  onOpenCredits,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const toggleSound = () => {
    cineAudio.isMuted = !isMuted;
    setIsMuted(!isMuted);
    if (isMuted) {
      cineAudio.playSlateClap();
    }
  };

  return (
    <div className="relative w-full border-b-4 border-[#FFD700]/60 bg-gradient-to-b from-[#181818] via-[#0d0d0d] to-[#0a0a0a] shadow-2xl overflow-hidden">
      
      {/* Top Animated Marquee Chaser Bulbs */}
      <div className="flex justify-between items-center py-1.5 px-2 bg-[#050505] border-b border-[#FFD700]/30 select-none overflow-hidden">
        <div className="flex items-center gap-3 animate-pulse">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                i % 3 === 0
                  ? 'bg-[#FFD700] shadow-[0_0_8px_#FFD700]'
                  : i % 3 === 1
                  ? 'bg-[#FF2A6D] shadow-[0_0_8px_#FF2A6D]'
                  : 'bg-[#05D9E8] shadow-[0_0_8px_#05D9E8]'
              }`}
            />
          ))}
        </div>
        <div className="text-[10px] tracking-widest text-[#FFD700] uppercase font-mono hidden md:block">
          ★ PREMIERE SCREENING · DIGITAL MOVIE LITERACY · SILPAKORN UNIVERSITY ★
        </div>
        <div className="flex items-center gap-3 animate-pulse">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${
                i % 2 === 0
                  ? 'bg-[#05D9E8] shadow-[0_0_8px_#05D9E8]'
                  : 'bg-[#FFD700] shadow-[0_0_8px_#FFD700]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Cinema Marquee Signboard */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Crest & Typography */}
        <div className="flex items-center gap-4 text-center md:text-left">
          {/* Animated Film Reel Graphic */}
          <div className="relative group shrink-0 hidden sm:flex items-center justify-center">
            <div className="h-16 w-16 rounded-full border-4 border-[#FFD700] bg-[#141414] shadow-[0_0_20px_rgba(255,215,0,0.3)] flex items-center justify-center animate-[spin_18s_linear_infinite]">
              <div className="h-8 w-8 rounded-full border-2 border-[#05D9E8] flex items-center justify-center">
                <div className="h-2.5 w-2.5 rounded-full bg-[#FF2A6D]" />
              </div>
              <div className="absolute top-1.5 h-2 w-2 rounded-full bg-[#FFD700]" />
              <div className="absolute bottom-1.5 h-2 w-2 rounded-full bg-[#FFD700]" />
              <div className="absolute left-1.5 h-2 w-2 rounded-full bg-[#FFD700]" />
              <div className="absolute right-1.5 h-2 w-2 rounded-full bg-[#FFD700]" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[11px] font-mono tracking-widest uppercase">
              <span className="text-[#05D9E8] font-bold">CINEMA DARK MODE</span>
              <span className="text-slate-600">·</span>
              <span className="text-[#FFD700]">INTERACTIVE MULTIMEDIA APP</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-['Cinzel',serif] uppercase drop-shadow-[0_2px_15px_rgba(255,42,109,0.35)]">
              Cine<span className="text-[#FF2A6D]">Literacy</span>
            </h1>

            <p className="text-sm sm:text-base font-medium text-slate-300">
              รู้เท่าทันสื่อภาพยนตร์ในยุคดิจิทัล · <span className="text-[#FFD700]">โดย nunektd</span>
            </p>
          </div>
        </div>

        {/* Quick Cinema Controls Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
              !isMuted
                ? 'bg-[#151515] border-[#05D9E8] text-[#05D9E8] shadow-[0_0_12px_rgba(5,217,232,0.3)]'
                : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}
            title="เปิด/ปิดระบบเสียงสังเคราะห์ Web Audio API"
          >
            {!isMuted ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            <span>{!isMuted ? 'SOUND: ON (Web Audio)' : 'SOUND: MUTED'}</span>
          </button>

          {/* End Credits Button */}
          <button
            onClick={onOpenCredits}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#1f1624] border border-[#FF2A6D]/60 text-[#FF2A6D] hover:bg-[#FF2A6D] hover:text-black transition-all shadow-[0_0_12px_rgba(255,42,109,0.25)]"
          >
            <Clapperboard className="h-4 w-4" />
            <span>HOLLYWOOD CREDITS</span>
          </button>

          {/* Single-File HTML Download Button */}
          <button
            onClick={onDownloadSingleFile}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#FFD700] to-[#ffa500] text-black hover:brightness-110 transition-all shadow-[0_0_15px_rgba(255,215,0,0.4)]"
            title="ดาวน์โหลดเวอร์ชันไฟล์เดียวจบ (Single-File HTML/CSS/JS)"
          >
            <Download className="h-4 w-4 stroke-[2.5]" />
            <span>ดาวน์โหลด Single-File HTML</span>
          </button>
        </div>

      </div>

      {/* Bottom Film Strip Sprockets Graphic */}
      <div className="h-3 w-full bg-[#111] border-t border-[#FFD700]/20 flex items-center justify-between px-2 overflow-hidden select-none">
        <div className="flex gap-4">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="h-1.5 w-2 rounded-xs bg-[#222] border border-black" />
          ))}
        </div>
      </div>

    </div>
  );
};
