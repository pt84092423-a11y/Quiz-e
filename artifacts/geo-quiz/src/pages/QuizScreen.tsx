import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '../hooks/useQuiz';

interface QuizScreenProps {
  currentQuestion: Question;
  currentIndex: number;
  totalQuestions: number;
  timeRemaining: number;
  score: number;
  streak: number;
  handleAnswer: (answer: string) => void;
  isAnswering: boolean;
  selectedAnswer: string | null; // Pass down the currently selected answer if we were tracking it in the parent component for immediate feedback, but the hook manages it internally, so we just use local state here for visual feedback.
}

import { useState, useEffect } from 'react';

export default function QuizScreen({
  currentQuestion,
  currentIndex,
  totalQuestions,
  timeRemaining,
  score,
  streak,
  handleAnswer,
  isAnswering
}: QuizScreenProps) {
  
  const [localSelectedAnswer, setLocalSelectedAnswer] = useState<string | null>(null);

  // Reset local state when question changes
  useEffect(() => {
    setLocalSelectedAnswer(null);
  }, [currentQuestion.id]);

  const onSelectAnswer = (answer: string) => {
    if (isAnswering) return;
    setLocalSelectedAnswer(answer);
    handleAnswer(answer);
  };

  const timerPercentage = (timeRemaining / 20) * 100;
  
  let timerColor = "text-green-500";
  if (timeRemaining <= 10) timerColor = "text-yellow-500";
  if (timeRemaining <= 4) timerColor = "text-destructive";

  return (
    <div className="min-h-[100dvh] w-full flex flex-col p-4 md:p-8 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[100px]" />
      </div>

      {/* Top Bar */}
      <header className="relative z-10 flex items-center justify-between w-full max-w-4xl mx-auto mb-8">
        <div className="glass-panel px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Câu</span>
          <span className="text-lg font-bold text-foreground">{currentIndex + 1} <span className="text-sm text-muted-foreground font-normal">/ {totalQuestions}</span></span>
        </div>

        {streak >= 3 && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-1 text-orange-400 font-bold px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20"
          >
            🔥 {streak} Streak!
          </motion.div>
        )}

        <div className="glass-panel px-5 py-2 rounded-full border border-white/10 flex items-center gap-2">
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Điểm</span>
          <span className="text-xl font-black text-primary">{score}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center w-full max-w-4xl mx-auto">
        
        {/* Timer Ring */}
        <div className="relative mb-8 w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              className="stroke-muted/30"
              strokeWidth="6"
              fill="none"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="40"
              className={`stroke-current transition-colors duration-300 ${timerColor}`}
              strokeWidth="6"
              fill="none"
              strokeDasharray={251.2}
              animate={{ strokeDashoffset: 251.2 - (251.2 * timerPercentage) / 100 }}
              transition={{ duration: 1, ease: "linear" }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className={`text-3xl font-black ${timerColor} transition-colors duration-300`}>
              {timeRemaining}
            </span>
          </div>
        </div>

        {/* Question Card */}
        <div className="w-full flex-1 flex flex-col relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full flex flex-col items-center"
            >
              <div className="w-full glass-panel border border-white/10 p-6 md:p-10 rounded-3xl shadow-xl mb-8">
                <h2 className="text-2xl md:text-3xl font-bold leading-relaxed text-center">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Options */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = localSelectedAnswer === option;
                  const isCorrect = option === currentQuestion.correctAnswer;
                  
                  let optionClass = "glass-panel border-white/10 hover:bg-white/5";
                  
                  if (isAnswering) {
                    if (isCorrect) {
                      optionClass = "bg-green-500/20 border-green-500 text-green-100 shadow-[0_0_20px_rgba(34,197,94,0.2)]";
                    } else if (isSelected && !isCorrect) {
                      optionClass = "bg-destructive/20 border-destructive text-red-100 shadow-[0_0_20px_rgba(239,68,68,0.2)]";
                    } else {
                      optionClass = "opacity-50 glass-panel border-white/5";
                    }
                  }

                  const labels = ["A", "B", "C", "D"];

                  return (
                    <motion.button
                      key={`${currentQuestion.id}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={!isAnswering ? { scale: 1.02 } : {}}
                      whileTap={!isAnswering ? { scale: 0.98 } : {}}
                      onClick={() => onSelectAnswer(option)}
                      disabled={isAnswering}
                      className={`relative w-full p-6 rounded-2xl border text-left transition-all duration-300 ${optionClass}`}
                    >
                      <div className="flex items-center gap-4">
                        {currentQuestion.type === 'multiple_choice' && (
                          <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center font-bold text-sm ${isAnswering && isCorrect ? 'bg-green-500 text-white' : isAnswering && isSelected ? 'bg-destructive text-white' : 'bg-white/10 text-white/70'}`}>
                            {labels[index]}
                          </div>
                        )}
                        <span className="text-lg font-medium">{option}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
              
              {isAnswering && timeRemaining === 0 && localSelectedAnswer === null && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 text-destructive font-bold text-xl tracking-wider uppercase"
                >
                  Hết giờ!
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </main>
    </div>
  );
}