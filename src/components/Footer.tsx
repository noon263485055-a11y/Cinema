import React from 'react';
import { Film, ExternalLink, ShieldCheck, UserCheck, Video } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  onNavigateTab: (tab: 'home' | 'quiz' | 'director' | 'resources' | 'developer') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  const { themeConfig } = useTheme();

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-slate-100 font-bold text-sm">
              <Film className={`h-4 w-4 ${themeConfig.primaryText}`} />
              <span>CineLiteracy Hub</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              แอปพลิเคชันเพื่อการเรียนรู้ทักษะดิจิทัลด้านภาพยนตร์และเทคนิคการกำกับภาพยนตร์ พัฒนาด้วยกระบวนการ CPS 5 ขั้นตอน 
              ร่วมกับการพัฒนาด้วย AI Vibe Coding เพื่อส่งเสริมความเข้าใจในลิขสิทธิ์ Fair Use และการรู้เท่าทันสื่อ
            </p>
            <div className="pt-1 text-[11px] font-mono">
              <a
                href="https://cineliteracy-hub.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${themeConfig.primaryText} hover:underline inline-flex items-center gap-1`}
              >
                <span>https://cineliteracy-hub.vercel.app/</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Direct Navigation */}
          <div className="space-y-2">
            <span className="font-semibold text-slate-200 block text-xs uppercase tracking-wider">
              ส่วนการใช้งาน
            </span>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateTab('home')}
                  className={`hover:${themeConfig.primaryText} transition-colors`}
                >
                  หน้าหลักภาพรวม
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('director')}
                  className={`hover:${themeConfig.primaryText} transition-colors flex items-center gap-1`}
                >
                  <Video className="h-3 w-3" />
                  <span>สตูดิโอกำกับภาพยนตร์</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('quiz')}
                  className={`hover:${themeConfig.primaryText} transition-colors`}
                >
                  แบบทดสอบ 3 ข้อ (Quiz)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('resources')}
                  className={`hover:${themeConfig.primaryText} transition-colors`}
                >
                  คลังอ้างอิงและเอกสารทางการ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('developer')}
                  className={`hover:${themeConfig.primaryText} transition-colors`}
                >
                  ติดต่อผู้พัฒนา & โครงงาน
                </button>
              </li>
            </ul>
          </div>

          {/* Official Agency Links */}
          <div className="space-y-2">
            <span className="font-semibold text-slate-200 block text-xs uppercase tracking-wider">
              แหล่งอ้างอิงหลัก
            </span>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <a
                  href="https://www.ocsc.go.th"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-200 inline-flex items-center gap-1 transition-colors"
                >
                  <span>สำนักงาน ก.พ. (OCSC)</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.fapot.or.th"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-200 inline-flex items-center gap-1 transition-colors"
                >
                  <span>หอภาพยนตร์ (องค์การมหาชน)</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.ipthailand.go.th"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-200 inline-flex items-center gap-1 transition-colors"
                >
                  <span>กรมทรัพย์สินทางปัญญา (DIP)</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.unesco.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-200 inline-flex items-center gap-1 transition-colors"
                >
                  <span>UNESCO MIL Guidelines</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 CineLiteracy Hub. ผลงานการเรียนรู้ทักษะดิจิทัลด้านภาพยนตร์ผ่านกระบวนการ CPS
          </div>
          <div className="flex items-center gap-3">
            <span>ผู้พัฒนา: นุ่น (noon263485055@gmail.com)</span>
            <span aria-hidden="true">·</span>
            <span>https://cineliteracy-hub.vercel.app/</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
