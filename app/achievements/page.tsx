"use client";
import { useProgress } from "@/store/progress";
import { ACHIEVEMENTS, LEVELS, getLevel } from "@/lib/gamification";
import { LevelBadge } from "@/components/ui/LevelBadge";
import { Lock } from "lucide-react";

export default function AchievementsPage() {
  const xp = useProgress((s) => s.xp);
  const unlocked = useProgress((s) => s.unlockedAchievements);
  const currentLevel = getLevel(xp);

  const unlockedCount = Object.keys(unlocked).length;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Достижения</h1>
        <p className="text-slate-400 mt-1">
          {unlockedCount} / {ACHIEVEMENTS.length} получено
        </p>
      </div>

      <LevelBadge />

      {/* Achievements grid */}
      <div>
        <h2 className="text-lg font-semibold text-amber-400 mb-3">Награды</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {ACHIEVEMENTS.map((a) => {
            const isUnlocked = !!unlocked[a.id];
            return (
              <div
                key={a.id}
                className={`rounded-xl border p-4 text-center transition-colors ${
                  isUnlocked
                    ? "border-amber-500/40 bg-amber-500/10"
                    : "border-slate-800 bg-slate-900/50"
                }`}
              >
                <div className={`text-4xl mb-2 ${isUnlocked ? "" : "grayscale opacity-30"}`}>
                  {isUnlocked ? a.icon : <Lock className="mx-auto text-slate-600" size={32} />}
                </div>
                <p className={`font-semibold text-sm ${isUnlocked ? "text-white" : "text-slate-500"}`}>
                  {a.title}
                </p>
                <p className="text-xs text-slate-500 mt-1">{a.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* All levels */}
      <div>
        <h2 className="text-lg font-semibold text-amber-400 mb-3">Ранги</h2>
        <div className="space-y-2">
          {LEVELS.map((lvl) => {
            const reached = xp >= lvl.minXp;
            const isCurrent = lvl.level === currentLevel.level;
            return (
              <div
                key={lvl.level}
                className={`flex items-center gap-4 rounded-xl border p-3 ${
                  isCurrent
                    ? "border-amber-500 bg-amber-500/10"
                    : reached
                    ? "border-slate-700 bg-slate-900"
                    : "border-slate-800 bg-slate-900/40 opacity-50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                    reached ? "bg-gradient-to-br from-amber-500 to-yellow-600 text-black" : "bg-slate-800 text-slate-500"
                  }`}
                >
                  {lvl.level}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${reached ? "text-white" : "text-slate-500"}`}>
                    {lvl.title}
                  </p>
                  <p className="text-xs text-slate-500">{lvl.minXp} XP</p>
                </div>
                <span
                  dir="rtl"
                  lang="ur"
                  className={`text-xl ${reached ? "text-amber-400" : "text-slate-600"}`}
                  style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
                >
                  {lvl.urdu}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
