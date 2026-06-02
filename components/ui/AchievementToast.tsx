"use client";
import { useEffect } from "react";
import { useProgress } from "@/store/progress";
import { ACHIEVEMENTS } from "@/lib/gamification";
import { fireConfetti } from "./Confetti";

export function AchievementToast() {
  const newlyUnlocked = useProgress((s) => s.newlyUnlocked);
  const dismiss = useProgress((s) => s.dismissAchievement);

  const currentId = newlyUnlocked[0];
  const achievement = ACHIEVEMENTS.find((a) => a.id === currentId);

  useEffect(() => {
    if (!currentId) return;
    fireConfetti();
    const t = setTimeout(() => dismiss(currentId), 5000);
    return () => clearTimeout(t);
  }, [currentId, dismiss]);

  if (!achievement) return null;

  return (
    <div
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[110] animate-[slideDown_0.4s_ease-out]"
      style={{ animation: "slideDown 0.4s ease-out" }}
      onClick={() => dismiss(achievement.id)}
    >
      <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black px-6 py-4 shadow-2xl shadow-amber-500/30 cursor-pointer">
        <span className="text-4xl">{achievement.icon}</span>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest opacity-70">
            Достижение разблокировано
          </p>
          <p className="text-lg font-bold leading-tight">{achievement.title}</p>
          <p className="text-sm opacity-80">{achievement.description}</p>
        </div>
      </div>
      <style jsx>{`
        @keyframes slideDown {
          from { transform: translateY(-100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
