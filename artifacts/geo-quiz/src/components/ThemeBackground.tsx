import { useTheme } from '../contexts/ThemeContext';

// Cosmic: star field generated via CSS box-shadow
function CosmicBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Deep nebula layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_20%,rgba(88,28,235,0.22)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_80%,rgba(59,130,246,0.18)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(139,92,246,0.12)_0%,transparent_70%)]" />
      {/* Animated nebula */}
      <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full bg-violet-600/10 blur-[150px] animate-nebula-1" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[130px] animate-nebula-2" />
      <div className="absolute top-[40%] left-[60%] w-[400px] h-[400px] rounded-full bg-purple-500/8 blur-[100px] animate-nebula-3" />
      {/* Star layers */}
      <div className="star-layer star-sm" />
      <div className="star-layer star-md" />
      <div className="star-layer star-lg" />
    </div>
  );
}

// Neon City: scanlines + perspective grid + neon blobs
function NeonBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Perspective grid floor */}
      <div className="neon-grid" />
      {/* Scanlines */}
      <div className="scanlines" />
      {/* Neon glow blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-pink-600/10 blur-[120px] animate-neon-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-cyan-500/8 blur-[100px] animate-neon-pulse-2" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-pink-500/6 blur-[90px] animate-nebula-1" />
      {/* Horizontal neon line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/60 to-transparent animate-neon-line" />
    </div>
  );
}

// Aurora: animated northern lights
function AuroraBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="aurora-layer aurora-1" />
      <div className="aurora-layer aurora-2" />
      <div className="aurora-layer aurora-3" />
      <div className="aurora-layer aurora-4" />
      {/* Ground mist */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

export default function ThemeBackground() {
  const { theme } = useTheme();
  if (theme === 'neon') return <NeonBackground />;
  if (theme === 'aurora') return <AuroraBackground />;
  return <CosmicBackground />;
}
