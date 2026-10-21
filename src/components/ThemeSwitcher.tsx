import React from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme, THEMES, ThemeColor } from '../context/ThemeContext';

export const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setTheme, themeConfig } = useTheme();

  return (
    <div className="flex items-center gap-2 rounded-xl bg-slate-900/90 border border-slate-800 p-1.5 shadow-sm">
      <div className="flex items-center gap-1.5 px-2 text-xs font-medium text-slate-400">
        <Palette className={`h-3.5 w-3.5 ${themeConfig.primaryText}`} />
        <span className="hidden md:inline">ธีมสี:</span>
      </div>

      <div className="flex items-center gap-1">
        {(Object.keys(THEMES) as ThemeColor[]).map((key) => {
          const item = THEMES[key];
          const isSelected = currentTheme === key;

          return (
            <button
              key={key}
              onClick={() => setTheme(key)}
              title={`${item.name} (${item.englishName})`}
              className={`group relative flex h-7 w-7 items-center justify-center rounded-lg transition-all ${
                isSelected
                  ? 'ring-2 ring-white/80 scale-105 shadow-md'
                  : 'hover:scale-105 opacity-80 hover:opacity-100'
              }`}
              style={{ backgroundColor: item.accentHex }}
            >
              {isSelected && (
                <Check className="h-3.5 w-3.5 text-slate-950 stroke-[3]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
