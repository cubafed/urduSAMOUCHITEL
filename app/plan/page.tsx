"use client";
import { useState } from "react";
import Link from "next/link";
import { mainLessons, introLessons } from "@/data/lessons";
import { CheckCircle, Circle } from "lucide-react";

const PLAN = [
  {
    day: 1,
    topic: "Вводный курс + Урок 1 (Знакомство)",
    desc: "Алфавит: формы букв, соединения, несоединяющиеся буквы. Урок 1 — знакомство, профессии, национальности (bāт чīт).",
    goal: "Читать урду вслух + первый диалог",
    lessonIds: ["intro-1", "intro-2", "main-1"],
    focus: ["Формы букв в 4 позициях", "Несоединяющиеся буквы: ا د ذ ر ز و", "Именное сказуемое: وہ صحافی ہے"],
  },
  {
    day: 2,
    topic: "Основной урок 2 — Моя семья",
    desc: "Мн. число существительных; прилагательное; инфинитив и основа глагола; настоящее время. Спряжение جانا، دیکھنا، چاہنا.",
    goal: "Выполнить все задания урока",
    lessonIds: ["main-2"],
    focus: ["Настоящее время: основа + تا/تی/تے + ہے/ہیں", "Мн. число м.р.: -ā → -e", "Основа глагола = инфинитив − نا"],
  },
  {
    day: 3,
    topic: "Основной урок 3",
    desc: "Простые и сложные послелоги; косвенная форма ед.ч.; выражение принадлежности.",
    goal: "Выполнить все задания урока",
    lessonIds: ["main-3"],
    focus: ["Косвенная форма: لڑکا → لڑکے перед послелогом", "Послелоги: کو، میں، پر، سے، کے لیے", "Принадлежность: X کا/کی/کے Y"],
  },
  {
    day: 4,
    topic: "Основной урок 4",
    desc: "Прошедшее несовершенное и продолженное; повелительное наклонение.",
    goal: "Выполнить все задания урока",
    lessonIds: ["main-4"],
    focus: ["Прош. несов.: основа + تا + تھا/تھی/تھے", "Прош. прод.: основа + رہا + تھا/تھی/تھے", "Повел. вежл.: основа + یے/ئیے"],
  },
  {
    day: 5,
    topic: "Основной урок 5",
    desc: "Косвенная форма мн.ч.; степени сравнения; جو-придаточные; суффикс والا.",
    goal: "Выполнить все задания урока",
    lessonIds: ["main-5"],
    focus: ["Сравн. степ.: X سے + прилаг.", "Превосх. степ.: سب سے + прилаг.", "Суффикс والا/والی/والے"],
  },
  {
    day: 6,
    topic: "Основной урок 6",
    desc: "Система прошедших времён: перфект, предпрошедшее; потенциальный глагол سکنا. ТЯЖЁЛЫЙ УРОК.",
    goal: "Выполнить все задания. Хвост → День 13",
    lessonIds: ["main-6"],
    focus: ["Прош. сов. переходных: نے + согл. с объектом", "Перфект: причастие + ہے/ہیں", "سکنا: основа + سکتا ہوں/ہے"],
  },
  {
    day: 7,
    topic: "Основной урок 7",
    desc: "Интенсивные глаголы; числительные; условные придаточные.",
    goal: "Выполнить все задания урока",
    lessonIds: ["main-7"],
    focus: ["Условное: اگر + сослаг. + تو + следствие", "Числительные 1–10: ایک دو تین چار پانچ", "Числительные 6–10: چھ سات آٹھ نو دس"],
  },
  {
    day: 8,
    topic: "Основной урок 8",
    desc: "Простое будущее время; деепричастие предшествующего действия; придаточные причины.",
    goal: "Выполнить все задания урока",
    lessonIds: ["main-8"],
    focus: ["Будущее: основа + گا/گی/گے", "Деепричастие: основа + کر (поделав)", "Причина: کیونکہ (потому что)"],
  },
  {
    day: 9,
    topic: "Основной урок 9",
    desc: "Страдательный залог. Отдельный большой урок — разбери тщательно.",
    goal: "Выполнить все задания урока",
    lessonIds: ["main-9"],
    focus: ["Пассив: причастие сов. вида + جانا (спрягается)", "Деятель: X سے (учителем = استاد سے)", "Пример: پڑھی جاتی ہے"],
  },
  {
    day: 10,
    topic: "Основной урок 10",
    desc: "Сослагательное наклонение (простое и продолженное); придаточные цели.",
    goal: "Выполнить все задания урока",
    lessonIds: ["main-10"],
    focus: ["Сослагат.: основа (без окончаний)", "کاش — хоть бы", "Цель: تاکہ + сослагат."],
  },
  {
    day: 11,
    topic: "Основной урок 11",
    desc: "Инфинитивные предложения долженствования; составные местоимения.",
    goal: "Выполнить все задания урока",
    lessonIds: ["main-11"],
    focus: ["Надо: X کو + инфинитив + ہے/تھا", "Следует: X کو + инфинитив + چاہیے", "مجھے، تمہیں، آپ کو"],
  },
  {
    day: 12,
    topic: "Основной урок 12",
    desc: "Понудительные (каузативные) глаголы; причастия непосредственного предшествования.",
    goal: "Выполнить все задания урока",
    lessonIds: ["main-12"],
    focus: ["Кауз. I: основа + ā + nā (کھانا → کھلانا)", "Кауз. II: основа + وا + نا (پڑھوانا)", "Деятель кауз.: سے"],
  },
  {
    day: 13,
    topic: "Буфер + труднейшие узлы",
    desc: "Доделать хвосты. Пересобрать самые трудные узлы: система прошедших времён (4, 6), залог (9), сослагательное (10), каузативы (12).",
    goal: "Закрыть всё незавершённое",
    lessonIds: ["main-6", "main-9", "main-10", "main-12"],
    focus: ["Система прошедших: все 6 форм подряд", "Страдательный залог vs. активный", "Каузативы I и II сравни"],
  },
  {
    day: 14,
    topic: "Большое повторение I (уроки 2–7)",
    desc: "Прогон карточек + заново 1 «провальное» задание из каждого урока. Кумулятивный самотест.",
    goal: "Кумулятивный тест с перемешанными темами",
    lessonIds: ["main-2", "main-3", "main-4", "main-5", "main-6", "main-7"],
    focus: ["Перемешай задания из разных уроков", "Время — строго по таймеру", "Все ошибки → журнал"],
  },
  {
    day: 15,
    topic: "Большое повторение II (уроки 8–12)",
    desc: "То же для второй половины + прогнать журнал ошибок целиком.",
    goal: "Прогнать журнал ошибок дважды",
    lessonIds: ["main-8", "main-9", "main-10", "main-11", "main-12"],
    focus: ["Пройди журнал ошибок целиком", "Особое внимание залогу и каузативам", "Числительные до 100 (таблица)"],
  },
  {
    day: 16,
    topic: "Пробный экзамен",
    desc: "Имитация: 10 предложений RU→урду, 10 урду→RU, чтение вслух, ответы на вопросы — по таймеру, без учебника. Лёгкое повторение вечером, лечь спать рано.",
    goal: "Пробный экзамен без учебника, по таймеру",
    lessonIds: [],
    focus: ["Смешанный тест: 20 заданий без подсказок", "Чтение текста вслух", "Ответы на вопросы к тексту"],
  },
];

const STORAGE_KEY = "urdu-plan-days";

function usePlanProgress() {
  const getChecked = () => {
    if (typeof window === "undefined") return {} as Record<number, boolean>;
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as Record<number, boolean>;
    } catch {
      return {} as Record<number, boolean>;
    }
  };

  const [checked, setChecked] = useState<Record<number, boolean>>(getChecked);

  const toggle = (day: number) => {
    setChecked((prev) => {
      const next = { ...prev, [day]: !prev[day] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return { checked, toggle };
}

export default function PlanPage() {
  const { checked, toggle } = usePlanProgress();
  const done = PLAN.filter((d) => checked[d.day]).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">План на 16 дней</h1>
        <p className="text-slate-400 mt-1">
          Учебник Давидовой · {done}/16 дней завершено
        </p>
      </div>

      <div className="w-full bg-slate-800 rounded-full h-2">
        <div
          className="bg-amber-500 h-2 rounded-full transition-all"
          style={{ width: `${(done / 16) * 100}%` }}
        />
      </div>

      <div className="space-y-3">
        {PLAN.map((item) => {
          const isDone = checked[item.day];
          const isBuffer = item.day === 13;
          const isExam = item.day === 16;

          return (
            <div
              key={item.day}
              className={`rounded-xl border p-5 space-y-3 transition-colors ${
                isDone
                  ? "border-green-500/40 bg-green-500/5"
                  : isExam
                  ? "border-purple-500/40 bg-purple-500/5"
                  : isBuffer
                  ? "border-blue-500/40 bg-blue-500/5"
                  : "border-slate-800 bg-slate-900"
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggle(item.day)}
                  className="flex-shrink-0 mt-0.5"
                >
                  {isDone ? (
                    <CheckCircle className="text-green-400" size={22} />
                  ) : (
                    <Circle className="text-slate-600 hover:text-slate-400 transition-colors" size={22} />
                  )}
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      isExam ? "bg-purple-500/20 text-purple-400"
                      : isBuffer ? "bg-blue-500/20 text-blue-400"
                      : "bg-amber-500/20 text-amber-400"
                    }`}>
                      День {item.day}
                    </span>
                    <h2 className={`font-semibold ${isDone ? "text-green-200" : "text-white"}`}>
                      {item.topic}
                    </h2>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{item.desc}</p>

                  <div className="mt-3 rounded-lg bg-slate-800/60 p-3">
                    <p className="text-xs text-amber-400/70 uppercase tracking-widest mb-2">Ключевые формулы</p>
                    <ul className="space-y-1">
                      {item.focus.map((f, i) => (
                        <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                          <span className="text-amber-500 flex-shrink-0">·</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {item.lessonIds.length > 0 && (
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {item.lessonIds.map((id) => {
                        const all = [...introLessons, ...mainLessons];
                        const lesson = all.find((l) => l.id === id);
                        if (!lesson) return null;
                        return (
                          <Link
                            key={id}
                            href={`/lessons/${lesson.course}/${lesson.number}`}
                            className="text-xs px-3 py-1 rounded-lg bg-slate-800 text-amber-400 hover:bg-amber-500/20 transition-colors border border-slate-700"
                          >
                            {lesson.title} →
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {item.day === 16 && (
                    <Link
                      href="/exam"
                      className="mt-3 inline-block text-xs px-3 py-1 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors border border-purple-500/30"
                    >
                      Пробный экзамен →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
