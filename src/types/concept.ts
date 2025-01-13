export interface ConceptContent {
  explanation: string;
  codeExample?: string;
  keyPoints: string[];
}

export interface Concept {
  id: number;
  title: string;
  content: ConceptContent;
}
