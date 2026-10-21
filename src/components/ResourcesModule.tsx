import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ExternalLink, 
  BookOpen, 
  Scale, 
  Film, 
  Globe, 
  ShieldCheck, 
  Building2, 
  Info,
  Tv,
  CheckCircle2,
  FileText,
  Lightbulb,
  DownloadCloud,
  Check
} from 'lucide-react';
import { ResourceItem, ResourceCategory } from '../types';
import { DIGITAL_RESOURCES } from '../data/resources';
import { ResourceDetailModal } from './ResourceDetailModal';
import { useTheme } from '../context/ThemeContext';

export const ResourcesModule: React.FC = () => {
  const { themeConfig } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalResource, setActiveModalResource] = useState<ResourceItem | null>(null);

  const categories = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'ocsc', label: 'สำนักงาน ก.พ. & ภาครัฐ' },
    { id: 'copyright', label: 'กฎหมาย & ลิขสิทธิ์' },
    { id: 'film_archive', label: 'คลังมรดกภาพยนตร์' },
    { id: 'media_literacy', label: 'การรู้เท่าทันสื่อ' },
    { id: 'streaming_mil', label: 'สตรีมมิ่ง & OTT' },
    { id: 'international', label: 'มาตรฐานสากล & สถาบันภาพยนตร์' },
  ] as const;

  const filteredResources = useMemo(() => {
    return DIGITAL_RESOURCES.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.englishTitle.toLowerCase().includes(q) ||
        item.organization.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ocsc':
        return <Building2 className={`h-5 w-5 ${themeConfig.primaryText}`} />;
      case 'copyright':
        return <Scale className="h-5 w-5 text-blue-400" />;
      case 'film_archive':
        return <Film className="h-5 w-5 text-purple-400" />;
      case 'streaming_mil':
        return <Tv className="h-5 w-5 text-pink-400" />;
      case 'international':
        return <Globe className="h-5 w-5 text-emerald-400" />;
      default:
        return <ShieldCheck className={`h-5 w-5 ${themeConfig.primaryText}`} />;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-3.5 py-6 sm:px-6 sm:py-10 space-y-10">
      
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-1.5">
            <span className={themeConfig.primaryText}>โมดูลแหล่งอ้างอิงและคลังข้อมูล</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">References & Digital Resources</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            แหล่งอ้างอิงและคลังความรู้ดิจิทัลด้านภาพยนตร์
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            รวบรวมเอกสารมาตรฐาน กรอบทักษะดิจิทัลของสำนักงาน ก.พ. พระราชบัญญัติลิขสิทธิ์โสตทัศนวัสดุ 
            ฐานข้อมูลมรดกภาพยนตร์แห่งชาติ และคู่มือการศึกษาจากสถาบันภาพยนตร์ชั้นนำระดับโลก 
            ลิงก์ภายนอกทั้งหมดเปิดแยกในแท็บใหม่อย่างปลอดภัย
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl shrink-0 self-start md:self-auto">
          <BookOpen className={`h-4 w-4 ${themeConfig.primaryText}`} />
          <span>คลังข้อมูลที่ตรวจสอบแล้ว: <strong className="text-white font-mono">{DIGITAL_RESOURCES.length}</strong> แหล่ง</span>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3.5 items-stretch md:items-center justify-between">
          
          {/* Segmented Category Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ResourceCategory)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? `${themeConfig.primaryBg} text-slate-950 font-bold shadow-sm`
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาเอกสาร, ก.พ., ลิขสิทธิ์, BFI..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ล้าง
              </button>
            )}
          </div>

        </div>

        {/* Results Counter */}
        <div className="text-xs text-slate-400 flex items-center justify-between">
          <span>
            แสดงเอกสารอ้างอิง <span className="font-semibold text-slate-200">{filteredResources.length}</span> รายการ
          </span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            คลิกปุ่ม "เปิดลิงก์ทางการ" เพื่อเข้าชมเอกสารฉบับเต็มในแท็บใหม่
          </span>
        </div>
      </div>

      {/* Resource Cards Grid */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((item) => (
            <div
              key={item.id}
              className={`group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 transition-all hover:border-slate-700 hover:bg-slate-900 hover:shadow-xl hover:shadow-slate-950/60 ${
                item.featured ? 'ring-1 ring-cyan-500/30' : ''
              }`}
            >
              <div>
                {/* Top unboxed metadata line */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`${themeConfig.primaryText} font-medium`}>{item.categoryLabel}</span>
                    <span aria-hidden="true" className="text-slate-700">·</span>
                    <span>{item.documentType}</span>
                    <span aria-hidden="true" className="text-slate-700">·</span>
                    <span className="font-mono">{item.publicationYear}</span>
                  </div>

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/80 border border-slate-700/60 group-hover:border-slate-600 transition-colors shrink-0 ml-2">
                    {getCategoryIcon(item.category)}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 font-light mt-0.5 mb-3">
                  {item.englishTitle}
                </p>

                {/* Organization */}
                <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium mb-3">
                  <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{item.organization}</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 mb-4">
                  {item.description}
                </p>

                {/* Key takeaway preview bullets */}
                <div className="space-y-1.5 border-t border-slate-800/80 pt-3">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    ประเด็นหลักสำหรับผู้ศึกษา:
                  </span>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    • {item.keyTakeaways[0]}
                  </p>
                </div>
              </div>

              {/* Action Buttons Row with Safe External Links */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
                <button
                  onClick={() => setActiveModalResource(item)}
                  className={`flex items-center gap-1.5 text-xs font-semibold ${themeConfig.primaryText} hover:brightness-125 transition-all py-1`}
                >
                  <Info className="h-3.5 w-3.5" />
                  <span>ดูสาระสำคัญ & รายละเอียด</span>
                </button>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 px-3.5 py-1.5 text-xs font-medium text-slate-200 hover:text-white transition-colors border border-slate-700/80 whitespace-nowrap shrink-0"
                  title="เปิดเว็บไซต์ทางการในแท็บใหม่ (ปลอดภัย)"
                >
                  <span>เปิดลิงก์ทางการ</span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                </a>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center">
          <BookOpen className="mx-auto h-8 w-8 text-slate-600 mb-3" />
          <h4 className="text-base font-semibold text-slate-300">ไม่พบเอกสารที่ตรงกับคำค้นหา</h4>
          <p className="text-xs text-slate-500 mt-1">ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่นเพื่อค้นหาเอกสาร</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-4 rounded-lg bg-slate-800 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700"
          >
            ล้างตัวกรองทั้งหมด
          </button>
        </div>
      )}

      {/* Direct Knowledge Toolkit Callout Banner */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
          <Lightbulb className={`h-4 w-4 ${themeConfig.primaryText}`} />
          <span className={themeConfig.primaryText}>เกร็ดความรู้ด่วน: เช็กลิสต์ 4 ข้อการใช้งานที่เป็นธรรม (Fair Use)</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white">
          ก่อนนำคลิปหรือเสียงจากภาพยนตร์มาใช้ในผลงานของตนเอง ให้ตรวจสอบ 4 ข้อนี้เสมอ:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <span className="font-bold text-white block">1. วัตถุประสงค์ (Purpose)</span>
            <p className="text-slate-400">เน้นการวิจารณ์ แนะนำ หรือการศึกษา โดยไม่แสวงหาผลประโยชน์ทางการค้าโดยตรง</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <span className="font-bold text-white block">2. สัดส่วนที่นำมาใช้ (Amount)</span>
            <p className="text-slate-400">ตัดเฉพาะท่อนสั้นๆ ที่จำเป็นต่อการวิเคราะห์ ไม่นำมาทั้งเรื่องหรือจุดไคลแมกซ์หลัก</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <span className="font-bold text-white block">3. ผลกระทบต่อตลาด (Market Effect)</span>
            <p className="text-slate-400">การนำมาใช้ต้องไม่ทดแทนการดูภาพยนตร์ต้นฉบับ และไม่ส่งผลเสียต่อยอดจำหน่ายของเจ้าของสิทธิ์</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <span className="font-bold text-white block">4. การให้เครดิต (Attribution)</span>
            <p className="text-slate-400">ระบุชื่อภาพยนตร์ ผู้กำกับ และค่ายต้นสังกัดอย่างเปิดเผยและชัดเจนในผลงาน</p>
          </div>
        </div>
      </div>

      {/* Resource Detail Modal */}
      <ResourceDetailModal
        resource={activeModalResource}
        onClose={() => setActiveModalResource(null)}
      />

    </div>
  );
};
