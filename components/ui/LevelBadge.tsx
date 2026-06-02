"use client";
import { useProgress } from "@/store/progress";
import { getLevel, getNextLevel, getLevelProgress } from "@/lib/gamification";

export function LevelBadge({ compact = false }: { compact?: boolean }) {
  const xp = useProgress((s) => s.xp);
  const level = getLevel(xp);
  const next = getNextLevel(xp);
  const progress = getLevelProgress(xp);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
          {level.level}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-amber-400 truncate">{level.title}</p>
          <div className="w-full bg-slate-800 rounded-full h-1 mt-0.5">
            <div className="bg-amber-500 h-1 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-transparent p-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-black font-bold text-2xl flex-shrink-0 shadow-lg shadow-amber-500/20">
          {level.level}
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <p className="text-lg font-bold text-white">{level.title}</p>
            <span
              dir="rtl"
              lang="ur"
              className="text-amber-400 text-lg"
              style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
            >
              {level.urdu}
            </span>
          </div>
          {next ? (
            <p className="text-xs text-slate-400 mt-0.5">
              До «{next.title}»: {next.minXp - xp} XP
            </p>
          ) : (
            <p className="text-xs text-amber-400 mt-0.5">Максимальный уровень!</p>
          )}
          <div className="w-full bg-slate-800 rounded-full h-2 mt-2">
            <div
              className="bg-gradient-to-r from-amber-500 to-yellow-400 h-2 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
