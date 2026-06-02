"use client";
import { useState } from "react";
import type { GrammarCard as GC } from "@/data/lessons";
import { AudioButton } from "./AudioButton";
import { ChevronDown } from "lucide-react";

export function GrammarCard({ card }: { card: GC }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-amber-500/10 transition-colors"
      >
        <span className="text-amber-200 font-medium">{card.question}</span>
        <ChevronDown
          size={18}
          className={`text-amber-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-amber-500/20">
          <div className="mt-3 bg-slate-900/60 rounded-lg p-3">
            <p className="text-sm text-amber-300/80 uppercase tracking-widest mb-1">Формула</p>
            <p className="text-white font-mono text-sm">{card.formula}</p>
          </div>
          <div className="bg-slate-900/40 rounded-lg p-3">
            <p className="text-sm text-amber-300/80 uppercase tracking-widest mb-2">Пример</p>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <AudioButton text={card.example.urdu} />
                <span
                  dir="rtl"
                  lang="ur"
                  className="text-2xl text-white"
                  style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
                >
                  {card.example.urdu}
                </span>
              </div>
              <div className="text-right">
                <p className="text-amber-300/70 font-mono text-sm">{card.example.translit}</p>
                <p className="text-gray-300 text-sm">{card.example.translation}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
