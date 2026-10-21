import React, { useState } from 'react';
import { Camera, Sun, Eye, Compass, Layers, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';
import { cineAudio } from '../utils/audioSystem';

export type CameraAngle = 'low' | 'eye' | 'high';
export type ColorMood = 'warm' | 'cold' | 'noir';

export const InteractiveBiasLab: React.FC = () => {
  const [angle, setAngle] = useState<CameraAngle>('eye');
  const [colorMood, setColorMood] = useState<ColorMood>('warm');
  const [showRuleGrid, setShowRuleGrid] = useState<boolean>(true);

  const handleAngleChange = (newAngle: CameraAngle) => {
    setAngle(newAngle);
    cineAudio.playProjectorWhirr();
  };

  const handleMoodChange = (newMood: ColorMood) => {
    setColorMood(newMood);
    cineAudio.playSlateClap();
  };

  // Theoretical Analysis Data
  const angleAnalysis = {
    low: {
      name: 'มุมมองเงย (Low Angle Shot)',
      psychology: 'ตัวละครดู "ทรงอำนาจ ยิ่งใหญ่ น่าเกรงขาม หรือคุกคาม"',
      manipulationNote: 'มักใช้ในภาพยนตร์โฆษณาชวนเชื่อ (Propaganda) หรือการสัมภาษณ์บุคคลสำคัญ เพื่อโน้มน้าวให้ผู้ชมรู้สึกว่าบุคคลนั้นมีความเหนือกว่าและน่าเลื่อมใส',
      biasRisk: 'ชี้นำให้ผู้ชมยอมรับความเห็นของผู้พูดโดยไม่กล้าตั้งคำถาม (Authority Bias)',
      tiltDegrees: -14,
      scale: 1.15,
      yOffset: -22,
    },
    eye: {
      name: 'มุมมองระดับสายตา (Eye-Level Shot)',
      psychology: 'สร้างความรู้สึก "เท่าเทียม สมจริง เป็นกลาง และเข้าถึงง่าย"',
      manipulationNote: 'มุมมองมาตรฐานของภาพยนตร์สารคดีที่ต้องการสร้างความน่าเชื่อถือ วางผู้ชมไว้ในระนาบเดียวกับตัวละคร',
      biasRisk: 'อาจสร้างภาพลวงตาของ "ความจริงแท้ไร้อคติ" ทั้งที่เนื้อหาอาจถูกตัดต่อบิดเบือนมาแล้ว',
      tiltDegrees: 0,
      scale: 1.0,
      yOffset: 0,
    },
    high: {
      name: 'มุมมองกดก้ม (High Angle Shot)',
      psychology: 'ตัวละครดู "เปราะบาง อ่อนแอ โดดเดี่ยว ไร้อำนาจ หรือตกเป็นเหยื่อ"',
      manipulationNote: 'ใช้ในการนำเสนอตัวละครที่ถูกกดขี่หรือผู้ที่กำลังตกที่นั่งลำบาก เพื่อเร้าความเห็นอกเห็นใจ (Pathos) จากผู้ชมอย่างรวดเร็ว',
      biasRisk: 'ลดทอนศักดิ์ศรีของบุคคลในข่าว และกระตุ้นให้ผู้ชมเกิดอคติสงสารจนละเลยข้อเท็จจริง',
      tiltDegrees: 12,
      scale: 0.88,
      yOffset: 26,
    },
  };

  const moodAnalysis = {
    warm: {
      name: 'โทนอุ่น (Warm Golden / Amber)',
      symbolism: 'ความอบอุ่น ความหลังอันแสนหวาน ความหวัง หรือความเป็นมนุษย์',
      filterCss: 'sepia(0.4) saturate(1.4) hue-rotate(-15deg)',
      bgGradient: 'from-[#3a200a]/60 via-[#1f1307]/50 to-[#0d0d0d]',
      subtextColor: '#FFD700',
    },
    cold: {
      name: 'โทนเย็น (Cold Cyber / Teal-Cyan)',
      symbolism: 'ความเย็นชา เทคโนโลยี ความโดดเดี่ยว ลึกลับ หรืออันตรายจากไซเบอร์',
      filterCss: 'saturate(1.2) hue-rotate(160deg) contrast(1.15)',
      bgGradient: 'from-[#052b36]/60 via-[#031820]/50 to-[#0d0d0d]',
      subtextColor: '#05D9E8',
    },
    noir: {
      name: 'โทนนัวร์ดรามาติก (Dramatic Noir / High Contrast B&W)',
      symbolism: 'ความขัดแย้งทางศีลธรรม ความลับดำมืด อาชญากรรม และความตึงเครียด',
      filterCss: 'grayscale(1) contrast(1.6) brightness(0.9)',
      bgGradient: 'from-[#222]/80 via-[#111]/70 to-[#0a0a0a]',
      subtextColor: '#FF2A6D',
    },
  };

  const currentAngle = angleAnalysis[angle];
  const currentMood = moodAnalysis[colorMood];

  return (
    <div className="rounded-3xl border-2 border-[#FFD700]/30 bg-[#111] p-6 sm:p-8 shadow-[0_0_30px_rgba(0,0,0,0.8)] space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FF2A6D] mb-1">
            <Sparkles className="h-4 w-4" />
            <span>Interactive Framing & Bias Lab</span>
            <span className="text-slate-600">·</span>
            <span>ห้องทดลองมุมกล้องและอคติ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-['Cinzel',serif]">
            การประกอบสร้างความจริงผ่านเลนส์กล้อง
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            ทดลองปรับมุมกล้องและอุณหภูมิสี เพื่อสังเกตว่าเทคนิคทางภาพยนตร์ชี้นำจิตวิทยาผู้ชม 
            และสร้าง "ข้อความแฝง (Subtext)" ที่อาจนำไปสู่อคติในสื่อได้อย่างไร
          </p>
        </div>

        <button
          onClick={() => setShowRuleGrid(!showRuleGrid)}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold border transition-colors self-start md:self-auto ${
            showRuleGrid
              ? 'bg-[#FFD700]/10 border-[#FFD700] text-[#FFD700]'
              : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>{showRuleGrid ? 'ซ่อนเส้นสามส่วน (GRID: ON)' : 'แสดงเส้นสามส่วน (GRID: OFF)'}</span>
        </button>
      </div>

      {/* Main Sandbox: Viewport vs Analysis Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Simulated Cinema Screen Viewport */}
        <div className="lg:col-span-7 space-y-3">
          <div className="relative w-full aspect-video rounded-2xl border-2 border-[#FFD700]/40 bg-black overflow-hidden shadow-2xl flex items-center justify-center">
            
            {/* Viewfinder HUD Overlays */}
            <div className="absolute top-3 left-4 right-4 z-30 flex items-center justify-between text-[11px] font-mono text-slate-300 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF2A6D] animate-ping" />
                <span className="text-white font-bold">BIAS_SIMULATOR · 24 FPS</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-[#05D9E8] font-bold">ANGLE: {angle.toUpperCase()}</span>
                <span className="text-[#FFD700] font-bold">MOOD: {colorMood.toUpperCase()}</span>
              </div>
            </div>

            {/* Rule of Thirds Grid */}
            {showRuleGrid && (
              <div className="absolute inset-0 z-20 grid grid-cols-3 grid-rows-3 pointer-events-none">
                <div className="border-r border-b border-[#05D9E8]/30" />
                <div className="border-r border-b border-[#05D9E8]/30" />
                <div className="border-b border-[#05D9E8]/30" />
                <div className="border-r border-b border-[#05D9E8]/30" />
                <div className="border-r border-b border-[#05D9E8]/30" />
                <div className="border-b border-[#05D9E8]/30" />
                <div className="border-r border-[#05D9E8]/30" />
                <div className="border-r border-[#05D9E8]/30" />
                <div />
              </div>
            )}

            {/* Live Filter Ambient Backdrop */}
            <div 
              className={`absolute inset-0 bg-gradient-to-b ${currentMood.bgGradient} transition-all duration-700 pointer-events-none z-10`}
            />

            {/* Character & Scene Geometry */}
            <div 
              className="relative z-10 transition-all duration-700 ease-out flex flex-col items-center select-none"
              style={{
                filter: currentMood.filterCss,
                transform: `scale(${currentAngle.scale}) rotate(${currentAngle.tiltDegrees}deg) translateY(${currentAngle.yOffset}px)`,
              }}
            >
              {/* Silhouette Character */}
              <div className="relative flex flex-col items-center">
                {/* Character Head */}
                <div className="h-20 w-16 sm:h-24 sm:w-20 rounded-3xl bg-gradient-to-b from-slate-200 to-slate-400 shadow-2xl border-2 border-white/50 relative flex items-center justify-center">
                  <div className="flex gap-4 mt-1">
                    <div className="h-2 w-2 rounded-full bg-slate-900" />
                    <div className="h-2 w-2 rounded-full bg-slate-900" />
                  </div>
                </div>

                {/* Body / Suit */}
                <div className="h-28 w-32 sm:h-36 sm:w-40 bg-gradient-to-b from-slate-800 to-slate-950 rounded-t-[36px] shadow-2xl border-t border-white/20 mt-1 relative flex items-center justify-center">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-4">
                    [SUBJECT]
                  </div>
                </div>
              </div>

              {/* Background Props for context */}
              <div className="absolute -bottom-6 w-72 flex justify-between text-[11px] font-mono text-slate-500 opacity-60">
                <span>[ARCHIVE FILE]</span>
                <span>[BROADCAST MIC]</span>
              </div>
            </div>

            {/* Viewfinder Crosshair */}
            <div className="absolute z-30 pointer-events-none w-8 h-8 flex items-center justify-center opacity-60">
              <div className="w-5 h-0.5 bg-[#FFD700]" />
              <div className="absolute h-5 w-0.5 bg-[#FFD700]" />
            </div>

            {/* Bottom Screen Bar */}
            <div className="absolute bottom-3 left-4 right-4 z-30 flex items-center justify-between text-[10px] font-mono text-slate-400 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10">
              <span>SHUTTER: 1/50</span>
              <span>ISO: 640</span>
              <span className="text-[#FF2A6D] font-bold">PSYCHOLOGICAL IMPACT: {currentAngle.name}</span>
            </div>

          </div>

          <div className="text-[11px] text-slate-400 font-mono text-center">
            * สังเกตการเปลี่ยนระนาบมุมมองและโทนแสงที่ส่งผลโดยตรงต่อการตีความของสมองมนุษย์
          </div>
        </div>

        {/* Right: Interactive Console & Media Literacy Breakdown */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Controls: Angle & Mood */}
          <div className="rounded-2xl bg-black/60 border border-slate-800 p-4 space-y-4">
            
            {/* 1. Camera Angle Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300">
                <span className="flex items-center gap-1.5 text-[#05D9E8]">
                  <Camera className="h-4 w-4" /> 1. ปรับมุมมองกล้อง (Camera Angle)
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'low', label: 'มุมเงย (Low)', desc: 'ทรงอำนาจ' },
                  { id: 'eye', label: 'ระดับสายตา (Eye)', desc: 'เป็นกลาง' },
                  { id: 'high', label: 'มุมก้ม (High)', desc: 'เปราะบาง' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleAngleChange(item.id as CameraAngle)}
                    className={`p-2 rounded-xl text-xs font-bold transition-all text-center border ${
                      angle === item.id
                        ? 'bg-[#05D9E8] text-black border-[#05D9E8] shadow-[0_0_12px_rgba(5,217,232,0.4)]'
                        : 'bg-[#151515] border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>{item.label}</div>
                    <div className="text-[10px] font-normal opacity-80">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Color Mood Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300">
                <span className="flex items-center gap-1.5 text-[#FFD700]">
                  <Sun className="h-4 w-4" /> 2. ปรับอุณหภูมิสี (Color Grading)
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'warm', label: 'โทนอุ่น (Warm)', desc: 'อบอุ่น/อดีต' },
                  { id: 'cold', label: 'โทนเย็น (Cyber)', desc: 'โดดเดี่ยว/ภัย' },
                  { id: 'noir', label: 'ฟิล์มนัวร์ (Noir)', desc: 'ตึงเครียด' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMoodChange(item.id as ColorMood)}
                    className={`p-2 rounded-xl text-xs font-bold transition-all text-center border ${
                      colorMood === item.id
                        ? 'bg-[#FFD700] text-black border-[#FFD700] shadow-[0_0_12px_rgba(255,215,0,0.4)]'
                        : 'bg-[#151515] border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>{item.label}</div>
                    <div className="text-[10px] font-normal opacity-80">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Real-time Subtext Analysis Box */}
          <div className="rounded-2xl bg-gradient-to-b from-[#181818] to-[#121212] border-2 border-[#FF2A6D]/40 p-5 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <span className="text-xs font-mono font-bold text-[#FF2A6D] flex items-center gap-1.5">
                <Eye className="h-4 w-4" /> บทวิเคราะห์ข้อความแฝง (Subtext Analysis)
              </span>
              <span className="text-[10px] font-mono text-slate-400">REAL-TIME CRITIQUE</span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <strong className="text-white block mb-0.5">ผลทางจิตวิทยาต่อผู้ชม:</strong>
                <p className="text-slate-300 leading-relaxed">{currentAngle.psychology}</p>
              </div>

              <div>
                <strong className="text-white block mb-0.5">การชี้นำความรู้สึก (Manipulation Technique):</strong>
                <p className="text-slate-300 leading-relaxed">{currentAngle.manipulationNote}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#260e16] border border-[#FF2A6D]/30 text-rose-200">
                <div className="flex items-center gap-1.5 font-bold mb-1 text-[#FF2A6D]">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>ความเสี่ยงด้านอคติ (Bias Alert):</span>
                </div>
                <p className="text-[11px] leading-relaxed">{currentAngle.biasRisk}</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
