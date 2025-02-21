export interface User {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}

export interface RootState {
  auth: {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  };
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