export interface QuizPair {
    left: string;
    right: string;
}

export interface QuizQuestion {
    id: number;
    type: string;
    topic: string;
    difficulty: string;
    question: string;
    options?: string[];
    answer: any;
    explanation: string;
    pairs?: QuizPair[];
}

export interface GameState {
    score: number;
    streak: number;
    highScore: number;
    totalPoints: number;
    pointsAwarded: number;
}

export interface UIState {
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