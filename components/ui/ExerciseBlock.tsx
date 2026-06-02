"use client";
import { useState } from "react";
import type { Exercise } from "@/data/lessons";
import { useProgress } from "@/store/progress";
import { AudioButton } from "./AudioButton";
import { CheckCircle, XCircle } from "lucide-react";

export function ExerciseBlock({ exercise, lessonId }: { exercise: Exercise; lessonId: string }) {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { completeExercise, addError } = useProgress();

  const isCorrect =
    exercise.type === "choose"
      ? selected === exercise.answer
      : input.trim() === exercise.answer.trim();

  const handleSubmit = () => {
    setSubmitted(true);
    completeExercise(exercise.id, isCorrect);
    if (!isCorrect) {
      addError({
        wrong: exercise.type === "choose" ? (selected ?? "") : input,
        correct: exercise.answer,
        explanation: `Задание: ${exercise.prompt}`,
        lessonId,
      });
    }
  };

  const isUrduPrompt = /[؀-ۿ]/.test(exercise.prompt);

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 space-y-3">
      <div className="flex items-start gap-2">
        <span className="text-xs text-amber-400/60 uppercase tracking-widest mt-1">
          {exercise.type === "urdu_to_ru" ? "урду → рус" : exercise.type === "ru_to_urdu" ? "рус → урду" : "выбор"}
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {isUrduPrompt && <AudioButton text={exercise.prompt} />}
        <p
          className={`${isUrduPrompt ? "text-2xl font-urdu" : "text-base"} text-white`}
          dir={isUrduPrompt ? "rtl" : "ltr"}
          style={isUrduPrompt ? { fontFamily: "'Noto Nastaliq Urdu', serif" } : {}}
        >
          {exercise.prompt}
        </p>
      </div>

      {exercise.type === "choose" && exercise.options ? (
        <div className="grid grid-cols-2 gap-2">
          {exercise.options.map((opt) => (
            <button
              key={opt}
              disabled={submitted}
              onClick={() => setSelected(opt)}
              className={`p-2 rounded-lg border text-sm transition-colors text-left ${
                submitted
                  ? opt === exercise.answer
                    ? "border-green-500 bg-green-500/20 text-green-300"
                    : opt === selected
                    ? "border-red-500 bg-red-500/20 text-red-300"
                    : "border-slate-600 text-slate-400"
                  : selected === opt
                  ? "border-amber-500 bg-amber-500/20 text-amber-200"
                  : "border-slate-600 text-slate-300 hover:border-amber-500/50"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <input
          type="text"
          dir={exercise.type === "ru_to_urdu" ? "rtl" : "ltr"}
          disabled={submitted}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !submitted && handleSubmit()}
          placeholder={exercise.type === "ru_to_urdu" ? "Введите на урду..." : "Введите перевод..."}
          className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
          style={exercise.type === "ru_to_urdu" ? { fontFamily: "'Noto Nastaliq Urdu', serif", fontSize: "1.2rem" } : {}}
        />
      )}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={exercise.type === "choose" ? !selected : !input.trim()}
          className="px-4 py-2 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Проверить
        </button>
      ) : (
        <div className={`flex items-center gap-2 text-sm font-medium ${isCorrect ? "text-green-400" : "text-red-400"}`}>
          {isCorrect ? <CheckCircle size={16} /> : <XCircle size={16} />}
          {isCorrect ? "Верно!" : (
            <span>
              Правильный ответ:{" "}
              <span
                dir={/[؀-ۿ]/.test(exercise.answer) ? "rtl" : "ltr"}
                style={/[؀-ۿ]/.test(exercise.answer) ? { fontFamily: "'Noto Nastaliq Urdu', serif" } : {}}
              >
                {exercise.answer}
              </span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
