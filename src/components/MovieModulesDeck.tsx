import React, { useState } from 'react';
import { Film, Cpu, Eye, Shield, MessageSquare, ArrowRight, X, Sparkles, CheckCircle2, Clapperboard, Lightbulb } from 'lucide-react';
import { CINEMA_MODULES, CinemaModule } from '../data/cinemaContent';
import { cineAudio } from '../utils/audioSystem';

export const MovieModulesDeck: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<CinemaModule | null>(null);

  const handleOpenModule = (mod: CinemaModule) => {
    setSelectedModule(mod);
    cineAudio.playProjectorWhirr();
  };

  const handleCloseModule = () => {
    setSelectedModule(null);
    cineAudio.playSlateClap();
  };

  const getModuleIcon = (iconName: string, color: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="h-6 w-6" style={{ color }} />;
      case 'Eye':
        return <Eye className="h-6 w-6" style={{ color }} />;
      case 'Shield':
        return <Shield className="h-6 w-6" style={{ color }} />;
      default:
        return <MessageSquare className="h-6 w-6" style={{ color }} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#05D9E8] mb-1">
            <Film className="h-4 w-4" />
            <span>Interactive Movie Modules (4 หมวดการเรียนรู้)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-['Cinzel',serif]">
            หลักสูตรการรู้เท่าทันสื่อภาพยนตร์ดิจิทัล
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            คลิกเลือกการ์ดม้วนฟิล์มเพื่อเปิดโรงภาพยนตร์ศึกษาบทเรียนวิเคราะห์เชิงลึก ข้อคิดผู้กำกับ และเคสศึกษาจริง
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          หมวดวิชา 01 - 04 · ครอบคลุม AI, สุนทรียะ, ลิขสิทธิ์ และมารยาทดิจิทัล
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {CINEMA_MODULES.map((mod) => (
          <div
            key={mod.id}
            onClick={() => handleOpenModule(mod)}
            className="group cursor-pointer relative flex flex-col justify-between rounded-2xl border-2 border-slate-800 bg-[#141414] p-5 transition-all duration-300 hover:border-white/40 hover:-translate-y-1.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
            style={{
              boxShadow: `0 0 15px ${mod.accentColor}15`
            }}
          >
            {/* Top Reel Film Indicator */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-widest border"
                  style={{
                    backgroundColor: `${mod.accentColor}15`,
                    borderColor: `${mod.accentColor}50`,
                    color: mod.accentColor,
                  }}
                >
                  REEL #{mod.number}
                </span>

                <div 
                  className="h-9 w-9 rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${mod.accentColor}20` }}
                >
                  {getModuleIcon(mod.iconName, mod.accentColor)}
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-current transition-colors line-clamp-1" style={{ color: 'white' }}>
                  {mod.title}
                </h3>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                  {mod.englishTitle}
                </p>
              </div>

              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                {mod.synopsis}
              </p>
            </div>

            {/* Bottom Action */}
            <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-400 group-hover:text-white transition-colors">
                เปิดโรงเรียนภาพยนตร์
              </span>
              <div 
                className="flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                style={{ color: mod.accentColor }}
              >
                <span>ฉายบทเรียน</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Animated Glow Border on hover */}
            <div 
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity border-2"
              style={{ borderColor: mod.accentColor }}
            />
          </div>
        ))}
      </div>

      {/* Cinema Screening Modal */}
      {selectedModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div 
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border-2 bg-[#121212] shadow-2xl p-6 sm:p-8 space-y-6"
            style={{ borderColor: selectedModule.accentColor }}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModule}
              className="absolute top-5 right-5 h-9 w-9 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Title Header */}
            <div className="space-y-1.5 pr-8">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest" style={{ color: selectedModule.accentColor }}>
                <span>REEL {selectedModule.number} · SCREENING ROOM</span>
                <span>·</span>
                <span>DIGITAL MOVIE LITERACY</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-['Cinzel',serif]">
                {selectedModule.title}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {selectedModule.englishTitle}
              </p>
            </div>

            {/* Synopsis */}
            <div className="p-4 rounded-2xl bg-black/50 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedModule.synopsis}
            </div>

            {/* Key Checkpoints Checklist */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" style={{ color: selectedModule.accentColor }} />
                <span>ประเด็นสำคัญที่ผู้ชมดิจิทัลต้องรู้เท่าทัน (Key Checkpoints)</span>
              </h4>
              <div className="space-y-2">
                {selectedModule.keyCheckpoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 bg-[#181818] p-2.5 rounded-xl border border-slate-800">
                    <span className="font-mono font-bold text-slate-400 shrink-0">#{idx + 1}</span>
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Real Case Study Box */}
            <div className="rounded-2xl bg-gradient-to-r from-[#1c1822] to-[#141414] p-4 sm:p-5 border border-purple-500/30 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-[#FFD700]">
                <Clapperboard className="h-4 w-4" />
                <span>{selectedModule.caseStudy.title}</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {selectedModule.caseStudy.description}
              </p>
              <div className="pt-1 text-[#05D9E8] font-medium border-t border-slate-800/80">
                <strong>มุมมองผู้กำกับ (Director's Lesson): </strong>
                {selectedModule.caseStudy.directorLesson}
              </div>
            </div>

            {/* Action Advice Callout */}
            <div className="p-3.5 rounded-xl bg-[#1e293b]/40 border border-slate-700 flex items-start gap-2.5 text-xs text-slate-300">
              <Lightbulb className="h-4 w-4 text-[#FFD700] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">คำแนะนำเชิงปฏิบัติการ: </strong>
                <span>{selectedModule.actionAdvice}</span>
              </div>
            </div>

            {/* Modal Bottom Close Action */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleCloseModule}
                className="px-6 py-2 rounded-xl text-xs font-bold bg-[#FF2A6D] text-white hover:bg-[#e01d5d] transition-colors shadow-lg shadow-[#FF2A6D]/30"
              >
                เข้าใจแล้ว ปิดการฉาย
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
