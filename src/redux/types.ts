export interface RootState {
  topicsData: {
    topics: Topic[];
    topicsToConceptsMap: { [topicId: number]: number };
  };
}

export interface Topic {
  id: number;
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
} 