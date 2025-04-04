import React, { useEffect, useMemo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBook, FaCode, FaRocket, FaTrophy, FaArrowRight } from "react-icons/fa";
import { BsArrowRight, BsLightningCharge } from "react-icons/bs";
import { AiFillFire } from "react-icons/ai";
import { FaHeart, FaRegCopyright } from "react-icons/fa";
import 'react-circular-progressbar/dist/styles.css';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { getAllTopics } from "../../redux/slices/librarySlice";
import { updateTopicStatus } from "../../redux/slices/progressSlice";
import { fetchSnippetsList } from "../../redux/slices/snippetsSlice";
import { getQuestions } from "../../redux/slices/questionsSlice";
import { FEATURES } from './homePageConstants';
import { ProgressStatus, Difficulty } from "../../constants/enums";
import { calculateProgress } from '../../utils/progressUtils';
import { QuizQuestion } from "../../constants/interfaces/questions";
import './Home.scss';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [miniTimer, setMiniTimer] = useState(10);
  const [streak, setStreak] = useState(0);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const user = useAppSelector(state => state.userData.user);
  const topics = useAppSelector(state => state.topicsData.topics);
  const snippets = useAppSelector(state => state.snippets.snippets);
  const snippetsLoading = useAppSelector(state => state.snippets.loading);
  const questions = useAppSelector(state => state.questions.data);
  const questionsLoading = useAppSelector(state => state.questions.loading);

  const progress = useMemo(() => calculateProgress(topics), [topics]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      clearTimeout(timer);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const labProgress = useMemo(() => {
    if (!snippets || snippets.length === 0) return 0;
    const unlockedSnippets = snippets.filter(snippet => !snippet.is_locked);
    return Math.round((unlockedSnippets.length / snippets.length) * 100);
  }, [snippets]);

  const handleStatusChange = useCallback((topicId: number, currentStatus: ProgressStatus) => {
    if (!user?.user_id) return;

    const statusCycle: Record<string, ProgressStatus> = {
      PENDING: ProgressStatus.IN_PROGRESS,
      IN_PROGRESS: ProgressStatus.COMPLETED,
      COMPLETED: ProgressStatus.PENDING
    };

    dispatch(updateTopicStatus({
      user_id: user.user_id,
      topic_id: topicId,
      status: statusCycle[currentStatus],
      dispatch
    }));
  }, [dispatch, user?.user_id]);

  const handleNavigation = useCallback((path: string) => () => navigate(path), [navigate]);

  useEffect(() => {
    if (user?.user_id) {
      dispatch(getAllTopics(user.user_id));
      dispatch(fetchSnippetsList(user.user_id.toString()));
      dispatch(getQuestions());
    }
  }, [dispatch, user?.user_id]);

  const handleOptionSelect = (letter: string) => {
    if (!isAnswerSubmitted) {
      setSelectedOption(letter);
    }
  };

  const getCurrentQuestion = (): QuizQuestion | null => {
    if (questions && questions.length > 0 && currentQuestionIndex < questions.length) {
      const question = questions[currentQuestionIndex];

      if (question.type === "multiple-choice" || question.type === "code-output") {
        const formattedOptions = Array.isArray(question.options) ?
          question.options.map((text, index) => {
            const letter = String.fromCharCode(65 + index);
            return {
              letter,
              text,
              correct: question.answer === text
            };
          }) : [];

        return {
          ...question,
          options: formattedOptions as any,
          difficulty: question.difficulty || 'Medium'
        };
      }
      return question;
    }
    return null;
  };

  const currentQuestion = getCurrentQuestion();

  const handleSubmitAnswer = useCallback(() => {
    setIsAnswerSubmitted(true);

    const question = getCurrentQuestion();
    if (question) {
      let isCorrect = false;
      if (question.type === "multiple-choice" || question.type === "code-output") {
        if ('options' in question && Array.isArray(question.options)) {
          if (typeof question.options[0] === 'object' && 'correct' in question.options[0]) {
            const option = (question.options as any[]).find(o => o.correct === true);
            const correctAnswer = option?.letter || question.answer;
            isCorrect = selectedOption === correctAnswer;
          } else {
            const optionIndex = selectedOption ? selectedOption.charCodeAt(0) - 65 : -1;
            if (optionIndex >= 0 && optionIndex < question.options.length) {
              const selectedText = question.options[optionIndex];
              isCorrect = selectedText === question.answer;
            }
          }
        } else {
          isCorrect = selectedOption === question.answer;
        }
      } else if (question.type === "true-false") {
        const trueVal = question.answer === true || question.answer === "true";
        isCorrect =
          (selectedOption === "A" && trueVal) ||
          (selectedOption === "B" && !trueVal);
      } else {
        isCorrect = selectedOption?.toLowerCase() === question.answer?.toLowerCase();
      }
      if (isCorrect) {
        const newStreak = streak + 1;
        setStreak(newStreak);
      } else {
        setStreak(0);
      }
    }
  }, [selectedOption, miniTimer, streak, currentQuestionIndex, questions]);


  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isAnswerSubmitted) return;
    if (miniTimer > 0) {
      interval = setInterval(() => {
        setMiniTimer(prev => prev - 1);
      }, 1000);
    } else if (miniTimer === 0 && selectedOption) {
      handleSubmitAnswer();
    } else if (miniTimer === 0) {
      setIsAnswerSubmitted(true);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [miniTimer, isAnswerSubmitted, selectedOption, handleSubmitAnswer]);

  const handleNextQuestion = () => {
    const maxQuestions = 5;
    const totalQuestions = questions && questions.length > 0 ? Math.min(questions.length, maxQuestions) : 0;
    const maxIndex = totalQuestions - 1;

    if (currentQuestionIndex < maxIndex) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setMiniTimer(10);
    } else {
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setMiniTimer(10);
      setStreak(0);
    }
  };


  const getStatusClass = (status: string | ProgressStatus) => {
    if (status === ProgressStatus.COMPLETED) return 'bg-green-500';
    if (status === ProgressStatus.IN_PROGRESS) return 'bg-yellow-500';
    if (status === ProgressStatus.PENDING) return 'bg-gray-500';
    if (status === 'LOCKED' || status === 'locked') return 'bg-red-500';
    if (status === 'UNLOCKED' || status === 'unlocked') return 'bg-green-500';
    if (status === Difficulty.BEGINNER) return 'easy';
    if (status === Difficulty.INTERMEDIATE) return 'medium';
    if (status === Difficulty.ADVANCED) return 'hard';
    return 'bg-gray-500';
  };


  const formatQuestionText = (text: string) => {
    if (!text) return '';
    if (text.includes('`')) {
      const parts = text.split(/(`[^`]+`)/).filter(Boolean);
      let formattedHtml = '';
      parts.forEach(part => {
        if (part.startsWith('`') && part.endsWith('`')) {
          const code = part.slice(1, -1);
          formattedHtml += `<code class="inline-code">${code}</code>`;
        } else {
          formattedHtml += part;
        }
      });
      return formattedHtml;
    }
    return text;
  };


  const hasProperty = <T extends object>(obj: T, prop: PropertyKey): prop is keyof T => {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  };


  const hasCode = (question: QuizQuestion | null): boolean => {
    return Boolean(question && typeof question.question === 'string' && question.question.includes('```'));
  };


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (questionsLoading) return;
      if (e.key === 'Enter') {
        if (isAnswerSubmitted) {
          handleNextQuestion();
        } else if (selectedOption) {
          handleSubmitAnswer();
        }
      } else if (!isAnswerSubmitted && /^[a-dA-D]$/.test(e.key)) {
        if (currentQuestion?.type === 'multiple-choice' ||
          currentQuestion?.type === 'code-output' ||
          currentQuestion?.type === 'true-false') {
          handleOptionSelect(e.key.toUpperCase());
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAnswerSubmitted, selectedOption, handleSubmitAnswer, handleNextQuestion, questionsLoading, currentQuestion]);

  return (
    <div className="home">
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent-primary font-bold text-2xl flex items-center justify-center mb-5 animate-pulse shadow-lg shadow-primary/20">
              JS
            </div>
            <div className="w-32 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent-primary animate-[linear-progress_1.5s_ease-in-out_infinite]"></div>
            </div>
            <p className="text-xs text-gray-500 mt-4 animate-pulse">Loading amazing content...</p>
          </div>
        </div>
      ) : (
        <>
          <section className="hero-section relative pt-28 pb-20 overflow-hidden bg-gradient-to-b from-background to-background-secondary animate-[fade-in_0.8s_ease-in-out]">
            <div className="hero-background absolute inset-0">
              <div className="gradient-orb top-10 left-1/3 opacity-40"></div>
              <div className="gradient-orb bottom-1/4 right-10 opacity-30"></div>
            </div>
            <div className="noise-overlay absolute inset-0 opacity-5"></div>

            <div className="container mx-auto px-6 relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
                <div className="text-content lg:w-1/2 space-y-8 md:pr-8">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                    Your Journey to <span className="gradient-text">JavaScript</span> Mastery
                  </h1>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
                    Master JavaScript through our immersive platform crafted by industry experts for real-world development.
                  </p>

                  <div className="flex flex-wrap gap-5">
                    <button
                      className="primary-button px-8 py-4 rounded-full font-semibold flex items-center gap-3 bg-primary transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                      onClick={handleNavigation('/library')}
                    >
                      Begin Your Journey
                      <span className="button-icon">
                        <FaArrowRight />
                      </span>
                    </button>
                    <button
                      className="secondary-button px-8 py-4 rounded-full font-semibold flex items-center gap-3 border border-gray-300 dark:border-gray-700 hover:bg-opacity-5 transition-all hover:-translate-y-0.5 duration-300"
                      onClick={handleNavigation('/lab')}
                    >
                      Explore Code Vault
                      <span className="button-icon">
                        <FaCode />
                      </span>
                    </button>
                  </div>

                  <div className="tech-stack pt-6">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-3.5">MASTER MODERN TECHNOLOGIES</p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 rounded-full bg-background border border-gray-200 dark:border-gray-800 text-sm">ES6+</span>
                      <span className="px-4 py-2 rounded-full bg-background border border-gray-200 dark:border-gray-800 text-sm">Modern APIs</span>
                      <span className="px-4 py-2 rounded-full bg-background border border-gray-200 dark:border-gray-800 text-sm">Async JS</span>
                    </div>
                  </div>
                </div>

                <div className="hero-visual lg:w-1/2 mt-12 lg:mt-0">
                  <div className="interactive-code-sphere">
                    <div className="code-sphere-container">
                      <div className="sphere-core"></div>
                      <div className="orbit orbit-1">
                        <div className="planet js-planet">
                          <span className="planet-label">JS</span>
                        </div>
                      </div>
                      <div className="orbit orbit-2">
                        <div className="planet ts-planet">
                          <span className="planet-label">TS</span>
                        </div>
                      </div>
                      <div className="orbit orbit-3">
                        <div className="planet react-planet">
                          <div className="react-core"></div>
                          <div className="react-orbit"></div>
                          <div className="react-orbit" style={{ transform: 'rotate(60deg)' }}></div>
                          <div className="react-orbit" style={{ transform: 'rotate(120deg)' }}></div>
                        </div>
                      </div>

                      <div className="code-particles">
                        {[...Array(15)].map((_, i) => (
                          <div key={i} className="code-particle" style={{
                            animationDelay: `${i * 0.3}s`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                          }}></div>
                        ))}
                      </div>
                    </div>

                    <div className="floating-code-blocks">
                      <div className="code-block block-1">
                        <div className="code-line">
                          <span className="keyword">function</span>
                          <span className="function">learnJS</span>() {'{'}
                        </div>
                        <div className="code-line indent">
                          <span className="keyword">return</span>
                          <span className="string">"JavaScript Mastery"</span>;
                        </div>
                        <div className="code-line">{'}'}</div>
                      </div>

                      <div className="code-block block-2">
                        <div className="code-line">
                          <span className="keyword">const</span>
                          <span className="variable">skills</span> =
                          <span className="bracket">[</span>
                        </div>
                        <div className="code-line indent">
                          <span className="string">"ES6+"</span>,
                          <span className="string">"React"</span>,
                          <span className="string">"Node.js"</span>
                        </div>
                        <div className="code-line">
                          <span className="bracket">]</span>;
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-6">
            <div className="learning-sections animate-[fade-in-up_1s_ease-in-out]" style={{ animationDelay: '0.2s' }}>
              <header className="text-center mb-6">
                <h2 className="text-3xl md:text-5xl font-bold mb-7 leading-tight mx-auto max-w-3xl">
                  Three Paths to <span className="gradient-text">JavaScript Mastery</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Our comprehensive platform offers multiple approaches to help you become a JavaScript expert
                </p>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                {/* JavaScript Library Card */}
                <div className="learning-card bg-gradient-to-br from-background to-background-secondary rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-8px] border border-gray-200/10 dark:border-gray-800/20 group">
                  <div className="h-36 relative overflow-hidden bg-primary/5">
                    <div className="absolute inset-0 opacity-20 bg-pattern-dots"></div>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center bg-primary/10 backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300">
                        <FaBook className="text-primary text-3xl" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 flex items-center">
                      JavaScript Library 
                      <span className="ml-auto inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {progress}% Complete
                      </span>
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm leading-relaxed">
                      Master core JavaScript concepts with our structured curriculum designed by industry experts.
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-5">
                      <span className="px-3 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-medium">Interactive Lessons</span>
                      <span className="px-3 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-medium">ES6+</span>
                      <span className="px-3 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-medium">Guided</span>
                    </div>
                    
                    <div className="space-y-2.5 mb-6">
                      {topics?.slice(0, 2).map((topic) => (
                        <div
                          key={topic.topic_id}
                          className="p-3 rounded-lg bg-background-secondary/60 hover:bg-background-secondary/80 flex justify-between items-center shadow-sm hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-gray-200/20 dark:hover:border-gray-800/40"
                          onClick={() => navigate(`/topic/${topic.topic_id}`)}
                        >
                          <div className="flex items-center gap-2.5 text-sm">
                            <div className={`w-2.5 h-2.5 rounded-full ${getStatusClass(topic.status || ProgressStatus.PENDING)}`}></div>
                            <span className="font-medium truncate">{topic.title}</span>
                          </div>
                          <BsArrowRight className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                    
                    <button
                      className="w-full py-3 rounded-xl bg-primary font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 hover:translate-y-[-2px] text-sm"
                      onClick={() => navigate('/library')}
                    >
                      Explore Library <BsArrowRight className="text-lg" />
                    </button>
                  </div>
                </div>
                
                {/* Code Vault Card */}
                <div className="learning-card bg-gradient-to-br from-background to-background-secondary rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-8px] border border-gray-200/10 dark:border-gray-800/20 group">
                  <div className="h-36 relative overflow-hidden bg-secondary/5">
                    <div className="absolute inset-0 opacity-20 bg-pattern-code"></div>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center bg-secondary/10 backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300">
                        <FaCode className="text-secondary text-3xl" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 flex items-center">
                      Code Vault
                      <span className="ml-auto inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                        {labProgress}% Unlocked
                      </span>
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm leading-relaxed">
                      Enhance your skills with practical code snippets and real-world examples for professional development.
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-5">
                      <span className="px-3 py-1.5 rounded-full bg-secondary/5 text-secondary text-xs font-medium">Examples</span>
                      <span className="px-3 py-1.5 rounded-full bg-secondary/5 text-secondary text-xs font-medium">Best Practices</span>
                      <span className="px-3 py-1.5 rounded-full bg-secondary/5 text-secondary text-xs font-medium">Multi-Level</span>
                    </div>
                    
                    <div className="space-y-2.5 mb-6">
                      {snippetsLoading ? (
                        <div className="flex items-center justify-center p-8">
                          <div className="loader"></div>
                        </div>
                      ) : (
                        snippets?.slice(0, 2).map((snippet) => (
                          <div
                            key={snippet.snippet_id}
                            className="p-3 rounded-lg bg-background-secondary/60 hover:bg-background-secondary/80 flex justify-between items-center shadow-sm hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-gray-200/20 dark:hover:border-gray-800/40"
                            onClick={() => navigate(`/snippet/${snippet.snippet_id}`)}
                          >
                            <div className="flex items-center gap-2.5 text-sm">
                              <div className={`w-2.5 h-2.5 rounded-full ${getStatusClass(snippet.is_locked ? 'LOCKED' : 'UNLOCKED')}`}></div>
                              <span className="font-medium truncate">{snippet.label}</span>
                            </div>
                            <div className={`px-2 py-0.5 rounded-full text-xs difficulty-${getStatusClass(snippet.difficulty)}`}>
                              {snippet.difficulty}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    
                    <button
                      className="w-full py-3 rounded-xl bg-secondary font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-secondary/10 hover:shadow-xl hover:shadow-secondary/20 hover:translate-y-[-2px] text-sm"
                      onClick={() => navigate('/lab')}
                    >
                      Access Code Vault <BsArrowRight className="text-lg" />
                    </button>
                  </div>
                </div>
                
                {/* Challenge Arena Card */}
                <div className="learning-card bg-gradient-to-br from-background to-background-secondary rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-8px] border border-gray-200/10 dark:border-gray-800/20 group">
                  <div className="h-36 relative overflow-hidden bg-accent-primary/5">
                    <div className="absolute inset-0 opacity-20 bg-pattern-arena"></div>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center bg-accent-primary/10 backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300">
                        <FaTrophy className="text-accent-primary text-3xl" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 flex items-center">
                      Challenge Arena
                      <span className="ml-auto inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-accent-primary/10 text-accent-primary">
                        <AiFillFire className="mr-1" /> {streak} Streak
                      </span>
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm leading-relaxed">
                      Test your knowledge with interactive challenges, quizzes, and code output predictions.
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-5">
                      <span className="px-3 py-1.5 rounded-full bg-accent-primary/5 text-accent-primary text-xs font-medium">Quizzes</span>
                      <span className="px-3 py-1.5 rounded-full bg-accent-primary/5 text-accent-primary text-xs font-medium">Challenges</span>
                      <span className="px-3 py-1.5 rounded-full bg-accent-primary/5 text-accent-primary text-xs font-medium">Assessment</span>
                    </div>
                    
                    <div className="mb-6 bg-background-secondary/60 rounded-lg p-4 relative overflow-hidden min-h-[100px]">
                      {questionsLoading ? (
                        <div className="flex items-center justify-center py-6">
                          <div className="loader"></div>
                        </div>
                      ) : currentQuestion ? (
                        <>
                          <div className="flex justify-between items-center mb-3">
                            <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              currentQuestion.difficulty === Difficulty.BEGINNER ? 'bg-green-500/10 text-green-500' :
                              currentQuestion.difficulty === Difficulty.INTERMEDIATE ? 'bg-yellow-500/10 text-yellow-500' : 
                              'bg-red-500/10 text-red-500'
                            }`}>
                              {currentQuestion.difficulty}
                            </div>
                            <div className="text-xs text-gray-500">
                              Question {currentQuestionIndex + 1}/{questions?.length || 0}
                            </div>
                          </div>
                          <div className="text-sm font-medium line-clamp-2 mb-2"
                            dangerouslySetInnerHTML={{
                              __html: formatQuestionText(currentQuestion.question.length > 80 ?
                                currentQuestion.question.substring(0, 80) + '...' :
                                currentQuestion.question)
                            }} />
                          <div className="absolute bottom-2 right-2">
                            <BsLightningCharge className="text-accent-primary text-lg" />
                          </div>
                        </>
                      ) : (
                        <p className="text-center text-gray-500 py-4 text-sm">No questions available</p>
                      )}
                    </div>
                    
                    <button
                      className="w-full py-3 rounded-xl bg-accent-primary font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-accent-primary/10 hover:shadow-xl hover:shadow-accent-primary/20 hover:translate-y-[-2px] text-sm"
                      onClick={() => navigate('/arena')}
                    >
                      Enter the Arena <BsArrowRight className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <section className="features-section mt-20 animate-[fade-in-up_1s_ease-in-out]" style={{ animationDelay: '0.4s' }}>
              <div className="text-center mb-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight mx-auto max-w-2xl">
                  Powerful Learning <span className="gradient-text">Experience</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  We've crafted a comprehensive learning environment with cutting-edge tools to help you master JavaScript
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {FEATURES.map((feature) => (
                  <div
                    key={feature.title}
                    className="p-8 rounded-xl bg-background border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg transition-all duration-500 hover:translate-y-[-6px] hover:border-primary/20"
                  >
                    <div className="p-3.5 rounded-lg bg-primary bg-opacity-10 inline-flex mb-5 shadow-sm">
                      <div className="text-xl text-primary">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-3.5">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm leading-relaxed">{feature.description}</p>
                    <a href="#" className="text-primary flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all" aria-label={`Learn more about ${feature.title}`}>
                      Learn more <BsArrowRight />
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-20 p-10 md:p-14 rounded-2xl bg-gradient-to-r from-primary to-accent-primary relative overflow-hidden shadow-lg shadow-primary/20">
                <div className="absolute inset-0 bg-opacity-10">
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                    backgroundSize: "60px 60px"
                  }}></div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
                  <div className="md:max-w-xl">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Master JavaScript?</h3>
                    <p className="text-opacity-90 text-lg leading-relaxed">
                      Join thousands of developers who have accelerated their career with our premium JavaScript curriculum.
                    </p>
                  </div>
                  <button
                    className="px-8 py-4 rounded-full bg-white font-medium flex items-center gap-3 shadow-lg hover:shadow-xl transition-all hover:translate-y-[-2px]"
                    onClick={() => navigate('/library')}
                    aria-label="Start your learning journey"
                    style={{ color: '#000000' }}
                  >
                    <span>Start Your Journey</span>
                    <FaRocket className="text-lg" />
                  </button>
                </div>
              </div>
            </section>

            <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-800 animate-[fade-in-up_1s_ease-in-out]" style={{ animationDelay: '0.6s' }}>
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mb-6 md:mb-0">
                  <div className="w-10 h-10 rounded-lg bg-primary font-bold text-lg flex items-center justify-center mr-3 shadow-md shadow-primary/10">JS</div>
                  <h3 className="text-xl font-bold">JavaScript Handbook</h3>
                </div>

                <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
                  <a href="/library" className="text-sm hover:text-primary transition-all hover:-translate-y-1 duration-300">Library</a>
                  <a href="/lab" className="text-sm hover:text-primary transition-all hover:-translate-y-1 duration-300">Code Vault</a>
                  <a href="/blogs" className="text-sm hover:text-primary transition-all hover:-translate-y-1 duration-300">Blogs</a>
                  <a href="/arena" className="text-sm hover:text-primary transition-all hover:-translate-y-1 duration-300">Arena</a>
                </div>

                <div className="flex items-center gap-3.5">
                  <button
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:-translate-y-1 duration-300"
                    onClick={() => navigate('/auth')}
                    aria-label="Sign In"
                  >
                    Sign In
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg bg-primary text-sm font-medium hover:bg-primary-dark transition-all hover:-translate-y-1 duration-300 shadow-sm hover:shadow-md"
                    onClick={() => navigate('/auth')}
                    aria-label="Sign Up"
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center mt-8">
                <p className="text-xs text-gray-500 mb-4 md:mb-0">
                  <FaRegCopyright className="inline mr-1" /> {new Date().getFullYear()} JavaScript Handbook. All rights reserved.
                </p>

                <div className="flex items-center text-xs text-gray-500">
                  Made with <FaHeart className="text-red-500 mx-1.5 animate-pulse" /> by
                  <a href="https://www.linkedin.com/in/harsh-srivastva/" target="_blank" rel="noopener noreferrer" className="ml-1.5 hover:text-primary transition-colors">
                    Harsh Srivastva
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;