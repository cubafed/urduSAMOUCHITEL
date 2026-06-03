// Система уровней и достижений — геймификация

export type Level = {
  level: number;
  title: string;      // ранг
  minXp: number;
  urdu: string;       // как звучит ранг на урду
};

// Ранги привязаны к этапам изучения урду (от ученика до знатока)
export const LEVELS: Level[] = [
  { level: 1, title: "Новичок", urdu: "نوآموز", minXp: 0 },
  { level: 2, title: "Ученик", urdu: "شاگرد", minXp: 100 },
  { level: 3, title: "Читающий", urdu: "قاری", minXp: 250 },
  { level: 4, title: "Грамотей", urdu: "خواندہ", minXp: 450 },
  { level: 5, title: "Знаток слов", urdu: "لغوی", minXp: 700 },
  { level: 6, title: "Грамматист", urdu: "نحوی", minXp: 1000 },
  { level: 7, title: "Переводчик", urdu: "مترجم", minXp: 1400 },
  { level: 8, title: "Знаток языка", urdu: "ماہرِ زبان", minXp: 1900 },
  { level: 9, title: "Учёный", urdu: "عالم", minXp: 2500 },
  { level: 10, title: "Мастер урду", urdu: "اُستاد", minXp: 3300 },
];

export function getLevel(xp: number): Level {
  let current = LEVELS[0];
  for (const lvl of LEVELS) {
    if (xp >= lvl.minXp) current = lvl;
  }
  return current;
}

export function getNextLevel(xp: number): Level | null {
  return LEVELS.find((l) => l.minXp > xp) ?? null;
}

// Прогресс до следующего уровня в процентах
export function getLevelProgress(xp: number): number {
  const cur = getLevel(xp);
  const next = getNextLevel(xp);
  if (!next) return 100;
  const span = next.minXp - cur.minXp;
  return Math.round(((xp - cur.minXp) / span) * 100);
}

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji
  // условие проверяется в store по снимку статистики
  check: (stats: AchievementStats) => boolean;
};

export type AchievementStats = {
  xp: number;
  streak: number;
  lessonsCompleted: number;
  exercisesCorrect: number;
  exercisesTotal: number;
  cardsMastered: number;   // карточки в коробке 4
  pomodoroCount: number;
  perfectLessons: number;  // уроки без ошибок в заданиях
  errorsFixed: number;     // удалённые из журнала (проработанные)
  dailyGoalsHit: number;
  examsPassed: number;     // экзамены, сданные на 4–5
  bestExamGrade: number;   // лучшая оценка за экзамен (2–5)
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-lesson", title: "Первый шаг", description: "Пройди первый урок", icon: "🎯", check: (s) => s.lessonsCompleted >= 1 },
  { id: "alphabet", title: "Алфавит покорён", description: "Пройди весь вводный курс", icon: "🔤", check: (s) => s.lessonsCompleted >= 2 },
  { id: "five-lessons", title: "Набираю обороты", description: "Пройди 5 уроков", icon: "🚀", check: (s) => s.lessonsCompleted >= 5 },
  { id: "all-lessons", title: "Весь курс", description: "Пройди все 13 уроков", icon: "🏆", check: (s) => s.lessonsCompleted >= 13 },
  { id: "streak-3", title: "Три дня подряд", description: "Стрик 3 дня", icon: "🔥", check: (s) => s.streak >= 3 },
  { id: "streak-7", title: "Неделя без пропусков", description: "Стрик 7 дней", icon: "⚡", check: (s) => s.streak >= 7 },
  { id: "streak-16", title: "Марафонец", description: "Стрик 16 дней — весь план!", icon: "👑", check: (s) => s.streak >= 16 },
  { id: "xp-500", title: "Полтысячи XP", description: "Набери 500 XP", icon: "⭐", check: (s) => s.xp >= 500 },
  { id: "xp-1500", title: "Опытный", description: "Набери 1500 XP", icon: "🌟", check: (s) => s.xp >= 1500 },
  { id: "master", title: "Устад", description: "Достигни 10 уровня", icon: "🎓", check: (s) => s.xp >= 3300 },
  { id: "perfect-lesson", title: "Без единой ошибки", description: "Пройди урок со 100% заданий", icon: "💯", check: (s) => s.perfectLessons >= 1 },
  { id: "ten-cards", title: "Долгая память", description: "Доведи 10 карточек до коробки 4", icon: "🧠", check: (s) => s.cardsMastered >= 10 },
  { id: "pomodoro-10", title: "Фокус", description: "Заверши 10 сессий Pomodoro", icon: "🍅", check: (s) => s.pomodoroCount >= 10 },
  { id: "error-master", title: "Работа над ошибками", description: "Проработай 10 ошибок из журнала", icon: "🔧", check: (s) => s.errorsFixed >= 10 },
  { id: "daily-7", title: "Дисциплина", description: "Выполни дневную цель 7 раз", icon: "📅", check: (s) => s.dailyGoalsHit >= 7 },
  { id: "exam-passed", title: "Экзамен сдан", description: "Сдай пробный экзамен на 4 или 5", icon: "📝", check: (s) => s.examsPassed >= 1 },
  { id: "exam-five", title: "Отличник", description: "Сдай пробный экзамен на 5", icon: "🥇", check: (s) => s.bestExamGrade >= 5 },
];

export const DAILY_GOAL_XP = 60; // целевые XP в день
