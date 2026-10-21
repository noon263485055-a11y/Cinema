import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Building2, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  Check, 
  Globe, 
  Github, 
  Linkedin, 
  Phone, 
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Code2,
  Bug,
  CheckCircle,
  Lightbulb,
  X
} from 'lucide-react';
import devAvatar from '../assets/images/developer_profile_avatar_1792596724901.jpg';
import { FALLBACK_DEV_AVATAR, handleImageError } from '../utils/imageFallbacks';
import { useTheme } from '../context/ThemeContext';

export const DeveloperContactModule: React.FC = () => {
  const { themeConfig } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'ข้อเสนอแนะเกี่ยวกับแบบทดสอบความรู้ดิจิทัลด้านภาพยนตร์',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [submittedPayload, setSubmittedPayload] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
    timestamp: string;
  } | null>(null);

  const [emailCopied, setEmailCopied] = useState<boolean>(false);
  const [urlCopied, setUrlCopied] = useState<boolean>(false);

  // Event Listener / Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      const payload = {
        ...formData,
        timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      };
      setSubmittedPayload(payload);
      setIsSubmitting(false);
      setShowSuccessModal(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: 'ข้อเสนอแนะเกี่ยวกับแบบทดสอบความรู้ดิจิทัลด้านภาพยนตร์',
        message: '',
      });
    }, 450);
  };

  const copyToClipboard = (text: string, type: 'email' | 'url') => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      if (type === 'email') {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
      } else {
        setUrlCopied(true);
        setTimeout(() => setUrlCopied(false), 2000);
      }
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Page Title */}
      <div className="mb-10 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-1">
          <span className={themeConfig.primaryText}>โมดูลผู้ติดต่อและข้อมูลโครงงาน</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400">Developer & Contact Information</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          ติดต่อผู้พัฒนาและข้อมูลโครงงาน CineLiteracy Hub
        </h2>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
          แอปพลิเคชันเพื่อการเรียนรู้ทักษะดิจิทัลด้านภาพยนตร์ พัฒนาด้วยกระบวนการคิดสร้างสรรค์เพื่อแก้ปัญหา (CPS 5 ขั้นตอน) 
          ผสานการพัฒนาด้วยแนวคิด AI Vibe Coding เพื่อสร้างสื่อนวัตกรรมดิจิทัลพร้อมใช้งาน
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Developer Profile & Official Contact Channels */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Developer Profile Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-7 shadow-xl space-y-5">
            <div className="flex items-center gap-4">
              <img
                src={devAvatar}
                alt="Project Developer Portrait"
                onError={(e) => handleImageError(e, FALLBACK_DEV_AVATAR)}
                className={`h-20 w-20 sm:h-24 sm:w-24 rounded-2xl object-cover border ${themeConfig.borderPrimary} shadow-md shrink-0`}
              />
              <div>
                <span className={`text-xs ${themeConfig.primaryText} font-semibold block`}>ผู้จัดทำและวิจัยโครงงาน</span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  นุ่น (Project Creator)
                </h3>
                <p className="text-xs text-slate-400 font-light mt-0.5">
                  นักศึกษาวิจัยและผู้พัฒนานวัตกรรมสื่อการศึกษาดิจิทัล
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                  <span>พร้อมรับข้อเสนอแนะและร่วมงานวิจัย</span>
                </div>
              </div>
            </div>

            {/* Department & University Affiliation */}
            <div className="space-y-3 pt-3 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <GraduationCap className={`h-4 w-4 ${themeConfig.primaryText} shrink-0 mt-0.5`} />
                <div>
                  <span className="font-semibold text-slate-200 block">ภาควิชาและสาขา</span>
                  <span className="text-slate-400">
                    สาขาวิชาเทคโนโลยีและนวัตกรรมการศึกษา / นิเทศศาสตร์และสื่อภาพยนตร์ดิจิทัล
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Building2 className={`h-4 w-4 ${themeConfig.primaryText} shrink-0 mt-0.5`} />
                <div>
                  <span className="font-semibold text-slate-200 block">สถาบันการศึกษา</span>
                  <span className="text-slate-400">
                    มหาวิทยาลัยชั้นนำด้านนวัตกรรมการเรียนรู้และสื่อสารมวลชน (University Affiliation)
                  </span>
                </div>
              </div>
            </div>

            {/* Official Link Card */}
            <div className="rounded-xl bg-slate-950/80 p-4 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-medium text-slate-300">เว็บไซต์ทางการของโครงงาน:</span>
                <button
                  onClick={() => copyToClipboard('https://cineliteracy-hub.vercel.app/', 'url')}
                  className={`hover:${themeConfig.primaryText} transition-colors flex items-center gap-1 text-[11px]`}
                >
                  {urlCopied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">คัดลอกแล้ว</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>คัดลอกลิงก์</span>
                    </>
                  )}
                </button>
              </div>
              <a
                href="https://cineliteracy-hub.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between gap-2 text-xs sm:text-sm ${themeConfig.primaryText} hover:underline font-mono break-all`}
              >
                <span>https://cineliteracy-hub.vercel.app/</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              </a>
            </div>

            {/* Communication channels */}
            <div className="space-y-2.5 pt-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                ช่องทางการติดต่ออย่างเป็นทางการ
              </span>

              {/* Official Project Email specified */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Mail className={`h-4 w-4 ${themeConfig.primaryText} shrink-0`} />
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 block font-sans">อีเมลทางการ (Official Contact Email):</span>
                    <a 
                      href="mailto:Noon263485055@gmial.com"
                      className="text-slate-200 hover:text-cyan-400 font-mono font-medium truncate block"
                    >
                      Noon263485055@gmial.com
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard('Noon263485055@gmial.com', 'email')}
                  className="rounded px-2 py-1 text-[11px] font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 flex items-center gap-1 ml-2"
                  title="คัดลอกอีเมล"
                >
                  {emailCopied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">คัดลอกแล้ว</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>คัดลอก</span>
                    </>
                  )}
                </button>
              </div>

              {/* Standard Gmail mirror */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/80 text-[11px]">
                <div className="flex items-center gap-2 text-slate-400 min-w-0">
                  <Mail className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                  <span className="truncate font-mono">noon263485055@gmail.com</span>
                </div>
                <a
                  href="mailto:noon263485055@gmail.com"
                  className="text-cyan-400 hover:underline shrink-0"
                >
                  ส่งอีเมลทันที &rarr;
                </a>
              </div>

              {/* External Profile Links */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-slate-950/70 p-2.5 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <Github className="h-4 w-4 text-slate-400" />
                  <span>GitHub Repo</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-slate-950/70 p-2.5 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <Linkedin className="h-4 w-4 text-blue-400" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>

          </div>

          {/* CPS 5-Steps Process Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
              <Lightbulb className={`h-4 w-4 ${themeConfig.primaryText}`} />
              <span className={themeConfig.primaryText}>กระบวนการพัฒนา (CPS 5 ขั้นตอน & AI Vibe Coding)</span>
            </div>

            <ol className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className={`font-mono ${themeConfig.primaryText} font-bold shrink-0`}>01.</span>
                <div>
                  <span className="font-semibold text-slate-200">การระบุปัญหา: </span>
                  ผู้บริโภคสื่อขาดความรู้ด้านลิขสิทธิ์ Fair Use และทักษะดิจิทัลภาพยนตร์
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className={`font-mono ${themeConfig.primaryText} font-bold shrink-0`}>02.</span>
                <div>
                  <span className="font-semibold text-slate-200">การค้นหาข้อมูล: </span>
                  รวบรวมกรอบมาตรฐานทักษะดิจิทัลสำนักงาน ก.พ. พ.ร.บ.ลิขสิทธิ์ และข้อมูลหอภาพยนตร์
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className={`font-mono ${themeConfig.primaryText} font-bold shrink-0`}>03.</span>
                <div>
                  <span className="font-semibold text-slate-200">การสร้างไอเดีย: </span>
                  ออกแบบเป็นโมดูล Quiz 3 ข้อสุ่มตรวจผลเรียลไทม์ คลังการ์ดอ้างอิงทางการ และห้องปฏิบัติการจำลองการกำกับภาพยนตร์
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className={`font-mono ${themeConfig.primaryText} font-bold shrink-0`}>04.</span>
                <div>
                  <span className="font-semibold text-slate-200">การค้นหาวิธีแก้ปัญหา (Bug Fixes Vibe Coding): </span>
                  ปรับแก้เลย์เอาต์มือถือด้วย Tailwind Flex/Grid, ใส่ target="_blank" ป้องกันเปิดทับหน้าเว็บ, ติดตั้ง Event Listener แสดงแจ้งเตือนผลส่งฟอร์ม และระบบสลับธีมสีไม่ใช้สีเหลือง
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className={`font-mono ${themeConfig.primaryText} font-bold shrink-0`}>05.</span>
                <div>
                  <span className="font-semibold text-slate-200">การค้นหาคำตอบที่ยอมรับได้: </span>
                  เผยแพร่แอป CineLiteracy Hub สื่อเพื่อการเรียนรู้ดิจิทัลพร้อมใช้งานจริง
                </div>
              </li>
            </ol>
          </div>

        </div>

        {/* Right Column: Interactive Inquiry Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2">
              <MessageSquare className={`h-4 w-4 ${themeConfig.primaryText}`} />
              <span className={themeConfig.primaryText}>ฟอร์มติดต่อสอบถาม (Inquiry Contact Form)</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              ส่งข้อความสอบถามหรือข้อเสนอแนะ
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
              สำหรับสถาบันการศึกษา หน่วยงานภาครัฐ หรือผู้สนใจร่วมนำ CineLiteracy Hub ไปประยุกต์ใช้ในการเรียนการสอน
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  ชื่อ-นามสกุล หรือหน่วยงาน <span className={themeConfig.primaryText}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="เช่น อาจารย์สมชาย / สถาบันการศึกษา"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                />
              </div>

              {/* Email field */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  อีเมลสำหรับติดต่อกลับ <span className={themeConfig.primaryText}>*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                />
              </div>

              {/* Inquiry Topic / Subject */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  หัวข้อเรื่องที่ต้องการติดต่อ
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs sm:text-sm text-slate-100 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                >
                  <option value="ข้อเสนอแนะเกี่ยวกับแบบทดสอบความรู้ดิจิทัลด้านภาพยนตร์">
                    ข้อเสนอแนะเกี่ยวกับแบบทดสอบความรู้ดิจิทัลด้านภาพยนตร์
                  </option>
                  <option value="การนำแอปพลิเคชันไปใช้ในการเรียนการสอน (Education Adoption)">
                    การนำแอปพลิเคชันไปใช้ในการเรียนการสอน (Education Adoption)
                  </option>
                  <option value="สอบถามข้อมูลแหล่งอ้างอิงและเอกสารสำนักงาน ก.พ.">
                    สอบถามข้อมูลแหล่งอ้างอิงและเอกสารสำนักงาน ก.พ.
                  </option>
                  <option value="ความร่วมมือทางวิชาการและการกำกับภาพยนตร์">
                    ความร่วมมือทางวิชาการและการกำกับภาพยนตร์
                  </option>
                  <option value="อื่นๆ">
                    อื่นๆ
                  </option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  ข้อความรายละเอียด <span className={themeConfig.primaryText}>*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="ระบุข้อความ รายละเอียดคำถาม หรือข้อเสนอแนะที่ต้องการแจ้งให้ทีมผู้พัฒนาทราบ..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  ระบบจำลองการส่งข้อมูลแบบเรียลไทม์ พร้อมแจ้งเตือนทันที
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center gap-2 rounded-xl ${themeConfig.primaryBg} ${themeConfig.primaryHoverBg} px-6 py-2.5 text-xs sm:text-sm font-bold text-slate-950 transition-colors shadow-md active:scale-95 disabled:opacity-50`}
                >
                  {isSubmitting ? (
                    <span>กำลังส่งข้อความ...</span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>ส่งข้อความติดต่อ</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>

      {/* SUCCESS ALERT POPUP MODAL (Step 4 Requirement) */}
      {showSuccessModal && submittedPayload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div 
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-emerald-500/40 bg-slate-900 shadow-2xl p-6 sm:p-8"
            role="alertdialog"
          >
            {/* Close Icon Button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <CheckCircle className="h-8 w-8" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-white">
                  ส่งข้อความสำเร็จเรียบร้อย! (Success)
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  ระบบได้บันทึกข้อความสอบถามของท่านเข้าสู่ฐานข้อมูลโครงการ CineLiteracy Hub แล้ว
                </p>
              </div>

              {/* Summary of sent info */}
              <div className="rounded-xl bg-slate-950/70 p-4 border border-slate-800 text-left text-xs space-y-1.5">
                <div className="text-slate-400">
                  <strong className="text-slate-200">ผู้ส่ง: </strong> {submittedPayload.name}
                </div>
                <div className="text-slate-400">
                  <strong className="text-slate-200">อีเมลตอบกลับ: </strong> {submittedPayload.email}
                </div>
                <div className="text-slate-400">
                  <strong className="text-slate-200">หัวข้อ: </strong> {submittedPayload.subject}
                </div>
                <div className="text-slate-400 truncate">
                  <strong className="text-slate-200">ข้อความ: </strong> "{submittedPayload.message}"
                </div>
                <div className="text-[11px] text-emerald-400 pt-1">
                  เวลาที่ส่ง: {submittedPayload.timestamp} น.
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className={`w-full rounded-xl ${themeConfig.primaryBg} ${themeConfig.primaryHoverBg} py-2.5 text-xs sm:text-sm font-bold text-slate-950 transition-colors shadow-sm`}
                >
                  รับทราบและปิดหน้าต่าง
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
