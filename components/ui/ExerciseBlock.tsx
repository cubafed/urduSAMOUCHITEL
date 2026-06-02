"use client";
import { useState } from "react";
import type { Exercise } from "@/data/lessons";
import { useProgress } from "@/store/progress";
import { AudioButton } from "./AudioButton";
import { UrduKeyboard } from "./UrduKeyboard";
import { CheckCircle, XCircle, Keyboard, Lightbulb } from "lucide-react";

export function ExerciseBlock({ exercise, lessonId }: { exercise: Exercise; lessonId: string }) {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { completeExercise, addError } = useProgress();

  const isUrduAnswer = exercise.type === "ru_to_urdu";

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
  // Подсказка: первая буква/слово ответа
  const hint = isUrduAnswer
    ? exercise.answer.slice(0, 2) + "…"
    : exercise.answer.split(" ")[0] + "…";

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-amber-400/60 uppercase tracking-widest">
          {exercise.type === "urdu_to_ru" ? "урду → рус" : exercise.type === "ru_to_urdu" ? "рус → урду" : "выбор"}
        </span>
        {!submitted && exercise.type !== "choose" && (
          <button
            onClick={() => setShowHint(true)}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-amber-400 transition-colors"
            title="Подсказка (−5 XP в уме)"
          >
            <Lightbulb size={14} /> Подсказка
          </button>
        )}
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

      {showHint && !submitted && (
        <p className="text-sm text-amber-300/70">
          Начни так:{" "}
          <span dir={isUrduAnswer ? "rtl" : "ltr"} style={isUrduAnswer ? { fontFamily: "'Noto Nastaliq Urdu', serif" } : {}}>
            {hint}
          </span>
        </p>
      )}

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
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              dir={isUrduAnswer ? "rtl" : "ltr"}
              disabled={submitted}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !submitted && handleSubmit()}
              placeholder={isUrduAnswer ? "Введите на урду..." : "Введите перевод..."}
              className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
              style={isUrduAnswer ? { fontFamily: "'Noto Nastaliq Urdu', serif", fontSize: "1.2rem" } : {}}
            />
            {isUrduAnswer && !submitted && (
              <button
                onClick={() => setShowKeyboard((k) => !k)}
                className={`px-3 rounded-lg border transition-colors ${
                  showKeyboard ? "border-amber-500 bg-amber-500/20 text-amber-300" : "border-slate-600 text-slate-400 hover:text-amber-400"
                }`}
                title="Урду-клавиатура"
              >
                <Keyboard size={18} />
              </button>
            )}
          </div>
          {isUrduAnswer && showKeyboard && !submitted && (
            <UrduKeyboard
              onKey={(ch) => setInput((v) => v + ch)}
              onBackspace={() => setInput((v) => v.slice(0, -1))}
              onSpace={() => setInput((v) => v + " ")}
            />
          )}
        </div>
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
          {isCorrect ? "Верно! +10 XP" : (
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
