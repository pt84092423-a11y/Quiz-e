export type LeaderboardEntry = {
  id: string;
  score: number;
  correct: number;
  total: number;
  date: string;
};

const KEY = 'geo-quiz-leaderboard';
const MAX_ENTRIES = 10;

export function getLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveScore(score: number, correct: number, total: number): void {
  const entries = getLeaderboard();
  const entry: LeaderboardEntry = {
    id: Date.now().toString(),
    score,
    correct,
    total,
    date: new Date().toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
  const updated = [...entries, entry]
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_ENTRIES);
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function clearLeaderboard(): void {
  localStorage.removeItem(KEY);
}
