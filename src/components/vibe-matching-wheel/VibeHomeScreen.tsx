type VibeHomeScreenProps = {
  onBrowseAll: () => void;
  onSpinWheel: () => void;
};

export function VibeHomeScreen({ onBrowseAll, onSpinWheel }: VibeHomeScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7F4EE] p-8 font-['Satoshi',sans-serif]">
      <div className="mb-10 flex items-center gap-3">
        <div className="grid size-12 place-items-center rounded-[14px] bg-[linear-gradient(135deg,#0D6E75,#148c95)] text-[1.4rem] text-white shadow-[0_8px_24px_rgba(13,110,117,0.25)]">
          🦢
        </div>
        <div>
          <h1 className="m-0 text-[1.6rem] font-bold text-[#1C1C1E]">CraneTV</h1>
          <p className="m-0 mt-1 text-[0.9rem] text-[#66625C]">Real picks from real fans.</p>
        </div>
      </div>

      <div className="w-full max-w-[480px] rounded-3xl bg-white px-8 py-10 text-center shadow-[0_12px_40px_rgba(23,28,33,0.10)]">
        <h2 className="m-0 mb-2 text-[1.6rem] font-bold text-[#1C1C1E]">What brings you here today?</h2>
        <p className="m-0 mb-8 text-[0.95rem] text-[#66625C]">Let us help you find your next obsession.</p>

        <button
          className="mb-3 w-full rounded-2xl bg-[#0D6E75] p-4 text-base font-semibold text-white shadow-[0_4px_16px_rgba(13,110,117,0.25)]"
          onClick={onBrowseAll}
        >
          🎬 I feel like watching something
        </button>

        <button
          className="w-full rounded-2xl border-[1.5px] border-[rgba(28,28,30,0.12)] bg-white p-4 text-base font-semibold text-[#1C1C1E]"
          onClick={onSpinWheel}
        >
          🎡 I'm not sure — spin the wheel!
        </button>
      </div>
    </div>
  );
}
