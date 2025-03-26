import React, { useState, useEffect } from "react";
import "./Arena.scss";

// Define types for our quiz data
interface QuizPair {
  left: string;
  right: string;
}

interface QuizQuestion {
  id: number;
  type: string;
  topic: string;
  difficulty: string;
  question: string;
  options?: string[];
  answer: any; // Using any for flexibility with different answer types
  explanation: string;
  pairs?: QuizPair[];
}

interface GameState {
  score: number;
  streak: number;
  highScore: number;
  totalPoints: number;
  pointsAwarded: number;
}

interface UIState {
  showExplanation: boolean;
  showAnimation: boolean;
  showConfetti: boolean;
  showIntroduction: boolean;
  quizStarted: boolean;
  timeExpired: boolean;
  isCorrect: boolean | null;
  feedbackMessage: string;
  quizCompleted: boolean;
}

const Arena: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string | boolean | Record<string, string> | null>(null);
  const [matchPairs, setMatchPairs] = useState<Record<string, string>>({});
  const [timer, setTimer] = useState(30);
  const [timerActive, setTimerActive] = useState(true);

  // Grouped related state
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
    // Load questions from response.json and shuffle them
    import("./response.json").then((data) => {
      setQuestions(shuffleArray([...data.default]));
    });

    // Check for high score in local storage
    const savedHighScore = localStorage.getItem('arenaHighScore');
    if (savedHighScore) {
      setGameState(prev => ({ ...prev, highScore: parseInt(savedHighScore) }));
    }
  }, []);

  // Shuffle array function using Fisher-Yates algorithm
  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    // Reset state when moving to a new question
    if (questions.length > 0 && uiState.quizStarted) {
      setUserAnswer(null);
      setUiState(prev => ({
        ...prev,
        showExplanation: false,
        isCorrect: null,
        feedbackMessage: ""
      }));
      setTimer(30);
      setTimerActive(true);
      setGameState(prev => ({ ...prev, pointsAwarded: 0 }));

      // Initialize match pairs if needed
      if (questions[currentQuestionIndex].type === "match-pairs" && questions[currentQuestionIndex].pairs) {
        const initialPairs = Object.fromEntries(
          questions[currentQuestionIndex].pairs?.map(pair => [pair.left, ""]) || []
        );
        setMatchPairs(initialPairs);
      }
    }
  }, [currentQuestionIndex, questions, uiState.quizStarted]);

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
  }, [timer, timerActive, uiState.showExplanation, uiState.quizStarted]);

  const handleTimeExpired = () => {
    setTimerActive(false);
    setUiState(prev => ({ ...prev, timeExpired: true }));
    // Save high score if current score is higher
    if (gameState.score > gameState.highScore) {
      const newHighScore = gameState.score;
      setGameState(prev => ({ ...prev, highScore: newHighScore }));
      localStorage.setItem('arenaHighScore', newHighScore.toString());
    }
  };

  const handleMatchPairChange = (left: string, right: string) => {
    setMatchPairs(prev => ({
      ...prev,
      [left]: right
    }));
  };

  const calculatePoints = (difficulty: string, timeRemaining: number) => {
    // Base points by difficulty
    const basePoints = {
      easy: 100,
      medium: 200,
      hard: 300,
      expert: 500
    }[difficulty.toLowerCase()] || 100;

    // Time bonus: faster answers get more points
    const timeBonus = Math.floor(timeRemaining * 3.33); // Up to 100 bonus points (30s * 3.33)

    // Streak bonus: consecutive correct answers get bonus points
    const streakBonus = gameState.streak * 50;

    return basePoints + timeBonus + streakBonus;
  };

  const handleSubmit = () => {
    if (uiState.showExplanation) return;

    setTimerActive(false);
    setUiState(prev => ({ ...prev, showExplanation: true }));

    const currentQuestion = questions[currentQuestionIndex];
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
        const expectedPairs = currentQuestion.answer as Record<string, string>;
        correct = Object.entries(matchPairs).every(
          ([key, value]) => expectedPairs[key] === value && value !== ""
        );
        break;
      default:
        break;
    }

    setUiState(prev => ({ ...prev, isCorrect: correct }));

    if (correct) {
      const pointsEarned = calculatePoints(currentQuestion.difficulty, timer);
      setGameState(prev => ({ ...prev, pointsAwarded: pointsEarned, score: prev.score + pointsEarned }));
      setGameState(prev => ({ ...prev, totalPoints: prev.totalPoints + pointsEarned }));
      setGameState(prev => ({ ...prev, streak: prev.streak + 1 }));
      setUiState(prev => ({ ...prev, feedbackMessage: gameState.streak >= 2 ? `Impressive! ${gameState.streak + 1} in a row!` : "Correct!" }));
    } else {
      setGameState(prev => ({ ...prev, streak: 0 }));
      setUiState(prev => ({ ...prev, feedbackMessage: "Not quite right." }));
    }

    setUiState(prev => ({ ...prev, showAnimation: true }));
    setTimeout(() => setUiState(prev => ({ ...prev, showAnimation: false })), 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setUiState(prev => ({ ...prev, quizCompleted: true }));
      // Save high score if current score is higher
      if (gameState.score > gameState.highScore) {
        setGameState(prev => ({ ...prev, highScore: gameState.score }));
        localStorage.setItem('arenaHighScore', gameState.score.toString());
      }

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
    // Shuffle questions again
    setQuestions(shuffleArray([...questions]));
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
                <code key={index} className="code-snippet">
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
    if (questions.length === 0) return <div className="loader">Loading questions...</div>;

    const currentQuestion = questions[currentQuestionIndex];

    switch (currentQuestion.type) {
      case "multiple-choice":
      case "code-output":
        return (
          <div className="question-container">
            <div className="question-header">
              <span className={`badge ${currentQuestion.difficulty.toLowerCase()}`}>
                {currentQuestion.difficulty}
              </span>
              <span className="topic-badge">{currentQuestion.topic}</span>
            </div>

            <h2>{formatQuestionText(currentQuestion.question)}</h2>

            <div className="options-container">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${userAnswer === option ? 'selected' : ''} 
                    ${uiState.showExplanation ? (option === currentQuestion.answer ? 'correct' :
                      userAnswer === option ? 'incorrect' : '') : ''}`}
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
          <div className="question-container">
            <div className="question-header">
              <span className={`badge ${currentQuestion.difficulty.toLowerCase()}`}>
                {currentQuestion.difficulty}
              </span>
              <span className="topic-badge">{currentQuestion.topic}</span>
            </div>

            <h2>{formatQuestionText(currentQuestion.question)}</h2>

            <div className="options-container true-false">
              <button
                className={`option-button ${userAnswer === true ? 'selected' : ''} 
                  ${uiState.showExplanation ? (currentQuestion.answer === true ? 'correct' :
                    userAnswer === true ? 'incorrect' : '') : ''}`}
                onClick={() => !uiState.showExplanation && setUserAnswer(true)}
                disabled={uiState.showExplanation}
              >
                True
              </button>
              <button
                className={`option-button ${userAnswer === false ? 'selected' : ''} 
                  ${uiState.showExplanation ? (currentQuestion.answer === false ? 'correct' :
                    userAnswer === false ? 'incorrect' : '') : ''}`}
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
          <div className="question-container">
            <div className="question-header">
              <span className={`badge ${currentQuestion.difficulty.toLowerCase()}`}>
                {currentQuestion.difficulty}
              </span>
              <span className="topic-badge">{currentQuestion.topic}</span>
            </div>

            <h2>{formatQuestionText(currentQuestion.question)}</h2>

            <div className="fill-container">
              <input
                type="text"
                className={`fill-input ${uiState.showExplanation ?
                  (userAnswer === currentQuestion.answer ? 'correct' : 'incorrect') : ''}`}
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
        const options = pairs.map(p => p.right);

        return (
          <div className="question-container">
            <div className="question-header">
              <span className={`badge ${currentQuestion.difficulty.toLowerCase()}`}>
                {currentQuestion.difficulty}
              </span>
              <span className="topic-badge">{currentQuestion.topic}</span>
            </div>

            <h2>{formatQuestionText(currentQuestion.question)}</h2>

            <div className="match-container">
              {pairs.map((pair, index) => (
                <div
                  key={index}
                  className={`match-pair ${uiState.showExplanation ?
                    ((currentQuestion.answer as Record<string, string>)[pair.left] === matchPairs[pair.left] ?
                      'correct' : 'incorrect') : ''}`}
                >
                  <div className="match-left">{formatQuestionText(pair.left)}</div>
                  <div className="match-right">
                    <select
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
                      {options.map((option, i) => (
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
            className={`confetti-particle ${shape}`}
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
    }, []);
    return <div className="confetti-container">{particles}</div>;
  };

  // Introduction screen
  if (uiState.showIntroduction) {
    return (
      <div className="arena-container">
        <div className="introduction-screen">
          <h1>Level Up Your JavaScript Skills</h1>
          {gameState.highScore > 0 && (
            <div className="high-score-info">
              <span>Your high score: {gameState.highScore} points</span>
            </div>
          )}
          <div className="introduction-content">
            <div className="intro-details">
              <div className="intro-feature">
                <span className="intro-icon">⏱️</span>
                <span className="text-sm">Race against time with 30 seconds per challenge to test your quick thinking</span>
              </div>
              <div className="intro-feature">
                <span className="intro-icon">🎯</span>
                <span className="text-sm">Master challenges of varying difficulty and earn points based on your performance</span>
              </div>
              <div className="intro-feature">
                <span className="intro-icon">🔥</span>
                <span className="text-sm">Build streaks and unlock bonus multipliers to maximize your score</span>
              </div>
              <div className="intro-feature">
                <span className="intro-icon">🚀</span>
                <span className="text-sm">Challenge yourself with real-world JavaScript scenarios and level up your skills</span>
              </div>
            </div>
          </div>
          <button 
            className="primary-button"
            onClick={startQuiz}
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // Time expired screen
  if (uiState.timeExpired) {
    return (
      <div className="arena-container">
        <div className="time-expired-screen">
          <h1>Time's Up!</h1>
          <div className="expired-content">
            <p>You've reached the time limit, but don't worry! Every attempt makes you stronger. Ready to challenge yourself again?</p>
            <div className="score-display">
              <div className="score-info">
                <span>Current Score</span>
                <span className="score-value">{gameState.score}</span>
              </div>
              {gameState.highScore > 0 && (
                <div className="score-info">
                  <span>Best Score</span>
                  <span className="score-value">{gameState.highScore}</span>
                </div>
              )}
            </div>
          </div>
          <button 
            className="primary-button"
            onClick={resetQuiz}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Quiz completed screen
  if (uiState.quizCompleted) {
    return (
      <div className="arena-container">
        {uiState.showConfetti && <Confetti />}
        <div className="quiz-completed">
          <h1>Challenge Complete!</h1>
          <div className="score-display">
            <div className="score-circle">
              <span className="score-value">{gameState.score}</span>
              <span className="high-score">Best: {gameState.highScore}</span>
            </div>
          </div>
          <p>
            {gameState.score === gameState.highScore && gameState.score > 0
              ? "New high score! Impressive mastery!"
              : gameState.score >= gameState.totalPoints * 0.8
                ? "Exceptional performance! You're a JavaScript wizard!"
                : gameState.score >= gameState.totalPoints * 0.6
                  ? "Great effort! Keep pushing your limits!"
                  : "The journey to mastery continues. Try again!"}
          </p>
          <button className="primary-button" onClick={resetQuiz}>Challenge Again</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="arena-container">
        <div className="quiz-header">
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
            ></div>
          </div>
          <div className="info-bar">
            <span className="score-display">Score: {gameState.score}</span>
            <span className="timer">
              <span className={`timer-value ${timer <= 10 ? 'warning' : ''}`}>{timer}</span> s
            </span>
          </div>
        </div>

        {renderQuestion()}

        {uiState.showExplanation && (
          <div className={`explanation-container ${uiState.isCorrect ? 'correct' : 'incorrect'}`}>
            <div className={`feedback ${uiState.showAnimation ? 'animate' : ''}`}>
              <span className="feedback-icon">{uiState.isCorrect ? '✓' : '✗'}</span>
              <span className="feedback-text">{uiState.feedbackMessage}</span>
              {uiState.isCorrect && gameState.pointsAwarded > 0 && (
                <span className="points-awarded">+{gameState.pointsAwarded} points</span>
              )}
            </div>
            <h3>Explanation:</h3>
            <p>{questions[currentQuestionIndex].explanation}</p>
          </div>
        )}

        <div className="action-buttons">
          {!uiState.showExplanation ? (
            <button
              className="primary-button"
              onClick={handleSubmit}
              disabled={userAnswer === null && questions[currentQuestionIndex]?.type !== "match-pairs"}
            >
              Submit Answer
            </button>
          ) : (
            <button
              className="primary-button next"
              onClick={handleNextQuestion}
            >
              {currentQuestionIndex === questions.length - 1 ? "Complete Challenge" : "Next Challenge"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Arena;