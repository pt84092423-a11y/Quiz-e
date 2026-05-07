import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { useQuiz } from "./hooks/useQuiz";
import StartScreen from "./pages/StartScreen";
import QuizScreen from "./pages/QuizScreen";
import ResultsScreen from "./pages/ResultsScreen";
import LeaderboardScreen from "./pages/LeaderboardScreen";

type NavView = 'start' | 'leaderboard';

function App() {
  const [navView, setNavView] = useState<NavView>('start');

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
    answers,
  } = useQuiz();

  const handleStart = () => {
    startQuiz();
    setNavView('start');
  };

  // Derive final view
  if (navView === 'leaderboard') {
    return (
      <TooltipProvider>
        <LeaderboardScreen onBack={() => setNavView('start')} />
        <Toaster />
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <main className="w-full min-h-[100dvh] bg-background text-foreground selection:bg-primary/30">
        {gameState === 'start' && (
          <StartScreen
            onStart={handleStart}
            onLeaderboard={() => setNavView('leaderboard')}
          />
        )}
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
            onRetry={handleStart}
            onLeaderboard={() => setNavView('leaderboard')}
          />
        )}
      </main>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
