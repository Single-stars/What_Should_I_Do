import { questions, resultMap } from "./quiz-data";
import type { AnswerHistoryItem, Answers, QuizResult, ResultKey, ScoreMap } from "./quiz-types";

const resultOrder = Object.keys(resultMap) as ResultKey[];

export function calculateResult(history: AnswerHistoryItem[], answers: Answers): QuizResult {
  const scores = Object.fromEntries(resultOrder.map((key) => [key, 0])) as ScoreMap;

  history.forEach(({ option }) => {
    Object.entries(option.scores || {}).forEach(([key, score]) => {
      scores[key as ResultKey] += score ?? 0;
    });
  });

  const identity = answers.identity;
  if (identity === "graduate" || identity === "gap") scores.transition += 2;
  if (identity === "solo") scores.feedback += 1;
  if (identity === "switcher") scores.experiment += 1;
  if (answers.concern === "meaningless" && scores.meaning < scores.energy) scores.meaning += 2;

  const [key] = Object.entries(scores).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return resultOrder.indexOf(a[0] as ResultKey) - resultOrder.indexOf(b[0] as ResultKey);
  })[0] as [ResultKey, number];

  return { key, ...resultMap[key] };
}

export function getQuestionTitle(question: (typeof questions)[number], answers: Answers): string {
  return typeof question.title === "function" ? question.title(answers) : question.title;
}
