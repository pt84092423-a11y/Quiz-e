import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { useQuiz } from "./hooks/useQuiz";
import StartScreen from "./pages/StartScreen";
import QuizScreen from "./pages/QuizScreen";
import ResultsScreen from "./pages/ResultsScreen";

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const {
    gameState,
    startQuiz,
    currentQuestion,
    currentIndex,
    totalQuestions,
    timeRemaining,
    score,
    streak,
    handleAnswer,
    isAnswering,
    answers
  } = useQuiz();

  return (
    <TooltipProvider>
      <main className="w-full min-h-[100dvh] bg-background text-foreground selection:bg-primary/30">
        {gameState === 'start' && <StartScreen onStart={startQuiz} />}
        {gameState === 'playing' && currentQuestion && (
          <QuizScreen
            currentQuestion={currentQuestion}
            currentIndex={currentIndex}
            totalQuestions={totalQuestions}
            timeRemaining={timeRemaining}
            score={score}
            streak={streak}
            handleAnswer={handleAnswer}
            isAnswering={isAnswering}
            selectedAnswer={null}
          />
        )}
        {gameState === 'results' && (
          <ResultsScreen
            score={score}
            answers={answers}
            onRetry={startQuiz}
          />
        )}
      </main>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;