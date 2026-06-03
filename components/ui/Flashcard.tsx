"use client";
import { useState } from "react";
import { AudioButton } from "./AudioButton";

type Props = {
  front: string;
  back: string;
  translit?: string;
  onCorrect?: () => void;
  onWrong?: () => void;
};

export function Flashcard({ front, back, translit, onCorrect, onWrong }: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex flex-col gap-4 items-center">
      <div
        className="w-full max-w-md min-h-[180px] cursor-pointer"
        onClick={() => setFlipped((f) => !f)}
        style={{ perspective: "1000px" }}
      >
        <div
          className={`relative w-full min-h-[180px] transition-transform duration-500`}
          style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-slate-800 border border-amber-500/30 p-6 backface-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <p className="text-xs text-amber-400/60 mb-2 uppercase tracking-widest">Нажми, чтобы перевернуть</p>
            <span
              dir="rtl"
              lang="ur"
              className="text-4xl text-white leading-relaxed"
              style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
            >
              {front}
            </span>
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-slate-700 border border-green-500/40 p-6 backface-hidden"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="flex items-center gap-2">
              <AudioButton text={front} size="md" />
              <span className="text-xl text-white font-semibold">{back}</span>
            </div>
            {translit && (
              <span className="text-sm text-amber-300/70 font-mono mt-1">{translit}</span>
            )}
          </div>
        </div>
      </div>

      {flipped && (
        <div className="flex gap-4">
          <button
            onClick={() => { setFlipped(false); onWrong?.(); }}
            className="px-6 py-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30 transition-colors"
          >
            Ошибся
          </button>
          <button
            onClick={() => { setFlipped(false); onCorrect?.(); }}
            className="px-6 py-2 rounded-xl bg-green-500/20 border border-green-500/40 text-green-300 hover:bg-green-500/30 transition-colors"
          >
            Знал
          </button>
        </div>
      )}
    </div>
  );
}
