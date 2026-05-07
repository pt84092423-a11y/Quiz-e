import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnswerRecord } from '../hooks/useQuiz';

interface ResultsScreenProps {
  score: number;
  answers: AnswerRecord[];
  onRetry: () => void;
}

export default function ResultsScreen({ score, answers, onRetry }: ResultsScreenProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerRecord | null>(null);

  const totalQuestions = answers.length;
  const correctCount = answers.filter(a => a.isCorrect).length;
  const percentage = (correctCount / totalQuestions) * 100;

  let rating = "Cần cố gắng";
  let ratingColor = "text-destructive";
  if (percentage >= 80) {
    rating = "Xuất sắc!";
    ratingColor = "text-primary";
  } else if (percentage >= 60) {
    rating = "Khá";
    ratingColor = "text-green-400";
  } else if (percentage >= 40) {
    rating = "Trung bình";
    ratingColor = "text-yellow-400";
  }

  return (
    <div className="min-h-[100dvh] w-full bg-background p-4 md:p-8 flex flex-col relative overflow-hidden">
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/20 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Header Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-3xl p-8 border border-white/10 mb-8 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">Kết quả Quiz</h1>
            <p className={`text-2xl font-black uppercase tracking-wider ${ratingColor}`}>{rating}</p>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center">
              <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-1">Tổng điểm</span>
              <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{score}</span>
            </div>
            <div className="w-px h-16 bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-1">Chính xác</span>
              <span className="text-4xl font-bold text-foreground">{correctCount}<span className="text-xl text-muted-foreground">/{totalQuestions}</span></span>
            </div>
          </div>

          <button 
            onClick={onRetry}
            className="w-full md:w-auto px-8 py-4 rounded-xl font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
          >
            Làm lại Quiz
          </button>
        </motion.div>

        {/* Review Grid */}
        <div className="flex-1 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4 text-white/80">Chi tiết các câu hỏi</h3>
            <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-5 lg:grid-cols-6 gap-2">
              {answers.map((ans, idx) => {
                const isSelected = selectedAnswer?.questionId === ans.questionId;
                let bgClass = ans.selectedAnswer === null ? "bg-muted text-muted-foreground" : 
                              ans.isCorrect ? "bg-green-500/20 text-green-400 border-green-500/50" : 
                              "bg-destructive/20 text-red-400 border-destructive/50";

                return (
                  <button
                    key={ans.questionId}
                    onClick={() => setSelectedAnswer(ans)}
                    className={`aspect-square rounded-lg flex items-center justify-center font-bold border transition-all hover:scale-105 ${bgClass} ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-background' : ''}`}
                  >
                    {idx + 1}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Details Panel */}
          <div className="w-full md:w-2/3">
            <AnimatePresence mode="wait">
              {selectedAnswer ? (
                <motion.div
                  key={selectedAnswer.questionId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-panel border border-white/10 rounded-3xl p-6 md:p-8 h-full flex flex-col"
                >
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider mb-4">
                      Câu {answers.findIndex(a => a.questionId === selectedAnswer.questionId) + 1}
                    </span>
                    <h3 className="text-xl font-bold leading-relaxed">{selectedAnswer.question.question}</h3>
                  </div>

                  <div className="space-y-3 mb-8">
                    {selectedAnswer.question.options.map((opt, i) => {
                      const isUserChoice = opt === selectedAnswer.selectedAnswer;
                      const isCorrectChoice = opt === selectedAnswer.question.correctAnswer;
                      
                      let rowClass = "bg-white/5 border-white/5";
                      let icon = null;

                      if (isCorrectChoice) {
                        rowClass = "bg-green-500/20 border-green-500/50 text-green-100";
                        icon = <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
                      } else if (isUserChoice && !isCorrectChoice) {
                        rowClass = "bg-destructive/20 border-destructive/50 text-red-100";
                        icon = <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
                      }

                      return (
                        <div key={i} className={`p-4 rounded-xl border flex items-center justify-between ${rowClass}`}>
                          <span className="font-medium">{opt}</span>
                          {icon && <span>{icon}</span>}
                        </div>
                      )
                    })}
                    
                    {selectedAnswer.selectedAnswer === null && (
                      <div className="p-4 rounded-xl border bg-muted/50 border-white/10 text-muted-foreground text-center font-medium">
                        Bạn đã không trả lời câu hỏi này (Hết giờ)
                      </div>
                    )}
                  </div>

                  <div className="mt-auto p-4 rounded-xl bg-primary/10 border border-primary/20">
                    <h4 className="text-primary font-bold mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Giải thích
                    </h4>
                    <p className="text-sm text-primary-100 leading-relaxed">{selectedAnswer.question.explanation}</p>
                  </div>
                </motion.div>
              ) : (
                <div className="glass-panel border border-white/5 rounded-3xl p-8 h-full flex flex-col items-center justify-center text-muted-foreground text-center">
                  <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  <p className="text-lg">Chọn một câu hỏi bên trái<br/>để xem chi tiết đáp án và giải thích.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}