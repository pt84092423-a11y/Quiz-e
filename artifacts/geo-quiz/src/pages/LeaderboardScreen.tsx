import { motion } from 'framer-motion';
import { Trophy, Medal, ArrowLeft, Loader2, RefreshCw } from 'lucide-react';
import { useGetLeaderboard } from '@workspace/api-client-react';

interface LeaderboardScreenProps {
  onBack: () => void;
  highlightName?: string;
}

const RANK_STYLES: Record<number, { bg: string; text: string; border: string; icon: React.ReactNode }> = {
  1: { bg: 'bg-yellow-500/15', text: 'text-yellow-400', border: 'border-yellow-500/40', icon: <Trophy className="w-5 h-5 text-yellow-400" /> },
  2: { bg: 'bg-slate-400/15', text: 'text-slate-300', border: 'border-slate-400/40', icon: <Medal className="w-5 h-5 text-slate-300" /> },
  3: { bg: 'bg-orange-600/15', text: 'text-orange-400', border: 'border-orange-500/40', icon: <Medal className="w-5 h-5 text-orange-400" /> },
};

function getRankStyle(rank: number) {
  return RANK_STYLES[rank] ?? { bg: 'bg-white/5', text: 'text-muted-foreground', border: 'border-white/10', icon: null };
}

export default function LeaderboardScreen({ onBack, highlightName }: LeaderboardScreenProps) {
  const { data: entries, isLoading, isError, refetch } = useGetLeaderboard({ limit: 20 });

  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-background relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-15%] right-[-10%] w-[55%] h-[55%] rounded-full bg-yellow-500/8 blur-[120px]" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col flex-1 p-4 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <button
            data-testid="button-back"
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Quay lại</span>
          </button>

          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h1 className="text-2xl font-extrabold tracking-tight">Bảng xếp hạng</h1>
          </div>

          <button
            data-testid="button-refresh-leaderboard"
            onClick={() => refetch()}
            title="Làm mới"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Loading */}
        {isLoading && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="font-medium">Đang tải bảng xếp hạng...</p>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground text-center">
            <Trophy className="w-16 h-16 opacity-20" />
            <p className="text-lg font-semibold">Không thể tải bảng xếp hạng</p>
            <button onClick={() => refetch()} className="text-primary hover:underline text-sm font-medium">
              Thử lại
            </button>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && entries?.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground gap-4">
            <Trophy className="w-20 h-20 opacity-20" />
            <p className="text-xl font-semibold">Chưa có kết quả nào</p>
            <p className="text-sm">Hãy hoàn thành một bài quiz để ghi điểm!</p>
          </div>
        )}

        {/* List */}
        {!isLoading && !isError && entries && entries.length > 0 && (
          <div className="flex flex-col gap-3">
            {entries.map((entry, i) => {
              const rank = i + 1;
              const style = getRankStyle(rank);
              const pct = Math.round((entry.correct / entry.total) * 100);
              const isHighlighted = highlightName && entry.playerName === highlightName;
              const date = new Date(entry.createdAt).toLocaleDateString('vi-VN', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit',
              });

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-4 p-4 rounded-2xl border backdrop-blur-xl transition-all ${style.bg} ${style.border} ${isHighlighted ? 'ring-2 ring-primary/50 shadow-[0_0_20px_rgba(0,229,255,0.15)]' : ''}`}
                  data-testid={`row-leaderboard-${rank}`}
                >
                  {/* Rank */}
                  <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center font-black text-base ${style.bg} border ${style.border}`}>
                    {style.icon ?? <span className={style.text}>{rank}</span>}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`font-black text-base ${rank <= 3 ? style.text : 'text-foreground'} truncate`}>
                        {entry.playerName}
                      </span>
                      {isHighlighted && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-bold uppercase tracking-wider shrink-0">
                          Bạn
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>#{rank}</span>
                      <span>·</span>
                      <span>{entry.correct}/{entry.total} câu đúng ({pct}%)</span>
                      <span>·</span>
                      <span className="truncate">{date}</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: i * 0.05 + 0.3, duration: 0.6, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                  {/* Score */}
                  <div className="shrink-0 text-right">
                    <div className={`text-2xl font-black tabular-nums ${rank === 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400' : rank <= 3 ? style.text : 'text-foreground'}`}>
                      {entry.score.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">điểm</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
