import React from 'react';
import { Film, BookOpen, Award, Sparkles, UserCheck, Video } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ThemeSwitcher } from './ThemeSwitcher';

interface HeaderProps {
  activeTab: 'home' | 'quiz' | 'director' | 'resources' | 'developer';
  setActiveTab: (tab: 'home' | 'quiz' | 'director' | 'resources' | 'developer') => void;
  onStartQuiz: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onStartQuiz,
}) => {
  const { themeConfig } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 sm:gap-6 px-3.5 sm:px-6 lg:px-8">
        
        {/* Zone 1: Brand wordmark */}
        <button
          onClick={() => setActiveTab('home')}
          className="group flex items-center gap-2.5 text-left text-slate-100 transition-colors whitespace-nowrap shrink-0"
        >
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 border ${themeConfig.borderPrimary} ${themeConfig.primaryText} transition-colors`}>
            <Film className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-white">
              CineLiteracy Hub
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-400 -mt-1 font-light hidden sm:inline">
              แอปพลิเคชันเพื่อการเรียนรู้ทักษะดิจิทัลด้านภาพยนตร์
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium text-slate-300 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('home')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'home'
                ? `${themeConfig.primaryText} font-bold border-b-2 border-current`
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            หน้าหลัก
          </button>

          <button
            onClick={() => setActiveTab('director')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'director'
                ? `${themeConfig.primaryText} font-bold border-b-2 border-current`
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Video className="h-3.5 w-3.5" />
            <span>สตูดิโอกำกับภาพยนตร์</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? `${themeConfig.primaryText} font-bold border-b-2 border-current`
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>แบบทดสอบ 3 ข้อ</span>
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'resources'
                ? `${themeConfig.primaryText} font-bold border-b-2 border-current`
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5 hidden sm:inline" />
            <span>คลังอ้างอิงทางการ</span>
          </button>

          <button
            onClick={() => setActiveTab('developer')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'developer'
                ? `${themeConfig.primaryText} font-bold border-b-2 border-current`
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="h-3.5 w-3.5 hidden sm:inline" />
            <span>ผู้พัฒนา & โครงงาน</span>
          </button>
        </nav>

        {/* Zone 3: Theme Switcher & Primary Action */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <ThemeSwitcher />

          <button
            onClick={onStartQuiz}
            className={`hidden sm:flex items-center gap-1.5 rounded-lg ${themeConfig.primaryBg} ${themeConfig.primaryHoverBg} px-3.5 py-2 text-xs font-semibold text-slate-950 transition-colors shadow-sm active:scale-95 whitespace-nowrap shrink-0`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>ทำแบบทดสอบ</span>
          </button>
        </div>

      </div>
    </header>
  );
};
