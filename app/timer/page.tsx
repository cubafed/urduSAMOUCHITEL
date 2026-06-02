"use client";
import { useState, useEffect, useRef } from "react";
import { useProgress } from "@/store/progress";
import { Play, Pause, RotateCcw, Coffee } from "lucide-react";

const WORK_MIN = 50;
const BREAK_MIN = 10;

export default function TimerPage() {
  const { pomodoroCount, incrementPomodoro } = useProgress();
  const [mode, setMode] = useState<"work" | "break">("work");
  const [seconds, setSeconds] = useState(WORK_MIN * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState<{ type: string; time: string }[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            if (mode === "work") {
              incrementPomodoro();
              setSessions((prev) => [
                { type: "Работа 50 мин", time: new Date().toLocaleTimeString("ru") },
                ...prev,
              ]);
              setMode("break");
              setSeconds(BREAK_MIN * 60);
            } else {
              setSessions((prev) => [
                { type: "Перерыв 10 мин", time: new Date().toLocaleTimeString("ru") },
                ...prev,
              ]);
              setMode("work");
              setSeconds(WORK_MIN * 60);
            }
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }
    return () => clearInterval(intervalRef.current!);
  }, [running, mode, incrementPomodoro]);

  const reset = () => {
    setRunning(false);
    setSeconds(mode === "work" ? WORK_MIN * 60 : BREAK_MIN * 60);
  };

  const switchMode = (m: "work" | "break") => {
    setRunning(false);
    setMode(m);
    setSeconds(m === "work" ? WORK_MIN * 60 : BREAK_MIN * 60);
  };

  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  const total = mode === "work" ? WORK_MIN * 60 : BREAK_MIN * 60;
  const pct = ((total - seconds) / total) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Pomodoro 50/10</h1>
        <p className="text-slate-400 mt-1">Всего сессий: {pomodoroCount}</p>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2">
        {(["work", "break"] as const).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === m ? "bg-amber-500 text-black" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {m === "work" ? "Работа (50 мин)" : "Перерыв (10 мин)"}
          </button>
        ))}
      </div>

      {/* Timer circle */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-56 h-56">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={mode === "work" ? "#f59e0b" : "#22c55e"}
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - pct / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-white tabular-nums">
              {mins}:{secs}
            </span>
            <span className="text-slate-400 text-sm mt-1">
              {mode === "work" ? "Фокус" : "Отдых"}
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setRunning((r) => !r)}
            className="flex items-center gap-2 px-8 py-3 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-colors text-lg"
          >
            {running ? <Pause size={20} /> : <Play size={20} />}
            {running ? "Пауза" : "Старт"}
          </button>
          <button
            onClick={reset}
            className="p-3 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 transition-colors"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      {/* Today's tip */}
      <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Coffee size={16} className="text-blue-400" />
          <span className="text-sm font-medium text-blue-300">Напоминание</span>
        </div>
        <p className="text-sm text-slate-300">
          На перерыве не смотри в телефон — встань, потянись, выпей воды. Память консолидируется
          именно в паузах между блоками работы.
        </p>
      </div>

      {/* Session log */}
      {sessions.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-slate-400 uppercase tracking-widest">
            Журнал сегодня
          </h2>
          {sessions.map((s, i) => (
            <div
              key={i}
              className="flex justify-between items-center text-sm text-slate-300 border-b border-slate-800 pb-1"
            >
              <span>{s.type}</span>
              <span className="text-slate-500">{s.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
