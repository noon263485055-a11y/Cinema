/**
 * Resilient Image Fallback Utilities for Cross-Platform Deployment (GitHub, Vercel, Netlify)
 * Guarantees that images never show broken icons or fail to render.
 */

// Fallback 1: Cinematic Hero Visual SVG (Data URI)
export const FALLBACK_HERO_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="100%" height="100%">
  <defs>
    <linearGradient id="heroBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0f1d"/>
      <stop offset="50%" stop-color="#050811"/>
      <stop offset="100%" stop-color="#020408"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#05D9E8" stop-opacity="0.3"/>
      <stop offset="60%" stop-color="#FF2A6D" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <pattern id="filmHoles" width="40" height="20" patternUnits="userSpaceOnUse">
      <rect x="5" y="4" width="20" height="12" rx="3" fill="#ffffff" fill-opacity="0.12"/>
    </pattern>
  </defs>
  
  <rect width="100%" height="100%" fill="url(#heroBg)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  
  <!-- Film Strip Borders -->
  <rect x="0" y="0" width="100%" height="24" fill="#000000" fill-opacity="0.8"/>
  <rect x="0" y="4" width="100%" height="16" fill="url(#filmHoles)"/>
  <rect x="0" y="651" width="100%" height="24" fill="#000000" fill-opacity="0.8"/>
  <rect x="0" y="655" width="100%" height="16" fill="url(#filmHoles)"/>
  
  <!-- Central Clapperboard & Film Camera Illustration -->
  <g transform="translate(600, 310)" text-anchor="middle">
    <!-- Camera Silhouette -->
    <rect x="-140" y="-120" width="280" height="190" rx="16" fill="#131c2e" stroke="#05D9E8" stroke-width="4"/>
    <circle cx="0" cy="-25" r="55" fill="#0b111c" stroke="#FF2A6D" stroke-width="4"/>
    <circle cx="0" cy="-25" r="30" fill="#05D9E8" fill-opacity="0.25"/>
    <circle cx="0" cy="-25" r="14" fill="#05D9E8"/>
    
    <!-- Film Reels on Top -->
    <circle cx="-60" cy="-145" r="45" fill="#1e293b" stroke="#05D9E8" stroke-width="3"/>
    <circle cx="60" cy="-145" r="45" fill="#1e293b" stroke="#FF2A6D" stroke-width="3"/>
    <circle cx="-60" cy="-145" r="12" fill="#020408"/>
    <circle cx="60" cy="-145" r="12" fill="#020408"/>
    
    <!-- Viewfinder -->
    <polygon points="140,-50 200,-90 200,40 140,0" fill="#1e293b" stroke="#05D9E8" stroke-width="3"/>
    
    <!-- Titles -->
    <text y="125" font-family="'Prompt', sans-serif" font-size="34" font-weight="bold" fill="#ffffff" letter-spacing="2">
      CineLiteracy Hub
    </text>
    <text y="165" font-family="'Prompt', sans-serif" font-size="20" fill="#05D9E8" letter-spacing="1">
      รู้เท่าทันสื่อภาพยนตร์ในยุคดิจิทัล · Digital Film Literacy
    </text>
  </g>
</svg>
`)}`;

// Fallback 2: Developer Profile Avatar SVG (Data URI)
export const FALLBACK_DEV_AVATAR = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0891b2"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" rx="32" fill="url(#avatarGrad)"/>
  <circle cx="200" cy="150" r="65" fill="#ffffff" fill-opacity="0.9"/>
  <path d="M 100 320 C 100 240, 300 240, 300 320 Z" fill="#ffffff" fill-opacity="0.9"/>
  <circle cx="200" cy="150" r="60" fill="#e0f2fe"/>
  <!-- Clapperboard mini badge -->
  <g transform="translate(200, 230)">
    <rect x="-45" y="-15" width="90" height="30" rx="6" fill="#0f172a" stroke="#06b6d4" stroke-width="2"/>
    <text y="6" font-family="sans-serif" font-size="12" font-weight="bold" fill="#06b6d4" text-anchor="middle">
      CREATOR
    </text>
  </g>
</svg>
`)}`;

// Fallback 3: Achievement Badge SVG (Data URI)
export const FALLBACK_BADGE_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="badgeGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFD700" stop-opacity="0.4"/>
      <stop offset="70%" stop-color="#05D9E8" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="goldPlate" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#854d0e"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" rx="36" fill="#080c16"/>
  <circle cx="250" cy="250" r="230" fill="url(#badgeGlow)"/>
  <polygon points="250,50 300,160 420,170 330,250 360,370 250,300 140,370 170,250 80,170 200,160" fill="url(#goldPlate)" stroke="#fef08a" stroke-width="4"/>
  <circle cx="250" cy="235" r="75" fill="#0f172a" stroke="#05D9E8" stroke-width="4"/>
  
  <!-- Film icon inside badge -->
  <g transform="translate(250, 235)">
    <rect x="-35" y="-25" width="70" height="50" rx="8" fill="#1e293b" stroke="#FF2A6D" stroke-width="3"/>
    <circle cx="-15" cy="0" r="10" fill="#05D9E8"/>
    <circle cx="15" cy="0" r="10" fill="#05D9E8"/>
  </g>
  
  <text x="250" y="440" font-family="'Prompt', sans-serif" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">
    CINELITERACY MASTER
  </text>
  <text x="250" y="470" font-family="'Prompt', sans-serif" font-size="14" fill="#05D9E8" text-anchor="middle">
    CERTIFIED DIGITAL LITERACY
  </text>
</svg>
`)}`;

/**
 * Handle image error gracefully with fallback URLs
 */
export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackSrc: string) {
  const target = e.currentTarget;
  if (target.src !== fallbackSrc) {
    target.src = fallbackSrc;
  }
}
