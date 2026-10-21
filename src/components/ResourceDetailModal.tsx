import React from 'react';
import { X, ExternalLink, BookOpen, ShieldCheck, Calendar, Building2, CheckCircle2 } from 'lucide-react';
import { ResourceItem } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ResourceDetailModalProps {
  resource: ResourceItem | null;
  onClose: () => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({
  resource,
  onClose,
}) => {
  const { themeConfig } = useTheme();

  if (!resource) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl p-6 sm:p-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          aria-label="ปิดหน้าต่าง"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Metadata */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className={themeConfig.primaryText}>{resource.categoryLabel}</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-slate-400">ปีเผยแพร่ {resource.publicationYear}</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-slate-400">{resource.documentType}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
            {resource.title}
          </h3>

          <p className="text-xs text-slate-400 font-light">
            {resource.englishTitle}
          </p>
        </div>

        {/* Organization trust badge */}
        <div className="my-5 flex items-center gap-2.5 rounded-lg bg-slate-950/70 p-3 border border-slate-800 text-xs text-slate-300">
          <Building2 className={`h-4 w-4 ${themeConfig.primaryText} shrink-0`} />
          <span className="font-medium text-slate-200">หน่วยงานเจ้าของเอกสาร:</span>
          <span>{resource.organization}</span>
        </div>

        {/* Detailed description */}
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              บทสรุปและสาระสำคัญ
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {resource.description}
            </p>
          </div>

          {/* Key Takeaways */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              ประเด็นสำคัญสำหรับผู้ศึกษา (Key Takeaways)
            </h4>
            <ul className="space-y-2">
              {resource.keyTakeaways.map((point, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions bar */}
        <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-slate-800 pt-5">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2 text-xs sm:text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            ปิด
          </button>
          
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 rounded-lg ${themeConfig.primaryBg} ${themeConfig.primaryHoverBg} px-5 py-2 text-xs sm:text-sm font-bold text-slate-950 transition-colors shadow-sm`}
          >
            <span>เข้าชมเว็บไซต์ทางการ</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

      </div>
    </div>
  );
};
