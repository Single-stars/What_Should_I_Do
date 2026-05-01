"use client";

import { useMemo, useState } from "react";
import { questions } from "@/lib/quiz-data";
import { calculateResult, getQuestionTitle } from "@/lib/quiz-result";
import type { AnswerHistoryItem, Answers, QuizOption, QuizResult } from "@/lib/quiz-types";

type Screen = "start" | "quiz" | "result";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("start");
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [history, setHistory] = useState<AnswerHistoryItem[]>([]);
  const [lastResult, setLastResult] = useState<QuizResult | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  const question = questions[currentStep];
  const progressWidth = `${((currentStep + 1) / questions.length) * 100}%`;
  const questionTitle = useMemo(() => getQuestionTitle(question, answers), [answers, question]);

  function startQuiz() {
    setScreen("quiz");
  }

  function chooseOption(questionId: string, option: QuizOption) {
    const nextAnswers = { ...answers, [questionId]: option.value };
    const nextHistory = [...history, { step: currentStep, questionId, option }];

    setAnswers(nextAnswers);
    setHistory(nextHistory);

    if (currentStep === questions.length - 1) {
      setLastResult(calculateResult(nextHistory, nextAnswers));
      setScreen("result");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setCurrentStep((step) => step + 1);
  }

  function restart() {
    setCurrentStep(0);
    setAnswers({});
    setHistory([]);
    setLastResult(null);
    setScreen("start");
  }

  function goBack() {
    if (currentStep === 0) return;

    const nextHistory = history.slice(0, -1);
    const previous = history[history.length - 1];
    const nextAnswers = { ...answers };
    if (previous) delete nextAnswers[previous.questionId];

    setHistory(nextHistory);
    setAnswers(nextAnswers);
    setCurrentStep((step) => step - 1);
  }

  async function shareResult() {
    if (!lastResult) return;

    const text = `${lastResult.title}\n${lastResult.label}\n${lastResult.today}`;
    const shareData = {
      title: "我的行动测试结果",
      text,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 1800);
  }

  return (
    <>
      <main className="app-shell">
        <section
          className={`hero-screen ${screen === "start" ? "" : "hidden"}`}
          id="start-screen"
          aria-labelledby="hero-title"
        >
          <div className="hero-visual" aria-hidden="true">
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <div className="signal-card signal-card-a">
              <span>下一步</span>
              <strong>今天能做</strong>
            </div>
            <div className="signal-card signal-card-b">
              <span>3 分钟</span>
              <strong>走出卡住</strong>
            </div>
          </div>

          <div className="hero-content">
            <p className="eyebrow">行动测试</p>
            <h1 id="hero-title">是时候去做点什么了</h1>
            <p className="hero-copy">
              从你的身份和近期苦恼开始，回答一组选择题，得到一句可以分享的结论和一个今天就能执行的行动。
            </p>
            <button className="primary-button" type="button" onClick={startQuiz}>
              开始测试
            </button>
          </div>
        </section>

        <section className={`quiz-screen ${screen === "quiz" ? "" : "hidden"}`} aria-live="polite">
          <header className="quiz-header">
            <button
              className="ghost-button"
              type="button"
              aria-label="返回上一题"
              disabled={currentStep === 0}
              style={{ visibility: currentStep === 0 ? "hidden" : "visible" }}
              onClick={goBack}
            >
              返回
            </button>
            <div className="progress-wrap" aria-label="测试进度">
              <div className="progress-meta">
                <span>
                  {currentStep + 1} / {questions.length}
                </span>
                <span>{question.progress}</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: progressWidth }} />
              </div>
            </div>
          </header>

          <article className="question-panel">
            <p className="question-kicker">{question.kicker}</p>
            <h2>{questionTitle}</h2>
            <div className="options-grid">
              {question.options.map((option) => (
                <button
                  className="option-button"
                  type="button"
                  key={option.value}
                  onClick={() => chooseOption(question.id, option)}
                >
                  <strong>{option.label}</strong>
                  <span>{option.description}</span>
                </button>
              ))}
            </div>
          </article>
        </section>

        <section className={`result-screen ${screen === "result" ? "" : "hidden"}`} aria-live="polite">
          {lastResult ? (
            <div className="result-layout">
              <article className="result-main">
                <p className="eyebrow">{lastResult.label}</p>
                <h2>{lastResult.title}</h2>
                <p className="result-summary">{lastResult.summary}</p>

                <div className="action-strip">
                  <div>
                    <span>今天</span>
                    <strong>{lastResult.today}</strong>
                  </div>
                  <div>
                    <span>别再</span>
                    <strong>{lastResult.avoid}</strong>
                  </div>
                </div>

                <div className="detail-block">
                  <h3>你的下一步</h3>
                  <ol>
                    {lastResult.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="result-actions">
                  <button className="primary-button" type="button" onClick={shareResult}>
                    分享结果
                  </button>
                  <button className="ghost-button" type="button" onClick={restart}>
                    重新测试
                  </button>
                </div>
              </article>

              <aside className="share-card" aria-label="分享卡片预览">
                <p>{lastResult.label}</p>
                <h3>{lastResult.title}</h3>
                <span>今天先做一件具体的小事。</span>
              </aside>
            </div>
          ) : null}
        </section>
      </main>

      <div className={`toast ${toastVisible ? "" : "hidden"}`} role="status">
        已复制分享文案
      </div>
    </>
  );
}
