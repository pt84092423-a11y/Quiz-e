import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, BookOpen, Clock, Zap, User, ArrowRight } from 'lucide-react';
import { useGetLeaderboard } from '@workspace/api-client-react';
import ThemePicker from '../components/ThemePicker';
import { useTheme } from '../contexts/ThemeContext';

interface StartScreenProps {
  onStart: (playerName: string) => void;
  onLeaderboard: () => void;
}

export default function StartScreen({ onStart, onLeaderboard }: StartScreenProps) {
  const [step, setStep] = useState<'home' | 'name'>('home');
  const [name, setName] = useState('');
  const { theme } = useTheme();

  const { data: leaderboard } = useGetLeaderboard({ limit: 1 });
  const topScore = leaderboard?.[0];

  const handleSubmitName = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onStart(trimmed);
  };

  const isNeon = theme === 'neon';

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center relative overflow-hidden">
      {/* Theme-specific decorative overlays */}
      {theme === 'cosmic' && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[5%] left-[8%] w-72 h-72 rounded-full bg-violet-600/8 blur-[80px] animate-float" />
          <div className="absolute bottom-[10%] right-[5%] w-96 h-96 rounded-full bg-blue-500/8 blur-[100px] animate-float-delayed" />
        </div>
      )}
      {theme === 'neon' && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[10%] left-[15%] w-48 h-1 bg-pink-500/40 blur-[3px] rotate-12 animate-neon-pulse" />
          <div className="absolute top-[85%] right-[10%] w-32 h-0.5 bg-cyan-400/50 blur-[2px] -rotate-6 animate-neon-pulse-2" />
        </div>
      )}

      {/* Grid pattern - cosmic only */}
      {theme === 'cosmic' && (
        <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`, backgroundSize: '60px 60px' }}
        />
      )}

      <motion.div
        className="relative z-10 flex flex-col items-center w-full max-w-md px-4 py-8"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className={`mb-5 px-5 py-1.5 rounded-full glass text-xs font-bold uppercase tracking-widest glow-primary ${isNeon ? 'border-pink-500/30 text-pink-400' : theme === 'aurora' ? 'border-emerald-500/30 text-emerald-400' : 'border-violet-500/30 text-violet-300'}`}
          style={{ border: '1px solid' }}
        >
          Địa Lí Lớp 10 — Học Kỳ 2
        </motion.div>

        {/* Main card */}
        <div className={`glass-strong rounded-3xl p-7 w-full flex flex-col items-center shadow-2xl ${isNeon ? 'neon-bracket' : ''}`}>

          {/* Animated icon */}
          <motion.div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 relative"
            style={{ background: 'var(--btn-gradient)', boxShadow: 'var(--btn-glow)' }}
            animate={{ boxShadow: ['var(--btn-glow)', 'var(--btn-glow)', 'var(--btn-glow)'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <BookOpen className="w-10 h-10 text-white drop-shadow-lg" />
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl font-black tracking-tight text-center mb-1">
            <span className="gradient-text glow-text-primary">Quiz Địa Lí</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium tracking-wide text-center mb-6">
            Ôn thi Cuối Học Kỳ 2
          </p>

          {/* Theme picker */}
          <ThemePicker />

          <AnimatePresence mode="wait">
            {step === 'home' ? (
              <motion.div key="home" className="w-full flex flex-col items-center"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.22 }}
              >
                {/* Stats */}
                <div className="flex items-center justify-center gap-6 mb-6 w-full">
                  {[
                    { icon: <BookOpen className="w-4 h-4" />, value: '37', label: 'câu hỏi' },
                    { icon: <Clock className="w-4 h-4" />, value: '20s', label: 'mỗi câu' },
                    { icon: <Zap className="w-4 h-4" />, value: '2', label: 'loại câu' },
                  ].map((stat, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
                      className="flex flex-col items-center gap-1"
                    >
                      <span className="text-primary/70">{stat.icon}</span>
                      <span className="text-xl font-black text-foreground">{stat.value}</span>
                      <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Top score banner */}
                {topScore && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    className="w-full mb-5 py-2.5 px-4 rounded-xl flex items-center gap-3"
                    style={{ background: 'rgba(255,200,0,0.07)', border: '1px solid rgba(255,200,0,0.2)' }}
                  >
                    <Trophy className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span className="text-xs text-muted-foreground flex-1">
                      Dẫn đầu: <span className="text-foreground font-bold">{topScore.playerName}</span>
                    </span>
                    <span className="text-yellow-400 font-black text-lg tabular-nums">{topScore.score.toLocaleString()}</span>
                  </motion.div>
                )}

                {/* Start button */}
                <motion.button
                  data-testid="button-start-quiz"
                  onClick={() => setStep('name')}
                  className="w-full py-4 rounded-2xl text-lg font-black btn-primary mb-4"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                >
                  Bắt đầu Quiz
                </motion.button>

                <button data-testid="button-leaderboard" onClick={onLeaderboard}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-semibold"
                >
                  <Trophy className="w-4 h-4" />
                  Xem bảng xếp hạng
                </button>
              </motion.div>
            ) : (
              <motion.div key="name" className="w-full flex flex-col items-center"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.22 }}
              >
                <div className="w-full mb-5">
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 text-center">
                    Tên của bạn
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    <input
                      data-testid="input-player-name"
                      type="text" value={name}
                      onChange={e => setName(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSubmitName()}
                      placeholder="Nhập tên để lưu điểm..."
                      maxLength={30} autoFocus
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/15 outline-none text-foreground placeholder:text-muted-foreground font-semibold text-base transition-all"
                    />
                  </div>
                  <p className="text-center text-[11px] text-muted-foreground mt-2">
                    Tên sẽ hiển thị trên bảng xếp hạng toàn cầu
                  </p>
                </div>

                <motion.button
                  data-testid="button-confirm-name"
                  onClick={handleSubmitName}
                  disabled={!name.trim()}
                  className="w-full py-4 rounded-2xl font-black text-lg btn-primary disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
                  whileHover={name.trim() ? { scale: 1.02 } : {}}
                  whileTap={name.trim() ? { scale: 0.97 } : {}}
                >
                  Bắt đầu ngay
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <button data-testid="button-back-home" onClick={() => setStep('home')}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                >
                  Quay lại
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
