import React, { useState } from 'react';
import { X, Award, CheckCircle2, Download, Printer, Share2, Check, Sparkles } from 'lucide-react';
import { BadgeInfo } from '../types';
import { useTheme } from '../context/ThemeContext';
import badgeMasteryImage from '../assets/images/badge_cinephile_mastery_1792596275414.jpg';
import { FALLBACK_BADGE_IMAGE, handleImageError } from '../utils/imageFallbacks';

interface BadgeCertificateModalProps {
  score: number;
  total: number;
  badge: BadgeInfo | null;
  onClose: () => void;
}

export const BadgeCertificateModal: React.FC<BadgeCertificateModalProps> = ({
  score,
  total,
  badge,
  onClose,
}) => {
  const { themeConfig } = useTheme();
  const [recipientName, setRecipientName] = useState<string>('ผู้ผ่านการทดสอบความรู้ดิจิทัล');
  const [copied, setCopied] = useState<boolean>(false);

  if (!badge) return null;

  const handleShare = async () => {
    const text = `ฉันได้คะแนน ${score}/${total} ในแบบทดสอบความรู้ดิจิทัลด้านภาพยนตร์ (Movie Digital Literacy Quiz) และได้รับป้ายเกียรติยศ: "${badge.title}" 🎬✨`;
    
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-6 sm:p-8"
        role="dialog"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          aria-label="ปิดหน้าต่าง"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Recipient Customizer in Modal Header */}
        <div className="mb-6 space-y-2 border-b border-slate-800 pb-4">
          <label className="block text-xs font-medium text-slate-400">
            ระบุชื่อของคุณเพื่อแสดงบนใบประกาศเกียรติคุณ:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="กรอกชื่อ-นามสกุล หรือนามแฝง"
              maxLength={40}
              className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-1.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
          </div>
        </div>

        {/* Printable Certificate Frame */}
        <div id="certificate-print-area" className={`relative overflow-hidden rounded-xl border-2 ${themeConfig.borderPrimary} bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 text-center shadow-inner`}>
          
          {/* Decorative Corner Filigrees */}
          <div className={`absolute top-2 left-2 text-[10px] ${themeConfig.primaryText} opacity-50 font-mono`}>✦ 1928-2026 ✦</div>
          <div className={`absolute top-2 right-2 text-[10px] ${themeConfig.primaryText} opacity-50 font-mono`}>✦ DIGITAL LITERACY ✦</div>
          <div className={`absolute bottom-2 left-2 text-[10px] ${themeConfig.primaryText} opacity-50 font-mono`}>✦ OCSC STANDARDS ✦</div>
          <div className={`absolute bottom-2 right-2 text-[10px] ${themeConfig.primaryText} opacity-50 font-mono`}>✦ CERTIFIED ✦</div>

          {/* Badge Graphic */}
          <div className="mx-auto mb-4 flex justify-center">
            <div className="relative">
              <img
                src={badgeMasteryImage}
                alt={badge.title}
                onError={(e) => handleImageError(e, FALLBACK_BADGE_IMAGE)}
                className={`h-28 w-28 sm:h-36 sm:w-36 rounded-xl object-cover border-2 ${themeConfig.borderPrimary} shadow-lg`}
              />
            </div>
          </div>

          <div className={`text-xs uppercase tracking-widest ${themeConfig.primaryText} font-bold`}>
            ใบประกาศนียบัตรเกียรติยศการรู้เท่าทันสื่อภาพยนตร์
          </div>
          <div className="text-[11px] text-slate-400 font-light mt-0.5">
            Certificate of Movie Digital Literacy & Ethics
          </div>

          <div className="my-4 py-2 border-y border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">ขอมอบประกาศนียบัตรฉบับนี้ให้แก่</span>
            <span className="text-xl sm:text-2xl font-bold text-white tracking-wide">
              {recipientName || 'ผู้มีทักษะดิจิทัลด้านภาพยนตร์'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            ได้ผ่านการทดสอบแบบวัดความรู้ดิจิทัลด้านภาพยนตร์ (3 ข้อ) 
            ด้วยคะแนน <span className={`font-bold ${themeConfig.primaryText} font-mono`}>{score}/{total}</span> ({Math.round((score/total)*100)}%) 
            ได้รับป้ายเกียรติคุณ: <strong className={`font-semibold ${themeConfig.primaryText}`}>{badge.title}</strong>
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400 border-t border-slate-800/80 pt-3">
            <div>
              <span>วันที่ประเมิน: </span>
              <span className="text-slate-300 font-medium">{currentDate}</span>
            </div>
            <div className={`flex items-center gap-1.5 ${themeConfig.primaryText}`}>
              <Sparkles className="h-3 w-3" />
              <span>รหัสรับรองมาตรฐานดิจิทัล</span>
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>พิมพ์ / บันทึก PDF</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">คัดลอกผลลัพธ์แล้ว!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  <span>คัดลอกผลเพื่อแชร์</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={onClose}
            className={`rounded-lg ${themeConfig.primaryBg} ${themeConfig.primaryHoverBg} px-5 py-2 text-xs sm:text-sm font-bold text-slate-950 transition-colors`}
          >
            ตกลง
          </button>
        </div>

      </div>
    </div>
  );
};
