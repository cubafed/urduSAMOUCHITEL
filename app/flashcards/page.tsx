"use client";
import { useState } from "react";
import { useProgress } from "@/store/progress";
import { Flashcard } from "@/components/ui/Flashcard";
import { CreditCard } from "lucide-react";

const BOX_LABELS: Record<number, string> = {
  1: "Новые (каждый день)",
  2: "Через 1 день",
  3: "Через 3 дня",
  4: "Через 7 дней",
};

export default function FlashcardsPage() {
  const { cards, reviewCard } = useProgress();
  const [filter, setFilter] = useState<"due" | "all">("due");

  const now = Date.now();
  const dueCards = cards.filter((c) => c.nextReview <= now);
  const display = filter === "due" ? dueCards : cards;

  const [idx, setIdx] = useState(0);
  const current = display[idx];

  const handleReview = (correct: boolean) => {
    if (!current) return;
    reviewCard(current.id, correct);
    setIdx((i) => Math.min(i + 1, display.length - 1));
  };

  const boxCounts = [1, 2, 3, 4].map((b) => ({
    box: b,
    count: cards.filter((c) => c.box === b).length,
  }));

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Карточки Лейтнера</h1>
        <p className="text-slate-400 mt-1">Интервальные повторения · {cards.length} карточек всего</p>
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
            onClick={() => { setFilter(f); setIdx(0); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f ? "bg-amber-500 text-black" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {f === "due" ? `На сегодня (${dueCards.length})` : `Все (${cards.length})`}
          </button>
        ))}
      </div>

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
      ) : idx >= display.length ? (
        <div className="text-center py-16 text-green-400">
          <p className="text-2xl font-bold">Сессия завершена! 🎉</p>
          <p className="text-slate-400 mt-2">Повторено {display.length} карточек</p>
          <button
            onClick={() => setIdx(0)}
            className="mt-4 px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            Повторить снова
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-slate-400">
            <span>{idx + 1} / {display.length}</span>
            <span>Коробка {current.box} · {BOX_LABELS[current.box]}</span>
          </div>
          <Flashcard
            front={current.urdu}
            back={current.translation}
            translit={current.translit}
            onCorrect={() => handleReview(true)}
            onWrong={() => handleReview(false)}
          />
        </div>
      )}
    </div>
  );
}
