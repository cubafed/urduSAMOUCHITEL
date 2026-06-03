"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { introLessons, mainLessons } from "@/data/lessons";
import type { Exercise } from "@/data/lessons";
import { useProgress, type ExamResult } from "@/store/progress";
import { fireConfetti } from "@/components/ui/Confetti";
import { AudioButton } from "@/components/ui/AudioButton";
import { UrduKeyboard } from "@/components/ui/UrduKeyboard";
import { Timer, AlertTriangle, Trophy, RotateCcw, ArrowRight, Keyboard } from "lucide-react";

const all = [...introLessons, ...mainLessons];
const QUESTION_COUNT = 20;
const EXAM_MINUTES = 30;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Phase = "intro" | "running" | "done";
type Item = { ex: Exercise; lessonId: string };

const GRADE_LABEL: Record<number, string> = {
  5: "Отлично",
  4: "Хорошо",
  3: "Удовлетворительно",
  2: "Неудовлетворительно",
};

export default function ExamPage() {
  const { recordExam, addError } = useProgress();
  const [phase, setPhase] = useState<Phase>("intro");
  const [items, setItems] = useState<Item[]>([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(EXAM_MINUTES * 60);
  const [result, setResult] = useState<ExamResult | null>(null);
  const finishRef = useRef<() => void>(() => {});

  const current = items[idx];
  const isUrduAnswer = current?.ex.type === "ru_to_urdu";
  const isUrduPrompt = current ? /[؀-ۿ]/.test(current.ex.prompt) : false;

  const start = () => {
    const pool = all.flatMap((l) => l.exercises.map((ex) => ({ ex, lessonId: l.id })));
    setItems(shuffle(pool).slice(0, QUESTION_COUNT));
    setIdx(0);
    setAnswers({});
    setInput("");
    setSelected(null);
    setSecondsLeft(EXAM_MINUTES * 60);
    setResult(null);
    setPhase("running");
  };

  // Подсчёт результата + запись в стор
  const finish = (finalAnswers: Record<string, string>) => {
    let correct = 0;
    for (const { ex, lessonId } of items) {
      const given = (finalAnswers[ex.id] ?? "").trim();
      const right = ex.answer.trim();
      if (given && given === right) {
        correct++;
      } else {
        // Все промахи и пропуски — в журнал ошибок
        addError({
          wrong: given || "(нет ответа)",
          correct: ex.answer,
          explanation: `Экзамен · ${ex.prompt}`,
          lessonId,
        });
      }
    }
    const res = recordExam(correct, items.length);
    setResult(res);
    setPhase("done");
    if (res.grade >= 4) fireConfetti();
  };
  finishRef.current = () => finish(answers);

  // Таймер
  useEffect(() => {
    if (phase !== "running") return;
    if (secondsLeft <= 0) {
      finishRef.current();
      return;
    }
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [phase, secondsLeft]);

  const saveAndNext = () => {
    if (!current) return;
    const given = current.ex.type === "choose" ? (selected ?? "") : input;
    const nextAnswers = { ...answers, [current.ex.id]: given };
    setAnswers(nextAnswers);
    setInput("");
    setSelected(null);
    setShowKeyboard(false);
    if (idx + 1 >= items.length) {
      finish(nextAnswers);
    } else {
      setIdx((i) => i + 1);
    }
  };

  const mins = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
  const secs = (secondsLeft % 60).toString().padStart(2, "0");
  const lowTime = secondsLeft <= 60;

  const answered = Object.keys(answers).length;

  const gradeColor = useMemo(() => {
    if (!result) return "text-white";
    return result.grade >= 4 ? "text-green-400" : result.grade === 3 ? "text-amber-400" : "text-red-400";
  }, [result]);

  // --- INTRO ---
  if (phase === "intro") {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Пробный экзамен</h1>
          <p className="text-slate-400 mt-1">Имитация реального экзамена — День 16 плана</p>
        </div>

        <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Timer className="text-purple-400" size={24} />
            <div>
              <p className="text-white font-semibold">{EXAM_MINUTES} минут · {QUESTION_COUNT} заданий</p>
              <p className="text-sm text-slate-400">Перемешанные темы из всех уроков</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex gap-2"><span className="text-purple-400">·</span> Без подсказок и мгновенной проверки</li>
            <li className="flex gap-2"><span className="text-purple-400">·</span> Перевод урду↔русский и выбор ответа</li>
            <li className="flex gap-2"><span className="text-purple-400">·</span> Оценка 2–5 в конце, ошибки → в журнал</li>
            <li className="flex gap-2"><span className="text-purple-400">·</span> Время вышло — экзамен завершается автоматически</li>
          </ul>
          <div className="rounded-lg bg-slate-800/60 p-3 text-xs text-slate-400">
            Шкала: <span className="text-green-400">5</span> ≥ 90% · <span className="text-green-400">4</span> ≥ 75% · <span className="text-amber-400">3</span> ≥ 50% · <span className="text-red-400">2</span> &lt; 50%
          </div>
        </div>

        <button
          onClick={start}
          className="w-full py-4 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-400 transition-colors text-lg"
        >
          Начать экзамен
        </button>
      </div>
    );
  }

  // --- DONE ---
  if (phase === "done" && result) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8 text-center space-y-4">
          <Trophy className={`mx-auto ${gradeColor}`} size={56} />
          <div>
            <p className="text-slate-400 text-sm uppercase tracking-widest">Оценка</p>
            <p className={`text-7xl font-bold ${gradeColor}`}>{result.grade}</p>
            <p className={`text-lg font-medium ${gradeColor}`}>{GRADE_LABEL[result.grade]}</p>
          </div>
          <div className="flex justify-center gap-8 pt-2">
            <div>
              <p className="text-2xl font-bold text-white">{result.correct}/{result.total}</p>
              <p className="text-xs text-slate-400">правильно</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{result.percent}%</p>
              <p className="text-xs text-slate-400">результат</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-400">+{30 + result.correct * 5}</p>
              <p className="text-xs text-slate-400">XP</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-slate-300">
          {result.correct < result.total ? (
            <>Ошибки добавлены в <Link href="/error-journal" className="text-amber-400 underline">журнал ошибок</Link> — проработай их в первую очередь.</>
          ) : (
            <>Идеально! Ни одной ошибки. 🎉</>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={start}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-purple-500 text-white font-semibold rounded-xl hover:bg-purple-400 transition-colors"
          >
            <RotateCcw size={18} /> Ещё раз
          </button>
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-700 transition-colors"
          >
            На дашборд
          </Link>
        </div>
      </div>
    );
  }

  // --- RUNNING ---
  if (!current) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header: progress + timer */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Вопрос {idx + 1} из {items.length}</p>
          <div className="w-48 bg-slate-800 rounded-full h-1.5 mt-1">
            <div className="bg-purple-500 h-1.5 rounded-full transition-all" style={{ width: `${((idx) / items.length) * 100}%` }} />
          </div>
        </div>
        <div className={`flex items-center gap-2 font-mono text-xl font-bold ${lowTime ? "text-red-400 animate-pulse" : "text-white"}`}>
          {lowTime && <AlertTriangle size={18} />}
          <Timer size={18} className={lowTime ? "" : "text-purple-400"} />
          {mins}:{secs}
        </div>
      </div>

      {/* Question */}
      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          {isUrduPrompt && <AudioButton text={current.ex.prompt} />}
          <p
            className={`${isUrduPrompt ? "text-3xl" : "text-lg"} text-white`}
            dir={isUrduPrompt ? "rtl" : "ltr"}
            style={isUrduPrompt ? { fontFamily: "'Noto Nastaliq Urdu', serif" } : {}}
          >
            {current.ex.prompt}
          </p>
        </div>

        {current.ex.type === "choose" && current.ex.options ? (
          <div className="grid grid-cols-2 gap-2">
            {current.ex.options.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelected(opt)}
                className={`p-3 rounded-lg border text-sm transition-colors text-left ${
                  selected === opt
                    ? "border-purple-500 bg-purple-500/20 text-purple-200"
                    : "border-slate-600 text-slate-300 hover:border-purple-500/50"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                dir={isUrduAnswer ? "rtl" : "ltr"}
                value={input}
                autoFocus
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveAndNext()}
                placeholder={isUrduAnswer ? "Ответ на урду..." : "Перевод на русский..."}
                className="flex-1 bg-slate-950 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                style={isUrduAnswer ? { fontFamily: "'Noto Nastaliq Urdu', serif", fontSize: "1.2rem" } : {}}
              />
              {isUrduAnswer && (
                <button
                  onClick={() => setShowKeyboard((k) => !k)}
                  className={`px-3 rounded-lg border transition-colors ${
                    showKeyboard ? "border-purple-500 bg-purple-500/20 text-purple-300" : "border-slate-600 text-slate-400 hover:text-purple-400"
                  }`}
                >
                  <Keyboard size={18} />
                </button>
              )}
            </div>
            {isUrduAnswer && showKeyboard && (
              <UrduKeyboard
                onKey={(ch) => setInput((v) => v + ch)}
                onBackspace={() => setInput((v) => v.slice(0, -1))}
                onSpace={() => setInput((v) => v + " ")}
              />
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">Отвечено: {answered}/{items.length}</span>
        <button
          onClick={saveAndNext}
          className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white font-semibold rounded-xl hover:bg-purple-400 transition-colors"
        >
          {idx + 1 >= items.length ? "Завершить экзамен" : "Далее"}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
