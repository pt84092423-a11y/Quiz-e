import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw, List, CheckCircle2, XCircle, Info } from 'lucide-react';
import { AnswerRecord } from '../hooks/useQuiz';
import { saveScore } from '../lib/leaderboard';

interface ResultsScreenProps {
  score: number;
  answers: AnswerRecord[];
  onRetry: () => void;
  onLeaderboard: () => void;
}

export default function ResultsScreen({ score, answers, onRetry, onLeaderboard }: ResultsScreenProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerRecord | null>(null);

  const totalQuestions = answers.length;
  const correctCount = answers.filter(a => a.isCorrect).length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  let rating = 'Cần cố gắng';
  let ratingColor = 'text-red-400';
  let ratingBg = 'from-red-500/20 to-red-500/5';
  if (percentage >= 80) {
    rating = 'Xuất sắc!';
    ratingColor = 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-300';
    ratingBg = 'from-primary/20 to-secondary/10';
  } else if (percentage >= 60) {
    rating = 'Khá tốt';
    ratingColor = 'text-emerald-400';
    ratingBg = 'from-emerald-500/20 to-emerald-500/5';
  } else if (percentage >= 40) {
    rating = 'Trung bình';
    ratingColor = 'text-yellow-400';
    ratingBg = 'from-yellow-500/20 to-yellow-500/5';
  }

  // Save to leaderboard once
  useEffect(() => {
    saveScore(score, correctCount, totalQuestions);
  }, []);

  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col relative overflow-hidden">
      {/* Ambient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full flex-1 flex flex-col gap-5 p-4 md:p-8">

        {/* Score hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`glass-strong rounded-3xl p-6 md:p-8 bg-gradient-to-br ${ratingBg} border border-white/10`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: rating + score */}
            <div className="text-center md:text-left">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">Kết quả</p>
              <h1 className={`text-3xl md:text-4xl font-black mb-3 ${ratingColor}`}>{rating}</h1>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary tabular-nums">
                  {score.toLocaleString()}
                </span>
                <span className="text-muted-foreground font-semibold">điểm</span>
              </div>
            </div>

            {/* Center: stats */}
            <div className="flex items-center gap-5 md:gap-8">
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Đúng</span>
                <span className="text-3xl font-black text-emerald-400 tabular-nums">{correctCount}</span>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Sai</span>
                <span className="text-3xl font-black text-red-400 tabular-nums">{totalQuestions - correctCount}</span>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Tỉ lệ</span>
                <span className="text-3xl font-black text-foreground tabular-nums">{percentage}%</span>
              </div>
            </div>

            {/* Right: actions */}
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <motion.button
                data-testid="button-retry"
                onClick={onRetry}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-black text-background bg-gradient-to-r from-primary to-cyan-300 shadow-[0_0_24px_rgba(0,229,255,0.3)] hover:brightness-110 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Làm lại
              </motion.button>
              <motion.button
                data-testid="button-view-leaderboard"
                onClick={onLeaderboard}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold glass-panel border-white/15 hover:bg-white/10 transition-all"
              >
                <Trophy className="w-4 h-4 text-yellow-400" />
                Bảng xếp hạng
              </motion.button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 h-2 rounded-full bg-white/8 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Điểm đã được lưu vào bảng xếp hạng
          </p>
        </motion.div>

        {/* Review section */}
        <div className="flex-1 flex flex-col md:flex-row gap-5">
          {/* Grid */}
          <div className="w-full md:w-[280px] shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <List className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Chi tiết các câu</h3>
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-5 lg:grid-cols-6 gap-2">
              {answers.map((ans, idx) => {
                const isSelected = selectedAnswer?.questionId === ans.questionId;
                let cls =
                  ans.selectedAnswer === null
                    ? 'bg-white/8 text-muted-foreground border-white/10'
                    : ans.isCorrect
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-red-500/20 text-red-400 border-red-500/40';

                return (
                  <motion.button
                    key={ans.questionId}
                    data-testid={`button-review-${idx + 1}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.02 }}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setSelectedAnswer(ans)}
                    className={`aspect-square rounded-xl flex items-center justify-center font-black text-sm border transition-all ${cls} ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-background' : ''}`}
                  >
                    {idx + 1}
                  </motion.button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500/40" />Đúng
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-red-500/30 border border-red-500/40" />Sai
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-white/10 border border-white/15" />Bỏ qua
              </span>
            </div>
          </div>

          {/* Detail panel */}
          <div className="flex-1 min-h-[300px]">
            <AnimatePresence mode="wait">
              {selectedAnswer ? (
                <motion.div
                  key={selectedAnswer.questionId}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  className="glass-strong rounded-3xl p-6 md:p-8 h-full flex flex-col border border-white/10"
                >
                  <div className="mb-5">
                    <span className="inline-block px-3 py-1 rounded-full glass border border-white/10 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                      Câu {answers.findIndex(a => a.questionId === selectedAnswer.questionId) + 1}
                    </span>
                    <p className="text-lg md:text-xl font-bold leading-relaxed">{selectedAnswer.question.question}</p>
                  </div>

                  <div className="space-y-2.5 mb-5">
                    {selectedAnswer.question.options.map((opt, i) => {
                      const isUser = opt === selectedAnswer.selectedAnswer;
                      const isCorrectOpt = opt === selectedAnswer.question.correctAnswer;

                      let row = 'bg-white/4 border-white/8 text-muted-foreground';
                      let icon = null;

                      if (isCorrectOpt) {
                        row = 'bg-emerald-500/15 border-emerald-500/40 text-emerald-100';
                        icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
                      } else if (isUser && !isCorrectOpt) {
                        row = 'bg-red-500/15 border-red-500/40 text-red-100';
                        icon = <XCircle className="w-5 h-5 text-red-400 shrink-0" />;
                      }

                      return (
                        <div key={i} className={`flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-all ${row}`}>
                          <span className="font-medium text-sm md:text-base leading-snug">{opt}</span>
                          {icon}
                        </div>
                      );
                    })}
                    {selectedAnswer.selectedAnswer === null && (
                      <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-muted-foreground text-center text-sm font-medium">
                        Bạn chưa trả lời câu này (Hết giờ)
                      </div>
                    )}
                  </div>

                  <div className="mt-auto p-4 rounded-2xl bg-primary/10 border border-primary/20 flex gap-3">
                    <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-primary font-bold text-sm mb-1">Giải thích</p>
                      <p className="text-sm text-foreground/80 leading-relaxed">{selectedAnswer.question.explanation}</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-panel rounded-3xl p-8 h-full flex flex-col items-center justify-center text-center text-muted-foreground border border-white/8"
                >
                  <List className="w-14 h-14 mb-4 opacity-25" />
                  <p className="text-base font-semibold">Chọn một ô bên trái</p>
                  <p className="text-sm mt-1 opacity-70">để xem đáp án và giải thích chi tiết</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
