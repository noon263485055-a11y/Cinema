import React, { useState, useRef } from 'react';
import { 
  Clapperboard, 
  Camera, 
  Sun, 
  Eye, 
  Compass, 
  Maximize2, 
  RotateCw, 
  Sparkles, 
  Layers, 
  Volume2, 
  Play, 
  Square, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Grid,
  Palette
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const DirectorLabModule: React.FC = () => {
  const { themeConfig } = useTheme();

  // Clapperboard State
  const [sceneNo, setSceneNo] = useState<number>(1);
  const [takeNo, setTakeNo] = useState<number>(1);
  const [directorStatus, setDirectorStatus] = useState<'idle' | 'rolling' | 'action' | 'cut'>('idle');
  const [isClapping, setIsClapping] = useState<boolean>(false);

  // Viewfinder State
  const [shotSize, setShotSize] = useState<'EWS' | 'WS' | 'MS' | 'CU' | 'ECU' | 'DUTCH'>('MS');
  const [cameraAngle, setCameraAngle] = useState<'eye' | 'low' | 'high' | 'birds'>('eye');
  const [showGrid, setShowGrid] = useState<boolean>(true);

  // Lighting Setup State (Three-Point Lighting)
  const [keyLight, setKeyLight] = useState<boolean>(true);
  const [fillLight, setFillLight] = useState<boolean>(true);
  const [backLight, setBackLight] = useState<boolean>(true);
  const [colorGrade, setColorGrade] = useState<'cinema' | 'noir' | 'cyber' | 'warm'>('cinema');

  // 180 Degree Rule Interactive State
  const [crossAxis, setCrossAxis] = useState<boolean>(false);

  // Audio synthesizer for authentic clapperboard sound without external asset dependencies
  const playClapSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // Sharp impulse clap
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      // Audio fallback silent
    }
  };

  const handleTriggerAction = () => {
    setIsClapping(true);
    playClapSound();
    setDirectorStatus('rolling');

    setTimeout(() => {
      setIsClapping(false);
      setDirectorStatus('action');
    }, 400);
  };

  const handleTriggerCut = () => {
    setDirectorStatus('cut');
    setTakeNo(prev => prev + 1);
  };

  // Shot descriptions & Directing rationale
  const shotDetails = {
    EWS: {
      title: 'Extreme Wide Shot (EWS) - ทัศนียภาพกว้างสุด',
      directingNote: 'ใช้เป็น Establishing Shot เพื่อสร้างโลกของภาพยนตร์ บอกเวลา สถานที่ และความรู้สึกเวิ้งว้างหรือโดดเดี่ยวของตัวละคร',
      scale: 0.35,
      tilt: 0,
    },
    WS: {
      title: 'Wide Shot (WS) - ภาพมุมกว้างเห็นเต็มตัว',
      directingNote: 'เห็นตัวละครตั้งแต่ศีรษะจรดปลายเท้า และตำแหน่งความสัมพันธ์กับสิ่งแวดล้อมรอบตัว (Mise-en-scène)',
      scale: 0.6,
      tilt: 0,
    },
    MS: {
      title: 'Medium Shot (MS) - ภาพระดับเอว/อก (ช็อตมาตรฐาน)',
      directingNote: 'ขนาดภาพที่นิยมที่สุดสำหรับฉากสนทนา ให้ผู้ชมเห็นภาษากาย การเคลื่อนไหวของมือ พร้อมกับสีหน้าชัดเจน',
      scale: 1.0,
      tilt: 0,
    },
    CU: {
      title: 'Close-Up (CU) - ภาพระยะใกล้เน้นใบหน้า',
      directingNote: 'ดึงดูดอารมณ์ผู้ชมเข้าสู่จิตใจของตัวละคร สะท้อนความกดดัน ความรัก หรือความลับที่ไม่ต้องเอ่ยคำพูด',
      scale: 1.6,
      tilt: 0,
    },
    ECU: {
      title: 'Extreme Close-Up (ECU) - ระยะใกล้มาก (แววตา/สิ่งของสำคัญ)',
      directingNote: 'เน้นรายละเอียดที่ทรงพลัง เช่น แววตาสั่นระริก เข็มนาฬิกา หรือรหัสดิจิทัล สร้างความตื่นเต้นสูงสุด',
      scale: 2.3,
      tilt: 0,
    },
    DUTCH: {
      title: 'Dutch Angle / Canted Shot - มุมกล้องเอียง',
      directingNote: 'เอียงระนาบกล้อง 15-25 องศา สื่อถึงความบิดเบี้ยวทางจิตใจ ความไม่ปลอดภัย หรือโลกที่กำลังสูญเสียสมดุล',
      scale: 1.1,
      tilt: -18,
    },
  };

  const currentShot = shotDetails[shotSize];

  return (
    <div className="mx-auto w-full max-w-7xl px-3.5 py-6 sm:px-6 sm:py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-1.5 text-cyan-400">
            <Sparkles className="h-4 w-4" />
            <span>ห้องปฏิบัติการจำลองการกำกับภาพยนตร์</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Director's Studio & Masterclass</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            วิธีการกำกับภาพยนตร์เชิงโต้ตอบ (Interactive Directing Lab)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            ทดลองจัดองค์ประกอบภาพ มุมกล้อง การจัดแสง 3 จุด (Three-Point Lighting) และเรียนรู้กฎ 180 องศา 
            ผ่านสเตจจำลองของผู้กำกับภาพยนตร์เสมือนจริง พร้อมระบบสั่ง Action และสเลทเสียงเอฟเฟกต์
          </p>
        </div>

        {/* Status Chip */}
        <div className="flex items-center gap-2 self-start md:self-auto rounded-xl bg-slate-900 border border-slate-800 p-2 text-xs">
          <span className="text-slate-400">สถานะกองถ่าย:</span>
          <span className={`font-bold uppercase tracking-wider ${
            directorStatus === 'action' ? 'text-emerald-400 animate-pulse' :
            directorStatus === 'rolling' ? 'text-cyan-400' :
            directorStatus === 'cut' ? 'text-rose-400' : 'text-slate-300'
          }`}>
            {directorStatus === 'idle' && '● STANDBY (เตรียมพร้อม)'}
            {directorStatus === 'rolling' && '● ROLLING CAMERA'}
            {directorStatus === 'action' && '▶ ACTION! (กำลังบันทึกภาพ)'}
            {directorStatus === 'cut' && '■ CUT! (คัท-ตรวจเช็ก)'}
          </span>
        </div>
      </div>

      {/* Grid: 2 Zones - Live Viewfinder & Director Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT / TOP: The Virtual Director's Viewfinder (Canvas Frame) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-800 bg-slate-950 shadow-2xl">
            
            {/* Viewfinder Overlay Header */}
            <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${
                  directorStatus === 'action' ? 'bg-rose-500 animate-ping' : 'bg-slate-600'
                }`} />
                <span className="font-bold text-white">REC 4K RAW · 24 FPS</span>
              </div>
              <div className="flex items-center gap-3">
                <span>SCENE {sceneNo}</span>
                <span>TAKE {takeNo}</span>
                <span className="text-cyan-400">{shotSize}</span>
              </div>
            </div>

            {/* Virtual Scene Viewport */}
            <div className="relative w-full aspect-[16/9] overflow-hidden flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
              
              {/* Color grading filter layer */}
              <div className={`absolute inset-0 z-10 pointer-events-none transition-all duration-500 ${
                colorGrade === 'noir' ? 'backdrop-grayscale contrast-150' :
                colorGrade === 'cyber' ? 'backdrop-hue-rotate-90 contrast-125' :
                colorGrade === 'warm' ? 'backdrop-sepia-[0.35] brightness-105' :
                ''
              }`} />

              {/* Three-Point Lighting Ambience Simulation */}
              <div 
                className={`absolute inset-0 pointer-events-none transition-opacity duration-500 z-10 ${
                  keyLight ? 'opacity-100' : 'opacity-20'
                }`}
                style={{
                  background: 'radial-gradient(circle at 25% 30%, rgba(255, 240, 220, 0.45) 0%, transparent 60%)'
                }}
              />
              <div 
                className={`absolute inset-0 pointer-events-none transition-opacity duration-500 z-10 ${
                  fillLight ? 'opacity-80' : 'opacity-10'
                }`}
                style={{
                  background: 'radial-gradient(circle at 75% 45%, rgba(180, 220, 255, 0.35) 0%, transparent 55%)'
                }}
              />
              <div 
                className={`absolute inset-0 pointer-events-none transition-opacity duration-500 z-10 ${
                  backLight ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  background: 'radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.3) 0%, transparent 40%)'
                }}
              />

              {/* Rule of Thirds Grid Overlay */}
              {showGrid && (
                <div className="absolute inset-0 z-20 grid grid-cols-3 grid-rows-3 pointer-events-none border border-cyan-500/20">
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
              )}

              {/* Cinematic Character and Set Geometry */}
              <div 
                className="transition-all duration-700 ease-out flex items-center justify-center flex-col select-none"
                style={{
                  transform: `scale(${currentShot.scale}) rotate(${currentShot.tilt}deg) translateY(${
                    cameraAngle === 'low' ? '-24px' : cameraAngle === 'high' ? '28px' : '0px'
                  })`,
                }}
              >
                {/* Visual Actor Silhouette & Cinematic Mise-en-scène */}
                <div className="relative flex flex-col items-center">
                  
                  {/* Rim light glow around head */}
                  {backLight && (
                    <div className="absolute -top-3 w-28 h-28 rounded-full bg-cyan-400/20 blur-md pointer-events-none" />
                  )}

                  {/* Character Head */}
                  <div className="w-20 h-24 rounded-3xl bg-gradient-to-b from-slate-200 to-slate-400 shadow-xl border-2 border-slate-300 relative flex items-center justify-center">
                    {/* Eyes */}
                    <div className="flex gap-4 mt-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                    </div>
                    {/* Shadow from lighting */}
                    {!fillLight && (
                      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-slate-950/60 rounded-r-3xl pointer-events-none" />
                    )}
                  </div>

                  {/* Character Body / Coat */}
                  <div className="w-36 h-40 bg-gradient-to-b from-slate-700 to-slate-900 rounded-t-[40px] mt-2 shadow-2xl relative border-t border-slate-500">
                    {!fillLight && (
                      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-slate-950/70 rounded-tr-[40px] pointer-events-none" />
                    )}
                  </div>

                  {/* Environment details for Wide Shots */}
                  {shotSize === 'EWS' && (
                    <div className="absolute -bottom-8 flex gap-28 text-slate-600 text-xs font-mono">
                      <span>[BUILDING A]</span>
                      <span>[NEON STREET]</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Camera Crosshair Center Marker */}
              <div className="absolute z-20 pointer-events-none w-8 h-8 flex items-center justify-center">
                <div className="w-4 h-0.5 bg-cyan-400/60" />
                <div className="absolute h-4 w-0.5 bg-cyan-400/60" />
              </div>

              {/* Viewfinder Bottom Status */}
              <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-[11px] font-mono text-slate-300 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
                <div className="flex items-center gap-3">
                  <span>ISO 800</span>
                  <span>SHUTTER 1/48</span>
                  <span>T2.0 50MM</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                  <Compass className="h-3 w-3" />
                  <span>มุม: {cameraAngle.toUpperCase()} LEVEL</span>
                </div>
              </div>

            </div>

          </div>

          {/* Directing Theory Callout for Selected Shot */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Camera className="h-4 w-4 text-cyan-400" />
                <span>{currentShot.title}</span>
              </h4>
              <span className="text-[11px] text-cyan-400 font-mono">ทฤษฎีการกำกับ</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentShot.directingNote}
            </p>
          </div>

        </div>

        {/* RIGHT: Director Console & Interactive Controls ("ลูกเล่น") */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 1. Interactive Clapperboard Widget */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                <Clapperboard className="h-4 w-4" />
                <span>สเลทสั่งการผู้กำกับ (Director's Slate)</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">ระบบเสียงสมจริง</span>
            </div>

            {/* Slate Graphic Animation */}
            <div className="relative overflow-hidden rounded-xl border-2 border-slate-700 bg-slate-950 p-3.5 select-none">
              
              {/* Clapper Hinge Sticks */}
              <div 
                className={`flex h-6 w-full rounded border border-slate-700 bg-repeat-x transition-transform duration-200 origin-bottom-left ${
                  isClapping ? 'rotate-[-16deg]' : 'rotate-0'
                }`}
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #1e293b, #1e293b 15px, #f8fafc 15px, #f8fafc 30px)'
                }}
              />

              {/* Slate Slate Fields */}
              <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">SCENE</span>
                  <span className="text-base font-bold text-white">{sceneNo}</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">TAKE</span>
                  <span className="text-base font-bold text-cyan-400">{takeNo}</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">ROLL</span>
                  <span className="text-base font-bold text-white">A1</span>
                </div>
              </div>

              <div className="mt-2 text-center text-[11px] text-slate-400 font-mono">
                PROD: CINELITERACY · DIR: THAI AUTEUR
              </div>
            </div>

            {/* Slate Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={handleTriggerAction}
                disabled={directorStatus === 'action'}
                className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition-colors shadow-md active:scale-95 disabled:opacity-50"
              >
                <Play className="h-4 w-4 fill-current" />
                <span>สั่ง Action! 🎬</span>
              </button>

              <button
                onClick={handleTriggerCut}
                disabled={directorStatus !== 'action'}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 py-2.5 text-xs sm:text-sm font-semibold text-rose-300 hover:bg-rose-950/40 hover:border-rose-700 transition-colors active:scale-95 disabled:opacity-40"
              >
                <Square className="h-4 w-4 fill-current" />
                <span>สั่ง Cut! ✂️</span>
              </button>
            </div>
          </div>

          {/* 2. Shot Framing Controls (ขนาดภาพ) */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider block">
                เลือกขนาดภาพ (Shot Size)
              </span>
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`text-[11px] px-2 py-0.5 rounded border transition-colors flex items-center gap-1 ${
                  showGrid ? 'border-cyan-500 text-cyan-300 bg-cyan-950/40' : 'border-slate-800 text-slate-500'
                }`}
              >
                <Grid className="h-3 w-3" />
                <span>เส้นสามส่วน</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(['EWS', 'WS', 'MS', 'CU', 'ECU', 'DUTCH'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setShotSize(size)}
                  className={`rounded-lg py-2 px-2 text-xs font-medium transition-all text-center ${
                    shotSize === size
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm scale-102'
                      : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Camera Angle Controls (มุมมองกล้อง) */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-3">
            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider block">
              มุมกล้องและจิตวิทยาการมอง (Camera Angle)
            </span>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setCameraAngle('eye')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  cameraAngle === 'eye' 
                    ? 'border-cyan-400 bg-cyan-950/30 text-white font-semibold' 
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="block text-cyan-400 font-bold">ระดับสายตา (Eye-level)</span>
                <span className="text-[11px] text-slate-400">เป็นกลาง สมจริง เข้าถึงง่าย</span>
              </button>

              <button
                onClick={() => setCameraAngle('low')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  cameraAngle === 'low' 
                    ? 'border-cyan-400 bg-cyan-950/30 text-white font-semibold' 
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="block text-cyan-400 font-bold">มุมเงย (Low Angle)</span>
                <span className="text-[11px] text-slate-400">ทรงอำนาจ ยิ่งใหญ่ น่าเกรงขาม</span>
              </button>

              <button
                onClick={() => setCameraAngle('high')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  cameraAngle === 'high' 
                    ? 'border-cyan-400 bg-cyan-950/30 text-white font-semibold' 
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="block text-cyan-400 font-bold">มุมก้ม (High Angle)</span>
                <span className="text-[11px] text-slate-400">เปราะบาง ไร้ทางสู้ ถูกกดดัน</span>
              </button>

              <button
                onClick={() => setCameraAngle('birds')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  cameraAngle === 'birds' 
                    ? 'border-cyan-400 bg-cyan-950/30 text-white font-semibold' 
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="block text-cyan-400 font-bold">Bird's Eye View</span>
                <span className="text-[11px] text-slate-400">มุมมองพระเจ้า เห็นโชคชะตา</span>
              </button>
            </div>
          </div>

          {/* 4. Three-Point Lighting Simulator (การจัดแสง 3 จุด) */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-3">
            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider block">
              การจัดแสง 3 จุด (Three-Point Lighting Studio)
            </span>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                onClick={() => setKeyLight(!keyLight)}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  keyLight
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300 font-bold'
                    : 'border-slate-800 bg-slate-950 text-slate-500'
                }`}
              >
                <Sun className="h-4 w-4 mx-auto mb-1 text-cyan-400" />
                <span>Key Light</span>
                <span className="block text-[10px] text-slate-400 font-light mt-0.5">แสงสว่างหลัก</span>
              </button>

              <button
                onClick={() => setFillLight(!fillLight)}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  fillLight
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300 font-bold'
                    : 'border-slate-800 bg-slate-950 text-slate-500'
                }`}
              >
                <Sun className="h-4 w-4 mx-auto mb-1 text-blue-400" />
                <span>Fill Light</span>
                <span className="block text-[10px] text-slate-400 font-light mt-0.5">ลบเงาเข้ม</span>
              </button>

              <button
                onClick={() => setBackLight(!backLight)}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  backLight
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300 font-bold'
                    : 'border-slate-800 bg-slate-950 text-slate-500'
                }`}
              >
                <Sun className="h-4 w-4 mx-auto mb-1 text-indigo-300" />
                <span>Back Light</span>
                <span className="block text-[10px] text-slate-400 font-light mt-0.5">สร้างมิติขอบ</span>
              </button>
            </div>

            {/* Color grading mood */}
            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <span>โทนสีภาพ (Color Grade):</span>
              <div className="flex gap-1.5">
                {[
                  { id: 'cinema', label: 'Cinema' },
                  { id: 'noir', label: 'Noir B&W' },
                  { id: 'cyber', label: 'Cyber' },
                  { id: 'warm', label: 'Golden' },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setColorGrade(g.id as any)}
                    className={`px-2 py-1 rounded text-[11px] transition-colors ${
                      colorGrade === g.id
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-950 hover:bg-slate-800 text-slate-400'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 5. The 180-Degree Rule Masterclass */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider block">
                กฎ 180 องศา (The 180-Degree Rule)
              </span>
              <button
                onClick={() => setCrossAxis(!crossAxis)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                  crossAxis
                    ? 'border-rose-500 text-rose-300 bg-rose-950/40 font-bold'
                    : 'border-emerald-500 text-emerald-300 bg-emerald-950/40 font-bold'
                }`}
              >
                {crossAxis ? '⚠️ กำลังฝ่ากฎ (ข้ามแกนสายตา)' : '✓ ถูกต้องตามแกน (Axis)'}
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {crossAxis ? (
                <span className="text-rose-300">
                  <strong>ข้อผิดพลาด:</strong> เมื่อตั้งกล้องข้ามเส้นสายตา (Crossing the Line) ตัวละครทั้งสองจะหันหน้าไปในทิศทางเดียวกัน ทำให้ผู้ชมสับสนว่าใครกำลังพูดกับใคร!
                </span>
              ) : (
                <span>
                  <strong>หลักการกำกับ:</strong> กล้องต้องอยู่ฝั่งเดียวกันของเส้นแกนสายตาเสมอ (Axis of Action) เพื่อรักษาทิศทางการมอง (Eyeline match) ให้ตัวละครหันหน้าเข้าหากันอย่างเป็นธรรมชาติ
                </span>
              )}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
