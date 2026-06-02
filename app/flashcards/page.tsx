"use client";
import { useCallback, useState } from "react";
import { useProgress } from "@/store/progress";
import { Flashcard } from "@/components/ui/Flashcard";
import { fireConfetti } from "@/components/ui/Confetti";
import { CreditCard, Flame, Sparkles, Trophy, Zap } from "lucide-react";

const BOX_LABELS: Record<number, string> = {
  1: "Новые (каждый день)",
  2: "Через 1 день",
  3: "Через 3 дня",
  4: "Через 7 дней",
};

function comboLabel(streak: number): string | null {
  if (streak < 3) return null;
  if (streak < 5) return "Отлично!";
  if (streak < 10) return "Серия!";
  return "Невероятно!";
}

export default function FlashcardsPage() {
  const { cards, reviewCard, completeFlashcardSession } = useProgress();
  const [filter, setFilter] = useState<"due" | "all">("due");
  const [now] = useState(() => Date.now());

  const dueCards = cards.filter((c) => c.nextReview <= now);
  const display = filter === "due" ? dueCards : cards;

  const [sessionIds, setSessionIds] = useState<string[]>([]);
  const [sessionIdx, setSessionIdx] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionWrong, setSessionWrong] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [sessionDone, setSessionDone] = useState(false);
  const [lastXpGain, setLastXpGain] = useState<number | null>(null);

  const startSession = useCallback((ids: string[]) => {
    setSessionIds(ids);
    setSessionIdx(0);
    setSessionCorrect(0);
    setSessionWrong(0);
    setCombo(0);
    setBestCombo(0);
    setSessionXp(0);
    setSessionDone(false);
    setLastXpGain(null);
  }, []);

  const snapshotIds = useCallback(
    (f: "due" | "all" = filter) => {
      const t = Date.now();
      const due = cards.filter((c) => c.nextReview <= t);
      const list = f === "due" ? due : cards;
      return list.map((c) => c.id);
    },
    [cards, filter]
  );

  const changeFilter = (f: "due" | "all") => {
    setFilter(f);
    startSession(snapshotIds(f));
  };

  const sessionReady = sessionIds.length > 0;

  const current = sessionIds[sessionIdx]
    ? cards.find((c) => c.id === sessionIds[sessionIdx])
    : undefined;

  const handleReview = (correct: boolean) => {
    if (!current || sessionDone) return;

    const xpFromReview = reviewCard(current.id, correct);
    const newCorrect = sessionCorrect + (correct ? 1 : 0);
    const newWrong = sessionWrong + (correct ? 0 : 1);
    const newCombo = correct ? combo + 1 : 0;
    const newBestCombo = Math.max(bestCombo, newCombo);

    setSessionXp((x) => x + xpFromReview);
    setLastXpGain(xpFromReview);
    setTimeout(() => setLastXpGain(null), 900);
    setSessionCorrect(newCorrect);
    setSessionWrong(newWrong);
    setCombo(newCombo);
    setBestCombo(newBestCombo);

    const nextIdx = sessionIdx + 1;
    if (nextIdx >= sessionIds.length) {
      const bonus = completeFlashcardSession(
        sessionIds.length,
        newCorrect,
        newBestCombo
      );
      setSessionXp((x) => x + bonus);
      setSessionDone(true);
      if (sessionIds.length >= 5) fireConfetti();
    } else {
      setSessionIdx(nextIdx);
    }
  };

  const boxCounts = [1, 2, 3, 4].map((b) => ({
    box: b,
    count: cards.filter((c) => c.box === b).length,
  }));

  const mastered = cards.filter((c) => c.box === 4).length;
  const progressPct =
    sessionIds.length > 0 ? Math.round((sessionIdx / sessionIds.length) * 100) : 0;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Карточки Лейтнера</h1>
        <p className="text-slate-400 mt-1">
          Интервальные повторения · {cards.length} карточек · {mastered} в долгой памяти
        </p>
      </div>

      {/* Boxes */}
      <div className="grid grid-cols-4 gap-3">
        {boxCounts.map(({ box, count }) => (
          <div key={box} className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-center">
            <p className="text-2xl font-bold text-amber-400">{count}</p>
            <p className="text-xs text-slate-500 mt-1">{BOX_LABELS[box]}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(["due", "all"] as const).map((f) => (
          <button
            key={f}
            onClick={() => changeFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f ? "bg-amber-500 text-black" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {f === "due" ? `На сегодня (${dueCards.length})` : `Все (${cards.length})`}
          </button>
        ))}
      </div>

      {/* Session stats bar */}
      {sessionIds.length > 0 && !sessionDone && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="text-slate-400">
              Прогресс: {sessionIdx + 1} / {sessionIds.length}
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <Zap size={14} />
              {sessionXp} XP за сессию
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-3 text-xs">
            <span className="text-green-400">✓ {sessionCorrect}</span>
            <span className="text-red-400">✗ {sessionWrong}</span>
            {combo >= 3 && (
              <span className="flex items-center gap-1 text-orange-400 font-medium animate-pulse">
                <Flame size={12} />
                {combo} подряд · {comboLabel(combo)}
              </span>
            )}
            {lastXpGain !== null && (
              <span className="text-amber-300 font-semibold">+{lastXpGain} XP</span>
            )}
          </div>
        </div>
      )}

      {/* Card */}
      {display.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <CreditCard size={48} className="mx-auto mb-4 opacity-40" />
          <p className="text-lg">
            {filter === "due"
              ? "Карточек на сегодня нет — возвращайся позже!"
              : "Карточек нет. Добавь слова из уроков."}
          </p>
        </div>
      ) : !sessionReady ? (
        <div className="text-center py-12 space-y-4">
          <p className="text-slate-300">
            {display.length} карточек готовы к повторению
          </p>
          <button
            onClick={() => startSession(snapshotIds())}
            className="px-8 py-3 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-colors"
          >
            Начать сессию
          </button>
        </div>
      ) : sessionDone ? (
        <div className="text-center py-12 space-y-4 rounded-2xl border border-green-500/30 bg-green-500/5">
          <Trophy size={48} className="mx-auto text-amber-400" />
          <p className="text-2xl font-bold text-green-400">Сессия завершена!</p>
          <p className="text-slate-300">
            Повторено {sessionIds.length} · верно {sessionCorrect} · ошибок {sessionWrong}
          </p>
          {bestCombo >= 3 && (
            <p className="text-orange-400 flex items-center justify-center gap-2">
              <Flame size={18} />
              Лучшая серия: {bestCombo} подряд
            </p>
          )}
          <p className="text-amber-400 text-lg font-semibold flex items-center justify-center gap-2">
            <Sparkles size={18} />
            +{sessionXp} XP всего
          </p>
          <button
            onClick={() => startSession(snapshotIds())}
            className="mt-2 px-6 py-2 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition-colors"
          >
            Новая сессия
          </button>
        </div>
      ) : current ? (
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-slate-400">
            <span>
              {sessionIdx + 1} / {sessionIds.length}
            </span>
            <span>
              Коробка {current.box} · {BOX_LABELS[current.box]}
            </span>
          </div>
          <Flashcard
            key={current.id}
            front={current.urdu}
            back={current.translation}
            translit={current.translit}
            onCorrect={() => handleReview(true)}
            onWrong={() => handleReview(false)}
          />
        </div>
      ) : null}
    </div>
  );
}
