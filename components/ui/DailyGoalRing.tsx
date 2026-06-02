"use client";
import { useProgress } from "@/store/progress";
import { DAILY_GOAL_XP } from "@/lib/gamification";

export function DailyGoalRing() {
  const todayDate = useProgress((s) => s.todayDate);
  const todayXp = useProgress((s) => s.todayXp);

  const today = new Date().toDateString();
  const xpToday = todayDate === today ? todayXp : 0;
  const pct = Math.min((xpToday / DAILY_GOAL_XP) * 100, 100);
  const done = xpToday >= DAILY_GOAL_XP;

  const r = 36;
  const circ = 2 * Math.PI * r;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 flex items-center gap-5">
      <div className="relative w-24 h-24 flex-shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="#1e293b" strokeWidth="8" />
          <circle
            cx="50" cy="50" r={r} fill="none"
            stroke={done ? "#22c55e" : "#f59e0b"}
            strokeWidth="8"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - pct / 100)}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-2xl">
          {done ? "✅" : "🎯"}
        </div>
      </div>
      <div>
        <p className="text-sm text-slate-400">Дневная цель</p>
        <p className="text-2xl font-bold text-white">
          {xpToday} <span className="text-slate-500 text-lg">/ {DAILY_GOAL_XP} XP</span>
        </p>
        <p className={`text-sm mt-1 ${done ? "text-green-400" : "text-amber-400"}`}>
          {done ? "Цель выполнена — отлично!" : `Осталось ${DAILY_GOAL_XP - xpToday} XP`}
        </p>
      </div>
    </div>
  );
}
