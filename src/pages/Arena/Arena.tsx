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

  const shuffleArray = (array: QuizQuestion[]) => {
    const arrayCopy = [...array];
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    return arrayCopy;
  };

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
    // First get current questions and shuffle
    if (questionsData.length > 0) {
      // Shuffle questions when resetting the quiz
      try {
        const shuffled = shuffleArray([...questionsData]);
        // We'll just reset the index since we can't directly update questions in Redux
      } catch (error) {
        // If shuffling fails, fetch new questions
        dispatch(getQuestions());
      }
    } else {
      // If no questions, fetch them
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
    if (!questionsData.length) return <div className="loader">Loading questions...</div>;
    
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) {
      // Handle missing question case
      return <div className="loader">Question not available</div>;
    }

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
              {Array.isArray(currentQuestion.options) && currentQuestion.options?.map((option: string, index: number) => (
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
        if (!Array.isArray(pairs) || pairs.length === 0) {
          return <div className="loader">Match pairs not available</div>;
        }
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
              {pairs.map((pair: QuizPair, index: number) => (
                <div
                  key={index}
                  className={`match-pair ${uiState.showExplanation && currentQuestion.answer ?
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
      } catch (error) {
        console.error("Error creating confetti:", error);
        // Fallback to no particles to avoid crashing
        setParticles([]);
      }
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
          <div className="introduction-content mt-6">
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
              style={{ width: `${((currentQuestionIndex + 1) / questionsData.length) * 100}%` }}
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
            <p>{getCurrentQuestion()?.explanation}</p>
          </div>
        )}

        <div className="action-buttons">
          {!uiState.showExplanation ? (
            <button
              className="primary-button"
              onClick={handleSubmit}
              disabled={
                (userAnswer === null && 
                 getCurrentQuestion()?.type !== "match-pairs") || 
                (getCurrentQuestion()?.type === "match-pairs" && 
                 (!matchPairs || Object.values(matchPairs).some(value => value === "")))
              }
            >
              Submit Answer
            </button>
          ) : (
            <button
              className="primary-button next"
              onClick={handleNextQuestion}
            >
              {currentQuestionIndex === questionsData.length - 1 ? "Complete Challenge" : "Next Challenge"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Arena;