"use client";
import { useEffect } from "react";
import { useProgress } from "@/store/progress";

/** Вызывает markPerfectLesson, когда все задания урока отвечены верно. */
export function LessonPerfectWatcher({
  lessonId,
  exerciseIds,
}: {
  lessonId: string;
  exerciseIds: string[];
}) {
  const { exerciseResults, perfectLessons, markPerfectLesson } = useProgress();

  useEffect(() => {
    if (perfectLessons[lessonId]) return;
    if (exerciseIds.length === 0) return;
    const allCorrect = exerciseIds.every((id) => exerciseResults[id] === true);
    if (allCorrect) markPerfectLesson(lessonId);
  }, [exerciseResults, exerciseIds, lessonId, markPerfectLesson, perfectLessons]);

  return null;
}
