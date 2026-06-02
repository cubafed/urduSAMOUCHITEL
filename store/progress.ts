"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  // Completed lessons
  completedLessons: Record<string, boolean>;
  completedExercises: Record<string, boolean>;
  xp: number;
  streak: number;
  lastStudyDate: string | null;

  // Flashcards (Leitner)
  cards: LeitnerCard[];

  // Error journal
  errors: ErrorEntry[];

  // Checklist
  checklistItems: Record<string, boolean>;

  // Pomodoro
  pomodoroCount: number;

  // Actions
  completeLesson: (lessonId: string) => void;
  completeExercise: (exerciseId: string, correct: boolean) => void;
  addCard: (card: Omit<LeitnerCard, "box" | "nextReview">) => void;
  reviewCard: (cardId: string, correct: boolean) => void;
  addError: (entry: Omit<ErrorEntry, "id" | "createdAt">) => void;
  removeError: (id: string) => void;
  toggleChecklist: (key: string) => void;
  incrementPomodoro: () => void;
};

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

export const useProgress = create<ProgressStore>()(
  persist(
    (set, get) => ({
      completedLessons: {},
      completedExercises: {},
      xp: 0,
      streak: 0,
      lastStudyDate: null,
      cards: [],
      errors: [],
      checklistItems: {},
      pomodoroCount: 0,

      completeLesson: (lessonId) => {
        const today = new Date().toDateString();
        const last = get().lastStudyDate;
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const newStreak =
          last === today ? get().streak : last === yesterday ? get().streak + 1 : 1;
        set((s) => ({
          completedLessons: { ...s.completedLessons, [lessonId]: true },
          xp: s.xp + 50,
          streak: newStreak,
          lastStudyDate: today,
        }));
      },

      completeExercise: (exerciseId, correct) => {
        set((s) => ({
          completedExercises: { ...s.completedExercises, [exerciseId]: true },
          xp: s.xp + (correct ? 10 : 0),
        }));
      },

      addCard: (card) => {
        const exists = get().cards.find((c) => c.id === card.id);
        if (exists) return;
        set((s) => ({
          cards: [
            ...s.cards,
            { ...card, box: 1, nextReview: Date.now() },
          ],
        }));
      },

      reviewCard: (cardId, correct) => {
        set((s) => ({
          cards: s.cards.map((c) => {
            if (c.id !== cardId) return c;
            const newBox = correct ? (Math.min(c.box + 1, 4) as 1|2|3|4) : 1;
            return {
              ...c,
              box: newBox,
              nextReview: Date.now() + BOX_INTERVALS[newBox],
            };
          }),
        }));
      },

      addError: (entry) => {
        set((s) => ({
          errors: [
            { ...entry, id: crypto.randomUUID(), createdAt: Date.now() },
            ...s.errors,
          ],
        }));
      },

      removeError: (id) => {
        set((s) => ({ errors: s.errors.filter((e) => e.id !== id) }));
      },

      toggleChecklist: (key) => {
        set((s) => ({
          checklistItems: { ...s.checklistItems, [key]: !s.checklistItems[key] },
        }));
      },

      incrementPomodoro: () => {
        set((s) => ({ pomodoroCount: s.pomodoroCount + 1 }));
      },
    }),
    { name: "urdu-progress" }
  )
);
