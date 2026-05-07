import { motion } from 'framer-motion';
import { useTheme, type Theme } from '../contexts/ThemeContext';
import { Check } from 'lucide-react';

const THEMES: {
  id: Theme;
  name: string;
  vi: string;
  desc: string;
  preview: string;
  accent: string;
  dot1: string;
  dot2: string;
}[] = [
  {
    id: 'cosmic',
    name: 'Cosmic',
    vi: 'Vũ Trụ',
    desc: 'Không gian, tinh vân',
    preview: 'from-[#0d0621] via-[#1a0a3d] to-[#050818]',
    accent: 'bg-violet-500',
    dot1: 'bg-violet-500/60',
    dot2: 'bg-blue-400/60',
  },
  {
    id: 'neon',
    name: 'Neon City',
    vi: 'Thành Phố',
    desc: 'Cyberpunk, neon',
    preview: 'from-[#02040a] via-[#060210] to-[#020305]',
    accent: 'bg-pink-500',
    dot1: 'bg-pink-500/60',
    dot2: 'bg-cyan-400/60',
  },
  {
    id: 'aurora',
    name: 'Aurora',
    vi: 'Cực Quang',
    desc: 'Bắc cực, huyền ảo',
    preview: 'from-[#020d0a] via-[#041510] to-[#050c14]',
    accent: 'bg-emerald-400',
    dot1: 'bg-emerald-400/60',
    dot2: 'bg-teal-300/60',
  },
];

export default function ThemePicker() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-full mb-6">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold text-center mb-3">
        Chọn giao diện
      </p>
      <div className="grid grid-cols-3 gap-2">
        {THEMES.map((t, i) => {
          const isActive = theme === t.id;
          return (
            <motion.button
              key={t.id}
              data-testid={`button-theme-${t.id}`}
              onClick={() => setTheme(t.id)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all duration-300 ${
                isActive
                  ? 'border-theme-primary/70 shadow-[0_0_20px_var(--glow-color)] bg-white/8'
                  : 'border-white/8 bg-white/3 hover:border-white/20 hover:bg-white/6'
              }`}
            >
              {/* Mini preview */}
              <div className={`w-full h-10 rounded-xl bg-gradient-to-br ${t.preview} relative overflow-hidden`}>
                <div className={`absolute top-1.5 left-2 w-3 h-3 rounded-full ${t.dot1} blur-[4px]`} />
                <div className={`absolute bottom-1.5 right-2 w-4 h-4 rounded-full ${t.dot2} blur-[5px]`} />
                <div className={`absolute inset-x-0 bottom-0 h-0.5 ${t.accent} opacity-70`} />
              </div>

              {/* Label */}
              <div className="text-center">
                <p className={`text-xs font-black tracking-tight ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {t.vi}
                </p>
                <p className="text-[9px] text-muted-foreground/60 leading-tight">{t.desc}</p>
              </div>

              {/* Active check */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute top-1.5 right-1.5 w-4 h-4 rounded-full ${t.accent} flex items-center justify-center`}
                >
                  <Check className="w-2.5 h-2.5 text-black" strokeWidth={3} />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
