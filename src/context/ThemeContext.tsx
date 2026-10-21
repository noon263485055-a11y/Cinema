import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeColor = 'cyan' | 'violet' | 'rose' | 'emerald' | 'sky';

export interface ThemeConfig {
  id: ThemeColor;
  name: string;
  englishName: string;
  primaryText: string;
  primaryBg: string;
  primaryHoverBg: string;
  borderPrimary: string;
  glowColor: string;
  badgeBg: string;
  gradientText: string;
  accentHex: string;
}

export const THEMES: Record<ThemeColor, ThemeConfig> = {
  cyan: {
    id: 'cyan',
    name: 'Cyber Cyan',
    englishName: 'Modern Sci-Fi & Prestige',
    primaryText: 'text-cyan-400',
    primaryBg: 'bg-cyan-500',
    primaryHoverBg: 'hover:bg-cyan-400',
    borderPrimary: 'border-cyan-500/40',
    glowColor: 'shadow-cyan-500/20',
    badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    gradientText: 'from-cyan-400 via-sky-300 to-blue-400',
    accentHex: '#06b6d4',
  },
  violet: {
    id: 'violet',
    name: 'Auteur Violet',
    englishName: 'Cannes & Art Cinema',
    primaryText: 'text-violet-400',
    primaryBg: 'bg-violet-500',
    primaryHoverBg: 'hover:bg-violet-400',
    borderPrimary: 'border-violet-500/40',
    glowColor: 'shadow-violet-500/20',
    badgeBg: 'bg-violet-500/10 text-violet-300 border-violet-500/30',
    gradientText: 'from-violet-400 via-fuchsia-300 to-indigo-400',
    accentHex: '#8b5cf6',
  },
  rose: {
    id: 'rose',
    name: 'Crimson Red Carpet',
    englishName: 'Cinema Premiere',
    primaryText: 'text-rose-400',
    primaryBg: 'bg-rose-500',
    primaryHoverBg: 'hover:bg-rose-400',
    borderPrimary: 'border-rose-500/40',
    glowColor: 'shadow-rose-500/20',
    badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    gradientText: 'from-rose-400 via-pink-300 to-red-400',
    accentHex: '#f43f5e',
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Matrix',
    englishName: 'Analog & Indie Reel',
    primaryText: 'text-emerald-400',
    primaryBg: 'bg-emerald-500',
    primaryHoverBg: 'hover:bg-emerald-400',
    borderPrimary: 'border-emerald-500/40',
    glowColor: 'shadow-emerald-500/20',
    badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    gradientText: 'from-emerald-400 via-teal-300 to-green-400',
    accentHex: '#10b981',
  },
  sky: {
    id: 'sky',
    name: 'Electric Cobalt',
    englishName: 'Blockbuster Studio',
    primaryText: 'text-sky-400',
    primaryBg: 'bg-sky-500',
    primaryHoverBg: 'hover:bg-sky-400',
    borderPrimary: 'border-sky-500/40',
    glowColor: 'shadow-sky-500/20',
    badgeBg: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
    gradientText: 'from-sky-400 via-blue-300 to-indigo-400',
    accentHex: '#0284c7',
  },
};

interface ThemeContextType {
  currentTheme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
  themeConfig: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'cyan',
  setTheme: () => {},
  themeConfig: THEMES.cyan,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentThemeState] = useState<ThemeColor>(() => {
    try {
      const saved = localStorage.getItem('cineliteracy_theme');
      if (saved && saved in THEMES) {
        return saved as ThemeColor;
      }
    } catch (e) {
      // ignore
    }
    return 'cyan'; // Default non-yellow beautiful cyan!
  });

  const setTheme = (theme: ThemeColor) => {
    setCurrentThemeState(theme);
    try {
      localStorage.setItem('cineliteracy_theme', theme);
    } catch (e) {
      // ignore
    }
  };

  const themeConfig = THEMES[currentTheme] || THEMES.cyan;

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themeConfig }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
