export type ResultKey =
  | "info"
  | "overload"
  | "expectation"
  | "energy"
  | "experiment"
  | "path"
  | "feedback"
  | "decision"
  | "transition"
  | "meaning";

export type ScoreMap = Record<ResultKey, number>;

export type Answers = Record<string, string>;

export type ResultDefinition = {
  label: string;
  title: string;
  summary: string;
  today: string;
  avoid: string;
  steps: string[];
};

export type QuizResult = ResultDefinition & {
  key: ResultKey;
};

export type QuizOption = {
  value: string;
  label: string;
  description: string;
  scores: Partial<ScoreMap>;
};

export type QuizQuestion = {
  id: string;
  kicker: string;
  title: string | ((answers: Answers) => string);
  progress: string;
  options: QuizOption[];
};

export type AnswerHistoryItem = {
  step: number;
  questionId: string;
  option: QuizOption;
};
