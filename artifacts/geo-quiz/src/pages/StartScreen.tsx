import { motion } from 'framer-motion';

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center relative overflow-hidden bg-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center p-8 max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="glass-panel p-10 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center w-full"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,229,255,0.3)]">
            <svg xmlns="http://www.000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight text-center mb-2">
            Quiz Địa Lí 10
          </h1>
          
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-8">
            Ôn thi Cuối Học Kỳ 2
          </p>

          <div className="flex items-center gap-6 mb-10 w-full justify-center text-muted-foreground">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-foreground">37</span>
              <span className="text-xs uppercase tracking-wider">câu hỏi</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-foreground">20s</span>
              <span className="text-xs uppercase tracking-wider">mỗi câu</span>
            </div>
          </div>

          <button 
            onClick={onStart}
            className="w-full py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all duration-300 transform active:scale-95"
          >
            Bắt đầu Quiz
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}