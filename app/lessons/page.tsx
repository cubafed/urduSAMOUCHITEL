"use client";
import Link from "next/link";
import { useProgress } from "@/store/progress";
import { introLessons, mainLessons } from "@/data/lessons";
import { CheckCircle, Lock, BookOpen } from "lucide-react";

export default function LessonsPage() {
  const { completedLessons } = useProgress();

  const allLessons = [...introLessons, ...mainLessons];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Уроки</h1>
        <p className="text-slate-400 mt-1">Учебник Давидовой · Вводный и Основной курс</p>
      </div>

      <Section
        title="Вводный курс — Письмо и алфавит"
        lessons={introLessons}
        completedLessons={completedLessons}
        allLessons={allLessons}
      />
      <Section
        title="Основной курс — Грамматика и лексика"
        lessons={mainLessons}
        completedLessons={completedLessons}
        allLessons={allLessons}
      />
    </div>
  );
}

function Section({
  title,
  lessons,
  completedLessons,
  allLessons,
}: {
  title: string;
  lessons: typeof introLessons;
  completedLessons: Record<string, boolean>;
  allLessons: typeof introLessons;
}) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-amber-400">{title}</h2>
      <div className="space-y-2">
        {lessons.map((lesson, idx) => {
          const prevLesson = allLessons[allLessons.indexOf(lesson) - 1];
          const unlocked = !prevLesson || completedLessons[prevLesson.id];
          const completed = completedLessons[lesson.id];

          return (
            <Link
              key={lesson.id}
              href={unlocked ? `/lessons/${lesson.course}/${lesson.number}` : "#"}
              className={`flex items-center gap-4 rounded-xl border p-4 transition-colors ${
                completed
                  ? "border-green-500/40 bg-green-500/10"
                  : unlocked
                  ? "border-slate-700 bg-slate-900 hover:border-amber-500/40"
                  : "border-slate-800 bg-slate-900/50 opacity-50 cursor-not-allowed"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  completed ? "bg-green-500/20" : unlocked ? "bg-amber-500/20" : "bg-slate-800"
                }`}
              >
                {completed ? (
                  <CheckCircle className="text-green-400" size={20} />
                ) : unlocked ? (
                  <BookOpen className="text-amber-400" size={18} />
                ) : (
                  <Lock className="text-slate-600" size={16} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white">{lesson.title}</p>
                <p className="text-sm text-slate-400 truncate">{lesson.subtitle}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-slate-500">{lesson.vocabulary.length} слов</p>
                <p className="text-xs text-slate-500">{lesson.exercises.length} заданий</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
