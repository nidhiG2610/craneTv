import { VibeMood } from "../../types";

type VibeResultCardProps = {
  result: VibeMood;
  onShowDramas: () => void;
};

export function VibeResultCard({ result, onShowDramas }: VibeResultCardProps) {
  return (
    <div
      className="mt-6 rounded-2xl border-2 px-6 py-5 text-center"
      style={{ background: `${result.color}33`, borderColor: result.color }}
    >
      <div className="text-[2.5rem]">{result.emoji}</div>
      <div className="mt-2 text-[1.2rem] font-bold text-[#1C1C1E]">{result.label}</div>
      <div className="my-3 text-[0.9rem] text-[#66625C]">{result.desc}</div>
      <button
        className="mt-1 rounded-2xl bg-[#0D6E75] px-8 py-[0.85rem] text-[0.95rem] font-bold text-white"
        onClick={onShowDramas}
      >
        🎬 Show Me Dramas →
      </button>
    </div>
  );
}
