/**
 * CineLiteracy Hub: รู้เท่าทันสื่อภาพยนตร์ในยุคดิจิทัล
 * An Interactive Multimedia Web Application for Digital Movie Literacy
 * 
 * Features:
 * - Unified Responsive Top Bar with Mobile Drawer Toggle & Quick Horizontal Menu Pills
 * - Left Sidebar Navigation (Desktop & Mobile Drawer with all 8 items fully accessible)
 * - "All in One" Mode ('all') that displays all content modules in a single expansive scroll
 * - Individual Focused Views ('home', 'lessons', 'angles', 'equipment', 'quiz', 'references', 'contact')
 * - Generous Safe-Area Padding-Top (pt-8 sm:pt-10 lg:pt-12) to prevent clipping
 * - Web Audio API Synthetic Sound Generator
 * - Developer & Contact Information (Noon263485055@gmial.com)
 */

import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Sidebar, NavPage } from './components/Sidebar';
import { MarqueeBanner } from './components/MarqueeBanner';
import { HeroSection } from './components/HeroSection';
import { LessonsModule } from './components/LessonsModule';
import { DirectorLabModule } from './components/DirectorLabModule';
import { QuizModule } from './components/QuizModule';
import { ResourcesModule } from './components/ResourcesModule';
import { DeveloperContactModule } from './components/DeveloperContactModule';
import { BadgeCertificateModal } from './components/BadgeCertificateModal';
import { EndCreditsRoll } from './components/EndCreditsRoll';
import { BadgeInfo } from './types';
import { downloadCineLiteracySingleFile } from './utils/exportStandaloneHtml';
import { cineAudio } from './utils/audioSystem';
import { 
  Film, 
  Video, 
  Camera, 
  Sliders, 
  HelpCircle, 
  Bookmark, 
  Mail, 
  Download, 
  Sparkles, 
  Award,
  Layers,
  ArrowRight,
  Menu,
  X,
  Volume2,
  VolumeX,
  ChevronRight
} from 'lucide-react';

function CineLiteracyApp() {
  const [currentPage, setCurrentPage] = useState<NavPage>('all');
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  // Certificate Modal State
  const [certData, setCertData] = useState<{
    score: number;
    total: number;
    badge: BadgeInfo | null;
  } | null>(null);

  const handlePageSelect = (page: NavPage) => {
    cineAudio.playSlateClap();
    setCurrentPage(page);
    setIsOpenMobile(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSound = () => {
    cineAudio.isMuted = !isMuted;
    setIsMuted(!isMuted);
    if (!cineAudio.isMuted) {
      cineAudio.playSlateClap();
    }
  };

  const handleDownload = () => {
    cineAudio.playTicketPunch();
    downloadCineLiteracySingleFile();
  };

  const handleOpenCertificate = (score: number, total: number, badge: BadgeInfo) => {
    setCertData({ score, total, badge });
  };

  // Top quick nav buttons list
  const quickNavTabs: { id: NavPage; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'มุมมองทั้งหมด (Full Cinema)', icon: <Layers className="h-3.5 w-3.5" /> },
    { id: 'home', label: 'หน้าแรก', icon: <Film className="h-3.5 w-3.5" /> },
    { id: 'lessons', label: 'บทเรียนม้วนฟิล์ม', icon: <Video className="h-3.5 w-3.5" /> },
    { id: 'angles', label: 'มุมกล้อง & เฟรม', icon: <Camera className="h-3.5 w-3.5" /> },
    { id: 'equipment', label: 'อุปกรณ์ภาพยนตร์', icon: <Sliders className="h-3.5 w-3.5" /> },
    { id: 'quiz', label: 'แบบทดสอบ 3 ข้อ', icon: <HelpCircle className="h-3.5 w-3.5" /> },
    { id: 'references', label: 'คลังอ้างอิง OCSC', icon: <Bookmark className="h-3.5 w-3.5" /> },
    { id: 'contact', label: 'ผู้พัฒนาโครงงาน', icon: <Mail className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-white">
      
      {/* 1. LEFT SIDEBAR NAVIGATION DRAWER (Desktop fixed, Mobile popup) */}
      <Sidebar
        currentPage={currentPage}
        onSelectPage={handlePageSelect}
        isOpenMobile={isOpenMobile}
        onCloseMobile={() => setIsOpenMobile(false)}
      />

      {/* 2. MAIN VIEWPORT WITH LEFT-OFFSET ON DESKTOP */}
      <div className="lg:pl-72 flex flex-col min-h-screen w-full">
        
        {/* UNIFIED RESPONSIVE TOP BAR */}
        <header className="sticky top-0 z-30 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-slate-800/80 px-3 sm:px-6 py-2.5 shadow-md">
          <div className="flex items-center justify-between gap-3">
            
            {/* Left: Mobile Hamburger Toggle + Brand preview */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setIsOpenMobile(!isOpenMobile)}
                className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-cyan-400 hover:text-white hover:bg-slate-800 transition-colors shadow-sm"
                aria-label="เปิดเมนูด้านข้าง"
              >
                {isOpenMobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="text-xs font-bold font-mono">เมนู</span>
              </button>

              <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-400">โหมดการแสดงผล:</span>
                <span className="text-cyan-400 font-bold uppercase tracking-wider">
                  {currentPage === 'all' && 'มุมมองทั้งหมด (แสดงเนื้อหาครบทุกหมวด)'}
                  {currentPage === 'home' && 'หน้าแรก & ห้องทดลองกำกับ'}
                  {currentPage === 'lessons' && 'บทเรียนม้วนฟิล์ม Motion Graphics'}
                  {currentPage === 'angles' && 'สตูดิโอมุมกล้อง & การจัดเฟรม'}
                  {currentPage === 'equipment' && 'คลังอุปกรณ์ภาพยนตร์'}
                  {currentPage === 'quiz' && 'แบบทดสอบดิจิทัล 3 ข้อ'}
                  {currentPage === 'references' && 'คลังอ้างอิง OCSC & กฎหมาย'}
                  {currentPage === 'contact' && 'ข้อมูลผู้พัฒนา & แบบฟอร์มติดต่อ'}
                </span>
              </div>
            </div>

            {/* Right: Sound Toggle, Credits, Export Button */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                onClick={handleToggleSound}
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1"
                title="เปิด/ปิดเสียงเอฟเฟกต์"
              >
                {!isMuted ? <Volume2 className="h-4 w-4 text-cyan-400" /> : <VolumeX className="h-4 w-4 text-slate-500" />}
                <span className="hidden md:inline text-[11px] font-mono">{!isMuted ? 'เสียง: เปิด' : 'เสียง: ปิด'}</span>
              </button>

              <button
                onClick={() => setIsCreditsOpen(true)}
                className="text-xs font-mono text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 transition-colors hidden sm:block"
              >
                🎬 Credits
              </button>
              
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 transition-all shadow-[0_0_12px_rgba(6,182,212,0.25)]"
                title="ดาวน์โหลดไฟล์เดียวจบ HTML/CSS/JS Offline"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="hidden md:inline">EXPORT .HTML</span>
                <span className="md:hidden">EXPORT</span>
              </button>
            </div>
          </div>

          {/* QUICK HORIZONTAL NAV TABS - Always visible on top of viewport! */}
          <div className="flex items-center gap-1.5 pt-2 pb-1 overflow-x-auto no-scrollbar scroll-smooth">
            {quickNavTabs.map((tab) => {
              const isActive = currentPage === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handlePageSelect(tab.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(6,182,212,0.35)]'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
                  }`}
                >
                  <span className={isActive ? 'text-slate-950' : 'text-cyan-400'}>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </header>

        {/* 3. MAIN CONTENT CONTAINER (Generous Safe-Area Padding-Top) */}
        <main className="flex-1 w-full pt-8 sm:pt-10 lg:pt-12 pb-20 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto space-y-16">
          
          {/* ========================================================
              MODE A: 'all' (มุมมองทั้งหมด - แสดงเนื้อหาครบทุกหมวด)
              ======================================================== */}
          {currentPage === 'all' && (
            <div className="space-y-20">
              
              {/* SECTION 1: MARQUEE BANNER */}
              <section id="marquee-section">
                <MarqueeBanner
                  onDownloadSingleFile={handleDownload}
                  onOpenCredits={() => setIsCreditsOpen(true)}
                />
              </section>

              {/* SECTION 2: HERO & OVERVIEW */}
              <section id="hero-section">
                <HeroSection
                  onStartQuiz={() => handlePageSelect('quiz')}
                  onExploreResources={() => handlePageSelect('references')}
                  onOpenDirectorLab={() => handlePageSelect('angles')}
                />
              </section>

              {/* SECTION 3: MOTION GRAPHICS FILM ROLLS (TYPES OF FILM MEDIA) */}
              <section id="lessons-section" className="scroll-mt-24">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400">
                      <Video className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        บทเรียนม้วนฟิล์ม Motion Graphics: ประเภทสื่อภาพยนตร์
                      </h2>
                      <p className="text-xs text-slate-400">
                        ศึกษาโครงสร้างและอิทธิพลของสารคดี โฆษณา คลิปสั้นโซเชียลมีเดีย และภาพยนตร์บันเทิง
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePageSelect('lessons')}
                    className="hidden sm:flex items-center gap-1 text-xs text-cyan-400 hover:underline"
                  >
                    <span>ดูแบบเจาะลึกเฉพาะหมวด</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                <LessonsModule initialRoll="types" />
              </section>

              {/* SECTION 4: CAMERA ANGLES & FRAMING LAB */}
              <section id="angles-section" className="scroll-mt-24">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400">
                      <Camera className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        สตูดิโอมุมกล้อง & การจัดเฟรม (Framing Simulator)
                      </h2>
                      <p className="text-xs text-slate-400">
                        ทดลองปรับขนาดภาพ ECU, CU, MS, WS, Over-the-Shoulder และ Dutch Angle
                      </p>
                    </div>
                  </div>
                </div>
                <LessonsModule initialRoll="angles" />
              </section>

              {/* SECTION 5: FILMMAKING EQUIPMENT */}
              <section id="equipment-section" className="scroll-mt-24">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400">
                      <Sliders className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        คลังอุปกรณ์การผลิตภาพยนตร์ (Filmmaking Gear)
                      </h2>
                      <p className="text-xs text-slate-400">
                        กล้องดิจิทัลภาพยนตร์ สเลทกำกับ ระบบไฟ 3 จุด และอุปกรณ์ไมโครโฟนบันทึกเสียง
                      </p>
                    </div>
                  </div>
                </div>
                <LessonsModule initialRoll="equipment" />
              </section>

              {/* SECTION 6: DIRECTOR'S LABORATORY SIMULATOR */}
              <section id="director-lab-section" className="scroll-mt-24">
                <DirectorLabModule />
              </section>

              {/* SECTION 7: 3-QUESTION INTERACTIVE QUIZ */}
              <section id="quiz-section" className="scroll-mt-24">
                <QuizModule
                  onOpenCertificate={handleOpenCertificate}
                  onExploreReferences={() => handlePageSelect('references')}
                />
              </section>

              {/* SECTION 8: REFERENCES & DIGITAL RESOURCES (OCSC) */}
              <section id="references-section" className="scroll-mt-24">
                <ResourcesModule />
              </section>

              {/* SECTION 9: DEVELOPER & CONTACT INFORMATION */}
              <section id="contact-section" className="scroll-mt-24">
                <DeveloperContactModule />
              </section>

            </div>
          )}

          {/* ========================================================
              MODE B: INDIVIDUAL FOCUSED VIEWS
              ======================================================== */}
          {currentPage === 'home' && (
            <div className="space-y-12">
              <MarqueeBanner
                onDownloadSingleFile={handleDownload}
                onOpenCredits={() => setIsCreditsOpen(true)}
              />
              <HeroSection
                onStartQuiz={() => handlePageSelect('quiz')}
                onExploreResources={() => handlePageSelect('references')}
                onOpenDirectorLab={() => handlePageSelect('angles')}
              />
              <div className="pt-4">
                <DirectorLabModule />
              </div>
            </div>
          )}

          {currentPage === 'lessons' && (
            <div className="space-y-8">
              <LessonsModule initialRoll="types" />
            </div>
          )}

          {currentPage === 'angles' && (
            <div className="space-y-8">
              <LessonsModule initialRoll="angles" />
            </div>
          )}

          {currentPage === 'equipment' && (
            <div className="space-y-8">
              <LessonsModule initialRoll="equipment" />
            </div>
          )}

          {currentPage === 'quiz' && (
            <div className="space-y-8">
              <QuizModule
                onOpenCertificate={handleOpenCertificate}
                onExploreReferences={() => handlePageSelect('references')}
              />
            </div>
          )}

          {currentPage === 'references' && (
            <div className="space-y-8">
              <ResourcesModule />
            </div>
          )}

          {currentPage === 'contact' && (
            <div className="space-y-8">
              <DeveloperContactModule />
            </div>
          )}

        </main>

        {/* 4. CINEMA FOOTER */}
        <footer className="border-t border-slate-800 bg-[#07080c] text-slate-400 text-xs py-10 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold text-sm font-['Cinzel',serif]">
                  <Film className="h-4 w-4 text-cyan-400" />
                  <span>CineLiteracy Hub: รู้เท่าทันสื่อภาพยนตร์ในยุคดิจิทัล</span>
                </div>
                <p className="text-slate-400 max-w-lg text-xs leading-relaxed">
                  สื่อการเรียนรู้เชิงโต้ตอบ มุ่งเน้นการสร้างเสริมทักษะดิจิทัลด้านภาพยนตร์และไวยากรณ์สื่อ 
                  ภาควิชาเทคโนโลยีการศึกษา คณะศึกษาศาสตร์ มหาวิทยาลัยศิลปากร
                </p>
                <div className="text-[11px] font-mono text-cyan-400">
                  อีเมลทางการ: Noon263485055@gmial.com · noon263485055@gmail.com
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => handlePageSelect('all')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 transition-all"
                >
                  🌐 แสดงเนื้อหาทั้งหมด (View All)
                </button>
                <button
                  onClick={() => setIsCreditsOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-pink-500/50 text-pink-400 hover:bg-pink-500 hover:text-white transition-all shadow-[0_0_10px_rgba(255,42,109,0.2)]"
                >
                  🎬 Hollywood End Credits
                </button>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-mono transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                >
                  💾 Download Single-File HTML
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 font-mono">
              <div>
                © 2026 CineLiteracy Hub. Educational Technology & Digital Media Literacy.
              </div>
              <div className="flex items-center gap-3">
                <span>Web Audio API</span>
                <span>·</span>
                <span>Responsive Safe-Area</span>
                <span>·</span>
                <span>OCSC Standards</span>
              </div>
            </div>
          </div>
        </footer>

      </div>

      {/* 5. MODALS */}
      <EndCreditsRoll
        isOpen={isCreditsOpen}
        onClose={() => setIsCreditsOpen(false)}
      />

      {certData && (
        <BadgeCertificateModal
          score={certData.score}
          total={certData.total}
          badge={certData.badge}
          onClose={() => setCertData(null)}
        />
      )}

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CineLiteracyApp />
    </ThemeProvider>
  );
}
