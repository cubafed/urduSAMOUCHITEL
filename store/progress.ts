"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ACHIEVEMENTS,
  type AchievementStats,
  DAILY_GOAL_XP,
} from "@/lib/gamification";

export type LeitnerCard = {
  id: string;
  urdu: string;
  translit: string;
  translation: string;
  box: 1 | 2 | 3 | 4;
  nextReview: number; // timestamp
  lessonId: string;
};

export type ErrorEntry = {
  id: string;
  wrong: string;
  correct: string;
  explanation: string;
  lessonId: string;
  createdAt: number;
};

export type ProgressStore = {
  // Lessons & exercises
  completedLessons: Record<string, boolean>;
  completedExercises: Record<string, boolean>;
  perfectLessons: Record<string, boolean>;
  exercisesCorrect: number;
  exercisesTotal: number;
  errorsFixed: number;

  // XP / streak / level
  xp: number;
  streak: number;
  lastStudyDate: string | null;

  // Daily goal
  todayDate: string | null;
  todayXp: number;
  dailyGoalsHit: number;

  // Flashcards (Leitner)
  cards: LeitnerCard[];

  // Error journal
  errors: ErrorEntry[];

  // Checklist
  checklistItems: Record<string, boolean>;

  // Pomodoro
  pomodoroCount: number;

  // Exam (mock exam mode)
  examsPassed: number;     // экзамены, сданные на 4–5
  bestExamGrade: number;   // лучшая оценка (2–5)
  examHistory: ExamResult[];

  // Achievements
  unlockedAchievements: Record<string, number>; // id -> timestamp
  newlyUnlocked: string[]; // queue for toast display

  // Actions
  completeLesson: (lessonId: string) => void;
  completeExercise: (exerciseId: string, correct: boolean) => void;
  markPerfectLesson: (lessonId: string) => void;
  addCard: (card: Omit<LeitnerCard, "box" | "nextReview">) => void;
  reviewCard: (cardId: string, correct: boolean) => void;
  addError: (entry: Omit<ErrorEntry, "id" | "createdAt">) => void;
  removeError: (id: string) => void;
  toggleChecklist: (key: string) => void;
  incrementPomodoro: () => void;
  recordExam: (correct: number, total: number) => ExamResult;
  dismissAchievement: (id: string) => void;
  _award: (xp: number) => Partial<ProgressStore>;
  _checkAchievements: () => void;
};

export type ExamResult = {
  date: number;
  correct: number;
  total: number;
  percent: number;
  grade: number; // 2–5
};

// Оценка по проценту правильных: как на реальном экзамене
export function gradeFromPercent(percent: number): number {
  if (percent >= 90) return 5;
  if (percent >= 75) return 4;
  if (percent >= 50) return 3;
  return 2;
}

const BOX_INTERVALS: Record<number, number> = {
  1: 0,
  2: 24 * 60 * 60 * 1000,      // 1 day
  3: 3 * 24 * 60 * 60 * 1000,  // 3 days
  4: 7 * 24 * 60 * 60 * 1000,  // 7 days
};

export const CHECKLIST_ITEMS = [
  { key: "reading", label: "Бегло читаю письмо урду вслух" },
  { key: "plural", label: "Знаю род существительных и мн. число" },
  { key: "tenses", label: "Образую все времена глагола (наст., прош., буд.)" },
  { key: "postpositions", label: "Употребляю послелоги и косвенную форму" },
  { key: "imperative", label: "Строю повелительное и сослагательное наклонение" },
  { key: "passive", label: "Образую страдательный залог" },
  { key: "causative", label: "Образую каузативные глаголы" },
  { key: "numerals", label: "Числительные до 100" },
  { key: "translation", label: "Перевожу 10 предложений без учебника в обе стороны" },
];

function buildStats(s: ProgressStore): AchievementStats {
  return {
    xp: s.xp,
    streak: s.streak,
    lessonsCompleted: Object.values(s.completedLessons).filter(Boolean).length,
    exercisesCorrect: s.exercisesCorrect,
    exercisesTotal: s.exercisesTotal,
    cardsMastered: s.cards.filter((c) => c.box === 4).length,
    pomodoroCount: s.pomodoroCount,
    perfectLessons: Object.values(s.perfectLessons).filter(Boolean).length,
    errorsFixed: s.errorsFixed,
    dailyGoalsHit: s.dailyGoalsHit,
    examsPassed: s.examsPassed,
    bestExamGrade: s.bestExamGrade,
  };
}

export const useProgress = create<ProgressStore>()(
  persist(
    (set, get) => ({
      completedLessons: {},
      completedExercises: {},
      perfectLessons: {},
      exercisesCorrect: 0,
      exercisesTotal: 0,
      errorsFixed: 0,
      xp: 0,
      streak: 0,
      lastStudyDate: null,
      todayDate: null,
      todayXp: 0,
      dailyGoalsHit: 0,
      cards: [],
      errors: [],
      checklistItems: {},
      pomodoroCount: 0,
      examsPassed: 0,
      bestExamGrade: 0,
      examHistory: [],
      unlockedAchievements: {},
      newlyUnlocked: [],

      // Начисление XP + учёт дневной цели + стрик. Возвращает patch.
      _award: (gainedXp) => {
        const s = get();
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        // Стрик
        const newStreak =
          s.lastStudyDate === today
            ? s.streak
            : s.lastStudyDate === yesterday
            ? s.streak + 1
            : 1;

        // Дневная цель
        const isNewDay = s.todayDate !== today;
        const prevTodayXp = isNewDay ? 0 : s.todayXp;
        const newTodayXp = prevTodayXp + gainedXp;
        const goalWasHit = prevTodayXp >= DAILY_GOAL_XP;
        const goalNowHit = newTodayXp >= DAILY_GOAL_XP;
        const dailyGoalsHit =
          !goalWasHit && goalNowHit ? s.dailyGoalsHit + 1 : s.dailyGoalsHit;

        return {
          xp: s.xp + gainedXp,
          streak: newStreak,
          lastStudyDate: today,
          todayDate: today,
          todayXp: newTodayXp,
          dailyGoalsHit,
        };
      },

      _checkAchievements: () => {
        const s = get();
        const stats = buildStats(s);
        const freshly: string[] = [];
        const unlocked = { ...s.unlockedAchievements };
        for (const a of ACHIEVEMENTS) {
          if (!unlocked[a.id] && a.check(stats)) {
            unlocked[a.id] = Date.now();
            freshly.push(a.id);
          }
        }
        if (freshly.length > 0) {
          set({
            unlockedAchievements: unlocked,
            newlyUnlocked: [...s.newlyUnlocked, ...freshly],
          });
        }
      },

      completeLesson: (lessonId) => {
        if (get().completedLessons[lessonId]) return;
        set((s) => ({
          completedLessons: { ...s.completedLessons, [lessonId]: true },
          ...get()._award(50),
        }));
        get()._checkAchievements();
      },

      completeExercise: (exerciseId, correct) => {
        const already = get().completedExercises[exerciseId];
        set((s) => ({
          completedExercises: { ...s.completedExercises, [exerciseId]: true },
          exercisesTotal: already ? s.exercisesTotal : s.exercisesTotal + 1,
          exercisesCorrect:
            correct && !already ? s.exercisesCorrect + 1 : s.exercisesCorrect,
          ...(correct ? get()._award(10) : {}),
        }));
        get()._checkAchievements();
      },

      markPerfectLesson: (lessonId) => {
        if (get().perfectLessons[lessonId]) return;
        set((s) => ({
          perfectLessons: { ...s.perfectLessons, [lessonId]: true },
          ...get()._award(25),
        }));
        get()._checkAchievements();
      },

      addCard: (card) => {
        if (get().cards.find((c) => c.id === card.id)) return;
        set((s) => ({
          cards: [...s.cards, { ...card, box: 1, nextReview: Date.now() }],
        }));
      },

      reviewCard: (cardId, correct) => {
        set((s) => ({
          cards: s.cards.map((c) => {
            if (c.id !== cardId) return c;
            const newBox = correct ? (Math.min(c.box + 1, 4) as 1 | 2 | 3 | 4) : 1;
            return { ...c, box: newBox, nextReview: Date.now() + BOX_INTERVALS[newBox] };
          }),
          ...(correct ? get()._award(2) : {}),
        }));
        get()._checkAchievements();
      },

      addError: (entry) => {
        set((s) => ({
          errors: [{ ...entry, id: crypto.randomUUID(), createdAt: Date.now() }, ...s.errors],
        }));
      },

      removeError: (id) => {
        set((s) => ({
          errors: s.errors.filter((e) => e.id !== id),
          errorsFixed: s.errorsFixed + 1,
        }));
        get()._checkAchievements();
      },

      toggleChecklist: (key) => {
        set((s) => ({
          checklistItems: { ...s.checklistItems, [key]: !s.checklistItems[key] },
        }));
      },

      incrementPomodoro: () => {
        set((s) => ({ pomodoroCount: s.pomodoroCount + 1 }));
        get()._checkAchievements();
      },

      // Фиксируем результат пробного экзамена: оценка, история, XP-бонус
      recordExam: (correct, total) => {
        const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
        const grade = gradeFromPercent(percent);
        const result: ExamResult = { date: Date.now(), correct, total, percent, grade };
        // Бонус XP: за сам экзамен + по 5 за каждый правильный ответ
        const bonus = 30 + correct * 5;
        set((s) => ({
          examHistory: [result, ...s.examHistory].slice(0, 20),
          examsPassed: grade >= 4 ? s.examsPassed + 1 : s.examsPassed,
          bestExamGrade: Math.max(s.bestExamGrade, grade),
          ...get()._award(bonus),
        }));
        get()._checkAchievements();
        return result;
      },

      dismissAchievement: (id) => {
        set((s) => ({ newlyUnlocked: s.newlyUnlocked.filter((x) => x !== id) }));
      },
    }),
    { name: "urdu-progress" }
  )
);
