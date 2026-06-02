"use client";
import { useProgress, CHECKLIST_ITEMS } from "@/store/progress";
import { CheckCircle, Circle } from "lucide-react";

export default function ChecklistPage() {
  const { checklistItems, toggleChecklist, xp } = useProgress();
  const done = CHECKLIST_ITEMS.filter((i) => checklistItems[i.key]).length;
  const pct = Math.round((done / CHECKLIST_ITEMS.length) * 100);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Чек-лист готовности</h1>
        <p className="text-slate-400 mt-1">Отмечай по мере освоения навыков</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-sm">Готовность к экзамену</span>
          <span className={`font-bold text-lg ${pct >= 100 ? "text-green-400" : pct >= 60 ? "text-amber-400" : "text-slate-400"}`}>
            {pct}%
          </span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${pct >= 100 ? "bg-green-500" : "bg-amber-500"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-sm text-slate-400">{done} / {CHECKLIST_ITEMS.length} навыков · {xp} XP</p>
      </div>

      <div className="space-y-2">
        {CHECKLIST_ITEMS.map((item) => {
          const checked = checklistItems[item.key];
          return (
            <button
              key={item.key}
              onClick={() => toggleChecklist(item.key)}
              className={`w-full flex items-center gap-4 rounded-xl border p-4 text-left transition-colors ${
                checked
                  ? "border-green-500/40 bg-green-500/10"
                  : "border-slate-800 bg-slate-900 hover:border-amber-500/30"
              }`}
            >
              {checked ? (
                <CheckCircle className="text-green-400 flex-shrink-0" size={22} />
              ) : (
                <Circle className="text-slate-600 flex-shrink-0" size={22} />
              )}
              <span className={checked ? "text-green-200" : "text-slate-300"}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {pct >= 100 && (
        <div className="rounded-2xl border border-green-500/40 bg-green-500/10 p-6 text-center">
          <p className="text-2xl font-bold text-green-400">Готов к экзамену!</p>
          <p className="text-slate-400 mt-2">Все навыки освоены. Удачи на сессии!</p>
        </div>
      )}
    </div>
  );
}
