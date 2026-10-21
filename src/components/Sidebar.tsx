import React, { useState } from 'react';
import { 
  Film, 
  HelpCircle, 
  Bookmark, 
  Mail, 
  Video, 
  Camera, 
  Sliders, 
  Layers, 
  X, 
  Volume2, 
  VolumeX, 
  ChevronRight,
  Download,
  Sparkles
} from 'lucide-react';
import { cineAudio } from '../utils/audioSystem';
import { downloadCineLiteracySingleFile } from '../utils/exportStandaloneHtml';

export type NavPage = 'all' | 'home' | 'lessons' | 'angles' | 'equipment' | 'quiz' | 'references' | 'contact';

interface SidebarProps {
  currentPage: NavPage;
  onSelectPage: (page: NavPage) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onSelectPage,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const toggleSound = () => {
    cineAudio.isMuted = !isMuted;
    setIsMuted(!isMuted);
    if (!cineAudio.isMuted) {
      cineAudio.playSlateClap();
    }
  };

  const navItems: { id: NavPage; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'all', label: 'มุมมองทั้งหมด (แสดงเนื้อหาทั้งหมด)', icon: <Layers className="h-4 w-4" />, badge: 'Full' },
    { id: 'home', label: 'หน้าแรก & ห้องทดลองกำกับ', icon: <Film className="h-4 w-4" /> },
    { id: 'lessons', label: 'บทเรียนม้วนฟิล์ม Motion Graphics', icon: <Video className="h-4 w-4" />, badge: 'Motion' },
    { id: 'angles', label: 'มุมกล้อง & การจัดเฟรม (Framing)', icon: <Camera className="h-4 w-4" /> },
    { id: 'equipment', label: 'อุปกรณ์การผลิตภาพยนตร์', icon: <Sliders className="h-4 w-4" /> },
    { id: 'quiz', label: 'แบบทดสอบดิจิทัล (Quiz 3 ข้อ)', icon: <HelpCircle className="h-4 w-4" />, badge: '3 ข้อ' },
    { id: 'references', label: 'คลังอ้างอิงทางการ (OCSC & Law)', icon: <Bookmark className="h-4 w-4" /> },
    { id: 'contact', label: 'ติดต่อผู้พัฒนา (Contact)', icon: <Mail className="h-4 w-4" /> },
  ];

  const handleNavClick = (pageId: NavPage) => {
    cineAudio.playSlateClap();
    onSelectPage(pageId);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Backdrop for mobile drawer */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Main Left Sidebar Navigation Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#090b10] border-r border-slate-800/90 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Top Brand Header */}
        <div className="p-5 border-b border-slate-800/80 bg-[#0d0f15] shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left group"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)] group-hover:scale-105 transition-transform">
                <Film className="h-5 w-5" />
              </div>
              <div>
                <h1 className="font-extrabold text-base tracking-tight text-white font-['Cinzel',serif] group-hover:text-cyan-300 transition-colors">
                  CineLiteracy
                </h1>
                <span className="text-[10px] font-mono font-medium text-cyan-400 tracking-wider uppercase block -mt-0.5">
                  HUB · DIGITAL CINEMA
                </span>
              </div>
            </button>

            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="ปิดเมนู"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed font-light mt-2.5">
            แอปพลิเคชันมัลติมีเดียเพื่อการเรียนรู้ทักษะดิจิทัลด้านภาพยนตร์
          </p>
        </div>

        {/* Navigation Items List - Scrollable with all 8 items fully visible */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1.5 divide-y divide-transparent">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-400 px-2.5 mb-2 font-bold">
            <span>สารบัญเมนูทั้งหมด ({navItems.length} หัวข้อ)</span>
            <span className="text-cyan-400">SELECT</span>
          </div>

          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-200 font-bold border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/90 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`shrink-0 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-1.5">
                  {item.badge && (
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold ${
                      isActive
                        ? 'bg-cyan-400 text-slate-950 font-extrabold'
                        : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className={`h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100 text-cyan-400' : ''}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Sidebar Compact Footer */}
        <div className="p-3.5 border-t border-slate-800/80 bg-[#07080c] space-y-2.5 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center gap-2">
              {!isMuted ? <Volume2 className="h-4 w-4 text-cyan-400" /> : <VolumeX className="h-4 w-4 text-slate-500" />}
              <span className="font-mono text-[11px]">{!isMuted ? 'ระบบเสียง: เปิด' : 'ระบบเสียง: ปิด'}</span>
            </div>
            <span className="text-[10px] text-cyan-400 font-mono">Web Audio</span>
          </button>

          {/* Quick Email Info */}
          <div className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400">
            <span className="block font-semibold text-slate-300 text-[10.5px]">อีเมลทางการ:</span>
            <a
              href="mailto:Noon263485055@gmial.com"
              className="text-cyan-400 hover:underline font-mono break-all block text-[10.5px]"
            >
              Noon263485055@gmial.com
            </a>
          </div>

          {/* Download Standalone Single File */}
          <button
            onClick={() => {
              cineAudio.playTicketPunch();
              downloadCineLiteracySingleFile();
            }}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-900 hover:bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono font-semibold transition-colors"
          >
            <Download className="h-3 w-3" />
            <span>EXPORT .HTML SINGLE-FILE</span>
          </button>
        </div>
      </aside>
    </>
  );
};
