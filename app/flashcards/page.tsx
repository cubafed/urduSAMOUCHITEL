"use client";
import { useState, useEffect } from "react";
import { useProgress, type LeitnerCard } from "@/store/progress";
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

  // Очередь сессии фиксируется при старте и НЕ пересчитывается на лету,
  // иначе проверенная карточка исчезает из списка и сбивает индексы.
  const [queue, setQueue] = useState<LeitnerCard[]>([]);
  const [pos, setPos] = useState(0);
  const [started, setStarted] = useState(false);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });

  const now = Date.now();
  const dueCount = cards.filter((c) => c.nextReview <= now).length;

  const buildQueue = (f: "due" | "all") => {
    const list =
      f === "due" ? cards.filter((c) => c.nextReview <= Date.now()) : [...cards];
    setQueue(list);
    setPos(0);
    setStats({ correct: 0, wrong: 0 });
    setFilter(f);
    setStarted(true);
  };

  // Первичная сборка очереди, когда карточки подгрузились из localStorage
  useEffect(() => {
    if (!started && cards.length > 0) {
      setQueue(cards.filter((c) => c.nextReview <= Date.now()));
      setStarted(true);
    }
  }, [cards, started]);

  const current = queue[pos];
  const finished = started && queue.length > 0 && pos >= queue.length;

  const handleReview = (correct: boolean) => {
    if (!current) return;
    reviewCard(current.id, correct);
    setStats((s) => ({
      correct: s.correct + (correct ? 1 : 0),
      wrong: s.wrong + (correct ? 0 : 1),
    }));
    setPos((p) => p + 1);
  };

  const boxCounts = [1, 2, 3, 4].map((b) => ({
    box: b,
    count: cards.filter((c) => c.box === b).length,
  }));

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Карточки Лейтнера</h1>
        <p className="text-slate-400 mt-1">
          Интервальные повторения · {cards.length} карточек всего
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

      {/* Filter — кнопки пересобирают сессию */}
      <div className="flex gap-2">
        <button
          onClick={() => buildQueue("due")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "due" ? "bg-amber-500 text-black" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          На сегодня ({dueCount})
        </button>
        <button
          onClick={() => buildQueue("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "all" ? "bg-amber-500 text-black" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          Все ({cards.length})
        </button>
      </div>

      {/* Card */}
      {queue.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <CreditCard size={48} className="mx-auto mb-4 opacity-40" />
          <p className="text-lg">
            {filter === "due"
              ? "Карточек на сегодня нет — возвращайся позже!"
              : "Карточек нет. Добавь слова из уроков (вкладка «Словарь»)."}
          </p>
        </div>
      ) : finished ? (
        <div className="text-center py-12 text-green-400">
          <p className="text-2xl font-bold">Сессия завершена! 🎉</p>
          <p className="text-slate-300 mt-3">
            Знал: <span className="text-green-400 font-bold">{stats.correct}</span> ·{" "}
            Ошибся: <span className="text-red-400 font-bold">{stats.wrong}</span> из {queue.length}
          </p>
          <button
            onClick={() => buildQueue(filter)}
            className="mt-5 px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            Пройти снова
          </button>
        </div>
      ) : current ? (
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-slate-400">
            <span>{pos + 1} / {queue.length}</span>
            <span>Коробка {current.box} · {BOX_LABELS[current.box]}</span>
          </div>
          {/* key сбрасывает переворот при смене карточки */}
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
