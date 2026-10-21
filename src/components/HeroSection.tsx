import React from 'react';
import { PlayCircle, BookOpen, CheckCircle2, ShieldCheck, Film, Award, Video, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import heroImage from '../assets/images/hero_cinema_literacy_1792596275455.jpg';
import { FALLBACK_HERO_IMAGE, handleImageError } from '../utils/imageFallbacks';

interface HeroSectionProps {
  onStartQuiz: () => void;
  onExploreResources: () => void;
  onOpenDirectorLab: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartQuiz,
  onExploreResources,
  onOpenDirectorLab,
}) => {
  const { themeConfig } = useTheme();

  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Headline and Call to action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
              <span className={themeConfig.primaryText}>แพลตฟอร์มการเรียนรู้และประเมินผล</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">มาตรฐานสำนักงาน ก.พ. & ทฤษฎีการกำกับภาพยนตร์</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight text-balance">
              เรียนรู้ทักษะดิจิทัล & เทคนิคการกำกับภาพยนตร์เชิงลึก
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              เสริมสร้างความรู้เท่าทันสื่อภาพยนตร์ (Film Literacy) ผ่านห้องปฏิบัติการจำลองการกำกับ 
              จัดมุมกล้องและการจัดแสง 3 จุด พร้อมทดสอบความเข้าใจผ่านแบบทดสอบ 3 ข้อตรวจผลเรียลไทม์ 
              และเชื่อมโยงสู่เอกสารอ้างอิงทางการ
            </p>

            {/* Quick Benefits Checklist with Theme Color Accents */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className={`h-4 w-4 ${themeConfig.primaryText} shrink-0 mt-0.5`} />
                <span>ห้องจำลองการกำกับ: ขนาดภาพ แสง 3 จุด & กฎ 180°</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Award className={`h-4 w-4 ${themeConfig.primaryText} shrink-0 mt-0.5`} />
                <span>รับป้ายสัญลักษณ์เกียรติยศ (Achievement Badge)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className={`h-4 w-4 ${themeConfig.primaryText} shrink-0 mt-0.5`} />
                <span>อ้างอิงหลัก Fair Use & ทักษะดิจิทัลสำนักงาน ก.พ.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Film className={`h-4 w-4 ${themeConfig.primaryText} shrink-0 mt-0.5`} />
                <span>เปลี่ยนธีมสีอินเทอร์เฟซได้ตามต้องการ</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-4">
              <button
                onClick={onOpenDirectorLab}
                className={`flex items-center gap-2.5 rounded-xl ${themeConfig.primaryBg} ${themeConfig.primaryHoverBg} px-5 sm:px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 transition-all hover:shadow-lg active:scale-95 whitespace-nowrap`}
              >
                <Video className="h-4 w-4" />
                <span>เข้าสู่สตูดิโอกำกับภาพยนตร์</span>
              </button>

              <button
                onClick={onStartQuiz}
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 px-4 sm:px-5 py-3 text-xs sm:text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800 hover:border-slate-600 active:scale-95 whitespace-nowrap"
              >
                <PlayCircle className={`h-4 w-4 ${themeConfig.primaryText}`} />
                <span>ทำแบบทดสอบ (3 ข้อ)</span>
              </button>

              <button
                onClick={onExploreResources}
                className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-xs sm:text-sm font-medium text-slate-400 transition-colors hover:text-slate-200 hover:bg-slate-900 active:scale-95 whitespace-nowrap"
              >
                <BookOpen className="h-4 w-4 text-slate-500" />
                <span>คลังเอกสารอ้างอิง</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
              <img
                src={heroImage}
                alt="Movie Digital Literacy & Directing Concept Visual"
                onError={(e) => handleImageError(e, FALLBACK_HERO_IMAGE)}
                loading="eager"
                className="w-full h-auto object-cover aspect-video sm:aspect-[4/3] lg:aspect-video transform hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200 backdrop-blur-sm bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <Film className={`h-4 w-4 ${themeConfig.primaryText}`} />
                  <span className="font-medium">แพลตฟอร์ม CineLiteracy Hub</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span>รองรับทุกอุปกรณ์</span>
                  <span aria-hidden="true">·</span>
                  <span className={`${themeConfig.primaryText} font-semibold`}>สลับธีมสีได้</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
