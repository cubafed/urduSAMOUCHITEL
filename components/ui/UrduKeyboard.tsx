"use client";
import { Delete } from "lucide-react";

// Экранная клавиатура урду — чтобы вводить ответы без системной раскладки
const ROWS: string[][] = [
  ["ا", "ب", "پ", "ت", "ٹ", "ث", "ج", "چ", "ح", "خ", "د"],
  ["ڈ", "ذ", "ر", "ڑ", "ز", "ژ", "س", "ش", "ص", "ض", "ط"],
  ["ظ", "ع", "غ", "ف", "ق", "ک", "گ", "ل", "م", "ن", "ں"],
  ["و", "ہ", "ھ", "ء", "ی", "ے", "آ", "ؤ", "ئ", "ۀ"],
];

const DIACRITICS = ["َ", "ِ", "ُ", "ّ", "ْ", "ٰ"];

export function UrduKeyboard({
  onKey,
  onBackspace,
  onSpace,
}: {
  onKey: (ch: string) => void;
  onBackspace: () => void;
  onSpace: () => void;
}) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-2 space-y-1" dir="rtl">
      {ROWS.map((row, i) => (
        <div key={i} className="flex gap-1 justify-center flex-wrap">
          {row.map((ch) => (
            <button
              key={ch}
              type="button"
              onClick={() => onKey(ch)}
              className="w-9 h-10 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-black text-white text-xl transition-colors flex items-center justify-center"
              style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
            >
              {ch}
            </button>
          ))}
        </div>
      ))}
      <div className="flex gap-1 justify-center items-center pt-1">
        {DIACRITICS.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => onKey(d)}
            className="w-9 h-9 rounded-lg bg-slate-800/60 hover:bg-amber-500 hover:text-black text-amber-300 text-lg transition-colors"
            style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
          >
            {"◌" + d}
          </button>
        ))}
        <button
          type="button"
          onClick={onSpace}
          className="px-8 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors"
        >
          пробел
        </button>
        <button
          type="button"
          onClick={onBackspace}
          className="w-12 h-9 rounded-lg bg-slate-800 hover:bg-red-500/40 text-slate-300 transition-colors flex items-center justify-center"
        >
          <Delete size={18} />
        </button>
      </div>
    </div>
  );
}
