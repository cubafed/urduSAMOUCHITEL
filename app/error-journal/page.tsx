"use client";
import { useState } from "react";
import { useProgress } from "@/store/progress";
import { Trash2, AlertCircle } from "lucide-react";

export default function ErrorJournalPage() {
  const { errors, removeError } = useProgress();
  const [filter, setFilter] = useState<string>("all");

  const lessons = Array.from(new Set(errors.map((e) => e.lessonId)));
  const filtered = filter === "all" ? errors : errors.filter((e) => e.lessonId === filter);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Журнал ошибок</h1>
        <p className="text-slate-400 mt-1">
          {errors.length} записей · Именно их повторяй в первую очередь
        </p>
      </div>

      {/* Filter */}
      {lessons.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-lg text-sm ${
              filter === "all"
                ? "bg-amber-500 text-black"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Все ({errors.length})
          </button>
          {lessons.map((lid) => (
            <button
              key={lid}
              onClick={() => setFilter(lid)}
              className={`px-3 py-1 rounded-lg text-sm ${
                filter === lid
                  ? "bg-amber-500 text-black"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {lid}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <AlertCircle size={48} className="mx-auto mb-4 opacity-40" />
          <p className="text-lg">Ошибок нет — отличная работа!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((err) => (
            <div
              key={err.id}
              className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 space-y-2"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <p className="text-xs text-slate-500 uppercase tracking-widest">
                    {err.lessonId} · {new Date(err.createdAt).toLocaleDateString("ru")}
                  </p>
                  <p className="text-sm text-slate-300">{err.explanation}</p>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-2">
                      <p className="text-xs text-red-400/70 mb-1">Неправильно</p>
                      <p
                        className="text-white text-sm"
                        dir={/[؀-ۿ]/.test(err.wrong) ? "rtl" : "ltr"}
                        style={/[؀-ۿ]/.test(err.wrong) ? { fontFamily: "'Noto Nastaliq Urdu', serif", fontSize: "1.1rem" } : {}}
                      >
                        {err.wrong || "—"}
                      </p>
                    </div>
                    <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-2">
                      <p className="text-xs text-green-400/70 mb-1">Правильно</p>
                      <p
                        className="text-white text-sm"
                        dir={/[؀-ۿ]/.test(err.correct) ? "rtl" : "ltr"}
                        style={/[؀-ۿ]/.test(err.correct) ? { fontFamily: "'Noto Nastaliq Urdu', serif", fontSize: "1.1rem" } : {}}
                      >
                        {err.correct}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeError(err.id)}
                  className="p-2 text-slate-600 hover:text-red-400 transition-colors flex-shrink-0"
                  title="Удалить запись"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
