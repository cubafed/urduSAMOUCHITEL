"use client";
import { useState } from "react";
import Link from "next/link";
import { useProgress, CHECKLIST_ITEMS } from "@/store/progress";
import { mainLessons, introLessons } from "@/data/lessons";
import { BookOpen, CreditCard, Brain, Timer, Flame, Star, AlertCircle } from "lucide-react";
import { LevelBadge } from "@/components/ui/LevelBadge";
import { DailyGoalRing } from "@/components/ui/DailyGoalRing";

export default function Dashboard() {
  const {
    completedLessons,
    xp,
    streak,
    pomodoroCount,
    cards,
    errors,
    checklistItems,
    cardsReviewedTotal,
    bestFlashcardCombo,
  } = useProgress();

  const totalLessons = introLessons.length + mainLessons.length;
  const done = Object.values(completedLessons).filter(Boolean).length;
  const pct = Math.round((done / totalLessons) * 100);
  const checkDone = CHECKLIST_ITEMS.filter((i) => checklistItems[i.key]).length;
  const [dueNow] = useState(() => Date.now());
  const dueCards = cards.filter((c) => c.nextReview <= dueNow).length;

  const allLessons = [...introLessons, ...mainLessons];
  const nextLesson = allLessons.find((l) => !completedLessons[l.id]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Добро пожаловать</h1>
          <p className="text-slate-400 mt-1">Самоучитель урду · Учебник Давидовой</p>
        </div>
        <div
          className="text-5xl leading-none"
          dir="rtl"
          lang="ur"
          style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
        >
          خوش آمدید
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <LevelBadge />
        <DailyGoalRing />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat icon={<Star className="text-amber-400" size={20} />} label="Очки XP" value={xp} />
        <Stat icon={<Flame className="text-orange-400" size={20} />} label="Стрик" value={`${streak} дн.`} />
        <Stat icon={<Timer className="text-blue-400" size={20} />} label="Pomodoro" value={pomodoroCount} />
        <Stat icon={<AlertCircle className="text-red-400" size={20} />} label="Ошибки в журнале" value={errors.length} />
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Прогресс курса</h2>
          <span className="text-amber-400 font-bold">{pct}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-3">
          <div
            className="bg-amber-500 h-3 rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-slate-400">
          <span>{done} / {totalLessons} уроков пройдено</span>
          <span>{checkDone} / {CHECKLIST_ITEMS.length} навыков освоено</span>
        </div>
      </div>

      {nextLesson && (
        <Link
          href={`/lessons/${nextLesson.course}/${nextLesson.number}`}
          className="block rounded-2xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 transition-colors p-6"
        >
          <p className="text-sm text-amber-400/70 uppercase tracking-widest mb-1">Продолжить →</p>
          <h2 className="text-xl font-bold text-white">{nextLesson.title}</h2>
          <p className="text-slate-400 text-sm mt-1">{nextLesson.subtitle}</p>
        </Link>
      )}

      {dueCards > 0 && (
        <Link
          href="/flashcards"
          className="block rounded-2xl border border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/20 transition-colors p-6"
        >
          <p className="text-sm text-blue-400/70 uppercase tracking-widest mb-1">Карточки на сегодня</p>
          <h2 className="text-xl font-bold text-white">{dueCards} карточек ждут повторения</h2>
          <p className="text-slate-400 text-sm mt-1">
            Интервальные повторения · +3 XP за «Знал» · бонус за сессию
            {bestFlashcardCombo >= 3 && ` · рекорд серии: ${bestFlashcardCombo}`}
          </p>
        </Link>
      )}

      {cards.length > 0 && dueCards === 0 && (
        <p className="text-sm text-slate-500 text-center">
          Всего повторений карточек: {cardsReviewedTotal} · в долгой памяти:{" "}
          {cards.filter((c) => c.box === 4).length}
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { href: "/lessons", icon: BookOpen, label: "Уроки", color: "text-amber-400" },
          { href: "/flashcards", icon: CreditCard, label: "Карточки", color: "text-blue-400" },
          { href: "/exercises", icon: Brain, label: "Упражнения", color: "text-green-400" },
          { href: "/timer", icon: Timer, label: "Pomodoro", color: "text-purple-400" },
        ].map(({ href, icon: Icon, label, color }) => (
          <Link
            key={href}
            href={href}
            className="rounded-xl border border-slate-800 bg-slate-900 p-4 flex flex-col items-center gap-2 hover:border-slate-600 transition-colors"
          >
            <Icon className={color} size={24} />
            <span className="text-sm text-slate-300">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xs text-slate-400">{label}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
