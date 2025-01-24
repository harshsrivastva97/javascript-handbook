export interface ConceptContent {
  explanation: string;
  codeExample?: string;
  styles?: string;
  keyPoints: string[];
}

export interface Concept {
  id: number;
  content: ConceptContent;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
}
