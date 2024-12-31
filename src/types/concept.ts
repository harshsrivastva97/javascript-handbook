export interface Concept {
  id: number;
  title: string;
  content: {
    explanation: string;
    codeExample: string;
    keyPoints: string[];
    styles?: string;
  };
} 