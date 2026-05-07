import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, BookOpen, Clock, Zap, User, ArrowRight } from 'lucide-react';
import { useGetLeaderboard } from '@workspace/api-client-react';

interface StartScreenProps {
  onStart: (playerName: string) => void;
  onLeaderboard: () => void;
}

export default function StartScreen({ onStart, onLeaderboard }: StartScreenProps) {
  const [step, setStep] = useState<'home' | 'name'>('home');
  const [name, setName] = useState('');

  const { data: leaderboard } = useGetLeaderboard({ limit: 1 });
  const topScore = leaderboard?.[0];

  const handleSubmitName = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onStart(trimmed);
  };

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center relative overflow-hidden bg-background">
      {/* Decorative floating orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[5%] left-[8%] w-72 h-72 rounded-full bg-primary/10 blur-[90px] animate-float" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 rounded-full bg-secondary/12 blur-[100px] animate-float-delayed" />
        <div className="absolute top-[45%] right-[20%] w-48 h-48 rounded-full bg-primary/6 blur-[70px] animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center w-full max-w-md px-4"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-6 px-4 py-1.5 rounded-full glass border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest glow-primary"
        >
          Địa Lí Lớp 10 — HK2
        </motion.div>

        {/* Card */}
        <div className="glass-strong rounded-3xl p-8 w-full flex flex-col items-center shadow-2xl">
          <motion.div
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(0,229,255,0.3)]"
            animate={{ boxShadow: ['0 0 30px rgba(0,229,255,0.25)', '0 0 50px rgba(0,229,255,0.45)', '0 0 30px rgba(0,229,255,0.25)'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <BookOpen className="w-10 h-10 text-white drop-shadow-md" />
          </motion.div>

          <h1 className="text-4xl font-black tracking-tight text-center mb-1">
            <span className="gradient-text glow-text-primary">Quiz Địa Lí</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium tracking-wide text-center mb-8">
            Ôn thi Cuối Học Kỳ 2
          </p>

          <AnimatePresence mode="wait">
            {step === 'home' ? (
              <motion.div
                key="home"
                className="w-full flex flex-col items-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {/* Stats */}
                <div className="flex items-center justify-center gap-6 mb-8 w-full">
                  {[
                    { icon: <BookOpen className="w-4 h-4" />, value: '37', label: 'câu hỏi' },
                    { icon: <Clock className="w-4 h-4" />, value: '20s', label: 'mỗi câu' },
                    { icon: <Zap className="w-4 h-4" />, value: '2', label: 'loại câu' },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex flex-col items-center gap-1"
                    >
                      <span className="text-primary/70">{stat.icon}</span>
                      <span className="text-xl font-black text-foreground">{stat.value}</span>
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{stat.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Top score */}
                {topScore && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="w-full mb-5 py-2.5 px-4 rounded-xl bg-yellow-500/10 border border-yellow-500/25 flex items-center gap-3"
                  >
                    <Trophy className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span className="text-xs text-muted-foreground flex-1">
                      Dẫn đầu: <span className="text-foreground font-bold">{topScore.playerName}</span>
                    </span>
                    <span className="text-yellow-400 font-black text-lg tabular-nums">{topScore.score.toLocaleString()}</span>
                  </motion.div>
                )}

                <motion.button
                  data-testid="button-start-quiz"
                  onClick={() => setStep('name')}
                  className="w-full py-4 rounded-2xl font-black text-lg text-background bg-gradient-to-r from-primary to-cyan-300 hover:brightness-110 transition-all duration-200 shadow-[0_0_32px_rgba(0,229,255,0.35)] active:scale-[0.97]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Bắt đầu Quiz
                </motion.button>

                <button
                  data-testid="button-leaderboard"
                  onClick={onLeaderboard}
                  className="mt-4 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                >
                  <Trophy className="w-4 h-4" />
                  Xem bảng xếp hạng
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="name"
                className="w-full flex flex-col items-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="w-full mb-6">
                  <label className="block text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                    Tên của bạn
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    <input
                      data-testid="input-player-name"
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSubmitName()}
                      placeholder="Nhập tên để lưu điểm..."
                      maxLength={30}
                      autoFocus
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/6 border border-white/12 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 outline-none text-foreground placeholder:text-muted-foreground font-semibold text-base transition-all"
                    />
                  </div>
                  <p className="text-center text-xs text-muted-foreground mt-2">
                    Tên sẽ hiển thị trên bảng xếp hạng toàn cầu
                  </p>
                </div>

                <motion.button
                  data-testid="button-confirm-name"
                  onClick={handleSubmitName}
                  disabled={!name.trim()}
                  className="w-full py-4 rounded-2xl font-black text-lg text-background bg-gradient-to-r from-primary to-cyan-300 hover:brightness-110 transition-all duration-200 shadow-[0_0_32px_rgba(0,229,255,0.35)] active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={name.trim() ? { scale: 1.02 } : {}}
                  whileTap={name.trim() ? { scale: 0.97 } : {}}
                >
                  Bắt đầu ngay
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <button
                  data-testid="button-back-home"
                  onClick={() => setStep('home')}
                  className="mt-4 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
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
