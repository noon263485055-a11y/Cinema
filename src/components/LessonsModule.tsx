import React, { useState, useEffect } from 'react';
import { 
  Film, 
  Video, 
  Camera, 
  Sliders, 
  Tv, 
  Share2, 
  Clapperboard, 
  Sun, 
  Mic, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  Maximize2,
  Eye,
  Info
} from 'lucide-react';
import { cineAudio } from '../utils/audioSystem';

interface LessonsModuleProps {
  initialRoll?: 'types' | 'angles' | 'equipment';
}

export const LessonsModule: React.FC<LessonsModuleProps> = ({ initialRoll = 'types' }) => {
  const [activeFilmRoll, setActiveFilmRoll] = useState<'types' | 'angles' | 'equipment'>(initialRoll);
  const [activeMediaType, setActiveMediaType] = useState<'doc' | 'commercial' | 'social' | 'narrative'>('doc');
  const [activeAngle, setActiveAngle] = useState<'ECU' | 'CU' | 'MS' | 'WS' | 'OTS' | 'DUTCH'>('MS');
  const [activeEquipment, setActiveEquipment] = useState<'camera' | 'slate' | 'lighting' | 'audio'>('camera');
  const [isRolling, setIsRolling] = useState<boolean>(false);

  useEffect(() => {
    if (initialRoll) {
      setActiveFilmRoll(initialRoll);
    }
  }, [initialRoll]);

  const handleSwitchRoll = (roll: 'types' | 'angles' | 'equipment') => {
    setIsRolling(true);
    cineAudio.playProjectorWhirr();
    setActiveFilmRoll(roll);
    setTimeout(() => setIsRolling(false), 500);
  };

  // 1. Film Media Types Data
  const mediaTypes = {
    doc: {
      title: 'ภาพยนตร์สารคดี (Documentary Film)',
      subtitle: 'ความจริงกับการจัดวางมุมมอง (Constructed Reality & Ethics)',
      accent: '#05D9E8',
      purpose: 'บันทึกและสืบสวนข้อเท็จจริงทางสังคม ประวัติศาสตร์ หรือวิทยาศาสตร์',
      characteristics: [
        'ใช้บุคคลจริง สถานที่จริง และฟุตเทจบันทึกเหตุการณ์จริง (Archival Footage)',
        'แม้จะอ้างอิงความจริง แต่ยังคงผ่านการตัดต่อและเรียงร้อยตามมุมมองของผู้กำกับ (Subjective Framing)',
        'ทักษะการรู้เท่าทัน: ต้องตรวจสอบความน่าเชื่อถือของแหล่งข่าว และแยกแยะระหว่างหลักฐานเชิงประจักษ์กับความเห็นของผู้สร้าง'
      ],
      caseStudy: 'สารคดีสืบสวนสิ่งแวดล้อมที่ใช้ดนตรีเร้าอารมณ์เพื่อชี้นำให้ผู้ชมตัดสินว่าองค์กรใดเป็นฝ่ายผิดทันทีก่อนการตัดสินของศาล'
    },
    commercial: {
      title: 'ภาพยนตร์โฆษณา (Commercial & Brand Film)',
      subtitle: 'เทคนิคการโน้มน้าวใจและจิตวิทยาผู้บริโภค (Persuasive Psychology)',
      accent: '#FF2A6D',
      purpose: 'กระตุ้นอารมณ์ความต้องการ สร้างภาพลักษณ์แบรนด์ และเร้าให้เกิดการซื้อหรือยอมรับค่านิยม',
      characteristics: [
        'ใช้เวลาสั้น (15-60 วินาที) แต่มีอัตราความหนาแน่นของการชี้นำทางจิตวิทยาสูงสุด',
        'ใช้ทฤษฎีสี (Color Psychology) และการคัดเลือกนักแสดงเพื่อสะท้อนความสมบูรณ์แบบที่เกินจริง (Idealized Lifestyle)',
        'ทักษะการรู้เท่าทัน: ตระหนักว่าโฆษณาไม่ได้บอกข้อจำกัดของสินค้า และมักเล่นกับความกลัว (FOMO) หรือความปรารถนาในการยอมรับ'
      ],
      caseStudy: 'โฆษณาเครื่องดื่มเพื่อสุขภาพที่ใช้แสงนุ่มโทนเช้าตรู่และดนตรีอบอุ่นเพื่อเชื่อมโยงความสุขในครอบครัวเข้ากับผลิตภัณฑ์'
    },
    social: {
      title: 'คลิปสั้นโซเชียลมีเดีย (Short-Form Video / TikTok / Reels)',
      subtitle: 'ความรวดเร็ว อัลกอริทึม และความเสี่ยงต่อการหลอกลวง (Instant Gratification & Deepfake)',
      accent: '#FFD700',
      purpose: 'ดึงดูดความสนใจใน 3 วินาทีแรก (Hook) และสร้างยอดการมีส่วนร่วม (Engagement / Shares)',
      characteristics: [
        'ตัดต่อด้วยจังหวะฉับไว (Jump Cuts) กระตุ้นสารโดปามีนในสมองตลอดเวลา',
        'มีความเสี่ยงสูงที่จะตัดคลิปออกจากบริบทดั้งเดิม (Out-of-context clipping) หรือใช้เสียงสังเคราะห์ AI',
        'ทักษะการรู้เท่าทัน: อย่าด่วนสรุปความจริงจากคลิปความยาว 15 วินาทีเพียงคลิปเดียว ควรค้นหาคลิปฉบับเต็มเพื่อดูบริบท'
      ],
      caseStudy: 'คลิปตัดต่อการให้สัมภาษณ์ของนักการเมืองที่ตัดเอาเฉพาะคำพูดผิดพลาดเพียง 3 วินาทีจนเกิดกระแสวิพากษ์วิจารณ์รุนแรง'
    },
    narrative: {
      title: 'ภาพยนตร์บันเทิงคดี (Feature Narrative Cinema)',
      subtitle: 'การเล่าเรื่องเพื่อสะท้อนคุณค่ามนุษย์ (Dramatic Storytelling & Catharsis)',
      accent: '#9d4edd',
      purpose: 'สร้างความบันเทิง ปลุกเร้าอารมณ์ร่วม และกระตุ้นให้ผู้ชมขบคิดเกี่ยวกับคุณค่าและปรัชญาชีวิต',
      characteristics: [
        'ใช้โครงสร้าง 3 องก์ (Three-Act Structure) การพัฒนาตัวละคร และการคลี่คลายปมขัดแย้ง',
        'ใช้สัญญะและภาพเปรียบเปรย (Visual Metaphor) ในการสื่อสารประเด็นทางสังคมอย่างแยบยล',
        'ทักษะการรู้เท่าทัน: เข้าใจว่าภาพยนตร์สะท้อนบริบททางสังคมและอุดมการณ์ของผู้สร้างในยุคสมัยนั้นๆ'
      ],
      caseStudy: 'ภาพยนตร์ไซไฟที่ใช้ฉากจำลองโลกอนาคตเพื่อวิพากษ์วิจารณ์ความเหลื่อมล้ำทางชนชั้นในปัจจุบัน'
    }
  };

  // 2. Camera Angles Data with Comparison Scale
  const cameraAngles = {
    ECU: {
      name: 'Extreme Close-Up (ECU)',
      thai: 'ภาพระยะใกล้มาก (แววตา/สิ่งของสำคัญ)',
      scale: 2.2,
      yOffset: -12,
      rotation: 0,
      function: 'ขยายรายละเอียดที่มองไม่เห็นด้วยตาเปล่าในระยะปกติ เช่น แววตาสั่นระริก หยาดเหงื่อ หรือเข็มนาฬิกา',
      subtext: 'สร้างความตึงเครียดสูงสุด (Suspense) และบังคับให้ผู้ชมจับจ้องความลับของตัวละคร',
      example: 'ฉากสืบสวนคดีที่กล้องโคลสอัพไปที่รูม่านตาของผู้ต้องหาขณะกำลังพูดโกหก'
    },
    CU: {
      name: 'Close-Up (CU)',
      thai: 'ภาพระยะใกล้เน้นใบหน้า',
      scale: 1.5,
      yOffset: -6,
      rotation: 0,
      function: 'ครอบคลุมตั้งแต่คางถึงหน้าผาก เน้นการถ่ายทอดอารมณ์ความรู้สึกผ่านสีหน้าอย่างชัดเจน',
      subtext: 'สร้างความผูกพันและเห็นอกเห็นใจ (Empathy) ราวกับผู้ชมกำลังสบตากับตัวละครโดยตรง',
      example: 'ตัวละครเอกกำลังจะตัดสินใจเรื่องคอขาดบาดตายโดยไม่เอ่ยคำพูดใดๆ'
    },
    MS: {
      name: 'Medium Shot (MS)',
      thai: 'ภาพขนาดปานกลาง (ระดับเอว/อก)',
      scale: 1.0,
      yOffset: 0,
      rotation: 0,
      function: 'ขนาดภาพมาตรฐานที่เห็นทั้งภาษากาย การเคลื่อนไหวของมือ และสีหน้าพร้อมกัน',
      subtext: 'ให้ความรู้สึกสมจริง เหมือนเรากำลังยืนร่วมวงสนทนากับตัวละครในระยะปกติ',
      example: 'ฉากสองตัวละครกำลังโต้เถียงกันในห้องทำงาน'
    },
    WS: {
      name: 'Wide Shot (WS)',
      thai: 'ภาพมุมกว้างเห็นตัวละครเต็มตัว',
      scale: 0.6,
      yOffset: 16,
      rotation: 0,
      function: 'แสดงตัวละครตั้งแต่ศีรษะจรดปลายเท้า และตำแหน่งความสัมพันธ์กับสิ่งแวดล้อมรอบตัว',
      subtext: 'บอกบริบทของสถานที่ หรือสื่อถึงความโดดเดี่ยวของตัวละครท่ามกลางโลกกว้างใหญ่',
      example: 'ตัวละครยืนอยู่กลางทะเลทรายหรือเมืองร้าง'
    },
    OTS: {
      name: 'Over-the-Shoulder (OTS)',
      thai: 'ภาพมุมมองข้ามไหล่',
      scale: 1.15,
      yOffset: 0,
      rotation: 0,
      function: 'วางไหล่หรือแผ่นหลังของตัวละครหนึ่งไว้ในโฟร์กราวด์ เพื่อถ่ายทอดใบหน้าของอีกคนหนึ่ง',
      subtext: 'สร้างมิติความสัมพันธ์และรักษาทิศทางสายตา (Eye-line) ระหว่างสองบุคคลในบทสนทนา',
      example: 'การเจรจาระหว่างตำรวจกับคนร้ายที่โต๊ะสอบสวน'
    },
    DUTCH: {
      name: 'Dutch Angle / Canted Shot',
      thai: 'มุมกล้องเอียงระนาบ',
      scale: 1.05,
      yOffset: 0,
      rotation: -18,
      function: 'เอียงระนาบเส้นขอบฟ้า 15-25 องศา ทำให้โลกในภาพดูไม่ตั้งตรง',
      subtext: 'สื่อถึงความไม่มั่นคงทางอารมณ์ ความกดดัน สภาพจิตใจบิดเบี้ยว หรือสถานการณ์กำลังเข้าสู่วิกฤต',
      example: 'ตัวละครกำลังเมายา สับสน หรือตระหนักว่าตนเองกำลังถูกล้อม'
    }
  };

  // 3. Filmmaking Equipment Data
  const equipmentList = {
    camera: {
      name: 'กล้องถ่ายภาพยนตร์ดิจิทัล (Digital Cinema Camera)',
      role: 'หัวใจสำคัญในการบันทึกสัญญาณภาพด้วยความเที่ยงตรงสูง',
      icon: <Camera className="h-6 w-6 text-cyan-400" />,
      specs: [
        'เซนเซอร์ Full-Frame หรือ Super 35 ให้มิติระยะชัดตื้น (Shallow Depth of Field)',
        'ขอบเขตการรับแสงกว้าง (Dynamic Range 15+ Stops) เพื่อเก็บรายละเอียดในเงามืดและไฮไลต์',
        'บันทึกไฟล์ในรูปแบบ Cinema RAW / ProRes Log เพื่อรองรับการปรับแต่งสีเชิงลึก (Color Grading)'
      ],
      directorTip: 'กล้องที่ดีไม่ได้หมายความว่าภาพจะออกมาดีเสมอไป การจัดวางตำแหน่งเลนส์และมุมกล้องต่างหากที่เป็นภาษาของภาพยนตร์'
    },
    slate: {
      name: 'สเลทกำกับภาพยนตร์ (Production Slate / Clapperboard)',
      role: 'อุปกรณ์เชื่อมประสานภาพและเสียง และบันทึกประวัติการถ่ายทำ',
      icon: <Clapperboard className="h-6 w-6 text-[#FFD700]" />,
      specs: [
        'แท่งไม้ลายขาว-ดำ (Clapper Sticks) ให้เสียงกระทบแหลมคมสำหรับซิงค์เสียงในห้องตัดต่อ',
        'แผงบันทึกข้อมูล: ชื่อเรื่อง (Production), ม้วน (Roll), ฉาก (Scene), เทค (Take), และชื่อผู้กำกับ',
        'Timecode Slate ดิจิทัลสำหรับกองถ่ายระดับโปรดักชันใหญ่'
      ],
      directorTip: 'การสับสเลทเป็นสัญลักษณ์แห่งการเริ่มต้นสมาธิ เมื่อได้ยินเสียง "แคลป!" ทุกคนในกองถ่ายจะเข้าสู่โลกแห่งจินตนาการ'
    },
    lighting: {
      name: 'อุปกรณ์จัดแสงภาพยนตร์ (Cinema Lighting & Grip)',
      role: 'การปั้นแสงเงาเพื่อกำหนดมิติ อารมณ์ และช่วงเวลาของฉาก (Mise-en-scène)',
      icon: <Sun className="h-6 w-6 text-amber-400" />,
      specs: [
        'ไฟสตูดิโอ LED Monolight / HMI Fresnel กำลังวัตต์สูงที่ปรับอุณหภูมิสีได้ (Bi-Color / RGB)',
        'อุปกรณ์ควบคุมแสง: Softbox, Diffuser Silk, Flag และ C-Stand เพื่อตัดหรือกระจายแสง',
        'ระบบจัดแสง 3 จุด (Three-Point Lighting): Key Light, Fill Light, และ Back/Rim Light'
      ],
      directorTip: 'ความมืดสำคัญเท่ากับความสว่าง เงา (Shadow) คือสิ่งที่สร้างความรู้สึกลึกลับและทำให้ภาพมีมิติน่าค้นหา'
    },
    audio: {
      name: 'อุปกรณ์บันทึกเสียงกองถ่าย (Production Audio Gear)',
      role: 'การเก็บบันทึกเสียงบทสนทนาและเสียงบรรยากาศที่คมชัดไร้เสียงรบกวน',
      icon: <Mic className="h-6 w-6 text-rose-400" />,
      specs: [
        'ไมค์บูม (Boom Shotgun Microphone) รับเสียงทิศทางแคบสำหรับจับเสียงพูดจากมุมบน',
        'ไมค์หนีบไร้สาย (Wireless Lavalier Mics) ซ่อนใต้เสื้อผ้าของนักแสดง',
        'เครื่องบันทึกเสียงภาคสนามระบบ 32-bit Float เพื่อป้องกันเสียงแตกเมื่อนักแสดงตะโกน'
      ],
      directorTip: 'ผู้ชมสามารถทนดูภาพที่มีนอยส์ได้ แต่จะทนฟังเสียงที่แตกพร่าหรือฟังไม่รู้เรื่องไม่ได้แม้แต่ 5 วินาที เสียงคือ 50% ของภาพยนตร์'
    }
  };

  const currentMedia = mediaTypes[activeMediaType];
  const currentAngleData = cameraAngles[activeAngle];
  const currentEquip = equipmentList[activeEquipment];

  return (
    <div className="space-y-10">
      
      {/* Module Title Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-1">
            <Sparkles className="h-4 w-4" />
            <span>Motion Graphics Lessons Module</span>
            <span className="text-slate-600">·</span>
            <span>บทเรียนมัลติมีเดียภาพยนตร์</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            คลังบทเรียนม้วนฟิล์ม มุมกล้อง และอุปกรณ์ภาพยนตร์
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            สัมผัสประสบการณ์เรียนรู้ด้วยแอนิเมชันรูปม้วนฟิล์มเคลื่อนไหว (Animated Film Roll Motion Graphics) 
            เจาะลึก 3 หมวดวิชาการรู้เท่าทันสื่อภาพยนตร์
          </p>
        </div>

        <div className="text-xs font-mono text-cyan-300 bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-800 self-start md:self-auto">
          ★ เลือกม้วนฟิล์มเพื่อสลับบทเรียน
        </div>
      </div>

      {/* 3 ANIMATED FILM ROLL SELECTION STRIP (Motion Graphics Carousel) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { id: 'types', title: '1. ประเภทสื่อภาพยนตร์', sub: 'สารคดี โฆษณา คลิปสั้น', icon: <Tv className="h-5 w-5" />, rollNum: 'ROLL 01' },
          { id: 'angles', title: '2. มุมกล้อง & การจัดเฟรม', sub: 'ECU, CU, MS, WS, OTS', icon: <Camera className="h-5 w-5" />, rollNum: 'ROLL 02' },
          { id: 'equipment', title: '3. อุปกรณ์การผลิตภาพยนตร์', sub: 'กล้อง สเลท แสง เสียง', icon: <Sliders className="h-5 w-5" />, rollNum: 'ROLL 03' },
        ].map((roll) => {
          const isSelected = activeFilmRoll === roll.id;
          return (
            <button
              key={roll.id}
              onClick={() => handleSwitchRoll(roll.id as any)}
              className={`relative overflow-hidden text-left p-5 rounded-2xl border-2 transition-all group ${
                isSelected
                  ? 'border-cyan-400 bg-[#0e1420] shadow-[0_0_25px_rgba(6,182,212,0.25)] scale-[1.02]'
                  : 'border-slate-800 bg-[#10131a] hover:border-slate-700 hover:bg-[#131822]'
              }`}
            >
              {/* Animated Film Roll Reel Sprocket Teeth */}
              <div className="absolute top-2 left-2 right-2 flex justify-between opacity-30 pointer-events-none">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-1.5 w-2 rounded-xs bg-cyan-400" />
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between mb-3">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                  isSelected ? 'bg-cyan-400/20 text-cyan-300 border-cyan-400/50' : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                  {roll.rollNum}
                </span>

                {/* Rotating Reel Icon */}
                <div className={`h-9 w-9 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 rotate-180 animate-[spin_8s_linear_infinite]'
                    : 'border-slate-700 bg-slate-900 text-slate-400 group-hover:rotate-45'
                }`}>
                  {roll.icon}
                </div>
              </div>

              <h3 className={`text-base font-bold transition-colors ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                {roll.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {roll.sub}
              </p>

              {/* Bottom Film Sprockets */}
              <div className="absolute bottom-2 left-2 right-2 flex justify-between opacity-30 pointer-events-none">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-1.5 w-2 rounded-xs bg-cyan-400" />
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: TYPES OF FILM MEDIA */}
      {activeFilmRoll === 'types' && (
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-[#111622] to-[#0c0f17] p-6 sm:p-8 space-y-6 shadow-xl animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                LESSON 01 · TYPES OF FILM MEDIA
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                ประเภทสื่อภาพยนตร์ & การถอดรหัสความจริง
              </h3>
            </div>
            
            {/* Media Selector Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
              {[
                { id: 'doc', label: 'ภาพยนตร์สารคดี' },
                { id: 'commercial', label: 'ภาพยนตร์โฆษณา' },
                { id: 'social', label: 'คลิปสั้นโซเชียล' },
                { id: 'narrative', label: 'ภาพยนตร์บันเทิงคดี' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveMediaType(tab.id as any);
                    cineAudio.playSlateClap();
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeMediaType === tab.id
                      ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Media Detail Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">
                  วัตถุประสงค์หลักของสื่อ (Primary Objective):
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {currentMedia.title}
                </h4>
                <p className="text-xs sm:text-sm text-cyan-200/90 font-medium mb-3">
                  {currentMedia.subtitle}
                </p>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentMedia.purpose}
                </div>
              </div>

              {/* Characteristics Checklist */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-bold">
                  คุณลักษณะเด่นและการรู้เท่าทัน (Critical Checkpoints):
                </span>
                <div className="space-y-2">
                  {currentMedia.characteristics.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Case Study Box */}
            <div className="lg:col-span-5 rounded-2xl bg-slate-950 border border-slate-800 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
                <Eye className="h-4 w-4" />
                <span>ตัวอย่างกรณีศึกษาจริงในสื่อ (Real Case Study)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentMedia.caseStudy}
              </p>
              <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
                💡 <strong>ข้อคิดสำหรับผู้บริโภคสื่อ:</strong> สื่อภาพยนตร์ทุกชิ้นถูกสร้างขึ้นโดยมี "ผู้เล่าเรื่อง" ที่เลือกสิ่งที่อยากให้เราเห็นและซ่อนสิ่งที่ไม่ต้องการให้เรารู้เสมอ
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: CAMERA ANGLES & FRAMING WITH SIDE-BY-SIDE VISUAL COMPARISON */}
      {activeFilmRoll === 'angles' && (
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-[#111622] to-[#0c0f17] p-6 sm:p-8 space-y-6 shadow-xl animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                LESSON 02 · CAMERA ANGLES & FRAMING
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                มุมกล้อง ขนาดภาพ และจิตวิทยาการมองเห็น
              </h3>
            </div>

            {/* Angle Selector Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
              {(['ECU', 'CU', 'MS', 'WS', 'OTS', 'DUTCH'] as const).map((angleId) => (
                <button
                  key={angleId}
                  onClick={() => {
                    setActiveAngle(angleId);
                    cineAudio.playProjectorWhirr();
                  }}
                  className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all ${
                    activeAngle === angleId
                      ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {angleId}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Visual Comparison Frame */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Viewfinder Screen Simulator */}
            <div className="lg:col-span-7">
              <div className="relative w-full aspect-video rounded-2xl border-2 border-cyan-500/40 bg-black overflow-hidden shadow-2xl flex items-center justify-center">
                
                {/* HUD Overlay */}
                <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between text-[11px] font-mono text-slate-300 bg-black/60 px-3 py-1 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                    <span className="font-bold text-white">ANGLE_VIEWFINDER</span>
                  </div>
                  <span className="text-cyan-400 font-bold">{currentAngleData.name}</span>
                </div>

                {/* Rule of Thirds Lines */}
                <div className="absolute inset-0 z-10 grid grid-cols-3 grid-rows-3 pointer-events-none border border-cyan-500/20">
                  <div className="border-r border-b border-cyan-500/20" />
                  <div className="border-r border-b border-cyan-500/20" />
                  <div className="border-b border-cyan-500/20" />
                  <div className="border-r border-b border-cyan-500/20" />
                  <div className="border-r border-b border-cyan-500/20" />
                  <div className="border-b border-cyan-500/20" />
                  <div className="border-r border-cyan-500/20" />
                  <div className="border-r border-cyan-500/20" />
                  <div />
                </div>

                {/* Subject Graphic Responding to Scale and Angle */}
                <div 
                  className="transition-all duration-500 ease-out flex flex-col items-center select-none"
                  style={{
                    transform: `scale(${currentAngleData.scale}) translateY(${currentAngleData.yOffset}px) rotate(${currentAngleData.rotation}deg)`,
                  }}
                >
                  {/* OTS Shoulder in foreground if OTS */}
                  {activeAngle === 'OTS' && (
                    <div className="absolute -left-12 -bottom-4 w-28 h-32 rounded-t-[50px] bg-slate-900 border-t-2 border-slate-700 shadow-2xl z-30 opacity-90" />
                  )}

                  {/* Character Head */}
                  <div className="w-18 h-22 sm:w-20 sm:h-24 rounded-3xl bg-gradient-to-b from-slate-200 to-slate-400 shadow-2xl border-2 border-white/40 flex items-center justify-center relative">
                    <div className="flex gap-4 mt-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-950" />
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-950" />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="w-32 h-36 sm:w-36 sm:h-40 bg-gradient-to-b from-slate-700 to-slate-950 rounded-t-[36px] mt-1 shadow-2xl relative" />
                </div>

                {/* Viewfinder Bottom Status */}
                <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-[10px] font-mono text-slate-400 bg-black/60 px-3 py-1 rounded-lg border border-white/10">
                  <span>SCALE: {currentAngleData.scale}x</span>
                  <span className="text-cyan-400 font-bold">{currentAngleData.thai}</span>
                </div>
              </div>
            </div>

            {/* Angle Theory Breakdown */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
                  {currentAngleData.name}
                </span>
                <h4 className="text-lg font-bold text-white">
                  {currentAngleData.thai}
                </h4>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-300 block">หน้าที่และการทำงาน (Cinematic Function):</span>
                <p className="text-xs text-slate-400 leading-relaxed">{currentAngleData.function}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 space-y-1">
                <span className="text-[11px] font-bold text-cyan-300 block">ข้อความแฝงทางจิตวิทยา (Subtext):</span>
                <p className="text-xs text-cyan-100 leading-relaxed">{currentAngleData.subtext}</p>
              </div>

              <div className="text-xs text-slate-400">
                <strong className="text-slate-300">ตัวอย่างการใช้งาน: </strong>
                {currentAngleData.example}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SECTION 3: ESSENTIAL FILMMAKING EQUIPMENT */}
      {activeFilmRoll === 'equipment' && (
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-[#111622] to-[#0c0f17] p-6 sm:p-8 space-y-6 shadow-xl animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                LESSON 03 · ESSENTIAL FILMMAKING EQUIPMENT
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                อุปกรณ์สำคัญในการผลิตภาพยนตร์ & บทบาทในกองถ่าย
              </h3>
            </div>

            {/* Equipment Selector Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
              {[
                { id: 'camera', label: 'กล้องดิจิทัล' },
                { id: 'slate', label: 'สเลทภาพยนตร์' },
                { id: 'lighting', label: 'อุปกรณ์จัดแสง' },
                { id: 'audio', label: 'อุปกรณ์บันทึกเสียง' },
              ].map((eq) => (
                <button
                  key={eq.id}
                  onClick={() => {
                    setActiveEquipment(eq.id as any);
                    cineAudio.playSlateClap();
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeEquipment === eq.id
                      ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {eq.label}
                </button>
              ))}
            </div>
          </div>

          {/* Equipment Showcase Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  {currentEquip.icon}
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white">
                    {currentEquip.name}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {currentEquip.role}
                  </p>
                </div>
              </div>

              {/* Specs and Key features */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-bold">
                  คุณสมบัติเชิงเทคนิคที่คนทำสื่อต้องเข้าใจ (Key Specifications):
                </span>
                <div className="space-y-2">
                  {currentEquip.specs.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
                      <span className="font-mono text-cyan-400 font-bold mt-0.5">0{idx + 1}.</span>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Director's Pro Tip */}
            <div className="md:col-span-5 rounded-2xl bg-gradient-to-b from-[#181d28] to-[#121620] border border-cyan-500/30 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase">
                <Clapperboard className="h-4 w-4" />
                <span>คำแนะนำจากผู้กำกับภาพยนตร์ (Director's Insight)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                "{currentEquip.directorTip}"
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                การเข้าใจขีดความสามารถของอุปกรณ์ช่วยให้ผู้ชมสามารถวิเคราะห์ความพยายามในการจัดฉากและเทคนิคการนำเสนอได้อย่างลึกซึ้งยิ่งขึ้น
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
