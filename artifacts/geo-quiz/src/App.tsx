import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import ThemeBackground from "./components/ThemeBackground";
import { useQuiz } from "./hooks/useQuiz";
import StartScreen from "./pages/StartScreen";
import QuizScreen from "./pages/QuizScreen";
import ResultsScreen from "./pages/ResultsScreen";
import LeaderboardScreen from "./pages/LeaderboardScreen";

type NavView = 'start' | 'leaderboard';

function AppInner() {
  const [navView, setNavView] = useState<NavView>('start');
  const [playerName, setPlayerName] = useState('');

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

  const handleStart = (name: string) => {
    setPlayerName(name);
    startQuiz();
    setNavView('start');
  };

  const handleRetry = () => {
    startQuiz();
    setNavView('start');
  };

  return (
    <TooltipProvider>
      {/* Shared animated background layer */}
      <ThemeBackground />

      <main className="relative z-10 w-full min-h-[100dvh] bg-background/60 text-foreground selection:bg-primary/30">
        {navView === 'leaderboard' ? (
          <LeaderboardScreen
            onBack={() => setNavView('start')}
            highlightName={playerName || undefined}
          />
        ) : (
          <>
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
                playerName={playerName}
                onRetry={handleRetry}
                onLeaderboard={() => setNavView('leaderboard')}
              />
            )}
          </>
        )}
      </main>
      <Toaster />
    </TooltipProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
