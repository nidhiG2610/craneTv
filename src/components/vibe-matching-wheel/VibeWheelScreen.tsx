import { WheelSvg } from './WheelSvg';
import { VibeResultCard } from './VibeResultCard';
import { VibeMood } from '../../types';

type VibeWheelScreenProps = {
  rotation: number;
  spinning: boolean;
  result: VibeMood | null;
  onBack: () => void;
  onSpin: () => void;
  onShowDramas: () => void;
};

export function VibeWheelScreen({
  rotation,
  spinning,
  result,
  onBack,
  onSpin,
  onShowDramas,
}: VibeWheelScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7F4EE] p-8 font-['Satoshi',sans-serif]">
      <div className="w-full max-w-[520px] rounded-3xl bg-white px-8 py-10 text-center shadow-[0_12px_40px_rgba(23,28,33,0.10)]">
        <h2 className="m-0 mb-2 text-[1.6rem] font-bold text-[#1C1C1E]">🎡 Spin the Mood Wheel</h2>
        <p className="m-0 mb-8 text-[0.95rem] text-[#66625C]">Let fate pick your next drama vibe!</p>

        <div className="relative mx-auto my-6 size-80">
          <div className="absolute -top-[18px] left-1/2 z-10 -translate-x-1/2 text-[2rem] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            ▼
          </div>
          <WheelSvg rotation={rotation} spinning={spinning} />
        </div>

        <button
          className="mx-auto mt-6 block rounded-full bg-[#0D6E75] px-10 py-[0.9rem] text-base font-bold text-white shadow-[0_4px_16px_rgba(13,110,117,0.25)] disabled:cursor-not-allowed disabled:bg-[#aaa]"
          onClick={onSpin}
          disabled={spinning}
        >
          {spinning ? 'Spinning...' : '🎲 Spin!'}
        </button>

        {result && !spinning && <VibeResultCard result={result} onShowDramas={onShowDramas} />}

        <button
          className="mt-4 bg-transparent text-[0.9rem] text-[#0D6E75] underline"
          onClick={onBack}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
