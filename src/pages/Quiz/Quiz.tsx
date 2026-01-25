import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getQuestions } from "../../redux/slices/questionsSlice";
import { GameState, UIState, QuizQuestion, QuizPair } from "../../constants/interfaces/questions";
import "./Arena.scss";

const Arena: React.FC = () => {
  const dispatch = useAppDispatch();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string | boolean | Record<string, string> | null>(null);
  const [matchPairs, setMatchPairs] = useState<Record<string, string>>({});
  const [timer, setTimer] = useState(30);
  const [timerActive, setTimerActive] = useState(true);

  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    streak: 0,
    highScore: 0,
    totalPoints: 0,
    pointsAwarded: 0
  });

  const [uiState, setUiState] = useState<UIState>({
    showExplanation: false,
    showAnimation: false,
    showConfetti: false,
    showIntroduction: true,
    quizStarted: false,
    timeExpired: false,
    isCorrect: null,
    feedbackMessage: "",
    quizCompleted: false
  });

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  const questionsData: QuizQuestion[] = useAppSelector((state) => state.questions.data);

  useEffect(() => {
    const savedHighScore = localStorage.getItem('arenaHighScore');
    if (savedHighScore) {
      setGameState(prev => ({ ...prev, highScore: parseInt(savedHighScore) }));
    }
  }, []);

  const handleTimeExpired = React.useCallback(() => {
    setTimerActive(false);
    setUiState(prev => ({ ...prev, timeExpired: true }));
    setGameState(prev => {
      if (prev.score > prev.highScore) {
        const newHighScore = prev.score;
        localStorage.setItem('arenaHighScore', newHighScore.toString());
        return { ...prev, highScore: newHighScore };
      }
      return prev;
    });
  }, []);

  const getCurrentQuestion = (): QuizQuestion | null => {
    if (!questionsData || !Array.isArray(questionsData) || questionsData.length === 0) {
      return null;
    }
    
    if (currentQuestionIndex < 0 || currentQuestionIndex >= questionsData.length) {
      return null;
    }
    
    return questionsData[currentQuestionIndex] || null;
  };

  useEffect(() => {
    // Timer countdown
    let interval: NodeJS.Timeout | null = null;

    if (timerActive && timer > 0 && !uiState.showExplanation && uiState.quizStarted) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0 && !uiState.showExplanation && uiState.quizStarted) {
      handleTimeExpired();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, timerActive, uiState.showExplanation, uiState.quizStarted, handleTimeExpired]);

  const handleMatchPairChange = (left: string, right: string) => {
    setMatchPairs(prev => ({
      ...prev,
      [left]: right
    }));
  };

  const calculatePoints = (difficulty: string, timeRemaining: number) => {
    // Ensure difficulty is a valid string
    const difficultyLevel = difficulty?.toLowerCase() || 'medium';
    
    // Base points by difficulty
    const basePointMap: Record<string, number> = {
      easy: 100,
      beginner: 100,
      medium: 200,
      intermediate: 200,
      hard: 300,
      advanced: 300,
      expert: 500
    };
    
    const basePoints = basePointMap[difficultyLevel] || 200;

    const timeBonus = Math.floor((timeRemaining || 0) * 3.33);

    const streakBonus = gameState.streak * 50;

    return basePoints + timeBonus + streakBonus;
  };

  const handleSubmit = () => {
    if (uiState.showExplanation) return;

    setTimerActive(false);
    setUiState(prev => ({ ...prev, showExplanation: true }));

    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return;
    
    let correct = false;

    switch (currentQuestion.type) {
      case "multiple-choice":
      case "code-output":
      case "fill-in-the-blank":
        correct = userAnswer === currentQuestion.answer;
        break;
      case "true-false":
        correct = userAnswer === currentQuestion.answer;
        break;
      case "match-pairs":
        if (currentQuestion.pairs && 
            Array.isArray(currentQuestion.pairs) && 
            currentQuestion.pairs.length > 0 &&
            currentQuestion.answer) {
          const expectedPairs = currentQuestion.answer as Record<string, string>;
          const allPairsSelected = Object.values(matchPairs).every(value => value !== "");
          correct = allPairsSelected && Object.entries(matchPairs).every(
            ([key, value]) => expectedPairs[key] === value
          );
        }
        break;
      default:
        break;
    }

    setUiState(prev => ({ ...prev, isCorrect: correct }));

    if (correct) {
      const pointsEarned = calculatePoints(currentQuestion.difficulty, timer);
      setGameState(prev => ({ 
        ...prev, 
        pointsAwarded: pointsEarned, 
        score: prev.score + pointsEarned,
        totalPoints: prev.totalPoints + pointsEarned,
        streak: prev.streak + 1
      }));
      
      // Update streak feedback separately with the incremented streak value
      const newStreak = gameState.streak + 1;
      setUiState(prev => ({ 
        ...prev, 
        feedbackMessage: newStreak >= 3 ? `Impressive! ${newStreak} in a row!` : "Correct!" 
      }));
    } else {
      setGameState(prev => ({ ...prev, streak: 0 }));
      setUiState(prev => ({ ...prev, feedbackMessage: "Not quite right." }));
    }

    setUiState(prev => ({ ...prev, showAnimation: true }));
    setTimeout(() => setUiState(prev => ({ ...prev, showAnimation: false })), 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer(null);
      setMatchPairs({});
      setTimer(30);
      setTimerActive(true);
      setUiState(prev => ({ 
        ...prev, 
        showExplanation: false,
        isCorrect: null,
        feedbackMessage: ""
      }));
    } else {
      setUiState(prev => ({ ...prev, quizCompleted: true }));
      
      // Save high score if current score is higher - using functional update
      setGameState(prev => {
        if (prev.score > prev.highScore) {
          localStorage.setItem('arenaHighScore', prev.score.toString());
          return { ...prev, highScore: prev.score };
        }
        return prev;
      });

      // Show confetti if score is good
      if (gameState.score >= gameState.totalPoints * 0.7) {
        setUiState(prev => ({ ...prev, showConfetti: true }));
        // Stop confetti after 5 seconds
        setTimeout(() => setUiState(prev => ({ ...prev, showConfetti: false })), 5000);
      }
    }
  };

  const startQuiz = () => {
    setUiState(prev => ({ ...prev, showIntroduction: false, quizStarted: true }));
  };

  const resetQuiz = () => {
    if (!questionsData.length) {
      dispatch(getQuestions());
    }
    
    // Reset all state in a specific order to prevent potential race conditions
    setCurrentQuestionIndex(0);
    setUserAnswer(null);
    setMatchPairs({});
    setTimer(30);
    setTimerActive(true);

    // Reset game state
    setGameState(prev => ({
      ...prev,
      score: 0,
      totalPoints: 0,
      streak: 0,
      pointsAwarded: 0
      // Keep the high score intact
    }));

    // Reset UI state
    setUiState(prev => ({
      ...prev,
      quizCompleted: false,
      showIntroduction: false,
      quizStarted: true,
      showExplanation: false,
      showAnimation: false,
      showConfetti: false,
      timeExpired: false,
      isCorrect: null,
      feedbackMessage: ""
    }));
  };

  // Format question text to highlight code snippets
  const formatQuestionText = (text: string) => {
    // Check if question contains code
    if (text.includes('`')) {
      // Replace inline code with formatted spans
      const parts = text.split(/(`[^`]+`)/).filter(Boolean);

      return (
        <>
          {parts.map((part, index) => {
            if (part.startsWith('`') && part.endsWith('`')) {
              // This is code - format it
              const code = part.slice(1, -1);
              return (
                <code key={index} className="arena__code">
                  {code}
                </code>
              );
            }
            // This is regular text
            return <span key={index}>{part}</span>;
          })}
        </>
      );
    }

    // Regular text without code
    return text;
  };

  const renderQuestion = () => {
    if (!questionsData.length) return <div className="arena__loader">Loading questions...</div>;
    
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) {
      // Handle missing question case
      return <div className="arena__loader">Question not available</div>;
    }

    switch (currentQuestion.type) {
      case "multiple-choice":
      case "code-output":
        return (
          <div className="arena__question-card">
            <div className="arena__question-header">
              <span className={`arena__badge arena__badge--${currentQuestion.difficulty.toLowerCase()}`}>
                {currentQuestion.difficulty}
              </span>
              <span className="arena__topic">{currentQuestion.topic}</span>
            </div>

            <h2 className="arena__prompt">{formatQuestionText(currentQuestion.question)}</h2>

            <div className="arena__options">
              {Array.isArray(currentQuestion.options) && currentQuestion.options?.map((option: string, index: number) => (
                <button
                  key={index}
                  className={`arena__option ${userAnswer === option ? 'is-selected' : ''} 
                    ${uiState.showExplanation ? (option === currentQuestion.answer ? 'is-correct' :
                      userAnswer === option ? 'is-incorrect' : '') : ''}`}
                  onClick={() => !uiState.showExplanation && setUserAnswer(option)}
                  disabled={uiState.showExplanation}
                >
                  {formatQuestionText(option)}
                </button>
              ))}
            </div>
          </div>
        );

      case "true-false":
        return (
          <div className="arena__question-card">
            <div className="arena__question-header">
              <span className={`arena__badge arena__badge--${currentQuestion.difficulty.toLowerCase()}`}>
                {currentQuestion.difficulty}
              </span>
              <span className="arena__topic">{currentQuestion.topic}</span>
            </div>

            <h2 className="arena__prompt">{formatQuestionText(currentQuestion.question)}</h2>

            <div className="arena__options arena__options--split">
              <button
                className={`arena__option ${userAnswer === true ? 'is-selected' : ''} 
                  ${uiState.showExplanation ? (currentQuestion.answer === true ? 'is-correct' :
                    userAnswer === true ? 'is-incorrect' : '') : ''}`}
                onClick={() => !uiState.showExplanation && setUserAnswer(true)}
                disabled={uiState.showExplanation}
              >
                True
              </button>
              <button
                className={`arena__option ${userAnswer === false ? 'is-selected' : ''} 
                  ${uiState.showExplanation ? (currentQuestion.answer === false ? 'is-correct' :
                    userAnswer === false ? 'is-incorrect' : '') : ''}`}
                onClick={() => !uiState.showExplanation && setUserAnswer(false)}
                disabled={uiState.showExplanation}
              >
                False
              </button>
            </div>
          </div>
        );

      case "fill-in-the-blank":
        return (
          <div className="arena__question-card">
            <div className="arena__question-header">
              <span className={`arena__badge arena__badge--${currentQuestion.difficulty.toLowerCase()}`}>
                {currentQuestion.difficulty}
              </span>
              <span className="arena__topic">{currentQuestion.topic}</span>
            </div>

            <h2 className="arena__prompt">{formatQuestionText(currentQuestion.question)}</h2>

            <div className="arena__fill">
              <input
                type="text"
                className={`arena__input ${uiState.showExplanation ?
                  (userAnswer === currentQuestion.answer ? 'is-correct' : 'is-incorrect') : ''}`}
                value={userAnswer as string || ""}
                onChange={(e) => !uiState.showExplanation && setUserAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !uiState.showExplanation && userAnswer !== null) {
                    handleSubmit();
                  }
                }}
                placeholder="Type your answer here..."
                disabled={uiState.showExplanation}
              />
            </div>
          </div>
        );

      case "match-pairs":
        const pairs = currentQuestion.pairs || [];
        if (!Array.isArray(pairs) || pairs.length === 0) {
          return <div className="arena__loader">Match pairs not available</div>;
        }
        const options = pairs.map(p => p.right);

        return (
          <div className="arena__question-card">
            <div className="arena__question-header">
              <span className={`arena__badge arena__badge--${currentQuestion.difficulty.toLowerCase()}`}>
                {currentQuestion.difficulty}
              </span>
              <span className="arena__topic">{currentQuestion.topic}</span>
            </div>

            <h2 className="arena__prompt">{formatQuestionText(currentQuestion.question)}</h2>

            <div className="arena__match">
              {pairs.map((pair: QuizPair, index: number) => (
                <div
                  key={index}
                  className={`arena__match-row ${uiState.showExplanation && currentQuestion.answer ?
                    ((currentQuestion.answer as Record<string, string>)[pair.left] === matchPairs[pair.left] ?
                      'is-correct' : 'is-incorrect') : ''}`}
                >
                  <div className="arena__match-left">{formatQuestionText(pair.left)}</div>
                  <div className="arena__match-right">
                    <select
                      className="arena__select"
                      value={matchPairs[pair.left] || ""}
                      onChange={(e) => !uiState.showExplanation && handleMatchPairChange(pair.left, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !uiState.showExplanation && Object.values(matchPairs).every(value => value !== "")) {
                          handleSubmit();
                        }
                      }}
                      disabled={uiState.showExplanation}
                    >
                      <option value="">-- Select --</option>
                      {options.map((option: string, i: number) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Unknown question type</div>;
    }
  };

  // Confetti component
  const Confetti = () => {
    const [particles, setParticles] = useState<React.ReactNode[]>([]);
    
    useEffect(() => {
      // Create confetti particles
      try {
        const colors = ["#1E88E5", "#43A047", "#E53935", "#FDD835", "#FB8C00", "#8E24AA"];
        const shapes = ["square", "circle"];
        const newParticles: React.ReactNode[] = [];
        
        for (let i = 0; i < 100; i++) {
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const size = Math.random() * 10 + 5;
          const color = colors[Math.floor(Math.random() * colors.length)];
          const shape = shapes[Math.floor(Math.random() * shapes.length)];
          const animationDuration = Math.random() * 3 + 2;
          const animationDelay = Math.random() * 0.5;
          
          newParticles.push(
            <div
              key={i}
              className={`arena__confetti-particle ${shape}`}
              style={{
                left: `${left}%`,
                top: `-${size}px`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                animationDuration: `${animationDuration}s`,
                animationDelay: `${animationDelay}s`
              }}
            />
          );
        }
        setParticles(newParticles);
      } catch (error) {
        console.error("Error creating confetti:", error);
        // Fallback to no particles to avoid crashing
        setParticles([]);
      }
    }, []);
    
    return <div className="arena__confetti">{particles}</div>;
  };

  // Introduction screen
  if (uiState.showIntroduction) {
    return (
      <div className="arena">
        <div className="arena__bg" />
        <div className="arena__shell">
          <div className="arena__screen">
            <div className="arena__hero">
              <span className="arena__eyebrow">JavaScript Arena</span>
              <h1>Sharpen skills with fast, focused challenges.</h1>
              <p>
                Answer real-world questions under pressure, build streaks, and
                earn points that scale with difficulty and speed.
              </p>
              <div className="arena__cta">
                <button className="arena__primary" onClick={startQuiz}>
                  Start the challenge
                </button>
                <div className="arena__meta">
                  30 seconds per question · Streak bonuses · New topics weekly
                </div>
              </div>
            </div>
            <div className="arena__panel">
              <div className="arena__panel-header">
                <h2>Your arena snapshot</h2>
                <span className="arena__pill">Live</span>
              </div>
              <div className="arena__stat-grid">
                <div className="arena__stat">
                  <span className="arena__stat-label">High score</span>
                  <span className="arena__stat-value">
                    {gameState.highScore > 0 ? gameState.highScore : "—"}
                  </span>
                </div>
                <div className="arena__stat">
                  <span className="arena__stat-label">Time per round</span>
                  <span className="arena__stat-value">30s</span>
                </div>
                <div className="arena__stat">
                  <span className="arena__stat-label">Streak bonus</span>
                  <span className="arena__stat-value">+50 / streak</span>
                </div>
                <div className="arena__stat">
                  <span className="arena__stat-label">Difficulty mix</span>
                  <span className="arena__stat-value">Adaptive</span>
                </div>
              </div>
              <div className="arena__card">
                <h3>How scoring works</h3>
                <p>
                  Points scale with difficulty and remaining time. Keep your
                  streak alive to stack bonuses quickly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Time expired screen
  if (uiState.timeExpired) {
    return (
      <div className="arena">
        <div className="arena__bg" />
        <div className="arena__shell">
          <div className="arena__screen">
            <div className="arena__hero">
              <span className="arena__eyebrow">Round ended</span>
              <h1>Time’s up. Reset and run it again.</h1>
              <p>
                Quick decision-making wins here. Keep your momentum, learn from
                each miss, and push your best score.
              </p>
              <div className="arena__cta">
                <button className="arena__primary" onClick={resetQuiz}>
                  Try again
                </button>
                <div className="arena__meta">
                  Your progress is saved automatically
                </div>
              </div>
            </div>
            <div className="arena__panel">
              <div className="arena__panel-header">
                <h2>Score recap</h2>
                <span className="arena__pill arena__pill--alert">Expired</span>
              </div>
              <div className="arena__stat-grid">
                <div className="arena__stat">
                  <span className="arena__stat-label">Current score</span>
                  <span className="arena__stat-value">{gameState.score}</span>
                </div>
                <div className="arena__stat">
                  <span className="arena__stat-label">Best score</span>
                  <span className="arena__stat-value">
                    {gameState.highScore > 0 ? gameState.highScore : "—"}
                  </span>
                </div>
                <div className="arena__stat">
                  <span className="arena__stat-label">Streak ended</span>
                  <span className="arena__stat-value">{gameState.streak}</span>
                </div>
                <div className="arena__stat">
                  <span className="arena__stat-label">Questions answered</span>
                  <span className="arena__stat-value">
                    {currentQuestionIndex + 1}
                  </span>
                </div>
              </div>
              <div className="arena__card">
                <h3>Tip for next run</h3>
                <p>
                  Skim the prompt, lock in your best guess, and move on quickly.
                  Speed keeps your points multiplier healthy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz completed screen
  if (uiState.quizCompleted) {
    return (
      <div className="arena">
        <div className="arena__bg" />
        {uiState.showConfetti && <Confetti />}
        <div className="arena__shell">
          <div className="arena__screen">
            <div className="arena__hero">
              <span className="arena__eyebrow">Challenge complete</span>
              <h1>Score locked. Ready for another run?</h1>
              <p>
                Review your pacing, sharpen the tricky topics, and push for a
                new high score.
              </p>
              <div className="arena__cta">
                <button className="arena__primary" onClick={resetQuiz}>
                  Challenge again
                </button>
                <div className="arena__meta">
                  You can restart anytime and keep your best score
                </div>
              </div>
            </div>
            <div className="arena__panel">
              <div className="arena__panel-header">
                <h2>Final stats</h2>
                <span className="arena__pill arena__pill--success">Completed</span>
              </div>
              <div className="arena__stat-grid">
                <div className="arena__stat arena__stat--primary">
                  <span className="arena__stat-label">Final score</span>
                  <span className="arena__stat-value">{gameState.score}</span>
                </div>
                <div className="arena__stat">
                  <span className="arena__stat-label">Best score</span>
                  <span className="arena__stat-value">{gameState.highScore}</span>
                </div>
                <div className="arena__stat">
                  <span className="arena__stat-label">Total points</span>
                  <span className="arena__stat-value">{gameState.totalPoints}</span>
                </div>
                <div className="arena__stat">
                  <span className="arena__stat-label">Best streak</span>
                  <span className="arena__stat-value">{gameState.streak}</span>
                </div>
              </div>
              <div className="arena__card">
                <h3>Performance note</h3>
                <p>
                  {gameState.score === gameState.highScore && gameState.score > 0
                    ? "New personal best. Keep that momentum."
                    : gameState.score >= gameState.totalPoints * 0.8
                      ? "Elite run. You’re in the top tier."
                      : gameState.score >= gameState.totalPoints * 0.6
                        ? "Strong effort. Tweak timing for a boost."
                        : "Every run builds mastery. Keep practicing."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="arena">
      <div className="arena__bg" />
      <div className="arena__shell">
        <header className="arena__header">
          <div className="arena__header-title">
            <span className="arena__eyebrow">Live round</span>
            <h1>JavaScript Arena</h1>
          </div>
          <div className="arena__header-meta">
            <div className="arena__metric">
              <span className="arena__metric-label">Score</span>
              <span className="arena__metric-value">{gameState.score}</span>
            </div>
            <div className="arena__metric">
              <span className="arena__metric-label">Time left</span>
              <span className={`arena__metric-value ${timer <= 10 ? "is-warning" : ""}`}>
                {timer}s
              </span>
            </div>
          </div>
        </header>

        <div className="arena__progress">
          <div
            className="arena__progress-bar"
            style={{ width: `${((currentQuestionIndex + 1) / questionsData.length) * 100}%` }}
          />
        </div>

        <div className="arena__layout">
          <section className="arena__main">
            {renderQuestion()}

            {uiState.showExplanation && (
              <div className={`arena__explanation ${uiState.isCorrect ? "is-correct" : "is-incorrect"}`}>
                <div className={`arena__feedback ${uiState.showAnimation ? "is-animated" : ""}`}>
                  <span className="arena__feedback-icon">{uiState.isCorrect ? "✓" : "✕"}</span>
                  <span className="arena__feedback-text">{uiState.feedbackMessage}</span>
                  {uiState.isCorrect && gameState.pointsAwarded > 0 && (
                    <span className="arena__feedback-points">+{gameState.pointsAwarded} points</span>
                  )}
                </div>
                <h3>Why it works</h3>
                <p>{getCurrentQuestion()?.explanation}</p>
              </div>
            )}

            <div className="arena__controls">
              {!uiState.showExplanation ? (
                <button
                  className="arena__primary"
                  onClick={handleSubmit}
                  disabled={
                    (userAnswer === null &&
                     getCurrentQuestion()?.type !== "match-pairs") ||
                    (getCurrentQuestion()?.type === "match-pairs" &&
                     (!matchPairs || Object.values(matchPairs).some(value => value === "")))
                  }
                >
                  Submit answer
                </button>
              ) : (
                <button
                  className="arena__primary arena__primary--success"
                  onClick={handleNextQuestion}
                >
                  {currentQuestionIndex === questionsData.length - 1 ? "Complete challenge" : "Next challenge"}
                </button>
              )}
            </div>
          </section>

          <aside className="arena__aside">
            <div className="arena__card">
              <h3>Round stats</h3>
              <div className="arena__stat-list">
                <div className="arena__stat-row">
                  <span>Question</span>
                  <span>
                    {currentQuestionIndex + 1} / {questionsData.length}
                  </span>
                </div>
                <div className="arena__stat-row">
                  <span>Streak</span>
                  <span>{gameState.streak}</span>
                </div>
                <div className="arena__stat-row">
                  <span>High score</span>
                  <span>{gameState.highScore > 0 ? gameState.highScore : "—"}</span>
                </div>
              </div>
            </div>
            <div className="arena__card arena__card--muted">
              <h3>Focus tip</h3>
              <p>
                Read once, pick fast. Time saved now compounds your total score.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Arena;