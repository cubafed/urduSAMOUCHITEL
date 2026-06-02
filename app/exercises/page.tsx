"use client";
import { useState } from "react";
import { mainLessons, introLessons } from "@/data/lessons";
import { ExerciseBlock } from "@/components/ui/ExerciseBlock";
import type { Exercise } from "@/data/lessons";

const all = [...introLessons, ...mainLessons];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function ExercisesPage() {
  const [mode, setMode] = useState<"lesson" | "mixed" | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [exercises, setExercises] = useState<{ ex: Exercise; lessonId: string }[]>([]);

  const startLesson = (lessonId: string) => {
    const lesson = all.find((l) => l.id === lessonId);
    if (!lesson) return;
    setExercises(lesson.exercises.map((ex) => ({ ex, lessonId })));
    setSelectedLesson(lessonId);
    setMode("lesson");
  };

  const startMixed = () => {
    const pool = all.flatMap((l) =>
      l.exercises.map((ex) => ({ ex, lessonId: l.id }))
    );
    setExercises(shuffle(pool).slice(0, 20));
    setMode("mixed");
  };

  if (!mode) {
    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Упражнения</h1>
          <p className="text-slate-400 mt-1">Перевод, выбор ответа, составление предложений</p>
        </div>

        <div
          onClick={startMixed}
          className="rounded-2xl border border-green-500/40 bg-green-500/10 hover:bg-green-500/20 transition-colors p-6 cursor-pointer"
        >
          <p className="text-sm text-green-400/70 uppercase tracking-widest mb-1">Рекомендуется</p>
          <h2 className="text-xl font-bold text-white">Смешанный тест (interleaving)</h2>
          <p className="text-slate-400 text-sm mt-1">20 случайных заданий из всех уроков — как на экзамене</p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-amber-400">По уроку</h2>
          {all.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => startLesson(lesson.id)}
              className="w-full flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-4 hover:border-amber-500/40 transition-colors text-left"
            >
              <div>
                <p className="font-medium text-white">{lesson.title}</p>
                <p className="text-sm text-slate-400">{lesson.subtitle}</p>
              </div>
              <span className="text-sm text-slate-500">{lesson.exercises.length} зад.</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const title =
    mode === "mixed"
      ? "Смешанный тест"
      : all.find((l) => l.id === selectedLesson)?.title ?? "Задания";

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-sm text-slate-400">{exercises.length} заданий</p>
        </div>
        <button
          onClick={() => setMode(null)}
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          ← Назад
        </button>
      </div>

      <div className="space-y-4">
        {exercises.map(({ ex, lessonId }) => (
          <ExerciseBlock key={ex.id} exercise={ex} lessonId={lessonId} />
        ))}
      </div>
    </div>
  );
}
