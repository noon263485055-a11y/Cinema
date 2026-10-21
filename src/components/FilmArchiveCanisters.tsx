import React from 'react';
import { Film, ExternalLink, Archive, BookOpen, ShieldCheck } from 'lucide-react';
import { ARCHIVE_CANISTERS } from '../data/cinemaContent';
import { cineAudio } from '../utils/audioSystem';

export const FilmArchiveCanisters: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FFD700] mb-1">
            <Archive className="h-4 w-4" />
            <span>Film Archives & Digital Repositories</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-['Cinzel',serif]">
            ตลับฟิล์มคลังอ้างอิงและจดหมายเหตุดิจิทัล
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            เชื่อมโยงแหล่งข้อมูลวิชาการและกรอบมาตรฐานทักษะดิจิทัลจากหน่วยงานทางการ (สำนักงาน ก.พ. และ SciMath)
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          เปิดลิงก์ในแท็บใหม่อย่างปลอดภัย (target="_blank")
        </div>
      </div>

      {/* Vintage Film Canisters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {ARCHIVE_CANISTERS.map((canister) => (
          <div
            key={canister.id}
            className="group relative rounded-3xl border-2 border-[#FFD700]/40 bg-gradient-to-b from-[#1c1c1c] to-[#0e0e0e] p-6 flex flex-col justify-between transition-all hover:border-[#FFD700] hover:shadow-[0_0_20px_rgba(255,215,0,0.25)]"
          >
            {/* Vintage Tin Canister Rim & Emblem */}
            <div>
              <div className="flex items-center justify-between mb-4">
                {/* Circular Canister Reel Icon */}
                <div className="h-12 w-12 rounded-full border-2 border-[#FFD700] bg-[#121212] flex items-center justify-center shadow-inner group-hover:rotate-45 transition-transform duration-500">
                  <Film className="h-6 w-6 text-[#FFD700]" />
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30">
                  CANISTER #{canister.source}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-[#FFD700] transition-colors leading-snug">
                {canister.title}
              </h3>

              <div className="text-xs font-mono text-[#05D9E8] mb-3">
                {canister.authority}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {canister.description}
              </p>
            </div>

            {/* Bottom Link Action */}
            <div className="mt-5 pt-3 border-t border-slate-800">
              <a
                href={canister.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => cineAudio.playProjectorWhirr()}
                className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-[#141414] border border-slate-700 text-slate-200 hover:text-black hover:bg-[#FFD700] hover:border-[#FFD700] transition-all"
              >
                <span>เปิดคลังข้อมูลต้นฉบับ</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
