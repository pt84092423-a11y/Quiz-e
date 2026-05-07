import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Flame, Star } from 'lucide-react';
import { Question } from '../hooks/useQuiz';
import { useTheme } from '../contexts/ThemeContext';

interface QuizScreenProps {
  currentQuestion: Question;
  currentIndex: number;
  totalQuestions: number;
  timeRemaining: number;
  score: number;
  streak: number;
  handleAnswer: (answer: string) => void;
  isAnswering: boolean;
  selectedAnswer: string | null;
}

export default function QuizScreen({
  currentQuestion, currentIndex, totalQuestions, timeRemaining,
  score, streak, handleAnswer, isAnswering,
}: QuizScreenProps) {
  const [localSelected, setLocalSelected] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => { setLocalSelected(null); }, [currentQuestion.id]);

  const onSelect = (answer: string) => {
    if (isAnswering) return;
    setLocalSelected(answer);
    handleAnswer(answer);
  };

  const TIMER_MAX = 20;
  const pct = (timeRemaining / TIMER_MAX) * 100;
  const circumference = 2 * Math.PI * 38;

  // Theme-aware timer colors
  const timerColors = {
    cosmic: { ok: '#a78bfa', warn: '#f59e0b', danger: '#ef4444', textOk: 'text-violet-400', textWarn: 'text-yellow-400', textDanger: 'text-red-400' },
    neon:   { ok: '#ec4899', warn: '#f59e0b', danger: '#ef4444', textOk: 'text-pink-400', textWarn: 'text-yellow-400', textDanger: 'text-red-400' },
    aurora: { ok: '#10b981', warn: '#f59e0b', danger: '#ef4444', textOk: 'text-emerald-400', textWarn: 'text-yellow-400', textDanger: 'text-red-400' },
  }[theme];

  let ringColor = timerColors.ok;
  let ringTextColor = timerColors.textOk;
  if (timeRemaining <= 10) { ringColor = timerColors.warn; ringTextColor = timerColors.textWarn; }
  if (timeRemaining <= 5)  { ringColor = timerColors.danger; ringTextColor = timerColors.textDanger; }

  const labels = ['A', 'B', 'C', 'D'];
  const progressPct = (currentIndex / totalQuestions) * 100;

  const isNeon = theme === 'neon';

  return (
    <div className="min-h-[100dvh] w-full flex flex-col">
      {/* Top progress bar */}
      <div className="relative z-20 w-full h-1 bg-white/5">
        <motion.div
          className="h-full"
          style={{ background: 'var(--btn-gradient)' }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between w-full max-w-4xl mx-auto px-4 md:px-8 py-4">
        <div className={`glass-panel px-4 py-2 rounded-full flex items-center gap-2 ${isNeon ? 'border-pink-500/20' : ''}`}>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Câu</span>
          <span className="text-base font-black text-foreground tabular-nums">
            {currentIndex + 1}<span className="text-xs font-normal text-muted-foreground">/{totalQuestions}</span>
          </span>
        </div>

        <AnimatePresence>
          {streak >= 3 && (
            <motion.div key="streak"
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 font-bold text-sm"
            >
              <Flame className="w-4 h-4" />
              {streak} liên tiếp!
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`glass-panel px-4 py-2 rounded-full flex items-center gap-2 ${isNeon ? 'border-cyan-500/20' : ''}`}>
          <Star className="w-3.5 h-3.5 text-primary" />
          <span className="text-lg font-black text-primary tabular-nums">{score.toLocaleString()}</span>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex flex-col items-center w-full max-w-3xl mx-auto px-4 md:px-8 pb-8">

        {/* Timer ring */}
        <div className="relative my-4 w-20 h-20 shrink-0 flex items-center justify-center">
          {timeRemaining <= 5 && (
            <div className="absolute inset-0 rounded-full border-2 border-red-500/40 animate-pulse-ring" />
          )}
          {/* Outer glow ring for neon theme */}
          {isNeon && (
            <div className="absolute inset-0 rounded-full blur-[8px]" style={{ background: `${ringColor}20` }} />
          )}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 84 84">
            <circle cx="42" cy="42" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
            <motion.circle cx="42" cy="42" r="38" fill="none"
              stroke={ringColor} strokeWidth="6" strokeLinecap="round"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset: circumference - (circumference * pct) / 100 }}
              transition={{ duration: 1, ease: 'linear' }}
              style={{ filter: `drop-shadow(0 0 6px ${ringColor})` }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-2xl font-black tabular-nums ${ringTextColor} transition-colors duration-300`}>
              {timeRemaining}
            </span>
          </div>
        </div>

        {/* Question + options */}
        <AnimatePresence mode="wait">
          <motion.div key={currentQuestion.id} className="w-full flex flex-col items-center gap-4"
            initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Type badge */}
            <div className="self-start">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border bg-white/4 text-muted-foreground ${isNeon ? 'border-pink-500/20' : 'border-white/10'}`}>
                {currentQuestion.type === 'multiple_choice' ? 'Trắc nghiệm' : 'Đúng / Sai'}
              </span>
            </div>

            {/* Question card */}
            <div className={`w-full glass-strong rounded-3xl p-6 md:p-8 shadow-2xl ${isNeon ? 'neon-bracket' : ''}`}>
              <p className="text-xl md:text-2xl font-bold leading-relaxed text-center text-foreground">
                {currentQuestion.question}
              </p>
            </div>

            {/* Options */}
            <div className={`w-full grid gap-3 ${currentQuestion.type === 'multiple_choice' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2'}`}>
              {currentQuestion.options.map((option, index) => {
                const isSelected = localSelected === option;
                const isCorrect = option === currentQuestion.correctAnswer;

                let cardCls = 'glass-panel border-white/8 hover:bg-white/7 hover:border-white/18 cursor-pointer';
                let labelCls = 'bg-white/10 text-white/60';

                if (isNeon && !isAnswering) {
                  cardCls = 'glass-panel border-pink-500/15 hover:bg-pink-500/8 hover:border-pink-500/30 cursor-pointer hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]';
                }

                if (isAnswering) {
                  if (isCorrect) {
                    cardCls = 'bg-emerald-500/20 border-emerald-500/60 shadow-[0_0_24px_rgba(16,185,129,0.25)]';
                    labelCls = 'bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.5)]';
                  } else if (isSelected && !isCorrect) {
                    cardCls = 'bg-red-500/20 border-red-500/60 shadow-[0_0_24px_rgba(239,68,68,0.25)]';
                    labelCls = 'bg-red-500 text-white';
                  } else {
                    cardCls = 'opacity-35 glass-panel border-white/5 cursor-default';
                  }
                }

                return (
                  <motion.button
                    key={`${currentQuestion.id}-${index}`}
                    data-testid={`button-option-${index}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.07, type: 'spring', stiffness: 300, damping: 28 }}
                    whileHover={!isAnswering ? { scale: 1.015, y: -2 } : {}}
                    whileTap={!isAnswering ? { scale: 0.985 } : {}}
                    onClick={() => onSelect(option)}
                    disabled={isAnswering}
                    className={`w-full p-4 md:p-5 rounded-2xl border text-left transition-all duration-200 ${cardCls}`}
                  >
                    <div className="flex items-center gap-3">
                      {currentQuestion.type === 'multiple_choice' && (
                        <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center font-black text-sm transition-all duration-200 ${labelCls}`}>
                          {labels[index]}
                        </div>
                      )}
                      <span className="text-base md:text-lg font-semibold leading-snug">{option}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {isAnswering && timeRemaining === 0 && localSelected === null && (
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="text-red-400 font-black text-xl uppercase tracking-widest"
              >
                Hết giờ!
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
