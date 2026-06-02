"use client";
import { use, useState } from "react";
import { notFound } from "next/navigation";
import { introLessons, mainLessons } from "@/data/lessons";
import { useProgress } from "@/store/progress";
import { GrammarCard } from "@/components/ui/GrammarCard";
import { UrduText } from "@/components/ui/UrduText";
import { ExerciseBlock } from "@/components/ui/ExerciseBlock";
import { AudioButton } from "@/components/ui/AudioButton";
import { fireConfetti } from "@/components/ui/Confetti";
import { BookmarkPlus, Check, CheckCircle } from "lucide-react";
import { LessonPerfectWatcher } from "@/components/LessonPerfectWatcher";

type Params = Promise<{ course: string; number: string }>;

const TABS = ["Грамматика", "Текст", "Словарь", "Задания"] as const;
type Tab = (typeof TABS)[number];

export default function LessonPage({ params }: { params: Params }) {
  const { course, number } = use(params);
  const [tab, setTab] = useState<Tab>("Грамматика");
  const [showTranslit, setShowTranslit] = useState(true);
  const [showTranslation, setShowTranslation] = useState(false);

  const { completedLessons, completeLesson, addCard, hasCard } = useProgress();

  const all = [...introLessons, ...mainLessons];
  const lesson = all.find(
    (l) => l.course === course && l.number === Number(number)
  );

  if (!lesson) return notFound();

  const completed = completedLessons[lesson.id];
  const exerciseIds = lesson.exercises.map((e) => e.id);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-amber-400/70 uppercase tracking-widest mb-1">
            {lesson.course === "intro" ? "Вводный курс" : "Основной курс"}
          </p>
          <h1 className="text-2xl font-bold text-white">{lesson.title}</h1>
          <p className="text-slate-400">{lesson.subtitle}</p>
        </div>
        <div className="flex-shrink-0">
          {completed ? (
            <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
              <CheckCircle size={18} /> Пройден
            </div>
          ) : (
            <button
              onClick={() => { completeLesson(lesson.id); fireConfetti(); }}
              className="px-4 py-2 bg-amber-500 text-black text-sm font-semibold rounded-lg hover:bg-amber-400 transition-colors"
            >
              Отметить пройденным
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-900 rounded-xl p-1 border border-slate-800">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t
                ? "bg-amber-500 text-black"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Grammar */}
      {tab === "Грамматика" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-sm text-slate-400 mb-1">Тема урока</p>
            <p className="text-white">{lesson.grammarTopic}</p>
          </div>
          {lesson.grammarCards.map((card, i) => (
            <GrammarCard key={i} card={card} />
          ))}
        </div>
      )}

      {/* Text */}
      {tab === "Текст" && (
        <div className="space-y-4">
          <div className="flex gap-3">
            <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={showTranslit}
                onChange={(e) => setShowTranslit(e.target.checked)}
                className="accent-amber-500"
              />
              Транслит
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={showTranslation}
                onChange={(e) => setShowTranslation(e.target.checked)}
                className="accent-amber-500"
              />
              Перевод
            </label>
          </div>
          <div className="space-y-4">
            {lesson.text.map((line, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-800 bg-slate-900 p-4 flex items-start justify-between gap-4"
              >
                <span className="text-slate-600 text-sm mt-1 flex-shrink-0">{i + 1}.</span>
                <div className="flex-1">
                  <UrduText
                    urdu={line.urdu}
                    translit={line.translit}
                    translation={line.translation}
                    showTranslit={showTranslit}
                    showTranslation={showTranslation}
                    size="md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vocabulary */}
      {tab === "Словарь" && (
        <div className="space-y-2">
          {lesson.vocabulary.map((word, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-800 bg-slate-900 p-3 flex items-center gap-3"
            >
              <div className="flex items-center gap-2">
                <AudioButton text={word.urdu} />
                <span
                  dir="rtl"
                  lang="ur"
                  className="text-2xl text-white"
                  style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
                >
                  {word.urdu}
                </span>
              </div>
              <div className="flex-1 ml-2">
                <span className="text-amber-300/70 font-mono text-sm">{word.translit}</span>
                {" — "}
                <span className="text-white text-sm">{word.translation}</span>
                {word.gender && (
                  <span className="ml-2 text-xs text-slate-500">({word.gender}.р.)</span>
                )}
              </div>
              <button
                onClick={() =>
                  addCard({
                    id: `${lesson.id}-${i}`,
                    urdu: word.urdu,
                    translit: word.translit,
                    translation: word.translation,
                    lessonId: lesson.id,
                  })
                }
                className={`p-1.5 transition-colors ${
                  hasCard(`${lesson.id}-${i}`)
                    ? "text-green-400"
                    : "text-slate-500 hover:text-amber-400"
                }`}
                title={
                  hasCard(`${lesson.id}-${i}`)
                    ? "Уже в карточках"
                    : "Добавить в карточки"
                }
              >
                {hasCard(`${lesson.id}-${i}`) ? (
                  <Check size={16} />
                ) : (
                  <BookmarkPlus size={16} />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Exercises */}
      {tab === "Задания" && (
        <div className="space-y-4">
          <LessonPerfectWatcher lessonId={lesson.id} exerciseIds={exerciseIds} />
          <p className="text-sm text-slate-400">
            Выполни все задания без ошибок — получишь +25 XP и достижение «Без единой ошибки».
          </p>
          {lesson.exercises.map((ex) => (
            <ExerciseBlock key={ex.id} exercise={ex} lessonId={lesson.id} />
          ))}
        </div>
      )}
    </div>
  );
}
