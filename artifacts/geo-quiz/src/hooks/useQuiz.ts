import { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { quizData } from '../data/quizData';

export type Question = typeof quizData[0];

export type AnswerRecord = {
  questionId: string;
  question: Question;
  selectedAnswer: string | null;
  isCorrect: boolean;
  timeRemaining: number;
};

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function useQuiz() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'results'>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(20);
  const [isAnswering, setIsAnswering] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Setup Web Audio API
  useEffect(() => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        audioContextRef.current = new AudioContext();
      }
    } catch (e) {
      console.error("Web Audio API not supported", e);
    }
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playTickSound = useCallback(() => {
    if (!audioContextRef.current) return;
    
    // Resume context if suspended (browser autoplay policy)
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    const osc = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.05);

    osc.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    osc.start();
    osc.stop(audioContextRef.current.currentTime + 0.05);
  }, []);

  const startQuiz = useCallback(() => {
    // Shuffle questions and their options
    const shuffledQuestions = shuffleArray(quizData).map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    
    setQuestions(shuffledQuestions);
    setCurrentIndex(0);
    setAnswers([]);
    setScore(0);
    setStreak(0);
    setTimeRemaining(20);
    setGameState('playing');
    setIsAnswering(false);
  }, []);

  const handleAnswer = useCallback((selectedAnswer: string | null) => {
    if (isAnswering) return;
    setIsAnswering(true);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      question: currentQuestion,
      selectedAnswer,
      isCorrect,
      timeRemaining
    }]);

    if (isCorrect) {
      const points = 100 + (timeRemaining * 5);
      setScore(prev => prev + points);
      setStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak === 5) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00e5ff', '#8a2be2', '#ff0055']
          });
        }
        return newStreak;
      });
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setTimeRemaining(20);
        setIsAnswering(false);
      } else {
        setGameState('results');
      }
    }, 1500);
  }, [currentIndex, questions, timeRemaining, isAnswering]);

  useEffect(() => {
    if (gameState !== 'playing' || isAnswering) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleAnswer(null); // Time out
          return 0;
        }
        if (prev <= 4) { // play tick on 3, 2, 1
          playTickSound();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, isAnswering, handleAnswer, playTickSound]);

  return {
    gameState,
    startQuiz,
    currentQuestion: questions[currentIndex],
    currentIndex,
    totalQuestions: questions.length,
    timeRemaining,
    score,
    streak,
    handleAnswer,
    isAnswering,
    answers
  };
}